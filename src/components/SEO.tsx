import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
}

// Outcome-focused metadata lookup map for crawlers and search bots (must match api/index.ts exactly)
const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: `B2B SEO Agency | Algorithm Recovery`,
    description: `B2B SEO Agency solutions: GOBIYA reads Google's algorithm, identifies the penalty vector, and deploys the fix. SEO recovery, GEO, AI-powered growth. Los Angeles, since 2012.`
  },
  '/on-page-seo-los-angeles': {
    title: `On-Page SEO Los Angeles | Search Dominance`,
    description: `On-Page SEO Los Angeles solutions: Struggling with organic drops or low conversions? Our elite on-page SEO services in Los Angeles optimize your site's entity structure, schema, speed, and content mapping for Google and AI engines.`
  },
  '/capabilities/web-development': {
    title: `React Web Development | Custom Websites`,
    description: `React Web Development solutions: GOBIYA replaces slow page-builders with custom, hand-coded React and Next.js websites — 100/100 Core Web Vitals, sub-second loads, zero templates, engineered to convert and rank natively.`
  },
  '/capabilities/native-crm': {
    title: `Custom CRM Integrations | Own Pipeline Data`,
    description: `Custom CRM Integrations solutions: We build custom CRM website integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data.`
  },
  '/capabilities/seo-discoverability': {
    title: `Technical SEO Services | Code-Level Ranking`,
    description: `Technical SEO Services solutions: We build technical SEO for React websites into the codebase, optimizing crawlability, rendering speed, and AI citations.`
  },
  '/capabilities/blockchain-web3-development': {
    title: `Web3 Development | Smart Contracts`,
    description: `Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.`
  },
  '/capabilities/ai-prospect-scraper': {
    title: `AI Prospect Scraper | Automate Leads`,
    description: `Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.`
  },
  '/capabilities/ai-llms-business': {
    title: `AI for Businesses | Office Automation`,
    description: `AI for Businesses solutions: We integrate custom AI models and secure LLMs directly into your everyday office tasks. Automate document parsing, email replies, and CRM syncing with complete data privacy.`
  },
  '/capabilities/authority-building': {
    title: `Authority Building | Quality Backlinks`,
    description: `Authority Building solutions: Build search engine trust with high-quality, relevant backlink acquisition and structured localized entity citations, engineered for long-term organic authority.`
  },
  '/about': {
    title: `Los Angeles SEO Agency | Meet Gobiya`,
    description: `Los Angeles SEO Agency solutions: GOBIYA is a precision-engineered search visibility and digital solutions firm, founded 2012 in Los Angeles and led by Steve Martin — 25+ years bridging full-stack engineering and organic search.`
  },
  '/case-studies': {
    title: `SEO Case Studies | Search Recovery Data`,
    description: `SEO Case Studies solutions: Real clients, real numbers. SmileCenter Dentistry: 5x patient inquiries and 213K impressions. American Livescan: 3x bookings after a legacy migration. Data-backed search recovery and pipeline case studies from GOBIYA.`
  },
  '/approach': {
    title: `Forensic SEO Approach | Algorithm Dominance`,
    description: `Forensic SEO Approach solutions: GOBIYA's operating model for algorithmic dominance: entity-based indexing, topical authority and schema engineering, Generative Engine Optimization (GEO) for LLM visibility, and pipeline-first conversion architecture.`
  },
  '/case-studies/smile-center-dentistry': {
    title: `Dental SEO Case Study | Gobiya Insights`,
    description: `Dental SEO Case Study solutions: How we rebuilt SmileCenter\'s website on React/Vite, architected individual location pages for Southern California markets, and drove a 5x increase in form completions and phone calls.`
  },
  '/case-studies/american-livescan': {
    title: `Local SEO Case Study | Gobiya Insights`,
    description: `Local SEO Case Study solutions: How we replaced a legacy .htm site with a clean-URL architecture, optimized the Google Business Profile, and tripled online appointments and phone calls for a high-volume LA fingerprinting service.`
  },
  '/insights': {
    title: `SEO Insights | Search Intelligence`,
    description: `SEO Insights solutions: Advanced tactical intelligence on Google and AI search: algorithm update analysis, GEO and LLM citation tactics, entity SEO, technical recovery briefs, and pipeline engineering field notes from GOBIYA.`
  },
  '/insights/how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction': {
    title: `How to Apply Behavioral Psychology | Gobiya Insights`,
    description: `Learn how to apply behavioral psychology principles like the Fogg Behavior Model and Hick\'s Law to high-ticket B2B landing page wireframes to decrease friction.`,
    image: '/images/article-behavioral-psychology-b2b-landing-page-wireframes-thumbnail.webp'
  },
  '/insights/multi-location-websites-for-franchises': {
    title: `Multi Location Websites for Franchi | Gobiya Insights`,
    description: `Multi Location Websites for Franchi solutions: A technical guide to multi-location websites for franchises. Learn subdirectory URL configuration, page cannibalization avoidance, and SEO governance.`,
    image: '/images/article-multi-location-websites-franchises-thumbnail.webp'
  },
  '/insights/dental-seo-agency': {
    title: `Dental SEO Agency Evaluation Checkl | Gobiya Insights`,
    description: `Dental SEO Agency Evaluation Checkl solutions: Avoid costly hiring mistakes. Use our comprehensive evaluation checklist for dental SEO agencies, covering contract traps, KPIs, and case study audits.`,
    image: '/images/article-dental-seo-agency.png'
  },
  '/insights/brand-entity-extraction-perception-drift': {
    title: `Brand Entity Extraction & Perceptio | Gobiya Insights`,
    description: `Brand Entity Extraction & Perceptio solutions: How brand entity extraction works across Google, Bing, Wikidata, and LLM knowledge graphs — and how to detect and correct perception drift.`,
    image: '/images/article-brand-entity-extraction-perception-drift.webp'
  },
  '/contact': {
    title: `Contact SEO Agency | Growth Consultation`,
    description: `Contact SEO Agency solutions: Reach GOBIYA in Los Angeles. Call 323-744-1338, email hello@gobiya.com, or fill out our contact form for an SEO audit, web development, or AI growth consultation.`
  },
  '/company/careers': {
    title: `Growth Engineering Careers | Gobiya Insights`,
    description: `Growth Engineering Careers solutions: Explore growth engineering jobs at Gobiya. We are hiring React developers, technical SEO specialists, and sales engineers. Apply now.`
  },
  '/book': {
    title: `SEO Audit Booking | 15-Min Forensic Review`,
    description: `SEO Audit Booking solutions: Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.`
  },
  '/book-call': {
    title: `SEO Audit Booking | 15-Min Forensic Review`,
    description: `SEO Audit Booking solutions: Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.`
  },
  '/capabilities': {
    title: `SEO & Web Development Services | Full-Stack Agency`,
    description: `SEO & Web Development Services solutions: GOBIYA builds fast, modern web applications with native CRM pipelines, built-in SEO discoverability, AI prospect automation, and custom Web3 integrations — one codebase, complete data ownership.`
  },
  '/insights/gobiya-vs-enterprise-seo-agencies': {
    title: `Enterprise SEO vs Gobiya | Gobiya Insights`,
    description: `Enterprise SEO vs Gobiya solutions: We compare enterprise SEO agencies vs Gobiya, showing the speed, cost, and CRM pipeline differences for B2B brands.`,
    image: '/images/enterprise-seo-agencies-comparison.png'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: `Automate B2B Sales Pipelines via AI | Gobiya Insights`,
    description: `Automate B2B Sales Pipelines via AI solutions: Integrate B2B sales pipeline automation with search intent. Learn how AI citation share decides who gets on the buyer shortlist.`,
    image: '/images/b2b-sales-pipeline-automation-citation-share.png'
  },
  '/insights/automated-lead-generation-seo': {
    title: `Automate Lead Generation | Gobiya Insights`,
    description: `Automate Lead Generation solutions: Set up automated lead generation by mapping high-intent search clusters to your B2B pipeline to drive closed sales, not just page views.`,
    image: '/images/automated-lead-generation-intent-mapping-chart.png'
  },
  '/insights/outbound-seo-prospecting': {
    title: `Outbound SEO Prospecting | Gobiya Insights`,
    description: `Use outbound SEO prospecting to monitor search intent triggers. Learn how to pitch buyers at the exact moment they search for your service.`,
    image: '/images/outbound-seo-prospecting-intent-signals.png'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: `Automate B2B Sales | Gobiya Insights`,
    description: `Automate B2B Sales solutions: Configure B2B sales pipeline automation workflows. Learn how to connect search intent, lead data enrichment, and automated email campaigns.`,
    image: '/images/b2b-sales-pipeline-automation-outreach.png'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: `Select the Best B2B SEO Agency | Gobiya Insights`,
    description: `Select the Best B2B SEO Agency solutions: How to select the best SEO agency for B2B brands. Follow our evaluation checklist to verify technical authority, case studies, and contracts.`,
    image: '/images/best-seo-agency-for-b2b-checklist.png'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: `SEO for B2B Lead Gen | Gobiya Insights`,
    description: `Learn how to deploy SEO for B2B lead generation by mapping landing pages to the full buying committee, satisfying all key decision-makers.`,
    image: '/images/seo-for-b2b-lead-generation-committee-structure.png'
  },
  '/insights/b2b-seo-agency': {
    title: `B2B SEO Agency | Gobiya Insights`,
    description: `Partner with a B2B SEO agency built around pipeline value, not just search volume. Verify our committee mapping and conversion playbooks.`,
    image: '/images/b2b-seo-agency-funnel-strategy-session.png'
  },
  '/insights/local-seo': {
    title: `Local SEO Strategy | Gobiya Insights`,
    description: `Optimize your search presence with our local SEO strategy. Learn the weekly rhythm and maps pack audit tactics to win local organic rankings.`,
    image: '/images/local-seo-service-maps-performance.png'
  },
  '/insights/local-seo-explained': {
    title: `Local SEO Explained | Gobiya Insights`,
    description: `Our local SEO explained playbook delivers a 90-day execution framework. Master business signals, citations, and tracking to dominate local grids.`,
    image: '/images/article-local-seo-explained.png'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: `B2B Organic Traffic | Gobiya Insights`,
    description: `Why B2B organic traffic is decoupling from pipeline revenue—and how to target high-intent search clusters to build pipeline value.`,
    image: '/images/article-b2b-organic-traffic-growth.webp'
  },
  '/insights/multi-location-seo-website-structure': {
    title: `Multi-Location SEO | Gobiya Insights`,
    description: `Learn to structure a multi-location SEO website structure that prevents cannibalization, consolidates link equity, and ranks every city page.`,
    image: '/images/multi-location-seo-structure-url-hierarchy.png'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: `Best Website Structure for Multiple | Gobiya Insights`,
    description: `Best Website Structure for Multiple solutions: Our guide details the best website structure multiple locations setup. Compare subdirectory vs subdomain hierarchies for localized organic growth.`,
    image: '/images/website-structure-for-multiple-locations-setup.png'
  },
  '/insights/google-business-profile-optimization': {
    title: `Google Business Profile | Gobiya Insights`,
    description: `Learn our Google Business Profile optimization checklist to recover suspended profiles, appeal algorithmic soft bans, and verify map listings.`,
    image: '/images/google-business-profile-optimization-visibility.png'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: `Google Core Update Recovery | Gobiya Insights`,
    description: `Our Google core update recovery guide details the timeline, content pruning strategies, and quality updates needed to restore search traffic.`,
    image: '/images/google-core-update-recovery-traffic-charts.png'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: `Remove Google Manual Actions | Gobiya Insights`,
    description: `Remove Google Manual Actions solutions: Use our Google manual action removal checklist to audit link profiles, document cleanup, and submit a successful reconsideration appeal.`,
    image: '/images/google-manual-action-removal-recovery-checklist.png'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: `Manual Action vs Algorithmic Penalt | Gobiya Insights`,
    description: `Understand manual action vs algorithmic penalty differences, Search Console reports, and step-by-step diagnostic checklists for recovery.`,
    image: '/images/manual-action-vs-algorithmic-penalty-checklist.png'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: `ChatGPT vs Google Search | Gobiya Insights`,
    description: `Comparing ChatGPT vs Google search discovery rates. Learn how to optimize your brand footprint to win both AI summaries and clicks.`,
    image: '/images/chatgpt-vs-google-search-conversion-rates.png'
  },
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: `B2B Pipeline Revenue | Gobiya Insights`,
    description: `Learn how to connect search clusters to B2B pipeline revenue, map content to the buying committee, and scale inbound conversions.`,
    image: '/images/b2b-pipeline-revenue-performance-dashboard.png'
  },
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: `LLM Company Verification | Gobiya Insights`,
    description: `Discover how ChatGPT and Claude handle LLM company verification by crawling Wikidata, LinkedIn, and review portals to establish trust.`,
    image: '/images/llm-company-verification-data-sources.png'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: `Knowledge Graph Optimization vs GEO | Gobiya Insights`,
    description: `Knowledge Graph Optimization vs GEO solutions: Understand how Knowledge Graph optimization differs from GEO, how entity resolution works, and how to secure AI citation visibility.`,
    image: '/images/knowledge-graph-optimization-vs-geo-model.png'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: `SEO Case Study | Gobiya Insights`,
    description: `A forensic SEO case study on traffic recovery after Google\'s March 2026 dual-update event. Learn the exact 12-week diagnostic sequence and fix order Gobiya used.`,
    image: '/images/seo-case-study-traffic-recovery-growth.png'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: `Generative Engine Optimization (GEO | Gobiya Insights`,
    description: `A complete technical guide to Generative Engine Optimization (GEO). Learn how RAG-based AI search engines cite content and how to optimize.`,
    image: '/images/generative-engine-optimization-rag-citations.png'
  },
  '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks': {
    title: `AI Search Scraping | Gobiya Insights`,
    description: `Understand how AI search scraping works. Learn why AI crawlers bypass JavaScript APIs and read raw public HTML blocks instead.`,
    image: '/images/ai-search-engines-scraping-html-data-comparison.png'
  },
  '/about/steve-martin': {
    title: `Steve Martin | Gobiya Insights`,
    description: `Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.`
  },
  '/author/steve-martin': {
    title: `Steve Martin | Gobiya Insights`,
    description: `Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.`
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

    // Build and set ogImageUrl / twitter:image
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

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) ogImageTag.setAttribute('content', ogImageUrl);

    const twImageTag = document.querySelector('meta[name="twitter:image"]');
    if (twImageTag) twImageTag.setAttribute('content', ogImageUrl);

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
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Prospect Scraper", "url": "https://www.gobiya.com/capabilities/ai-prospect-scraper" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & LLMs for Businesses", "url": "https://www.gobiya.com/capabilities/ai-llms-business" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Authority Building", "url": "https://www.gobiya.com/capabilities/authority-building" } }
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

    // Update Secondary JSON-LD Schema (ArticlePage and ProfilePage)
    let articleSchemaScript = document.getElementById('article-schema');
    let authorSchemaScript = document.getElementById('author-schema');
    
    // Clean up old ones first
    if (articleSchemaScript) articleSchemaScript.remove();
    if (authorSchemaScript) authorSchemaScript.remove();

    if (pathname.startsWith('/insights/')) {
      const slug = pathname.substring('/insights/'.length);
      const publishDate = (slug === 'how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction') ? "2026-06-12" :
                          (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks' || slug === 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo') ? "2026-06-04" :
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
      
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = 'article-schema';
      script.innerHTML = JSON.stringify(articleSchema);
      document.head.appendChild(script);
      
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
      
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = 'author-schema';
      script.innerHTML = JSON.stringify(authorSchema);
      document.head.appendChild(script);
    }

  }, [path]);

  return null;
};

export default SEO;
