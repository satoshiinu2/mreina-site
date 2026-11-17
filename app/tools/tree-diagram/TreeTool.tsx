"use client";

import { useMemo, useState } from "react";

type EventType = "all" | "select";
type ProbType = "sumItems" | "isItem" | "rangeItem";

interface TEvent {
  item: string;
  index: number;
}

interface TNode {
  id: string;
  event: TEvent | null;
  children: TNode[];
  path: TEvent[];
  x: number;
  y: number;
}

const MAX_LEAVES = 1500;
const COL_W = 88;
const ROW_H = 24;
const PAD = 16;

function buildTree(
  events: TEvent[],
  ways: number,
  type: EventType,
): TNode | null {
  let leafCount = 0;

  const build = (
    path: TEvent[],
    event: TEvent | null,
    id: string,
  ): TNode | null => {
    const node: TNode = { id, event, children: [], path, x: 0, y: 0 };
    if (path.length >= ways) {
      leafCount++;
      return leafCount > MAX_LEAVES ? null : node;
    }
    const used = new Set(path.map((e) => e.index));
    const candidates =
      type === "select" ? events.filter((e) => !used.has(e.index)) : events;
    for (let i = 0; i < candidates.length; i++) {
      const child = build([...path, candidates[i]], candidates[i], `${id}-${i}`);
      if (child === null) return null;
      node.children.push(child);
    }
    if (node.children.length === 0) {
      leafCount++;
      if (leafCount > MAX_LEAVES) return null;
    }
    return node;
  };

  return build([], null, "root");
}

