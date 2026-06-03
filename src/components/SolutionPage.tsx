import React, { useEffect, useState } from 'react';
import { ArrowRight, Search, Activity, Trophy, ChevronDown, ChevronRight, BarChart, Target, Zap, Play, Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import RotatingText from './RotatingText';
import InsightsSlider from './InsightsSlider';
import ParallaxMedia from './ParallaxMedia';
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
  '/capabilities/generative-engine-optimization': {
    h1: 'Generative Engine Optimization: We engineer the citations LLMs use to recommend your brand.',
    subHeadline: 'Generative Engine Optimization (GEO) for brands ready to be referenced natively inside ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews.',
    rotatingWords: ['dominate AIOs.', 'capture citations.', 'control AI.'],
    insightCategory: 'Strategy',
    ctaText: 'Start your GEO program',
    ctaLink: '/contact',
    stats: [
      { value: '70-90%', label: 'AI bias toward Earned Media', text: 'revealed by researchers, heavily favoring independent third-party evaluations over brand or social sites.' },
      { value: '3x', label: 'higher conversion rate', text: 'for users arriving via direct LLM recommendation vs traditional search.' },
      { value: '92%', label: 'of executives surveyed', text: 'believe Generative AI search will disrupt their current SEO traffic.' },
      { value: '+400%', label: 'growth in conversational queries', text: 'requiring semantic entity optimization instead of keyword density.' }
    ],
    approachTitle: "Architecting your brand for the generative era.",
    approachSubtitle: "Modern LLMs do not navigate page-authority vectors. They retrieve from semantic spaces. We ensure your brand is densely and authoritatively represented across the sources AI systems trust.",
    approach: [
      { icon: Search, title: 'AI citation baseline audit.', desc: "We test your brand against the queries your buyers actually run inside ChatGPT, Claude, Perplexity, and Gemini to log when you are cited and when competitors take your place." },
      { icon: Activity, title: 'Earned Media & PR Dominance.', desc: "We build presence across independent review directories and publisher sites. AI search models exhibit a systematic 70-90% bias toward third-party Earned Media over brand-owned or social content." },
      { icon: Target, title: 'Justification Engineering.', desc: "We format and enrich your pages to satisfy justification attributes. AIs don't just index; they synthesize justified shortlists based on specific buying criteria." }
    ],
    valueCards: [
      { title: 'Earned Media Dominance', text: 'We audit and optimize your brand authority across the third-party platforms and publisher review sites AI search retrieves from.' },
      { title: 'API-able Brand Structuring', text: 'We turn your website into a scannable API for AI agents by structuring specifications, pricing, and product logic cleanly.', highlight: true },
      { title: 'Justification Formatting', text: 'When an AI scans your page, it extracts clear, scannable comparisons, pros/cons, and value propositions for its shortlist justifications.' },
      { title: 'Citation Rate Tracking', text: 'We measure share of voice inside generative answers across models and monitor citation drift.' }
    ],
    executionTitle: 'From raw data to verified AI citation.',
    heroImage: '/images/geo_hero.png',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Entity & Earned Media Audit', content: 'We map the entity gap between your site and the third-party publisher review directories and comparison portals that LLMs use during retrieval.' },
      { title: 'Shortlist Restructuring', content: 'We restructure your pages to match LLM extraction habits, deploying clean Q&A matrices, pros/cons sheets, and structured tables to feed AI reasoning frameworks.' },
      { title: 'Off-site Authority Building', content: 'We target authoritative local-language and vertical-specific media, establishing the backlinks and external profiles needed to build AI-perceived authority.' },
      { title: 'Monitoring & Optimization', content: 'We track your LLM citation rate as a primary KPI across model providers and re-deploy entity reinforcement where coverage decays.' }
    ],
    caseStudy: {
      tag: 'Enterprise SaaS',
      headline: 'SaaS platform captures 85% share of voice in top-tier AI conversational queries.',
      description: 'By restructuring technical documentation into quote-ready formats and optimizing Wikipedia/Wikidata entities, the brand became the default recommended provider across ChatGPT and Claude.',
      ctaText: 'View the case study'
    }
  },

  '/capabilities/forensic-seo-penalty-recovery': {
    h1: 'Forensic SEO & Penalty Recovery: Reclaim Your Rank and Stop Algorithmic Bleeding.',
    subHeadline: 'We diagnose Google updates, reverse manual actions, prune toxic content, and build topical authority architectures that recover your organic revenue pipeline.',
    rotatingWords: ['reverse updates.', 'reclaim traffic.', 'engineer EEAT.'],
    insightCategory: 'SEO',
    ctaText: 'Audit my traffic loss',
    ctaLink: '/contact',
    stats: [
      { value: '68%', label: 'of sites hit by core updates', text: 'never fully recover their previous peak traffic without structural changes.' },
      { value: '3-6', label: 'months average recovery time', text: 'for manual actions when proper forensic diagnosis is applied.' },
      { value: '+850%', label: 'traffic rebound post-HCU', text: 'for our top performing recovery case study in the SaaS sector.' },
      { value: '+200%', label: 'increase in organic pipeline', text: 'rebuilt for enterprises recovering from algorithmic drops.' }
    ],
    approachTitle: 'Forensic diagnosis. Surgical remediation.',
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
    heroImage: '/images/penalty_hero.png',
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

  '/capabilities/conversion-architecture': {
    h1: 'Conversion Architecture: We Turn Invisible Traffic into Qualified Sales Pipeline.',
    subHeadline: 'We build and optimize high-converting CRM integrations, intent-tracking funnels, and automated outbound systems that transform anonymous visitors into sales-ready pipeline.',
    rotatingWords: ['capture intent.', 'scale pipeline.', 'maximize CRO.'],
    insightCategory: 'Strategy',
    ctaText: 'Build your pipeline',
    ctaLink: '/contact',
    stats: [
      { value: '4.8x', label: 'Average ROAS across accounts', text: 'by shifting optimization targets from top-of-funnel clicks to closed-won revenue.' },
      { value: '3.5x', label: 'higher conversion rates', text: 'on average for platforms engineered with bespoke conversion architecture.' },
      { value: '+$12M', label: 'in closed-won revenue', text: 'attributed directly to our automated pipeline systems last year.' },
      { value: '-42%', label: 'reduction in CPA', text: 'within the first 90 days of restructuring CRM and paid acquisition pathways.' }
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
    heroImage: '/images/lead_hero.png',
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

  '/capabilities/semantic-search-intelligence': {
    h1: 'Semantic Search Intelligence: Dominate the Vector Space and Entity Graphs.',
    subHeadline: 'Google and AI models search semantic graphs, not strings. We map your brand as a primary entity, resolve crawl boundaries, and build topical authority.',
    rotatingWords: ['map entities.', 'build authority.', 'own the graph.'],
    insightCategory: 'SEO',
    ctaText: 'Analyze search footprint',
    ctaLink: '/contact',
    stats: [
      { value: '92%', label: 'of search queries in B2B', text: 'rely on semantic understanding of buying intent rather than direct keyword matching.' },
      { value: '3x', label: 'higher authority score', text: 'generated across Google\'s knowledge graph within 180 days of semantic structure deployment.' },
      { value: '400%', label: 'increase in semantic citations', text: 'across Perplexity and Gemini for brand queries mapping to Wikidata nodes.' },
      { value: '0', label: 'keyword cannibalization', text: 'ensured through logical entity-to-URL mapping across all site directories.' }
    ],
    approachTitle: 'Modern algorithms query relationships, not keyword density.',
    approachSubtitle: 'Semantic search is built on semantic vectors and entities. We ensure your content structures satisfy these algorithms, organizing your site directory into clear semantic hubs.',
    approach: [
      { icon: Search, title: 'Semantic Entity Mapping.', desc: 'We organize your product and services data into clean entity nodes that search crawlers parse and connect natively.' },
      { icon: Activity, title: 'Wikidata & Knowledge Sync.', desc: 'We align your off-site profiles and citations to Wikidata entity nodes, creating consistent and authoritative identity anchors.' },
      { icon: Target, title: 'Topical Hub Architecture.', desc: 'We design parent-child subdirectory relationships to exhaustively cover high-value topics and eliminate keyword overlap.' }
    ],
    valueCards: [
      { title: 'Entity Graph Alignment', text: 'We map site content to structured entities, allowing algorithms to parse specifications instantly.' },
      { title: 'Topical Cluster Mapping', text: 'We group related content into pillars, establishing high topical authority profiles.', highlight: true },
      { title: 'Semantic Schema Graphing', text: 'We inject advanced nested JSON-LD graphs detailing geographic and organizational details.' },
      { title: 'Knowledge Graph Sync', text: 'We synchronize brand citations across verified knowledge databases.' }
    ],
    executionTitle: 'Engineering the ultimate semantic search graph.',
    heroImage: '/images/seo_hero.png',
    executionImage: '/images/seo_exec.webp',
    executionSteps: [
      { title: 'Semantic Audit & Base Mapping', content: 'We analyze query intents for your sector, identifying structural gaps in entity representation compared to major competitors.' },
      { title: 'Schema Graph Injection', content: 'We write and deploy comprehensive JSON-LD schemas linking your services, authors, and organization to verified Wikidata entries.' },
      { title: 'Content Pillar Restructuring', content: 'We reorganize thin content subfolders into authoritative pillar nodes, resolving duplicate keyword cannibalization.' },
      { title: 'Entity Citation Monitoring', content: 'We monitor knowledge graph insertions and entity rankings, tuning structural signals to capture volatile search categories.' }
    ],
    caseStudy: {
      tag: 'Enterprise SaaS',
      headline: 'SaaS platform maps 85% topical authority in AI semantic graphs.',
      description: 'By restructuring semantic entity models and linking site profiles directly to Wikidata, the brand gained dominant market share in conversational queries.',
      ctaText: 'Explore semantic audits'
    }
  },

  '/capabilities/custom-digital-infrastructure': {
    h1: 'Custom Digital Infrastructure: Sub-Second React Engines Built for Scale.',
    subHeadline: 'We replace slow, bloated templates with custom React/Vite systems, high-speed database layers, and API infrastructures built from scratch to convert and rank at peak efficiency.',
    rotatingWords: ['sub-second speed.', 'custom code.', 'unbreakable scale.'],
    insightCategory: 'Technical',
    ctaText: 'Start a development project',
    ctaLink: '/contact',
    stats: [
      { value: '< 1s', label: 'Time to Interactive', text: 'guaranteed on all our custom React and Vite web applications.' },
      { value: '3.5x', label: 'higher conversion rates', text: 'on average for platforms engineered with bespoke conversion architecture.' },
      { value: '100', label: 'Core Web Vitals scores', text: 'across mobile and desktop, ensuring maximum algorithmic ranking eligibility.' },
      { value: '0', label: 'template bloat', text: 'Every line of code is written from scratch for your specific business logic.' }
    ],
    approachTitle: 'Performance architecture. Sub-second speed.',
    approachSubtitle: 'Page-builder templates throttle Core Web Vitals, organic ranking eligibility, and conversion rate. We build sites from scratch in React and Vite, with conversion architecture engineered into the page layer.',
    approach: [
      { icon: Search, title: 'Technical baseline audit.', desc: 'We benchmark the current site against rendering performance, indexation health, and conversion friction to define the technical targets.' },
      { icon: Zap, title: 'Architecture & stack selection.', desc: 'We design the application architecture in React and Vite for bundle size, rendering speed, and SEO compatibility with SSG/SSR models.' },
      { icon: Activity, title: 'Native integration layer.', desc: 'We build native integrations with your CRM, intent infrastructure, smart contracts, AI pipelines, and custom databases directly into the application.' }
    ],
    valueCards: [
      { title: 'React & Vite Stack', text: 'Engineered for sub-second page loads and seamless, app-like user experiences.' },
      { title: 'Conversion Engineering', text: 'CTA placement, scroll behavior, and trust signals designed against documented buyer behavior.', highlight: true },
      { title: 'SEO Rendering Native', text: 'Clean HTML delivery ensuring Googlebot can crawl and index your content instantly.' },
      { title: 'Custom Systems', text: 'From native CRMs and marketplace platforms to secure database setups.' }
    ],
    executionTitle: 'Engineering products that win indexation and conversion.',
    heroImage: '/images/web_hero.png',
    executionImage: '/images/web_exec.webp',
    executionSteps: [
      { title: 'System Architecture Design', content: 'We define the component hierarchy, routing strategy, and rendering model calibrated specifically to your indexation and conversion requirements.' },
      { title: 'Conversion UI/UX Development', content: 'We engineer conversion paths into the page layer from the first line of code, ensuring form architecture and trust sequencing maximize pipeline yield.' },
      { title: 'API & Database Integration', content: 'We connect marketing automation, analytics, and complex custom databases (like Supabase or PostgreSQL) directly to the application state.' },
      { title: 'Performance Hand-off', content: 'We launch a site that meets sub-second load times, clean Core Web Vitals, full schema implementation, and the rendering standards modern search engines require.' }
    ],
    caseStudy: {
      tag: 'Web3 Platform',
      headline: 'Trading platform handles 10k+ concurrent users with zero latency.',
      description: 'We engineered a custom React application with complex smart contract integrations, delivering real-time data feeds and flawless user experience under extreme load.',
      ctaText: 'Build your platform'
    }
  }
};

const SolutionPage: React.FC<{ path: string }> = ({ path }) => {
  // Use a fallback to SEO data if path doesn't perfectly match
  const data = SOLUTIONS_DATA[path] || SOLUTIONS_DATA['/capabilities/forensic-seo-penalty-recovery'];
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
      '/capabilities/generative-engine-optimization': 'Generative Engine Optimization (GEO) & AI Visibility | Gobiya',
      '/capabilities/forensic-seo-penalty-recovery': 'Forensic SEO & Google Penalty Recovery | Gobiya',
      '/capabilities/conversion-architecture': 'Conversion Architecture: Turn Traffic into Pipeline | Gobiya',
      '/capabilities/semantic-search-intelligence': 'Semantic Search Intelligence & Entity SEO | Gobiya',
      '/capabilities/custom-digital-infrastructure': 'Custom React Web & Digital Infrastructure | Gobiya',
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
