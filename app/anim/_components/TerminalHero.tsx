"use client";

import { useEffect, useState } from "react";

const LINES = ["No leaks here.", "Just code."];
const LOGS = [
  "$ whoami",
  "satoshiinu",
  "$ ls ./projects",
  "esotereel  lilliftboard  tools/",
  "$ cat leaks.txt",
  "cat: leaks.txt: No such file or directory",
];

function useTypewriter() {
  const [text, setText] = useState<string[]>(["", ""]);
  const [logCount, setLogCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(LINES);
      setLogCount(LOGS.length);
      setDone(true);
      return;
    }
    let line = 0;
    let char = 0;
    let logTimer: ReturnType<typeof setInterval> | undefined;
    const timer = setInterval(() => {
      if (line >= LINES.length) {
        clearInterval(timer);
        setDone(true);
        let n = 0;
        logTimer = setInterval(() => {
          n += 1;
          setLogCount(n);
          if (n >= LOGS.length && logTimer) clearInterval(logTimer);
        }, 260);
        return;
      }
      char += 1;
      const current = LINES[line].slice(0, char);
      setText((prev) => {
        const nextState = [...prev];
        nextState[line] = current;
        return nextState;
      });
      if (char >= LINES[line].length) {
        line += 1;
        char = 0;
      }
    }, 55);
    return () => {
      clearInterval(timer);
      if (logTimer) clearInterval(logTimer);
    };
  }, []);

  return { text, logCount, done };
}

export default function TerminalHero() {
  const { text, logCount, done } = useTypewriter();
  return (
    <div className="anim-stage">
      <div className="anim-stage-inner">
        <h1 aria-label="No leaks here. Just code.">
          <span className="term-hero-line">{text[0]}</span>
          <br />
          <span className="term-hero-line">
            {text[1]}
            {!done && <span className="term-cursor" aria-hidden="true" />}
          </span>
        </h1>
        <p className="subtitle">
          ただのコード置き場。ドメインもこのサイトも思いつきで作りました。
        </p>
        <div className="term-window" aria-hidden="true">
          {LOGS.slice(0, logCount).map((l, i) => (
            <div className="term-line" key={i}>
              {l.startsWith("$") ? <b>{l}</b> : l}
            </div>
          ))}
          {done && (
            <div className="term-line">
              <b>$ </b>
              <span className="term-cursor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
