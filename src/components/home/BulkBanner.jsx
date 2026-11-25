import { ArrowRight } from 'lucide-react';
import { banners } from '../../data/products.js';
import Reveal from '../ui/Reveal.jsx';

/** Corporate / bulk-order enquiry banner (image on the right for variety). */
export default function BulkBanner() {
  const { eyebrow, title, text, cta, image } = banners.bulk;

  return (
    <section id="bulk" className="section-shell py-8 sm:py-10">
      <Reveal>
        <div className="grid overflow-hidden rounded-xl bg-cream ring-1 ring-gold/25 shadow-soft md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base">{text}</p>
            <a href="#footer" className="btn-primary mt-8 w-fit">{cta} <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="relative min-h-[260px] order-first md:order-last md:min-h-[420px]">
            <img src={image} alt="A beautifully arranged bulk gift hamper" width="1000" height="800" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
