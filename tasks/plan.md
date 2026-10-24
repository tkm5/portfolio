# Implementation Plan: Astro のまま SPA 的な遷移にする

## Context

ポートフォリオサイト（Astro 7 静的出力，Tailwind 4，Cloudflare Workers static assets）を「見た目はそのまま，モダンなアーキテクチャに」したいという依頼．相談の結果，次を確定した．

- Next.js からの移行はすでに完了しており（PR #1），Astro 7 と Cloudflare Workers は現時点で最新構成．フレームワークは変えない．
- 「SPA にして takumig.io 固定」は，ホストは takumig.io のまま，URL パス（`/ja/projects/xxx/`）は残し，ページ遷移だけをクライアント側で行う形（ベストプラクティス）に決定．
- 手段は Astro 組み込みの `<ClientRouter />`（View Transitions）と prefetch．全ページは引き続き静的 HTML として prerender され，直リンクと SEO は維持される．

## Architecture Decisions

- `<ClientRouter />` を `BaseLayout.astro` の `<head>` に置く（`astro:transitions` から import）．アニメーションは既定の fade を使う（遷移の体感のみ変わり，見た目は変えない）．
- prefetch は ClientRouter 使用時の既定（`prefetchAll: true`，hover 戦略）を採用し，`astro.config.mjs` に明示的に書いて意図を残す．
- クライアント側遷移では，バンドルされた `<script>` は初回のみ実行され，`<html>` の属性は新ページのもので置き換わる．よって次の 3 点を直す．
  - テーマ: 起動スクリプトの処理を関数化し，初回実行に加えて `astro:after-swap` でも再適用する（描画前に class を戻すので光らない）．
  - 切替ボタン / サイドナビ: DOM が差し替わるので，`document` へのイベント委譲または `astro:page-load` で再初期化する．scroll リスナーは一度だけ登録し，対象リンクは `astro:page-load` ごとに再取得する．
  - Google Analytics: `gtag('config', …, { send_page_view: false })` にし，`astro:page-load` で毎回 `page_view` を送る（初回も含めて一本化）．
- `TopNav.astro` のロゴリンクは `/` から `/${locale}/` にする．`/` は Cloudflare の 301 で `/en/` に飛ぶため，クライアント側遷移で無駄なリダイレクトを踏まない．
- 依存の更新は wrangler のマイナー更新のみ．TypeScript 7 は `@astrojs/check` の peer 範囲（`^5 || ^6`）外なので据え置く（CLAUDE.md に既存の記載どおり）．

## Task List

### Phase 0: 計画の書き出し
- [ ] Task 0: `tasks/plan.md` と `tasks/todo.md` をこの計画から作成する（plan mode では書けないため実装の最初に行う）

### Phase 1: 遷移の基盤
- [ ] Task 1: `BaseLayout.astro` に `<ClientRouter />` を追加し，テーマ起動スクリプトを `astro:after-swap` 対応にする
  - 受け入れ: ホーム → プロジェクト詳細 → 戻る，でフルリロードが起きず，ライトテーマが遷移をまたいで維持される
  - 対象: `src/layouts/BaseLayout.astro`
- [ ] Task 2: `astro.config.mjs` に `prefetch` 設定を明示する
  - 受け入れ: `npm run build` が通り，dist の HTML に prefetch 用スクリプトが含まれる
  - 対象: `astro.config.mjs`

### Checkpoint A
- [ ] `npm run build`（astro check を含む）が成功する
- [ ] `npm run preview` で遷移がクライアント側になっている（Network に document 再取得がない）

### Phase 2: 遷移後も動く UI
- [ ] Task 3: `ThemeToggle.astro` をイベント委譲 + `astro:page-load` でのラベル更新に書き換える
  - 受け入れ: 遷移後のページでもテーマ切替が動き，aria-label が正しい
  - 対象: `src/components/ui/ThemeToggle.astro`
- [ ] Task 4: `SideNav.astro` のアクティブ表示を `astro:page-load` で再初期化する（scroll リスナーは一度だけ）
  - 受け入れ: 詳細ページから `#projects` へ戻った直後にサイドナビのハイライトが正しい．リスナーが重複登録されない
  - 対象: `src/components/layout/SideNav.astro`
- [ ] Task 5: GA の page_view を `astro:page-load` に一本化し，`TopNav.astro` のロゴを `/${locale}/` にする
  - 受け入れ: 初回ロードで page_view が 1 回，遷移ごとに 1 回送られる（dataLayer を確認）．ロゴクリックで 301 を踏まない
  - 対象: `src/layouts/BaseLayout.astro`，`src/components/layout/TopNav.astro`

### Checkpoint B
- [ ] `npm run build` が成功する
- [ ] ブラウザで一連の操作（テーマ切替 → 詳細へ → 言語切替 → 戻る → サイドナビ）がすべて動き，console にエラーがない

### Phase 3: 仕上げ
- [ ] Task 6: `wrangler` をマイナー更新し（4.152.0），`npm run preview` で配信を確認する
  - 対象: `package.json`，`package-lock.json`
- [ ] Task 7: `CLAUDE.md` の Key Patterns に ClientRouter とライフサイクルイベントの扱いを追記する（承認後に doc-updater へ委譲）
  - 対象: `CLAUDE.md`

### Checkpoint: Complete
- [ ] 全受け入れ条件を満たす
- [ ] 見た目（配色，レイアウト，文言）に差分がない
- [ ] PR を作成し，CI（deploy.yml）のビルドが通る

## Verification

1. `npm run build` で `astro check` と静的出力を通す．
2. `npm run preview`（http://localhost:8787/en/）を claude-in-chrome で開き，次を確認する．
   - ホーム → 任意のプロジェクト → ブラウザの戻る．document の再取得が無く，スクロール位置が復元される．
   - ライトテーマに切替 → 詳細ページへ．テーマが維持され，一瞬のちらつきが無い．
   - 詳細ページで言語切替（`/ja/` ↔ `/en/`）．`<html lang>` が切り替わる．
   - ホームに戻ってスクロール．サイドナビのハイライトが追従する．
   - console にエラーが無い．`window.dataLayer` に遷移ごとの page_view がある．
3. `/en/nonexistent/` で 404 が返ること（既存挙動の維持）．

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| View Transitions 非対応ブラウザ | Low | Astro が自動でフォールバック（アニメーション無しのクライアント遷移）する |
| スクリプト再初期化漏れで遷移後に UI が死ぬ | Med | Checkpoint B の操作シナリオで全 UI を踏む |
| GA の page_view 二重送信 | Low | `send_page_view: false` にして送信を一か所に集約する |
| 既定 fade が「見た目そのまま」の意図とずれる | Low | 不要なら `<ClientRouter />` に `transition:animate="none"` を付けるだけで消せる |

## Routing（実装時）

- 実装: `cc-delegate -m sonnet -r impl`（仕様は確定済み，判断の余地が小さい）
- レビュー: `cc-review-tier` の出力に従う（変更量は 200 行未満の見込み → sonnet）
- ブラウザ確認: main session の claude-in-chrome
