/**
 * Helpers shared by the product page, cart drawer and checkout summary.
 * Field schema lives on each product in src/data/products.js.
 */

/** Field types: text | textarea | date | select | photos */
export const isFieldFilled = (field, value) => {
  if (field.type === 'photos') return Array.isArray(value) && value.length > 0;
  if (field.type === 'date') return Boolean(value);
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
};

/** Returns the labels of required fields the shopper still needs to fill. */
export const missingRequiredFields = (schema = [], values = {}) =>
  schema
    .filter((field) => field.required && !isFieldFilled(field, values[field.key]))
    .map((field) => field.label);

export const isCustomizationValid = (product, values) => {
  if (!product?.customizable) return true;
  const missing = missingRequiredFields(product.customFields, values);
  // Marriage diary allows up to 20 photos; other photo fields cap at their max.
  const overCap = (product.customFields || []).some((field) =>
    field.type === 'photos' && Array.isArray(values[field.key]) && values[field.key].length > (field.max || 10)
  );
  return missing.length === 0 && !overCap;
};

/** Human-readable rows for the cart line and the checkout summary. */
export const formatCustomization = (product, values = {}) => {
  if (!values || Object.keys(values).length === 0) return [];
  return (product?.customFields || [])
    .map((field) => {
      const value = values[field.key];
      if (!isFieldFilled(field, value)) return null;
      if (field.type === 'photos') {
        const withCaptions = value.filter((photo) => photo.caption?.trim()).length;
        return {
          label: field.label,
          value: `${value.length} photo${value.length > 1 ? 's' : ''}${withCaptions ? ` · ${withCaptions} caption${withCaptions > 1 ? 's' : ''}` : ''}`,
          photos: value,
        };
      }
      return { label: field.label, value: String(value) };
    })
    .filter(Boolean);
};

/** All uploaded photos from every field on a product (for cart thumbnails). */
export const collectPhotos = (values = {}) =>
  Object.values(values)
    .filter((value) => Array.isArray(value) && value[0]?.dataUrl)
    .flat();

/** Unique per line so two differently-customised copies stay separate. */
export const customizationLineId = (product, customization = null) => {
  if (!customization || Object.keys(customization).length === 0) return product.id;
  const fingerprint = JSON.stringify(
    Object.entries(customization).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.map((photo) => photo?.name || '') : value,
    ])
  );
  let hash = 5381;
  for (let i = 0; i < fingerprint.length; i += 1) {
    hash = ((hash << 5) + hash + fingerprint.charCodeAt(i)) | 0;
  }
  return `${product.id}--${(hash >>> 0).toString(36)}`;
};

/** Compact text used inside cart / checkout rows. */
export const summarizeCustomization = (product, values = {}) =>
  formatCustomization(product, values)
    .slice(0, 3)
    .map((row) => `${row.label}: ${row.value}`)
    .join(' · ');
