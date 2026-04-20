import type { Project } from '@/types';

export const transcriptionApp: Project = {
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
          'macOSのVoice Memos録音を入力に，Apple Silicon GPUで動作するmlx-whisperでローカル文字起こしを行い，生成AIで議事メモを自動生成するClaude Code Skillとして設計・開発．クラウド（Gemini API）と自宅GPUサーバ（DGX-Spark上のGemma 4 31B）を用途に応じて切り替えることで，機密性の高い会議でも外部送信なしに処理できる構成を実現．',
        ],
        en: [
          'Designed and developed a Claude Code Skill that takes macOS Voice Memos recordings, transcribes them locally with mlx-whisper on Apple Silicon, and generates meeting minutes with generative AI. Switches between cloud (Gemini API) and a self-hosted GPU server (Gemma 4 31B on DGX-Spark), enabling confidential meetings to be processed without sending audio to external services.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          '文字起こしとLLMをそれぞれ`Protocol`で抽象化し，`services/factory.py`で実装を動的に差し替えるService Pair + Factory構成を採用．文字起こしは常にMacローカル実行（mlx-whisper）とし，LLM側のみgemini / gemmaを選択可能．外部送信の可否という非機能要件を，型安全にスイッチできるインタフェース境界として設計した．',
          'ローカル推論は`mlx-community/whisper-large-v3-mlx`を採用．AppleのMLXフレームワーク経由でMetal GPUを直接叩くため，CPU比でも数倍の実効スループットを確保しつつ，外部APIに依存しないプライバシー境界を成立させている．',
          'リモートLLMバックエンドは自宅DGX-Spark（NVIDIA GB10）上でvLLMがOpenAI互換APIとしてGemma 4 31Bをサーブ．SSHではなく純HTTPの OpenAI互換エンドポイントに`urllib`で直接アクセスすることで，依存を最小化しつつクラウドと同じインタフェースで扱えるようにした．',
        ],
        en: [
          'Adopted a Service Pair + Factory pattern: transcription and LLM services are each abstracted behind a `Protocol`, and `services/factory.py` swaps implementations at runtime. Transcription always runs locally on Mac (mlx-whisper); only the LLM side toggles between gemini and gemma, turning the non-functional "may-send-outside" requirement into a typed, switchable boundary.',
          "Local inference uses `mlx-community/whisper-large-v3-mlx`. Driving the Metal GPU directly through Apple's MLX framework yields several-x effective throughput over CPU while preserving a strict privacy boundary with no external API dependency.",
          'The remote LLM backend runs on a self-owned DGX-Spark (NVIDIA GB10) where vLLM serves Gemma 4 31B via an OpenAI-compatible HTTP API. Reaching it with plain `urllib` over HTTP instead of SSH minimizes dependencies and keeps the cloud and self-hosted backends behind the same interface.',
        ],
      },
      list: {
        ja: [
          'Transcription（Mac）: mlx-whisperによるMetal GPUローカル推論',
          'LLM（gemini）: Google Gemini 3.1 Pro Preview（クラウドAPI）',
          'LLM（gemma）: DGX-Spark上のvLLMが提供するGemma 4 31B（OpenAI互換API）',
          'Factory: `services/factory.py`による動的バックエンド選択',
          'Protocol抽象: `services/protocols.py`で依存を反転し単体テスト容易化',
          'Pydantic v2 Settings + `.env`によるバックエンド切替・モデル名・ホスト名の外部化',
        ],
        en: [
          'Transcription (Mac): mlx-whisper local inference on the Metal GPU',
          'LLM (gemini): Google Gemini 3.1 Pro Preview via cloud API',
          'LLM (gemma): Gemma 4 31B served by vLLM on DGX-Spark (OpenAI-compatible API)',
          'Factory: dynamic backend selection in `services/factory.py`',
          'Protocol abstractions in `services/protocols.py` invert dependencies and simplify unit testing',
          'Pydantic v2 Settings + `.env` externalize backend choice, model names, and hostnames',
        ],
      },
    },
    {
      title: { ja: '議事メモ品質を上げる工夫', en: 'Quality Engineering' },
      content: {
        ja: [
          '過去議事録を構造化コンテキストとしてLLMに投入し，参加者名・所属・敬称（外部「様」，社内呼び捨て）・会議シリーズ種別（client / internal）を過去と一貫させる二段構えの整合性制御を実装．生成後は最新の過去議事録とRead検証ステップを噛ませ，揺れを検知した場合は生成結果を自動修正するフローを組み込んだ．',
          'Whisperのセグメント出力を`MM:SS -> MM:SS: text`形式に圧縮してLLMに渡すことで，秒未満精度を意図的に落としてトークン数を実質半減．長時間会議（60分超）でもコンテキスト上限内で扱えるよう設計した．',
          'BCP-47（`ja-JP`）↔Whisper言語コード（`ja`）の変換層を挟み，多言語対応と設定の可読性を両立．LLM出力の参加者・A.I.（Action Items）・討議内容はMarkdownのテーブル／見出しで構造化し，後工程（Notion等）での再利用性を確保．',
        ],
        en: [
          "Injects past minutes as structured context and applies a two-stage consistency control that keeps participant names, affiliations, honorifics (external 'sama' / internal bare name), and meeting-series types (client / internal) aligned with history. After generation, a Read-based verification step against the most recent minutes auto-corrects the output when drift is detected.",
          'Compresses Whisper segment output into a `MM:SS -> MM:SS: text` form before feeding it to the LLM — intentionally dropping sub-second precision roughly halves token cost, so meetings over an hour still fit within context limits.',
          'A BCP-47 (`ja-JP`) to Whisper code (`ja`) translation layer keeps configuration readable while supporting multiple languages. Participants, Action Items, and discussion points are emitted as Markdown tables and headings so downstream systems (e.g. Notion) can re-use the output.',
        ],
      },
    },
    {
      title: { ja: '主要機能', en: 'Key Features' },
      content: {
        ja: [
          'macOS Voice Memos（`~/Library/Group Containers/.../Recordings`）をスキャンし，録音ファイルを日時・長さ・サイズ付きで一覧化．m4a / mp4 / mov / wav 等をffmpeg経由でWhisperが直接デコードするため，ユーザー側での事前変換を不要化．',
          'Rich / Questionaryによる対話CLIで，ファイル選択・LLMバックエンド選択を矢印キーで完結．非対話モードも用意し，Claude Code Skillとして他エージェントから呼び出す際にもスクリプタブル．',
          '出力は`./biz/minutes/yyyymmdd-<会議名>.md`（議事メモ）と`transcript/*.txt`（文字起こし）を会議シリーズ別サブディレクトリに分離格納．差分レビューと長期保管に最適化した命名規則．',
        ],
        en: [
          'Scans macOS Voice Memos (`~/Library/Group Containers/.../Recordings`) and lists recordings with timestamp, duration, and size. m4a / mp4 / mov / wav are decoded directly by Whisper through ffmpeg, so users never need to pre-convert files.',
          'Rich / Questionary provide an interactive CLI for picking files and LLM backend with arrow keys; a non-interactive mode is also exposed so other Claude Code agents can drive it scriptably.',
          'Outputs `./biz/minutes/yyyymmdd-<title>.md` (minutes) and `transcript/*.txt` (raw transcript) into per-series subdirectories, using a naming scheme optimized for diff review and long-term archiving.',
        ],
      },
    },
    {
      title: { ja: '開発環境・品質管理', en: 'Development & Quality' },
      content: {
        ja: [
          'Python 3.12 + uvで依存を固定し，`pytest` / `pytest-cov` / `pytest-mock` / `pytest-asyncio`による単体・非同期テストを整備．Protocolによる依存反転でLLM／Whisperの双方をモック化し，CI上でGPUを使わずに回帰検証できる構成とした．Google Python Style Guide準拠のdocstring，Pydantic v2による設定値の型検証で保守性を確保．',
        ],
        en: [
          "Pins dependencies with Python 3.12 + uv and runs unit and async tests with `pytest`, `pytest-cov`, `pytest-mock`, and `pytest-asyncio`. Protocol-based dependency inversion lets both the LLM and Whisper be mocked, so regression runs in CI without a GPU. Google Python Style Guide docstrings and Pydantic v2 type validation keep the codebase maintainable.",
        ],
      },
    },
  ],
  technologies: [
    'Python 3.12',
    'mlx-whisper',
    'Apple Silicon (Metal)',
    'Google Gemini',
    'Gemma 4 31B',
    'vLLM',
    'DGX-Spark (NVIDIA GB10)',
    'OpenAI-compatible API',
    'Pydantic v2',
    'Rich',
    'Questionary',
    'pytest',
    'uv',
    'Claude Code Skill',
  ],
};
