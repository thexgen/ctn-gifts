/**
 * Image renderer that respects each photo's own aspect ratio from the media
 * manifest, so square / portrait / wide photos never cause layout shift.
 *
 * `fill` = crop to the parent's box (used inside square product cards).
 * Otherwise the wrapper reserves space using `aspect-ratio`.
 */
export default function MediaImage({
  media,
  alt,
  className = '',
  imageClassName = '',
  fit = 'cover',
  fill = false,
  priority = false,
}) {
  if (!media?.src) return null;

  const ratio = media.ratio || (media.width && media.height ? `${media.width} / ${media.height}` : '1 / 1');

  return (
    <div
      className={`relative overflow-hidden bg-blush/30 ${className}`.trim()}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <img
        src={media.src}
        alt={alt ?? media.alt ?? ''}
        width={media.width || 700}
        height={media.height || 700}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imageClassName}`.trim()}
      />
    </div>
  );
}
