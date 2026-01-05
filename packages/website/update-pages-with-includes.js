import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of HTML files to update
const htmlFiles = [
  'index.html',
  'about.html',
  'how-it-works.html',
  'features.html',
  'pricing.html',
  'trust.html',
  'faq.html',
  'contact.html',
  'legal/index.html',
  'legal/privacy-policy.html',
  'legal/cookie-policy.html',
  'legal/terms.html',
  'legal/acceptable-use-policy.html'
];

function updateFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} (not found)`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const filename = path.basename(filePath);
  const isLegalPage = filePath.includes('legal/');
  const scriptPath = isLegalPage ? '../includes/load-shared.js' : 'includes/load-shared.js';

  // Check if script is already included
  if (content.includes('load-shared.js')) {
    console.log(`Skipping ${filePath} (already has load-shared.js)`);
    return;
  }

  // Add script before closing </head> tag
  if (content.includes('</head>')) {
    content = content.replace('</head>', `    <script src="${scriptPath}" defer></script>\n</head>`);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Warning: ${filePath} does not have </head> tag`);
  }
}

// Update all files
htmlFiles.forEach(updateFile);

console.log('\nDone! All HTML files have been updated with load-shared.js script.');

