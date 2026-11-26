/**
 * Media indexer and optimized listing-thumbnail generator.
 *
 * Scans public/media/{categories,products}/<slug>/ and writes an ESM manifest
 * that the React app imports. Runs automatically via `predev` / `prebuild`,
 * or manually with `npm run media:index`.
 *
 * Sharp reads actual cover dimensions and writes bounded WebP thumbnails.
 * Gallery dimensions come from filename suffixes, sidecars, or config defaults.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { mediaConfig } from '../src/config/media.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaRoot = path.join(root, 'public', 'media');
const manifestFile = path.join(root, 'src', 'data', 'mediaManifest.generated.js');

const isImage = (name) => mediaConfig.extensions.some((ext) => name.toLowerCase().endsWith(ext));

const titleFrom = (name) => name
  .replace(mediaConfig.dimensionPattern, '')
  .replace(/\.[^.]+$/, '')
  .replace(/^\d+[-_\s]*/, '')
  .replace(/[-_]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\w/g, (char) => char.toUpperCase());

const slugTitle = (slug) => slug
  .replace(/[-_]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\w/g, (char) => char.toUpperCase());

const hasRolePrefix = (file, role) => {
  const name = path.parse(file).name.toLowerCase();
  return name === role || name.startsWith(`${role}-`);
};

function findSingleImage(files, matches, role, folder) {
  const found = files.filter(matches);
  if (found.length > 1) {
    throw new Error(`Use one ${role} image in ${folder}; found: ${found.join(', ')}`);
  }
  return found[0] || null;
}

function makeEntry(file, folder, kind, slug, sidecar, fallbackSize, relativeToRoot, group) {
  const nameFromFilename = file.match(mediaConfig.dimensionPattern);
  const sidecarSize = sidecar?.gallery?.[file] || (kind === 'cover' ? sidecar?.cover : null);
  const size = nameFromFilename
    ? [Number(nameFromFilename[1]), Number(nameFromFilename[2])]
    : Array.isArray(sidecarSize)
      ? sidecarSize
      : fallbackSize;

  const [width, height] = size;

  return {
    src: `/media/${relativeToRoot.replaceAll(path.sep, '/')}/${file}`,
    width,
    height,
    ratio: `${width} / ${height}`,
    alt: kind === 'cover'
      ? (group === 'categories' ? `${slugTitle(slug)} collection` : slugTitle(slug))
      : (titleFrom(file) || `${slugTitle(slug)} photo`),
  };
}

async function makeCoverEntry(file, slug, sidecar, fallbackSize, groupName, group, makePageImage = true) {
  const entry = makeEntry(file, null, 'cover', slug, sidecar, fallbackSize, path.join(groupName, slug), group);
  const sourcePath = path.join(mediaRoot, groupName, slug, file);
  const optimizedFolder = path.join(mediaRoot, groupName, slug, 'optimized');
  const metadata = await sharp(sourcePath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read image dimensions: ${sourcePath}`);
  }

  const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
  entry.width = rotated ? metadata.height : metadata.width;
  entry.height = rotated ? metadata.width : metadata.height;
  entry.ratio = `${entry.width} / ${entry.height}`;

  const thumbnailName = `${path.parse(file).name}-card.webp`;
  const thumbnailRelative = path.join(groupName, slug, 'optimized', thumbnailName);
  const thumbnailPath = path.join(mediaRoot, thumbnailRelative);
  const thumbnailSize = mediaConfig.thumbnails[group];
  const preferredCard = group === 'categories'
    ? findOptimizedVariant(optimizedFolder, 'card', mediaConfig.categoryOptimizedVariants.card)
    : null;

  if (preferredCard) {
    entry.thumbnail = await readOptimizedEntry(preferredCard);
  } else {
    const output = await writeOptimizedWebp(sourcePath, thumbnailPath, thumbnailSize);
    entry.thumbnail = {
      src: `/media/${thumbnailRelative.replaceAll(path.sep, '/')}`,
      width: output.width,
      height: output.height,
      ratio: `${output.width} / ${output.height}`,
    };
  }

  if (group === 'categories' && makePageImage) {
    const heroRelative = path.join(groupName, slug, 'optimized', `${path.parse(file).name}-hero.webp`);
    const preferredHero = findOptimizedVariant(
      optimizedFolder,
      'hero',
      mediaConfig.categoryOptimizedVariants.hero
    );

    if (preferredHero) {
      entry.page = await readOptimizedEntry(preferredHero);
    } else {
      const heroOutput = await writeOptimizedWebp(
        sourcePath,
        path.join(mediaRoot, heroRelative),
        mediaConfig.categoryHero,
      );
      entry.page = {
        src: `/media/${heroRelative.replaceAll(path.sep, '/')}`,
        width: heroOutput.width,
        height: heroOutput.height,
        ratio: `${heroOutput.width} / ${heroOutput.height}`,
      };
    }
  }

  return entry;
}

function findOptimizedVariant(folder, role, [width, height]) {
  const suffix = `-${width}x${height}-${role}.webp`;
  const matches = listImages(folder).filter((file) => file.endsWith(suffix));
  if (matches.length > 1) {
    throw new Error(`Use one ${width}x${height} ${role} image in ${folder}; found: ${matches.join(', ')}`);
  }
  return matches[0] ? path.join(folder, matches[0]) : null;
}

async function readOptimizedEntry(file) {
  const metadata = await sharp(file).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read image dimensions: ${file}`);
  }

  const relative = path.relative(mediaRoot, file);
  return {
    src: `/media/${relative.replaceAll(path.sep, '/')}`,
    width: metadata.width,
    height: metadata.height,
    ratio: `${metadata.width} / ${metadata.height}`,
  };
}

