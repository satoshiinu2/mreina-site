import type { Metadata } from "next";
import CalcTool from "./CalcTool";

export const metadata: Metadata = {
  title: "電卓 | satoshiinu",
  description: "ボタンを押して使うシンプルな電卓。",
};

export default function CalcPage() {
  return (
    <section className="tool-wrap">
      <h1 className="page-title">電卓</h1>
      <CalcTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
