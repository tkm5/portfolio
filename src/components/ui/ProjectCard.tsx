import Link from 'next/link';
import type { Project } from '@/types';
import { getLocalizedText } from '@/utils/locale';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = getLocalizedText(project.title, locale);
  const meta = getLocalizedText(project.meta, locale);

  return (
    <Link
      href={`/${locale}/projects/${project.slug}/`}
      className="block py-4 border-b border-border first:border-t hover:pl-2 transition-all group"
    >
      <h3 className="text-base font-normal mb-1 text-foreground group-hover:text-link-hover transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted">{meta}</p>
    </Link>
  );
}
