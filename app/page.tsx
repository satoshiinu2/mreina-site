import Reveal from "./_components/Reveal";
import HSlide from "./_components/HSlide";
import { tools } from "./tools/tools-data";

type Project = {
  name: string;
  description: string;
  tags: string[];
  url: string;
};

const projects: Project[] = [
  {
    name: "Esotereel",
    description:
      "プラグインで拡張できる動画編集アプリ。クライアント／サーバー構成で、描画やエフェクトをプラグイン側で追加できる設計にしています。",
    tags: ["Rust", "C++", "Qt", "開発中"],
    url: "https://github.com/satoshiinu2/esotereel",
  },
  {
    name: "LilLiftBoard",
    description:
      "iPhone のキーボードを持ち上げて、下の空きスペースにカスタムボタンを置ける tweak。v1.1.0 ではドックボタンを左／中央／右の3グループに分けて、追加・並び替え・サイズ調整ができるようになりました。ジェイルブレイク環境向け。",
    tags: ["iOS", "Theos", "v1.1.0 公開済み"],
    url: "https://github.com/satoshiinu2/LilLiftBoard",
  },
];

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

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1 aria-label="No leaks here. Just code.">
          <WordRise text="No leaks here." />
          <br />
          <WordRise text="Just code." base={280} />
        </h1>
        <p className="subtitle">
          ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
          <br />
          中身は、開発中のアプリや作ったツールです。
        </p>
      </section>

      <div className="tag-marquee" aria-hidden="true">
        <span className="tag-marquee-track">{MARQUEE.repeat(2)}</span>
      </div>

      <section id="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article className="project-card">
                <h3>
                  <a href={p.url} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                </h3>
                <p>{p.description}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="tools">
        <h2>Tools</h2>
        <div className="tools-scroll" data-hscroll>
          {tools.map((t, i) => (
            <HSlide key={t.href} delay={Math.min(i, 3) * 70}>
              <article className="project-card">
                <h3>
                  <a href={t.href}>{t.name}</a>
                </h3>
                <p>{t.description}</p>
              </article>
            </HSlide>
          ))}
        </div>
        <p>
          <a href="/tools">→ ツール一覧</a>
        </p>
      </section>

      <section id="links">
        <h2>Links</h2>
        <ul className="link-list">
          <li>
            <a
              href="https://github.com/satoshiinu2"
              target="_blank"
              rel="noreferrer"
            >
              GitHub — satoshiinu2
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
