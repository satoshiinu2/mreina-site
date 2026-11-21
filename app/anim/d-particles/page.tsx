import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import MockProjects from "../_components/MockProjects";
import ParticleCanvas from "../_components/ParticleCanvas";

export const metadata: Metadata = { title: "案D パーティクル | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="d-particles">
      <div className="anim-stage">
        <ParticleCanvas />
        <div className="anim-stage-inner">
          <h1>
            No leaks here.
            <br />
            Just code.
          </h1>
          <p className="subtitle">
            ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
            <br />
            粒が下から漏れ出すように浮かび上がります。
          </p>
        </div>
      </div>
      <MockProjects />
    </AnimShell>
  );
}
