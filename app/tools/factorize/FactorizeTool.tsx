"use client";

import { useState } from "react";
import { gcdAll } from "../_lib/math";

function divisors(n: number): number[] {
  const out: number[] = [];
  const m = Math.abs(n);
  for (let i = 1; i * i <= m; i++) {
    if (m % i === 0) {
      out.push(i, -i);
      if (i !== m / i) out.push(m / i, -(m / i));
    }
  }
  return out;
}

function formatFactor(p: number, q: number): string {
  const xPart = p === 1 ? "x" : `${p}x`;
  if (q === 0) return xPart;
  return `${xPart} ${q > 0 ? "+" : "-"} ${Math.abs(q)}`;
}

interface FactorizeResult {
  common: number;
  text: string;
}

function factorize(a: number, b: number, c: number): FactorizeResult | null {
  const g = gcdAll([a, b, c]);
  const A = a / g;
  const B = b / g;
  const C = c / g;

  let inner: string | null = null;
  if (C === 0) {
    inner = `x(${formatFactor(A, B)})`;
  } else {
    outer: for (let p = 1; p <= A; p++) {
      if (A % p !== 0) continue;
      const r = A / p;
      for (const q of divisors(C)) {
        const s = C / q;
        if (p * s + q * r === B) {
          const f1 = formatFactor(p, q);
          const f2 = formatFactor(r, s);
          inner =
            f1 === f2 ? `(${f1})²` : `(${f1})(${f2})`;
          break outer;
        }
      }
    }
  }
  if (inner === null) return null;
  return { common: g, text: inner };
}

export default function FactorizeTool() {
  const [va, setVa] = useState("");
  const [vb, setVb] = useState("");
  const [vc, setVc] = useState("");
  const [result, setResult] = useState<FactorizeResult | null>(null);
  const [notFactorable, setNotFactorable] = useState(false);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setNotFactorable(false);
    setError("");
    const a = Number(va);
    const b = Number(vb);
    const c = Number(vc);
    if (
      va.trim() === "" ||
      vb.trim() === "" ||
      vc.trim() === "" ||
      ![a, b, c].every(Number.isInteger)
    ) {
      setError("a、b、c に整数を入力してください");
      return;
    }
    if (a <= 0) {
      setError("a は正の整数にしてください");
      return;
    }
    const r = factorize(a, b, c);
    if (r === null) setNotFactorable(true);
    else setResult(r);
  };

  const field = (value: string, set: (v: string) => void, label: string) => (
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
        {field(va, setVa, "a")}
        <span>x² +</span>
        {field(vb, setVb, "b")}
        <span>x +</span>
        {field(vc, setVc, "c")}
      </div>
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          因数分解
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {notFactorable && (
        <div className="tool-result">
          <div className="equation final">
            整数の範囲では因数分解できません
          </div>
        </div>
      )}
      {result && (
        <div className="tool-result">
          <div className="equation final">
            = {result.common !== 1 ? `${result.common}` : ""}
            {result.text}
          </div>
          {result.common !== 1 && (
            <div className="tool-note">
              共通因数 {result.common} をくくり出してから、たすき掛けで分解しています
            </div>
          )}
        </div>
      )}
    </div>
  );
}
