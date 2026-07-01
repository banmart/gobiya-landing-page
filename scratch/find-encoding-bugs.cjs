const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '..', 'src'));
console.log(`Scanning ${files.length} files...`);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('\uFFFD') || content.includes('\u00ef\u00bf\u00bd')) {
    console.log(`Found in: ${file}`);
    // Print lines containing it
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('\uFFFD') || line.includes('\u00ef\u00bf\u00bd')) {
        console.log(`  Line ${idx + 1}: ${line.trim()}`);
      }
    });
  }
});
