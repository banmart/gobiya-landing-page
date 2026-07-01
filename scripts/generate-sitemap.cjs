const fs = require('fs');
const path = require('path');

// 1. Get current date for lastmod (YYYY-MM-DD format)
const currentDate = new Date().toISOString().split('T')[0];

// 2. Define static core pages
const corePages = [
  { url: 'https://www.gobiya.com', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/capabilities', priority: '0.85', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/web-development', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/native-crm', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/seo-discoverability', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/blockchain-web3-development', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/ai-prospect-scraper', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/ai-llms-business', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/authority-building', priority: '0.90', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/insights', priority: '0.75', changefreq: 'daily', lastmod: currentDate },
  { url: 'https://www.gobiya.com/about', priority: '0.70', changefreq: 'monthly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/case-studies', priority: '0.80', changefreq: 'weekly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/approach', priority: '0.80', changefreq: 'weekly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/contact', priority: '0.85', changefreq: 'weekly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/book', priority: '0.80', changefreq: 'weekly', lastmod: '2026-06-04' },
  { url: 'https://www.gobiya.com/about/steve-martin', priority: '0.70', changefreq: 'monthly', lastmod: '2026-05-25' },
  { url: 'https://www.gobiya.com/author/steve-martin', priority: '0.70', changefreq: 'monthly', lastmod: '2026-05-25' },
  { url: 'https://www.gobiya.com/case-studies/smile-center-dentistry', priority: '0.80', changefreq: 'monthly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/case-studies/american-livescan', priority: '0.80', changefreq: 'monthly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/google-penalty-recovery', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  
  // Category Pages
  { url: 'https://www.gobiya.com/creativity', priority: '0.90', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance', priority: '0.90', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/relations', priority: '0.90', changefreq: 'weekly', lastmod: currentDate },

  // Creativity Fan-Outs
  { url: 'https://www.gobiya.com/creativity/brand-identity-strategy-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/communication-concepts-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/seo-web-copywriting-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/creative-art-direction-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/social-media-management-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },

  // Performance Fan-Outs
  { url: 'https://www.gobiya.com/performance/seo-discoverability-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/web-development-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/google-ads-ppc-strategy-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/cro-ux-analysis-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/ai-llms-business-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/native-crm-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/blockchain-web3-development-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/performance/ai-prospect-scraper-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },

  // Relations Fan-Outs
  { url: 'https://www.gobiya.com/relations/authority-building-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/relations/digital-pr-media-outreach-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/relations/content-marketing-syndication-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/relations/influencer-marketing-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/relations/local-community-relations-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },

  // New Pages / Local Pages
  { url: 'https://www.gobiya.com/ai-search-marketing-santa-clarita', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/on-page-seo-los-angeles', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/ai-seo-beverly-hills', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/local-seo-glendale', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/seo-company-encino', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/local-seo-company-burbank', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/local-seo-services-burbank', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/glendale-seo', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/plastic-surgery-internet-marketing', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/internet-marketing-services-los-angeles', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/los-angeles-seo-professional', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },

  // New Creativity Pages
  { url: 'https://www.gobiya.com/creativity/seo-content-strategy-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/geo-ai-content-writing-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/ai-videos-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/crypto-web3-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/landing-page-copywriting-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/creativity/website-copywriting-services-agency', priority: '0.85', changefreq: 'weekly', lastmod: currentDate }
];

// 3. Read ArticlePage.tsx content to extract article slugs and dates
const articlePagePath = path.resolve(__dirname, '../src/components/ArticlePage.tsx');
const articlePageContent = fs.readFileSync(articlePagePath, 'utf8');

// Match slugs and dates
// Example structure:
// 'multi-location-websites-for-franchises': {
//   slug: 'multi-location-websites-for-franchises',
//   ...
//   date: 'June 13, 2026',
const articleBlocks = articlePageContent.split(/^\s*'[a-z0-9-]+':\s*\{/gm);

const articles = [];
// Skip first block as it's the file header
for (let i = 1; i < articleBlocks.length; i++) {
  const block = articleBlocks[i];
  
  // Extract slug
  const slugMatch = block.match(/slug:\s*'([a-z0-9-]+)'/);
  if (!slugMatch) continue;
  const slug = slugMatch[1];
  
  // Extract date string and convert to YYYY-MM-DD
  const dateMatch = block.match(/date:\s*'([^']+)'/);
  let formattedDate = currentDate; // Fallback
  if (dateMatch) {
    try {
      const dateVal = new Date(dateMatch[1]);
      if (!isNaN(dateVal.getTime())) {
        formattedDate = dateVal.toISOString().split('T')[0];
      }
    } catch (e) {
      console.warn(`Failed to parse date for ${slug}: ${dateMatch[1]}`);
    }
  }
  
  articles.push({
    url: `https://www.gobiya.com/insights/${slug}`,
    priority: '0.80',
    changefreq: 'monthly',
    lastmod: formattedDate
  });
}

console.log(`Extracted ${articles.length} articles from ArticlePage.tsx`);

// 4. Combine core pages and articles
const allPages = [...corePages, ...articles];

// 5. Generate XML content
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const page of allPages) {
  xml += '  <url>\n';
  xml += `    <loc>${page.url}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>\n';

// 6. Write sitemap.xml
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`Successfully generated sitemap.xml at ${sitemapPath} with ${allPages.length} entries.`);
