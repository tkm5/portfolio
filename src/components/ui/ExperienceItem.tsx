import type { Experience } from '@/types';
import { getLocalizedText } from '@/utils/locale';

interface ExperienceItemProps {
  experience: Experience;
  locale: string;
}

export function ExperienceItem({ experience, locale }: ExperienceItemProps) {
  const company = getLocalizedText(experience.company, locale);
  const role = getLocalizedText(experience.role, locale);

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
