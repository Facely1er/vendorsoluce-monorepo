import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Target,
  FileSearch,
  TrendingUp,
  FileText,
  Code,
  MessageSquare,
  DollarSign,
  ArrowRight,
  HelpCircle,
  Shield,
  Scale
} from 'lucide-react';
import { isVendorPortalDomain } from '../../utils/domainDetection';
import { config } from '../../utils/config';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const isVendorPortal = isVendorPortalDomain();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-20 lg:gap-24">

          {/* Company Info - Branding Section */}
          <div className="col-span-1 md:col-span-2 md:pr-8">
            <div className="flex items-center mb-4">
              <img src="/vendorsoluce.png" alt={t('footer.company.name', 'VendorSoluce™')} className="h-12 w-12" />
              <span className="ml-2">
                <span className="block text-xl font-bold text-vendorsoluce-green">VendorSoluce™</span>
                <span className="block text-xs text-gray-400 font-normal">Supply Chain Assurance</span>
                <span className="block text-xs text-gray-400 font-normal">by ERMITS</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.company.description', 'Comprehensive supply chain risk management platform for modern organizations featuring assessments and automated compliance tools.')}
            </p>
            {/* Status Badge */}
            <div className="mt-4 flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-vendorsoluce-green/10 border border-vendorsoluce-green/30">
                <img src="/vendorsoluce.png" alt="VendorSoluce Logo" className="w-3.5 h-3.5 block opacity-100" />
                <span className="text-xs font-medium text-vendorsoluce-green">Local browser-based analysis</span>
              </div>
              <span className="text-xs text-gray-400">Version 1.0</span>
            </div>
          </div>

          {/* Solutions */}
          <div className="md:px-12 lg:px-16 xl:px-20">
            <h3 className="text-lg font-semibold mb-3">
              {t('footer.sections.solutions', 'Solutions')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/supply-chain-assessment" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <Target className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.solutions.supplyChainAssessment', 'Supply Chain Assessment')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/sbom-analyzer" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <FileSearch className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.solutions.sbomAnalysis', 'SBOM Analysis')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.solutions.vendorRiskDashboard', 'Vendor Risk Dashboard')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <DollarSign className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.solutions.pricing', 'Pricing')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              {!isVendorPortal && (
                <li>
                  <a 
                    href={config.vendorPortal.url} 
                    className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Shield className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                    <span>{t('footer.links.vendors.portal', 'Vendor Assessment Portal')}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:px-12 lg:px-16 xl:px-20">
            <h3 className="text-lg font-semibold mb-3">
              {t('footer.sections.resources', 'Resources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/templates" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <FileText className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.resources.templates', 'Templates & Downloads')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <Code className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.resources.apiDocs', 'API Documentation')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/integration-guides" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <Code className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.resources.integrationGuides', 'Integration Guides')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <HelpCircle className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.resources.howItWorks', 'How It Works')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <MessageSquare className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>{t('footer.links.help.contact', 'Contact Support')}</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:px-12 lg:px-16 xl:px-20">
            <h3 className="text-lg font-semibold mb-3">
              {t('footer.sections.legal', 'Legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/master-terms-of-service" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <Scale className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>Terms of Service</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/master-privacy-policy" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <Shield className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>Privacy Policy</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <FileText className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>Cookie Policy</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/acceptable-use-policy" className="text-gray-300 hover:text-white flex items-center group text-sm whitespace-nowrap">
                  <Shield className="h-4 w-4 flex-shrink-0 mr-2 text-vendorsoluce-green" />
                  <span>Acceptable Use Policy</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex justify-center">
            <div className="text-gray-400 text-sm">
              {t('footer.copyright', '© 2025 ERMITS LLC. All rights reserved.')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;