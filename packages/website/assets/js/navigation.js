/**
 * VendorSoluce Navigation System
 * Handles mobile menu, active navigation states, and breadcrumb height calculation
 */

(function() {
    'use strict';

    /**
     * Initialize Dropdown Menus
     */
    function initDropdowns() {
        const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');
        
        dropdownButtons.forEach(button => {
            const dropdownId = button.getAttribute('data-dropdown-toggle');
            const dropdown = document.getElementById(dropdownId + '-dropdown');
            const parent = button.closest('.nav-dropdown');
            
            if (!dropdown || !parent) return;
            
            // Toggle dropdown on click
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = parent.classList.contains('open');
                
                // Close all other dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    if (d !== parent) {
                        d.classList.remove('open');
                    }
                });
                
                // Toggle current dropdown
                if (isOpen) {
                    parent.classList.remove('open');
                } else {
                    parent.classList.add('open');
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) {
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    d.classList.remove('open');
                });
            }
        });
        
        // Close dropdowns on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    d.classList.remove('open');
                });
            }
        });
    }

    /**
     * Initialize Mobile Menu
     */
    function initMobileMenu() {
        const menuButton = document.querySelector('[data-mobile-menu-button]');
        if (!menuButton) return;

        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (!mobileMenu) return;

        // Toggle menu
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMobileMenu(menuButton, mobileMenu);
            } else {
                openMobileMenu(menuButton, mobileMenu);
            }
        });

        // Close menu when clicking outside (skip if clicking a link - let it navigate)
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href]')) return;
            if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    closeMobileMenu(menuButton, mobileMenu);
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu(menuButton, mobileMenu);
            }
        });

        // Close menu when clicking a link inside
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu(menuButton, mobileMenu);
            });
        });
    }

    function openMobileMenu(button, menu) {
        menu.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu(button, menu) {
        menu.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    }

    /**
     * Set Active Navigation Link
     * Marks the current page's navigation link as active
     */
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        const normalizedCurrentFile = currentFile.split('?')[0].split('#')[0];
        
        // Find navigation menu links (exclude branding and action buttons)
        const desktopNavMenu = document.querySelector('nav > div.hidden.md\\:flex.md\\:items-center');
        const desktopNavLinks = desktopNavMenu ? desktopNavMenu.querySelectorAll('a[title][href]') : [];
        const mobileNavLinks = document.querySelectorAll('[data-mobile-menu] a[href]');
        const navLinks = [...desktopNavLinks, ...mobileNavLinks];
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;
            
            // Skip branding link
            if (link.closest('[data-tour="main-nav"]')) {
                return;
            }
            
            // Skip Vendor Radar button
            if (link.getAttribute('title') === 'Vendor Radar' || 
                link.querySelector('svg.lucide-radar') ||
                link.textContent.trim().includes('Vendor Radar')) {
                return;
            }
            
            // Skip action buttons area
            const parentContainer = link.parentElement;
            if (parentContainer && (
                parentContainer.querySelector('[data-tour="user-menu"]') || 
                parentContainer.querySelector('[data-tour="theme-toggle"]') ||
                parentContainer.classList.contains('flex-shrink-0')
            )) {
                const hasActionButtons = parentContainer.querySelector('[data-tour="user-menu"]') || 
                                        parentContainer.querySelector('[data-tour="theme-toggle"]');
                if (hasActionButtons) {
                    return;
                }
            }
            
            // Extract filename from href
            let linkFile = href.replace(/^\.\.?\//, '').split('/').pop() || '';
            linkFile = linkFile.split('?')[0].split('#')[0];
            
            // Check if this link matches the current page
            const isCurrentPage = 
                linkFile === normalizedCurrentFile || 
                (normalizedCurrentFile === '' && linkFile === 'index.html') ||
                (normalizedCurrentFile === 'index.html' && linkFile === 'index.html');
            
            if (isCurrentPage) {
                // Add active class and update styles
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                
                // Update classes for active state
                let classes = link.getAttribute('class') || '';
                
                // Remove inactive classes
                classes = classes
                    .replace(/\btext-gray-700\b/g, '')
                    .replace(/\btext-white\b/g, '')
                    .replace(/\bdark:text-gray-300\b/g, '')
                    .replace(/\bdark:text-white\b/g, '')
                    .replace(/\bhover:bg-gray-50\b/g, '')
                    .replace(/\bdark:hover:bg-gray-700\b/g, '')
                    .replace(/\bhover:bg-gray-600\b/g, '')
                    .replace(/\bhover:text-vendorsoluce-green\b/g, '')
                    .replace(/\bdark:hover:text-white\b/g, '');
                
                // Add active classes
                classes += ' text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/20 dark:bg-vendorsoluce-green/30 border border-vendorsoluce-green/30 dark:border-vendorsoluce-green/40 hover:bg-vendorsoluce-green/30 dark:hover:bg-vendorsoluce-green/40';
                
                // Clean up extra spaces
                classes = classes.replace(/\s+/g, ' ').trim();
                link.setAttribute('class', classes);
            } else {
                // Remove active state
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Calculate and set breadcrumb height
     * Updates CSS variable for proper main content padding
     */
    function updateBreadcrumbHeight() {
        const breadcrumb = document.querySelector('[data-breadcrumb="true"]');
        if (!breadcrumb) {
            document.documentElement.style.setProperty('--breadcrumb-height', '0px');
            return;
        }

        const height = breadcrumb.offsetHeight;
        document.documentElement.style.setProperty('--breadcrumb-height', `${height}px`);
    }

    /**
     * Initialize all navigation functionality
     */
    function init() {
        function runInit() {
            initDropdowns();
            initMobileMenu();
            setActiveNavLink();
            updateBreadcrumbHeight();
            window.addEventListener('resize', updateBreadcrumbHeight);
        }
        // Always wait for full DOM so mobile menu panel (often after script) exists
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                requestAnimationFrame(runInit);
            });
        } else {
            requestAnimationFrame(runInit);
        }
    }

    // Start initialization
    init();
})();
