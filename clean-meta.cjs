const fs = require('fs');
const files = ['src/components/SEO.tsx', 'api/index.ts'];
const pathsToRemove = [
  '/on-page-seo-los-angeles',
  '/ai-seo-beverly-hills',
  '/local-seo-company-burbank',
  '/seo-company-encino',
  '/los-angeles-seo-professional',
  '/glendale-seo',
  '/plastic-surgery-internet-marketing',
  '/internet-marketing-services-los-angeles',
  '/ai-search-marketing-santa-clarita'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  for (const pathToRemove of pathsToRemove) {
    const regex = new RegExp(`\\s*'${pathToRemove}':\\s*\\{[^}]+\\},?`, 'g');
    content = content.replace(regex, '');
  }
  fs.writeFileSync(file, content);
});
console.log('Metadata removed');
