import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="py-4" id="about">
      <h2 className="text-lg md:text-xl text-muted uppercase tracking-widest mt-12 mb-6">
        {t('title')}
      </h2>
      <p className="text-foreground leading-relaxed">{t('description')}</p>
    </section>
  );
}
