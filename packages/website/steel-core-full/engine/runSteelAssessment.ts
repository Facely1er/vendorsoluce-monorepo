import { computeSteelScore, SteelAnswers } from '../scoring/computeSteelScore';
import { classify } from './classify';
import { detectAsymmetries } from './detectAsymmetries';
import { generatePriorities } from './generatePriorities';
import questionnaireJson from '../questionnaire/steel-questionnaire.json';
import type { SteelAssessmentResult, SteelRadarPoint, SteelQuestionnaire, SteelDimension } from '../types';

const questionnaire = questionnaireJson as SteelQuestionnaire;
const DIMS: SteelDimension[] = ['political','economic','social','technological','environmental','legal'];

export function runSteelAssessment(
  answers: SteelAnswers,
  completedAt: string = new Date().toISOString()
): SteelAssessmentResult {
  const { dimensionScores, compositeScore } = computeSteelScore(answers);
  const classification = classify(compositeScore);
  const radar: SteelRadarPoint[] = DIMS.map(d => ({ dimension: d, value: Number(dimensionScores[d].toFixed(2)) }));
  return {
    questionnaireVersion: questionnaire.version,
    completedAt,
    dimensionScores: Object.fromEntries(DIMS.map(d=>[d, Number(dimensionScores[d].toFixed(2))])) as any,
    compositeScore: Number(compositeScore.toFixed(2)),
    classification,
    radar,
    asymmetries: detectAsymmetries(dimensionScores),
    priorities: generatePriorities(dimensionScores)
  };
}
