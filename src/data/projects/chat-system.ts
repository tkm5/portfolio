import type { Project } from '@/types';

export const chatSystem: Project = {
  slug: 'chat-system',
  title: {
    ja: '社内向けチャットシステム開発',
    en: 'Internal Chat System Development',
  },
  meta: {
    ja: '欧州系コンサルティングファーム | 社内プロジェクト',
    en: 'European Consulting Firm | Internal Project',
  },
  description: 'Internal Chat System Development',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'Azureクラウド環境を基盤とし，生成AIおよびRAG（Retrieval-Augmented Generation）技術を活用した社内問い合わせ対応チャットシステムを設計・開発・運用．Azure公式リファレンス実装（azure-search-openai-demo）をベースにカスタマイズを施し，社内ナレッジベースへの高精度な質問応答を実現．本プロジェクトの成果が評価され，2024年度コーポレートアワードを受賞．',
        ],
        en: [
          "Designed, developed, and operated an internal inquiry response chat system utilizing generative AI and RAG (Retrieval-Augmented Generation) technology based on Azure cloud environment. Customized based on the Azure official reference implementation (azure-search-openai-demo) to achieve high-precision Q&A for internal knowledge base. Received the 2024 Corporate Award in recognition of this project's achievements.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'フロントエンドはReact/TypeScriptで構築し，レスポンシブデザインによりPC・モバイル両対応のUIを実現．バックエンドはPython（Quart非同期フレームワーク）を採用し，ストリーミングレスポンスによるリアルタイムな回答生成を実装．Azure OpenAI Service（GPT-4）による高品質な自然言語生成と，Azure AI Searchによるベクトル検索・ハイブリッド検索・セマンティックランカーを組み合わせた多段階検索パイプラインを構築．',
          'ドキュメント処理基盤として，Azure Document Intelligenceを活用したPDF・Word・PowerPoint等の構造化解析パイプラインを構築．社内規程・マニュアル・FAQ等の多様なドキュメント形式に対応し，Azure Blob Storageへのアップロードから検索インデックスへの自動反映までをIntegrated Vectorizationで自動化．',
        ],
        en: [
          'Built frontend with React/TypeScript, achieving UI compatible with both PC and mobile through responsive design. Adopted Python (Quart async framework) for backend, implementing real-time answer generation through streaming response. Built a multi-stage search pipeline combining high-quality natural language generation with Azure OpenAI Service (GPT-4) and vector search, hybrid search, and semantic ranker with Azure AI Search.',
          'Built a structured analysis pipeline for PDF, Word, PowerPoint documents using Azure Document Intelligence as document processing infrastructure. Supported various document formats including internal regulations, manuals, and FAQs, automating from upload to Azure Blob Storage to automatic reflection in search index through Integrated Vectorization.',
        ],
      },
    },
    {
      title: { ja: 'CI/CD・DevOps', en: 'CI/CD & DevOps' },
      content: {
        ja: [
          'Azure DevOpsを用いた本格的なCI/CDパイプラインを設計・構築．Azure Pipelinesによるビルド・テスト・デプロイの自動化を実現し，開発からステージング，本番環境への継続的デリバリーを確立．Infrastructure as Code（Bicep/ARM Templates）によるAzureリソースの宣言的管理を導入し，環境構築の再現性と一貫性を担保．',
          'Azure Reposによるソースコード管理とブランチ戦略（Git Flow）を策定し，Pull Requestベースのコードレビュープロセスを確立．Azure Boardsによるタスク管理とスプリント計画を導入し，アジャイル開発プラクティスをチームに浸透．',
        ],
        en: [
          'Designed and built a full-fledged CI/CD pipeline using Azure DevOps. Achieved automation of build, test, and deployment with Azure Pipelines, establishing continuous delivery from development to staging to production environments. Introduced declarative management of Azure resources through Infrastructure as Code (Bicep/ARM Templates), ensuring reproducibility and consistency of environment construction.',
          'Established source code management with Azure Repos and branch strategy (Git Flow), establishing a Pull Request-based code review process. Introduced task management and sprint planning with Azure Boards, spreading agile development practices throughout the team.',
        ],
      },
    },
    {
      title: { ja: '運用・モニタリング', en: 'Operations & Monitoring' },
      content: {
        ja: [
          'Application Insightsによる包括的なアプリケーションパフォーマンス監視を実装．カスタムメトリクスとしてユーザー満足度評価（サムズアップ/ダウン），回答精度，レスポンス時間等を収集し，Azure Log AnalyticsとKQLクエリによる運用ダッシュボードを構築．',
          'ユーザーフィードバックを基にしたプロンプトチューニングと検索パラメータの継続的最適化により，回答品質を段階的に向上．マルチターン会話対応，引用元表示，思考プロセスの可視化等のUX改善を実装し，ユーザー体験を継続的に改善．',
        ],
        en: [
          'Implemented comprehensive application performance monitoring with Application Insights. Collected custom metrics including user satisfaction ratings (thumbs up/down), answer accuracy, and response time, building operational dashboards with Azure Log Analytics and KQL queries.',
          'Gradually improved answer quality through prompt tuning and continuous optimization of search parameters based on user feedback. Implemented UX improvements including multi-turn conversation support, citation display, and thought process visualization, continuously improving user experience.',
        ],
      },
    },
    {
      title: { ja: '成果', en: 'Achievement' },
      content: {
        ja: [
          '社内問い合わせ対応の効率化と品質向上に大きく貢献し，これらの実績が評価され2024年度コーポレートアワードを受賞．本システムは社内の標準ツールとして定着し，継続的な利用と改善が行われている．',
        ],
        en: [
          'Made significant contributions to improving the efficiency and quality of internal inquiry responses, receiving the 2024 Corporate Award in recognition of these achievements. This system has become established as a standard internal tool, with continuous use and improvement.',
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
    'Azure Blob Storage',
    'Azure Document Intelligence',
    'Azure DevOps',
    'Azure Pipelines',
    'Azure Repos',
    'Azure Boards',
    'Application Insights',
    'Log Analytics',
    'Bicep/ARM',
    'RAG',
    'Vector Search',
    'Semantic Ranker',
    'CI/CD',
    'Git Flow',
  ],
};
