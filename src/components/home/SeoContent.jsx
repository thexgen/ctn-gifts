import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { knowMore, faqs } from '../../data/products.js';
import Accordion from '../ui/Accordion.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Collapsible SEO copy followed by a FAQ accordion. */
export default function SeoContent() {
  const [knowOpen, setKnowOpen] = useState(false);
  const faqItems = faqs.map((item, index) => ({ id: `faq-${index}`, title: item.q, content: item.a }));

  return (
    <section id="know-more" className="section-shell pb-16 pt-8 sm:pb-20">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-ink/10 bg-cream">
        <button
          type="button"
          onClick={() => setKnowOpen((open) => !open)}
          aria-expanded={knowOpen}
          aria-controls="know-more-content"
          className="flex w-full items-center justify-center gap-3 px-6 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:text-gold"
        >
          Know More
          <ChevronDown className={`h-4 w-4 text-gold transition-transform duration-300 ${knowOpen ? 'rotate-180' : ''}`} />
        </button>
        <div id="know-more-content" hidden={!knowOpen} className="border-t border-ink/10 px-6 py-8 sm:px-10 sm:py-10 animate-fade-in">
          <div className="space-y-9">
            {knowMore.map((section) => (
              <div key={section.heading}>
                <h3 className="font-serif text-xl font-semibold sm:text-2xl">{section.heading}</h3>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 30)} className="text-sm leading-relaxed text-ink/65">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="faq" className="mx-auto mt-14 max-w-3xl sm:mt-16">
        <SectionHeader title="Good to Know" subtitle="Answers to the questions we hear most often." />
        <Reveal className="mt-8 rounded-xl border border-ink/10 bg-cream px-5 py-2 sm:px-8">
          <Accordion items={faqItems} />
        </Reveal>
      </div>
    </section>
  );
}
