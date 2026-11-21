import type { ReactNode } from "react";
import "../anim.css";
import { variants } from "../data";

export default function AnimShell({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const v = variants.find((x) => x.slug === slug);
  if (!v) return <>{children}</>;
  const idx = variants.indexOf(v);
  const prev = variants[idx - 1];
  const next = variants[idx + 1];

  return (
    <>
      <div className="anim-topbar">
        <a className="anim-back" href="/anim">← アニメーション案一覧</a>
        <span className="anim-badge">案{v.code} / 負荷: {v.cost}</span>
      </div>
      {children}
      <div className="anim-note">
        <p style={{ margin: "0 0 8px" }}>
          <strong>案{v.code}：{v.name}</strong> — {v.summary}
        </p>
        <p style={{ margin: "0 0 4px" }}>良い点：{v.merit}</p>
        <p style={{ margin: 0 }}>注意点：{v.demerit}</p>
      </div>
      <p style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <span>{prev ? <a href={`/anim/${prev.slug}`}>← 案{prev.code} {prev.name}</a> : <span />}</span>
        <span>{next ? <a href={`/anim/${next.slug}`}>案{next.code} {next.name} →</a> : null}</span>
      </p>
    </>
  );
}
