import { Quote } from 'lucide-react';
import { testimonials } from '../../data/products.js';
import Carousel from '../ui/Carousel.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Customer testimonial carousel — arrows + dots, no autoplay. */
export default function Testimonials() {
  return (
    <section id="testimonials" className="section-shell py-16 sm:py-20">
      <SectionHeader
        title="Words Of Acclaim"
        subtitle="Celebrated voices echo their admiration for the Giftora gifting experience."
      />
      <Reveal delay={100} className="mt-10">
        <div className="px-1 sm:px-5">
          <Carousel
            items={testimonials}
            ariaLabel="Customer testimonials"
            itemClassName="w-[86%] sm:w-[48%] lg:w-[32.5%]"
            dotCount={4}
            showDots
            renderItem={(item) => (
              <figure className="flex h-full min-h-[240px] flex-col rounded-xl bg-night p-6 text-cream shadow-soft sm:p-8">
                <Quote className="h-9 w-9 fill-gold/90 text-gold/90" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/80">“{item.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-cream/10 pt-4">
                  <p className="text-sm font-semibold text-gold">{item.name}</p>
                  <p className="mt-0.5 text-[11px] text-cream/45">{item.city}</p>
                </figcaption>
              </figure>
            )}
          />
        </div>
      </Reveal>
    </section>
  );
}
