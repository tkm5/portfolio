import type { Project } from '@/types';

export const insuranceAi: Project = {
  slug: 'insurance-ai',
  title: {
    ja: '大手生命保険会社：RAGシステム開発支援',
    en: 'Major Life Insurance Company: RAG System Development Support',
  },
  meta: {
    ja: 'グローバルコンサルティングファーム',
    en: 'Global Consulting Firm',
  },
  description: 'Major Life Insurance Company: RAG System Development Support',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'クライアントのAI開発の内製化と人材育成を目標に，技術指導とアプリケーション開発支援を包括的に担当．Microsoft Azure上でRAG（Retrieval Augmented Generation）アーキテクチャを採用した高精度な社内文書検索AIシステムの設計・開発を主導し，エンタープライズグレードのセキュリティ要件を満たすプライベート環境への本番デプロイまでをエンドツーエンドで実現．',
        ],
        en: [
          'Comprehensively responsible for technical guidance and application development support, with the goal of internalizing the client AI development and nurturing talent. Led the design and development of a high-precision internal document search AI system adopting RAG (Retrieval Augmented Generation) architecture on Microsoft Azure, achieving end-to-end production deployment to a private environment meeting enterprise-grade security requirements.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'Azure公式リファレンス実装（azure-search-openai-demo）をベースに，金融業界特有の要件に対応するカスタマイズを実施．フロントエンドはReact/TypeScriptで構築し，バックエンドはPython（Quart非同期フレームワーク）を採用．Azure AI Searchによるベクトル検索・ハイブリッド検索・セマンティックランカーを組み合わせた多段階検索パイプラインを実装し，検索精度を最大化．',
          'ドキュメント処理基盤として，Azure Document Intelligenceを活用したPDF/Word/Excel等の構造化解析パイプラインを構築．Integrated Vectorizationによりインデックス更新を自動化し，Azure Blob Storageへのドキュメントアップロードから検索可能状態までをシームレスに連携．',
        ],
        en: [
          'Implemented customizations based on the Azure official reference implementation (azure-search-openai-demo) to meet financial industry-specific requirements. Built frontend with React/TypeScript and adopted Python (Quart async framework) for backend. Implemented a multi-stage search pipeline combining vector search, hybrid search, and semantic ranker with Azure AI Search to maximize search accuracy.',
          'Built a structured analysis pipeline for PDF/Word/Excel documents using Azure Document Intelligence as document processing infrastructure. Automated index updates through Integrated Vectorization, seamlessly connecting document uploads to Azure Blob Storage to searchable state.',
        ],
      },
    },
    {
      title: { ja: 'セキュリティ・インフラ', en: 'Security & Infrastructure' },
      content: {
        ja: [
          '金融機関のセキュリティ要件に準拠するため，Azure Private EndpointとVirtual Networkを用いた完全閉域網構成を設計・実装．Azure Container Appsによるコンテナベースのデプロイメントを採用し，自動スケーリングと高可用性を実現．Microsoft Entra ID統合による認証・認可基盤を構築し，ユーザー単位のアクセス制御を実装．',
          'Azure Key Vaultによるシークレット管理，Application Insightsによる包括的なログ分析基盤を構築．Azure Log Analyticsと連携したKQLクエリによる運用監視ダッシュボードを実装し，レスポンス品質の継続的な評価・改善を可能とする環境を確立．',
        ],
        en: [
          'Designed and implemented a fully private network configuration using Azure Private Endpoint and Virtual Network to comply with financial institution security requirements. Adopted container-based deployment with Azure Container Apps, achieving auto-scaling and high availability. Built authentication/authorization infrastructure integrated with Microsoft Entra ID, implementing user-level access control.',
          'Built secret management with Azure Key Vault and comprehensive log analysis infrastructure with Application Insights. Implemented operational monitoring dashboards with KQL queries linked to Azure Log Analytics, establishing an environment enabling continuous evaluation and improvement of response quality.',
        ],
      },
    },
    {
      title: { ja: '技術移転・人材育成', en: 'Technology Transfer & Training' },
      content: {
        ja: [
          'Web開発基礎（HTML/CSS/JavaScript）からPythonプログラミング，クラウドアーキテクチャまで，AI開発に必要な知識を体系的にレクチャー．Git/GitHubによるバージョン管理，Pull Requestを活用したコードレビュー文化の定着など，モダンな開発プラクティスを導入．',
          'アジャイル開発手法（スクラム）を導入し，2週間スプリントによる反復的な開発サイクルを確立．Daily Standupミーティングを通じて，チーム全体の開発生産性と自律性を向上．',
        ],
        en: [
          'Systematically lectured on knowledge required for AI development, from web development basics (HTML/CSS/JavaScript) to Python programming and cloud architecture. Introduced modern development practices including version control with Git/GitHub and establishing code review culture utilizing Pull Requests.',
          'Introduced agile development methodology (Scrum) and established iterative development cycles with 2-week sprints. Improved overall team development productivity and autonomy through Daily Standup meetings.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'Quart',
    'React',
    'TypeScript',
    'Azure OpenAI Service',
    'Azure AI Search',
    'Azure Container Apps',
    'Azure Blob Storage',
    'Azure Document Intelligence',
    'Azure Key Vault',
    'Application Insights',
    'Private Endpoint',
    'Microsoft Entra ID',
    'RAG',
    'Vector Search',
    'Semantic Ranker',
    'Git/GitHub',
    'Agile/Scrum',
  ],
};
