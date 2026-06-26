import React, { useEffect, useRef, useState } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import './OnPageSeoLosAngelesPage.css';

gsap.registerPlugin(ScrollTrigger);

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — SEO Company Encino",
      "url": "https://www.gobiya.com/seo-company-encino",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "Technical SEO company serving Encino and the San Fernando Valley. We engineer Google visibility, AI citations, and organic pipeline systems for businesses on Ventura Boulevard and throughout the 91316 market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Encino", "sameAs": "https://www.wikidata.org/wiki/Q678774" },
        { "@type": "City", "name": "Sherman Oaks", "sameAs": "https://www.wikidata.org/wiki/Q2272430" },
        { "@type": "City", "name": "Tarzana", "sameAs": "https://www.wikidata.org/wiki/Q2454060" },
        { "@type": "City", "name": "Woodland Hills", "sameAs": "https://www.wikidata.org/wiki/Q2010869" },
        { "@type": "AdministrativeArea", "name": "San Fernando Valley", "sameAs": "https://www.wikidata.org/wiki/Q857765" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/in/stevemartingobiya/",
        "https://m.yelp.com/biz/gobiya-los-angeles-5"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an SEO company?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An SEO company improves a business's visibility in Google and other search engines through technical optimization, content architecture, and authority building. The work covers three distinct layers: technical (crawl efficiency, site speed, structured data, canonical structure), on-page (keyword targeting, content architecture, entity mapping), and off-page (link acquisition, citation building, brand entity verification). A legitimate SEO company for an Encino business has one purpose: generating qualified organic traffic that converts into revenue — not impressions, not rankings for irrelevant terms, pipeline."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the biggest SEO companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The largest SEO companies by headcount include Conductor, BrightEdge, Ignite Visibility, and Searchmetrics. Enterprise agency networks like WPP and Publicis have large embedded SEO practices. However, size and SEO performance have a weak correlation. The firms that produce the strongest technical results for regional businesses like those in Encino are typically boutique engineering-focused practices — not large nationals running accounts through junior coordinators. Enterprise agencies allocate most of their billing to account management, not execution."
          }
        },
        {
          "@type": "Question",
          "name": "How much do SEO services cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SEO services range from $500/month for basic local management to $15,000+/month for technical enterprise programs. For Encino businesses in competitive categories — legal, financial services, medical, real estate — a results-producing program realistically runs $2,500–$6,000/month covering technical audits, content development, schema and entity work, and ongoing optimization. Programs below $1,500/month for competitive Ventura Boulevard categories almost universally lack the engineering depth to move rankings. The ROI frame is more useful: a program generating two additional qualified leads per month in a $5,000+ service category pays for itself before month two."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an SEO company?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You need an SEO company if organic search is a viable customer acquisition channel that you are not currently capturing. For most Encino businesses on Ventura Boulevard — dental, legal, financial advisory, medical, real estate, professional services — organic search is the highest-intent, lowest-cost-per-acquisition channel available. Buyers who find you via Google are already looking for what you offer. The question is whether they find you or a competitor. If your revenue targets require consistent new customer acquisition and you are not currently capturing significant organic search traffic in Encino, a systematic SEO program is not optional."
          }
        }
      ]
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Technical Crawl Audit & Architecture Fix",
    short: "Resolve canonical issues, crawl blocks, and redirect chains.",
    detail: "Most Encino business websites have technical SEO problems they are not aware of — duplicate canonicals, blocked JavaScript rendering, slow server response times, broken internal link structures. These issues suppress rankings invisibly. We run a full crawl audit using server log analysis and screaming frog crawl data, isolate every technical barrier Googlebot encounters, and execute direct code-level fixes. Not plugin recommendations — actual fixes in the codebase."
  },
  {
    title: "02. Keyword Architecture & Intent Mapping",
    short: "Map commercial intent clusters to your Encino market and buyer stages.",
    detail: "Generic keyword research produces traffic that does not convert. For Encino professional services and B2B businesses, the commercial queries that produce revenue are typically low-volume, high-specificity terms — 'estate attorney Encino,' 'financial advisor Ventura Boulevard,' 'dental implants 91316.' We build a keyword architecture organized by buyer intent stage and buying committee role, so every page on your site targets a specific query type with a specific conversion action. This is the foundation of a program that generates pipeline, not just visits."
  },
  {
    title: "03. On-Page Optimization & Schema Injection",
    short: "Align page architecture, entity markup, and content to target queries.",
    detail: "On-page optimization at the technical level means more than title tags and meta descriptions. We align heading structure, internal linking, semantic entity density, and structured data across every target page — and we inject LocalBusiness, Service, and FAQPage JSON-LD schema server-side so Google and AI engines can parse your entity graph without rendering JavaScript. For Encino businesses targeting local commercial queries, the schema layer is often the difference between ranking in position 4–7 and ranking in the Map Pack."
  },
  {
    title: "04. Authority Building & Off-Page Signals",
    short: "Acquire Encino-relevant links and citations that build domain authority.",
    detail: "Domain authority in the San Fernando Valley market is built through a specific hierarchy: local citations from Encino Chamber of Commerce and LA County business directories, industry-vertical links from trade publications and association sites, and editorial mentions from regional news and professional networks. We do not use link farms, private blog networks, or scaled outreach that violates Google's link spam policies. Every link we build for Encino clients is a signal that survives algorithm updates."
  }
];

