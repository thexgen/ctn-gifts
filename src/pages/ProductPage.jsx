import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Lock, ArrowRight, Sparkles, Minus, Plus } from 'lucide-react';
import { getProductBySlug, productsForCategory } from '../data/products.js';
import { findCategoryNode, getCategoryPath, isAlcoholCategory } from '../data/navigation.js';
import { useCart } from '../context/CartContext.jsx';
import { useFeatures } from '../context/FeaturesContext.jsx';
import { formatPrice } from '../config/brand.js';
import { isCustomizationValid, missingRequiredFields } from '../utils/customization.js';
import { getGallery, getProductMedia, resolveMedia } from '../lib/media.js';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import CustomizeForm from '../components/ui/CustomizeForm.jsx';
import MediaImage from '../components/ui/MediaImage.jsx';
import ProductCard from '../components/ui/ProductCard.jsx';
import Rating from '../components/ui/Rating.jsx';
import Reveal from '../components/ui/Reveal.jsx';

const initialValues = (product) => Object.fromEntries(
  (product?.customFields || []).map((field) => [
    field.key,
    field.default ?? (field.type === 'photos' ? [] : ''),
  ])
);

/** Product detail with schema-driven CustomizeForm and live preview. */
export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { ageConfirmed, requestAgeGate } = useFeatures();

  const [values, setValues] = useState(() => initialValues(product));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setValues(initialValues(product));
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.slug]);

  if (!product) {
    return (
      <div className="section-shell py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">We couldn’t find that gift</h1>
        <p className="mt-3 text-sm text-ink/60">It may have been moved or renamed.</p>
        <Link to="/" className="btn-primary mt-7">Back to the homepage</Link>
      </div>
    );
  }

  const categorySlug = product.categories?.[0] || product.tags?.find((tag) => findCategoryNode(tag)) || 'more';
  const categoryPath = getCategoryPath(categorySlug);
  const isWished = wishlist.some((item) => item.id === product.id);
  const valid = isCustomizationValid(product, values);
  const missing = missingRequiredFields(product.customFields, values);
  const locked = (product.requiresAgeGate || isAlcoholCategory(categorySlug)) && !ageConfirmed;
  const related = productsForCategory(categorySlug).filter((item) => item.id !== product.id).slice(0, 4);
  const mediaEntry = getProductMedia(product.slug);
  const mainMedia = resolveMedia({
    entry: mediaEntry,
    fallback: { src: product.image, width: 700, height: 700, alt: product.name },
  });
  const gallery = getGallery(mediaEntry);

  const handleAddToCart = () => {
    if (locked) { requestAgeGate(); return; }
    if (!valid || product.soldOut) return;
    addToCart(product, quantity, {
      customization: product.customizable ? values : null,
      deliverySlot: values.deliverySlot || null,
    });
  };

  return (
    <div className="section-shell py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          ...categoryPath.map((item) => ({ label: item.label, href: item.href })),
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Image */}
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-blush/40 shadow-soft">
            <MediaImage
              media={mainMedia}
              alt={product.name}
              fill
              fit="contain"
              className="h-full w-full rounded-xl"
              priority
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-night/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
                {product.badge}
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              aria-pressed={isWished}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/95 text-ink shadow-soft transition hover:scale-110 hover:text-gold"
            >
              <Heart className={`h-4 w-4 ${isWished ? 'fill-gold text-gold' : ''}`} strokeWidth={1.7} />
            </button>
          </div>
          {gallery.length > 0 && (
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {gallery.slice(0, 4).map((photo) => (
                <li key={photo.src}>
                  <MediaImage
                    media={photo}
                    alt={`${product.name} — additional view`}
                    fill
                    fit="contain"
                    className="aspect-square w-full rounded-lg ring-1 ring-gold/20"
                  />
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* Details / purchase controls */}
        <Reveal delay={80}>
          <div className="lg:sticky lg:top-40">
            {categoryPath.length > 0 && <p className="eyebrow">{categoryPath[categoryPath.length - 1].label}</p>}
            <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-3"><Rating rating={product.rating} reviews={product.reviews} /></div>
            <p className="mt-4 flex items-center gap-3 text-xl font-semibold">
              {formatPrice(product.price)}
              {product.oldPrice && <span className="text-sm font-normal text-ink/40 line-through">{formatPrice(product.oldPrice)}</span>}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink/65">{product.description}</p>

            {product.customizable && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-blush/60 px-4 py-2 text-xs font-medium text-ink">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Made to order, just for you
              </p>
            )}
            {values.deliverySlot && (
              <p className="ml-2 mt-5 inline-flex rounded-full bg-night px-4 py-2 text-xs text-cream">{values.deliverySlot} delivery</p>
            )}

            {locked ? (
              <div className="mt-8 rounded-xl border border-gold/30 bg-blush/30 p-6 text-center">
                <Lock className="mx-auto h-6 w-6 text-gold" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-medium">Age confirmation required</p>
                <p className="mt-1 text-xs text-ink/55">Please confirm you’re 21 or over to purchase this gift.</p>
                <button type="button" onClick={requestAgeGate} className="btn-primary mt-4">Confirm my age</button>
              </div>
            ) : (
              <div className="mt-8 border-t border-ink/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-ink/15">
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      aria-label="Decrease quantity"
                      className="grid h-10 w-10 place-items-center rounded-full text-ink/60 hover:text-gold"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm" aria-live="polite">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => value + 1)}
                      aria-label="Increase quantity"
                      className="grid h-10 w-10 place-items-center rounded-full text-ink/60 hover:text-gold"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!valid || product.soldOut}
                    className="btn-primary flex-1 disabled:cursor-not-allowed disabled:bg-ink/30"
                  >
                    {product.soldOut ? 'Sold out' : 'Add to Cart'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {product.customizable && !valid && (
                  <p className="mt-3 text-xs text-red-700" role="status">
                    Please complete: {missing.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {product.customizable && !locked && (
        <div className="mt-14 border-t border-ink/10 pt-12">
          <CustomizeForm product={product} values={values} onChange={setValues} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-16 border-t border-ink/10 pt-12">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 50}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
