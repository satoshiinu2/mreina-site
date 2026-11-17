import type { Metadata } from "next";
import PythagorasTool from "./PythagorasTool";

export const metadata: Metadata = {
  title: "三平方の定理",
  description: "直角三角形の2辺から残りの辺の長さを求めるツール。",
};

export default function PythagorasPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">三平方の定理</h1>
      <PythagorasTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
