export default function MockProjects() {
  return (
    <div style={{ padding: "28px 4px 8px" }}>
      <h2 style={{ fontSize: "1.3rem", margin: "8px 0 14px" }}>Projects（ダミー配置）</h2>
      <div className="project-grid">
        <article className="project-card">
          <h3>Esotereel</h3>
          <p>プラグインで拡張できる動画編集アプリ。描画やエフェクトをプラグイン側で追加できる設計。</p>
          <ul className="tags">
            <li>Rust</li>
            <li>C++</li>
            <li>Qt</li>
          </ul>
        </article>
        <article className="project-card">
          <h3>LilLiftBoard</h3>
          <p>iPhoneのキーボードを持ち上げて、下の空きスペースにカスタムボタンを置ける tweak。</p>
          <ul className="tags">
            <li>iOS</li>
            <li>Theos</li>
            <li>v1.1.0 公開済み</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
