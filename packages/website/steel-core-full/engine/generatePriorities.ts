import type { SteelDimension, SteelDimensionScores, SteelPriority } from '../types';
const DIMS: SteelDimension[] = ['political','economic','social','technological','environmental','legal'];

export function generatePriorities(scores: SteelDimensionScores): SteelPriority[] {
  const ordered = [...DIMS].sort((a,b)=>scores[a]-scores[b]);
  const weakest = ordered.slice(0,3);
  const out: SteelPriority[] = [];
  let k = 1;

  if (weakest.includes('legal')) out.push({
    order: k++,
    statement: 'Strengthen legal and regulatory defensibility before scaling high-risk digital initiatives.',
    linkedDimensions: ['legal','economic','political']
  });
  if (weakest.includes('economic')) out.push({
    order: k++,
    statement: 'Align cyber and privacy investment with quantified financial impact.',
    linkedDimensions: ['economic','technological','political']
  });
  if (weakest.includes('social')) out.push({
    order: k++,
    statement: 'Elevate human-layer resilience to protect trust and bypass risk.',
    linkedDimensions: ['social','technological','legal']
  });
  if (weakest.includes('political')) out.push({
    order: k++,
    statement: 'Improve regulatory posture and geopolitical awareness.',
    linkedDimensions: ['political','legal','environmental']
  });
  if (weakest.includes('technological')) out.push({
    order: k++,
    statement: 'Re-architect critical technology dependencies to match risk appetite.',
    linkedDimensions: ['technological','economic','political']
  });
  if (weakest.includes('environmental')) out.push({
    order: k++,
    statement: 'Integrate physical and infrastructure disruption into cyber governance.',
    linkedDimensions: ['environmental','political','technological']
  });

  if (out.length < 3) out.push({
    order: k++,
    statement: 'Consolidate cyber, privacy, and enterprise risk governance into a single board agenda.',
    linkedDimensions: ['political','economic','legal']
  });

  return out.slice(0,5).map((p,i)=>({...p, order:i+1}));
}
