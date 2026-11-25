import { useState } from 'react';
import { signatureTabs } from '../../data/products.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Tabs from '../ui/Tabs.jsx';
import ProductCard from '../ui/ProductCard.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Tabbed signature product grid — reuses the Best Sellers pattern. */
export default function SignaturePicks() {
  const [active, setActive] = useState(signatureTabs[0].id);
  const tab = signatureTabs.find((item) => item.id === active) ?? signatureTabs[0];

  return (
    <section id="signature" className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="The Signature Edit"
        title="Signature Picks"
        subtitle="Luxury hampers designed to celebrate every special connection."
      />
      <Reveal className="mx-auto mt-9 max-w-2xl">
        <Tabs tabs={signatureTabs} active={active} onChange={setActive} />
      </Reveal>

      <div
        key={tab.id}
        id={`panel-${tab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab.id}`}
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
      >
        {tab.products.map((product, index) => (
          <Reveal key={product.id} delay={index * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="#best-sellers" className="btn-primary">View All</a>
      </div>
    </section>
  );
}
