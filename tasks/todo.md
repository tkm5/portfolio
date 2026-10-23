# Todo: Astro のまま SPA 的な遷移にする

計画の詳細は `tasks/plan.md` を参照．

## Phase 0: 計画の書き出し
- [x] Task 0: `tasks/plan.md` と `tasks/todo.md` を作成する

## Phase 1: 遷移の基盤
- [x] Task 1: `BaseLayout.astro` に `<ClientRouter />` を追加し，テーマ起動スクリプトを `astro:after-swap` 対応にする
- [x] Task 2: `astro.config.mjs` に `prefetch` 設定を明示する

### Checkpoint A
- [x] `npm run build`（astro check を含む）が成功する
- [x] `npm run preview` で遷移がクライアント側になっている（Network に document 再取得がない）

## Phase 2: 遷移後も動く UI
- [x] Task 3: `ThemeToggle.astro` をイベント委譲 + `astro:page-load` でのラベル更新に書き換える
- [x] Task 4: `SideNav.astro` のアクティブ表示を `astro:page-load` で再初期化する（scroll リスナーは一度だけ）
- [x] Task 5: GA の page_view を `astro:page-load` に一本化し，`TopNav.astro` のロゴを `/${locale}/` にする

### Checkpoint B
- [x] `npm run build` が成功する
- [x] ブラウザで一連の操作（テーマ切替 → 詳細へ → 言語切替 → 戻る → サイドナビ）がすべて動き，console にエラーがない

## Phase 3: 仕上げ
- [x] Task 6: `wrangler` をマイナー更新し（4.152.0），`npm run preview` で配信を確認する
- [x] Task 7: `CLAUDE.md` の Key Patterns に ClientRouter とライフサイクルイベントの扱いを追記する

## Checkpoint: Complete
- [x] 全受け入れ条件を満たす
- [x] 見た目（配色，レイアウト，文言）に差分がない
- [ ] PR を作成し，CI（deploy.yml）のビルドが通る
