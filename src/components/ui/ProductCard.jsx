import { Link } from 'react-router-dom';
import { Heart, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatPrice } from '../../config/brand.js';
import { getProductCardMedia, resolveMedia } from '../../lib/media.js';
import MediaImage from './MediaImage.jsx';
import Rating from './Rating.jsx';

/**
 * Shared product card used by the homepage tabs and category pages.
 * Customisable products route to their product page; simple products add
 * straight to the cart. Touch devices always show the action button.
 */
export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWished = wishlist.some((item) => item.id === product.id);
  const productUrl = `/products/${product.slug}`;
  const media = resolveMedia({
    entry: getProductCardMedia(product.slug),
    fallback: { src: product.image, width: 700, height: 700, alt: product.name },
  });
  const cartProduct = { ...product, image: media?.thumbnail?.src || media?.src || product.image };

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-blush/40">
        <Link to={productUrl} aria-label={`View ${product.name}`} className="block h-full w-full">
          <MediaImage
            media={media}
            alt={product.name}
            fill
            thumbnail
            className="h-full w-full"
            imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badge && !product.soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-night/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-night/45 backdrop-blur-[1px]">
            <span className="rounded-full bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink">
              Sold out
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream/95 text-ink shadow-soft transition hover:scale-110 hover:text-gold"
        >
          <Heart className={`h-4 w-4 ${isWished ? 'fill-gold text-gold' : ''}`} strokeWidth={1.7} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-300 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          {product.customizable ? (
            <Link
              to={productUrl}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-night/95 px-4 py-2.5 text-xs font-medium tracking-wide text-cream shadow-lift backdrop-blur-sm transition hover:bg-gold hover:text-night"
            >
              <Sparkles className="h-3.5 w-3.5" /> Customise
            </Link>
          ) : (
            <button
              type="button"
              disabled={product.soldOut}
              onClick={() => addToCart(cartProduct)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-night/95 px-4 py-2.5 text-xs font-medium tracking-wide text-cream shadow-lift backdrop-blur-sm transition hover:bg-gold hover:text-night disabled:cursor-not-allowed disabled:bg-night/70"
            >
              {product.soldOut ? <ShoppingBag className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {product.soldOut ? 'Sold out' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center pt-4 text-center">
        <Link to={productUrl} className="line-clamp-2 text-sm font-medium leading-snug text-ink hover:text-gold">
          {product.name}
        </Link>
        <div className="mt-1.5">
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-ink/40 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
