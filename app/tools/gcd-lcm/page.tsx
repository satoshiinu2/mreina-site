import type { Metadata } from "next";
import GcdLcmTool from "./GcdLcmTool";

export const metadata: Metadata = {
  title: "最大公約数・最小公倍数",
  description: "2〜3個の整数の最大公約数と最小公倍数を求めるツール。",
};

export default function GcdLcmPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">最大公約数・最小公倍数</h1>
      <GcdLcmTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
