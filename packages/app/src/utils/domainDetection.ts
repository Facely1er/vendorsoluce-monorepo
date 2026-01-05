/**
 * Domain detection utilities for multi-domain support
 * Detects whether the app is running on vendorsoluce.com or vendortal.com
 */

/**
 * Checks if the current domain is the vendor portal domain
 * @returns true if on vendortal.com domain, false otherwise
 */
export const isVendorPortalDomain = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  return hostname === 'vendortal.com' || 
         hostname === 'www.vendortal.com' || 
         hostname.includes('vendortal.');
};

/**
 * Gets the app domain type
 * @returns 'vendortal' if on vendor portal domain, 'vendorsoluce' otherwise
 */
export const getAppDomain = (): 'vendorsoluce' | 'vendortal' => {
  return isVendorPortalDomain() ? 'vendortal' : 'vendorsoluce';
};

/**
 * Gets the base URL for the current domain
 * @returns The base URL (https://vendortal.com or https://vendorsoluce.com)
 */
export const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return isVendorPortalDomain() 
      ? (import.meta.env.VITE_VENDOR_PORTAL_URL || 'https://vendortal.com')
      : (import.meta.env.VITE_APP_URL || 'https://vendorsoluce.com');
  }
  
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}`;
};

/**
 * Gets the vendor portal URL
 * @returns The vendor portal URL
 */
export const getVendorPortalUrl = (): string => {
  return import.meta.env.VITE_VENDOR_PORTAL_URL || 'https://vendortal.com';
};

