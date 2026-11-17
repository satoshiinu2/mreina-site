import type { Metadata } from "next";
import TreeTool from "./TreeTool";

export const metadata: Metadata = {
  title: "オート樹形図 | satoshiinu",
  description: "場合の数の樹形図を自動で描くツール。確率のテスト機能つき。",
};

export default function TreeDiagramPage() {
  return (
    <section className="tool-wrap wide">
      <h1 className="page-title">オート樹形図</h1>
      <p className="tool-desc">
        ことがら（カンマ区切り）と試行回数を入れると樹形図を描きます。
        確率の型を選んでテストすると、当てはまる場合が赤くなり確率が出ます。
      </p>
      <TreeTool />
      <p className="tool-back">
        <a href="/tools">← ツール一覧へ</a>
      </p>
    </section>
  );
}
