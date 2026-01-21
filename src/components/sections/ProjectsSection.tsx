import { useTranslations, useLocale } from 'next-intl';
import { ProjectCard } from '@/components/ui';
import { projects } from '@/data/projects';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const locale = useLocale();

  return (
    <section className="py-4" id="projects">
      <h2 className="text-lg md:text-xl text-muted uppercase tracking-widest mt-12 mb-6">
        {t('title')}
      </h2>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} locale={locale} />
      ))}
    </section>
  );
}
