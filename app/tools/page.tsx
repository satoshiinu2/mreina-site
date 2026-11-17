import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ツール | satoshiinu",
  description: "数学系の小ツール置き場。電卓、一次関数、樹形図、根号の簡単化。",
};

const tools = [
  {
    name: "電卓",
    href: "/tools/calc",
    description: "ボタンを押して使うシンプルな電卓。π や累乗つき。",
  },
  {
    name: "一次関数をyをxの式で表す",
    href: "/tools/linear",
    description: "2点の座標から、直線の式 y = ax + b の a と b を求める。",
  },
  {
    name: "オート樹形図",
    href: "/tools/tree-diagram",
    description: "場合の数の樹形図を自動で描く。確率のテスト機能つき。",
  },
  {
    name: "根号の中をできるだけ簡単な自然数で表す",
    href: "/tools/sqrt",
    description: "√の中身を簡単にして、a√b の形にする。計算過程つき。",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="hero">
        <h1 className="page-title">ツール</h1>
        <p className="subtitle">
          数学系の小ツール置き場。前に作ったものを今のサイトに移植したもの。
        </p>
      </section>
      <section>
        <div className="project-grid">
          {tools.map((t) => (
            <article className="project-card" key={t.href}>
              <h3>
                <a href={t.href}>{t.name}</a>
              </h3>
              <p>{t.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
