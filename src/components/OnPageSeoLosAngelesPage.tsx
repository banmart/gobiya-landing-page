import React, { useEffect, useRef, useState } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import './OnPageSeoLosAngelesPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function OnPageSeoLosAngelesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  useEffect(() => {


    // Initial GSAP fade-in effect to body
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    // Staggered loading animations for page contents
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Nav scrolling header effect
        const navInner = document.getElementById('nav-inner');
        const burger = document.getElementById('burger');
        const mobileMenu = document.getElementById('mobile-menu');

        const handleBurgerClick = () => {
          if (!mobileMenu || !burger) return;
          const open = mobileMenu.classList.toggle('open');
          burger.classList.toggle('open', open);
          burger.setAttribute('aria-expanded', String(open));
        };

        if (burger) burger.addEventListener('click', handleBurgerClick);

        const handleScroll = () => {
          if (navInner) {
            navInner.classList.toggle('is-scrolled', window.scrollY > 40);
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Text reveal animations
        const ease = 'power3.out';
        const tl = gsap.timeline({ defaults: { ease, duration: 0.9 } });

        tl.from('.onpage-page .breadcrumb', { opacity: 0, y: 12 })
          .from('.onpage-page .hero h1 .line > span', { yPercent: 108, stagger: 0.06 }, '-=0.6')
          .from('.onpage-page .hero-sub', { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
          .from('.onpage-page .hero-actions', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
          .from('.onpage-page .hero-widget', { opacity: 0, scale: 0.98, y: 20, duration: 0.8 }, '-=0.5');

        // ScrollTrigger animations for capabilities grid
        gsap.from('.onpage-page .capabilities-grid .grid-card', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.onpage-page .capabilities-section',
            start: 'top 80%',
          }
        });

        // ScrollTrigger animations for checklist split
        gsap.from('.onpage-page .checklist-split', {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.onpage-page .checklist-section',
            start: 'top 80%',
          }
        });

        // ScrollTrigger animations for FAQ items
        gsap.from('.onpage-page .faq-item', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.onpage-page .faq-section',
            start: 'top 85%',
          }
        });

      }, containerRef);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const AUDIT_STEPS = [
    {
      title: "01. Canonical Consistency & Crawl Paths",
      short: "Resolve redirect chains, canonical tags, and 5xx crawl blocks.",
      detail: "Googlebot and AI crawlers rely on efficient crawl budgets. If your site serves competing trailing slashes, duplicate path schemas, or canonical forks, indexing engines dilute your link equity. We align absolute paths and optimize the crawl structure."
    },
    {
      title: "02. Semantic Schema & Entity Mapping",
      short: "Structured JSON-LD to declare company identity and capabilities.",
      detail: "AI search bots (like GPTBot, ClaudeBot, Perplexity) do not interpret content like traditional search engines; they map entities. We inject rich, contextual JSON-LD graphs detailing your services, founder credentials, and geographic coordinates."
    },
    {
      title: "03. Core Web Vitals & Hydration Speed",
      short: "Clean rendering architecture with sub-second page loads.",
      detail: "Slow loading speeds kill search rankings and user conversions alike. We replace bloated content builders with custom, hand-coded React setups, securing 100/100 Core Web Vitals and preventing layout shifts during browser hydration."
    },
    {
      title: "04. Intent-Aligned Content Mapping",
      short: "Writing for the 5% active B2B buying window.",
      detail: "Instead of generic traffic volume, we structure pages around commercial intent keywords. Your on-page layout is designed to answer specific technical bottlenecks, moving organic visitors quickly to calls, bookings, or inquiries."
    }
  ];

  return (
    <div className="onpage-page" ref={containerRef}>
      <SiteHeader />

      {/* Hero Section */}
      <section className="hero">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          
          <div className="hero-copy">
            <nav className="breadcrumb">
              <a href="/">Gobiya</a>
              <i>›</i>
              <span>Capabilities</span>
              <i>›</i>
              <span>On-Page SEO</span>
            </nav>

            <h1>
              <span className="line"><span>On-Page SEO</span></span>
              <span className="line"><span className="accent">Los Angeles.</span></span>
            </h1>

            <p className="hero-sub">
              When competing for visibility, generic SEO is no longer enough. Gobiya delivers elite <strong>on page seo los angeles</strong> services engineered to optimize your website’s structural integrity, crawl budget, and entity relevance. By aligning on-page architecture directly with Google’s core updates and the retrieval layers of modern AI engines, we ensure your Los Angeles business commands search results. We clean up toxic redirect loops, resolve indexation conflicts, build structured JSON-LD schemas, and implement conversion architecture that turns raw search volume into predictable pipeline revenue.
            </p>

            <div className="hero-actions">
              <a href="/book" className="btn btn-primary">Book forensic audit</a>
              <a href="/case-studies" className="btn btn-ghost">View case studies</a>
            </div>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Focus</span>
                <span className="val">Topical Authority &amp; Speed</span>
              </div>
              <div className="spec-item">
                <span className="label">Engines</span>
                <span className="val">Google &amp; AI-native retrieval</span>
              </div>
              <div className="spec-item">
                <span className="label">Delivery</span>
                <span className="val">Direct code-level fixes</span>
              </div>
            </div>
          </div>

          <div className="hero-widget">
            <div className="widget-card">
              <div className="widget-head">
                <span className="dot" />
                <span>live-audit-simulator.log</span>
              </div>
              <div className="widget-body">
                <div className="log-line success">[OK] Initializing Gobiya On-Page Crawl Engine v2.6...</div>
                <div className="log-line">[SCANNING] Checking domain: www.gobiya.com</div>
                <div className="log-line warn">[WARNING] Found 3 duplicate canonical forks (/about vs /about/)</div>
                <div className="log-line warn">[WARNING] Redirect loop detected in legacy /locations/ endpoints</div>
                <div className="log-line info">[INFO] Missing structural Person JSON-LD entity graph on author page</div>
                <div className="log-line success">[FIXED] Relative paths normalized to absolute SSL targets</div>
                <div className="log-line success">[FIXED] Schema graph injected dynamically into SSR head</div>
                <div className="log-line success">[DOM COMPLETE] Core Web Vitals hydrated in 280ms (sub-second threshold met)</div>
                <div className="log-line-final">Crawl complete: 100/100 search health verified.</div>
              </div>
              <div className="widget-foot">
                <span>BBB A+ Rating</span>
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ SCHEMA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is on-page SEO?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "On-page SEO is the practice of optimizing the elements within a web page itself — including HTML structure, title tags, meta descriptions, heading hierarchy, internal links, schema markup, content depth, page speed, and Core Web Vitals — to make pages more understandable and rankable by both search engines and AI crawlers. Unlike off-page SEO (backlinks), on-page SEO is entirely within a business's direct control."
                }
              },
              {
                "@type": "Question",
                "name": "What does on-page SEO include for Los Angeles businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For Los Angeles businesses, on-page SEO includes: crawl budget optimization and redirect chain cleanup, JSON-LD schema markup for LocalBusiness, services, and founder authority, Core Web Vitals optimization (LCP, INP, CLS), localized content architecture with neighborhood and city-specific landing pages, entity-based heading and content structure aligned to Google's Knowledge Graph, and conversion architecture that connects search traffic to pipeline inquiries."
                }
              },
              {
                "@type": "Question",
                "name": "How long does on-page SEO take to show results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "On-page SEO improvements typically produce measurable ranking changes within 30–90 days. Technical fixes (redirect cleanup, canonical corrections, schema implementation) can show results within 2–4 weeks as Google recrawls updated pages. Content depth improvements and entity optimization take 60–90 days to accumulate authority signals. Core Web Vitals improvements can produce ranking changes within 1–3 crawl cycles after implementation."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Gobiya's on-page SEO different for Los Angeles companies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gobiya's on-page SEO is engineering-led — changes are implemented directly in code, not through plugins or page builders. This means faster rendering, cleaner semantic structure, and precise schema implementation that consumer-grade plugins cannot produce. Every on-page fix is also validated against AI crawler requirements, not just Google's traditional Googlebot, ensuring content is discoverable in both standard search and AI Overviews."
                }
              }
            ]
          })
        }}
      />

      {/* ── QUERY ANSWER + KEY INFO ── */}
      <section style={{ background: '#f9fafb', padding: '3.5rem 5vw', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Quick Answer */}
          <div style={{ borderLeft: '4px solid #F26522', padding: '1.25rem 1.5rem', background: '#fff', marginBottom: '2.5rem', maxWidth: '780px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F26522', marginBottom: '0.5rem' }}>Quick Answer</p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#111827', fontWeight: 500 }}>On-page SEO for Los Angeles businesses requires engineering-level fixes — not just content tweaks. Redirect cleanup, entity schema, Core Web Vitals, and AI crawler compatibility are the four pillars that separate ranking pages from invisible ones.</p>
          </div>

          {/* Key deliverables */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { n: '01', title: 'Crawl & Redirect Audit', desc: 'Trace server logs, eliminate redirect chains, fix canonical conflicts, and restore crawl budget to revenue-critical pages.' },
              { n: '02', title: 'Schema & Entity Markup', desc: 'Custom JSON-LD for LocalBusiness, services, founders, and case studies — structured for Knowledge Graph and AI retrieval.' },
              { n: '03', title: 'Core Web Vitals', desc: 'LCP, INP, and CLS optimization via image format upgrades, render-blocking script elimination, and template rewrites.' },
              { n: '04', title: 'Content Architecture', desc: 'Entity-based heading structure, topical depth, and internal link architecture aligned to Google\'s semantic ranking model.' },
              { n: '05', title: 'AI Crawler Compatibility', desc: 'Server-rendered HTML delivered before JS executes — ensuring content is visible to GPTBot, ClaudeBot, and Perplexity crawlers.' },
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
            <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '1.25rem' }}>Common questions about on-page SEO in Los Angeles</p>
            {[
              {
                q: 'What is on-page SEO and why does it matter?',
                a: 'On-page SEO is the optimization of everything within a page itself: HTML structure, title and meta tags, heading hierarchy, schema markup, content depth, internal links, page speed, and Core Web Vitals. Unlike off-page SEO (backlinks), every on-page factor is entirely within your control. In 2026, on-page quality is also the primary determinant of whether your content is cited by AI search tools like Google AI Mode, ChatGPT, and Perplexity.'
              },
              {
                q: 'How is Gobiya\'s on-page SEO different from standard SEO agencies?',
                a: 'Gobiya implements on-page SEO directly in code rather than through plugins or bulk page-builders. This produces cleaner semantic structure, faster rendering, and more precise schema implementation than consumer-grade tools can achieve. Every fix is also validated against AI crawler requirements — not just traditional Googlebot — ensuring visibility in both standard search results and AI Overviews.'
              },
              {
                q: 'How long does on-page SEO take to show results in Los Angeles?',
                a: 'Technical on-page fixes (redirect cleanup, canonical corrections, schema) typically produce measurable rank changes within 2–4 weeks as Google recrawls updated pages. Content depth and entity optimization take 60–90 days. Core Web Vitals improvements show ranking impact within 1–3 crawl cycles after implementation. The exact timeline depends on how frequently Google crawls the site, which is itself influenced by how active and authoritative the domain is.'
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

      {/* Capabilities / Bento Section */}
      <section className="capabilities-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Engineered Solutions</span>
            <h2>Our On-Page SEO Capabilities</h2>
            <p>We work directly inside your code. No plugins, no bulk page-builders, just clean, high-performance semantic optimization.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>Crawl Budget &amp; Redirect Audits</h3>
              <p>We trace server log files, clean up multi-hop redirect chains, and eliminate crawl loops to ensure Googlebot and AI crawlers index critical revenue pages efficiently without getting blocked.</p>
            </div>
            
            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Structured Entity Graphing</h3>
              <p>We design custom JSON-LD schema integrations for local coordinates, services, founder authority, and case studies, converting raw content into structured machine-readable knowledge graph entities.</p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>Core Web Vitals Optimization</h3>
              <p>We rewrite page templates, optimize image formats (converting to WebP/AVIF), eliminate unused render-blocking JavaScript, and secure near-perfect 100/100 Core Web Vitals rankings.</p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Conversion Architecture</h3>
              <p>Getting traffic is only half the battle. We optimize call-to-actions, map content layouts to user intent levels, and hook forms directly to native databases and email APIs to increase inquiry rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Checklist Section */}
      <section className="checklist-section">
        <div className="onpage-container">
          <div className="checklist-split">
            <div className="checklist-left">
              <span className="mono-tag">Action Checklist</span>
              <h2>How We Audit On-Page Code</h2>
              <p>Explore the diagnostic sequence we execute on every project to restore lost organic search traffic and establish long-term ranking stability.</p>
              
              <div className="checklist-buttons">
                {AUDIT_STEPS.map((step, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    className={`checklist-btn ${activeChecklist === idx ? 'active' : ''}`}
                    onClick={() => setActiveChecklist(idx)}
                  >
                    <span>{step.title}</span>
                    <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="checklist-right">
              <div className="checklist-card">
                <div className="card-head">
                  <span>checklist-item-details.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta">
                    Request this audit on your website
                    <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>What is the difference between template SEO and code-level SEO?</h4>
              <p>Template SEO relies on CMS plugins (like Yoast or RankMath) to change titles and descriptions, but ignores slow rendering, bloated scripts, canonical splits, and broken schema chains. Code-level SEO optimizes your actual backend structure, HTML layout, and server response scripts directly.</p>
            </div>

            <div className="faq-item">
              <h4>Why was my website cited on AI search (GEO) and then dropped?</h4>
              <p>AI models periodically refresh their parametric training data and citations. If your brand entity lacks consistent structured mapping across Wikipedia, Wikidata, and semantic schema markup, the LLM retrieval algorithms may drop your site's references. Consistent on-page entity alignment stabilizes your visibility.</p>
            </div>

            <div className="faq-item">
              <h4>How long does it take to see results from on-page technical fixes?</h4>
              <p>Unlike off-page ranking signals, on-page code fixes are immediate. Once search crawlers recrawl and re-evaluate your updated absolute paths, schema scripts, and speed, rankings and Core Web Vitals metrics typically shift in 3 to 14 days.</p>
            </div>

            <div className="faq-item">
              <h4>Do you work with WordPress, Webflow, Shopify, or custom React/Next.js?</h4>
              <p>Yes. While we build our premium applications in React/Next.js, we execute code-level audits and modifications on WordPress, Shopify, Webflow, custom PHP, and any HTML5-based web framework.</p>
            </div>
          </div>
        </div>
      </section>



      <SiteFooter />
    </div>
  );
}
