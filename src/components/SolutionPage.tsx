import React, { useEffect, useState } from 'react';
import { ArrowRight, Search, Activity, Trophy, ChevronDown, ChevronRight, BarChart, Target, Zap, Play, Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import RotatingText from './RotatingText';
import InsightsSlider from './InsightsSlider';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

gsap.registerPlugin(ScrollTrigger);

interface SolutionData {
  h1: string;
  subHeadline: string;
  heroImage?: string;
  rotatingWords?: string[];
  insightCategory?: string;
  ctaText: string;
  ctaLink: string;
  
  // Hero Stats
  stats: { value: string; label: string; text: string }[];
  
  // Approach Section
  approachTitle: string;
  approachSubtitle: string;
  approach: { icon: any; title: string; desc: string }[];
  
  // Value Cards
  valueCards: { title: string; text: string; highlight?: boolean }[];
  
  // Execution Accordion
  executionTitle: string;
  executionImage: string;
  executionSteps: { title: string; content: string }[];
  
  // Case Study
  caseStudy: {
    headline: string;
    description: string;
    tag: string;
    ctaText: string;
    backgroundImage?: string;
  };
  
  // Learning Center (Optional)
  learningCenterTitle?: string;
  learningCenterSubtitle?: string;
  videos?: { title: string; author: string; src: string; }[];
  
  // FAQs (Optional)
  faqTitle?: string;
  faqs?: { question: string; answer: string }[];
}

const SOLUTIONS_DATA: Record<string, SolutionData> = {
  '/services/seo': {
    h1: 'We engineer technical SEO that wins entities, not just keywords.',
    subHeadline: 'Forensic audits, topical authority architectures, and EEAT signal engineering — built for high-stakes brands operating in volatile algorithmic environments.',
    rotatingWords: ['recover traffic.', 'scale pipelines.', 'secure dominance.'],
    insightCategory: 'SEO',
    ctaText: 'Start your SEO engagement',
    ctaLink: '/contact',
    
    stats: [
      { value: '+300mm', label: 'people use ChatGPT weekly', text: 'with users sending over 1 billion messages per day.' },
      { value: '+70%', label: 'of Gen Z and Millennials', text: 'trust AI-generated answers more when brands are mentioned in responses.' },
      { value: '+200%', label: 'increase in branded citations', text: 'across AI search platforms in 2024 alone.' },
      { value: '+3.5bn', label: 'AI-assisted searches', text: 'expected monthly by the end of 2025.' }
    ],
    
    approachTitle: 'A future-facing strategy for AI discovery.',
    approachSubtitle: "Custom AI search optimization strategies designed to future-proof your brand's discoverability, increase your representation in LLM responses, and build a presence in the next generation of search.",
    approach: [
      { icon: Search, title: 'Competitive research.', desc: 'We analyze how AI systems perceive your brand across the web, identify gaps in content or optimizations, and benchmark your AI presence and sentiment against competitors.' },
      { icon: Activity, title: 'Optimize on, and off-site content.', desc: 'We refine on-page content with improved structuring, better longtail keyword inclusion and schema, and boost your off-page authority via digital PR, guest posting, and media mentions.' },
      { icon: Trophy, title: 'Strengthen brand through E-E-A-T.', desc: 'We ensure your brand is defined, authoritative, and clearly positioned as a trusted entity, supported by relevant content, expert authors and reviewers, and strong off page signals.' }
    ],
    
    valueCards: [
      { title: 'Data-Backed Optimization', text: 'We use insights from AI visibility audits and real-time monitoring to build authority.' },
      { title: 'Crafting Content for AI', text: 'We work hard to craft content that satisfies user needs while being easily parsed, trusted, and cited by AI.', highlight: true },
      { title: 'Continuous Adaptation', text: 'The AI search landscape is evolving rapidly. We continuously adapt your architecture.' },
      { title: 'Building LLM Trust Signals', text: 'From structured data and technical SEO to PR campaigns and expert bios.' }
    ],
    
    executionTitle: 'From discovery, to engagement and conversion.',
    heroImage: '/images/seo_hero.webp',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Auditing & Analysis', content: 'AI search engine optimization begins with a comprehensive audit of how your brand is represented across AI platforms and search models like ChatGPT, Gemini, AI Overviews, and Perplexity. We assess your opportunities to improve by auditing existing content, content gaps, technical SEO, and offsite signals such as backlinks and brand mentions.' },
      { title: 'Visibility & Optimization', content: 'We model your market as an interconnected semantic graph and map each service to its corresponding entity node. We eliminate keyword cannibalization at the URL level so every page targets a unique intent.' },
      { title: 'Conversion Optimization', content: 'We engineer conversion paths into the page layer from the first line of code. CTA placement, scroll behavior, form architecture, and trust signal sequencing are designed against documented buyer behavior.' },
      { title: 'Testing & Reporting', content: 'We monitor your ranking surface against every confirmed and unconfirmed core update. When volatility appears, we run forensic deltas to identify which entities were impacted, and we adjust.' }
    ],
    
    caseStudy: {
      tag: 'Fintech Provider',
      headline: 'Financial technology provider sees a +994% increase in referral traffic from LLMs.',
      description: 'Technical site fixes, online reputation management and brand building through digital PR helps tech giant increase mentions / citations from ChatGPT, Perplexity and Gemini.',
      ctaText: 'Book a call to learn more'
    },
    
    learningCenterTitle: 'Conquer AI search optimization at your own pace.',
    learningCenterSubtitle: 'Our learning center offers in-depth resources and bite-sized content to make you an AI optimization orchestrator.',
    videos: [
      { title: "How to Get Mentioned in Google's AI Search Results", author: 'Steve Martin', src: '/videos/ark------final-----01.webm' },
      { title: 'The Future of Organic Traffic', author: 'Steve Martin', src: '/videos/caveman.webm' },
      { title: '3X SEO Traffic With AI', author: 'Steve Martin', src: '/videos/gobiyaRace.webm' },
      { title: 'Next-Gen SEO: How to Dominate Search in 2025', author: 'Steve Martin', src: '/videos/sc-hero-background-compressed.webm' },
      { title: 'How to Rank on SearchGPT (And Other AI Search Engines)', author: 'Steve Martin', src: '/videos/smilecenter-screencast.webm' },
      { title: 'SearchGPT: How to Get Ready', author: 'Steve Martin', src: '/videos/space-girl.webm' }
    ],
    
    faqTitle: "Frequently asked questions about Google's AI Overviews, LLMs and AI Search Optimization.",
    faqs: [
      { question: 'What is the difference between AI Search Optimization and Generative Engine Optimization (GEO)?', answer: 'AI Search Optimization involves tailoring your overall digital presence to be recognized and prioritized by AI models. Generative Engine Optimization (GEO) focuses specifically on optimizing content so that it is cited as a source in generative responses like AI Overviews.' },
      { question: 'Why are brand mentions and citations important for AI SEO?', answer: 'Brand mentions and citations act as trust signals for LLMs. The more frequently a brand is mentioned in authoritative contexts, the more likely the AI is to recommend it.' },
      { question: 'What technical elements are key to making content AI-ready?', answer: 'Structured data (schema markup), clean semantic HTML, fast load times, and logical entity relationships are crucial for AI engines to parse and understand your content effectively.' },
      { question: 'How does EEAT tie into AI SEO?', answer: 'Experience, Expertise, Authoritativeness, and Trustworthiness (EEAT) remain foundational. AI models are trained to prefer high-quality, verified sources, meaning strong EEAT directly correlates with better AI visibility.' }
    ]
  },
  
  '/services/geo-optimization': {
    h1: 'We engineer the citations LLMs use to recommend your brand.',
    subHeadline: 'Generative Engine Optimization (GEO) for brands ready to be referenced natively inside ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews.',
    rotatingWords: ['dominate AIOs.', 'capture citations.', 'control AI.'],
    insightCategory: 'Strategy',
    ctaText: 'Start your GEO program',
    ctaLink: '/contact',
    
    stats: [
      { value: '45%', label: 'of modern search queries', text: 'now trigger AI-generated summaries above traditional results.' },
      { value: '3x', label: 'higher conversion rate', text: 'for users arriving via direct LLM recommendation vs traditional search.' },
      { value: '92%', label: 'of executives surveyed', text: 'believe Generative AI search will disrupt their current SEO traffic.' },
      { value: '+400%', label: 'growth in conversational queries', text: 'requiring semantic entity optimization instead of keyword density.' }
    ],
    
    approachTitle: "Architecting your brand for the generative era.",
    approachSubtitle: "Modern LLMs do not navigate page-authority vectors. They retrieve from semantic spaces. We ensure your brand is densely and authoritatively represented across the sources AI systems trust.",
    approach: [
      { icon: Search, title: 'AI citation baseline audit.', desc: "We test your brand against the queries your buyers actually run inside ChatGPT, Claude, Perplexity, and Gemini to log when you are cited and when competitors take your place." },
      { icon: Activity, title: 'Semantic PR & citation building.', desc: "We execute targeted PR placements, data drops, and definitional content that put your brand name and statistics inside the trusted sources LLM builders use." },
      { icon: Target, title: 'Entity graph integration.', desc: "We define your brand's entity relationships explicitly through schema, Wikipedia presence, and structured external profiles, minimizing semantic distance to verified authority anchors." }
    ],
    
    valueCards: [
      { title: 'Semantic Mapping', text: 'We map the publications, datasets, and directories that LLMs use during retrieval.' },
      { title: 'Quote-Ready Architecture', text: 'We restructure your pages to match LLM extraction habits with direct Q&A blocks and tabular comparisons.', highlight: true },
      { title: 'Definitional Content', text: 'When a retrieval pipeline scans your page, it finds quote-ready answers, not marketing prose.' },
      { title: 'Citation Rate Tracking', text: 'We measure share of voice inside generative answers and monitor citation drift.' }
    ],
    
    executionTitle: 'From raw data to verified AI citation.',
    heroImage: '/images/geo_hero.webp',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Entity Gap Analysis', content: 'We surface the entity gap between where you sit today and where the answer engines expect a category leader to sit.' },
      { title: 'Content Restructuring', content: 'We add clean summaries at the top of every section, schema markup, and explicit definitional statements to feed retrieval pipelines directly.' },
      { title: 'Off-site Authority Building', content: 'We build structured external profiles and connect your organization node to the topical entities you want to be retrieved for.' },
      { title: 'Monitoring & Optimization', content: 'We track your LLM citation rate as a primary KPI across model providers and re-deploy entity reinforcement where coverage decays.' }
    ],
    
    caseStudy: {
      tag: 'Enterprise SaaS',
      headline: 'SaaS platform captures 85% share of voice in top-tier AI conversational queries.',
      description: 'By restructuring technical documentation into quote-ready formats and optimizing Wikipedia/Wikidata entities, the brand became the default recommended provider across ChatGPT and Claude.',
      ctaText: 'View the case study'
    }
  },

  '/google-penalty-recovery': {
    h1: 'We recover the traffic that algorithm updates took away.',
    subHeadline: 'Forensic recovery audits for domains hit by Google Core Updates, the Helpful Content System, link spam updates, or manual actions. We diagnose the drop and restore index standing.',
    rotatingWords: ['lift penalties.', 'restore traffic.', 'remove actions.'],
    insightCategory: 'SEO',
    ctaText: 'Audit my traffic loss',
    ctaLink: '/contact',
    
    stats: [
      { value: '68%', label: 'of sites hit by core updates', text: 'never fully recover their previous peak traffic without structural changes.' },
      { value: '3-6', label: 'months average recovery time', text: 'for manual actions when proper forensic diagnosis is applied.' },
      { value: '100%', label: 'success rate removing', text: 'pure spam and unnatural link manual actions for enterprise clients.' },
      { value: '+850%', label: 'traffic rebound post-HCU', text: 'for our top performing recovery case study in the SaaS sector.' }
    ],
    
    approachTitle: "Forensic diagnosis. Surgical remediation.",
    approachSubtitle: "A manual action or a severe algorithmic suppression is not a standard SEO problem; it is an existential business crisis. We do not try to optimize a penalized site. We forensically rebuild its trust metrics.",
    approach: [
      { icon: Search, title: 'Forensic update audit.', desc: "We anchor your traffic loss to confirmed update windows and benchmark affected segments to isolate the precise structural or content signal that was demoted." },
      { icon: Target, title: 'Quality classifier modeling.', desc: "We model your site against Google's quality rater guidelines and the documented characteristics of Helpful Content System demotions." },
      { icon: Zap, title: 'Algorithmic trust restoration.', desc: "We harden authorship and credentialing, repair internal link equity, restore citation density, and engineer the structured data Google requires to re-classify the domain." }
    ],
    
    valueCards: [
      { title: 'Precise Diagnosis', text: 'We segment the affected URLs by topical cluster, page type, query intent, and historical ranking depth.' },
      { title: 'Content Pruning & Restructuring', text: 'We prune low-value, thin, and AI-generated content that drags the domain-level quality signal downward.', highlight: true },
      { title: 'EEAT Signal Repair', text: 'We rebuild the trust signals the demotion stripped, hardening authorship and credentialing.' },
      { title: 'Recovery Monitoring', text: 'We log re-indexation events, ranking returns, and click-through recovery daily.' }
    ],
    
    executionTitle: 'Rebuilding algorithmic trust from the ground up.',
    heroImage: '/images/penalty_hero.webp',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Identify the Toxic Vectors', content: "We run forensic deltas on your analytics, Search Console, and server logs to pinpoint exactly which update targeted your site and which specific pages triggered the classifiers." },
      { title: 'Surgical Content Consolidation', content: "We consolidate near-duplicate pages, restructure thin clusters into authoritative pillar hubs, and re-engineer remaining content to meet the EEAT bar the update enforces." },
      { title: 'Link Risk Mitigation', content: "We audit your entire backlink profile, disavow toxic link vectors, and submit rigorous reconsideration requests for manual actions." },
      { title: 'Re-validation Strategy', content: "We force re-crawling of the pruned and repaired architecture, pushing Google's systems to re-evaluate the domain's quality score based on the new baseline." }
    ],
    
    caseStudy: {
      tag: 'E-commerce Brand',
      headline: 'E-commerce retailer recovers from -80% HCU drop, exceeding previous peak traffic.',
      description: 'After a devastating Helpful Content Update penalty, we pruned 40,000 thin category pages, consolidated product reviews, and restored algorithmic trust within 4 months.',
      ctaText: 'Start your recovery'
    }
  },

  '/services/lead-generation': {
    h1: 'We engineer pipeline, not leads.',
    subHeadline: 'Automated outbound, real-time intent signal tracking, and CRM routing — built to consistently book qualified meetings with the accounts your sales team actually wants.',
    rotatingWords: ['generate leads.', 'scale sales.', 'capture intent.'],
    insightCategory: 'Strategy',
    ctaText: 'Book a pipeline strategy call',
    ctaLink: '/contact',
    
    stats: [
      { value: '4x', label: 'increase in booked meetings', text: 'when outbound is triggered by real-time intent signals rather than cold lists.' },
      { value: '82%', label: 'of B2B buyers', text: 'view 5-8 pieces of content from the winning vendor before booking a call.' },
      { value: '65%', label: 'lower CAC', text: 'for companies utilizing closed-loop pipeline architecture.' },
      { value: '+$12M', label: 'in closed-won revenue', text: 'attributed directly to our automated pipeline systems last year.' }
    ],
    
    approachTitle: 'Architecting predictable B2B revenue.',
    approachSubtitle: 'B2B lead generation fails when marketing optimizes for top-of-funnel volume rather than bottom-of-funnel intent. We engineer high-intent acquisition systems that integrate search visibility, conversion architecture, and CRM routing.',
    approach: [
      { icon: Search, title: 'Account and intent diagnostic.', desc: 'We audit your CRM data and traffic patterns to define the in-market account universe and design the intent infrastructure to surface those accounts in real time.' },
      { icon: Zap, title: 'Reverse-IP de-anonymization.', desc: 'We deploy reverse-IP and identity resolution to log the pages each account reads, assembling an account-level engagement record before any form is submitted.' },
      { icon: Trophy, title: 'Automated outbound sequence design.', desc: 'We design cold outreach sequences across email and LinkedIn timed against account-level intent triggers to maximize meeting conversion.' }
    ],
    
    valueCards: [
      { title: 'Intent Infrastructure', text: 'We build the systems to identify which accounts are in-market before they self-identify.' },
      { title: 'Closed-Loop Engine', text: 'We integrate Salesforce or HubSpot with your outbound platform so every meeting traces back to its originating signal.', highlight: true },
      { title: 'Multi-Touch Sequences', text: 'We run continuous A/B tests against open rate, reply rate, and meeting conversion across channels.' },
      { title: 'Pipeline Optimization', text: 'We optimize the engine continuously against the constraint that limits pipeline yield.' }
    ],
    
    executionTitle: 'From anonymous intent to closed-won revenue.',
    heroImage: '/images/lead_hero.webp',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'ICP & Account Modeling', content: 'We start by modeling your ideal customer profile against the actual intent signals available to capture them, ensuring we target accounts your sales team actually wants.' },
      { title: 'Signal Capture Integration', content: 'We deploy tracking scripts that resolve visiting IPs to specific corporate networks, feeding a live stream of enriched account signals directly into your CRM.' },
      { title: 'Outbound Orchestration', content: 'We build the routing logic and lifecycle stages required to trigger automated outreach the exact moment a target account exhibits high-intent behavior on your site.' },
      { title: 'Attribution & Yield Management', content: 'We report against the metrics that matter — qualified meetings, opportunity creation rate, pipeline value, and closed-won attribution.' }
    ],
    
    caseStudy: {
      tag: 'B2B Enterprise',
      headline: 'Logistics platform scales to $4.2M in net-new pipeline in 6 months.',
      description: 'By transitioning from broad paid media to an intent-triggered automated outbound system, the sales team booked 140+ qualified meetings with target enterprise accounts.',
      ctaText: 'Build your pipeline'
    }
  },

  '/services/web-development': {
    h1: 'We engineer websites the way engineers build products.',
    subHeadline: 'Custom React and Vite applications, native CRMs, Web3 platforms, and AI video systems — built from scratch with sub-second load times, conversion architecture, and zero template bloat.',
    rotatingWords: ['build apps.', 'engineer performance.', 'scale conversion.'],
    insightCategory: 'Technical',
    ctaText: 'Start a development project',
    ctaLink: '/contact',
    
    stats: [
      { value: '< 1s', label: 'Time to Interactive', text: 'guaranteed on all our custom React and Vite application builds.' },
      { value: '3.5x', label: 'higher conversion rates', text: 'on average for platforms engineered with bespoke conversion architecture.' },
      { value: '100', label: 'Core Web Vitals scores', text: 'across mobile and desktop, ensuring maximum algorithmic ranking eligibility.' },
      { value: '0', label: 'template bloat', text: 'Every line of code is written from scratch for your specific business logic.' }
    ],
    
    approachTitle: 'Performance architecture. Sub-second speed.',
    approachSubtitle: 'Page-builder templates throttle Core Web Vitals, organic ranking eligibility, and conversion rate. We build sites from scratch in React and Vite, with conversion architecture engineered into the page layer.',
    approach: [
      { icon: Search, title: 'Technical baseline audit.', desc: 'We benchmark the current site against rendering performance, indexation health, and conversion friction to define the technical targets the new build must meet.' },
      { icon: Zap, title: 'Architecture & stack selection.', desc: 'We design the application architecture in React and Vite for bundle size, rendering speed, and SEO compatibility with SSG/SSR models.' },
      { icon: Activity, title: 'Native integration layer.', desc: 'We build native integrations with your CRM, intent infrastructure, smart contracts, AI pipelines, and Web3 wallet connections directly into the application.' }
    ],
    
    valueCards: [
      { title: 'React & Vite Stack', text: 'Engineered for sub-second page loads and seamless, app-like user experiences.' },
      { title: 'Conversion Engineering', text: 'CTA placement, scroll behavior, and trust signals designed against documented buyer behavior.', highlight: true },
      { title: 'SEO Rendering Native', text: 'Clean HTML delivery ensuring Googlebot can crawl and index your content instantly.' },
      { title: 'Custom Systems', text: 'From native CRMs and marketplace platforms to secure Web3 integrations.' }
    ],
    
    executionTitle: 'Engineering products that win indexation and conversion.',
    heroImage: '/images/web_hero.webp',
    executionImage: '/images/web_exec.webp',
    executionSteps: [
      { title: 'System Architecture Design', content: 'We define the component hierarchy, routing strategy, and rendering model calibrated specifically to your indexation and conversion requirements.' },
      { title: 'Conversion UI/UX Development', content: 'We engineer conversion paths into the page layer from the first line of code, ensuring form architecture and trust sequencing maximize pipeline yield.' },
      { title: 'API & Database Integration', content: 'We connect marketing automation, analytics, and complex custom databases (like Supabase or PostgreSQL) directly to the application state.' },
      { title: 'Performance Hand-off', content: 'We launch a site that meets sub-second load times, clean Core Web Vitals, full schema implementation, and the rendering standards modern search engines require.' }
    ],
    
    caseStudy: {
      tag: 'Web3 Platform',
      headline: 'Crypto trading platform handles 10k+ concurrent users with zero latency.',
      description: 'We engineered a custom React application with complex smart contract integrations, delivering real-time data feeds and flawless user experience under extreme load.',
      ctaText: 'Build your platform'
    }
  },

  '/services/ppc-advertising': {
    h1: 'We engineer paid media for return on ad spend, not impressions.',
    subHeadline: 'Precision-targeted paid search, paid social, and LinkedIn B2B pipelines across Google, Microsoft, and Meta — engineered to maximize ROAS and lower customer acquisition cost.',
    rotatingWords: ['drive ROAS.', 'scale media.', 'lower CAC.'],
    insightCategory: 'Analytics',
    ctaText: 'Book a paid media diagnostic',
    ctaLink: '/contact',
    
    stats: [
      { value: '4.8x', label: 'Average ROAS across accounts', text: 'by shifting optimization targets from top-of-funnel clicks to closed-won revenue.' },
      { value: '-42%', label: 'reduction in CPA', text: 'within the first 90 days of restructuring ad account architectures.' },
      { value: '80%', label: 'of B2B ad spend is wasted', text: 'on broad targeting that fails to reach true enterprise decision-makers.' },
      { value: '100%', label: 'transparent attribution', text: 'connecting every dollar spent directly to your CRM pipeline stages.' }
    ],
    
    approachTitle: 'Scaling revenue, not vanity metrics.',
    approachSubtitle: 'Most paid media programs chase impressions and clicks while actual pipeline decays. We invert that. We engineer paid media against ROAS, qualified pipeline, and closed-won attribution.',
    approach: [
      { icon: Target, title: 'Account and intent audit.', desc: 'We audit your existing accounts and attribution model to surface where budget is being wasted on low-intent surfaces and where conversion friction suppresses ROAS.' },
      { icon: Search, title: 'Intent-based search architecture.', desc: 'We rebuild your paid search around buyer intent, segmenting campaigns by funnel stage and engineering negative keyword libraries to capture high-intent slices.' },
      { icon: Activity, title: 'LinkedIn B2B pipeline campaigns.', desc: 'We architect LinkedIn campaigns against company size, role seniority, and intent signal so paid social produces sales-qualified pipeline.' }
    ],
    
    valueCards: [
      { title: 'ROAS-Driven Execution', text: 'We optimize for return on ad spend, qualified pipeline, and closed-won attribution.' },
      { title: 'Intent-Aligned Targeting', text: 'We surface ads only to genuinely in-market buyers to maximize the value of every click.', highlight: true },
      { title: 'Continuous A/B Testing', text: 'We run statistically valid tests against creative, copy, landing experience, and offer.' },
      { title: 'Multi-Touch Attribution', text: 'We connect spend to revenue through a defensible attribution model, not last-click stats.' }
    ],
    
    executionTitle: 'Architecting profitable acquisition funnels.',
    heroImage: '/images/ppc_hero.webp',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Funnel Stage Segmentation', content: "We structure campaigns based on the buyer journey, ensuring top-of-funnel awareness campaigns transition smoothly into high-intent retargeting and conversion pipelines." },
      { title: 'Landing Experience Optimization', content: "We don't just send traffic to a homepage. We build and test dedicated landing pages with targeted copy and frictionless forms to maximize the conversion rate of paid traffic." },
      { title: 'Bid Strategy Engineering', content: "We deploy advanced automated bidding strategies (tROAS, tCPA) guided by precise offline conversion tracking fed directly from your CRM." },
      { title: 'Weekly Funnel Management', content: "We manage the funnel as a system — not a single ad — reporting against funnel-stage conversion rates rather than top-of-funnel surface metrics, reallocating spend to what produces." }
    ],
    
    caseStudy: {
      tag: 'B2B Services',
      headline: 'Professional services firm scales ROAS from 1.2x to 6.5x in 4 months.',
      description: 'By eliminating broad match waste and restructuring LinkedIn campaigns around account-based intent signals, we drastically lowered CAC and scaled profitable pipeline.',
      ctaText: 'Analyze my ad account'
    }
  },

  '/on-page-seo-los-angeles': {
    h1: 'We engineer high-converting, on-page SEO structures.',
    subHeadline: 'Topical authority modeling, schema graph injection, and speed-optimized React architectures built to convert Los Angeles organic search traffic into pipeline.',
    rotatingWords: ['build traffic.', 'optimize pages.', 'increase conversions.'],
    insightCategory: 'SEO',
    ctaText: 'Start your On-Page SEO campaign',
    ctaLink: '/contact',
    
    stats: [
      { value: '+245%', label: 'average organic traffic growth', text: 'for Los Angeles service and e-commerce brands within 6 months.' },
      { value: '100', label: 'Core Web Vitals mobile score', text: 'achieved through custom clean-code rendering structures.' },
      { value: '1.2s', label: 'average Time to Interactive', text: 'ensuring search bots crawl and index your layout instantly.' },
      { value: '+35%', label: 'average lift in conversion rate', text: 'by aligning on-page content directly with searcher intent.' }
    ],
    
    approachTitle: 'Semantic entity modeling. Structural precision.',
    approachSubtitle: 'On-page SEO is no longer about keyword density; it is about semantic structure, performance, and conversion design. We build clean, search-ready templates that convert.',
    approach: [
      { icon: Search, title: 'Topical Entity Modeling.', desc: 'We audit and map your keywords as semantic entities, structuring heading hierarchies to cover topics exhaustively.' },
      { icon: Activity, title: 'Speed & Structural Optimization.', desc: 'We build clean-code React components, eliminating page-builder script bloat for sub-second rendering.' },
      { icon: Target, title: 'Conversion Path Integration.', desc: 'We align CTA placement, scroll anchors, and layout flows directly with the intent of incoming queries.' }
    ],
    
    valueCards: [
      { title: 'Semantic Schema Injection', text: 'We define page context explicitly using rich JSON-LD Organization, Product, and Service schemas.' },
      { title: 'Heading & Link Architecture', text: 'We construct logical internal linking graphs that distribute authority to high-value service hubs.', highlight: true },
      { title: 'User Experience Alignment', text: 'We eliminate layout shifts, optimize images to WebP, and ensure perfect mobile performance.' },
      { title: 'Continuous Intent Mapping', text: 'We review search query reports weekly to refine headings and content as query habits drift.' }
    ],
    
    executionTitle: 'Surgically optimizing every layout for indexing and conversion.',
    heroImage: '/images/onpage_hero.webp',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Semantic Audit', content: 'We map your existing pages to Google\'s semantic index to identify keyword cannibalization, content gaps, and internal link blocks.' },
      { title: 'Structural Coding', content: 'We optimize headings, metadata, image tags, and schema. We write custom, lightweight JSX elements instead of relying on heavy plugins.' },
      { title: 'Internal Link Graphing', content: 'We configure internal anchor-text distribution, ensuring page-rank flows to your money pages while pruning low-value redirects.' },
      { title: 'Attribution & Analytics', content: 'We set up real-time Search Console monitoring and pipeline tracking to connect organic landing page impressions directly to CRM pipeline.' }
    ],
    
    caseStudy: {
      tag: 'LA Service Agency',
      headline: 'Los Angeles professional service firm scales organic leads by +380% in 5 months.',
      description: 'By correcting internal linking loops, injecting advanced Service schemas, and rewriting key landing pages to match B2B user intent, we restored search prominence in LA\'s most competitive sector.',
      ctaText: 'Re-engineer my on-page SEO'
    },
    
    faqTitle: 'Frequently asked questions about Los Angeles on-page SEO.',
    faqs: [
      { question: 'How is on-page SEO different for Los Angeles businesses?', answer: 'The Los Angeles market is highly competitive and localized. On-page SEO in LA requires combining traditional content optimization with localized entity schemas, naming conventions, and structural signals to establish geographic relevance without keyword stuffing.' },
      { question: 'Why does website speed affect on-page rankings?', answer: 'Google\'s Core Web Vitals are direct ranking signals. If a page is slow to render (high LCP or TTI), search engines demote the ranking in favor of faster, responsive layouts to ensure a positive user experience.' },
      { question: 'What is semantic entity optimization?', answer: 'Semantic SEO focuses on covering topics exhaustively rather than repeating keywords. It involves structuring headings and body content around related concepts (entities) that Google\'s algorithm associates with the core query.' },
      { question: 'How do you measure the success of an on-page SEO campaign?', answer: 'We track improvements in organic impressions, keyword rank positioning for core service queries, click-through rates, and bottom-of-funnel conversions (leads and meetings booked).' }
    ]
  }
};

