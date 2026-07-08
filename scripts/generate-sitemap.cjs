const fs = require('fs');
const path = require('path');

// 1. Get current date for lastmod (YYYY-MM-DD format)
const currentDate = new Date().toISOString().split('T')[0];

// 2. Read api/index.ts to extract static routes dynamically
const apiPath = path.resolve(__dirname, '../api/index.ts');
const apiContent = fs.readFileSync(apiPath, 'utf8');

const metadataMapMatch = apiContent.match(/const metadataMap: Record<string, SEOMetadata> = \{([\s\S]*?)\n\};/);
if (!metadataMapMatch) {
  console.error("Could not find metadataMap in api/index.ts");
  process.exit(1);
}

const mapContent = metadataMapMatch[1];
// Extract keys: looking for lines that start with '  '/some-path': {'
const routeRegex = /^\s*'(\/[^']+)'\s*:/gm;
let staticRoutes = [];
let match;
while ((match = routeRegex.exec(mapContent)) !== null) {
  const route = match[1];
  // Exclude image paths that might have accidentally matched
  if (!route.startsWith('/images/')) {
    staticRoutes.push(route);
  }
}

// Map static routes to sitemap objects
const corePages = staticRoutes.map(route => {
  let priority = '0.85';
  let changefreq = 'weekly';
  
  if (route === '/') {
    priority = '1.0';
  } else if (route.startsWith('/capabilities') || route.startsWith('/creativity') || route.startsWith('/performance') || route.startsWith('/relations')) {
    priority = '0.90';
  } else if (route === '/insights') {
    priority = '0.75';
    changefreq = 'daily';
  } else if (route.startsWith('/about') || route.startsWith('/author')) {
    priority = '0.70';
    changefreq = 'monthly';
  }

  // Ensure root URL doesn't end with a trailing slash in the sitemap if route is '/'
  const urlPath = route === '/' ? '' : route;
  
  return {
    url: `https://www.gobiya.com${urlPath}`,
    priority,
    changefreq,
    lastmod: currentDate
  };
});

console.log(`Extracted ${corePages.length} core pages from api/index.ts`);

// 4. Use only core pages since articles are removed
const allPages = [...corePages];

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
