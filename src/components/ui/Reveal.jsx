import { useReveal } from '../../hooks/useReveal.js';

/** Wraps children in a fade-up scroll reveal animation. */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  style,
  children,
  ...rest
}) {
  const [ref, isVisible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
