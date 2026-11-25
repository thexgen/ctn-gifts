import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import CustomizePreview from './CustomizePreview.jsx';

/**
 * Renders a product's `customFields` schema: text, textarea (with counter),
 * date, select and multi-photo upload with thumbnail previews / captions.
 * `onChange` is a React state setter so async file reads never lose updates.
 */
export default function CustomizeForm({ product, values, onChange }) {
  const fileRefs = useRef({});

  const setField = (key, value) => onChange((previous) => ({ ...previous, [key]: value }));

  const addPhotos = (field, fileList) => {
    const current = values[field.key] || [];
    const room = field.max - current.length;
    if (room <= 0) return;

    Array.from(fileList).slice(0, room).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        const photo = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          dataUrl: reader.result,
          caption: '',
        };
        onChange((previous) => ({
          ...previous,
          [field.key]: [...(previous[field.key] || []), photo],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (field, photoId) =>
    setField(field.key, (values[field.key] || []).filter((photo) => photo.id !== photoId));

  const setCaption = (field, photoId, caption) =>
    setField(field.key, (values[field.key] || []).map((photo) =>
      photo.id === photoId ? { ...photo, caption } : photo
    ));

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
          const value = values[field.key] ?? (field.type === 'photos' ? [] : '');
          const photos = field.type === 'photos' ? value : [];
          const atMax = photos.length >= field.max;

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

              {field.type === 'photos' && (
                <div>
                  <input
                    ref={(element) => { fileRefs.current[field.key] = element; }}
                    id={id}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(event) => {
                      addPhotos(field, event.target.files);
                      event.target.value = '';
                    }}
                  />
                  <button
                    type="button"
                    disabled={atMax}
                    onClick={() => fileRefs.current[field.key]?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-sm text-ink transition hover:bg-gold hover:text-night disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ImagePlus className="h-4 w-4" /> Add photos
                  </button>
                  <span className="ml-3 text-xs text-ink/45" aria-live="polite">
                    {photos.length} / {field.max}
                  </span>

                  {photos.length > 0 && (
                    <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {photos.map((photo) => (
                        <li key={photo.id} className="group relative">
                          <img
                            src={photo.dataUrl}
                            alt={photo.name}
                            className="aspect-square w-full rounded-lg object-cover ring-1 ring-ink/10"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(field, photo.id)}
                            aria-label={`Remove ${photo.name}`}
                            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-night text-cream shadow-soft transition hover:bg-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {field.withCaptions && (
                            <input
                              type="text"
                              value={photo.caption}
                              maxLength={60}
                              onChange={(event) => setCaption(field, photo.id, event.target.value)}
                              placeholder="Caption…"
                              aria-label={`Caption for ${photo.name}`}
                              className="mt-1.5 w-full rounded border border-ink/10 bg-cream px-2 py-1 text-[11px] placeholder:text-ink/35 focus:border-gold focus:outline-none"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
