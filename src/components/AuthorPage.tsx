import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Linkedin, Award, Briefcase, Code, Compass, ShieldCheck } from 'lucide-react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import StaggeredMenu from './StaggeredMenu';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import CustomCursor from './CustomCursor';

interface AuthorPageProps {
  path: string;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ path }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update document title and description
  useEffect(() => {
    document.title = "Steve Martin | CEO, Lead Developer & Marketer | Gobiya";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', 'Author profile and E-E-A-T credentials for Steve Martin, CEO, Lead Developer & Marketer at Gobiya. Specialized in SEO, custom React engineering, and pipeline automation.');
    }

    // Inject Person JSON-LD Schema
    const schema = {
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
        "description": "Steve Martin is the CEO, Lead Developer, and Marketer at Gobiya, specialized in engineering high-speed React applications, search engine updating recovery, and signal-anchored sales pipeline architectures.",
        "url": "https://www.gobiya.com/about/steve-martin",
        "sameAs": [
          "https://www.linkedin.com/in/stevemartingobiya/"
        ],
        "knowsAbout": [
          "Search Engine Optimization (SEO)",
          "Generative Engine Optimization (GEO)",
          "React Engineering",
          "B2B Sales Pipeline Automation",
          "Algorithmic Update Recovery",
          "Paid Search (PPC) and Social Advertising"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "University of California, Los Angeles"
        }
      }
    };

    let scriptTag = document.getElementById('author-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'author-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }, []);

  const articles = [
    {
      title: 'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026',
      slug: 'automated-b2b-sales-pipeline-seo',
      category: 'Strategy',
      readTime: '12 min read',
      date: 'May 25, 2026',
      image: '/images/article-b2b-pipeline-seo.webp',
      description: 'How AI-cited content qualifies B2B vendors for buyer shortlists — and what the 2026 shift to AI-driven research means for your pipeline.'
    },
    {
      title: 'Automated Lead Generation SEO: How AI Pre-Qualifies Your Pipeline in 2026',
      slug: 'automated-lead-generation-seo',
      category: 'Strategy',
      readTime: '13 min read',
      date: 'May 25, 2026',
      image: '/images/article-lead-gen-seo.webp',
      description: 'How AI-cited content produces pre-qualified pipeline at conversion rates traditional lead gen cannot match — and what the 2026 shift means for B2B teams.'
    },
    {
      title: 'Outbound SEO Prospecting: Timing-Anchored Outreach Powered by Intent Signals in 2026',
      slug: 'outbound-seo-prospecting',
      category: 'Strategy',
      readTime: '12 min read',
      date: 'May 25, 2026',
      image: '/images/article-outbound-seo-prospecting.webp',
      description: 'How SEO-derived intent signals turn outbound from a volume game into a timing game — and what the 2026 data says about cold vs signal-anchored prospecting.'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* ── HERO ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] bg-[#EFEFEF] overflow-hidden flex flex-col justify-end cursor-default">
        {/* Shader background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Nav */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <nav className="flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-white/40 p-[5px] sm:px-4">
            <div className="flex items-center gap-6 relative z-50">
              <a href="/">
                <img src="/images/gobiya---logo.webp" alt="Gobiya Logo" className="h-8 sm:h-9 w-auto object-contain" />
              </a>
            </div>
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
                    { label: 'Search Engine Optimization', link: '/services/seo' },
                  ]}
                  socialItems={[
                    { label: 'Twitter', link: '#' },
                    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/stevemartingobiya/' },
                  ]}
                  menuButtonColor="#111"
                  openMenuButtonColor="#111"
                  accentColor="#F26522"
                />
              </div>
            </div>
          </nav>
        </div>

        {/* Hero title */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-10 sm:pb-14 pt-20">
          <nav className="flex items-center gap-2 text-[12px] text-gray-600 mb-6" aria-label="breadcrumb">
            <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-medium">Steve Martin Profile</span>
          </nav>
          
          <span className="inline-block px-3 py-1 bg-[#F26522] text-white text-[10px] uppercase tracking-wider font-semibold mb-4">
            Leadership & Engineering
          </span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900 max-w-[900px] mb-2 font-display">
            Steve Martin
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-700 font-medium">
            CEO, Lead Developer & Marketer at Gobiya
          </p>
        </div>
      </section>

      {/* ── PROFILE & BIO ── */}
      <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Picture & Meta */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-[320px] aspect-square overflow-hidden border border-gray-200 bg-gray-50 mb-6 shadow-lg">
              <img 
                src="/images/steve-portrait.webp" 
                alt="Steve Martin - CEO, Lead Developer & Marketer" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Steve Martin</h2>
            <p className="text-sm text-gray-600 mb-6 uppercase tracking-wider font-semibold">Gobiya Leadership</p>
            
            <a 
              href="https://www.linkedin.com/in/stevemartingobiya/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-3 transition-colors duration-300 w-full max-w-[320px] justify-center"
            >
              <Linkedin className="w-4 h-4 text-white" />
              <span className="text-[13px] font-semibold mr-3">Connect on LinkedIn</span>
              <div className="w-6 h-6 bg-white flex items-center justify-center shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-[#F26522] transition-transform duration-300" />
              </div>
            </a>

            <div className="w-full max-w-[320px] border-t border-gray-200 mt-8 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#F26522]" />
                <span className="text-[14px] text-gray-700 font-medium">UCLA Alumnus</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F26522]" />
                <span className="text-[14px] text-gray-700 font-medium">10+ Years Growth Engineering</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-[#F26522]" />
                <span className="text-[14px] text-gray-700 font-medium">Full-Stack & React Architect</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience and E-E-A-T Details */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-6 font-display border-b border-gray-100 pb-4">
              About & Credentials
            </h2>
            <p className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-800 mb-6">
              Steve Martin is a multi-disciplinary technical founder, lead developer, and growth marketer with over a decade of experience designing organic search and B2B acquisition models. As the CEO and lead engineer at Gobiya, he builds the programmatic bridges connecting complex backend codebases with enterprise search algorithms.
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-800 mb-8">
              Having scaled systems for startups and mid-market firms alike, Steve specializes in Algorithmic Traffic Recovery (HCU / Core update reversal), custom React-driven web designs passing Core Web Vitals, and Generative Engine Optimization (GEO) architectures to make brands discoverable within LLMs.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#F26522]" /> Core Areas of Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: 'Generative Engine Optimization (GEO)', desc: 'Entity-level semantic styling to ensure brands are cited natively in ChatGPT, Claude, and Gemini.' },
                { title: 'Full-Stack React Engineering', desc: 'Bespoke, high-performance landing systems built for maximum page speed and Google PageSpeed scores.' },
                { title: 'Google Penalty Recovery', desc: 'Forensic diagnosis of algorithmic updates, search quality guidelines alignment, and recovery execution.' },
                { title: 'B2B Pipeline Engineering', desc: 'Intent signal resolution systems converting anonymous page views directly into SDR sequence triggers.' }
              ].map((skill) => (
                <div key={skill.title} className="bg-gray-50 border border-gray-100 p-5 rounded-sm hover:border-[#F26522]/30 transition-colors">
                  <h4 className="font-semibold text-[15px] text-gray-900 mb-2">{skill.title}</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#F26522]" /> Professional Experience
            </h3>
            <div className="space-y-6 mb-12">
              <div className="border-l-2 border-[#F26522] pl-4">
                <span className="text-[12px] uppercase tracking-wider text-gray-500 font-semibold">2023 - Present</span>
                <h4 className="font-bold text-[16px] text-gray-900">CEO & Lead Developer</h4>
                <p className="text-[14px] text-gray-600 font-medium">Gobiya — Los Angeles, CA</p>
                <p className="text-[14px] text-gray-700 mt-2 leading-relaxed">
                  Architecting intent-signal tracking integrations and Generative Engine Optimization models. Leading the engineering of custom speed-optimized React platforms and executing Google Helpful Content Update recovery protocols.
                </p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <span className="text-[12px] uppercase tracking-wider text-gray-500 font-semibold">2018 - 2023</span>
                <h4 className="font-bold text-[16px] text-gray-900">VP of Engineering & Performance Marketing</h4>
                <p className="text-[14px] text-gray-600 font-medium">Digital Scale Consulting</p>
                <p className="text-[14px] text-gray-700 mt-2 leading-relaxed">
                  Managed multi-million dollar paid search budgets while designing technical SEO frameworks and custom headless landing page infrastructures to maximize conversion ratios.
                </p>
              </div>
            </div>

            {/* Written Articles Section */}
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-6 font-display border-b border-gray-100 pb-4 pt-6">
              Articles Written by Steve Martin
            </h2>
            <div className="space-y-6">
              {articles.map((article) => (
                <div key={article.slug} className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-6 group">
                  <div className="sm:w-40 w-full aspect-[16/10] overflow-hidden shrink-0 bg-gray-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#F26522] font-bold block mb-1">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-[16px] sm:text-[18px] text-gray-900 leading-snug mb-2 group-hover:text-[#F26522] transition-colors">
                      <a href={`/insights/${article.slug}`}>{article.title}</a>
                    </h3>
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 text-[12px] text-gray-500">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] text-white pt-20 sm:pt-28 px-5 sm:px-8 lg:px-12 w-full overflow-hidden flex flex-col relative" data-logo-dark>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row lg:justify-between items-start gap-12 lg:gap-0 pb-16 border-b border-white/10 relative z-20">
          <div className="flex flex-col max-w-sm">
            <div className="h-8 sm:h-9 w-[100px] sm:w-[110px] mb-6">
              <img src="/images/gobiya---logo.webp" alt="Gobiya Logo" className="h-full w-auto object-contain filter brightness-0 invert" />
            </div>
            <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
              We engineer AI-driven SEO and sales pipelines to recover lost organic traffic, scale predictable revenue, and secure long-term algorithmic dominance for high-stakes brands.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
            <div>
              <h4 className="text-[12px] uppercase tracking-wider font-bold mb-4 text-[#F26522]">Services</h4>
              <ul className="space-y-3 text-[13px] text-gray-400">
                <li><a href="/google-penalty-recovery" className="hover:text-white transition-colors">Traffic Recovery</a></li>
                <li><a href="/services/lead-generation" className="hover:text-white transition-colors">Sales Pipelines</a></li>
                <li><a href="/services/geo-optimization" className="hover:text-white transition-colors">AI Citations (GEO)</a></li>
                <li><a href="/services/web-design" className="hover:text-white transition-colors">Custom Web Apps</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] uppercase tracking-wider font-bold mb-4 text-[#F26522]">Company</h4>
              <ul className="space-y-3 text-[13px] text-gray-400">
                <li><a href="/company/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/company/approach" className="hover:text-white transition-colors">Our Approach</a></li>
                <li><a href="/company/insights" className="hover:text-white transition-colors">Insights</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] w-full mx-auto pt-8 pb-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-gray-500 relative z-20">
          <span>&copy; 2026 Gobiya. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/stevemartingobiya/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Breadcrumb auxiliary helper icon
const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="12" height="12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default AuthorPage;
