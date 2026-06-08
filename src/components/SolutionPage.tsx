import React, { useEffect, useState } from 'react';
import { ArrowRight, Search, Activity, Trophy, ChevronDown, ChevronRight, BarChart, Target, Zap, Play, Plus, Minus, Code, Cpu, Database, Network } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import RotatingText from './RotatingText';
import InsightsSlider from './InsightsSlider';
import ParallaxMedia from './ParallaxMedia';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { trackCTA } from '../lib/analytics';
import RotatingAILogos from './RotatingAILogos';

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
  valueCards: { title: string; text: string; backText?: string; highlight?: boolean }[];
  
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
  '/capabilities/web-development': {
    h1: 'React web development — custom high-performance websites built to rank',
    subHeadline: 'We specialize in React web development, replacing slow page-builders with custom, hand-coded React and Next.js websites built to convert visitors and rank natively.',
    rotatingWords: ['sub-second speed.', 'React & Next.js.', '100/100 Core Web Vitals.'],
    insightCategory: 'Development',
    ctaText: 'Start a custom build',
    ctaLink: '/book',
    stats: [
      { value: '100/100', label: 'Core Web Vitals', text: 'achieved natively across all of our builds, ensuring maximum algorithmic ranking advantage.' },
      { value: 'Sub-1s', label: 'average page-load time', text: 'removing load-based bounce rates and capturing high-intent prospects before they drift.' },
      { value: '0', label: 'page builders or templates used', text: 'pure custom JavaScript/CSS codebase tailored entirely to your brand hierarchy and conversion paths.' },
      { value: '3x', label: 'increase in inbound inquiries', text: 'on average for brands migrating from bloated WordPress/template stacks to Gobiya custom engines.' }
    ],
    approachTitle: 'Pure engineering. Sub-second performance.',
    approachSubtitle: 'Page-builders and generalist dev shops ship JavaScript-bloated SPAs that crawlers can\'t render, resulting in empty indexation and lost ranks. We build search-ready, high-speed custom codebases.',
    approach: [
      { icon: Code, title: 'Bespoke React, Next.js & Vite Stack', desc: 'We hand-code every component in modern React and Next.js, bundling via Vite for minimal footprint and maximum interface responsiveness.' },
      { icon: Zap, title: 'SSR Prerendering Pipelines', desc: 'We deploy server-side rendering (SSR) and static generation strategies so search crawlers and AI bots read complete HTML instantly.' },
      { icon: Target, title: 'Conversion UI Engineering', desc: 'CTA paths, form architecture, and trust signals are coded directly into the core layout for maximum buyer response.' }
    ],
    valueCards: [
      { title: 'Semantic HTML5 Architecture', text: 'We write clean, semantic markup that maps your information architecture perfectly to search engine bots.', backText: 'Our engineering team uses native HTML5 tags and precise DOM hierarchy so Googlebot can instantly understand your page structure without relying on client-side rendering.' },
      { title: 'Core Web Vitals Dominance', text: 'Every build passes Google speed audits out of the box, maximizing search eligibility and lowering PPC costs.', backText: 'By eliminating bulky frameworks and focusing on raw Vite/React performance, we consistently hit 95-100 scores across LCP, FID, and CLS metrics.' },
      { title: 'Dynamic Metadata Integration', text: 'From Open Graph tags to JSON-LD schema, we engineer metadata directly into the codebase for maximum rich snippet eligibility.', backText: 'We dynamically inject schema graphs and meta descriptors at the server level, ensuring rich results for products, articles, and local businesses.' },
      { title: 'Conversion-Driven UX', text: 'We integrate CRO principles and heatmap data to design intuitive, frictionless paths that convert traffic into pipeline.', backText: 'We use scroll-depth analysis and click tracking to continually refine CTA placement, reducing bounce rates and maximizing high-intent lead capture.' }
    ],
    executionTitle: 'How we engineer your custom React and Next.js platforms.',
    heroImage: '/images/web_hero.png',
    executionImage: '/images/web_exec.webp',
    executionSteps: [
      { title: 'Architecture & Interface Design', content: 'We map your user flow and design custom interface components optimized specifically for your target audience, conversion paths, and device profiles.' },
      { title: 'Custom React & Next.js Component Coding', content: 'We build your website from scratch, engineering responsive custom CSS layout structures and modular component trees with zero template code.' },
      { title: 'Data Layer & CRM Connection', content: 'We wire up API gateways, database backends, and codebase-level CRM components directly into the application state for database operations.' },
      { title: 'Prerendering & Performance Optimization', content: 'We build the static and SSR pathways to guarantee sub-second loads, compile sitemaps, audit core web vitals, and hand off an optimized product.' }
    ],
    caseStudy: {
      tag: 'Web Development & Local SEO',
      headline: 'SmileCenter Dentistry — 5x Patient Inquiries Across SoCal.',
      description: 'By developing lightning-fast React subpages and integrating correct LocalBusiness schemas natively into the codebase, we grew patient appointments and phone calls fivefold.',
      backgroundImage: '/images/smilecenter-office.webp',
      ctaText: 'View the case study'
    },
    faqTitle: 'Web Development & Technical SEO FAQs',
    faqs: [
      { question: 'Why should I choose a custom React & Next.js site over a template builder like WordPress?', answer: 'Traditional CMS platforms like WordPress rely on heavy plugins and clunky page builders, leading to bloated code and poor Core Web Vitals. A custom React/Next.js/Vite build is lightweight, highly secure, infinitely scalable, and engineered to load in under a second, directly impacting your conversion rates and search rankings.' },
      { question: 'Can you provide examples of how you handle metadata in your builds?', answer: 'Yes. Unlike standard single-page applications where metadata is often missed by crawlers, we utilize Server-Side Rendering (SSR). This means every page delivers fully formed HTML containing dynamic <title>, <meta name="description">, Open Graph tags, and complex nested JSON-LD schema graphs directly to Googlebot before any JavaScript executes.' },
      { question: 'What is Conversion Rate Optimization (CRO) in web design?', answer: 'CRO is the systematic process of increasing the percentage of website visitors who take a desired action (like booking a call or filling out a form). We design our interfaces using UX best practices, user flow analysis, and clear call-to-actions to eliminate friction and maximize lead generation.' },
      { question: 'Do you integrate existing CRMs into the new website?', answer: 'Absolutely. We build custom API gateways and secure webhooks directly into the application state, allowing your website to seamlessly sync data with platforms like Salesforce, HubSpot, or even bespoke codebase-level databases without relying on fragile third-party plugins.' }
    ]
  },

  '/capabilities/native-crm': {
    h1: 'Custom CRM website integration — own your data and sales pipeline',
    subHeadline: 'Stop paying for expensive CRM subscriptions. We engineer custom CRM website integrations directly into your codebase, giving you complete data control.',
    rotatingWords: ['own your data.', 'zero subscription fees.', 'custom pipelines.'],
    insightCategory: 'Systems',
    ctaText: 'Build your custom CRM',
    ctaLink: '/book',
    stats: [
      { value: '$0', label: 'in ongoing CRM SaaS fees', text: 'by hosting your customer pipeline and user data natively within your own database structure.' },
      { value: '100%', label: 'complete data ownership', text: 'keeping sensitive customer information and lead logs inside your secure infrastructure, not on shared cloud platforms.' },
      { value: 'Instant', label: 'lead routing speeds', text: 'routing prospects from form submission directly to sales notification in milliseconds with zero Zapier delay.' },
      { value: '10x', label: 'greater pipeline visibility', text: 'customized database views tailored exactly to your sales pipeline steps and business processes.' }
    ],
    approachTitle: 'Lead management at the code layer.',
    approachSubtitle: 'Integrating heavy third-party CRMs bloats your site and creates security leaks. We build lightweight, secure database routes directly into your React codebase.',
    approach: [
      { icon: Database, title: 'Codebase-Level CRM Routing', desc: 'We program lead and user data flows directly into your server actions and state handlers, cutting out third-party script lag.' },
      { icon: Network, title: 'Secure Database Architecture', desc: 'We utilize modern serverless databases (like Supabase or PostgreSQL) with custom row-level security policies to store and protect your data.' },
      { icon: Target, title: 'Custom Sales Pipeline Views', desc: 'We design simple, high-speed admin dashboards tailored precisely to your team\'s workflow, allowing you to track leads with ease.' }
    ],
    valueCards: [
      { title: 'Bespoke Database Schema', text: 'We structure tables and columns around your business, storing only what you need to track and optimize.', backText: 'Stop forcing your sales process into rigid CRM templates. We define relational models specifically tailored to your unique pipelines and lifecycle stages.' },
      { title: 'Zero Integration Leak', text: 'No API keys exposed on the frontend, no broken webhooks, and no third-party downtime to drop your leads.', backText: 'Since the CRM is native to your application layer, data moves instantly from form submission to secure database without relying on fragile Zapier connections.' },
      { title: 'Self-Hosted Control', text: 'You own the database. If you scale, your CRM scales with you at standard cloud server costs.', backText: 'Say goodbye to per-seat licensing fees. You maintain 100% ownership of the data infrastructure, hosted securely in your own scalable environment.' },
      { title: 'AI Prospect Scraper', text: 'Included AI prospect scraper gathers NAP data and creates automated drip campaigns.', backText: 'Our native CRM features an AI-powered engine that scrapes company leads\' NAP and sets up customized drip email sequences automatically.' }
    ],
    executionTitle: 'Building your proprietary data engine.',
    heroImage: '/images/lead_hero.png',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Workflow & Pipeline Mapping', content: 'We map your current sales lifecycle, contact steps, and internal workflows to define your custom database fields and tables.' },
      { title: 'Database & Security Provisioning', content: 'We set up your serverless database and configure strict security credentials to protect your company and user data.' },
      { title: 'Codebase Form & State Integration', content: 'We code custom forms and secure API handlers directly into your React application to manage data flows without third-party scripts.' },
      { title: 'Admin Dashboard Implementation', content: 'We build an ultra-fast internal admin console that lets your sales reps manage pipelines, log notes, and update deals on autopilot.' }
    ],
    caseStudy: {
      tag: 'Custom Integration',
      headline: 'B2B Enterprise Logistics platform builds proprietary $4.2M sales pipeline.',
      description: 'By migrating from a bloated HubSpot/Salesforce setup to a custom, codebase-integrated lead database with automated internal alerts, the team scaled to millions in pipeline on $0 software fees.',
      ctaText: 'Request CRM demo'
    }
  },

  '/capabilities/ai-prospect-scraper': {
    h1: 'AI prospect scraper — automate outreach and scale B2B leads',
    subHeadline: 'We build a custom AI prospect scraper directly into our native CRM database, extracting target contact details and automating personalized outreach sequences.',
    rotatingWords: ['scrape prospect data.', 'automate drip emails.', 'scale outbound.'],
    insightCategory: 'Systems',
    ctaText: 'Explore AI Prospecting',
    ctaLink: '/book',
    stats: [
      { value: '10x', label: 'faster lead generation', text: 'compared to manual data entry and generic list building, driving immediate pipeline growth.' },
      { value: '100%', label: 'customized campaigns', text: 'every drip email is tailored to the scraped prospect data, ensuring high open and reply rates.' },
      { value: 'Zero', label: 'third-party scraping fees', text: 'fully integrated into your Native CRM so you do not pay per-lead or monthly subscription costs.' },
      { value: '24/7', label: 'automated outreach', text: 'continuously identifying and engaging high-value targets while your team focuses on closing deals.' }
    ],
    approachTitle: 'Automate your outbound with intelligent data capture.',
    approachSubtitle: 'Stop relying on generic email blasts and outdated lead lists. Our integrated AI scraper captures fresh NAP data and crafts relevant messages on the fly.',
    approach: [
      { icon: Search, title: 'Intelligent NAP Extraction', desc: 'The AI engine autonomously scrapes Name, Address, and Phone data for your target accounts across the web.' },
      { icon: Target, title: 'Hyper-Personalized Content', desc: 'Each prospect receives a custom drip campaign written specifically for their business context and pain points.' },
      { icon: Network, title: 'Native CRM Integration', desc: 'All scraped data and email engagements flow seamlessly into your codebase-level CRM with zero lag.' }
    ],
    valueCards: [
      { title: 'Instant Lead Enrichment', text: 'Automatically turn raw URLs or company names into fully populated CRM profiles.', backText: 'Our AI scraper does the heavy lifting, extracting decision-maker contact info and company details directly into your database.' },
      { title: 'Smart Drip Sequences', text: 'Deploy multi-step email campaigns that adapt to prospect engagement.', backText: 'The AI crafts follow-up emails based on initial prospect data and engagement metrics, significantly increasing your reply rates.' },
      { title: 'Seamless Workflow', text: 'From scraping to outreach to booked meetings, everything happens in one place.', backText: 'No more bouncing between external scraping tools, email sequence software, and your CRM. It\'s an all-in-one pipeline engine.' },
      { title: 'Cost-Effective Scaling', text: 'Generate more leads without increasing your marketing software budget.', backText: 'Since the AI scraper is included natively with our CRM, you avoid the exorbitant fees charged by standalone B2B data providers.' }
    ],
    executionTitle: 'How we engineer your automated outbound engine.',
    heroImage: '/images/lead_hero.png',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Define Target ICP', content: 'We work with you to map out your Ideal Customer Profile and set the parameters for the AI scraper to hunt.' },
      { title: 'Configure Scraping Engine', content: 'We integrate the AI extraction tools into your Native CRM to begin pulling verified NAP data for target accounts.' },
      { title: 'Design Drip Campaigns', content: 'We build the AI prompt templates that automatically generate personalized cold outreach and follow-up sequences.' },
      { title: 'Launch & Optimize', content: 'We turn on the pipeline and continually refine the scraping parameters and email copy based on conversion data.' }
    ],
    caseStudy: {
      tag: 'AI Outbound',
      headline: 'B2B Logistics firm scales to 40+ booked meetings per month.',
      description: 'By deploying the AI Prospect Scraper alongside their Native CRM, they eliminated $3,000/mo in ZoomInfo and outreach software costs while tripling their demo volume.',
      ctaText: 'See how it works'
    }
  },

  '/capabilities/seo-discoverability': {
    h1: 'Technical SEO for React websites — crawl, index, and rank natively',
    subHeadline: 'We build technical SEO for React websites into the codebase. Ensure search engines and AI crawlers can fetch, index, and cite your pages natively by default.',
    rotatingWords: ['eligible by design.', 'crawler-friendly React/Next.js.', 'AI overview readiness.'],
    insightCategory: 'SEO & GEO',
    ctaText: 'Build a search-ready site',
    ctaLink: '/book',
    stats: [
      { value: '100%', label: 'indexation eligibility', text: 'ensuring search crawlers and AI bots receive fully-rendered semantic HTML, resolving blank-page React/Next.js indexing errors.' },
      { value: 'Sub-Second', label: 'time-to-first-byte', text: 'enabling Googlebot to crawl more pages per session and increasing your overall crawl budget.' },
      { value: '70-90%', label: 'bias toward structured content', text: 'shown by AI search engines, heavily favoring clear, semantic layouts and schema markup over generic text.' },
      { value: '0', label: 'keyword-stuffing spam', text: 'focusing instead on real information architecture, semantic relationships, and clean code that ranks.' }
    ],
    approachTitle: 'Search readiness is a product of correct engineering.',
    approachSubtitle: 'Traditional SEO agencies sell keyword optimization, but if your site\'s codebase is slow, bloated, or hides content behind client-side rendering, you will stay invisible. We build indexable sites.',
    approach: [
      { icon: Search, title: 'Semantic Entity Schema', desc: 'We inject clean, nested JSON-LD schema graphs to describe your organization and offerings, linking your brand directly to verified entity nodes.' },
      { icon: Activity, title: 'Crawler & Bot Optimization', desc: 'We configure robots.txt and sitemaps specifically to allow crawler agents (Googlebot, GPTBot, ClaudeBot) to index every asset.' },
      { icon: Target, title: 'Information Architecture', desc: 'We structure your navigation and internal link paths to optimize link equity flow, ensuring crawlers find your deep content hubs.' }
    ],
    valueCards: [
      { title: 'Server-Rendered HTML', text: 'Bots receive fully rendered pages instantly, resolving client-side rendering errors that suppress React/Next.js apps.', backText: 'We utilize advanced SSR and static generation to serve pre-compiled HTML, completely eliminating the "JavaScript SEO penalty" inherent in single-page apps.' },
      { title: 'Advanced Schema Graphs', text: 'We link your brand, services, and articles to Wikipedia/Wikidata entity databases to strengthen your entity rank.', backText: 'Our JSON-LD strategies go beyond basic markup. We build nested entity graphs that explicitly define semantic relationships for AI engines like ChatGPT.' },
      { title: 'AI Search Readiness', text: 'We format comparisons, specifications, and FAQ blocks to match LLM extraction habits for ChatGPT and Gemini.', backText: 'By structuring content with clear hierarchical density, we optimize your site for zero-click generative summaries and AI Overview placements.' },
      { title: 'Index Health Monitoring', text: 'Every build is tested against search engine render pipelines to guarantee clean indexation and zero soft-404s.', backText: 'We actively monitor server log files and Google Search Console data to ensure search bots are efficiently crawling and processing your core URLs.' }
    ],
    executionTitle: 'Our engineering path to indexing and discovery.',
    heroImage: '/images/seo_hero.png',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Information & Entity Architecture Mapping', content: 'We design your page hierarchy and directory paths to reflect the semantic structure of your industry, preventing keyword cannibalization.' },
      { title: 'Server-Side Rendering Configuration', content: 'We set up SSR pipelines so that every page delivers complete, crawler-friendly HTML markup to search engine and AI crawlers.' },
      { title: 'JSON-LD Entity Graph Injection', content: 'We write and deploy custom nested schema profiles, structuring your local, organization, and service details.' },
      { title: 'Search Console & Bot Verification', content: 'We submit clean XML sitemaps, verify indexing status in Search Console, and test bot accessibility to confirm crawl readiness.' }
    ],
    caseStudy: {
      tag: 'Local SEO & GEO',
      headline: 'SmileCenter Dentistry — 5x Patient Inquiries Across SoCal.',
      description: 'By correcting local crawl bloat, deploying dedicated fast subpages, and integrating correct LocalBusiness schemas, we grew patient appointments and phone calls fivefold.',
      backgroundImage: '/images/smilecenter-office.webp',
      ctaText: 'View the case study'
    }
  },

  '/capabilities/blockchain-web3-development': {
    h1: 'Blockchain Web3 development — secure smart contracts and dApps',
    subHeadline: 'We provide custom blockchain Web3 development, engineering secure smart contracts and dApps directly into your React web applications.',
    rotatingWords: ['smart contracts.', 'dApp interfaces.', 'on-chain security.'],
    insightCategory: 'Web3',
    ctaText: 'Start a Web3 project',
    ctaLink: '/book',
    stats: [
      { value: 'Audited', label: 'smart contract security', text: 'ensuring your on-chain protocols, token transfers, and user interactions are safe from common vulnerabilities.' },
      { value: 'Sub-Second', label: 'wallet connection times', text: 'integrating lightweight wallet connectors for a seamless, frictionless Web3 user experience.' },
      { value: '100%', label: 'decentralized auth control', text: 'giving your users complete control over their profiles and transactions through secure wallet sign-in.' },
      { value: 'Multi', label: 'chain compatibility', text: 'supporting Ethereum, Solana, and EVM-compatible layer-2 chains based on your project requirements.' }
    ],
    approachTitle: 'Decentralized features. Clean execution.',
    approachSubtitle: 'Web3 applications need a fast, secure bridge between the blockchain state and the user interface. We build lightweight React interfaces that connect directly to smart contract nodes.',
    approach: [
      { icon: Cpu, title: 'Smart Contract Engineering', desc: 'We write clean, secure Solidity or Rust smart contracts calibrated to execute your token transactions or protocol logic safely.' },
      { icon: Network, title: 'dApp Interface Design', desc: 'We integrate wallet connections (like MetaMask, WalletConnect, Phantom) and transaction listeners directly into the React state.' },
      { icon: Target, title: 'On-Chain Ledger Integrations', desc: 'We build custom APIs and event listeners to index and render on-chain transactions on your site in real time.' }
    ],
    valueCards: [
      { title: 'Audited Smart Contracts', text: 'We follow industry-standard security patterns to protect contracts against reentrancy and access exploits.', backText: 'Our smart contract developers employ rigorous unit testing, fuzzing, and static analysis to eliminate vulnerabilities before mainnet deployment.' },
      { title: 'Frictionless Web3 UX', text: 'Wallet connection, signing, and transaction tracking are designed to feel as fast as a Web2 app.', backText: 'We integrate advanced React hooks for seamless multi-wallet support, managing network switching and transaction states natively in the UI.' },
      { title: 'Decentralized Database Sync', text: 'We synchronize blockchain events with standard serverless databases for high-speed indexing and searching.', backText: 'Using custom subgraphs and event listeners, we mirror on-chain data to off-chain SQL databases, providing instant data retrieval without RPC limits.' },
      { title: 'On-Chain Auth Solutions', text: 'Sign-in with Ethereum/Solana to authenticate users securely without passwords or emails.', backText: 'We implement SIWE (Sign-In with Ethereum) protocols, verifying wallet signatures cryptographically on the backend to issue secure session tokens.' }
    ],
    executionTitle: 'Our engineering path to Web3 integration.',
    heroImage: '/images/geo_hero.png',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Smart Contract Architecture & Design', content: 'We map out your token economics, contract logic, and security invariants to draft your smart contract architecture.' },
      { title: 'Contract Coding & Local Testing', content: 'We write the contract code in Solidity or Rust, running extensive unit tests and security fuzzing in local environments.' },
      { title: 'React Wallet & ABI Integration', content: 'We integrate wallet login features and transaction hooks into your React application using libraries like wagmi or ethers.js.' },
      { title: 'Testnet & Mainnet Deployment', content: 'We deploy the contracts to blockchain testnets for validation before pushing the final versions to mainnet and verifying the code.' }
    ],
    caseStudy: {
      tag: 'Web3 SaaS',
      headline: 'DeFi Analytics Platform captures 85K active wallet connections in 90 days.',
      description: 'By building a lightning-fast React interface with decentralized wallet authentication and native smart contract transaction listeners, we created a seamless Web3 onboarding funnel.',
      ctaText: 'Request Web3 consultation'
    }
  }
};

