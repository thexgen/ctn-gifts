import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { curated } from '../../data/products.js';
import Carousel from '../ui/Carousel.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx';

/** Four-up image carousel of curated collections. */
export default function CuratedGifts() {
  return (
    <section id="curated" className="section-shell py-16 sm:py-20 lg:py-24">
      <SectionHeader
        eyebrow="Handpicked for you"
        title="Curated Gifts"
        subtitle="Little treasures, beautifully gathered — each one chosen for the joy it brings."
      />
      <Reveal delay={100} className="mt-10 sm:mt-12">
        <div className="px-1 sm:px-5">
          <Carousel
            items={curated}
            ariaLabel="Curated gifts"
            itemClassName="w-[72%] sm:w-[46%] lg:w-[23.5%]"
            renderItem={(item) => (
              <Link to={item.href} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-blush/30">
                  <ImagePlaceholder className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition group-hover:text-gold">
                    {item.title}
                  </p>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold opacity-0 transition group-hover:opacity-100" />
                </div>
              </Link>
            )}
          />
        </div>
      </Reveal>
    </section>
  );
}
