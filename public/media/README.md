# Photo library — drop your images here

> **Demo mode:** all 33 category folders and 103 product folders currently
> contain 4 tiny temporary PNGs + a `PHOTOS.txt`. They exist only to show the
> structure. Open any `PHOTOS.txt` to see the exact 4 filenames to keep when
> you replace them with your real photos. To remove the demos, delete the
> folders (or just overwrite the files with the same names) and run
> `npm run media:index`. Helper: `python3 scripts/create-demo-media.py`.

No code changes needed. Add photos in folders named after the **slug** used by
the site, then run `npm run media:index` (it also runs automatically before
`npm run dev` / `npm run build`).

```
public/media/
├── categories/
│   ├── marriage-diary/
│   │   ├── cover-1200x1500.webp      <- main image (folder hero / tile)
│   │   ├── dimensions.json           <- optional exact sizes
│   │   └── gallery/
│   │       ├── 01-venue-800x1000.webp
│   │       └── 02-couple-1000x800.jpg
│   ├── anniversary/
│   └── birthday-for-her/             <- 1000+ folders supported
└── products/
    ├── couple-diary-our-story/
    │   ├── 01-front-800x800.webp     <- first image = primary
    │   └── 02-spread-1000x750.webp
    └── ...
```

## Naming rules

- **Folder name = slug** from `src/data/navigation.js` (categories) or
  `src/data/products.js` (products). Example: nav item "Marriage Diary
  (Husband / Wife)" has slug `marriage-diary`, so the folder is
  `public/media/categories/marriage-diary/`.
- Any image named `cover.*`, `main.*`, `hero.*` or `primary.*` becomes the
  category cover; otherwise the first image in the folder is used.
- Extra photos go in `gallery/`.
- Formats: `.jpg .jpeg .png .webp .avif .gif`. `.webp` is recommended.

## Three ways to give dimensions (needed for zero layout shift)

1. **Filename shortcut (easiest):** add `-WIDTHxHEIGHT` before the extension:
   `cover-1200x1500.webp` → 1200 × 1500 (portrait 4:5).
2. **Sidecar `dimensions.json`** inside the same folder:
   ```json
   {
     "cover": [1200, 1500],
     "gallery": { "01-venue.webp": [800, 1000] }
   }
   ```
3. **Defaults:** if omitted, categories use 1200×1500 (4:5) and products use
   800×800 (1:1). The app still reserves the correct space — no jump.

Square (x*x), portrait (y*y) and wide (x*y) photos are all handled
individually: each entry in the generated manifest keeps its own `ratio`.

Until you add a photo for a slug, the site keeps showing its placeholder image
from picsum.photos, so development never breaks.
