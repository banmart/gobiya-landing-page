import React, { useEffect, useRef, useState } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';
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
          "name": "We have been trying to improve our Google Maps ranking for almost two years. We have done GBP updates, added reviews, and our position has barely moved. What are we actually missing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At two years with no meaningful movement, the issue is almost always a GBP category configuration error, NAP inconsistency at the aggregator layer (Data Axle, Neustar Localeze, and Foursquare still have your old data overriding your corrections), or a competitive authority gap (your competitors have local link signals from Glendale Chamber of Commerce and city citations that you have not built). Adding more reviews without fixing the underlying category or entity problem produces minimal ranking movement."
          }
        },
        {
          "@type": "Question",
          "name": "We are opening a second location in Glendale. How do we build visibility for it without hurting our existing location's rankings?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Treat each location as a distinct entity: its own GBP listing, its own dedicated website page with unique content, its own citation profile, and its own local phone number. The mistake that causes cannibalization is sharing a phone number, address range, or website landing page between locations. Each listing's service area should also be distinct enough that the two listings are not competing for the same geographic queries."
          }
        },
        {
          "@type": "Question",
          "name": "We get leads from our website but almost nothing comes through Google Maps even for searches right in our neighborhood. Why would those two perform so differently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Website leads and Map Pack calls are driven by completely different systems. Your website gets leads because people know your name or click a paid ad. Map Pack visibility requires a separate set of signals: GBP category accuracy, proximity weighting, NAP citation consistency, and review recency. Your website SEO does not automatically improve your Maps ranking — the local signal layer requires its own dedicated work."
          }
        },
        {
          "@type": "Question",
          "name": "We are a service-area business with no physical storefront. Can we still rank in Google Maps for Glendale searches?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, but with a specific configuration. Service-area businesses without a public-facing address can rank in the Map Pack if their GBP is configured correctly as an SAB, with the address hidden and the service area defined by city or ZIP. Hiding your address actually improves Map Pack eligibility for SABs rather than hurting it. Google does not penalize the absence of a physical address for SABs as long as the listing is correctly configured as one."
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
              <a href="/">Gobiya</a>
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
              Gobiya has served Glendale businesses since 2010. Glendale's local search market has two layers most agencies miss. The first is the Map Pack competition on Brand Boulevard and the Americana corridor — some of the densest retail and professional services density in LA County, where three positions capture most of the clicks. The second is Glendale's demographic reality: the city has the largest Armenian-American population in the US and a significant Korean-American business community, meaning the businesses that truly dominate local search here also have multilingual GBP profiles, Armenian and Korean directory citations, and review velocity from both English and non-English speakers. We've worked in this market since 2012 and understand both layers. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice</a> covers Map Pack engineering, GBP authority, NAP consistency, and multilingual local signals.
            </p>

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

          <div className="hero-widget" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <HeroQuickForm source="Local SEO Glendale" variant="light" accent="#2F5D50" heading="Request a Glendale local SEO quote" subheading="Tell us about your business and we’ll send a quick read." style={{ maxWidth: '100%' }} />
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

      {/* ── MULTILINGUAL LOCAL SEO ── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '5rem 5vw' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Glendale-specific signal</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Multilingual GBP Optimization for the Glendale Market
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Glendale has the largest concentration of Armenian-Americans in the United States and a substantial Korean-American business community along the Wilshire and Western corridor. A significant share of high-intent local searches in Glendale happen in Armenian and Korean — not just English. Google Business Profiles that include the correct primary language, secondary language support, and category translations for these communities rank materially higher for non-English local queries than profiles that ignore them.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            We build GBP profiles with language-appropriate business descriptions, ensure citation consistency across Armenian and Korean directories active in the Glendale market, and configure review request workflows that reach both English and non-English speaking customers. For professional services — dental, medical, legal, financial — this is often the fastest Map Pack ranking lever available, because very few competitors have optimised for it.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8 }}>
            This is not a generic local SEO tactic. It is specific to Glendale's market and the demographic data that shapes its search behaviour. If your competitors haven't done it, this gap is yours to close.
          </p>
        </div>
      </section>

      <ContentCta headline="Ready to dominate local search?" sub="Our team responds within one business day." accent="#2F5D50" background="var(--paper)" />

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

      <ContentCta headline="Let's map out your local rankings." sub="Start with a free site audit — no commitment, 24-hour response." accent="#2F5D50" background="var(--paper-2)" />

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Common questions</span>
            <h2>Local SEO Questions, Answered Directly</h2>
            <p>The questions Glendale business owners ask before starting a local SEO engagement — answered without the agency spin.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We have been trying to improve our Google Maps ranking for almost two years. We have done GBP updates, added reviews, and our position has barely moved. What are we actually missing?</h2>
              <p>
                At two years with no meaningful movement, the issue is almost always one of three things: GBP category configuration error (wrong primary category prevents you from ever ranking for the main commercial queries regardless of other signals), NAP inconsistency at the aggregator layer (Data Axle, Neustar Localeze, and Foursquare still have your old data and keep overriding your corrections), or competitive authority gap (your competitors have local link signals from Glendale Chamber of Commerce, city citations, and neighborhood business associations that you have not built). Adding more reviews without fixing the underlying category or entity problem produces minimal ranking movement.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We are opening a second location in Glendale. How do we build visibility for it without hurting our existing location's rankings?</h2>
              <p>
                The key is treating each location as a distinct entity with its own GBP listing, its own dedicated website page, and its own citation profile. Each location needs its own local phone number, its own GBP listing verified to that address, its own website page with unique content about that specific location, and its own LocalBusiness schema with the correct coordinates. Service area configuration is the other critical piece — make sure each listing's service area is distinct enough that the two listings are not competing for the same geographic queries. Done correctly, a second location adds a second Map Pack opportunity rather than splitting the authority of the first.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We get leads from our website but almost nothing comes through Google Maps even for searches right in our neighborhood. Why would those two perform so differently?</h2>
              <p>
                Website leads and Map Pack calls are driven by completely different systems. Your website gets leads because people know your name, find an article you published, or click a paid ad. Map Pack visibility requires a separate set of signals: GBP category accuracy and completeness, proximity weighting against the searcher's location, NAP citation consistency across directories, and review recency. It is common for a business to have a well-functioning website with steady organic traffic and essentially zero Map Pack presence because the two systems are independent. Your website SEO does not automatically improve your Maps ranking — the local signal layer requires its own dedicated work.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We are a service-area business with no physical storefront. Can we still rank in Google Maps for Glendale searches?</h2>
              <p>
                Yes, but with a specific configuration. Service-area businesses without a public-facing address can rank in the Map Pack if they configure their GBP correctly as an SAB, hide their address from the listing (this actually improves Map Pack eligibility for SABs rather than hurting it), define their service area by city or ZIP, and meet the other local ranking factors — NAP consistency, review velocity, and GBP completeness. The Map Pack ranking radius for SABs is generally tighter than for brick-and-mortar locations, so service area configuration is critical. Google does not penalize the absence of a physical address for SABs as long as the listing is configured correctly as one.
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
