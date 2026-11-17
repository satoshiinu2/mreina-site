import type { Metadata } from "next";
import GraphTool from "./GraphTool";

export const metadata: Metadata = {
  title: "関数グラフ描画 | satoshiinu",
  description: "一次関数・二次関数のグラフをその場で描くツール。",
};

export default function GraphPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">関数グラフ描画</h1>
      <GraphTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
