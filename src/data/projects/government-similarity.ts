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
          '類似する行政事業を探す調査研究を担当した．',
        ],
        en: [
          'Worked on a research study to find government programs that resemble each other.',
        ],
      },
    },
    {
      title: { ja: '試作から検索手法へ', en: 'From Prototype to Retrieval Method' },
      content: {
        ja: [
          'まずAzureの公開サンプルを使って試作した．事業ごとの説明文をまとめた表データをテキストとして読み込み，文単位で分割して索引に入れる処理を足し，日本語向けに検索の設定を調整した（日本語アナライザーja.microsoft，クエリ言語ja-JP，スペル補正の無効化，問い合わせ文を日本語に直すプロンプト）．',
          '試作のあと，事業内容を詳細にベクトル化し，ベクトルの類似度で似た事業を探す検索手法を考案・実装した．',
        ],
        en: [
          'First built a prototype on an Azure public sample: added processing that reads a table of program descriptions as text and splits it by sentence for the index, and tuned search for Japanese (the ja.microsoft analyzer, ja-JP query language, spell correction turned off, and a prompt that rewrites questions into Japanese).',
          'After the prototype, devised and implemented a retrieval method that embeds the detailed program descriptions and finds similar programs by vector similarity.',
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      list: {
        ja: [
          '分析環境: Azure上にDockerコンテナでJupyterLab環境を構築した．',
          'セキュリティ: クラウドのセキュリティ要件の検討と実装も担当した．',
        ],
        en: [
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
          '評価指標: クライアント様が正解とした事業が，類似度の上位200件に含まれる割合(Recall)で検索手法を評価した．',
          '方針として数値は公開していない．',
        ],
        en: [
          'Metric: the retrieval was evaluated by recall, the share of client-labeled matching programs that appear in the top 200 by similarity.',
          'As a policy, the figures are not published.',
        ],
      },
    },
  ],
  technologies: ['Azure', 'Azure AI Search', 'Azure OpenAI Service', 'Docker', 'JupyterLab', 'Embeddings', 'Vector Search'],
};
