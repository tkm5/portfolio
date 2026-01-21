'use client';

import { useTranslations } from 'next-intl';
import { useActiveSection } from '@/hooks/useActiveSection';

const sections = ['about', 'experience', 'projects', 'skills'] as const;

export function SideNav() {
  const t = useTranslations('nav');
  const activeSection = useActiveSection(sections as unknown as string[]);

  return (
    <aside className="hidden lg:flex fixed top-[60px] left-0 w-[180px] h-[calc(100vh-60px)] flex-col justify-center p-6 z-40">
      <ul className="space-y-6">
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              data-section={section}
              className={`relative pl-4 text-xs tracking-widest transition-colors ${
                activeSection === section
                  ? 'text-foreground before:w-2'
                  : 'text-muted hover:text-foreground before:w-0'
              } before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:bg-foreground before:transition-all`}
            >
              {t(section)}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
