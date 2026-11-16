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
  description: 'Technical support for a life insurer moving toward agent-first operations: feasibility checks, hands-on tests, and an Agent Skills primer',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '大手生命保険会社が，AIエージェントを前提にした業務への変革を全社で進めていた．',
          '2名の技術チームの一員として参画し，各部門の定例で技術面から助言した．'
        ],
        en: [
          'A major life insurer was transforming its company-wide operations toward work that assumes AI agents.',
          'Joined as one of a two-person tech team and advised each department at its meetings.',
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      list: {
        ja: [
          '決算業務の分解: 税務課の決算業務のマニュアルを1文ずつ分け，13の操作に整理した．',
          'チェック表と解説資料: 13操作それぞれについて，AIエージェントで実行できるかを事前に判定し，実機で検証するためのチェック表と，業務の解説資料を作成した．',
          'Agent Skills: 業務手順をAIに指示できる形で定義・伝達する方法(Agent Skills)を体系化し，非技術者のクライアント様向けの入門資料を作成した．',
        ],
        en: [
          'Breaking down the closing work: split the tax department\'s closing manual sentence by sentence into 13 operations.',
          'Checklist and guide: for each of the 13 operations, built a checklist to pre-assess and then test hands-on whether an AI agent could run it, plus a guide that explains the work.',
          'Agent Skills: systematized how to define and convey work procedures in a form AI can follow (Agent Skills) and wrote a primer for non-technical client staff.',
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
  ],
  technologies: ['AI Agent', 'Agent Skills', 'HTML'],
};
