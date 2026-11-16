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
      title: { ja: '概要と構成', en: 'Overview and How It Works' },
      content: {
        ja: [
          '社内の問い合わせに答えるチャットを，RAG（検索拡張生成）として開発・実装した．Azure AI Searchで検索し，Azure OpenAI Serviceで回答を生成する構成にし，ほかのAzureのサービスと組み合わせて作成した．',
        ],
        en: [
          'Developed and implemented the internal inquiry chat as RAG (retrieval-augmented generation): Azure AI Search handles retrieval and Azure OpenAI Service generates the answer, combined with other Azure services.',
        ],
      },
    },
    {
      title: { ja: '開発の進め方と結果', en: 'Delivery and Outcome' },
      content: {
        ja: [
          'Azure DevOpsでのCI/CDを提案し，導入を推進した．システムは社内全体で利用され，2024年度コーポレートアワードを受賞した．',
        ],
        en: [
          'Proposed CI/CD on Azure DevOps and drove its adoption. The system was used firm-wide and won the FY2024 Corporate Award.',
        ],
      },
    },
  ],
  technologies: ['Azure AI Search', 'Azure OpenAI Service', 'Azure DevOps', 'CI/CD', 'RAG'],
};
