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
          'クライアント様は大手生命保険グループのIT子会社．目標は，技術社員が自らRAGアプリを開発・改修できる状態をつくること（RAGアプリの内製化）だった．対象はクライアント様の技術者約10名．',
          '講義だけで終えず，クライアント様の技術者と一緒に作りながら進めた．PythonとJavaScriptでRAGアプリを一から作る段階から始め，Azureのベストプラクティスを基盤としたRAGアプリの内製化へ進めた．',
        ],
        en: [
          "The client was a major life insurance group's IT subsidiary. The goal was for its own engineers to build and modify RAG apps themselves, bringing RAG development in-house. About 10 client engineers took part.",
          "Rather than stopping at lectures, the work was done by building alongside the client's engineers: first a RAG app written from scratch in Python and JavaScript, then in-house development of RAG apps built on Azure's best practices.",
        ],
      },
    },
    {
      title: { ja: '講義と教材', en: 'Lectures and Teaching Material' },
      content: {
        ja: [
          'HTML/CSS/JavaScript・Python・Azureを体系的に講義し，アジャイル開発を導入した．第1段階の教材として，自分でRAGアプリ一式と4章構成の教科書を作成した．教科書のコードは穴埋め形式にして，受講者が自分の手で書く形にした（穴埋め箇所は350か所，教科書のMarkdownから計数）．',
        ],
        en: [
          'Taught HTML/CSS/JavaScript, Python, and Azure systematically and introduced agile development. For the first stage, wrote a complete RAG app and a four-chapter textbook. The textbook code is in fill-in-the-blank form so participants write it themselves (350 blanks, counted in the textbook Markdown).',
        ],
      },
    },
    {
      title: { ja: '第1段階の教材アプリの構成（自作）', en: 'First-Stage Teaching App (Built Myself)' },
      list: {
        ja: [
          '環境構築: リソースグループ・Azure OpenAIとモデルのデプロイ・ストレージ・Azure AI Search・App Service・Document Intelligenceを，番号付きのAzure CLIスクリプト10本で順に作る．.envの値をApp Serviceの設定へ流し込むスクリプトも用意した．',
          '取り込み: Blobに置いたPDFからpypdfでテキストを抜き出し，1,000文字・重なり200文字で分割して埋め込みを作り，ファイル名と番号から決まるIDで検索インデックスに登録する．分割幅が重なり以下なら例外にして，設定の誤りで無限に分割しないようにした．',
          'インデックス: タイトル・本文とベクトル項目を持ち，ベクトルはHNSWで検索する．タイトルと本文を優先するセマンティック設定も定義した．',
          '検索と回答: キーワード検索とベクトル検索を組み合わせて上位3件を取り，インデックスにセマンティック設定があるときだけセマンティックランキングに切り替える．回答は渡した文脈だけに基づくようシステムプロンプトで制約した．',
          'アプリ: FlaskのJSON API(/api/chat)と，Jinja2のテンプレートと素のJavaScriptの画面．gunicornでApp Serviceに載せる．',
          '追加の実験: Document Intelligenceのprebuilt-readで手書きのPDFをMarkdownに変換する実験と，その解説資料を作成した．',
        ],
        en: [
          'Provisioning: ten numbered Azure CLI scripts create the resource group, Azure OpenAI and model deployments, storage, Azure AI Search, App Service, and Document Intelligence in order, plus a script that pushes .env values into App Service settings.',
          'Ingestion: pypdf extracts text from PDFs in Blob Storage; the text is split into 1,000-character chunks with a 200-character overlap, embedded, and uploaded with IDs derived from the file name and chunk number. A chunk size not larger than the overlap raises an error, so a bad setting cannot split forever.',
          'Index: title, content, and a vector field searched with HNSW, plus a semantic configuration that prioritizes title and content.',
          'Retrieval and answer: keyword and vector search combined for the top 3 chunks, switching to semantic ranking only when the index has a semantic configuration. The system prompt restricts answers to the supplied context.',
          'App: a Flask JSON API (/api/chat) and a page built from a Jinja2 template and plain JavaScript, served by gunicorn on App Service.',
          'Extra experiment: converting handwritten PDFs to Markdown with Document Intelligence prebuilt-read, with an explainer document.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: 'クライアント様環境のシステム', en: 'The System in the Client Environment' },
      content: {
        ja: [
          'AzureのRAGサンプル(Azure-Samples/azure-search-openai-demo)を拡張した新システムを構築し，セキュリティ要件を満たす閉域構成でクライアント様環境にデプロイした．土台にしたサンプルは，ReactのフロントエンドとPython(Quart)のバックエンド，キーワード・ベクトル・セマンティックランキングを組み合わせた検索，Document Intelligenceによる文書の取り込み，Entra IDでのサインインと文書単位のアクセス制御を備える．',
          '運用改善を進めたいというクライアント様の要望に応え，OpenTelemetryとLog Analyticsでログ基盤を整備した．',
        ],
        en: [
          "Built a new system by extending Azure's RAG sample (Azure-Samples/azure-search-openai-demo) and deployed it into the client's environment in a private network that met the security requirements. The sample it starts from provides a React frontend with a Python (Quart) backend, retrieval that combines keyword, vector, and semantic ranking, document ingestion with Document Intelligence, and Entra ID sign-in with document-level access control.",
          "At the client's request to improve operations, added a logging platform with OpenTelemetry and Log Analytics.",
        ],
      },
    },
    {
      title: { ja: '結果', en: 'Outcome' },
      content: {
        ja: [
          'RAGアプリの内製化を実現した．構築したシステムはクライアント様の全技術社員が利用した．',
        ],
        en: [
          "RAG app development was brought in-house, and the system was used by all of the client's engineers.",
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'JavaScript',
    'Flask',
    'gunicorn',
    'pypdf',
    'Azure CLI',
    'Azure App Service',
    'Azure AI Search',
    'Azure OpenAI Service',
    'Azure AI Document Intelligence',
    'Azure Blob Storage',
    'Azure Container Apps',
    'Azure Cosmos DB',
    'Log Analytics',
    'OpenTelemetry',
    'RAG',
    'Agile',
  ],
};
