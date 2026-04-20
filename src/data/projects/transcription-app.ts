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
          '議事録作成を効率化するため，Apple Silicon上で動作するmlx-whisperと生成AIを組み合わせた議事メモ自動生成ツールをClaude Code Skillとして開発．',
        ],
        en: [
          'Developed a meeting minutes automation tool as a Claude Code Skill, combining mlx-whisper running on Apple Silicon with generative AI to streamline minute-taking.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          'macOSのVoice Memos録音から音声を自動取得し，文字起こしはMetal GPU上でmlx-whisperによりローカル実行．',
          '議事メモ生成はGoogle Gemini APIと自宅DGX-Spark（NVIDIA GB10）上のvLLMが提供するGemma 4 31Bを切替可能とし，機密性の高い会議にも対応．',
          '過去議事録をコンテキストとして投入することで参加者名・敬称・会議種別の一貫性を保ち，Python 3.12 + uv + pytest で保守性とテスト容易性を確保．',
        ],
        en: [
          'Automatically ingests audio from macOS Voice Memos; transcription runs locally on the Metal GPU via mlx-whisper.',
          'Minute generation can switch between the Google Gemini API and Gemma 4 31B served by vLLM on a self-owned DGX-Spark (NVIDIA GB10), covering privacy-sensitive meetings.',
          'Feeds past minutes as context to keep participant names, honorifics, and meeting types consistent; built with Python 3.12 + uv + pytest for maintainability and testability.',
        ],
      },
    },
  ],
  technologies: [
    'Python',
    'mlx-whisper',
    'Google Gemini',
    'Gemma 4 31B',
    'vLLM',
    'Apple Silicon',
    'DGX-Spark',
    'uv',
    'pytest',
    'Claude Code',
  ],
};
