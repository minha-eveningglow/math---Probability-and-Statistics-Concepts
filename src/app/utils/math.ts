export function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function combination(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return result;
}

export function binomialProbability(n: number, k: number, p: number): number {
  const nCk = combination(n, k);
  return nCk * Math.pow(p, k) * Math.pow(1 - p, n - k);
}
