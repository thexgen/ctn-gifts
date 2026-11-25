import { useState } from 'react';
import { X } from 'lucide-react';
import { brand } from '../../config/brand.js';

/** Small dismissible top bar. */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-night px-10 py-2 text-center text-[10px] font-medium tracking-[0.14em] text-cream/80 sm:text-[11px]">
      <p>
        For queries please call or WhatsApp{' '}
        <a href={`tel:${brand.phone}`} className="font-semibold text-cream underline-offset-2 hover:underline">
          {brand.phone}
        </a>
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-cream/70 transition hover:bg-cream/10 hover:text-cream sm:right-4"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
