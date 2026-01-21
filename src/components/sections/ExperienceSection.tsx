import { useTranslations, useLocale } from 'next-intl';
import { ExperienceItem } from '@/components/ui';
import { experiences } from '@/data/experiences';

export function ExperienceSection() {
  const t = useTranslations('experience');
  const locale = useLocale();

  return (
    <section className="py-4" id="experience">
      <h2 className="text-lg md:text-xl text-muted uppercase tracking-widest mt-12 mb-6">
        {t('title')}
      </h2>
      {experiences.map((experience, index) => (
        <ExperienceItem key={index} experience={experience} locale={locale} />
      ))}
    </section>
  );
}
