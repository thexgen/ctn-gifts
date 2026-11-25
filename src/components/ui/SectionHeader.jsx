import Reveal from './Reveal.jsx';

/** Centred section title with an optional eyebrow, subtitle and gold divider. */
export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  light = false,
  className = '',
}) {
  return (
    <Reveal className={`text-center ${className}`.trim()}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={`font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.7rem] ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 flex max-w-[220px] items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
        <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
      </div>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-xl text-sm sm:text-base ${light ? 'text-cream/60' : 'text-ink/60'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
