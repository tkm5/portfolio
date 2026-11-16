import type { Project } from '@/types';

export const gasPaymentTable: Project = {
  slug: 'gas-payment-table',
  title: {
    ja: '支払予定表自動作成システム',
    en: 'Payment Schedule Automation',
  },
  meta: {
    ja: '業務委託 | Forward Deployed Engineer',
    en: 'Commissioned Work | Forward Deployed Engineer',
  },
  description: 'A Google Apps Script system that reads invoices on Google Drive with the Gemini API and builds a monthly payment schedule in Google Sheets',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          'Google Driveに届く請求書（PDF・JPEG）を読み，支払先・金額・支払方法を支払予定表に転記する手作業を自動化するため，Google Apps Script(GAS)のシステムを作った．GASには1回の実行時間の上限があり，請求書が多い月でも途中で止まらずに処理を続けられることが求められた．',
        ],
        en: [
          'Built a Google Apps Script (GAS) system that automates the manual work of reading invoices (PDF and JPEG) arriving on Google Drive and copying the payee, amount, and payment method into a payment schedule. GAS limits how long one run can take, so the system had to keep making progress even in months with many invoices.',
        ],
      },
    },
    {
      title: { ja: '構成と処理の流れ', en: 'Structure and Flow' },
      content: {
        ja: [
          '設定・メイン処理・Drive・Gemini・スプレッドシートの5つのモジュールに分け，スプレッドシートのメニューから実行する．1件ずつ，請求書を読み取り → ファイル名を付け直し → 支払予定表に書き込み → 処理済みフォルダへ移動する．',
        ],
        en: [
          'Five modules (config, main flow, Drive, Gemini, and spreadsheet), run from a spreadsheet menu. Each invoice is read, renamed, written to the payment schedule, and moved to a processed folder, one at a time.',
        ],
      },
      list: {
        ja: [
          '読み取り: Gemini APIのJSONモードで，会社名・金額・カナ読み・支払方法の4項目を1回の呼び出しで取り出す．出力の形はプロンプトで指定し，受け取り側の会社名は抜き出さないよう指示して，発行元を会社名として取る．',
          '会社名の正規化: Unicode NFKCで表記をそろえ，法人格の表記ゆれ（(株)・株式会社など）を対応表で正式な形に統一し，末尾の敬称と空白・制御文字を取り除く．モデルの出力は正規化済みと信用せず，同じ規則をコードでもかける．',
          '会社マスタ: 新しい会社は自動で登録し，カナ読みが空なら補い，マスタをカナ順に並べ直す．支払予定表はマスタからカナ読みを引いてカナ順に並べる．',
          '月別のシート: 月ごとのシートに支払先ごとの行で書き込む．',
        ],
        en: [
          "Reading: Gemini API JSON mode extracts four fields (company name, amount, kana reading, payment method) in one call. The output shape is given in the prompt, and the prompt tells the model not to extract the receiving company's name, so the issuer becomes the company name.",
          'Name normalization: Unicode NFKC, a mapping table that unifies legal-entity notations (such as (株) and 株式会社), and removal of trailing honorifics, whitespace, and control characters. The model output is not trusted to be normalized; the same rules run in code.',
          'Company master: new companies are registered automatically, missing kana readings are filled in, and the master is re-sorted by kana. The payment schedule looks up kana from the master and is sorted by it.',
          'Monthly sheets: rows are written per payee on each month\'s sheet.',
        ],
      },
    },
    {
      title: { ja: 'GASの制約への対処と設計の判断', en: 'Handling GAS Limits, and Design Decisions' },
      list: {
        ja: [
          '時間の上限: 1件を処理する前に経過時間を確かめ，5分を過ぎていればそこで止めて（GASの上限は6分），処理済みと残りの件数を知らせる．処理済みのファイルは未処理フォルダから移動するので，もう一度実行すれば残りから再開する．',
          '二重実行の防止: スクリプトロックで，2つの実行が同時に走らないようにした．',
          '失敗の扱い: Gemini APIのエラーや応答の形の誤りは「要確認」シートに記録し，次のファイルへ進む．失敗したファイルは未処理フォルダに残るので，次の実行で再び処理される．',
          '秘密情報とモデル: APIキーはコードに書かずスクリプトプロパティに置く．使うモデルは共有のモデル登録情報から生成した設定ファイルで決め，スクリプトプロパティで上書きできるようにした．GASはローカルの登録情報を読めないため，生成したファイルに埋め込む形にした．',
        ],
        en: [
          'Time limit: elapsed time is checked before each file; once 5 minutes have passed the run stops there (the GAS limit is 6 minutes) and reports how many files were processed and how many remain. Processed files leave the unprocessed folder, so running again resumes from the rest.',
          'No double runs: a script lock keeps two runs from executing at once.',
          'Failures: Gemini API errors and malformed responses are recorded on a separate "needs review" sheet and the loop moves on. Failed files stay in the unprocessed folder, so the next run retries them.',
          'Secrets and model: the API key lives in script properties, not code. The model comes from a config file generated from a shared model registry and can be overridden per deployment with a script property; because GAS cannot read the local registry, the value is baked into the generated file.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '開発と検証', en: 'Development and Verification' },
      content: {
        ja: [
          'claspでローカルとGASを同期して開発した．自動テストはなく，clasp pushのあとスプレッドシートから実行し，手順書の確認項目で動作を確かめる．',
        ],
        en: [
          'Developed with clasp to sync local files and GAS. There are no automated tests; after clasp push the system is run from the spreadsheet and checked against a manual checklist.',
        ],
      },
    },
  ],
  technologies: [
    'Google Apps Script',
    'Gemini API',
    'Google Drive (DriveApp)',
    'Google Sheets (SpreadsheetApp)',
    'UrlFetchApp',
    'LockService',
    'clasp',
    'JavaScript',
  ],
};
