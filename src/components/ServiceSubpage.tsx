import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';
import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Clock, ArrowRight, ShieldAlert, TrendingUp, Search, Network, PenTool, BarChart, Megaphone, Target, Briefcase, Code } from 'lucide-react';
import SplitTextReveal from './SplitTextReveal';
import ParallaxMedia from './ParallaxMedia';
import ServicesBento from './ServicesBento';
import InsightsSlider from './InsightsSlider';
import InsightsGrid from './InsightsGrid';
import CaseStudiesPinned from './CaseStudiesPinned';
import SatisfiedClients from './SatisfiedClients';
import RoiCalculator from './RoiCalculator';
import Header from './Header';
import Footer from './Footer';

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
  const [activeSchema, setActiveSchema] = useState<'business' | 'website' | 'article'>('business');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeSection, setActiveSection] = useState('algorithmic-shift');
  const [activeSuccessSection, setActiveSuccessSection] = useState('recovery-case');
  const [simulatedVisitors, setSimulatedVisitors] = useState([
    { company: 'Acme Corp', page: '/services/seo', time: '2s ago', intent: 98 },
    { company: 'Enterprise Inc', page: '/services/lead-gen', time: '12s ago', intent: 85 },
    { company: 'Global Logistics', page: '/company/approach', time: '24s ago', intent: 92 },
    { company: 'Fintech Solutions', page: '/services/geo', time: '40s ago', intent: 88 }
  ]);

  const [contactDomain, setContactDomain] = useState('');
  const [contactServices, setContactServices] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const domainParam = params.get('domain');
    const servicesParam = params.get('services');
    if (domainParam) {
      setContactDomain(domainParam);
    }
    if (servicesParam) {
      setContactServices(servicesParam.split(',').filter(Boolean));
    }
  }, [path]);

  const schemas = {
    business: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Enterprise Client",
      "url": "https://www.clientdomain.com",
      "knowsAbout": [
        "https://en.wikipedia.org/wiki/Search_engine_optimization",
        "https://en.wikipedia.org/wiki/Information_retrieval",
        "https://en.wikipedia.org/wiki/B2B_marketing"
      ],
      "areaServed": "Global",
      "description": "Enterprise software platform engineered for high-intent pipeline growth and search visibility."
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Enterprise Platform",
      "url": "https://www.clientdomain.com",
      "publisher": {
        "@type": "Organization",
        "name": "Enterprise Client"
      }
    },
    article: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Algorithmic Pipeline Domination in the AI Era",
      "about": [
        {
          "@type": "Thing",
          "name": "Entity Optimization"
        }
      ],
      "author": {
        "@type": "Person",
        "name": "Industry Authority"
      }
    }
  };

  const sections = [
    { id: 'algorithmic-shift', label: 'Semantic Entities' },
    { id: 'topical-authority', label: 'Topical Architecture' },
    { id: 'geo-optimization-llm', label: 'AI Citations (GEO)' },
    { id: 'pipeline-orchestration', label: 'Revenue Pipelines' }
  ];

  const successSections = [
    { id: 'recovery-case', label: 'Algorithmic Recovery' },
    { id: 'pipeline-case', label: 'Pipeline Automation' },
    { id: 'geo-case', label: 'AI Citations (GEO)' },
    { id: 'conversion-case', label: 'Performance Dev' }
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  useEffect(() => {
    if (path !== '/company/approach') return;
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  useEffect(() => {
    if (path !== '/company/success-stories') return;
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;
      for (const section of successSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSuccessSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  useEffect(() => {
    if (path !== '/company/success-stories') return;
    const interval = setInterval(() => {
      setSimulatedVisitors(prev => {
        const companies = ['SpaceX', 'Stripe', 'Airbnb', 'HubSpot', 'Salesforce', 'Figma', 'Slack', 'Chevron'];
        const pages = ['/services/seo', '/services/lead-gen', '/services/geo', '/company/approach', '/company/success-stories'];
        const randomCompany = companies[Math.floor(Math.random() * companies.length)];
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        const randomIntent = Math.floor(Math.random() * 25) + 75; // 75-100
        
        return [
          { company: randomCompany, page: randomPage, time: 'Just now', intent: randomIntent },
          ...prev.slice(0, 3).map(v => {
            if (v.time === 'Just now') return { ...v, time: '3s ago' };
            if (v.time.endsWith('s ago')) {
              const seconds = parseInt(v.time) + 3;
              return { ...v, time: `${seconds}s ago` };
            }
            return v;
          })
        ];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [path]);

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

  // Handle hash/anchor scroll on initial mount or path/hash change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Wait for rendering to complete
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    };
    
    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [path]);

  // Clock updating
  useEffect(() => {
    // Add logic if needed
  }, []);

  // Update client-side browser tab title and DOM meta tags on route changes
  useEffect(() => {
    const getSeoMetadata = (p: string) => {
      const norm = p.toLowerCase().replace(/\/$/, '') || '/';
      switch (norm) {
        case '/services':
          return {
            title: 'Forensic SEO and B2B Pipeline Services | Gobiya',
            description: 'We engineer professional SEO and B2B pipeline services, consolidating organic traffic recovery, generative engine optimization (GEO), and React web development.'
          };
        case '/services/seo':
          return {
            title: 'Technical SEO Services & Traffic Recovery | Gobiya',
            description: 'Get expert technical SEO services to reclaim your search positions. We deliver entity-level SEO, topical authority architectures, and advanced technical audits.'
          };
        case '/services/lead-generation':
          return {
            title: 'B2B Lead Generation & Predictable Sales Pipelines | Gobiya',
            description: 'Scale your contract value with our B2B lead generation services. We design and launch automated cold outreach and sales acquisition protocols.'
          };
        case '/services/geo-optimization':
          return {
            title: 'Generative Engine Optimization (GEO) & AI Visibility | Gobiya',
            description: 'Get ahead with Generative Engine Optimization. Position your brand to be cited and recommended natively by ChatGPT, Claude, Gemini, and AI Overviews.'
          };
        case '/services/web-development':
          return {
            title: 'React Web Development & Conversion-Engineered Platforms | Gobiya',
            description: 'Get custom React web development services built to convert. We replace slow templates with lightning-fast landing pages and high-performance applications.'
          };
        case '/services/ppc-advertising':
          return {
            title: 'High-Yield PPC Advertising & Paid Search Pipelines | Gobiya',
            description: 'Scale revenue with our data-driven PPC advertising services. Maximize ROAS and lower acquisition costs across Google, Microsoft, and Meta Ads.'
          };
        case '/google-penalty-recovery':
          return {
            title: 'Google Penalty Recovery & Core Update Recovery | Gobiya',
            description: 'Get expert Google penalty recovery services. We diagnose and reverse manual action penalties and organic traffic declines caused by core updates.'
          };
        case '/company/about':
          return {
            title: 'About Gobiya | Search Recovery & Pipeline Agency',
            description: 'Learn about our approach to algorithmic dominance, generative search, and revenue-scaling pipelines.'
          };
        case '/company/success-stories':
          return {
            title: 'Search Recovery & Sales Pipeline Case Studies | Gobiya',
            description: 'Explore how we recover organic traffic, build predictive B2B pipelines, and secure market dominance.'
          };
        case '/company/approach':
          return {
            title: 'Our Search Dominance & Pipeline Methodology | Gobiya',
            description: 'Discover our proprietary methodology for algorithmic audits, penalty recovery, and B2B pipeline acceleration.'
          };
        case '/insights':
          return {
            title: 'SEO Updates, B2B Outbound & Search Intelligence | Gobiya',
            description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies.'
          };
        case '/company/careers':
          return {
            title: 'Join Our Technical SEO & Software Dev Team | Gobiya',
            description: 'We are hiring top-tier SEO specialists, React engineers, and growth strategists to dominate the search landscape.'
          };
        case '/contact':
          return {
            title: 'Contact Gobiya | Reclaim & Scale Your Search Revenue',
            description: 'Reach out to our engineering team in Los Angeles to discuss algorithmic audits, AI traffic recovery, and pipeline architecture.'
          };
        default:
          return {
            title: 'SEO Traffic Recovery & B2B Pipeline Engineering | Gobiya',
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
      case '/services':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Consolidated Growth Solutions',
          title: 'Bespoke SEO and B2B pipeline services engineered for dominance.',
          rotatingWords: ['recover traffic.', 'build pipelines.', 'cite brand AI.', 'engineer speed.'],
          outcomeMessage: 'We consolidate forensic SEO and automated B2B sales development into a single high-impact engine.',
          ctaText: 'Get growth audit',
          introScrollText: 'We engineer high-performance SEO and B2B pipeline services, not just strategies. Reclaiming lost organic traffic, automating cold pipeline generation, and aligning entities for search models.',
          introHeading: <>Five specialized lines. <br className="hidden sm:block" /><span className="sm:hidden"> </span>One consolidated engine.</>,
          introParagraph: 'At Gobiya, we do not run broad campaigns or provide boilerplate agency retainers. We build custom React/Supabase platforms, configure real-time intent-signals, and execute recovery protocols that get results.',
          introVideo1: "/videos/space-girl.webm",
          introVideo2: "/videos/gobiyaRace.webm",
          bentoHeadline: <>Integrated capabilities.<br/>Measurable returns.</>,
          bentoDescription: 'Every service is engineered to scale your customer acquisitions, drive down CAC, and ensure long-term algorithmic safety. Verify our capabilities below.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '#penalty-recovery', colSpan: 2, icon: <ShieldAlert size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Traffic Recovery Protocol', description: 'Forensic drop diagnosis, content pruning, and E-E-A-T rebuilding to reverse search penalties.' },
            { href: '#lead-generation', colSpan: 1, icon: <Network size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Pipeline Architecture', description: 'Automated cold outreach and target account CRM routing driven by site intent signals.' },
            { href: '#geo-optimization', colSpan: 1, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI Citations (GEO)', description: 'Entity alignment to get your brand recommended natively inside ChatGPT, Claude, and Gemini.' },
            { href: '#web-design', colSpan: 2, icon: <Code size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'High-Speed React/Vite Dev', description: 'Sub-second loading, Core Web Vitals optimization, and built-in CRO conversion systems.' },
            { href: '#advertising', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'ROAS-Driven Advertising', description: 'Paid ad pipelines managed to capture high-intent buyers and maximize ROI.' }
          ],
          showCalculator: false,
          calculatorProps: { title: "Calculate Your Digital Revenue Leak", description: "Input the traffic or lead volume you are currently losing. See how much pipeline we can recover.", sliderLabel: "Estimated Monthly Loss", sliderMin: 1000, sliderMax: 200000, sliderStep: 1000, conversionRate: 0.02, ltv: 500, resultLabel: "Monthly Revenue Leak", disclaimer: "*Based on 2% conversion rate and $500 LTV." }
        };
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
            { href: '/insights', colSpan: 2, gradient: true, icon: <Network size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Generative Search Dominance', description: 'The search paradigm has shifted. We ensure your business is not left behind by the AI transition.' }
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
          title: 'Steve Martin & Gobiya: Engineering search dominance.',
          rotatingWords: ['SEO specialists.', 'web developers.', 'growth marketers.'],
          outcomeMessage: 'Led by Steve Martin — 25+ years of digital marketing and full-stack development experience.',
          ctaText: 'View profile',
          introScrollText: 'Hands-on Senior SEO & Digital Marketing Specialist who builds the systems. From early web development roots in 2000 to scaling enterprise growth and AI citations.',
          introHeading: <>Combining technical code <br className="hidden sm:block" /><span className="sm:hidden"> </span>with organic conversion.</>,
          introParagraph: 'Steve Martin runs Gobiya to help brands automate their B2B pipelines, reclaim rankings after core updates, and construct React/Supabase web designs that convert at elite ratios.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Built on experience.<br/>Dedicated to shipping.</>,
          bentoDescription: 'Steve is a veteran technical founder who has managed up to $15K/month Google Ads budgets and scaled organic pipelines. Explore his core E-E-A-T credentials below.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/about/steve-martin', colSpan: 2, icon: <Briefcase size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: '25+ Years Experience', description: 'Bridging full-stack software engineering and organic search traffic acquisition since 2000.' },
            { href: '/services/web-design', colSpan: 1, icon: <Code size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Core Dev Stack', description: 'React, Vite, Tailwind CSS, Supabase, and custom AI chat/automation builds.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI-Era SEO', description: 'Schema markup, entity optimization, and structured citations for LLMs.' },
            { href: '/about/steve-martin', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Steve Martin Credentials', description: 'View professional experience, client projects, certifications, and UCLA background.' }
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
      case '/insights':
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
            { href: '/insights', colSpan: 2, icon: <BarChart size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Algorithm Teardowns', description: 'Forensic breakdowns of Google updates and exactly what signals are currently being rewarded.' },
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
    <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* HERO SECTION */}
      {/* Reduced height (h-[60vh] instead of h-screen) and removed top padding to bring content close to header */}
      <section className="relative w-full h-[65vh] min-h-[480px] bg-[#050505] overflow-hidden flex flex-col justify-center cursor-default">
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover opacity-85">
          <DeferredShader>
            <Swirl colorA="#050505" colorB="#0f0f0f" detail={1.7} />
            <ChromaFlow baseColor="#050505" downColor="#f26522" leftColor="#f26522" rightColor="#f26522" upColor="#f26522" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </DeferredShader>
        </div>

        {/* Navigation */}
        <Header theme="dark" />

        {/* Hero Content - Adjusted margins/padding to remove large empty vertical space */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-0">
          <p className="text-[13px] sm:text-[14px] text-gray-400 tracking-wide mb-4 uppercase font-medium">
            {config.subtitle}
          </p>
          <h1 className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white max-w-[1200px]">
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
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-400 max-w-[800px] leading-relaxed">
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
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-shadow duration-300 px-3 py-2 cursor-pointer">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8704E] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
              </svg>
              <span className="text-[13px] sm:text-[14px] font-medium text-white">Certified Partner</span>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
            </div>
          </div>
        </div>
      </section>

      
      {/* SECTION: SCROLL REVEAL INTRO */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && path !== '/company/approach' && path !== '/company/success-stories' && (
        <section className="w-full relative" data-logo-dark>
          <SplitTextReveal text={config.introScrollText} />
        </section>
      )}

      {/* SECTION: INTRO CONTENT */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && path !== '/company/approach' && path !== '/company/success-stories' && (
        <section className="bg-[#050505] text-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5">Context & Methodology</div>
          </div>
          
          <div className="px-5 sm:px-8 lg:px-12">
            <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
              {config.introHeading}
            </h2>

            <div className="block lg:hidden">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-300 mb-6">
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
                <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-300 mb-8 max-w-[90%]" style={{ contentVisibility: 'auto' }}>
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

      {/* DETAILED METHODOLOGY FOR THE APPROACH PATH */}
      {path === '/company/approach' && (
        <section className="bg-[#050505] text-white py-20 sm:py-32 border-t border-white/10 relative z-20" data-logo-dark>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
              
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-8">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Our Methodology</span>
                    <h3 className="text-xl font-bold text-white">Search Blueprint</h3>
                  </div>
                  
                  <nav className="flex flex-col border-l border-white/10 pl-4 py-2">
                    {sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleScrollToSection(sec.id)}
                        className={`text-left text-[14px] py-2 transition-all duration-300 relative border-l-2 -ml-[17px] pl-4 cursor-pointer ${
                          activeSection === sec.id
                            ? 'text-[#F26522] border-[#F26522] font-semibold'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </nav>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-2">Target Metrics</h4>
                    <ul className="flex flex-col gap-3">
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Word count baseline:</span>
                        <span className="font-semibold text-white">2,200+</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>LLM Citation Rate:</span>
                        <span className="font-semibold text-white">90%+</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Rendering Latency:</span>
                        <span className="font-semibold text-white">&lt;100ms</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Main Copy Area */}
              <div className="flex flex-col gap-24 max-w-4xl">
                
                {/* Intro Callout */}
                <div className="border-l-4 border-[#F26522] pl-6 py-2">
                  <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-gray-300 font-medium leading-relaxed">
                    Search engine optimization is no longer a marketing checklist. It is a technical engineering discipline. 
                    Below is Gobiya's detailed operating model for algorithmic dominance, entity-based indexing, 
                    and closed-loop B2B pipeline conversion.
                  </p>
                </div>

                {/* Section 1: Algorithmic Shift */}
                <article id="algorithmic-shift" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">01</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">The Paradigm Shift</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    How does entity-based search work? (Keywords are strings, Google indexes things)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      In the early eras of organic search engine optimization, websites were indexed based on direct string-matching algorithms. If a page was designed to rank for a query like "B2B sales pipeline integration tools," the primary operational objective was to verify the presence of that phrase in meta titles, headings, and copy at a specific keyword density. Today, Google's Helpful Content System, core quality classifiers, and neural matching algorithms operate on a fundamentally different paradigm. Search engines no longer index strings; they index entities.
                    </p>
                    <p>
                      An entity is a distinct, well-defined concept, organization, person, place, or thing that is cataloged in Google's Knowledge Graph, often represented by a unique machine-readable Knowledge Graph ID (KGMID). When a user inputs a query, the search engine does not search for pages containing those letters. Instead, it decomposes the prompt into recognized entities, resolves the user's implicit and explicit intent, and queries its graph database. It looks for pages that establish a high-salience connection to the requested entity node.
                    </p>
                    <p>
                      Under this framework, Gobiya's approach is designed around semantic triples (Subject-Predicate-Object). We map out your business entities, service offerings, and target categories to ensure they are represented in the precise format search crawlers expect. Rather than writing arbitrary articles targeting high search volume keywords, we construct content structures that minimize semantic distance to verified authority nodes.
                    </p>
                    <p>
                      This entity-based methodology is also the absolute foundation of Generative Engine Optimization (GEO). Modern Large Language Models (LLMs) such as OpenAI's GPT-4, Anthropic's Claude 3.5, and Google's Gemini do not navigate page authority vectors like traditional search engines. They map out semantic spaces. To ensure your brand is cited and surfaced inside these conversational answers, you must define your entity connections explicitly.
                    </p>
                  </div>
                </article>

                {/* Section 2: Topical Authority */}
                <article id="topical-authority" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">02</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Topical Authority</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    Why does topical authority matter for B2B search? (Topological Architecture & Schema Engineering)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      Search dominance requires topical completeness. You cannot rank high-value transactional landing pages if your site lacks the foundational informational resources that prove expertise. For example, ranking a service page for "B2B sales development pipeline setup" requires an exhaustive topological content map covering peripheral queries: outbound pipeline metrics, lead response times, cold email sequence structures, CRM integration flows, and team scaling guides.
                    </p>
                    <p>
                      Gobiya maps out your market sector as an interconnected semantic graph. We structure your content using strict pillar-and-cluster hubs that flow PageRank and semantic signals smoothly from high-volume informational nodes down to high-intent transactional pages. By carefully mapping intent profiles, we eliminate internal keyword cannibalization, ensuring each URL targets a unique, isolated search intent.
                    </p>
                    <p>
                      We explicitly define these relationships for search bots using advanced, nested JSON-LD structured schema. Rather than basic schema templates, we build customized schema graphs connecting your organization, services, authors, and target markets. We use properties like `about`, `mentions`, and `knowsAbout` pointing directly to DBpedia and Wikipedia entity records. This removes the need for search bots to guess page topics, accelerating indexation and boosting entity authority rankings.
                    </p>

                    {/* Interactive Schema Visualizer component */}
                    <div className="mt-8 bg-gray-900 text-gray-150 rounded-xl overflow-hidden shadow-lg border border-gray-800">
                      <div className="bg-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="text-[13px] font-bold uppercase tracking-wider text-white">Interactive Schema Blueprint</h4>
                          <p className="text-[12px] text-gray-400">Select entity type to view nested JSON-LD structure</p>
                        </div>
                        <div className="flex gap-2">
                          {(['business', 'website', 'article'] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setActiveSchema(type)}
                              className={`text-[12px] px-3 py-1 rounded transition-colors cursor-pointer ${
                                activeSchema === type
                                  ? 'bg-[#F26522] text-white font-semibold'
                                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              }`}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 font-mono text-[13px] overflow-x-auto relative max-h-[300px]">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(schemas[activeSchema], null, 2))}
                          className="absolute right-4 top-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px] px-3 py-1.5 rounded border border-gray-700 transition-colors cursor-pointer"
                        >
                          {copiedSchema ? 'Copied!' : 'Copy Code'}
                        </button>
                        <pre className="text-green-400">{JSON.stringify(schemas[activeSchema], null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Section 3: GEO & LLM Citations */}
                <article id="geo-optimization-llm" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">03</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Generative Optimization</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    How do I optimize my business for ChatGPT, Claude, and Perplexity? (Generative Engine Optimization & LLM Visibility)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      The search environment is undergoing its most significant transition in twenty years. Users are shifting from traditional search queries to dynamic conversational prompts answered directly by LLMs like ChatGPT, Claude, Perplexity, and Gemini. If your brand is not recognized by these models, you are missing out on the primary channel where B2B buyers form their shortlists.
                    </p>
                    <p>
                      Generative Engine Optimization (GEO) is the practice of ensuring your brand entities are referenced and recommended as the definitive answer within generative AI responses. Traditional search engines rank pages based on backlinks and keyword placement. LLM retrieval pipelines and Retrieval-Augmented Generation (RAG) models index pages based on authority overlap, semantic alignment, and the volume of factual mentions across trusted databases.
                    </p>
                    <p>
                      Our GEO strategy builds semantic citation loops. We map out the publications, datasets, trade journals, and directories that LLM builders use to pre-train and fine-tune their models. We then execute targeted PR campaigns to place your brand name, data, and technical definitions inside these trusted sources.
                    </p>
                    <p>
                      We also format your on-site content to match the natural extraction habits of LLMs. This involves structuring page data into clear summaries, tabular formats, and direct Q&A blocks that crawlers can easily parse. When an AI agent scans your page, it finds structured, quote-ready statements that translate directly into citations.
                    </p>
                  </div>
                </article>

                {/* Section 4: Pipeline Orchestration */}
                <article id="pipeline-orchestration" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">04</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Revenue Pipelines</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    How do I convert organic traffic into revenue? (Pipeline Integration & Conversion Architecture)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      Organic search traffic is ultimately a vanity metric unless it converts into pipeline value. Traditional agency models celebrate traffic growth even if it fails to generate qualified revenue. Gobiya operates under a pipeline-first framework. We connect search traffic to automated sales development systems, turning your website into an active, high-yield pipeline generator.
                    </p>
                    <p>
                      We build our web applications with custom React and Vite architectures. Standard templates and heavy page-builders are riddled with code bloat and database overhead that damage conversion rates. By delivering sub-second load times, we satisfy Core Web Vitals and capture high-intent users who would otherwise bounce due to lag.
                    </p>
                    <p>
                      We integrate anonymous visitor de-anonymization technologies directly into the page layer. By resolving visiting IP addresses to specific corporate networks in real time, we log which organizations are researching your products and what pages they read. This intent data is fed directly into your CRM (Salesforce or HubSpot) and triggers automated, timing-optimized sales sequences targeting matching buyers at those accounts.
                    </p>
                    <p>
                      We close the feedback loop with advanced multi-touch attribution. We trace every B2B pipeline opportunity back to the specific content hubs and entity nodes that initially captured the buyer's attention. This ensures that every investment in our search engineering protocol is directly justified by measurable closed-won revenue metrics.
                    </p>

                    {/* Metrics Comparison Table */}
                    <div className="mt-12 overflow-x-auto border border-white/10 rounded-xl">
                      <table className="w-full text-[14px] text-left">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                            <th className="p-4 sm:p-5">Performance Vector</th>
                            <th className="p-4 sm:p-5 text-gray-300">Traditional Agency SEO</th>
                            <th className="p-4 sm:p-5 text-[#F26522]">Gobiya Pipeline Engineering</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-gray-400">
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-white">Key Metric</td>
                            <td className="p-4 sm:p-5">Keyword ranking positions & general traffic volume</td>
                            <td className="p-4 sm:p-5 text-white font-medium">Qualified B2B meetings & attributed pipeline</td>
                          </tr>
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-white">Content Model</td>
                            <td className="p-4 sm:p-5">High-volume, keyword-targeted articles (thin content)</td>
                            <td className="p-4 sm:p-5 text-white font-medium">Entity-mapped, comprehensive topical hubs</td>
                          </tr>
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-white">AI Readiness</td>
                            <td className="p-4 sm:p-5">None (optimized purely for legacy Google search bots)</td>
                            <td className="p-4 sm:p-5 text-white font-medium">Generative Engine Optimization (GEO) citation structures</td>
                          </tr>
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-white">Lead Sourcing</td>
                            <td className="p-4 sm:p-5">Passive contact forms with zero intent tracking</td>
                            <td className="p-4 sm:p-5 text-white font-medium">Reverse-IP deanonymization & CRM integrations</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* DETAILED CASE STUDIES FOR SUCCESS STORIES PATH */}
      {path === '/company/success-stories' && (
        <section className="bg-[#050505] text-white py-20 sm:py-32 border-t border-white/10 relative z-20" data-logo-dark>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
              
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-8">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Our Success Stories</span>
                    <h3 className="text-xl font-bold text-white">Proven Results</h3>
                  </div>
                  
                  <nav className="flex flex-col border-l border-white/10 pl-4 py-2">
                    {successSections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleScrollToSection(sec.id)}
                        className={`text-left text-[14px] py-2 transition-all duration-300 relative border-l-2 -ml-[17px] pl-4 cursor-pointer ${
                          activeSuccessSection === sec.id
                            ? 'text-[#F26522] border-[#F26522] font-semibold'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </nav>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-[12px] font-bold uppercase tracking-wider text-white mb-2">Agency Performance</h4>
                    <ul className="flex flex-col gap-3">
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Attributed ACV:</span>
                        <span className="font-semibold text-white">$3.4M+</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Recovery Window:</span>
                        <span className="font-semibold text-white">90 Days</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Core Web Vitals:</span>
                        <span className="font-semibold text-white">100/100</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Main Copy Area */}
              <div className="flex flex-col gap-24 max-w-4xl">
                
                {/* Intro Callout */}
                <div className="border-l-4 border-[#F26522] pl-6 py-2">
                  <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-gray-300 font-medium leading-relaxed">
                    We do not provide vanity growth metrics. We build search recovery systems and outbound pipelines that translate directly into closed-won contract value. 
                    Below are the technical case studies detailing Gobiya's algorithmic operations and B2B pipeline integrations.
                  </p>
                </div>

                {/* Section 1: Algorithmic Update Recovery */}
                <article id="recovery-case" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">01</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Algorithmic Recovery Case Study</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    Reversing Helpful Content Penalties for Enterprise SaaS
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      In mid-2025, our client—a leading enterprise B2B collaboration software brand—experienced a devastating 62% drop in organic search impressions and sessions immediately following a major Google Helpful Content Update. The ranking decline impacted not only informational resource sections but also high-intent commercial landing pages and primary brand queries, causing a massive decline in direct pipeline opportunities.
                    </p>
                    <p>
                      We initiated our Forensic Update Triage Protocol. We began by reviewing raw server access logs to analyze crawlers' patterns and behaviors. The audit identified significant rendering budget blockages: search engine crawlers were spending substantial CPU time rendering heavy, client-side React bundles instead of indexing critical content. We completely refactored their rendering stack to utilize Server-Side Rendering (SSR) and edge-caching configurations, reducing the Time to First Byte (TTFB) from 1.2 seconds to a consistent 80 milliseconds.
                    </p>
                    <p>
                      Simultaneously, we executed our Content Pruning Framework. We analyzed all indexable URLs against organic traffic and search database metrics. We identified that over 40% of the site's indexed blog section comprised thin, outdated, or redundant information that was dragging down the domain-wide quality multiplier. Over a two-week window, we pruned and 301-redirected 1,200 thin articles and consolidated 300 related informational resources into 15 high-authority, comprehensive topical hubs.
                    </p>
                    <p>
                      We then rebuilt their E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) trust signals. We mapped every piece of content to verified author entities using nested JSON-LD schema markup, connecting their authors directly to verified academic databases and industry networks. Within 90 days, Google's algorithmic suppressions were completely lifted, restoring organic search traffic to 410,000 monthly sessions—representing a 108% recovery from the pre-update peak.
                    </p>
                  </div>
                </article>

                {/* Section 2: B2B Pipeline Automation */}
                <article id="pipeline-case" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">02</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Pipeline Engineering Case Study</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    Scaling Outbound Meetings for Enterprise Logistics
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      A mid-market logistics operator approached Gobiya with stagnant organic pipeline values. Although their site was ranking for generic informational search queries, their traffic failed to convert into qualified sales opportunities. Their sales department was forced to rely on manual outbound cold calling and expensive, inaccurate database lists.
                    </p>
                    <p>
                      Our strategy focused on a unified B2B Pipeline Integration. We mapped their service offerings into a structured topical authority graph, designing 30 comprehensive content hubs targeting high-intent long-tail queries related to supply chain software, warehousing routes, and international customs regulations.
                    </p>
                    <p>
                      We integrated real-time reverse-IP de-anonymization technologies directly into the page layer. This allowed us to identify visiting corporate accounts, what specific warehousing content they were reading, and their overall interaction duration in real time. We routed these intent signals directly to their CRM system (HubSpot/Salesforce), automatically triggering personalized cold outreach campaigns targeting decision-makers at the matching corporate domains.
                    </p>
                    <p>
                      Within six months of deployment, this automated pipeline generated 142 qualified meetings with high-intent enterprise buyers and added $3.4M in closed-won annual contract value (ACV).
                    </p>

                    {/* Live Simulated Intent Dashboard */}
                    <div className="mt-8 bg-gray-900 text-gray-150 rounded-xl overflow-hidden shadow-lg border border-gray-800">
                      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
                        <div>
                          <h4 className="text-[13px] font-bold uppercase tracking-wider text-white">Live Intent Signal Simulation</h4>
                          <p className="text-[12px] text-gray-400">Real-time visitor deanonymization feed</p>
                        </div>
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      </div>
                      <div className="p-6 font-mono text-[13px] overflow-x-auto">
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-[120px_1fr_80px_60px] gap-4 border-b border-gray-800 pb-2 text-gray-400 text-[11px] uppercase tracking-wider">
                            <span>Account</span>
                            <span>Active Path</span>
                            <span>Visited</span>
                            <span>Intent</span>
                          </div>
                          {simulatedVisitors.map((visitor, idx) => (
                            <div key={idx} className="grid grid-cols-[120px_1fr_80px_60px] gap-4 items-center text-[12px] animate-fade-rise">
                              <span className="text-white font-medium truncate">{visitor.company}</span>
                              <span className="text-gray-400 truncate">{visitor.page}</span>
                              <span className="text-gray-500 text-[11px]">{visitor.time}</span>
                              <span className={`font-semibold text-right ${visitor.intent >= 90 ? 'text-green-400' : 'text-[#F26522]'}`}>{visitor.intent}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Section 3: GEO & LLM Citations */}
                <article id="geo-case" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">03</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Generative Engine Case Study</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    Generative Search Dominance for Fintech Platforms
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      As AI search platforms grew to dominate B2B research cycles, an enterprise fintech platform saw traditional organic traffic patterns shift. High-intent corporate buyers were no longer searching for core compliance keywords on Google; instead, they were prompting AI engines like ChatGPT, Claude, and Perplexity to compile recommendations and shortlists. The fintech platform was omitted from these model recommendations.
                    </p>
                    <p>
                      Gobiya designed a comprehensive Generative Engine Optimization (GEO) campaign. We mapped the semantic retrieval patterns these models utilize during payment gateway and B2B accounting queries. We established clear entity relations using nested JSON-LD schema structured markup, linking the fintech domain to verified Knowledge Graph definitions using `about` and `knowsAbout` references.
                    </p>
                    <p>
                      We optimized the semantic structure of their technical compliance articles, formatting data into clear summaries, comparison tables, and direct Q&A blocks designed specifically for Retrieval-Augmented Generation (RAG) models. Additionally, we ran a targeted semantic PR campaign, placing mentions of their fintech architecture in high-authority repositories and open journals that LLMs utilize in their pre-training and real-time search directories.
                    </p>
                    <p>
                      Within 120 days, the brand went from 0% recommendation presence to being cited in 84% of B2B fintech compliance queries on ChatGPT and Claude, prompting a 240% increase in pre-qualified sales calls.
                    </p>
                  </div>
                </article>

                {/* Section 4: Performance Dev */}
                <article id="conversion-case" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">04</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Technical Engineering Case Study</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                    Sub-Second React Architecture for Cyber Security
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      An enterprise cybersecurity provider was directing high-spend PPC ad traffic to a legacy WordPress site. Due to outdated themes, database overhead, and heavy plugins, their page load speeds averaged 4.6 seconds, failing Core Web Vitals and causing a high bounce rate of 58%. The conversion rate from paid traffic to demo requests was stuck at 0.8%.
                    </p>
                    <p>
                      Gobiya completely rebuilt the digital application from scratch using React, Vite, and tailwind.css, achieving a page load speed of 0.4 seconds. We eliminated slow plugins, built custom lightweight components, and structured clean conversion funnels (sticky CTAs, micro-interactive forms, and live security calculators).
                    </p>
                    <p>
                      We integrated closed-loop multi-touch attribution metrics to trace the user journey from the first touch (whether a search recommendation or GEO citation) to the final demo submission. By eliminating loading lag and styling the user experience with modern UI principles, the site's bounce rate dropped to 22%, and the conversion rate surged from 0.8% to 2.8%, producing a 250% increase in demo request volume.
                    </p>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* SIMPLE SERVICES SHOWCASE FOR CONSOLIDATED PATH */}
      {path === '/services' && (
        <section className="bg-[#050505] text-white py-16 sm:py-24 border-t border-white/10 relative z-20" data-logo-dark>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-12">Our Specialized Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 'seo',
                  icon: <Search className="text-[#F26522] w-8 h-8" />,
                  title: 'Search Engine Optimization',
                  description: 'Rebuild organic signals and reclaim search engine visibility. We map out topical authority structures and execute forensic technical audits built to win high-intent organic traffic.',
                  deliverables: ['Topical Authority Architectures', 'Algorithmic Search Audits', 'EEAT Signal Optimization']
                },
                {
                  id: 'lead-generation',
                  icon: <Network className="text-[#F26522] w-8 h-8" />,
                  title: 'B2B Pipeline Architecture',
                  description: 'Construct automated sales systems driven by real-time intent signals. We design and launch cold outreach and database routing to consistently book qualified meetings.',
                  deliverables: ['Automated Cold Outreach', 'Intent Signal Tracking', 'CRM Routing & Attribution']
                },
                {
                  id: 'geo-optimization',
                  icon: <Search className="text-[#F26522] w-8 h-8" />,
                  title: 'Generative Engine Optimization (GEO)',
                  description: 'Position your brand to be cited and recommended natively inside generative AI engines. We align your entities so ChatGPT, Claude, and Google AI Overviews reference you directly.',
                  deliverables: ['AI Citation & Reference Building', 'Semantic PR Strategies', 'Entity Graph Integration']
                },
                {
                  id: 'penalty-recovery',
                  icon: <ShieldAlert className="text-[#F26522] w-8 h-8" />,
                  title: 'Google Penalty Recovery',
                  description: 'Emergency triage and recovery protocols for domains hit by Core Updates, Helpful Content Updates, or manual spam actions. We diagnose drops and restore index standing.',
                  deliverables: ['Forensic Update Audit', 'Content Pruning & Restructuring', 'Algorithmic Trust Restorations']
                },
                {
                  id: 'web-design',
                  icon: <Code className="text-[#F26522] w-8 h-8" />,
                  title: 'Website Design & Development',
                  description: 'Custom React & Vite landing pages, web applications, and interactive platforms built from scratch with zero bloat, sub-second speed, and conversion architecture.',
                  deliverables: ['Custom Apps & Mobile Platforms', 'Native CRMs & API Integrations', 'Crypto, Web3 & Smart Contracts', 'AI Video Systems & Automations']
                },
                {
                  id: 'advertising',
                  icon: <TrendingUp className="text-[#F26522] w-8 h-8" />,
                  title: 'ROAS-Driven PPC Advertising',
                  description: 'Precision-targeted paid search and paid social ad pipelines. We maximize return on ad spend (ROAS) and lower customer acquisition costs across Google, Microsoft, and Meta.',
                  deliverables: ['Intent-Based Search Ads', 'LinkedIn B2B Lead Pipelines', 'A/B Testing & Funnel Management']
                }
              ].map((service) => (
                <div key={service.id} id={service.id} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-300 scroll-mt-24">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      {service.icon}
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Service Capabilities</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 text-[14px] leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3">Key Deliverables</h4>
                    <ul className="flex flex-col gap-2 mb-6">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[13px] text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />

                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" className="text-[13px] font-semibold text-[#F26522] hover:text-[#e05a1a] flex items-center gap-1 transition-colors">
                      Inquire about this service <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION: LATEST INSIGHTS */}
      {path !== '/contact' && path !== '/services' && path !== '/company/approach' && path !== '/company/success-stories' && path !== '/company/about' && path !== '/company/careers' && (
        path !== '/insights' ? (
          <div data-logo-dark className="relative">
            <InsightsSlider filterCategory={config.insightCategory} limit={3} currentPath={path} />
          </div>
        ) : (
          <div data-logo-dark className="relative">
            <InsightsGrid />
          </div>
        )
      )}

      {/* SECTION: CASE STUDIES PINNED */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && (
        <div className="relative">
          
        </div>
      )}

      {/* SECTION: SATISFIED CLIENTS */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && (
        <div className="relative">
          <SatisfiedClients />
        </div>
      )}

      {/* SECTION: ROI CALCULATOR */}
      {path !== '/insights' && path !== '/contact' && (
        <div data-logo-dark className="relative">
          {config.showCalculator !== false && <RoiCalculator {...(config.calculatorProps || {})} />}
        </div>
      )}

      {/* CONTACT SECTION (Only rendered on /contact route) */}
      {path === '/contact' && (
        <section className="relative w-full bg-[#050505] text-white py-20 sm:py-32 px-5 sm:px-8 lg:px-12 flex flex-col items-center">
          <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Info */}
            <div className="flex flex-col justify-start">
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight mb-8 text-white">Let's build your pipeline.</h2>
              <p className="text-gray-400 text-[15px] sm:text-[16px] leading-relaxed max-w-md mb-12">
                Whether you need a full algorithmic recovery audit or a predictable B2B sales pipeline, our engineering team is ready to scale your growth.
              </p>
              
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Location</h3>
                  <address className="not-italic text-[16px] sm:text-[18px] font-medium leading-relaxed text-gray-300">
                    3580 Wilshire Blvd, Ste 132<br/>
                    Los Angeles, CA 90010<br/>
                    United States
                  </address>
                </div>
                
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Direct Line</h3>
                  <a href="tel:+13237441338" className="text-[16px] sm:text-[18px] font-medium text-gray-300 hover:text-[#F26522] transition-colors">
                    (323) 744-1338
                  </a>
                </div>
                
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Email</h3>
                  <a href="mailto:hello@gobiya.com" className="text-[16px] sm:text-[18px] font-medium text-gray-300 hover:text-[#F26522] transition-colors">
                    hello@gobiya.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full bg-white/5 p-8 sm:p-12 rounded-2xl shadow-sm border border-white/10">
              <form 
                className="flex flex-col gap-6" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                  
                  try {
                    if (submitBtn) {
                      submitBtn.disabled = true;
                      submitBtn.textContent = 'Sending...';
                    }
                    
                    const formData = new FormData(form);
                    const selectedServiceNames = contactServices
                      .map(s => {
                        if (s === 'geo') return 'GEO / AI Overview Citation';
                        if (s === 'seo') return 'Forensic SEO & Traffic Recovery';
                        if (s === 'b2b') return 'B2B Pipeline & Outbound Automation';
                        if (s === 'dev') return 'Bespoke React Engineering';
                        return s;
                      })
                      .join(', ');

                    const data = {
                      firstName: formData.get('firstName'),
                      lastName: formData.get('lastName'),
                      email: formData.get('email'),
                      company: formData.get('company'),
                      website: formData.get('website'),
                      services: contactServices,
                      message: `[Selected Services: ${selectedServiceNames || 'None'}] [Website: ${formData.get('website')}] -- ${formData.get('message')}`,
                    };
                    
                    const { error } = await supabase.functions.invoke('contact-form', {
                      body: data
                    });
                    
                    if (error) throw error;
                    
                    // Route to thank you page
                    window.history.pushState({}, '', '/thank-you');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo(0, 0);
                  } catch (err) {
                    console.error('Failed to submit form:', err);
                    alert('There was an error sending your message. Please try again or email us directly.');
                    if (submitBtn) {
                      submitBtn.disabled = false;
                      submitBtn.textContent = 'Submit Request';
                    }
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="firstName" className="text-[13px] font-medium text-gray-400">First Name</label>
                    <input type="text" name="firstName" id="firstName" required className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="Jane" />
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="lastName" className="text-[13px] font-medium text-gray-400">Last Name</label>
                    <input type="text" name="lastName" id="lastName" required className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-medium text-gray-400">Work Email</label>
                  <input type="email" name="email" id="email" required className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="jane@company.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[13px] font-medium text-gray-400">Company Name</label>
                  <input type="text" name="company" id="company" className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="Acme Corp" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="website" className="text-[13px] font-medium text-gray-400">Website Domain</label>
                  <input 
                    type="text" 
                    name="website" 
                    id="website" 
                    required 
                    value={contactDomain}
                    onChange={(e) => setContactDomain(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-4 py-3 outline-none transition-all text-[14px]" 
                    placeholder="yourcompany.com" 
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[13px] font-medium text-gray-400">Services of Interest</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'geo', label: 'GEO / AI Overview Citation' },
                      { id: 'seo', label: 'Forensic SEO & Traffic Recovery' },
                      { id: 'b2b', label: 'B2B Pipeline & Outbound' },
                      { id: 'dev', label: 'Bespoke React Engineering' }
                    ].map((service) => {
                      const isChecked = contactServices.includes(service.id);
                      return (
                        <div 
                          key={service.id} 
                          onClick={() => {
                            setContactServices(prev =>
                              prev.includes(service.id) 
                                ? prev.filter(s => s !== service.id) 
                                : [...prev, service.id]
                            );
                          }}
                          className={`flex items-center justify-between p-3 rounded border transition-all duration-300 cursor-pointer ${
                            isChecked 
                              ? 'bg-[#F26522]/10 border-[#F26522] text-white' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[13px] font-medium">{service.label}</span>
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-300 ${
                            isChecked 
                              ? 'bg-[#F26522] border-[#F26522] text-white' 
                              : 'border-white/30 text-transparent'
                          }`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-medium text-gray-400">How can we help?</label>
                  <textarea name="message" id="message" required rows={4} className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-4 py-3 outline-none transition-all text-[14px] resize-none" placeholder="Tell us about your goals..."></textarea>
                </div>

                <button type="submit" className="mt-4 bg-[#F26522] hover:bg-[#e05a1a] text-white py-4 px-6 rounded font-semibold tracking-wide uppercase transition-colors duration-300 w-full sm:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed">
                  Submit Request
                </button>
              </form>
            </div>

          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  );
};

export default ServiceSubpage;
