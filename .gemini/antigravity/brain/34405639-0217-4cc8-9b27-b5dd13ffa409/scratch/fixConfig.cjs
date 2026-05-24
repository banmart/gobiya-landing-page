const fs = require('fs');
let content = fs.readFileSync('src/components/ServiceSubpage.tsx', 'utf8');

// The replacement was:
// const normalPath = currentPath.toLowerCase().replace(/\/$/, '');
// let config: Partial<PageConfig> = {};
// const normalPath = currentPath.toLowerCase().replace(/\/$/, ''); // original code from regex
content = content.replace(
  /let config: Partial<PageConfig> = {};\s+const normalPath = currentPath.toLowerCase\(\)\.replace\(\/\\\\\/\\$\/, ''\); \/\/ normalize trailing slash/,
  `let config: Partial<PageConfig> = {};`
);

fs.writeFileSync('src/components/ServiceSubpage.tsx', content);
