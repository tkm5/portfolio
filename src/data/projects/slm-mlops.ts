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
          'NVIDIA Data Flywheel Blueprintに基づき，本番環境のプロンプト/レスポンスログを活用して蒸留モデルの自律的な学習・改善サイクルを実現するMLOps基盤をエンドツーエンドで設計・構築．NeMo Microservicesプラットフォームを活用し，推論コストを最大98.6%削減可能なモデル最適化パイプラインを実装．',
        ],
        en: [
          'Designed and built an end-to-end MLOps infrastructure based on NVIDIA Data Flywheel Blueprint, enabling autonomous learning and improvement cycles for distilled models using production prompt/response logs. Implemented a model optimization pipeline capable of reducing inference costs by up to 98.6% leveraging the NeMo Microservices platform.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'NeMo Deployment Managerを活用し，必要に応じてNIMsを動的に起動・停止することで，GPUリソースを効率的に管理．Celeryワーカーによるバックグラウンドタスク処理とRedisによるタスクキュー管理を実装．',
        ],
        en: [
          'Efficiently managed GPU resources by dynamically starting and stopping NIMs as needed using NeMo Deployment Manager. Implemented background task processing with Celery workers and task queue management with Redis.',
        ],
      },
      list: {
        ja: [
          'Elasticsearchによるプロンプト/レスポンスログの収集・保存',
          'workload_idベースのタスク分類と重複排除',
          'class-aware stratified splittingによる評価・学習データセットの自動生成',
          'NeMo Customizerによるファインチューニング（LoRA）',
          'LLM-as-judge比較によるNeMo Evaluatorでの評価',
        ],
        en: [
          'Prompt/response log collection and storage via Elasticsearch',
          'Task classification and deduplication based on workload_id',
          'Automatic generation of evaluation and training datasets using class-aware stratified splitting',
          'Fine-tuning with NeMo Customizer (LoRA)',
          'Evaluation with NeMo Evaluator using LLM-as-judge comparisons',
        ],
      },
    },
    {
      title: { ja: '実験タイプ', en: 'Experiment Types' },
      content: {
        ja: [
          'LLM-as-judgeによる類似度メトリクス[0,1]でスコアリングし，高スコアの小規模モデルを自動的に候補として抽出．',
        ],
        en: [
          'Scored using LLM-as-judge similarity metrics [0,1], automatically extracting high-scoring small models as candidates.',
        ],
      },
      list: {
        ja: [
          'Base: 本番プロンプトの再生',
          'ICL (In-Context Learning): トラフィック例からのfew-shotプロンプト構築（ランダム選択またはセマンティック類似度ベース）',
          'Customized: LoRAファインチューニング後のベースプロンプト評価',
        ],
        en: [
          'Base: Replay of production prompts',
          'ICL (In-Context Learning): Few-shot prompt construction from traffic examples (random selection or semantic similarity-based)',
          'Customized: Base prompt evaluation after LoRA fine-tuning',
        ],
      },
    },
    {
      title: { ja: 'インフラストラクチャ', en: 'Infrastructure' },
      content: {
        ja: [
          'H100およびA100 GPUを搭載した環境において，Kubernetes/Helmによるコンテナオーケストレーションを構築．FastAPIベースのREST API，MongoDB（メタデータ），Elasticsearch（ログ），Redis（タスクキュー）による堅牢なデータ基盤を実現．',
          'Kibanaによる入力データの品質可視化ダッシュボードを構築し，データとモデルの継続的な改善サイクルを定量的に評価・推進できる環境を確立．uvとBrev on Google Cloudを導入し，開発効率を最大化．',
        ],
        en: [
          'Built container orchestration with Kubernetes/Helm in an environment equipped with H100 and A100 GPUs. Achieved robust data infrastructure with FastAPI-based REST API, MongoDB (metadata), Elasticsearch (logs), and Redis (task queue).',
          'Built input data quality visualization dashboards with Kibana, establishing an environment for quantitatively evaluating and promoting continuous improvement cycles for data and models. Maximized development efficiency by introducing uv and Brev on Google Cloud.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'NVIDIA NeMo',
    'NVIDIA NIM',
    'Kubernetes',
    'Helm',
    'FastAPI',
    'Celery',
    'Elasticsearch',
    'MongoDB',
    'Redis',
    'Kibana',
    'LoRA',
    'H100/A100',
    'Google Cloud',
    'uv',
  ],
};
