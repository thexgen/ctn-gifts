import { Star } from 'lucide-react';

/** Five-star rating with a screen-reader label and optional review count. */
export default function Rating({ rating = 5, reviews = 0, showCount = true }) {
  const rounded = Math.round(rating);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`h-3.5 w-3.5 ${
              index < rounded ? 'fill-gold text-gold' : 'fill-transparent text-gold/40'
            }`}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="sr-only">Rated {rating} out of 5 stars</span>
      {showCount && Number.isFinite(reviews) && (
        <span className="text-[11px] text-ink/45">({reviews})</span>
      )}
    </div>
  );
}
