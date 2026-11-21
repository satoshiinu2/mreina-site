import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import MockProjects from "../_components/MockProjects";
import WaveCanvas from "../_components/WaveCanvas";

export const metadata: Metadata = { title: "案C 波メッシュ | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="c-wave">
      <div className="anim-stage">
        <WaveCanvas />
        <div className="anim-stage-inner">
          <h1>
            No leaks here.
            <br />
            Just code.
          </h1>
          <p className="subtitle">
            ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
            <br />
            背景のドットが波打って、マウスに反応します（スマホは自動でうねるだけ）。
          </p>
        </div>
      </div>
      <MockProjects />
    </AnimShell>
  );
}
