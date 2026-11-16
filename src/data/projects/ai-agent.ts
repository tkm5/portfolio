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
  description: 'An AI agent that argues the same question from both sides, calling internal-document search and web search only when needed',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          '同じ問いを賛成・反対の両視点から別々に論証するAIエージェントの開発に参加した．LangGraphで社内文書検索とWeb検索を必要なときだけ呼び，利用企業ごとに検索対象と記憶を分けた．',
        ],
        en: [
          'Took part in developing an AI agent that argues the same question separately from the supporting and opposing sides. Built on LangGraph, it calls internal-document search and web search only when needed and keeps search scope and memory separate for each customer company.',
        ],
      },
    },
    {
      title: { ja: '処理の流れ', en: 'How It Works' },
      content: {
        ja: [
          '記憶の読み込み → 検索要否の判定 → 社内文書検索とWeb検索 → 賛成・反対の論証 → 統合 → 記憶の保存，の順に流れるグラフを組んだ．',
        ],
        en: [
          'A graph that flows through: load memory → decide whether search is needed → internal-document and web search → supporting and opposing arguments → merge → save memory.',
        ],
      },
      list: {
        ja: [
          '検索が要るかを先に判定する段を置き，不要な検索を呼ばないようにした．',
          '賛成と反対の論証は，同じ文脈をそれぞれ独立に読み，ReActの形で必要に応じて検索を呼びながら，出典付きの主張を組み立てる．',
          'LLMで推論する段と，記憶の読み書きや文脈の統合のように決まった処理をする段を分けた．',
        ],
        en: [
          'A step that first decides whether search is needed, so unnecessary searches are not called.',
          'The supporting and opposing arguments each read the same context independently and build cited claims in ReAct style, calling search as needed.',
          'LLM reasoning steps are kept apart from steps with fixed behavior, such as reading and writing memory and merging context.',
        ],
      },
    },
    {
      title: { ja: '企業ごとの分離と記憶', en: 'Per-Company Separation and Memory' },
      content: {
        ja: [
          '検索クエリに利用企業の識別子をフィルターとして付け，企業ごとに検索対象を分けた．会話の履歴は利用者とスレッドごとに持ち，上限を超えた分は古いメッセージから削る．回答には情報源のURLを出典として添え，根拠をたどれるようにした．',
        ],
        en: [
          'Search queries carry the customer company\'s identifier as a filter, so each company searches only its own scope. Conversation history is kept per user and thread, and the oldest messages are dropped once a cap is exceeded. Answers cite source URLs so the evidence can be traced.',
        ],
      },
    },
    {
      title: { ja: '開発', en: 'Development' },
      content: {
        ja: [
          'Dev Containerで開発環境をそろえ，pytestでテストを書き，LangSmithでLLMの呼び出しをトレースした．',
        ],
        en: [
          'The development environment was standardized with a Dev Container; tests were written with pytest, and LLM calls were traced with LangSmith.',
        ],
      },
    },
  ],
  technologies: ['Python', 'LangGraph', 'LangChain', 'Vertex AI Search', 'Tavily', 'ReAct', 'LangSmith', 'pytest', 'Dev Container'],
};
