"use client";

import { useState } from "react";

type Op = "+" | "-" | "*" | "/" | "%" | "**";

function applyOp(a: number, b: number, op: Op): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "%":
      return a % b;
    case "**":
      return Math.pow(a, b);
  }
}

function format(n: number): string {
  if (!Number.isFinite(n) || Number.isNaN(n)) return "Error";
  return String(parseFloat(n.toPrecision(12)));
}

export default function CalcTool() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [op, setOp] = useState<Op | null>(null);
  const [waiting, setWaiting] = useState(false);

  const inputDigit = (d: string) => {
    if (waiting || display === "0" || display === "Error") {
      setDisplay(d);
      setWaiting(false);
    } else {
      setDisplay(display + d);
    }
  };

  const inputDot = () => {
    if (waiting || display === "Error") {
      setDisplay("0.");
      setWaiting(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const toggleSign = () => {
    if (display === "Error") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const inputPi = () => {
    setDisplay(String(Math.PI));
    setWaiting(false);
  };

  const backspace = () => {
    if (waiting || display === "Error") return;
    const next = display.slice(0, -1);
    setDisplay(next === "" || next === "-" ? "0" : next);
  };

  const clearEntry = () => setDisplay("0");

  const clearAll = () => {
    setDisplay("0");
    setStored(null);
    setOp(null);
    setWaiting(false);
  };

  const pressOp = (next: Op | "=") => {
    const current = parseFloat(display);
    if (Number.isNaN(current)) return;

    if (next === "=") {
      if (stored !== null && op !== null) {
        setDisplay(format(applyOp(stored, current, op)));
      }
      setStored(null);
      setOp(null);
      setWaiting(true);
      return;
    }

    if (stored !== null && op !== null && !waiting) {
      const result = applyOp(stored, current, op);
      setStored(result);
      setDisplay(format(result));
    } else {
      setStored(current);
    }
    setOp(next);
    setWaiting(true);
  };

  return (
    <div className="calc">
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        <button type="button" className="calc-btn op" onClick={backspace}>
          ⌫
        </button>
        <button type="button" className="calc-btn op" onClick={clearEntry}>
          CE
        </button>
        <button type="button" className="calc-btn op" onClick={clearAll}>
          C
        </button>
        <button type="button" className="calc-btn op" onClick={() => pressOp("/")}>
          ÷
        </button>
        <button type="button" className="calc-btn op" onClick={() => pressOp("%")}>
          %
        </button>

        <button type="button" className="calc-btn" onClick={() => inputDigit("7")}>
          7
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("8")}>
          8
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("9")}>
          9
        </button>
        <button type="button" className="calc-btn op" onClick={() => pressOp("*")}>
          ×
        </button>
        <button type="button" className="calc-btn op" onClick={() => pressOp("**")}>
          x²
        </button>

        <button type="button" className="calc-btn" onClick={() => inputDigit("4")}>
          4
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("5")}>
          5
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("6")}>
          6
        </button>
        <button type="button" className="calc-btn op" onClick={() => pressOp("-")}>
          -
        </button>
        <button type="button" className="calc-btn op" onClick={inputPi}>
          π
        </button>

        <button type="button" className="calc-btn" onClick={() => inputDigit("1")}>
          1
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("2")}>
          2
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("3")}>
          3
        </button>
        <button type="button" className="calc-btn op" onClick={() => pressOp("+")}>
          +
        </button>
        <span />

        <button type="button" className="calc-btn" onClick={toggleSign}>
          ±
        </button>
        <button type="button" className="calc-btn" onClick={() => inputDigit("0")}>
          0
        </button>
        <button type="button" className="calc-btn" onClick={inputDot}>
          .
        </button>
        <button type="button" className="calc-btn eq" onClick={() => pressOp("=")}>
          =
        </button>
        <span />
      </div>
      <p className="tool-note">
        x² は「前の数 ^ 今の数」の累乗（例： 2 x² 3 = で 8）。% は剰余。
      </p>
    </div>
  );
}
