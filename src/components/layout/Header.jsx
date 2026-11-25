import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart, Menu, Package, Search, ShoppingBag, User, ArrowRight, Trash2, Plus,
} from 'lucide-react';
import { brand, formatPrice } from '../../config/brand.js';
import { visibleNavLinks } from '../../data/navigation.js';
import { useFeatures } from '../../context/FeaturesContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import MegaMenu from './MegaMenu.jsx';
import SearchDropdown from './SearchDropdown.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import Modal from '../ui/Modal.jsx';

/** Sticky two-row header with desktop mega menus and mobile drawer. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [utility, setUtility] = useState(null); // 'login' | 'track' | 'wishlist'
  const [notice, setNotice] = useState('');
  const { itemCount, wishlist, openCart, addToCart, removeFromWishlist } = useCart();
  const { features } = useFeatures();
  const navLinks = useMemo(() => visibleNavLinks(features), [features]);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeNavItem = useMemo(
    () => navLinks.find((item) => item.slug === openMenu),
    [openMenu]
  );

  const openUtility = (name) => {
    setNotice('');
    setUtility(name);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-ink/5 bg-cream/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-soft' : ''
        }`}
      >
        {/* Row 1 — logo, search, account icons */}
        <div className="section-shell flex items-center justify-between gap-3">
          <Link
            to="/"
            aria-label={`${brand.name} home`}
            className="flex shrink-0 items-center gap-2.5 py-2"
          >
            <span
              className={`grid place-items-center rounded-full border border-gold/70 font-serif text-gold transition-all duration-300 ${
                scrolled ? 'h-8 w-8 text-lg' : 'h-10 w-10 text-xl'
              }`}
            >
              {brand.shortName}
            </span>
            <span className="hidden sm:block">
              <span className={`block font-serif font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'}`}>
                {brand.name}
              </span>
              <span className="block text-[8px] font-medium tracking-[0.28em] text-gold">CURATED GIFTING</span>
            </span>
          </Link>

          <div className="mx-auto hidden w-full max-w-md lg:block">
            <SearchDropdown onPick={() => setOpenMenu(null)} />
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search gifts"
              className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 hover:text-gold lg:hidden"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => openUtility('login')}
              aria-label="Login"
              className="hidden h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 hover:text-gold sm:grid"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => openUtility('wishlist')}
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 hover:text-gold"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {wishlist.length > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-night">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => openUtility('track')}
              aria-label="Track order"
              className="hidden h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 hover:text-gold sm:grid"
            >
              <Package className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart, ${itemCount} items`}
              className="relative grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 hover:text-gold"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-night">
                {itemCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-ink/5 hover:text-gold lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {/* Row 2 — desktop navigation with hover mega menus */}
        <nav
          aria-label="Main navigation"
          onMouseLeave={() => setOpenMenu(null)}
          className="relative hidden border-t border-ink/5 lg:block"
        >
          <ul className="section-shell flex items-center justify-between gap-1">
            {navLinks.map((item) => {
              const hasPanel = Boolean(item.children?.length || item.feature);
              const isOpen = openMenu === item.slug;
              return (
                <li key={item.label}>
                  {hasPanel ? (
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onMouseEnter={() => setOpenMenu(item.slug)}
                      onFocus={() => setOpenMenu(item.slug)}
                      onClick={() => setOpenMenu(isOpen ? null : item.slug)}
                      className={`whitespace-nowrap px-1 py-3 text-[12px] font-medium tracking-wide transition-colors xl:text-[13px] ${
                        isOpen ? 'text-gold' : 'text-ink/75 hover:text-gold'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onMouseEnter={() => setOpenMenu(null)}
                      onFocus={() => setOpenMenu(null)}
                      className="block whitespace-nowrap px-1 py-3 text-[12px] font-medium tracking-wide text-ink/75 transition-colors hover:text-gold xl:text-[13px]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          {activeNavItem && (
            <div className="section-shell relative">
              <MegaMenu item={activeNavItem} onNavigate={() => setOpenMenu(null)} />
            </div>
          )}
        </nav>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile quick search */}
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search gifts" size="lg">
        <SearchDropdown autoFocus onPick={() => setSearchOpen(false)} />
        <p className="mt-4 text-center text-xs text-ink/45">Tap a result to add it to your cart.</p>
      </Modal>

      {/* Account / tracking / wishlist utilities (demo only) */}
      <Modal open={utility === 'login'} onClose={() => setUtility(null)} title="Welcome back" size="sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNotice('Demo storefront — no account was created.');
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-ink/70">Email</label>
            <input id="login-email" type="email" required placeholder="you@example.com" className="w-full rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium text-ink/70">Password</label>
            <input id="login-password" type="password" required placeholder="••••••••" className="w-full rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-gold focus:outline-none" />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In <ArrowRight className="h-4 w-4" /></button>
          {notice && <p className="text-center text-xs text-gold" role="status">{notice}</p>}
        </form>
      </Modal>

      <Modal open={utility === 'track'} onClose={() => setUtility(null)} title="Track your order" size="sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNotice('Demo storefront — live tracking needs a backend connection.');
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="track-id" className="mb-1.5 block text-xs font-medium text-ink/70">Order number</label>
            <input id="track-id" required placeholder="e.g. GFT-10245" className="w-full rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-gold focus:outline-none" />
          </div>
          <div>
            <label htmlFor="track-email" className="mb-1.5 block text-xs font-medium text-ink/70">Email used at checkout</label>
            <input id="track-email" type="email" required placeholder="you@example.com" className="w-full rounded-full border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-gold focus:outline-none" />
          </div>
          <button type="submit" className="btn-primary w-full">Track Order <ArrowRight className="h-4 w-4" /></button>
          {notice && <p className="text-center text-xs text-gold" role="status">{notice}</p>}
        </form>
      </Modal>

      <Modal open={utility === 'wishlist'} onClose={() => setUtility(null)} title="Your Wishlist" size="md">
        {wishlist.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink/55">Nothing saved yet. Tap the heart on any gift to keep it here.</p>
        ) : (
          <ul className="max-h-[60vh] space-y-4 overflow-y-auto">
            {wishlist.map((product) => (
              <li key={product.id} className="flex items-center gap-3">
                <img src={product.image} alt="" width="64" height="64" loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gold">{formatPrice(product.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { addToCart(product); setUtility(null); }}
                  aria-label={`Add ${product.name} to cart`}
                  className="grid h-8 w-8 place-items-center rounded-full bg-night text-cream transition hover:bg-gold hover:text-night"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="text-ink/35 transition hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
}
