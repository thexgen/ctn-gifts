# Giftora — Premium Gifting Homepage

A complete, responsive, production-quality single-page storefront built with **React 18 + Vite + Tailwind CSS + lucide-react**. All brand copy, names and imagery are original placeholders — nothing is copied from a real store.

## Install & run

```bash
npm install
npm run dev      # http://localhost:5173
```

Node.js 20.9 or newer is required for the image optimization pipeline.

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

## Managing photos

```
public/media/
├── categories/<slug>/
│   ├── tile-600x600.jpg
│   ├── cover-1600x900.jpg
│   └── gallery/01-detail-1200x900.jpg
├── products/<slug>/
│   ├── card-800x800.jpg
│   ├── cover-1200x1200.jpg
│   └── gallery/01-side-1200x1200.jpg
└── home/
    ├── hero-slides/hero-1-1600x900.jpg
    ├── curated-cards/c1-800x1000.jpg
    ├── recipient-cards/her-800x800.jpg
    ├── designer-portraits/le1-800x1000.jpg
    ├── designer-products/le1-400x400.jpg
    ├── wall-of-fame/01-600x600.jpg
    └── banners/
        ├── wedding-1200x900.jpg
        └── bulk-1200x900.jpg
```

- See [the photo slot guide](public/media/README.md) for every UI slot, its aspect ratio, and the exact source filename to add.
- Use JPG for regular photos or PNG when transparency is needed. You do not need to create WebP files: `npm run media:index` generates optimized WebP copies automatically (also runs before `dev` and `build`).
- Source dimensions are recommendations for image quality; CSS controls the displayed box. Separate `tile` and `cover` files are provided where the same category needs square and landscape artwork. Originals are never overwritten.
- Missing photos keep their seeded picsum placeholder, so the site still runs while images are added gradually.

Existing category/product folders contain temporary demo images and `PHOTOS.txt` notes. Replace the matching slot images one folder at a time.

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
