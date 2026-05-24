import React, { useState, useEffect } from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Clock, ArrowRight, ShieldAlert, TrendingUp, Search, Network, PenTool, BarChart, Megaphone, Target, Briefcase } from 'lucide-react';
import SplitTextReveal from './SplitTextReveal';
import ParallaxMedia from './ParallaxMedia';
import ServicesBento from './ServicesBento';
import InsightsSlider from './InsightsSlider';
import InsightsGrid from './InsightsGrid';
import CaseStudiesPinned from './CaseStudiesPinned';
import SatisfiedClients from './SatisfiedClients';
import RoiCalculator from './RoiCalculator';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

import RotatingText from './RotatingText';
import StaggeredMenu from './StaggeredMenu';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import CustomCursor from './CustomCursor';

interface ServiceSubpageProps {
  path: string;
}

interface PageConfig {
  subtitle: string;
  title: string;
  rotatingWords: string[];
  outcomeMessage: string;
  ctaText: string;
  introScrollText?: string;
  introHeading?: React.ReactNode;
  introParagraph?: string;
  introVideo1?: string;
  introVideo2?: string;
  bentoHeadline?: React.ReactNode;
  bentoDescription?: string;
  insightCategory?: string;
  bentoCards?: any[];
  showCalculator?: boolean;
  calculatorProps?: any;
}

