import type { Project } from '@/types';

export const codingAgentTooling: Project = {
  slug: 'coding-agent-tooling',
  title: {
    ja: 'AIコーディングエージェントの運用基盤',
    en: 'AI Coding-Agent Tooling',
  },
  meta: {
    ja: '個人プロジェクト',
    en: 'Personal Project',
  },
  description: 'Skills, a delegation CLI, hooks, review-model selection, and a self-hosted local LLM for handing work to Claude Code',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'Claude Codeに仕事を任せるための運用の仕組みを自作した．作業を指定モデルのヘッドレスワーカーへ委任するCLI，委任のルールを強制するhooks，差分の規模でレビューのモデルを選ぶ仕組み，Claude Code用のスキルからなる．ファイル検索や要約などの軽い処理は，DGX Spark上でセルフホストしたローカルLLMに回す．',
        ],
        en: [
          'Built the operating setup for handing work to Claude Code: a CLI that delegates work to headless workers on a specified model, hooks that enforce the delegation rules, review-model selection by diff size, and Claude Code skills. Lightweight tasks such as file search and summarization go to a local LLM self-hosted on a DGX Spark.',
        ],
      },
    },
    {
      title: { ja: 'hooksとレビューのモデル選択', en: 'Hooks and Review-Model Selection' },
      list: {
        ja: [
          '委任の強制: メインのセッションが自分で使ったツールの回数を数え，読み取り60回・編集など8回の予算を超えると拒否する．委任すれば数え直す．',
          'レビューのモデル選択: 差分が300行以上なら最上位のモデル，200〜299行なら次のモデル，200行未満なら標準のモデルにし，文書だけの変更ならレビューを出さない．機微なパス（認証情報・認証・決済・hooks），破壊的な操作（rm -rf，強制push，DROP TABLEなど），依存関係のマニフェストの変更，やり直しの変更は，規模によらず最上位のモデルにする．測れないものは必ず上の段に倒す（フェイルクローズ）．',
          'hooks（登録6本）: 委任の強制，rmの前のバックアップ，push前の非破壊のマージ確認，計画モードの強制，日本語の件名が化けるメール送信経路の遮断，全角句読点の検査．',
          'スキル: Claude Code用のスキルを17本自作した（外部から取り込んだものを除く）．',
        ],
        en: [
          "Delegation enforcement: the hook counts the main session's own tool calls and denies them past a budget of 60 reads and 8 edits or other calls; delegating resets the count.",
          'Review-model selection: 300 or more changed lines get the top model, 200 to 299 the next, and under 200 the standard model, with no review for documentation-only changes. Sensitive paths (credentials, auth, payments, hooks), destructive patterns (rm -rf, force push, DROP TABLE, and the like), dependency-manifest changes, and retried changes always get the top model. Anything that cannot be measured raises the tier (fail-closed).',
          'Hooks (6 registered): enforce delegation, back up before rm, check merges non-destructively before push, enforce plan mode for the plan command, block a mail-sending path that garbles Japanese subjects, and lint full-width Japanese punctuation.',
          'Skills: 17 self-written Claude Code skills (vendored ones excluded).',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '委任CLI', en: 'Delegation CLI' },
      content: {
        ja: [
          '呼び出し側がモデルを指定し，ヘッドレスのClaude Codeワーカーに作業を任せる．本体はBash 3,669行，集計とレビュー判定の補助はPython 2,634行（標準ライブラリのみ）．CLI自体は難易度を判定せず，難易度とモデルの対応はルールとして書いている．',
        ],
        en: [
          'The caller names the model, and the CLI hands the work to a headless Claude Code worker. The core is 3,669 lines of Bash, with 2,634 lines of Python helpers for statistics and review tiers (standard library only). The CLI itself does not judge difficulty; the mapping from difficulty to model is written as rules.',
        ],
      },
      list: {
        ja: [
          '実行の記録: 1回の実行ごとに，モデル・役割・ターン数・セッションID・証跡のパスを1行のJSONで記録し，プロンプトも保存する．',
          '実装の排他: 実装役のワーカーはディレクトリごとのロックを取り，2つのワーカーが同じ作業ツリーを同時に編集しないようにした．ロックが埋まっていれば，git worktreeを自動で作って並列に走らせ，終わったら元のブランチへ取り込む．',
          'テストの証跡: 実装役はテストの結果を証跡ファイルに残し，作業ツリーの指紋も記録する．レビュー役は証跡を読み，ツリーが動いていれば証跡が古いことを知らされる．',
          '暴走の防止: ワーカーは独立したプロセスグループで監視タイマー（既定3,600秒）の下で動き，時間切れならツールの子プロセスごと止める．セッションIDを先に決めるので，止まった実行を再開できる．ワーカーからの再帰呼び出しは終了コードで拒否する．',
          'ターン数の上限は既定で設けない: 上限で止めると編集の途中で終わるため，暴走の防止は監視タイマーに任せた．',
          'MCPサーバーは指定したときだけワーカーに読み込ませ，プロンプトの共通部分を小さく保つ．',
        ],
        en: [
          'Run records: each run is logged as one JSON line with the model, role, turns, session ID, and evidence path, and the prompt is saved.',
          'Implementation lock: implementer workers take a per-directory lock so two workers never edit one tree. If the lock is busy, a git worktree is created automatically so the work runs in parallel, and the result is brought back to the original branch afterwards.',
          "Test evidence: implementers write test results to an evidence file along with a fingerprint of the work tree; reviewers read it and are told when the tree has moved and the evidence is stale.",
          'Runaway guard: workers run in their own process group under a watchdog (3,600 seconds by default), and a timeout stops the whole tool subtree. Session IDs are assigned up front so a killed run can be resumed. Nested calls from a worker are refused with an exit code.',
          'No turn cap by default: a cap would stop a run mid-edit, so the watchdog is the runaway guard instead.',
          'MCP servers are loaded into a worker only when requested, which keeps the shared prompt prefix small.',
        ],
      },
    },
    {
      title: { ja: 'ローカルLLM', en: 'Local LLM' },
      content: {
        ja: [
          'Qwen3.8-Flash-Next（NVFP4量子化）をDGX Spark上にvLLMでセルフホストし，ファイル検索・コード読解・要約・害のない機械的な編集をOpenCode経由で実行する．実装やレビューはローカルに渡さず，委任CLIとは別の経路にしている．',
        ],
        en: [
          'Qwen3.8-Flash-Next (NVFP4-quantized), self-hosted with vLLM on DGX Spark, runs file search, code reading, summarization, and harmless mechanical edits through OpenCode. Implementation and review never go to the local model; it is a separate path from the delegation CLI.',
        ],
      },
      list: {
        ja: [
          'イメージの固定: 標準のvLLMイメージはこのモデルの量子化済みテーブルを読めず，また手順が1週間に2回壊れたため，動作したイメージのタグに固定した．26.8GiBのテーブルはNVMeに置き，io_uringで読んでメモリに収めた．',
          '採らなかった案: サブエージェントをヘッダーでローカルへ振り分ける方式は，専用の起動手段が必要でリモート操作の機能を失い，DGX Sparkが止まったときの代替経路もないため採らなかった．',
          '安全策: シェルは読み取り専用の許可リストに限る．同じ秒に複数の実行が始まるとOpenCodeのSQLiteがロックされるため，ランダムに待って1回だけ再試行する．',
          '観察: ローカルのモデルは「設定の既定値を変える」指示にも従ったため，任せる範囲は呼び出し側の規律で絞っている．',
        ],
        en: [
          'Pinned image: the stock vLLM image cannot load this model\'s quantized tables, and the recipe broke twice in one week, so the working image tag is pinned. The 26.8 GiB tables live on NVMe and are read with io_uring to fit in memory.',
          'Rejected: routing sub-agents to the local model by request header needed a dedicated launcher that loses remote control, and had no fallback when the DGX Spark is down.',
          'Safeguards: shell access is limited to a read-only allowlist. When several runs start in the same second, OpenCode\'s SQLite database locks, so the runner waits a random interval and retries once.',
          'Observed: the local model also followed an instruction to change a config default, so the scope it gets is limited by caller discipline.',
        ],
      },
    },
    {
      title: { ja: '検証と利用の記録', en: 'Verification and Usage Record' },
      list: {
        ja: [
          'テスト: 委任CLIは偽のClaude CLIに差し替えたテストスイートで確かめ，2026年10月21日の実行記録では742件成功・0件失敗だった．レビューのモデル選択にも専用のテストがあり，hooksは6本中4本にテストスクリプトがある．',
          '計測（ローカルLLMの切替時）: 起動631秒，1系列で46.3トークン/秒，4系列の並列で計96.1トークン/秒，4本の並列実行はすべて正常終了した．',
          '計測（2026年11月16日時点の実行ログ）: 委任CLIの実行は3,128回（1回 = ログに残った1回の呼び出し．再開と失敗を含む）．ローカルLLMの経路は139回で，うちQwen3.8-Flash-Nextでの実行は59回（それ以前は別のモデル）．',
        ],
        en: [
          'Tests: the delegation CLI is tested against a fake Claude CLI; the run recorded on October 21, 2026 shows 742 passed and 0 failed. Review-model selection has its own tests, and 4 of the 6 hooks have test scripts.',
          'Measured (when switching the local model): 631 seconds to start, 46.3 tokens/s on one stream, 96.1 tokens/s in total over 4 parallel streams, and all 4 parallel runs exited normally.',
          'Measured (run logs as of November 16, 2026): 3,128 delegation-CLI runs (one run = one logged invocation, including resumes and failures). The local-LLM path ran 139 times, 59 of them on Qwen3.8-Flash-Next (earlier runs used a different model).',
        ],
      },
      content: { ja: [], en: [] },
    },
  ],
  technologies: ['Claude Code', 'Bash', 'Python', 'git worktree', 'Hooks', 'OpenCode', 'vLLM', 'DGX Spark', 'Qwen3.8-Flash-Next', 'Docker', 'chezmoi'],
};
