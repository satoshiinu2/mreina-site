import type { Metadata } from "next";
import QuadraticTool from "./QuadraticTool";

export const metadata: Metadata = {
  title: "二次方程式ソルバー",
  description: "ax² + bx + c = 0 を解の公式で解くツール。途中式つき。",
};

export default function QuadraticPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">二次方程式ソルバー</h1>
      <QuadraticTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
