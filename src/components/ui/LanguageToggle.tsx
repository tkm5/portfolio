'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'ja' ? 'en' : 'ja';

    // Remove current locale prefix from pathname
    const pathWithoutLocale = pathname.replace(/^\/(ja|en)/, '') || '/';

    // Build new path with appropriate locale prefix
    const newPath =
      newLocale === 'ja'
        ? `/ja${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
        : `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-2 py-1 text-sm border border-border rounded text-link hover:text-link-hover hover:border-link-hover transition-all"
      aria-label="Toggle language"
    >
      {locale === 'ja' ? 'EN' : 'JP'}
    </button>
  );
}
