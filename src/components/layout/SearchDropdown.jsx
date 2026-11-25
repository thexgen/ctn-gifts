import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Plus, Sparkles } from 'lucide-react';
import { allProducts } from '../../data/products.js';
import features from '../../config/features.js';
import { formatPrice } from '../../config/brand.js';
import { useCart } from '../../context/CartContext.jsx';

/** Quick search input with a client-side filter over the mock catalogue. */
export default function SearchDropdown({ onPick, autoFocus = false, className = '' }) {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return allProducts
      .filter((product) => product.name.toLowerCase().includes(term))
      .filter((product) => !product.requiresAgeGate || features.ALCOHOL_ENABLED)
      .slice(0, 5);
  }, [query]);

  const select = (product) => {
    if (product.customizable) {
      navigate(`/products/${product.slug}`);
    } else {
      addToCart(product);
    }
    setQuery('');
    onPick?.();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" strokeWidth={1.7} />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search gifts"
          placeholder="Search gifts"
          className="w-full rounded-full border border-gold/25 bg-cream/80 py-2.5 pl-11 pr-10 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:bg-cream focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink/40 hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-ink/5 bg-cream p-2 shadow-lift animate-fade-in">
          {results.length > 0 ? (
            <>
              <p className="px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Gifts for “{query.trim()}”
              </p>
              <ul>
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => select(product)}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-blush/50"
                    >
                      <img
                        src={product.image}
                        alt=""
                        width="44"
                        height="44"
                        loading="lazy"
                        className="h-11 w-11 shrink-0 rounded-md object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-ink">{product.name}</span>
                        <span className="text-xs text-gold">{formatPrice(product.price)}</span>
                      </span>
                      {product.customizable
                        ? <Sparkles className="h-4 w-4 shrink-0 text-gold" />
                        : <Plus className="h-4 w-4 shrink-0 text-ink/40" />}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="px-3 py-5 text-center text-sm text-ink/50">
              No gifts found. Try “hamper”, “box” or “pendant”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
