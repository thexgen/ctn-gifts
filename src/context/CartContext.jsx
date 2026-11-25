import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { brand } from '../config/brand.js';
import { customizationLineId } from '../utils/customization.js';

const CartContext = createContext(null);

/**
 * In-memory cart + wishlist state. Nothing is persisted to localStorage —
 * refreshing the page starts with a clean cart.
 * Each cart line has a `lineId`: the same product with different customisation
 * options becomes two separate lines.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product, quantity = 1, options = {}) => {
    const customization = options.customization || null;
    const lineId = customizationLineId(product, customization);
    const deliverySlot = options.deliverySlot || customization?.deliverySlot || null;

    setItems((current) => {
      const existing = current.find((item) => item.lineId === lineId);
      if (existing) {
        return current.map((item) =>
          item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { ...product, lineId, quantity, customization, deliverySlot }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((lineId) => {
    setItems((current) => current.filter((item) => item.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId, quantity) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.lineId !== lineId)
        : current.map((item) => (item.lineId === lineId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((current) => current.filter((item) => item.id !== id));
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const amountToFreeShipping = Math.max(0, brand.freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / brand.freeShippingThreshold) * 100);

  const value = useMemo(
    () => ({
      items, wishlist, isCartOpen, itemCount, subtotal, amountToFreeShipping,
      shippingProgress, addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, removeFromWishlist, openCart, closeCart,
    }),
    [
      items, wishlist, isCartOpen, itemCount, subtotal, amountToFreeShipping,
      shippingProgress, addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, removeFromWishlist, openCart, closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
}

export default CartContext;
