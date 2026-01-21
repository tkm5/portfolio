'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'ja' ? 'en' : 'ja';

    // Remove current locale from pathname if present
    let newPath = pathname;
    if (pathname.startsWith('/ja')) {
      newPath = pathname.replace('/ja', '') || '/';
    } else if (pathname.startsWith('/en')) {
      newPath = pathname.replace('/en', '') || '/';
    }

    // Add new locale prefix
    if (newLocale === 'ja') {
      newPath = `/ja${newPath === '/' ? '' : newPath}`;
    } else {
      // English is default, no prefix needed for root
      if (newPath === '/') {
        newPath = '/';
      }
    }

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