async function writeOptimizedWebp(sourcePath, outputPath, bounds) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  return sharp(sourcePath)
    .rotate()
    .resize({
      width: bounds.width,
      height: bounds.height,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: mediaConfig.thumbnails.quality })
    .toFile(outputPath);
}

function readSidecar(folder) {
  try {
    return JSON.parse(fs.readFileSync(path.join(folder, mediaConfig.dimensionsFile), 'utf8'));
  } catch {
    return null;
  }
}

function listImages(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImage(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function indexGroup(group, groupName) {
  const directory = path.join(mediaRoot, groupName);
  const result = {};
  if (!fs.existsSync(directory)) return result;

  const folders = fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const slug of folders) {
    const folder = path.join(directory, slug);
    const sidecar = readSidecar(folder);
    const defaults = mediaConfig.defaults[group];

    const rootImages = listImages(folder);
    const tileFile = group === 'categories'
      ? findSingleImage(rootImages, (file) => hasRolePrefix(file, 'tile'), 'tile', folder)
      : null;
    const cardFile = group === 'products'
      ? findSingleImage(rootImages, (file) => hasRolePrefix(file, 'card'), 'card', folder)
      : null;
    const mainImages = rootImages.filter((file) => file !== tileFile && file !== cardFile);
    const coverFile = findSingleImage(
      mainImages,
      (file) => mediaConfig.coverNames.some((name) => file.toLowerCase().startsWith(name)),
      'cover',
      folder
    ) || mainImages[0] || tileFile || cardFile || null;

    const cover = coverFile
      ? await makeCoverEntry(coverFile, slug, sidecar, defaults.cover, groupName, group)
      : null;
    const tile = tileFile && tileFile !== coverFile
      ? await makeCoverEntry(tileFile, slug, sidecar, defaults.cover, groupName, group, false)
      : null;
    const card = cardFile && cardFile !== coverFile
      ? await makeCoverEntry(cardFile, slug, sidecar, defaults.cover, groupName, group, false)
      : null;

    const galleryFiles = listImages(path.join(folder, mediaConfig.galleryFolder));
    const gallery = galleryFiles
      .filter((file) => file !== coverFile)
      .map((file) => makeEntry(file, folder, 'gallery', slug, sidecar, defaults.gallery, path.join(groupName, slug, mediaConfig.galleryFolder), group));

    if (cover || tile || card || gallery.length) result[slug] = { cover, tile, card, gallery };
  }

  return result;
}

async function indexHome() {
  const result = {};
  const homeRoot = mediaConfig.roots.home;

  for (const [slot, bounds] of Object.entries(mediaConfig.homeSlots)) {
    const folder = path.join(mediaRoot, homeRoot, slot);
    fs.mkdirSync(folder, { recursive: true });
    const slotEntries = {};

    for (const file of listImages(folder)) {
      const sourcePath = path.join(folder, file);
      const metadata = await sharp(sourcePath).metadata();
      if (!metadata.width || !metadata.height) {
        throw new Error(`Could not read image dimensions: ${sourcePath}`);
      }

      const key = file.replace(mediaConfig.dimensionPattern, '').replace(/\.[^.]+$/, '');
      if (slotEntries[key]) {
        throw new Error(`Duplicate image key "${key}" in ${folder}`);
      }

      const relative = path.join(homeRoot, slot, 'optimized', `${key}.webp`);
      const output = await writeOptimizedWebp(sourcePath, path.join(mediaRoot, relative), bounds);
      slotEntries[key] = {
        src: `/media/${relative.replaceAll(path.sep, '/')}`,
        width: output.width,
        height: output.height,
        ratio: `${output.width} / ${output.height}`,
      };
    }

    result[slot] = slotEntries;
  }

  return result;
}

// Make sure the drop-in folders exist on a fresh checkout.
for (const groupName of Object.values(mediaConfig.roots)) {
  fs.mkdirSync(path.join(mediaRoot, groupName), { recursive: true });
}

const manifest = {
  // eslint-disable-next-line no-warning-comments
  generatedAt: new Date().toISOString(),
  home: await indexHome(),
  categories: await indexGroup('categories', mediaConfig.roots.categories),
  products: await indexGroup('products', mediaConfig.roots.products),
};

const contents = `/* AUTO-GENERATED by \`npm run media:index\` — do not edit by hand. */
/* Generated: ${manifest.generatedAt} */
export const categoryMedia = ${JSON.stringify(manifest.categories, null, 2)};

export const productMedia = ${JSON.stringify(manifest.products, null, 2)};

export const homeMedia = ${JSON.stringify(manifest.home, null, 2)};

export default { categoryMedia, productMedia, homeMedia };
`;

fs.mkdirSync(path.dirname(manifestFile), { recursive: true });
fs.writeFileSync(manifestFile, contents, 'utf8');

const categoryCount = Object.keys(manifest.categories).length;
const productCount = Object.keys(manifest.products).length;
console.log(`Media indexed: ${categoryCount} categories, ${productCount} products -> src/data/mediaManifest.generated.js`);
