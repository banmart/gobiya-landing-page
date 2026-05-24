import React, { useState, useEffect } from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { Clock, ArrowRight } from 'lucide-react';

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
}

const ServiceSubpage: React.FC<ServiceSubpageProps> = ({ path }) => {
  const [time, setTime] = useState('');

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
    const normalPath = currentPath.toLowerCase().replace(/\/$/, ''); // normalize trailing slash
    
    switch (normalPath) {
      case '/services/seo':
        return {
          subtitle: 'Gobiya Services > Search Engine Optimization',
          title: 'Rebuild organic signals and reclaim search visibility.',
          rotatingWords: ['recover traffic.', 'audit signals.', 'rebuild authority.'],
          outcomeMessage: 'Proven organic traffic recovery & rank dominance',
          ctaText: 'Get organic audit'
        };
      case '/services/lead-generation':
        return {
          subtitle: 'Gobiya Services > B2B Pipeline Architecture',
          title: 'Construct automated acquisition systems for predictable growth.',
          rotatingWords: ['capture leads.', 'scale revenue.', 'automate sales.'],
          outcomeMessage: 'Predictable high-intent B2B sales pipeline systems',
          ctaText: 'Build your pipeline'
        };
      case '/services/geo-optimization':
        return {
          subtitle: 'Gobiya Services > Generative Engine Optimization',
          title: 'Position your brand to be cited and recommended by AI.',
          rotatingWords: ['AI citations.', 'model references.', 'knowledge nodes.'],
          outcomeMessage: 'Entity optimization for ChatGPT, Claude, and Gemini',
          ctaText: 'Analyze AI footprint'
        };
      case '/services/web-design':
        return {
          subtitle: 'Gobiya Services > High-Performance Engineering',
          title: 'Engineered custom web applications built to convert.',
          rotatingWords: ['load under 1s.', 'drive conversions.', 'scale seamless UI.'],
          outcomeMessage: 'Conversion-engineered high-speed custom React platforms',
          ctaText: 'Start web design'
        };
      case '/services/advertising':
        return {
          subtitle: 'Gobiya Services > Paid Search & Social',
          title: 'Maximize conversion yield and lower customer acquisition costs.',
          rotatingWords: ['increase ROAS.', 'lower CAC.', 'scale PPC revenue.'],
          outcomeMessage: 'Maximum ROAS paid search & social ad pipelines',
          ctaText: 'Scale paid ads'
        };
      case '/google-penalty-recovery':
        return {
          subtitle: 'Gobiya Services > Forensic Update Recovery',
          title: 'Remove manual actions and recover from algorithmic update drops.',
          rotatingWords: ['reverse drops.', 'prune thin content.', 'restore index status.'],
          outcomeMessage: 'Forensic update recovery & search penalty removal',
          ctaText: 'Start recovery protocol'
        };
      case '/company/about':
        return {
          subtitle: 'Gobiya > About the Agency',
          title: 'We engineer algorithmic dominance for elite brands.',
          rotatingWords: ['recover traffic.', 'build pipelines.', 'scale revenue.'],
          outcomeMessage: 'Elite engineering team for search & pipeline dominance',
          ctaText: 'Meet the team'
        };
      case '/company/success-stories':
        return {
          subtitle: 'Gobiya > Success Stories',
          title: 'Proven results. Search recovery and revenue scaling.',
          rotatingWords: ['case studies.', 'growth metrics.', 'revenue wins.'],
          outcomeMessage: 'Data-backed search recovery & pipeline success metrics',
          ctaText: 'View case studies'
        };
      case '/company/approach':
        return {
          subtitle: 'Gobiya > Our Approach',
          title: 'Data-driven methodologies for search engine dominance.',
          rotatingWords: ['forensic analysis.', 'entity optimization.', 'algorithmic alignment.'],
          outcomeMessage: 'Proprietary AI strategies for algorithmic search recovery',
          ctaText: 'Discover our methods'
        };
      case '/company/insights':
        return {
          subtitle: 'Gobiya > Industry Insights',
          title: 'Algorithmic intelligence and tactical search analysis.',
          rotatingWords: ['algorithm updates.', 'search trends.', 'AI shifts.'],
          outcomeMessage: 'Advanced tactical intelligence on Google & AI search',
          ctaText: 'Read intelligence briefs'
        };
      case '/company/careers':
        return {
          subtitle: 'Gobiya > Careers',
          title: 'Join the vanguard of algorithmic search engineering.',
          rotatingWords: ['engineer growth.', 'solve penalties.', 'scale with us.'],
          outcomeMessage: 'Join our elite team of search & growth engineers',
          ctaText: 'View open roles'
        };
      case '/contact':
        return {
          subtitle: 'Gobiya > Connect',
          title: 'Partner with our engineering team to scale.',
          rotatingWords: ['dominate search.', 'build pipelines.', 'outpace rivals.'],
          outcomeMessage: 'Reach out for algorithmic audits and pipeline architecture',
          ctaText: 'Message us below'
        };
      default:
        return {
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
              <span className="text-[13px] text-gray-900 hidden lg:block font-medium">
                {config.outcomeMessage}
              </span>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-900" />
                <span className="text-[13px] text-gray-900 font-medium">{time} in Los Angeles</span>
              </div>
              <button className="hidden sm:flex group items-center bg-gray-900 text-white pl-5 pr-2 py-2">
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                </div>
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </button>
              
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
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <button className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300">
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
            </button>
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
