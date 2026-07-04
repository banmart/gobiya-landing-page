/**
 * Gobiya service catalogue.
 * Each entry covers one service offering with slug, category, title, description, URL, and key features.
 */

export interface GobiyaService {
  slug: string;
  category: "performance" | "creativity" | "relations" | "standalone";
  title: string;
  shortDescription: string;
  fullDescription: string;
  url: string;
  keyFeatures: string[];
  idealFor: string[];
  metrics?: string; // headline proof point if available
}

export const services: GobiyaService[] = [
  // ── PERFORMANCE ────────────────────────────────────────────────
  {
    slug: "web-development",
    category: "performance",
    title: "Web Development",
    shortDescription:
      "Custom React & Next.js websites with sub-second load times and 90+ Lighthouse scores.",
    fullDescription:
      "Gobiya builds fast, modern web applications using React, Next.js, and Vite. Every project prioritises sub-second load times, Core Web Vitals excellence, zero platform lock-in, and built-in SEO infrastructure. No themes, no plugins — custom code that you own.",
    url: "https://www.gobiya.com/performance/web-development-agency",
    keyFeatures: [
      "React / Next.js / Vite builds",
      "Sub-second load times",
      "90+ Lighthouse scores",
      "Server-side rendering (SSR) and static generation",
      "Core Web Vitals optimisation",
      "Built-in SEO and schema markup",
      "Zero platform lock-in — you own all code",
    ],
    idealFor: [
      "B2B companies needing a high-performance marketing site",
      "Businesses migrating off WordPress or Webflow",
      "Brands requiring custom integrations (CRM, AI, blockchain)",
    ],
  },
  {
    slug: "seo-discoverability",
    category: "performance",
    title: "SEO Indexing & Discoverability",
    shortDescription:
      "Resolve crawl budget leaks, canonical errors, and indexation blocks — key pages in rankings.",
    fullDescription:
      "Gobiya diagnoses and fixes Google crawl budget waste, index coverage failures, canonical tag conflicts, and technical barriers preventing key pages from ranking. We move pages out of 'Crawled – currently not indexed' and into the top positions.",
    url: "https://www.gobiya.com/performance/seo-discoverability-agency",
    keyFeatures: [
      "Crawl budget audit and optimisation",
      "Index coverage analysis via Search Console",
      "Canonical tag audit and remediation",
      "Hreflang configuration",
      "Structured data implementation",
      "Internal link architecture",
      "Page speed and CWV remediation",
    ],
    idealFor: [
      "Sites with pages stuck in 'Crawled – currently not indexed'",
      "Recently migrated websites losing rankings",
      "E-commerce stores with thin or duplicate content issues",
    ],
  },
  {
    slug: "native-crm",
    category: "performance",
    title: "Native CRM Integration",
    shortDescription:
      "Own your pipeline data — custom CRM built into your codebase, no monthly SaaS fees.",
    fullDescription:
      "Instead of paying for Salesforce or HubSpot, Gobiya builds a custom CRM directly into your codebase. Lead capture, prospect enrichment, pipeline stages, email sequences, and reporting — all owned by you with complete data portability.",
    url: "https://www.gobiya.com/performance/native-crm-agency",
    keyFeatures: [
      "Custom lead capture forms wired to your database",
      "Supabase / PostgreSQL backend",
      "Pipeline stage management",
      "AI-powered prospect scraper",
      "Automated outbound email sequences",
      "Full data ownership — no vendor lock-in",
      "Real-time dashboard and reporting",
    ],
    idealFor: [
      "B2B companies paying high SaaS CRM fees",
      "Agencies needing custom pipeline tracking",
      "Businesses wanting AI-assisted prospecting built in",
    ],
  },
  {
    slug: "b2b-seo",
    category: "performance",
    title: "B2B SEO",
    shortDescription:
      "Pipeline attribution SEO — target decision-makers and procurement queries, not just traffic.",
    fullDescription:
      "B2B SEO built around pipeline value rather than impressions. Gobiya maps buying committee personas to specific search intents, builds topical authority clusters, and creates conversion architecture that turns organic clicks into qualified sales conversations.",
    url: "https://www.gobiya.com/performance/b2b-seo-agency",
    keyFeatures: [
      "Buying committee persona mapping",
      "Commercial-intent keyword architecture",
      "Topical authority cluster builds",
      "Pipeline-attributed conversion tracking",
      "Account-based content targeting",
      "LinkedIn / SEO alignment strategy",
    ],
    idealFor: [
      "B2B SaaS and technology companies",
      "Professional services firms",
      "Manufacturers and distributors targeting procurement teams",
    ],
    metrics: "Measured in pipeline value, not impressions",
  },
  {
    slug: "local-seo",
    category: "performance",
    title: "Local SEO Services",
    shortDescription:
      "Google Map Pack dominance, GBP optimisation, citation consistency, and review velocity.",
    fullDescription:
      "Gobiya engineers local search dominance for service-area businesses — Google Business Profile optimisation, NAP citation consistency across directories, review velocity programmes, and local schema markup that wins the 3-Pack.",
    url: "https://www.gobiya.com/performance/local-seo-services-agency",
    keyFeatures: [
      "Google Business Profile optimisation",
      "NAP citation audit and cleanup",
      "Review velocity strategy",
      "Local schema markup",
      "Location page creation and optimisation",
      "Map Pack rank tracking",
      "GBP suspension recovery",
    ],
    idealFor: [
      "Local service businesses (dentists, lawyers, contractors)",
      "Multi-location franchises",
      "Businesses whose GBP is suspended or suppressed",
    ],
  },
  {
    slug: "technical-seo-audit",
    category: "performance",
    title: "Technical SEO Audit",
    shortDescription:
      "Full diagnostic: crawl health, CWV, schema, index coverage — prioritised fix list.",
    fullDescription:
      "A forensic technical audit that identifies every indexation failure, crawl waste, Core Web Vitals deficit, and structured data error on your site, then delivers a ranked fix list tied to actual ranking impact.",
    url: "https://www.gobiya.com/performance/technical-seo-audit-agency",
    keyFeatures: [
      "Full crawl analysis (Screaming Frog methodology)",
      "Core Web Vitals (LCP, INP, CLS) assessment",
      "Index coverage audit via Search Console",
      "Schema markup validation",
      "Redirect chain analysis",
      "Mobile usability review",
      "Priority-ranked fix list",
    ],
    idealFor: [
      "Sites experiencing unexplained traffic drops",
      "Pre/post-migration health checks",
      "Enterprises needing independent SEO audit",
    ],
  },
  {
    slug: "seo-traffic-recovery",
    category: "performance",
    title: "SEO Traffic Recovery",
    shortDescription:
      "Diagnose and reverse organic traffic drops from Google algorithm updates and penalties.",
    fullDescription:
      "Gobiya specialises in forensic SEO traffic recovery — identifying the exact update or manual action responsible for a traffic drop, then executing the precise fix sequence to restore rankings. Forensic read first, targeted fix second.",
    url: "https://www.gobiya.com/performance/seo-traffic-recovery",
    keyFeatures: [
      "Algorithm update impact attribution",
      "Manual action identification and removal",
      "Content quality improvement (E-E-A-T)",
      "Link profile remediation",
      "Search Console reconsideration requests",
      "12-week recovery roadmap",
    ],
    idealFor: [
      "Sites hit by Google core algorithm updates",
      "Businesses affected by link scheme penalties",
      "Brands recovering from manual actions",
    ],
    metrics: "320% traffic recovery documented in published case study",
  },
  {
    slug: "ecommerce-seo",
    category: "performance",
    title: "E-Commerce SEO",
    shortDescription:
      "Product schema, category architecture, faceted navigation — rankings that drive revenue.",
    fullDescription:
      "E-commerce SEO built around revenue, not just rankings. Gobiya structures category and product pages for maximum indexation, deploys product schema, controls faceted navigation, and builds commercial-intent content clusters.",
    url: "https://www.gobiya.com/performance/ecommerce-seo-agency",
    keyFeatures: [
      "Category and product page architecture",
      "Product schema and rich results",
      "Faceted navigation crawl control",
      "Commercial-intent content clusters",
      "Internal link equity flow",
      "Inventory page management",
    ],
    idealFor: [
      "Online stores losing rankings to category duplication",
      "Shopify / WooCommerce sites with indexation issues",
      "Retailers needing product rich results",
    ],
  },
  {
    slug: "ai-prospect-scraper",
    category: "performance",
    title: "AI Prospect Scraper",
    shortDescription:
      "CRM-ready lead pipeline — AI extracts target contacts and automates outbound campaigns.",
    fullDescription:
      "Gobiya's AI prospect scraper extracts target business profiles (company name, contact, email, website, category) from live search results, enriches the data, and feeds them directly into an automated outbound email pipeline.",
    url: "https://www.gobiya.com/performance/ai-prospect-scraper-agency",
    keyFeatures: [
      "AI-powered business data extraction",
      "Contact enrichment (email, phone, website)",
      "Automated personalised outreach emails",
      "Gemini AI copywriting integration",
      "Supabase CRM pipeline",
      "Click tracking and open rate analytics",
    ],
    idealFor: [
      "B2B agencies needing outbound lead generation",
      "Sales teams replacing manual prospecting",
      "Companies launching new market territories",
    ],
  },
  {
    slug: "ai-llms-business",
    category: "performance",
    title: "AI & LLM Systems",
    shortDescription:
      "Custom AI models and secure LLMs integrated directly into your office workflows.",
    fullDescription:
      "Gobiya integrates custom AI models and secure LLMs into everyday business operations — document parsing, email drafting, CRM syncing, and workflow automation — with complete data privacy and no reliance on public AI APIs.",
    url: "https://www.gobiya.com/performance/ai-llms-business-agency",
    keyFeatures: [
      "Custom LLM deployment (Ollama, local models)",
      "Document parsing automation",
      "Email reply generation",
      "CRM data syncing",
      "Secure, private — data never leaves your infrastructure",
      "Integration with existing tools (Notion, Slack, email)",
    ],
    idealFor: [
      "Law firms and healthcare providers with strict data privacy needs",
      "Enterprises wanting AI without cloud data risk",
      "Operations teams drowning in repetitive document tasks",
    ],
  },
  {
    slug: "cro-ux-analysis",
    category: "performance",
    title: "CRO & UX Analysis",
    shortDescription:
      "Heatmaps, session replays, and A/B tests — funnel friction isolated and fixed.",
    fullDescription:
      "Gobiya identifies exactly where visitors drop off in your conversion funnel using heatmaps, session recordings, and A/B test data, then redesigns the user flows that are bleeding leads.",
    url: "https://www.gobiya.com/performance/cro-ux-analysis-agency",
    keyFeatures: [
      "Heatmap and click map analysis",
      "Session replay review",
      "A/B test design and implementation",
      "Form friction analysis",
      "Landing page redesign",
      "Checkout flow optimisation",
    ],
    idealFor: [
      "Sites with good traffic but poor conversion rates",
      "Landing pages underperforming vs. paid spend",
      "E-commerce checkout abandonment problems",
    ],
  },
  {
    slug: "blockchain-web3",
    category: "performance",
    title: "Blockchain & Web3 Development",
    shortDescription:
      "Smart contracts on Ethereum and Pulsechain, React dApps, and crypto SEO.",
    fullDescription:
      "Gobiya builds blockchain and Web3 applications — Solidity smart contracts, React dApp interfaces, token functions, and crypto SEO content that ranks in Google and gets cited by AI. Live build: TheARKCrypto.com on Pulsechain.",
    url: "https://www.gobiya.com/performance/blockchain-web3-development-agency",
    keyFeatures: [
      "Solidity smart contract development",
      "Ethereum and Pulsechain deployment",
      "React dApp frontend interfaces",
      "Token contract functions",
      "Crypto SEO content",
      "AI citation optimisation for crypto brands",
    ],
    idealFor: [
      "Crypto projects needing dApp development",
      "DeFi protocols wanting React frontends",
      "Web3 brands needing SEO visibility",
    ],
  },

  // ── CREATIVITY ─────────────────────────────────────────────────
  {
    slug: "seo-web-copywriting",
    category: "creativity",
    title: "SEO Web Copywriting",
    shortDescription:
      "Keyword-mapped copy that ranks on Google and gets cited by AI platforms.",
    fullDescription:
      "Gobiya writes copy that is simultaneously optimised for Google rankings and for AI citation — keyword research, semantic architecture, benefit-focused conversion copy, and GEO-structured formatting for B2B and professional services.",
    url: "https://www.gobiya.com/creativity/seo-web-copywriting-agency",
    keyFeatures: [
      "Keyword research and intent mapping",
      "Semantic architecture and NLP optimisation",
      "GEO (Generative Engine Optimisation) formatting",
      "Conversion copy for landing pages",
      "E-E-A-T signals and expert sourcing",
      "AI citation anchoring",
    ],
    idealFor: [
      "B2B companies with weak organic copy",
      "Brands rebuilding after content quality penalties",
      "Professional services firms needing authority content",
    ],
  },
  {
    slug: "seo-content-strategy",
    category: "creativity",
    title: "SEO Content Strategy",
    shortDescription:
      "Topic clusters, keyword mapping, internal link plan — architecture before the words.",
    fullDescription:
      "Gobiya builds the content architecture before a single word is written: keyword mapping, topic clusters, content gap analysis, and a prioritised editorial calendar designed to compound topical authority.",
    url: "https://www.gobiya.com/creativity/seo-content-strategy-agency",
    keyFeatures: [
      "Competitor content gap analysis",
      "Topical authority cluster design",
      "Keyword-to-page mapping",
      "Internal link architecture blueprint",
      "Editorial calendar (12–24 months)",
      "Content brief templates",
    ],
    idealFor: [
      "Companies starting a content programme from scratch",
      "Brands rebuilding after algorithm updates",
      "Teams needing a repeatable content system",
    ],
  },
  {
    slug: "geo-ai-content-writing",
    category: "creativity",
    title: "GEO & AI Content Writing",
    shortDescription:
      "Content built to be cited by ChatGPT, Perplexity, and Google AI Overviews.",
    fullDescription:
      "Gobiya produces content structured for AI citation: passage-level coherence, citation-anchor formatting, entity verification, and RAG-compatible structure. Not just indexed — cited by LLMs.",
    url: "https://www.gobiya.com/creativity/geo-ai-content-writing-agency",
    keyFeatures: [
      "RAG-compatible content structure",
      "Passage-level coherence optimisation",
      "Entity verification and schema integration",
      "AI citation anchor placement",
      "Fact-checked with verifiable sources",
      "LLM citation monitoring",
    ],
    idealFor: [
      "Brands invisible in ChatGPT and Perplexity answers",
      "Professional services needing AI authority",
      "B2B companies targeting AI-assisted buyer journeys",
    ],
  },
  {
    slug: "landing-page-copywriting",
    category: "creativity",
    title: "Landing Page Copywriting",
    shortDescription: "Copy engineered to convert ad clicks and organic traffic into leads.",
    fullDescription:
      "Gobiya writes landing page copy using behavioural psychology — benefit framing, friction reduction, social proof placement, and urgency signals — built to maximise conversion from paid and organic traffic.",
    url: "https://www.gobiya.com/creativity/landing-page-copywriting-agency",
    keyFeatures: [
      "Fogg Behavior Model framework",
      "Above-the-fold hook engineering",
      "Social proof and trust signal placement",
      "CTA hierarchy and friction reduction",
      "Mobile-first copy structure",
      "A/B test variant copy",
    ],
    idealFor: [
      "PPC landing pages underperforming",
      "High-ticket service businesses needing premium positioning",
      "SaaS companies with high churn at the trial-to-paid stage",
    ],
  },
  {
    slug: "website-copywriting-services",
    category: "creativity",
    title: "Website Copywriting",
    shortDescription:
      "Full website copy — home, about, services, product — SEO-structured and conversion-optimised.",
    fullDescription:
      "Every page of your site written to rank and convert: homepage, about, service pages, product descriptions. SEO-structured, conversion-optimised, brand-voice aligned, and ready for schema markup.",
    url: "https://www.gobiya.com/creativity/website-copywriting-services-agency",
    keyFeatures: [
      "Full site copy audit and rewrite",
      "Brand voice development",
      "Homepage hero and value proposition",
      "Service and product page copy",
      "About page trust building",
      "FAQ and objection-handling copy",
    ],
    idealFor: [
      "New business launches needing full site copy",
      "Rebrands requiring new voice and positioning",
      "Sites with copy written by non-writers",
    ],
  },
  {
    slug: "ai-videos",
    category: "creativity",
    title: "AI Video Production",
    shortDescription:
      "YouTube pre-roll, Amazon Prime Video, and social ads using Veo 3 and AI scriptwriting — 3–5 day turnaround.",
    fullDescription:
      "Gobiya produces broadcast-quality AI video ads in 3–5 days using Google Veo 3, Google Omni, AI scriptwriting, and text-to-voice. Formats include YouTube pre-roll, Amazon Prime Video spots, Paramount+ commercials, and social video.",
    url: "https://www.gobiya.com/creativity/ai-videos-agency",
    keyFeatures: [
      "Google Veo 3 and Omni production",
      "AI scriptwriting",
      "Text-to-voice and character generation",
      "YouTube pre-roll ad production",
      "Amazon Prime Video and Paramount+ spots",
      "Social media video (Reels, TikTok, LinkedIn)",
      "3–5 business day delivery",
    ],
    idealFor: [
      "Brands needing video ads without traditional production budgets",
      "E-commerce brands testing multiple creative concepts",
      "Local businesses wanting TV-quality ads affordably",
    ],
  },
  {
    slug: "crypto-web3",
    category: "creativity",
    title: "Crypto & Web3 Agency",
    shortDescription:
      "Launched, ranked, and cited — full-stack crypto marketing and Web3 development.",
    fullDescription:
      "Gobiya's crypto and Web3 practice combines smart contract development, React dApp interfaces, and crypto SEO content that ranks in Google and gets cited by AI. Live example: TheARKCrypto.com on Pulsechain.",
    url: "https://www.gobiya.com/creativity/crypto-web3-agency",
    keyFeatures: [
      "Smart contract development (Ethereum, Pulsechain)",
      "React dApp interfaces",
      "Crypto SEO content",
      "AI citation optimisation for Web3 projects",
      "Token marketing strategy",
    ],
    idealFor: [
      "DeFi protocols and token projects",
      "NFT platforms needing marketing and SEO",
      "Web3 startups launching their first dApp",
    ],
  },

  // ── RELATIONS ──────────────────────────────────────────────────
  {
    slug: "google-ads-ppc",
    category: "relations",
    title: "Google Ads & PPC Strategy",
    shortDescription:
      "Precision-targeted paid pipelines — 5.7× ROAS, 61% lower CPL documented.",
    fullDescription:
      "Gobiya builds and manages Google Ads campaigns that target high-intent buyers, aggressively lower customer acquisition costs, and maximise ROAS. Paid search treated as a pipeline engineering problem, not a media buy.",
    url: "https://www.gobiya.com/relations/google-ads-ppc-strategy-agency",
    keyFeatures: [
      "Campaign architecture and keyword strategy",
      "Landing page / ad relevance alignment",
      "Negative keyword hygiene",
      "Conversion tracking and attribution",
      "Smart bidding optimisation",
      "Monthly performance reporting",
    ],
    idealFor: [
      "Businesses with paid budgets delivering poor ROAS",
      "New market entrants needing immediate traffic",
      "Companies running Google Ads without a strategy",
    ],
    metrics: "5.7× ROAS, 61% lower CPL",
  },
  {
    slug: "authority-building",
    category: "relations",
    title: "Authority Building",
    shortDescription: "DR 50+ editorial backlinks and entity alignment for long-term organic authority.",
    fullDescription:
      "Gobiya builds domain authority through high-quality editorial backlinks (DR 50+), structured local citations, and entity alignment across the web — engineered for long-term organic authority and AI citation visibility.",
    url: "https://www.gobiya.com/relations/authority-building-agency",
    keyFeatures: [
      "Manual link outreach (no PBNs, no link farms)",
      "DR 50+ editorial placements",
      "Local citation building and cleanup",
      "Entity alignment (Wikidata, LinkedIn, GBP)",
      "Press mention acquisition",
      "AI citation footprint building",
    ],
    idealFor: [
      "New domains needing authoritative backlinks",
      "Brands with weak link profiles after penalty recovery",
      "Professional services needing sector authority",
    ],
  },
  {
    slug: "digital-pr-media-outreach",
    category: "relations",
    title: "Digital PR & Media Outreach",
    shortDescription:
      "Earned editorial coverage, press mentions, and backlinks that compound authority.",
    fullDescription:
      "Gobiya pitches and places editorial stories in the publications your buyers read — earned coverage, press mentions, and contextual backlinks that compound domain authority and AI citation visibility.",
    url: "https://www.gobiya.com/relations/digital-pr-media-outreach-agency",
    keyFeatures: [
      "Editorial story development",
      "Publication targeting and outreach",
      "Press release writing and distribution",
      "Journalist relationship management",
      "Link placement in editorial context",
      "AI citation coverage tracking",
    ],
    idealFor: [
      "Brands needing media coverage for authority signals",
      "Companies launching new products or studies",
      "Businesses wanting AI platform citations via press",
    ],
  },

  // ── STANDALONE ─────────────────────────────────────────────────
  {
    slug: "plastic-surgery-marketing",
    category: "standalone",
    title: "Plastic Surgery Internet Marketing",
    shortDescription:
      "Booked consultations, not clicks — procedure-specific SEO and compliant Google Ads.",
    fullDescription:
      "Gobiya's plastic surgery marketing practice specialises in procedure-specific SEO, compliant Google Ads campaigns, AI citation visibility, review velocity management, and content architecture for the 3–6 month consideration cycle unique to elective procedures.",
    url: "https://www.gobiya.com/plastic-surgery-internet-marketing",
    keyFeatures: [
      "Procedure-specific keyword strategy",
      "Compliant Google Ads (no before/after restrictions)",
      "Patient review velocity programme",
      "AI citation for elective procedure queries",
      "Long-cycle content architecture",
      "HIPAA-aware data handling",
    ],
    idealFor: [
      "Plastic surgery practices",
      "MedSpa and aesthetic clinics",
      "Elective surgery practices in competitive markets",
    ],
  },
];

/**
 * Find a service by slug (case-insensitive).
 */
export function findServiceBySlug(slug: string): GobiyaService | undefined {
  return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Get all services in a specific category.
 */
export function getServicesByCategory(
  category: GobiyaService["category"]
): GobiyaService[] {
  return services.filter((s) => s.category === category);
}