function layout(root: TNode): { leaves: TNode[]; nodes: TNode[] } {
  const leaves: TNode[] = [];
  const nodes: TNode[] = [];
  let slot = 0;

  const walk = (node: TNode, depth: number) => {
    nodes.push(node);
    node.x = PAD + depth * COL_W;
    if (node.children.length === 0) {
      node.y = PAD + slot * ROW_H;
      slot++;
      leaves.push(node);
      return;
    }
    for (const child of node.children) walk(child, depth + 1);
    node.y =
      (node.children[0].y + node.children[node.children.length - 1].y) / 2;
  };

  walk(root, 0);
  return { leaves, nodes };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function TreeTool() {
  const [eventType, setEventType] = useState<EventType>("all");
  const [itemsText, setItemsText] = useState("R,R,W,W,W");
  const [ways, setWays] = useState(2);
  const [tree, setTree] = useState<TNode | null>(null);
  const [error, setError] = useState("");

  const [probType, setProbType] = useState<ProbType>("isItem");
  const [probValue, setProbValue] = useState("R");
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [prob, setProb] = useState<{ count: number; total: number } | null>(
    null,
  );

  const laid = useMemo(() => (tree ? layout(tree) : null), [tree]);

  const makeTree = () => {
    setError("");
    setFlagged(new Set());
    setProb(null);
    const items = itemsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    if (items.length === 0) {
      setError("ことがらを入力してください");
      setTree(null);
      return;
    }
    const events = items.map((item, index) => ({ item, index }));
    const built = buildTree(events, Math.max(1, ways), eventType);
    if (built === null) {
      setError(
        `場合の数が多すぎます（葉が${MAX_LEAVES}を超えます）。ことがらか試行回数を減らしてください`,
      );
      setTree(null);
      return;
    }
    setTree(built);
  };

  const testProbability = () => {
    if (!tree || !laid) {
      setError("まず樹形図を作ってください");
      return;
    }
    setError("");
    const leaves = laid.leaves;
    let matched: TNode[] = [];
    if (probType === "isItem") {
      const names = probValue.split(",").map((s) => s.trim());
      matched = leaves.filter(
        (leaf) => leaf.event && names.includes(leaf.event.item),
      );
    } else {
      const [minStr, maxStr] = probValue.split(",");
      const min = Number(minStr);
      const max = maxStr === undefined ? min : Number(maxStr);
      if (Number.isNaN(min) || Number.isNaN(max)) {
        setError("範囲は「最小,最大」の形で入力してください");
        return;
      }
      if (probType === "sumItems") {
        matched = leaves.filter((leaf) => {
          const sum = leaf.path.reduce((s, e) => s + Number(e.item), 0);
          return sum >= min && sum <= max;
        });
      } else {
        matched = leaves.filter((leaf) => {
          const v = Number(leaf.event?.item);
          return v >= min && v <= max;
        });
      }
    }
    setFlagged(new Set(matched.map((n) => n.id)));
    setProb({ count: matched.length, total: leaves.length });
  };

  const width = laid ? PAD * 2 + (ways + 1) * COL_W : 0;
  const height = laid ? PAD * 2 + laid.leaves.length * ROW_H : 0;

  return (
    <div className="tool-card">
      <div className="tool-form-row">
        <label>
          ことがらの型
          <select
            className="tool-input"
            value={eventType}
            onChange={(e) => setEventType(e.target.value as EventType)}
          >
            <option value="all">すべて</option>
            <option value="select">同時にとる</option>
          </select>
        </label>
        <label className="grow">
          ことがら
          <input
            type="text"
            className="tool-input"
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
          />
        </label>
        <label>
          試行回数
          <input
            type="number"
            className="tool-input num"
            value={ways}
            min={1}
            max={6}
            onChange={(e) => setWays(Number(e.target.value))}
          />
        </label>
        <button type="button" className="tool-btn primary" onClick={makeTree}>
          作成
        </button>
      </div>

      <div className="tool-form-row">
        <label>
          確率の型
          <select
            className="tool-input"
            value={probType}
            onChange={(e) => setProbType(e.target.value as ProbType)}
          >
            <option value="sumItems">和が</option>
            <option value="isItem">名前が</option>
            <option value="rangeItem">数値が</option>
          </select>
        </label>
        <label className="grow">
          値{probType === "isItem" ? "（名前、カンマ区切り）" : "（最小,最大）"}
          <input
            type="text"
            className="tool-input"
            value={probValue}
            onChange={(e) => setProbValue(e.target.value)}
          />
        </label>
        <span className="prob-suffix">
          {probType === "isItem" ? "なら" : "の範囲内なら"}
        </span>
        <button
          type="button"
          className="tool-btn primary"
          onClick={testProbability}
        >
          テスト
        </button>
        {prob && (
          <span className="prob-result">
            確率： {prob.count} / {prob.total}
            {prob.total > 0 && prob.count > 0
              ? ` = ${prob.count / gcd(prob.count, prob.total)} / ${prob.total / gcd(prob.count, prob.total)}`
              : ""}
            （約 {(prob.total ? prob.count / prob.total : 0).toFixed(4)}）
          </span>
        )}
      </div>

      {error && <p className="tool-error">{error}</p>}

      {laid && tree && (
        <div className="tree-scroll">
          <svg width={width} height={height} className="tree-svg">
            {laid.nodes.map((node) =>
              node.children.map((child) => (
                <line
                  key={`${node.id}->${child.id}`}
                  x1={node.x + 10}
                  y1={node.y + 4}
                  x2={child.x - 2}
                  y2={child.y + 4}
                  stroke="#9a9a9a"
                  strokeWidth={1}
                />
              )),
            )}
            {laid.nodes
              .filter((node) => node.event !== null)
              .map((node) => (
                <text
                  key={node.id}
                  x={node.x}
                  y={node.y + 4}
                  className={
                    flagged.has(node.id) ? "tree-label hit" : "tree-label"
                  }
                >
                  {node.event?.item}
                </text>
              ))}
          </svg>
        </div>
      )}
      <p className="tool-note">
        「同時にとる」は、同じものを2回使わない引き方（番号で区別するので同名でも別物として扱います）。
      </p>
    </div>
  );
}
