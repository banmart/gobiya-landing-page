const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('/case-studies')) {
        content = content.replace(/'\/case-studies'/g, "'/work'");
        content = content.replace(/"\/case-studies"/g, '"/work"');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir('src/components');
console.log('Replaced /case-studies with /work in src/components');
