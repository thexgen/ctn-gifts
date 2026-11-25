import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/** Reusable accordion. Items: [{ id, title, content }]. */
export default function Accordion({ items, defaultOpenId = null, allowMultiple = false, className = '' }) {
  const [openIds, setOpenIds] = useState(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  );

  const toggle = (id) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`divide-y divide-ink/10 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-ink transition hover:text-gold sm:text-base"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              hidden={!isOpen}
              className="pb-5 pr-6 text-sm leading-relaxed text-ink/65 animate-fade-in"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
