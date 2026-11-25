/**
 * Single source of truth for brand identity and contact details.
 * Change the name / phone / email here and it updates across the whole site.
 * Colors live in src/index.css (:root) and are exposed as Tailwind tokens
 * (cream, ink, gold, blush, night) in tailwind.config.js.
 */
export const brand = {
  name: 'Giftora',
  tagline: 'Thoughtful gifts, beautifully delivered.',
  shortName: 'G',
  phone: '+91-90000 00000',
  whatsapp: '919000000000', // digits only, with country code
  email: 'hello@giftora.example',
  location: 'Mumbai, India',
  currency: '₹',
  freeShippingThreshold: 2000,
  couponCode: 'GIFT10',
  couponPercent: 10,
  newsletterDiscount: '10%',
  year: 2026,
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
};

export const formatPrice = (value) =>
  `${brand.currency}${value.toLocaleString('en-IN')}`;

export default brand;
