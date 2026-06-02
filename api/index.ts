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
    title: 'Content Marketing Agency & Search Engine Optimization Firm | Los Angeles | Gobiya',
    description: 'Gobiya is a Search Engine Optimization Firm and Content Marketing Agency in Los Angeles. We engineer AI-driven SEO to recover lost traffic and scale revenue.'
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
  '/about/steve-martin': {
    title: 'Steve Martin | CEO, Lead Developer & Marketer | Gobiya',
    description: 'Professional credentials and author profile for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in advanced SEO, custom React engineering, and pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin | CEO, Lead Developer & Marketer | Gobiya',
    description: 'Professional credentials and author profile for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in advanced SEO, custom React engineering, and pipeline automation.'
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
  '/on-page-seo-los-angeles': {
    title: 'On-Page SEO Services in Los Angeles | Gobiya',
    description: 'Topical authority modeling, schema graph injection, and speed-optimized React structures built to convert Los Angeles organic search traffic into pipeline.'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'Generative Engine Optimization (GEO) Explained | Gobiya',
    description: 'The definitional guide to GEO: how Retrieval-Augmented Generation (RAG) pipelines cite sources, how it builds on traditional SEO, and what makes content citable.'
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

    template = template.replace(
      '<title>Content Marketing Agency & Search Engine Optimization Firm | Los Angeles | Gobiya</title>',
      `<title>${seo.title}</title>`
    );
    template = template.replace(
      '<meta name="description" content="Gobiya is a Search Engine Optimization Firm and Content Marketing Agency in Los Angeles. We engineer AI-driven SEO to recover lost traffic and scale revenue." />',
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

    // Secondary JSON-LD Schema builder for specific page types (Articles and ProfilePage)
    let secondarySchemaTag = '';
    if (pathname.startsWith('/insights/')) {
      const slug = pathname.substring('/insights/'.length);
      const publishDate = (slug === 'what-is-generative-engine-optimization-and-how-does-it-work') ? "2026-05-30" : 
                          (slug === 'what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty' || slug === 'chatgpt-vs-google-for-business-discovery') ? "2026-05-29" : 
                          "2026-05-25";

      const articleGraph: any[] = [
        {
          "@type": "Article",
          "headline": seo.title.replace(' | Gobiya', ''),
          "description": seo.description,
          "image": `https://www.gobiya.com/images/article-${slug}.webp`,
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
