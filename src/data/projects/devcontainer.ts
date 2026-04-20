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
          'Python / Node.js を扱う多言語開発環境をDevcontainerとして設計．Claude CodeとGoogle Gemini CLIを標準で組み込み，ターミナル上でシームレスなAI支援開発（Vibe Coding）を実現．',
        ],
        en: [
          'Designed a multi-language Python/Node.js development environment as a Devcontainer. Bundles Claude Code and the Google Gemini CLI by default, enabling seamless AI-assisted development (Vibe Coding) from the terminal.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          '高速なパッケージ管理ツールuv，Oh My Zshによるzshカスタマイズ，fzf / git-delta / GitHub CLI等の導入により開発者体験を追求．',
          '~/.claude や ~/.gemini をホストからbind mountすることで，コンテナ再生成後もAIツールの認証を維持．zsh履歴はnamed volumeで永続化．',
          '付属のrsyncスクリプトによりリモートSSHサーバへも同一環境を展開可能な設計とし，GitHubでOSSとして公開．',
        ],
        en: [
          'Polished developer experience through the fast package manager uv, zsh customization via Oh My Zsh, and tooling such as fzf, git-delta and GitHub CLI.',
          'Bind-mounts ~/.claude and ~/.gemini from the host so that AI tool credentials survive container rebuilds; zsh history is persisted on a named volume.',
          'A bundled rsync script lets the same environment be deployed onto remote SSH servers; published as open source on GitHub.',
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
    'Ubuntu 24.04',
    'Zsh',
    'rsync',
  ],
};
