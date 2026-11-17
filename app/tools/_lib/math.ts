export function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

export function gcdAll(nums: number[]): number {
  return nums.reduce((g, n) => gcd(g, n), 0);
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcd(a, b)) * b);
}

export interface Fraction {
  num: number;
  den: number; // always > 0, reduced
}

export function makeFraction(num: number, den: number): Fraction {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den) || 1;
  return { num: num / g, den: den / g };
}

export function formatFraction(f: Fraction): string {
  return f.den === 1 ? `${f.num}` : `${f.num}/${f.den}`;
}

export function fractionDecimal(f: Fraction): number {
  return f.num / f.den;
}

/** n = a² × inside となる a と inside を返す */
export function simplifySqrt(n: number): { a: number; inside: number } {
  let a = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++) {
    while (m % (i * i) === 0) {
      m /= i * i;
      a *= i;
    }
  }
  return { a, inside: m };
}

/** a√inside を文字列にする（inside=1 なら a のみ、a=1 なら √inside のみ） */
export function formatSqrt(a: number, inside: number): string {
  if (inside === 1) return `${a}`;
  if (a === 1) return `√${inside}`;
  return `${a}√${inside}`;
}

/** 小数を見やすい桁数で丸めて文字列にする */
export function formatDecimal(n: number, digits = 6): string {
  if (!Number.isFinite(n)) return "Error";
  return String(parseFloat(n.toFixed(digits)));
}
