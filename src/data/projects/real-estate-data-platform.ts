import type { Project } from '@/types';

export const realEstateDataPlatform: Project = {
  slug: 'real-estate-data-platform',
  title: {
    ja: '不動産アセットマネジメント会社：情報一元化とAI Ready基盤の提案',
    en: 'Real-Estate Asset Management Company: Information Consolidation and AI-Ready Platform Proposal',
  },
  meta: {
    ja: '個人受託 | Forward Deployed Engineer',
    en: 'Independent Engagement | Forward Deployed Engineer',
  },
  description: 'Requirements and architecture for a unified database and a platform where AI agents can safely use the data',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '賃貸管理の契約・台帳の情報が，紙・個人のExcel・付箋・各システムに分散していた．申込から請求までの作業が担当者1名に集中し，個別の契約条件は担当者でないと分からないため，担当者が不在だと作業も問い合わせ対応も止まる属人化が起きていた．',
        ],
        en: [
          'Rental-management contracts and ledgers were scattered across paper, personal Excel files, sticky notes, and several systems. Work from application to billing sat with one person, and only that person knew the individual contract terms, so work and inquiries stalled whenever they were away.',
        ],
      },
    },
    {
      title: { ja: '受入基準の定義', en: 'Defining the Acceptance Criteria' },
      content: {
        ja: [
          '属人化という課題に対し，確かめられる形の受入基準を要件定義書に定義した．',
        ],
        en: [
          'For the dependency on one person, defined checkable acceptance criteria in the requirements document.',
        ],
      },
      list: {
        ja: [
          '担当者以外が，案件の進捗と不足書類を説明できること．',
          '現行のExcelと同じ金額を再現できること．',
        ],
        en: [
          'Someone other than the person in charge can explain each case\'s progress and missing documents.',
          'The system reproduces the same amounts as the current Excel files.',
        ],
      },
    },
    {
      title: { ja: '提案した構成', en: 'Proposed Architecture' },
      list: {
        ja: [
          '統合DB: 台帳を統合DB（PostgreSQL）に集め，情報を一元化する．',
          'セマンティックレイヤー: dbt coreを第一候補にした．',
          'AI Ready: 将来AIエージェントが安全にデータへ届くように，指標の定義をコードで持つこと，原本の保持・来歴・権限を設計に入れ，AIとの接続点は読み取り専用のMCPサーバーとして設計した．エージェント本体は作らない範囲とした．',
        ],
        en: [
          'Unified database: gather the ledgers into one database (PostgreSQL).',
          'Semantic layer: dbt Core as the first choice.',
          'AI-ready: so that AI agents can later reach the data safely, the design covers metric definitions in code, keeping the original documents, lineage, and permissions, and a read-only MCP server as the connection point for AI. Building the agent itself was out of scope.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '担当範囲', en: 'My Role' },
      content: {
        ja: [
          '要件定義書の作成と構成の選定を担当した．案件の範囲は提案と要件定義まで．',
        ],
        en: [
          'Owned the requirements document and the architecture selection. The engagement covered the proposal and requirements definition.',
        ],
      },
    },
  ],
  technologies: ['PostgreSQL', 'dbt Core', 'MCP', 'Requirements Definition'],
};
