import type { Metadata } from "next";
import { tools } from "./tools-data";

export const metadata: Metadata = {
  title: "ツール",
  description: "数学系の小ツール置き場。関数、方程式、確率、図形など。",
};

export default function ToolsPage() {
  return (
    <>
      <section className="hero">
        <h1 className="page-title">ツール</h1>
        <p className="subtitle">
          数学系の小ツール置き場。前に作ったものの移植と、新しく足したもの。
        </p>
      </section>
      <section>
        <div className="project-grid">
          {tools.map((t) => (
            <article className="project-card" key={t.href}>
              <h3>
                <a href={t.href}>{t.name}</a>
              </h3>
              <p>{t.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
