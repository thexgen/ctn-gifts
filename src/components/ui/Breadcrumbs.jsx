import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/** items: [{ label, href? }] — the last item is rendered as plain text. */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink/50">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3 w-3 text-gold/60" aria-hidden="true" />}
            {item.href && index < items.length - 1 ? (
              <Link to={item.href} className="transition hover:text-gold">{item.label}</Link>
            ) : (
              <span aria-current={index === items.length - 1 ? 'page' : undefined} className={index === items.length - 1 ? 'text-ink' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
