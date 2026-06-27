import React, { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
}

// Outcome-focused metadata lookup map for crawlers and search bots (must match api/index.ts exactly)
const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: `Marketing/growth agency in Koreatown: SEO expert, recovery, PR - Gobiya`,
    description: `Gobiya reads Google's algorithm, identifies the penalty vector, and deploys the fix. SEO recovery, GEO, AI-powered growth. Los Angeles, since 2012.`
  },
  '/on-page-seo-los-angeles': {
    title: `On-page SEO agency in LA: schema, entity structure, speed - Gobiya`,
    description: `Struggling with organic drops or low conversions? Our elite on-page SEO services in Los Angeles optimize your site's entity structure, schema, speed, and content mapping for Google and AI engines.`
  },
  '/ai-seo-beverly-hills': {
    title: `AI SEO Beverly Hills: Google + ChatGPT Citations - Gobiya`,
    description: `AI SEO Beverly Hills — we engineer Google organic visibility and AI platform citations (ChatGPT, Claude, Gemini) for Beverly Hills businesses in the 90210 market. Entity graphs, GEO, and local Map Pack engineering.`
  },
  '/local-seo-glendale': {
    title: `Local SEO Glendale: Map Pack & Google Business Profile - Gobiya`,
    description: `Local SEO Glendale — we engineer Google Map Pack dominance, GBP optimization, citation consistency, and review velocity for businesses on Brand Boulevard and throughout the Glendale, CA market.`
  },
  '/seo-company-encino': {
    title: `SEO Company Encino: Technical SEO & Pipeline Engineering - Gobiya`,
    description: `Looking for an SEO company in Encino? We engineer Google visibility, AI citations, and organic pipeline growth for businesses on Ventura Boulevard and throughout the San Fernando Valley.`
  },
  '/local-seo-company-burbank': {
    title: `Local SEO Company Burbank: Map Pack & Google Business Profile - Gobiya`,
    description: `Local SEO company Burbank — we engineer Google Map Pack dominance, GBP optimization, citation consistency, and review velocity for businesses on San Fernando Boulevard and throughout the Burbank, CA 91501–91510 market.`
  },
  '/local-seo-services-burbank': {
    title: `Local SEO services Burbank: GBP, citations, Map Pack rankings - Gobiya`,
    description: `Local SEO services in Burbank, CA — top rated, online appointments available. We optimize Google Business Profile, NAP citations, review velocity, and local schema for businesses in the 91501–91510 corridor. Open Mon–Fri, book online.`
  },
  '/glendale-seo': {
    title: `Glendale SEO: top rated, open now, online appointments - Gobiya`,
    description: `Glendale SEO agency — technical SEO, local Map Pack optimization, content architecture, and authority building for businesses in the 91201–91210 market. Top rated, BBB A+, online appointments available. Book a pre-read today.`
  },
  '/los-angeles-seo-professional': {
    title: `Los Angeles SEO Professional: B2B & Enterprise SEO Engineering - Gobiya`,
    description: `Los Angeles SEO professional practice. Gobiya engineers technical SEO, commercial-intent content architecture, entity schema, and AI citation visibility for B2B brands and professional services firms across Greater Los Angeles.`
  },

  // ── Category pages ──
  '/creativity': {
    title: `Creative brand & identity design agency in LA: styling, voice, copy - Gobiya`,
    description: `Express your brand identity and capture market attention with Gobiya. We design custom brand identity systems, write compelling copy, and direct creative concepts.`
  },
  '/performance': {
    title: `High-performance digital growth & IT dev agency in LA: React, SEO, CRO - Gobiya`,
    description: `Engineer high-speed digital pipelines to scale conversions. Sub-second React/Next.js/Vite development, technical SEO, and conversion optimization.`
  },
  '/relations': {
    title: `PR & authority building agency in LA: link acquisition, media outreach - Gobiya`,
    description: `Construct sector authority and earn absolute market trust. Manually verified PR, content syndication, and high-quality contextual link building.`
  },

  // ── Performance subpages ──
  '/performance/web-development-agency': {
    title: `Web & IT development agency in LA: React, custom sites, speed - Gobiya`,
    description: `Gobiya replaces slow page-builders with custom, hand-coded React and Next.js websites — 100/100 Core Web Vitals, sub-second loads, zero templates, engineered to convert and rank natively.`
  },
  '/performance/native-crm-agency': {
    title: `Native CRM agency in LA: custom pipeline, zero SaaS fees, data ownership - Gobiya`,
    description: `As a native CRM agency, we build custom CRM integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data with full control.`
  },
  '/performance/seo-discoverability-agency': {
    title: `SEO & Discoverability agency in LA: technical SEO, audit, recovery - Gobiya`,
    description: `Technical SEO precision, semantic entity architecture, and algorithmic recovery — built as a compounding system. Crawl audits, Core Web Vitals, on-page optimization, and rank monitoring.`
  },
  '/performance/seo-traffic-recovery': {
    title: `SEO traffic recovery agency in LA: algorithm diagnosis, ranking restoration - Gobiya`,
    description: `SEO traffic recovery specialists in Los Angeles. We diagnose the exact Google update or penalty behind an organic traffic drop, execute the precise fix sequence, and restore rankings — forensic read first, targeted fix second.`
  },
  '/performance/technical-seo-audit-agency': {
    title: `Technical SEO audit agency in LA: crawl health, CWV, structured data - Gobiya`,
    description: `Full diagnostic of your crawl health, index coverage, Core Web Vitals, and structured data — with a prioritized fix list tied directly to ranking impact, not just a checklist.`
  },
  '/performance/local-seo-services-agency': {
    title: `Local SEO services agency in LA: GBP, citations, map-pack rankings - Gobiya`,
    description: `GBP optimization, NAP consistency across citations, location pages, and map-pack rankings for businesses that serve a geographic area. Los Angeles-based, nationwide service.`
  },
  '/performance/b2b-seo-agency': {
    title: `B2B SEO agency in LA: decision-maker queries, pipeline attribution - Gobiya`,
    description: `Long-cycle, high-value buyer journey optimization targeting decision-makers and procurement queries — not just traffic volume. B2B SEO measured in pipeline value, not impressions.`
  },
  '/performance/ecommerce-seo-agency': {
    title: `E-commerce SEO agency in LA: category pages, product schema, faceted nav - Gobiya`,
    description: `Category and product page architecture, faceted navigation control, schema deployment, and commercial-intent content clusters for online stores. Rankings that drive revenue.`
  },
  '/performance/blockchain-web3-development-agency': {
    title: `Blockchain & Web3 agency in LA: smart contracts, dApps, tokens - Gobiya`,
    description: `Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.`
  },
  '/performance/ai-prospect-scraper-agency': {
    title: `AI Prospect Scraper agency in LA: lead scraping, automation, data - Gobiya`,
    description: `Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.`
  },
  '/performance/ai-llms-business-agency': {
    title: `AI & LLM systems agency in LA: office automation, custom models, workflows - Gobiya`,
    description: `We integrate custom AI models and secure LLMs directly into your everyday office tasks. Automate document parsing, email replies, and CRM syncing with complete data privacy.`
  },
  '/performance/google-ads-ppc-strategy-agency': {
    title: `Google Ads & PPC strategy agency in LA: paid acquisition, ROAS, targeting - Gobiya`,
    description: `Stop burning cash on generic ad campaigns. We build precision-targeted paid pipelines that capture high-intent buyers, aggressively lower customer acquisition costs, and maximize ROAS.`
  },
  '/performance/cro-ux-analysis-agency': {
    title: `CRO & UX analysis agency in LA: funnel optimization, conversion lift - Gobiya`,
    description: `We isolate funnel friction and redesign user flows to lift conversions. Data-backed CRO analysis across landing pages, checkout flows, and lead capture forms.`
  },

  // ── Relations subpages ──
  '/relations/authority-building-agency': {
    title: `Authority building agency in LA: backlink acquisition, citations, PR outreach - Gobiya`,
    description: `Authority building agency for B2B and professional services brands. High-quality editorial backlinks, structured local citations, and entity alignment — engineered for long-term organic authority.`
  },

  '/relations/google-ads-ppc-strategy-agency': {
    title: `Google Ads & PPC strategy agency in LA: paid acquisition, ROAS, targeting - Gobiya`,
    description: `Google Ads & PPC strategy agency in Los Angeles. We build precision-targeted paid pipelines that capture high-intent buyers, aggressively lower customer acquisition costs, and maximize ROAS.`
  },

  // ── Recovery ──
  '/google-penalty-recovery': {
    title: `Google penalty recovery agency in LA: manual action removal, core update fix - Gobiya`,
    description: `Google penalty recovery specialists in Los Angeles. We diagnose manual actions and algorithmic suppressions, then execute the precise fix sequence — forensic audit, content consolidation, E-E-A-T rebuilding, and Search Console reconsideration.`
  },

  // ── Creativity subpages ──
  '/creativity/brand-identity-strategy-agency': {
    title: `Brand identity strategy agency in LA: brand design, voice, positioning - Gobiya`,
    description: `We define the unique essence, voice, and visual character of your business. Custom brand identity systems that command attention and drive conversion.`
  },
  '/creativity/communication-concepts-agency': {
    title: `Communication concepts agency in LA: campaigns, storytelling, messaging - Gobiya`,
    description: `Tell your story through dynamic visual and textual concepts. We develop integrated communication campaigns that turn attention into pipeline.`
  },
  '/creativity/seo-web-copywriting-agency': {
    title: `SEO & web copywriting agency in LA: landing pages, content strategy, GEO - Gobiya`,
    description: `Words that satisfy search crawlers and move buyers. Keyword research, semantic architecture, conversion copy, and GEO-optimized content — engineered as a single system.`
  },
  '/creativity/landing-page-copywriting-agency': {
    title: `Landing page copywriting agency in LA: conversion copy, CRO, ads - Gobiya`,
    description: `Copy engineered to convert the visitor who arrives from an ad or organic click into a lead or sale. Benefit framing, friction reduction, and social proof — built to perform.`
  },
  '/creativity/website-copywriting-services-agency': {
    title: `Website copywriting services agency in LA: home, about, services pages - Gobiya`,
    description: `Every page of your site — home, about, services, product — written to rank and convert. SEO-structured, conversion-optimized, brand-voice aligned.`
  },
  '/creativity/seo-content-strategy-agency': {
    title: `SEO content strategy agency in LA: keyword mapping, topic clusters - Gobiya`,
    description: `The architecture before the words: keyword mapping, topic clusters, internal link plan, and content gap analysis — before a single word is written.`
  },
  '/creativity/geo-ai-content-writing-agency': {
    title: `GEO & AI content writing agency in LA: ChatGPT, Perplexity citations - Gobiya`,
    description: `Content built to be cited by ChatGPT, Perplexity, and Google AI Overviews — not just indexed. Structured for AI extraction, passage-level coherence, and entity verification.`
  },
  '/creativity/creative-art-direction-agency': {
    title: `Creative art direction agency in LA: styling, imagery, layout, motion - Gobiya`,
    description: `We coordinate styling, imagery, layout, and motion for your creative assets. End-to-end art direction for brand campaigns, digital ads, and content production.`
  },
  '/creativity/social-media-management-agency': {
    title: `Social media management agency in LA: content, community, growth - Gobiya`,
    description: `We grow active community loops around your core brand message. Strategic social content planning, production, and analytics for sustained audience growth.`
  },

  // ── Legacy capabilities URLs (kept for backward compatibility with existing indexed pages) ──
  '/capabilities': {
    title: `SEO & Web development capabilities in LA: custom CRM, React, authority - Gobiya`,
    description: `Gobiya builds fast, modern web applications with native CRM pipelines, built-in SEO discoverability, AI prospect automation, and custom Web3 integrations — one codebase, complete data ownership.`
  },
  '/capabilities/web-development-agency': {
    title: `Web & IT development agency in LA: React, custom sites, speed - Gobiya`,
    description: `Gobiya replaces slow page-builders with custom, hand-coded React and Next.js websites — 100/100 Core Web Vitals, sub-second loads, zero templates, engineered to convert and rank natively.`
  },
  '/capabilities/native-crm-agency': {
    title: `PPC & Lead generation agency in LA: CRM integrations, pipeline, ads - Gobiya`,
    description: `We build custom CRM website integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data.`
  },
  '/capabilities/seo-discoverability-agency': {
    title: `SEO & Discoverability agency in LA: SEO expert, recovery, audit - Gobiya`,
    description: `We build technical SEO for React websites into the codebase, optimizing crawlability, rendering speed, and AI citations.`
  },
  '/capabilities/blockchain-web3-development-agency': {
    title: `Blockchain & Web3 agency in LA: smart contracts, dApps, tokens - Gobiya`,
    description: `Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.`
  },
  '/capabilities/ai-prospect-scraper-agency': {
    title: `AI Prospect Scraper agency in LA: lead scraping, automation, data - Gobiya`,
    description: `Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.`
  },
  '/capabilities/ai-llms-business-agency': {
    title: `AI & LLM systems agency in LA: office automation, custom models, workflows - Gobiya`,
    description: `We integrate custom AI models and secure LLMs directly into your everyday office tasks. Automate document parsing, email replies, and CRM syncing with complete data privacy.`
  },
  '/capabilities/authority-building-agency': {
    title: `Authority & PR agency in LA: backlink acquisition, citations, outreach - Gobiya`,
    description: `Build search engine trust with high-quality, relevant backlink acquisition and structured localized entity citations, engineered for long-term organic authority.`
  },

  // ── Core pages ──
  '/about': {
    title: `SEO & Marketing agency in LA: Gobiya team, Steve Martin, experience - Gobiya`,
    description: `Gobiya is a precision-engineered search visibility and digital solutions firm, founded 2012 in Los Angeles and led by Steve Martin — 25+ years bridging full-stack engineering and organic search.`
  },
  '/case-studies': {
    title: `SEO & growth case studies in LA: Smile Center, Livescan, results - Gobiya`,
    description: `Real clients, real numbers. SmileCenter Dentistry: 5x patient inquiries and 213K impressions. American Livescan: 3x bookings after a legacy migration. Data-backed search recovery and pipeline case studies from Gobiya.`
  },
  '/approach': {
    title: `Forensic SEO & growth approach in LA: entity structure, GEO, HCU recovery - Gobiya`,
    description: `Gobiya's operating model for algorithmic dominance: entity-based indexing, topical authority and schema engineering, Generative Engine Optimization (GEO) for LLM visibility, and pipeline-first conversion architecture.`
  },
  '/case-studies/smile-center-dentistry': {
    title: `Dental SEO Case Study: 5x Patient Inquiries | Gobiya`,
    description: `How we rebuilt SmileCenter's website on React/Vite, architected individual location pages for Southern California markets, and drove a 5x increase in form completions and phone calls.`
  },
  '/case-studies/american-livescan': {
    title: `Local SEO Case Study: Tripled Online Bookings | Gobiya`,
    description: `How we replaced a legacy .htm site with a clean-URL architecture, optimized the Google Business Profile, and tripled online appointments and phone calls for a high-volume LA fingerprinting service.`
  },
  '/contact': {
    title: `Contact SEO & growth agency in LA: book call, free audit, locations - Gobiya`,
    description: `Reach Gobiya in Los Angeles. Call 323-744-1338, email hello@gobiya.com, or fill out our contact form for an SEO audit, web development, or AI growth consultation.`
  },
  '/company/careers': {
    title: `Growth Engineering Careers: Join Our Dev Team | Gobiya`,
    description: `Explore growth engineering jobs at Gobiya. We are hiring React developers, technical SEO specialists, and sales engineers. Apply now.`
  },
  '/book': {
    title: `Book forensic SEO audit in LA: 15-min review, search recovery, CRM audit - Gobiya`,
    description: `Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.`
  },
  '/book-call': {
    title: `Book forensic SEO audit in LA: 15-min review, search recovery, CRM audit - Gobiya`,
    description: `Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.`
  },
  '/insights': {
    title: `SEO & Algorithmic Intelligence in LA: insights, core updates, briefs - Gobiya`,
    description: `Advanced tactical intelligence on Google and AI search: algorithm update analysis, GEO and LLM citation tactics, entity SEO, technical recovery briefs, and pipeline engineering field notes from Gobiya.`
  },

  // ── Insights articles ──
  '/insights/how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction': {
    title: `How to Apply Behavioral Psychology Principles to High-Ticket B2B Landing Page Wireframes | Gobiya`,
    description: `Learn how to apply behavioral psychology principles like the Fogg Behavior Model and Hick's Law to high-ticket B2B landing page wireframes to decrease friction.`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'
  },
  '/insights/multi-location-websites-for-franchises': {
    title: `Multi-Location Websites for Franchises: The 2026 Playbook | Gobiya`,
    description: `A technical guide to multi-location websites for franchises. Learn subdirectory URL configuration, page cannibalization avoidance, and SEO governance.`,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80'
  },
  '/insights/dental-seo-agency': {
    title: `Dental SEO Agency Evaluation Checklist & KPIs | Gobiya`,
    description: `Avoid costly hiring mistakes. Use our comprehensive evaluation checklist for dental SEO agencies, covering contract traps, KPIs, and case study audits.`,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80'
  },
  '/insights/brand-entity-extraction-perception-drift': {
    title: `Brand Entity Extraction & Perception Drift | Gobiya`,
    description: `How brand entity extraction works across Google, Bing, Wikidata, and LLM knowledge graphs — and how to detect and correct perception drift.`,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80'
  },
  '/insights/what-are-ai-seo-services': {
    title: `AI SEO Services: Get Cited by ChatGPT & Google AI | Gobiya`,
    description: `What are AI SEO services? AI SEO services optimize your brand to be cited in ChatGPT, Gemini, Perplexity & Google AI Overviews. See types, costs & ROI — book a free AI visibility audit.`,
    image: '/images/article-what-are-ai-seo-services.webp'
  },
  '/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses': {
    title: `Introducing the Open Knowledge Format: Why It Matters for AI-Ready Businesses | Gobiya`,
    description: `Google Cloud's new open spec, OKF, formalizes the 'LLM-wiki' pattern into a portable, vendor-neutral standard for the knowledge AI agents actually need.`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'
  },
  '/insights/gobiya-vs-enterprise-seo-agencies': {
    title: `Enterprise SEO vs Gobiya: Speed & Cost Compare | Gobiya`,
    description: `We compare enterprise SEO agencies vs Gobiya, showing the speed, cost, and CRM pipeline differences for B2B brands.`,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: `Automate B2B Sales Pipelines via AI Citations | Gobiya`,
    description: `Integrate B2B sales pipeline automation with search intent. Learn how AI citation share decides who gets on the buyer shortlist.`,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80'
  },
  '/insights/automated-lead-generation-seo': {
    title: `Automate Lead Generation: Search Intent Maps | Gobiya`,
    description: `Set up automated lead generation by mapping high-intent search clusters to your B2B pipeline to drive closed sales, not just page views.`,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80'
  },
  '/insights/outbound-seo-prospecting': {
    title: `Outbound SEO Prospecting: Target Search Intent | Gobiya`,
    description: `Use outbound SEO prospecting to monitor search intent triggers. Learn how to pitch buyers at the exact moment they search for your service.`,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: `Automate B2B Sales: Connect Search to CRM | Gobiya`,
    description: `Configure B2B sales pipeline automation workflows. Learn how to connect search intent, lead data enrichment, and automated email campaigns.`,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: `Select the Best B2B SEO Agency: 2026 Checklist | Gobiya`,
    description: `How to select the best SEO agency for B2B brands. Follow our evaluation checklist to verify technical authority, case studies, and contracts.`,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: `SEO for B2B Lead Gen: Win the Buying Committee | Gobiya`,
    description: `Learn how to deploy SEO for B2B lead generation by mapping landing pages to the full buying committee, satisfying all key decision-makers.`,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'
  },
  '/insights/b2b-seo-agency': {
    title: `B2B SEO Agency: Focus on Pipeline Attribution | Gobiya`,
    description: `Partner with a B2B SEO agency built around pipeline value, not just search volume. Verify our committee mapping and conversion playbooks.`,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
  },
  '/insights/local-seo': {
    title: `Local SEO Strategy: Dominate the 3-Pack Maps | Gobiya`,
    description: `Optimize your search presence with our local SEO strategy. Learn the weekly rhythm and maps pack audit tactics to win local organic rankings.`,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80'
  },
  '/insights/local-seo-explained': {
    title: `Local SEO Explained: Dominate Search in 90 Days | Gobiya`,
    description: `Our local SEO explained playbook delivers a 90-day execution framework. Master business signals, citations, and tracking to dominate local grids.`,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: `B2B Organic Traffic: Build CRM Pipeline Value | Gobiya`,
    description: `Why B2B organic traffic is decoupling from pipeline revenue—and how to target high-intent search clusters to build pipeline value.`,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80'
  },
  '/insights/multi-location-seo-website-structure': {
    title: `Multi-Location SEO: Design URL Hierarchies | Gobiya`,
    description: `Learn to structure a multi-location SEO website structure that prevents cannibalization, consolidates link equity, and ranks every city page.`,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: `Best Website Structure for Multiple Locations | Gobiya`,
    description: `Our guide details the best website structure for multiple locations. Compare subdirectory vs subdomain hierarchies for localized organic growth.`,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80'
  },
  '/insights/google-business-profile-optimization': {
    title: `Google Business Profile: Suspensions & Audits | Gobiya`,
    description: `Learn our Google Business Profile optimization checklist to recover suspended profiles, appeal algorithmic soft bans, and verify map listings.`,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: `Google Core Update Recovery: Restore Full Traffic | Gobiya`,
    description: `Our Google core update recovery guide details the timeline, content pruning strategies, and quality updates needed to restore search traffic.`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: `Remove Google Manual Actions: Reconsideration Guide | Gobiya`,
    description: `Use our Google manual action removal checklist to audit link profiles, document cleanup, and submit a successful reconsideration appeal.`,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: `Manual Action vs Algorithmic Penalty: Diagnostic Guide | Gobiya`,
    description: `Understand manual action vs algorithmic penalty differences, Search Console reports, and step-by-step diagnostic checklists for recovery.`,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: `ChatGPT vs Google Search: Customer Discovery | Gobiya`,
    description: `Comparing ChatGPT vs Google search discovery rates. Learn how to optimize your brand footprint to win both AI summaries and clicks.`,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80'
  },
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: `B2B Pipeline Revenue: How SEO Drives B2B Leads | Gobiya`,
    description: `Learn how to connect search clusters to B2B pipeline revenue, map content to the buying committee, and scale inbound conversions.`,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
  },
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: `LLM Company Verification: Data Sources AI Uses | Gobiya`,
    description: `Discover how ChatGPT and Claude handle LLM company verification by crawling Wikidata, LinkedIn, and review portals to establish trust.`,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: `Knowledge Graph Optimization vs GEO: AI Splits | Gobiya`,
    description: `Understand how Knowledge Graph optimization differs from GEO, how entity resolution works, and how to secure AI citation visibility.`,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: `SEO Case Study: Recover 320% Traffic Growth | Gobiya`,
    description: `A forensic SEO case study on traffic recovery after Google's March 2026 dual-update event. Learn the exact 12-week diagnostic sequence and fix order Gobiya used.`,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: `Generative Engine Optimization (GEO): Complete AI Guide | Gobiya`,
    description: `A complete technical guide to Generative Engine Optimization (GEO). Learn how RAG-based AI search engines cite content and how to optimize.`,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
  },
  '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks': {
    title: `AI Search Scraping: API vs Server HTML Blocks | Gobiya`,
    description: `Understand how AI search scraping works. Learn why AI crawlers bypass JavaScript APIs and read raw public HTML blocks instead.`,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80'
  },

  // ── Author pages ──
  '/about/steve-martin': {
    title: `Steve Martin: Lead Growth Engineer & Founder | Gobiya`,
    description: `Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.`
  },
  '/author/steve-martin': {
    title: `Steve Martin: Lead Growth Engineer & Founder | Gobiya`,
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
    // For dynamic fan-out or capability routes, generate a fallback
    let seo = metadataMap[pathname];
    if (!seo) {
      if (pathname.startsWith('/insights/')) {
        seo = {
          title: 'Industry Insights | Gobiya',
          description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies from the Gobiya team.'
        };
      } else if (pathname.startsWith('/capabilities/') || pathname.startsWith('/performance/') || pathname.startsWith('/relations/') || pathname.startsWith('/creativity/')) {
        const segments = pathname.split('/').filter(Boolean);
        const category = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
        const lastSegment = segments[segments.length - 1];
        const formattedTitle = lastSegment.replace(/-agency$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        seo = {
          title: `${formattedTitle} agency in LA - Gobiya`,
          description: `${category} solutions: ${formattedTitle} services from Gobiya. Hyper-targeted strategy and execution for measurable discoverability and conversion.`
        };
      } else {
        seo = metadataMap['/'];
      }
    }
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
        ogImageUrl = `https://www.gobiya.comhttps://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80`;
      } else if (slug === 'seo-case-study-traffic-recovery') {
        ogImageUrl = `https://www.gobiya.comhttps://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80`;
      } else {
        ogImageUrl = `https://www.gobiya.comhttps://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80${slug}.webp`;
      }
    }

    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) ogImageTag.setAttribute('content', ogImageUrl);

    const twImageTag = document.querySelector('meta[name="twitter:image"]');
    if (twImageTag) twImageTag.setAttribute('content', ogImageUrl);

    // Update Canonical
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    // For capability pages that used to be agency suffix, retain trailing slash if defined
    let canonicalPath = path;
    if (path.startsWith('/capabilities/') && path.endsWith('-agency')) {
      canonicalPath = path + '/';
    }
    const fullCanonicalUrl = `https://www.gobiya.com${canonicalPath}`;
    
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullCanonicalUrl);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = fullCanonicalUrl;
      document.head.appendChild(link);
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
        "foundingDate": "2012",
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
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Discoverability", "url": "https://www.gobiya.com/performance/seo-discoverability-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audit", "url": "https://www.gobiya.com/performance/technical-seo-audit-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO Services", "url": "https://www.gobiya.com/performance/local-seo-services-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "B2B SEO", "url": "https://www.gobiya.com/performance/b2b-seo-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce SEO", "url": "https://www.gobiya.com/performance/ecommerce-seo-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Penalty Recovery", "url": "https://www.gobiya.com/google-penalty-recovery" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Web Copywriting", "url": "https://www.gobiya.com/creativity/seo-web-copywriting-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Landing Page Copywriting", "url": "https://www.gobiya.com/creativity/landing-page-copywriting-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GEO & AI Content Writing", "url": "https://www.gobiya.com/creativity/geo-ai-content-writing-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "url": "https://www.gobiya.com/performance/web-development-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Native CRM & Outbound Pipelines", "url": "https://www.gobiya.com/performance/native-crm-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & LLMs for Businesses", "url": "https://www.gobiya.com/performance/ai-llms-business-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain & Web3 Development", "url": "https://www.gobiya.com/performance/blockchain-web3-development-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Authority Building", "url": "https://www.gobiya.com/relations/authority-building-agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Identity Strategy", "url": "https://www.gobiya.com/creativity/brand-identity-strategy-agency" } }
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
        "@id": `${fullCanonicalUrl}/#webpage`,
        "url": fullCanonicalUrl,
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
