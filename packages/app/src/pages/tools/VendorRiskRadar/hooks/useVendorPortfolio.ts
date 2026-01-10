import { useState, useEffect, useCallback, useMemo } from 'react';
import { useVendors } from '../../../../hooks/useVendors';
import { useAuth } from '../../../../context/AuthContext';
import { calculateInherentRisk, calculateResidualRisk, calculatePortfolioStats } from '../../../../utils/riskCalculations';
import { parseCSV, generateCSV } from '../../../../utils/csvImportExport';
import type { VendorRadar, VendorBase, PortfolioStats } from '../../../../types/vendorRadar';

const STORAGE_KEY = 'vendorsoluce_vendors';

export const useVendorPortfolio = () => {
  const { isAuthenticated, user } = useAuth();
  const { vendors: dbVendors, createVendor, updateVendor, deleteVendor } = useVendors();
  const [localVendors, setLocalVendors] = useState<VendorRadar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load vendors from database or localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      // Database vendors are loaded via useVendors hook
      // Convert database vendors to VendorRadar format if needed
    } else {
      // Load from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLocalVendors(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          console.error('Failed to load vendors from localStorage:', e);
        }
      }
    }
  }, [isAuthenticated, user]);

  // Convert database vendors to VendorRadar format
  const vendors = useMemo(() => {
    if (isAuthenticated && dbVendors && dbVendors.length > 0) {
      return dbVendors.map(v => ({
        id: v.id,
        name: v.name,
        category: (v.risk_level === 'Critical' ? 'critical' : 
                  v.risk_level === 'High' ? 'strategic' : 
                  v.risk_level === 'Medium' ? 'tactical' : 'commodity') as VendorRadar['category'],
        sector: v.industry || '',
        location: '',
        contact: v.contact_email,
        notes: v.notes,
        dataTypes: [],
        inherentRisk: v.risk_score || 0,
        residualRisk: v.risk_score || 0,
        sbomProfile: undefined,
        createdAt: v.created_at || new Date().toISOString(),
        updatedAt: v.updated_at || new Date().toISOString()
      }));
    }
    return localVendors;
  }, [isAuthenticated, dbVendors, localVendors]);

  // Calculate portfolio statistics
  const stats: PortfolioStats = useMemo(() => {
    return calculatePortfolioStats(vendors);
  }, [vendors]);

  // Add vendor
  const addVendor = useCallback(async (vendorData: Partial<VendorBase | VendorRadar>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Calculate risks
      const inherentRisk = calculateInherentRisk(vendorData);
      const residualRisk = calculateResidualRisk(vendorData, inherentRisk);
      
      const vendor: VendorRadar = {
        id: crypto.randomUUID(),
        name: vendorData.name || '',
        category: vendorData.category || 'tactical',
        sector: vendorData.sector || '',
        location: vendorData.location || '',
        contact: vendorData.contact,
        notes: vendorData.notes,
        dataTypes: vendorData.dataTypes || [],
        inherentRisk,
        residualRisk,
        sbomProfile: vendorData.sbomProfile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (isAuthenticated && user) {
        await createVendor({
          name: vendor.name,
          risk_score: residualRisk,
          risk_level: residualRisk >= 80 ? 'Critical' : 
                     residualRisk >= 60 ? 'High' : 
                     residualRisk >= 40 ? 'Medium' : 'Low',
          compliance_status: residualRisk <= 40 ? 'Compliant' : 
                            residualRisk <= 70 ? 'Partial' : 'Non-Compliant',
          notes: vendor.notes || '',
          industry: vendor.sector,
          contact_email: vendor.contact
        });
      } else {
        const updated = [...localVendors, vendor];
        setLocalVendors(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, localVendors, createVendor]);

  // Update vendor
  const updateVendorData = useCallback(async (id: string, vendorData: Partial<VendorRadar>) => {
    setLoading(true);
    setError(null);
    
    try {
      const inherentRisk = calculateInherentRisk(vendorData);
      const residualRisk = calculateResidualRisk(vendorData, inherentRisk);
      
      const updated: VendorRadar = {
        ...vendorData as VendorRadar,
        id,
        inherentRisk,
        residualRisk,
        updatedAt: new Date().toISOString()
      };

      if (isAuthenticated && user) {
        await updateVendor(id, {
          name: updated.name,
          risk_score: residualRisk,
          risk_level: residualRisk >= 80 ? 'Critical' : 
                     residualRisk >= 60 ? 'High' : 
                     residualRisk >= 40 ? 'Medium' : 'Low',
          compliance_status: residualRisk <= 40 ? 'Compliant' : 
                            residualRisk <= 70 ? 'Partial' : 'Non-Compliant',
          notes: updated.notes,
          industry: updated.sector,
          contact_email: updated.contact
        });
      } else {
        const updatedList = localVendors.map(v => v.id === id ? updated : v);
        setLocalVendors(updatedList);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, localVendors, updateVendor]);

  // Delete vendor
  const deleteVendorData = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated && user) {
        await deleteVendor(id);
      } else {
        const updated = localVendors.filter(v => v.id !== id);
        setLocalVendors(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vendor');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, localVendors, deleteVendor]);

  // Import vendors from CSV
  const importVendors = useCallback(async (csvText: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const importedVendors = parseCSV(csvText);
      
      if (isAuthenticated && user) {
        // Import to database
        await Promise.all(importedVendors.map(v => createVendor({
          name: v.name,
          risk_score: v.residualRisk,
          risk_level: v.residualRisk >= 80 ? 'Critical' : 
                     v.residualRisk >= 60 ? 'High' : 
                     v.residualRisk >= 40 ? 'Medium' : 'Low',
          compliance_status: v.residualRisk <= 40 ? 'Compliant' : 
                            v.residualRisk <= 70 ? 'Partial' : 'Non-Compliant',
          notes: v.notes || '',
          industry: v.sector,
          contact_email: v.contact
        })));
      } else {
        const updated = [...localVendors, ...importedVendors];
        setLocalVendors(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import vendors');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, localVendors, createVendor]);

  // Export vendors to CSV
  const exportVendors = useCallback(() => {
    try {
      const csv = generateCSV(vendors);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vendorsoluce-vendors-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export vendors');
    }
  }, [vendors]);

  // Scan vendors (recalculate risks)
  const scanVendors = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const updated = vendors.map(v => {
        const inherentRisk = calculateInherentRisk(v);
        const residualRisk = calculateResidualRisk(v, inherentRisk);
        return {
          ...v,
          inherentRisk,
          residualRisk,
          updatedAt: new Date().toISOString()
        };
      });

      if (isAuthenticated && user) {
        await Promise.all(updated.map(v => updateVendor(v.id, {
          risk_score: v.residualRisk,
          risk_level: v.residualRisk >= 80 ? 'Critical' : 
                     v.residualRisk >= 60 ? 'High' : 
                     v.residualRisk >= 40 ? 'Medium' : 'Low',
          compliance_status: v.residualRisk <= 40 ? 'Compliant' : 
                            v.residualRisk <= 70 ? 'Partial' : 'Non-Compliant'
        })));
      } else {
        setLocalVendors(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan vendors');
    } finally {
      setLoading(false);
    }
  }, [vendors, isAuthenticated, user, updateVendor]);

  return {
    vendors,
    stats,
    addVendor,
    updateVendor: updateVendorData,
    deleteVendor: deleteVendorData,
    importVendors,
    exportVendors,
    scanVendors,
    loading,
    error
  };
};
