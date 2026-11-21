"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01";
const TARGETS = ["No leaks here.", "Just code."];

function scrambleFrame(target: string, progress: number): string {
  return target
    .split("")
    .map((ch, i) => {
      if (ch === " " || ch === ".") return ch;
      if (i / target.length < progress) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export default function ScrambleHero() {
  const [lines, setLines] = useState(TARGETS);
  const [glitch, setGlitch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const total = 42;
    const timer = setInterval(() => {
      frame += 1;
      const p = Math.min(1, frame / total);
      setLines(TARGETS.map((t) => scrambleFrame(t, p)));
      if (p >= 1) {
        clearInterval(timer);
        setLines(TARGETS);
      }
    }, 36);

    const glitchTimer = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 340);
    }, 3600);

    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  return (
    <div className={`anim-stage ${glitch ? "glitch-on" : ""}`} ref={ref}>
      <div className="anim-stage-inner">
        <h1 aria-label="No leaks here. Just code.">
          {lines.map((line, i) => (
            <span key={i}>
              <span className="glitch-wrap">
                <span className="glitch-text" data-text={TARGETS[i]}>
                  {line}
                </span>
              </span>
              {i === 0 && <br />}
            </span>
          ))}
        </h1>
        <p className="subtitle">
          ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
          <br />
          中身は、開発中のアプリや作ったツールです。
        </p>
      </div>
    </div>
  );
}
