import type { Project } from '@/types';

export const transcriptionApp: Project = {
  slug: 'transcription-app',
  title: {
    ja: 'ローカル文字起こしと議事メモ',
    en: 'Local Transcription and Meeting Minutes',
  },
  meta: {
    ja: '個人プロジェクト',
    en: 'Personal Project',
  },
  description: 'A Claude Code skill that transcribes recordings locally on a Mac and drafts meeting minutes with an LLM',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          '録音をMac上でローカルに文字起こしし，指定した時間帯の会議をLLMで議事メモにするClaude Code Skillを開発した．',
        ],
        en: [
          'Built a Claude Code skill that transcribes recordings locally on a Mac and turns the meeting in a given time range into minutes with an LLM.',
        ],
      },
    },
    {
      title: { ja: '構成', en: 'How It Works' },
      list: {
        ja: [
          '音声の取得: macOSのボイスメモから録音を自動で取得する．',
          '文字起こし: Mac上のmlx-whisperでローカルに実行する（音声区間の検出にSilero VADを使用）．',
          '会議の切り出し: 終日の録音から，時刻の指定で会議の区間を切り出す．',
          '議事メモ: 既定ではClaudeがMarkdownで書き，オプションでGeminiに切り替えられる．過去の議事録を文脈に入れ，参加者名・敬称・会議の種類をそろえる．',
          '話者分離: オプション（既定はオフ）で，DGX Spark上のNemotron-3-Diarizationを使って話者を分ける．',
        ],
        en: [
          'Audio intake: picks up recordings from macOS Voice Memos automatically.',
          'Transcription: runs locally on the Mac with mlx-whisper (Silero VAD for voice activity detection).',
          'Meeting extraction: cuts the meeting segment out of an all-day recording by time range.',
          'Minutes: Claude writes them in Markdown by default, with an option to switch to Gemini. Past minutes are added as context so participant names, honorifics, and meeting types stay consistent.',
          'Speaker diarization: optional (off by default), using Nemotron-3-Diarization on DGX Spark.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '開発', en: 'Development' },
      content: {
        ja: ['テストはpytestで書いている．'],
        en: ['Tests are written with pytest.'],
      },
    },
  ],
  technologies: ['Python', 'Claude Code', 'mlx-whisper', 'Silero VAD', 'Gemini API', 'Nemotron-3-Diarization', 'DGX Spark', 'pytest'],
};
