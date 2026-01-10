import React from 'react';

// Extended vendor types for Vendor Risk Radar
export interface VendorRadar extends VendorBase {
  id: string;
  name: string;
  category: 'critical' | 'strategic' | 'tactical' | 'commodity';
  sector: string;
  location: string;
  contact?: string;
  notes?: string;
  dataTypes: string[]; // PII, PHI, Financial, IP, Confidential, Public
  inherentRisk: number; // 0-100
  residualRisk: number; // 0-100
  sbomProfile?: SBOMProfile;
  createdAt: string;
  updatedAt: string;
}

export interface VendorBase {
  name: string;
  category?: 'critical' | 'strategic' | 'tactical' | 'commodity';
  sector?: string;
  location?: string;
  contact?: string;
  notes?: string;
  dataTypes?: string[];
  sbomProfile?: SBOMProfile;
}

export interface SBOMProfile {
  providesSoftware: boolean;
  sbomAvailable: boolean;
  sbomFormat?: string; // SPDX, CycloneDX, etc.
  openSourceExposure?: string;
}

export interface VendorPortfolio {
  vendors: VendorRadar[];
  stats: PortfolioStats;
}

export interface PortfolioStats {
  total: number;
  criticalCategory: number;
  criticalRisk: number;
  highRisk: number;
  sensitiveData: number;
  avgInherentRisk: number;
  sbomGaps: number;
  maxRisk: number;
}

export interface RiskDimension {
  id: string;
  name: string;
  shortName: string;
  description: string;
  weight: number;
  value: number;
  privacyRegulations: string[];
  protectionRequirements: string[];
}

export interface VendorCategory {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  commonUseCase: string;
  riskTemplate: { [key: string]: number };
  privacyImpact: string;
  commonRegulations: string[];
}
