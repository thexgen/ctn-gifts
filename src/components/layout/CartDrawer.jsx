import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck, Check, Sparkles } from 'lucide-react';
import Drawer from '../ui/Drawer.jsx';
import Modal from '../ui/Modal.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { brand, formatPrice } from '../../config/brand.js';
import { formatCustomization } from '../../utils/customization.js';

/** Customisation rows + thumbnails shared by cart lines and checkout. */
function CustomizationDetails({ item }) {
  const rows = formatCustomization(item, item.customization);
  if (!rows.length && !item.deliverySlot) return null;
  return (
    <details className="mt-2 text-xs">
      <summary className="inline-flex cursor-pointer items-center gap-1 font-medium text-gold">
        <Sparkles className="h-3 w-3" /> Customisation details
      </summary>
      <dl className="mt-2 space-y-1 rounded-lg bg-blush/40 p-2.5">
        {item.deliverySlot && (
          <div className="flex justify-between gap-2">
            <dt className="text-ink/55">Delivery slot</dt><dd className="text-right font-medium">{item.deliverySlot}</dd>
          </div>
        )}
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-2">
            <dt className="shrink-0 text-ink/55">{row.label}</dt>
            <dd className="break-words text-right font-medium">{row.value}</dd>
            {row.photos?.length > 0 && (
              <div className="col-span-2 mt-1 flex flex-wrap gap-1">
                {row.photos.slice(0, 6).map((photo) => (
                  <img key={photo.id} src={photo.dataUrl} alt="" className="h-8 w-8 rounded object-cover" />
                ))}
                {row.photos.length > 6 && <span className="self-center text-ink/45">+{row.photos.length - 6} more</span>}
              </div>
            )}
          </div>
        ))}
      </dl>
    </details>
  );
}

/** Right-side cart with quantity controls, coupon, shipping progress + checkout. */
export default function CartDrawer() {
  const {
    items, isCartOpen, closeCart, itemCount, subtotal, amountToFreeShipping,
    shippingProgress, updateQuantity, removeFromCart, clearCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const applyCoupon = () => {
    if (couponInput.trim().toUpperCase() === brand.couponCode) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError(`Try ${brand.couponCode} for a surprise.`);
    }
  };

  const discount = couponApplied ? Math.round(subtotal * (brand.couponPercent / 100)) : 0;
  const total = Math.max(0, subtotal - discount);

  const openCheckout = () => {
    if (items.length === 0) return;
    closeCart();
    setCheckoutOpen(true);
  };

  const placeOrder = () => {
    clearCart();
    setCouponApplied(false);
    setCouponInput('');
    setCheckoutOpen(false);
    window.alert('This is a demo checkout. Your order would be placed here.');
  };

  return (
    <>
      <Drawer open={isCartOpen} onClose={closeCart} side="right" title={`Your Cart${itemCount ? ` (${itemCount})` : ''}`}>
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-blush/60">
              <ShoppingBag className="h-8 w-8 text-gold" strokeWidth={1.3} />
            </div>
            <h3 className="mt-6 font-serif text-2xl font-semibold">Your cart is feeling light</h3>
            <p className="mt-2 text-sm text-ink/55">
              There are beautiful gifts waiting to be discovered. Let’s find one for someone special.
            </p>
            <button type="button" onClick={closeCart} className="btn-primary mt-7">Continue Shopping</button>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            {/* Free shipping progress */}
            <div className="border-b border-ink/5 bg-blush/30 px-5 py-4 sm:px-6">
              <p className="flex items-center gap-2 text-xs text-ink/75">
                <Truck className="h-4 w-4 text-gold" strokeWidth={1.6} />
                {amountToFreeShipping > 0 ? (
                  <>You’re <strong className="font-semibold">{formatPrice(amountToFreeShipping)}</strong> away from free shipping</>
                ) : (
                  <span className="flex items-center gap-1 font-medium text-ink">
                    <Check className="h-4 w-4 text-gold" /> You’ve unlocked free shipping!
                  </span>
                )}
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
              </div>
            </div>

            {/* Line items */}
            <ul className="flex-1 divide-y divide-ink/5 overflow-y-auto px-5 sm:px-6">
              {items.map((item) => (
                <li key={item.lineId} className="flex gap-4 py-5">
                  <img src={item.image} alt={item.name} width="80" height="80" loading="lazy" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium leading-snug">{item.name}</h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.lineId)}
                        aria-label={`Remove ${item.name}`}
                        className="text-ink/35 transition hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-gold">{formatPrice(item.price)}</p>
                    <CustomizationDetails item={item} />
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:text-gold"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm" aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:text-gold"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-ink/50">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Coupon + totals */}
            <div className="shrink-0 border-t border-ink/10 bg-cream px-5 py-5 sm:px-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(event) => { setCouponInput(event.target.value); setCouponError(''); }}
                    onKeyDown={(event) => event.key === 'Enter' && applyCoupon()}
                    placeholder="Coupon code"
                    aria-label="Coupon code"
                    className="w-full rounded-full border border-ink/15 bg-cream py-2.5 pl-9 pr-3 text-sm placeholder:text-ink/40 focus:border-gold focus:outline-none"
                  />
                </div>
                <button type="button" onClick={applyCoupon} className="rounded-full border border-gold/60 px-4 text-xs font-medium text-ink transition hover:bg-gold hover:text-night">
                  Apply
                </button>
              </div>
              {couponError && <p className="mt-1.5 text-[11px] text-red-700">{couponError}</p>}
              {couponApplied && <p className="mt-1.5 text-[11px] text-green-700">Coupon applied — {brand.couponPercent}% off!</p>}

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-ink/65"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                {couponApplied && (
                  <div className="flex justify-between text-green-700"><dt>Discount ({brand.couponPercent}%)</dt><dd>− {formatPrice(discount)}</dd></div>
                )}
                <div className="flex justify-between text-ink/65">
                  <dt>Shipping</dt><dd>{amountToFreeShipping > 0 ? 'Calculated at checkout' : 'Free'}</dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>

              <button type="button" onClick={openCheckout} className="btn-primary mt-5 w-full">
                Checkout · {formatPrice(total)}
              </button>
              <p className="mt-3 text-center text-[10px] text-ink/40">Taxes included · Secure checkout demo</p>
            </div>
          </div>
        )}
      </Drawer>

      {/* Checkout summary — includes every saved customisation */}
      <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} title="Checkout summary" size="lg">
        <ul className="max-h-[45vh] space-y-4 overflow-y-auto pr-1">
          {items.map((item) => (
            <li key={item.lineId} className="flex gap-3 border-b border-ink/10 pb-4">
              <img src={item.image} alt="" width="64" height="64" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <p className="text-sm font-medium">{item.name} <span className="text-ink/40">× {item.quantity}</span></p>
                  <p className="text-sm font-semibold text-gold">{formatPrice(item.price * item.quantity)}</p>
                </div>
                <CustomizationDetails item={item} />
              </div>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between text-ink/65"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          {couponApplied && <div className="flex justify-between text-green-700"><dt>Discount</dt><dd>− {formatPrice(discount)}</dd></div>}
          <div className="flex justify-between text-ink/65"><dt>Shipping</dt><dd>{amountToFreeShipping > 0 ? 'Calculated at checkout' : 'Free'}</dd></div>
          <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold"><dt>Order total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        <button type="button" onClick={placeOrder} className="btn-primary mt-5 w-full">Place Demo Order</button>
      </Modal>
    </>
  );
}
