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
  description: 'Skills, a delegation CLI, hooks, and a self-hosted local LLM for running Claude Code work at scale',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'Claude Codeに仕事を任せるための運用の仕組みを自作した．作業を指定モデルのヘッドレスワーカーへ委任するCLI，難易度別の委任ルールを強制するhooks，差分の規模でレビューのモデルを選ぶ仕組み，Claude Code用のスキルからなる．軽い処理は，自宅のDGX Spark上でセルフホストしたローカルLLMに回す．',
        ],
        en: [
          'Built the operating setup for handing work to Claude Code: a CLI that delegates work to headless workers on a specified model, hooks that enforce difficulty-based delegation rules, review-model selection by diff size, and Claude Code skills. Lightweight tasks go to a local LLM self-hosted on a DGX Spark.',
        ],
      },
    },
    {
      title: { ja: '構成', en: 'How It Works' },
      list: {
        ja: [
          '委任CLI: 呼び出し側がモデルを指定し，ヘッドレスのClaude Codeワーカーに作業を任せる（Bash約3,700行とPythonの補助）．git worktreeでの並列実行と，テストの証跡を残す仕組みを備える．CLI自体は難易度を判定しない．',
          '委任ルールの強制: 難易度とモデルの対応はルールとして書き，hooksで委任を強制する．rmの前にバックアップを取るhookなど，hooksは7本．',
          'レビューのモデル選択: 差分の規模と機微なパスの有無から，レビューに使うモデルを決める．',
          'スキル: Claude Code用のスキルを約37本自作．',
          'ローカルLLM: Qwen3.8-Flash-Next（NVFP4量子化）をDGX Spark上にvLLMでセルフホストし，ファイル検索・コード読解・要約・害のない機械的な編集をOpenCode経由で実行する．委任CLIとは別の経路にしている．',
        ],
        en: [
          'Delegation CLI: the caller names the model, and the CLI hands the work to a headless Claude Code worker (about 3,700 lines of Bash plus Python helpers). It supports parallel runs in git worktrees and keeps test evidence. The CLI itself does not judge difficulty.',
          'Enforcing delegation rules: the mapping from difficulty to model is written as rules and enforced by hooks; there are 7 hooks, including one that backs files up before rm.',
          'Review-model selection: picks the review model from the diff size and whether sensitive paths are touched.',
          'Skills: about 37 self-written Claude Code skills.',
          'Local LLM: Qwen3.8-Flash-Next (NVFP4-quantized), self-hosted with vLLM on DGX Spark, runs file search, code reading, summarization, and harmless mechanical edits through OpenCode. It is a separate path from the delegation CLI.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '利用の記録', en: 'Usage Record' },
      content: {
        ja: [
          '計測: 実行ログで，委任CLIは3,040回，ローカルLLMの経路は139回実行している．',
        ],
        en: [
          'Measured: the run logs show 3,040 runs of the delegation CLI and 139 runs of the local LLM path.',
        ],
      },
    },
  ],
  technologies: ['Claude Code', 'Shell', 'Python', 'git worktree', 'OpenCode', 'vLLM', 'DGX Spark', 'Qwen3.8-Flash-Next'],
};
