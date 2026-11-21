import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import MockProjects from "../_components/MockProjects";

export const metadata: Metadata = { title: "案E オーロラ | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="e-aurora">
      <div className="anim-stage">
        <div className="aurora-blob b1" aria-hidden="true" />
        <div className="aurora-blob b2" aria-hidden="true" />
        <div className="aurora-blob b3" aria-hidden="true" />
        <div className="anim-stage-inner">
          <h1 className="aurora-title">
            No leaks here.
            <br />
            Just code.
          </h1>
          <p className="subtitle">
            ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
            <br />
            中身は、開発中のアプリや作ったツールです。JSなし・CSSのみで動きます。
          </p>
        </div>
      </div>
      <MockProjects />
    </AnimShell>
  );
}
