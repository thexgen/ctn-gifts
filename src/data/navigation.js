/**
 * SINGLE SOURCE OF TRUTH FOR NAVIGATION + CATEGORY ROUTES.
 *
 * Every node has a `slug` (used for /categories/:slug) and may have `children`.
 * Edit this file to add / rename / reorder menu items — the desktop mega menu,
 * mobile accordion drawer, breadcrumbs and category pages all read from here.
 *
 * `requiresFeature` hides a node (and its products) until that flag is enabled
 * in src/config/features.js.
 */

export const FEATURE_ALCOHOL = 'ALCOHOL_ENABLED';

const node = (label, slug, options = {}) => ({
  label,
  slug,
  href: `/categories/${slug}`,
  ...options,
});

export const navLinks = [
  node('Birthday', 'birthday', {
    children: [
      node('For Him', 'birthday-for-him'),
      node('For Her', 'birthday-for-her'),
      node('For Kids', 'birthday-for-kids'),
    ],
    feature: { eyebrow: 'Make a wish', title: 'Birthday boxes they will love' },
  }),
  node('Anniversary', 'anniversary', {
    feature: { eyebrow: 'Still in love', title: 'Anniversary edits for two' },
  }),
  node('Food Hampers', 'food-hampers', {
    children: [
      node('Dry Fruits Hampers', 'dry-fruits-hampers'),
      node('Fresh Fruit Baskets', 'fresh-fruit-baskets'),
      node('Chocolates, Candies & Cookies', 'chocolates-candies-cookies'),
      node('Sweet Hampers', 'sweet-hampers'),
    ],
    feature: { eyebrow: 'Taste the moment', title: 'Hampers worth sharing' },
  }),
  node('Customize Gifts', 'customize-gifts', {
    children: [
      node('For Her', 'customize-for-her', {
        children: [
          node('Custom Jewellery', 'custom-jewellery', {
            children: [
              node('Earrings', 'custom-earrings'),
              node('Necklace', 'custom-necklace'),
              node('Pendant', 'custom-pendant'),
            ],
          }),
        ],
      }),
      node('For Couples', 'customize-for-couples', {
        children: [
          node('Couple Diary', 'couple-diary'),
          node('Marriage Diary (Husband / Wife)', 'marriage-diary'),
          node('Childhood-to-Today Diary', 'childhood-to-today-diary'),
          node('Photo Bouquet', 'photo-bouquet'),
        ],
      }),
      node('Custom T-Shirts', 'custom-t-shirts', {
        children: [
          node('Couples', 'tshirts-couples'),
          node('Birthday', 'tshirts-birthday'),
          node('Events', 'tshirts-events'),
          node('Corporate Events', 'tshirts-corporate-events'),
        ],
      }),
    ],
    feature: { eyebrow: 'Made by you', title: 'A gift only you could give' },
  }),
  node('Corporate Gifts', 'corporate-gifts', {
    feature: { eyebrow: 'For teams', title: 'Gifts that say thank you' },
  }),
  node('Home Decor', 'home-decor', {
    children: [node('Diyas', 'diyas')],
    feature: { eyebrow: 'Warm the room', title: 'Little lights, big feeling' },
  }),
  node('More', 'more', {
    children: [
      node('Skin Care Hampers', 'skin-care-hampers'),
      node('Perfume Gift Sets', 'perfume-gift-sets'),
      node('Beer & Wine Hampers', 'beer-wine-hampers', { requiresFeature: FEATURE_ALCOHOL }),
    ],
    feature: { eyebrow: 'Just for you', title: 'Something a little different' },
  }),
];

/** All nodes as a flat list, with their parent chain attached. */
export const allCategoryNodes = (() => {
  const result = [];
  const walk = (items, parents = []) => {
    items.forEach((item) => {
      result.push({ ...item, parents });
      if (item.children?.length) walk(item.children, [...parents, item]);
    });
  };
  walk(navLinks);
  return result;
})();

export const findCategoryNode = (slug) =>
  allCategoryNodes.find((item) => item.slug === slug) || null;

/** Breadcrumb trail from Home's first level down to the requested node. */
export const getCategoryPath = (slug) => {
  const found = findCategoryNode(slug);
  return found ? [...found.parents, found] : [];
};

/** A category page also shows products assigned to any descendant slug. */
export const getDescendantSlugs = (slug) => {
  const found = findCategoryNode(slug);
  if (!found) return [slug];
  const slugs = [slug];
  const walk = (children) => children.forEach((child) => {
    slugs.push(child.slug);
    if (child.children?.length) walk(child.children);
  });
  walk(found.children || []);
  return slugs;
};

/** Recursively remove feature-gated nodes when their flag is off. */
export const visibleNavLinks = (features = {}) => {
  const filter = (items) => items
    .filter((item) => !item.requiresFeature || features[item.requiresFeature])
    .map((item) => (item.children ? { ...item, children: filter(item.children) } : item));
  return filter(navLinks);
};

export const isCategoryVisible = (slug, features = {}) => {
  const found = findCategoryNode(slug);
  if (!found) return false;
  return !found.parents.some((parent) => parent.requiresFeature && !features[parent.requiresFeature]) &&
    (!found.requiresFeature || Boolean(features[found.requiresFeature]));
};

export const isAlcoholCategory = (slug) => slug === 'beer-wine-hampers' ||
  getCategoryPath(slug).some((item) => item.slug === 'beer-wine-hampers');

/** Flatten to leaf links for the mobile accordion drawer. */
export const flattenNavItem = (item) => {
  const result = [];
  const walk = (children) => children?.forEach((child) => {
    if (child.children?.length) walk(child.children);
    else result.push(child);
  });
  walk(item.children);
  return result;
};

export default navLinks;
