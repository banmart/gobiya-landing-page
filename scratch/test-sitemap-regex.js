const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/components/ArticlePage.tsx', 'utf8');

// Current sitemap generator regex
const blocksOld = content.split(/^\s{2}'[a-z0-9-]+': \{/gm);
console.log('Old regex count:', blocksOld.length - 1);

// Better regex that handles any spacing
const blocksNew = content.split(/^\s*'[a-z0-9-]+':\s*\{/gm);
console.log('New regex count:', blocksNew.length - 1);

// Let's list the slugs found by new regex
const slugsNew = [];
for (let i = 1; i < blocksNew.length; i++) {
  const slugMatch = blocksNew[i].match(/slug:\s*'([a-z0-9-]+)'/);
  if (slugMatch) slugsNew.push(slugMatch[1]);
}
console.log('All slugs found with new regex:', slugsNew);
console.log('Count:', slugsNew.length);
