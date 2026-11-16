import type { Project } from '@/types';

export const operationsTransformation: Project = {
  slug: 'operations-transformation',
  title: {
    ja: '大手生命保険会社：全社オペレーション変革の技術支援',
    en: 'Major Life Insurer: Technical Support for a Company-Wide Operations Transformation',
  },
  meta: {
    ja: 'グローバルコンサルティングファーム',
    en: 'Global Consulting Firm',
  },
  description: 'Technical support for a life insurer moving toward agent-first operations: AI-agent feasibility checks, an Agent Skills primer, and data conversion for Access',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '大手生命保険会社が，AIエージェントを前提にした業務への変革を全社で進めていた．',
          '2名の技術チームの一員として参画し，各部門の定例で技術面から助言した．チームのタスク管理はGitHub Projectsで立ち上げた．',
        ],
        en: [
          'A major life insurer was transforming its company-wide operations toward work that assumes AI agents.',
          "Joined as one of a two-person tech team and advised each department at its meetings. Set up the team's task management on GitHub Projects.",
        ],
      },
    },
    {
      title: { ja: 'AIエージェントでの実行可否の確認', en: 'Checking Whether an AI Agent Can Run the Work' },
      list: {
        ja: [
          '決算業務の分解: 税務課の決算業務のマニュアルを1文ずつ分け，13の操作に整理した．',
          'チェック表: 13操作それぞれについて，AIエージェントで実行できるかを事前に判定し，実機で検証するためのチェック表をHTMLで作った．操作ごとに理解度（OK・要質問とメモ），成功条件のチェック，実機の結果（OK・NG・部分とメモ）を記録し，ブラウザに自動保存してJSONで書き出せるようにした．',
          '解説資料と指示書: 業務の流れを図で説明する解説資料をHTMLで作り，AIエージェントに渡す業務の指示書を作成した．',
        ],
        en: [
          "Breaking down the closing work: split the tax department's closing manual sentence by sentence into 13 operations.",
          'Checklist: built an HTML checklist to pre-assess and then test hands-on whether an AI agent could run each of the 13 operations. For each operation it records understanding (OK or question, with a memo), success-criteria checks, and the hands-on result (OK, NG, or partial, with a memo); it autosaves in the browser and exports JSON.',
          'Guide and instructions: wrote an HTML guide that explains the workflow with diagrams, and the work instructions handed to the AI agent.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '検証と改訂', en: 'How It Was Verified, and What Changed' },
      content: {
        ja: [
          '観察: 実機検証で，行・列の位置を固定した指示は表の形が変わると動作しないことを確認した．見出しで位置を特定し，実行前に計画の承認を得る形へAIエージェント向けの指示書を改訂した．',
        ],
        en: [
          'Observed: hands-on tests showed fixed row/column instructions broke when table layouts changed; revised the AI agent instructions to locate data by headings and seek plan approval before running.',
        ],
      },
    },
    {
      title: { ja: 'Agent Skillsの入門資料', en: 'Agent Skills Primer' },
      content: {
        ja: [
          'AIエージェント前提の業務への変革に向け，業務手順をAIに指示できる形で定義・伝達する方法(Agent Skills)を体系化し，非技術者のクライアント様向けの入門資料を作成した．',
        ],
        en: [
          'Toward agent-first operations, systematized how to define and convey work procedures in a form AI can follow (Agent Skills) and wrote a primer for non-technical client staff.',
        ],
      },
    },
    {
      title: { ja: '業務分析シートのAccess向け変換(VBA)', en: 'Converting the Task-Analysis Sheet for Access (VBA)' },
      content: {
        ja: [
          '1業務を1行に書き，その横に繰り返しの列グループが続く横持ちのExcelの業務分析シートを，Accessで扱えるよう正規化（縦持ちに再設計）するVBAマクロを作った．',
        ],
        en: [
          'Wrote a VBA macro that normalizes a wide Excel task-analysis sheet (one task per row, followed by repeating column groups) into long format for Access.',
        ],
      },
      list: {
        ja: [
          '正規化: 複数段の見出しを1つの列名に結合し，繰り返しの列グループを自動で検出して，マスタと明細の表に分けた．業務IDの重複も検査する．',
          '出力: CSVはCP932（BOMなし）・CRLF・RFC 4180の引用で書き出し，CSVごとにschema.iniを生成して型を推定した（ID列は長整数に固定，255バイトを超える文字列はメモ型）．',
          '確認用SQL: 元の横持ちの表をJOINで再現するクエリ，表ごとの件数確認，参照整合性を有効にする前の孤立レコードの検出をまとめた．',
        ],
        en: [
          'Normalizing: merged multi-row headers into single column names, detected the repeating column groups automatically, and split the sheet into master and detail tables, checking task IDs for uniqueness.',
          'Output: CSVs in CP932 without BOM, CRLF line endings, and RFC 4180 quoting, with a generated schema.ini per CSV that infers types (ID columns fixed as Long, strings over 255 bytes as Memo).',
          'Check SQL: a query that rebuilds the original wide table with JOINs, row counts per table, and an orphan-record check to run before turning on referential integrity.',
        ],
      },
    },
    {
      title: { ja: '開発中に見つかった問題と対処', en: 'Problems Found During Development, and Fixes' },
      list: {
        ja: [
          '整数と想定した列に小数があり，長整数への固定で取り込みが壊れた → その列は型の推定に任せ，倍精度になるようにした．',
          '値の中の半角カンマで列がずれ，Accessで型変換エラーが出た → 取り込み手順で引用符（"）を文字列の区切りに指定するよう定めた．',
          '壊れた名前定義や外部リンクで実行時エラー1004が出た → リンクを更新せずに開き，予約済み以外の名前定義を消してから処理するようにした．',
        ],
        en: [
          'A column assumed to be integer contained decimals, which broke the fixed Long type → that column is left to type inference and comes out as Double.',
          'Half-width commas inside values shifted columns and caused type-conversion errors in Access → the import guide requires the double quote as the text qualifier.',
          'Broken defined names and external links raised runtime error 1004 → the macro opens the workbook without updating links and deletes non-reserved names first.',
        ],
      },
      content: { ja: [], en: [] },
    },
  ],
  technologies: ['AI Agent', 'Agent Skills', 'HTML', 'JavaScript', 'Excel VBA', 'Microsoft Access', 'SQL', 'GitHub Projects'],
};
