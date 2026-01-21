import { unstable_setRequestLocale } from 'next-intl/server';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import { locales } from '../../../../../i18n';
import { ProjectContent } from './ProjectContent';
import { getLocalizedText } from '@/utils/locale';

export function generateStaticParams(): { locale: string; slug: string }[] {
  const slugs = getAllProjectSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = getLocalizedText(project.title, locale);
  return {
    title: `${title} | takumig`,
    description: project.description,
  };
}

export default function ProjectPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  return <ProjectContent slug={slug} />;
}
