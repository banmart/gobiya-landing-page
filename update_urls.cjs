const fs = require('fs');
const files = [
  'c:/Users/banma/projects/v-hero/src/App.tsx',
  'c:/Users/banma/projects/v-hero/src/lib/solutionsData.ts',
  'c:/Users/banma/projects/v-hero/src/components/ServiceSubpage.tsx',
  'c:/Users/banma/projects/v-hero/src/components/SolutionPage.tsx',
  'c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx'
];

const replacements = {
  '/capabilities/creativity-agency': '/creativity',
  '/capabilities/performance-agency': '/performance',
  '/capabilities/relations-agency': '/relations',
  '/capabilities/web-development-agency': '/performance/web-development-agency',
  '/capabilities/native-crm-agency': '/performance/native-crm-agency',
  '/capabilities/seo-discoverability-agency': '/performance/seo-discoverability-agency',
  '/capabilities/blockchain-web3-development-agency': '/performance/blockchain-web3-development-agency',
  '/capabilities/ai-prospect-scraper-agency': '/performance/ai-prospect-scraper-agency',
  '/capabilities/ai-llms-business-agency': '/performance/ai-llms-business-agency',
  '/capabilities/authority-building-agency': '/relations/authority-building-agency',
};

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace hardcoded strings
    for (const [oldUrl, newUrl] of Object.entries(replacements)) {
      content = content.split(oldUrl).join(newUrl);
    }
    
    // Also fix the fanOutMatch regex in App.tsx
    if (file.endsWith('App.tsx')) {
        content = content.replace(
            /const fanOutMatch = normalizedPath\.match\(\/\^\\\\\/capabilities\\\\\/\\\(\[a-z0-9-\]\+\-agency\\\)\\\\\/\\\(\[a-z0-9-\]\+\\\)\$\/\);/,
            "const fanOutMatch = normalizedPath.match(/^\\\\/(creativity|performance|relations)\\\\/([a-z0-9-]+-agency)$/);"
        );
        
        // Let's just do a simpler replace for the regex since the exact string might differ
        content = content.replace(
            "const fanOutMatch = normalizedPath.match(/^\\/capabilities\\/([a-z0-9-]+-agency)\\/([a-z0-9-]+)$/);",
            "const fanOutMatch = normalizedPath.match(/^\\/(creativity|performance|relations)\\/([a-z0-9-]+-agency)$/);"
        );
    }
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
