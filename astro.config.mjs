// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://takumig.io',
  output: 'static',
  // Every page is emitted as <route>/index.html and linked with a trailing
  // slash, matching the previous Next.js `trailingSlash: true` export.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    routing: {
      // Both locales live under a prefix (/en/, /ja/). The bare root is served
      // by public/index.html, which redirects to /en/.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
