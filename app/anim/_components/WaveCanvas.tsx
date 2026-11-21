"use client";

import { useEffect, useRef } from "react";

export default function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const gap = 26;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      ctx.fillStyle = "rgba(110,168,254,0.55)";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * gap;
          const py = y * gap;
          const dist = Math.hypot(px - mouse.x, py - mouse.y);
          const boost = Math.max(0, 1 - dist / 180) * 10;
          const wave =
            Math.sin(px * 0.018 + t * 0.0012) * 6 +
            Math.cos(py * 0.022 + t * 0.0009) * 6 -
            boost;
          const r = 1.4 + Math.max(0, 1 - dist / 180) * 1.6;
          ctx.globalAlpha = 0.25 + Math.max(0, 1 - dist / 220) * 0.6;
          ctx.beginPath();
          ctx.arc(px, py + wave, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas className="anim-canvas" ref={ref} aria-hidden="true" />;
}
