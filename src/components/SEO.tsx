import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
}

const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'Custom React Websites Built to Rank & Convert | gobiya',
    description: 'We build custom React websites engineered to rank and convert natively. Includes codebase-level CRM pipelines and Web3 integrations. Get a free audit.'
  },
  '/capabilities/web-development': {
    title: 'React Web Development — Fast Custom Websites | gobiya',
    description: 'Our React web development agency builds sub-second custom websites engineered for Core Web Vitals, crawlability, and conversions.'
  },
  '/capabilities/native-crm': {
    title: 'Custom CRM Website Integration — Zero SaaS Fees | gobiya',
    description: 'We build custom CRM website integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data.'
  },
  '/capabilities/seo-discoverability': {
    title: 'Technical SEO for React Websites & Indexing | gobiya',
    description: 'We build technical SEO for React websites into the codebase, optimizing crawlability, rendering speed, and AI citations.'
  },
  '/capabilities/blockchain-web3-development': {
    title: 'Blockchain Web3 Development — Smart Contracts | gobiya',
    description: 'Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.'
  },
  '/capabilities/ai-prospect-scraper': {
    title: 'AI Prospect Scraper — Automate Outbound Leads | gobiya',
    description: 'Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.'
  },
  '/company/about': {
    title: 'Custom Web Development Company: Gobiya Story | Gobiya',
    description: 'Gobiya is a custom web development company and search engineering agency rebuilding traffic pipelines and recovering penalties since 2012.'
  },
  '/company/success-stories': {
    title: 'Technical SEO Case Studies: Real Growth Wins | Gobiya',
    description: 'Read our technical SEO case studies detailing over 300% organic growth for B2B brands and local medical clinics. Review real data.'
  },
  '/success-stories': {
    title: 'Technical SEO Case Studies: Real Growth Wins | Gobiya',
    description: 'Read our technical SEO case studies detailing over 300% organic growth for B2B brands and local medical clinics. Review real data.'
  },
  '/company/approach': {
    title: 'B2B Organic Search Strategy: Gobiya Blueprint | Gobiya',
    description: 'Our proprietary B2B organic search strategy for diagnosing crawl errors, building topical authority, and scaling pipeline acquisitions.'
  },
  '/insights': {
    title: 'SEO Audits, GEO Tactics & AI Search Insights | Gobiya',
    description: 'We share technical SEO audits, Generative Engine Optimization (GEO) tactics, and search algorithm insights for B2B engineering teams.'
  },
  '/insights/dental-seo-agency': {
    title: 'Dental SEO Agency Checklist: KPIs & Red Flags | Gobiya',
    description: 'How to select the right dental SEO agency. Read our evaluation checklist covering KPIs, contract terms, and local maps pack performance.'
  },
  '/company/careers': {
    title: 'Growth Engineering Jobs: Join Gobiya\'s Team | Gobiya',
    description: 'Explore growth engineering jobs at Gobiya. We are hiring React developers, technical SEO specialists, and sales engineers. Apply now.'
  },
  '/contact': {
    title: 'Request Website SEO Audit: Free Strategy Call | Gobiya',
    description: 'Ready to grow? Request website SEO audit sessions and strategy roadmaps directly from our lead engineers. Secure your free review.'
  },
  '/book': {
    title: 'Book Pipeline Strategy Call with Steve Martin | Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/book-call': {
    title: 'Book Pipeline Strategy Call with Steve Martin | Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/capabilities': {
    title: 'Custom Web Development Services & Technical SEO | Gobiya',
    description: 'We provide custom web development services, native CRM integrations, technical SEO, and blockchain Web3 applications. Explore our capabilities.'
  },
  '/insights/gobiya-vs-enterprise-seo-agencies': {
    title: 'Enterprise SEO Agencies vs. Gobiya: Comparison | Gobiya',
    description: 'We compare enterprise SEO agencies vs Gobiya, showing the speed, cost, and CRM pipeline differences for B2B brands.'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: 'B2B Sales Pipeline Automation: AI Citations | Gobiya',
    description: 'Integrate B2B sales pipeline automation with search intent. Learn how AI citation share decides who gets on the buyer shortlist.'
  },
  '/insights/automated-lead-generation-seo': {
    title: 'Automated Lead Generation: Search Intent Mapping | Gobiya',
    description: 'Set up automated lead generation by mapping high-intent search clusters to your B2B pipeline to drive closed sales, not just page views.'
  },
  '/insights/outbound-seo-prospecting': {
    title: 'Outbound SEO Prospecting: Timing Intent Signals | Gobiya',
    description: 'Use outbound SEO prospecting to monitor search intent triggers. Learn how to pitch buyers at the exact moment they search for your service.'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: 'B2B Sales Pipeline Automation: CRM Pipelines | Gobiya',
    description: 'Configure B2B sales pipeline automation workflows. Learn how to connect search intent, lead data enrichment, and automated email campaigns.'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: 'Best SEO Agency for B2B: Evaluation Checklist | Gobiya',
    description: 'How to select the best SEO agency for B2B brands. Follow our evaluation checklist to verify technical authority, case studies, and contracts.'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: 'SEO for B2B Lead Gen: Target Buying Committee | Gobiya',
    description: 'Learn how to deploy SEO for B2B lead generation by mapping landing pages to the full buying committee, satisfying all key decision-makers.'
  },
  '/insights/b2b-seo-agency': {
    title: 'B2B SEO Agency: Metrics & Pipeline Strategy | Gobiya',
    description: 'Partner with a B2B SEO agency focused on pipeline value over vanity traffic. Learn about content clusters, buyer committee targeting, and CRM leads.'
  },
  '/insights/local-seo': {
    title: 'Local SEO Service: Elite Maps & Google Rank | Gobiya',
    description: 'Maximize local visibility with our local SEO service. We optimize Google Maps listings, business profiles, and AI search engines. Get a free audit.'
  },
  '/insights/local-seo-explained': {
    title: 'Local SEO Strategy: The 90-Day Winning Rhythm | Gobiya',
    description: 'Deploy our local SEO strategy weekly rhythm to win local search grids and maps. Review our 90-day checklist and tracking cadence.'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: 'B2B Organic Traffic: Decoupling From CRM Pipeline | Gobiya',
    description: 'Why B2B organic traffic is decoupling from pipeline revenue—and how to target high-intent search clusters to build pipeline value.'
  },
  '/insights/multi-location-seo-website-structure': {
    title: 'Multi-Location SEO Structure: URL Hierarchies | Gobiya',
    description: 'How to build a multi-location SEO structure to prevent cannibalization. Design URL hierarchies and local landing pages that rank.'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: 'Website Structure for Multiple Locations Guide | Gobiya',
    description: 'The ultimate guide to website structure for multiple locations. We compare subdirectory vs subdomain setups for local search rankings.'
  },
  '/insights/google-business-profile-optimization': {
    title: 'Google Business Profile Optimization Details | Gobiya',
    description: 'Use Google Business Profile optimization to improve local visibility and learn how to resolve GBP listing suspensions and appeals.'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: 'Google Core Update Recovery: Can You Recover? | Gobiya',
    description: 'Is Google core update recovery possible? The honest truth about algorithm drops, traffic audits, and adapting to AI citation networks.'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: 'Google Manual Action Removal: Recovery Guide | Gobiya',
    description: 'Use our Google manual action removal checklist to audit link profiles, document cleanup, and submit a successful reconsideration appeal.'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: 'Manual Action vs Algorithmic Penalty: Key Splits | Gobiya',
    description: 'Understand manual action vs algorithmic penalty differences, Search Console reports, and step-by-step diagnostic checklists for recovery.'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: 'ChatGPT vs Google Search: Customer Trends | Gobiya',
    description: 'Comparing ChatGPT vs Google search discovery rates. Learn how to optimize your brand footprint to win both AI summaries and clicks.'
  },
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: 'B2B Pipeline Revenue: How B2B Companies Use SEO | Gobiya',
    description: 'Learn how to connect search clusters to B2B pipeline revenue, map content to the buying committee, and scale inbound conversions.'
  },
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: 'LLM Company Verification: Sources AI Crawlers Use | Gobiya',
    description: 'Discover how ChatGPT and Claude handle LLM company verification by crawling Wikidata, LinkedIn, and review portals to establish trust.'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: 'Knowledge Graph Optimization vs. GEO: Key Splits | Gobiya',
    description: 'Understand how Knowledge Graph optimization differs from GEO, how entity resolution works, and how to secure AI citation visibility.'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: 'SEO Case Study: Traffic Recovery of 320% | Gobiya',
    description: 'Read our SEO case study traffic recovery breakdown. See the exact forensic audit and content pruning steps we deployed to restore organic search clicks.'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'Generative Engine Optimization (GEO): RAG Guide | Gobiya',
    description: 'A complete technical guide to Generative Engine Optimization (GEO). Learn how RAG-based AI search engines cite content and how to optimize.'
  },
  '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks': {
    title: 'AI Search Engines Scraping: APIs vs HTML | Gobiya',
    description: 'How do AI search engines scraping systems operate? We analyze private APIs vs public server-rendered HTML blocks and AI crawler rendering.'
  },
  '/about/steve-martin': {
    title: 'Steve Martin | Growth Engineer & Founder of Gobiya | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin | Growth Engineer & Founder of Gobiya | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/case-studies/smile-center-dentistry': {
    title: 'SmileCenter Dentistry: 5x Patient Inquiries With Multi-Location SEO | Gobiya',
    description: 'How we rebuilt SmileCenter\'s website on React/Vite, architected individual location pages for Southern California markets, and drove a 5x increase in form completions and phone calls.'
  },
  '/case-studies/american-livescan': {
    title: 'American Livescan: 3x Bookings & Calls With Site Rebuild + Local SEO | Gobiya',
    description: 'How we replaced a legacy .htm site with a clean-URL architecture, optimized the Google Business Profile, and tripled online appointments and phone calls for a high-volume LA fingerprinting service.'
  }
};

