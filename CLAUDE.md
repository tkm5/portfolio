# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

個人ポートフォリオサイト．Astro 7（静的出力）+ Tailwind CSS 4 + TypeScript（strict）で構成し，Cloudflare Workers の static assets で配信する．
全ページをプリレンダリングしたまま，ページ遷移は Astro の `<ClientRouter />`（View Transitions）によるクライアントサイドナビゲーションで行う．

## Architecture

```
portfolio/
├── astro.config.mjs        # i18n（en / ja，prefixDefaultLocale），trailingSlash: 'always'，Tailwind の Vite プラグイン
├── wrangler.jsonc          # Workers static assets（Worker 名 portfolio，dist/ を配信）
├── public/                 # 静的ファイル（/ から /en/ への 301 は Cloudflare の Redirect Rule）
└── src/
    ├── pages/              # [locale]/ 配下に home，contact，imprint，projects/[slug]，ルートに 404
    ├── layouts/            # BaseLayout（head，GA，テーマ初期化スクリプト）
    ├── components/         # layout / sections / ui / icons（すべて .astro）
    ├── data/               # projects/*.ts，experiences.ts，skills.ts，siteConfig.ts
    ├── i18n/               # locales 定義，getTranslations()，messages/{en,ja}.json
    └── styles/global.css   # Tailwind エントリ，@theme トークン，CSS 変数
```

## Key Patterns

### Internationalization (i18n)
- Astro 組み込みの i18n ルーティングを使い，URL は `/en/...` と `/ja/...`（末尾スラッシュあり）
- 固定文言は `src/i18n/messages/{en,ja}.json`，ページでは `getTranslations(locale, 'namespace')` で取得する
- データ側の文言は `{ ja, en }` オブジェクトで持ち，`src/utils/locale.ts` の `getLocalizedText()` / `getLocalizedArray()` で切り替える
- 言語切替（`LanguageToggle.astro`）は，ロケール接頭辞を入れ替えた同じページへのリンク

### Theming
- CSS 変数（`:root` と `.light`）でダーク / ライトを切り替える．既定はダーク
- `BaseLayout.astro` の head 内インラインスクリプトが `localStorage.theme` を読み，描画前に `<html>` へクラスを付けるのでちらつかない
- 同じスクリプトは `astro:after-swap` でもテーマを再適用する（ClientRouter が遷移のたびに `<html>` の属性を置き換えるため）
- 切替ボタンは `ThemeToggle.astro`．アイコンは `light:` カスタムバリアントで出し分ける

### Client-side Navigation (ClientRouter)
- `<ClientRouter />`（`astro:transitions`）は `BaseLayout.astro` の head に置いている
- バンドルされる `<script>` は 1 回の訪問で 1 度しか実行されない．DOM に紐づく初期化は `astro:page-load` で行うか，`document` へのイベント委譲で書く（`ThemeToggle.astro`，`SideNav.astro` が例）
- 遷移のたびに `<html>` の属性が置き換わるので，テーマは `astro:after-swap` で再適用する
- GA は `gtag('config', …, { send_page_view: false })` で自動送信を止め，`astro:page-load` ごとに `page_view` を手動で 1 回送る
- プリフェッチは全リンクで有効（`astro.config.mjs` の `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`）
- クライアントスクリプトを新しく足すときは上記に従う．`is:inline` スクリプトから `document` にリスナーを登録する場合は，`window.__themeSwapBound` のようなフラグで二重登録を防ぐ

### Project Pages
- `src/data/projects/*.ts` の 1 ファイルが 1 プロジェクト．`src/data/projects/index.ts` の配列順が一覧の表示順になる
- 詳細ページ `src/pages/[locale]/projects/[slug]/index.astro` は `getStaticPaths()` で全ロケール × 全 slug を生成する
- 使用技術のタグは `TechTag.astro` で表示する

## Development

```bash
npm ci
npm run dev       # Astro 開発サーバー（http://localhost:4321/en/）
npm run build     # astro check のあと dist/ に静的出力
npm run preview   # wrangler dev で dist/ を配信（http://localhost:8787/en/）
npm run deploy    # build のあと wrangler deploy（通常は CI が実行）
```

- `main` への push で `.github/workflows/deploy.yml` が Cloudflare Workers へデプロイする（Secrets: `CLOUDFLARE_API_TOKEN`，`CLOUDFLARE_ACCOUNT_ID`）
- TypeScript は `@astrojs/check` の peer 範囲（`^5 || ^6`）に合わせて 6 系に据え置いている

### Adding New Project
1. `src/data/projects/` に新規 `.ts` を作成する（既存ファイルをテンプレートとして使う）
2. `src/data/projects/index.ts` の `projects` 配列に追加する
3. `title`，`meta`，`sections` は `ja` と `en` の両方を書く

## Style Guidelines

- 句点: 全角ピリオド `．`
- 読点: 全角カンマ `，`
- 箇条書き: ハイフン `-` を使用
- Gitコミットメッセージ: 英語（Conventional Commits形式推奨）
