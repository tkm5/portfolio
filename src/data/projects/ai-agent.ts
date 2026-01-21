import type { Project } from '@/types';

export const aiAgent: Project = {
  slug: 'ai-agent',
  title: {
    ja: 'AIエージェント意思決定支援システム',
    en: 'AI Agent Decision Support System',
  },
  meta: {
    ja: '業務委託',
    en: 'Commissioned Work',
  },
  description: 'AI Agent Decision Support System',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'ビジネスにおける意思決定の質を高めるため，賛成（Pro）・反対（Con）の双方の視点から論理的な助言を行うAIエージェントシステムを設計・開発．LangGraph/LangChain/FastAPIを基盤とし，マルチテナント対応のB2B SaaSアーキテクチャを実現．',
        ],
        en: [
          'Designed and developed an AI agent system that provides logical advice from both Pro and Con perspectives to improve the quality of business decision-making. Built on LangGraph/LangChain/FastAPI foundation, achieving a multi-tenant B2B SaaS architecture.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'LangGraphによる11ステップのステートフルなワークフローを設計．ユーザーメモリ読込->検索要否判定->RAG/Web検索->コンテキスト統合->プロンプト設定->Pro/Conエージェント並列実行->応答統合->メモリ保存->最終回答生成の一連のフローを，条件分岐付きグラフで制御．',
          'ReActパターン（Reasoning + Acting）を実装し，エージェントが自律的に情報の過不足を判断．必要に応じてGoogle Vertex AI Searchによる社内ナレッジ検索やGemini組み込みツールによるWeb検索を実行し，最適な情報を取得・統合．',
        ],
        en: [
          'Designed an 11-step stateful workflow using LangGraph. Controlled the entire flow from user memory loading -> search necessity judgment -> RAG/Web search -> context integration -> prompt setting -> Pro/Con agent parallel execution -> response merging -> memory saving -> final answer generation through a graph with conditional branching.',
          'Implemented ReAct pattern (Reasoning + Acting), enabling agents to autonomously judge information sufficiency. Executes internal knowledge search via Google Vertex AI Search and web search via Gemini built-in tools as needed, retrieving and integrating optimal information.',
        ],
      },
    },
    {
      title: { ja: '主要機能', en: 'Key Features' },
      content: {
        ja: [
          'Pro/Con デュアルエージェント: 同一コンテキストに対し，賛成・反対の両視点から独立して推論を実行し，バランスの取れた意思決定支援を提供．',
          'ユーザーメモリ管理: N:N の企業関連付け，意思決定履歴，ユーザー設定をスレッド間で永続化．LangGraph MemorySaver/InMemoryStoreによる会話履歴管理とトークン上限制御を実装．',
          'マルチテナント対応: Company IDベースのメタデータフィルタリングにより，企業ごとのナレッジ分離とアクセス制御を実現．',
        ],
        en: [
          'Pro/Con Dual Agents: Execute independent reasoning from both supportive and critical perspectives on the same context, providing balanced decision support.',
          'User Memory Management: Persist N:N company affiliations, decision history, and user preferences across threads. Implemented conversation history management and token limit control using LangGraph MemorySaver/InMemoryStore.',
          'Multi-tenant Support: Achieved knowledge isolation and access control per company through Company ID-based metadata filtering.',
        ],
      },
    },
    {
      title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
      content: {
        ja: [
          'DevContainerによる統一開発環境を構築（uv，Oh My Zsh，Claude Code/Gemini CLI統合）．pytest/pytest-asyncio/pytest-covによる単体・統合テストを整備し，LangSmithによるトレーシング・モニタリング基盤を導入．',
        ],
        en: [
          'Built unified development environment with DevContainer (uv, Oh My Zsh, Claude Code/Gemini CLI integration). Established unit and integration tests with pytest/pytest-asyncio/pytest-cov, and introduced tracing/monitoring infrastructure with LangSmith.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'LangGraph',
    'LangChain',
    'FastAPI',
    'Google Gemini',
    'Google Vertex AI Search',
    'ReAct Pattern',
    'Multi-Agent',
    'RAG',
    'LangSmith',
    'pytest',
  ],
};
