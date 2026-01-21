import type { Project } from '@/types';

export const devcontainer: Project = {
  slug: 'devcontainer',
  title: {
    ja: 'Vibe Coding DevContainer',
    en: 'Vibe Coding DevContainer',
  },
  meta: {
    ja: '個人プロジェクト | OSS',
    en: 'Personal Project | OSS',
  },
  description: 'Vibe Coding DevContainer',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'Python/Node.jsを扱う多言語開発環境をDevcontainerとして設計．Google Gemini CLI及びClaude Code を標準で組み込み，ターミナル上でシームレスなAI支援開発（Vibe Coding）を実現．',
        ],
        en: [
          'Designed a multi-language development environment for Python/Node.js as a Devcontainer. Built-in Google Gemini CLI and Claude Code as standard, enabling seamless AI-assisted development (Vibe Coding) on the terminal.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          '高速なパッケージ管理ツールuvやoh-my-zsh，p10k，git-deltaの導入により開発者体験を追求．',
          '非rootユーザーを標準としながらnpmの権限問題を解決するなど，セキュリティと利便性を両立．',
          'GitHubでOSSとして公開し，コミュニティからのフィードバックを反映しながら継続的に改善．',
        ],
        en: [
          'Pursued developer experience by introducing the fast package manager uv, oh-my-zsh, p10k, and git-delta.',
          'Balanced security and convenience by using non-root users as standard while resolving npm permission issues.',
          'Published as OSS on GitHub, continuously improving while reflecting feedback from the community.',
        ],
      },
    },
  ],
  technologies: [
    'Docker',
    'DevContainer',
    'Claude Code',
    'Google Gemini CLI',
    'uv',
    'Python',
    'Node.js',
    'Zsh',
  ],
};
