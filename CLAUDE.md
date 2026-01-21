# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

個人ポートフォリオサイト．静的HTML/CSS/JavaScriptで構成されたビルドツール不要のシンプルな構成．

## Architecture

```
portfolio/
├── index.html          # メインページ（About, Experience, Projects, Skills）
├── contact.html        # お問い合わせフォーム
├── imprint.html        # 法的情報
├── css/style.css       # 全ページ共通スタイル（CSS変数によるダーク/ライトテーマ）
├── js/main.js          # 言語切替・テーマ切替・スクロール検知
└── projects/           # プロジェクト詳細ページ（各HTMLファイル）
```

## Key Patterns

### Internationalization (i18n)
- `data-ja` と `data-en` 属性を使用した多言語対応
- 例: `<p data-ja="日本語テキスト" data-en="English text">日本語テキスト</p>`
- `js/main.js` の `setLanguage()` が言語切替を処理

### Theming
- CSS変数（`:root` と `[data-theme="light"]`）でダーク/ライトモード対応
- `js/main.js` の `setTheme()` がテーマ切替を処理
- システム設定（`prefers-color-scheme`）を初期値として使用

### Project Pages
- `projects/` ディレクトリ内の各HTMLファイルは同一構造
- `.project-section` で各セクション（概要，アーキテクチャ，使用技術等）を区切る
- `.tech-tags` で使用技術をタグ表示

## Development

### Local Preview
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

### Adding New Project
1. `projects/` に新規HTMLファイルを作成（既存ファイルをテンプレートとして使用）
2. `index.html` の `#projects` セクションにリンクを追加
3. `data-ja` と `data-en` 属性で日英両方のテキストを設定

## Style Guidelines

- 句点: 全角ピリオド `．`
- 読点: 全角カンマ `，`
- 箇条書き: ハイフン `-` を使用
- Gitコミットメッセージ: 英語（Conventional Commits形式推奨）
