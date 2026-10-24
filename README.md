# Portfolio

Personal portfolio website built with Astro, featuring internationalization (EN/JA), dark/light theme support, and client-side page transitions.

**Live Site:** [takumig.io](https://takumig.io)

## Tech Stack

- **Framework:** Astro 7 (static output)
- **Navigation:** Astro `<ClientRouter />` (View Transitions) — client-side page transitions with prefetch; every page is still prerendered
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4 (`@tailwindcss/vite`) + CSS Variables
- **i18n:** Astro built-in i18n routing (`/en/`, `/ja/`)
- **Theme:** Inline script (class on `<html>`, stored in `localStorage`)
- **Images:** Astro `<Image>` (build-time WebP, Retina densities)
- **Analytics:** Cloudflare Web Analytics (injected by Cloudflare at the edge; in-code beacon only when `siteConfig.cloudflareAnalyticsToken` is set)
- **Deployment:** Cloudflare Workers static assets (Wrangler)

## Features

- Bilingual support (English / Japanese)
- Dark / Light theme toggle
- Responsive design (PC / Tablet / Mobile)
- Static site generation for fast performance

## Getting Started

### Prerequisites

- Node.js 22.12+
- npm

### Installation

```bash
git clone https://github.com/tkm5/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321/en/](http://localhost:4321/en/) in your browser.

### Build

```bash
npm run build
```

`astro check` runs first, then static files are generated in the `dist/` directory.

### Preview

```bash
npm run preview
```

Serves `dist/` with `wrangler dev` (Workers static assets, same trailing-slash and 404 handling as production) at [http://localhost:8787/en/](http://localhost:8787/en/).

## Project Structure

```
portfolio/
├── src/
│   ├── assets/                # Image sources optimised at build time by Astro <Image>
│   ├── pages/
│   │   ├── 404.astro          # Not-found page
│   │   └── [locale]/          # Localized pages (en, ja)
│   │       ├── index.astro    # Home page
│   │       ├── contact/       # Contact page (posts to Formspree)
│   │       ├── imprint/       # Imprint page
│   │       └── projects/[slug]/ # Project detail pages
│   ├── layouts/               # BaseLayout (head, theme bootstrap)
│   ├── components/
│   │   ├── layout/            # TopNav, SideNav, Footer
│   │   ├── sections/          # Header, About, Experience, Projects, Skills
│   │   └── ui/                # TechTag, ProjectCard, ThemeToggle, etc.
│   ├── data/                  # Project, Experience, Skills data
│   ├── i18n/                  # Locale helpers and translation files (messages/en.json, ja.json)
│   └── styles/global.css      # Tailwind entry, theme tokens, CSS variables
├── public/                    # Static assets (/ -> /en/ is a Cloudflare Redirect Rule)
│   ├── _headers               # Cache and security headers for Workers static assets
│   └── img/                   # favicon-32.png, apple-touch-icon.png
├── astro.config.mjs           # Astro + i18n + Tailwind configuration
├── wrangler.jsonc             # Cloudflare Workers static assets configuration
└── .github/workflows/         # GitHub Actions for deployment
```

## Adding a New Project

1. Add project data to `src/data/projects.ts`:

```typescript
{
  slug: 'new-project',
  title: { ja: '新プロジェクト', en: 'New Project' },
  meta: { ja: '個人開発', en: 'Personal Project' },
  description: 'Project description',
  technologies: ['TypeScript', 'React'],
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: ['日本語の説明'],
        en: ['English description'],
      },
    },
  ],
}
```

2. Deploy:

```bash
git add -A
git commit -m "feat(projects): add new-project"
git push origin main
```

The site will be automatically deployed via GitHub Actions.

## Deployment

Pushing to `main` branch triggers automatic deployment to Cloudflare Workers (Worker name `portfolio`) via GitHub Actions. The workflow needs the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

To deploy manually from a machine that is logged in with `npx wrangler login`:

```bash
npm run deploy
```

```bash
git push origin main
```

Deployment typically completes in about 1 minute.

### Analytics

Analytics uses Cloudflare Web Analytics. In production the beacon is injected automatically by Cloudflare at the edge (zone setting Web Analytics → Manage site → "Enable", currently set to exclude EU visitors), so no token is needed and `cloudflareAnalyticsToken` stays empty. If automatic injection is ever turned off, switch the site to "Enable with JS Snippet installation", copy the token from the snippet into `cloudflareAnalyticsToken` in `src/data/siteConfig.ts`, and rebuild; the beacon is then rendered with `spa: true` so client-side navigations are counted.

## License

MIT
