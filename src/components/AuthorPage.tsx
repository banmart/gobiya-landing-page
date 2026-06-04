import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Linkedin, Award, Briefcase, Code, Compass, ShieldCheck } from 'lucide-react';
import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';
import StaggeredMenu from './StaggeredMenu';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import CustomCursor from './CustomCursor';
import Header from './Header';
import Footer from './Footer';

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
      title: 'Are AI Search Engines Scraping Hidden API Data or Public HTML Text Blocks?',
      slug: 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks',
      category: 'GEO',
      readTime: '10 min read',
      date: 'June 4, 2026',
      image: '/images/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks.webp',
      description: 'The technical mechanisms of content acquisition by AI engines, the Googlebot rendering divide, and how to fix JavaScript invisibility.'
    },
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
    <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* ── HERO ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] bg-[#050505] overflow-hidden flex flex-col justify-end cursor-default">
        {/* Shader background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover opacity-85">
          <DeferredShader>
            <Swirl colorA="#050505" colorB="#0f0f0f" detail={1.7} />
            <ChromaFlow baseColor="#050505" downColor="#f26522" leftColor="#f26522" rightColor="#f26522" upColor="#f26522" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </DeferredShader>
        </div>
        
        {/* Nav */}
        <Header theme="dark" />

        {/* Hero title */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-10 sm:pb-14 pt-20">
          <nav className="flex items-center gap-2 text-[12px] text-gray-400 mb-6" aria-label="breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3 h-3 text-gray-500" />
            <span className="text-white font-medium">Steve Martin Profile</span>
          </nav>
          
          <span className="inline-block px-3 py-1 bg-[#F26522] text-white text-[10px] uppercase tracking-wider font-semibold mb-4">
            Leadership & Engineering
          </span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white max-w-[900px] mb-2 font-display">
            Steve Martin
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-300 font-medium">
            Founder, Lead Developer & Marketer at Gobiya
          </p>
        </div>
      </section>

      {/* ── PROFILE & BIO ── */}
      <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Picture & Meta */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-[320px] aspect-square overflow-hidden border border-white/10 bg-white/5 mb-6 shadow-2xl">
              <img 
                src="/images/steve-portrait.webp" 
                alt="Steve Martin - CEO, Lead Developer & Marketer" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Steve Martin</h2>
            <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-semibold">Gobiya Leadership</p>
            
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

            <div className="w-full max-w-[320px] border-t border-white/10 mt-8 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#F26522]" />
                <span className="text-[14px] text-gray-300 font-medium">Glendale Career College (1996)</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F26522]" />
                <span className="text-[14px] text-gray-300 font-medium">25+ Years Search Engineering</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-[#F26522]" />
                <span className="text-[14px] text-gray-300 font-medium">React, Supabase, & AI Integrations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience and E-E-A-T Details */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-6 font-display border-b border-white/10 pb-4">
              About & Credentials
            </h2>
            <p className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-300 mb-6">
              Steve Martin is a hands-on SEO and digital marketing specialist who builds the websites and tools. With over 25 years of experience helping contractors, dental and medical practices, real estate, and SaaS startups grow, he bridges the gap between clean engineering and organic search traffic.
            </p>
            <p className="text-[16px] sm:text-[18px] leading-[1.8] text-gray-300 mb-8">
              Currently focused on schema and entity optimization for AI search results (ChatGPT, Perplexity, Google AI Overviews), modern React/Vite builds, and AI-powered lead generation systems. Steve is looking for a full-time in-house role where he can ship.
            </p>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#F26522]" /> Core Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: 'SEO for the AI Era', desc: 'Schema markup, entity optimization, structured data for AI Overviews and LLM citation, technical SEO, local SEO, GBP, and update recovery.' },
                { title: 'Web Development & Design', desc: 'Custom React & Vite engineering, Tailwind CSS, Supabase, WordPress, Webflow, and high-performance layouts.' },
                { title: 'AI & Automation Systems', desc: 'AI-powered chat assistants, native CRM builds, business lead scrapers, automated email drips, and prompt engineering.' },
                { title: 'Paid Media (PPC)', desc: 'ROAS-driven ad campaign management across Google, Bing, Meta, and Yelp with monthly budgets up to $15K.' },
                { title: 'Digital PR & Link Building', desc: 'HARO, Featured, Qwoted, Reddit, and community-driven authority building link strategies.' },
                { title: 'Analytics & Search Tools', desc: 'Data audits and traffic resolving via Google Analytics, Search Console, SEMrush, and Ahrefs.' }
              ].map((skill) => (
                <div key={skill.title} className="bg-white/5 border border-white/10 p-5 rounded-sm hover:border-[#F26522]/30 transition-colors">
                  <h4 className="font-semibold text-[15px] text-white mb-2">{skill.title}</h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>

            {/* Podcast Section */}
            <div className="border-t border-white/10 pt-8 mt-8 mb-10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-display">
                <Award className="w-5 h-5 text-[#F26522]" /> Featured Podcast Episode
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-[16px] font-semibold text-white mb-2">Winning with Generative Engine Optimization (GEO)</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Listen to Steve Martin discuss how generative engine citations work, key entity verification datasets, and why traditional B2B search signals are changing in the era of ChatGPT, Claude, and Perplexity.
                </p>
                <audio controls className="w-full" style={{ filter: 'invert(1) hue-rotate(180deg)' }}>
                  <source src="/audio/Winning_with_generative_engine_optimization.m4a" type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>

            {/* Written Articles Section */}
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-6 font-display border-b border-white/10 pb-4 pt-6">
              Articles Written by Steve Martin
            </h2>
            <div className="space-y-6">
              {articles.map((article) => (
                <div key={article.slug} className="flex flex-col sm:flex-row gap-6 border-b border-white/10 pb-6 group">
                  <div className="sm:w-40 w-full aspect-[16/10] overflow-hidden shrink-0 bg-white/5">
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
                    <h3 className="font-bold text-[16px] sm:text-[18px] text-white leading-snug mb-2 group-hover:text-[#F26522] transition-colors">
                      <a href={`/insights/${article.slug}`}>{article.title}</a>
                    </h3>
                    <p className="text-[13px] text-gray-400 leading-relaxed mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 text-[12px] text-gray-400">
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
      <Footer />
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
