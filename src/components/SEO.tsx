import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
}

const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'SEO Traffic Recovery & B2B Pipeline Engineering | Gobiya',
    description: 'We engineer AI-driven SEO and sales pipelines to recover lost organic traffic, scale predictable revenue, and secure long-term algorithmic dominance for high-stakes brands.'
  },
  '/services/seo': {
    title: 'Organic Traffic Recovery & Search Dominance | Gobiya',
    description: 'Reclaim your search engine positions. We deliver entity-level SEO, topical authority architectures, and advanced technical search audits built for search dominance.'
  },
  '/services/lead-generation': {
    title: 'Predictable B2B Sales Pipelines & Lead Generation | Gobiya',
    description: 'Scale your contract value and outbound pipeline. We design and launch automated cold outreach and sales acquisition protocols for mid-market and enterprise brands.'
  },
  '/services/geo-optimization': {
    title: 'Generative Engine Optimization (GEO) & AI Visibility | Gobiya',
    description: 'Position your brand to be cited and recommended natively by modern AI models including ChatGPT, Claude, Gemini, and Google AI Overviews.'
  },
  '/services/web-development': {
    title: 'Conversion-Engineered React & Web Development | Gobiya',
    description: 'Speed-optimized, custom-engineered React platforms built to convert. We replace slow templates with lightning-fast landing pages and applications.'
  },
  '/services/ppc-advertising': {
    title: 'High-Yield Paid Search (PPC) & Ad Pipelines | Gobiya',
    description: 'Maximize your return on ad spend (ROAS) and lower acquisition costs. Data-driven Google, Microsoft, and Meta Ads management tailored for revenue scaling.'
  },
  '/google-penalty-recovery': {
    title: 'Google Penalty Recovery & Core Update Recovery | Gobiya',
    description: 'Recover lost search traffic. We diagnose and reverse manual action penalties and organic traffic declines caused by Google helpful content & core updates.'
  },
  '/on-page-seo-los-angeles': {
    title: 'On-Page SEO Services in Los Angeles | Gobiya',
    description: 'Topical authority modeling, schema graph injection, and speed-optimized React structures built to convert Los Angeles organic search traffic into pipeline.'
  },
  '/company/about': {
    title: 'About Gobiya | Search Recovery & Pipeline Agency',
    description: 'Learn about our approach to algorithmic dominance, generative search, and revenue-scaling pipelines.'
  },
  '/company/success-stories': {
    title: 'Search Recovery & Sales Pipeline Case Studies | Gobiya',
    description: 'Explore how we recover organic traffic, build predictive B2B pipelines, and secure market dominance.'
  },
  '/company/approach': {
    title: 'Our Search Dominance & Pipeline Methodology | Gobiya',
    description: 'Discover our proprietary methodology for algorithmic audits, penalty recovery, and B2B pipeline acceleration.'
  },
  '/insights': {
    title: 'SEO Updates, B2B Outbound & Search Intelligence | Gobiya',
    description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies.'
  },
  '/company/careers': {
    title: 'Join Our Technical SEO & Software Dev Team | Gobiya',
    description: 'We are hiring top-tier SEO specialists, React engineers, and growth strategists to dominate the search landscape.'
  },
  '/contact': {
    title: 'Contact Gobiya | Reclaim & Scale Your Search Revenue',
    description: 'Reach out to our engineering team in Los Angeles to discuss algorithmic audits, AI traffic recovery, and pipeline architecture.'
  },
  '/services': {
    title: 'Forensic SEO & B2B Pipeline Services | Gobiya',
    description: 'We consolidate forensic SEO, traffic recovery, generative engine optimization (GEO), high-speed React engineering, and automated outbound sales pipelines.'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: 'How AI Citations Shape Your B2B Vendor Shortlist | Gobiya',
    description: 'How AI-cited content qualifies B2B vendors for buyer shortlists — and what the 2026 shift to AI-driven research means for your pipeline.'
  },
  '/insights/automated-lead-generation-seo': {
    title: 'Scale Inbound Sales With AI-Driven Lead Gen SEO | Gobiya',
    description: 'How AI-cited content produces pre-qualified pipeline at conversion rates traditional lead gen cannot match — and what the 2026 shift means for B2B teams.'
  },
  '/insights/outbound-seo-prospecting': {
    title: 'Timing-Anchored Outbound SEO Prospecting Guide | Gobiya',
    description: 'How SEO-derived intent signals turn outbound from a volume game into a timing game — and what the 2026 data says about cold vs signal-anchored prospecting.'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: 'Orchestrating AI for B2B Sales Automation | Gobiya',
    description: 'How orchestration between SEO, intent capture, enrichment, and outbound determines whether automation produces revenue — and why most B2B teams are deploying AI agents into broken workflows.'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: 'Choose the Right B2B SEO Agency in 2026 | Gobiya',
    description: 'The 2026 evaluation framework for picking a B2B SEO partner — what to measure, what to ignore, and why most "best agency" lists are scoring the wrong things.'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: 'B2B Lead Gen SEO: Target the Buying Committee | Gobiya',
    description: 'How content architected for an 11-person buying committee outperforms content built for a single converter — and why B2B lead gen SEO in 2026 looks fundamentally different from every other category.'
  },
  '/insights/b2b-seo-agency': {
    title: 'B2B SEO Agency vs Generalist: The Vital Difference | Gobiya',
    description: 'What a B2B SEO agency actually is, how it differs structurally from generalists serving B2B clients, and why the distinction matters in the AI search era.'
  },
  '/insights/b2b-seo-agency-los-angeles': {
    title: 'Los Angeles B2B SEO Agency: Local Partnership wins | Gobiya',
    description: 'How proximity, time-zone alignment, and LA business culture fluency have become more valuable rather than less in an AI-search era — and what LA-based B2B operators should actually be evaluating.'
  },
  '/insights/local-seo-los-angeles': {
    title: 'Los Angeles Local SEO & AI Search Dominance Guide | Gobiya',
    description: 'How Google\'s 2026 local search algorithm — and the AI layer now sitting on top of it — determines whether LA customers find your business or your competitor\'s.'
  },
  '/insights/los-angeles-local-seo-explained': {
    title: 'Operational Cadence for LA Search Dominance | Gobiya',
    description: 'The actual operational rhythm of running local SEO in LA — what the weekly cadence looks like, what produces visible ranking movement at 30 / 60 / 90 days, and why most LA businesses stall.'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: 'Decouple B2B Traffic From Revenue Pipelines | Gobiya',
    description: 'How traffic and pipeline decoupled in B2B during 2025-2026, why the best B2B SEO programs are now growing less traffic on purpose, and what the new organic growth math actually looks like.'
  },
  '/insights/multi-location-seo-website-structure': {
    title: 'Multi-Location Website SEO Architectures | Gobiya',
    description: 'How website architecture — URL hierarchy, page-to-GBP mapping, content uniqueness, and internal linking — determines whether locations rank independently or cannibalize each other.'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: 'Best Site Architecture for Multi-City Locations | Gobiya',
    description: 'The single-domain subdirectory decision, state-city-location hierarchy, cross-city cannibalization failure, and how geographic market separation changes the structural choices for multi-city businesses.'
  },
  '/insights/google-business-profile-optimization': {
    title: 'Google Business Profile Optimization Guide | Gobiya',
    description: 'How to diagnose Google Business Profile suspension or ranking degradation, build an evidence package for reinstatement appeals, and avoid the panic-driven mistakes that lead to permanent bans.'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: 'Can You Fully Recover from a Google Core Update? | Gobiya',
    description: 'The honest answer to core update recovery: whether and how fully sites recover, what genuinely drives recovery, and why ranking recovery no longer guarantees traffic recovery in the AI overview era.'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: 'Google Manual Action Removal Checklist | Gobiya',
    description: 'What to do when your in-house team is suddenly responsible for recovering a Google manual action your agency triggered. Diagnosis, narrative, and reconsideration appeal steps.'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: 'Manual Action vs Algorithmic Penalty: Key Differences | Gobiya',
    description: 'The single most important distinction in Google traffic recovery: why a human-issued manual action and an automated algorithmic suppression are completely different problems.'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: 'ChatGPT vs Google for Business Discovery | Gobiya',
    description: 'Google processes billions of searches, but 93% in AI Mode end clickless. ChatGPT converts 4.4x better. How to optimize your brand for both.'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'Generative Engine Optimization (GEO) Explained | Gobiya',
    description: 'The definitional guide to GEO: how Retrieval-Augmented Generation (RAG) pipelines cite sources, how it builds on traditional SEO, and what makes content citable.'
  },
  '/about/steve-martin': {
    title: 'Steve Martin | CEO, Lead Developer & Marketer | Gobiya',
    description: 'Professional credentials and author profile for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in advanced SEO, custom React engineering, and pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin | CEO, Lead Developer & Marketer | Gobiya',
    description: 'Professional credentials and author profile for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in advanced SEO, custom React engineering, and pipeline automation.'
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
