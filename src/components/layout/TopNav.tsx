'use client';

import Link from 'next/link';
import { ThemeToggle, LanguageToggle } from '@/components/ui';
import { siteConfig } from '@/data/siteConfig';

export function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-background border-b border-border flex justify-between items-center px-4 lg:px-8 z-50 transition-colors">
      <Link
        href="/"
        className="text-lg font-normal text-foreground hover:text-link-hover transition-colors"
      >
        {siteConfig.name}
      </Link>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
