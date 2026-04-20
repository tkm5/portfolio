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
          'クライアントのAI開発内製化と人材育成を目標に，Microsoft Azure上で社内文書検索RAGシステムの設計・開発を主導．`Azure-Samples/azure-search-openai-demo` をforkし，金融機関の閉域ネットワーク要件とEntra ID統合認証を満たすエンタープライズ仕様へ拡張．プライベート環境への本番デプロイまでをエンドツーエンドで担当した．',
        ],
        en: [
          "Led the design and development of an internal document search RAG system on Microsoft Azure, with the goal of helping the client internalize AI engineering and grow their talent. Forked `Azure-Samples/azure-search-openai-demo` and extended it to meet the closed-network requirements and Entra ID-based authentication expected by a financial institution, owning production deployment into a private environment end-to-end.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'フロントエンドはReact + TypeScript（Viteビルド），バックエンドはPython Quartの非同期APIで構成．Azure AI Searchによるベクトル検索・BM25・セマンティックランカーを多段に組み合わせ，社内規程のような固有名詞と言い換えが混在するドキュメントでも高い想起率と関連度を両立する検索パイプラインを組んだ．',
          'ドキュメント投入は Azure Document Intelligence でのOCR・表構造解析と Integrated Vectorization を組み合わせ，Blob Storage へのアップロードから検索可能化までをイベント駆動で自動化．プロンプトは upstream の Jinja2 ベースから `.prompty`（`chat_answer_question.prompty` 等）へ移し替え，プロンプトのレビュー・差分追跡をコード同等に扱えるようにした．',
          '環境差分は `azure-dev.yaml` に 130+ の環境変数として集約し，テナント・部署ごとのデプロイを同じコードベースから派生できる設計．ホスティングは Azure Container Apps を選択し，Bicep による IaC でスケール・可用性を宣言的に管理している．',
        ],
        en: [
          'A React + TypeScript frontend (Vite) is paired with a Python Quart async backend. Azure AI Search stacks vector search, BM25, and the semantic ranker into a multi-stage pipeline — the combination keeps both recall and relevance high on internal policy documents where proper nouns and paraphrases mix freely.',
          'Ingestion chains Azure Document Intelligence (OCR and table parsing) with Integrated Vectorization so uploads to Blob Storage become searchable through an event-driven flow. Prompts were migrated from the upstream Jinja2 layout to `.prompty` files (e.g. `chat_answer_question.prompty`), which lets prompt review and diff tracking be handled with the same tools as code.',
          "Environment differences live in `azure-dev.yaml` as 130+ environment variables, so per-tenant and per-department deployments can be forked from one codebase. Hosting runs on Azure Container Apps with scale and availability declared in Bicep IaC.",
        ],
      },
    },
    {
      title: { ja: 'セキュリティ・閉域ネットワーク', en: 'Security & Private Networking' },
      content: {
        ja: [
          '金融業界のセキュリティ要件に対応するため，`network-isolation.bicep` でVNet・Private Endpoint・DNSプライベートゾーンを一式で定義．upstreamでは限定的だった閉域構成を宣言的IaCに統合し，インターネット側へのパブリック経路を持たない完全内部通信を実現した．',
          '認証・認可は `authentication.py` でEntra IDのテナントID・サーバーApp ID・クライアントApp IDを厳密に管理し，ドキュメント単位のACLと組み合わせて部署横断の情報漏洩を防止．Azure Key Vaultでシークレットを外出しし，Application Insightsとの連携用に43KB規模のBicepテンプレートでカスタム KPI ダッシュボードを構築している．',
          'Azure Log Analytics上でKQLクエリによる運用監視ダッシュボードを実装し，回答レイテンシ・検索ヒット率・ユーザー別利用状況といったRAG固有のKPIを継続計測．回答品質劣化の早期検知を可能にした．',
        ],
        en: [
          'To meet financial-industry security requirements, `network-isolation.bicep` defines the VNet, Private Endpoints, and private DNS zones as a single declarative bundle. The closed-network setup — only partially covered upstream — is fully integrated into IaC, leaving no public path to the internet.',
          'Authentication and authorization are tightened in `authentication.py`, which strictly manages the Entra ID tenant ID and server / client App IDs; document-level ACLs then prevent cross-department leakage. Secrets are externalized to Azure Key Vault, and a 43 KB Bicep template builds an Application Insights custom KPI dashboard.',
          'An Azure Log Analytics dashboard built with KQL continuously tracks RAG-specific KPIs — answer latency, retrieval hit rate, per-user usage — so quality regressions are caught early.',
        ],
      },
    },
    {
      title: { ja: '技術移転・人材育成', en: 'Technology Transfer & Training' },
      content: {
        ja: [
          'Web基礎（HTML / CSS / JavaScript）からPython・Azureアーキテクチャまでを体系的にレクチャーし，Git / GitHub・Pull Request・コードレビューの運用を段階的にチームへ定着．アジャイル（スクラム・2週間スプリント・Daily Standup）を導入し，外部依存から自走チームへの移行を半年スパンで設計・実行した．',
        ],
        en: [
          'Delivered structured lectures spanning web fundamentals (HTML / CSS / JavaScript) through Python and Azure architecture, and incrementally embedded Git / GitHub, pull-request, and code-review practices into the team. Scrum with two-week sprints and daily standups was introduced to plan and drive a half-year transition from external dependency to a self-directed team.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'Quart',
    'React',
    'TypeScript',
    'Vite',
    'Azure OpenAI Service',
    'Azure AI Search',
    'Azure Container Apps',
    'Azure Blob Storage',
    'Azure Document Intelligence',
    'Azure Key Vault',
    'Application Insights',
    'Azure Private Endpoint',
    'Microsoft Entra ID',
    'Bicep',
    '.prompty',
    'RAG',
    'Vector Search',
    'Semantic Ranker',
    'Integrated Vectorization',
    'Agile/Scrum',
  ],
};
