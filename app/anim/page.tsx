import type { Metadata } from "next";
import "./anim.css";
import { variants } from "./data";

export const metadata: Metadata = {
  title: "アニメーション案 | mreina-tits-leaks.net",
  description: "トップページのアニメーション提案一覧（検討用・本体未反映）",
};

export default function AnimIndex() {
  return (
    <>
      <div className="anim-topbar">
        <a className="anim-back" href="/">← トップへ戻る</a>
        <span className="anim-badge">検討用 / 本体未反映</span>
      </div>
      <section className="hero" style={{ paddingBottom: 16 }}>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
          トップページ
          <br />
          アニメーション案
        </h1>
        <p className="subtitle">
          現行トップは静止画のみ。6案とも現行の文言・配色・カード配置を前提に、
          ヒーロー周りの動きだけを変えたモックです。気に入った案があれば本体へ移植します。
        </p>
      </section>
      <div className="anim-note">
        <strong>先に結論：</strong>
        無難に良くするなら E（オーロラ）か F（スクロール連動）。
        このサイトらしさを出すなら A（ターミナル）が一番合っています。
        B はネタとして強いけど常用は頻度を落とす前提、C / D はモバイル負荷が増えます。
        全案とも <code>prefers-reduced-motion</code> で動きを止める配慮入り。
      </div>
      <div className="anim-index-grid">
        {variants.map((v) => (
          <a className="anim-index-card" href={`/anim/${v.slug}`} key={v.slug}>
            <span className="anim-badge">案{v.code} ・ 負荷: {v.cost}</span>
            <h3>{v.name}</h3>
            <p>{v.summary}</p>
          </a>
        ))}
      </div>
    </>
  );
}
