import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/data/siteConfig';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const basePath = locale === 'ja' ? '/ja' : '';

  return (
    <footer className="py-12 mt-12 border-t border-border text-center">
      <div className="max-w-content mx-auto px-6">
        <div className="flex justify-center gap-8 mb-6 flex-col sm:flex-row">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-link-hover transition-colors"
          >
            {t('github')}
          </a>
          <Link
            href={`${basePath}/contact/`}
            className="text-sm text-muted hover:text-link-hover transition-colors"
          >
            {t('contact')}
          </Link>
          <Link
            href={`${basePath}/imprint/`}
            className="text-sm text-muted hover:text-link-hover transition-colors"
          >
            {t('imprint')}
          </Link>
        </div>
        <p className="text-xs text-muted">&copy; 2026 {siteConfig.name}</p>
      </div>
    </footer>
  );
}
