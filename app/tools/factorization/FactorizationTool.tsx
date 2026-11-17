"use client";

import { useState } from "react";

interface FactorResult {
  n: number;
  steps: { divisor: number; from: number; to: number }[];
  factors: [number, number][]; // [prime, exponent]
  isPrime: boolean;
}

function factorize(n: number): FactorResult {
  const steps: FactorResult["steps"] = [];
  const counts = new Map<number, number>();
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    while (m % p === 0) {
      steps.push({ divisor: p, from: m, to: m / p });
      counts.set(p, (counts.get(p) ?? 0) + 1);
      m /= p;
    }
  }
  if (m > 1) counts.set(m, (counts.get(m) ?? 0) + 1);
  return {
    n,
    steps,
    factors: [...counts.entries()],
    isPrime: counts.size === 1 && counts.get(n) === 1,
  };
}

export default function FactorizationTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<FactorResult | null>(null);
  const [error, setError] = useState("");

  const calc = () => {
    setResult(null);
    setError("");
    const value = Number(input);
    if (
      input.trim() === "" ||
      !Number.isInteger(value) ||
      value < 2 ||
      value > 1_000_000_000_000
    ) {
      setError("2以上1兆以下の整数を入力してください");
      return;
    }
    setResult(factorize(value));
  };

  return (
    <div className="tool-card">
      <div className="sqrt-input-row">
        <input
          type="number"
          className="tool-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") calc();
          }}
          placeholder="ここに数字を入力"
          min={2}
        />
        <button type="button" className="tool-btn primary" onClick={calc}>
          分解
        </button>
      </div>
      {error && <p className="tool-error">{error}</p>}
      {result && (
        <div className="tool-result">
          {result.isPrime ? (
            <div className="equation final">{result.n} は素数です</div>
          ) : (
            <>
              <div className="steps">
                {result.steps.map((s, i) => (
                  <div key={i}>
                    {s.from} ÷ {s.divisor} = {s.to}
                  </div>
                ))}
              </div>
              <div className="equation final">
                {result.n} ={" "}
                {result.factors
                  .map(([p, e]) => (e === 1 ? `${p}` : `${p}^${e}`))
                  .join(" × ")}
              </div>
              <div className="tool-note">
                素因数：{" "}
                {result.factors
                  .map(([p, e]) => Array(e).fill(p).join(" × "))
                  .join(" × ")}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
