import { unstable_setRequestLocale } from 'next-intl/server';
import { ImprintContent } from './ImprintContent';

export default function ImprintPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <ImprintContent />;
}
