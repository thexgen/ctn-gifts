# Giftora — Premium Gifting Homepage

A complete, responsive, production-quality single-page storefront built with **React 18 + Vite + Tailwind CSS + lucide-react**. All brand copy, names and imagery are original placeholders — nothing is copied from a real store.

## Install & run

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Where to change things

| What you want to change | File |
| --- | --- |
| Brand name, tagline, phone, WhatsApp, email, social links, currency, free-shipping threshold, coupon | `src/config/brand.js` |
| Colors (cream / ink / gold / blush / night) | `src/index.css` → `:root` CSS variables. Tailwind tokens are generated in `tailwind.config.js`. |
| Fonts | `index.html` (Google Fonts links) and `tailwind.config.js` → `fontFamily` |
| Products, banners, slides, testimonials, FAQs, SEO copy | `src/data/products.js` |
| Navigation and mega-menu columns | `src/data/navigation.js` |
| Images / photos | Drop files into `public/media/...` (see **Managing photos** below). Placeholder URLs stay in `src/data/products.js` as fallbacks. |

Everything is one place for the brand: change `brand.name` in `src/config/brand.js` and the logo, announcement bar, footer, titles and document copy update automatically (the `<title>` in `index.html` is a one-off you may also want to edit).

## Managing photos (1000+ categories)

```
public/media/
├── categories/<nav-slug>/cover-1200x1500.webp   + gallery/*.webp
└── products/<product-slug>/01-front-800x800.webp
```

- Folder name = the `slug` in `src/data/navigation.js` (categories) or `src/data/products.js` (products).
- `npm run media:index` scans those folders and regenerates `src/data/mediaManifest.generated.js` (also runs automatically before `dev` and `build`).
- Each photo keeps its own width/height and `aspect-ratio`, so square, portrait and wide images all render without layout shift. Dimensions come from the filename (`-1200x1500`), an optional `dimensions.json`, or defaults in `src/config/media.js`.
- Missing photos automatically fall back to the seeded picsum placeholders — nothing breaks while you upload gradually.

Right now every folder contains 4 temporary demo PNGs and a `PHOTOS.txt` with the exact filenames to keep — replace them with your real photos one folder at a time. Full rules are in `public/media/README.md`.

## Features

- Dismissible announcement bar; sticky, scroll-shrinking header with hover mega menus and a mobile slide-in drawer with accordions
- Quick client-side search with a results dropdown (tap a result to add to cart)
- Auto-playing hero slider with arrows, dots and pause-on-hover
- Scroll-reveal fades (`IntersectionObserver`), seamless marquee, hover zoom and gold-detail styling
- Cart Context (add/remove/quantity), right-side cart drawer with coupon, free-shipping progress and empty state
- Wishlist, delivery-pincode first-load modal, login/track-order demo modals
- Floating WhatsApp + back-to-top buttons, responsive from 360px through 1440px
- Accessible: semantic landmarks, ARIA labels/roles, keyboard-operable menus/drawers, Escape-to-close, visible focus states, reduced-motion support

## Customize next

1. **Logo** — replace the text monogram in `Header.jsx` / `Footer.jsx` with your real SVG logo (keep the alt text).
2. **Real images** — swap the seeded picsum URLs for your own product, lifestyle and campaign photography; keep the `width`/`height` attributes and aspect-ratio wrappers to avoid layout shift.
3. **Real products & prices** — expand `src/data/products.js` (24 placeholder products are included) and replace the demo names/ratings/prices with catalogue data.
4. **Backend / Shopify integration** — connect the cart Context to a real cart API (Shopify Storefront, WooCommerce, etc.), replace the demo login/track/checkout modals with real endpoints, and wire the newsletter form to your ESP.
5. **Deployment** — set a custom domain, favicon, OG meta tags and analytics before going live.
