import type { Metadata } from "next";
import AnimShell from "../_components/AnimShell";
import Reveal from "../_components/Reveal";

export const metadata: Metadata = { title: "案F スクロール連動 | アニメーション案" };

function WordRise({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="word-rise">
            <span style={{ animationDelay: `${base + i * 90}ms` }}>{w}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

const MARQUEE =
  "Esotereel — Rust / C++ / Qt · LilLiftBoard — iOS / Theos · ANTI-PAYWALL · No leaks here. Just code. · ";

export default function Page() {
  return (
    <AnimShell slug="f-scroll">
      <div className="anim-stage">
        <div className="anim-stage-inner">
          <h1 aria-label="No leaks here. Just code.">
            <WordRise text="No leaks here." />
            <br />
            <WordRise text="Just code." base={280} />
          </h1>
          <p className="subtitle">
            ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
          </p>
          <div className="anim-marquee" aria-hidden="true">
            <span className="anim-marquee-track">{MARQUEE.repeat(2)}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "28px 4px 8px" }}>
        <Reveal>
          <h2 style={{ fontSize: "1.3rem", margin: "8px 0 14px" }}>Projects（スクロールで出現）</h2>
        </Reveal>
        <div className="project-grid">
          <Reveal>
            <article className="project-card">
              <h3>Esotereel</h3>
              <p>プラグインで拡張できる動画編集アプリ。描画やエフェクトをプラグイン側で追加できる設計。</p>
              <ul className="tags"><li>Rust</li><li>C++</li><li>Qt</li></ul>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="project-card">
              <h3>LilLiftBoard</h3>
              <p>iPhoneのキーボードを持ち上げて、下の空きスペースにカスタムボタンを置ける tweak。</p>
              <ul className="tags"><li>iOS</li><li>Theos</li><li>v1.1.0 公開済み</li></ul>
            </article>
          </Reveal>
        </div>
        <p style={{ color: "var(--muted)", marginTop: 20, fontSize: "0.92rem" }}>
          ↓ もう少しスクロールすると次のカードもフェードインします
        </p>
        <div style={{ height: 220 }} />
        <Reveal>
          <article className="project-card">
            <h3>Tools</h3>
            <p>数学系ツール11件。こういう下の方の要素だけ、視界に入ったタイミングで動かすのがこの案の考え方です。</p>
          </article>
        </Reveal>
      </div>
    </AnimShell>
  );
}
