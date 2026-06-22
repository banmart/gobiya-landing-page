const fs = require('fs');

let content = fs.readFileSync('c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx', 'utf8');

content = content.replace(
  /className="menu-main-en-container hidden lg:flex w-full justify-end static"/g, 
  'className="menu-main-en-container flex w-full justify-end static"'
);

fs.writeFileSync('c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx', content);

let cssContent = fs.readFileSync('c:/Users/banma/projects/v-hero/src/index.css', 'utf8');
cssContent += '\n\n@media (max-width: 1023px) {\n  .menu-main-en-container {\n    display: none !important;\n  }\n}\n';
fs.writeFileSync('c:/Users/banma/projects/v-hero/src/index.css', cssContent);
console.log('Fixed desktop menu disappearing');
