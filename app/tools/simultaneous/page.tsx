import type { Metadata } from "next";
import SimultaneousTool from "./SimultaneousTool";

export const metadata: Metadata = {
  title: "連立方程式ソルバー",
  description: "二元一次連立方程式の x と y を求めるツール。",
};

export default function SimultaneousPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">連立方程式ソルバー</h1>
      <SimultaneousTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
