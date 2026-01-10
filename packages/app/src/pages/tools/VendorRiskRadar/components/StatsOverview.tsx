import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/Card';
import { AlertTriangle, Shield, TrendingUp, Database, FileX, Target } from 'lucide-react';
import type { PortfolioStats } from '../../../../types/vendorRadar';

interface StatsOverviewProps {
  stats: PortfolioStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Vendors',
      value: stats.total,
      icon: Database,
      color: 'text-blue-600'
    },
    {
      label: 'Critical Category',
      value: stats.criticalCategory,
      icon: Target,
      color: 'text-red-600'
    },
    {
      label: 'Critical Risk',
      value: stats.criticalRisk,
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      label: 'High Risk',
      value: stats.highRisk,
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      label: 'With PII/PHI',
      value: stats.sensitiveData,
      icon: Shield,
      color: 'text-purple-600'
    },
    {
      label: 'Avg Inherent Risk',
      value: `${stats.avgInherentRisk}`,
      icon: TrendingUp,
      color: 'text-gray-600'
    },
    {
      label: 'SBOM Gaps',
      value: stats.sbomGaps,
      icon: FileX,
      color: 'text-yellow-600'
    },
    {
      label: 'Max Risk',
      value: stats.maxRisk,
      icon: AlertTriangle,
      color: stats.maxRisk >= 80 ? 'text-red-600' : 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsOverview;
