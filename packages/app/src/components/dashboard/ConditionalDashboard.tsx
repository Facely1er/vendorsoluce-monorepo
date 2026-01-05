import React, { Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageLoader from '../common/PageLoader';
import { lazyWithRetry } from '../../utils/lazyWithRetry';

const DashboardPage = lazyWithRetry(() => import('../../pages/DashboardPage'));
const DashboardLandingPage = lazyWithRetry(() => import('../../pages/DashboardLandingPage'));

const ConditionalDashboard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      {isAuthenticated ? <DashboardPage /> : <DashboardLandingPage />}
    </Suspense>
  );
};

export default ConditionalDashboard;

