import { unstable_setRequestLocale } from 'next-intl/server';
import { TopNav, SideNav, Footer } from '@/components/layout';
import {
  Header,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from '@/components/sections';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <TopNav />
      <SideNav />
      <div className="lg:pl-[180px]">
        <Header />
        <main className="max-w-content mx-auto px-6">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
