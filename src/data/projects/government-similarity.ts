import type { Project } from '@/types';

export const governmentSimilarity: Project = {
  slug: 'government-similarity',
  title: {
    ja: '中央省庁：事業の類似性構造分析調査研究',
    en: 'Central Government Ministry: Research on the Structural Similarity of Government Programs',
  },
  meta: {
    ja: '欧州系コンサルティングファーム',
    en: 'European Consulting Firm',
  },
  description: 'Embedding-based retrieval of program descriptions to find similar government programs, evaluated by recall',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '類似する行政事業を探す調査研究．',
        ],
        en: [
          'A research study to find government programs that resemble each other.',
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      list: {
        ja: [
          '検索手法: 事業内容を詳細にベクトル化し，ベクトルの類似度で似た事業を探す検索手法を考案・実装した．',
          '分析環境: Azure上にDockerコンテナでJupyterLab環境を構築した．',
          'セキュリティ: クラウドのセキュリティ要件の検討と実装も担当した．',
        ],
        en: [
          'Retrieval method: devised and implemented retrieval that embeds program descriptions in detail and finds similar programs by vector similarity.',
          'Analysis environment: built a JupyterLab environment in Docker containers on Azure.',
          'Security: also handled defining and implementing the cloud security requirements.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '評価の方法', en: 'How It Was Evaluated' },
      content: {
        ja: [
          '評価指標: クライアント様が正解とした事業が，類似度の上位200件に含まれる割合（Recall）で検索手法を評価した．',
        ],
        en: [
          'Metric: the retrieval was evaluated by recall, the share of client-labeled matching programs that appear in the top 200 by similarity.',
        ],
      },
    },
  ],
  technologies: ['Azure', 'Docker', 'JupyterLab', 'Embeddings', 'Vector Search'],
};
