'use client';

import { useTranslations, useLocale } from 'next-intl';
import { TopNav, Footer } from '@/components/layout';
import { BackLink } from '@/components/ui';
import { siteConfig } from '@/data/siteConfig';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const basePath = locale === 'ja' ? '/ja' : '';

  return (
    <>
      <TopNav />
      <div className="lg:pl-[180px]">
        <main className="max-w-content mx-auto px-6 py-16 pt-[calc(60px+4rem)]">
          <BackLink href={`${basePath}/`} labelKey="backToHome" />

          <h1 className="text-xl md:text-2xl font-normal mb-2">{t('title')}</h1>
          <p className="text-sm text-muted mb-8">{t('description')}</p>

          <form
            action={`https://formspree.io/f/${siteConfig.formspreeId}`}
            method="POST"
            className="max-w-[500px]"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm text-muted mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm font-mono focus:outline-none focus:border-link-hover transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm text-muted mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm font-mono focus:outline-none focus:border-link-hover transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm text-muted mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm font-mono focus:outline-none focus:border-link-hover transition-colors resize-y min-h-[120px]"
              />
            </div>

            <button
              type="submit"
              className="bg-foreground text-background border-none rounded px-8 py-3 text-sm font-mono cursor-pointer hover:opacity-80 transition-opacity"
            >
              {t('send')}
            </button>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
}
