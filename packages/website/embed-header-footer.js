import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read header and footer files
const headerPath = path.join(__dirname, 'includes', 'header.html');
const footerPath = path.join(__dirname, 'includes', 'footer.html');

const headerHtml = fs.readFileSync(headerPath, 'utf-8');
const footerHtml = fs.readFileSync(footerPath, 'utf-8');

// Mobile menu JavaScript: event delegation so it works regardless of script/panel order
const mobileMenuScript = `
<script>
(function() {
    document.addEventListener('click', function(e) {
        var menuButton = e.target.closest('[data-mobile-menu-button]');
        if (menuButton) {
            e.preventDefault();
            e.stopPropagation();
            var mobileMenu = document.querySelector('[data-mobile-menu]');
            if (!mobileMenu) return;
            var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.remove('hidden');
                menuButton.setAttribute('aria-expanded', 'true');
                menuButton.setAttribute('aria-label', 'Close menu');
                document.body.style.overflow = 'hidden';
            }
            return;
        }
        var mobileMenu = document.querySelector('[data-mobile-menu]');
        var btn = document.querySelector('[data-mobile-menu-button]');
        if (mobileMenu && btn && !mobileMenu.contains(e.target) && !btn.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
                btn.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            }
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var mobileMenu = document.querySelector('[data-mobile-menu]');
            var menuButton = document.querySelector('[data-mobile-menu-button]');
            if (mobileMenu && menuButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            }
        }
    });
    document.addEventListener('click', function(e) {
        var link = e.target.closest('[data-mobile-menu] a[href]');
        if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
            var mobileMenu = document.querySelector('[data-mobile-menu]');
            var menuButton = document.querySelector('[data-mobile-menu-button]');
            if (mobileMenu && menuButton) {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            }
        }
    }, true);
    
    // Set active navigation link based on current page
    function setActiveNavLink() {
        // Get current page filename
        const currentPath = window.location.pathname;
        let currentFile = currentPath.split('/').pop() || 'index.html';
        currentFile = currentFile.split('?')[0].split('#')[0];
        
        // Handle root/index page
        if (currentFile === '' || currentFile === '/' || currentFile === 'index.html') {
            currentFile = 'index.html';
        }
        
        // Find only navigation menu links (exclude branding and action buttons)
        // Only target links in the desktop navigation menu container (not action buttons area)
        const desktopNavMenu = document.querySelector('nav > div.hidden.md\\:flex.md\\:items-center');
        const desktopNavLinks = desktopNavMenu ? desktopNavMenu.querySelectorAll('a[title][href]') : [];
        const mobileNavLinks = document.querySelectorAll('[data-mobile-menu] a[href]');
        const navLinks = [...desktopNavLinks, ...mobileNavLinks];
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;
            
            // Double-check: skip branding link (inside data-tour="main-nav")
            if (link.closest('[data-tour="main-nav"]')) {
                return;
            }
            
            // Skip Vendor Radar button (has radar icon)
            if (link.querySelector('svg.lucide-radar')) {
                return;
            }
            
            // Extract filename from href (handle relative paths like ./index.html, ../index.html, index.html)
            let linkFile = href.replace(/^\.\.?\//, '').split('/').pop() || '';
            linkFile = linkFile.split('?')[0].split('#')[0];
            
            // Normalize: if linkFile is empty or just '/', treat as index.html
            if (linkFile === '' || linkFile === '/') {
                linkFile = 'index.html';
            }
            
            // Check if this link matches the current page
            const isCurrentPage = linkFile === currentFile;
            
            if (isCurrentPage) {
                // Get current classes
                let classes = link.getAttribute('class') || '';
                
                // Remove inactive color/state classes only
                classes = classes
                    .replace(/\btext-gray-700\b/g, '')
                    .replace(/\bdark:text-gray-300\b/g, '')
                    .replace(/\bhover:bg-gray-50\b/g, '')
                    .replace(/\bdark:hover:bg-gray-700\b/g, '')
                    .replace(/\bhover:text-vendorsoluce-green\b/g, '')
                    .replace(/\bdark:hover:text-white\b/g, '')
                    // Also remove any existing active classes to avoid duplicates
                    .replace(/\btext-vendorsoluce-green\b/g, '')
                    .replace(/\bdark:text-white\b/g, '')
                    .replace(/\bbg-vendorsoluce-green\/20\b/g, '')
                    .replace(/\bdark:bg-vendorsoluce-green\/30\b/g, '')
                    .replace(/\bborder\b/g, '')
                    .replace(/\bborder-vendorsoluce-green\/30\b/g, '')
                    .replace(/\bdark:border-vendorsoluce-green\/40\b/g, '')
                    .replace(/\bhover:bg-vendorsoluce-green\/30\b/g, '')
                    .replace(/\bdark:hover:bg-vendorsoluce-green\/40\b/g, '');
                
                // Add active classes
                classes += ' text-vendorsoluce-green dark:text-white bg-vendorsoluce-green/20 dark:bg-vendorsoluce-green/30 border border-vendorsoluce-green/30 dark:border-vendorsoluce-green/40 hover:bg-vendorsoluce-green/30 dark:hover:bg-vendorsoluce-green/40';
                
                // Clean up extra spaces
                classes = classes.replace(/\s+/g, ' ').trim();
                link.setAttribute('class', classes);
            } else {
                // Ensure non-active links have default styling (remove any active classes)
                let classes = link.getAttribute('class') || '';
                if (classes.includes('text-vendorsoluce-green') && classes.includes('bg-vendorsoluce-green/20')) {
                    // Remove active classes
                    classes = classes
                        .replace(/\btext-vendorsoluce-green\b/g, '')
                        .replace(/\bdark:text-white\b/g, '')
                        .replace(/\bbg-vendorsoluce-green\/20\b/g, '')
                        .replace(/\bdark:bg-vendorsoluce-green\/30\b/g, '')
                        .replace(/\bborder\b/g, '')
                        .replace(/\bborder-vendorsoluce-green\/30\b/g, '')
                        .replace(/\bdark:border-vendorsoluce-green\/40\b/g, '')
                        .replace(/\bhover:bg-vendorsoluce-green\/30\b/g, '')
                        .replace(/\bdark:hover:bg-vendorsoluce-green\/40\b/g, '');
                    
                    // Add default classes if not present
                    if (!classes.includes('text-gray-700')) {
                        classes += ' text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700';
                    }
                    
                    classes = classes.replace(/\s+/g, ' ').trim();
                    link.setAttribute('class', classes);
                }
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setActiveNavLink);
    } else {
        setActiveNavLink();
    }
})();
</script>`;

