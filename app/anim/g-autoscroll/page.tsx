import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import AutoScrollTools from "../_components/AutoScrollTools";

export const metadata: Metadata = { title: "案G オートスクロール | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="g-autoscroll">
      <div style={{ padding: "28px 4px 8px" }}>
        <h2 style={{ fontSize: "1.3rem", margin: "8px 0 14px" }}>Tools（自動で往復スクロール）</h2>
        <AutoScrollTools />
        <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
          カード自体は一切動きません。列のほうをゆっくり自動スクロールさせて、端まで行ったら戻ってきます。
          触ると数秒止まります。
        </p>
      </div>
    </AnimShell>
  );
}
