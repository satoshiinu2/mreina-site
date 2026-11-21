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
];
