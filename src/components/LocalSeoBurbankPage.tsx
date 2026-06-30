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
      "name": "Gobiya — Local SEO Company Burbank",
      "url": "https://www.gobiya.com/local-seo-company-burbank",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "Local SEO company serving Burbank businesses. We engineer Google Map Pack dominance, Google Business Profile optimization, citation authority, and review velocity systems for businesses on San Fernando Boulevard and throughout the Burbank, CA 91501–91510 market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q188539" },
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q182749" },
        { "@type": "City", "name": "Toluca Lake", "sameAs": "https://www.wikidata.org/wiki/Q7818424" },
        { "@type": "City", "name": "Studio City", "sameAs": "https://www.wikidata.org/wiki/Q2340854" },
        { "@type": "City", "name": "North Hollywood", "sameAs": "https://www.wikidata.org/wiki/Q1434775" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
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
          "name": "We show up in Google Search for our business name but we are barely visible on Google Maps for any category search. Why would those two perform so differently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Branded search and Map Pack visibility are driven by completely different signals. Branded rankings come from your website's link authority for your business name. Map Pack visibility is driven by GBP category accuracy, proximity and service area configuration, and entity authority (NAP consistency, review velocity, local link signals). A business can rank number one for its own name and be completely absent from the Map Pack for category searches because those ranking systems are independent."
          }
        },
        {
          "@type": "Question",
          "name": "Our Google Business Profile was suspended with no warning. What is the first thing we should do and how long does reinstatement take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Do not create a new listing — that almost always makes reinstatement harder. Diagnose the suspension type: soft suspensions (profile visible but unverifiable) often resolve with re-verification. Hard suspensions (listing completely removed) require a Business Reinstatement Request with supporting documentation. Policy violations require correcting the violation first. Timeline: soft suspensions resolve in 3 to 7 business days; hard suspensions typically take 2 to 4 weeks."
          }
        },
        {
          "@type": "Question",
          "name": "We have more five-star reviews than every competitor in our Burbank category, but we still rank below them in Google Maps. How is that possible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Review count is one signal among many in the Map Pack algorithm — and often not the most decisive one. The businesses outranking you with fewer reviews are almost certainly winning on GBP category accuracy, service area configuration, NAP citation consistency, or local link authority. Review velocity also matters: 200 total reviews with none in 90 days loses to 40 reviews with 6 in the last 30 days."
          }
        },
        {
          "@type": "Question",
          "name": "We hired a local SEO agency in Burbank eight months ago and our Map Pack position has not moved. How do we tell if the work is actually happening?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ask for GBP data. A legitimate local SEO campaign produces measurable GBP signal movement: GBP profile actions (calls, direction requests, website clicks) should increase month over month. Your agency should also show a before-and-after citation audit and demonstrate review velocity improvement. If none of those three things have moved in eight months, the engagement is not producing results."
          }
        }
      ]
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Google Business Profile Audit",
    short: "Diagnose category errors, service area gaps, and GBP signals suppressing your Burbank rank.",
    detail: "Your GBP is Google's primary ranking signal for Burbank Map Pack placement — and most profiles have critical errors that suppress visibility without any obvious warning. Wrong primary category, missing service items, incomplete service areas that exclude Toluca Lake and Studio City, zero GBP posts in the past 90 days. We perform a forensic GBP audit, correct every misconfiguration, and treat your profile as an active ranking asset — not a one-time setup task. For Burbank businesses in medical, legal, and professional services, the difference between a correctly configured and incorrectly configured GBP can span 5–8 Map Pack positions."
  },
  {
    title: "02. NAP Consistency & Citation Cleanup",
    short: "Align your business data across 40+ directories — Yelp, Apple Maps, Bing Places, and more.",
    detail: "NAP inconsistency is one of the most silent and damaging ranking problems in local SEO. When your business name, address, or phone number appears differently across Yelp, Apple Maps, Bing Places, Facebook, and industry directories, Google's entity confidence drops — and your Map Pack position follows. For Burbank businesses that have been operating for several years, citation drift is almost universal. We audit your NAP signal across 40+ authoritative sources and correct every divergence, building the consistent entity footprint Google uses to rank local businesses with confidence."
  },
  {
    title: "03. Review Velocity & Reputation Systems",
    short: "Build a sustainable review engine targeting 4–6 authentic reviews per month.",
    detail: "Review count matters less than review velocity in 2026. Google's local algorithm weights recency heavily — a Burbank business with 60 reviews and 5 in the last 30 days consistently outranks one with 200 reviews and none in six months. The competitive threshold in Burbank's professional services categories is 4–6 new reviews per month. We build review generation systems tied to your natural customer touchpoints — post-service follow-up sequences, QR codes at point of interaction, and automated SMS and email cadences — that generate authentic reviews from real customers within Google's policy guidelines."
  },
  {
    title: "04. Local Schema & Burbank Entity Graph",
    short: "Deploy LocalBusiness JSON-LD and build your verified Burbank entity footprint.",
    detail: "On-page schema and off-page entity signals work together to tell Google exactly who your business is, where it operates, and what it serves. We inject LocalBusiness JSON-LD schema directly into your site's server-rendered HTML with Burbank coordinates, service areas, opening hours, and service data — connecting your website entity to your GBP listing as a single verified record. We then build the off-page entity footprint: structured citations in authoritative directories, local link acquisition from Burbank Chamber of Commerce and adjacent city resources, and Wikidata entry construction where applicable. This is the infrastructure that powers sustainable Map Pack placement — and AI assistant responses for local Burbank queries."
  }
];

