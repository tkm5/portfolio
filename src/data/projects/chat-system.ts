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
        ja: ['社内の問い合わせに答えるチャットを，RAG（検索拡張生成）として開発・実装した．'],
        en: ['Developed and implemented the internal inquiry chat as RAG (retrieval-augmented generation).'],
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
  technologies: ['Azure AI Search', 'Azure OpenAI Service', 'Azure DevOps', 'CI/CD', 'RAG'],
};
