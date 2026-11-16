import type { Project } from '@/types';

export const realEstateDataPlatform: Project = {
  slug: 'real-estate-data-platform',
  title: {
    ja: '不動産アセットマネジメント会社：情報一元化とAI Ready基盤の提案',
    en: 'Real-Estate Asset Management Company: Information Consolidation and AI-Ready Platform Proposal',
  },
  meta: {
    ja: '業務委託 | Forward Deployed Engineer',
    en: 'Commissioned Work | Forward Deployed Engineer',
  },
  description: 'Requirements and architecture for a unified database and a platform where AI agents can safely use the data',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '契約・台帳の情報が個人のExcelなどに分散し，担当者が不在だと作業も問い合わせ対応も止まる属人化が起きていた．',
        ],
        en: [
          'Contract and ledger information was scattered across personal Excel files and the like, so work and inquiries stalled whenever the person in charge was away.',
        ],
      },
    },
    {
      title: { ja: '担当範囲', en: 'My Role' },
      content: {
        ja: [
          '要件定義書の作成と構成の選定を担当した．チームが書いた3本の下書き（中核DB・2つの業務領域）を統合して要件定義書v1.0にまとめ，レビューの指摘を反映した．案件の範囲は提案と要件定義までだった．',
        ],
        en: [
          'Owned the requirements document and the architecture selection: merged the team\'s three drafts (core database and two business areas) into requirements v1.0 and addressed the review comments. The engagement covered the proposal and requirements definition.',
        ],
      },
    },
    {
      title: { ja: '受入基準', en: 'Acceptance Criteria' },
      content: {
        ja: [
          '要件定義書では，属人化の解消を確かめられる形の受入基準を置いた（基準の原案はチームのメンバーが書いた）．',
        ],
        en: [
          'The requirements document turns "remove the dependency on one person" into checkable acceptance criteria (first drafted by a teammate).',
        ],
      },
      list: {
        ja: [
          '担当者以外が，案件の進捗と不足書類を説明できること．',
          '現行のExcelと同じ金額を再現できること．過去の月の実データで，請求先・項目・明細の3段階で突き合わせる計画にした．',
        ],
        en: [
          "Someone other than the person in charge can explain each case's progress and missing documents.",
          'The system reproduces the same amounts as the current Excel files, planned to be checked against past months of real data at three levels: billee, item, and line.',
        ],
      },
    },
    {
      title: { ja: '構成を選ぶ基準', en: 'How the Architecture Was Chosen' },
      content: {
        ja: [
          '優先順位は，AIエージェントが扱えること(AI Agent Ready)，作り直さずに段階的に広げられること，素早く届けられることとチームの技能に合うこと，運用の手間と費用が少ないことの順とした．中核は，原本を置くオブジェクトストレージ，台帳と分析を兼ねるPostgreSQL，変換と指標定義のdbt core，AIとの接続点のMCPに固定し，どのクラウドでも動く構成にした．',
        ],
        en: [
          'Priorities, in order: usable by AI agents (AI Agent Ready), able to grow in stages without a rebuild, fast to deliver and a fit for the team\'s skills, and low operating effort and cost. The core was fixed so it runs on any cloud: object storage for originals, PostgreSQL for both the ledger and analytics, dbt Core for transformations and metric definitions, and MCP as the access point for AI.',
        ],
      },
    },
    {
      title: { ja: '提案した構成', en: 'Proposed Architecture' },
      list: {
        ja: [
          '原本: 受け取った書類はそのまま変更不可で保存し，あとから処理し直せるようにする．',
          '取り込み: マルチモーダルのLLMで書類から項目を抜き出し（LLMは差し替え可能），台帳に入れる前に人が承認する．確信度の低い抽出は人の確認に回す．',
          'データベース: データ量が小さいので，台帳と分析を1つのPostgreSQLにまとめ，専用のDWHは過剰と判断した．将来の意味検索のためにpgvectorを候補に残した．',
          'セマンティックレイヤー: dbt coreを第一候補にし，スキーマと指標の定義をコードで持つ．',
          '台帳のデータモデル: 建物と部屋，入居者と契約，契約と請求・入退去を親子関係で持ち，1つの契約が複数の部屋にまたがれる形にした．削除は論理削除，変更はすべて履歴に残す（チームのメンバーの案に，図と項目を追加した）．',
          'AI Ready: 原本の保持，スキーマと指標のコード化，どの原本からどのレコードができたかの来歴，確信度の低い抽出の人による確認，複数のLLMを前提にした設計の5点を保証し，権限と監査ログは初日から入れる．AIとの接続点は監査ログ付きの読み取り専用MCPサーバーとして設計した．エージェント本体は作らない範囲とした．',
          '段階的な拡張: 台帳のスキーマはリリース時にv1として固定し，以後の変更は追加だけにする．',
        ],
        en: [
          'Originals: received documents are stored unchanged and immutable so they can be reprocessed later.',
          'Ingestion: a multimodal LLM (swappable) extracts fields from documents, and a person approves them before they enter the ledger; low-confidence extractions go to human review.',
          'Database: since the data volume is small, the ledger and analytics share one PostgreSQL database, and a dedicated data warehouse was judged excessive. pgvector was kept as an option for future semantic search.',
          'Semantic layer: dbt Core as the first choice, with schema and metric definitions in code.',
          'Ledger data model: buildings and units, tenants and contracts, and contracts with charges and move-in/move-out events as parent-child relations, with one contract able to span several units. Deletes are logical, and every change is kept in history (designed by a teammate; I added the diagram and fields).',
          'AI-ready: five guarantees (immutable originals, schema and metrics as code, lineage from each original to each record, human review of low-confidence extractions, and a multi-LLM design), with permissions and audit logs from day one. The AI access point is designed as a read-only MCP server with audit logging. Building the agent itself was out of scope.',
          'Staged growth: the ledger schema is frozen as v1 at release, and later changes are additive only.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '採らなかった案', en: 'Rejected Alternative' },
      content: {
        ja: [
          'BaaSは早く作れるが，権限の統合・バッチ処理・監査に上限があるため採らなかった．',
        ],
        en: [
          'A BaaS would have been fast to build on, but it was rejected for its limits on permission integration, batch processing, and auditing.',
        ],
      },
    },
  ],
  technologies: ['PostgreSQL', 'dbt Core', 'MCP', 'pgvector', 'Object Storage', 'Multimodal LLM', 'Requirements Definition'],
};
