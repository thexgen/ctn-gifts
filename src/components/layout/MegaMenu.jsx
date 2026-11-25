import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { brand } from '../../config/brand.js';
import { productsForCategory } from '../../data/products.js';

/**
 * Recursive link list. Headings are rendered by the parent column / group, so
 * a label never appears twice as both a heading and a link.
 */
function MenuLinks({ items = [], onNavigate, depth = 0 }) {
  if (!items.length) return null;

  return (
    <ul className={depth === 0 ? 'space-y-0.5' : 'mt-2 space-y-0.5 border-l border-gold/25 pl-3'}>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        return (
          <li key={item.slug}>
            {hasChildren ? (
              <div className="pt-1">
                <Link
                  to={item.href}
                  onClick={onNavigate}
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition hover:text-ink"
                >
                  {item.label}
                </Link>
                <MenuLinks items={item.children} onNavigate={onNavigate} depth={depth + 1} />
              </div>
            ) : (
              <Link
                to={item.href}
                onClick={onNavigate}
                className="group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[13px] leading-snug text-ink/70 transition hover:bg-blush/60 hover:text-gold"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0 text-gold opacity-0 transition group-hover:opacity-100" />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** One tidy column: clickable heading, a few useful links, and a "Shop all". */
function MenuColumn({ column, onNavigate }) {
  // Leaf columns (e.g. "For Him") show two gifts instead of repeating their name.
  const links = column.children?.length
    ? column.children
    : productsForCategory(column.slug).slice(0, 2).map((product) => ({
        label: product.name,
        slug: product.slug,
        href: `/products/${product.slug}`,
      }));

  return (
    <div className="w-[164px] shrink-0 xl:w-[176px]">
      <Link
        to={column.href}
        onClick={onNavigate}
        className="inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:text-gold"
      >
        {column.label || column.title}
      </Link>
      <div className="mt-3">
        <MenuLinks items={links} onNavigate={onNavigate} />
      </div>
      <Link
        to={column.href}
        onClick={onNavigate}
        className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-gold transition hover:gap-2 hover:text-ink"
      >
        Shop all <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

/** Compact hover panel, driven by the nav tree in src/data/navigation.js. */
export default function MegaMenu({ item, onNavigate }) {
  const columns = item.children?.length
    ? item.children
    : [{
        title: 'Popular in this collection',
        slug: item.slug,
        href: item.href,
        children: productsForCategory(item.slug).slice(0, 4).map((product) => ({
          label: product.name,
          slug: product.slug,
          href: `/products/${product.slug}`,
        })),
      }];

  return (
    <div className="absolute left-0 top-full z-40 w-[min(1180px,100%)] animate-fade-in">
      <div className="rounded-b-xl border border-t-0 border-ink/10 bg-cream p-6 shadow-lift sm:p-7">
        <div className="flex flex-wrap items-stretch gap-x-8 gap-y-6">
          <div className="flex min-w-0 flex-1 flex-wrap gap-x-8 gap-y-6">
            {columns.map((column) => (
              <MenuColumn key={column.slug || column.title} column={column} onNavigate={onNavigate} />
            ))}
          </div>

          {item.feature && (
            <Link
              to={item.href}
              onClick={onNavigate}
              className="group relative hidden min-h-[176px] w-[242px] shrink-0 flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-blush via-blush/60 to-cream p-5 ring-1 ring-gold/25 xl:flex"
            >
              <span className="absolute -right-7 -top-9 h-32 w-32 rounded-full border border-gold/30 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
              <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-cream/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                {item.feature.eyebrow}
              </span>
              <p className="relative mt-4 font-serif text-lg font-semibold leading-snug text-ink">
                {item.feature.title}
              </p>
              <span className="relative mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-night px-4 py-2 text-[11px] font-medium text-cream transition group-hover:bg-gold group-hover:text-night">
                Explore collection <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/5 pt-4">
          <p className="text-[10px] tracking-wide text-ink/40">
            Made with care by the {brand.name} studio
          </p>
          <Link
            to={item.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink/60 transition hover:text-gold"
          >
            View all {item.label} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
