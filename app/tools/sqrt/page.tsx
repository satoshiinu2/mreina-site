import type { Metadata } from "next";
import SqrtTool from "./SqrtTool";

export const metadata: Metadata = {
  title: "根号の中をできるだけ簡単な自然数で表す | satoshiinu",
  description: "√の中身を簡単にして a√b の形にするツール。計算過程つき。",
};

export default function SqrtPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">根号の中をできるだけ簡単な自然数で表す</h1>
      <SqrtTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
