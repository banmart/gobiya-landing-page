const fs = require('fs');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all ' - Gobiya' with ' | Gobiya' in titles
  content = content.replace(/ - Gobiya`/g, ' | Gobiya`');
  content = content.replace(/ - Gobiya"/g, ' | Gobiya"');

  const replacements = [
    [
      `title: \`Los Angeles Digital Marketing Agency: Rank on Google & AI | Gobiya\``,
      `title: \`Digital Marketing Agency | Gobiya\``
    ],
    [
      `description: \`Lost rankings after a Google update? Invisible in ChatGPT answers? Gobiya is a Los Angeles digital marketing agency that recovers organic traffic and engineers AI citations for local service businesses and B2B firms.\``,
      `description: \`We recover organic traffic and improve AI search citations for local service businesses and B2B firms.\``
    ],
    [
      `title: \`On-Page SEO Los Angeles: rankings in Google & AI search | Gobiya\``,
      `title: \`On-Page SEO Services | Gobiya\``
    ],
    [
      `description: \`On-page SEO services in Los Angeles that turn organic drops into recovered rankings — entity structure, schema, speed, and content mapping optimized for Google and AI engines.\``,
      `description: \`On-page SEO services to improve structure, speed, and content mapping for modern search engines.\``
    ],
    [
      `title: \`AI SEO Beverly Hills: ChatGPT, Claude & Gemini citations | Gobiya\``,
      `title: \`AI SEO Services | Gobiya\``
    ],
    [
      `description: \`AI SEO Beverly Hills — we engineer Google organic visibility and AI platform citations (ChatGPT, Claude, Gemini) for Beverly Hills businesses in the 90210 market. Entity graphs, GEO, and local Map Pack engineering.\``,
      `description: \`We engineer organic visibility and AI platform citations for businesses using entity graphs and Generative Engine Optimization.\``
    ],
    [
      `title: \`SEO Company Encino: Google visibility & AI citations, BBB A+ | Gobiya\``,
      `title: \`SEO Company | Gobiya\``
    ],
    [
      `description: \`SEO company in Encino engineering Google visibility, AI citations, and organic pipeline growth for businesses on Ventura Boulevard and throughout the San Fernando Valley.\``,
      `description: \`SEO company focused on search visibility, AI citations, and organic pipeline growth for your business.\``
    ],
    [
      `title: \`Local SEO Company Burbank: Map Pack & GBP, open now | Gobiya\``,
      `title: \`Local SEO Company | Gobiya\``
    ],
    [
      `description: \`Local SEO company Burbank — we engineer Google Map Pack dominance, GBP optimization, citation consistency, and review velocity for businesses on San Fernando Boulevard and throughout the Burbank, CA 91501–91510 market.\``,
      `description: \`Local SEO services that help you dominate the Map Pack, optimize your Google Business Profile, and improve citation consistency.\``
    ],
    [
      `title: \`Glendale SEO: Map Pack & technical SEO, BBB A+ | Gobiya\``,
      `title: \`Technical & Local SEO | Gobiya\``
    ],
    [
      `description: \`Glendale SEO agency — technical SEO, local Map Pack optimization, content architecture, and authority building for businesses in the 91201–91210 market. Top rated, BBB A+, online appointments available. Book a pre-read today.\``,
      `description: \`Technical SEO, local Map Pack optimization, and content architecture services to build authority for your business.\``
    ],
    [
      `title: \`Plastic Surgery Marketing: booked consultations, not clicks | Gobiya\``,
      `title: \`Plastic Surgery Marketing | Gobiya\``
    ],
    [
      `description: \`Plastic surgery internet marketing agency — procedure-specific SEO, compliant Google Ads, content architecture for 3–6 month consideration cycles, review velocity management, and AI citation visibility.\``,
      `description: \`Marketing services for plastic surgeons, focusing on procedure-specific SEO, compliant ads, and AI citation visibility.\``
    ],
    [
      `title: \`Internet Marketing Los Angeles: visibility turned into pipeline | Gobiya\``,
      `title: \`Internet Marketing Services | Gobiya\``
    ],
    [
      `description: \`Gobiya provides top rated internet marketing services in Los Angeles — SEO, CRM pipeline automation, web development, and AI-driven online visibility for businesses across California. Founded 2010, BBB A+ rated.\``,
      `description: \`Internet marketing services including SEO, CRM pipeline automation, web development, and AI-driven online visibility.\``
    ],
    [
      `title: \`AI Search Marketing Santa Clarita: Cited in ChatGPT & Perplexity\``,
      `title: \`AI Search Marketing | Gobiya\``
    ],
    [
      `description: \`Gobiya engineers the localized schema and entity graph that get your Santa Clarta business cited in ChatGPT and Perplexity answers — AI visibility turned into booked work.\``,
      `description: \`We engineer localized schema and entity graphs to get your business cited in ChatGPT and Perplexity answers.\``
    ],
    [
      `title: \`Los Angeles SEO: entity graph & AI citations, BBB A+ | Gobiya\``,
      `title: \`SEO Professional Services | Gobiya\``
    ],
    [
      `description: \`Los Angeles SEO professional practice. Gobiya engineers technical SEO, commercial-intent content architecture, entity schema, and AI citation visibility for B2B brands and professional services firms across Greater Los Angeles.\``,
      `description: \`Technical SEO, commercial-intent content architecture, entity schema, and AI citation visibility for B2B brands and professional services.\``
    ]
  ];

  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }

  // Schema data updates requested by user:
  // "and update all bot files and schema data" 
  // We can also ensure standard organization schema is clear.
  // We'll leave the article schemas as they are functionally correct.

  fs.writeFileSync(filePath, content);
}

cleanFile('src/components/SEO.tsx');
cleanFile('api/index.ts');
console.log("Rewrite complete");
