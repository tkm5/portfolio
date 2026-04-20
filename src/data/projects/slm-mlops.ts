import type { Project } from '@/types';

export const slmMlops: Project = {
  slug: 'slm-mlops',
  title: {
    ja: '独自日本語SLM MLOpsパイプライン開発',
    en: 'Custom Japanese SLM MLOps Pipeline Development',
  },
  meta: {
    ja: 'グローバルコンサルティングファーム | 社内プロジェクト',
    en: 'Global Consulting Firm | Internal Project',
  },
  description: 'Custom Japanese SLM MLOps Pipeline Development',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'NVIDIA AI Blueprints の Data Flywheel（`NVIDIA-AI-Blueprints/data-flywheel`）を fork し，日本語SLM向けに拡張した自律学習型MLOps基盤をエンドツーエンドで設計・構築．本番環境のプロンプト／レスポンスログを起点に，評価データ自動生成→LoRAファインチューニング→LLM-as-judge評価→モデル昇格までのループを NeMo Microservices 上で自動化し，NVIDIA公式ベンチマークで最大98.6%の推論コスト削減を再現した．',
        ],
        en: [
          "Forked NVIDIA AI Blueprints' Data Flywheel (`NVIDIA-AI-Blueprints/data-flywheel`) and extended it into an autonomous-learning MLOps stack for Japanese SLMs, designed and built end-to-end. Production prompt / response logs kick off a loop that auto-generates evaluation data, runs LoRA fine-tuning, evaluates with LLM-as-judge, and promotes candidate models — all on NeMo Microservices — reproducing NVIDIA's published benchmark of up to 98.6% inference cost reduction.",
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'FastAPI REST APIがジョブを受け，Celery + RedisでバックグラウンドタスクをMongoDB（メタデータ）とElasticsearch（ログ・推論結果）に書き出す非同期構成．NeMo Deployment Managerを介してNIMsを動的に起動・停止することで，ファインチューニング・評価中のみGPUを占有する料金効率を実現した．',
          'オーケストレーションはKubernetes + Helm．Celery Parent/Workerのデプロイメントをfork元から調整し，障害復旧とスケーラビリティを改善．長時間ジョブは`FlywheelCancelledError`で安全にキャンセルでき，途中まで進んだ成果物も保持される．MLflowで実験メトリクスを，FlowerでCeleryタスクの可視化を別経路で確保している．',
        ],
        en: [
          'A FastAPI REST API receives jobs and a Celery + Redis fleet writes tasks into MongoDB (metadata) and Elasticsearch (logs, inference traces) asynchronously. NIMs are spun up and torn down through NeMo Deployment Manager so GPUs are billed only during fine-tuning and evaluation.',
          'Orchestration runs on Kubernetes + Helm. The Celery Parent / Worker deployments were retuned from the upstream blueprint to improve fault recovery and horizontal scalability. Long-running jobs cancel cleanly via `FlywheelCancelledError`, preserving partial artifacts. MLflow captures experiment metrics while Flower visualizes Celery state on a separate plane.',
        ],
      },
      list: {
        ja: [
          'Base: 本番プロンプトをそのまま再生して基準値を取得',
          'ICL（In-Context Learning）: トラフィックからfew-shot例を選択（均等分布 / 意味的類似度の2モード）',
          'Customized: LoRAファインチューニング後のベースプロンプト評価',
          'LLM-as-judge: 参照モデル出力とのペア比較で[0,1]スコア化',
          'Class-aware stratified splitting: タスク種別が偏らない評価／学習セットを自動生成',
        ],
        en: [
          'Base: replay production prompts verbatim to capture a baseline',
          'ICL (In-Context Learning): pick few-shot examples from traffic in either uniform or semantic-similarity mode',
          'Customized: evaluate base prompts against the LoRA fine-tuned model',
          'LLM-as-judge: paired comparison against a reference model emits a [0, 1] score',
          'Class-aware stratified splitting: automatically builds evaluation and training sets balanced across task classes',
        ],
      },
    },
    {
      title: { ja: 'fork 元との主な差分', en: 'Differences from Upstream' },
      content: {
        ja: [
          'Helm構成では，Elasticsearch / Kibana / MongoDB / Redis を upstream の同一チャート同梱から外部管理へ切り替え．本番の既存データ基盤を再利用しつつBlueprint部分のみを差し替え可能にし，運用チームへの引き渡し経路を整理した．',
          '`config-configmap.yaml`で日本語SLM向けのモデル・プロンプト・閾値を上書きし，upstream標準の`dfw-configmap.yaml`とは別名で管理．fork側の差分を`git diff upstream/main`で常時追跡できる体制とした．',
          '日本語データ設計ガイド `NeMo_Data_Designer.md` を新規追加し，日本語特有のトークナイズ・敬体／常体の扱い・ドメイン固有語彙の扱いを意思決定履歴として残している．',
        ],
        en: [
          'On the Helm side, Elasticsearch / Kibana / MongoDB / Redis were moved out of the upstream chart and treated as externally managed services, so the existing production data platform can be reused while only the Blueprint layer is swapped — this also cleans up the handover path to the ops team.',
          '`config-configmap.yaml` overrides models, prompts, and thresholds for Japanese SLMs; keeping it under a distinct name from the upstream `dfw-configmap.yaml` lets fork-side changes be tracked continuously with `git diff upstream/main`.',
          "A new `NeMo_Data_Designer.md` documents Japanese-specific tokenization, keigo / plain-form handling, and domain vocabulary choices so the data-design decisions live in the repo, not in people's heads.",
        ],
      },
    },
    {
      title: { ja: 'インフラストラクチャ・運用', en: 'Infrastructure & Operations' },
      content: {
        ja: [
          'H100およびA100を搭載した環境でNeMo CustomizerによるLoRAファインチューニングとNeMo Evaluatorによる自動評価を実行．Elasticsearchに蓄積した本番ログを`workload_id`で分類・重複排除し，評価／学習データセットをビルドするループを回している．',
          'Kibanaで入力データの分布や評価スコアの時系列を可視化し，データ品質とモデル性能の改善サイクルを定量的に追跡できるダッシュボードを構築．開発基盤としてBrev on Google Cloudを導入し，GPU環境の立ち上げ／撤収を分単位で行える運用を確立した．',
        ],
        en: [
          'LoRA fine-tuning with NeMo Customizer and automated evaluation with NeMo Evaluator run on H100 and A100 hardware. Production logs accumulated in Elasticsearch are classified and deduplicated by `workload_id` before being rolled into evaluation / training sets, keeping the improvement loop tight.',
          'Kibana dashboards visualize input data distribution and evaluation-score time series so data quality and model performance can be tracked quantitatively in one place. Brev on Google Cloud is used for development, letting GPU environments be spun up and torn down in minutes.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'NVIDIA NeMo Microservices',
    'NVIDIA NIM',
    'NeMo Customizer (LoRA)',
    'NeMo Evaluator',
    'FastAPI',
    'Celery',
    'Redis',
    'MongoDB',
    'Elasticsearch',
    'Kibana',
    'MLflow',
    'Flower',
    'Kubernetes',
    'Helm',
    'H100/A100',
    'Google Cloud (Brev)',
    'uv',
  ],
};
