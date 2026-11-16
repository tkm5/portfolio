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
        ],
        en: [
          'Developed and implemented the internal inquiry chat as RAG (retrieval-augmented generation).',
        ],
      },
    },
    {
      title: { ja: '構成', en: 'How It Works' },
      content: {
        ja: [
          'Azure AI Searchで社内の文書を検索し，Azure OpenAI Serviceで回答を生成する構成．ほかのAzureのサービスと組み合わせて作成した．',
        ],
        en: [
          'Azure AI Search retrieves internal documents and Azure OpenAI Service generates the answer, combined with other Azure services.',
        ],
      },
    },
    {
      title: { ja: '結果', en: 'Outcome' },
      content: {
        ja: ['社内全体で利用され，2024年度コーポレートアワードを受賞した．'],
        en: ['Used firm-wide; won the FY2024 Corporate Award.'],
      },
    },
  ],
  technologies: ['Azure AI Search', 'Azure OpenAI Service', 'RAG'],
};
