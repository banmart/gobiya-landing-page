const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const target = '<svg viewBox="0 0 24 24" fill="none"><path d="M3 17 8 11 12 14 17 6 21 9" stroke="#2F5D50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>';
      const replacement = '<img src="/images/gobiya---logo.webp" alt="GOBIYA logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />';
      if (content.includes(target)) {
        content = content.split(target).join(replacement);
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir('src/components');
