export function normalizeScore(avg: number): number {
  if (avg < 1 || avg > 4 || Number.isNaN(avg)) {
    throw new Error(`Invalid average score: ${avg}`);
  }
  return ((avg - 1) / 3) * 100;
}
