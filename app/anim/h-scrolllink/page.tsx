import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import ScrollLinkTools from "../_components/ScrollLinkTools";

export const metadata: Metadata = { title: "案H 縦スクロール連動 | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="h-scrolllink">
      <div style={{ height: 160 }} />
      <div style={{ padding: "28px 4px 8px" }}>
        <h2 style={{ fontSize: "1.3rem", margin: "8px 0 14px" }}>Tools（縦スクロールで横に流れる）</h2>
        <ScrollLinkTools />
        <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
          この列は直接横に触れません。ページを上下にスクロールすると、その進み具合に合わせて列が横に流れます。
          下の余白を使って行ったり来たりしてみてください。
        </p>
      </div>
      <div style={{ height: 420 }} />
    </AnimShell>
  );
}
