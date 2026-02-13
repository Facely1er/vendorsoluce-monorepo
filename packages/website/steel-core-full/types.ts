export type SteelDimension =
  | 'political'
  | 'economic'
  | 'social'
  | 'technological'
  | 'environmental'
  | 'legal';

export type SteelScore = 1 | 2 | 3 | 4;

export interface SteelOption {
  id: string;
  label: string;
  score: SteelScore;
  order: number;
}

export interface SteelQuestion {
  id: string;
  dimension: SteelDimension;
  order: number;
  text: string;
  options: SteelOption[];
}

export interface SteelQuestionnaire {
  version: string;
  createdAt: string;
  dimensions: SteelDimension[];
  questions: SteelQuestion[];
}

export interface SteelDimensionScores {
  political: number;
  economic: number;
  social: number;
  technological: number;
  environmental: number;
  legal: number;
}

export type SteelClassification =
  | 'Exposed'
  | 'Reactive'
  | 'Imbalanced'
  | 'Aligned'
  | 'Resilient';

export interface SteelRadarPoint {
  dimension: SteelDimension;
  value: number;
}

export interface SteelAsymmetry {
  title: string;
  description: string;
  dimensions: SteelDimension[];
}

export interface SteelPriority {
  order: number;
  statement: string;
  linkedDimensions: SteelDimension[];
  executionChannels?: string[];
}

export interface SteelAssessmentResult {
  questionnaireVersion: string;
  completedAt: string;
  dimensionScores: SteelDimensionScores;
  compositeScore: number;
  classification: SteelClassification;
  radar: SteelRadarPoint[];
  asymmetries: SteelAsymmetry[];
  priorities: SteelPriority[];
}
