import type { Project } from '@/types';

export const aiTutorPoc: Project = {
  slug: 'ai-tutor-poc',
  title: {
    ja: '教育事業者：24時間AIチューターのPoC開発',
    en: 'Education Company: 24/7 AI Tutor PoC Development',
  },
  meta: {
    ja: '個人受託 | Forward Deployed Engineer',
    en: 'Independent Engagement | Forward Deployed Engineer',
  },
  description: "An AI tutor PoC that answers in line with a cram school's teaching policy and only answers when two vendors' LLMs agree",
  sections: [
    {
      title: { ja: '背景と課題', en: 'Context and Problem' },
      content: {
        ja: [
          '生徒が撮った問題の写真に，24時間いつでも答えるAIチューターのPoCを開発した．回答は塾の指導方針（指導案などのPDF）に沿っている必要があった．',
          'PoCは設計から実装まで1人で開発した（リポジトリのコミットはすべて自分とAIコーディングエージェントによるもの）．',
        ],
        en: [
          "A PoC for an AI tutor that answers students' photographed questions around the clock. Answers had to follow the cram school's teaching policy (lesson plans and other PDFs).",
          'Designed and built the PoC single-handedly (every commit in the repository is mine or my AI coding agent\'s).',
        ],
      },
    },
    {
      title: { ja: '処理の流れ', en: 'How It Works' },
      content: {
        ja: [
          'LangGraphで17ノードの状態グラフを組んだ．1つの質問は次の順に流れる．',
        ],
        en: [
          'A 17-node LangGraph state graph. One question flows through these steps:',
        ],
      },
      list: {
        ja: [
          '写真の前処理: 氏名や点数は，モデルを呼ぶ前にMac上でApple Visionを使って隠す．問題文は隠さない．',
          '読み取りと単元の判定: 写真を読み取り，分類モデルJevで質問の単元を判定する．',
          '指導方針の選択: 判定した単元とタグが一致する指導方針の節を選ぶ．この選択はLLMを呼ばない決定的な処理にした．',
          '解答: 回答を書くモデル(writer)が，手順・式・小問ごとの最終解答からなる骨組みを書き，骨組みの一貫性を検査する．',
          '照合: 別の会社のモデル(checker)が写真を直接読み，最終解答だけを返す．writerとcheckerが同じ会社のモデルだと，起動時にエラーで止まる．',
          '判定: 2社の答えが一致し，writerの計算を再計算で確かめられ，骨組みの検査が通り，写真に問題全体が写っているときだけ回答する．通らなければ一度だけ聞き直し，それでも通らなければ答えずに先生への質問を促す．',
          '表示: 画面の答えと式は，検証済みの骨組みからコードで写す．解説を書くモデルは文章だけを書くので，検証していない数値が画面に出ない．',
          '難問レーン: より強いモデルの解き手をすべての質問で別スレッドで並走させ，3社目のモデルとの一致を条件に答えを出す．速い組の邪魔はしない．',
        ],
        en: [
          'Photo preprocessing: names and scores are masked on the Mac with Apple Vision before any model is called; the problem text is never masked.',
          'Reading and topic unit: the photo is read, and the Jev classifier decides which unit the question belongs to.',
          'Teaching-policy selection: the policy sections whose tags match that unit are selected; this step is deterministic and calls no LLM.',
          "Solving: the writer model drafts a skeleton (steps, equations, one final answer per sub-question), and the skeleton's consistency is checked.",
          'Cross-check: a checker model from a different vendor reads the photo directly and returns only final answers. If the writer and checker come from the same vendor, start-up fails with an error.',
          "Gate: the tutor answers only when the two vendors agree, the writer's arithmetic recomputes, the skeleton check passes, and the photo shows the whole question. Otherwise it asks once more; if that still fails, it does not answer and suggests asking a teacher.",
          'Display: the answer and equations on screen are copied by code from the verified skeleton. The explanation model writes prose only, so no unverified number reaches the screen.',
          'Hard-question lane: a stronger solver runs on a separate thread for every question and must agree with a third vendor\'s model; it never slows the fast pair.',
        ],
      },
    },
    {
      title: { ja: '検証', en: 'How It Was Verified' },
      list: {
        ja: [
          '計測: 模範解答つき82問（保留しておいた74問と，自作した濃度の問題8問）で計測し，誤った回答の提示は0件だった（0/82のWilson法による95%信頼区間は0〜4.5%）．暫定の基準で，チューニング前の枠組みを確かめるための計測だった．値は合っているが表記が異なり自動で採点できなかった5問は，人の確認が必要として扱った．',
          'テスト: テストファイル148本・テスト関数3,953件を書いた．比べる2者に何を見せるかを固定するテストもある．レビューで想定した2つの誤り（checkerに読み取り結果を見せる，一貫性の検査にcheckerの答えを見せる）を，既存のテストがほとんど検出できなかったため追加した．',
        ],
        en: [
          'Measured: 0 wrong answers shown in 82 test questions with reference answers (74 held-out questions plus 8 concentration problems I wrote); the Wilson 95% confidence interval for 0/82 is 0 to 4.5%. This was a provisional-criteria check of the framework before tuning; 5 questions whose value matched but whose notation differed could not be graded automatically and were flagged for human review.',
          'Tests: 148 test files with 3,953 test functions, including a test that pins what each side of the cross-check is shown. It was added because existing tests barely caught two mistakes imagined in a review (showing the checker the reading, showing the consistency check the checker\'s answers).',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '指導方針の扱い', en: 'Handling the Teaching Policy' },
      list: {
        ja: [
          'OKF: 指導方針をGoogle Cloudの知識記述形式OKF(Open Knowledge Format)で1節1ファイルに起こした．',
          '失敗時の扱い: Jevの呼び出しは例外を投げない．待つのは既定で0.6秒までで，間に合わなければ大きなカテゴリの指導方針に戻す．失敗しても回答が失われることはなく，指導方針が大まかになるだけにした．',
          '独立性: 指導方針はwriterと解説には渡すが，checkerと一貫性の検査には渡さない．比べる2者が同じ出発点を共有しないようにするため．',
        ],
        en: [
          "OKF: wrote the teaching policy one section per file in Google Cloud's Open Knowledge Format (OKF).",
          'Failure handling: the Jev call never raises. It waits 0.6 seconds by default and otherwise falls back to the broader category\'s policy, so a failure only makes the guidance less specific and never loses an answer.',
          'Independence: the policy goes to the writer and the explanation, never to the checker or the consistency check, so the two sides being compared do not share a starting point.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '技術的な判断と採らなかった案', en: 'Technical Decisions and Rejected Alternatives' },
      list: {
        ja: [
          'RAGを使わない: 待ち時間を抑えるため，指導方針をベクトル検索で探すRAGは範囲外にした．モデルにファイルを読ませるツール呼び出しも採らず，Pythonで読む．同じ資料と単元なら必ず同じ節が選ばれるので，実行どうしを比べられる．',
          '難易度予測は不採用: 難問を事前に見分けて強いモデルに回す案を試した．事前に決めた採用基準を満たす予測器はなく，実行のたびに「難問」の判定も安定しなかったため，難問レーンをすべての質問で並走させる形にした．',
          '分類の確信度: 確信度の段階で判定する方式をやめ，一定のスコアを超えたタグをすべて使う方式にした．2つの単元にスコアが割れたとき，大きなカテゴリに戻ってしまったため．',
          '2回の抽選のどちらかで一致すれば通す規則は削除した．checkerを引き直すことは，答えないはずの質問を通すことにしかならないため．',
        ],
        en: [
          'No RAG: for low latency, RAG (vector search over the policy) was ruled out of scope, and so was letting the model read files through tool calls; Python reads the bundle. The same material and unit always yield the same sections, so runs are comparable.',
          'Difficulty prediction rejected: tried routing questions predicted to be hard to a stronger model. No predictor met the adoption bar set in advance, and the "hard" labels were unstable from run to run, so the hard-question lane runs on every question instead.',
          'Classification confidence: replaced confidence tiers with using every tag above a score threshold, because a score split between two units fell back to the broad category.',
          'Removed the rule that passes a question if either of two checker draws agrees: redrawing a checker can only turn a refusal into a pass.',
        ],
      },
      content: { ja: [], en: [] },
    },
    {
      title: { ja: '見つかった問題と対処', en: 'Problems Found, and Fixes' },
      list: {
        ja: [
          '写真の一部が切れていても2つのモデルの答えが一致することがある → 問題全体が写っているかを直接確かめ，写っていなければ撮り直しを促す専用の結果で返す．',
          '1ページに複数の問題がある → 処理を止め，操作者が問題の枠を選ぶ．',
          '図を描くノードが遅いと解説全体が待たされた → 図は別スレッドで作り，答えを組み立てた後に回収する形にした．',
          'checkerの推論の深さを低くすると推論をほとんどせずに答え，誤答が出た → 推論の深さを中程度に上げた．',
        ],
        en: [
          'Two models can agree on a cropped photo → completeness is checked directly, and a dedicated result asks the student to retake the photo.',
          'A page with several problems → the run stops and the operator selects the problem box.',
          'A slow figure node held up the whole explanation → figures are built on a separate thread and collected after the answer is assembled.',
          'At low reasoning effort the checker answered with almost no reasoning and produced wrong answers → its reasoning effort was raised to medium.',
        ],
      },
      content: { ja: [], en: [] },
    },
  ],
  technologies: ['Python 3.12', 'uv', 'LangGraph', 'FastAPI', 'Pydantic', 'Jev', 'Open Knowledge Format (OKF)', 'OpenRouter', 'Apple Vision', 'Multi-vendor LLM', 'pytest'],
};
