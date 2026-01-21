import type { Project } from '@/types';

export const pharmaAnalytics: Project = {
  slug: 'pharma-analytics',
  title: {
    ja: '大手製薬企業：営業活動データ活用',
    en: 'Major Pharmaceutical Company: Sales Data Analytics',
  },
  meta: {
    ja: '欧州系コンサルティングファーム',
    en: 'European Consulting Firm',
  },
  description: 'Major Pharmaceutical Company: Sales Data Analytics',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: ['製薬企業の営業活動データを基に，データドリブンな営業戦略の立案に従事．'],
        en: ['Engaged in data-driven sales strategy planning based on pharmaceutical company sales activity data.'],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          'Pandasを用いたデータクレンジングによりデータを利活用しやすいデータベースを作成し，Seaborn等を活用したデータ可視化を通じて，効果的な営業活動パターンや重点顧客セグメントの特定に貢献．',
          'さらに，特定したインサイトを基に，KPI達成に向けたアクションプランを立案し，MR（医薬情報担当者）による実行を推進．その効果を定量的に測定・評価し，報告まで一気通貫で担当．',
        ],
        en: [
          'Created an easy-to-use database through data cleansing using Pandas, and contributed to identifying effective sales activity patterns and key customer segments through data visualization using Seaborn and other tools.',
          'Furthermore, based on the identified insights, formulated action plans toward achieving KPIs and promoted execution by MRs (Medical Representatives). Responsible for quantitatively measuring and evaluating the effects and reporting in an end-to-end manner.',
        ],
      },
    },
  ],
  technologies: ['Python', 'Pandas', 'Seaborn', 'SQL', 'Data Analytics'],
};
