import { useState } from 'react';
import { bestSellerTabs } from '../../data/products.js';
import SectionHeader from '../ui/SectionHeader.jsx';
import Tabs from '../ui/Tabs.jsx';
import ProductCard from '../ui/ProductCard.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Tabbed best-seller product grid. */
export default function BestSellers() {
  const [active, setActive] = useState(bestSellerTabs[0].id);
  const tab = bestSellerTabs.find((item) => item.id === active) ?? bestSellerTabs[0];

  return (
    <section id="best-sellers" className="section-shell py-16 sm:py-20">
      <SectionHeader
        title="Best Sellers"
        subtitle="Discover timeless treasures that captivate hearts and delight senses."
      />
      <Reveal className="mx-auto mt-9 max-w-3xl">
        <Tabs tabs={bestSellerTabs} active={active} onChange={setActive} />
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
        <a href="#signature" className="btn-primary">View All</a>
      </div>
    </section>
  );
}
