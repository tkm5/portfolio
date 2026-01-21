# Portfolio

Personal portfolio website built with Next.js 14, featuring internationalization (EN/JA) and dark/light theme support.

**Live Site:** [takumig.black](https://takumig.black)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **i18n:** next-intl
- **Theme:** next-themes
- **Deployment:** GitHub Pages (Static Export)

## Features

- Bilingual support (English / Japanese)
- Dark / Light theme toggle
- Responsive design (PC / Tablet / Mobile)
- Static site generation for fast performance

## Getting Started

### Prerequisites

- Node.js 18+
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

Open [http://localhost:3000/en/](http://localhost:3000/en/) in your browser.

### Build

```bash
npm run build
```

Static files are generated in the `out/` directory.

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   └── [locale]/          # Localized pages (en, ja)
│   │       ├── page.tsx       # Home page
│   │       ├── contact/       # Contact page
│   │       ├── imprint/       # Imprint page
│   │       └── projects/[slug]/ # Project detail pages
│   ├── components/
│   │   ├── layout/            # TopNav, SideNav, Footer
│   │   ├── sections/          # Header, About, Experience, Projects, Skills
│   │   └── ui/                # TechTag, ProjectCard, ThemeToggle, etc.
│   ├── data/                  # Project, Experience, Skills data
│   └── messages/              # Translation files (en.json, ja.json)
├── public/                    # Static assets
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

Pushing to `main` branch triggers automatic deployment to GitHub Pages via GitHub Actions.

```bash
git push origin main
```

Deployment typically completes in about 1 minute.

## License

MIT
