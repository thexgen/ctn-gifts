import { ArrowUpRight } from 'lucide-react';
import { limitedEdition } from '../../data/products.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx';

/** Dark showcase of four designer collabs in alternating split cards. */
export default function LimitedEdition() {
  return (
    <section id="limited-edition" className="mt-8 bg-night py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Designer collaborations"
          title="Limited Edition"
          subtitle="Extraordinary minds, reimagined as gifts you will never forget."
          light
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {limitedEdition.map((item, index) => {
            const reverse = index % 2 === 1;
            return (
              <Reveal key={item.id} delay={index * 80}>
                <article className="group grid overflow-hidden rounded-xl bg-cream/[0.06] ring-1 ring-cream/10 transition duration-500 hover:ring-gold/40 sm:grid-cols-2">
                  <div className={`relative aspect-[4/5] overflow-hidden ${reverse ? 'sm:order-2' : ''}`}>
                    <ImagePlaceholder className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 h-20 w-20 overflow-hidden rounded-lg ring-2 ring-cream shadow-lift">
                      <ImagePlaceholder className="h-full w-full" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-9">
                    <p className="eyebrow">{item.line}</p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold text-cream">{item.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-cream/60">{item.description}</p>
                    <a
                      href="#best-sellers"
                      className="mt-7 inline-flex w-fit items-center gap-2 border-b border-gold/70 pb-1 text-sm font-medium text-gold transition hover:gap-3 hover:text-cream"
                    >
                      Shop Now <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
