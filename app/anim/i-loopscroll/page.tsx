import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import LoopScrollTools from "../_components/LoopScrollTools";

export const metadata: Metadata = { title: "案I 無限ループスクロール | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="i-loopscroll">
      <div style={{ padding: "28px 4px 8px" }}>
        <h2 style={{ fontSize: "1.3rem", margin: "8px 0 14px" }}>Tools（無限ループ）</h2>
        <LoopScrollTools />
        <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
          列がゆっくり流れ続け、最後のカードのあとに先頭が繋がって無限に続きます。触ると数秒止まります。
        </p>
      </div>
    </AnimShell>
  );
}
