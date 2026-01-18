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
  
  // Skip if placeholders already exist
  if (content.includes('id="shared-header"') && content.includes('id="shared-footer"')) {
    console.log(`Skipping ${filePath} (already has placeholders)`);
    return;
  }

  // Replace the first <nav> element (or nav inside #root) with placeholder
  // Look for nav that's likely the header navigation
  const navPattern = /<nav[^>]*class="[^"]*bg-white[^"]*dark:bg-gray-800[^"]*"[^>]*>[\s\S]*?<\/nav>/;
  if (navPattern.test(content)) {
    // Find the nav and replace it with placeholder
    content = content.replace(navPattern, '<div id="shared-header"></div>');
    console.log(`Replaced nav with placeholder in ${filePath}`);
  } else {
    // Try to find any nav element at the start of body
    const bodyNavPattern = /<body[^>]*>[\s\S]*?(<nav[^>]*>[\s\S]*?<\/nav>)/;
    const match = content.match(bodyNavPattern);
    if (match) {
      content = content.replace(match[1], '<div id="shared-header"></div>');
      console.log(`Replaced first nav with placeholder in ${filePath}`);
    } else {
      // If no nav found, add placeholder after <body>
      content = content.replace(/<body[^>]*>/, '$&\n    <div id="shared-header"></div>');
      console.log(`Added header placeholder in ${filePath}`);
    }
  }

  // Replace footer element with placeholder
  const footerPattern = /<footer[^>]*>[\s\S]*?<\/footer>/;
  if (footerPattern.test(content)) {
    content = content.replace(footerPattern, '<div id="shared-footer"></div>');
    console.log(`Replaced footer with placeholder in ${filePath}`);
  } else {
    // If no footer found, add placeholder before </body>
    content = content.replace(/<\/body>/, '    <div id="shared-footer"></div>\n</body>');
    console.log(`Added footer placeholder in ${filePath}`);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Update all files
htmlFiles.forEach(updateFile);

console.log('\nDone! All HTML files have been updated with header and footer placeholders.');

