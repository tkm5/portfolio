import type { Project } from '@/types';

export const aiTutorPoc: Project = {
  slug: 'ai-tutor-poc',
  title: {
    ja: '教育事業者：24時間AIチューターのPoC開発',
    en: 'Education Company: 24/7 AI Tutor PoC Development',
  },
  meta: {
    ja: '個人受託 | Forward Deployed Engineer',
    en: 'Independent Engagement | Forward Deployed Engineer',
  },
  description: "An AI tutor PoC that answers in line with a cram school's teaching policy and only answers when two vendors' LLMs agree",
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '塾の生徒の質問に24時間答えるAIチューターのPoC．回答は塾の指導方針（指導案などのPDF）に沿っている必要があった．',
          'PoCは設計から実装まで1人で開発した．',
        ],
        en: [
          "A PoC for an AI tutor that answers students' questions around the clock. Answers had to follow the cram school's teaching policy (lesson plans and other PDFs).",
          'Designed and built the PoC single-handedly.',
        ],
      },
    },
    {
      title: { ja: '技術的な判断', en: 'Technical Decisions' },
      list: {
        ja: [
          'RAGを使わない: 待ち時間を抑えるため，指導方針をベクトル検索で探すRAGは採らなかった．',
          '分類モデルで単元を判定: 文章を生成せず，選択肢ごとの確率を返す分類モデルJevで，質問がどの単元かを判定する．',
          '指導方針はOKFで整理: 指導方針をGoogle Cloudの知識記述形式OKF(Open Knowledge Format)で1節1ファイルに起こし，判定した単元とタグが一致する節だけをLLMに渡す．この選択はLLMを呼ばない決定的な処理にした．',
          '2社の一致で答える: 回答を書くモデルと確かめるモデルを異なる2社のLLMにし，答えが一致した時だけ回答する．一致しない時は答えず，先生への質問を促す．',
        ],
        en: [
          'No RAG: for low latency, did not use RAG (vector search over the teaching policy).',
          'Classify the topic unit: the Jev classifier, which returns per-option probabilities instead of generating text, decides which unit a question belongs to.',
          "Teaching policy in OKF: the policy is written one section per file in Google Cloud's Open Knowledge Format (OKF), and only the sections whose tags match the unit are passed to the LLM. That selection step is deterministic and calls no LLM.",
          "Answer only on agreement: the writer and checker models come from two different vendors, and the tutor answers only when they agree; otherwise it suggests asking a teacher.",
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '検証', en: 'How It Was Verified' },
      content: {
        ja: [
          '計測: 模範解答つき82問で計測し，誤った回答の提示は0件だった．',
        ],
        en: [
          'Measured: 0 wrong answers shown in 82 test questions with reference answers.',
        ],
      },
    },
  ],
  technologies: ['Python', 'Jev', 'Open Knowledge Format (OKF)', 'OpenRouter', 'LLM'],
};
