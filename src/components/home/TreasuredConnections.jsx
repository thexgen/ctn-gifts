import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { connections } from '../../data/products.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Five image cards linking to "shop by recipient" collections. */
export default function TreasuredConnections() {
  return (
    <section id="treasured" className="section-shell py-16 sm:py-20">
      <SectionHeader title="Treasured Connections" subtitle="Thoughtful gifts for every special person" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
        {connections.map((item, index) => (
          <Reveal key={item.id} delay={index * 70}>
            <article className="group">
              <Link to={item.href} className="block">
                <div className="aspect-square overflow-hidden rounded-lg bg-blush/30">
                  <img
                    src={item.image}
                    alt={item.label}
                    width="600"
                    height="600"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="font-serif text-base font-semibold sm:text-lg">{item.label}</h3>
                <Link
                  to={item.href}
                  aria-label={`Buy now for ${item.label}`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-night text-cream transition hover:scale-110 hover:bg-gold hover:text-night"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink/40">Buy Now</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
