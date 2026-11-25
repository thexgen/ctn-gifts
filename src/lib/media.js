import { categoryMedia, productMedia } from '../data/mediaManifest.generated.js';

/** picsum placeholder used until a real photo is dropped into a folder. */
export const fallbackImage = (seed, width = 700, height = 700) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

export const getCategoryMedia = (slug) => categoryMedia[slug] || null;
export const getProductMedia = (slug) => productMedia[slug] || null;

/**
 * Returns the best media entry for a component: a real indexed photo if one
 * exists, otherwise the supplied placeholder (`{ src, width, height, alt }`).
 */
export function resolveMedia({ entry, fallback = null }) {
  const real = entry?.cover || entry?.gallery?.[0] || null;
  if (real) return real;
  if (!fallback) return null;

  const width = fallback.width || 700;
  const height = fallback.height || 700;
  return {
    src: fallback.src || fallbackImage(fallback.seed || 'giftora', width, height),
    width,
    height,
    ratio: `${width} / ${height}`,
    alt: fallback.alt || '',
    isFallback: true,
  };
}

/** All gallery photos for a category/product (empty if none indexed). */
export const getGallery = (entry) => entry?.gallery || [];
