import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'business-analysis-pipeline',
    title: {
      ja: '業務分析テーブル自動生成AIパイプライン',
      en: 'Business Analysis Table Auto-Generation AI Pipeline',
    },
    meta: {
      ja: 'グローバルコンサルティングファーム',
      en: 'Global Consulting Firm',
    },
    description: 'Business Analysis Table Auto-Generation AI Pipeline',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'コンサルタントによるクライアントの業務分析を効率化する「業務分析テーブル」をAIで自動生成．PDF，Word，PowerPoint，Excelなど多様な形式の業務マニュアル群を横断的に分析し，単一のCSVファイルとして出力するパイプラインを設計・開発．プロンプトの試行錯誤を効率化し，再現性の高い実験管理基盤を構築．',
          ],
          en: [
            "Auto-generates 'Business Analysis Tables' using AI to streamline consultants' client business analysis. Designed and developed a pipeline that comprehensively analyzes business manuals in various formats (PDF, Word, PowerPoint, Excel) and outputs a unified CSV file. Built a reproducible experiment management infrastructure to streamline prompt iteration.",
          ],
        },
      },
      {
        title: { ja: 'アーキテクチャ', en: 'Architecture' },
        content: {
          ja: [
            '設定（Config），実行（Orchestrator），エンジン（Core Logic）の役割を明確に分離した構成を採用．中央設定ファイル（config.py）を編集するだけで，複数のプロンプトやパラメータの組み合わせを一度に実行し，結果を個別に出力・管理できる体制を実現．',
            'LangGraphによるパイプラインオーケストレーション: 4段階の処理フロー（Converter → Extractor → Grouper → Classifier）をLangGraphで統合管理し，ステートフルなワークフロー制御を実現．',
          ],
          en: [
            'Adopted an architecture with clear separation of Config, Orchestrator, and Core Logic roles. By simply editing the central configuration file (config.py), multiple combinations of prompts and parameters can be executed at once, with results output and managed individually.',
            'Pipeline Orchestration with LangGraph: Integrated management of the 4-stage processing flow (Converter → Extractor → Grouper → Classifier) using LangGraph, enabling stateful workflow control.',
          ],
        },
        list: {
          ja: [
            'Converter: 多様なファイル形式をAIが理解しやすいMarkdown形式に変換',
            'Extractor: Markdownから業務手順を抽出し構造化テーブルを作成',
            'Grouper: ユーザー視点での行動グループ分類',
            'Classifier: 技術的視点での詳細分類',
          ],
          en: [
            'Converter: Convert various file formats to AI-friendly Markdown',
            'Extractor: Extract business procedures from Markdown and create structured tables',
            'Grouper: Action group classification from user perspective',
            'Classifier: Technical detailed classification',
          ],
        },
      },
      {
        title: { ja: '主要機能', en: 'Key Features' },
        content: {
          ja: [
            '実験管理基盤: プロンプトのバージョン管理とパラメータ組み合わせの定義により，複数実験の一括実行と結果比較を実現．各実験の中間ファイル・最終出力を個別ディレクトリで管理．',
            'Two-Stage Classification: タスク分類を「グルーピング」と「詳細分類」の2段階に分割し，各ステップでのAI判断精度向上と中間結果の検証を容易化．',
            'データ品質保証: Pydanticモデルを用いた入出力検証により，AIからの出力が期待通りのJSON形式であることを保証する品質ゲートを実装．',
            'Azure連携: Azure Blob Storageとのファイル連携スクリプトを整備し，クラウド環境でのデータ入出力をシームレスに実現．',
            'Webアプリケーション: Next.js/TypeScriptによるフロントエンドを開発．ファイルアップロード機能と分析実行UIを提供し，ユーザーが直感的にパイプラインを操作可能．',
          ],
          en: [
            'Experiment Management: Enables batch execution and result comparison of multiple experiments through prompt version control and parameter combination definitions. Manages intermediate files and final outputs in separate directories for each experiment.',
            "Two-Stage Classification: Split task classification into 'Grouping' and 'Detailed Classification' stages, improving AI judgment accuracy at each step and facilitating intermediate result verification.",
            'Data Quality Assurance: Implemented quality gates using Pydantic models for input/output validation, ensuring AI outputs conform to expected JSON formats.',
            'Azure Integration: Prepared file integration scripts with Azure Blob Storage, enabling seamless data input/output in cloud environments.',
            'Web Application: Developed frontend with Next.js/TypeScript. Provides file upload functionality and analysis execution UI, enabling users to intuitively operate the pipeline.',
          ],
        },
      },
      {
        title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
        content: {
          ja: [
            'Python 3.12+，uvによるパッケージ管理を採用．Google Style Docstringを全ファイルに適用し，Ruffによる静的解析・フォーマットでコード品質を担保．LibreOfficeを活用したOfficeファイルのPDF変換，日本語フォント対応による文字化け防止も実装．',
          ],
          en: [
            'Adopted Python 3.12+ with uv package management. Applied Google Style Docstrings to all files, ensuring code quality through Ruff static analysis and formatting. Implemented Office file to PDF conversion using LibreOffice with Japanese font support to prevent character corruption.',
          ],
        },
      },
    ],
    technologies: [
      'Python',
      'Google Gemini',
      'LangGraph',
      'Next.js',
      'TypeScript',
      'Azure Blob Storage',
      'Pandas',
      'Pydantic',
      'LibreOffice',
      'uv',
      'Ruff',
      'Prompt Engineering',
    ],
  },
  {
    slug: 'slm-mlops',
    title: {
      ja: '独自日本語SLM MLOpsパイプライン開発',
      en: 'Custom Japanese SLM MLOps Pipeline Development',
    },
    meta: {
      ja: 'グローバルコンサルティングファーム | 社内プロジェクト',
      en: 'Global Consulting Firm | Internal Project',
    },
    description: 'Custom Japanese SLM MLOps Pipeline Development',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'NVIDIA Data Flywheel Blueprintに基づき，本番環境のプロンプト/レスポンスログを活用して蒸留モデルの自律的な学習・改善サイクルを実現するMLOps基盤をエンドツーエンドで設計・構築．NeMo Microservicesプラットフォームを活用し，推論コストを最大98.6%削減可能なモデル最適化パイプラインを実装．',
          ],
          en: [
            'Designed and built an end-to-end MLOps infrastructure based on NVIDIA Data Flywheel Blueprint, enabling autonomous learning and improvement cycles for distilled models using production prompt/response logs. Implemented a model optimization pipeline capable of reducing inference costs by up to 98.6% leveraging the NeMo Microservices platform.',
          ],
        },
      },
      {
        title: { ja: 'アーキテクチャ', en: 'Architecture' },
        content: {
          ja: [
            'NeMo Deployment Managerを活用し，必要に応じてNIMsを動的に起動・停止することで，GPUリソースを効率的に管理．Celeryワーカーによるバックグラウンドタスク処理とRedisによるタスクキュー管理を実装．',
          ],
          en: [
            'Efficiently managed GPU resources by dynamically starting and stopping NIMs as needed using NeMo Deployment Manager. Implemented background task processing with Celery workers and task queue management with Redis.',
          ],
        },
        list: {
          ja: [
            'Elasticsearchによるプロンプト/レスポンスログの収集・保存',
            'workload_idベースのタスク分類と重複排除',
            'class-aware stratified splittingによる評価・学習データセットの自動生成',
            'NeMo Customizerによるファインチューニング（LoRA）',
            'LLM-as-judge比較によるNeMo Evaluatorでの評価',
          ],
          en: [
            'Prompt/response log collection and storage via Elasticsearch',
            'Task classification and deduplication based on workload_id',
            'Automatic generation of evaluation and training datasets using class-aware stratified splitting',
            'Fine-tuning with NeMo Customizer (LoRA)',
            'Evaluation with NeMo Evaluator using LLM-as-judge comparisons',
          ],
        },
      },
      {
        title: { ja: '実験タイプ', en: 'Experiment Types' },
        content: {
          ja: [
            'LLM-as-judgeによる類似度メトリクス[0,1]でスコアリングし，高スコアの小規模モデルを自動的に候補として抽出．',
          ],
          en: [
            'Scored using LLM-as-judge similarity metrics [0,1], automatically extracting high-scoring small models as candidates.',
          ],
        },
        list: {
          ja: [
            'Base: 本番プロンプトの再生',
            'ICL (In-Context Learning): トラフィック例からのfew-shotプロンプト構築（ランダム選択またはセマンティック類似度ベース）',
            'Customized: LoRAファインチューニング後のベースプロンプト評価',
          ],
          en: [
            'Base: Replay of production prompts',
            'ICL (In-Context Learning): Few-shot prompt construction from traffic examples (random selection or semantic similarity-based)',
            'Customized: Base prompt evaluation after LoRA fine-tuning',
          ],
        },
      },
      {
        title: { ja: 'インフラストラクチャ', en: 'Infrastructure' },
        content: {
          ja: [
            'H100およびA100 GPUを搭載した環境において，Kubernetes/Helmによるコンテナオーケストレーションを構築．FastAPIベースのREST API，MongoDB（メタデータ），Elasticsearch（ログ），Redis（タスクキュー）による堅牢なデータ基盤を実現．',
            'Kibanaによる入力データの品質可視化ダッシュボードを構築し，データとモデルの継続的な改善サイクルを定量的に評価・推進できる環境を確立．uvとBrev on Google Cloudを導入し，開発効率を最大化．',
          ],
          en: [
            'Built container orchestration with Kubernetes/Helm in an environment equipped with H100 and A100 GPUs. Achieved robust data infrastructure with FastAPI-based REST API, MongoDB (metadata), Elasticsearch (logs), and Redis (task queue).',
            'Built input data quality visualization dashboards with Kibana, establishing an environment for quantitatively evaluating and promoting continuous improvement cycles for data and models. Maximized development efficiency by introducing uv and Brev on Google Cloud.',
          ],
        },
      },
    ],
    technologies: [
      'Python',
      'NVIDIA NeMo',
      'NVIDIA NIM',
      'Kubernetes',
      'Helm',
      'FastAPI',
      'Celery',
      'Elasticsearch',
      'MongoDB',
      'Redis',
      'Kibana',
      'LoRA',
      'H100/A100',
      'Google Cloud',
      'uv',
    ],
  },
  {
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
  },
  {
    slug: 'government-rag',
    title: {
      ja: '中央省庁：事業類似性構造分析',
      en: 'Central Government: Business Similarity Analysis',
    },
    meta: {
      ja: '欧州系コンサルティングファーム',
      en: 'European Consulting Firm',
    },
    description: 'Central Government: Business Similarity Analysis',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            '生成AIを活用した行政事業の類似性調査において，RAGやベクトル検索を用いた高精度な検索手法を考案・実装．',
          ],
          en: [
            'Devised and implemented high-precision search methods using RAG and vector search for similarity surveys of government projects utilizing generative AI.',
          ],
        },
      },
      {
        title: { ja: '詳細', en: 'Details' },
        content: {
          ja: [
            '事業内容を詳細にベクトル化し，生成AIに深い理解を促すことで，従来の単語検索と比較して大幅に検索精度を向上．同時に，この調査・分析を効率的に実施するため，Azure上にDockerコンテナを用いたJupyter Lab環境を構築．',
            'さらに，クラウドセキュリティ要件の検討および実装まで一貫して担当．',
          ],
          en: [
            'By vectorizing business content in detail and promoting deeper understanding by generative AI, significantly improved search accuracy compared to traditional keyword search. At the same time, built a Jupyter Lab environment using Docker containers on Azure to efficiently conduct this research and analysis.',
            'Furthermore, consistently handled cloud security requirements consideration and implementation.',
          ],
        },
      },
    ],
    technologies: ['Azure', 'Docker', 'Jupyter Lab', 'RAG', 'Vector Search', 'Python'],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    slug: 'ai-agent',
    title: {
      ja: 'AIエージェント意思決定支援システム',
      en: 'AI Agent Decision Support System',
    },
    meta: {
      ja: '業務委託',
      en: 'Commissioned Work',
    },
    description: 'AI Agent Decision Support System',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'ビジネスにおける意思決定の質を高めるため，賛成（Pro）・反対（Con）の双方の視点から論理的な助言を行うAIエージェントシステムを設計・開発．LangGraph/LangChain/FastAPIを基盤とし，マルチテナント対応のB2B SaaSアーキテクチャを実現．',
          ],
          en: [
            'Designed and developed an AI agent system that provides logical advice from both Pro and Con perspectives to improve the quality of business decision-making. Built on LangGraph/LangChain/FastAPI foundation, achieving a multi-tenant B2B SaaS architecture.',
          ],
        },
      },
      {
        title: { ja: 'アーキテクチャ', en: 'Architecture' },
        content: {
          ja: [
            'LangGraphによる11ステップのステートフルなワークフローを設計．ユーザーメモリ読込->検索要否判定->RAG/Web検索->コンテキスト統合->プロンプト設定->Pro/Conエージェント並列実行->応答統合->メモリ保存->最終回答生成の一連のフローを，条件分岐付きグラフで制御．',
            'ReActパターン（Reasoning + Acting）を実装し，エージェントが自律的に情報の過不足を判断．必要に応じてGoogle Vertex AI Searchによる社内ナレッジ検索やGemini組み込みツールによるWeb検索を実行し，最適な情報を取得・統合．',
          ],
          en: [
            'Designed an 11-step stateful workflow using LangGraph. Controlled the entire flow from user memory loading -> search necessity judgment -> RAG/Web search -> context integration -> prompt setting -> Pro/Con agent parallel execution -> response merging -> memory saving -> final answer generation through a graph with conditional branching.',
            'Implemented ReAct pattern (Reasoning + Acting), enabling agents to autonomously judge information sufficiency. Executes internal knowledge search via Google Vertex AI Search and web search via Gemini built-in tools as needed, retrieving and integrating optimal information.',
          ],
        },
      },
      {
        title: { ja: '主要機能', en: 'Key Features' },
        content: {
          ja: [
            'Pro/Con デュアルエージェント: 同一コンテキストに対し，賛成・反対の両視点から独立して推論を実行し，バランスの取れた意思決定支援を提供．',
            'ユーザーメモリ管理: N:N の企業関連付け，意思決定履歴，ユーザー設定をスレッド間で永続化．LangGraph MemorySaver/InMemoryStoreによる会話履歴管理とトークン上限制御を実装．',
            'マルチテナント対応: Company IDベースのメタデータフィルタリングにより，企業ごとのナレッジ分離とアクセス制御を実現．',
          ],
          en: [
            'Pro/Con Dual Agents: Execute independent reasoning from both supportive and critical perspectives on the same context, providing balanced decision support.',
            'User Memory Management: Persist N:N company affiliations, decision history, and user preferences across threads. Implemented conversation history management and token limit control using LangGraph MemorySaver/InMemoryStore.',
            'Multi-tenant Support: Achieved knowledge isolation and access control per company through Company ID-based metadata filtering.',
          ],
        },
      },
      {
        title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
        content: {
          ja: [
            'DevContainerによる統一開発環境を構築（uv，Oh My Zsh，Claude Code/Gemini CLI統合）．pytest/pytest-asyncio/pytest-covによる単体・統合テストを整備し，LangSmithによるトレーシング・モニタリング基盤を導入．',
          ],
          en: [
            'Built unified development environment with DevContainer (uv, Oh My Zsh, Claude Code/Gemini CLI integration). Established unit and integration tests with pytest/pytest-asyncio/pytest-cov, and introduced tracing/monitoring infrastructure with LangSmith.',
          ],
        },
      },
    ],
    technologies: [
      'Python',
      'LangGraph',
      'LangChain',
      'FastAPI',
      'Google Gemini',
      'Google Vertex AI Search',
      'ReAct Pattern',
      'Multi-Agent',
      'RAG',
      'LangSmith',
      'pytest',
    ],
  },
  {
    slug: 'gas-payment-table',
    title: {
      ja: '支払予定表自動作成システム',
      en: 'Invoice Payment Schedule Automation',
    },
    meta: {
      ja: '業務委託',
      en: 'Commissioned Work',
    },
    description: 'Invoice Payment Schedule Automation',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'Google Driveに保存された請求書PDFをGemini APIで読み取り，スプレッドシートに支払予定表を自動作成するGoogle Apps Scriptシステムを開発．月次の経理業務を大幅に効率化．',
          ],
          en: [
            'Developed a Google Apps Script system that reads invoice PDFs stored in Google Drive using Gemini API and automatically creates payment schedules in spreadsheets. Significantly streamlined monthly accounting operations.',
          ],
        },
      },
      {
        title: { ja: '主要機能', en: 'Key Features' },
        content: {
          ja: [
            '請求書PDF自動読取: Gemini APIを活用し，会社名・税込金額・支払方法を自動抽出．赤ペンで囲まれた金額を優先的に認識．',
            '会社マスタ自動管理: 新規会社は自動追加，カタカナ読みによる五十音順ソートを実装．会社名は正式名称に自動統一（「(株)」->「株式会社」）．',
            '大量ファイル処理: GASの実行時間制限（5分）を考慮した継続処理機能を実装．50枚以上の請求書も自動中断・再開で確実に処理．',
            'エラーハンドリング: 読み取り失敗時は要確認シートに記録し，ファイルリンク付きで手動対応をサポート．',
          ],
          en: [
            'Automatic Invoice Reading: Extracts company name, total amount, and payment method using Gemini API. Prioritizes amounts circled in red pen.',
            'Automatic Company Master Management: Auto-adds new companies, implements sorting by Japanese syllabary using katakana readings. Auto-normalizes company names to official format.',
            'Bulk File Processing: Implemented continuation processing considering GAS execution time limit (5 min). Reliably processes 50+ invoices with auto-pause and resume.',
            'Error Handling: Records failed readings in a review sheet with file links to support manual intervention.',
          ],
        },
      },
      {
        title: { ja: 'システム構成', en: 'System Architecture' },
        content: {
          ja: [
            'モジュラー設計でConfig/Main/GeminiService/DriveService/SheetServiceに分離．claspによるローカル開発環境を構築し，バージョン管理とデプロイを効率化．',
          ],
          en: [
            'Modular design separating Config/Main/GeminiService/DriveService/SheetService. Built local development environment with clasp for efficient version control and deployment.',
          ],
        },
      },
    ],
    technologies: [
      'Google Apps Script',
      'Gemini API',
      'Google Drive API',
      'Google Sheets API',
      'clasp',
      'PDF Processing',
    ],
  },
  {
    slug: 'devcontainer',
    title: {
      ja: 'Vibe Coding DevContainer',
      en: 'Vibe Coding DevContainer',
    },
    meta: {
      ja: '個人プロジェクト | OSS',
      en: 'Personal Project | OSS',
    },
    description: 'Vibe Coding DevContainer',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'Python/Node.jsを扱う多言語開発環境をDevcontainerとして設計．Google Gemini CLI及びClaude Code を標準で組み込み，ターミナル上でシームレスなAI支援開発（Vibe Coding）を実現．',
          ],
          en: [
            'Designed a multi-language development environment for Python/Node.js as a Devcontainer. Built-in Google Gemini CLI and Claude Code as standard, enabling seamless AI-assisted development (Vibe Coding) on the terminal.',
          ],
        },
      },
      {
        title: { ja: '詳細', en: 'Details' },
        content: {
          ja: [
            '高速なパッケージ管理ツールuvやoh-my-zsh，p10k，git-deltaの導入により開発者体験を追求．',
            '非rootユーザーを標準としながらnpmの権限問題を解決するなど，セキュリティと利便性を両立．',
            'GitHubでOSSとして公開し，コミュニティからのフィードバックを反映しながら継続的に改善．',
          ],
          en: [
            'Pursued developer experience by introducing the fast package manager uv, oh-my-zsh, p10k, and git-delta.',
            'Balanced security and convenience by using non-root users as standard while resolving npm permission issues.',
            'Published as OSS on GitHub, continuously improving while reflecting feedback from the community.',
          ],
        },
      },
    ],
    technologies: [
      'Docker',
      'DevContainer',
      'Claude Code',
      'Google Gemini CLI',
      'uv',
      'Python',
      'Node.js',
      'Zsh',
    ],
  },
  {
    slug: 'home-server',
    title: {
      ja: 'コンテナベースの多機能ホームサーバー',
      en: 'Container-Based Multi-Function Home Server',
    },
    meta: {
      ja: '個人プロジェクト',
      en: 'Personal Project',
    },
    description: 'Container-Based Multi-Function Home Server',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'Raspberry Pi上にDocker/Docker Composeを使用し，HomebridgeによるスマートホームハブおよびNetatalk/Avahiを用いたTime Machineサーバーを並行稼働する環境を構築．',
          ],
          en: [
            'Built an environment on Raspberry Pi using Docker/Docker Compose, running a smart home hub with Homebridge and a Time Machine server using Netatalk/Avahi in parallel.',
          ],
        },
      },
      {
        title: { ja: '詳細', en: 'Details' },
        content: {
          ja: [
            'コンテナネットワークの最適化や自動再起動・ヘルスチェック設定，ディレクトリをボリュームマウントさせることによるデータの永続化を実施．',
            '各種家電の一元管理と信頼性の高いデータバックアップ環境を単一サーバー上で両立．',
          ],
          en: [
            'Implemented container network optimization, automatic restart and health check configurations, and data persistence through directory volume mounting.',
            'Achieved unified management of various home appliances and a reliable data backup environment on a single server.',
          ],
        },
      },
    ],
    technologies: [
      'Raspberry Pi',
      'Docker',
      'Docker Compose',
      'Homebridge',
      'Netatalk',
      'Time Machine',
      'Linux',
    ],
  },
  {
    slug: 'transcription-app',
    title: {
      ja: '議事録作成支援アプリ',
      en: 'Meeting Transcription App',
    },
    meta: {
      ja: '個人プロジェクト',
      en: 'Personal Project',
    },
    description: 'Meeting Transcription App',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            '議事録作成を効率化するため，OpenAIのWhisperモデルを活用した文字起こしアプリケーションを開発．',
          ],
          en: [
            "Developed a transcription application utilizing OpenAI's Whisper model to streamline meeting minute creation.",
          ],
        },
      },
      {
        title: { ja: '詳細', en: 'Details' },
        content: {
          ja: [
            'NVIDIA Inference Microservices によりNVIDIA GPU に最適化された高いスループットを実現．',
            'また，実行環境のGPUを自動検知して処理を高速化する機能や，ローカル実行とAPI利用の両方に対応可能な柔軟なアーキテクチャを設計・実装．',
          ],
          en: [
            'Achieved high throughput optimized for NVIDIA GPUs through NVIDIA Inference Microservices.',
            'Also designed and implemented a flexible architecture that includes automatic GPU detection for accelerated processing and supports both local execution and API utilization.',
          ],
        },
      },
    ],
    technologies: ['Python', 'OpenAI Whisper', 'NVIDIA NIM', 'GPU Computing', 'Docker'],
  },
  {
    slug: 'hpc-parallel',
    title: {
      ja: 'HPC環境における並列計算アルゴリズムの実装と高速化',
      en: 'Implementation and Acceleration of Parallel Computing Algorithms in HPC Environment',
    },
    meta: {
      ja: '個人プロジェクト',
      en: 'Personal Project',
    },
    description: 'Implementation and Acceleration of Parallel Computing Algorithms in HPC Environment',
    sections: [
      {
        title: { ja: '概要', en: 'Overview' },
        content: {
          ja: [
            'HPC（High-Performance Computing）環境下での大規模科学技術計算を想定し，疎行列演算の高速化に挑戦．',
          ],
          en: [
            'Challenged sparse matrix computation acceleration assuming large-scale scientific computing in HPC (High-Performance Computing) environments.',
          ],
        },
      },
      {
        title: { ja: '詳細', en: 'Details' },
        content: {
          ja: [
            '共有メモリ型並列処理（OpenMP）と分散メモリ型並列処理（MPI）の双方を駆使し，並列計算アルゴリズムをC/C++で実装．',
            '実装の第一段階として，モンテカルロ法による円周率計算の並列化を通じて並列プログラミングの基礎を習得．',
            'その後，計算機科学における典型的な難題である疎行列計算に応用し，データ構造の分割，プロセス間の通信オーバーヘッドの最小化，計算負荷の均等化（ロードバランシング）といった低レイヤーな課題に直接取り組み，計算処理の高速化を達成．',
          ],
          en: [
            'Implemented parallel computing algorithms in C/C++ utilizing both shared memory parallel processing (OpenMP) and distributed memory parallel processing (MPI).',
            'As the first stage of implementation, mastered the fundamentals of parallel programming through parallelization of pi calculation using the Monte Carlo method.',
            'Subsequently applied to sparse matrix computation, a typical challenge in computer science, directly tackling low-layer challenges such as data structure partitioning, minimization of inter-process communication overhead, and load balancing to achieve computational acceleration.',
          ],
        },
      },
    ],
    technologies: ['C', 'C++', 'MPI', 'OpenMP', 'HPC', 'Parallel Computing', 'Linux'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
