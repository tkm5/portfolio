import type { Project } from '@/types';

export const scheduleAgent: Project = {
  slug: 'schedule-agent',
  title: {
    ja: 'AI日程調整エージェント',
    en: 'AI Scheduling Agent',
  },
  meta: {
    ja: '業務委託',
    en: 'Commissioned Work',
  },
  description: 'A PoC agent that elicits implicit scheduling preferences through dialogue, combining LLM steps with rule-based filters in LangGraph',
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '日程調整には「昼休みは空けたい」「この種類の会議は午前に」のような，書かれていない個人の判断基準がある．AIエージェントが対話を通じてこの暗黙の基準を学び，提案を改善できるかを確かめる技術検証(PoC)を担当した．検証の計画書を書き，実装も1人で行った．',
        ],
        en: [
          'Scheduling depends on unwritten personal criteria such as "keep lunch free" or "this kind of meeting in the morning". Worked on a PoC that tests whether an AI agent can learn these implicit criteria through dialogue and improve its proposals: wrote the test plan and built the implementation alone.',
        ],
      },
    },
    {
      title: { ja: '問いの分解と検証の設計', en: 'Breaking Down the Question and Designing the Test' },
      list: {
        ja: [
          '問いの分解: 暗黙知の獲得（対話で引き出せるか），蓄積（構造化して保持できるか），活用（蓄えた知識で提案が良くなるか）の3要素に分け，判断基準を1対1で対応させた．',
          '検証の順序: 下流の「活用」から逆順に検証し，人が用意した理想の知識を使って変数を1つずつ切り分け，各段の最良の方式を固定してから次へ進む実験計画を立てた．',
          '方式の選択: 期間の限られたPoCなので，クライアント様と合意のうえ，キーによる検索と構造化JSONでの保存という標準的な方式から始め，足りなければ切り替える方針にした．',
          '評価: 短いPoCで統計的な有意差は出せないため，利用者によるレビューと，同じシナリオでの対話前後の比較で確かめる形にした．',
        ],
        en: [
          'Decomposition: split the question into acquiring implicit knowledge (can dialogue draw it out), storing it (can it be structured and kept), and using it (does stored knowledge improve proposals), with one decision criterion per part.',
          'Order of testing: test in reverse, starting from "use", with human-prepared ideal knowledge so one variable changes at a time, fixing the best method at each stage before moving on.',
          'Choice of method: because the PoC was time-boxed, agreed with the client to start from the standard approach (key lookup and structured JSON storage) and switch only if it fell short.',
          'Evaluation: a short PoC cannot reach statistical significance, so results are checked by user review and by comparing the same scenario before and after dialogue.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '処理の流れ', en: 'How It Works' },
      content: {
        ja: [
          'LangGraphで12ノードのグラフを組み，LLMを使う6つの段と，ルールで決める段，記憶の読み書き，利用者への確認を分けた．クライアント様側の構成案（4つのエージェント）をもとに，依頼文の解析と，提案の承認・却下を判定する段を足した．',
        ],
        en: [
          "A 12-node LangGraph graph that separates six LLM steps from rule-based steps, memory reads and writes, and user confirmation. Built on the client's draft of four agents, adding request parsing and a step that judges approval or rejection of a proposal.",
        ],
      },
      list: {
        ja: [
          '依頼の解析と優先度の推定(LLM) → 参加者全員の空き時間の算出（ルール，祝日除外・業務時間・30分枠） → 記憶の読み込み → 好みのフィルター（ルール） → 候補の提案(LLM)．',
          '確認: interrupt()で候補を利用者に示す．承認なら終了し，却下や候補なしなら質問を1〜3問選んで聞き(LLM)，回答を構造化して記憶に保存し，空き時間を算出し直して提案し直す．',
          '却下の理由は次の提案と質問の選択に渡す．却下で挙がった日付は，LLMの解釈に任せずコードで依頼に反映する．',
          '記憶: LangGraphのStoreに，利用者ごとの好み（1文書を深いマージで更新）と，追記だけの質疑の履歴を持つ．読み込みは参加者全員，書き込みは依頼者だけにし，複数人の条件は「会議数の上限は最も厳しい値」「昼休みは誰かが守るなら守る」のように合成する．',
        ],
        en: [
          'Parse the request and estimate priority (LLM) → compute free time for all participants (rules: holidays excluded, business hours, 30-minute slots) → load memory → preference filters (rules) → propose candidates (LLM).',
          'Confirmation: interrupt() shows the candidates to the user. Approval ends the run; on rejection or no candidates, the agent picks 1 to 3 questions (LLM), structures the answer into memory, recomputes free time, and proposes again.',
          'The rejection reason goes to the next proposal and to question selection. Dates named in a rejection are applied to the request in code, not left to LLM interpretation.',
          "Memory: LangGraph's Store holds each user's preferences (one document updated by deep merge) and an append-only Q&A history. Memory is read for all participants but written only for the requester, and several people's conditions are combined by rules such as \"the strictest daily meeting cap wins\" and \"lunch is protected if anyone protects it\".",
        ],
      },
    },
    {
      title: { ja: '技術的な判断', en: 'Technical Decisions' },
      list: {
        ja: [
          'ルールはコードで: 昼休みの保護や会議数の上限をLLMに任せると守られ方が安定しなかったため，8つのフィルターをLLMの前に決定的に適用した．LLMは利用者から条件を引き出すことに集中させた．',
          '質問と緩和: 6分類24個の質問テンプレートから段階的に好みを聞き，候補がないときは昼休みの利用 → 予定の移動 → 参加者の削減 → 時間の短縮 → 期限の延長の順に条件を緩める．',
          '入力の防御: プロンプトに入れる値はすべてXMLタグをエスケープし，入力は10,000文字までに制限し，利用者IDの書式と解決後のパスを検査してパストラバーサルを防いだ．',
          'LLMの生成は1か所のファクトリーにまとめ，モデルの変更が段ごとに漏れないようにした．LLMの出力はすべてPydanticのスキーマで受ける．',
        ],
        en: [
          'Rules in code: left to the LLM, rules such as lunch protection and meeting caps were followed inconsistently, so eight filters are applied deterministically before the LLM call, and the LLM focuses on drawing conditions out of the user.',
          'Questions and relaxation: preferences are elicited step by step from 24 question templates in 6 categories; when no candidate exists, conditions relax in order: use lunch, move events, drop participants, shorten, extend the deadline.',
          'Input hardening: every value placed in a prompt is XML-escaped, input is capped at 10,000 characters, and user IDs are checked by pattern and resolved path to prevent path traversal.',
          'LLM creation goes through one factory so a model change cannot be missed in a single step, and every LLM output is received through a Pydantic schema.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '検証と見つかった問題', en: 'Verification and Problems Found' },
      list: {
        ja: [
          'テスト(計数): テスト関数289件（33ファイル）と，13グループ132件のシナリオ定義を書いた（リポジトリを静的に数えた値で，実行結果ではない）．シナリオのテストはカレンダーだけ差し替えて実際のグラフを動かし，API経由の出力を好みの違反（昼休み・終日の予定・時間帯）について検査する．',
          '観察: クライアント様の受入シナリオと照らすと，初版は基本の流れしか通らなかった．原因を整理すると，最も影響が大きかったのは学習後に空き時間を算出し直していないことで，再計算の段，予定の移動，参加者ごとの空き枠，期限と時間の緩和を足した．',
          '観察: クライアント様の試用で「この日は除く」が無視された．依頼を構造化するスキーマに除外日の項目がなく，入口で条件が落ちていたため，項目を足してルールで枠を除き，却下で挙がった日付もコードで反映するよう直した．',
          'クライアント様が試しやすいよう，FastAPIのAPIとNext.jsの画面を作り，Dockerでまとめて渡せる形にした．',
        ],
        en: [
          'Tests (counted): 289 test functions in 33 files and 132 scenario definitions in 13 groups (a static count of the repository, not a run result). Scenario tests run the real graph with only the calendars replaced, and a checker inspects API output for preference violations (lunch, all-day events, time of day).',
          "Observed: checked against the client's acceptance scenarios, the first version passed only the basic flow. The biggest cause was not recomputing free time after learning, so the fix added a recompute step, moving events, per-participant slots, and deadline and duration relaxation.",
          'Observed: during client trial use, "exclude this date" was ignored because the structured request schema had no field for it and the condition was lost at the entrance. The fix added the field, skips those slots by rule, and applies dates named in a rejection in code.',
          'To make trial use easy, built a FastAPI API and a Next.js screen, packaged together with Docker for hand-off.',
        ],
      },
      content: { ja: [], en: [] },
    },
  ],
  technologies: [
    'Python',
    'LangGraph',
    'LangChain',
    'Pydantic',
    'FastAPI',
    'Next.js',
    'React',
    'TypeScript',
    'FullCalendar',
    'Zustand',
    'Tailwind CSS',
    'LangSmith',
    'pytest',
    'Docker',
  ],
};
