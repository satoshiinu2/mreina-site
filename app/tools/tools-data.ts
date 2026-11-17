export interface ToolInfo {
  name: string;
  href: string;
  description: string;
}

export const tools: ToolInfo[] = [
  {
    name: "一次関数をyをxの式で表す",
    href: "/tools/linear",
    description: "2点の座標から、直線の式 y = ax + b の a と b を求める。",
  },
  {
    name: "二次方程式ソルバー",
    href: "/tools/quadratic",
    description: "ax² + bx + c = 0 を解の公式で解く。途中式つき。",
  },
  {
    name: "連立方程式ソルバー",
    href: "/tools/simultaneous",
    description: "二元一次連立方程式の x と y を求める。",
  },
  {
    name: "因数分解",
    href: "/tools/factorize",
    description: "ax² + bx + c を (px + q)(rx + s) の形にする。",
  },
  {
    name: "素因数分解",
    href: "/tools/factorization",
    description: "整数を素数の積に分解する。割り算の過程つき。",
  },
  {
    name: "根号の中をできるだけ簡単な自然数で表す",
    href: "/tools/sqrt",
    description: "√の中身を簡単にして、a√b の形にする。計算過程つき。",
  },
  {
    name: "最大公約数・最小公倍数",
    href: "/tools/gcd-lcm",
    description: "2〜3個の整数の最大公約数と最小公倍数を求める。",
  },
  {
    name: "順列・組み合わせ",
    href: "/tools/perm-comb",
    description: "nPr（順列）と nCr（組み合わせ）を計算する。",
  },
  {
    name: "オート樹形図",
    href: "/tools/tree-diagram",
    description: "場合の数の樹形図を自動で描く。確率のテスト機能つき。",
  },
  {
    name: "関数グラフ描画",
    href: "/tools/graph",
    description: "一次関数・二次関数のグラフをその場で描く。",
  },
  {
    name: "三平方の定理",
    href: "/tools/pythagoras",
    description: "直角三角形の2辺から、残りの辺の長さを求める。",
  },
];
