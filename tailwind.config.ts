import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        background: 'var(--bg-color)',
        foreground: 'var(--text-color)',
        muted: 'var(--text-muted)',
        link: 'var(--link-color)',
        'link-hover': 'var(--link-hover)',
        border: 'var(--border-color)',
        card: 'var(--card-bg)',
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      spacing: {
        'nav-top': '60px',
        'nav-side': '180px',
      },
      maxWidth: {
        content: '720px',
      },
    },
  },
  plugins: [],
};

export default config;
