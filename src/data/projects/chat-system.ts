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
          'Azure上で動作する社内向けRAGチャットシステムを設計・開発・運用．`Azure-Samples/azure-search-openai-demo` をforkし，社内規程・マニュアル・FAQ等の社内ナレッジ検索に最適化した軽量実装として仕立てた．本プロジェクトの成果が評価され，2024年度コーポレートアワードを受賞．',
        ],
        en: [
          "Designed, built, and operated an internal RAG chat system on Azure. Forked `Azure-Samples/azure-search-openai-demo` and trimmed it into a lighter deployment tuned for internal knowledge (policies, manuals, FAQs). The project was recognized with the firm's 2024 Corporate Award.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'React + TypeScriptのフロントとPython Quartの非同期バックエンドを組み合わせ，ストリーミング応答で回答を逐次描画．Azure OpenAI Service（GPT-4）による生成と Azure AI Search のベクトル検索・ハイブリッド検索・セマンティックランカーを多段パイプラインで繋ぎ，社内ドキュメント特有の略称・正式名称の揺れに対応した．',
          '`app.py` は 584 行の軽量実装とし，upstream（約784行）から社内利用に不要な外部統合を切り詰める一方，ユーザーフィードバック収集（サムズアップ／サムズダウン）と引用元の明示を追加．Azure Document Intelligence によるPDF / Word / PowerPointの構造化解析と Integrated Vectorization によるインデックス自動更新を組み合わせ，アップロード→検索可能化までを無人化した．',
        ],
        en: [
          "A React + TypeScript frontend is paired with a Python Quart async backend; answers stream in progressively. Azure OpenAI Service (GPT-4) generation is chained with Azure AI Search's vector, hybrid, and semantic-ranker stages to handle the abbreviation / formal-name drift that is endemic to internal documents.",
          '`app.py` is kept to 584 lines — lighter than the ~784-line upstream — by trimming external integrations that internal use does not need, while adding user feedback capture (thumbs up / thumbs down) and explicit citation rendering. Azure Document Intelligence parses PDF / Word / PowerPoint structure and Integrated Vectorization refreshes the index automatically, so the upload-to-searchable path runs unattended.',
        ],
      },
    },
    {
      title: { ja: 'CI/CD・DevOps', en: 'CI/CD & DevOps' },
      content: {
        ja: [
          'ソース・ビルド・計画・作業管理を Azure DevOps に寄せ，`.azdo/pipelines/azure-dev.yml` による Azure Pipelines でビルド・テスト・デプロイを自動化．GitHub Actions ではなく Azure Pipelines を選択することで，社内セキュリティ統制（ID・監査ログ・ネットワーク境界）を既存の組織標準に合わせた．',
          'Azure リソースは Bicep / ARM テンプレートで宣言的に管理し，環境差分を最小化．26 本以上のシェル／PowerShell スクリプトで事前準備・認証更新・データ前処理を自動化し，31 本以上のテストを CI に組み込んで回帰を防止している．ブランチ戦略は Git Flow，レビューはプルリク必須としコードレビュー文化を定着させた．',
        ],
        en: [
          'Source, build, planning, and work tracking all live in Azure DevOps: `.azdo/pipelines/azure-dev.yml` drives build / test / deploy through Azure Pipelines. Choosing Azure Pipelines over GitHub Actions aligned the pipeline with the firm\'s existing security controls (identity, audit trails, network boundary).',
          'Azure resources are managed declaratively with Bicep / ARM templates to minimize environment drift. 26+ shell and PowerShell scripts automate setup, credential rotation, and data preprocessing, and 31+ tests in CI block regressions. Git Flow is used as the branching strategy, with pull-request review mandatory to embed a code-review culture.',
        ],
      },
    },
    {
      title: { ja: 'ユーザーフィードバック・モニタリング', en: 'User Feedback & Monitoring' },
      content: {
        ja: [
          '回答ごとにサムズアップ／サムズダウンのフィードバックを収集し，Application Insights のカスタムメトリクスとして記録．Azure Log Analytics + KQL のダッシュボードで満足度・レスポンス時間・回答精度の時系列を可視化し，プロンプトと検索パラメータを継続的に最適化．マルチターン会話・引用元表示・思考プロセスの可視化といったUX改善を並行して積み上げている．',
        ],
        en: [
          'Every answer captures a thumbs-up / thumbs-down signal that is recorded as a custom metric in Application Insights. An Azure Log Analytics + KQL dashboard tracks satisfaction, response time, and answer accuracy over time, feeding a continuous tuning loop for prompts and search parameters. Multi-turn conversation, citation rendering, and thought-process visualization were layered in alongside.',
        ],
      },
    },
    {
      title: { ja: '成果', en: 'Achievement' },
      content: {
        ja: [
          '社内問い合わせ対応の効率化と品質向上に寄与した実績が評価され，2024年度コーポレートアワードを受賞．システムは社内標準ツールとして定着し，現在も継続運用・改善されている．',
        ],
        en: [
          'Contributions to faster, higher-quality internal Q&A earned the 2024 Corporate Award. The system is now an internal standard tool and continues to be operated and improved.',
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
    'Log Analytics (KQL)',
    'Bicep / ARM',
    '.prompty',
    'PowerShell',
    'RAG',
    'Vector Search',
    'Semantic Ranker',
    'Integrated Vectorization',
    'Git Flow',
  ],
};
