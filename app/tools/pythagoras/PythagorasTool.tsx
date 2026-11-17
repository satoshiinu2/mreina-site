"use client";

import { useState } from "react";
import { formatDecimal, formatSqrt, simplifySqrt } from "../_lib/math";

interface PythResult {
  steps: string;
  exact: string | null;
  decimal: string;
  target: string;
}

export default function PythagorasTool() {
  const [mode, setMode] = useState<"hyp" | "leg">("hyp");
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [result, setResult] = useState<PythResult | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    const x = Number(v1);
    const y = Number(v2);
    if (v1.trim() === "" || v2.trim() === "" || x <= 0 || y <= 0) {
      setError("正の数を2つ入力してください");
      return;
    }
    let v: number;
    let steps: string;
    let target: string;
    if (mode === "hyp") {
      v = x * x + y * y;
      steps = `c² = a² + b² = ${x}² + ${y}² = ${formatDecimal(v)}`;
      target = "c";
    } else {
      if (x <= y) {
        setError("斜辺 c は他の辺より長くしてください");
        return;
      }
      v = x * x - y * y;
      steps = `b² = c² - a² = ${x}² - ${y}² = ${formatDecimal(v)}`;
      target = "b";
    }
    const exact =
      Number.isInteger(x) && Number.isInteger(y)
        ? (() => {
            const { a, inside } = simplifySqrt(Math.round(v));
            return formatSqrt(a, inside);
          })()
        : null;
    setResult({
      steps,
      exact,
      decimal: formatDecimal(Math.sqrt(v)),
      target,
    });
  };

  const field = (value: string, set: (v: string) => void, label: string) => (
    <input
      type="number"
      className="tool-input num"
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={label}
      aria-label={label}
      step="any"
      min={0}
    />
  );

  return (
    <div className="tool-card">
      <div className="tool-form-row">
        <label>
          求める辺
          <select
            className="tool-input"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as "hyp" | "leg");
              setResult(null);
              setError("");
            }}
          >
            <option value="hyp">斜辺 c</option>
            <option value="leg">他の辺 b</option>
          </select>
        </label>
      </div>
      {mode === "hyp" ? (
        <div className="point-row">
          <span>a =</span>
          {field(v1, setV1, "a")}
          <span>b =</span>
          {field(v2, setV2, "b")}
        </div>
      ) : (
        <div className="point-row">
          <span>c（斜辺）=</span>
          {field(v1, setV1, "c")}
          <span>a =</span>
          {field(v2, setV2, "a")}
        </div>
      )}
      <svg viewBox="0 0 240 190" className="pyth-svg" role="img" aria-label="直角三角形">
        <polygon points="50,150 210,150 50,40" fill="none" stroke="#9aa1b1" strokeWidth={1.5} />
        <polyline points="50,132 68,132 68,150" fill="none" stroke="#9aa1b1" strokeWidth={1} />
        <text x={28} y={100} className="graph-tick">a</text>
        <text x={125} y={172} className="graph-tick">b</text>
        <text x={140} y={88} className="graph-tick">c</text>
      </svg>
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          計算
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          <div className="steps">
            <div>{result.steps}</div>
          </div>
          <div className="equation final">
            {result.target} = {result.exact ?? `約 ${result.decimal}`}
            {result.exact && result.exact !== result.decimal && (
              <span className="tool-note"> （約 {result.decimal}）</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
