import { Sparkles } from 'lucide-react';
import { collectPhotos } from '../../utils/customization.js';

const colourMap = {
  Ivory: '#F5EFE4', Blush: '#F3D9D9', Charcoal: '#33323A', Maroon: '#3A2328', Sage: '#A8B5A0',
};

const coverClasses = {
  'Classic Ivory': 'from-[#f6efe2] to-[#e8d9bd] text-ink',
  'Blush Linen': 'from-blush to-[#f7e7e2] text-ink',
  'Midnight Gold': 'from-night to-[#3a2f45] text-cream',
  'Floral Charm': 'from-[#f6e3e6] to-[#e8d3c5] text-ink',
};

/** Live mock-up of the customised product, driven by the current field values. */
export default function CustomizePreview({ product, values }) {
  const photos = collectPhotos(values);
  const title = values.coupleNames || values.name || 'Our Story';
  const date = values.since || values.date || '';
  const note = values.closingLetter || values.note || values.engraving || values.backText || '';

  return (
    <div className="rounded-xl border border-gold/25 bg-blush/25 p-5 sm:p-6">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
        <Sparkles className="h-3.5 w-3.5" /> Live preview
      </p>
      <p className="mt-1 text-xs text-ink/50">Updates as you type</p>

      <div className="mt-5 flex min-h-[280px] items-center justify-center rounded-lg bg-cream/70 p-5 shadow-soft">
        {/* Diary / memory book */}
        {product.previewType === 'diary' && (
          <div className={`relative aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-sm bg-gradient-to-br ${coverClasses[values.coverStyle] || coverClasses['Classic Ivory']} p-5 shadow-lift ring-1 ring-gold/40`}>
            <div className="absolute inset-2 border border-gold/40" aria-hidden="true" />
            <p className="relative text-center font-serif text-lg font-semibold leading-tight">{title}</p>
            {date && <p className="relative mt-1 text-center text-[11px] tracking-widest opacity-70">{date}</p>}
            {values.anniversaryYear && (
              <p className="relative mt-2 text-center text-[10px] uppercase tracking-[0.25em] text-gold">{values.anniversaryYear} anniversary</p>
            )}
            <div className="relative mt-5 grid grid-cols-2 gap-1.5">
              {photos.slice(0, 4).map((photo) => (
                <img key={photo.id} src={photo.dataUrl} alt="" className="aspect-square w-full rounded-sm object-cover" />
              ))}
              {photos.length === 0 && (
                <>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="aspect-square rounded-sm border border-dashed border-current opacity-25" />
                  ))}
                </>
              )}
            </div>
            {note && <p className="relative mt-4 line-clamp-3 text-center text-[10px] leading-relaxed opacity-75">“{note}”</p>}
            <p className="absolute bottom-4 left-0 right-0 text-center text-[9px] uppercase tracking-[0.3em] text-gold">Giftora</p>
          </div>
        )}

        {/* T-shirt mock-up */}
        {product.previewType === 'tshirt' && (
          <div className="w-full max-w-[260px] text-center">
            <svg viewBox="0 0 240 240" className="w-full drop-shadow-lg" role="img" aria-label="T-shirt preview">
              <path
                d="M80 26 L60 34 Q40 42 34 66 L20 104 L48 114 L58 92 L58 212 Q120 222 182 212 L182 92 L192 114 L220 104 L206 66 Q200 42 180 34 L160 26 Q120 52 80 26 Z"
                fill={colourMap[values.colour] || '#F5EFE4'}
                stroke="#B08D57"
                strokeWidth="1.5"
              />
              <text x="120" y="112" textAnchor="middle" fontSize="15" fontFamily="Playfair Display, Georgia, serif" fill="#3A2328">
                {(values.frontText || 'YOUR TEXT').slice(0, 18)}
              </text>
              {photos[0]?.dataUrl && (
                <image href={photos[0].dataUrl} x="95" y="125" width="50" height="50" preserveAspectRatio="xMidYMid slice" clipPath="url(#tee-clip)" />
              )}
              <clipPath id="tee-clip"><rect x="95" y="125" width="50" height="50" rx="4" /></clipPath>
            </svg>
            <p className="mt-3 text-xs text-ink/55">
              {values.size || 'Size'} · {values.colour || 'Colour'} · {values.eventType || 'Event'}
            </p>
            {values.backText && <p className="mt-1 text-[11px] italic text-ink/45">Back: “{values.backText}”</p>}
          </div>
        )}

        {/* Photo bouquet */}
        {product.previewType === 'bouquet' && (
          <div className="relative aspect-square w-full max-w-[250px]">
            <div className="absolute inset-0 rounded-full bg-blush/70 ring-1 ring-gold/40" aria-hidden="true" />
            {photos.slice(0, 8).map((photo, index) => {
              const angle = (index / Math.max(photos.length, 1)) * Math.PI * 2;
              return (
                <img
                  key={photo.id}
                  src={photo.dataUrl}
                  alt=""
                  className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ring-2 ring-cream shadow-soft"
                  style={{ left: `${50 + Math.cos(angle) * 32}%`, top: `${50 + Math.sin(angle) * 32}%` }}
                />
              );
            })}
            <div className="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-cream p-2 text-center shadow-soft ring-1 ring-gold/40">
              <p className="text-[10px] font-medium text-ink">For {values.name || 'you'}</p>
              <p className="mt-1 line-clamp-3 text-[9px] leading-tight text-ink/60">{note || 'Your note appears here'}</p>
            </div>
          </div>
        )}

        {/* Jewellery */}
        {product.previewType === 'jewellery' && (
          <div className="text-center">
            <div className="mx-auto grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-[#fbf3dc] to-[#e9d6a6] shadow-lift ring-4 ring-gold/30">
              <span className="font-serif text-4xl text-gold">{(values.name || 'G')[0].toUpperCase()}</span>
            </div>
            <p className="mt-5 text-xs text-ink/55">For {values.name || 'someone special'}</p>
            {values.engraving && <p className="mt-1 font-serif text-sm italic text-ink/75">“{values.engraving}”</p>}
            {values.date && <p className="mt-1 text-[11px] text-ink/45">{values.date}</p>}
          </div>
        )}

        {/* Generic hamper / fruit basket */}
        {!['diary', 'tshirt', 'bouquet', 'jewellery'].includes(product.previewType) && (
          <div className="w-full max-w-[240px] text-center">
            <div className="relative mx-auto h-40 w-40 rounded-lg bg-gradient-to-br from-blush to-cream ring-1 ring-gold/50">
              <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 bg-gold/60" aria-hidden="true" />
              <div className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 bg-gold/60" aria-hidden="true" />
              <div className="absolute inset-x-6 bottom-5 rounded bg-cream/90 px-2 py-2 shadow-soft">
                <p className="font-serif text-xs text-ink">{title !== 'Our Story' ? title : product.name}</p>
              </div>
            </div>
            {values.deliverySlot && (
              <p className="mt-4 inline-block rounded-full bg-night px-4 py-1.5 text-[11px] text-cream">
                {values.deliverySlot} delivery
              </p>
            )}
            {note && <p className="mt-3 text-[11px] italic text-ink/55">“{note}”</p>}
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-[10px] text-ink/40">Illustrative preview · final product is hand-finished</p>
    </div>
  );
}
