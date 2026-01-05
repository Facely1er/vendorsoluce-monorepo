import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read index.html
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract nav element (from <nav class="bg-white... to </nav>)
const navMatch = indexContent.match(/<nav class="bg-white[^>]*>([\s\S]*?)<\/nav>/);
if (!navMatch) {
  console.error('Could not find nav element');
  process.exit(1);
}

// Extract footer element
const footerMatch = indexContent.match(/<footer class="bg-gray-900[^>]*>([\s\S]*?)<\/footer>/);
if (!footerMatch) {
  console.error('Could not find footer element');
  process.exit(1);
}

// Create includes directory if it doesn't exist
const includesDir = path.join(__dirname, 'includes');
if (!fs.existsSync(includesDir)) {
  fs.mkdirSync(includesDir, { recursive: true });
}

// Write header.html (just the nav element)
const headerContent = `<nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-[100] w-full">${navMatch[1]}</nav>`;
fs.writeFileSync(path.join(includesDir, 'header.html'), headerContent, 'utf8');
console.log('Created includes/header.html');

// Write footer.html (just the footer element)
const footerContent = `<footer class="bg-gray-900 text-white">${footerMatch[1]}</footer>`;
fs.writeFileSync(path.join(includesDir, 'footer.html'), footerContent, 'utf8');
console.log('Created includes/footer.html');

console.log('\nExtraction complete!');

