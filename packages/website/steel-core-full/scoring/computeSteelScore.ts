import questionnaireJson from '../questionnaire/steel-questionnaire.json';
import weightsJson from './weights.json';
import { normalizeScore } from '../engine/normalize';
import type { SteelDimension, SteelQuestionnaire, SteelDimensionScores } from '../types';

export type SteelAnswers = Record<string, number>;

const questionnaire = questionnaireJson as SteelQuestionnaire;
const weights = weightsJson as Record<SteelDimension, number>;

export interface SteelScoreComputation {
  dimensionScores: SteelDimensionScores;
  compositeScore: number;
}

export function computeSteelScore(answers: SteelAnswers): SteelScoreComputation {
  const sums: Record<SteelDimension, number> = {
    political: 0, economic: 0, social: 0, technological: 0, environmental: 0, legal: 0
  };
  const counts: Record<SteelDimension, number> = {
    political: 0, economic: 0, social: 0, technological: 0, environmental: 0, legal: 0
  };

  for (const q of questionnaire.questions) {
    const raw = answers[q.id];
    if (raw === undefined) throw new Error(`Missing answer for ${q.id}`);
    if (raw < 1 || raw > 4) throw new Error(`Invalid score ${raw} for ${q.id}`);
    sums[q.dimension] += raw;
    counts[q.dimension] += 1;
  }

  const dimensionScores: SteelDimensionScores = {
    political: 0, economic: 0, social: 0, technological: 0, environmental: 0, legal: 0
  };

  (Object.keys(sums) as SteelDimension[]).forEach((dim) => {
    if (!counts[dim]) throw new Error(`No questions for ${dim}`);
    dimensionScores[dim] = normalizeScore(sums[dim] / counts[dim]);
  });

  let composite = 0;
  (Object.keys(weights) as SteelDimension[]).forEach((dim) => {
    composite += dimensionScores[dim] * weights[dim];
  });

  return {
    dimensionScores,
    compositeScore: Math.max(0, Math.min(100, Number(composite.toFixed(2))))
  };
}
