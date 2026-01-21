import type { Experience } from '@/types';

interface ExperienceItemProps {
  experience: Experience;
  locale: string;
}

export function ExperienceItem({ experience, locale }: ExperienceItemProps) {
  const company = locale === 'ja' ? experience.company.ja : experience.company.en;
  const role = locale === 'ja' ? experience.role.ja : experience.role.en;

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
        <span className="text-base text-foreground">{company}</span>
        <span className="text-sm text-muted">{experience.period}</span>
      </div>
      <p className="text-sm text-muted">{role}</p>
    </div>
  );
}
