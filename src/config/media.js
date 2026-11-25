/**
 * Media management configuration.
 *
 * Photos live in `public/media/...` — never in component code.
 * `scripts/generate-media-manifest.mjs` scans those folders and writes
 * `src/data/mediaManifest.generated.js` with src / width / height / ratio for
 * every image. Components read that manifest through src/lib/media.js.
 *
 * To add a category: create public/media/categories/<nav-slug>/ and put a
 * `cover.webp` (or .jpg/.png/.avif) inside. The slug MUST match the slug in
 * src/data/navigation.js. Products use their `slug` from src/data/products.js.
 */
export const mediaConfig = {
  // Folder names under public/media/
  roots: {
    categories: 'categories',
    products: 'products',
  },

  // Supported image extensions (lowercase).
  extensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'],

  // Names treated as the main image of a folder.
  coverNames: ['cover', 'main', 'hero', 'primary'],

  // Folder inside a category/product folder for extra photos.
  galleryFolder: 'gallery',

  // Optional per-folder sidecar for exact pixel sizes.
  // public/media/<root>/<slug>/dimensions.json:
  //   { "cover": [1200, 1500], "gallery": { "01.jpg": [800, 1000] } }
  dimensionsFile: 'dimensions.json',

  // Filename shortcut:  cover-1200x1500.webp  ->  1200 × 1500
  dimensionPattern: /[-_](\d{2,5})[xX](\d{2,5})(?=\.)/,

  // Used when a photo provides no dimensions anywhere (no layout shift still
  // guaranteed because the app renders a fixed ratio from these defaults).
  defaults: {
    categories: { cover: [1200, 1500], gallery: [800, 1000] }, // 4:5 portrait
    products: { cover: [800, 800], gallery: [800, 800] }, // 1:1 square
  },
};

export default mediaConfig;
