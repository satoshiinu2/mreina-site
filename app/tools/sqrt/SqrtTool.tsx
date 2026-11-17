"use client";

import { useState } from "react";

type SqrtResult =
  | { kind: "steps"; a: number; inside: number }
  | { kind: "integer"; a: number }
  | { kind: "simple" };

function simplify(n: number): SqrtResult {
  let a = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++) {
    while (m % (i * i) === 0) {
      m /= i * i;
      a *= i;
    }
  }
  if (m === 1) return { kind: "integer", a };
  if (a === 1) return { kind: "simple" };
  return { kind: "steps", a, inside: m };
}

export default function SqrtTool() {
  const [input, setInput] = useState("");
  const [n, setN] = useState<number | null>(null);
  const [result, setResult] = useState<SqrtResult | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setN(null);
    setError("");
    const value = Number(input);
    if (input.trim() === "" || !Number.isInteger(value) || value <= 0) {
      setError("正の整数を入力してください");
      return;
    }
    setN(value);
    setResult(simplify(value));
  };

  return (
    <div className="tool-card">
      <div className="sqrt-input-row">
        <span className="sqrt-symbol">√</span>
        <input
          type="number"
          className="tool-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") calc();
          }}
          placeholder="ここに数字を入力"
          min={1}
        />
        <button type="button" className="tool-btn primary" onClick={calc}>
          計算
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && n !== null && (
        <div className="tool-result">
          {result.kind === "steps" && (
            <>
              <div className="equation">
                = √{result.a * result.a} × √{result.inside}
              </div>
              <div className="equation">
                = {result.a} × √{result.inside}
              </div>
              <div className="equation final">
                = {result.a}√{result.inside}
              </div>
            </>
          )}
          {result.kind === "integer" && (
            <div className="equation final">
              √{n} = {result.a}（√の外に出し切れます）
            </div>
          )}
          {result.kind === "simple" && (
            <div className="equation final">
              √{n} はこれ以上簡単にはなりません
            </div>
          )}
        </div>
      )}
    </div>
  );
}
