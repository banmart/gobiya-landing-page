import { IncomingMessage } from 'http';
import fs from 'fs';
import path from 'path';

// Define render function type from server bundle
type RenderFn = (url: string) => { html: string };

interface SEOMetadata {
  title: string;
  description: string;
}

// Outcome-focused metadata lookup map for crawlers and search bots
const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'Gobiya | AI SEO, Traffic Recovery & Algorithmic Search Dominance',
    description: 'We engineer AI-driven SEO and sales pipelines to recover lost organic traffic, scale predictable revenue, and secure long-term algorithmic dominance for high-stakes brands.'
  },
  '/services/seo': {
    title: 'Search Engine Optimization (SEO) & Algorithmic Dominance | Gobiya',
    description: 'Reclaim your search engine positions. We deliver entity-level SEO, topical authority architectures, and advanced technical search audits built for search dominance.'
  },
  '/services/lead-generation': {
    title: 'Predictable B2B Sales Pipeline & Lead Generation Systems | Gobiya',
    description: 'Scale your contract value and outbound pipeline. We design and launch automated cold outreach and sales acquisition protocols for mid-market and enterprise brands.'
  },
  '/services/geo-optimization': {
    title: 'Generative Engine Optimization (GEO) & AI Search Visibility | Gobiya',
    description: 'Position your brand to be cited and recommended natively by modern AI models including ChatGPT, Claude, Gemini, and Google AI Overviews.'
  },
  '/services/web-development': {
    title: 'High-Performance Custom Web Development & React Engineering | Gobiya',
    description: 'Speed-optimized, custom-engineered React platforms built to convert. We replace slow templates with lightning-fast landing pages and applications.'
  },
  '/services/ppc-advertising': {
    title: 'High-Yield Paid Search (PPC) & Paid Social Ad Pipelines | Gobiya',
    description: 'Maximize your return on ad spend (ROAS) and lower acquisition costs. Data-driven Google, Microsoft, and Meta Ads management tailored for revenue scaling.'
  },
  '/google-penalty-recovery': {
    title: 'Forensic Update & Google Penalty Recovery Protocol | Gobiya',
    description: 'Recover lost search traffic. We diagnose and reverse manual action penalties and organic traffic declines caused by Google helpful content & core updates.'
  },
  '/company/about': {
    title: 'About Gobiya | AI-Driven SEO & B2B Pipeline Engineering Agency',
    description: 'Learn about our approach to algorithmic dominance, generative search, and revenue-scaling pipelines.'
  },
  '/company/success-stories': {
    title: 'Client Success Stories & SEO Case Studies | Gobiya',
    description: 'Explore how we recover organic traffic, build predictive B2B pipelines, and secure market dominance.'
  },
  '/company/approach': {
    title: 'Our Approach to Search Dominance & B2B Growth | Gobiya',
    description: 'Discover our proprietary methodology for algorithmic audits, penalty recovery, and B2B pipeline acceleration.'
  },
  '/insights': {
    title: 'Industry Insights, SEO Trends & Search Intelligence | Gobiya',
    description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies.'
  },
  '/company/careers': {
    title: 'Careers at Gobiya | Join Our Elite SEO & Engineering Team',
    description: 'We are hiring top-tier SEO specialists, React engineers, and growth strategists to dominate the search landscape.'
  },
  '/contact': {
    title: 'Contact Gobiya | Let\'s Scale Your Search Revenue',
    description: 'Reach out to our engineering team in Los Angeles to discuss algorithmic audits, AI traffic recovery, and pipeline architecture.'
  },
  '/services': {
    title: 'Bespoke Services & Consolidated Digital Growth Engines | Gobiya',
    description: 'We consolidate forensic SEO, traffic recovery, generative engine optimization (GEO), high-speed React engineering, and automated outbound sales pipelines.'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: 'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026 | Gobiya',
    description: 'How AI-cited content qualifies B2B vendors for buyer shortlists — and what the 2026 shift to AI-driven research means for your pipeline.'
  },
  '/insights/automated-lead-generation-seo': {
    title: 'Automated Lead Generation SEO: How AI Pre-Qualifies Your Pipeline in 2026 | Gobiya',
    description: 'How AI-cited content produces pre-qualified pipeline at conversion rates traditional lead gen cannot match — and what the 2026 shift means for B2B teams.'
  },
  '/insights/outbound-seo-prospecting': {
    title: 'Outbound SEO Prospecting: Timing-Anchored Outreach Powered by Intent Signals in 2026 | Gobiya',
    description: 'How SEO-derived intent signals turn outbound from a volume game into a timing game — and what the 2026 data says about cold vs signal-anchored prospecting.'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: 'B2B Sales Pipeline Automation: The Orchestration Layer for AI-Driven Revenue | Gobiya',
    description: 'How orchestration between SEO, intent capture, enrichment, and outbound determines whether automation produces revenue — and why most B2B teams are deploying AI agents into broken workflows.'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: 'How to Choose the Best SEO Agency for B2B Brands in 2026 | Gobiya',
    description: 'The 2026 evaluation framework for picking a B2B SEO partner — what to measure, what to ignore, and why most "best agency" lists are scoring the wrong things.'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: 'SEO for B2B Lead Generation: How Committee-Architecture Content Outperforms Single-Persona Funnels | Gobiya',
    description: 'How content architected for an 11-person buying committee outperforms content built for a single converter — and why B2B lead gen SEO in 2026 looks fundamentally different from every other category.'
  },
  '/insights/b2b-seo-agency': {
    title: 'B2B SEO Agency Explained: Choosing the Right Revenue Partner | Gobiya',
    description: 'What a B2B SEO agency actually is, how it differs structurally from generalists serving B2B clients, and why the distinction matters in the AI search era.'
  },
  '/insights/b2b-seo-agency-los-angeles': {
    title: 'B2B SEO Agency in Los Angeles: Why Local Partnership Outperforms Remote Vendor Relationships in 2026 | Gobiya',
    description: 'How proximity, time-zone alignment, and LA business culture fluency have become more valuable rather than less in an AI-search era — and what LA-based B2B operators should actually be evaluating.'
  },
  '/insights/local-seo-los-angeles': {
    title: 'Local SEO for Los Angeles Businesses: How the 2026 Algorithm and AI Layer Determine Who Gets Found | Gobiya',
    description: 'How Google\'s 2026 local search algorithm — and the AI layer now sitting on top of it — determines whether LA customers find your business or your competitor\'s.'
  },
  '/insights/los-angeles-local-seo-explained': {
    title: 'Los Angeles Local SEO Explained: The Operational Cadence Required for Search Dominance | Gobiya',
    description: 'The actual operational rhythm of running local SEO in LA — what the weekly cadence looks like, what produces visible ranking movement at 30 / 60 / 90 days, and why most LA businesses stall.'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: 'B2B Organic Traffic Growth: Why Traffic and Pipeline Decoupled in 2026 | Gobiya',
    description: 'How traffic and pipeline decoupled in B2B during 2025-2026, why the best B2B SEO programs are now growing less traffic on purpose, and what the new organic growth math actually looks like.'
  },
  '/insights/multi-location-seo-website-structure': {
    title: 'Multi-Location SEO Website Structure Explained: Architecting for Search Dominance | Gobiya',
    description: 'How website architecture — URL hierarchy, page-to-GBP mapping, content uniqueness, and internal linking — determines whether locations rank independently or cannibalize each other.'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: 'What Is the Best Website Structure for a Business With Multiple Locations in Different Cities? | Gobiya',
    description: 'The single-domain subdirectory decision, state-city-location hierarchy, cross-city cannibalization failure, and how geographic market separation changes the structural choices for multi-city businesses.'
  },
  '/insights/google-business-profile-optimization': {
    title: 'Google Business Profile Optimization for Traffic Recovery Explained | Gobiya',
    description: 'How to diagnose Google Business Profile suspension or ranking degradation, build an evidence package for reinstatement appeals, and avoid the panic-driven mistakes that lead to permanent bans.'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: 'Can a Site Fully Recover From a Google Core Update? | Gobiya',
    description: 'The honest answer to core update recovery: whether and how fully sites recover, what genuinely drives recovery, and why ranking recovery no longer guarantees traffic recovery in the AI overview era.'
  },
  '/about/steve-martin': {
    title: 'Steve Martin | CEO, Lead Developer & Marketer | Gobiya',
    description: 'Professional credentials and author profile for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in advanced SEO, custom React engineering, and pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin | CEO, Lead Developer & Marketer | Gobiya',
    description: 'Professional credentials and author profile for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in advanced SEO, custom React engineering, and pipeline automation.'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: 'Google Manual Action Removal When Your Agency Caused Scaled Content Abuse Penalty | Gobiya',
    description: 'What to do when your in-house team is suddenly responsible for recovering a Google manual action your agency triggered. Diagnosis, narrative, and reconsideration appeal steps.'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: 'What Is the Difference Between a Manual Action and an Algorithmic Penalty? | Gobiya',
    description: 'The single most important distinction in Google traffic recovery: why a human-issued manual action and an automated algorithmic suppression are completely different problems.'
  }
};

