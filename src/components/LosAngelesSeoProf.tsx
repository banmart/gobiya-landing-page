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
      "name": "Gobiya — Los Angeles SEO Professional",
      "url": "https://www.gobiya.com/los-angeles-seo-professional",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "Los Angeles SEO professional practice. Gobiya engineers search visibility, AI citation architecture, and organic pipeline systems for B2B brands, professional services firms, and enterprise clients across the Greater Los Angeles market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Los Angeles", "sameAs": "https://www.wikidata.org/wiki/Q65" },
        { "@type": "City", "name": "Beverly Hills", "sameAs": "https://www.wikidata.org/wiki/Q49262" },
        { "@type": "City", "name": "Santa Monica", "sameAs": "https://www.wikidata.org/wiki/Q185177" },
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q188539" },
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q182749" },
        { "@type": "State", "name": "California", "sameAs": "https://www.wikidata.org/wiki/Q99" }
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
          "name": "What do Los Angeles SEO professional reviews actually tell you?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Reviews of a Los Angeles SEO professional should tell you whether they produce measurable results in competitive LA markets. Look for specificity: named industries, documented traffic or ranking improvements, timeframes that match realistic SEO timelines (60–180 days), and language that references technical work — crawl audits, schema implementation, link acquisition — rather than vague 'growth.' Gobiya's verified reviews are available on Google Business Profile and Yelp, with client-attributed outcomes in professional services, B2B SaaS, and healthcare."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the top SEO companies in Los Angeles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The top SEO companies in Los Angeles are distinguished by technical depth, not headcount or brand recognition. The firms consistently producing results for competitive LA categories — healthcare, legal, B2B technology, professional services — operate with engineering-led SEO practices rather than content-volume or link-quantity models. Gobiya is a boutique Los Angeles SEO practice established in 2012, focused on B2B brands and professional services firms in the Greater Los Angeles and San Fernando Valley markets."
          }
        },
        {
          "@type": "Question",
          "name": "How can I verify a Los Angeles SEO professional on LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Verifying a Los Angeles SEO professional on LinkedIn means checking for real client tenure (6+ month engagements), industry-specific SEO experience, and evidence of technical work — not just content creation. Gobiya's founder Steve Martin has practiced SEO engineering in the Los Angeles market since 2012 and is active on LinkedIn at linkedin.com/in/stevemartingobiya."
          }
        },
        {
          "@type": "Question",
          "name": "What SEO services does a professional offer in California?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A professional SEO practice in California covers: technical site audits (crawl budget, schema, Core Web Vitals), organic content strategy targeting commercial-intent queries, local SEO and Google Business Profile optimization, link acquisition and entity authority building, and generative engine optimization (GEO) for AI Overviews, ChatGPT, and Perplexity. In California's competitive markets, the distinguishing factor is engineering depth, not service list length."
          }
        },
        {
          "@type": "Question",
          "name": "Is professional SEO different from what DIY tools offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Professional SEO differs from DIY tools in three ways. First, diagnosis: a professional identifies the specific technical or content architecture problems causing poor performance. Second, implementation: changes are made directly in code — not through plugin dashboards. Third, strategy: content is mapped to commercial-intent queries and pipeline stages, not just traffic volume targets. Tools like Semrush or Ahrefs are research instruments. Professional SEO is a change-execution discipline."
          }
        },
        {
          "@type": "Question",
          "name": "What is an affordable SEO company in the USA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Affordable SEO in the USA is not defined by the monthly retainer number — it is defined by cost-per-outcome. A $1,500/month program that produces no measurable pipeline is expensive. A $4,000/month program that generates 8–12 qualified monthly inquiries in a professional services category with $5,000+ average case value pays for itself before month two. Gobiya prices engagements to be competitive for the outcomes produced, with transparent scope and no 12-month lock-in contracts before results are demonstrated."
          }
        }
      ]
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Organic Traffic Composition Audit",
    short: "Map which pages drive pipeline versus which attract non-commercial sessions.",
    detail: "Most Los Angeles businesses with existing organic traffic are converting a fraction of what they should. The audit segments sessions by intent — informational, commercial, transactional — and maps each cluster to pipeline contribution. The output is not 'traffic grew by X' but 'these 14 pages need structural upgrades, these 6 are correctly configured, and these 3 are your high-ROI priority.' That is where professional SEO in Los Angeles starts: with a map of what is actually working, not an assumption about what should."
  },
  {
    title: "02. Technical Architecture Review",
    short: "Resolve crawl inefficiencies, canonical errors, and rendering failures.",
    detail: "Technical SEO problems in LA's competitive market are not optional cleanup items — they are hard ranking floors. Redirect chains that dilute link equity, canonical tags pointing to the wrong version, server-side rendering gaps that hide content from AI crawlers, Core Web Vitals failures that suppress ranking. We work inside the code directly — not through Yoast or page-builder dashboards. Direct, clean, audit-verifiable code-level changes that hold up under Google's 2026 scrutiny standards."
  },
  {
    title: "03. Entity & Schema Infrastructure",
    short: "Build the structured data foundation for Knowledge Graph and AI citation.",
    detail: "Google's Knowledge Graph and generative AI engines both rely on structured entity signals to understand who you are. For Los Angeles professional services firms, this means Organization schema with correct sameAs links to LinkedIn, Wikidata, and Crunchbase; LocalBusiness schema with verified coordinates and service areas; author and Person schema for thought leadership content; and Service schema for each capability page. This is the infrastructure that makes a business citable in AI answers — not just rankable in traditional search."
  },
  {
    title: "04. Competitive Gap & Keyword Mapping",
    short: "Identify the exact query and content gaps your LA competitors are exploiting.",
    detail: "The Los Angeles SEO market has dynamics that generic national audits miss. Category-specific Map Pack competition in healthcare, legal, and professional services. Entertainment industry search patterns unique to LA. B2B technology sector concentration in Santa Monica and the Westside creating specific buyer intent profiles. We map competitive gaps using direct Search Console data, not third-party rank estimates, and design a roadmap that prioritizes the gaps with the highest commercial-intent value first."
  }
];

