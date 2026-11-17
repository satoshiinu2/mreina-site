"use client";

import { useState } from "react";

const FIX_DIGITS = 5;

function round(n: number): number {
  return parseFloat(n.toFixed(FIX_DIGITS));
}

function formatEquation(a: number, b: number): string {
  let slope: string;
  if (a === 0) slope = "";
  else if (a === 1) slope = "x";
  else if (a === -1) slope = "-x";
  else slope = `${a}x`;

  let intercept = "";
  if (a === 0) intercept = `${b}`;
  else if (b > 0) intercept = ` + ${b}`;
  else if (b < 0) intercept = ` - ${Math.abs(b)}`;

  return `y = ${slope}${intercept}`;
}

export default function LinearTool() {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [result, setResult] = useState<{ a: number; b: number } | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    if (x1 === "" || y1 === "" || x2 === "" || y2 === "") {
      setError("値を入力してください");
      return;
    }
    const p1 = { x: Number(x1), y: Number(y1) };
    const p2 = { x: Number(x2), y: Number(y2) };
    if (p1.x === p2.x) {
      setError("入力された値が不正です（xが同じ2点では一次関数になりません）");
      return;
    }
    if (p1.y === p2.y) {
      setResult({ a: 0, b: round(p1.y) });
      return;
    }
    const slope = (p1.y - p2.y) / (p1.x - p2.x);
    const intercept = p1.y - slope * p1.x;
    setResult({ a: round(slope), b: round(intercept) });
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setResult(null);
    setError("");
  };

  const num = (
    value: string,
    set: (v: string) => void,
    label: string,
  ) => (
    <input
      type="number"
      className="tool-input num"
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={label}
      aria-label={label}
    />
  );

  return (
    <div className="tool-card">
      <div className="point-row">
        <span>点A (</span>
        {num(x1, setX1, "x")}
        <span>,</span>
        {num(y1, setY1, "y")}
        <span>)</span>
      </div>
      <div className="point-row">
        <span>点B (</span>
        {num(x2, setX2, "x")}
        <span>,</span>
        {num(y2, setY2, "y")}
        <span>)</span>
      </div>
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          計算
        </button>
        <button type="button" className="tool-btn" onClick={reset}>
          リセット
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          <div className="equation">{formatEquation(result.a, result.b)}</div>
          <div className="tool-note">
            a = {result.a}、b = {result.b}（小数第{FIX_DIGITS}位まで）
          </div>
        </div>
      )}
    </div>
  );
}
