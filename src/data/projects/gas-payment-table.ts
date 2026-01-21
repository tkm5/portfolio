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
          'Google Driveに保存された請求書PDFをGemini APIで読み取り，スプレッドシートに支払予定表を自動作成するGoogle Apps Scriptシステムを開発．月次の経理業務を大幅に効率化．',
        ],
        en: [
          'Developed a Google Apps Script system that reads invoice PDFs stored in Google Drive using Gemini API and automatically creates payment schedules in spreadsheets. Significantly streamlined monthly accounting operations.',
        ],
      },
    },
    {
      title: { ja: '主要機能', en: 'Key Features' },
      content: {
        ja: [
          '請求書PDF自動読取: Gemini APIを活用し，会社名・税込金額・支払方法を自動抽出．赤ペンで囲まれた金額を優先的に認識．',
          '会社マスタ自動管理: 新規会社は自動追加，カタカナ読みによる五十音順ソートを実装．会社名は正式名称に自動統一（「(株)」->「株式会社」）．',
          '大量ファイル処理: GASの実行時間制限（5分）を考慮した継続処理機能を実装．50枚以上の請求書も自動中断・再開で確実に処理．',
          'エラーハンドリング: 読み取り失敗時は要確認シートに記録し，ファイルリンク付きで手動対応をサポート．',
        ],
        en: [
          'Automatic Invoice Reading: Extracts company name, total amount, and payment method using Gemini API. Prioritizes amounts circled in red pen.',
          'Automatic Company Master Management: Auto-adds new companies, implements sorting by Japanese syllabary using katakana readings. Auto-normalizes company names to official format.',
          'Bulk File Processing: Implemented continuation processing considering GAS execution time limit (5 min). Reliably processes 50+ invoices with auto-pause and resume.',
          'Error Handling: Records failed readings in a review sheet with file links to support manual intervention.',
        ],
      },
    },
    {
      title: { ja: 'システム構成', en: 'System Architecture' },
      content: {
        ja: [
          'モジュラー設計でConfig/Main/GeminiService/DriveService/SheetServiceに分離．claspによるローカル開発環境を構築し，バージョン管理とデプロイを効率化．',
        ],
        en: [
          'Modular design separating Config/Main/GeminiService/DriveService/SheetService. Built local development environment with clasp for efficient version control and deployment.',
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
    'PDF Processing',
  ],
};
