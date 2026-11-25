import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Scroll-snap carousel. Cards get their responsive width from `itemClassName`,
 * so the same component works for 2-up mobile grids and 4-up desktop rows.
 */
export default function Carousel({
  items,
  renderItem,
  itemClassName = 'w-[78%] sm:w-[46%] lg:w-[23%]',
  dotCount,
  showDots = false,
  showArrows = true,
  ariaLabel = 'Carousel',
  className = '',
}) {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const dots = dotCount ?? Math.max(1, Math.ceil(items.length / 3));

  const scrollByPage = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const progress = max > 0 ? track.scrollLeft / max : 0;
    setActiveDot(Math.min(dots - 1, Math.round(progress * (dots - 1))));
  };

  return (
    <div className={`relative ${className}`}>
      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label={`Previous items in ${ariaLabel}`}
            className="absolute -left-1 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-cream text-ink shadow-soft transition hover:border-gold hover:bg-night hover:text-cream sm:-left-5 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label={`Next items in ${ariaLabel}`}
            className="absolute -right-1 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-cream text-ink shadow-soft transition hover:border-gold hover:bg-night hover:text-cream sm:-right-5 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </>
      )}

      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2 sm:gap-6 sm:px-2"
      >
        {items.map((item, index) => (
          <div key={item.id ?? index} className={`shrink-0 snap-start ${itemClassName}`}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {showDots && (
        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label={`${ariaLabel} pages`}>
          {Array.from({ length: dots }, (_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeDot === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const max = track.scrollWidth - track.clientWidth;
                track.scrollTo({ left: (max * index) / (dots - 1 || 1), behavior: 'smooth' });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeDot === index ? 'w-7 bg-gold' : 'w-2 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
