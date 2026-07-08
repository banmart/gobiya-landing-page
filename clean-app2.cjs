const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const missing = [
  'ServiceSubpage', 'ArticlePage', 'InsightsPage', 'RegionalHubPage', 
  'OnPageSeoLosAngelesPage', 'AiSeoBeverlyHillsPage', 'LocalSeoBurbankPage', 
  'SeoCompanyEncinoPage', 'LosAngelesSeoProf', 'GlendaleSeoPage', 
  'PlasticSurgeryMarketingPage', 'InternetMarketingServicesLosAngelesPage', 
  'AiSearchMarketingSantaClaritaPage', 'ApproachPage'
];

missing.forEach(m => {
  // Remove the block like: `) : normalizedPath === '/...' ? (\n  <ComponentName ... />\n`
  // We match from `) : ` up to the `<Component />` part.
  const regex1 = new RegExp(`\\)\\s*:\\s*.*?\\?\\s*\\(\\s*<${m}\\b[^>]*>\\s*`, 'g');
  code = code.replace(regex1, '');
  
  // Also match fallback like `) : (\n  <Component />\n)`
  const regex2 = new RegExp(`\\)\\s*:\\s*\\(\\s*<${m}\\b[^>]*>\\s*\\)`, 'g');
  code = code.replace(regex2, ') : null');
  
  // Also match articleSlug ? <ArticlePage />
  const regex3 = new RegExp(`\\)\\s*:\\s*articleSlug\\s*\\?\\s*\\(\\s*<${m}\\b[^>]*>\\s*`, 'g');
  code = code.replace(regex3, '');

  // Remove bare fallbacks like `) : <ServiceSubpage ... />`
  const regex4 = new RegExp(`\\)\\s*:\\s*<${m}\\b[^>]*>`, 'g');
  code = code.replace(regex4, ') : null');

  // Finally remove the import statement itself
  const importRegex = new RegExp(`\\s*${m}\\b,?\\s*`, 'g');
  code = code.replace(importRegex, '');
});

fs.writeFileSync('src/App.tsx', code);
