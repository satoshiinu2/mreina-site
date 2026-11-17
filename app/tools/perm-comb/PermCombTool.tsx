"use client";

import { useState } from "react";

function fact(n: number): bigint {
  let r = BigInt(1);
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
}

export default function PermCombTool() {
  const [vn, setVn] = useState("");
  const [vr, setVr] = useState("");
  const [result, setResult] = useState<{ p: string; c: string } | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    const n = Number(vn);
    const r = Number(vr);
    if (
      vn.trim() === "" ||
      vr.trim() === "" ||
      !Number.isInteger(n) ||
      !Number.isInteger(r) ||
      n < 0 ||
      r < 0 ||
      r > n ||
      n > 500
    ) {
      setError("0 ≦ r ≦ n ≦ 500 の整数を入力してください");
      return;
    }
    const p = fact(n) / fact(n - r);
    const c = fact(n) / (fact(r) * fact(n - r));
    setResult({ p: p.toString(), c: c.toString() });
  };

  const field = (value: string, set: (v: string) => void, label: string) => (
    <input
      type="number"
      className="tool-input num"
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={label}
      aria-label={label}
      min={0}
    />
  );

  return (
    <div className="tool-card">
      <div className="point-row">
        <span>n =</span>
        {field(vn, setVn, "n")}
        <span>r =</span>
        {field(vr, setVr, "r")}
      </div>
      <div className="tool-actions">
        <button type="button" className="tool-btn primary" onClick={calc}>
          計算
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          <div className="steps">
            <div>
              順列 nPr = n! / (n - r)! ={" "}
              <strong>{result.p}</strong> 通り
            </div>
            <div>
              組み合わせ nCr = n! / &#123; r! (n - r)! &#125; ={" "}
              <strong>{result.c}</strong> 通り
            </div>
          </div>
          <p className="tool-note">
            順列は並べる順番を区別し、組み合わせは区別しません。
          </p>
        </div>
      )}
    </div>
  );
}
