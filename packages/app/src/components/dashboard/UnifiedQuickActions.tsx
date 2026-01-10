import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Plus, FileCheck, Radar, Shield, Users, BarChart3 } from 'lucide-react';

interface UnifiedQuickActionsProps {
  onAddVendor?: () => void;
  onCreateAssessment?: () => void;
}

const UnifiedQuickActions: React.FC<UnifiedQuickActionsProps> = ({
  onAddVendor,
  onCreateAssessment
}) => {
  const navigate = useNavigate();

  const handleAddVendor = () => {
    if (onAddVendor) {
      onAddVendor();
    } else {
      navigate('/admin/vendors?action=add');
    }
  };

  const handleCreateAssessment = () => {
    if (onCreateAssessment) {
      onCreateAssessment();
    } else {
      navigate('/vendor-security-assessments?action=create');
    }
  };

  const actions = [
    {
      id: 'add-vendor',
      label: 'Add Vendor',
      description: 'Add a new vendor to your portfolio',
      icon: <Plus className="h-5 w-5" />,
      onClick: handleAddVendor,
      color: 'bg-blue-500 hover:bg-blue-600',
      variant: 'primary' as const
    },
    {
      id: 'create-assessment',
      label: 'Create Assessment',
      description: 'Send assessment to vendor portal',
      icon: <FileCheck className="h-5 w-5" />,
      onClick: handleCreateAssessment,
      color: 'bg-green-500 hover:bg-green-600',
      variant: 'primary' as const
    },
    {
      id: 'open-radar',
      label: 'Open Radar',
      description: 'View vendor risk visualization',
      icon: <Radar className="h-5 w-5" />,
      onClick: () => navigate('/tools/vendor-risk-radar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      variant: 'outline' as const
    },
    {
      id: 'vendor-portal',
      label: 'Vendor Portal',
      description: 'Manage vendor assessments',
      icon: <Shield className="h-5 w-5" />,
      onClick: () => window.open(import.meta.env.VITE_VENDOR_PORTAL_URL || 'https://vendortal.com', '_blank'),
      color: 'bg-orange-500 hover:bg-orange-600',
      variant: 'outline' as const
    },
    {
      id: 'manage-vendors',
      label: 'Manage Vendors',
      description: 'View and edit vendor list',
      icon: <Users className="h-5 w-5" />,
      onClick: () => navigate('/admin/vendors'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      variant: 'outline' as const
    },
    {
      id: 'view-dashboard',
      label: 'View Dashboard',
      description: 'Go to main dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      onClick: () => navigate('/dashboard'),
      color: 'bg-gray-500 hover:bg-gray-600',
      variant: 'outline' as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              onClick={action.onClick}
              className="flex flex-col items-start justify-start h-auto p-4 text-left"
            >
              <div className="flex items-center w-full mb-2">
                <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                  {action.icon}
                </div>
                <span className="font-semibold text-sm">{action.label}</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 ml-11">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedQuickActions;
