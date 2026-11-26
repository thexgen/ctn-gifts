import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/products.js';
import { getCategoryTileMedia, resolveMedia } from '../../lib/media.js';
import MediaImage from '../ui/MediaImage.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Horizontally scrollable row of circular category tiles. */
export default function CategoryTiles() {
  return (
    <section id="categories" aria-label="Shop by category" className="section-shell pt-8 sm:pt-12">
      <Reveal>
        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
          {categories.map((category, index) => {
            const media = resolveMedia({
              entry: getCategoryTileMedia(category.slug),
              fallback: { src: category.image, width: 300, height: 300, alt: category.label },
            });

            return (
              <Link
                key={category.id}
                to={category.href}
                className="group flex w-[110px] shrink-0 snap-start flex-col items-center text-center sm:w-auto"
              >
                <div className="relative">
                  <MediaImage
                    media={media}
                    alt={category.label}
                    thumbnail
                    className="h-[104px] w-[104px] rounded-full ring-1 ring-gold/35 transition-all duration-300 group-hover:ring-2 group-hover:ring-gold lg:h-[118px] lg:w-[118px]"
                    imageClassName="transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-gold/0 transition group-hover:bg-gold/10" aria-hidden="true" />
                </div>
                <span className="mt-3 flex items-center gap-1 text-[11px] font-medium leading-tight tracking-wide text-ink">
                  {category.label}
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-gold opacity-0 transition group-hover:opacity-100" />
                </span>
                <span className="mt-1 text-[9px] tracking-widest text-ink/35">
                  {String(index + 1).padStart(2, '0')} / 0{categories.length}
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
