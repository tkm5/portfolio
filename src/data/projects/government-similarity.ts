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
          '類似する行政事業を探す調査研究．各事業は，目的・現状と課題・概要・活動と成果目標が文章で書かれている．',
        ],
        en: [
          'A research study to find government programs that resemble each other. Each program is described in prose: purpose, current issues, overview, and activities with outcome targets.',
        ],
      },
    },
    {
      title: { ja: '試作と方針の切り替え', en: 'Prototype, and the Change of Approach' },
      content: {
        ja: [
          'まずAzureの公開サンプルを使って試作した．約5,400件の事業を1行1事業で収めた表データ（93列）を検索対象に取り込めるよう処理を足し，日本語向けに検索の設定を調整した（日本語アナライザーja.microsoft，クエリ言語ja-JP，スペル補正の無効化，問い合わせ文を日本語に直すプロンプト）．',
          '試作だけでは調査の目的に足りなかったため，事業内容を詳細にベクトル化し，ベクトルの類似度で似た事業を探す検索手法に切り替えた．',
        ],
        en: [
          'First built a prototype on an Azure public sample: added processing to ingest a table of about 5,400 programs (one program per row, 93 columns) and tuned search for Japanese (the ja.microsoft analyzer, ja-JP query language, spell correction turned off, and a prompt that rewrites questions into Japanese).',
          'The prototype alone did not meet the purpose of the study, so the approach changed to embedding the detailed program descriptions and finding similar programs by vector similarity.',
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      list: {
        ja: [
          '検索手法: 事業内容をベクトル化した検索手法を考案・実装した．',
          '分析環境: Azure上にDockerコンテナでJupyterLab環境を構築した．',
          'セキュリティ: クラウドのセキュリティ要件の検討と実装も担当した．',
        ],
        en: [
          'Retrieval method: devised and implemented retrieval based on embeddings of the program descriptions.',
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
        ],
        en: [
          'Metric: the retrieval was evaluated by recall, the share of client-labeled matching programs that appear in the top 200 by similarity.',
        ],
      },
    },
  ],
  technologies: ['Azure', 'Azure AI Search', 'Azure OpenAI Service', 'Docker', 'JupyterLab', 'Embeddings', 'Vector Search'],
};
