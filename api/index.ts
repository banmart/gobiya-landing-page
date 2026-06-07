import { IncomingMessage } from 'http';
import fs from 'fs';
import path from 'path';

// Define render function type from server bundle
type RenderFn = (url: string) => { html: string };

interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
}

// Outcome-focused metadata lookup map for crawlers and search bots
const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'Custom React Websites Built to Rank & Convert | gobiya',
    description: 'We build fast, modern React/Vite websites engineered to rank and convert natively. Complete with codebase-level CRMs and custom Web3 blockchain integrations. Get a free audit.'
  },
  '/capabilities/web-development': {
    title: 'React & Vite Web Development — Fast Custom Sites | gobiya',
    description: 'We build fully custom, sub-second React and Vite websites engineered for Core Web Vitals, indexability, and clean user experience. No templates.'
  },
  '/capabilities/native-crm': {
    title: 'Custom CRM Built Into Your Website | gobiya',
    description: 'Stop paying monthly software fees. We design and compile bespoke customer database and pipeline management systems built directly into your website\'s code.'
  },
  '/capabilities/seo-discoverability': {
    title: 'Technical SEO & Indexing for React Sites | gobiya',
    description: 'Search engine crawlability, indexation health, and AI citation eligibility are built into our codebase by default. We build sites that get found.'
  },
  '/capabilities/blockchain-web3-development': {
    title: 'Blockchain & Web3 Development — Smart Contracts, dApps | gobiya',
    description: 'We engineer secure smart contracts, decentralized applications (dApps), and on-chain integrations directly into your web applications.'
  },
  '/capabilities': {
    title: 'Our Core Capabilities: Web Development, Native CRM, SEO & Blockchain | Gobiya',
    description: 'Explore our engineering capabilities: custom React/Vite development, native codebase-level CRM pipelines, built-in SEO discoverability, and smart contract Web3 integrations.'
  },
  '/insights/gobiya-vs-enterprise-seo-agencies': {

    title: 'The Honest Truth: Gobiya vs. Enterprise SEO Agencies | Gobiya',
    description: 'Why traditional enterprise agencies charge $20k/mo for dashboard reports and slow checklists—and how technical growth engineers do SEO differently.'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: 'How AI Citations Are Quietly Hijacking B2B Decisions | Gobiya',
    description: 'B2B buyers are asking ChatGPT for recommendations before visiting your site. Here is how citation share decides who gets on the vendor shortlist.'
  },
  '/insights/automated-lead-generation-seo': {
    title: 'Turn Search Intent Into Pre-Qualified Pipeline | Gobiya',
    description: 'Traffic is vanity. We show you how to map high-intent search clusters to your B2B sales funnel to drive real contract value, not just page views.'
  },
  '/insights/outbound-seo-prospecting': {
    title: 'Stop Spamming: Turn Outbound Into a Timing Game | Gobiya',
    description: 'Cold emailing is dead unless you have timing. Learn how to monitor search intent signals to pitch buyers at the exact second they need you.'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: 'Why Your AI Sales Agents Are Failing to Book Demos | Gobiya',
    description: 'Most B2B teams deploy AI tools into broken workflows. Here is the operational framework for connecting search intent, enrichment, and automated outreach.'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: 'Evaluation Checklist: Don\'t Hire the Wrong B2B SEO Partner | Gobiya',
    description: 'Most B2B agency evaluation sheets are scoring the wrong metrics. Here is what to actually ask, what to ignore, and how to verify real technical authority.'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: 'B2B Lead Gen SEO: Target the Real Buying Committee | Gobiya',
    description: 'Stop building content for individual clicks. Learn how to architect landing pages that satisfy all 11 decision-makers in a B2B buying committee.'
  },
  '/insights/b2b-seo-agency': {
    title: 'B2B SEO Agency vs. Generalist: The Vital Difference | Gobiya',
    description: 'Generalist SEO tactics will waste your budget. Discover why B2B requires an entirely different playbook focused on pipeline value over raw traffic volume.'
  },
  '/insights/b2b-seo-agency-los-angeles': {
    title: 'LA B2B SEO: Why Proximity Matters in the AI Era | Gobiya',
    description: 'Remote agencies lose context. Learn why local partnership, real-time collaboration, and Los Angeles business fluency are key to winning local organic rankings.'
  },
  '/insights/local-seo-los-angeles': {
    title: 'LA Local SEO: Crack Google\'s Local Algorithm | Gobiya',
    description: 'Google\'s local algorithm is changing fast. Here is the exact checklist for ranking in the Los Angeles local pack and getting recommended by Gemini.'
  },
  '/insights/los-angeles-local-seo-explained': {
    title: 'The 90-Day Cadence: How We Win Local Search in LA | Gobiya',
    description: 'Local SEO isn\'t a set-it-and-forget-it task. Here is the weekly operational rhythm that actually moves the needle in the competitive LA market.'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: 'Organic Traffic is Decoupling From Pipeline Revenue | Gobiya',
    description: 'Why B2B programs are deliberately targeting less traffic to generate more pipeline—and what the new organic growth math actually looks like.'
  },
  '/insights/multi-location-seo-website-structure': {
    title: 'Prevent Cannibalization: Multi-Location SEO Architecture | Gobiya',
    description: 'Are your locations competing against each other for the same city queries? How to design a URL hierarchy that lets every branch rank independently.'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: 'Subdirectory vs. Subdomain: Best Multi-City SEO Setup | Gobiya',
    description: 'The ultimate technical guide to structuring a multi-city website directory. Avoid the structural errors that leave 80% of your locations invisible.'
  },
  '/insights/google-business-profile-optimization': {
    title: 'Google Business Profile Suspended? Reclaim Your Listing | Gobiya',
    description: 'Don\'t panic. Learn how to build an evidence package for GBP reinstatement appeals and avoid the mistakes that lead to permanent blacklisting.'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: 'Can You Actually Recover From a Google Core Update? | Gobiya',
    description: 'The honest truth about algorithm drops. Why ranking recovery no longer guarantees traffic recovery, and how to adapt to AI overviews.'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: 'Your Agency Triggered a Manual Action. Now What? | Gobiya',
    description: 'A step-by-step diagnostic checklist for when your in-house team inherits a Google penalty. Learn how to file a successful reconsideration appeal.'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: 'Manual Action vs. Algorithmic Penalty: The Vital Split | Gobiya',
    description: 'If you treat a human-issued manual action and an automated algorithm drop the same way, you\'ll fail to recover. Learn the crucial difference.'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: 'ChatGPT vs. Google: Where Are Your Customers Searching? | Gobiya',
    description: 'Traditional Google clicks are declining while ChatGPT conversion rates are 4.4x higher. Learn how to optimize your brand\'s footprint for both.'
  },
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: 'The Blueprint for Generating Predictable B2B Pipeline | Gobiya',
    description: 'Why B2B companies fail to connect SEO to pipeline revenue, and how mapping search clusters to decision-maker needs resolves it.'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: 'Case Study: How We Recovered 320% Organic Search Traffic | Gobiya',
    description: 'A step-by-step forensic breakdown of a website\'s recovery after a Google helpful content update. See the exact diagnostic audit we ran.'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'RAG & GEO: What is Generative Engine Optimization? | Gobiya',
    description: 'A complete technical guide to how RAG-based search engines cite content, why traditional SEO isn\'t enough, and how to optimize for LLMs.'
  },
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: 'What B2B Sources Do LLMs Crawl to Verify Company Info? | Gobiya',
    description: 'How ChatGPT, Claude, and Perplexity crawl external data sources to verify B2B business details. Establish a consistent entity footprint to secure citations.'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: 'Knowledge Graph Optimization vs. GEO: The Vital Difference | Gobiya',
    description: 'Understand the key differences between Google Knowledge Graph optimization and GEO in scope, era, and target engines. Learn how entity resolution gates AI citations.'
  },
  '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks': {
    title: 'Are AI Search Engines Scraping Hidden API Data or Public HTML Text Blocks? | Gobiya',
    description: 'Discover if AI engines scrape hidden APIs or read public HTML. Learn how AI crawler rendering divides impact your SEO and how to fix JavaScript invisibility.',
    image: '/images/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks.webp'
  },
  '/book': {
    title: 'Book a Pipeline Strategy Call | Gobiya',
    description: 'Schedule a 15-minute 1-on-1 strategy call with our lead developer & marketer Steve Martin to audit your organic pipeline and search traffic.'
  },
  '/book-call': {
    title: 'Book a Pipeline Strategy Call | Gobiya',
    description: 'Schedule a 15-minute 1-on-1 strategy call with our lead developer & marketer Steve Martin to audit your organic pipeline and search traffic.'
  },
  '/about/steve-martin': {
    title: 'Steve Martin | Growth Engineer & Founder of Gobiya | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin | Growth Engineer & Founder of Gobiya | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  }
};

