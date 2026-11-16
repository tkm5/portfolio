import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    company: {
      ja: 'グローバルコンサルティングファーム',
      en: 'Global Consulting Firm',
    },
    period: '2025.05 - Present',
    role: {
      ja: 'スペシャリストシニア',
      en: 'Specialist Senior',
    },
    summary: {
      ja: '大手生命保険グループのIT子会社でRAGアプリ内製化のための技術指導と開発を担当．大手生命保険会社では，業務マニュアルから業務分析テーブルを自動生成するパイプラインの開発と，全社オペレーション変革の技術支援を担当．',
      en: "Coached and built alongside a life insurance group's IT subsidiary to bring RAG apps in-house. For a major life insurer, built a pipeline that generates business-analysis tables from operations manuals and provided technical support for a company-wide operations transformation.",
    },
  },
  {
    company: {
      ja: '欧州系コンサルティングファーム',
      en: 'European Consulting Firm',
    },
    period: '2022.02 - 2025.04',
    role: {
      ja: 'コンサルタント',
      en: 'Consultant',
    },
    summary: {
      ja: 'データ分析・AIのPoCを設計・実装．社内問い合わせ用RAGチャットを作成し，全社で利用され2024年度コーポレートアワードを受賞．中央省庁の調査研究では，事業内容をベクトル化した検索手法を考案・実装．',
      en: 'Designed and built data-analysis and AI PoCs. Built the internal inquiry chat as RAG; it was used firm-wide and won the FY2024 Corporate Award. For a central government ministry, devised and implemented embedding-based retrieval of program descriptions.',
    },
  },
  {
    company: {
      ja: '大手広告代理店',
      en: 'Major Advertising Agency',
    },
    period: '2020.01 - 2022.01',
    role: {
      ja: 'データアナリスト',
      en: 'Data Analyst',
    },
    summary: {
      ja: '保険グループのTV CM・ラジオ・新聞を組み合わせた販促で，新聞媒体のデータ分析とKPI設計を担当．ハンバーガーチェーンでは，POSデータのクラスタリングでペルソナを設計し，ペルソナ群ごとのクーポン配信戦略と広告配信戦略を立案．',
      en: "Handled newspaper data analysis and KPI design for an insurance group's promotions across TV, radio, and newspapers. For a hamburger chain, designed personas by clustering POS data and planned coupon and ad-delivery strategies for each persona group.",
    },
  },
  {
    company: {
      ja: '大手IT企業',
      en: 'Major IT Company',
    },
    period: '2018.04 - 2019.09',
    role: {
      ja: '法人営業',
      en: 'Enterprise Sales Representative',
    },
    summary: {
      ja: '大手生命保険会社や大手不動産会社などのクライアント様に，業務DXのソリューションを提案．',
      en: 'Proposed business DX solutions to major clients such as leading life insurers and real estate firms.',
    },
  },
];
