import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/** Slide-in drawer from the left or right, with overlay + Escape support. */
export default function Drawer({ open, onClose, side = 'right', title, children, width = 'max-w-md' }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[95]">
      <div
        className="absolute inset-0 bg-night/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute inset-y-0 flex w-full ${width} flex-col bg-cream shadow-lift outline-none ${
          side === 'right' ? 'right-0 animate-slide-in-right' : 'left-0 animate-slide-in-left'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
          <h2 className="font-serif text-xl font-semibold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="grid h-9 w-9 place-items-center rounded-full text-ink/60 transition hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>,
    document.body
  );
}
