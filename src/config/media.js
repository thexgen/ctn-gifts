/**
 * Media management configuration.
 *
 * Photos live in `public/media/...` — never in component code.
 * `scripts/generate-media-manifest.mjs` scans those folders and writes
 * `src/data/mediaManifest.generated.js` with src / width / height / ratio for
 * every image. Components read that manifest through src/lib/media.js.
 *
 * Category folders can contain a square `tile` and a landscape `cover`.
 * Category/product folder names must match their data slugs. Homepage photos
 * go into the configured `homeSlots` directories below.
 */
export const mediaConfig = {
  // Folder names under public/media/
  roots: {
    home: 'home',
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

  // Filename shortcut:  cover-1600x900.jpg  ->  1600 × 900
  dimensionPattern: /[-_](\d{2,5})[xX](\d{2,5})(?=\.)/,

  // Used when a photo provides no dimensions anywhere (no layout shift still
  // guaranteed because the app renders a fixed ratio from these defaults).
  defaults: {
    categories: { cover: [1600, 900], gallery: [1200, 900] }, // wide cover, 4:3 gallery
    products: { cover: [1200, 1200], gallery: [1200, 1200] }, // 1:1 square
  },

  // Listing/homepage images and category-page covers get optimized WebP
  // derivatives. Product detail pages retain their source image.
  thumbnails: {
    categories: { width: 400, height: 500 },
    products: { width: 640, height: 640 },
    quality: 80,
  },

  categoryHero: { width: 1400, height: 800 },

  categoryOptimizedVariants: {
    card: [900, 1200],
    hero: [1200, 1500],
  },

  homeSlots: {
    'hero-slides': { width: 1600, height: 900 },
    'curated-cards': { width: 800, height: 1000 },
    'recipient-cards': { width: 800, height: 800 },
    'designer-portraits': { width: 800, height: 1000 },
    'designer-products': { width: 400, height: 400 },
    'wall-of-fame': { width: 600, height: 600 },
    banners: { width: 1200, height: 900 },
  },
};

export default mediaConfig;
