"""
Generate temporary demo media folders + tiny PNG placeholders.

Run:  python3 scripts/create-demo-media.py
Then: npm run media:index

Creates one folder per category slug (from navigation.js) and per product slug
(from products.js). Each folder gets 4 real placeholder images with exact
size-encoded filenames plus a PHOTOS.txt explaining the names to keep.
Delete this script / the generated files whenever you drop in real photos.
"""

import json
import pathlib
import struct
import subprocess
import zlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media"

JS = """
import { allCategoryNodes } from './src/data/navigation.js';
import { allProducts } from './src/data/products.js';
console.log(JSON.stringify({
  categories: allCategoryNodes.map(n => n.slug),
  products: allProducts.map(p => p.slug)
}));
"""

PALETTE = [
    (176, 141, 87),   # antique gold
    (58, 35, 40),     # maroon ink
    (243, 217, 217),  # blush
    (251, 247, 240),  # cream
    (140, 110, 130),  # mauve
    (110, 125, 105),  # sage
    (190, 140, 110),  # terracotta
    (70, 70, 90),     # charcoal
]


def png(path: pathlib.Path, w: int, h: int, first, second):
    """Tiny solid-gradient PNG — enough to see layout in the browser."""
    rows = []
    for y in range(h):
        t = y / max(1, h - 1)
        rgb = bytes(int(a * (1 - t) + b * t) for a, b in zip(first, second))
        rows.append(b"\x00" + rgb * w)

    def chunk(tag, payload):
        body = tag + payload
        return struct.pack(">I", len(payload)) + body + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(b"".join(rows), 9))
        + chunk(b"IEND", b"")
    )


def colours(seed: int):
    a = PALETTE[seed % len(PALETTE)]
    b = PALETTE[(seed + 3) % len(PALETTE)]
    return a, b


def photos_txt(folder: pathlib.Path, slug: str, kind: str, files):
    lines = [
        "TEMPORARY DEMO PHOTOS — replace with your real images.",
        "",
        f"Folder: {kind}/{slug}",
        "Keep these EXACT filenames so the media manifest keeps working:",
        "",
    ]
    for index, (name, meaning) in enumerate(files, 1):
        lines.append(f"{index}. {name}  ->  {meaning}")
    lines += [
        "",
        "The WIDTHxHEIGHT in each filename sets the aspect ratio (no layout shift).",
        f"To switch to webp, rename e.g. {files[0][0].replace('.png', '.webp')} and delete the .png.",
        "Then run: npm run media:index",
    ]
    (folder / "PHOTOS.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    data = json.loads(subprocess.check_output(["node", "--input-type=module", "-e", JS], cwd=ROOT))
    count = 0

    # Vary the cover ratio per folder so different shapes are visible.
    cover_shapes = [
        (1200, 1500, "4:5 portrait"),
        (1200, 1200, "1:1 square"),
        (1600, 900, "16:9 wide"),
        (900, 1200, "3:4 tall"),
    ]

    for index, slug in enumerate(data["categories"]):
        folder = MEDIA / "categories" / slug
        cw, ch, shape = cover_shapes[index % len(cover_shapes)]
        cover = f"cover-{cw}x{ch}.png"
        gallery = [
            ("01-detail-800x1000.png", "close-up / detail shot (4:5)"),
            ("02-arrangement-1000x800.png", "flat-lay / arrangement (wide)"),
            ("03-packaging-800x800.png", "packaging shot (square)"),
        ]
        a, b = colours(index)
        png(folder / cover, cw // 10, ch // 10, a, b)
        for name, _ in gallery:
            w, h = int(name.split("-")[-1].split("x")[0]), int(name.split("-")[-1].split("x")[1].split(".")[0])
            png(folder / "gallery" / name, w // 10, h // 10, b, a)
        photos_txt(folder, slug, "categories", [(cover, f"main category photo ({shape})")] + gallery)
        count += 1

    product_files = [
        ("01-front-800x800.png", "front / primary product photo (1:1)"),
        ("02-detail-1000x750.png", "close-up of the product (wide)"),
        ("03-packaging-800x1000.png", "gift wrapping / packaging (tall)"),
        ("04-lifestyle-1200x800.png", "in-use / lifestyle shot (wide)"),
    ]

    for index, slug in enumerate(data["products"]):
        folder = MEDIA / "products" / slug
        a, b = colours(index + 2)
        for name, _ in product_files:
            raw = name.split("-")[-1]
            w, h = int(raw.split("x")[0]), int(raw.split("x")[1].split(".")[0])
            png(folder / name, w // 10, h // 10, a, b)
        photos_txt(folder, slug, "products", product_files)
        count += 1

    print(f"Created {count} demo folders with 4 photos + PHOTOS.txt each.")


if __name__ == "__main__":
    main()
