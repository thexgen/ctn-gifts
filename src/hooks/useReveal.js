import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based scroll reveal.
 * Returns [ref, isVisible]; the element gets `is-visible` once it enters view.
 */
export function useReveal(options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px', once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Graceful fallback for older browsers / reduced-motion users.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export default useReveal;
