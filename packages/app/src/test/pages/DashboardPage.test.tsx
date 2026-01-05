import { render, screen} from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { I18nProvider } from '../../context/I18nContext';
import { useVendors } from '../../hooks/useVendors';
import { useSBOMAnalyses } from '../../hooks/useSBOMAnalyses';
import { useSubscription } from '../../hooks/useSubscription';
import DashboardPage from '../../pages/DashboardPage';

// Mock hooks
vi.mock('../../hooks/useVendors');
vi.mock('../../hooks/useSBOMAnalyses');
vi.mock('../../hooks/useSubscription');

const mockUseVendors = vi.mocked(useVendors);
const mockUseSBOMAnalyses = vi.mocked(useSBOMAnalyses);
const mockUseSubscription = vi.mocked(useSubscription);

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  </BrowserRouter>
);

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUseVendors.mockReturnValue({
      vendors: [
        { id: '1', name: 'Vendor 1', risk_level: 'High', risk_score: 75 },
        { id: '2', name: 'Vendor 2', risk_level: 'Low', risk_score: 25 },
      ],
      loading: false,
      error: null,
      createVendor: vi.fn(),
      updateVendor: vi.fn(),
      deleteVendor: vi.fn(),
      refetch: vi.fn(),
    });

    mockUseSBOMAnalyses.mockReturnValue({
      analyses: [
        { id: '1', filename: 'test.json', total_components: 10, total_vulnerabilities: 5 },
      ],
      loading: false,
      error: null,
      createAnalysis: vi.fn(),
      deleteAnalysis: vi.fn(),
      refetch: vi.fn(),
    });

    mockUseSubscription.mockReturnValue({
      subscription: { tier: 'professional', status: 'active' },
      loading: false,
      error: null,
      tier: 'professional',
      checkFeatureAccess: vi.fn(() => true),
      getLimit: vi.fn(() => 50),
      isActive: vi.fn(() => true),
      isTrialing: vi.fn(() => false),
      isCanceled: vi.fn(() => false),
      daysUntilRenewal: vi.fn(() => 15),
      refetch: vi.fn(),
    });
  });

  it('renders dashboard overview correctly', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  it('displays vendor statistics', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Vendors/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Total vendors count
  });

  it('displays SBOM analysis statistics', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    expect(screen.getByText(/SBOM/i)).toBeInTheDocument();
  });

  it('shows risk distribution', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Vendor Risk Distribution/i)).toBeInTheDocument();
    expect(screen.getByText(/High Risk/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Risk/i)).toBeInTheDocument();
  });

  it('displays quick actions', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Quick Actions/i)).toBeInTheDocument();
  });

  it('shows quick actions with correct links', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Quick Actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Vendor/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Assessment/i)).toBeInTheDocument();
  });

  it('handles loading state', () => {
    mockUseVendors.mockReturnValue({
      vendors: [],
      loading: true,
      error: null,
      createVendor: vi.fn(),
      updateVendor: vi.fn(),
      deleteVendor: vi.fn(),
      refetch: vi.fn(),
    });

    mockUseSBOMAnalyses.mockReturnValue({
      analyses: [],
      loading: true,
      error: null,
      createAnalysis: vi.fn(),
      deleteAnalysis: vi.fn(),
      refetch: vi.fn(),
    });

    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    // Dashboard shows LoadingSkeleton when loading
    expect(screen.queryByText(/Welcome back/i)).not.toBeInTheDocument();
  });

  it('handles error state gracefully', () => {
    mockUseVendors.mockReturnValue({
      vendors: [],
      loading: false,
      error: 'Failed to load vendors',
      createVendor: vi.fn(),
      updateVendor: vi.fn(),
      deleteVendor: vi.fn(),
      refetch: vi.fn(),
    });

    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    // Dashboard still renders even with vendor errors, just shows empty state
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  it('renders with subscription tier', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    );

    // Dashboard renders successfully with subscription context
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });
});

