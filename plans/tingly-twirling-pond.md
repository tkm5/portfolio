# CVディレクトリとポートフォリオサイトの同期計画

## 概要

ポートフォリオサイト（index.html）の情報を正として，CVディレクトリ内の4ファイルを整備する．

## 作成するファイル

| ファイル | 説明 | 状態 |
|---------|------|------|
| CV_jp.md | ベースとなるCV（実名・会社名あり） | 既存→更新 |
| Redacted_CV_jp.md | 個人情報/会社名をマスキング | 既存→更新 |
| CV_en.md | CV_jp.mdの英語版 | 空ファイル→作成 |
| Redacted_CV_en.md | Redacted_CV_jp.mdの英語版 | 新規作成 |

## サイトの現在のSkills情報（正）

```
Programming Languages: Python, JavaScript, TypeScript, C, C++, SQL, Shell Scripting
Tools: Docker, Docker Compose, Git, GitHub, Firebase, Clerk, Supabase, Tmux, Looker Studio, Figma
Cloud: Google Cloud, Azure, AWS
Others: Parallel Processing, Natural Language Processing, Large Language Model, AI Agent, Operating System, Computer Networks
```

## 追加が必要なプロジェクト（サイトにあってCVにないもの）

### デロイト（現職）に追加
1. **業務分析テーブル自動生成AIパイプライン**
   - PDF, Word, PowerPoint, Excelなど多様な形式の業務マニュアルをAIで横断的に分析
   - 単一の「業務分析テーブル」をCSV形式で自動生成
   - Python, Google Gemini, Azure Blob Storage, Pandas, Pydantic

### Other Projects（業務委託）に追加
2. **AIエージェント意思決定支援システム**
   - Pro/Con両視点からの意思決定支援AIエージェント
   - LangGraph/LangChain/FastAPI基盤のマルチテナント対応B2B SaaS
   - ReActパターン，Vertex AI Search RAG，Web検索連携

3. **支払予定表自動作成システム**
   - Google DriveのPDFからGemini APIで請求書読み取り
   - スプレッドシートに支払予定表を自動作成
   - Google Apps Script, clasp

## 実装手順

### Step 1: CV_jp.md の更新

1. Technical Skillsセクションをサイトに合わせて更新:
   - Programming Languages: TypeScript追加
   - Tools: Firebase, Clerk, Supabase追加（Cursor, Gemini CLI, tailscale削除）
   - Cloud: AWS追加

2. デロイトの職歴詳細に「業務分析テーブル自動生成AIパイプライン」プロジェクトを追加

3. Other Projects（業務委託）セクションに以下を追加:
   - AIエージェント意思決定支援システム
   - 支払予定表自動作成システム

### Step 2: Redacted_CV_jp.md の更新

CV_jp.mdに基づき，以下をマスキング:
- 氏名 → T.G
- NTTデータイントラマート → 大手IT企業
- 博報堂プロダクツ → 大手広告代理店
- KPMGコンサルティング → 大手総合コンサルティングファームA
- デロイトトーマツコンサルティング → 大手総合コンサルティングファームB

Technical Skillsと追加プロジェクトも同様に更新

### Step 3: CV_en.md の作成

CV_jp.mdの内容を英訳:
- セクション構成は同一
- 職歴詳細を自然な英語で表現
- Technical Skillsは英語表記のまま
- 追加プロジェクトも英訳

### Step 4: Redacted_CV_en.md の作成

Redacted_CV_jp.mdの内容を英訳:
- マスキングされた企業名を英語に（Major IT Company, Major Advertising Agency等）
- 職歴詳細を英訳
- 追加プロジェクトも英訳

## マスキングルール

| 日本語（実名） | 日本語（マスキング） | 英語（マスキング） |
|---------------|---------------------|-------------------|
| 後関 拓実 | T.G | T.G |
| NTTデータイントラマート | 大手IT企業 | Major IT Company |
| 博報堂プロダクツ | 大手広告代理店 | Major Advertising Agency |
| KPMGコンサルティング | 大手総合コンサルティングファームA | Major Consulting Firm A |
| デロイトトーマツコンサルティング | 大手総合コンサルティングファームB | Major Consulting Firm B |

## 検証方法

1. 4ファイルすべてのTechnical Skillsがサイトと一致することを確認
2. マスキング版に実名・会社名が含まれていないことを確認
3. 英語版の内容が日本語版と対応していることを確認
