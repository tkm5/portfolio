import type { Project } from '@/types';

export const creativeCanvas: Project = {
  slug: 'creative-canvas',
  title: {
    ja: '大手自動車メーカー：Creative Canvas',
    en: 'Major Automotive Manufacturer: Creative Canvas',
  },
  meta: {
    ja: '欧州系コンサルティングファーム',
    en: 'European Consulting Firm',
  },
  description: 'Major Automotive Manufacturer: Creative Canvas',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          "MiroとLLMを統合し，ユーザーが事業アイデアやクリエイティブを視覚的に創出できるWebアプリケーション'Creative Canvas'の設計・開発を担当．フロントエンドからバックエンド，外部API連携まで一貫して実装し，プロトタイプの迅速なデリバリーを実現．",
        ],
        en: [
          "Responsible for designing and developing 'Creative Canvas,' a web application integrating Miro and LLM that enables users to visually generate business ideas and creatives. Implemented end-to-end from frontend to backend and external API integration, achieving rapid prototype delivery.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'フロントエンドはReact / TypeScriptで構築し，コンポーネント設計による再利用性と保守性を確保．バックエンドはDjango REST Frameworkを採用し，RESTful APIを設計・実装．LLMへのプロンプト送信とレスポンス処理を非同期で行い，ユーザー体験を損なわないアーキテクチャを構築．',
          'Miro REST APIとの連携により，LLMが生成したアイデアをMiroボード上に付箋として自動配置する機能を開発．アイデア創出からビジュアライゼーションまでのワークフローを自動化．',
        ],
        en: [
          'Built frontend with React / TypeScript, ensuring reusability and maintainability through component design. Adopted Django REST Framework for backend, designing and implementing RESTful APIs. Constructed an architecture that handles LLM prompt submission and response processing asynchronously without compromising user experience.',
          'Developed functionality to automatically place LLM-generated ideas as sticky notes on Miro boards through Miro REST API integration. Automated the workflow from idea generation to visualization.',
        ],
      },
    },
    {
      title: { ja: 'UI/UX設計', en: 'UI/UX Design' },
      content: {
        ja: [
          'UI要件定義を担当し，Figmaを用いたモックアップ作成によりクライアントおよびプロジェクトメンバーとの議論を促進．ユーザビリティを考慮したインターフェース設計を行い，直感的な操作性を実現．',
        ],
        en: [
          'Responsible for UI requirements definition, facilitating discussions with clients and project members through mockup creation using Figma. Designed interfaces with usability in mind, achieving intuitive operability.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'Django',
    'Django REST Framework',
    'React',
    'TypeScript',
    'Miro API',
    'REST API',
    'Figma',
    'LLM',
    'UI/UX Design',
  ],
};
