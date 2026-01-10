import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
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
  const [systemStatus, setSystemStatus] = useState<'operational' | 'initializing' | 'error'>('operational');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
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

  // Update system status based on loading state
  useEffect(() => {
    if (loading) {
      setSystemStatus('initializing');
    } else if (error) {
      setSystemStatus('error');
    } else {
      setSystemStatus('operational');
    }
  }, [loading, error]);

  // Update last refresh time when scan completes
  useEffect(() => {
    if (!loading && vendors.length > 0) {
      setLastRefresh(new Date());
    }
  }, [loading, vendors.length]);

  const formatLastRefresh = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleStatusClick = () => {
    if (systemStatus === 'operational') {
      // Trigger a refresh
      scanVendors();
    }
  };

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

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackToDashboardLink />
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Radar className="w-8 h-8 text-vendorsoluce-green flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    VENDORSOLUCE • DEMO MODE
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Vendor Risk Radar
                  </h1>
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 ml-11">
                Supply chain risk signal map with SBOM-aware classification (EO 14028 posture signals).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <button
                onClick={handleStatusClick}
                disabled={systemStatus === 'initializing'}
                className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap transition-all ${
                  systemStatus === 'operational'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40 cursor-pointer'
                    : systemStatus === 'error'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 cursor-not-allowed'
                }`}
                title={systemStatus === 'operational' ? 'Click to refresh' : systemStatus === 'initializing' ? 'System initializing...' : 'System error'}
              >
                Status: {systemStatus === 'operational' ? 'Operational' : systemStatus === 'error' ? 'Error' : 'Initializing'}
              </button>
              <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap">
                Last refresh: {loading ? 'INITIALIZING...' : formatLastRefresh(lastRefresh)}
              </div>
            </div>
          </div>
          
          {/* Sub-navigation bar */}
          <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-6" aria-label="Vendor Risk Navigation">
              <Link
                to="/tools/vendor-risk-radar"
                className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  isActiveRoute('/tools/vendor-risk-radar')
                    ? 'border-vendorsoluce-green text-vendorsoluce-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Radar
              </Link>
              <Link
                to="/vendors"
                className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  isActiveRoute('/vendors') || isActiveRoute('/vendor-risk-dashboard')
                    ? 'border-vendorsoluce-green text-vendorsoluce-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/vendor-onboarding"
                className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  isActiveRoute('/vendor-onboarding')
                    ? 'border-vendorsoluce-green text-vendorsoluce-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Intake
              </Link>
              <Link
                to="/vendor-assessments"
                className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  isActiveRoute('/vendor-assessments')
                    ? 'border-vendorsoluce-green text-vendorsoluce-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Reports
              </Link>
            </nav>
          </div>
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

        {/* Executive KPIs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Executive KPIs</h2>
            <span className="text-gray-500 dark:text-gray-400 cursor-help" title="Key performance indicators for vendor risk management">
              ℹ️
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.total}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VENDORS IN VIEW
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Demo capped at 8
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border-red-200 dark:border-red-800">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.criticalRisk}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CRITICAL VENDORS
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Top operational exposure
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/10 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.sbomGaps}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SBOM GAPS
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Software vendors without SBOM
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.maxRisk}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  HIGHEST RISK
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Residual score (0-100)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insights & Guidance Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">Insights & Guidance</h2>
            <span className="text-gray-500 dark:text-gray-400 cursor-help" title="Actionable insights and guidance">
              ℹ️
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
              <CardContent className="p-5">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  EO 14028 signal:
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Vendors that provide software and cannot produce an SBOM are flagged and prioritized for procurement follow-up. This demo shows signal detection; full SBOM ingestion & component risk scoring is a Professional feature.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
              <CardContent className="p-5">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  What you get in 3 minutes:
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Identify the vendors that can break execution, see the SBOM gaps, and export a defensible narrative for leadership (PDF locked in demo).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Initialization Status */}
        {loading && (
          <div className="mb-4 text-center text-gray-600 dark:text-gray-400">
            INITIALIZING TPRM SYSTEM...
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
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
              variant="primary"
              onClick={() => setShowCatalog(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add Vendor
            </Button>
            <ImportExport
              onImport={handleImport}
              onExport={exportVendors}
              vendorsCount={vendors.length}
            />
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">ℹ️</span>
                <select 
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="critical">Critical</option>
                  <option value="strategic">Strategic</option>
                  <option value="tactical">Tactical</option>
                  <option value="commodity">Commodity</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">ℹ️</span>
                <select 
                  value={filters.riskLevel}
                  onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="critical">Critical Risk (90+)</option>
                  <option value="high">High Risk (70+)</option>
                  <option value="medium">Medium Risk (40+)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              Template
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCatalog(true)}
              className="flex items-center gap-2"
            >
              Catalog
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-2"
            >
              Wizard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportVendors}
              className="flex items-center gap-2"
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              Help ?
            </Button>
          </div>
        </div>

        {/* Quick Stats Overview */}
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
