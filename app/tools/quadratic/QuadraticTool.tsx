"use client";

import { useState } from "react";
import {
  formatDecimal,
  formatFraction,
  gcdAll,
  makeFraction,
  simplifySqrt,
} from "../_lib/math";

interface QuadResult {
  d: number;
  kind: "two" | "double" | "none";
  exact?: string[];
  decimals?: string[];
  doubleExact?: string;
}

/** (−b ± s√m) / den の形の解を文字列にする */
function radicalRoot(B: number, S: number, m: number, den: number, sign: 1 | -1): string {
  const sqrtPart = S === 1 ? `√${m}` : `${S}√${m}`;
  let num: string;
  if (B === 0) {
    num = sign > 0 ? sqrtPart : `-${sqrtPart}`;
  } else {
    num = `${B} ${sign > 0 ? "+" : "-"} ${sqrtPart}`;
  }
  return den === 1 ? num : `(${num}) / ${den}`;
}

function solve(a: number, b: number, c: number): QuadResult {
  const d = b * b - 4 * a * c;
  if (d < 0) return { d, kind: "none" };
  if (d === 0) {
    const f = makeFraction(-b, 2 * a);
    return {
      d,
      kind: "double",
      doubleExact: formatFraction(f),
      decimals: [formatDecimal(-b / (2 * a))],
    };
  }
  const sqrtD = Math.sqrt(d);
  const decimals = [
    formatDecimal((-b + sqrtD) / (2 * a)),
    formatDecimal((-b - sqrtD) / (2 * a)),
  ];
  const allInt =
    Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c);
  if (!allInt) return { d, kind: "two", decimals };

  const { a: s, inside: m } = simplifySqrt(d);
  if (m === 1) {
    const r1 = makeFraction(-b + s, 2 * a);
    const r2 = makeFraction(-b - s, 2 * a);
    return {
      d,
      kind: "two",
      exact: [formatFraction(r1), formatFraction(r2)],
      decimals,
    };
  }
  let B = -b;
  let S = s;
  let den = 2 * a;
  if (den < 0) {
    B = -B;
    den = -den;
  }
  const g = gcdAll([B, S, den]) || 1;
  B /= g;
  S /= g;
  den /= g;
  return {
    d,
    kind: "two",
    exact: [radicalRoot(B, S, m, den, 1), radicalRoot(B, S, m, den, -1)],
    decimals,
  };
}

export default function QuadraticTool() {
  const [va, setVa] = useState("");
  const [vb, setVb] = useState("");
  const [vc, setVc] = useState("");
  const [result, setResult] = useState<QuadResult | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    const a = Number(va);
    const b = Number(vb);
    const c = Number(vc);
    if (va.trim() === "" || vb.trim() === "" || vc.trim() === "") {
      setError("a、b、c を入力してください");
      return;
    }
    if (a === 0) {
      setError("a が 0 では二次方程式になりません");
      return;
    }
    setResult(solve(a, b, c));
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
        <span>= 0</span>
      </div>
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          解く
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          <div className="steps">
            <div>
              判別式 D = b² - 4ac = {result.d}
              {result.d > 0 && " ＞ 0 → 解は2つ"}
              {result.d === 0 && " = 0 → 重解"}
              {result.d < 0 && " ＜ 0 → 実数解なし"}
            </div>
            <div>x = &#123; -b ± √D &#125; / 2a</div>
          </div>
          {result.kind === "none" && (
            <div className="equation final">実数解はありません</div>
          )}
          {result.kind === "double" && (
            <div className="equation final">
              x = {result.doubleExact}（重解、約 {result.decimals?.[0]}）
            </div>
          )}
          {result.kind === "two" && (
            <div className="equation final">
              {result.exact ? (
                <>
                  x = {result.exact[0]}、 {result.exact[1]}
                  <div className="tool-note">
                    小数では約 {result.decimals?.[0]} と {result.decimals?.[1]}
                  </div>
                </>
              ) : (
                <>
                  x = {result.decimals?.[0]}、 {result.decimals?.[1]}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
