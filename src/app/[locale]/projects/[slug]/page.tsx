import { unstable_setRequestLocale } from 'next-intl/server';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import { locales } from '../../../../../i18n';
import { ProjectContent } from './ProjectContent';

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = locale === 'ja' ? project.title.ja : project.title.en;
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
