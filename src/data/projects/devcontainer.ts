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
          'Python / Node.jsを横断する多言語開発環境をVS Code Dev Containersとして定義し，ローカルMacでもリモートSSHサーバでも同一構成を即座に再現．Claude CodeとGoogle Gemini CLIを標準同梱し，コンテナを開いた瞬間からターミナル上でAI支援開発（Vibe Coding）が始められる状態とした．OSSとしてGitHubに公開．',
        ],
        en: [
          'A VS Code Dev Container template that reproduces a unified Python / Node.js development environment on local Macs and remote SSH servers alike. Claude Code and the Google Gemini CLI are bundled by default, so AI-assisted development (Vibe Coding) is available in the terminal the moment the container opens. Published as open source on GitHub.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'ベースイメージは Ubuntu 24.04（Noble）．uv公式のマルチステージビルドから uvバイナリのみを抽出し，Pythonランタイム管理をuvに完全委譲することでシステムPythonを汚さない構成とした．Node.jsは公式バイナリtarballを`dpkg --print-architecture`で`aarch64 / x86_64`に分岐ダウンロードし，Apple Silicon／Intel／ARMサーバの3者でそのまま動く．',
          '非rootユーザー`devcontainer`で起動し，`/usr/local/share/npm-global`を事前作成・所有させ`NPM_CONFIG_PREFIX`を設定することで，sudoなしでグローバルnpmインストールができる状態を実現．非rootの安全性とnpmの利便性を両立させるための典型的な落とし穴を回避している．',
          '`workspaceMount`は`delegated` consistencyで bind mountし，macOSでの大量ファイルI/O（`node_modules`，Git操作，ビルド生成物）を高速化．`NODE_OPTIONS=--max-old-space-size=4096`でNode側のヒープ上限もコンテナ環境変数として明示し，Next.jsや大規模TypeScriptのビルド失敗を予防した．',
        ],
        en: [
          'Built on Ubuntu 24.04 (Noble). The official uv multi-stage image is used only to copy the uv binary in; Python runtime management is fully delegated to uv, leaving the system Python untouched. Node.js is downloaded from the official tarball with `dpkg --print-architecture` branching between `aarch64 / x86_64`, so Apple Silicon, Intel, and ARM servers all run the same image unchanged.',
          'The container runs as the non-root user `devcontainer`; `/usr/local/share/npm-global` is pre-created and owned by that user and `NPM_CONFIG_PREFIX` is set, so global `npm install` works without sudo — sidestepping the usual trap between non-root safety and npm ergonomics.',
          '`workspaceMount` is bind-mounted with `delegated` consistency to accelerate heavy macOS file I/O (`node_modules`, git, build output). `NODE_OPTIONS=--max-old-space-size=4096` is declared as a container env var so Next.js and large TypeScript builds do not run out of heap.',
        ],
      },
      list: {
        ja: [
          'AI CLI: Claude Code（公式インストーラ）/ Google Gemini CLI（`@google/gemini-cli`）',
          'シェル: Zsh + Oh My Zsh + `zsh-syntax-highlighting` + fzf + git-delta',
          '言語・ツール: Node.js 24.13.0 / uv 0.9.28 / GitHub CLI / tmux / jq / tree / emacs-nox',
          'VS Code拡張を13種自動インストール（Claude Code，Gemini Companion，Cursor Pyright，Prettier / ESLint / Black，GitLens，Markdown All in One，Mermaid Chart 等）',
          '履歴の永続化: `zsh_history`をnamed volume（`devcontainer-zsh-history-<id>`）へマウントしコンテナ再ビルドでも保全',
        ],
        en: [
          'AI CLIs: Claude Code (official installer) and Google Gemini CLI (`@google/gemini-cli`)',
          'Shell: Zsh + Oh My Zsh + `zsh-syntax-highlighting` + fzf + git-delta',
          'Languages / tools: Node.js 24.13.0, uv 0.9.28, GitHub CLI, tmux, jq, tree, emacs-nox',
          '13 VS Code extensions auto-installed (Claude Code, Gemini Companion, Cursor Pyright, Prettier / ESLint / Black, GitLens, Markdown All in One, Mermaid Chart, etc.)',
          'History persistence: `zsh_history` is mounted on a named volume (`devcontainer-zsh-history-<id>`) so it survives rebuilds',
        ],
      },
    },
    {
      title: { ja: 'ホスト連携とリモート展開', en: 'Host Integration & Remote Deployment' },
      content: {
        ja: [
          'ホストの`~/.claude` / `~/.claude.json` / `~/.gemini`をbind mountすることで，AIツールの認証をコンテナ再ビルド後も維持．手動の再ログインが発生しない点がデイリーユースで効く．`.zshrc`はGit管理（共通設定），`.gitconfig`は`.gitignore`対象とし，付属の`sync-devcontainer.sh`がローカルの`~/.gitconfig`から生成する設計．個人情報をリポジトリに混入させずにチーム共通化を両立した．',
          '`scripts/sync-devcontainer.sh`でMacの認証ファイル群を任意のリモートSSHサーバへrsyncで同期．リモート側で`git clone`後にDev Containers：Reopen in Container するだけで同一環境を起動できるため，VS Code Remote-SSHと組み合わせて「ノートPCからGPUサーバのdevcontainerで作業する」ワークフローが成立する．',
          'ビルド引数（`NODE_VERSION`，`UV_VERSION`，`GEMINI_CLI_VERSION`，`GIT_DELTA_VERSION`，`ZSH_IN_DOCKER_VERSION`）で主要ツールの版を外部化し，更新を`devcontainer.json`の1行差分で追従可能にした．イメージ自体は`apt-get clean && rm -rf /var/lib/apt/lists/*`でスリム化し，pull時間と保管容量を抑えている．',
        ],
        en: [
          "Bind-mounts the host's `~/.claude`, `~/.claude.json`, and `~/.gemini` so AI tool credentials survive container rebuilds — no daily re-login. `.zshrc` is committed as a shared baseline; `.gitconfig` is gitignored and generated by the bundled `sync-devcontainer.sh` from the local `~/.gitconfig`, so personal info never leaks into the repo while the shared config stays versioned.",
          '`scripts/sync-devcontainer.sh` rsyncs the Mac-side credential files to any remote SSH server. After a `git clone` the remote can immediately "Reopen in Container", so paired with VS Code Remote-SSH the workflow "drive a dev container on a GPU server from a laptop" just works.',
          'Tool versions (`NODE_VERSION`, `UV_VERSION`, `GEMINI_CLI_VERSION`, `GIT_DELTA_VERSION`, `ZSH_IN_DOCKER_VERSION`) are externalized as build args, so updates are a single-line diff in `devcontainer.json`. The image itself is trimmed with `apt-get clean && rm -rf /var/lib/apt/lists/*` to keep pull time and storage footprint low.',
        ],
      },
    },
  ],
  technologies: [
    'Docker',
    'Dev Containers',
    'Ubuntu 24.04',
    'Claude Code',
    'Google Gemini CLI',
    'uv',
    'Python 3.12',
    'Node.js 24',
    'Zsh',
    'Oh My Zsh',
    'fzf',
    'git-delta',
    'GitHub CLI',
    'rsync',
    'VS Code Remote-SSH',
    'OSS',
  ],
};
