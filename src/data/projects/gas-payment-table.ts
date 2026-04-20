import type { Project } from '@/types';

export const gasPaymentTable: Project = {
  slug: 'gas-payment-table',
  title: {
    ja: '支払予定表自動作成システム',
    en: 'Invoice Payment Schedule Automation',
  },
  meta: {
    ja: '業務委託',
    en: 'Commissioned Work',
  },
  description: 'Invoice Payment Schedule Automation',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'Google Driveに蓄積される請求書PDFをGemini APIで構造化抽出し，Googleスプレッドシート上に支払予定表を自動生成するGoogle Apps Scriptシステムを開発．月次50件以上の請求書処理に耐えるよう，GASの実行時間制限を回避する継続実行パターンと，会社名マスタを自動保守する仕組みを実装し，経理担当者の手作業を大幅に削減した．',
        ],
        en: [
          'Built a Google Apps Script system that extracts invoice PDFs from Google Drive through the Gemini API and auto-populates a payment schedule in Google Sheets. A continuation-execution pattern that works around the GAS runtime-time limit, together with automatic maintenance of a company master, makes the monthly 50+ invoice workload feasible and cuts accounting-side manual work significantly.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          '単一ファイル肥大化を避け，`Config.js` / `Main.js` / `GeminiService.js` / `DriveService.js` / `SheetService.js` の5モジュールで責務を分割．GAS特有の「関数単位でしかトリガを張れない」制約の中でも，サービス層を明確に分けることでテスト対象とモック対象を分離できる構成にした．',
          'APIキー等の機密情報は `Config.js` に直接書かず，GASのスクリプトプロパティに格納．コードリポジトリに秘密が混入せず，かつ環境ごとに値を差し替えられる運用とした．ローカル開発は clasp を採用し，`clasp push / pull / open` でGAS側との双方向同期を取りながらGitでバージョン管理している．',
        ],
        en: [
          "To avoid a single-file blob, the code is split across five modules — `Config.js`, `Main.js`, `GeminiService.js`, `DriveService.js`, `SheetService.js`. Even inside the GAS constraint that triggers can only bind to top-level functions, clearly separating the service layer keeps test targets and mock surfaces decoupled.",
          'Secrets such as API keys are never written into `Config.js`; they live in GAS script properties. The repo therefore never carries secrets, and environment-specific values can be swapped without code changes. Local development uses clasp (`clasp push / pull / open`) to keep the GAS side in sync while the code is versioned in Git.',
        ],
      },
    },
    {
      title: { ja: '主要機能', en: 'Key Features' },
      content: {
        ja: [
          '請求書PDFの構造化抽出: `GeminiService.js` が `response_mime_type: "application/json"` と明示的なJSONスキーマで Gemini を呼び出し，`companyName` / `amount` / `kanaReading` / `paymentMethodStr` の4項目を1コールで抽出．視覚モデルにより，赤ペンで囲まれた金額を優先して拾うプロンプトを組み込んだ．',
          '会社マスタ自動管理: `SheetService.js` の `addOrUpdateCompany()` が新規会社を自動登録し，カタカナ読みが未設定なら補完．`sortMasterByKana()` で五十音順を維持するため，支払予定表の並びも自動的に整列される．',
          '会社名正規化: `normalizeCompanyName()` で Unicode NFKC正規化に加え，「(株)」「㈱」「㈲」など16種の法人格表記を公式名称へ統一．敬称（「御中」「様」）の除去，英数字の半角大文字化，スペース圧縮を段階適用し，マスタのキー衝突を未然に防いでいる．',
          'エラー導線: 読み取りに失敗した請求書は「要確認シート」にファイルリンクと失敗理由を付けて記録．後から手動対応する際の発見性を確保した．',
        ],
        en: [
          "Structured invoice extraction: `GeminiService.js` calls Gemini with `response_mime_type: \"application/json\"` and an explicit JSON schema, pulling `companyName`, `amount`, `kanaReading`, and `paymentMethodStr` in a single call. The prompt leans on the model's vision capability so amounts circled in red pen are preferred when multiple numbers appear.",
          "Self-maintaining company master: `addOrUpdateCompany()` in `SheetService.js` registers new companies automatically and fills in missing katakana readings. `sortMasterByKana()` keeps the master in Japanese-syllabary order, so the payment schedule also renders in that order without extra sorting.",
          "Company-name normalization: `normalizeCompanyName()` applies Unicode NFKC plus a 16-entry mapping that unifies legal-entity notations ('(株)', '㈱', '㈲', etc.) to the canonical form. Honorifics ('御中', '様') are stripped, ASCII is uppercased and halfwidth-normalized, and whitespace is collapsed — all in sequence — which prevents key collisions in the master.",
          "Error path: invoices that fail to parse are recorded in a 'needs review' sheet with a file link and the failure reason, so manual follow-up is always discoverable.",
        ],
      },
    },
    {
      title: { ja: 'GAS制約を回避する工夫', en: 'Working Around GAS Limits' },
      content: {
        ja: [
          'Main.js の `isApproachingTimeLimit()` が GAS の6分実行制限に対して5分時点で検知し，安全に処理を中断．その時点までの処理済ファイル一覧を保存してから次回起動時にスキップしつつ再開する「継続実行パターン」を実装した．50件超の請求書でも確実に処理完了まで辿り着ける．',
          'ユーザー通知では「残り◯件」と進捗数を明示．バックグラウンド処理が見えないGASアプリで陥りがちな「動いているのか分からない」問題を，Drive / Sheet への段階的書き出しと通知の2経路で解消した．',
        ],
        en: [
          "`isApproachingTimeLimit()` in `Main.js` trips at the five-minute mark so the script aborts safely inside the GAS six-minute ceiling. A continuation pattern persists the list of files already processed and skips them on the next run, so 50+ invoice batches always finish end-to-end.",
          "Progress notifications spell out 'N files remaining'. GAS jobs are famously invisible; explicit progress messages combined with incremental writes to Drive and Sheets make it clear the job is alive.",
        ],
      },
    },
    {
      title: { ja: '開発環境', en: 'Development' },
      content: {
        ja: [
          'ローカル開発は clasp を採用し GAS の双方向同期を取りながら，コミットはGitで管理．スクリプトプロパティの運用手順・`clasp push` の流れを `CLAUDE.md` に明文化し，引き継ぎや再構築を容易にしている．',
        ],
        en: [
          'Local development runs through clasp for two-way sync with GAS, and commits land in Git. Script-property setup and the `clasp push` flow are documented in `CLAUDE.md`, making handover and rebuilds straightforward.',
        ],
      },
    },
  ],
  technologies: [
    'Google Apps Script',
    'Gemini API',
    'Google Drive API',
    'Google Sheets API',
    'clasp',
    'PropertiesService',
    'Unicode NFKC',
    'JSON Schema',
    'PDF Processing',
  ],
};
