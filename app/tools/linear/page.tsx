import type { Metadata } from "next";
import LinearTool from "./LinearTool";

export const metadata: Metadata = {
  title: "一次関数をyをxの式で表す | satoshiinu",
  description: "2点の座標から直線の式 y = ax + b を求めるツール。",
};

export default function LinearPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">一次関数をyをxの式で表す</h1>
      <p className="tool-desc">
        「そのグラフが次のような直線になるとき、yをxの式で表しなさい」みたいな問題を解くのにつかいます。
      </p>
      <LinearTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
