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
          '録音をMac上でローカルに文字起こしし，指定した時間帯の会議をLLMで議事メモにするClaude Code Skillを開発した．文字起こしはMac上でローカルに実行し，議事メモを書く段階で文字起こしの結果をLLMに渡す．',
        ],
        en: [
          'Built a Claude Code skill that transcribes recordings locally on a Mac and turns the meeting in a given time range into minutes with an LLM. Transcription runs locally on the Mac, and the transcript goes to an LLM when the minutes are written.',
        ],
      },
    },
    {
      title: { ja: '文字起こしの流れ', en: 'Transcription Pipeline' },
      list: {
        ja: [
          '録音の選択: macOSのボイスメモの保存場所を走査して録音を一覧にし，利用者が選ぶ．録音は移動せずコピーするので，ボイスメモのデータベースとiCloudの同期を壊さない．',
          '前処理: ffmpegで2パスのラウドネス正規化（EBU R128，-16 LUFS）をかけ，16kHzのモノラルにし，Silero VADで無音を詰める（無音500ミリ秒以上，前後400ミリ秒を残す）．',
          '文字起こし: mlx-whisper(whisper-large-v3)でMacのGPU上で実行し，詰めた無音の分を戻して元の時刻にそろえる．',
          '幻聴の抑制: 前の文脈を引き継がない設定でループの連鎖を防ぎ，無音区間の判定を加え，無音らしさが高く確信度の低い区間は捨てる．',
          '時間帯の切り出し: 長時間の録音から，指定した時間帯にかかる30分単位の区間を切り出して結合し，欠けている部分があれば報告する．10分未満の間隔で続く発話は1つの会議の候補にまとめる．',
          '話者分離（任意，既定はオフ）: DGX Spark上のNemotron-3-DiarizationをSSHとDockerで動かし，ローカルの文字起こしと同時に実行する．音声をFLACで送り，話者の区間を受け取って単語ごとに話者を割り当てる．失敗したときは話者なしの文字起こしに戻す．',
        ],
        en: [
          'Picking a recording: the skill scans the macOS Voice Memos store, lists the recordings, and the user picks one. Recordings are copied, never moved, so the Voice Memos database and iCloud sync stay intact.',
          'Preprocessing: two-pass loudness normalization with ffmpeg (EBU R128, -16 LUFS), conversion to 16 kHz mono, and silence trimming with Silero VAD (silences of 500 ms or more, keeping 400 ms of padding).',
          "Transcription: mlx-whisper (whisper-large-v3) on the Mac's GPU, with the trimmed silences added back so timestamps match the original clock.",
          'Hallucination control: no carry-over of previous text (so loops cannot propagate), a silence threshold, and dropping segments that look like silence and have low confidence.',
          'Time-range extraction: from long recordings, the 30-minute pieces that overlap the requested range are cut out and merged, and any missing part is reported. Speech separated by gaps under 10 minutes is grouped into one meeting candidate.',
          'Speaker diarization (optional, off by default): Nemotron-3-Diarization runs on DGX Spark over SSH and Docker in parallel with local transcription. Audio goes up as FLAC, speaker turns come back, and each word is assigned a speaker. On any failure it falls back to a transcript without speakers.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '議事メモの生成', en: 'Writing the Minutes' },
      list: {
        ja: [
          '既定ではClaudeのワーカーが議事メモをMarkdownで書き，オプションでGeminiに切り替えられる．話者と名前の対応は，生成の前に利用者が確かめる．',
          '過去の議事録を文脈に入れる: 最新の3件から会議名と参加者の節だけを抜き出し（最大4,000文字），参加者名・敬称・会議の種類をそろえる．過去の議論の中身は渡さない．',
          'モデルの選び方: 自分で行ったブラインドの採点では，推論の深さを高にしたときの平均88.8点に対し，中では86.5点で，基準を下回ることもあったため，高を既定にした（記録上の評価）．',
        ],
        en: [
          'By default a Claude worker writes the minutes in Markdown, with an option to switch to Gemini. The user confirms the speaker-to-name mapping before generation.',
          'Past minutes as context: only the meeting-name and participant sections of the 3 newest minutes are passed (up to 4,000 characters) so names, honorifics, and meeting types stay consistent, without passing the content of past discussions.',
          'Choosing the effort level: in my own blind scoring, high reasoning effort averaged 88.8 against 86.5 for medium, and medium sometimes fell below the bar, so high is the default (a recorded evaluation).',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '見つかった問題と対処', en: 'Problems Found, and Fixes' },
      list: {
        ja: [
          'DGX Sparkのメモリ（vLLMと共有）が足りずに話者分離が失敗することがある → 30秒待って1回だけ再試行する．',
          'Nemotronは日本語で学習されていないため，話者の数を誤ることがある → 話者と名前の対応を人が確認する手順にした．',
          'PyPIのNeMoではこのモデルを読み込めなかった → 読み込めるコミットにNeMoを固定したDockerイメージを作った．',
          'SSHは対話なしで実行し，接続のタイムアウトを短くし，リモートの作業ディレクトリとコンテナは必ず片付ける．',
        ],
        en: [
          'Diarization can run out of memory on the DGX Spark (shared with vLLM) → it waits 30 seconds and retries once.',
          'Nemotron was not trained on Japanese, so it can get the number of speakers wrong → the speaker-to-name mapping is confirmed by a person.',
          'NeMo from PyPI could not load the model → built a Docker image with NeMo pinned to a commit that can.',
          'SSH runs non-interactively with a short connect timeout, and the remote job directory and container are always cleaned up.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '開発', en: 'Development' },
      content: {
        ja: ['Python 3.12とuvで管理し，設定はPydanticのSettingsで読む．文字起こしとLLMはProtocolで抽象化し，テストではモックに差し替える．pytestの収集で357件のテストがある（収集時の件数で，実行結果ではない）（話者の割り当て51件，長時間録音の処理45件など）．'],
        en: ['Managed with Python 3.12 and uv, with settings loaded through Pydantic Settings. Transcription and the LLM sit behind Protocols, which tests replace with mocks. pytest collects 357 tests (a collection count, not a run result) (51 for speaker alignment, 45 for long-recording handling, and more).'],
      },
    },
  ],
  technologies: ['Python 3.12', 'uv', 'Claude Code', 'mlx-whisper', 'Silero VAD', 'ffmpeg', 'Gemini API', 'Nemotron-3-Diarization', 'NeMo', 'Docker', 'DGX Spark', 'Pydantic', 'pytest'],
};
