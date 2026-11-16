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
  description: 'Technical support for a life insurer moving toward agent-first operations: data conversion for Access, AI-agent feasibility checks, and an Agent Skills primer',
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
          'Joined as one of a two-person tech team and advised each department at its meetings. Set up the team\'s task management on GitHub Projects.',
        ],
      },
    },
    {
      title: { ja: '業務分析シートのAccess移行(VBA)', en: 'Moving the Business-Analysis Sheet into Access (VBA)' },
      content: {
        ja: [
          'Excelの業務分析シートは，1業務を1行に書き，その横に「アクション・基盤名・ステップ詳細」の3列の組を繰り返す横持ちの表だった．これをAccessで扱えるよう正規化（縦持ちに再設計）し，取り込み用のCSVに変換するVBAマクロを作った．',
          'VBAにしたのは，作業する会社のWindows PCにPythonを入れられるとは限らず，データを外に出さずに済み，AccessはCSVを直接取り込めるため（チームの方針として議事録に記録）．',
        ],
        en: [
          'The Excel business-analysis sheet was a wide table: one business per row, followed by repeated three-column sets of action, platform name, and step detail. Wrote a VBA macro that normalizes it into long format for Access and converts it into CSVs for import.',
          "VBA was chosen because Python could not be assumed on the company's Windows PCs, the data could stay inside, and Access imports CSV directly (the team's decision, recorded in the meeting notes).",
        ],
      },
      list: {
        ja: [
          '表の整形: 壊れた名前定義を消し，実際の表の範囲を切り出し，3段の見出しを1つの列名に結合して，Accessで使える列名に直す．',
          '縦持ち化: 繰り返す3列の組を自動で検出し，業務の基本情報（業務IDの重複を検査）と，業務ID・ステップ番号をキーにしたステップの縦持ちの表に分ける．',
          '出力: 業務マスタ・業務ステップ・アクションと基盤の組合せ・基盤の内訳の4表をCSVで書き出す．文字コードはCP932（BOMなし），改行はCRLF，値の引用はRFC 4180に従う．',
          '型の定義: CSVごとにschema.iniを生成し，ID列は長整数に固定，それ以外は値から長整数・倍精度・テキスト（幅はCP932のバイト数）・255バイト超ならメモ型を推定する．',
          'SQL: 元の横持ちの表をJOINで再現するクエリ，表ごとの件数確認，参照整合性を有効にする前の孤立ステップの検出をまとめた．',
          '推定: 実データの業務シート（1,173行×367列）で同じ変換をPythonで再現すると，1,169業務・109組のステップから23,866行の縦持ちデータになる（VBA自体の実行計測ではない）．',
        ],
        en: [
          'Cleaning: delete broken defined names, cut out the real table range, merge the three-row header into one column name, and make names Access-safe.',
          'Melting: detect the repeating three-column sets automatically and split the sheet into a business master (business IDs checked for uniqueness) and a long-format step table keyed by business ID and step number.',
          'Output: four CSVs (business master, business steps, action-platform combinations, platform breakdown) in CP932 without BOM, CRLF line endings, and RFC 4180 quoting.',
          'Types: a schema.ini per CSV, with ID columns fixed as Long and other columns inferred as Long, Double, Text (width in CP932 bytes), or Memo above 255 bytes.',
          'SQL: a query that rebuilds the original wide table with JOINs, row counts per table, and an orphan-step check to run before turning on referential integrity.',
          'Estimated: re-running the same conversion in Python on the real sheet (1,173 rows by 367 columns) gives 23,866 long-format rows from 1,169 businesses and 109 step sets (not a measurement of the VBA itself).',
        ],
      },
    },
    {
      title: { ja: '移行で見つかった問題と対処', en: 'Problems Found in the Migration, and Fixes' },
      list: {
        ja: [
          '年間件数に小数（例: 0.1件/年）があり，長整数への固定で取り込みが壊れた → その列は推定に任せ，倍精度になるようにした．',
          '値の中の半角カンマで列がずれ，Accessで型変換エラーが出た → 取り込み手順で引用符（"）を文字列の区切りに指定するよう定めた．',
          '壊れた名前定義や外部リンクで実行時エラー1004が出た → リンクを更新せずに開き，予約済み以外の名前定義を消してから処理する．',
          'UTF-8の.basファイルをエディタ経由で貼るとVBEで文字化けした → GitHubの「Copy raw file」から貼る手順にし，そのまま貼れるようモジュール名の行を外した．Mac版Excelは対象外と明記した．',
        ],
        en: [
          'Annual counts had decimals (for example 0.1 per year), which broke the fixed Long type → that column is left to inference and comes out as Double.',
          'Half-width commas inside values shifted columns and caused type-conversion errors in Access → the import guide requires the double quote as the text qualifier.',
          'Broken defined names and external links raised runtime error 1004 → the macro opens the workbook without updating links and deletes non-reserved names first.',
          'A UTF-8 .bas file pasted through an editor turned into mojibake in the VBE → the guide says to copy from GitHub\'s "Copy raw file", and the module-name line was removed so the file pastes as is. Mac Excel is documented as unsupported.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: 'AIエージェントでの実行可否の確認', en: 'Checking Whether an AI Agent Can Run the Work' },
      list: {
        ja: [
          '決算業務の分解: 税務課の決算業務のマニュアルを1文ずつ分け，13の操作に整理した．',
          'チェック表: 13操作それぞれについて，AIエージェントで実行できるかを事前に判定し，実機で検証するためのチェック表をHTMLで作った．操作ごとに理解度（OK・要質問とメモ），成功条件のチェック，実機の結果（OK・NG・部分とメモ）を記録し，ブラウザに自動保存してJSONで書き出せる．',
          '解説資料: 業務の流れを図で説明する解説資料をHTMLで作成した．',
          '指示書: AIエージェントに渡す業務の指示書を作成した．',
        ],
        en: [
          "Breaking down the closing work: split the tax department's closing manual sentence by sentence into 13 operations.",
          'Checklist: an HTML checklist to pre-assess and then test hands-on whether an AI agent could run each of the 13 operations. For each operation it records understanding (OK or question, with a memo), success-criteria checks, and the hands-on result (OK, NG, or partial, with a memo); it autosaves in the browser and exports JSON.',
          'Guide: an HTML guide that explains the workflow with diagrams.',
          'Instructions: wrote the work instructions handed to the AI agent.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '検証と改訂', en: 'How It Was Verified, and What Changed' },
      content: {
        ja: [
          '観察: 実機検証で，表の行・列の位置を固定した指示は，表の形が変わると動作しないことを確認した．',
          '改訂: これを受けて，AIエージェント向けの指示書を改訂した．位置は行・列の番号ではなく見出しで特定し，実行の前に計画を示して承認を得てから動く形にした．',
        ],
        en: [
          'Observed: hands-on tests showed that instructions with fixed row and column positions broke when the table layout changed.',
          'Revision: in response, revised the instructions for the AI agent: locate data by headings instead of row and column numbers, and present a plan for approval before running.',
        ],
      },
    },
    {
      title: { ja: 'Agent Skills の入門資料', en: 'Agent Skills Primer' },
      content: {
        ja: [
          'AIエージェント前提の業務への変革に向け，業務手順をAIに指示できる形で定義・伝達する方法(Agent Skills)を体系化し，非技術者のクライアント様向けの入門資料を作成した．10枚の原稿から始め，レビューを経て18枚の構成にした．',
        ],
        en: [
          'Toward agent-first operations, systematized how to define and convey work procedures in a form AI can follow (Agent Skills) and wrote a primer for non-technical client staff, growing from a 10-slide draft to an 18-slide deck through review.',
        ],
      },
    },
  ],
  technologies: ['Excel VBA', 'Microsoft Access', 'SQL', 'schema.ini', 'HTML', 'JavaScript', 'AI Agent', 'Agent Skills', 'GitHub Projects'],
};
