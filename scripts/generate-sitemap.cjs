const fs = require('fs');
const path = require('path');

// 1. Get current date for lastmod (YYYY-MM-DD format)
const currentDate = new Date().toISOString().split('T')[0];

// 2. Define static core pages
const corePages = [
  { url: 'https://www.gobiya.com/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/capabilities', priority: '0.85', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/web-development', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/native-crm', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/seo-discoverability', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/blockchain-web3-development', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/ai-prospect-scraper', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/ai-llms-business', priority: '0.90', changefreq: 'weekly', lastmod: '2026-06-13' },
  { url: 'https://www.gobiya.com/capabilities/authority-building', priority: '0.90', changefreq: 'weekly', lastmod: currentDate },
  { url: 'https://www.gobiya.com/insights', priority: '0.75', changefreq: 'daily', lastmod: currentDate },
  { url: 'https://www.gobiya.com/company/about', priority: '0.70', changefreq: 'monthly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/company/success-stories', priority: '0.80', changefreq: 'weekly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/company/approach', priority: '0.80', changefreq: 'weekly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/contact', priority: '0.85', changefreq: 'weekly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/book', priority: '0.80', changefreq: 'weekly', lastmod: '2026-06-04' },
  { url: 'https://www.gobiya.com/about/steve-martin', priority: '0.70', changefreq: 'monthly', lastmod: '2026-05-25' },
  { url: 'https://www.gobiya.com/author/steve-martin', priority: '0.70', changefreq: 'monthly', lastmod: '2026-05-25' },
  { url: 'https://www.gobiya.com/case-studies/smile-center-dentistry', priority: '0.80', changefreq: 'monthly', lastmod: '2026-05-28' },
  { url: 'https://www.gobiya.com/case-studies/american-livescan', priority: '0.80', changefreq: 'monthly', lastmod: '2026-05-28' }
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
const articleBlocks = articlePageContent.split(/^\s{2}'[a-z0-9-]+': \{/gm);

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
