// Risk calculation utilities for Vendor Risk Radar
import type { VendorRadar, VendorBase } from '../types/vendorRadar';

const DATA_RISK_WEIGHTS: Record<string, number> = {
  'PII': 15,
  'PHI': 20,
  'Financial': 18,
  'IP': 16,
  'Confidential': 12,
  'Public': 0
};

const CATEGORY_RISK_BASE: Record<string, number> = {
  'critical': 70,
  'strategic': 50,
  'tactical': 30,
  'commodity': 10
};

/**
 * Calculate inherent risk score (0-100) based on vendor characteristics
 */
export const calculateInherentRisk = (vendor: Partial<VendorBase | VendorRadar>): number => {
  const category = vendor.category || 'tactical';
  let risk = CATEGORY_RISK_BASE[category] || 30;
  
  // Add data type risk
  const dataTypes = vendor.dataTypes || [];
  const dataRisk = dataTypes.reduce((sum, dt) => {
    return sum + (DATA_RISK_WEIGHTS[dt] || 0);
  }, 0);
  
  risk += Math.min(dataRisk, 30); // Cap data risk contribution at 30
  
  // SBOM gap penalty (EO 14028 compliance gap)
  if (vendor.sbomProfile?.providesSoftware && !vendor.sbomProfile?.sbomAvailable) {
    risk += 10;
  }
  
  return Math.min(Math.round(risk), 100);
};

/**
 * Calculate residual risk score (0-100) after considering mitigation factors
 */
export const calculateResidualRisk = (
  vendor: Partial<VendorBase | VendorRadar>,
  inherentRisk: number
): number => {
  let residual = inherentRisk;
  
  // Reduce risk if SBOM is available (positive signal)
  if (vendor.sbomProfile?.sbomAvailable) {
    residual -= 5;
  }
  
  // Additional mitigation factors can be added here:
  // - Compliance certifications (SOC 2, ISO 27001, etc.)
  // - Security controls in place
  // - Insurance coverage
  // - Contract terms
  
  return Math.max(Math.round(residual), 0);
};

/**
 * Get risk level from score
 */
export const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
  if (score <= 40) return 'Low';
  if (score <= 60) return 'Medium';
  if (score <= 80) return 'High';
  return 'Critical';
};

/**
 * Get compliance status from risk score
 */
export const getComplianceStatus = (score: number): 'Compliant' | 'Partial' | 'Non-Compliant' => {
  if (score <= 40) return 'Compliant';
  if (score <= 70) return 'Partial';
  return 'Non-Compliant';
};

/**
 * Calculate portfolio statistics
 */
export const calculatePortfolioStats = (vendors: VendorRadar[]) => {
  const total = vendors.length;
  const criticalCategory = vendors.filter(v => v.category === 'critical').length;
  const criticalRisk = vendors.filter(v => (v.residualRisk || 0) >= 90).length;
  const highRisk = vendors.filter(v => {
    const risk = v.residualRisk || v.inherentRisk || 0;
    return risk >= 70 && risk < 90;
  }).length;
  const sensitiveData = vendors.filter(v => 
    v.dataTypes?.some(dt => ['PII', 'PHI'].includes(dt))
  ).length;
  const avgInherentRisk = vendors.length > 0
    ? Math.round(vendors.reduce((sum, v) => sum + (v.inherentRisk || 0), 0) / vendors.length)
    : 0;
  const sbomGaps = vendors.filter(v => 
    v.sbomProfile?.providesSoftware && !v.sbomProfile?.sbomAvailable
  ).length;
  const maxRisk = vendors.reduce((max, v) => 
    Math.max(max, v.residualRisk || v.inherentRisk || 0), 0
  );

  return {
    total,
    criticalCategory,
    criticalRisk,
    highRisk,
    sensitiveData,
    avgInherentRisk,
    sbomGaps,
    maxRisk
  };
};
