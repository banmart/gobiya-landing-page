import React, { useEffect, useRef } from 'react';
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
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
      description: 'The technical mechanisms of content acquisition by AI engines, the Googlebot rendering divide, and how to fix JavaScript invisibility.'
    },
    {
      title: 'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026',
      slug: 'automated-b2b-sales-pipeline-seo',
      category: 'Strategy',
      readTime: '12 min read',
      date: 'May 25, 2026',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      description: 'How AI-cited content qualifies B2B vendors for buyer shortlists — and what the 2026 shift to AI-driven research means for your pipeline.'
    },
    {
      title: 'Automated Lead Generation SEO: How AI Pre-Qualifies Your Pipeline in 2026',
      slug: 'automated-lead-generation-seo',
      category: 'Strategy',
      readTime: '13 min read',
      date: 'May 25, 2026',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
      description: 'How AI-cited content produces pre-qualified pipeline at conversion rates traditional lead gen cannot match — and what the 2026 shift means for B2B teams.'
    },
    {
      title: 'Outbound SEO Prospecting: Timing-Anchored Outreach Powered by Intent Signals in 2026',
      slug: 'outbound-seo-prospecting',
      category: 'Strategy',
      readTime: '12 min read',
      date: 'May 25, 2026',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
      description: 'How SEO-derived intent signals turn outbound from a volume game into a timing game — and what the 2026 data says about cold vs signal-anchored prospecting.'
    }
  ];

  return (
    <div ref={containerRef} className="author-page">
      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: '13rem 5vw 5rem', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', display: 'block', marginBottom: '0.75rem' }}>
          Gobiya / Leadership &amp; Engineering
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', marginBottom: '1rem' }}>
          Steve Martin
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563' }}>
          Founder, Lead Developer &amp; Marketer at GOBIYA
        </p>
      </section>

      {/* ── STRUCTURED DATA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Steve Martin",
            "jobTitle": "Founder, Lead Developer & Marketer",
            "worksFor": {
              "@type": "Organization",
              "name": "Gobiya",
              "url": "https://www.gobiya.com"
            },
            "url": "https://www.gobiya.com/about/steve-martin",
            "image": "https://www.gobiya.com/images/steve-portrait.webp",
            "sameAs": ["https://www.linkedin.com/in/stevemartingobiya/"],
            "knowsAbout": ["Search Engine Optimization", "Generative Engine Optimization", "B2B Marketing", "React", "Schema Markup", "Local SEO", "Pipeline Attribution"],
            "description": "Steve Martin is the founder of Gobiya with 25+ years of search engineering experience. He specializes in entity-based SEO, AI search optimization, and B2B pipeline attribution."
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who is Steve Martin at Gobiya?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Steve Martin is the founder of Gobiya and its lead developer and marketer, with 25+ years of search engineering experience. He builds client websites and tools hands-on and specializes in entity-based SEO, Generative Engine Optimization (GEO), schema markup, and connecting organic search programs to CRM pipeline and closed-won revenue."
                }
              },
              {
                "@type": "Question",
                "name": "What is Steve Martin's SEO background and experience?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Steve Martin has 25+ years of search engineering experience working with contractors, dental and medical practices, real estate businesses, and SaaS startups. His current focus is schema and entity optimization for AI search results (ChatGPT, Perplexity, Google AI Overviews), React and Vite web development, and AI-powered lead generation and CRM automation systems."
                }
              },
              {
                "@type": "Question",
                "name": "What services does Steve Martin provide through Gobiya?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Through Gobiya, Steve Martin provides B2B SEO and pipeline attribution, entity-based schema markup and structured data implementation, Generative Engine Optimization (GEO) for AI search visibility, custom React and Vite web development, local SEO, Google Business Profile optimization, and AI-powered lead generation systems and CRM automation."
                }
              }
            ]
          })
        }}
      />

      {/* ── QUICK OVERVIEW ── */}
      <section style={{ background: '#f9fafb', padding: '4rem 5vw', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F26522', display: 'block', marginBottom: '1rem' }}>
            Quick Overview
          </span>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#374151', maxWidth: '780px', marginBottom: '2.5rem', fontWeight: 500 }}>
            Steve Martin is the founder of Gobiya and its lead developer — he builds the actual websites, tools, and automation systems hands-on. With over 25 years in search and digital marketing, he connects technical engineering and organic search directly to pipeline.
          </p>

          {/* 5 credential tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { n: '01', title: '25+ Years in Search Engineering', desc: 'Direct hands-on search engineering since 1999 across contractors, healthcare, SaaS, and e-commerce verticals.' },
              { n: '02', title: 'Entity & AI Search Specialist', desc: 'Schema markup, GEO, and structured data for Google AI Overviews, ChatGPT, and Perplexity citation optimization.' },
              { n: '03', title: 'React & Full-Stack Builder', desc: 'Builds custom React/Vite sites and Supabase-backed tools directly — no delegation to junior staff or offshore teams.' },
              { n: '04', title: 'B2B Pipeline Attribution', desc: 'Connects organic search programs to CRM pipeline and closed-won revenue — not just rankings or traffic volume.' },
              { n: '05', title: 'Multi-Industry Track Record', desc: 'SaaS startups, dental and medical practices, real estate agencies, contractors, and professional service firms.' },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ background: '#ffffff', border: '1px solid #e5e7eb', padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: '0.68rem', color: '#F26522', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', fontFamily: 'monospace' }}>{n}</p>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: '0.4rem' }}>{title}</p>
                <p style={{ fontSize: '0.83rem', color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ accordion */}
          <div style={{ maxWidth: '780px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '1.25rem' }}>Common questions about Steve Martin</p>
            {[
              {
                q: 'Who is Steve Martin at Gobiya?',
                a: 'Steve Martin is the founder of Gobiya and its lead developer and marketer. Unlike agency principals who delegate all technical work, Steve writes the code, implements the schema, configures the analytics, and runs the actual SEO programs he designs. He has 25+ years of search engineering experience across multiple industries and currently focuses on entity-based SEO and AI search optimization.'
              },
              {
                q: 'What industries has Steve Martin worked in?',
                a: 'Steve Martin has worked across SaaS startups, contractors and home services, dental and medical practices, real estate agencies, e-commerce businesses, and professional service firms. His current primary focus is B2B companies seeking to connect organic search programs to CRM pipeline and closed-won revenue rather than just traffic volume.'
              },
              {
                q: 'What is Steve Martin\'s current SEO specialization?',
                a: 'Steve Martin currently specializes in entity-based SEO for Google\'s Knowledge Graph, Generative Engine Optimization (GEO) for AI tools like ChatGPT and Perplexity, schema markup and structured data implementation, React and Vite web development for technical SEO, and AI-powered lead generation and CRM pipeline automation.'
              },
            ].map(({ q, a }, i) => (
              <details key={i} style={{ borderTop: '1px solid #e5e7eb' }}>
                <summary style={{ padding: '1rem 0', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: '#111827', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  {q}
                  <svg style={{ flexShrink: 0 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <p style={{ paddingBottom: '1rem', fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>{a}</p>
              </details>
            ))}
            <div style={{ borderTop: '1px solid #e5e7eb' }} />
          </div>
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
