import type { Project } from '@/types';

export const governmentRag: Project = {
  slug: 'government-rag',
  title: {
    ja: '中央省庁：事業類似性構造分析',
    en: 'Central Government: Business Similarity Analysis',
  },
  meta: {
    ja: '欧州系コンサルティングファーム',
    en: 'European Consulting Firm',
  },
  description: 'Central Government: Business Similarity Analysis',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          '生成AIを活用した行政事業の類似性調査において，RAGやベクトル検索を用いた高精度な検索手法を考案・実装．',
        ],
        en: [
          'Devised and implemented high-precision search methods using RAG and vector search for similarity surveys of government projects utilizing generative AI.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          '事業内容を詳細にベクトル化し，生成AIに深い理解を促すことで，従来の単語検索と比較して大幅に検索精度を向上．同時に，この調査・分析を効率的に実施するため，Azure上にDockerコンテナを用いたJupyter Lab環境を構築．',
          'さらに，クラウドセキュリティ要件の検討および実装まで一貫して担当．',
        ],
        en: [
          'By vectorizing business content in detail and promoting deeper understanding by generative AI, significantly improved search accuracy compared to traditional keyword search. At the same time, built a Jupyter Lab environment using Docker containers on Azure to efficiently conduct this research and analysis.',
          'Furthermore, consistently handled cloud security requirements consideration and implementation.',
        ],
      },
    },
  ],
  technologies: ['Azure', 'Docker', 'Jupyter Lab', 'RAG', 'Vector Search', 'Python'],
};
