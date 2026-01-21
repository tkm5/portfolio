'use client';

import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { TopNav, Footer } from '@/components/layout';
import { BackLink, TechTag } from '@/components/ui';
import { getProjectBySlug } from '@/data/projects';

export function ProjectContent({ slug }: { slug: string }) {
  const t = useTranslations('project');
  const locale = useLocale();
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const title = locale === 'ja' ? project.title.ja : project.title.en;
  const meta = locale === 'ja' ? project.meta.ja : project.meta.en;
  const basePath = locale === 'ja' ? '/ja' : '';

  return (
    <>
      <TopNav />
      <div className="lg:pl-[180px]">
        <main className="max-w-content mx-auto px-6 py-16 pt-[calc(60px+4rem)]">
          <BackLink href={`${basePath}/#projects`} />

          <h1 className="text-xl md:text-2xl font-normal mb-2">{title}</h1>
          <p className="text-sm text-muted mb-8">{meta}</p>

          {project.sections.map((section, index) => {
            const sectionTitle =
              locale === 'ja' ? section.title.ja : section.title.en;
            const sectionContent =
              locale === 'ja' ? section.content.ja : section.content.en;
            const sectionList = section.list
              ? locale === 'ja'
                ? section.list.ja
                : section.list.en
              : null;

            return (
              <div key={index} className="mb-8">
                <h2 className="text-base font-normal mt-8 mb-4">{sectionTitle}</h2>
                {sectionContent.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {sectionList && (
                  <ol className="list-decimal list-inside mb-4 space-y-2">
                    {sectionList.map((item, lIndex) => (
                      <li key={lIndex} className="text-foreground">
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}

          <div className="mb-8">
            <h2 className="text-base font-normal mt-8 mb-4">{t('technologies')}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <TechTag key={index} name={tech} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
