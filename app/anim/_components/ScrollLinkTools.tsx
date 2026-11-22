"use client";

import { useEffect, useRef } from "react";
import { tools } from "../../tools/tools-data";

export default function ScrollLinkTools() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = ref.current;
    if (!wrap || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.25;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.scrollLeft = p * (el.scrollWidth - el.clientWidth);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <div className="anim-tools anim-tools-noscroll" ref={ref}>
        {tools.map((t) => (
          <article className="project-card" key={t.href}>
            <h3>
              <a href={t.href}>{t.name}</a>
            </h3>
            <p>{t.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
