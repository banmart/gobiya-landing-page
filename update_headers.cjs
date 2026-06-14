const fs = require('fs');

const files = [
  'src/components/CapabilitiesIndex.tsx',
  'src/components/GobiyaAboutPage.tsx',
  'src/components/SolutionPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const headerRegex = /<header className="site-nav">[\s\S]*?<\/header>/;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, '<SiteHeader />');
    changed = true;
  }

  const footerRegex = /<footer className="footer">[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, '<SiteFooter />');
    changed = true;
  }

  if (changed) {
    if (!content.includes('import SiteHeader')) {
      content = content.replace('import React', 'import SiteHeader from "./SiteHeader";\nimport SiteFooter from "./SiteFooter";\nimport React');
    }
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}