const ServiceSubpage: React.FC<ServiceSubpageProps> = ({ path }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      if (ctx) ctx.revert();
      
      ctx = gsap.context(() => {
        const darkSections = gsap.utils.toArray("[data-logo-dark]") as HTMLElement[];
        
        // Handle dark mode logo inversions exactly like AxionLanding
        const box = document.querySelector("#animated-logo") as HTMLElement;
        if (box) {
          darkSections.forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top 50%",
              end: "bottom 50%",
              onEnter: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
              onLeave: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
              onEnterBack: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
              onLeaveBack: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
            });
          });
        }
      });
    }

    setTimeout(createTimeline, 100);
    window.addEventListener("resize", createTimeline);
    return () => {
      window.removeEventListener("resize", createTimeline);
      if (ctx) ctx.revert();
    };
  }, [path]);

  // Clock updating
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/Los_Angeles', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update client-side browser tab title and DOM meta tags on route changes
  useEffect(() => {
    const getSeoMetadata = (p: string) => {
      const norm = p.toLowerCase().replace(/\/$/, '') || '/';
      switch (norm) {
        case '/services/seo':
          return {
            title: 'Search Engine Optimization (SEO) & Algorithmic Dominance | Gobiya',
            description: 'Reclaim your search engine positions. We deliver entity-level SEO, topical authority architectures, and advanced technical search audits built for search dominance.'
          };
        case '/services/lead-generation':
          return {
            title: 'Predictable B2B Sales Pipeline & Lead Generation Systems | Gobiya',
            description: 'Scale your contract value and outbound pipeline. We design and launch automated cold outreach and sales acquisition protocols for mid-market and enterprise brands.'
          };
        case '/services/geo-optimization':
          return {
            title: 'Generative Engine Optimization (GEO) & AI Search Visibility | Gobiya',
            description: 'Position your brand to be cited and recommended natively by modern AI models including ChatGPT, Claude, Gemini, and Google AI Overviews.'
          };
        case '/services/web-design':
          return {
            title: 'High-Performance Custom Web Design & React Engineering | Gobiya',
            description: 'Speed-optimized, custom-engineered React platforms built to convert. We replace slow templates with lightning-fast landing pages and applications.'
          };
        case '/services/advertising':
          return {
            title: 'High-Yield Paid Search (PPC) & Paid Social Ad Pipelines | Gobiya',
            description: 'Maximize your return on ad spend (ROAS) and lower acquisition costs. Data-driven Google, Microsoft, and Meta Ads management tailored for revenue scaling.'
          };
        case '/google-penalty-recovery':
          return {
            title: 'Forensic Update & Google Penalty Recovery Protocol | Gobiya',
            description: 'Recover lost search traffic. We diagnose and reverse manual action penalties and organic traffic declines caused by Google helpful content & core updates.'
          };
        case '/company/about':
          return {
            title: 'About Gobiya | AI-Driven SEO & B2B Pipeline Engineering Agency',
            description: 'Learn about our approach to algorithmic dominance, generative search, and revenue-scaling pipelines.'
          };
        case '/company/success-stories':
          return {
            title: 'Client Success Stories & SEO Case Studies | Gobiya',
            description: 'Explore how we recover organic traffic, build predictive B2B pipelines, and secure market dominance.'
          };
        case '/company/approach':
          return {
            title: 'Our Approach to Search Dominance & B2B Growth | Gobiya',
            description: 'Discover our proprietary methodology for algorithmic audits, penalty recovery, and B2B pipeline acceleration.'
          };
        case '/company/insights':
          return {
            title: 'Industry Insights, SEO Trends & Search Intelligence | Gobiya',
            description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies.'
          };
        case '/company/careers':
          return {
            title: 'Careers at Gobiya | Join Our Elite SEO & Engineering Team',
            description: 'We are hiring top-tier SEO specialists, React engineers, and growth strategists to dominate the search landscape.'
          };
        case '/contact':
          return {
            title: 'Contact Gobiya | Let\'s Scale Your Search Revenue',
            description: 'Reach out to our engineering team in Los Angeles to discuss algorithmic audits, AI traffic recovery, and pipeline architecture.'
          };
        default:
          return {
            title: 'Gobiya | AI SEO, Traffic Recovery & Algorithmic Search Dominance',
            description: 'We engineer AI-driven SEO and sales pipelines to recover lost organic traffic, scale predictable revenue, and secure long-term algorithmic dominance for high-stakes brands.'
          };
      }
    };

    const seo = getSeoMetadata(path);
    document.title = seo.title;

    // Update standard description tag
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', seo.description);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', seo.title);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', seo.description);
  }, [path]);

  // Map route path to specific page copy and outcome messages
  const getPageConfig = (currentPath: string): PageConfig => {
    const normalPath = currentPath.toLowerCase().replace(/\/$/, '');
    
    const defaultPageConfig: PageConfig = {
      subtitle: 'Gobiya Services > Growth Solutions',
      title: 'High-performance digital growth assets built for dominance.',
      rotatingWords: ['recover traffic.', 'scale sales.', 'secure dominance.'],
      outcomeMessage: 'Outcome-driven search & pipeline engineering',
      ctaText: 'Get growth audit',
      introScrollText: "AI-powered SEO and content, delivering fast rankings and recovery. Through cutting-edge AI and data strategies, we help brands recover traffic and skyrocket visibility.",
      introHeading: <>Stop guessing with your growth. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
      introParagraph: "Our proprietary methodology combines machine learning insights with elite technical architecture, ensuring your brand captures the most valuable real estate available.",
      introVideo1: "/videos/space-girl.webm",
      introVideo2: "/videos/gobiyaRace.webm",
      bentoHeadline: <>Forensic analysis meets<br/>pipeline architecture.</>,
      bentoDescription: "We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue.",
      showCalculator: false
    };
    
    switch (normalPath) {
      case '/services/seo':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Search Engine Optimization',
          title: 'Rebuild organic signals and reclaim search visibility.',
          rotatingWords: ['recover traffic.', 'audit signals.', 'rebuild authority.'],
          outcomeMessage: 'Proven organic traffic recovery & rank dominance',
          ctaText: 'Get organic audit',
          introScrollText: 'Entity-level SEO and content architectures delivering search dominance. Through algorithmic data strategies, we help brands recover traffic and scale visibility.',
          introHeading: <>Stop guessing with your SEO. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
          introParagraph: 'Our proprietary methodology combines machine learning insights with elite technical SEO, ensuring your brand captures the most valuable search real estate available.',
          introVideo1: "/videos/sc-hero-background-compressed.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Forensic analysis meets<br/>algorithmic dominance.</>,
          bentoDescription: 'We do not provide generic reports. We architect proprietary organic assets that command sector respect and generate predictable inbound revenue.',
          insightCategory: 'SEO',
          bentoCards: [
            { href: '/services/seo', colSpan: 2, icon: <Search size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Market Vector SEO', description: 'Hyper-local authority domination and signal optimization to capture high-intent search volumes.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Algorithm Alignment', description: 'Data-driven signal processing to ensure your entities meet AI search intent.' },
            { href: '/google-penalty-recovery', colSpan: 1, icon: <ShieldAlert size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Trust Rebuilding', description: 'Reverse algorithmic drops by rebuilding robust E-E-A-T signals.' },
            { href: '/services/lead-generation', colSpan: 2, gradient: true, icon: <Network size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Revenue Conversion', description: 'Turn recovered organic traffic directly into qualified inbound revenue pipeline.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Your SEO Traffic Leak", description: "Input the monthly organic traffic you lost. See the pipeline revenue we can recover.", sliderLabel: "Organic Traffic Lost" }
        };
      case '/services/lead-generation':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > B2B Pipeline Architecture',
          title: 'Construct automated acquisition systems for predictable growth.',
          rotatingWords: ['capture leads.', 'scale revenue.', 'automate sales.'],
          outcomeMessage: 'Predictable high-intent B2B sales pipeline systems',
          ctaText: 'Build your pipeline',
          introScrollText: 'High-resolve B2B prospecting built for scale. We engineer automated outbound sales systems that consistently generate qualified pipeline and drive predictable revenue.',
          introHeading: <>Scale your contract value. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Automate your outbound.</>,
          introParagraph: 'We design and launch sophisticated cold outreach protocols and sales acquisition architectures for mid-market and enterprise brands, eliminating the reliance on unpredictable referrals.',
          introVideo1: "/videos/space-girl.webm",
          introVideo2: "/videos/gobiyaRace.webm",
          bentoHeadline: <>Predictable pipeline meets<br/>automated scale.</>,
          bentoDescription: 'Stop relying on referrals. We architect outbound growth engines that consistently land meetings with your ideal customer profiles and drive enterprise conversions.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/services/lead-generation', colSpan: 2, icon: <Network size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Outbound Architecture', description: 'Cold email protocols and multi-channel prospecting flows built to scale without burning domains.' },
            { href: '/services/advertising', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Intent Capture', description: 'Target decision-makers actively searching for enterprise solutions.' },
            { href: '/services/seo', colSpan: 1, icon: <BarChart size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Conversion Metrics', description: 'End-to-end CRM integration and revenue attribution tracking.' },
            { href: '/company/about', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Enterprise Sales Engineering', description: 'We do not just generate leads. We engineer systems that book meetings with qualified enterprise buyers.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Pipeline Value", description: "Input your target monthly qualified meetings to see potential pipeline value generated.", sliderLabel: "Target Meetings / Month", sliderMin: 10, sliderMax: 500, sliderStep: 5, conversionRate: 0.2, ltv: 25000, resultLabel: "Potential Pipeline Value Generated", disclaimer: "*Based on 20% close rate and $25k average contract value." }
        };
      case '/services/geo-optimization':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Generative Engine Optimization',
          title: 'Position your brand to be cited and recommended by AI.',
          rotatingWords: ['AI citations.', 'model references.', 'knowledge nodes.'],
          outcomeMessage: 'Entity optimization for ChatGPT, Claude, and Gemini',
          ctaText: 'Analyze AI footprint',
          introScrollText: 'Generative Engine Optimization positions your brand natively inside AI. We engineer your digital footprint so language models cite you as the ultimate authority.',
          introHeading: <>Be cited by AI models. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Capture the next search era.</>,
          introParagraph: 'Traditional search is evolving. We optimize your brand entities so that systems like ChatGPT, Claude, and Google AI Overviews recommend your solutions directly to high-intent users.',
          introVideo1: "/videos/ark------final-----01.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Entity optimization meets<br/>LLM alignment.</>,
          bentoDescription: 'Secure your place in generative AI responses. We engineer brand signals that force AI models to recognize you as the definitive market leader.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/services/geo-optimization', colSpan: 2, icon: <TrendingUp size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'LLM Brand Surfacing', description: 'Optimize your digital footprint to be the primary recommended entity in ChatGPT and Claude responses.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI Overviews', description: 'Capture top real estate in Google\'s generative AI search results.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <PenTool size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Semantic PR', description: 'Seed your brand messaging directly into the training data pipelines.' },
            { href: '/company/insights', colSpan: 2, gradient: true, icon: <Network size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Generative Search Dominance', description: 'The search paradigm has shifted. We ensure your business is not left behind by the AI transition.' }
          ]
        };
      case '/services/web-design':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > High-Performance Engineering',
          title: 'Engineered custom web applications built to convert.',
          rotatingWords: ['load under 1s.', 'drive conversions.', 'scale seamless UI.'],
          outcomeMessage: 'Conversion-engineered high-speed custom React platforms',
          ctaText: 'Start web design',
          introScrollText: 'Speed-optimized, custom-engineered React platforms built to convert. We replace slow templates with lightning-fast landing pages and robust web applications.',
          introHeading: <>Outperform the competition. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Build for speed.</>,
          introParagraph: 'Your website is your ultimate conversion asset. We leverage modern JavaScript frameworks like React and Next.js to deliver instant load times, flawless technical SEO, and premium user experiences.',
          introVideo1: "/videos/smilecenter-screencast.webm",
          introVideo2: "/videos/caveman.webm",
          bentoHeadline: <>Custom engineering meets<br/>conversion architecture.</>,
          bentoDescription: 'No templates. No bloated code. We build bespoke, high-performance web applications that convert visitors into revenue and pass Core Web Vitals with flying colors.',
          insightCategory: 'Technical',
          bentoCards: [
            { href: '/services/web-design', colSpan: 2, icon: <PenTool size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'React UI/UX Engineering', description: 'Next.js architectures delivering seamless interactions and sub-second page loads.' },
            { href: '/services/seo', colSpan: 1, icon: <BarChart size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Core Web Vitals', description: 'Flawless performance metrics ensuring Google ranking boosts.' },
            { href: '/services/advertising', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Landing Page CRO', description: 'High-converting funnels explicitly designed to lower acquisition costs.' },
            { href: '/company/success-stories', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Conversion Architecture', description: 'Your site should be your best salesperson. We engineer platforms that maximize revenue yield from every visitor.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate CRO Revenue Uplift", description: "Input your monthly traffic to see the revenue impact of improving your conversion rate via high-performance web design.", sliderLabel: "Monthly Site Traffic", sliderMin: 5000, sliderMax: 200000, sliderStep: 5000, conversionRate: 0.015, ltv: 200, resultLabel: "Added Monthly Revenue (1.5% CRO Uplift)", disclaimer: "*Based on a 1.5% conversion rate increase and $200 Average Order Value." }
        };
      case '/services/advertising':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Paid Search & Social',
          title: 'Maximize conversion yield and lower customer acquisition costs.',
          rotatingWords: ['increase ROAS.', 'lower CAC.', 'scale PPC revenue.'],
          outcomeMessage: 'Maximum ROAS paid search & social ad pipelines',
          ctaText: 'Scale paid ads',
          introScrollText: 'Data-driven paid media strategies to maximize your return on ad spend. We engineer highly targeted campaigns across Google, Meta, and LinkedIn to scale acquisitions.',
          introHeading: <>Maximize your ad spend. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Scale your acquisitions.</>,
          introParagraph: 'Stop burning cash on generic ad campaigns. We build precision-targeted paid pipelines that capture high-intent buyers, aggressively lower customer acquisition costs, and maximize ROAS.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/sc-hero-background-compressed.webm",
          bentoHeadline: <>Performance media meets<br/>funnel optimization.</>,
          bentoDescription: 'We manage multi-channel ad pipelines that turn clicks into qualified leads. Our data-driven approach ensures every dollar spent drives measurable bottom-line growth.',
          insightCategory: 'Analytics',
          bentoCards: [
            { href: '/services/advertising', colSpan: 2, icon: <Megaphone size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Paid Search Domination', description: 'Google Ads strategies maximizing intent capture and aggressively lowering CPA.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'LinkedIn B2B', description: 'Precision targeting for enterprise decision-makers.' },
            { href: '/services/web-design', colSpan: 1, icon: <BarChart size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Funnel Optimization', description: 'A/B testing and attribution modeling for max yield.' },
            { href: '/company/approach', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Predictable ROAS Pipeline', description: 'We track every dollar spent to pipeline generated, ensuring your ad budget drives undeniable business growth.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Paid Ad Returns", description: "Input your planned monthly ad spend to see projected pipeline returns.", sliderLabel: "Monthly Ad Spend", sliderMin: 5000, sliderMax: 100000, sliderStep: 5000, conversionRate: 4.5, ltv: 1, resultLabel: "Projected Pipeline (4.5x ROAS)", disclaimer: "*Based on a target 4.5x Return on Ad Spend." }
        };
      case '/google-penalty-recovery':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Forensic Update Recovery',
          title: 'Remove manual actions and recover from algorithmic update drops.',
          rotatingWords: ['reverse drops.', 'prune thin content.', 'restore index status.'],
          outcomeMessage: 'Forensic update recovery & search penalty removal',
          ctaText: 'Start recovery protocol',
          introScrollText: 'Immediate intervention for devastating traffic drops. We perform forensic audits to identify algorithmic suppression, remove manual actions, and rebuild your search trust.',
          introHeading: <>Reverse your traffic drops. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Recover your revenue.</>,
          introParagraph: "Whether you were hit by a Core Update, the Helpful Content Update (HCU), or a manual spam action, our forensic recovery protocols diagnose the exact failure points and rebuild your site's algorithmic trust.",
          introVideo1: "/videos/caveman.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Forensic diagnosis meets<br/>rapid recovery.</>,
          bentoDescription: 'We deploy emergency triage protocols for suppressed domains. From pruning toxic content to rebuilding E-E-A-T signals, we secure your path back to search dominance.',
          insightCategory: 'SEO',
          bentoCards: [
            { href: '/google-penalty-recovery', colSpan: 2, icon: <ShieldAlert size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Algorithmic Diagnostics', description: 'Deep-dive audits into Core Updates and HCU suppressions to identify the exact toxic vectors.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Manual Actions', description: 'Expert removal of spam penalties and toxic links.' },
            { href: '/services/web-design', colSpan: 1, icon: <PenTool size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Content Pruning', description: 'Architectural restructuring to purge unhelpful content.' },
            { href: '/company/success-stories', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Traffic Resurrection', description: 'We have recovered millions in lost pipeline revenue for brands devastated by Google updates.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Penalty Revenue Leak", description: "Input the monthly traffic your site lost during the update. See the pipeline revenue leak.", sliderLabel: "Monthly Traffic Lost", sliderMin: 1000, sliderMax: 200000, sliderStep: 1000, conversionRate: 0.02, ltv: 500, resultLabel: "Monthly Revenue Leak", disclaimer: "*Based on 2% conversion rate and $500 LTV." }
        };
      case '/company/about':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > About the Agency',
          title: 'We engineer algorithmic dominance for elite brands.',
          rotatingWords: ['recover traffic.', 'build pipelines.', 'scale revenue.'],
          outcomeMessage: 'Elite engineering team for search & pipeline dominance',
          ctaText: 'Meet the team',
          introScrollText: 'An elite collective of data scientists, SEO engineers, and revenue architects. We replace guesswork with algorithmic precision to guarantee your digital dominance.',
          introHeading: <>Engineered for precision. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Built for scale.</>,
          introParagraph: 'We are not a traditional marketing agency. We are a specialized technical engineering firm focused purely on search algorithmic recovery, entity optimization, and B2B pipeline generation.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Our expertise meets<br/>your ambition.</>,
          bentoDescription: 'We partner with enterprise and mid-market leaders who demand measurable outcomes, not vanity metrics. Discover the core pillars that drive our engineering team.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/services/seo', colSpan: 2, icon: <Search size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Algorithmic Experts', description: 'Deep technical understanding of search engine architectures and machine learning updates.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Network size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Pipeline Architects', description: 'Systems builders obsessed with outbound revenue generation.' },
            { href: '/company/approach', colSpan: 1, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Data Scientists', description: 'Mathematical precision applied to content and search intent.' },
            { href: '/contact', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Partner With Us', description: 'Join the ranks of elite brands leveraging our proprietary growth methodologies.' }
          ]
        };
      case '/company/success-stories':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Success Stories',
          title: 'Proven results. Search recovery and revenue scaling.',
          rotatingWords: ['case studies.', 'growth metrics.', 'revenue wins.'],
          outcomeMessage: 'Data-backed search recovery & pipeline success metrics',
          ctaText: 'View case studies',
          introScrollText: 'Millions in recovered pipeline revenue. We provide undeniable proof of our engineering methodologies reversing algorithmic penalties and scaling inbound systems.',
          introHeading: <>Proof of concept. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Millions in revenue.</>,
          introParagraph: 'Do not just take our word for it. Review our extensive library of forensic recoveries, pipeline implementations, and massive CRO uplifts for enterprise clients.',
          introVideo1: "/videos/ark------final-----01.webm",
          introVideo2: "/videos/smilecenter-screencast.webm",
          bentoHeadline: <>Data-backed wins meet<br/>client success.</>,
          bentoDescription: 'Every case study details the exact technical failures we diagnosed, the precise architecture we implemented, and the final pipeline revenue generated.',
          insightCategory: 'Analytics',
          bentoCards: [
            { href: '/google-penalty-recovery', colSpan: 2, icon: <ShieldAlert size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Penalty Reversals', description: 'Complete restoration of index status and traffic following devastating Google Core Updates.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Traffic Scaling', description: '300%+ increases in high-intent organic search volume.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Pipeline Generation', description: 'Millions generated via automated B2B outbound sequences.' },
            { href: '/contact', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Become Our Next Success', description: 'Stop losing revenue to competitors. Let us architect your dominance.' }
          ]
        };
      case '/company/approach':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Our Approach',
          title: 'Data-driven methodologies for search engine dominance.',
          rotatingWords: ['forensic analysis.', 'entity optimization.', 'algorithmic alignment.'],
          outcomeMessage: 'Proprietary AI strategies for algorithmic search recovery',
          ctaText: 'Discover our methods',
          introScrollText: 'We do not guess. We deploy forensic data analysis, reverse-engineer search algorithms, and architect proprietary growth assets that command market dominance.',
          introHeading: <>Eradicate guesswork. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Deploy pure data.</>,
          introParagraph: 'Our approach strips away the vanity metrics of traditional agencies. We focus entirely on structural engineering, semantic entity alignment, and mathematical revenue models.',
          introVideo1: "/videos/caveman.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Algorithmic precision meets<br/>pipeline architecture.</>,
          bentoDescription: 'From our initial forensic audit to the final deployment of your automated outbound systems, our methodology is ruthlessly optimized for ROI.',
          insightCategory: 'Technical',
          bentoCards: [
            { href: '/services/seo', colSpan: 2, icon: <PenTool size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Forensic Triage', description: 'We start by tearing down your current digital footprint to identify exactly where you are bleeding revenue.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <Network size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Entity Alignment', description: 'Structuring your brand natively for AI language models.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'System Deployment', description: 'Launching customized outbound and inbound pipelines.' },
            { href: '/company/about', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Iterative Scaling', description: 'We continuously analyze data sets to widen the gap between you and your competitors.' }
          ]
        };
      case '/company/insights':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Industry Insights',
          title: 'Algorithmic intelligence and tactical search analysis.',
          rotatingWords: ['algorithm updates.', 'search trends.', 'AI shifts.'],
          outcomeMessage: 'Advanced tactical intelligence on Google & AI search',
          ctaText: 'Read intelligence briefs',
          introScrollText: 'Stay ahead of the curve. Access our tactical briefs, algorithmic teardowns, and engineering insights directly from the team actively shaping search dominance.',
          introHeading: <>Tactical intelligence. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Unfiltered data.</>,
          introParagraph: 'We publish deep-dive analysis on Google Core Updates, the rise of Generative Engine Optimization, and the exact strategies we use to scale B2B pipelines.',
          introVideo1: "/videos/sc-hero-background-compressed.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Advanced analytics meet<br/>actionable intelligence.</>,
          bentoDescription: 'Consume the exact frameworks and strategies we utilize internally to drive millions in pipeline revenue for our partners.',
          insightCategory: 'SEO',
          bentoCards: [
            { href: '/company/insights', colSpan: 2, icon: <BarChart size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Algorithm Teardowns', description: 'Forensic breakdowns of Google updates and exactly what signals are currently being rewarded.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <Network size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI Overviews', description: 'The evolving landscape of ChatGPT and Gemini search.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Outbound Tactics', description: 'High-converting email copy and sequencing frameworks.' },
            { href: '/contact', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Apply These Insights', description: 'Want these strategies implemented for your brand? Partner with our engineering team today.' }
          ]
        };
      case '/company/careers':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Careers',
          title: 'Join the vanguard of algorithmic search engineering.',
          rotatingWords: ['engineer growth.', 'solve penalties.', 'scale with us.'],
          outcomeMessage: 'Join our elite team of search & growth engineers',
          ctaText: 'View open roles',
          introScrollText: 'We are looking for elite systems thinkers, technical SEOs, and outbound architects. Join a team obsessed with reverse-engineering growth and dominating markets.',
          introHeading: <>Build the future. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Engineer dominance.</>,
          introParagraph: 'Gobiya is not for the faint of heart. We demand excellence, precision, and a relentless pursuit of data-backed results. If you are tired of generic agency work, welcome home.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/caveman.webm",
          bentoHeadline: <>Elite culture meets<br/>massive ambition.</>,
          bentoDescription: 'We offer remote flexibility, unparalleled technical challenges, and the opportunity to work alongside the sharpest minds in digital architecture.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/company/careers', colSpan: 2, icon: <Briefcase size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Technical SEO Engineers', description: 'Looking for specialists capable of forensic audits, server-log analysis, and entity architecture.' },
            { href: '/company/careers', colSpan: 1, icon: <PenTool size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'React Developers', description: 'Build blazing fast, high-converting digital assets.' },
            { href: '/company/careers', colSpan: 1, icon: <Network size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Sales Architects', description: 'Design automated outbound and CRM pipelines.' },
            { href: '/company/about', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Grow With Us', description: 'We invest heavily in the continuous education and algorithmic mastery of every team member.' }
          ]
        };
      case '/contact':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Connect',
          title: 'Partner with our engineering team to scale.',
          rotatingWords: ['dominate search.', 'build pipelines.', 'outpace rivals.'],
          outcomeMessage: 'Reach out for algorithmic audits and pipeline architecture',
          ctaText: 'Message us below',
          introScrollText: 'Ready to eradicate the guesswork from your growth? Contact our engineering team today to schedule a forensic technical audit and pipeline strategy session.',
          introHeading: <>Initiate your audit. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Secure your pipeline.</>,
          introParagraph: 'Fill out the form below to connect directly with our senior architecture team. We only take on partners where we can mathematically guarantee substantial ROI.',
          introVideo1: "/videos/ark------final-----01.webm",
          introVideo2: "/videos/sc-hero-background-compressed.webm",
          bentoHeadline: <>Secure your baseline meets<br/>explosive scale.</>,
          bentoDescription: 'Whether you are bleeding traffic from a Google penalty or need to scale your B2B enterprise pipeline, we have the technical infrastructure ready to deploy.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/contact', colSpan: 2, icon: <Network size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Strategy Session', description: 'Direct access to our senior engineers to diagnose your current growth bottlenecks.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Forensic Audit', description: 'Comprehensive teardown of your digital signals.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Pipeline Review', description: 'Assessment of your current outbound capabilities.' },
            { href: '/google-penalty-recovery', colSpan: 2, gradient: true, icon: <ShieldAlert size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Emergency Triage', description: 'Hit by a core update? Contact us immediately for rapid penalty removal protocols.' }
          ]
        };
      default:
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Growth Solutions',
          title: 'High-performance digital growth assets built for dominance.',
          rotatingWords: ['recover traffic.', 'scale sales.', 'secure dominance.'],
          outcomeMessage: 'Outcome-driven search & pipeline engineering',
          ctaText: 'Get growth audit'
        };
    }
  };
    
  const config = getPageConfig(path);

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* HERO SECTION */}
      {/* Reduced height (h-[60vh] instead of h-screen) and removed top padding to bring content close to header */}
      <section className="relative w-full h-[65vh] min-h-[480px] bg-[#EFEFEF] overflow-hidden flex flex-col justify-center cursor-default">
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <nav className="flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-white/40 p-[5px] sm:px-4">
            {/* LEFT - Static Logo for Subpages */}
            <div className="flex items-center gap-6 relative z-50">
              <a href="/">
                <img 
                  src="/images/gobiya---logo.webp" 
                  alt="Gobiya Logo" 
                  className="h-8 sm:h-9 w-auto object-contain" 
                />
              </a>
            </div>

            {/* RIGHT - Custom Outcome Message */}
            <div className="flex items-center gap-4 sm:gap-6 ml-auto">
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-900" />
                <span className="text-[13px] text-gray-900 font-medium">{time} in Los Angeles</span>
              </div>
              <a href="/contact" className="hidden sm:flex group items-center bg-gray-900 text-white pl-5 pr-2 py-2">
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                </div>
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
              
              <div className="flex items-center justify-center px-2">
                <StaggeredMenu 
                  isFixed={true}
                  colors={['#111111', '#F26522']}
                  items={[
                    { label: 'SEO Traffic Recovery', link: '/google-penalty-recovery' },
                    { label: 'B2B Lead Pipelines', link: '/services/lead-generation' },
                    { label: 'Generative Search (GEO)', link: '/services/geo-optimization' },
                    { label: 'Custom Web Apps', link: '/services/web-design' },
                    { label: 'Paid Media Management', link: '/services/advertising' },
                    { label: 'Search Engine Optimization', link: '/services/seo' }
                  ]}
                  socialItems={[
                    { label: 'Twitter', link: '#' },
                    { label: 'LinkedIn', link: '#' }
                  ]}
                  menuButtonColor="#111"
                  openMenuButtonColor="#111"
                  accentColor="#F26522"
                />
              </div>
            </div>
          </nav>
        </div>

        {/* Hero Content - Adjusted margins/padding to remove large empty vertical space */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-0">
          <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-4 uppercase font-medium">
            {config.subtitle}
          </p>
          <h1 className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-gray-900 max-w-[1200px]">
            {config.title.substring(0, config.title.lastIndexOf(' ')+1)}
            <RotatingText
              texts={config.rotatingWords}
              mainClassName="inline-flex overflow-hidden text-[#F26522] align-text-bottom"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 -mb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-700 max-w-[800px] leading-relaxed">
            {config.outcomeMessage}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300">
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {config.ctaText}
                </span>
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {config.ctaText}
                </span>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 px-3 py-2 cursor-pointer">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8704E] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
              </svg>
              <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">Certified Partner</span>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
            </div>
          </div>
        </div>
      </section>

      
      {/* SECTION: SCROLL REVEAL INTRO */}
      {path !== '/company/insights' && path !== '/contact' && (
        <section className="w-full relative" data-logo-dark>
          <SplitTextReveal text={config.introScrollText} />
        </section>
      )}

      {/* SECTION: INTRO CONTENT */}
      {path !== '/company/insights' && path !== '/contact' && (
        <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-black border border-black px-3 sm:px-4 py-1 sm:py-1.5">Context & Methodology</div>
          </div>
          
          <div className="px-5 sm:px-8 lg:px-12">
            <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
              {config.introHeading}
            </h2>

            <div className="block lg:hidden">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
                {config.introParagraph}
              </p>
              <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 mb-8 inline-flex">
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                </div>
                <div className="w-7 h-7 bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
                <ParallaxMedia type="video" src={config.introVideo1} autoPlay muted loop playsInline className="w-full sm:w-[45%] aspect-[438/346]" />
                <ParallaxMedia type="video" src={config.introVideo2} autoPlay muted loop playsInline className="w-full sm:w-[55%] aspect-[900/600]" />
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
              <div className="self-end">
                <ParallaxMedia type="video" src={config.introVideo1} autoPlay muted loop playsInline className="w-full aspect-[438/346]" />
              </div>
              <div className="self-start flex flex-col items-start justify-start pt-2">
                <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 mb-8 max-w-[90%]">
                  {config.introParagraph}
                </p>
                <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300">
                  <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                    <span className="text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                    <span className="text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                  </div>
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                  </div>
                </a>
              </div>
              <div className="self-end">
                <ParallaxMedia type="video" src={config.introVideo2} autoPlay muted loop playsInline className="w-full aspect-[3/2]" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: SERVICES BENTO */}
      {path !== '/company/insights' && path !== '/contact' && (
        <div data-logo-dark className="relative">
          <ServicesBento headline={config.bentoHeadline} description={config.bentoDescription} cards={config.bentoCards} />
        </div>
      )}

      {/* SECTION: LATEST INSIGHTS */}
      {path !== '/contact' && (
        path !== '/company/insights' ? (
          <div data-logo-dark className="relative">
            <InsightsSlider filterCategory={config.insightCategory} />
          </div>
        ) : (
          <div data-logo-dark className="relative">
            <InsightsGrid />
          </div>
        )
      )}

      {/* SECTION: CASE STUDIES PINNED */}
      {path !== '/company/insights' && path !== '/contact' && (
        <div className="relative">
          
        </div>
      )}

      {/* SECTION: SATISFIED CLIENTS */}
      {path !== '/company/insights' && path !== '/contact' && (
        <div className="relative">
          <SatisfiedClients />
        </div>
      )}

      {/* SECTION: ROI CALCULATOR */}
      {path !== '/company/insights' && path !== '/contact' && (
        <div data-logo-dark className="relative">
          {config.showCalculator !== false && <RoiCalculator {...(config.calculatorProps || {})} />}
        </div>
      )}

      {/* CONTACT SECTION (Only rendered on /contact route) */}
      {path === '/contact' && (
        <section className="relative w-full bg-white text-gray-900 py-20 sm:py-32 px-5 sm:px-8 lg:px-12 flex flex-col items-center">
          <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Info */}
            <div className="flex flex-col justify-start">
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight mb-8">Let's build your pipeline.</h2>
              <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed max-w-md mb-12">
                Whether you need a full algorithmic recovery audit or a predictable B2B sales pipeline, our engineering team is ready to scale your growth.
              </p>
              
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Location</h3>
                  <address className="not-italic text-[16px] sm:text-[18px] font-medium leading-relaxed">
                    138 N Berendo St<br/>
                    Los Angeles, CA 90004<br/>
                    United States
                  </address>
                </div>
                
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Direct Line</h3>
                  <a href="tel:+13103079830" className="text-[16px] sm:text-[18px] font-medium hover:text-[#F26522] transition-colors">
                    (310) 307-9830
                  </a>
                </div>
                
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Email</h3>
                  <a href="mailto:hello@gobiya.com" className="text-[16px] sm:text-[18px] font-medium hover:text-[#F26522] transition-colors">
                    hello@gobiya.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full bg-[#f9f9f9] p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="firstName" className="text-[13px] font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="Jane" />
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="lastName" className="text-[13px] font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-medium text-gray-700">Work Email</label>
                  <input type="email" id="email" className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="jane@company.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[13px] font-medium text-gray-700">Company Name</label>
                  <input type="text" id="company" className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px]" placeholder="Acme Corp" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-medium text-gray-700">How can we help?</label>
                  <textarea id="message" rows={4} className="w-full bg-white border border-gray-200 px-4 py-3 rounded outline-none focus:border-[#F26522] transition-colors text-[14px] resize-none" placeholder="Tell us about your goals..."></textarea>
                </div>

                <button type="submit" className="mt-4 bg-gray-900 hover:bg-[#F26522] text-white py-4 px-6 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto self-start">
                  Submit Request
                </button>
              </form>
            </div>

          </div>
        </section>
      )}

      {/* FOOTER SECTION */}
      {/* Same as homepage, but contains a static logo in place of the scroll waypoint spacer */}
      <footer className="bg-[#111] text-white pt-20 sm:pt-28 px-5 sm:px-8 lg:px-12 w-full overflow-hidden flex flex-col relative" data-logo-dark>
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-10 sm:mb-20 relative z-10">
          
          {/* Col 1 */}
          <div className="flex flex-col pr-0 lg:pr-12">
            <a href="/">
              <img 
                src="/images/gobiya---logo.webp" 
                alt="Gobiya Logo" 
                className="h-8 sm:h-9 w-auto object-contain mb-4 invert brightness-0" 
              />
            </a>
            <h3 className="text-3xl font-semibold tracking-tight mb-4">Gobiya.</h3>
            <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-sm">
              We leverage cutting-edge AI and advanced data strategies to help brands recover lost traffic, dominate search, and scale revenue globally.
            </p>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-3">Subscribe</h4>
            <div className="flex items-center w-full max-w-sm bg-white/10 p-1">
              <input 
                type="email" 
                placeholder="Enter your E-mail" 
                className="bg-transparent text-[14px] text-white placeholder-gray-500 w-full px-4 py-2 outline-none"
              />
              <button className="bg-white text-black px-4 py-2 text-[13px] font-semibold hover:bg-gray-200 transition-colors">
                Submit
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/services/geo-optimization" className="hover:text-white transition-colors">AI Content Strategies</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Traffic Recovery</a></li>
              <li><a href="/google-penalty-recovery" className="hover:text-white transition-colors">Technical SEO</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Algorithmic Audits</a></li>
              <li><a href="/services/lead-generation" className="hover:text-white transition-colors">Programmatic SEO</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/company/about" className="hover:text-white transition-colors">About the Agency</a></li>
              <li><a href="/company/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/company/approach" className="hover:text-white transition-colors">Our Approach</a></li>
              <li><a href="/company/insights" className="hover:text-white transition-colors">Industry Insights</a></li>
              <li><a href="/company/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 pb-8 relative z-[60]">
          <p className="text-[13px] text-gray-500">© 2026 Gobiya. Engineering search dominance.</p>
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Huge Text */}
        <div className="w-full flex justify-center items-center mt-4 sm:mt-10 overflow-hidden relative">
          <BlurText 
            text="GOBIYA" 
            animateBy="letters" 
            delay={150}
            className="text-[17vw] sm:text-[23vw] leading-[0.75] font-bold tracking-tighter text-white select-none text-center justify-center flex-nowrap whitespace-nowrap" 
          />
        </div>
      </footer>

      {/* Gradual Blur fixed at the bottom of the page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={50}
      />
    </div>
  );
};

export default ServiceSubpage;
