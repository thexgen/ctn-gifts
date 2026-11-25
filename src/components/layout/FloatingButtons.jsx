import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { brand } from '../../config/brand.js';

/** Animated WhatsApp shortcut + back-to-top control. */
export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
        className={`grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-cream text-ink shadow-lift transition-all duration-300 hover:bg-night hover:text-cream ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={1.6} />
      </button>
      <a
        href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent('Hi Giftora! I have a question about a gift.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        className="group grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle className="h-5.5 w-5.5" fill="currentColor" strokeWidth={1.2} />
        <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-full bg-night px-3 py-1.5 text-xs text-cream opacity-0 transition group-hover:opacity-100 sm:block">
          Need a hand? Chat with us
        </span>
      </a>
    </div>
  );
}
