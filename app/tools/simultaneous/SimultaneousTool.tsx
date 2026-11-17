"use client";

import { useState } from "react";
import { formatDecimal, formatFraction, makeFraction } from "../_lib/math";

interface SimulResult {
  kind: "unique" | "none" | "infinite";
  det: number;
  xNum: number;
  yNum: number;
  xText?: string;
  yText?: string;
  xDec?: string;
  yDec?: string;
}

function solve(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number,
): SimulResult {
  const det = a1 * b2 - a2 * b1;
  const xNum = c1 * b2 - c2 * b1;
  const yNum = a1 * c2 - a2 * c1;
  if (det === 0) {
    return {
      kind: xNum === 0 && yNum === 0 ? "infinite" : "none",
      det,
      xNum,
      yNum,
    };
  }
  const allInt = [a1, b1, c1, a2, b2, c2].every(Number.isInteger);
  return {
    kind: "unique",
    det,
    xNum,
    yNum,
    xText: allInt ? formatFraction(makeFraction(xNum, det)) : undefined,
    yText: allInt ? formatFraction(makeFraction(yNum, det)) : undefined,
    xDec: formatDecimal(xNum / det),
    yDec: formatDecimal(yNum / det),
  };
}

export default function SimultaneousTool() {
  const [a1, setA1] = useState("");
  const [b1, setB1] = useState("");
  const [c1, setC1] = useState("");
  const [a2, setA2] = useState("");
  const [b2, setB2] = useState("");
  const [c2, setC2] = useState("");
  const [result, setResult] = useState<SimulResult | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    const vals = [a1, b1, c1, a2, b2, c2];
    if (vals.some((v) => v.trim() === "")) {
      setError("すべての係数を入力してください");
      return;
    }
    setResult(
      solve(Number(a1), Number(b1), Number(c1), Number(a2), Number(b2), Number(c2)),
    );
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

  const row = (
    a: string,
    setA: (v: string) => void,
    b: string,
    setB: (v: string) => void,
    c: string,
    setC: (v: string) => void,
    mark: string,
  ) => (
    <div className="point-row">
      <span>{mark}</span>
      {field(a, setA, "a")}
      <span>x +</span>
      {field(b, setB, "b")}
      <span>y =</span>
      {field(c, setC, "c")}
    </div>
  );

  return (
    <div className="tool-card">
      {row(a1, setA1, b1, setB1, c1, setC1, "①")}
      {row(a2, setA2, b2, setB2, c2, setC2, "②")}
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          解く
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          {result.kind === "unique" && (
            <>
              <div className="steps">
                <div>
                  x = (c1×b2 - c2×b1) / (a1×b2 - a2×b1) = {result.xNum} /{" "}
                  {result.det}
                </div>
                <div>
                  y = (a1×c2 - a2×c1) / (a1×b2 - a2×b1) = {result.yNum} /{" "}
                  {result.det}
                </div>
              </div>
              <div className="equation final">
                x = {result.xText ?? result.xDec}、 y ={" "}
                {result.yText ?? result.yDec}
              </div>
              {result.xText && (
                <div className="tool-note">
                  小数では x ≒ {result.xDec}、 y ≒ {result.yDec}
                </div>
              )}
            </>
          )}
          {result.kind === "none" && (
            <div className="equation final">
              解はありません（2直線が平行です）
            </div>
          )}
          {result.kind === "infinite" && (
            <div className="equation final">
              解は無数にあります（2つの式は同じ直線です）
            </div>
          )}
        </div>
      )}
    </div>
  );
}
