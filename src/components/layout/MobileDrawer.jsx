import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Heart, MapPin, Package, ShoppingBag, User } from 'lucide-react';
import Drawer from '../ui/Drawer.jsx';
import { brand } from '../../config/brand.js';
import { visibleNavLinks } from '../../data/navigation.js';
import { useFeatures } from '../../context/FeaturesContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

/** Recursive accordion branch for the slide-in navigation. */
function NavBranch({ items, depth = 0, onNavigate }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <ul className={depth === 0 ? 'divide-y divide-ink/10' : 'space-y-1 border-l border-gold/25 pl-3 py-1'}>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = expanded === item.slug;
        return (
          <li key={item.slug}>
            <div className={`flex items-center justify-between gap-2 ${depth === 0 ? 'py-3.5' : 'py-2'}`}>
              <Link
                to={item.href}
                onClick={onNavigate}
                className={`flex-1 text-left text-sm transition hover:text-gold ${
                  depth === 0 ? 'font-medium text-ink' : 'text-ink/60'
                }`}
              >
                {item.label}
              </Link>
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : item.slug)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-gold transition hover:bg-gold/10"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
            {hasChildren && isOpen && (
              <div className="animate-fade-in">
                <NavBranch items={item.children} depth={depth + 1} onNavigate={onNavigate} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Slide-in navigation for small screens with nested accordion sub-menus. */
export default function MobileDrawer({ open, onClose }) {
  const { features } = useFeatures();
  const { itemCount, wishlist, openCart } = useCart();
  const links = visibleNavLinks(features);

  return (
    <Drawer open={open} onClose={onClose} side="left" title="Menu" width="max-w-[340px]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-ink/10 px-5 py-5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 font-serif text-lg text-gold">
            {brand.shortName}
          </span>
          <div>
            <p className="font-serif text-lg font-semibold tracking-wide">{brand.name}</p>
            <p className="text-[10px] tracking-widest text-ink/45">CURATED GIFTING</p>
          </div>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-4">
          <NavBranch items={links} onNavigate={onClose} />
        </nav>

        <div className="border-t border-ink/10 p-5">
          <p className="mb-3 flex items-center gap-2 text-xs text-ink/55">
            <MapPin className="h-3.5 w-3.5 text-gold" /> Delivering to {brand.location}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: User, label: 'Login' },
              { icon: Heart, label: `Wishlist${wishlist.length ? ` (${wishlist.length})` : ''}` },
              { icon: Package, label: 'Track' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={onClose}
                className="flex flex-col items-center gap-1 rounded-lg border border-ink/10 py-3 text-[10px] text-ink/70 transition hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => { onClose(); openCart(); }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-night py-3 text-sm font-medium text-cream"
          >
            <ShoppingBag className="h-4 w-4" /> View cart {itemCount > 0 && `(${itemCount})`}
          </button>
        </div>
      </div>
    </Drawer>
  );
}
