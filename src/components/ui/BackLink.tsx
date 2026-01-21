import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface BackLinkProps {
  href: string;
  labelKey?: 'back' | 'backToHome';
}

export function BackLink({ href, labelKey = 'back' }: BackLinkProps) {
  const t = useTranslations(labelKey === 'backToHome' ? 'contact' : 'project');

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-muted hover:text-link-hover transition-colors mb-8"
    >
      <span>&lt;</span>
      <span>{t(labelKey)}</span>
    </Link>
  );
}
