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
              <a href="/">GOBIYA</a>
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
              When competing for visibility, generic SEO is no longer enough. GOBIYA delivers elite <strong>on page seo los angeles</strong> services engineered to optimize your website’s structural integrity, crawl budget, and entity relevance. By aligning on-page architecture directly with Google’s core updates and the retrieval layers of modern AI engines, we ensure your Los Angeles business commands search results. We clean up toxic redirect loops, resolve indexation conflicts, build structured JSON-LD schemas, and implement conversion architecture that turns raw search volume into predictable pipeline revenue.
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

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="onpage-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2>Secure your forensic pipeline audit.</h2>
              <p>Let's map your entity structures, identify Core Web Vitals speed blocks, and review your current local search architecture with a live 1-on-1 strategy session.</p>
            </div>
            <div className="cta-right">
              <a href="/book" className="btn btn-primary">Book strategy call</a>
              <span className="subtext">CA / US opportunity audit</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
