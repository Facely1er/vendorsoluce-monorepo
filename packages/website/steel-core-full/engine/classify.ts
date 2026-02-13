import type { SteelClassification } from '../types';

export function classify(score: number): SteelClassification {
  if (score < 40) return 'Exposed';
  if (score < 60) return 'Reactive';
  if (score < 75) return 'Imbalanced';
  if (score < 90) return 'Aligned';
  return 'Resilient';
}
