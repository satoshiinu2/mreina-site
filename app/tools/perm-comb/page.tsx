import type { Metadata } from "next";
import PermCombTool from "./PermCombTool";

export const metadata: Metadata = {
  title: "順列・組み合わせ",
  description: "nPr（順列）と nCr（組み合わせ）を計算するツール。",
};

export default function PermCombPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">順列・組み合わせ</h1>
      <PermCombTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
