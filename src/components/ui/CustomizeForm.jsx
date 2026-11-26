import CustomizePreview from './CustomizePreview.jsx';

/**
 * Renders a product's `customFields` schema: text, textarea (with counter),
 * and select fields. `onChange` is a React state setter.
 */
export default function CustomizeForm({ product, values, onChange }) {
  const setField = (key, value) => onChange((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <div>
          <p className="eyebrow">Make it yours</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">Personalise your gift</h2>
          <p className="mt-2 text-sm text-ink/60">
            Fill in the details below — we’ll craft it exactly as you imagine.
          </p>
        </div>

        {(product.customFields || []).map((field) => {
          const id = `field-${product.id}-${field.key}`;
          const value = values[field.key] ?? '';

          return (
            <div key={field.key} className="border-b border-ink/10 pb-6">
              <label htmlFor={id} className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink">
                {field.label}
                {field.required && <span className="text-gold" aria-hidden="true">*</span>}
                {field.required && <span className="sr-only">(required)</span>}
              </label>
              {field.help && <p className="mb-2 text-xs text-ink/45">{field.help}</p>}

              {field.type === 'text' && (
                <input
                  id={id}
                  type="text"
                  value={value}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={(event) => setField(field.key, event.target.value)}
                  className="w-full rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                />
              )}

              {field.type === 'textarea' && (
                <>
                  <textarea
                    id={id}
                    rows={3}
                    value={value}
                    maxLength={field.maxLength}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(event) => setField(field.key, event.target.value)}
                    className="w-full resize-y rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                  />
                  {field.maxLength && (
                    <p className="mt-1 text-right text-[11px] text-ink/40" aria-live="polite">
                      {String(value).length} / {field.maxLength} characters
                    </p>
                  )}
                </>
              )}

              {field.type === 'date' && (
                <input
                  id={id}
                  type="date"
                  value={value}
                  required={field.required}
                  onChange={(event) => setField(field.key, event.target.value)}
                  className="w-full rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                />
              )}

              {field.type === 'select' && (
                <select
                  id={id}
                  value={value}
                  required={field.required}
                  onChange={(event) => setField(field.key, event.target.value)}
                  className="w-full rounded-lg border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
                >
                  <option value="">Choose {field.label.toLowerCase()}…</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

            </div>
          );
        })}
      </div>

      <aside className="lg:sticky lg:top-40 lg:self-start">
        <CustomizePreview product={product} values={values} />
      </aside>
    </div>
  );
}
