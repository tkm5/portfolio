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
  // prefetchAll is the default when ClientRouter is used, written out for clarity.
  // 'viewport' prefetches links as they scroll into view (e.g. the project list).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    routing: {
      // Both locales live under a prefix (/en/, /ja/). The bare root is
      // redirected to /en/ (301) by a Cloudflare Redirect Rule on the zone.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
