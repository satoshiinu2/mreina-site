"use client";

import { useMemo, useState } from "react";
import { formatDecimal } from "../_lib/math";

const RANGE = 10;
const SIZE = 400;
const UNIT = SIZE / (RANGE * 2);

const px = (x: number) => (x + RANGE) * UNIT;
const py = (y: number) => (RANGE - y) * UNIT;

function buildPath(f: (x: number) => number): string[] {
  const paths: string[] = [];
  let current: string[] = [];
  for (let x = -RANGE; x <= RANGE + 1e-9; x += 0.05) {
    const y = f(x);
    if (Number.isFinite(y) && Math.abs(y) <= RANGE + 1) {
      current.push(
        `${current.length === 0 ? "M" : "L"}${px(x).toFixed(1)},${py(y).toFixed(1)}`,
      );
    } else if (current.length > 0) {
      paths.push(current.join(" "));
      current = [];
    }
  }
  if (current.length > 0) paths.push(current.join(" "));
  return paths;
}

export default function GraphTool() {
  const [type, setType] = useState<"linear" | "quadratic">("linear");
  const [va, setVa] = useState("1");
  const [vb, setVb] = useState("0");
  const [vc, setVc] = useState("0");

  const a = Number(va) || 0;
  const b = Number(vb) || 0;
  const c = Number(vc) || 0;

  const f = useMemo(
    () =>
      type === "linear"
        ? (x: number) => a * x + b
        : (x: number) => a * x * x + b * x + c,
    [type, a, b, c],
  );

  const paths = useMemo(() => buildPath(f), [f]);

  const markers: { x: number; y: number; label: string }[] = [];
  if (type === "linear") {
    if (a !== 0) {
      const xi = -b / a;
      if (Math.abs(xi) <= RANGE) markers.push({ x: xi, y: 0, label: `x切片 ${formatDecimal(xi, 3)}` });
    }
    if (Math.abs(b) <= RANGE) markers.push({ x: 0, y: b, label: `y切片 ${formatDecimal(b, 3)}` });
  } else if (a !== 0) {
    const vx = -b / (2 * a);
    const vy = f(vx);
    if (Math.abs(vx) <= RANGE && Math.abs(vy) <= RANGE)
      markers.push({ x: vx, y: vy, label: `頂点 (${formatDecimal(vx, 3)}, ${formatDecimal(vy, 3)})` });
  }

  const equation =
    type === "linear"
      ? `y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`
      : `y = ${a}x² ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;

  const field = (value: string, set: (v: string) => void, label: string) => (
    <input
      type="number"
      className="tool-input num"
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={label}
      aria-label={label}
      step="any"
    />
  );

  const gridLines = [];
  for (let i = -RANGE + 1; i < RANGE; i++) {
    if (i === 0) continue;
    gridLines.push(
      <line key={`v${i}`} x1={px(i)} y1={0} x2={px(i)} y2={SIZE} stroke="#262b36" strokeWidth={0.5} />,
      <line key={`h${i}`} x1={0} y1={py(i)} x2={SIZE} y2={py(i)} stroke="#262b36" strokeWidth={0.5} />,
    );
  }

  return (
    <div className="tool-card">
      <div className="tool-form-row">
        <label>
          関数の種類
          <select
            className="tool-input"
            value={type}
            onChange={(e) => setType(e.target.value as "linear" | "quadratic")}
          >
            <option value="linear">一次関数</option>
            <option value="quadratic">二次関数</option>
          </select>
        </label>
      </div>
      <div className="point-row">
        <span>y =</span>
        {field(va, setVa, "a")}
        {type === "linear" ? <span>x +</span> : <span>x² +</span>}
        {field(vb, setVb, "b")}
        {type === "linear" ? null : <span>x +</span>}
        {type === "quadratic" ? field(vc, setVc, "c") : null}
        {type === "linear" && <span className="tool-note">（b の欄が切片）</span>}
      </div>
      {type === "quadratic" && a === 0 && (
        <p className="tool-error">a が 0 では二次関数になりません</p>
      )}
      <div className="equation">{equation}</div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="graph-svg" role="img" aria-label={equation}>
        {gridLines}
        <line x1={px(0)} y1={0} x2={px(0)} y2={SIZE} stroke="#9aa1b1" strokeWidth={1} />
        <line x1={0} y1={py(0)} x2={SIZE} y2={py(0)} stroke="#9aa1b1" strokeWidth={1} />
        {[-10, -5, 5, 10].map((v) => (
          <text key={`tx${v}`} x={px(v)} y={py(0) + 12} className="graph-tick">
            {v}
          </text>
        ))}
        {[-10, -5, 5, 10].map((v) => (
          <text key={`ty${v}`} x={px(0) + 4} y={py(v) + 3} className="graph-tick">
            {v}
          </text>
        ))}
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#6ea8fe" strokeWidth={2} />
        ))}
        {markers.map((m, i) => (
          <g key={i}>
            <circle cx={px(m.x)} cy={py(m.y)} r={3.5} fill="#ff7b72" />
            <text x={px(m.x) + 7} y={py(m.y) - 7} className="graph-marker-label">
              {m.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="tool-note">表示範囲は x、y ともに -10 〜 10 です。</p>
    </div>
  );
}
