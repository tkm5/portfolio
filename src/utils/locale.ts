/**
 * Locale-aware text utilities.
 */

export type LocalizedText = {
  ja: string;
  en: string;
};

export type LocalizedArray = {
  ja: string[];
  en: string[];
};

/**
 * Retrieves the appropriate text based on the current locale.
 *
 * @param text - Object containing localized text
 * @param locale - Current locale ('ja' or 'en')
 * @returns The text in the specified locale
 */
export function getLocalizedText(text: LocalizedText, locale: string): string {
  return locale === 'ja' ? text.ja : text.en;
}

/**
 * Retrieves the appropriate array based on the current locale.
 *
 * @param arr - Object containing localized arrays
 * @param locale - Current locale ('ja' or 'en')
 * @returns The array in the specified locale
 */
export function getLocalizedArray(
  arr: LocalizedArray,
  locale: string
): string[] {
  return locale === 'ja' ? arr.ja : arr.en;
}
