import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import MockProjects from "../_components/MockProjects";
import TerminalHero from "../_components/TerminalHero";

export const metadata: Metadata = { title: "案A ターミナル | アニメーション案" };

export default function Page() {
  return (
    <AnimShell slug="a-terminal">
      <TerminalHero />
      <MockProjects />
    </AnimShell>
  );
}
