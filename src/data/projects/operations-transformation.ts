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
  description: 'Technical support for a life insurer moving toward agent-first operations: AI-agent feasibility checks on real work, revised agent instructions, and an Agent Skills primer',
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
  ],
  technologies: ['AI Agent', 'Agent Skills', 'HTML', 'JavaScript', 'GitHub Projects'],
};