export default async function handler(req: IncomingMessage, res: any) {
  try {
    const url = req.url || '/';
    const parsedUrl = new URL(url, 'https://www.gobiya.com');
    const pathname = parsedUrl.pathname.toLowerCase().replace(/\/$/, '') || '/';

    // Server-side legacy redirections (301 Permanent Redirect)
    const legacyRedirects: Record<string, string> = {
      '/services/web-design': '/services/web-development',
      '/services/advertising': '/services/ppc-advertising',
      '/company/insights': '/insights',
    };

    if (pathname.startsWith('/locations')) {
      res.writeHead(301, { Location: '/services' });
      res.end();
      return;
    }

    if (legacyRedirects[pathname]) {
      res.writeHead(301, { Location: legacyRedirects[pathname] });
      res.end();
      return;
    }

    // Load server-side rendering logic
    // Compiled by Vite to dist/server/entry-server.js during deployment build
    const serverModulePath = path.join(process.cwd(), 'dist', 'server', 'entry-server.js');
    
    // Check if SSR bundle exists
    if (!fs.existsSync(serverModulePath)) {
      throw new Error(`SSR build output not found at ${serverModulePath}. Ensure npm run build completes successfully.`);
    }

    const { render } = (await import(serverModulePath)) as { render: RenderFn };

    // Read index.html from built client assets
    const templatePath = path.join(process.cwd(), 'dist', 'client', 'index.html');
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Client build output template not found at ${templatePath}.`);
    }

    let template = fs.readFileSync(templatePath, 'utf-8');

    // Run React SSR rendering
    const { html } = render(pathname);

    // Replace placeholders with dynamic SSR output
    template = template.replace('<!--ssr-outlet-->', html);

    // Dynamic canonical url builder
    // Ensures bots index the URL path they crawled (e.g. /services/seo)
    const canonicalUrl = `https://www.gobiya.com${pathname === '/' ? '' : pathname}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    template = template.replace('<!--canonical-outlet-->', canonicalTag);

    // Dynamically inject outcome-focused meta tags for the requested path
    const seo = metadataMap[pathname] || metadataMap['/'];

    template = template.replace(
      '<title>Gobiya | AI SEO, Traffic Recovery & Algorithmic Search Dominance</title>',
      `<title>${seo.title}</title>`
    );
    template = template.replace(
      '<meta name="description" content="We engineer AI-driven SEO and sales pipelines to recover lost organic traffic, scale predictable revenue, and secure long-term algorithmic dominance for high-stakes brands." />',
      `<meta name="description" content="${seo.description}" />`
    );
    template = template.replace(
      '<meta property="og:title" content="Gobiya | AI SEO & Traffic Recovery Agency" />',
      `<meta property="og:title" content="${seo.title}" />`
    );
    template = template.replace(
      '<meta property="og:description" content="Recover lost organic search traffic, automate your B2B sales pipeline, and command search engine visibility with our outcome-driven AI engineering." />',
      `<meta property="og:description" content="${seo.description}" />`
    );
    template = template.replace(
      '<meta name="twitter:title" content="Gobiya | AI SEO & Traffic Recovery" />',
      `<meta name="twitter:title" content="${seo.title}" />`
    );
    template = template.replace(
      '<meta name="twitter:description" content="Recover organic search traffic, scale revenue, and secure algorithmic dominance." />',
      `<meta name="twitter:description" content="${seo.description}" />`
    );

    // Dynamic JSON-LD Schema
    const jsonLdSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://www.gobiya.com/#agency",
          "name": "Gobiya",
          "url": "https://www.gobiya.com",
          "telephone": "(310) 307-9830",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.gobiya.com/#logo",
            "url": "https://www.gobiya.com/images/gobiya---logo.webp",
            "caption": "Gobiya Logo"
          },
          "image": "https://www.gobiya.com/images/gobiya---logo.webp",
          "description": "Gobiya is a premier AI-driven SEO and B2B pipeline agency engineering organic search recovery, algorithmic dominance, and predictable revenue growth for high-stakes brands.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "138 N Berendo St",
            "addressLocality": "Los Angeles",
            "addressRegion": "CA",
            "postalCode": "90004",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 34.0739,
            "longitude": -118.2938
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.gobiya.com/#website",
          "url": "https://www.gobiya.com",
          "name": "Gobiya",
          "description": "AI-driven SEO, Organic Traffic Recovery, and Sales Pipeline Engineering.",
          "publisher": {
            "@id": "https://www.gobiya.com/#agency"
          }
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}/#webpage`,
          "url": canonicalUrl,
          "name": seo.title,
          "description": seo.description,
          "isPartOf": {
            "@id": "https://www.gobiya.com/#website"
          }
        }
      ]
    };

    const schemaTag = `<script id="schema-script" type="application/ld+json">${JSON.stringify(jsonLdSchema)}</script>`;
    template = template.replace('<!--schema-outlet-->', schemaTag);

    // Set response headers and return server-rendered page
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(template);
  } catch (error: any) {
    console.error('Vercel SSR rendering failed:', error);
    res.status(500).send(`SSR Error: ${error.message}`);
  }
}
