import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
}

const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'Content Marketing Agency & Search Engine Optimization Firm | Los Angeles | Gobiya',
    description: 'Gobiya is a Search Engine Optimization Firm and Content Marketing Agency in Los Angeles. We engineer AI-driven SEO to recover lost traffic and scale revenue.'
  },
  '/services/seo': {
    title: 'Technical SEO Services & Traffic Recovery | Gobiya',
    description: 'Get expert technical SEO services to reclaim your search positions. We deliver entity-level SEO, topical authority architectures, and advanced technical audits.'
  },
  '/services/lead-generation': {
    title: 'B2B Lead Generation & Predictable Sales Pipelines | Gobiya',
    description: 'Scale your contract value with our B2B lead generation services. We design and launch automated cold outreach and sales acquisition protocols.'
  },
  '/services/geo-optimization': {
    title: 'Generative Engine Optimization (GEO) & AI Visibility | Gobiya',
    description: 'Get ahead with Generative Engine Optimization. Position your brand to be cited and recommended natively by ChatGPT, Claude, Gemini, and AI Overviews.'
  },
  '/services/web-development': {
    title: 'React Web Development & Conversion-Engineered Platforms | Gobiya',
    description: 'Get custom React web development services built to convert. We replace slow templates with lightning-fast landing pages and high-performance applications.'
  },
  '/services/ppc-advertising': {
    title: 'High-Yield PPC Advertising & Paid Search Pipelines | Gobiya',
    description: 'Scale revenue with our data-driven PPC advertising services. Maximize ROAS and lower acquisition costs across Google, Microsoft, and Meta Ads.'
  },
  '/google-penalty-recovery': {
    title: 'Google Penalty Recovery & Core Update Recovery | Gobiya',
    description: 'Get expert Google penalty recovery services. We diagnose and reverse manual action penalties and organic traffic declines caused by core updates.'
  },
  '/on-page-seo-los-angeles': {
    title: 'On-Page SEO Los Angeles Services & CRO | Gobiya',
    description: 'Dominate local rankings with our On-Page SEO Los Angeles solutions. We build speed-optimized React structures and schema graphs to convert organic traffic.'
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
    title: 'Forensic SEO and B2B Pipeline Services | Gobiya',
    description: 'We engineer professional SEO and B2B pipeline services, consolidating organic traffic recovery, generative engine optimization (GEO), and React web development.'
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
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: 'How B2B Companies Use SEO to Generate Predictable Revenue | Gobiya',
    description: 'Why B2B SEO programs fail to connect to pipeline and how to map content to the buying committee, target decision-stage clusters, and set up attribution.'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: 'SEO Case Study Traffic Recovery: Recover 320% Organic Traffic | Gobiya',
    description: 'A forensic SEO case study on traffic recovery after Google\'s March 2026 dual-update event. Learn the exact 12-week diagnostic sequence and fix order Gobiya used.'
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
    const graph: any[] = [
      {
        "@type": "InternetMarketingService",
        "@id": "https://www.gobiya.com/#agency",
        "name": "Gobiya",
        "url": "https://www.gobiya.com",
        "telephone": "(323) 744-1338",
        "foundingDate": "2012-11-15",
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
