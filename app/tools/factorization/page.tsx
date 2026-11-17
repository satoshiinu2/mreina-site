import type { Metadata } from "next";
import FactorizationTool from "./FactorizationTool";

export const metadata: Metadata = {
  title: "素因数分解 | satoshiinu",
  description: "整数を素数の積に分解するツール。割り算の過程つき。",
};

export default function FactorizationPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">素因数分解</h1>
      <FactorizationTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
