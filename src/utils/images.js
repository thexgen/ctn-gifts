import images from "../data/images.json";

const BASE = "/images/";
const full = (p) => (p ? BASE + p : null);

export const getProductImages = (slug) =>
  (images.products[slug] || []).map(full);

export const getImage = (section, key) =>
  full(key ? images[section]?.[key] : null);

export const getList = (section) => (images[section] || []).map(full);