export default function SeoCompanyEncinoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  useEffect(() => {
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
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
          if (navInner) navInner.classList.toggle('is-scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const ease = 'power3.out';
        const tl = gsap.timeline({ defaults: { ease, duration: 0.9 } });
        tl.from('.onpage-page .breadcrumb', { opacity: 0, y: 12 })
          .from('.onpage-page .hero h1 .line > span', { yPercent: 108, stagger: 0.06 }, '-=0.6')
          .from('.onpage-page .hero-sub', { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
          .from('.onpage-page .hero-actions', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
          .from('.onpage-page .hero-widget', { opacity: 0, scale: 0.98, y: 20, duration: 0.8 }, '-=0.5');

        gsap.from('.onpage-page .capabilities-grid .grid-card', {
          opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.onpage-page .capabilities-section', start: 'top 80%' }
        });

        gsap.from('.onpage-page .checklist-split', {
          opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.onpage-page .checklist-section', start: 'top 80%' }
        });

        gsap.from('.onpage-page .faq-item', {
          opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.onpage-page .faq-section', start: 'top 85%' }
        });
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="onpage-page" ref={containerRef}>
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* ── HERO ── */}
      <section className="hero">
        <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">

          <div className="hero-copy">
            <nav className="breadcrumb">
              <a href="/">Gobiya</a>
              <i>›</i>
              <a href="/performance/seo-discoverability-agency">SEO &amp; Discoverability</a>
              <i>›</i>
              <span>Encino</span>
            </nav>

            <h1>
              <span className="line"><span>SEO Company</span></span>
              <span className="line"><span className="accent">Encino.</span></span>
            </h1>

            <p className="hero-sub">
              An SEO company in Encino should do one thing well: generate consistent, qualified pipeline from organic search — not just traffic. The Ventura Boulevard corridor and San Fernando Valley business market runs on referrals and reputation, but the businesses growing fastest in Encino have added organic search and AI citation visibility to that foundation. We are a technical SEO company serving Encino, Tarzana, Sherman Oaks, and the broader Valley market — engineering the ranking architecture, entity graphs, and content systems that turn search into predictable revenue. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability system</a> has operated in this market since 2012.
            </p>

            <div className="hero-actions">
              <a href="/book" className="btn btn-primary">Book Encino SEO audit</a>
              <a href="/case-studies" className="btn btn-ghost">View results</a>
            </div>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Market</span>
                <span className="val">Encino, CA · San Fernando Valley</span>
              </div>
              <div className="spec-item">
                <span className="label">Focus</span>
                <span className="val">Technical SEO &amp; Organic Pipeline</span>
              </div>
              <div className="spec-item">
                <span className="label">Category</span>
                <span className="val">SEO &amp; Discoverability</span>
              </div>
            </div>
          </div>

          <div className="hero-widget">
            <div className="widget-card">
              <div className="widget-head">
                <span className="dot" />
                <span>encino-seo-audit.log</span>
              </div>
              <div className="widget-body">
                <div className="log-line success">[OK] Initializing Gobiya SEO Engine — Encino v3.1...</div>
                <div className="log-line">[SCANNING] Target market: Encino, CA 91316</div>
                <div className="log-line">[SCANNING] Organic visibility gap analysis running...</div>
                <div className="log-line warn">[WARNING] Target keyword cluster: 0 top-10 rankings detected</div>
                <div className="log-line warn">[WARNING] Technical crawl: 14 pages blocked by canonical conflicts</div>
                <div className="log-line warn">[WARNING] Schema coverage: missing on 8 of 12 key service pages</div>
                <div className="log-line info">[INFO] 31 commercial intent queries — zero current visibility</div>
                <div className="log-line info">[INFO] 3 Ventura Blvd competitors occupying top-3 positions</div>
                <div className="log-line success">[FIXED] Canonical structure corrected, crawl budget reallocated</div>
                <div className="log-line success">[FIXED] Service page schema deployed — LocalBusiness + Service entities</div>
                <div className="log-line-final">Encino SEO pipeline active — est. first rankings: 60–90 days.</div>
              </div>
              <div className="widget-foot">
                <span>Encino, CA 91316</span>
                <span>Technical SEO · Pipeline · GEO</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── ENCINO MARKET CONTEXT ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Market Intelligence</span>
            <h2>Why Encino Businesses Need a Technical SEO Company, Not a Generic Agency</h2>
            <p>
              Encino's business profile — affluent residential catchment, Ventura Boulevard commercial density, strong professional services sector — creates specific SEO dynamics that generic template-based agencies consistently misread.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Ventura Boulevard</div>
              <h3>The Valley's Most Competitive Commercial Corridor</h3>
              <p>
                The stretch of Ventura Boulevard running through Encino is one of the highest-density concentrations of professional services in the San Fernando Valley. Attorneys, financial advisors, medical practices, dental offices, and real estate firms all compete for the same high-intent local queries. Every category has at least four to six established competitors with domain histories stretching back 10+ years. Outranking them requires more than a title tag audit — it requires rebuilding your technical authority from the crawl layer up.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Buyer Profile</div>
              <h3>High-Value Buyers Who Research Before They Call</h3>
              <p>
                Encino's median household income is among the highest in the San Fernando Valley — which means the buyers searching for services here are research-oriented, comparison-driven, and hard to win on price alone. They read the first three search results, check reviews, and look for authority signals before picking up the phone. An SEO company that delivers surface-level rankings without the content depth and trust signals to convert that traffic is billing you for visibility you cannot monetize. Our <a href="/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue" style={{color:'var(--green)'}}>B2B revenue guide</a> covers this conversion architecture in detail.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Competition Pattern</div>
              <h3>Adjacent Markets Create Search Cannibalization</h3>
              <p>
                Sherman Oaks, Studio City, Tarzana, and Woodland Hills all have competing businesses targeting the same Ventura Blvd queries. Without a deliberate geographic content strategy, Encino businesses often find their rankings diluted by adjacent competitors whose pages target overlapping service areas. We structure service area pages, LocalBusiness schema, and internal link architecture to establish clear geographic authority for Encino without creating the cannibalization issues that come from sloppy multi-location page strategies. See our <a href="/insights/multi-location-seo-website-structure" style={{color:'var(--green)'}}>multi-location SEO structure guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">The Real Gap</div>
              <h3>Most Encino Businesses Have Never Had Real Technical SEO</h3>
              <p>
                The majority of Encino businesses that come to us have had SEO in some form before — a marketing agency that "handled SEO" as a line item, a freelancer running Semrush reports, a web developer who installed Yoast. None of those approaches touch the actual technical and entity-level work that moves rankings in a competitive local market. When we run an initial audit, we routinely find canonical split conflicts, missing schema, crawl budget waste on low-value pagination, and zero entity verification across Google's knowledge systems. The work has not been done. That is the gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="capabilities-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">What We Do</span>
            <h2>SEO Services for Encino Businesses</h2>
            <p>
              Four engineering layers that form a complete SEO system — built for the Encino and San Fernando Valley market, delivered without the bloat of a large agency model.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>Technical SEO Engineering</h3>
              <p>
                Technical SEO is the foundation every other SEO investment depends on. If Googlebot cannot crawl your site efficiently, if your pages have canonical conflicts, if your JavaScript rendering blocks indexation — no amount of content or link building recovers those losses. We execute code-level technical fixes: redirect chain resolution, server-side schema injection, Core Web Vitals optimization, crawl budget allocation, and structured data alignment. Not recommendations documents — actual changes to the code. For Encino businesses on older CMS platforms, this layer alone typically produces ranking movement within 30–45 days.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Content Architecture &amp; Topical Authority</h3>
              <p>
                Topical authority is how Google decides which site deserves to rank for a category of queries — and it is built through a structured hub-and-spoke content architecture, not random blog posts. For an Encino law firm, that means a legal practice area hub with deep supporting content for each specialization. For a medical practice, it means condition and procedure pages with clinical depth. We map the full content architecture, identify topical gaps your competitors have not covered, and build the content structure that signals comprehensive subject-matter authority to Google. The methodology is detailed in our <a href="/insights/b2b-organic-traffic-growth" style={{color:'var(--green)'}}>B2B organic traffic growth guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>AI Citation Engineering (GEO)</h3>
              <p>
                A growing share of service discovery now begins on ChatGPT, Gemini, and Perplexity rather than Google — particularly for high-consideration purchases like legal, financial, and medical services where buyers ask conversational questions before searching for a specific firm. We apply <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)'}}>Generative Engine Optimization (GEO)</a> — structuring your Encino service pages with claim-evidence-citation formatting, FAQ schema, and entity verification that AI engines cite when answering buyer queries. This creates a second organic acquisition channel that most Encino competitors have not touched.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Pipeline Attribution &amp; Reporting</h3>
              <p>
                SEO reporting that stops at rankings and traffic is not useful to an Encino business owner trying to justify a monthly investment. We build reporting around pipeline metrics: qualified form submissions, tracked phone calls from organic search, revenue attributed to organic acquisition, and cost-per-lead comparisons against paid channels. When you can see that organic search is generating five qualified leads per month at $280 cost per lead versus $1,200 per lead from Google Ads, the SEO budget conversation changes entirely. Our <a href="/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue" style={{color:'var(--green)'}}>B2B pipeline revenue guide</a> details the attribution model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHECKLIST ── */}
      <section className="checklist-section">
        <div className="onpage-container">
          <div className="checklist-split">
            <div className="checklist-left">
              <span className="mono-tag">Engagement Sequence</span>
              <h2>How We Run an Encino SEO Engagement</h2>
              <p>
                The four-step sequence from initial technical audit to authority deployment — what we do, in what order, and why it matters for Encino's competitive market.
              </p>

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
                  <span>encino-seo-protocol.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta">
                    Run this audit on your Encino business
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

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">People Also Ask</span>
            <h2>SEO Company Questions, Answered Directly</h2>
            <p>The questions Encino business owners ask before engaging an SEO company — answered without the agency spin.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>What is an SEO company?</h2>
              <p>
                An SEO company improves a business's visibility in Google and other search engines through technical optimization, content architecture, and authority building. The work covers three distinct layers: technical (crawl efficiency, site speed, structured data, canonical structure), on-page (keyword targeting, content architecture, entity mapping), and off-page (link acquisition, citation building, brand entity verification). A legitimate SEO company for an Encino business has one purpose: generating qualified organic traffic that converts into revenue — not impressions, not rankings for irrelevant terms, not vanity metric reports. The best way to evaluate any SEO company is to ask them to show revenue or lead attribution from past client work, not just keyword ranking charts. Our <a href="/insights/best-seo-agency-for-b2b-brands" style={{color:'var(--green)'}}>SEO agency evaluation checklist</a> covers exactly what to verify before signing a contract.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>Who are the biggest SEO companies?</h2>
              <p>
                The largest SEO companies by revenue and headcount include Conductor, BrightEdge, Ignite Visibility, Victorious, and WebFX. Enterprise agency networks like Publicis and WPP operate large embedded SEO practices. However, size and SEO performance have a weak correlation for regional and mid-market businesses. The firms producing the strongest technical results for Encino-scale clients tend to be boutique engineering practices, not national brands. The reason is structural: large agencies allocate the majority of their billing to account management, onboarding administration, and sales infrastructure — not to the technical engineering that actually moves rankings. Our <a href="/insights/gobiya-vs-enterprise-seo-agencies" style={{color:'var(--green)'}}>direct comparison with enterprise SEO agencies</a> covers this in detail, including where the budget actually goes in a typical agency retainer versus an engineering-focused engagement.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>How much do SEO services cost?</h2>
              <p>
                SEO services range from $500/month for basic local management to $15,000+/month for enterprise technical programs. For Encino businesses in competitive categories — legal, financial advisory, medical, dental, real estate — a program that actually moves rankings realistically runs $2,500–$6,000/month. That covers technical audits and fixes, content development, schema and entity work, and ongoing optimization. Programs below $1,500/month for competitive Ventura Boulevard categories almost universally lack the engineering depth to outperform established local competitors. The ROI frame matters more than the cost number: if your average customer lifetime value is $5,000 and the program generates two additional qualified leads per month, the program pays for itself in month one. Our <a href="/insights/b2b-seo-agency" style={{color:'var(--green)'}}>B2B SEO agency pipeline attribution guide</a> walks through the exact ROI model.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>Do I need an SEO company?</h2>
              <p>
                You need an SEO company if organic search is a viable customer acquisition channel that you are not currently capturing. For most Encino businesses on Ventura Boulevard — dental, legal, financial advisory, medical, real estate, professional services — organic search is the highest-intent, lowest-cost-per-acquisition channel available. Buyers who find you through Google search are already looking for your category of service. The only question is whether they find you or a competitor. If your revenue targets require consistent new customer acquisition and your site currently generates minimal organic traffic or leads, a systematic SEO program is not optional — it is a revenue infrastructure decision. The businesses on Ventura Boulevard holding positions one through three in their category have already made that decision. The businesses considering whether they need SEO are competing with them blind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLUSTER LINKS ── */}
      <section className="capabilities-section" style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">SEO &amp; Discoverability Cluster</span>
            <h2>Related Guides &amp; Services</h2>
            <p>Resources from our SEO &amp; Discoverability practice that directly support Encino businesses evaluating or scaling their organic search investment.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/seo-discoverability-agency" style={{color:'inherit',textDecoration:'none'}}>SEO &amp; Discoverability Agency</a></h3>
              <p>The parent service practice covering Technical SEO, GEO, AI citations, and organic pipeline engineering. Encino SEO is a specific market application of this full-stack system.</p>
              <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View practice →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/gobiya-vs-enterprise-seo-agencies" style={{color:'inherit',textDecoration:'none'}}>Gobiya vs. Enterprise SEO Agencies</a></h3>
              <p>An honest comparison covering where enterprise agency budgets actually go, what technical depth looks like at each price tier, and how to evaluate which type of firm matches your Encino growth stage.</p>
              <a href="/insights/gobiya-vs-enterprise-seo-agencies" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read comparison →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/best-seo-agency-for-b2b-brands" style={{color:'inherit',textDecoration:'none'}}>Best SEO Agency for B2B: Evaluation Checklist</a></h3>
              <p>The 12-point checklist for evaluating an SEO company before signing. Covers contract terms to avoid, case study verification, technical depth signals, and the questions every Encino business owner should ask before committing to a retainer.</p>
              <a href="/insights/best-seo-agency-for-b2b-brands" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read checklist →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue" style={{color:'inherit',textDecoration:'none'}}>How B2B Companies Use SEO to Scale Pipeline</a></h3>
              <p>How to connect search clusters to pipeline revenue, map content to the buying committee, and scale inbound conversions from organic search. The strategy framework behind our Encino SEO engagements.</p>
              <a href="/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="onpage-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2>Start Your Encino SEO Engagement</h2>
              <p>
                We run a 15-minute live technical session for Encino businesses — crawl audit, visibility gap analysis, competitor ranking review, and schema coverage check. No slides, no pitch deck. A direct read on where your organic search stands right now and what a realistic improvement timeline looks like for your specific Ventura Boulevard market.
              </p>
            </div>
            <div className="cta-right">
              <a href="/book" className="btn btn-primary">Book Encino SEO audit</a>
              <span className="subtext">15-min live session · Encino, CA · No commitment</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
