/**
 * Feature flags. Flip a flag here to expose gated categories/pages.
 * Beer & Wine Hampers stays hidden by default; when enabled, an age gate is
 * shown before the category or its products can be viewed / added to cart.
 */
export const features = {
  ALCOHOL_ENABLED: false,
};

export const isFeatureEnabled = (flag) => Boolean(features[flag]);

export default features;
