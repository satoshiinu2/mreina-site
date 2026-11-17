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
      "iPhone のキーボードを持ち上げて、下の空きスペースにカスタムボタンを置けるようにする tweak。ジェイルブレイク環境向け。",
    tags: ["iOS", "Theos", "v1.0.0 公開済み"],
    url: "https://github.com/satoshiinu2/LilLiftBoard",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>
          No leaks here.
          <br />
          Just code.
        </h1>
        <p className="subtitle">
          satoshiinu の個人サイト。ドメインもこのサイトも思いつきで作りました。
          <br />
          中身は、開発中のアプリや作ったツールの置き場所です。
        </p>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.name}>
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
          ))}
        </div>
      </section>

      <section id="tools">
        <h2>Tools</h2>
        <div className="project-grid">
          <article className="project-card">
            <h3>
              <a href="/tools/calc">電卓</a>
            </h3>
            <p>ボタンを押して使うシンプルな電卓。π や累乗つき。</p>
          </article>
          <article className="project-card">
            <h3>
              <a href="/tools/linear">一次関数をyをxの式で表す</a>
            </h3>
            <p>2点の座標から、直線の式 y = ax + b の a と b を求める。</p>
          </article>
          <article className="project-card">
            <h3>
              <a href="/tools/tree-diagram">オート樹形図</a>
            </h3>
            <p>場合の数の樹形図を自動で描く。確率のテスト機能つき。</p>
          </article>
          <article className="project-card">
            <h3>
              <a href="/tools/sqrt">根号の中をできるだけ簡単な自然数で表す</a>
            </h3>
            <p>√の中身を簡単にして、a√b の形にする。計算過程つき。</p>
          </article>
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
