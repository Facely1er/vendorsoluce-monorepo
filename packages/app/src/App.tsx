import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { ChatbotProvider } from './components/chatbot/ChatbotProvider';
import ErrorBoundary from './components/common/ErrorBoundary';
import NotificationManager from './components/common/NotificationManager';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/chatbot/ChatWidget';
import PageLoader from './components/common/PageLoader';
import { Analytics } from '@vercel/analytics/react';
import { lazyWithRetry } from './utils/lazyWithRetry';
import { isVendorPortalDomain } from './utils/domainDetection';

// Critical pages - loaded immediately
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy-loaded pages - loaded on demand with retry logic
const ResetPasswordPage = lazyWithRetry(() => import('./pages/ResetPasswordPage'));
const SBOMAnalyzer = lazyWithRetry(() => import('./pages/SBOMAnalyzer'));
const SBOMAnalysisPage = lazyWithRetry(() => import('./pages/SBOMAnalysisPage'));
const SupplyChainAssessment = lazyWithRetry(() => import('./pages/SupplyChainAssessment'));
const SupplyChainResults = lazyWithRetry(() => import('./pages/SupplyChainResults'));
const SupplyChainRecommendations = lazyWithRetry(() => import('./pages/SupplyChainRecommendations'));
const VendorRiskDashboard = lazyWithRetry(() => import('./pages/VendorRiskDashboard'));
const OnboardingPage = lazyWithRetry(() => import('./pages/OnboardingPage'));
const VendorOnboardingPage = lazyWithRetry(() => import('./pages/VendorOnboardingPage'));
const VendorManagementPage = lazyWithRetry(() => import('./pages/VendorManagementPage'));
const Pricing = lazyWithRetry(() => import('./pages/Pricing'));
const Checkout = lazyWithRetry(() => import('./pages/Checkout'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const Privacy = lazyWithRetry(() => import('./pages/Privacy'));
const AcceptableUsePolicy = lazyWithRetry(() => import('./pages/AcceptableUsePolicy'));
const CookiePolicy = lazyWithRetry(() => import('./pages/CookiePolicy'));
const MasterPrivacyPolicy = lazyWithRetry(() => import('./pages/MasterPrivacyPolicy'));
const MasterTermsOfService = lazyWithRetry(() => import('./pages/MasterTermsOfService'));
const Templates = lazyWithRetry(() => import('./pages/Templates'));
const HowItWorks = lazyWithRetry(() => import('./pages/HowItWorks'));
const APIDocumentation = lazyWithRetry(() => import('./pages/APIDocumentation'));
const IntegrationGuides = lazyWithRetry(() => import('./pages/IntegrationGuides'));
const NISTChecklist = lazyWithRetry(() => import('./pages/tools/NISTChecklist'));
const SBOMQuickScan = lazyWithRetry(() => import('./pages/tools/SBOMQuickScan'));
const VendorRiskRadar = lazyWithRetry(() => import('./pages/tools/VendorRiskRadar'));
const VendorRiskCalculator = lazyWithRetry(() => import('./pages/tools/VendorRiskCalculator'));
const VendorIQ = lazyWithRetry(() => import('./pages/tools/VendorIQ'));
const DemoPage = lazyWithRetry(() => import('./pages/DemoPage'));
const TrialPage = lazyWithRetry(() => import('./pages/TrialPage'));
const VendorSecurityAssessments = lazyWithRetry(() => import('./pages/VendorSecurityAssessments'));
const VendorAssessmentPortal = lazyWithRetry(() => import('./pages/VendorAssessmentPortal'));
const VendorPortalLandingPage = lazyWithRetry(() => import('./pages/VendorPortalLandingPage'));
const VendorRequirementsDefinition = lazyWithRetry(() => import('./pages/VendorRequirementsDefinition'));
const ProfilePage = lazyWithRetry(() => import('./pages/ProfilePage'));
const AccountPage = lazyWithRetry(() => import('./pages/AccountPage'));
const UserDashboard = lazyWithRetry(() => import('./pages/UserDashboard'));
const UserActivity = lazyWithRetry(() => import('./pages/UserActivity'));
const UserNotifications = lazyWithRetry(() => import('./pages/UserNotifications'));
const BillingPage = lazyWithRetry(() => import('./pages/BillingPage'));
const TemplatePreviewPage = lazyWithRetry(() => import('./pages/TemplatePreviewPage'));
const DashboardDemoPage = lazyWithRetry(() => import('./pages/DashboardDemoPage'));
// ConditionalDashboard is imported directly since it handles its own Suspense internally
import ConditionalDashboard from './components/dashboard/ConditionalDashboard';
const AssetManagementPage = lazyWithRetry(() => import('./pages/AssetManagementPage'));
const MarketingAdminPage = lazyWithRetry(() => import('./pages/MarketingAdminPage'));
const CreateCampaignPage = lazyWithRetry(() => import('./pages/CreateCampaignPage'));

function App() {
  const isVendorPortal = isVendorPortalDomain();
  
  // If on vendor portal domain, show only vendor portal routes
  if (isVendorPortal) {
    return (
      <I18nProvider>
        <ThemeProvider>
          <Router>
            <ErrorBoundary>
              <AuthProvider>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
                  <NotificationManager />
                  <main className="flex-1">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        {/* Vendor Portal Routes Only */}
                        <Route path="/" element={<VendorPortalLandingPage />} />
                        <Route path="/vendor-portal" element={<VendorPortalLandingPage />} />
                        <Route path="/vendor-assessments/:id" element={<VendorAssessmentPortal />} />
                        {/* Fallback - redirect to landing page */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Analytics />
                </div>
              </AuthProvider>
            </ErrorBoundary>
          </Router>
        </ThemeProvider>
      </I18nProvider>
    );
  }
  
  // Original VendorSoluce app routes
  return (
    <I18nProvider>
      <ThemeProvider>
        <Router>
          <ErrorBoundary>
            <AuthProvider>
              <ChatbotProvider>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
                <NotificationManager />
                <Navbar />
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
                  <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<Navigate to="/signin" replace />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/careers" element={<Navigate to="/contact" replace />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/master-privacy-policy" element={<MasterPrivacyPolicy />} />
                  <Route path="/master-terms-of-service" element={<MasterTermsOfService />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/templates/preview" element={<TemplatePreviewPage />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/api-docs" element={<APIDocumentation />} />
                  <Route path="/integration-guides" element={<IntegrationGuides />} />
                  <Route path="/demo" element={<DemoPage />} />
                  <Route path="/trial" element={<TrialPage />} />

                  {/* Tools - can be public or protected based on requirements */}
                  <Route path="/tools/nist-checklist" element={<NISTChecklist />} />
                  <Route path="/tools/sbom-quick-scan" element={<SBOMQuickScan />} />
                  <Route path="/tools/vendor-risk-radar" element={<VendorRiskRadar />} />
                  <Route path="/tools/vendor-risk-calculator" element={<VendorRiskCalculator />} />
                  <Route path="/tools/vendor-iq" element={<VendorIQ />} />

                  {/* Assessment routes - public access for better user experience */}
                  <Route path="/supply-chain-assessment" element={<SupplyChainAssessment />} />
                  <Route path="/supply-chain-results/:id?" element={<SupplyChainResults />} />
                  <Route path="/supply-chain-recommendations/:id" element={<SupplyChainRecommendations />} />
                  
                  {/* Stage 2: Vendor Requirements Definition */}
                  <Route path="/vendor-requirements" element={<VendorRequirementsDefinition />} />
                  <Route path="/sbom-analyzer" element={<SBOMAnalyzer />} />
                  <Route path="/sbom-analysis/:id" element={<SBOMAnalysisPage />} />
                  <Route path="/vendors" element={<VendorRiskDashboard />} />
                  <Route path="/vendor-risk-dashboard" element={<Navigate to="/vendors" replace />} />
                  <Route path="/vendor-onboarding" element={<VendorOnboardingPage />} />

                  {/* Vendor Management - Admin only */}
                  <Route path="/admin/vendors" element={
                    <ProtectedRoute>
                      <VendorManagementPage />
                    </ProtectedRoute>
                  } />

                  {/* Marketing Automation - Admin only */}
                  <Route path="/admin/marketing" element={
                    <ProtectedRoute>
                      <MarketingAdminPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/marketing/campaigns/new" element={
                    <ProtectedRoute>
                      <CreateCampaignPage />
                    </ProtectedRoute>
                  } />

                  {/* Dashboard Demo for non-authenticated users */}
                  <Route path="/dashboard-demo" element={<DashboardDemoPage />} />

                  {/* Vendor Security Assessments - Premium Feature */}
                  <Route path="/vendor-assessments" element={<VendorSecurityAssessments />} />
                  <Route path="/vendor-portal" element={<VendorPortalLandingPage />} />
                  <Route path="/vendor-assessments/:id" element={<VendorAssessmentPortal />} />

                  {/* Dashboard - shows landing page for unauthenticated users */}
                  <Route path="/dashboard" element={<ConditionalDashboard />} />
                  <Route path="/onboarding" element={
                    <ProtectedRoute>
                      <OnboardingPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/billing" element={
                    <ProtectedRoute>
                      <BillingPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/user-dashboard" element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/user-activity" element={
                    <ProtectedRoute>
                      <UserActivity />
                    </ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <UserNotifications />
                    </ProtectedRoute>
                  } />

                  {/* Asset Management - Protected Route */}
                  <Route path="/asset-management" element={
                    <ProtectedRoute>
                      <AssetManagementPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/assets" element={<Navigate to="/asset-management" replace />} />

                  {/* Fallback route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                  </Suspense>
                </main>
                <Footer />
                <ChatWidget />
                <Analytics />
                </div>
              </ChatbotProvider>
            </AuthProvider>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
