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
      "name": "Gobiya — Local SEO Glendale",
      "url": "https://www.gobiya.com/local-seo-glendale",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "Local SEO services for Glendale businesses. We engineer Google Map Pack dominance, GBP optimization, and citation authority for businesses on Brand Boulevard and throughout the Glendale, CA market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q182749" },
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q188539" },
        { "@type": "City", "name": "La Crescenta", "sameAs": "https://www.wikidata.org/wiki/Q1799048" },
        { "@type": "City", "name": "Montrose", "sameAs": "https://www.wikidata.org/wiki/Q2883042" }
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
          "name": "What is local SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Local SEO is the practice of optimizing a business's online presence to appear in geographically targeted search results — primarily the Google Map Pack (the three business listings above organic results) and the local organic results below it. For a Glendale business, local SEO means ranking when someone searches 'dentist in Glendale,' 'attorney Brand Boulevard,' or 'marketing agency near me.' The core ranking signals are Google Business Profile completeness, NAP consistency across directories, review volume and velocity, and local link authority."
          }
        },
        {
          "@type": "Question",
          "name": "Does local SEO still work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Local SEO is more valuable in 2026 than five years ago. 46% of all Google searches carry local intent. 76% of people who run a local search on mobile visit a business within 24 hours. The Google Map Pack captures a larger share of clicks than the #1 organic result for local intent queries. What has changed is competition — in markets like Glendale where Brand Boulevard hosts hundreds of competing businesses, only the brands that invest in entity authority, review velocity, and structured schema consistently win."
          }
        },
        {
          "@type": "Question",
          "name": "How much does local SEO cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Local SEO pricing ranges from $500/month for basic freelance management to $5,000+/month for technical entity-level engineering in competitive markets. For Glendale businesses in dental, legal, medical, or professional services, the ROI calculus is direct: if a local SEO campaign generates two additional qualified leads per month in a category with $3,000+ average customer value, the program pays for itself before month three."
          }
        },
        {
          "@type": "Question",
          "name": "How to create a local SEO strategy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A local SEO strategy for a Glendale business starts with four layers: (1) GBP optimization — complete your Google Business Profile with accurate categories, services, and photos; (2) NAP consistency — ensure your name, address, and phone are identical across every directory; (3) review velocity — generate 4–6 authentic reviews per month; (4) local content and schema — create location-specific pages structured with LocalBusiness JSON-LD. Competitive Glendale markets also require entity graph engineering and local link building from Glendale Chamber of Commerce and city-level directories."
          }
        }
      ]
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Google Business Profile Audit",
    short: "Correct categories, service areas, photos, and Q&A signals.",
    detail: "Your GBP is the primary ranking signal for Glendale Map Pack placement — and most profiles are misconfigured in ways that cost rankings invisibly. Wrong primary category. Inconsistent service areas. Missing products and services sections. Outdated hours. We do a forensic GBP review and correct every signal Google uses to evaluate relevance, prominence, and proximity for your target Glendale queries."
  },
  {
    title: "02. NAP Consistency & Citation Cleanup",
    short: "Align your name, address, and phone across 40+ directory sources.",
    detail: "NAP inconsistency is one of the most common reasons Glendale businesses underperform in local results despite good reviews and a strong GBP. If your business name appears as 'Acme LLC' on your website, 'Acme, LLC.' on Yelp, and 'Acme Limited' on Bing Places, Google's confidence in your entity decreases. We audit and correct your NAP signal across 40+ authoritative directories including Yelp, Apple Maps, Bing Places, Facebook, and industry-specific citation sources."
  },
  {
    title: "03. Review Velocity & Reputation Engineering",
    short: "Build a sustainable review generation system targeting 4–6 per month.",
    detail: "Review count, velocity, and recency are the three review signals Google weighs most heavily in local rankings. The competitive threshold in Glendale's professional services market is 4–6 new reviews per month to outpace competitors and stay current. We build review generation systems tied to your natural customer touchpoints — post-appointment follow-ups, QR codes at point of sale, and automated SMS/email sequences — without violating Google's review policies."
  },
  {
    title: "04. Local Schema & Entity Graph",
    short: "Inject LocalBusiness JSON-LD and build your Glendale entity footprint.",
    detail: "Google verifies local businesses through a combination of on-page structured data and off-page entity signals. We inject LocalBusiness JSON-LD schema with Glendale-specific coordinates, service areas, and opening hours directly into your site's server-rendered HTML. We then build the off-page entity footprint — Wikidata entry if applicable, structured citations in authoritative directories, and local link acquisition from Glendale Chamber of Commerce and adjacent city resources."
  }
];