interface SEOProps {
  path: string;
}

const SEO: React.FC<SEOProps> = ({ path }) => {

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = path.toLowerCase().replace(/\/$/, '') || '/';
    // For article slugs, fall back to a generic insights title if not explicitly listed
    const seo = metadataMap[pathname] || (pathname.startsWith('/insights/') ? {
      title: 'Industry Insights | Gobiya',
      description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies from the Gobiya team.'
    } : metadataMap['/']);
    
    // Update Title
    document.title = seo.title;
    
    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.title);
    
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seo.description);

    // Update Canonical
    const canonicalUrl = `https://www.gobiya.com${pathname === '/' ? '' : pathname}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalTag);
    }

    // Update JSON-LD Schema
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
        "description": "Gobiya is a precision-engineered B2B SEO, Generative Engine Optimization (GEO), and sales pipeline agency. We recover lost organic traffic, architect AI citation strategies, and engineer automated outbound sales systems for mid-market and enterprise brands.",
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
          { "@type": "Country", "name": "United States", "sameAs": "https://www.wikidata.org/wiki/Q30" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gobiya Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "url": "https://www.gobiya.com/capabilities/web-development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Native CRM", "url": "https://www.gobiya.com/capabilities/native-crm" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Discoverability", "url": "https://www.gobiya.com/capabilities/seo-discoverability" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain & Web3 Development", "url": "https://www.gobiya.com/capabilities/blockchain-web3-development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Prospect Scraper", "url": "https://www.gobiya.com/capabilities/ai-prospect-scraper" } }
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

    let schemaScript = document.getElementById('schema-script');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.id = 'schema-script';
      document.head.appendChild(schemaScript);
    }
    schemaScript.innerHTML = JSON.stringify(jsonLdSchema);

  }, [path]);

  return null;
};

export default SEO;
