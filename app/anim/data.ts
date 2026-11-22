export type AnimVariant = {
  slug: string;
  code: string;
  name: string;
  summary: string;
  merit: string;
  demerit: string;
  cost: "軽い" | "中" | "重い";
};

export const variants: AnimVariant[] = [
  {
    slug: "a-terminal",
    code: "A",
    name: "ターミナル / タイプライター",
    summary: "ヒーロー文がターミナル風に1文字ずつ打たれ、下に疑似ログが流れる。",
    merit: "「Just code.」の世界観に一番合う。ライブラリ不要で再現も簡単。",
    demerit: "毎回フルで打たれると再訪時に少し待たされる。短縮版が要る。",
    cost: "軽い",
  },
  {
    slug: "b-glitch",
    code: "B",
    name: "グリッチ / 文字デコード",
    summary: "読み込み時に文字がノイズから復号され、時々RGBずれのグリッチが入る。",
    merit: "ドメインの「leaks」ネタと相性がいい。一番インパクトがある。",
    demerit: "やり過ぎると読みにくく、安っぽく見えるリスク。頻度調整が必須。",
    cost: "軽い",
  },
  {
    slug: "c-wave",
    code: "C",
    name: "波メッシュ / Canvas",
    summary: "背景に正弦波のグリッドがうねる。Esotereelの頂点変形アイデアのWeb版。",
    merit: "開発者らしい個性が出る。マウスで波が反応する。",
    demerit: "Canvas常時描画でモバイルの電池・負荷が一番かかる。",
    cost: "重い",
  },
  {
    slug: "d-particles",
    code: "D",
    name: "パーティクル / 漏れ出す粒",
    summary: "小さな粒が下から漏れ出すように浮き上がり、近くの粒同士が線で繋がる。",
    merit: "「leak」を動きで表現できる。汎用ポートフォリオ感は強い。",
    demerit: "よくある演出で個性は弱め。粒の数が多いと重い。",
    cost: "中",
  },
  {
    slug: "e-aurora",
    code: "E",
    name: "オーロラ / グラデーション",
    summary: "ぼかした色の塊がゆっくり漂い、タイトルはグラデーションが流れる。CSSのみ。",
    merit: "一番無難に今っぽく、上品。本体へ採用しても失敗しにくい。",
    demerit: "個性は弱い。他サイトでもよく見る見た目になる。",
    cost: "軽い",
  },
  {
    slug: "f-scroll",
    code: "F",
    name: "スクロール連動 / 最小モーション",
    summary: "単語が下からせり上がり、カードはスクロールでフェードイン。下にマーキー。",
    merit: "実用性が最高。読みやすさを一切犠牲にせず、SEO・表示速度も無事。",
    demerit: "「アニメーション入れた感」は6案で一番控えめ。",
    cost: "軽い",
  },
  {
    slug: "g-autoscroll",
    code: "G",
    name: "Tools: オートスクロール（往復）",
    summary: "カードは動かさず、Toolsの列自体をゆっくり自動スクロールさせて端で往復させる。",
    merit: "「横に続きがある」が一目で伝わる。カードが透明になる系のバグが起きない。",
    demerit: "読んでいる最中に動くと邪魔。触ったら止める制御が必須。",
    cost: "軽い",
  },
  {
    slug: "h-scrolllink",
    code: "H",
    name: "Tools: 縦スクロール連動",
    summary: "ページの縦スクロールの進み具合に合わせて、Toolsの列が横に流れる。",
    merit: "自分で横に触らなくても全カードを見せられる。ページの動きと同期する一体感がある。",
    demerit: "この方式だと列を直接横に操作できない。意図せず動く感じが苦手な人もいる。",
    cost: "軽い",
  },
  {
    slug: "i-loopscroll",
    code: "I",
    name: "Tools: 無限ループスクロール",
    summary: "列がゆっくり流れ続け、最後のカードのあとに先頭が繋がって無限に続く。",
    merit: "マーキー的な賑やかさがあり、「続きがある」感は一番強い。",
    demerit: "常時動くので一番落ち着きがない。止める配慮は必須。",
    cost: "軽い",
  },
];
