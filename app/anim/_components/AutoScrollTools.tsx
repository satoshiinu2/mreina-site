"use client";

import { useEffect, useRef } from "react";
import { tools } from "../../tools/tools-data";

export default function AutoScrollTools() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let dir = 1;
    let visible = false;
    let holdUntil = 0;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    const hold = () => {
      holdUntil = performance.now() + 3500;
    };
    el.addEventListener("pointerdown", hold);
    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("touchstart", hold, { passive: true });

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (visible && now > holdUntil) {
        const max = el.scrollWidth - el.clientWidth;
        let next = el.scrollLeft + dir * 0.045 * dt;
        if (next >= max) {
          next = max;
          dir = -1;
        } else if (next <= 0) {
          next = 0;
          dir = 1;
        }
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("wheel", hold);
      el.removeEventListener("touchstart", hold);
    };
  }, []);

  return (
    <div className="anim-tools" ref={ref}>
      {tools.map((t) => (
        <article className="project-card" key={t.href}>
          <h3>
            <a href={t.href}>{t.name}</a>
          </h3>
          <p>{t.description}</p>
        </article>
      ))}
    </div>
  );
}
