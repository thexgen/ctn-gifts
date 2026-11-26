/**
 * Helpers shared by the product page, cart drawer and checkout summary.
 * Field schema lives on each product in src/data/products.js.
 */

/** Field types: text | textarea | date | select */
export const isFieldFilled = (field, value) => {
  if (field.type === 'date') return Boolean(value);
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
};

/** Returns the labels of required fields the shopper still needs to fill. */
export const missingRequiredFields = (schema = [], values = {}) =>
  (Array.isArray(schema) ? schema : [])
    .filter((field) => field.required && !isFieldFilled(field, values[field.key]))
    .map((field) => field.label);

export const isCustomizationValid = (product, values) => {
  if (!product?.customizable) return true;
  const missing = missingRequiredFields(product.customFields, values);
  return missing.length === 0;
};

/** Human-readable rows for the cart line and the checkout summary. */
export const formatCustomization = (product, values = {}) => {
  if (!values || Object.keys(values).length === 0) return [];
  return (product?.customFields || [])
    .map((field) => {
      const value = values[field.key];
      if (!isFieldFilled(field, value)) return null;
      return { label: field.label, value: String(value) };
    })
    .filter(Boolean);
};

/** Unique per line so two differently-customised copies stay separate. */
export const customizationLineId = (product, customization = null) => {
  if (!customization || Object.keys(customization).length === 0) return product.id;
  const fingerprint = JSON.stringify(Object.entries(customization));
  let hash = 5381;
  for (let i = 0; i < fingerprint.length; i += 1) {
    hash = ((hash << 5) + hash + fingerprint.charCodeAt(i)) | 0;
  }
  return `${product.id}--${(hash >>> 0).toString(36)}`;
};
