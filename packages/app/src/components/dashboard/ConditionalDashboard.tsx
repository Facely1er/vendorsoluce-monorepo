import React, { Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageLoader from '../common/PageLoader';
import { lazyWithRetry } from '../../utils/lazyWithRetry';

const DashboardPage = lazyWithRetry(() => import('../../pages/DashboardPage'));
const DashboardDemoPage = lazyWithRetry(() => import('../../pages/DashboardDemoPage'));

const ConditionalDashboard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  // Show demo mode for unauthenticated users, full dashboard for authenticated
  return (
    <Suspense fallback={<PageLoader />}>
      {isAuthenticated ? <DashboardPage /> : <DashboardDemoPage />}
    </Suspense>
  );
};

export default ConditionalDashboard;

