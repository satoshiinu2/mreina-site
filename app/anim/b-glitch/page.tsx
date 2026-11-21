import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import MockProjects from "../_components/MockProjects";
import ScrambleHero from "../_components/ScrambleHero";

export const metadata: Metadata = { title: "案B グリッチ | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="b-glitch">
      <ScrambleHero />
      <MockProjects />
    </AnimShell>
  );
}
