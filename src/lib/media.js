import { categoryMedia, productMedia, homeMedia } from '../data/mediaManifest.generated.js';

/** picsum placeholder used until a real photo is dropped into a folder. */
export const fallbackImage = (seed, width = 700, height = 700) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

export const getCategoryMedia = (slug) => categoryMedia[slug] || null;
export const getProductMedia = (slug) => productMedia[slug] || null;
export const getCategoryTileMedia = (slug) => categoryMedia[slug]?.tile || categoryMedia[slug]?.cover || null;
export const getProductCardMedia = (slug) => productMedia[slug]?.card || productMedia[slug]?.cover || null;
export const getProductCardImage = (slug, fallback) => {
  const media = getProductCardMedia(slug);
  return media?.thumbnail?.src || media?.src || fallback;
};
export const getHomeImage = (slot, key, fallback) => homeMedia[slot]?.[key]?.src || fallback;

/**
 * Returns the best media entry for a component: a real indexed photo if one
 * exists, otherwise the supplied placeholder (`{ src, width, height, alt }`).
 */
export function resolveMedia({ entry, fallback = null }) {
  const real = entry?.cover || entry?.gallery?.[0] || (entry?.src ? entry : null);
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
