import React, { useEffect, useRef } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import { Linkedin, Award, Code, Compass, ShieldCheck } from 'lucide-react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import './AuthorPage.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AuthorPageProps {
  path: string;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ path }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      // Nav entrance
      const navInner = document.getElementById('nav-inner');
      if (navInner) {
        gsap.fromTo(navInner, { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease, delay: 0.1 });
      }

      // Hero Timeline
      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
      heroTl
        .fromTo('.breadcrumb', { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0)
        .fromTo('.hero-cat', { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.08)
        .fromTo('.hero h1 .line > span', { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 1.25 }, 0.15)
        .fromTo('.hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.3);

      // Scroll reveals
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });

      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.fromTo(el as Element, 
          { y: 30, opacity: 0 },
          { scrollTrigger: sc(el as Element), y: 0, opacity: 1, duration: 1.2, ease }
        );
      });

      gsap.utils.toArray('[data-anim="fade"]').forEach(el => {
        gsap.fromTo(el as Element, 
          { opacity: 0 },
          { scrollTrigger: sc(el as Element), opacity: 1, duration: 1.2, ease }
        );
      });

      gsap.utils.toArray('[data-anim="scale"]').forEach(el => {
        gsap.fromTo(el as Element, 
          { scale: 0.97, opacity: 0 },
          { scrollTrigger: sc(el as Element), scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
        );
      });

      gsap.utils.toArray('[data-anim="stagger"]').forEach(parent => {
        const kids = (parent as Element).querySelectorAll('[data-anim-child]');
        if (!kids.length) return;
        gsap.fromTo(kids, 
          { y: 26, opacity: 0 },
          { scrollTrigger: sc(parent as Element), y: 0, opacity: 1, duration: 1.15, ease, stagger: 0.12 }
        );
      });
    }, containerRef);

    return () => ctx.revert();
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
    <div ref={containerRef} className="author-page">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="hero">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">GOBIYA</a><i>/</i>
            <a href="/about">Company</a><i>/</i>
            <span>Steve Martin Profile</span>
          </nav>
          
          <span className="hero-cat">
            Leadership & Engineering
          </span>
          <h1 className="display">
            <span className="line"><span>Steve Martin</span></span>
          </h1>
          <p className="hero-sub">
            Founder, Lead Developer & Marketer at GOBIYA
          </p>
        </div>
      </section>

      {/* ── PROFILE & BIO ── */}
      <section className="profile-layout">
        <div className="grid-cols">
          
          {/* Left Column: Picture & Meta */}
          <div className="left-col">
            <div className="avatar-wrap animate-dossier-frame" data-anim="scale">
              <img 
                src="/images/steve-portrait.webp" 
                alt="Steve Martin - CEO, Lead Developer & Marketer" 
              />
            </div>
            <h2 className="left-name" data-anim="up">Steve Martin</h2>
            <p className="left-title" data-anim="up">Gobiya Leadership</p>
            
            <a 
              href="https://www.linkedin.com/in/stevemartingobiya/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary w-full max-w-[300px] magnetic"
              data-anim="up"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="meta-list" data-anim="stagger">
              <div className="meta-item" data-anim-child>
                <Award className="w-4 h-4" />
                <span>Glendale Career College (1996)</span>
              </div>
              <div className="meta-item" data-anim-child>
                <ShieldCheck className="w-4 h-4" />
                <span>25+ Years Search Engineering</span>
              </div>
              <div className="meta-item" data-anim-child>
                <Code className="w-4 h-4" />
                <span>React, Supabase, & AI Integrations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience and Credentials */}
          <div className="right-col">
            <h2 data-anim="up">About & Credentials</h2>
            <p className="bio-text" data-anim="up">
              Steve Martin is a hands-on SEO and digital marketing specialist who builds the websites and tools. With over 25 years of experience helping contractors, dental and medical practices, real estate, and SaaS startups grow, he bridges the gap between clean engineering and organic search traffic.
            </p>
            <p className="bio-text" data-anim="up">
              Currently focused on schema and entity optimization for AI search results (ChatGPT, Perplexity, Google AI Overviews), modern React/Vite builds, and AI-powered lead generation systems. Steve is looking for a full-time in-house role where he can ship.
            </p>

            <h3 data-anim="up">
              <Compass className="w-5 h-5" /> Core Skills
            </h3>
            <div className="skills-grid" data-anim="stagger">
              {[
                { title: 'SEO for the AI Era', desc: 'Schema markup, entity optimization, structured data for AI Overviews and LLM citation, technical SEO, local SEO, GBP, and update recovery.' },
                { title: 'Web Development & Design', desc: 'Custom React & Vite engineering, Tailwind CSS, Supabase, WordPress, Webflow, and high-performance layouts.' },
                { title: 'AI & Automation Systems', desc: 'AI-powered chat assistants, native CRM builds, business lead scrapers, automated email drips, and prompt engineering.' },
                { title: 'Paid Media (PPC)', desc: 'ROAS-driven ad campaign management across Google, Bing, Meta, and Yelp with monthly budgets up to $15K.' },
                { title: 'Digital PR & Link Building', desc: 'HARO, Featured, Qwoted, Reddit, and community-driven authority building link strategies.' },
                { title: 'Analytics & Search Tools', desc: 'Data audits and traffic resolving via Google Analytics, Search Console, SEMrush, and Ahrefs.' }
              ].map((skill) => (
                <div key={skill.title} className="skill-card animate-skill-card" data-anim-child>
                  <h4>{skill.title}</h4>
                  <p>{skill.desc}</p>
                </div>
              ))}
            </div>

            {/* Podcast Section */}
            <div className="podcast-section" data-anim="up">
              <h3>
                <Award className="w-5 h-5" /> Featured Podcast Episode
              </h3>
              <div className="podcast-card">
                <h4>Winning with Generative Engine Optimization (GEO)</h4>
                <p>
                  Listen to Steve Martin discuss how generative engine citations work, key entity verification datasets, and why traditional B2B search signals are changing in the era of ChatGPT, Claude, and Perplexity.
                </p>
                <audio controls>
                  <source src="/audio/Winning_with_generative_engine_optimization.m4a" type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>

            {/* Written Articles Section */}
            <h2 style={{ marginTop: '4rem' }} data-anim="up">Articles Written by Steve Martin</h2>
            <div className="articles-list" data-anim="stagger">
              {articles.map((article) => (
                <div key={article.slug} className="article-row" data-anim-child>
                  <div className="article-img-wrap">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                    />
                  </div>
                  <div className="article-content">
                    <span className="article-cat">
                      {article.category}
                    </span>
                    <h3 className="article-title">
                      <a href={`/insights/${article.slug}`}>{article.title}</a>
                    </h3>
                    <p className="article-desc">
                      {article.description}
                    </p>
                    <div className="article-meta-bottom">
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

      <SiteFooter />
    </div>
  );
};

export default AuthorPage;
