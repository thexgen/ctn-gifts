# Photo library — put each photo in the folder for its UI slot

Category and product folders use their slugs from `src/data/navigation.js` and
`src/data/products.js`. Homepage sections have their own slot folders. JPG is
recommended for photos; PNG is fine when transparency is needed. The indexer
accepts `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, and `.gif`.

```
public/media/
├── categories/<slug>/
│   ├── tile-600x600.jpg             <- homepage circular category tile
│   ├── cover-1600x900.jpg           <- category page banner
│   └── gallery/01-detail-1200x900.jpg
├── products/<slug>/
│   ├── card-800x800.jpg             <- product grids, search, cart
│   ├── cover-1200x1200.jpg          <- product detail main image
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

## What goes where

| UI location | Folder and filename pattern | Source size / ratio | How it is displayed |
| --- | --- | --- | --- |
| Homepage category circles | `categories/<slug>/tile-600x600.jpg` | 600×600, 1:1 | 104–118 px circle; separate square image |
| Open category page banner | `categories/<slug>/cover-1600x900.jpg` | 1600×900, 16:9 | Fixed-height frame: 220 px phone, 300 px tablet, 360 px desktop; center-cropped |
| Category page gallery | `categories/<slug>/gallery/01-name-1200x900.jpg` | 1200×900, 4:3 | Equal 4:3 thumbnails |
| Product cards, search and cart | `products/<slug>/card-800x800.jpg` | 800×800, 1:1 | Square crop; used as the small listing image |
| Product detail main image | `products/<slug>/cover-1200x1200.jpg` | 1200×1200, 1:1 | Square frame, image contained so the product is not cropped |
| Product detail extra views | `products/<slug>/gallery/01-name-1200x1200.jpg` | 1200×1200, 1:1 | Equal square thumbnails; image contained |
| Homepage hero slides | `home/hero-slides/hero-1-1600x900.jpg` | 1600×900, 16:9 | Wide background; keep the main subject on the right, text sits on the left |
| Curated gift cards | `home/curated-cards/c1-800x1000.jpg` | 800×1000, 4:5 | 4:5 portrait cards |
| Recipient cards | `home/recipient-cards/her-800x800.jpg` | 800×800, 1:1 | Square crop |
| Designer portraits | `home/designer-portraits/le1-800x1000.jpg` | 800×1000, 4:5 | Fixed 4:5 image frame |
| Designer product inset | `home/designer-products/le1-400x400.jpg` | 400×400, 1:1 | Small square inset |
| Wall of Fame | `home/wall-of-fame/01-600x600.jpg` | 600×600, 1:1 | 144–208 px square |
| Wedding / bulk banner | `home/banners/wedding-1200x900.jpg` and `bulk-1200x900.jpg` | 1200×900, 4:3 | Responsive split banner with a matching 4:3 frame |

Use the exact key shown in the example filename (`hero-1`, `c1`, `her`,
`le1`, `01`, `wedding`). The `-WIDTHxHEIGHT` suffix should describe the
actual source pixels. Keep one `tile`, one `card`, and one `cover` per
category/product folder; replace the old file instead of leaving multiple
competing covers.

For category pages with separate prepared variants, place the card and hero
files in `categories/<slug>/optimized/` with names ending in
`-900x1200-card.webp` and `-1200x1500-hero.webp`. The media indexer uses these
variants as-is when present; otherwise it generates them from the cover.

## Why the displayed box can look different

Filename dimensions describe the source file, not its on-screen CSS size.
`object-cover` fills the UI box by cropping edges; it does not stretch the
photo. Match the source ratio to the slot above to avoid unwanted cropping.
Product detail images use `object-contain` so the full product stays visible.

Running `npm run media:index` (also run automatically before `dev` and
`build`) creates optimized WebP copies under `optimized/`. Generated copies
come from the original photos; prepared category variants matching the suffixes
above are preserved and referenced directly. Original photos remain untouched.

Until a source image is added, the corresponding UI slot uses its existing
placeholder. Current category/product folders also include temporary demo
images and `PHOTOS.txt`; replace the file for the slot you are updating.
