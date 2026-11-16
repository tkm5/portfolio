import type { Project } from '@/types';

export const businessAnalysisPipeline: Project = {
  slug: 'business-analysis-pipeline',
  title: {
    ja: '大手生命保険会社：業務マニュアルからの業務分析テーブル自動生成',
    en: 'Major Life Insurer: Automated Business-Analysis Tables from Operations Manuals',
  },
  meta: {
    ja: 'グローバルコンサルティングファーム',
    en: 'Global Consulting Firm',
  },
  description: 'A pipeline that extracts tasks from operations manuals and classifies whether each can be replaced by technology',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '業務マニュアルを読んで業務を洗い出し，それぞれをAIや他の技術で置き換えられるかを判定する作業は，人手では時間がかかる．マニュアルはPDF・Word・Excel・PowerPointと形式もばらばらだった．この作業を自動化するパイプラインを，もう1名と2名で開発した．',
        ],
        en: [
          'Reading operations manuals, listing the work they describe, and judging whether each task could be replaced by AI or other technology took a lot of manual effort, and the manuals came as PDF, Word, Excel, and PowerPoint. With a teammate, built a pipeline that automates this work.',
        ],
      },
    },
    {
      title: { ja: 'パイプラインの構成（チームの成果物）', en: 'Pipeline Shape (Team Output)' },
      content: {
        ja: [
          '4段階のパイプライン．このうち抽出・分類・グルーピングの論理（プロンプトと分類の定義，CSVの列）はもう1名が主に担当した．',
        ],
        en: [
          'A four-stage pipeline. The extraction, classification, and grouping logic (prompts, the category definitions, and the CSV columns) was mainly my teammate\'s work.',
        ],
      },
      list: {
        ja: [
          '変換: PDF・Word・Excel・PowerPointのマニュアルをGeminiでMarkdownに変換．',
          '抽出: 業務分類・プロセス・タスクの3階層を抽出．',
          '分類: 各タスクを置き換え技術で分類．分類にはAPI連携・DB連携・OCR・文書生成のほか，既存のAI技術では正確に識別できない作業，AI化できないコミュニケーション，物理操作を含む．',
          'グルーピング: ユーザー視点のアクショングループを付けてCSVに出力．',
        ],
        en: [
          'Convert: turn PDF, Word, Excel, and PowerPoint manuals into Markdown with Gemini.',
          'Extract: pull out three levels: category, process, and task.',
          'Classify: label each task with a replacement technology, such as API integration, database integration, OCR, or document generation, or as work current AI cannot identify reliably, communication that cannot be automated, or physical work.',
          'Group: attach user-facing action groups and write the result as CSV.',
        ],
      },
    },
    {
      title: { ja: '担当と設計', en: 'What I Designed and Built' },
      content: {
        ja: [
          '自分の担当は，パイプラインを人が使える形にするところ．',
        ],
        en: [
          'My part was turning the pipeline into something people could run.',
        ],
      },
      list: {
        ja: [
          'リポジトリ構成とリファクタリング．',
          '実行画面: FastAPIとhtmxで作り，処理の進み具合をServer-Sent Eventsで画面に送る．業務概要とMermaidの図も生成して表示する．',
          '大容量PDF: PyMuPDFで15ページずつに分割し，並列に変換してから結合する．',
          'Office文書: LibreOfficeで変換してから処理に回す．',
          '実行環境: Dockerで整備．',
          '利用者マニュアル: 分類を「技術分類（AI化可能性の判定）」として説明する利用手順書を作成．',
        ],
        en: [
          'Repository structure and refactoring.',
          'Web UI: built with FastAPI and htmx; progress streams to the page over Server-Sent Events, and the UI also generates and shows a business summary and a Mermaid diagram.',
          'Large PDFs: split into 15-page chunks with PyMuPDF, converted in parallel, and merged back.',
          'Office files: converted through LibreOffice before processing.',
          'Runtime: packaged with Docker.',
          'User manual: wrote the user guide, which explains the classification as a "technology category (AI-feasibility judgment)".',
        ],
      },
    },
    {
      title: { ja: '技術的な判断', en: 'Technical Decisions' },
      content: {
        ja: [
          'パイプラインはエージェントのフレームワーク(LangGraph)を使わず，段ごとに処理を分けた単純な構成にした．計画書には「LangGraph化 不要」と記録している．',
        ],
        en: [
          'The pipeline is a plain stage-by-stage design rather than an agent framework; the plan records LangGraph as unnecessary.',
        ],
      },
    },
    {
      title: { ja: '検証', en: 'How It Was Verified' },
      content: {
        ja: [
          '変換・API・結果表示を単体テストと結合テストで確認し，受領した業務マニュアル5件でパイプラインを実行して出力CSVを得た．',
        ],
        en: [
          'Conversion, the API, and result display are covered by unit and integration tests, and the pipeline was run on the 5 manuals received from the client to produce output CSVs.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'Gemini API',
    'FastAPI',
    'htmx',
    'Server-Sent Events',
    'Pydantic',
    'PyMuPDF',
    'LibreOffice',
    'Mermaid',
    'Docker',
  ],
};
