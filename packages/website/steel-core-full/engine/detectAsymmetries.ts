import type { SteelDimension, SteelDimensionScores, SteelAsymmetry } from '../types';

const DIMS: SteelDimension[] = ['political','economic','social','technological','environmental','legal'];
const MED = 15;

export function detectAsymmetries(scores: SteelDimensionScores): SteelAsymmetry[] {
  const vals = DIMS.map(d => scores[d]);
  const avg = vals.reduce((a,b)=>a+b,0) / vals.length;
  const out: SteelAsymmetry[] = [];

  if (scores.legal < avg - MED && (scores.technological > avg || scores.economic > avg)) {
    out.push({
      title: 'Strong execution with weak legal defensibility',
      description: 'Technology/investment outpace legal defensibility, creating liability risk.',
      dimensions: ['legal','technological','economic']
    });
  }
  if (scores.technological > avg + MED && scores.social < avg - MED) {
    out.push({
      title: 'Technical strength with human-layer fragility',
      description: 'Human-layer weaknesses may bypass strong controls.',
      dimensions: ['technological','social']
    });
  }
  if (scores.economic < avg - MED && (scores.political > avg || scores.technological > avg)) {
    out.push({
      title: 'Underweight financial governance of cyber risk',
      description: 'Financial quantification and alignment lag behind visible governance.',
      dimensions: ['economic','political','technological']
    });
  }
  if (scores.environmental < avg - MED && scores.political < avg - MED) {
    out.push({
      title: 'Geopolitical and environmental blind spot',
      description: 'Compound risks may be underestimated.',
      dimensions: ['environmental','political']
    });
  }

  if (!out.length) {
    const min = DIMS.reduce((a,d)=>scores[d]<scores[a]?d:a);
    const max = DIMS.reduce((a,d)=>scores[d]>scores[a]?d:a);
    if (scores[max]-scores[min] >= MED) {
      out.push({
        title: 'Unbalanced risk governance across dimensions',
        description: 'Marked imbalance creates hidden enterprise failure points.',
        dimensions: [min, max]
      });
    }
  }

  return out.slice(0,3);
}
