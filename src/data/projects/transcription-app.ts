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
          '議事録作成を効率化するため，OpenAIのWhisperモデルを活用した文字起こしアプリケーションを開発．',
        ],
        en: [
          "Developed a transcription application utilizing OpenAI's Whisper model to streamline meeting minute creation.",
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          'NVIDIA Inference Microservices によりNVIDIA GPU に最適化された高いスループットを実現．',
          'また，実行環境のGPUを自動検知して処理を高速化する機能や，ローカル実行とAPI利用の両方に対応可能な柔軟なアーキテクチャを設計・実装．',
        ],
        en: [
          'Achieved high throughput optimized for NVIDIA GPUs through NVIDIA Inference Microservices.',
          'Also designed and implemented a flexible architecture that includes automatic GPU detection for accelerated processing and supports both local execution and API utilization.',
        ],
      },
    },
  ],
  technologies: ['Python', 'OpenAI Whisper', 'NVIDIA NIM', 'GPU Computing', 'Docker'],
};
