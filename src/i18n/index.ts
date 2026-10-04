/**
 * Locale definitions and message lookup shared by every page.
 */

import en from './messages/en.json';
import ja from './messages/ja.json';

export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, ja };

/**
 * Narrows an arbitrary route parameter to a supported locale.
 *
 * @param value - Raw value, usually `Astro.params.locale`
 * @returns The value as a `Locale`
 * @throws Error if the value is not a supported locale
 */
export function toLocale(value: string | undefined): Locale {
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale;
  }
  throw new Error(`Unsupported locale: ${value}`);
}

/**
 * Returns the message namespace for a locale, mirroring next-intl's
 * `useTranslations(namespace)`.
 *
 * @param locale - Current locale
 * @param namespace - Top-level key in the message files
 * @returns The messages under that namespace
 */
export function getTranslations<N extends keyof Messages>(
  locale: Locale,
  namespace: N
): Messages[N] {
  return messages[locale][namespace];
}

/**
 * Builds the path of the same page in the other locale, as the old
 * LanguageToggle did with `pathname.replace(/^\/(ja|en)/, '')`.
 *
 * @param pathname - Current pathname, e.g. `/en/projects/foo/`
 * @param locale - Current locale
 * @returns The pathname with its locale prefix swapped
 */
export function getAlternatePath(pathname: string, locale: Locale): string {
  const target: Locale = locale === 'ja' ? 'en' : 'ja';
  const rest = pathname.replace(/^\/(ja|en)(?=\/|$)/, '') || '/';
  return `/${target}${rest}`;
}
