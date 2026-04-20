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
          '経営意思決定の質を引き上げるため，賛成（Pro）と反対（Con）の両視点から独立に論証するAIエージェントをB2B SaaSとして設計・開発．LangGraph上の11ノードのステートフルワークフローで，社内ナレッジ検索（Vertex AI Search）とWeb検索（Tavily）を条件付きで駆動し，企業／ユーザー／スレッド単位にメモリを分離するマルチテナント構成とした．',
        ],
        en: [
          "Designed and built a B2B SaaS AI agent that argues the same decision independently from the Pro and Con sides, raising the quality of executive decisions. An 11-node stateful workflow on LangGraph conditionally drives internal knowledge search (Vertex AI Search) and web search (Tavily), with memory isolated per company / user / thread for a multi-tenant deployment.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'LLMの曖昧性が許される推論ステップ（Pro / Con推論）と，決定的に制御したい前処理・後処理（メモリロード／検索要否判定／コンテキスト統合／メモリ保存）を明確に分離．グラフは条件分岐付きで，`judge_search_need`が先に検索の要否を判定し，不要な呼び出しで時間とトークンを浪費しないよう設計した．',
          'Pro / Con デュアルエージェントは `backend/src/agent/react_agent.py` でReAct（Reasoning + Acting）パターンを実装．同じコンテキストを両者が独立に読み，必要に応じてVertex AI SearchやGemini組み込みツールを呼び出しながら，Citation付きの主張を構築する．',
          '状態は `TypedDict(total=False)` で OverallState / UserMemory / CompanyInfo / Citation を厳密に型付け．ノード間の型不整合をPythonの型チェックで検知できるようにしてあり，グラフが増えても回帰コストが上がりにくい．',
        ],
        en: [
          'LLM-heavy reasoning (Pro / Con inference) is cleanly separated from the deterministic pre- and post-processing (memory load, search-necessity judgment, context merge, memory save). The graph uses conditional branching, and `judge_search_need` decides up front whether search is needed at all — avoiding wasted latency and tokens on unnecessary calls.',
          'Pro / Con dual agents are implemented as a ReAct (Reasoning + Acting) pattern in `backend/src/agent/react_agent.py`. Both agents read the same context independently and build citation-backed arguments, invoking Vertex AI Search or Gemini built-in tools as they go.',
          'Graph state is strictly typed with `TypedDict(total=False)` — OverallState / UserMemory / CompanyInfo / Citation — so type mismatches between nodes surface under Python type checking and regression cost stays flat as the graph grows.',
        ],
      },
      list: {
        ja: [
          'load_user_memory: ユーザー・スレッド・企業別の履歴とプロファイルをロード',
          'judge_search_need: 質問内容から外部検索の要否を事前判定',
          'rag_search / web_search / merge_context: Vertex AI Search と Tavily を必要時のみ並列実行しコンテキスト統合',
          'set_prompt → route_agents: コンテキストに応じて Pro / Con 各々のプロンプトを構築',
          'pro_agent / con_agent（並列）: ReAct で独立に論証を生成',
          'merge_responses → assign_variables → finalize_answer: 応答統合・変数束縛・最終整形',
          'save_user_memory: 会話・決定履歴・変更された嗜好を永続化',
        ],
        en: [
          'load_user_memory: load history and profile per user, thread, and company',
          'judge_search_need: decide up front whether external search is needed',
          'rag_search / web_search / merge_context: run Vertex AI Search and Tavily in parallel only when needed and merge contexts',
          'set_prompt → route_agents: build Pro and Con prompts appropriate to the context',
          'pro_agent / con_agent (parallel): independently produce arguments via ReAct',
          'merge_responses → assign_variables → finalize_answer: merge responses, bind variables, and finalize',
          'save_user_memory: persist conversation, decision history, and updated preferences',
        ],
      },
    },
    {
      title: { ja: 'マルチテナントとメモリ管理', en: 'Multi-Tenancy & Memory' },
      content: {
        ja: [
          'Vertex AI Searchへのクエリに`company_id`をメタデータフィルタとして付与し，企業単位でナレッジとアクセスを分離．同一ユーザーが複数企業に関連づく N:N 構造に対応し，企業スイッチ時に検索対象と参照ドキュメントを安全に切り替えられる．',
          '会話履歴は LangGraph の MemorySaver と InMemoryStore をユーザー／スレッド単位で使い分け，`trimming.py` が 80 万トークンを上限に古いメッセージから自動削除．長期スレッドでもコンテキスト破綻を起こさない．',
          '`BANSO_` プレフィックス付き環境変数で `backend/src/agent/config.py` を上書きでき，テナントごとの設定差分を実行時にのみ注入できる構成．Citationは情報源URLを正規化して応答に添付し，根拠に辿れる状態を維持している．',
        ],
        en: [
          'Queries against Vertex AI Search attach `company_id` as a metadata filter, isolating knowledge and access per company. The system handles the N-to-N relationship where a single user belongs to multiple companies, so switching companies safely swaps both the search scope and the referenced documents.',
          'Conversation history uses LangGraph MemorySaver and InMemoryStore scoped per user / thread, and `trimming.py` caps history at 800,000 tokens by evicting oldest messages first — long-running threads never blow the context budget.',
          '`BANSO_` -prefixed environment variables override `backend/src/agent/config.py` at runtime, so per-tenant configuration can be injected without code changes. Citations normalize source URLs and attach them to responses so evidence is always reachable.',
        ],
      },
    },
    {
      title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
      content: {
        ja: [
          'Dev Container（Ubuntu Noble + Zsh + uv + Node.js v24）で開発環境を統一．pytest / pytest-asyncio / pytest-cov による単体・非同期・カバレッジテストと，LangSmith によるLLMトレーシング・モニタリングを組み合わせ，グラフの変更が意図どおりに伝播することをCIで保証している．',
        ],
        en: [
          'A Dev Container (Ubuntu Noble + Zsh + uv + Node.js v24) provides a uniform development environment. pytest / pytest-asyncio / pytest-cov cover unit, async, and coverage testing, and LangSmith provides LLM tracing and monitoring, so CI can assert that graph changes propagate as intended.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'LangGraph',
    'LangChain',
    'FastAPI',
    'Google Gemini 2.5 Flash',
    'Google Vertex AI Search',
    'Tavily API',
    'ReAct Pattern',
    'Multi-Agent',
    'LangGraph MemorySaver',
    'InMemoryStore',
    'Pydantic TypedDict',
    'LangSmith',
    'pytest',
    'Dev Container',
    'uv',
  ],
};
