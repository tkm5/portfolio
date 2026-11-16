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
  description: 'A two-person pipeline that turns operations manuals into business-analysis tables; I built the runtime, UI, conversion, and Docker setup',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          'マニュアルから業務を洗い出し，AI化の可否を判定する作業を自動化するパイプラインを，もう1名と2名で開発した．マニュアルはPDF・Word・Excel・PowerPointと形式がばらばらだった．',
        ],
        en: [
          'With a teammate, built a pipeline that automates extracting tasks from operations manuals and assessing whether each can be automated with AI. The manuals came as PDF, Word, Excel, and PowerPoint.',
        ],
      },
    },
    {
      title: { ja: 'パイプラインとデータの流れ（チームの成果物）', en: 'Pipeline and Data Flow (Team Output)' },
      content: {
        ja: [
          '変換 → 抽出 → 分類 → グルーピングの4段階で，各段の結果を番号付きのフォルダ（受領ファイル → PDF → Markdown → 抽出タスク → 分類タスク → グループ → 業務概要）に書き出す．抽出・分類・グルーピングの論理（プロンプト，分類の定義，CSVの列）はもう1名が主に担当した．',
        ],
        en: [
          'Four stages (convert, extract, classify, group), each writing its result to a numbered folder: received files, PDF, Markdown, extracted tasks, classified tasks, groups, and business overview. The extraction, classification, and grouping logic (prompts, category definitions, CSV columns) was mainly my teammate\'s work.',
        ],
      },
      list: {
        ja: [
          '変換: Office文書はLibreOffice経由でPDFにし，GeminiでMarkdownに変換する．',
          '抽出: 業務分類・プロセス・タスクの3階層を抽出する．',
          '分類: 各タスクを置き換え技術で分類する．分類にはAPI連携・DB連携・OCR・文書生成のほか，既存のAI技術では正確に識別できない作業，AI化できないコミュニケーション，物理操作を含む．',
          'グルーピング: ユーザー視点のアクショングループを付けてCSVに出力する．',
        ],
        en: [
          'Convert: Office files go through LibreOffice to PDF, then Gemini turns them into Markdown.',
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
          '自分の担当は，パイプラインを人が使える形にするところ．リポジトリ構成とリファクタリング，実行画面，非同期の変換処理，Docker，利用者マニュアルを担当した．',
        ],
        en: [
          'My part was turning the pipeline into something people could run: the repository structure and refactoring, the web UI, the asynchronous converter, Docker, and the user manual.',
        ],
      },
      list: {
        ja: [
          '実行画面: FastAPIとJinja2で20のルート（画面・ヘルスチェック4，API16）を作り，画面側はhtmx・Alpine.js・Tailwind CSS・Mermaidで組んだ．ファイルのアップロードと一覧，段ごとの実行と中断，結果の表示とダウンロードを1つの画面で行える．',
          '進み具合の配信: sse-starletteでServer-Sent Eventsを送り（progress・complete・pingの3種類），ブラウザのEventSourceで受ける．長い処理の間も画面が止まらない．',
          '実行の制御: 各段は順に実行し，時間のかかる処理は別スレッドに逃がしてイベントループを空けておく．業務概要は抽出と並行してバックグラウンドで生成する．実行のたびに中間ファイルを消してから始める．',
          '主マニュアルの指定: 画面で1つのファイルを主マニュアルに指定すると，抽出の入力で主資料・補足資料の順に並べて渡す．',
          '変換の並列化: 複数のファイルを同時に変換し，Geminiへの同時呼び出しはasyncio.Semaphoreで50本までに抑える．20ページを超えるPDFはPyMuPDFで15ページずつに分け，順に変換して結合する．分割したPDFはGeminiのFiles APIに上げ，処理が終われば必ず削除する．',
          '構造化出力: Geminiの構造化出力にPydanticモデルのJSONスキーマを渡し，応答を型で検証する仕組みを入れた．',
          'ダウンロード: 結果のCSVはUTF-8（BOM付き・なし）とCP932から選べ，日本語のExcelでそのまま開ける．',
          '実行環境: DockerfileとDocker Composeを整備した．イメージに日本語フォント（Noto CJK・IPA）とLibreOfficeを入れ，開発時はソースをマウントしてホットリロードし，バッチ実行用のプロファイルも分けた．データの受け渡し用にAzure Blob Storageへの一括アップロード・ダウンロードのスクリプトも用意した．',
          '利用者マニュアル: 分類を「技術分類（AI化可能性の判定）」として説明する利用手順書を作成した．',
        ],
        en: [
          'Web UI: 20 routes in FastAPI and Jinja2 (4 page/health routes, 16 API routes), with htmx, Alpine.js, Tailwind CSS, and Mermaid on the page. Uploading and listing files, running or cancelling each stage, and viewing and downloading results all happen on one screen.',
          'Progress streaming: sse-starlette sends Server-Sent Events (progress, complete, and ping) that the browser receives with EventSource, so long runs never freeze the page.',
          'Run control: stages run in order, blocking work is moved to worker threads to keep the event loop free, and the business overview is generated in the background while extraction runs. Each run clears the intermediate files first.',
          'Main manual: one uploaded file can be marked as the main manual, and extraction receives it first, followed by the supporting documents.',
          'Parallel conversion: several files are converted at once, with concurrent Gemini calls capped at 50 by an asyncio.Semaphore. PDFs over 20 pages are split into 15-page chunks with PyMuPDF, converted in order, and merged. Each chunk is uploaded through the Gemini Files API and always deleted afterwards.',
          "Structured output: Gemini's structured output receives the JSON schema of a Pydantic model, and the response is validated against that type.",
          'Download: result CSVs come in UTF-8 (with or without BOM) or CP932, so they open directly in Japanese Excel.',
          'Runtime: a Dockerfile and Docker Compose setup. The image includes Japanese fonts (Noto CJK and IPA) and LibreOffice; development mounts the source with hot reload, and batch runs have their own profile. Scripts for bulk upload and download to Azure Blob Storage handle data exchange.',
          'User manual: wrote the user guide, which explains the classification as a "technology category (AI-feasibility judgment)".',
        ],
      },
    },
    {
      title: { ja: '技術的な判断', en: 'Technical Decisions' },
      list: {
        ja: [
          'LangGraphを採らない: 想定した会話の流れはFastAPIで足り，学習コストと依存を増やさずに済み，必要になれば後から入れられるため，段ごとの単純なパイプラインにした．複数セッションの会話，5つ以上の分岐，同時利用者が出てきたら見直す，という条件も計画に書いた．',
          '速度の改善: 同時呼び出しの上限を5から20，50へ上げ，全段をより軽いGeminiモデルに切り替えた．JSONスキーマを渡す構造化出力なら1回で成功するはずなので，再試行の回数も減らした．',
          '業務概要の図: LLMが生成したMermaidの図は描画できないことがあるため，正規表現での自動修正，文法の検証，最大3回のLLMによる修正を順に試し，それでも直らなければ元の図に戻す．',
        ],
        en: [
          'No LangGraph: the planned conversation flow fit in FastAPI, this avoided learning cost and an extra dependency, and LangGraph could still be added later, so the system stayed a plain stage-by-stage pipeline. The plan also recorded when to revisit: multi-session chat, five or more branches, or concurrent users.',
          'Speed: raised the concurrency cap from 5 to 20 and then 50, moved every stage to a lighter Gemini model, and cut retries, since structured output with a JSON schema should succeed in one call.',
          'Overview diagram: LLM-generated Mermaid sometimes fails to render, so the code tries a regex auto-fix, syntax validation, and up to three LLM repair rounds in turn, and falls back to the original diagram if all fail.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '検証', en: 'How It Was Verified' },
      list: {
        ja: [
          'テスト: 自分で書いたテストは26件（変換の補助処理8件，結果表示の出典列の整形10件，ファイルAPIの結合テスト8件）．',
          '実行記録: 受領した業務マニュアル5件でパイプラインを実行し，28件のタスクを抽出・分類して7つのグループにまとめたCSVを得た．',
        ],
        en: [
          'Tests: 26 tests I wrote (8 for conversion helpers, 10 for formatting the source column in results, 8 integration tests for the file API).',
          'Run record: the pipeline was run on the 5 manuals received from the client, producing CSVs with 28 extracted and classified tasks gathered into 7 groups.',
        ],
      },
      content: { ja: [], en: [] },
    },
  ],
  technologies: [
    'Python 3.12',
    'uv',
    'Gemini API',
    'FastAPI',
    'Jinja2',
    'htmx',
    'Alpine.js',
    'Tailwind CSS',
    'Mermaid',
    'Server-Sent Events',
    'Pydantic',
    'PyMuPDF',
    'pandas',
    'LibreOffice',
    'Docker',
    'Docker Compose',
    'Azure Blob Storage',
    'pytest',
  ],
};
