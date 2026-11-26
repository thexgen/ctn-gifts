export default function ImagePlaceholder({ className = '', style }) {
  return <div aria-hidden="true" className={`bg-blush/30 ${className}`.trim()} style={style} />;
}
