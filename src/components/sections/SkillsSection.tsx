import { useTranslations } from 'next-intl';
import { skills } from '@/data/skills';

export function SkillsSection() {
  const t = useTranslations('skills');

  return (
    <section className="py-4" id="skills">
      <h2 className="text-lg md:text-xl text-muted uppercase tracking-widest mt-12 mb-6">
        {t('title')}
      </h2>
      {skills.map((category, index) => (
        <div key={index} className="mb-6">
          <p className="text-sm text-muted mb-2">{category.title}</p>
          <p className="text-foreground text-sm">{category.skills}</p>
        </div>
      ))}
    </section>
  );
}
