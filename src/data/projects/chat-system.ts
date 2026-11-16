import type { Project } from '@/types';

export const chatSystem: Project = {
  slug: 'chat-system',
  title: {
    ja: '社内向けチャットシステム開発',
    en: 'Internal Chat System Development',
  },
  meta: {
    ja: '欧州系コンサルティングファーム | 社内プロジェクト',
    en: 'European Consulting Firm | Internal Project',
  },
  description: 'Internal inquiry chat built as RAG on Azure; used firm-wide and recognized with the FY2024 Corporate Award',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          '社内の問い合わせに答えるチャットを，RAG（検索拡張生成）として開発・実装した．',
          'RAGは，質問に関係する文書を先に検索し，その内容をもとにLLMが回答を書く仕組みである．',
        ],
        en: [
          'Developed and implemented the internal inquiry chat as RAG (retrieval-augmented generation).',
          'RAG first searches for documents related to the question, and an LLM then writes the answer from their content.',
        ],
      },
    },
    {
      title: { ja: '担当した範囲', en: 'What I Was Responsible For' },
      content: {
        ja: ['次の作業を担当した．検索精度の改善とCI/CDは，あとの節で述べる．'],
        en: ['Handled the work below. Search-quality work and CI/CD are covered in later sections.'],
      },
      list: {
        ja: [
          'Azure環境: Azure環境を立ち上げた．',
          'RAGの環境: RAGとして動く環境を構築した．',
          '日本語対応: チャットを日本語に対応させた．',
        ],
        en: [
          'Azure environment: set up the Azure environment.',
          'RAG environment: built the environment that runs the chat as RAG.',
          'Japanese support: added Japanese support to the chat.',
        ],
      },
    },
    {
      title: { ja: '構成', en: 'How It Works' },
      content: {
        ja: [
          '社内文書を検索対象にし，Azure AI Searchで検索してAzure OpenAI Serviceで回答を生成する構成にした．ほかのAzureのサービスとも組み合わせた．',
        ],
        en: [
          'Internal documents are the search target: Azure AI Search retrieves them and Azure OpenAI Service generates the answer, combined with other Azure services.',
        ],
      },
    },
    {
      title: { ja: '検索精度の改善', en: 'Improving Search Quality' },
      content: {
        ja: ['検索の精度を上げるため，次のことを試して実装した．'],
        en: ['To improve search quality, tried and implemented the following.'],
      },
      list: {
        ja: [
          '検索方式の比較: キーワード検索，ベクトル検索，ハイブリッド検索，セマンティックランカーを比較した．一般に，キーワード検索は語の一致で，ベクトル検索は意味の近さで文書を探し，ハイブリッド検索はその両方を使う．セマンティックランカーは，検索で得た結果を質問との意味の近さで並べ直す機能である．',
          '文書の件数と分割の大きさ: 回答に使う文書の件数と，文書を分割する大きさを調整した．一般に，件数を増やしたり分割の単位を大きくしたりするとLLMに渡す情報は増えるが，質問と関係の薄い内容も混ざりやすくなる．',
          'Document Intelligence: Azure AI Document Intelligenceを導入した．Document Intelligenceは，PDFなどの文書から文字や表の構造を読み取るサービスである．',
          '新しいモデルへの切り替え: 埋め込みモデルとLLMを，新しい版に切り替えた．',
        ],
        en: [
          'Search methods: compared keyword search, vector search, hybrid search, and the semantic ranker. In general, keyword search finds documents by matching words, vector search finds them by closeness in meaning, and hybrid search uses both. The semantic ranker reorders the retrieved results by how close they are in meaning to the question.',
          'Document count and chunk size: tuned how many documents go into an answer and how large the document chunks are. In general, more documents or larger chunks pass more information to the LLM, but also let in more text unrelated to the question.',
          'Document Intelligence: introduced Azure AI Document Intelligence, a service that reads text and table structure from documents such as PDFs.',
          'Newer models: switched the embedding model and the LLM to newer versions.',
        ],
      },
    },
    {
      title: { ja: '開発の進め方と結果', en: 'Delivery and Outcome' },
      content: {
        ja: [
          'Azure DevOpsでチケットとブランチを管理した．CI/CDを提案して実装し，テストを通過した変更をデプロイする流れにした．',
          'システムは社内全体で利用され，2024年度コーポレートアワードを受賞した．',
        ],
        en: [
          'Managed tickets and branches in Azure DevOps. Proposed and implemented CI/CD so that changes are deployed after passing tests.',
          'The system was used firm-wide and won the FY2024 Corporate Award.',
        ],
      },
    },
  ],
  technologies: ['Azure AI Search', 'Azure OpenAI Service', 'Azure DevOps', 'CI/CD', 'RAG', 'Azure AI Document Intelligence', 'Hybrid Search'],
};
