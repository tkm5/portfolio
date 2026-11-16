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
  description: 'Embedding-based retrieval of program descriptions to find government programs related to a policy theme, evaluated by top-100 recall and precision',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '政策テーマに関わる行政事業をAIで探す調査研究で，検証を担当した．',
          '前年度の手法には実用上の課題が残っていたため，この調査研究では生成AIとLLMを活用できるかを検証した．',
        ],
        en: [
          'Handled verification in a research study that uses AI to find government programs related to a given policy theme.',
          "The previous year's approach had left practical issues, so this study examined whether generative AI and LLMs could be used.",
        ],
      },
    },
    {
      title: { ja: '試作から検索手法へ', en: 'From Prototype to Retrieval Method' },
      content: {
        ja: [
          'まずAzureの公開サンプル(Azure-Samples/azure-search-openai-demo)を改修して，RAGを試作した．事業ごとの説明文をまとめた表データをテキストとして読み込み，文単位で分割して索引に入れる処理を足し，日本語向けに検索の設定を調整した（日本語アナライザーja.microsoft，クエリ言語ja-JP，スペル補正の無効化，問い合わせ文を日本語に直すプロンプト）．',
          'この試作では，一度の回答で出せる事業が数件に限られ，存在しない事業が出力されることもあった．一般に，LLMが一度に扱える文字数には限りがあり，検索した文書にない内容を書いてしまうこともある．',
          'そこで検索の方式を切り替え，事業内容を詳細にベクトル化し，政策テーマとのベクトルの類似度が高い順に事業を並べる検索手法を考案・実装した．LLMは，事業ごとに政策テーマと似ている理由を書くことだけに使った．',
          'ベクトル化は文章を数値の並びに変える処理で，意味の近い文章ほど近い値になる．',
        ],
        en: [
          'First prototyped RAG by modifying an Azure public sample (Azure-Samples/azure-search-openai-demo): added processing that reads a table of program descriptions as text and splits it by sentence for the index, and tuned search for Japanese (the ja.microsoft analyzer, ja-JP query language, spell correction turned off, and a prompt that rewrites questions into Japanese).',
          'The prototype could return only a few programs per answer, and it sometimes output programs that do not exist. In general, an LLM can handle only a limited amount of text at once, and it can write content that is not in the retrieved documents.',
          'So the search was switched: devised and implemented a retrieval method that embeds the detailed program descriptions and ranks programs by vector similarity to the policy theme. The LLM was used only to write, for each program, why it resembles the policy theme.',
          'Embedding turns text into a vector of numbers, so that texts with closer meanings get closer values.',
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      list: {
        ja: [
          '分析環境: JupyterLabを使う検証環境をAzure上に構築した．この環境はhttps通信に対応させた．',
          'セキュリティ: 調達で参照する文書をもとにセキュリティ要件を検討し，実装した．対策は，利用者の管理，通信の暗号化，外部から受け付ける接続の制限などである．',
        ],
        en: [
          'Analysis environment: built a verification environment on Azure that used JupyterLab, and made communication with the environment work over https.',
          "Security: worked out the security requirements from the procurement's reference documents and implemented them; the measures include user management, encrypted transport, and restricting inbound access.",
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '評価の方法', en: 'How It Was Evaluated' },
      content: {
        ja: [
          '評価指標: クライアント様が正解とした事業をもとに，類似度の上位100件の再現率(Recall)と適合率(Precision)を算出して，検索手法を評価した．',
          '再現率は，正解の事業のうち上位に含まれた割合で，抜け漏れの少なさを表す．適合率は，上位に挙げた事業のうち正解だった割合で，ノイズの少なさを表す．',
          '方針として数値は公開していない．',
        ],
        en: [
          'Metric: the retrieval was evaluated by calculating recall and precision over the top 100 results by similarity, against the programs the client labeled as matches.',
          'Recall is the share of the correct programs that appear in the results, so it shows how few are missed. Precision is the share of the listed programs that are correct, so it shows how little noise there is.',
          'As a policy, the figures are not published.',
        ],
      },
    },
  ],
  technologies: ['Azure', 'Azure AI Search', 'Azure OpenAI Service', 'JupyterLab', 'Embeddings', 'Vector Search', 'RAG'],
};
