import { unstable_setRequestLocale } from 'next-intl/server';
import { ContactForm } from './ContactForm';

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <ContactForm />;
}