export default function LocalSeoGlendalePage() {
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
              <a href="/">GOBIYA</a>
              <i>›</i>
              <a href="/performance/seo-discoverability-agency">SEO &amp; Discoverability</a>
              <i>›</i>
              <span>Glendale Local SEO</span>
            </nav>

            <h1>
              <span className="line"><span>Local SEO</span></span>
              <span className="line"><span className="accent">Glendale.</span></span>
            </h1>

            <p className="hero-sub">
              Local SEO Glendale means showing up in Google's Map Pack and organic results when buyers on Brand Boulevard and throughout the 91201–91210 market search for your services. Glendale is one of LA County's most competitive local search markets — the Americana at Brand corridor alone drives thousands of high-intent local queries every day, and the businesses that rank in the top three map positions capture the overwhelming majority of that traffic. We engineer the four signals that determine local rank: <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)'}}>Google Business Profile</a> authority, NAP citation consistency, review velocity, and local schema. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice</a> has served the Glendale market since 2012.
            </p>

            <div className="hero-actions">
              <a href="/book" className="btn btn-primary">Book Glendale SEO audit</a>
              <a href="/case-studies" className="btn btn-ghost">View results</a>
            </div>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Market</span>
                <span className="val">Glendale, CA 91201–91210</span>
              </div>
              <div className="spec-item">
                <span className="label">Focus</span>
                <span className="val">Map Pack, GBP &amp; Local Authority</span>
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
                <span>glendale-local-seo-audit.log</span>
              </div>
              <div className="widget-body">
                <div className="log-line success">[OK] Initializing Gobiya Local SEO Engine — Glendale v3.1...</div>
                <div className="log-line">[SCANNING] Target market: Glendale, CA 91203</div>
                <div className="log-line">[SCANNING] Google Business Profile signal check...</div>
                <div className="log-line warn">[WARNING] GBP primary category mismatch — ranking suppressed</div>
                <div className="log-line warn">[WARNING] NAP divergence: Yelp vs Google vs Apple Maps inconsistent</div>
                <div className="log-line warn">[WARNING] Review velocity: 1.1/month (competitive threshold is 4.5/month)</div>
                <div className="log-line info">[INFO] 23 high-intent Glendale queries with Map Pack visibility gaps</div>
                <div className="log-line info">[INFO] 3 direct Brand Blvd competitors averaging 80+ reviews</div>
                <div className="log-line success">[FIXED] GBP categories, service areas, and hours corrected</div>
                <div className="log-line success">[FIXED] NAP aligned across 40 directory sources</div>
                <div className="log-line-final">Map Pack pipeline active — estimated entry: 45–60 days.</div>
              </div>
              <div className="widget-foot">
                <span>Glendale, CA 91203</span>
                <span>Local SEO · GBP · Map Pack</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY GLENDALE IS A DISTINCT LOCAL SEO MARKET ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Market Intelligence</span>
            <h2>Why Glendale Local SEO Is a Different Problem</h2>
            <p>
              Glendale is not a suburb that follows generic local SEO playbooks. Its business geography, demographic concentration, and competitive density create a specific set of ranking dynamics that most agencies do not understand.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Brand Boulevard</div>
              <h3>The Highest-Density Retail Corridor in LA County</h3>
              <p>
                Brand Boulevard from Broadway to the Americana at Brand runs through one of the densest concentrations of retail, medical, legal, and professional services in Los Angeles County. Every business on that strip competes for the same local search queries — and the Map Pack only shows three. Winning requires more than a complete GBP: it requires a higher review score, more recent reviews, stronger citation authority, and more accurate entity data than every competitor within the serving radius.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Demographics</div>
              <h3>A Multilingual Market With Distinct Search Behavior</h3>
              <p>
                Glendale has the largest Armenian-American population outside Armenia, a substantial Korean-American business community, and a significant Hispanic population across the southern neighborhoods. These demographics search differently — in different languages, through different platforms, and with different proximity expectations. A local SEO strategy that ignores multilingual GBP content, non-English review signals, and platform diversity beyond Google (Naver, Yelp, Apple Maps) leaves material local visibility on the table.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Adjacent Markets</div>
              <h3>Burbank, La Cañada, and Pasadena Bleed Into Glendale Searches</h3>
              <p>
                Glendale's service area naturally extends into Burbank, La Crescenta, Montrose, and La Cañada Flintridge. Buyers in those communities regularly search for Glendale businesses, and Glendale businesses that structure their service area data correctly in Google Business Profile and schema markup capture that adjacent demand. Incorrectly configured service areas silently exclude thousands of relevant monthly searches. We set these boundaries precisely. For multi-location expansion context, see our <a href="/insights/multi-location-seo-website-structure" style={{color:'var(--green)'}}>multi-location SEO guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Results</div>
              <h3>312% Map Pack Call Growth for a Glendale Services Firm</h3>
              <p>
                One of our Glendale professional services clients saw a 312% increase in local map-pack phone calls and B2B consultations after we restructured their local entity graph, corrected NAP across 40+ sources, and secured high-authority citations from Glendale-specific directories. The work took 90 days. The competitive gap they closed had been costing them an estimated 15–20 qualified inquiries per month. That is the difference between treating local SEO as a setup task and treating it as an engineered system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="capabilities-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Service Architecture</span>
            <h2>Local SEO Services for Glendale Businesses</h2>
            <p>
              The four-layer local SEO system we deploy for every Glendale engagement — built around the ranking signals that actually determine Map Pack position, not vanity metrics.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>Google Business Profile Optimization</h3>
              <p>
                GBP is the single highest-weight local ranking signal — and most Glendale businesses have critical errors in their profile without knowing it. Wrong primary category, missing service items, outdated hours, no products section, and zero GBP posts in the last 90 days all suppress Map Pack placement. We treat GBP as a living asset, not a one-time setup. Read our full guide to <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)'}}>Google Business Profile optimization</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Citation Building &amp; NAP Consistency</h3>
              <p>
                Google cross-references your business data across dozens of authoritative directories to verify your entity. A single character difference in your business name or a transposed phone digit creates a confidence gap that lowers your local ranking. We audit and correct your NAP signal across 40+ sources — Yelp, Apple Maps, Bing Places, Facebook, YellowPages, Foursquare, and vertical-specific directories relevant to Glendale's industry mix. For the foundational theory, see our <a href="/insights/local-seo-explained" style={{color:'var(--green)'}}>local SEO explained guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>Review Generation &amp; Velocity Management</h3>
              <p>
                In competitive Glendale categories — dental, medical, legal, financial services — the businesses that rank in positions 1–3 of the Map Pack maintain a steady review velocity of 4–8 new reviews per month, not just a high total count. Google's algorithm weights recency heavily: a business with 40 reviews and 6 in the last 30 days outranks one with 200 reviews and none in six months. We build systems that generate reviews from real customers at the right cadence, within Google's policy guidelines.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Local Schema &amp; Glendale Entity Mapping</h3>
              <p>
                On-page LocalBusiness schema with Glendale coordinates, service areas, and opening hours is the technical foundation that connects your website to your GBP entity in Google's local index. Without it, your site and your GBP listing may exist as separate, weakly connected signals. We inject server-rendered JSON-LD that ties both together into a single verified entity — the same approach that powers visibility in the Map Pack and in AI assistant responses for local queries. Our broader <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability system</a> covers both layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CHECKLIST ── */}
      <section className="checklist-section">
        <div className="onpage-container">
          <div className="checklist-split">
            <div className="checklist-left">
              <span className="mono-tag">Engagement Sequence</span>
              <h2>How We Run a Glendale Local SEO Engagement</h2>
              <p>
                The four-step sequence we execute for every Glendale client — from initial GBP audit to full citation and schema deployment.
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
                  <span>local-seo-protocol.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta">
                    Run this audit on your Glendale business
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
            <h2>Local SEO Questions, Answered Directly</h2>
            <p>The questions Glendale business owners ask before starting a local SEO engagement — answered without the agency spin.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>What is local SEO?</h2>
              <p>
                Local SEO is the practice of optimizing a business's online presence to appear in geographically targeted results — primarily Google's Map Pack (the three business listings that appear above organic results for local intent queries) and the local organic results directly below it. For a Glendale business, local SEO means ranking when someone in Glendale, Burbank, or La Crescenta searches "dentist near me," "lawyer Brand Boulevard," or "best restaurant Americana at Brand." The core ranking signals Google uses are Google Business Profile completeness and category accuracy, NAP consistency across directory sources, review volume and recency, and the strength of your local entity graph. See our full guide to <a href="/insights/local-seo" style={{color:'var(--green)'}}>local SEO strategy in 2026</a>.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>Does local SEO still work?</h2>
              <p>
                Local SEO is more valuable in 2026 than it was five years ago — not less. 46% of all Google searches carry local intent. 76% of people who perform a local mobile search visit a business within 24 hours. And the Map Pack now captures a larger share of clicks than the organic #1 result for local intent queries. What has changed is the competitive bar. In Glendale, where Brand Boulevard alone hosts hundreds of competing businesses in the same categories, the companies investing in entity authority, review velocity, and structured schema consistently dominate the top three positions. The ones that stop at a basic GBP setup fall out of the pack entirely. The fundamentals of <a href="/insights/local-seo-explained" style={{color:'var(--green)'}}>how local SEO works</a> have not changed — the precision required to win has.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>How much does local SEO cost?</h2>
              <p>
                Local SEO cost depends on market competitiveness and the depth of engineering required. DIY tools like BrightLocal or Whitespark run $50–$150/month but require significant hands-on time. Freelancers typically charge $500–$1,500/month for managed campaigns but rarely work at the technical entity and schema level. Mid-tier agencies charge $1,000–$3,000/month. Engineering-focused practices — the kind that correct entity graphs, inject structured schema, and work at the GBP data layer — typically run $2,500–$6,000/month for competitive Glendale categories. The ROI calculus is not complicated: if the program generates two additional qualified leads per month in a service category with $3,000+ average customer value, it pays for itself before month three. For context on what a full local engagement includes, see the <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice overview</a>.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>How to create a local SEO strategy?</h2>
              <p>
                A local SEO strategy for a Glendale business starts with four foundational layers. First, GBP optimization — claim and verify your listing, correct your primary and secondary categories, add all services, upload current photos, and set accurate service areas covering Glendale, Burbank, and adjacent communities. Second, NAP consistency — audit your business name, address, and phone across every directory source and correct all divergences. Third, review velocity — build a repeatable process for generating 4–6 authentic reviews per month, targeting recent recency alongside total volume. Fourth, local schema — deploy <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)'}}>LocalBusiness JSON-LD</a> with Glendale coordinates, service hours, and service area data on every relevant page. Beyond the foundation, businesses in competitive Glendale categories need local link acquisition, multilingual GBP content, and ongoing GBP post activity to hold top-three Map Pack position. Our <a href="/insights/local-seo" style={{color:'var(--green)'}}>full local SEO playbook</a> details each layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CLUSTER ── */}
      <section className="capabilities-section" style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">SEO &amp; Discoverability Cluster</span>
            <h2>Related Guides &amp; Services</h2>
            <p>Resources from our local SEO and discoverability practice that directly support Glendale businesses.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/seo-discoverability-agency" style={{color:'inherit',textDecoration:'none'}}>SEO &amp; Discoverability Agency</a></h3>
              <p>The full-stack parent service covering Technical SEO, local Map Pack engineering, GEO, and organic pipeline systems. Glendale local SEO is one specialized application of this broader practice.</p>
              <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View practice →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/google-business-profile-optimization" style={{color:'inherit',textDecoration:'none'}}>Google Business Profile Optimization</a></h3>
              <p>The forensic GBP audit checklist covering profile recovery, suspension appeals, category correction, service area configuration, and the review signals that drive Map Pack rank.</p>
              <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/local-seo" style={{color:'inherit',textDecoration:'none'}}>Local SEO Strategy: 2026 Map Pack Playbook</a></h3>
              <p>The complete local SEO playbook for 2026 — covering the full Map Pack ranking framework, review velocity benchmarks, citation building hierarchy, and entity graph construction.</p>
              <a href="/insights/local-seo" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/local-seo-explained" style={{color:'inherit',textDecoration:'none'}}>Local SEO Explained: Operational Consistency</a></h3>
              <p>How to run the weekly optimization cadence that separates businesses that hold Map Pack positions from those that drift out — review acquisition, GBP post frequency, and local profile update schedules.</p>
              <a href="/insights/local-seo-explained" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="onpage-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2>Start Your Glendale Local SEO Engagement</h2>
              <p>
                We run a 15-minute live local SEO session for Glendale businesses — GBP audit, NAP consistency check, Map Pack gap analysis, and review velocity benchmark against your top three local competitors. No slides, no pitch. Just a direct read on where your business stands in local search and what it would take to reach position one.
              </p>
            </div>
            <div className="cta-right">
              <a href="/book" className="btn btn-primary">Book Glendale audit</a>
              <span className="subtext">15-min live session · Glendale, CA · No commitment</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