const SolutionPage: React.FC<{ path: string }> = ({ path }) => {
  // Use a fallback to SEO data if path doesn't perfectly match
  const data = SOLUTIONS_DATA[path] || SOLUTIONS_DATA['/capabilities/web-development'];
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
      '/capabilities/web-development': 'React & Vite Web Development — Fast Custom Sites | gobiya',
      '/capabilities/native-crm': 'Custom CRM Built Into Your Website | gobiya',
      '/capabilities/seo-discoverability': 'Technical SEO & Indexing for React Sites | gobiya',
      '/capabilities/blockchain-web3-development': 'Blockchain & Web3 Development — Smart Contracts, dApps | gobiya',
      '/capabilities/ai-prospect-scraper': 'AI Prospect Scraper & Drip Campaigns | gobiya',
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
           <ParallaxMedia type="image" src={data.heroImage || "/images/geo_hero.png"} alt="AI Technology Background" className="w-full h-full mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 mb-16 lg:mb-24">
          <div className="max-w-[1000px]">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Search className="w-4 h-4 text-[#F26522]" />
                <span className="text-[13px] sm:text-[14px] text-gray-300 tracking-wide uppercase font-medium">
                  Gobiya Services {'>'} {data.insightCategory}
                </span>
              </div>
              <span className="text-[12px] text-gray-500 font-medium">Last Updated: June 2026</span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white mb-6 font-display">
              {data.h1}
            </h1>
            <p className="text-[17px] sm:text-[20px] text-gray-400 max-w-[800px] leading-relaxed mb-10">
              {data.subHeadline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <a 
                href={data.ctaLink} 
                data-cta-location={`solution_hero_${path.split('/').pop()}`}
                data-cta-text={data.ctaText}
                onClick={() => trackCTA({ 
                  cta_location: `solution_hero_${path.split('/').pop()}`, 
                  cta_text: data.ctaText,
                  destination: data.ctaLink
                })}
                className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300"
              >
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
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-shadow duration-300 px-3 py-2 cursor-pointer">
                <RotatingAILogos />
                <span className="text-[13px] sm:text-[14px] font-medium text-white">Certified Partner</span>
                <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
              </div>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-transparent perspective-1000">
            {data.valueCards.map((card, idx) => (
              <div 
                key={idx} 
                className="group relative min-h-[300px] border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 [perspective:1000px]"
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT */}
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-white p-10 lg:p-12 flex flex-col justify-center shadow-xl shadow-gray-200/50">
                    <ChevronRight size={32} className="text-[#F26522] mb-6" strokeWidth={1.5} />
                    <h3 className="text-2xl font-medium mb-4 text-[#111111]">
                      {card.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {card.text}
                    </p>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#F26522] p-10 lg:p-12 flex flex-col justify-center text-white shadow-xl shadow-orange-500/20">
                    <h3 className="text-xl font-medium mb-4">
                      {card.title}
                    </h3>
                    <p className="leading-relaxed text-white/90 text-[15px]">
                      {card.backText || card.text}
                    </p>
                  </div>

                </div>
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
              <ParallaxMedia 
                type="image"
                src={data.executionImage} 
                alt="Strategy Execution Dashboard" 
                className="w-full rounded-xl shadow-2xl shadow-gray-200 aspect-[4/3]"
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

      {/* ── PODCAST EPISODE (Optional for GEO) ── */}
      {path === '/capabilities/generative-engine-optimization' && (
        <section className="py-24 px-5 sm:px-8 lg:px-12 bg-[#09090b] border-t border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto reveal-up">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-[10px] uppercase tracking-wider font-semibold mb-4">
                  Listen: Deep Dive Podcast
                </span>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-medium text-white mb-6 leading-tight font-display">
                  Winning with Generative Engine Optimization (GEO)
                </h2>
                <p className="text-gray-400 text-[15px] sm:text-[16px] leading-relaxed mb-8">
                  In this episode, Steve Martin details the underlying citation mechanics for models like ChatGPT, Claude, Perplexity, and Gemini. Learn how structured entity graphs, Wikidata profiles, and off-site verification records influence LLM shortlist recommendations.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 max-w-xl">
                  <audio controls className="w-full" style={{ filter: 'invert(1) hue-rotate(180deg)' }}>
                    <source src="/audio/Winning_with_generative_engine_optimization.m4a" type="audio/mp4" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full hidden lg:block rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/article-what-is-generative-engine-optimization-and-how-does-it-work.webp" 
                  alt="GEO podcast visual representation"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. CASE STUDY (Dark Blue/Black) ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#0A1118] relative overflow-hidden text-center lg:text-left">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none">
          <ParallaxMedia type="image" src={data.caseStudy.backgroundImage || "/images/case_study_bg.webp"} alt="Tech BG" className="w-full h-full" />
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
              Lovable
            </div>
            <div className="text-2xl font-bold font-display flex items-center gap-2 text-[#111111]">
              <span className="text-blue-500 font-sans">⚛</span> React
            </div>
            <div className="text-2xl font-bold font-display flex items-center gap-2 text-[#111111]">
              <span className="text-black font-sans font-extrabold">▲</span> Next.js
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
            Ready to unlock growth? <a 
              href="/book" 
              data-cta-location={`solution_bottom_${path.split('/').pop()}`}
              data-cta-text="Let's talk!"
              onClick={() => trackCTA({ 
                cta_location: `solution_bottom_${path.split('/').pop()}`, 
                cta_text: "Let's talk!",
                destination: '/book'
              })}
              className="underline decoration-2 underline-offset-8 hover:text-black hover:decoration-black transition-colors duration-300"
            >Let's talk!</a>
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
