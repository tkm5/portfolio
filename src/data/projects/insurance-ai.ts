import type { Project } from '@/types';

export const insuranceAi: Project = {
  slug: 'insurance-ai',
  title: {
    ja: '大手生命保険グループのIT子会社：RAGアプリ内製化のための技術指導と開発',
    en: "Major Life Insurance Group's IT Subsidiary: Technical Coaching and Development for In-House RAG Apps",
  },
  meta: {
    ja: 'グローバルコンサルティングファーム',
    en: 'Global Consulting Firm',
  },
  description: 'Technical coaching and development so a life insurance group IT subsidiary can build and modify RAG apps in-house',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          'クライアント様は大手生命保険グループのIT子会社．目標は，技術社員が自らRAGアプリを開発・改修できる状態をつくること（RAGアプリの内製化）．対象はクライアント様の技術者約10名．',
        ],
        en: [
          "The client was a major life insurance group's IT subsidiary. The goal was for its own engineers to build and modify RAG apps themselves, bringing RAG development in-house. About 10 client engineers took part.",
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      content: {
        ja: [
          '技術指導と開発の両方を担当．講義だけで終えず，クライアント様の技術者と一緒に作りながら，技術社員が自らRAGアプリを開発・改修できるよう進めた．',
        ],
        en: [
          "Owned both the coaching and the development: rather than stopping at lectures, built alongside the client's engineers so they could build and modify RAG apps on their own.",
        ],
      },
      list: {
        ja: [
          '講義: HTML/CSS/JavaScript・Python・Azureを体系的に講義し，アジャイル開発を導入．',
          '段階的な開発: PythonとJavaScriptでRAGアプリを作るところから始め，Azureのベストプラクティスを基盤としたRAGアプリの内製化へ進めた．',
          'システム: AzureのRAGサンプルを拡張した新システムを構築し，セキュリティ要件を満たす閉域構成でクライアント様環境にデプロイ．',
          'ログ基盤: 運用改善を進めたいというクライアント様の要望に応え，OpenTelemetryとLog Analyticsでログ基盤を整備．',
        ],
        en: [
          'Lectures: taught HTML/CSS/JavaScript, Python, and Azure systematically, and introduced agile development.',
          "Step-by-step development: started from building a RAG app in Python and JavaScript, then moved to in-house development of RAG apps built on Azure's best practices.",
          "System: built a new system by extending Azure's RAG sample and deployed it into the client's environment in a private network that met the security requirements.",
          'Logging: at the client\'s request to improve operations, added a logging platform with OpenTelemetry and Log Analytics.',
        ],
      },
    },
    {
      title: { ja: '結果', en: 'Outcome' },
      content: {
        ja: [
          '構築したシステムはクライアント様の全技術社員が利用．',
        ],
        en: [
          "The system is used by all of the client's engineers.",
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'JavaScript',
    'Azure Container Apps',
    'Azure OpenAI Service',
    'Azure AI Document Intelligence',
    'Azure Cosmos DB',
    'Log Analytics',
    'OpenTelemetry',
    'RAG',
    'Agile',
  ],
};
