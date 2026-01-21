import type { Project } from '@/types';

export const businessAnalysisPipeline: Project = {
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
};
