import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
}

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
  '/capabilities/ai-prospect-scraper': {
    title: 'AI Prospect Scraper & Drip Campaigns | gobiya',
    description: 'Our native CRM includes an AI-powered prospect scraper that gathers NAP data and automatically creates customized drip email campaigns for your B2B leads.'
  },
  '/company/about': {
    title: 'The Gobiya Story: Precision growth engineering since 2012 | Gobiya',
    description: 'We aren\'t a template-churning agency. Meet the growth engineers rebuilding traffic pipelines, recovering penalties, and solving generative SEO.'
  },
  '/company/success-stories': {
    title: 'Inside Our Wins: Real Case Studies, 300%+ Traffic Growth | Gobiya',
    description: 'No vanity metrics here. Read how SmileCenter Dentistry achieved 5x patient inquiries and American Livescan grew online bookings threefold.'
  },
  '/success-stories': {
    title: 'Inside Our Wins: Real Case Studies, 300%+ Traffic Growth | Gobiya',
    description: 'No vanity metrics here. Read how SmileCenter Dentistry achieved 5x patient inquiries and American Livescan grew online bookings threefold.'
  },
  '/company/approach': {
    title: 'Our Blueprint: Algorithmic Audits & Pipeline Acceleration | Gobiya',
    description: 'Our exact methodology for diagnosing traffic leaks, building topical authority models, and scaling outbound acquisition campaigns.'
  },
  '/insights': {
    title: 'Unfiltered Growth: SEO Audits, GEO Tactics & AI Shifts | Gobiya',
    description: 'No generic fluff. The Gobiya team shares real operational insights, Google core update recovery checklists, and AI engine optimization tactics.'
  },
  '/insights/dental-seo-agency': {
    title: 'Dental SEO Agency Checklist: Red Flags & KPIs to Watch | Gobiya',
    description: 'Avoid costly hiring mistakes. Use our comprehensive evaluation checklist for dental SEO agencies, covering contract traps, KPIs, and case study audits.'
  },
  '/company/careers': {
    title: 'Solve Hard Search & Engineering Problems With Us | Gobiya',
    description: 'Tired of generic marketing tasks? We\'re looking for elite React developers, SEO forensic specialists, and sales engineers to join our team.'
  },
  '/contact': {
    title: 'Let\'s Audit Your Site: Request a Free Growth Session | Gobiya',
    description: 'Ready to stop losing traffic and revenue to competitors? Talk directly to our lead engineers. We will analyze your site and outline a custom recovery roadmap.'
  },
  '/book': {
    title: 'Book a Pipeline Strategy Call | Gobiya',
    description: 'Schedule a 15-minute 1-on-1 strategy call with our lead developer & marketer Steve Martin to audit your organic pipeline and search traffic.'
  },
  '/book-call': {
    title: 'Book a Pipeline Strategy Call | Gobiya',
    description: 'Schedule a 15-minute 1-on-1 strategy call with our lead developer & marketer Steve Martin to audit your organic pipeline and search traffic.'
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
  '/insights/local-seo': {
    title: 'Local SEO Service: Elite Maps & AI Domination | Gobiya',
    description: 'Stop losing local customers. Our elite local SEO service connects Google Maps, GBP optimization, and AI citations to put your brand at position #1. Free audit.'
  },
  '/insights/local-seo-explained': {
    title: 'The 90-Day Cadence: How We Win Local Search | Gobiya',
    description: 'Local SEO isn\'t a set-it-and-forget-it task. Here is the weekly operational rhythm that actually moves the needle in competitive markets.'
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
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: 'What B2B Sources Do LLMs Crawl to Verify Company Info? | Gobiya',
    description: 'How ChatGPT, Claude, and Perplexity crawl external data sources to verify B2B business details. Establish a consistent entity footprint to secure citations.'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: 'Knowledge Graph Optimization vs. GEO: The Vital Difference | Gobiya',
    description: 'Understand the key differences between Google Knowledge Graph optimization and GEO in scope, era, and target engines. Learn how entity resolution gates AI citations.'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: 'Case Study: How We Recovered 320% Organic Search Traffic | Gobiya',
    description: 'A step-by-step forensic breakdown of a website\'s recovery after a Google helpful content update. See the exact diagnostic audit we ran.'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'RAG & GEO: What is Generative Engine Optimization? | Gobiya',
    description: 'A complete technical guide to how RAG-based search engines cite content, why traditional SEO isn\'t enough, and how to optimize for LLMs.'
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
