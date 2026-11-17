"use client";

import { useState } from "react";
import { gcdAll, lcm } from "../_lib/math";

interface GcdLcmResult {
  nums: number[];
  g: number;
  l: number;
  euclid: { a: number; b: number; q: number; r: number }[];
}

function euclidSteps(a: number, b: number) {
  const steps: GcdLcmResult["euclid"] = [];
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  while (y !== 0) {
    steps.push({ a: x, b: y, q: Math.floor(x / y), r: x % y });
    const t = x % y;
    x = y;
    y = t;
  }
  return steps;
}

export default function GcdLcmTool() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [result, setResult] = useState<GcdLcmResult | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    const raw = [v1, v2, v3].filter((v) => v.trim() !== "");
    const nums = raw.map(Number);
    if (
      nums.length < 2 ||
      nums.some((n) => !Number.isInteger(n) || n <= 0)
    ) {
      setError("正の整数を2つ以上入力してください");
      return;
    }
    const g = gcdAll(nums);
    const l = nums.reduce((acc, n) => lcm(acc, n), nums[0]);
    setResult({ nums, g, l, euclid: euclidSteps(nums[0], nums[1]) });
  };

  const field = (value: string, set: (v: string) => void, label: string) => (
    <input
      type="number"
      className="tool-input num"
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={label}
      aria-label={label}
      min={1}
    />
  );

  return (
    <div className="tool-card">
      <div className="point-row">
        {field(v1, setV1, "数1")}
        {field(v2, setV2, "数2")}
        {field(v3, setV3, "数3（任意）")}
      </div>
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          計算
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          <div className="equation">
            最大公約数： {result.g}
            <br />
            最小公倍数： {result.l}
          </div>
          <div className="tool-note">
            最初の2数の最大公約数（ユークリッドの互除法）：
          </div>
          <div className="steps">
            {result.euclid.map((s, i) => (
              <div key={i}>
                {s.a} = {s.b} × {s.q} + {s.r}
              </div>
            ))}
            <div>→ 最大公約数は {result.g}</div>
          </div>
        </div>
      )}
    </div>
  );
}
