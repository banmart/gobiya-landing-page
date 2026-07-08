const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const missing = ['ServiceSubpage', 'ArticlePage', 'InsightsPage', 'RegionalHubPage', 'OnPageSeoLosAngelesPage', 'AiSeoBeverlyHillsPage', 'LocalSeoBurbankPage', 'SeoCompanyEncinoPage', 'LosAngelesSeoProf', 'GlendaleSeoPage', 'PlasticSurgeryMarketingPage', 'InternetMarketingServicesLosAngelesPage', 'AiSearchMarketingSantaClaritaPage', 'ApproachPage'];

missing.forEach(m => {
  // Remove from imports
  code = code.replace(new RegExp(`\\b${m}\\b,?`, 'g'), '');
  // Remove ternary branches
  const branchRegex = new RegExp(`\\)\\s*:\\s*.*?\\?\\s*\\(\\s*<\\s*${m}\\b[^>]*>\\s*`, 'g');
  code = code.replace(branchRegex, '');
});

// Fix remaining dangling else (since ServiceSubpage was the fallback in many places)
// Specifically: `) : (\n        <ServiceSubpage ... />\n      )}` -> `) : null}`
code = code.replace(/\)\s*:\s*\(\s*<ServiceSubpage[^>]*>\s*\)/g, ') : null');
// Or just `) : <ServiceSubpage ... />` 
code = code.replace(/\)\s*:\s*<ServiceSubpage[^>]*>/g, ') : null');

fs.writeFileSync('src/App.tsx', code);
