import type { Metadata } from "next";
import FactorizeTool from "./FactorizeTool";

export const metadata: Metadata = {
  title: "因数分解",
  description: "ax² + bx + c を (px + q)(rx + s) の形に因数分解するツール。",
};

export default function FactorizePage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">因数分解</h1>
      <FactorizeTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
