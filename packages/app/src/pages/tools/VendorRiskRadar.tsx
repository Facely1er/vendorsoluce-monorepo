import React, { useState, useEffect } from 'react';
import { Radar, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import BackToDashboardLink from '../../components/common/BackToDashboardLink';
import { useVendorPortfolio } from './VendorRiskRadar/hooks/useVendorPortfolio';
import VendorDashboard from './VendorRiskRadar/components/VendorDashboard';
import VendorCatalog from './VendorRiskRadar/components/VendorCatalog';
import OnboardingWizard from './VendorRiskRadar/components/OnboardingWizard';
import ImportExport from './VendorRiskRadar/components/ImportExport';
import StatsOverview from './VendorRiskRadar/components/StatsOverview';
import RadarVisualization from './VendorRiskRadar/components/RadarVisualization';
import type { VendorRadar, VendorBase } from '../../types/vendorRadar';

const VendorRiskRadar: React.FC = () => {
  const {
    vendors,
    stats,
    addVendor,
    updateVendor,
    deleteVendor,
    importVendors,
    exportVendors,
    scanVendors,
    loading,
    error
  } = useVendorPortfolio();

  const [selectedVendor, setSelectedVendor] = useState<VendorRadar | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all'
  });

  // Auto-scan every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      scanVendors();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [scanVendors]);

  const handleAddFromCatalog = async (vendor: Partial<VendorBase>) => {
    try {
      await addVendor(vendor);
      setShowCatalog(false);
    } catch (err) {
      console.error('Failed to add vendor:', err);
    }
  };

  const handleWizardComplete = async (wizardVendors: VendorBase[]) => {
    try {
      for (const vendor of wizardVendors) {
        await addVendor(vendor);
      }
      setShowWizard(false);
    } catch (err) {
      console.error('Failed to add vendors from wizard:', err);
    }
  };

  const handleImport = async (csvText: string) => {
    try {
      await importVendors(csvText);
    } catch (err) {
      console.error('Import failed:', err);
      alert('Failed to import vendors. Please check the file format.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackToDashboardLink />
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Radar className="w-8 h-8 text-vendorsoluce-green" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Vendor Risk Radar
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Interactive vendor prioritization, SBOM signals, and risk analytics
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <Button
            variant="primary"
            onClick={scanVendors}
            disabled={loading || vendors.length === 0}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Scan Vendors
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowCatalog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Browse Catalog
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2"
          >
            <Radar className="w-4 h-4" />
            Onboarding Wizard
          </Button>
          <ImportExport
            onImport={handleImport}
            onExport={exportVendors}
            vendorsCount={vendors.length}
          />
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Radar Visualization */}
        <div className="mb-6">
          <RadarVisualization vendors={vendors} />
        </div>

        {/* Vendor Dashboard */}
        <VendorDashboard
          vendors={vendors}
          filters={filters}
          onFilterChange={setFilters}
          onVendorSelect={setSelectedVendor}
        />

        {/* Vendor Detail Modal (simplified - can be expanded) */}
        {selectedVendor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedVendor.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{selectedVendor.sector}</span>
                      <span>•</span>
                      <span>{selectedVendor.location}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedVendor(null)}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Risk Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Inherent Risk</div>
                        <div className="text-2xl font-bold">{selectedVendor.inherentRisk}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Residual Risk</div>
                        <div className="text-2xl font-bold">{selectedVendor.residualRisk}</div>
                      </div>
                    </div>
                  </div>

                  {selectedVendor.dataTypes && selectedVendor.dataTypes.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Data Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedVendor.dataTypes.map((dt, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                          >
                            {dt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedVendor.sbomProfile && (
                    <div>
                      <h3 className="font-semibold mb-2">SBOM Profile</h3>
                      <div className="space-y-1 text-sm">
                        <div>Provides Software: {selectedVendor.sbomProfile.providesSoftware ? 'Yes' : 'No'}</div>
                        <div>SBOM Available: {selectedVendor.sbomProfile.sbomAvailable ? 'Yes' : 'No'}</div>
                        {selectedVendor.sbomProfile.sbomFormat && (
                          <div>Format: {selectedVendor.sbomProfile.sbomFormat}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedVendor.notes && (
                    <div>
                      <h3 className="font-semibold mb-2">Notes</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedVendor.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modals */}
        {showCatalog && (
          <VendorCatalog
            onClose={() => setShowCatalog(false)}
            onAddVendor={handleAddFromCatalog}
          />
        )}
        {showWizard && (
          <OnboardingWizard
            onClose={() => setShowWizard(false)}
            onComplete={handleWizardComplete}
          />
        )}
      </div>
    </div>
  );
};

export default VendorRiskRadar;