export default async function handler(req: IncomingMessage, res: any) {
  try {
    const url = req.url || '/';
    const parsedUrl = new URL(url, 'https://www.gobiya.com');
    const pathname = parsedUrl.pathname.toLowerCase().replace(/\/$/, '') || '/';

    if (
      pathname === '/locations' || pathname.startsWith('/locations/') ||
      pathname === '/markets' || pathname.startsWith('/markets/')
    ) {
      res.writeHead(301, { Location: '/' });
      res.end();
      return;
    }

    // Server-side legacy redirections (301 Permanent Redirect)
    const legacyRedirects: Record<string, string> = {
      '/company/insights': '/insights',
      '/on-page-seo-los-angeles': '/capabilities/seo-discoverability',
      '/success-stories': '/company/success-stories',
      '/services': '/capabilities',
      '/services/seo': '/capabilities/seo-discoverability',
      '/services/geo-optimization': '/capabilities/seo-discoverability',
      '/services/lead-generation': '/capabilities/native-crm',
      '/services/web-development': '/capabilities/web-development',
      '/services/web-design': '/capabilities/web-development',
      '/services/ppc-advertising': '/capabilities/native-crm',
      '/services/advertising': '/capabilities/native-crm',
      '/google-penalty-recovery': '/capabilities/seo-discoverability',
      '/what-we-do.html': '/capabilities/seo-discoverability',
      '/capabilities/generative-engine-optimization': '/capabilities/seo-discoverability',
      '/capabilities/forensic-seo-penalty-recovery': '/capabilities/seo-discoverability',
      '/capabilities/conversion-architecture': '/capabilities/native-crm',
      '/capabilities/semantic-search-intelligence': '/capabilities/seo-discoverability',
      '/capabilities/custom-digital-infrastructure': '/capabilities/web-development'
    };

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
    const seo = metadataMap[pathname] || (pathname.startsWith('/insights/') ? {
      title: 'Industry Insights | Gobiya',
      description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies from the Gobiya team.'
    } : metadataMap['/']);

    // Build ogImageUrl
    let ogImageUrl = 'https://www.gobiya.com/images/gobiya---logo.webp';
    if (seo.image) {
      ogImageUrl = seo.image.startsWith('http') ? seo.image : `https://www.gobiya.com${seo.image}`;
    } else if (pathname.startsWith('/insights/')) {
      const slug = pathname.substring('/insights/'.length);
      if (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks') {
        ogImageUrl = `https://www.gobiya.com/images/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks.webp`;
      } else if (slug === 'seo-case-study-traffic-recovery') {
        ogImageUrl = `https://www.gobiya.com/images/how-we-recovered-320-organic-traffic-after-google-1780266793291.webp`;
      } else {
        ogImageUrl = `https://www.gobiya.com/images/article-${slug}.webp`;
      }
    }

    template = template.replace(
      '<title>More Traffic, More Leads, Less Guesswork | Gobiya</title>',
      `<title>${seo.title}</title>`
    );
    template = template.replace(
      '<meta name="description" content="Tired of being invisible online? Gobiya helps you rank higher, get cited by AI, and turn traffic into customers. Free audit, real results." />',
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
      '<meta property="og:image" content="https://www.gobiya.com/images/gobiya---logo.webp" />',
      `<meta property="og:image" content="${ogImageUrl}" />`
    );
    template = template.replace(
      '<meta name="twitter:title" content="Gobiya | AI SEO & Traffic Recovery" />',
      `<meta name="twitter:title" content="${seo.title}" />`
    );
    template = template.replace(
      '<meta name="twitter:description" content="Recover organic search traffic, scale revenue, and secure algorithmic dominance." />',
      `<meta name="twitter:description" content="${seo.description}" />`
    );
    template = template.replace(
      '<meta name="twitter:image" content="https://www.gobiya.com/images/gobiya---logo.webp" />',
      `<meta name="twitter:image" content="${ogImageUrl}" />`
    );

    // Dynamic JSON-LD Schema
    const graph: any[] = [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://www.gobiya.com/#organization",
        "name": "Gobiya",
        "url": "https://www.gobiya.com",
        "sameAs": [
          "https://www.linkedin.com/in/stevemartingobiya/",
          "https://x.com/SteveMarti66556",
          "https://www.facebook.com/people/Gobiya/100064043744190/",
          "https://m.yelp.com/biz/gobiya-los-angeles-5"
        ],
        "telephone": "(323) 744-1338",
        "foundingDate": "2012-11-15",
        "priceRange": "$$$$",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 5 },
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.gobiya.com/#logo",
          "url": "https://www.gobiya.com/images/gobiya---logo.webp",
          "caption": "Gobiya Logo"
        },
        "image": "https://www.gobiya.com/images/gobiya---logo.webp",
        "description": "Gobiya is a precision-engineered B2B SEO, Generative Engine Optimization (GEO), and sales pipeline agency based in Los Angeles, CA. We recover lost organic traffic, architect AI citation strategies, and engineer automated outbound sales systems for mid-market and enterprise brands.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3580 Wilshire Blvd, Ste 132",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90010",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 34.0617,
          "longitude": -118.3039
        },
        "areaServed": [
          { "@type": "City", "name": "Los Angeles", "sameAs": "https://www.wikidata.org/wiki/Q65" },
          { "@type": "City", "name": "San Diego", "sameAs": "https://www.wikidata.org/wiki/Q16552" },
          { "@type": "AdministrativeArea", "name": "Southern California", "sameAs": "https://www.wikidata.org/wiki/Q84827" },
          { "@type": "Country", "name": "United States", "sameAs": "https://www.wikidata.org/wiki/Q30" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gobiya Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "url": "https://www.gobiya.com/capabilities/web-development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Native CRM", "url": "https://www.gobiya.com/capabilities/native-crm" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Discoverability", "url": "https://www.gobiya.com/capabilities/seo-discoverability" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain & Web3 Development", "url": "https://www.gobiya.com/capabilities/blockchain-web3-development" } }
          ]
        },
        "knowsAbout": [
          "https://en.wikipedia.org/wiki/Search_engine_optimization",
          "https://en.wikipedia.org/wiki/Generative_artificial_intelligence",
          "https://en.wikipedia.org/wiki/B2B_marketing",
          "https://en.wikipedia.org/wiki/Pay-per-click"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.gobiya.com/#website",
        "url": "https://www.gobiya.com",
        "name": "Gobiya",
        "description": "AI-driven SEO, Organic Traffic Recovery, and Sales Pipeline Engineering.",
        "publisher": {
          "@id": "https://www.gobiya.com/#organization"
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
    ];

    if (pathname === '/') {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Generative Engine Optimization (GEO) work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GEO structures your brand's digital footprints—including custom schema graphs, entity connections, and structured tables—so conversational LLMs (such as ChatGPT, Claude, Perplexity, and Gemini) can confidently parse, recommend, and cite your business as a trusted authority."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to recover from a Google Core Update penalty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reversing algorithmic suppressions typically takes 12 to 24 weeks. The recovery process involves a forensic update audit, consolidation or pruning of thin URLs, and building clear E-E-A-T credentials that Google's quality classifiers recognize during core update cycles."
            }
          },
          {
            "@type": "Question",
            "name": "Why do traditional SEO metrics fail B2B companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional SEO tracks traffic volume and generic rankings. B2B programs require targeting low-volume, high-intent keyword clusters (like alternatives, comparison pages, and integration tables) that speak to multi-stakeholder buying committees, attributing traffic directly to CRM pipeline value."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between manual actions and algorithmic suppressions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A manual action is issued by a Google reviewer and explicitly listed in Search Console's manual actions panel; it is cleared by submitting a reconsideration request. An algorithmic suppression is automated, has no notification, and only recovers when the underlying quality classifiers are satisfied during a core rollout."
            }
          }
        ]
      });
    }

    const jsonLdSchema = {
      "@context": "https://schema.org",
      "@graph": graph
    };

    // Secondary JSON-LD Schema builder for specific page types (Articles and ProfilePage)
    let secondarySchemaTag = '';
    if (pathname.startsWith('/insights/')) {
      const slug = pathname.substring('/insights/'.length);
      const publishDate = (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks' || slug === 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo') ? "2026-06-04" :
                          (slug === 'what-data-sources-do-llms-crawl-to-verify-b2b-company-information') ? "2026-06-03" :
                          (slug === 'what-is-generative-engine-optimization-and-how-does-it-work') ? "2026-05-30" : 
                          (slug === 'what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty' || slug === 'chatgpt-vs-google-for-business-discovery') ? "2026-05-29" : 
                          "2026-05-25";

      const articleGraph: any[] = [
        {
          "@type": "BlogPosting",
          "headline": seo.title.replace(' | Gobiya', ''),
          "description": seo.description,
          "image": ogImageUrl,
          "url": `https://www.gobiya.com/insights/${slug}`,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.gobiya.com/insights/${slug}/#webpage`
          },
          "datePublished": publishDate,
          "dateModified": publishDate,
          "author": {
            "@type": "Person",
            "name": "Steve Martin",
            "jobTitle": "CEO, Lead Developer & Marketer",
            "url": "https://www.gobiya.com/about/steve-martin",
            "sameAs": [
              "https://www.linkedin.com/in/stevemartingobiya/"
            ]
          },
          "publisher": {
            "@type": "Organization",
            "@id": "https://www.gobiya.com/#organization",
            "name": "Gobiya",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.gobiya.com/images/gobiya---logo.webp"
            }
          }
        }
      ];

      if (slug === 'what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can I submit a reconsideration request for an algorithmic update drop?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Reconsideration requests are reviewed by Google employees and apply strictly to manual actions. If Search Console displays 'No issues detected,' your drop is algorithmic, and there is no manual action to appeal."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to recover from a Google manual action vs. an algorithmic suppression?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A manual action typically clears in 10 to 30 days after a successful reconsideration request. An algorithmic suppression is much slower, usually requiring weeks to months of content quality upgrades, and often won't resolve until the next Google core update cycle runs."
              }
            },
            {
              "@type": "Question",
              "name": "What is the first step I should take after seeing a traffic drop?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately check the Security & Manual Actions -> Manual Actions report in Google Search Console. If a notification is present, you have a manual action. If it says 'No issues detected,' your drop is algorithmic."
              }
            }
          ]
        });
      } else if (slug === 'chatgpt-vs-google-for-business-discovery') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does ChatGPT compare to Google in overall search volume?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google handles over 100 billion monthly visits, whereas ChatGPT processes around 4 to 5.6 billion monthly visits. While Google maintains a massive raw volume advantage, ChatGPT users have higher engagement metrics and convert better when they navigate to a recommended site."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference in conversion rates between AI referrals and Google search traffic?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI-referred visitors are observed to convert at up to 4.4 times the rate of traditional search visitors. This intent gap exists because conversational seekers are looking for synthesis and recommendations rather than just browsing multiple options, moving them further down the sales funnel before they reach a site."
              }
            },
            {
              "@type": "Question",
              "name": "What schema markup should businesses implement for ChatGPT visibility?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To establish clear machine-readable entity signals, businesses should implement Organization, LocalBusiness, Service, and FAQPage schemas. Writing these in JSON-LD is the best practice for AI retrieval engines."
              }
            }
          ]
        });
      } else if (slug === 'what-is-generative-engine-optimization-and-how-does-it-work') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does GEO differ from traditional SEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While traditional SEO focuses on ranking positions in a static list of blue links, GEO focuses on maximizing the probability that content is retrieved, synthesized, and cited in conversational AI responses. SEO is the foundational layer that ensures crawlability and indexation, while GEO optimizes content structure and authority for passage-level extraction by LLMs."
              }
            },
            {
              "@type": "Question",
              "name": "What are the most effective tactics for improving GEO visibility?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most empirically validated tactics include adding specific statistics and direct quotations, structuring content with clear headings (H2/H3) for passage-level extraction, building deep topical authority, maintaining consistent schema markup (LocalBusiness, Organization, FAQPage), and earning third-party mentions to influence the retrieval-augmented generation (RAG) pipeline."
              }
            },
            {
              "@type": "Question",
              "name": "Do AI engines crawl sites differently than Google's traditional search bots?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. AI engines use specialized user agents like GPTBot (OpenAI), PerplexityBot, and ClaudeBot to crawl content. Ensuring that your robots.txt file explicitly permits these crawlers and avoiding CDN blocklists is a critical technical requirement to enter the retrieval pool."
              }
            }
          ]
        });
      } else if (slug === 'what-data-sources-do-llms-crawl-to-verify-b2b-company-information') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Which B2B data sources do LLMs trust the most for entity verification?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "LLMs rely on a tiered source hierarchy. Structured reference databases like Wikipedia and Wikidata are Tier 1 (the gold standard). Professional databases like LinkedIn and Crunchbase form Tier 2, while business reviews platforms like G2, Capterra, and TrustRadius constitute Tier 3. High-engagement media platforms (like Reddit and YouTube) and the company's own site serve as lower-tier signals."
              }
            },
            {
              "@type": "Question",
              "name": "Why does inconsistent data across B2B directories lead to AI silence?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "LLMs verify entities by triangulating facts across multiple external databases. If they encounter contradictory data—such as differing company categories, leadership names, or locations—the model's confidence scores drop. To avoid hallucinating wrong answers, conversational engines will typically omit the company entirely rather than risk citing incorrect information."
              }
            },
            {
              "@type": "Question",
              "name": "How can a B2B company technically signal its entity relationships to AI crawlers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most direct method is implementing Organization schema in JSON-LD format on the company website, utilizing the sameAs property. This explicitly declares the machine-readable links between your website and your official profiles on Wikidata, LinkedIn, Crunchbase, and category-specific review platforms."
              }
            }
          ]
        });
      } else if (slug === 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the primary difference between Google Knowledge Graph optimization and GEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google Knowledge Graph optimization focuses on entity resolution specifically within Google's database to correctly represent your brand (often resulting in a Knowledge Panel), whereas Generative Engine Optimization (GEO) focuses on getting your content cited and recommended across the entire multi-engine AI ecosystem (such as ChatGPT, Claude, Gemini, and Perplexity)."
              }
            },
            {
              "@type": "Question",
              "name": "Why is Knowledge Graph optimization considered a foundation for GEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Generative engines utilize RAG (Retrieval-Augmented Generation) pipelines and require high confidence to cite sources without hallucinating. A cleanly resolved entity in Google's Knowledge Graph, supported by structured data like Wikidata and schema markup, provides the verification foundation that these engines rely on to cite a brand."
              }
            },
            {
              "@type": "Question",
              "name": "How are Google Knowledge Panels and AI answers converging?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google's Knowledge Panel descriptions, which historically drew from Wikipedia, are increasingly being replaced by Gemini-generated multi-source summaries. This indicates that the entity understanding layer (Knowledge Graph) and the generative answering layer (AI Overviews/AI Mode) are merging into a single system inside Google."
              }
            }
          ]
        });
      } else if (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do AI search engines scrape data from private or hidden APIs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, AI engines do not scrape private or authenticated APIs. They make standard HTTP requests to public URLs and parse the raw HTML response. If your content depends on client-side JavaScript to fetch data from APIs after the page loads, AI crawlers will not see it."
              }
            },
            {
              "@type": "Question",
              "name": "Do ClaudeBot, GPTBot, and PerplexityBot render JavaScript?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Unlike Googlebot, which uses a headless browser to render JavaScript (often with a delay), major AI bots like GPTBot, ClaudeBot, PerplexityBot, Bytespider, and Meta-ExternalAgent only fetch and read raw server-rendered HTML. They do not execute JavaScript at all."
              }
            },
            {
              "@type": "Question",
              "name": "How can I verify if my website is visible to AI search engines?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The simplest test is to disable JavaScript in your browser settings and refresh your page. Any text, images, or schema data that disappears when JavaScript is turned off is client-side rendered and completely invisible to AI search engine crawlers."
              }
            }
          ]
        });
      }

      const articleSchema = {
        "@context": "https://schema.org",
        "@graph": articleGraph
      };
      secondarySchemaTag = `\n    <script id="article-schema" type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;
    } else if (pathname === '/about/steve-martin' || pathname === '/author/steve-martin') {
      const authorSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Steve Martin",
          "jobTitle": "CEO, Lead Developer & Marketer",
          "worksFor": {
            "@type": "Organization",
            "name": "Gobiya",
            "url": "https://www.gobiya.com"
          },
          "image": "https://www.gobiya.com/images/steve-portrait.webp",
          "description": "Steve Martin is the CEO, Lead Developer, and Marketer at Gobiya, with 25+ years of experience helping contractors, dental practices, real estate, and SaaS startups grow through organic search, paid media, and custom React/Vite development.",
          "url": "https://www.gobiya.com/about/steve-martin",
          "sameAs": [
            "https://www.linkedin.com/in/stevemartingobiya/"
          ],
          "knowsAbout": [
            "Search Engine Optimization (SEO)",
            "Generative Engine Optimization (GEO)",
            "React Engineering",
            "B2B Sales Pipeline Automation",
            "Paid Media (PPC)",
            "Digital PR & Link Building"
          ],
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Glendale Career College"
          }
        }
      };
      secondarySchemaTag = `\n    <script id="author-schema" type="application/ld+json">${JSON.stringify(authorSchema)}</script>`;
    }

    const schemaTag = `<script id="schema-script" type="application/ld+json">${JSON.stringify(jsonLdSchema)}</script>${secondarySchemaTag}`;
    template = template.replace('<!--schema-outlet-->', schemaTag);

    // Set response headers and return server-rendered page
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(template);
  } catch (error: any) {
    console.error('Vercel SSR rendering failed:', error);
    res.status(500).send(`SSR Error: ${error.message}`);
  }
}
