/**
 * Mock catalogue and section content.
 * Imagery uses local media slots when available, with deterministic
 * picsum.photos fallbacks for unfinished demo content (see media guide).
 *
 * Product model additions:
 *   slug            -> /products/:slug route
 *   customizable    -> boolean; shows the CustomizeForm on the product page
 *   customFields    -> schema rendered by CustomizeForm
 *   previewType     -> diary | tshirt | bouquet | jewellery | hamper
 *   categories/tags -> drive category pages + cross-listing (Anniversary)
 *   requiresAgeGate -> alcohol items behind the feature flag + age modal
 */

import { getCategoryPath, findCategoryNode, getDescendantSlugs } from './navigation.js';
import features from '../config/features.js';
import { getHomeImage, getProductCardImage } from '../lib/media.js';

const img = (seed, w = 600, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------------------------------------------------------------------------
// Category tiles (now route to real category pages)
// ---------------------------------------------------------------------------
export const categories = [
  { id: 'birthday', slug: 'birthday', label: 'Birthday', image: img('giftora-cat-birthday', 300, 300), href: '/categories/birthday' },
  { id: 'build', slug: 'customize-gifts', label: 'Build Your Own Hamper', image: img('giftora-cat-build', 300, 300), href: '/categories/customize-gifts' },
  { id: 'sameday', slug: 'fresh-fruit-baskets', label: 'Same Day Delivery', image: img('giftora-cat-sameday', 300, 300), href: '/categories/fresh-fruit-baskets' },
  { id: 'kids', slug: 'birthday-for-kids', label: 'Baby & Kids', image: img('giftora-cat-kids', 300, 300), href: '/categories/birthday-for-kids' },
  { id: 'corporate', slug: 'corporate-gifts', label: 'Corporate Gifting', image: img('giftora-cat-corporate', 300, 300), href: '/categories/corporate-gifts' },
  { id: 'wedding', slug: 'anniversary', label: 'Wedding Gifting', image: img('giftora-cat-wedding', 300, 300), href: '/categories/anniversary' },
  { id: 'more', slug: 'more', label: 'More Gifts', image: img('giftora-cat-more', 300, 300), href: '/categories/more' },
];

// ---------------------------------------------------------------------------
// Hero slider
// ---------------------------------------------------------------------------
export const heroSlides = [
  {
    id: 'hero-1',
    eyebrow: 'The art of giving',
    title: 'A Gift Worth\nthe Spotlight',
    text: 'Discover a collection made to impress — beautiful hampers for the people who make life brighter.',
    cta: 'Explore Luxury',
    href: '#curated',
    image: getHomeImage('banners', 'Banner_1', img('giftora-hero-celebration', 1600, 720)),
  },
  {
    id: 'hero-2',
    eyebrow: 'Made personal',
    title: 'Little Details,\nLasting Memories',
    text: 'Add a name, a note or a favourite treat. Every gift is finished with a touch that feels like you.',
    cta: 'Shop Personalised',
    href: '/categories/customize-gifts',
    image: getHomeImage('banners', 'Banner_2', img('giftora-hero-personal', 1600, 720)),
  },
  {
    id: 'hero-3',
    eyebrow: 'For every occasion',
    title: 'Celebrate\nEvery Connection',
    text: 'From birthdays to big milestones, find a thoughtful surprise for everyone on your list.',
    cta: 'Find Your Gift',
    href: '#treasured',
    image: getHomeImage('banners', 'Banner_3', img('giftora-hero-connections', 1600, 720)),
  },
];

// ---------------------------------------------------------------------------
// Curated gifts carousel
// ---------------------------------------------------------------------------
export const curated = [
  { id: 'c1', title: 'Celebration Hampers', image: getHomeImage('curated-cards', 'c1', img('giftora-curated-1', 700, 850)), href: '/categories/birthday' },
  { id: 'c2', title: 'Birthday Selection', image: getHomeImage('curated-cards', 'c2', img('giftora-curated-2', 700, 850)), href: '/categories/birthday' },
  { id: 'c3', title: 'Anniversary Range', image: getHomeImage('curated-cards', 'c3', img('giftora-curated-3', 700, 850)), href: '/categories/anniversary' },
  { id: 'c4', title: 'Personalised Games', image: getHomeImage('curated-cards', 'c4', img('giftora-curated-4', 700, 850)), href: '/categories/customize-gifts' },
  { id: 'c5', title: 'Festive Favourites', image: getHomeImage('curated-cards', 'c5', img('giftora-curated-5', 700, 850)), href: '/categories/food-hampers' },
  { id: 'c6', title: 'Sweet Surprises', image: getHomeImage('curated-cards', 'c6', img('giftora-curated-6', 700, 850)), href: '/categories/sweet-hampers' },
];

// ---------------------------------------------------------------------------
// Treasured connections
// ---------------------------------------------------------------------------
export const connections = [
  { id: 'her', label: 'For Her', image: getHomeImage('recipient-cards', 'her', img('giftora-conn-her', 600, 600)), href: '/categories/birthday-for-her' },
  { id: 'him', label: 'For Him', image: getHomeImage('recipient-cards', 'him', img('giftora-conn-him', 600, 600)), href: '/categories/birthday-for-him' },
  { id: 'corp', label: 'Corporate', image: getHomeImage('recipient-cards', 'corp', img('giftora-conn-corp', 600, 600)), href: '/categories/corporate-gifts' },
  { id: 'kids', label: 'Kids & Babies', image: getHomeImage('recipient-cards', 'kids', img('giftora-conn-kids', 600, 600)), href: '/categories/birthday-for-kids' },
  { id: 'parents', label: 'Parents', image: getHomeImage('recipient-cards', 'parents', img('giftora-conn-parents', 600, 600)), href: '/categories/home-decor' },
];

// ---------------------------------------------------------------------------
// Custom-field schema builders
// ---------------------------------------------------------------------------
const text = (key, label, options = {}) => ({ key, type: 'text', label, ...options });
const textarea = (key, label, options = {}) => ({ key, type: 'textarea', label, ...options });
const date = (key, label, options = {}) => ({ key, type: 'date', label, ...options });
const select = (key, label, options, extra = {}) => ({ key, type: 'select', label, options, ...extra });
const photos = (key, label, max = 10, withCaptions = false, required = true) => ({
  key, type: 'photos', label, max, withCaptions, required,
  help: withCaptions ? 'Add a short caption under each photo.' : `Up to ${max} photos.`,
});

const coverStyles = ['Classic Ivory', 'Blush Linen', 'Midnight Gold', 'Floral Charm'];
const anniversaryYears = ['1st', '5th', '10th', '25th', 'Other'];

/** Jewellery — custom note / engraving. */
const jewelleryFields = [
  text('name', "Recipient's name", { required: true, placeholder: 'e.g. Riya' }),
  textarea('engraving', 'Engraving / card message', { required: true, maxLength: 80, placeholder: 'A few words just for her…' }),
  date('date', 'Gift date'),
];

/** Couple Diary & Childhood-to-Today Diary — photos + captions + notes. */
const captionedDiaryFields = (nameLabel, noteLabel) => [
  text('name', nameLabel, { required: true, placeholder: 'Names or title for the cover' }),
  date('date', 'Special date'),
  select('coverStyle', 'Cover style', coverStyles, { required: true }),
  photos('photos', 'Photos', 10, true),
  textarea('note', noteLabel, { maxLength: 600, placeholder: 'Write the little stories behind the photos…' }),
];

/** Marriage Diary — couple names, Since date, anniversary year, cover, 20 photos, closing letter. */
const marriageDiaryFields = [
  text('coupleNames', 'Couple names (Husband / Wife)', { required: true, placeholder: 'Aarav & Meera' }),
  date('since', 'Since (wedding date)', { required: true }),
  select('anniversaryYear', 'Anniversary year', anniversaryYears, { required: true }),
  select('coverStyle', 'Cover style', coverStyles, { required: true }),
  photos('photos', 'Photos', 20),
  textarea('closingLetter', 'Closing letter', { required: true, maxLength: 600, placeholder: 'A note to read together, years from now…' }),
];

/** Photo Bouquet — couple photos + note card. */
const photoBouquetFields = [
  text('name', 'To (name)', { required: true, placeholder: 'e.g. Meera' }),
  photos('photos', 'Couple photos', 10),
  textarea('note', 'Note card message', { required: true, maxLength: 300, placeholder: 'Something from the heart…' }),
];

/** Custom T-Shirts — size, colour, front/back text, optional image, event type. */
const tshirtFields = (eventType) => [
  select('size', 'Size', ['XS', 'S', 'M', 'L', 'XL', 'XXL'], { required: true }),
  select('colour', 'Colour', ['Ivory', 'Blush', 'Charcoal', 'Maroon', 'Sage'], { required: true }),
  text('frontText', 'Front text', { required: true, maxLength: 30, placeholder: 'Short & sweet' }),
  text('backText', 'Back text', { maxLength: 40, placeholder: 'Optional' }),
  photos('image', 'Optional image', 1, false, false),
  select('eventType', 'Event type', ['Couples', 'Birthday', 'Events', 'Corporate Events'], {
    required: true, default: eventType,
  }),
];

/** Fresh fruit — delivery-slot selector. */
const fruitFields = [
  select('deliverySlot', 'Delivery slot', ['Same-day', 'Next-day'], { required: true }),
  textarea('note', 'Card message', { maxLength: 200, placeholder: 'Optional note with your basket' }),
];

// ---------------------------------------------------------------------------
// Homepage tabs (existing catalogue)
// ---------------------------------------------------------------------------
export const bestSellerTabs = [
  {
    id: 'exclusive',
    label: 'Exclusive Collection',
    products: [
      { id: 'p01', name: 'The Radiance Hamper', price: 4499, oldPrice: 4999, rating: 4.8, reviews: 124, badge: 'Sale 10%', image: img('giftora-p01', 700, 700) },
      { id: 'p02', name: 'Velvet Petal Collection', price: 5299, rating: 4.9, reviews: 88, badge: 'Exclusive', image: img('giftora-p02', 700, 700) },
      { id: 'p03', name: 'Golden Hour Gift Box', price: 3899, oldPrice: 4299, rating: 4.7, reviews: 56, badge: 'Sale 9%', image: img('giftora-p03', 700, 700) },
      { id: 'p04', name: 'The Artisan Pantry', price: 2999, rating: 4.6, reviews: 42, soldOut: true, image: img('giftora-p04', 700, 700) },
      { id: 'p05', name: 'Midnight Bloom Box', price: 4199, rating: 4.8, reviews: 71, image: img('giftora-p05', 700, 700) },
      { id: 'p06', name: 'The Gourmet Edit', price: 3699, rating: 4.7, reviews: 39, image: img('giftora-p06', 700, 700) },
    ],
  },
  {
    id: 'personalised',
    label: 'Personalised Gifts',
    products: [
      { id: 'p07', name: 'Monogram Keepsake Box', price: 2499, rating: 4.9, reviews: 210, badge: 'Bestseller', image: img('giftora-p07', 700, 700) },
      { id: 'p08', name: 'A Message For You', price: 1899, rating: 4.8, reviews: 167, image: img('giftora-p08', 700, 700) },
      { id: 'p09', name: 'Photo Memory Lantern', price: 2199, oldPrice: 2499, rating: 4.7, reviews: 93, badge: 'Sale 12%', image: img('giftora-p09', 700, 700) },
      { id: 'p10', name: 'Custom Name Hamper', price: 3299, rating: 4.8, reviews: 74, image: img('giftora-p10', 700, 700) },
      { id: 'p11', name: 'Engraved Celebration Flask', price: 1799, rating: 4.6, reviews: 58, soldOut: true, image: img('giftora-p11', 700, 700) },
      { id: 'p12', name: 'Your Story, Bound', price: 2799, rating: 4.9, reviews: 46, image: img('giftora-p12', 700, 700) },
    ],
  },
  {
    id: 'couple',
    label: 'Couple Favourites',
    products: [
      { id: 'p13', name: 'Together Forever Box', price: 4199, rating: 4.9, reviews: 135, image: img('giftora-p13', 700, 700) },
      { id: 'p14', name: 'The Duo Experience', price: 3699, rating: 4.7, reviews: 68, image: img('giftora-p14', 700, 700) },
      { id: 'p15', name: 'Anniversary Bloom Set', price: 3199, rating: 4.8, reviews: 102, soldOut: true, image: img('giftora-p15', 700, 700) },
      { id: 'p16', name: 'Sweet Tandem Treats', price: 2599, oldPrice: 2899, rating: 4.6, reviews: 51, badge: 'Sale 10%', image: img('giftora-p16', 700, 700) },
    ],
  },
];

export const signatureTabs = [
  {
    id: 'new',
    label: 'New Launches',
    products: [
      { id: 'p17', name: 'Petal & Pistachio', price: 2899, rating: 4.8, reviews: 24, badge: 'New', image: img('giftora-p17', 700, 700) },
      { id: 'p18', name: 'The Citrus Edit', price: 2499, rating: 4.7, reviews: 19, badge: 'New', image: img('giftora-p18', 700, 700) },
      { id: 'p19', name: 'Midnight Cocoa Box', price: 2199, rating: 4.6, reviews: 31, image: img('giftora-p19', 700, 700) },
      { id: 'p20', name: 'Bloom & Brew', price: 3099, rating: 4.9, reviews: 27, image: img('giftora-p20', 700, 700) },
    ],
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
    products: [
      { id: 'p21', name: 'Gilded Bloom Pendant', price: 3499, rating: 4.9, reviews: 63, image: img('giftora-p21', 700, 700) },
      { id: 'p22', name: 'Pearl Whisper Earrings', price: 2999, rating: 4.8, reviews: 47, image: img('giftora-p22', 700, 700) },
      { id: 'p23', name: 'The Forever Bracelet', price: 4299, oldPrice: 4799, rating: 4.9, reviews: 82, badge: 'Sale 10%', image: img('giftora-p23', 700, 700) },
      { id: 'p24', name: 'Rosegold Charm Set', price: 3799, rating: 4.7, reviews: 38, image: img('giftora-p24', 700, 700) },
    ],
  },
  {
    id: 'homeDecor',
    label: 'Home Decor',
    products: [
      { id: 'p25', name: 'Amber Glow Candle Set', price: 1499, rating: 4.8, reviews: 112, image: img('giftora-p25', 700, 700) },
      { id: 'p26', name: 'The Serene Vase', price: 2299, rating: 4.7, reviews: 44, image: img('giftora-p26', 700, 700) },
      { id: 'p27', name: 'Linen & Gold Cushion', price: 1899, rating: 4.6, reviews: 29, soldOut: true, image: img('giftora-p27', 700, 700) },
      { id: 'p28', name: 'Aroma Diffuser Duo', price: 2099, oldPrice: 2499, rating: 4.8, reviews: 76, badge: 'Sale 16%', image: img('giftora-p28', 700, 700) },
    ],
  },
];

/** tags added to existing homepage products (also used for cross-listing). */
const legacyTags = {
  p01: ['birthday-for-her', 'food-hampers'],
  p02: ['birthday-for-her'],
  p03: ['anniversary'],
  p04: ['food-hampers'],
  p05: ['birthday-for-him'],
  p06: ['food-hampers'],
  p07: ['customize-gifts', 'anniversary'],
  p08: ['customize-gifts'],
  p09: ['customize-gifts', 'anniversary'],
  p10: ['customize-gifts'],
  p12: ['anniversary'],
  p13: ['anniversary'],
  p14: ['anniversary'],
  p15: ['anniversary'],
  p16: ['anniversary'],
  p21: ['custom-jewellery', 'anniversary'],
  p22: ['custom-jewellery', 'anniversary'],
  p23: ['custom-jewellery', 'anniversary'],
  p24: ['custom-jewellery', 'anniversary'],
  p25: ['home-decor'],
  p26: ['home-decor'],
  p27: ['home-decor'],
  p28: ['home-decor'],
};

/** Legacy jewellery pieces are customisable too (engraving / card note). */
const legacyCustomizations = {
  p21: { customizable: true, customFields: jewelleryFields, previewType: 'jewellery' },
  p22: { customizable: true, customFields: jewelleryFields, previewType: 'jewellery' },
  p23: { customizable: true, customFields: jewelleryFields, previewType: 'jewellery' },
  p24: { customizable: true, customFields: jewelleryFields, previewType: 'jewellery' },
};

const legacyProducts = [...bestSellerTabs, ...signatureTabs]
  .flatMap((tab) => tab.products)
  .map((product) => ({
    ...product,
    ...(legacyCustomizations[product.id] || {}),
    slug: slugify(product.name),
    categories: [],
    tags: legacyTags[product.id] || [],
    description: `${product.name} — thoughtfully curated and beautifully packed by the Giftora studio.`,
  }));

// ---------------------------------------------------------------------------
// Category catalogue — 3 products per leaf route
// ---------------------------------------------------------------------------
const leafCatalogue = {
  'birthday-for-him': [
    ["The Gentleman's Crate", 2899], ['Midnight Cocoa & Coffee', 2499], ['Grooming Gift Set', 3199],
  ],
  'birthday-for-her': [
    ['Petal & Prosecco Box', 3299], ['Rose Gold Surprise', 2899], ['Sweet Celebration Hamper', 2599],
  ],
  'birthday-for-kids': [
    ['Little Explorer Box', 1899], ['Rainbow Treat Hamper', 1699], ['Tiny Teddy Surprise', 1499],
  ],
  anniversary: [
    ['Couple Diary — Forever Starts Here', 2999], ['Blossom Anniversary Bouquet', 3499], ['Matching Couple Tees', 2199],
  ],
  'dry-fruits-hampers': [
    ['Royal Dry Fruit Coffer', 3299], ['Almond & Saffron Box', 2799], ['Everyday Nut Selection', 1999],
  ],
  'fresh-fruit-baskets': [
    ['Sunrise Fruit Basket', 2399], ['Seasonal Fruit Delight', 1999], ['Orchard Luxury Basket', 3199],
  ],
  'chocolates-candies-cookies': [
    ['Chocolate Lovers Box', 1899], ['Cookie & Candy Combo', 1599], ['Sweet Cravings Tin', 1299],
  ],
  'sweet-hampers': [
    ['Traditional Mithai Box', 2299], ['Festive Sweet Hamper', 2699], ['Kaju Katli Special', 1899],
  ],
  'custom-earrings': [
    ['Blossom Drop Earrings', 2999], ['Everyday Gold Hoops', 2499], ['Pearl Jhumka Pair', 3299],
  ],
  'custom-necklace': [
    ['Initial Gold Necklace', 3499], ['Luna Pendant Chain', 3199], ['Rosegold Heart Necklace', 3799],
  ],
  'custom-pendant': [
    ['Name Pendant in Gold', 2899], ['Photo Charm Pendant', 3299], ['Zodiac Pendant', 2699],
  ],
  'couple-diary': [
    ['Couple Diary — Our Story', 2999], ['Couple Diary — Little Moments', 2799], ['Couple Diary — Year One', 3199],
  ],
  'marriage-diary': [
    ['Marriage Diary — Husband & Wife', 3499], ['Marriage Diary — Forever & Always', 3999], ['Marriage Diary — Silver Edition', 4499],
  ],
  'childhood-to-today-diary': [
    ['Childhood to Today Diary', 3299], ['Then & Now Memory Book', 2999], ['Growing Up Together Diary', 3499],
  ],
  'photo-bouquet': [
    ['Photo Bouquet — Classic', 2599], ['Photo Bouquet — Blush', 2899], ['Photo Bouquet — Deluxe', 3299],
  ],
  'tshirts-couples': [
    ['Better Together Tee', 1299], ['Mr & Mrs Matching Tees', 1499], ['King & Queen Tees', 1399],
  ],
  'tshirts-birthday': [
    ['Birthday Star Tee', 1199], ['It’s My Birthday Tee', 1099], ['Age-iversary Tee', 1299],
  ],
  'tshirts-events': [
    ['Event Crew Tee', 1299], ['Team Celebration Tee', 1199], ['Festive Squad Tee', 1199],
  ],
  'tshirts-corporate-events': [
    ['Corporate Day Tee', 1399], ['Team Spirit Tee', 1299], ['Company Retreat Tee', 1499],
  ],
  'corporate-gifts': [
    ['Executive Desk Hamper', 3499], ['Team Celebration Box', 2999], ['Client Thank You Crate', 3999],
  ],
  diyas: [
    ['Handcrafted Clay Diya Set', 999], ['Brass Festival Diyas', 1499], ['Gold Leaf Diya Trio', 1799],
  ],
  'home-decor': [
    ['Festive Wall Hangings', 2199], ['Marble Coaster Pair', 1299], ['Gilded Mirror Tray', 2599],
  ],
  'skin-care-hampers': [
    ['Glow Ritual Set', 2899], ['Botanical Skincare Box', 2499], ['Self-Care Sunday Kit', 2199],
  ],
  'perfume-gift-sets': [
    ['Signature Scent Duo', 3499], ['Eau de Luxe Set', 3199], ['Pocket Perfume Trio', 2299],
  ],
  'beer-wine-hampers': [
    ['Craft Brew Collector Box', 3299], ['Wine & Cheese Evening', 3999], ['Weekend Brew Hamper', 2799],
  ],
};

/** Schema + preview type for each leaf slug. */
const schemaForSlug = (slug) => {
  if (['custom-earrings', 'custom-necklace', 'custom-pendant'].includes(slug)) {
    return { customFields: jewelleryFields, previewType: 'jewellery' };
  }
  if (slug === 'marriage-diary') return { customFields: marriageDiaryFields, previewType: 'diary' };
  if (slug === 'couple-diary') {
    return { customFields: captionedDiaryFields('Couple names', 'Notes & memories'), previewType: 'diary' };
  }
  if (slug === 'childhood-to-today-diary') {
    return { customFields: captionedDiaryFields('Name', 'Notes & memories'), previewType: 'diary' };
  }
  if (slug === 'photo-bouquet') return { customFields: photoBouquetFields, previewType: 'bouquet' };
  if (slug.startsWith('tshirts-')) {
    const eventType = {
      'tshirts-couples': 'Couples', 'tshirts-birthday': 'Birthday',
      'tshirts-events': 'Events', 'tshirts-corporate-events': 'Corporate Events',
    }[slug];
    return { customFields: tshirtFields(eventType), previewType: 'tshirt' };
  }
  if (slug === 'fresh-fruit-baskets') return { customFields: fruitFields, previewType: 'hamper' };
  return { customFields: null, previewType: 'hamper' };
};

const categoryProducts = Object.entries(leafCatalogue).flatMap(([slug, items]) =>
  items.map(([name, price], index) => {
    const { customFields, previewType } = schemaForSlug(slug);
    const path = getCategoryPath(slug);
    const isCustom = path.some((item) => item.slug === 'customize-gifts');
    const isAlcohol = path.some((item) => item.slug === 'beer-wine-hampers');
    const categoryLabel = findCategoryNode(slug)?.label || 'Giftora';

    return {
      id: `c-${slug}-${index + 1}`,
      slug: `${slug}-${index + 1}`,
      name,
      price,
      rating: Number((4.5 + index * 0.2).toFixed(1)),
      reviews: 28 + index * 19,
      image: img(`giftora-${slug}-${index + 1}`, 700, 700),
      badge: customFields ? 'Customisable' : undefined,
      categories: [slug],
      tags: [slug, ...(isCustom ? ['anniversary'] : [])],
      customizable: Boolean(customFields),
      customFields,
      previewType,
      requiresAgeGate: isAlcohol,
      description: `${name} — part of our ${categoryLabel} collection. Hand-picked, beautifully packed and ready to make someone's day.`,
    };
  })
);

/** Flat list used by search, product routes and category pages. */
export const allProducts = [
  ...new Map(
    [...legacyProducts, ...categoryProducts].map((product) => [product.id, product])
  ).values(),
].map((product) => ({
  ...product,
  image: getProductCardImage(product.slug, product.image),
}));

export const getProductBySlug = (slug) => allProducts.find((product) => product.slug === slug) || null;

/**
 * Products for a category slug (parent slugs include descendant products).
 * Tags provide cross-listing, e.g. every Customize Gifts item also appears in
 * Anniversary. Gated alcohol products are filtered out when the flag is off.
 */
export const productsForCategory = (slug) => {
  const slugs = getDescendantSlugs(slug);
  return allProducts.filter((product) => {
    const assigned = [...(product.categories || []), ...(product.tags || [])];
    const matches = assigned.some((value) => slugs.includes(value));
    return matches && (!product.requiresAgeGate || features.ALCOHOL_ENABLED);
  });
};

// ---------------------------------------------------------------------------
// Remaining homepage content
// ---------------------------------------------------------------------------
export const limitedEdition = [
  {
    id: 'le1',
    name: 'Aanya Mehra',
    line: 'The Modern Muse Edit',
    description: 'Bold colour, delicate detailing and a little bit of theatre — a curated box that wears its heart on its sleeve.',
    image: getHomeImage('designer-portraits', 'le1', img('giftora-designer-1', 800, 1000)),
    product: getHomeImage('designer-products', 'le1', img('giftora-designer-product-1', 200, 200)),
  },
  {
    id: 'le2',
    name: 'Rohan Kapoor',
    line: 'Quiet Luxury Chapters',
    description: 'Understated textures and heirloom-worthy keepsakes for the person who appreciates the finer, quieter things.',
    image: getHomeImage('designer-portraits', 'le2', img('giftora-designer-2', 800, 1000)),
    product: getHomeImage('designer-products', 'le2', img('giftora-designer-product-2', 200, 200)),
  },
  {
    id: 'le3',
    name: 'Ira Sethi',
    line: 'The Art of Celebration',
    description: 'A joyful explosion of flavour and form, imagined for milestone moments that deserve to be remembered.',
    image: getHomeImage('designer-portraits', 'le3', img('giftora-designer-3', 800, 1000)),
    product: getHomeImage('designer-products', 'le3', img('giftora-designer-product-3', 200, 200)),
  },
  {
    id: 'le4',
    name: 'Dev Malhotra',
    line: 'Canvas & Candlelight',
    description: 'Hand-painted accents and warm, glowing surprises — a collaboration made for slow evenings and long conversations.',
    image: getHomeImage('designer-portraits', 'le4', img('giftora-designer-4', 800, 1000)),
    product: getHomeImage('designer-products', 'le4', img('giftora-designer-product-4', 200, 200)),
  },
];

export const wallOfFame = Array.from({ length: 12 }, (_, i) => ({
  id: `fame-${i + 1}`,
  alt: `A happy Giftora customer with their gift, photo ${i + 1}`,
  image: getHomeImage('wall-of-fame', String(i + 1).padStart(2, '0'), img(`giftora-fame-${i + 1}`, 320, 320)),
}));

export const banners = {
  wedding: {
    eyebrow: 'For the big day',
    title: 'Wedding Gifting',
    text: 'Celebrate their union with timeless elegance. Explore a curated collection of enchanting presents — for the happy couple, the guests, and everyone in between.',
    cta: 'Wedding Gifts',
    image: getHomeImage('banners', 'wedding', img('giftora-banner-wedding', 1000, 800)),
  },
  bulk: {
    eyebrow: 'For teams & companies',
    title: 'Looking for the Perfect Bulk Order Gift?',
    text: 'We have you covered. Thoughtful, beautifully packed gifts for your clients, colleagues and teams — with options to suit every budget.',
    cta: 'Enquire Now',
    image: getHomeImage('banners', 'bulk', img('giftora-banner-bulk', 1000, 800)),
  },
};

export const testimonials = [
  { id: 't1', quote: 'An incredible array of hampers and the kind of personal touch you simply do not find online. Every detail felt considered.', name: 'Sonam K. Ahuja', city: 'Mumbai, India' },
  { id: 't2', quote: 'Giftora helps you express exactly the right amount of love and effort for the people you care about. A new family tradition.', name: 'Ananya Rao', city: 'Bengaluru, India' },
  { id: 't3', quote: 'Beautiful packaging, delicious treats and the loveliest note. It arrived right on time and made someone s very special day.', name: 'Minal Agarwal', city: 'Pune, India' },
  { id: 't4', quote: 'We ordered sixty hampers for our team and every single one looked perfect. Stress-free, gracious and genuinely thoughtful.', name: 'Rahul Mehta', city: 'Delhi, India' },
  { id: 't5', quote: 'The personalised keepsake box brought tears to my mother s eyes. Worth every rupee and then some.', name: 'Tara Kapoor', city: 'Jaipur, India' },
  { id: 't6', quote: 'Style, warmth and a wonderful unboxing moment. Giftora has become my go-to for every celebration on the calendar.', name: 'Vikram Nair', city: 'Kochi, India' },
];

export const knowMore = [
  {
    heading: 'Gifting, made meaningful',
    paragraphs: [
      'At Giftora we believe a gift is more than an object — it is a small, tangible piece of a relationship. That belief shapes everything we do, from the way we source a single artisanal biscuit to the final flourish of a hand-tied ribbon.',
      'Our collections bring together independent makers, beloved flavours and beautifully considered packaging, so that finding the right gift feels as good as giving it.',
    ],
  },
  {
    heading: 'Thoughtful curation, every time',
    paragraphs: [
      'Every hamper is assembled by hand and checked with care before it leaves our studio. We work with local artisans and small-batch producers, choosing items that feel generous, useful and genuinely lovely to receive.',
      'Whether it is a birthday, a wedding, a new job or simply a Tuesday that could use a little brightness, there is a Giftora box for the moment.',
    ],
  },
  {
    heading: 'From our studio to your door',
    paragraphs: [
      'We deliver across the country with secure, temperature-aware packaging and real-time order tracking. Need something today? Our same-day service is available in selected cities, and our team is always happy to help you choose.',
      'For larger orders, our corporate desk can tailor quantities, branding and delivery schedules to fit your plans perfectly.',
    ],
  },
];

export const faqs = [
  { q: 'What is the delivery time for a Giftora hamper?', a: 'Most orders are delivered within 3–5 working days. Same-day delivery is available in selected cities on eligible hampers when you order before 2 pm.' },
  { q: 'Can I personalise a gift with a name or message?', a: 'Absolutely. Look for Personalised Gifts in our collections, or add a handwritten note at checkout. Our team will make sure your message is beautifully presented.' },
  { q: 'Do you ship internationally?', a: 'We currently deliver across India. For international gifting, please contact our team and we will do our best to arrange something special.' },
  { q: 'How do I track my order?', a: 'Once your order ships, we email a tracking link. You can also use the Track Order option in the header with your order number and email address.' },
  { q: 'What if a product arrives damaged?', a: 'We pack everything with care, but if something arrives less than perfect, contact us within 48 hours with a photo and we will replace it or refund you promptly.' },
  { q: 'Can I order hampers in bulk for my company?', a: 'Yes! Our corporate gifting desk handles everything from 10 to 1,000+ hampers, including custom branding and staggered deliveries. Use the Enquire Now form to get started.' },
  { q: 'Is gift wrapping included?', a: 'Every Giftora hamper arrives in our signature packaging at no extra cost. You can upgrade to a premium gift box and ribbon at checkout.' },
  { q: 'What is your return policy?', a: 'Unopened, non-personalised hampers can be returned within 7 days of delivery. Personalised and perishable items are excluded unless they arrive damaged.' },
];

export default {
  categories, heroSlides, curated, connections, bestSellerTabs, signatureTabs,
  allProducts, limitedEdition, wallOfFame, banners, testimonials, knowMore, faqs,
};
