import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { GitHubIcon, MailIcon } from '@/components/icons';
import { siteConfig } from '@/data/siteConfig';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const basePath = `/${locale}`;

  return (
    <header className="pt-[calc(60px+4rem)] pb-8 lg:pt-[calc(60px+4rem)]">
      <div className="max-w-content mx-auto px-6">
        <img
          src="/img/icon.jpeg"
          alt={siteConfig.name}
          className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-full mb-5 object-cover"
        />
        <h1 className="text-2xl md:text-[2rem] font-semibold mb-2">{siteConfig.name}</h1>
        <p className="text-base text-muted mb-6">{t('title')}</p>

        <div className="flex items-center gap-6 flex-wrap">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
          >
            <GitHubIcon />
            {t('github')}
          </a>
          <Link
            href={`${basePath}/contact/`}
            className="inline-flex items-center gap-2 text-link hover:text-link-hover transition-colors"
          >
            <MailIcon />
            {t('contact')}
          </Link>
        </div>
      </div>
    </header>
  );
}
