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
          'コンサルタントによるクライアント業務分析を効率化するため，PDF / Word / Excel / PowerPoint 等の多様な業務マニュアルを横断的に解析し，3階層構造の「業務分析テーブル」をCSVで自動生成するAIパイプラインを設計・開発．プロンプト試行錯誤を1コマンドで回せる実験基盤と，業務視点（グループ）と技術視点（詳細分類）を同時に出力する二軸設計により，上流のビジネスレビューと下流の技術検討を一体化した．',
        ],
        en: [
          "Designed and built an AI pipeline that streamlines client business analysis by parsing heterogeneous manuals (PDF / Word / Excel / PowerPoint) and producing a 3-layer 'Business Analysis Table' as CSV. A reproducible experiment harness lets prompt iterations run with a single command, and emitting a business-facing grouping axis alongside a technical-facing classification axis lets upstream review and downstream engineering share one artifact.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          '`src/core/` 配下をConverter → Extractor → Classifier → Grouperの4段階に分離．各段は単体で実行・差替できるよう薄く独立させ，LLMで曖昧性が混入しやすい抽出・分類と，決定的に回したい変換・集約とを意図的に切り分けた．各段の入出力はPydantic v2モデル（`WorkProcedureList` / `ClassificationTaskList` / `TaskGroupList`）で型検証し，Geminiの出力ゆらぎをスキーマ境界で吸収している．',
          '大規模PDF処理は独自のチャンク戦略を採用．PyMuPDFで15ページ単位に分割→各チャンクを並列にMarkdown変換→ページ順序を保ったままマージする．Gemini API呼び出しは`asyncio.Semaphore(50)`でレート制限しつつ同時50本まで並走させ，スループットと安定性を両立させた．',
          'フロントエンドは重量SPAを避けてFastAPI + Jinja2 + htmx + Tailwind + Alpine.js + Mermaid.jsの軽量構成を選択．実行状況はServer-Sent Eventsで段階的にPushし，長時間のパイプライン処理中もUIが固まらない．中央設定は`src/config.py`一箇所に集約しており，モデル・プロンプトパス・出力ディレクトリを差し替えるだけで複数実験を並行運用できる．',
        ],
        en: [
          "`src/core/` is split into four stages — Converter, Extractor, Classifier, Grouper — each runnable and swappable in isolation. The split deliberately separates LLM-driven work (extraction, classification), where output drift is expected, from deterministic work (conversion, grouping). Every stage boundary is guarded by Pydantic v2 schemas (`WorkProcedureList`, `ClassificationTaskList`, `TaskGroupList`) so Gemini output drift is absorbed at a typed seam.",
          'Large PDFs are processed with a custom chunking strategy: PyMuPDF splits documents into 15-page chunks, each chunk is converted to Markdown in parallel, and the results are merged back in page order. Gemini calls are throttled with `asyncio.Semaphore(50)`, running up to 50 concurrent requests while staying inside rate limits.',
          'The frontend deliberately avoids a heavy SPA: FastAPI + Jinja2 + htmx + Tailwind + Alpine.js + Mermaid.js stays lightweight, and pipeline progress is streamed over Server-Sent Events so long-running runs never freeze the UI. Central configuration lives in a single `src/config.py` so model, prompt-path, and output-dir swaps are a one-line change, enabling parallel experiments.',
        ],
      },
      list: {
        ja: [
          'Converter: PDF / Word / Excel / PowerPoint → Markdown変換（LibreOffice soffice + PyMuPDF）',
          'Extractor: Markdownから業務手順を抽出し構造化テーブルを生成',
          'Classifier: 技術的視点での詳細分類（Two-Stage分類の前段）',
          'Grouper: ユーザー視点での行動グルーピング（Two-Stage分類の後段）',
          'Runner: `src/web/services/pipeline_runner.py` が非同期に各段を駆動しSSEで進捗配信',
        ],
        en: [
          'Converter: PDF / Word / Excel / PowerPoint → Markdown conversion (LibreOffice soffice + PyMuPDF)',
          'Extractor: Pulls business procedures out of Markdown and produces structured tables',
          'Classifier: Detailed technical classification (first half of Two-Stage classification)',
          'Grouper: User-facing behavior grouping (second half of Two-Stage classification)',
          'Runner: `src/web/services/pipeline_runner.py` drives each stage asynchronously and streams progress over SSE',
        ],
      },
    },
    {
      title: { ja: '主要機能', en: 'Key Features' },
      content: {
        ja: [
          'Two-Stage Classification: 「技術分類」と「業務グルーピング」を別段階に分け，中間結果を人が検証してから次段に進める設計．1プロンプトで両方を同時に出すと起きがちな精度劣化と責任境界の曖昧化を防いでいる．',
          '実験管理: 中央`config.py`とプロンプトテンプレート群をバージョン分けし，複数プロンプト×複数モデルの組合せを一括実行．中間ファイル・最終CSVは実験ID単位のディレクトリに隔離され，あとから手元で並べて比較できる．',
          'ドキュメント品質保証: LibreOffice経由でOfficeファイルを忠実度高くPDF化し，日本語フォントを明示指定して文字化けを抑止．CSVにはソースファイルパスとページIDを付与し，出力から原文への追跡を常に可能にしている．',
          'クラウド連携: Azure Blob Storageとの入出力スクリプトを整備し，ローカル開発とクラウド実行を同じインタフェースで扱える．',
        ],
        en: [
          'Two-Stage Classification: technical classification and business grouping are run as separate stages so humans can verify intermediate results before moving on — this avoids the accuracy drop and blurred responsibility that happens when a single prompt is asked to do both at once.',
          'Experiment harness: `config.py` and the prompt template set are versioned together, so combinations of prompts and models can be executed in a single batch. Intermediate files and the final CSV land in an experiment-ID directory so runs can be laid out side-by-side for comparison.',
          'Document fidelity: Office files are rendered to PDF through LibreOffice with Japanese fonts explicitly pinned to prevent mojibake; each CSV row carries the source file path and source page ID so every output row is traceable back to its origin.',
          'Cloud integration: Azure Blob Storage input/output scripts expose a single interface that works the same in local dev and cloud execution.',
        ],
      },
    },
    {
      title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
      content: {
        ja: [
          'Python 3.12 + uvで依存を固定．Google Python Style Guide準拠のdocstringを全ファイルに適用し，Ruffで静的解析とフォーマットを統一．Docker Composeでホットリロード開発環境を定義し，ローカル起動から本番コンテナへそのまま展開できる．',
        ],
        en: [
          'Pins dependencies with Python 3.12 + uv. Google Python Style Guide docstrings are applied across the codebase, and Ruff enforces both linting and formatting. Docker Compose defines a hot-reload dev environment that ships unchanged into production containers.',
        ],
      },
    },
  ],
  technologies: [
    'Python 3.12',
    'FastAPI',
    'Google Gemini',
    'LangGraph',
    'Pydantic v2',
    'PyMuPDF',
    'LibreOffice',
    'asyncio.Semaphore',
    'Server-Sent Events',
    'Jinja2',
    'htmx',
    'Tailwind CSS',
    'Alpine.js',
    'Mermaid.js',
    'Azure Blob Storage',
    'Docker Compose',
    'uv',
    'Ruff',
  ],
};
