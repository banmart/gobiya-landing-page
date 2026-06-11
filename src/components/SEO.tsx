import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
}

const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'AI Internet Marketing Agency - Gobiya',
    description: 'Gobiya is a national AI internet marketing agency headquartered in Los Angeles. We help businesses get found on Google, generate more leads, and grow revenue through AI-powered SEO, GEO, and automated pipeline systems. Get a free audit.'
  },
  '/capabilities/web-development': {
    title: 'Build Sub-Second React Sites that Convert | Gobiya',
    description: 'Our React web development agency builds sub-second custom websites engineered for Core Web Vitals, crawlability, and conversions.'
  },
  '/capabilities/native-crm': {
    title: 'Custom CRM Integrations: Own Your Pipeline Data | Gobiya',
    description: 'We build custom CRM website integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data.'
  },
  '/capabilities/seo-discoverability': {
    title: 'Code-Level Technical SEO: Rank & Cite Natively | Gobiya',
    description: 'We build technical SEO for React websites into the codebase, optimizing crawlability, rendering speed, and AI citations.'
  },
  '/capabilities/blockchain-web3-development': {
    title: 'Blockchain Web3: Integrate Smart Contracts | Gobiya',
    description: 'Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.'
  },
  '/capabilities/ai-prospect-scraper': {
    title: 'AI Prospect Scraper: Automate Outbound Leads | Gobiya',
    description: 'Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.'
  },
  '/company/about': {
    title: 'Custom Web Dev & Forensic Search Strategy | Gobiya',
    description: 'Gobiya is a custom web development company and search engineering agency rebuilding traffic pipelines and recovering penalties since 2012.'
  },
  '/company/success-stories': {
    title: 'Forensic SEO Case Studies: Reversing Penalties | Gobiya',
    description: 'Read our technical SEO case studies detailing over 300% organic growth for B2B brands and local medical clinics. Review real data.'
  },
  '/success-stories': {
    title: 'Forensic SEO Case Studies: Reversing Penalties | Gobiya',
    description: 'Read our technical SEO case studies detailing over 300% organic growth for B2B brands and local medical clinics. Review real data.'
  },
  '/company/approach': {
    title: 'B2B Organic Search Strategy for Revenue Pipeline | Gobiya',
    description: 'Our proprietary B2B organic search strategy for diagnosing crawl errors, building topical authority, and scaling pipeline acquisitions.'
  },
  '/insights': {
    title: 'SEO Audits, GEO Tactics & Search Insights | Gobiya',
    description: 'We share technical SEO audits, Generative Engine Optimization (GEO) tactics, and search algorithm insights for B2B engineering teams.'
  },
  '/insights/dental-seo-agency': {
    title: 'Dental SEO Agency Evaluation Checklist & KPIs | Gobiya',
    description: 'How to select the right dental SEO agency. Read our evaluation checklist covering KPIs, contract terms, and local maps pack performance.'
  },
  '/insights/brand-entity-extraction-perception-drift': {
    title: 'Brand Entity Extraction & Perception Drift | Gobiya',
    description: 'How brand entity extraction works across Google, Bing, Wikidata, and LLM knowledge graphs — and how to detect and correct perception drift.'
  },

  '/company/careers': {
    title: 'Growth Engineering Careers: Join Our Dev Team | Gobiya',
    description: 'Explore growth engineering jobs at Gobiya. We are hiring React developers, technical SEO specialists, and sales engineers. Apply now.'
  },
  '/contact': {
    title: 'Get a Free Forensic Website SEO Audit & Call | Gobiya',
    description: 'Ready to grow? Request website SEO audit sessions and strategy roadmaps directly from our lead engineers. Secure your free review.'
  },
  '/book': {
    title: 'Schedule a 15-Min Forensic Pipeline Audit | Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/book-call': {
    title: 'Schedule a 15-Min Forensic Pipeline Audit | Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/capabilities': {
    title: 'Custom React Web Development & Technical SEO | Gobiya',
    description: 'We provide custom web development services, native CRM integrations, technical SEO, and blockchain Web3 applications. Explore our capabilities.'
  },
  '/insights/gobiya-vs-enterprise-seo-agencies': {
    title: 'Enterprise SEO vs Gobiya: Speed & Cost Compare | Gobiya',
    description: 'We compare enterprise SEO agencies vs Gobiya, showing the speed, cost, and CRM pipeline differences for B2B brands.'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: 'Automate B2B Sales Pipelines via AI Citations | Gobiya',
    description: 'Integrate B2B sales pipeline automation with search intent. Learn how AI citation share decides who gets on the buyer shortlist.'
  },
  '/insights/automated-lead-generation-seo': {
    title: 'Automate Lead Generation: Search Intent Maps | Gobiya',
    description: 'Set up automated lead generation by mapping high-intent search clusters to your B2B pipeline to drive closed sales, not just page views.'
  },
  '/insights/outbound-seo-prospecting': {
    title: 'Outbound SEO Prospecting: Target Search Intent | Gobiya',
    description: 'Use outbound SEO prospecting to monitor search intent triggers. Learn how to pitch buyers at the exact moment they search for your service.'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: 'Automate B2B Sales: Connect Search to CRM | Gobiya',
    description: 'Configure B2B sales pipeline automation workflows. Learn how to connect search intent, lead data enrichment, and automated email campaigns.'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: 'Select the Best B2B SEO Agency: 2026 Checklist | Gobiya',
    description: 'How to select the best SEO agency for B2B brands. Follow our evaluation checklist to verify technical authority, case studies, and contracts.'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: 'SEO for B2B Lead Gen: Win the Buying Committee | Gobiya',
    description: 'Learn how to deploy SEO for B2B lead generation by mapping landing pages to the full buying committee, satisfying all key decision-makers.'
  },
  '/insights/b2b-seo-agency': {
    title: 'B2B SEO Agency: Focus on Pipeline Attribution | Gobiya',
    description: 'Partner with a B2B SEO agency focused on pipeline value over vanity traffic. Learn about content clusters, buyer committee targeting, and CRM leads.'
  },
  '/insights/local-seo': {
    title: 'Local SEO Strategy: Dominate the 3-Pack Maps | Gobiya',
    description: 'Maximize local visibility with our local SEO service. We optimize Google Maps listings, business profiles, and AI search engines. Get a free audit.'
  },
  '/insights/local-seo-explained': {
    title: 'Local SEO Explained: Dominate Search in 90 Days | Gobiya',
    description: 'Deploy our local SEO strategy weekly rhythm to win local search grids and maps. Review our 90-day checklist and tracking cadence.'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: 'B2B Organic Traffic: Build CRM Pipeline Value | Gobiya',
    description: 'Why B2B organic traffic is decoupling from pipeline revenue—and how to target high-intent search clusters to build pipeline value.'
  },
  '/insights/multi-location-seo-website-structure': {
    title: 'Multi-Location SEO: Design URL Hierarchies | Gobiya',
    description: 'How to build a multi-location SEO structure to prevent cannibalization. Design URL hierarchies and local landing pages that rank.'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: 'Best Website Structure for Multiple Locations | Gobiya',
    description: 'The ultimate guide to website structure for multiple locations. We compare subdirectory vs subdomain setups for local search rankings.'
  },
  '/insights/google-business-profile-optimization': {
    title: 'Google Business Profile: Suspensions & Audits | Gobiya',
    description: 'Use Google Business Profile optimization to improve local visibility and learn how to resolve GBP listing suspensions and appeals.'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: 'Google Core Update Recovery: Restore Full Traffic | Gobiya',
    description: 'Is Google core update recovery possible? The honest truth about algorithm drops, traffic audits, and adapting to AI citation networks.'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: 'Remove Google Manual Actions: Reconsider Guide | Gobiya',
    description: 'Use our Google manual action removal checklist to audit link profiles, document cleanup, and submit a successful reconsideration appeal.'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: 'Manual Action vs Algorithmic Penalty: Diagnostic | Gobiya',
    description: 'Understand manual action vs algorithmic penalty differences, Search Console reports, and step-by-step diagnostic checklists for recovery.'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: 'ChatGPT vs Google Search: Customer Discovery | Gobiya',
    description: 'Comparing ChatGPT vs Google search discovery rates. Learn how to optimize your brand footprint to win both AI summaries and clicks.'
  },
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: 'B2B Pipeline Revenue: How SEO Drives B2B Leads | Gobiya',
    description: 'Learn how to connect search clusters to B2B pipeline revenue, map content to the buying committee, and scale inbound conversions.'
  },
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: 'LLM Company Verification: Data Sources AI Uses | Gobiya',
    description: 'Discover how ChatGPT and Claude handle LLM company verification by crawling Wikidata, LinkedIn, and review portals to establish trust.'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: 'Knowledge Graph Optimization vs GEO: AI splits | Gobiya',
    description: 'Understand how Knowledge Graph optimization differs from GEO, how entity resolution works, and how to secure AI citation visibility.'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: 'SEO Case Study: Recover 320% Traffic Growth | Gobiya',
    description: 'Read our SEO case study traffic recovery breakdown. See the exact forensic audit and content pruning steps we deployed to restore organic search clicks.'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'Generative Engine Optimization (GEO): AI Guide | Gobiya',
    description: 'A complete technical guide to Generative Engine Optimization (GEO). Learn how RAG-based AI search engines cite content and how to optimize.'
  },
  '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks': {
    title: 'AI Search Scraping: API vs Server HTML Blocks | Gobiya',
    description: 'How do AI search engines scraping systems operate? We analyze private APIs vs public server-rendered HTML blocks and AI crawler rendering.'
  },
  '/about/steve-martin': {
    title: 'Steve Martin: Lead Growth Engineer & Founder | Gobiya',
    description: 'Credentials and author profile for Steve Martin. 25+ years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin: Lead Growth Engineer & Founder | Gobiya',
    description: 'Credentials and author profile for Steve Martin. 25+ years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/case-studies/smile-center-dentistry': {
    title: 'Dental SEO Case Study: 5x Patient Inquiries | Gobiya',
    description: 'How we rebuilt SmileCenter\'s website on React/Vite, architected individual location pages for Southern California markets, and drove a 5x increase in form completions and phone calls.'
  },
  '/case-studies/american-livescan': {
    title: 'Local SEO Case Study: Tripled Online Bookings | Gobiya',
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
            "name": "Do you offer full-service internet marketing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We are an end-to-end AI internet marketing agency. We handle everything from advanced technical SEO and Generative Engine Optimization (GEO) to paid performance marketing and fully automated B2B lead generation pipelines."
            }
          },
          {
            "@type": "Question",
            "name": "How does Generative Engine Optimization (GEO) differ from traditional SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While traditional SEO focuses on ranking in standard Google searches, GEO structures your digital footprint so conversational AI models (like ChatGPT, Perplexity, and Claude) cite your business as the authoritative answer when users ask complex, industry-specific questions."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can we see results from an AI marketing campaign?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While traditional SEO can take months, our AI-focused growth campaigns and pipeline automation often yield measurable lead improvements within the first 30 days. We deploy rapid technical audits and direct outreach sequences to generate immediate pipeline velocity."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle lead generation and CRM integration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our web builds aren't just digital brochures — they are lead-generation engines. We natively integrate your site with your CRM of choice to capture pipeline data, track attribution, and automate sales workflows from day one."
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
