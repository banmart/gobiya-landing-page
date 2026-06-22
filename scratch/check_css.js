const fs = require('fs');
const css = fs.readFileSync('public/css/theme.css', 'utf8');

const matches = [];
const regex = /[^{}]*header[^{}]*\{/gi;
let match;
while ((match = regex.exec(css)) !== null) {
  matches.push(match[0]);
}

console.log('Matches count:', matches.length);
console.log('First 20 matches:', matches.slice(0, 20));