export default function LosAngelesSeoProf() {
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
              <span>Los Angeles SEO Professional</span>
            </nav>

            <h1>
              <span className="line"><span>Los Angeles SEO</span></span>
              <span className="line"><span className="accent">Professional.</span></span>
            </h1>

            <p className="hero-sub">
              A <strong>Los Angeles SEO professional</strong> does something most agencies will not admit they can't do: trace exactly why your organic traffic isn't generating pipeline, fix the root cause at the code level, and build the structured entity signals that make your brand visible not just on Google but in every AI-generated answer your buyers are reading. Gobiya has worked as a Los Angeles SEO professional since 2012, serving B2B brands, professional services firms, and enterprise clients across the Greater LA market. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice</a> is engineering-led — every fix is implemented directly in code, validated against both traditional Googlebot and AI crawler requirements, and tied to pipeline outcomes rather than traffic volume.
            </p>

            <div className="hero-actions">
              <a href="/book" className="btn btn-primary" id="la-seo-prof-hero-book-cta">Book SEO strategy session</a>
              <a href="/case-studies" className="btn btn-ghost" id="la-seo-prof-hero-results-link">View client results</a>
            </div>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Market</span>
                <span className="val">Greater Los Angeles, CA</span>
              </div>
              <div className="spec-item">
                <span className="label">Focus</span>
                <span className="val">B2B, Professional Services &amp; Enterprise</span>
              </div>
              <div className="spec-item">
                <span className="label">Established</span>
                <span className="val">Los Angeles practice since 2012</span>
              </div>
            </div>
          </div>

          <div className="hero-widget">
            <div className="widget-card">
              <div className="widget-head">
                <span className="dot" />
                <span>la-seo-professional-audit.log</span>
              </div>
              <div className="widget-body">
                <div className="log-line success">[OK] Initializing Gobiya Professional SEO Engine — Los Angeles v4.0...</div>
                <div className="log-line">[SCANNING] Client domain: [los-angeles-b2b-client].com</div>
                <div className="log-line">[SCANNING] Organic traffic composition analysis...</div>
                <div className="log-line warn">[WARNING] 68% of organic sessions from non-commercial queries — zero pipeline attribution</div>
                <div className="log-line warn">[WARNING] 4 redirect chains suppressing link equity to revenue pages</div>
                <div className="log-line warn">[WARNING] Schema missing: Organization sameAs, Service, and LocalBusiness JSON-LD</div>
                <div className="log-line info">[INFO] 22 commercial-intent keyword gaps vs. top-3 LA competitors identified</div>
                <div className="log-line info">[INFO] AI crawler (GPTBot/ClaudeBot) accessibility: 34% of key pages blocked by JS rendering</div>
                <div className="log-line success">[FIXED] Redirect chains collapsed — link equity restored to /services/ cluster</div>
                <div className="log-line success">[FIXED] Schema graph injected — entity verified across Google, ChatGPT, and Perplexity</div>
                <div className="log-line-final">Pipeline composition target: 14 commercial pages re-indexed within 30 days.</div>
              </div>
              <div className="widget-foot">
                <span>Los Angeles, CA 90010</span>
                <span>SEO · Entity · AI Visibility</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── QUERY ANSWER BLOCK ── */}
      <section style={{ background: '#f9fafb', padding: '3.5rem 5vw', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          <div style={{ borderLeft: '4px solid #F26522', padding: '1.25rem 1.5rem', background: '#fff', marginBottom: '2.5rem', maxWidth: '780px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F26522', marginBottom: '0.5rem' }}>Direct Answer</p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#111827', fontWeight: 500 }}>
              A Los Angeles SEO professional is an expert who diagnoses why your organic search is not generating revenue, fixes the technical and structural causes at the code level, and builds the entity signals that earn citation across Google, AI Overviews, ChatGPT, and Perplexity. In LA's competitive B2B and professional services market, that requires a combination of technical SEO engineering, commercial-intent content architecture, and generative engine optimization — not just keyword ranking.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { n: '01', title: 'Traffic Composition Audit', desc: 'Segment your organic sessions by commercial intent — identify which pages are generating pipeline and which are attracting traffic that will never convert.' },
              { n: '02', title: 'Technical SEO Engineering', desc: 'Resolve crawl inefficiencies, redirect chains, canonical conflicts, and Core Web Vitals failures directly in code — not through plugin dashboards.' },
              { n: '03', title: 'Entity & Schema Architecture', desc: 'Build the Organization, Service, and LocalBusiness JSON-LD infrastructure that makes your brand verifiable to Google\'s Knowledge Graph and generative AI engines.' },
              { n: '04', title: 'Competitive Gap Analysis', desc: 'Map the exact keyword and content gaps that let your Los Angeles competitors outrank you for the queries that drive qualified B2B inquiries.' },
              { n: '05', title: 'AI & GEO Visibility', desc: 'Optimize for citation in AI Overviews, ChatGPT, Perplexity, and Gemini — the search surfaces capturing a growing share of professional buyer discovery in 2026.' },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ background: '#ffffff', border: '1px solid #e5e7eb', padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: '0.68rem', color: '#F26522', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', fontFamily: 'monospace' }}>{n}</p>
                <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: '0.4rem' }}>{title}</p>
                <p style={{ fontSize: '0.83rem', color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: '780px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '1.25rem' }}>Quick questions answered</p>
            {[
              {
                q: 'What separates a professional SEO from a generalist agency in Los Angeles?',
                a: 'A professional SEO in Los Angeles works at the diagnostic level first — identifying the specific technical, structural, or content architecture problems causing underperformance before prescribing any fix. Generalist agencies typically skip diagnosis and go directly to standard deliverables: blog posts, backlink packages, title tag revisions. Professional SEO means changes are made in code, validated against crawl data, and tied to commercial outcomes. In Los Angeles\'s competitive landscape — where healthcare, legal, B2B technology, and professional services categories have genuine technical SEO competition at the top — engineering depth is the difference between moving and not moving.'
              },
              {
                q: 'How long does professional SEO take to produce results in the Los Angeles market?',
                a: 'In the Los Angeles market, professional SEO produces results in layers. Technical fixes — redirect cleanup, canonical corrections, schema implementation — show measurable crawl and indexation improvements within 2–4 weeks as Googlebot revisits updated pages. Commercial-intent content improvements and competitive gap closure show ranking movement in 60–90 days for mid-competition queries. Topical authority and entity signals build compounding visibility over 90–180 days. Core Web Vitals improvements reflect in ranking within 1–3 crawl cycles. The realistic expectation: meaningful organic pipeline contribution within a 90–120 day window for a professionally-executed engagement. Faster promises in LA\'s market are a red flag.'
              },
              {
                q: 'What industries does Gobiya serve as a Los Angeles SEO professional?',
                a: 'Gobiya\'s Los Angeles SEO practice has deepest experience in B2B SaaS and technology, professional services (legal, financial advisory, management consulting), healthcare and medtech, and commercial real estate. We also serve media, entertainment, and production companies navigating competitive organic visibility in LA\'s entertainment market. Our approach — engineering-led, pipeline-focused, entity-architecture-first — is most effective for organizations with an average deal size above $5,000 and a sales cycle longer than 30 days, where the difference between ranking and not ranking for commercial-intent queries has a direct, attributable revenue impact.'
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

      {/* ── MARKET CONTEXT ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Market Context</span>
            <h2>Why Professional SEO in Los Angeles Is a Different Problem</h2>
            <p>
              Los Angeles is one of the most competitively complex SEO markets in the United States — and the reasons have nothing to do with population size. They have to do with industry density, intent diversity, and the buyer sophistication of the organizations searching for solutions here.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Industry Mix</div>
              <h3>Ten Different Competitive Landscapes in One City</h3>
              <p>
                Los Angeles has distinct local SEO competitive environments for entertainment, healthcare, legal, B2B technology, hospitality, real estate, financial advisory, e-commerce, manufacturing, and education — each with different keyword economics, different buyer intent patterns, and different schema requirements. A professional SEO who works across all of these without specialization is working without real competitive intelligence. Gobiya's <a href="/insights/b2b-organic-traffic-growth" style={{color:'var(--green)'}}>B2B organic traffic growth practice</a> is calibrated specifically to the professional services and technology categories where commercial-intent SEO has the highest revenue leverage.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">AI Discovery</div>
              <h3>Los Angeles Buyers Are Searching AI Before Google</h3>
              <p>
                By mid-2026, a meaningful share of B2B buyer discovery in Los Angeles starts in ChatGPT, Perplexity, or Google's AI Overviews — not the traditional 10 blue links. For Los Angeles professional services firms and B2B brands, this means that traditional organic ranking alone is no longer a complete visibility strategy. A professional SEO in Los Angeles today needs to build entity signals that earn AI citation alongside traditional rankings. Our <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)'}}>guide to generative engine optimization</a> covers how this layer works technically.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Competition Depth</div>
              <h3>LA's Top-Ranking Pages Have Real Technical Infrastructure</h3>
              <p>
                In Los Angeles's most competitive categories — healthcare, legal, B2B SaaS, financial advisory — the pages holding the top organic positions are not there by default. They have technical SEO infrastructure: server-rendered HTML that AI crawlers can access, correct entity schema that connects website to Knowledge Graph, Core Web Vitals that meet Google's 2026 thresholds, and commercial-intent content architecture that signals relevance at every buying stage. Competing with them requires professional SEO at the same technical level — not content volume. For the technical foundation that underpins all of this, see our <a href="/on-page-seo-los-angeles" style={{color:'var(--green)'}}>on-page SEO Los Angeles guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Results</div>
              <h3>320% Pipeline Inquiry Growth for a West LA B2B Services Firm</h3>
              <p>
                A West Los Angeles B2B professional services firm saw a 320% increase in qualified organic inquiries within 120 days of engagement. The work involved a full traffic composition audit that identified 18 high-commercial-intent keyword gaps, redirect chain cleanup across 40+ legacy pages that was silently diluting link equity, Organization and Service schema implementation verified against Google's Knowledge Graph, and a topical content sprint targeting the specific intent queries driving competitor conversions. That is the type of professional SEO work that produces revenue impact in LA's competitive environment — not a content calendar and a keyword list.
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
            <h2>Professional SEO Services for Los Angeles Businesses</h2>
            <p>
              The five-layer SEO system we deploy for Los Angeles engagements — engineered around the signals that actually determine commercial organic visibility in a competitive California market.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>Technical SEO Audit &amp; Code-Level Fixes</h3>
              <p>
                We begin every Los Angeles SEO engagement with a full technical audit — crawl log analysis, redirect chain mapping, canonical conflict detection, Core Web Vitals measurement, and server-side rendering verification. Unlike plugin-based audits, ours traces the actual path Googlebot and AI crawlers take through your site and identifies every point where they are blocked, confused, or sent in the wrong direction. Fixes are implemented in code, not in Yoast settings. For the principles behind this approach, see our <a href="/on-page-seo-los-angeles" style={{color:'var(--green)'}}>on-page SEO Los Angeles overview</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Commercial-Intent Content Architecture</h3>
              <p>
                The most common professional SEO failure in Los Angeles is organic traffic that does not convert to pipeline. The root cause is almost always content architecture: sites optimized for high-volume informational keywords instead of the low-volume, high-intent commercial queries that the active buyers in their category are actually using. We build hub-and-spoke content structures mapped to buying committee roles and decision stages — the architecture that connects search behavior to CRM pipeline. This is the system behind <a href="/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue" style={{color:'var(--green)'}}>how B2B companies use SEO to generate predictable revenue</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>Entity Schema &amp; Knowledge Graph Infrastructure</h3>
              <p>
                Google's ability to rank your business for competitive Los Angeles queries depends substantially on whether it can cleanly resolve your entity — understand what you are, what you do, and who vouches for you across authoritative sources. We implement Organization, Service, Person, and LocalBusiness JSON-LD schema with verified sameAs links to LinkedIn, Wikidata, Crunchbase, and official registries. This schema infrastructure also determines whether you appear in AI-generated recommendations — the visibility layer that is increasingly where professional buyers in LA begin their vendor search.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Local SEO for Los Angeles Professional Services</h3>
              <p>
                For Los Angeles professional services firms with physical locations or service area businesses, local SEO engineering is a distinct layer on top of technical and content SEO. We optimize <a href="/insights/google-business-profile-optimization" style={{color:'var(--green)'}}>Google Business Profile</a> signals, build NAP citation consistency across 40+ authoritative directories, deploy LocalBusiness schema with verified LA coordinates and service areas, and build review velocity systems targeting the 4–6 per month benchmark that competitive LA categories require to hold Map Pack position. Our location-specific practices for <a href="/local-seo-company-burbank" style={{color:'var(--green)'}}>Burbank</a>, <a href="/local-seo-glendale" style={{color:'var(--green)'}}>Glendale</a>, and <a href="/seo-company-encino" style={{color:'var(--green)'}}>Encino</a> apply this same system at the neighborhood level.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">05</div>
              <h3>Generative Engine Optimization (GEO)</h3>
              <p>
                In 2026, a Los Angeles SEO professional who only optimizes for traditional Google rankings is leaving a growing share of buyer discovery unaddressed. ChatGPT, Perplexity, Gemini, and Google's AI Overviews are now active discovery surfaces for B2B buyers in legal, financial, technology, and professional services — and they cite brands based on entity signals, not keyword rankings. We build the passage-level content structure, schema architecture, and third-party citation presence that earns AI recommendation. The full methodology is explained in our <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)'}}>GEO explainer</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">06</div>
              <h3>Link Acquisition &amp; Authority Building</h3>
              <p>
                In competitive Los Angeles categories, off-page authority matters — but the kind of link acquisition that moves rankings in professional services and B2B is earned, not bought. We pursue editorial link placement on authoritative industry publications, local LA business and chamber resources, partner organization pages, and category-specific directories that Google uses as entity-verification sources. The strategy is deliberate, not scaled. A focused set of high-authority relevant links moves competitive rankings in the LA market more reliably than a large volume of low-quality placements. See how this connects to the broader <a href="/insights/b2b-seo-agency" style={{color:'var(--green)'}}>B2B SEO agency model</a> we operate within.
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
              <h2>How We Run a Los Angeles Professional SEO Engagement</h2>
              <p>
                The four-phase sequence we execute from day one — from the initial traffic composition audit through technical fixes, entity infrastructure, and competitive gap closure.
              </p>

              <div className="checklist-buttons">
                {AUDIT_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`la-seo-prof-step-${idx}`}
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
                  <span>la-seo-professional-protocol.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta" id="la-seo-prof-checklist-cta">
                    Run this audit on your Los Angeles business
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

      {/* ── FAQ SECTION (PAA-driven) ── */}
      <section className="faq-section">
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">People Also Ask</span>
            <h2>Los Angeles SEO Professional: Common Questions Answered</h2>
            <p>The questions Los Angeles business owners ask when evaluating a professional SEO practice — answered directly, without the agency spin.</p>
          </div>

          <div className="faq-grid">

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>What do Los Angeles SEO professional reviews actually tell you?</h2>
              <p>
                Reviews of a Los Angeles SEO professional tell you whether they produce measurable results in competitive LA markets — but only if you read them with the right frame. Look for specificity: named industries, documented outcomes (not vague 'growth'), realistic timeframes (60–180 days), and language that references technical work — crawl audits, schema implementation, redirect cleanup, link acquisition. Generic five-star reviews praising communication and responsiveness tell you nothing about SEO performance. Gobiya's verified client reviews are available on <a href="https://m.yelp.com/biz/gobiya-los-angeles-5" style={{color:'var(--green)'}} target="_blank" rel="noopener noreferrer">Yelp</a> and Google Business Profile, with outcomes attributed to specific work in B2B SaaS, healthcare, and professional services. The most honest proxy for evaluating any Los Angeles SEO professional is to look at the organic performance of their own website — ranking for competitive terms in their own category is the clearest demonstration of competence.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>Who are the top SEO companies in Los Angeles?</h2>
              <p>
                The top SEO companies in Los Angeles are not the largest or the most-advertised — they are the ones with the deepest technical SEO infrastructure and the most defensible track record in specific competitive categories. The LA market has dozens of agencies offering SEO services; the firms that consistently produce results in healthcare, legal, B2B technology, and professional services tend to be boutique practices with engineering-led teams rather than large agencies with broad service offerings and thin specialist depth. When evaluating any Los Angeles SEO company, ask for client tenure (6+ month engagements, not one-time projects), organic performance data tied to pipeline, and a technical audit deliverable that you can have independently reviewed. Gobiya is a boutique Los Angeles practice established in 2012, focused on the B2B and professional services categories where <a href="/insights/b2b-seo-agency" style={{color:'var(--green)'}}>engineering-depth SEO</a> produces the clearest commercial impact.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>How do I verify a Los Angeles SEO professional on LinkedIn?</h2>
              <p>
                Verifying a Los Angeles SEO professional on LinkedIn means looking past the headline and checking the actual engagement history. Real SEO professionals have extended client tenures (6–18 month engagements) rather than a long list of short one-month projects, which are a signal of churn rather than results. They have industry-specific expertise that goes beyond "SEO" — distinguishing between B2B, local, e-commerce, and enterprise SEO, which are genuinely different disciplines. They have published content — articles, case studies, commentary — that demonstrates technical command of the subject rather than just marketing copy. Gobiya's founder Steve Martin has practiced SEO engineering in the Los Angeles market since 2012. His LinkedIn profile at <a href="https://www.linkedin.com/in/stevemartingobiya/" style={{color:'var(--green)'}} target="_blank" rel="noopener noreferrer">linkedin.com/in/stevemartingobiya</a> includes active thought leadership on B2B SEO, GEO, and entity architecture. The Los Angeles SEO LinkedIn search is a useful starting point — but verifying depth requires reading the work, not just the connections count.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>What SEO services does a professional offer in California?</h2>
              <p>
                A professional SEO practice serving California businesses covers a layered set of services — and which layers matter most depends on your category and current performance baseline. Technical SEO (crawl audits, schema, Core Web Vitals, server-side rendering) is universal — every site needs this foundation correct before content or link work can compound. Commercial-intent content architecture — mapping content to buying-committee intent queries rather than high-volume informational keywords — is the layer most California B2B and professional services firms underinvest in. Local SEO for California markets adds <a href="/insights/local-seo" style={{color:'var(--green)'}}>Google Business Profile optimization</a>, NAP citation consistency, and review velocity management for businesses with physical presence or service area coverage. And generative engine optimization addresses visibility in AI-generated answers — a growing share of professional buyer discovery in California's tech-forward markets. The complete picture of how these layers work together is covered in our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice overview</a>.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>What is an affordable SEO company in the USA — and is Gobiya one?</h2>
              <p>
                Affordability in SEO is not defined by the monthly retainer number — it is defined by cost-per-outcome. A $1,200/month SEO program that produces no measurable pipeline contribution for 12 months is expensive. A $4,000/month program that generates 8–12 qualified monthly inquiries in a professional services category with a $6,000+ average case value pays for itself before month two. The right frame is ROI, not rate card. Gobiya prices Los Angeles SEO engagements to be competitive for the outcomes produced, with transparent scope and deliverables agreed before the engagement starts. We do not lock clients into 12-month contracts before demonstrating results — our <a href="/approach" style={{color:'var(--green)'}}>engagement model</a> is built around short initial windows with clear milestones, followed by longer-term programs for clients where the foundation work has produced verifiable movement. For context on realistic professional SEO investment levels, see what our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO practice includes at each tier</a>.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>What is professional SEO — and how is it different from DIY or template approaches?</h2>
              <p>
                Professional SEO is a diagnostic and engineering discipline — not a checklist or a content calendar. It begins with identifying the specific reasons your site is underperforming for commercial-intent queries, not assuming a standard set of deliverables will fix an unknown problem. Implementation is done at the code level, not through plugin dashboards, which means the changes are precise, verifiable, and do not degrade with platform updates. And the strategy is tied to commercial pipeline — which queries drive buyers, which stages of the decision cycle you are missing, what the competitive gap looks like in measurable terms. DIY SEO with tools like Semrush or Ahrefs gives you data; professional SEO uses that data to design and execute the specific changes that close the gap between your current organic performance and what your market position should be. That distinction matters most in competitive markets like Los Angeles, where the sites at the top of professional services categories are being actively maintained by people or teams who understand the technical game being played. Read more in our <a href="/insights/b2b-organic-traffic-growth" style={{color:'var(--green)'}}>B2B organic traffic growth guide</a> on how this looks in practice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── RELATED COMMERCIAL SOLUTIONS CLUSTER ── */}
      <section className="capabilities-section" style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Commercial Solutions</span>
            <h2>Los Angeles SEO Practice: Related Pages &amp; Services</h2>
            <p>Specialized SEO services and location-specific practices from the Gobiya Los Angeles commercial solutions cluster.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/seo-discoverability-agency" style={{color:'inherit',textDecoration:'none'}}>SEO &amp; Discoverability Agency</a></h3>
              <p>The full-stack parent practice covering technical SEO, local Map Pack engineering, generative engine optimization, and organic pipeline systems for Greater Los Angeles clients.</p>
              <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View practice →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">On-Page</div>
              <h3><a href="/on-page-seo-los-angeles" style={{color:'inherit',textDecoration:'none'}}>On-Page SEO Los Angeles</a></h3>
              <p>Engineering-led on-page SEO for Los Angeles businesses: crawl audit, entity schema, Core Web Vitals, and AI crawler compatibility — implemented directly in code, not through plugins.</p>
              <a href="/on-page-seo-los-angeles" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View service →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">AI SEO</div>
              <h3><a href="/ai-seo-beverly-hills" style={{color:'inherit',textDecoration:'none'}}>AI SEO Beverly Hills</a></h3>
              <p>Generative engine optimization and AI citation architecture for Beverly Hills businesses targeting visibility in ChatGPT, Perplexity, and Google AI Overviews alongside traditional rankings.</p>
              <a href="/ai-seo-beverly-hills" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View service →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Local</div>
              <h3><a href="/local-seo-company-burbank" style={{color:'inherit',textDecoration:'none'}}>Local SEO Company Burbank</a></h3>
              <p>Map Pack engineering, GBP optimization, NAP citation consistency, and review velocity systems for Burbank businesses across the 91501–91510 market and adjacent corridors.</p>
              <a href="/local-seo-company-burbank" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View service →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Local</div>
              <h3><a href="/local-seo-glendale" style={{color:'inherit',textDecoration:'none'}}>Local SEO Glendale</a></h3>
              <p>Local SEO engineering for Glendale businesses: Google Business Profile optimization, citation building, and Map Pack strategy for the Brand Boulevard corridor and 91201–91210 market.</p>
              <a href="/local-seo-glendale" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View service →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Local</div>
              <h3><a href="/seo-company-encino" style={{color:'inherit',textDecoration:'none'}}>SEO Company Encino</a></h3>
              <p>Technical and local SEO for Encino businesses along Ventura Boulevard: organic visibility, entity architecture, and local Map Pack engineering for the 91316–91436 market.</p>
              <a href="/seo-company-encino" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View service →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-section">
        <div className="onpage-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2>Start With a Los Angeles SEO Strategy Session</h2>
              <p>
                We run a 15-minute live SEO session for Los Angeles businesses — traffic composition analysis, technical gap review, competitive landscape read, and an honest assessment of what it would take to move your organic pipeline in the next 90 days. No slides, no pitch deck, no commitment. Just a direct read on where your business stands and what a professional SEO engagement would realistically produce.
              </p>
            </div>
            <div className="cta-right">
              <a href="/book" className="btn btn-primary" id="la-seo-prof-footer-cta">Book strategy session</a>
              <span className="subtext">15-min live session · Los Angeles, CA · No commitment</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