const SolutionPage: React.FC<{ path: string }> = ({ path }) => {
  // Use a fallback to SEO data if path doesn't perfectly match
  const data = SOLUTIONS_DATA[path] || SOLUTIONS_DATA['/services/seo'];
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    // Scroll animations
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.reveal-up');
      elements.forEach((el: any) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    window.scrollTo({ top: 0, behavior: 'instant' });

    const baseTitles: Record<string, string> = {
      '/services/seo': 'Technical & Forensic SEO Services in Los Angeles | Gobiya',
      '/services/geo-optimization': 'Generative Engine Optimization (GEO) Services | Gobiya',
      '/google-penalty-recovery': 'Google Penalty Recovery & Traffic Restoration Services | Gobiya',
      '/services/lead-generation': 'B2B Pipeline Architecture & Lead Generation Services | Gobiya',
      '/services/web-development': 'Custom React & Vite Web Development for Performance Brands | Gobiya',
      '/services/ppc-advertising': 'ROAS-Driven PPC & Paid Media Management | Gobiya',
      '/on-page-seo-los-angeles': 'On-Page SEO Services in Los Angeles | Gobiya',
    };
    if (baseTitles[path]) {
      document.title = baseTitles[path];
    }

    return () => ctx.revert();
  }, [path]);

  if (!data) return <div className="text-white text-center py-40">Solution not found.</div>;

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#F26522]/30 selection:text-white page-wrapper">
      
      {/* Nav */}
      <Header theme="dark" />

      {/* ── 1. HERO SECTION (Dark) ── */}
      <section className="relative w-full pt-32 lg:pt-40 pb-20 bg-[#050505] overflow-hidden flex flex-col justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
           {/* Abstract tech illustration or image placeholder */}
           <img src={data.heroImage || "/images/geo_hero.webp"} alt="AI Technology Background" className="w-full h-full object-cover mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 mb-16 lg:mb-24">
          <div className="max-w-[1000px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
              <Search className="w-4 h-4 text-[#F26522]" />
              <span className="text-[13px] sm:text-[14px] text-gray-300 tracking-wide uppercase font-medium">
                Gobiya Services {'>'} {data.insightCategory}
              </span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white mb-6 font-display">
              {data.h1}
            </h1>
            <p className="text-[17px] sm:text-[20px] text-gray-400 max-w-[800px] leading-relaxed mb-10">
              {data.subHeadline}
            </p>
            
            <a href={data.ctaLink} className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300">
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-4">
                <span className="text-[14px] sm:text-[15px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
                <span className="text-[14px] sm:text-[15px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white flex items-center justify-center rounded-sm">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
          </div>
        </div>
      </section>
      
      {/* ── STATS BAR (Orange) ── */}
      <div className="flex flex-col md:flex-row w-full bg-[#e05a1a]">
        {data.stats.map((stat, idx) => (
          <div key={idx} className={`flex-1 p-8 lg:p-12 ${idx % 2 === 0 ? 'bg-[#F26522]' : 'bg-[#e05a1a]'} text-white`}>
            <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tighter leading-none mb-3 font-display">
              {stat.value}
            </div>
            <div className="text-[15px] lg:text-[16px] leading-tight font-medium">
              {stat.label} <span className="font-normal opacity-90">{stat.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. APPROACH SECTION (Light, 3 Columns) ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto text-center reveal-up">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">
            AI Search Approach
          </h3>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium text-[#111111] mb-6 leading-tight max-w-4xl mx-auto font-display">
            {data.approachTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-24">
            {data.approachSubtitle}
          </p>

          {/* 3 Column Grid with connecting line */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {/* Horizontal Line Desktop */}
            <div className="absolute top-[40px] left-[16%] right-[16%] h-px bg-gray-300 hidden md:block z-0" />
            
            {data.approach.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#F26522] flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/20 ring-8 ring-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-medium text-[#111111] mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed px-4">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. VALUE CARDS (Light) ── */}
      <section className="pb-24 lg:pb-32 px-5 sm:px-8 lg:px-12 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto reveal-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white shadow-xl shadow-gray-200/50">
            {data.valueCards.map((card, idx) => (
              <div 
                key={idx} 
                className={`p-10 lg:p-12 flex flex-col justify-center min-h-[300px] border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 transition-colors duration-500
                  ${card.highlight ? 'bg-[#F26522] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
              >
                {card.highlight ? (
                  <ChevronRight size={32} className="text-white mb-6 opacity-80" strokeWidth={1.5} />
                ) : (
                  <ChevronRight size={32} className="text-[#F26522] mb-6" strokeWidth={1.5} />
                )}
                <h3 className={`text-2xl font-medium mb-4 ${card.highlight ? 'text-white' : 'text-[#111111]'}`}>
                  {card.title}
                </h3>
                <p className={`leading-relaxed ${card.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. EXECUTION ACCORDION (White BG) ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left side Image Mockup */}
            <div className="relative reveal-up hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F26522]/20 to-transparent transform -translate-x-4 translate-y-4 rounded-xl -z-10" />
              <img 
                src={data.executionImage} 
                alt="Strategy Execution Dashboard" 
                className="w-full rounded-xl shadow-2xl shadow-gray-200 object-cover aspect-[4/3]"
              />
              {/* Floating Badge */}
              <div className="absolute -top-6 -left-6 bg-[#F26522] text-white p-6 shadow-xl rounded-br-3xl">
                <div className="text-2xl font-bold font-display tracking-tight">Profound</div>
                <div className="text-sm font-medium opacity-90">Reporting platform</div>
              </div>
            </div>

            {/* Right side Accordion */}
            <div className="reveal-up">
              <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">
                Strategy & Execution
              </h3>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-medium text-[#111111] mb-12 leading-[1.1] font-display">
                {data.executionTitle}
              </h2>
              
              <div className="space-y-2 border-t border-gray-200">
                {data.executionSteps.map((step, idx) => {
                  const isOpen = activeStep === idx;
                  return (
                    <div key={idx} className="border-b border-gray-200">
                      <button 
                        onClick={() => setActiveStep(isOpen ? -1 : idx)}
                        className="w-full py-6 flex items-center justify-between text-left group"
                      >
                        <span className={`text-xl lg:text-2xl font-medium transition-colors ${isOpen ? 'text-[#111111]' : 'text-gray-900 group-hover:text-[#F26522]'}`}>
                          <span className="text-[#F26522] mr-4 inline-block w-4">{isOpen ? '-' : '+'}</span>
                          {step.title}
                        </span>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-lg text-gray-600 leading-relaxed pl-8 border-l-2 border-[#F26522]/20 ml-2">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. CASE STUDY (Dark Blue/Black) ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#0A1118] relative overflow-hidden text-center lg:text-left">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
          <img src={data.caseStudy.backgroundImage || "/images/case_study_bg.webp"} alt="Tech BG" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-10 reveal-up">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium text-white mb-8 leading-[1.15] font-display">
              {data.caseStudy.headline}
            </h2>
            <div className="w-16 h-1 bg-[#F26522] mb-8 mx-auto lg:mx-0" />
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 font-light">
              <strong className="text-[#F26522] font-semibold">{data.caseStudy.tag}:</strong> {data.caseStudy.description}
            </p>
            <a href="/company/success-stories" className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#e05a1a] text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors duration-300">
              {data.caseStudy.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERS STRIP (White) ── */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-10 text-center lg:text-left">
            Partners & Integrations
          </h3>
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-12 lg:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            {/* Logos represented by text styling for now, mimicking the image */}
            <div className="text-2xl font-bold font-display flex items-center gap-2 text-[#111111]">
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-xs">AI</div>
              ChatGPT
            </div>
            <div className="text-2xl font-bold font-display flex items-center gap-2 text-[#111111]">
              <span className="text-[#F26522]">*</span> Perplexity
            </div>
            <div className="text-2xl font-bold font-display flex items-center gap-2 text-[#111111]">
              <span className="text-purple-600">✧</span> Claude
            </div>
            <div className="text-2xl font-bold font-display text-[#111111]">
              SEMRUSH
            </div>
            <div className="text-2xl font-bold font-display text-[#111111]">
              Gemini
            </div>
            <div className="text-2xl font-bold font-display text-[#111111]">
              Profound
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. LEARNING CENTER (White) ── */}
      {data.learningCenterTitle && (
        <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto reveal-up">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light text-[#111111] mb-6 leading-tight">
                {data.learningCenterTitle}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed font-light">
                {data.learningCenterSubtitle}
              </p>
            </div>
            
            {/* Tabs (Static Mockup) */}
            <div className="flex justify-center items-center gap-8 md:gap-16 mb-16">
              <div className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="w-20 h-20 border border-[#F26522] text-[#F26522] flex items-center justify-center transition-all group-hover:shadow-lg">
                  <Play size={32} strokeWidth={1} />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-[#F26522]">Webinars</span>
              </div>
              <div className="flex flex-col items-center gap-4 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 border border-gray-300 text-gray-500 flex items-center justify-center">
                  <Play size={32} strokeWidth={1} />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-gray-500">Shorts</span>
              </div>
              <div className="flex flex-col items-center gap-4 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 border border-gray-300 text-gray-500 flex items-center justify-center">
                  <Play size={32} strokeWidth={1} />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-gray-500">Blog</span>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {data.videos?.map((vid, idx) => (
                <div key={idx} className="group relative aspect-video bg-[#111111] overflow-hidden cursor-pointer shadow-lg rounded-sm">
                  <video 
                    src={vid.src} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500"
                    loop 
                    muted 
                    playsInline
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0; }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md overflow-hidden flex items-center justify-center text-xs font-bold text-white border border-white/30">
                        {vid.author.charAt(0)}
                      </div>
                      <div className="text-white text-sm font-medium">{vid.author}</div>
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-white font-display text-xl leading-tight font-medium max-w-[85%]">{vid.title}</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none scale-90 group-hover:scale-100">
                    <div className="bg-[#F26522] text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl shadow-orange-500/20">
                      <Play size={16} fill="currentColor" />
                      <span className="text-sm font-bold uppercase tracking-wider">Watch on Youtube</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. FAQs (Dark) ── */}
      {data.faqTitle && data.faqs && (
        <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#0A0A0A] border-t border-white/10">
          <div className="max-w-4xl mx-auto reveal-up">
            <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-8 text-center">
              FAQ'S
            </h3>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium text-white mb-16 text-center leading-tight">
              {data.faqTitle}
            </h2>
            <div className="w-16 h-[2px] bg-[#F26522] mx-auto mb-16" />
            
            <div className="space-y-4">
              {data.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border-b border-white/10 bg-[#111111] transition-colors hover:bg-[#1a1a1a]">
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full py-6 px-6 lg:px-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-lg lg:text-xl font-medium transition-colors pr-8 ${isOpen ? 'text-[#F26522]' : 'text-gray-300 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 text-[#F26522] border border-[#F26522]/30 rounded-full p-1 group-hover:border-[#F26522] transition-colors">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out px-6 lg:px-8 ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. BOTTOM CTA STRIP (Orange) ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#F26522]">
        <div className="max-w-[1440px] mx-auto text-center reveal-up">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight font-display">
            Ready to unlock growth? <a href="/contact" className="underline decoration-2 underline-offset-8 hover:text-black hover:decoration-black transition-colors duration-300">Let's talk!</a>
          </h2>
        </div>
      </section>

      {/* SECTION: LATEST INSIGHTS */}
      <div data-logo-dark className="relative bg-[#EFEFEF]">
        <InsightsSlider limit={3} filterCategory={data.insightCategory} currentPath={path} />
      </div>

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  );
};

export default SolutionPage;
