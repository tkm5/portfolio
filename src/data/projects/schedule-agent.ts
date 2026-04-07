import type { Project } from '@/types';

export const scheduleAgent: Project = {
  slug: 'schedule-agent',
  title: {
    ja: 'AI日程調整エージェント',
    en: 'AI Schedule Adjustment Agent',
  },
  meta: {
    ja: '業務委託',
    en: 'Commissioned Work',
  },
  description: 'AI Schedule Adjustment Agent',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'ユーザーとの対話を通じて暗黙的な嗜好を学習し，日程提案の精度を向上させるAIエージェントを設計・開発．LangGraphによる4つのLLMエージェントとルールベース処理を組み合わせたハイブリッドアーキテクチャを採用し，FastAPIバックエンド + Next.js 16フロントエンドのフルスタック構成で実装．',
        ],
        en: [
          'Designed and developed an AI agent that learns implicit user preferences through dialogue to improve schedule proposal accuracy. Adopted a hybrid architecture combining 4 LLM agents with rule-based processing via LangGraph, implemented as a full-stack system with FastAPI backend and Next.js 16 frontend.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          '柔軟な意図理解・優先度推定・提案生成にはLLMエージェントを，精密なカレンダー計算や嗜好フィルタリングにはルールベース処理を適用するハイブリッド設計．LLMの柔軟性とルールの正確性を組み合わせることで，ハルシネーションリスクを抑えつつ高精度な日程調整を実現．',
          'Human-in-the-Loop（LangGraphのinterrupt()）により，候補確認・追加質問のインタラクティブなループを実装．ユーザーが候補を却下した場合，却下理由をコンテキストとして次回提案に反映し，同じパターンの繰り返しを回避．',
        ],
        en: [
          'Hybrid design applying LLM agents for flexible intent understanding, priority estimation, and proposal generation, while using rule-based processing for precise calendar calculations and preference filtering. By combining LLM flexibility with rule accuracy, achieves high-precision scheduling while mitigating hallucination risks.',
          "Human-in-the-Loop via LangGraph's interrupt() implements an interactive loop for candidate confirmation and follow-up questions. When users reject candidates, the rejection reason is fed back into context for subsequent proposals, avoiding repetition of the same patterns.",
        ],
      },
      list: {
        ja: [
          'parse_request（LLM）: 自然言語リクエストの意図解析と構造化',
          'estimate_priority（LLM）: ミーティング優先度の推定',
          'extract_free_busy（RULE）: カレンダーの空き時間抽出・祝日除外・移動可能イベント検出',
          'load_memory（STORE）: ユーザー嗜好・QA履歴の読み込み',
          'apply_prefs_filters（RULE）: 8種の嗜好フィルタによる候補絞り込み',
          'propose_schedule（LLM）: 学習済み嗜好を考慮した日程候補の提案生成',
          'confirm / select_questions（HITL）: ユーザー確認・追加質問による嗜好学習ループ',
        ],
        en: [
          'parse_request (LLM): Intent analysis and structuring of natural language requests',
          'estimate_priority (LLM): Meeting priority estimation',
          'extract_free_busy (RULE): Calendar free slot extraction, holiday exclusion, movable event detection',
          'load_memory (STORE): Loading user preferences and QA history',
          'apply_prefs_filters (RULE): Candidate filtering through 8 preference-based filters',
          'propose_schedule (LLM): Schedule proposal generation considering learned preferences',
          'confirm / select_questions (HITL): User confirmation and preference learning loop via follow-up questions',
        ],
      },
    },
    {
      title: { ja: 'メモリ・学習機構', en: 'Memory & Learning' },
      content: {
        ja: [
          'LangGraph Store（BaseStore）を活用し，Semantic Memoryの2つのパターンを実装．Profileパターンでは，ユーザーごとに1ドキュメントの構造化嗜好データを管理し，deep mergeによる差分更新で嗜好を継続的に学習．Collectionパターンでは，QA履歴を追記専用の個別レコードとして蓄積し，過去の対話コンテキストを検索可能な形で保持．',
          '6カテゴリ24種の質問テンプレート（時間帯・予定移動・参加者・形式・スケジュール・負荷）によるプログレッシブな嗜好収集を実装．候補が見つからない場合は，段階的な制約緩和（ランチ枠活用 → 予定移動 → 参加者削減 → 時間短縮 → 期限延長）により探索空間を拡大．',
        ],
        en: [
          "Implemented two Semantic Memory patterns using LangGraph Store (BaseStore). The Profile pattern manages structured preference data as a single document per user, continuously learning preferences through deep merge updates. The Collection pattern accumulates QA history as append-only individual records, maintaining past dialogue context in a searchable format.",
          'Implemented progressive preference elicitation through 24 question templates across 6 categories (time of day, event rescheduling, participants, format, schedule, workload). When no candidates are found, progressively relaxes constraints (lunch slot usage -> event shuffling -> participant reduction -> duration shortening -> deadline extension) to expand the search space.',
        ],
      },
    },
    {
      title: { ja: '主要機能', en: 'Key Features' },
      content: {
        ja: [
          '嗜好フィルタエンジン: タイムスロットソート，ランチ保護，ハードブロック除外，キャパシティ制限，移動可能イベント判定，作業ブロック再配置，外部/内部優先度制御，任意参加者マッチングの8種のルールベースフィルタを実装．',
          '空き時間解析エンジン: 全参加者のカレンダーを横断的に分析し，祝日除外，ランチタイム検出，移動可能イベント抽出を含む共通空き時間の算出を実現．',
          'フロントエンド: Next.js 16 / React 19によるSPA．FullCalendarによるカレンダー表示，Zustandによるエージェント通信の状態管理，TanStack Queryによるサーバー状態管理，Tailwind CSS 4によるスタイリングを実装．',
        ],
        en: [
          'Preference Filter Engine: Implemented 8 rule-based filters including time slot sorting, lunch protection, hard block exclusion, capacity limits, movable event detection, work block rescheduling, external/internal priority control, and optional participant matching.',
          "Free/Busy Analysis Engine: Cross-analyzes all participants' calendars to calculate common free slots, including holiday exclusion, lunch time detection, and movable event extraction.",
          'Frontend: SPA built with Next.js 16 / React 19. Features FullCalendar for calendar display, Zustand for agent communication state management, TanStack Query for server state management, and Tailwind CSS 4 for styling.',
        ],
      },
    },
    {
      title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
      content: {
        ja: [
          'pytestによる単体テスト・シナリオテストを整備し，LLMモック・カレンダーフィクスチャによる再現性の高いテスト基盤を構築．LangSmithによるLLMトレーシング・モニタリング，Dockerによるコンテナ化デプロイ，LangGraph Studioによるグラフの可視化・デバッグ環境を整備．Pydantic v2のwith_structured_output()による全LLM出力の型検証を実装．',
        ],
        en: [
          "Established unit tests and scenario tests with pytest, building a reproducible testing infrastructure using LLM mocks and calendar fixtures. Set up LLM tracing and monitoring with LangSmith, containerized deployment with Docker, and graph visualization/debugging environment with LangGraph Studio. Implemented type validation for all LLM outputs using Pydantic v2's with_structured_output().",
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'FastAPI',
    'LangGraph',
    'LangChain',
    'LangGraph Store (Semantic Memory)',
    'LangSmith',
    'Pydantic',
    'pytest',
    'Next.js',
    'React',
    'TypeScript',
    'Zustand',
    'FullCalendar',
    'TanStack Query',
    'Tailwind CSS',
    'Docker',
    'Multi-Agent',
    'Human-in-the-Loop',
  ],
};
