import { Link, useParams } from 'react-router-dom';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import {
  findCategoryNode, getCategoryPath, isCategoryVisible, isAlcoholCategory,
} from '../data/navigation.js';
import { productsForCategory } from '../data/products.js';
import { useFeatures } from '../context/FeaturesContext.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import ImagePlaceholder from '../components/ui/ImagePlaceholder.jsx';
import ProductCard from '../components/ui/ProductCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';

/** Listing page for every slug in src/data/navigation.js. */
export default function CategoryPage() {
  const { slug } = useParams();
  const { features, ageConfirmed, requestAgeGate } = useFeatures();
  const node = findCategoryNode(slug);

  if (!node || !isCategoryVisible(slug, features)) {
    return (
      <div className="section-shell py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">This collection isn’t available</h1>
        <p className="mt-3 text-sm text-ink/60">It may be coming soon, or hidden behind a feature flag.</p>
        <Link to="/" className="btn-primary mt-7">Back to the homepage</Link>
      </div>
    );
  }

  const path = getCategoryPath(slug);
  const products = productsForCategory(slug);
  const children = node.children || [];
  const locked = isAlcoholCategory(slug) && !ageConfirmed;

  return (
    <div className="section-shell py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, ...path.map((item) => ({ label: item.label, href: item.href }))]} />

      <header className="mt-8 max-w-3xl">
        {path.length > 1 && <p className="eyebrow">{path[path.length - 2].label}</p>}
        <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{node.label}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
          Explore our {node.label.toLowerCase()} collection — thoughtfully chosen gifts, beautifully packed and ready to make someone’s day.
        </p>
        {!locked && <p className="mt-3 text-xs tracking-wide text-ink/45">{products.length} gifts in this collection</p>}
      </header>

      {!locked && (
        <Reveal className="mt-8">
          <ImagePlaceholder className="h-[220px] w-full rounded-xl shadow-soft sm:h-[300px] lg:h-[360px]" />
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-hidden="true">
            {Array.from({ length: 3 }, (_, index) => (
              <ImagePlaceholder key={index} className="aspect-[4/3] w-full rounded-lg ring-1 ring-gold/20" />
            ))}
          </div>
        </Reveal>
      )}

      {children.length > 0 && (
        <div className="scrollbar-hide -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {children.map((child) => (
            <Link
              key={child.slug}
              to={child.href}
              className="shrink-0 rounded-full border border-gold/35 bg-cream px-4 py-2 text-xs text-ink transition hover:border-gold hover:bg-gold hover:text-night"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        {locked ? (
          <Reveal className="rounded-xl border border-gold/30 bg-blush/30 p-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream">
              <Lock className="h-6 w-6 text-gold" strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-semibold">Adults only, please</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink/60">
              Confirm that you’re 21 or over to browse our Beer &amp; Wine Hampers.
            </p>
            <button type="button" onClick={requestAgeGate} className="btn-primary mt-6">Confirm my age <ArrowRight className="h-4 w-4" /></button>
          </Reveal>
        ) : products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink/15 p-10 text-center text-sm text-ink/55">
            No gifts here just yet — try one of the collections above.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 50}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {!locked && (
        <div className="mt-14 flex flex-col items-center gap-3 rounded-xl bg-blush/40 p-8 text-center sm:p-10">
          <Sparkles className="h-5 w-5 text-gold" />
          <h2 className="font-serif text-2xl font-semibold">Can’t find the one?</h2>
          <p className="max-w-md text-sm text-ink/60">Our Customize Gifts collection lets you put your own stamp on something truly special.</p>
          <Link to="/categories/customize-gifts" className="btn-primary mt-2">Explore Customize Gifts <ArrowRight className="h-4 w-4" /></Link>
        </div>
      )}
    </div>
  );
}