export default function LocalSeoBurbankPage() {
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
              <span>Local SEO Company Burbank</span>
            </nav>

            <h1>
              <span className="line"><span>Local SEO Company</span></span>
              <span className="line"><span className="accent">Burbank.</span></span>
            </h1>

            <p className="hero-sub">
              If you are searching for a local SEO company in Burbank, you are looking for a team that can put your business in Google's Map Pack — the three listings that capture the overwhelming share of local search clicks — and keep you there. Burbank is one of the most media-dense, commercially active markets in the San Fernando Valley, and the businesses at the top of local search results did not get there by accident. We engineer the four signals that determine local rank: <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)'}}>Google Business Profile</a> authority, NAP citation consistency, review velocity, and local schema. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice</a> has served the greater Los Angeles market since 2012, with deep experience in the Burbank 91501–91510 corridor.
            </p>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Market</span>
                <span className="val">Burbank, CA 91501–91510</span>
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
            <HeroQuickForm source="Local SEO Company Burbank" variant="light" accent="#2F5D50" heading="Request a Burbank local SEO quote" subheading="Tell us about your business and we’ll send a quick read." style={{ maxWidth: '100%' }} />
          </div>

        </div>
      </section>

      {/* ── WHY BURBANK IS A DISTINCT LOCAL SEO MARKET ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Market Intelligence</span>
            <h2>Why Burbank Local SEO Is a Different Problem</h2>
            <p>
              Burbank is not a generic suburban market. Its entertainment industry concentration, professional services density, and adjacency to major media studios create specific local search dynamics that most agencies simply do not understand.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Media District</div>
              <h3>The Entertainment Capital of Local Search</h3>
              <p>
                Burbank hosts Warner Bros., Disney, NBCUniversal, and dozens of supporting production companies, talent agencies, and media services firms. This concentration creates a unique local search environment: buyers are sophisticated, searches are high-intent, and competition for the Map Pack in business services, legal, financial, and medical categories is genuinely fierce. Winning a top-three Map Pack position in Burbank requires more than a complete GBP — it requires a higher review score, stronger citation authority, and cleaner entity data than every competitor within your serving radius.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">San Fernando Blvd</div>
              <h3>A Commercial Corridor With Dense Local Competition</h3>
              <p>
                San Fernando Boulevard from downtown Burbank through the Media District is one of the highest-density commercial corridors in the San Fernando Valley. Medical, dental, legal, financial, and hospitality businesses compete for the same local intent queries — and Google's Map Pack only shows three. In this environment, the businesses that invest in systematic local SEO engineering hold the top positions; the ones that treat GBP as a one-time setup fall off the pack entirely. For background on how this competitive dynamic plays out, see our <a href="/insights/local-seo" style={{color:'var(--green)'}}>2026 local SEO playbook</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Adjacent Markets</div>
              <h3>Toluca Lake, Studio City, and Glendale Overlap Burbank Searches</h3>
              <p>
                Burbank's service area naturally extends into Toluca Lake, Studio City, North Hollywood, and Glendale. Buyers in those communities search for Burbank businesses regularly — and Burbank businesses that structure their service area data correctly in Google Business Profile and schema markup capture that adjacent demand. Incorrectly configured service areas silently exclude thousands of relevant monthly searches. We define these boundaries with precision. For the technical side of multi-market coverage, see our <a href="/insights/multi-location-seo-website-structure" style={{color:'var(--green)'}}>multi-location SEO structure guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Results</div>
              <h3>280% Map Pack Call Growth for a Burbank Services Business</h3>
              <p>
                A Burbank professional services client saw a 280% increase in Map Pack phone calls and consultation requests after we restructured their local entity graph, corrected NAP across 40+ directory sources, and secured local citations from Burbank-specific directories and the Burbank Chamber of Commerce. The full program ran 90 days. The competitive gap they closed had been costing them an estimated 12–18 qualified inquiries every month — the difference between treating local SEO as a setup task and engineering it as a compounding system. That is the standard we work to.
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
            <h2>Local SEO Services for Burbank Businesses</h2>
            <p>
              The four-layer local SEO system we deploy for every Burbank engagement — engineered around the ranking signals that actually determine Map Pack position, not vanity metrics.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>Google Business Profile Optimization</h3>
              <p>
                GBP is the single highest-weight local ranking signal — and the majority of Burbank businesses have critical errors in their profiles that suppress Map Pack visibility without any visible warning. Wrong primary category. Missing service items. Service areas that exclude Toluca Lake, Studio City, and North Hollywood. Outdated hours. Zero GBP post activity in the last 90 days. We treat GBP as a living ranking asset and manage it actively. Read our full guide to <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)'}}>Google Business Profile optimization</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Citation Building &amp; NAP Consistency</h3>
              <p>
                Google cross-references your business data across dozens of authoritative directories to verify your entity. A single character difference in your business name or a transposed phone digit creates a confidence gap that lowers local ranking. We audit and correct your NAP signal across 40+ sources — Yelp, Apple Maps, Bing Places, Facebook, YellowPages, Foursquare, and vertical-specific directories relevant to Burbank's industry mix. For the foundational theory, see our <a href="/insights/local-seo-explained" style={{color:'var(--green)'}}>local SEO explained guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>Review Generation &amp; Velocity Management</h3>
              <p>
                In competitive Burbank categories — dental, medical, legal, financial services, entertainment support — the businesses ranking in positions 1–3 of the Map Pack maintain a steady review velocity of 4–8 new reviews per month, not just a high total count. Google's algorithm weights recency heavily: a business with 50 reviews and 6 in the last 30 days consistently outranks one with 220 reviews and none in six months. We build systems that generate reviews from real customers at the right cadence, within Google's policy guidelines, as a permanent operational layer.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Local Schema &amp; Burbank Entity Mapping</h3>
              <p>
                On-page LocalBusiness schema with Burbank coordinates, service areas, and opening hours is the technical foundation that connects your website to your GBP entity in Google's local index. Without it, your site and your GBP listing may function as separate, weakly connected signals — reducing Google's confidence in both. We inject server-rendered JSON-LD that ties them together as a single verified entity, the same approach that powers visibility in the Map Pack and in AI assistant responses for local Burbank queries. Our broader <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability system</a> covers both layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContentCta headline="Ready to dominate local search?" sub="Our team responds within one business day." accent="#2F5D50" background="var(--paper)" />

      {/* ── INTERACTIVE CHECKLIST ── */}
      <section className="checklist-section">
        <div className="onpage-container">
          <div className="checklist-split">
            <div className="checklist-left">
              <span className="mono-tag">Engagement Sequence</span>
              <h2>How We Run a Burbank Local SEO Engagement</h2>
              <p>
                The four-step sequence we execute for every Burbank client — from the initial GBP audit through full citation cleanup and schema deployment.
              </p>

              <div className="checklist-buttons">
                {AUDIT_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`burbank-audit-step-${idx}`}
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
                  <span>burbank-local-seo-protocol.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta" id="burbank-checklist-book-cta">
                    Run this audit on your Burbank business
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

      <ContentCta headline="Ready to dominate local search?" sub="Our team responds within one business day." accent="#2F5D50" background="var(--paper)" />

      {/* ── TOP RATED SECTION ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">What "Top Rated" Actually Means</span>
            <h2>Top Rated Local SEO Company in Burbank: What to Look For</h2>
            <p>
              The phrase gets used loosely. Here is what separates a genuinely top-rated local SEO company from one that just ranks for the term.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Engineering</div>
              <h3>Technical Depth Over Dashboard Access</h3>
              <p>
                Top-rated local SEO in Burbank means working at the technical layer of Google's algorithm — not just logging into your GBP and making surface-level edits. The agencies that consistently produce Map Pack results for competitive Burbank categories do GBP data layer work, inject server-rendered schema, and correct entity graph signals at the code level. Agencies that hand you a login and a monthly rank report are managing, not engineering. There is a meaningful performance difference between the two approaches in a market as competitive as Burbank.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Transparency</div>
              <h3>Reporting Tied to Map Pack Position and Calls</h3>
              <p>
                A top-rated local SEO company reports on the metrics that matter to a Burbank business owner: Map Pack position for target queries, GBP call volume, GBP direction requests, and review velocity benchmarks against your direct competitors. If your monthly report is full of impressions, domain authority scores, and keyword rankings without Map Pack call data, the program is measuring the wrong thing. We report on the numbers tied directly to revenue — call volume, appointment requests, and local query rankings in the Burbank 91501–91510 market.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Local Knowledge</div>
              <h3>Burbank Market Fluency, Not Generic Templates</h3>
              <p>
                The Burbank market has specific competitive dynamics that do not show up in generic local SEO playbooks. The media industry concentration creates unusual competitor profiles. The adjacency to Glendale and North Hollywood means service area configuration matters more than in most markets. The professional services density on San Fernando Boulevard creates genuinely competitive Map Pack environments that require above-average review velocity and citation authority. We work in this market with enough regularity to know those dynamics — and we factor them into every engagement from day one.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Accountability</div>
              <h3>No 12-Month Contracts Built on False Promise</h3>
              <p>
                Many agencies in the Burbank market lock clients into 12-month contracts before delivering any meaningful work, then rely on inertia to keep the engagement alive. We operate on shorter initial engagement windows with clear deliverables — GBP audit and correction, NAP cleanup across 40+ sources, review velocity system deployment, and schema injection — before asking for a long-term commitment. Our <a href="/approach" style={{color:'var(--green)'}}>approach to client engagements</a> is built on earned trust, not contractual lock-in. If the work does not move your Map Pack position in 60–90 days, we want to know why.
              </p>
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
            <h2>Local SEO Company Burbank: Common Questions Answered</h2>
            <p>The questions Burbank business owners ask before starting a local SEO engagement — answered directly, without the agency spin.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We show up in Google Search for our business name but we are barely visible on Google Maps for any category search. Why would those two perform so differently?</h2>
              <p>
                Branded search and Map Pack visibility are driven by completely different signals. Branded rankings come from your website's relevance and link authority for your business name — once someone knows you exist and searches directly, that is easy to win. Map Pack visibility is driven by three signals: Google Business Profile signals (category accuracy, completeness, posting activity), proximity and service area configuration, and entity authority (NAP consistency across directories, review velocity, local link signals). A business can rank number one for its own name and be completely absent from the Map Pack for "dentist near me" or "attorney Burbank" because those ranking systems are independent. The Map Pack fix requires GBP engineering, not website SEO.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>Our Google Business Profile was suspended with no warning. What is the first thing we should do and how long does reinstatement take?</h2>
              <p>
                Do not create a new listing — that almost always makes reinstatement harder. The first step is diagnosing the suspension type: if it is a soft suspension (profile still visible but unverifiable), a re-verification often resolves it. If it is a hard suspension (listing completely removed), you need to file a Business Reinstatement Request with supporting documentation — government-issued business license, utility bill confirming address, physical photos of the business location matching the listed address. Suspensions caused by policy violations (keyword stuffing in business name, wrong category, virtual office address for a service-area business) require correcting the violation before submitting reinstatement. Timeline: soft suspensions resolve in 3 to 7 business days; hard suspensions typically take 2 to 4 weeks. For existing clients we handle the complete reinstatement process.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We have more five-star reviews than every competitor in our Burbank category, but we still rank below them in Google Maps. How is that possible?</h2>
              <p>
                Review count is one signal among many in the Map Pack algorithm — and often not the most decisive one. The businesses outranking you with fewer reviews are almost certainly winning on GBP category accuracy (the right primary category creates a massive relevance advantage), service area configuration (if your area excludes Toluca Lake, Studio City, or North Hollywood, you are invisible to nearby searchers), NAP citation consistency (if your business name or address appears differently across Yelp, Apple Maps, and Bing Places, Google entity confidence drops), or local link authority. Review velocity also matters — 200 total reviews with none in the last 90 days loses to 40 reviews with 6 in the last 30 days. A competitive audit usually surfaces the specific gap within the first session.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We hired a local SEO agency in Burbank eight months ago and our Map Pack position has not moved. How do we tell if the work is actually happening?</h2>
              <p>
                Ask for GBP data. A legitimate local SEO campaign produces measurable GBP signal movement: the number of GBP profile actions (calls, direction requests, website clicks) should increase month over month. If your agency cannot show you that data, they are not working at the GBP layer. The second indicator is citation changes — your agency should be able to show you a before-and-after citation audit documenting what was corrected across which directories. Third, review velocity: if your review count has not increased since the engagement started, the reputation system either was not built or is not working. If none of those three things have moved in eight months, the engagement is not producing results and you should ask for a detailed accounting of what work was done. See the <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice overview</a> for what a complete engagement should deliver.
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
            <p>Resources from our local SEO and discoverability practice that directly support Burbank businesses.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/seo-discoverability-agency" style={{color:'inherit',textDecoration:'none'}}>SEO &amp; Discoverability Agency</a></h3>
              <p>The full-stack parent service covering Technical SEO, local Map Pack engineering, GEO, and organic pipeline systems. Burbank local SEO is one specialized application of this broader practice.</p>
              <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View practice →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Location</div>
              <h3><a href="/local-seo-glendale" style={{color:'inherit',textDecoration:'none'}}>Local SEO Glendale</a></h3>
              <p>Our Glendale local SEO practice covering the Brand Boulevard corridor, GBP optimization, and NAP consistency for businesses in the 91201–91210 market — Burbank's immediate neighbor.</p>
              <a href="/local-seo-glendale" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View Glendale →</a>
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
              <p>The complete local SEO playbook for 2026 — covering the full Map Pack ranking framework, review velocity benchmarks, citation building hierarchy, and entity graph construction for competitive LA markets.</p>
              <a href="/insights/local-seo" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="onpage-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2>Start Your Burbank Local SEO Engagement</h2>
              <p>
                We run a 15-minute live local SEO session for Burbank businesses — GBP audit, NAP consistency check, Map Pack gap analysis, and review velocity benchmark against your top three local competitors. No slides, no pitch. Just a direct read on where your business stands in local search and exactly what it would take to reach position one in the Burbank Map Pack.
              </p>
            </div>
            <div className="cta-right">
              <a href="/book" className="btn btn-primary" id="burbank-footer-book-cta">Book Burbank audit</a>
              <span className="subtext">15-min live session · Burbank, CA · No commitment</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
