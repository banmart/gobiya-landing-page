const fs = require('fs');
const css = fs.readFileSync('public/css/theme.css', 'utf8');

const regex = /[^{}]*position[^{}]*\{[^{}]*\}/gi;
let match;
console.log('Searching position occurrences in theme.css:');
const matches = [];
const words = ['page-header', 'sticky-header'];
for (const word of words) {
  const wordRegex = new RegExp(`[^\\}]*${word}[^\\}]*\\{[^\\}]*position:[^\\}]*\\}`, 'gi');
  while ((match = wordRegex.exec(css)) !== null) {
    matches.push(match[0]);
  }
}
console.log(matches);
