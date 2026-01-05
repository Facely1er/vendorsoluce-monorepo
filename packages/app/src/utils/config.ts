/**
 * Configuration management for the application
 */

import { isVendorPortalDomain } from './domainDetection';

interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  app: {
    env: string;
    version: string;
    name: string;
    isDemo: boolean;
    isTrial: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  vendorPortal: {
    domain: string;
    url: string;
  };
  features: {
    vendorAssessments: boolean;
    advancedAnalytics: boolean;
    performanceMonitoring: boolean;
  };
  analytics: {
    gaId?: string;
    enabled: boolean;
  };
  rateLimiting: {
    maxRequests: number;
    windowMs: number;
  };
}

// Get environment variables - SECURITY: No hardcoded fallbacks
// All credentials must be provided via environment variables
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  
  // In production, fail fast if required variables are missing
  if (import.meta.env.PROD && !value) {
    console.error(`Missing required environment variable: ${key}`);
    throw new Error(`Missing required environment variable: ${key}. Please configure it in your deployment platform.`);
  }
  
  // In development, allow empty string but warn if missing
  if (import.meta.env.DEV && !value && !defaultValue) {
    console.warn(`⚠️  Missing environment variable: ${key}. Set this in your .env.local file for local development.`);
  }
  
  return value || defaultValue || '';
};

// Supabase configuration
// SECURITY: In production, these MUST be set via environment variables - no hardcoded credentials
// In development, fallback values are provided for local development convenience
// For production, missing variables will cause the app to fail fast
const SUPABASE_URL = getEnvVar(
  'VITE_SUPABASE_URL',
  import.meta.env.DEV ? 'https://dfklqsdfycwjlcasfciu.supabase.co' : undefined
);
const SUPABASE_ANON_KEY = getEnvVar(
  'VITE_SUPABASE_ANON_KEY',
  import.meta.env.DEV ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRma2xxc2RmeWN3amxjYXNmY2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODA5OTcsImV4cCI6MjA3OTk1Njk5N30.OiaL5SkKnMlpdfW2Y2L-m2mzmCFA_LgpUq2-m8XF-yQ' : undefined
);

// Validate required environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  const errorMsg = 'Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.';
  if (import.meta.env.PROD) {
    throw new Error(errorMsg);
  }
  console.error(errorMsg);
}

// Detect demo/trial mode
const appEnv = import.meta.env.VITE_APP_ENV || 'development';
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const isDemo = appEnv === 'demo' || hostname.includes('demo.') || hostname.includes('trial.');
const isTrial = appEnv === 'trial' || hostname.includes('trial.');

// Detect vendor portal domain
const isVendorPortal = isVendorPortalDomain();

export const config: AppConfig = {
  supabase: {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
  },
  app: {
    env: appEnv,
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    name: isVendorPortal 
      ? 'VendorTal' 
      : (isDemo ? 'VendorSoluce (Demo)' : 'VendorSoluce'),
    isDemo,
    isTrial,
  },
  vendorPortal: {
    domain: import.meta.env.VITE_VENDOR_PORTAL_DOMAIN || 'vendortal.com',
    url: import.meta.env.VITE_VENDOR_PORTAL_URL || 'https://vendortal.com',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.vendorsoluce.com',
    timeout: 30000,
    retries: 3,
  },
  features: {
    vendorAssessments: import.meta.env.VITE_ENABLE_VENDOR_ASSESSMENTS === 'true',
    advancedAnalytics: import.meta.env.VITE_ENABLE_ADVANCED_ANALYTICS === 'true',
    performanceMonitoring: import.meta.env.PROD && !isDemo,
  },
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    enabled: (import.meta.env.PROD || isDemo) && !!import.meta.env.VITE_GA_MEASUREMENT_ID,
  },
  rateLimiting: {
    maxRequests: parseInt(import.meta.env.VITE_API_RATE_LIMIT || (isDemo ? '50' : '100'), 10) || (isDemo ? 50 : 100),
    windowMs: parseInt(import.meta.env.VITE_API_RATE_WINDOW || '60000', 10) || 60000,
  },
};

// Expose config in development for debugging
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__APP_CONFIG__ = config;
}