// Function to adjust paths for subdirectories
function adjustPathsForSubdirectory(html, isSubdirectory) {
    if (!isSubdirectory) {
        return html;
    }
    
    // Adjust relative paths - add ../ prefix
    return html
        .replace(/href="([^"]*\.html)"/g, (match, href) => {
            // Skip absolute URLs and URLs that already have ../
            if (href.startsWith('http') || href.startsWith('/') || href.startsWith('../')) {
                return match;
            }
            return `href="../${href}"`;
        })
        .replace(/src="\.\/([^"]*)"/g, 'src="../$1"')
        .replace(/src="([^"]*homepage_files[^"]*)"/g, 'src="../$1"');
}

// Function to process a single HTML file
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const isSubdirectory = filePath.includes(path.sep + 'legal' + path.sep);
    
    let updatedContent = content;
    
    // Replace header placeholder or update existing header
    if (content.includes('<div id="shared-header"></div>')) {
        let adjustedHeader = headerHtml;
        if (isSubdirectory) {
            adjustedHeader = adjustPathsForSubdirectory(headerHtml, true);
        }
        // Add mobile menu script after the header
        adjustedHeader = adjustedHeader + mobileMenuScript;
        updatedContent = updatedContent.replace(
            '<div id="shared-header"></div>',
            adjustedHeader
        );
    } else if (content.includes('<!-- Shared Header Navigation for VendorSoluce -->')) {
        // Header is already embedded - replace the entire header section
        // Match from the comment to the end of the mobile menu panel (before <main or </body>)
        const headerStart = content.indexOf('<!-- Shared Header Navigation for VendorSoluce -->');
        const mainStart = content.indexOf('<main', headerStart);
        const bodyEnd = content.indexOf('</body>', headerStart);
        let endPos = mainStart !== -1 && (bodyEnd === -1 || mainStart < bodyEnd) ? mainStart : bodyEnd;
        
        // If we found mainStart, look backwards to find the closing </div> of the mobile menu panel
        if (endPos !== -1 && endPos > headerStart) {
            // Look for the pattern </div></div></div> that closes the mobile menu panel
            // The mobile menu panel ends with </div></div></div> before <main
            let searchStart = endPos - 1;
            let divCount = 0;
            let foundEnd = false;
            let lastDivPos = -1;
            
            // Find the last </div> before <main
            for (let i = searchStart; i >= headerStart; i--) {
                if (content.substring(i, i + 6) === '</div>') {
                    divCount++;
                    if (lastDivPos === -1) lastDivPos = i;
                    // Look for the pattern of three closing divs
                    if (divCount >= 3) {
                        // Check if this is the end of the mobile menu panel
                        const beforeDiv = content.substring(Math.max(0, i - 50), i);
                        if (beforeDiv.includes('Mobile Menu Panel') || beforeDiv.includes('data-mobile-menu')) {
                            endPos = i + 6; // Position after the last </div>
                            foundEnd = true;
                            break;
                        }
                    }
                }
            }
            
            // If we didn't find the exact end, use the position before <main
            if (!foundEnd && mainStart !== -1) {
                endPos = mainStart;
            }
        }
        
        if (headerStart !== -1 && endPos !== -1 && endPos > headerStart) {
            let adjustedHeader = headerHtml;
            if (isSubdirectory) {
                adjustedHeader = adjustPathsForSubdirectory(headerHtml, true);
            }
            // Add mobile menu script after the header
            adjustedHeader = adjustedHeader + mobileMenuScript;
            updatedContent = content.substring(0, headerStart) + adjustedHeader + content.substring(endPos);
        }
    }
    
    // Also update logo size if it's still the old size (in header)
    updatedContent = updatedContent.replace(
        /class="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 transition-transform group-hover:scale-105"/g,
        'class="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 flex-shrink-0 transition-transform group-hover:scale-105"'
    );
    
    // Remove hardcoded active state from Home link - let JavaScript handle it dynamically
    // Replace Home link that has active styling with default styling
    // Match Home link with active classes (class attribute comes first in the HTML)
    updatedContent = updatedContent.replace(
        /<a\s+class="[^"]*text-vendorsoluce-green[^"]*bg-vendorsoluce-green\/20[^"]*border[^"]*border-vendorsoluce-green\/30[^"]*"\s+title="Home"\s+href="[^"]*index\.html">/g,
        '<a class="px-2.5 py-1.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-vendorsoluce-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center" title="Home" href="index.html">'
    );
    
    // Fix missing transition-colors on navigation links
    // Match navigation links that have hover classes but no transition-colors
    // Simple replacement: add transition-colors before "flex items-center" if not present
    // This must run AFTER header replacement to fix any missing transitions
    // Match the exact pattern: hover:bg-gray-50 dark:hover:bg-gray-700 followed by flex items-center"
    updatedContent = updatedContent.replace(
        /hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"/g,
        'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"'
    );
    
    if (content.includes('data-mobile-menu-button') && !content.includes('initMobileMenu')) {
        // Header is already embedded but mobile menu script is missing
        // Find where to insert it (after the mobile menu div closes)
        const mobileMenuPattern = /(<\/div>\s*<\/div>\s*<\/nav>)/;
        if (mobileMenuPattern.test(content)) {
            updatedContent = content.replace(mobileMenuPattern, '$1' + mobileMenuScript);
        }
    }
    
    // Also update logo size if it's still the old size (in header)
    updatedContent = updatedContent.replace(
        /class="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 transition-transform group-hover:scale-105"/g,
        'class="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 flex-shrink-0 transition-transform group-hover:scale-105"'
    );
    
    // Replace footer placeholder or update existing footer
    if (content.includes('<div id="shared-footer"></div>')) {
        let adjustedFooter = footerHtml;
        if (isSubdirectory) {
            adjustedFooter = adjustPathsForSubdirectory(footerHtml, true);
        }
        updatedContent = updatedContent.replace(
            '<div id="shared-footer"></div>',
            adjustedFooter
        );
    } else if (content.includes('<footer')) {
        // Footer is already embedded - replace the entire footer section to update branding
        const footerPattern = /<footer[^>]*>[\s\S]*?<\/footer>/;
        if (footerPattern.test(content)) {
            let adjustedFooter = footerHtml;
            if (isSubdirectory) {
                adjustedFooter = adjustPathsForSubdirectory(footerHtml, true);
            }
            updatedContent = content.replace(footerPattern, adjustedFooter);
        }
    }
    
    // Remove the load-shared.js script since we're embedding directly
    updatedContent = updatedContent.replace(
        /<script src="[^"]*includes\/load-shared\.js"[^>]*><\/script>\s*/gi,
        ''
    );
    updatedContent = updatedContent.replace(
        /<script src="\.\.\/includes\/load-shared\.js"[^>]*><\/script>\s*/gi,
        ''
    );
    
    // Only write if content changed
    if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`✓ Updated: ${path.relative(__dirname, filePath)}`);
        return true;
    }
    
    return false;
}

// Find all HTML files
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'includes' && file !== 'homepage_files' && file !== 'radar') {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Main execution
console.log('Embedding header and footer into HTML files...\n');

const htmlFiles = findHtmlFiles(__dirname);
let updatedCount = 0;

htmlFiles.forEach(file => {
    if (processFile(file)) {
        updatedCount++;
    }
});

console.log(`\n✓ Processed ${htmlFiles.length} files, updated ${updatedCount} files.`);

