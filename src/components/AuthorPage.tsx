import React, { useEffect } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import { Linkedin, Award, Code, Compass, ShieldCheck } from 'lucide-react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import './AuthorPage.css';

interface AuthorPageProps {
  path: string;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ path }) => {
  // Update document title and description + schema
  useEffect(() => {
    document.title = "Steve Martin | CEO, Lead Developer & Marketer | GOBIYA";
    
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = 'Author profile and E-E-A-T credentials for Steve Martin, CEO, Lead Developer & Marketer at GOBIYA. Specialized in SEO, custom React engineering, and pipeline automation.';
    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);

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
    <div className="author-page">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="hero">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">GOBIYA</a><i>/</i>
            <a href="/company/about">Company</a><i>/</i>
            <span>Steve Martin Profile</span>
          </nav>
          
          <span className="hero-cat">
            Leadership & Engineering
          </span>
          <h1 className="display">
            Steve Martin
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
            <div className="avatar-wrap">
              <img 
                src="/images/steve-portrait.webp" 
                alt="Steve Martin - CEO, Lead Developer & Marketer" 
              />
            </div>
            <h2 className="left-name">Steve Martin</h2>
            <p className="left-title">Gobiya Leadership</p>
            
            <a 
              href="https://www.linkedin.com/in/stevemartingobiya/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary w-full max-w-[300px]"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="meta-list">
              <div className="meta-item">
                <Award className="w-4 h-4" />
                <span>Glendale Career College (1996)</span>
              </div>
              <div className="meta-item">
                <ShieldCheck className="w-4 h-4" />
                <span>25+ Years Search Engineering</span>
              </div>
              <div className="meta-item">
                <Code className="w-4 h-4" />
                <span>React, Supabase, & AI Integrations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience and Credentials */}
          <div className="right-col">
            <h2>About & Credentials</h2>
            <p className="bio-text">
              Steve Martin is a hands-on SEO and digital marketing specialist who builds the websites and tools. With over 25 years of experience helping contractors, dental and medical practices, real estate, and SaaS startups grow, he bridges the gap between clean engineering and organic search traffic.
            </p>
            <p className="bio-text">
              Currently focused on schema and entity optimization for AI search results (ChatGPT, Perplexity, Google AI Overviews), modern React/Vite builds, and AI-powered lead generation systems. Steve is looking for a full-time in-house role where he can ship.
            </p>

            <h3>
              <Compass className="w-5 h-5" /> Core Skills
            </h3>
            <div className="skills-grid">
              {[
                { title: 'SEO for the AI Era', desc: 'Schema markup, entity optimization, structured data for AI Overviews and LLM citation, technical SEO, local SEO, GBP, and update recovery.' },
                { title: 'Web Development & Design', desc: 'Custom React & Vite engineering, Tailwind CSS, Supabase, WordPress, Webflow, and high-performance layouts.' },
                { title: 'AI & Automation Systems', desc: 'AI-powered chat assistants, native CRM builds, business lead scrapers, automated email drips, and prompt engineering.' },
                { title: 'Paid Media (PPC)', desc: 'ROAS-driven ad campaign management across Google, Bing, Meta, and Yelp with monthly budgets up to $15K.' },
                { title: 'Digital PR & Link Building', desc: 'HARO, Featured, Qwoted, Reddit, and community-driven authority building link strategies.' },
                { title: 'Analytics & Search Tools', desc: 'Data audits and traffic resolving via Google Analytics, Search Console, SEMrush, and Ahrefs.' }
              ].map((skill) => (
                <div key={skill.title} className="skill-card">
                  <h4>{skill.title}</h4>
                  <p>{skill.desc}</p>
                </div>
              ))}
            </div>

            {/* Podcast Section */}
            <div className="podcast-section">
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
            <h2 style={{ marginTop: '4rem' }}>Articles Written by Steve Martin</h2>
            <div className="articles-list">
              {articles.map((article) => (
                <div key={article.slug} className="article-row">
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
