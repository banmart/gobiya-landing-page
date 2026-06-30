const fs = require('fs');

const apiIndex = fs.readFileSync('api/index.ts', 'utf8');

// Extract metadataMap using a regex or simple eval if we extract the string
const match = apiIndex.match(/const metadataMap: Record<string, SEOMetadata> = (\{[\s\S]*?\n\};)/);
if (!match) {
    console.error("Could not find metadataMap in api/index.ts");
    process.exit(1);
}

const mapString = match[1];
// We can parse it by replacing a few things or just evaling it in a loose context
let keys = [];
try {
    const mapObj = eval('(' + mapString + ')');
    keys = Object.keys(mapObj);
} catch (e) {
    console.error("Eval failed", e);
    // Fallback: extract keys using regex
    const keyRegex = /'(.*?)':\s*\{/g;
    let kMatch;
    while ((kMatch = keyRegex.exec(mapString)) !== null) {
        keys.push(kMatch[1]);
    }
}

const today = new Date().toISOString().split('T')[0];

const sitemapUrls = keys.map(urlPath => {
    let loc = `https://www.gobiya.com${urlPath === '/' ? '' : urlPath}`;
    
    // priority logic
    let priority = '0.80';
    let changefreq = 'monthly';
    
    if (urlPath === '/') {
        priority = '1.0';
        changefreq = 'weekly';
    } else if (urlPath.startsWith('/performance') || urlPath.startsWith('/relations') || urlPath.startsWith('/creativity') || urlPath.startsWith('/capabilities')) {
        priority = '0.90';
        changefreq = 'weekly';
    } else if (urlPath.startsWith('/insights')) {
        priority = '0.80';
        changefreq = 'monthly';
    }
    
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemapXml);
console.log('sitemap.xml updated with ' + keys.length + ' valid URLs.');
