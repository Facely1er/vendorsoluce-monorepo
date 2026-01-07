import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Home, Layers, FileJson, BarChart3, BookOpen, Phone, Users, DollarSign, Command, FileText, Code } from 'lucide-react';
import { MenuItem } from '../../types';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import LanguageSwitcher from './LanguageSwitcher';
import QuickAccessMenu from '../common/QuickAccessMenu';
import CommandPalette from '../common/CommandPalette';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isVendorRiskOpen, setIsVendorRiskOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const mobileMenu = target.closest('[data-mobile-menu]');
      const mobileMenuButton = target.closest('[data-mobile-menu-button]');
      const dropdown = target.closest('[data-dropdown]');

      // Close mobile menu
      if (isOpen && !mobileMenu && !mobileMenuButton) {
        setIsOpen(false);
      }

      // Close desktop dropdowns
      if (!dropdown) {
        setIsResourcesOpen(false);
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen);
  const toggleSolutions = () => setIsSolutionsOpen(!isSolutionsOpen);
  const toggleVendorRisk = () => setIsVendorRiskOpen(!isVendorRiskOpen);

  const primaryNav: MenuItem[] = [
    { label: t('navigation.home'), href: '/', icon: 'Home' },
    { label: t('navigation.dashboard'), href: '/dashboard', icon: 'BarChart3' },
    { label: t('navigation.howItWorks'), href: '/how-it-works', icon: 'Layers' },
    { label: t('navigation.solutions'), href: '#', icon: 'Layers' },
    { label: t('navigation.resources'), href: '#', icon: 'BookOpen' },
    { label: t('navigation.pricing'), href: '/pricing', icon: 'DollarSign' },
  ];

  const solutionItems: MenuItem[] = [
    { label: t('navigation.supplyChainAssessment'), href: '/supply-chain-assessment' },
    { 
      label: t('navigation.sbom'), 
      href: '/sbom-analyzer',
      // SBOM is mentioned in dashboard, not a direct standalone link
    },
    {
      label: t('navigation.vendorRisk'),
      href: '#', // Parent item, no direct link
      children: [
        { label: t('navigation.vendorRiskDashboard'), href: '/vendors' },
        { label: t('navigation.vendorIQ'), href: '/tools/vendor-iq' },
        { 
          label: t('navigation.vendorRiskRadar'), 
          href: '/tools/vendor-risk-radar',
          // Risk Radar is integrated in dashboard
        },
      ]
    },
    ...(isAuthenticated ? [{ label: 'Asset Management', href: '/asset-management' }] : []),
  ];

  const resourceItems: MenuItem[] = [
    { 
      label: t('navigation.templates'), 
      href: '/templates',
      icon: 'FileText',
      description: t('navigation.templatesDescription', 'Assessment templates & downloads')
    },
    { 
      label: t('navigation.integration'), 
      href: '/integration-guides',
      icon: 'Code',
      description: t('navigation.integrationDescription', 'Setup guides & tutorials')
    },
  ];

  // Helper function to determine if a link is active
  const isActiveLink = (href: string, subItems?: MenuItem[]): boolean => {
    // Direct path match
    if (location.pathname === href && href !== '#') return true;
    
    // For dropdown items, check if any sub-item matches
    if (subItems) {
      return subItems.some(item => location.pathname === item.href);
    }
    
    return false;
  };

  // Helper to check if any child item is active
  const hasActiveChild = (items: MenuItem[]): boolean => {
    return items.some(item => {
      if (item.children) {
        return hasActiveChild(item.children);
      }
      return location.pathname === item.href;
    });
  };

  // Define active and default link classes
  const getActiveLinkClasses = (isActive: boolean) => {
    return isActive
      ? 'px-3 py-2 rounded-md text-sm font-medium text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20 flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center';
  };

  const getActiveButtonClasses = (isActive: boolean) => {
    return isActive
      ? 'px-3 py-2 rounded-md text-sm font-medium text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20 flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center';
  };

  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    
    // Reduced icon sizes for better space utilization
    const icons = {
      Home: <Home size={16} className="flex-shrink-0" />,
      Layers: <Layers size={16} className="flex-shrink-0" />,
      DollarSign: <DollarSign size={16} className="flex-shrink-0" />,
      FileJson: <FileJson size={16} className="flex-shrink-0" />,
      BarChart3: <BarChart3 size={16} className="flex-shrink-0" />,
      BookOpen: <BookOpen size={16} className="flex-shrink-0" />,
      Users: <Users size={16} className="flex-shrink-0" />,
      Phone: <Phone size={16} className="flex-shrink-0" />,
      FileText: <FileText size={15} className="flex-shrink-0" />,
      Code: <Code size={15} className="flex-shrink-0" />,
    };
    
    return iconName in icons ? icons[iconName as keyof typeof icons] : null;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-[100] w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Left: Logo with reduced branding text */}
          <div className="flex items-center flex-shrink-0 min-w-0 md:max-w-none max-w-[calc(100%-60px)]" data-tour="main-nav">
            <Link to="/" className="flex items-center min-w-0 group">
              <img 
                src="/vendorsoluce.png" 
                alt="VendorSoluce Logo" 
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 transition-transform group-hover:scale-105" 
              />
              <span className="ml-1.5 sm:ml-2 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="block text-[10px] sm:text-xs md:text-sm font-bold !text-vendorsoluce-green dark:!text-white truncate leading-tight">VendorSoluce™</span>
                  <span className="px-1 py-0.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wide bg-vendorsoluce-green/10 text-vendorsoluce-green dark:text-white dark:bg-vendorsoluce-green/20 rounded border border-vendorsoluce-green/20 dark:border-vendorsoluce-green/30">
                    Beta
                  </span>
                </div>
                <span className="block text-[9px] sm:text-[10px] md:text-[10px] text-gray-700 dark:text-gray-400 font-normal leading-tight tracking-tighter" style={{ letterSpacing: '-0.02em' }}>Supply Chain Assurance</span>
                <span className="block text-[9px] sm:text-[10px] md:text-[10px] text-gray-600 dark:text-gray-400 font-normal leading-tight">by ERMITS</span>
              </span>
            </Link>
          </div>
          
          {/* Center: Desktop Navigation with icons */}
          <div className="hidden md:flex md:items-center md:space-x-0.5">
            {primaryNav.map((item) => 
              item.label === t('navigation.solutions') ? (
                <div key={item.label} className="relative" data-dropdown>
                  <button
                    onClick={toggleSolutions}
                    className={`${getActiveButtonClasses(hasActiveChild(solutionItems))} px-2.5 py-1.5`}
                    title={item.label}
                  >
                    {getIcon(item.icon as string)}
                    <span className="ml-1.5 text-xs">{item.label}</span>
                    <ChevronDown size={14} className="ml-1" />
                  </button>

                  {isSolutionsOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-[110] border border-gray-200 dark:border-gray-700">
                      {solutionItems.map((solution) => (
                        <div key={solution.label}>
                          {solution.children ? (
                            // Parent item with submenu
                            <div className="relative group">
                              <div className={`px-4 py-2 text-sm flex items-center justify-between ${
                                hasActiveChild(solution.children)
                                  ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}>
                                <span>{solution.label}</span>
                                <ChevronRight size={16} className="ml-2" />
                              </div>
                              {/* Submenu */}
                              <div className="absolute left-full top-0 ml-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[120]">
                                {solution.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    className={`block px-4 py-2 text-sm ${
                                      isActiveLink(child.href)
                                        ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    onClick={() => setIsSolutionsOpen(false)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{child.label}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            // Regular item
                            <Link
                              to={solution.href}
                              className={`block px-4 py-2 text-sm ${
                                isActiveLink(solution.href)
                                  ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setIsSolutionsOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span>{solution.label}</span>
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.label === t('navigation.resources') ? (
                <div key={item.label} className="relative" data-dropdown>
                  <button
                    onClick={toggleResources}
                    className={`${getActiveButtonClasses(isActiveLink(item.href, resourceItems))} px-2.5 py-1.5`}
                    title={item.label}
                  >
                    {getIcon(item.icon as string)}
                    <span className="ml-1.5 text-xs">{item.label}</span>
                    <ChevronDown size={14} className="ml-1" />
                  </button>

                  {isResourcesOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-[110] border border-gray-200 dark:border-gray-700">
                      {resourceItems.map((resource) => (
                        <Link
                          key={resource.label}
                          to={resource.href}
                          className={`block px-4 py-3 text-sm transition-colors ${
                            isActiveLink(resource.href)
                              ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setIsResourcesOpen(false)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getIcon(resource.icon as string)}
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="font-medium">{resource.label}</div>
                              {resource.description && (
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                  {resource.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`${getActiveLinkClasses(isActiveLink(item.href))} px-2.5 py-1.5`}
                  title={item.label}
                >
                  {getIcon(item.icon as string)}
                  <span className="ml-1.5 text-xs">{item.label}</span>
                </Link>
              )
            )}
          </div>

          {/* Right: Utilities with compact icons */}
          <div className="hidden md:flex items-center space-x-0.5 flex-shrink-0">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-1.5 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Open command palette"
              title="Press Cmd+K or Ctrl+K"
            >
              <Command className="h-4 w-4" />
            </button>
            <QuickAccessMenu />
            <LanguageSwitcher variant="icon" />
            <div data-tour="theme-toggle">
              <ThemeToggle />
            </div>
            <div data-tour="user-menu">
              <UserMenu />
            </div>
          </div>
          
          {/* Mobile menu button and utilities */}
          <div className="flex items-center md:hidden flex-shrink-0 ml-auto gap-1.5">
            <div data-tour="theme-toggle">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMenu}
              data-mobile-menu-button
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none flex-shrink-0 w-9 h-9"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              {...(isOpen ? { 'aria-expanded': true } : { 'aria-expanded': false })}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div
          data-mobile-menu
          className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg fixed left-0 right-0 top-16 bottom-0 z-[105] overflow-y-auto"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {primaryNav.map((item) => 
              item.label === t('navigation.resources') ? (
                <div key={item.label}>
                  <button
                    onClick={toggleResources}
                    className={`w-full text-left text-base font-medium flex items-center justify-between rounded-md ${
                      isActiveLink(item.href, resourceItems)
                        ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                        : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {getIcon(item.icon as string)}
                      <span className="ml-2">{item.label}</span>
                    </div>
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isResourcesOpen && (
                    <div className="pl-6 py-2 space-y-1">
                      {resourceItems.map((resource) => (
                        <Link
                          key={resource.label}
                          to={resource.href}
                          className={`block px-3 py-2.5 text-base font-medium transition-colors rounded-md ${
                            isActiveLink(resource.href)
                              ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                            setIsResourcesOpen(false);
                          }}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getIcon(resource.icon as string)}
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="font-medium">{resource.label}</div>
                              {resource.description && (
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                  {resource.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.label === t('navigation.solutions') ? (
                <div key={item.label}>
                  <button
                    onClick={toggleSolutions}
                    className={`w-full text-left text-base font-medium flex items-center justify-between rounded-md ${
                      hasActiveChild(solutionItems)
                        ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                        : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {getIcon(item.icon as string)}
                      <span className="ml-2">{item.label}</span>
                    </div>
                    <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSolutionsOpen && (
                    <div className="pl-6 py-2 space-y-1">
                      {solutionItems.map((solution) => (
                        <div key={solution.label}>
                          {solution.children ? (
                            // Parent item with submenu
                            <div>
                              <button
                                onClick={toggleVendorRisk}
                                className={`w-full text-left text-base font-medium flex items-center justify-between rounded-md ${
                                  hasActiveChild(solution.children)
                                    ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                                    : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                <span>{solution.label}</span>
                                <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isVendorRiskOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {isVendorRiskOpen && (
                                <div className="pl-6 py-2 space-y-1">
                                  {solution.children.map((child) => (
                                    <Link
                                      key={child.label}
                                      to={child.href}
                                      className={`block px-3 py-2 text-sm font-medium rounded-md ${
                                        isActiveLink(child.href)
                                          ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                                          : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                                      }`}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setIsSolutionsOpen(false);
                                        setIsVendorRiskOpen(false);
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{child.label}</span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            // Regular item
                            <Link
                              to={solution.href}
                              className={`block px-3 py-2 text-base font-medium rounded-md ${
                                isActiveLink(solution.href)
                                  ? 'text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                                  : 'text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => {
                                setIsOpen(false);
                                setIsSolutionsOpen(false);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{solution.label}</span>
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-base font-medium flex items-center rounded-md ${
                    isActiveLink(item.href)
                      ? 'px-3 py-2 text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/10 dark:bg-vendorsoluce-green/20'
                      : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {getIcon(item.icon as string)}
                  <span className="ml-2">{item.label}</span>
                </Link>
              )
            )}
          </div>

          {/* Mobile Utility Controls */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Actions</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(true);
                  setIsOpen(false);
                }}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                aria-label="Open command palette"
              >
                <Command className="h-5 w-5 mr-2" />
                <span>Search</span>
              </button>
              <div className="flex items-center space-x-2">
                <LanguageSwitcher variant="icon" />
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          {/* Mobile User Menu Section */}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-3">
              <UserMenu />
            </div>
          </div>
        </div>
      )}

      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </nav>
  );
};

export default Navbar;