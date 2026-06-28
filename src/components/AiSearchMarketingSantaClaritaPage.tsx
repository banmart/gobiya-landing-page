import React, { useEffect, useRef, useState } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import './OnPageSeoLosAngelesPage.css';

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    q: 'We rank well on Google for our main keywords in Santa Clarita, but when prospects ask ChatGPT or Perplexity about vendors in our category near them, our company does not come up. How do we change that?',
    a: 'Google organic rankings and AI citation are driven by completely different signals. AI engines like ChatGPT and Perplexity surface businesses based on entity confidence — how well your brand is represented in structured, machine-readable knowledge sources. To appear in AI-generated responses for Santa Clarita category queries, your brand entity needs verified schema markup on your site, presence in data sources that AI training pipelines crawl (Wikidata, data aggregators, authoritative directories), and content formatted with claim-evidence-citation structure that retrieval models can extract at the passage level. Strong Google rankings are a helpful signal but they do not carry directly into AI citation — the GEO layer is a separate engineering effort.',
  },
  {
    q: 'We already invest in Santa Clarita SEO and Google Ads. Is AI search marketing a replacement for those or something we run alongside them?',
    a: 'Alongside, not instead of. Google still processes the majority of high-intent commercial searches, and your existing SEO and paid investment should not be abandoned. What AI search marketing adds is coverage of the discovery surface that Google does not touch — the 35 to 40 percent of commercial research journeys that now begin with a question asked directly to ChatGPT, Perplexity, or Google AI Overviews. A buyer who asks an AI assistant "who are the best commercial contractors in Santa Clarita" before they ever open a browser is running a query your traditional SEO cannot capture. The programs that win in 2026 run Google and AI discovery simultaneously, and the technical work for GEO often strengthens your E-E-A-T signals for Google as a side effect.',
  },
  {
    q: 'A competitor in the Santa Clarita Valley keeps appearing in AI answers when our category comes up. How do we find out what signals are driving that?',
    a: 'The signals AI engines use to cite a business fall into three categories. First, entity authority — are they listed in Wikidata, does their Google Knowledge Panel exist and match their website schema, is their business information consistent across the data aggregators AI training pipelines scrape? Second, content citability — do their pages have the passage-level structure (specific claims, supporting data, source attribution in tight paragraphs) that retrieval models prefer for extraction? Third, coverage breadth — do they appear in third-party editorial content, press mentions, and industry directories that AI training sets index heavily? A citation audit usually identifies which of the three your competitor is winning on within the first session.',
  },
  {
    q: 'We need leads this quarter, not next year. How long does AI search marketing take to start showing real results?',
    a: 'The honest answer depends on where you are starting from. If your entity foundation (schema, GBP, data aggregator presence) is weak, the first 30 to 45 days are foundational work — entity registration, content restructuring, citation source alignment. Early AI citations for lower-competition Santa Clarita queries often appear within 30 to 60 days of GEO deployment. Competitive category queries take longer — 90 to 120 days is realistic for consistent citation presence. If you need leads this quarter specifically, the fastest path is running Google Ads in parallel while the AI search layer builds. AI search compounds over time in a way paid ads do not — once a citation is established and reinforced, it tends to persist across queries without ongoing spend.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya — AI Search Marketing Santa Clarita',
      url: 'https://www.gobiya.com/ai-search-marketing-santa-clarita',
      logo: 'https://www.gobiya.com/images/gobiya---logo.webp',
      foundingDate: '2012',
      description: 'AI search marketing for Santa Clarita businesses. We engineer Google organic visibility and AI platform citations — ChatGPT, Perplexity, Google AI Overviews — for brands competing across the Valencia corridor and the broader SCV market.',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      priceRange: '$$$$',
      areaServed: [
        { '@type': 'City', 'name': 'Santa Clarita', 'sameAs': 'https://www.wikidata.org/wiki/Q675577' },
        { '@type': 'City', 'name': 'Valencia', 'sameAs': 'https://www.wikidata.org/wiki/Q2521699' },
        { '@type': 'City', 'name': 'Newhall', 'sameAs': 'https://www.wikidata.org/wiki/Q6004047' },
        { '@type': 'City', 'name': 'Stevenson Ranch', 'sameAs': 'https://www.wikidata.org/wiki/Q7612820' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3580 Wilshire Blvd, Ste 132',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90010',
        addressCountry: 'US',
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      ],
      sameAs: [
        'https://www.linkedin.com/in/stevemartingobiya/',
        'https://m.yelp.com/biz/gobiya-los-angeles-5',
        'https://www.facebook.com/people/Gobiya/100064043744190/',
      ],
    },
    {
      '@type': 'Service',
      serviceType: 'AI Search Marketing Santa Clarita',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      description: 'AI search marketing for Santa Clarita and the Santa Clarita Valley: GEO architecture for ChatGPT and Perplexity citation, Google organic SEO, local Map Pack engineering, and entity graph construction for brands in the Valencia business corridor and surrounding SCV markets.',
      areaServed: { '@type': 'City', name: 'Santa Clarita' },
      url: 'https://www.gobiya.com/ai-search-marketing-santa-clarita',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const AUDIT_STEPS = [
  {
    title: '01. Santa Clarita Entity Foundation',
    short: 'Build the machine-readable entity layer that AI engines verify before citing your brand.',
    detail: 'ChatGPT, Gemini, and Perplexity do not cite businesses they cannot verify. We establish your brand entity across Google Knowledge Graph, structured JSON-LD schema, and Wikidata — connecting your Santa Clarita address, services, principal, and credentials to verifiable public data sources. For businesses in the Valencia business parks, this includes industry-specific entity signals (contractor licensing, professional certifications, service area data) that AI engines weight heavily when generating category responses. Without this layer, content quality and Google rankings are irrelevant to AI citation.',
  },
  {
    title: '02. GEO — AI Citation Architecture',
    short: 'Restructure content so retrieval models extract your brand as the cited answer.',
    detail: 'Generative Engine Optimization formats your service pages at the passage level so AI retrieval pipelines pull your content when buyers ask category questions. For Santa Clarita businesses, this means restructuring existing content into claim-evidence-citation triplets, deploying FAQ schema with question phrasing that matches how buyers actually phrase queries to AI assistants, and ensuring content density is tight enough for extraction without requiring the model to read the full page. The result is content that functions as a Google page and an AI citation source simultaneously — the two surfaces now require the same underlying precision, applied differently.',
  },
  {
    title: '03. Google Organic + Local Map Pack',
    short: 'Secure Map Pack and organic positions for Santa Clarita commercial queries in parallel.',
    detail: 'AI search marketing does not replace Google SEO — it runs on top of it. For most Santa Clarita businesses, the majority of inbound leads still originate from Google Maps and Google organic results. We engineer GBP category alignment, NAP consistency across 40+ data sources, review velocity, and LocalBusiness schema to hold Map Pack positions across the Santa Clarita Valley. Technical SEO — crawl efficiency, Core Web Vitals, canonical structure — runs concurrently. Google authority also feeds the entity confidence score that AI engines use, so organic and AI work compounds in the same direction.',
  },
  {
    title: '04. AI Search Pipeline Measurement',
    short: 'Track citation presence, entity coverage, and AI discovery contribution to pipeline.',
    detail: 'Most agencies cannot show you where your AI citations are because they do not measure them. We run monthly citation audits across ChatGPT, Perplexity, and Google AI Overviews for your target queries — documenting which questions cite your brand, which cite competitors, and where gaps exist in the category coverage. For B2B clients in Santa Clarita, we layer this against pipeline data: tracing which inbound leads mention AI-assisted research in their intake responses. The measurement infrastructure is what turns AI search marketing from a branding exercise into a revenue engineering program.',
  },
];

export default function AiSearchMarketingSantaClaritaPage() {
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
          scrollTrigger: { trigger: '.onpage-page .capabilities-section', start: 'top 80%' },
        });

        gsap.from('.onpage-page .checklist-split', {
          opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.onpage-page .checklist-section', start: 'top 80%' },
        });

        gsap.from('.onpage-page .faq-item', {
          opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.onpage-page .faq-section', start: 'top 85%' },
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
              <span>Santa Clarita</span>
            </nav>

            <h1>
              <span className="line"><span>AI Search Marketing</span></span>
              <span className="line"><span className="accent">Santa Clarita.</span></span>
            </h1>

            <p className="hero-sub">
              AI search marketing in Santa Clarita means engineering your brand to be found and cited on ChatGPT, Perplexity, and Google AI Overviews — not just ranking in traditional search results. For businesses in the Valencia corridor, Newhall, and the broader Santa Clarita Valley, the buyer research shift is already happening: a substantial share of B2B purchasing decisions and high-consideration consumer choices now begin with a question asked directly to an AI assistant, before the buyer ever visits a website. If your brand does not appear in those AI-generated answers, you are invisible to that segment of the market no matter how well you rank on Google. <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>Our SEO &amp; Discoverability practice</a> builds AI search visibility alongside Google authority for Santa Clarita businesses that need both.
            </p>

            <div className="hero-actions">
              <a href="/book" className="btn btn-primary">Book Santa Clarita audit</a>
              <a href="/case-studies" className="btn btn-ghost">View case studies</a>
            </div>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Market</span>
                <span className="val">Santa Clarita Valley, CA</span>
              </div>
              <div className="spec-item">
                <span className="label">Engines</span>
                <span className="val">Google + ChatGPT, Perplexity, AI Overviews</span>
              </div>
              <div className="spec-item">
                <span className="label">Category</span>
                <span className="val">AI Search &amp; Discoverability</span>
              </div>
            </div>
          </div>

          <div className="hero-widget">
            <div className="widget-card">
              <div className="widget-head">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span>scv-ai-search-audit.log</span>
              </div>
              <div className="widget-body">
                <div className="log-line success">[OK] Initializing Gobiya AI Search Engine — Santa Clarita v3.1...</div>
                <div className="log-line">[SCANNING] Target market: Santa Clarita Valley, CA 91355</div>
                <div className="log-line">[SCANNING] AI citation gap analysis: ChatGPT, Gemini, Perplexity...</div>
                <div className="log-line warn">[WARNING] Brand entity absent from AI knowledge sources</div>
                <div className="log-line warn">[WARNING] 0 AI citations found for target queries in Santa Clarita</div>
                <div className="log-line info">[INFO] 24 open commercial queries with no competitor AI citations</div>
                <div className="log-line info">[INFO] AI search gap index: SCV market underpenetrated</div>
                <div className="log-line success">[FIXED] Entity graph injected: schema, GBP, data aggregators aligned</div>
                <div className="log-line success">[FIXED] GEO architecture deployed — 3 AI platforms targeted</div>
                <div className="log-line-final">Pipeline active — first AI citations estimated: 21–30 days.</div>
              </div>
              <div className="widget-foot">
                <span>Santa Clarita, CA 91355</span>
                <span>AI Search · GEO · Local</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY SANTA CLARITA ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">The Santa Clarita AI Opportunity</span>
            <h2>Why the SCV Market Is Underserved in AI Search</h2>
            <p>
              Santa Clarita is the fourth-largest city in Los Angeles County, with a business base concentrated in professional services, healthcare, manufacturing, and B2B contractors. Almost none of those businesses are optimized for AI search — which means early movers in the SCV market can establish AI citations before competition locks them out.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">The Shift</div>
              <h3>Where B2B Buyers Start Their Research Now</h3>
              <p>
                A growing portion of commercial purchasing decisions — particularly in B2B professional services, healthcare vendor selection, and high-ticket contracting — begin with a question asked to an AI assistant rather than a Google search. Studies tracking B2B research behavior in 2025 found that AI-assisted research precedes 35 to 40 percent of enterprise vendor discovery sessions. For businesses in the Valencia corporate parks serving clients in construction, aerospace supply chain, and professional services, this is not a future trend — it is where your buyers are researching right now. The question is whether they find you or a competitor in those AI-generated answers.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">The Gap</div>
              <h3>Santa Clarita Marketing Has Not Caught Up</h3>
              <p>
                Most Santa Clarita businesses still operate with a traditional digital marketing stack: a Google Ads campaign, a website optimized for a handful of local search terms, and a Google Business Profile that may or may not be current. That stack captures buyers who already know what they're looking for and where to look. It does not capture the buyer who asks ChatGPT "who are the most reliable commercial electrical contractors in the Santa Clarita Valley" and acts on the first two answers. The local <a href="/insights/what-are-ai-seo-services" style={{color:'var(--green)'}}>AI SEO gap</a> is real, measurable, and closing — businesses that move first will own the citation position for their category before competitors realize the surface exists.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">The Buyer</div>
              <h3>AI Search Sales Navigator: How Buyers Find Vendors</h3>
              <p>
                The term "AI search sales navigator" captures something real: sophisticated buyers are now using AI chat tools as a research layer that sits above Google. They prompt for vendor recommendations, ask follow-up questions about specific companies, and request comparisons — all before visiting a single website. For a Santa Clarita professional services firm or B2B contractor, appearing in those AI-generated vendor lists is the equivalent of being on the first page of Google in 2012. The <a href="/insights/chatgpt-vs-google-for-business-discovery" style={{color:'var(--green)'}}>ChatGPT vs. Google discovery comparison</a> we published breaks down exactly where these two surfaces differ and which queries AI platforms now dominate.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">The Advantage</div>
              <h3>Dual-Surface Authority: Google and AI Simultaneously</h3>
              <p>
                The good news is that the technical work required for AI search marketing and traditional <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>Santa Clarita SEO</a> reinforces each other. Entity graph construction improves Google Knowledge Panel accuracy. GEO content structure improves E-E-A-T signals for Google's organic algorithm. Citation diversity across authoritative directories benefits both Google local authority and AI engine verification confidence. Running both surfaces from the same strategic foundation is more efficient than treating them as separate programs — and it is what businesses that want to dominate Santa Clarita search in 2026 are doing.
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
            <h2>AI Search Marketing Capabilities for Santa Clarita</h2>
            <p>
              Santa Clarita marketing in 2026 requires a search presence that works across two surfaces: Google's ranking algorithm and the AI discovery layer where an increasing share of buyers now research before they ever contact a vendor. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice</a> is built to cover both from a single integrated program.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>AI Entity Graph Engineering</h3>
              <p>
                We construct a complete, verifiable entity graph for your Santa Clarita business — linking your brand to Google Knowledge Graph, Wikidata, and structured JSON-LD schema on your site. This is the infrastructure layer that makes AI citations possible. Without a verified entity, AI engines like ChatGPT and Perplexity will not cite your business in category responses regardless of content quality or Google ranking. Related: <a href="/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo" style={{color:'var(--green)'}}>Knowledge Graph optimization vs. GEO</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Generative Engine Optimization (GEO)</h3>
              <p>
                GEO is the technical discipline of making your content readable, extractable, and citable by AI language models. We format your Santa Clarita service pages with claim-evidence-citation structures, FAQ schema with buyer-realistic question phrasing, and passage-level density that AI retrieval pipelines favor over generic long-form content. When a buyer asks Perplexity for the top marketing companies near Santa Clarita, a GEO-optimized entity gets cited — an unoptimized one does not appear in the output at all. See our <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)'}}>full GEO technical guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>Local SEO &amp; Santa Clarita Map Pack</h3>
              <p>
                The Santa Clarita Map Pack for queries like "contractor SCV," "accountant Valencia CA," and "marketing agency near me Santa Clarita" is won through GBP category precision, NAP citation consistency across 40+ directories, and engineered review velocity — not keyword density. We work directly at the data layer to align every signal Google uses to rank local results, and we configure service area coverage for the full SCV geography: Valencia, Newhall, Canyon Country, Stevenson Ranch, and Saugus. For context on what drives local visibility, see our <a href="/insights/local-seo-explained" style={{color:'var(--green)'}}>local SEO explained guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Technical SEO &amp; Site Performance</h3>
              <p>
                Page speed, crawl efficiency, canonical structure, and Core Web Vitals are prerequisites for both Google ranking and AI indexability. AI crawlers — GPTBot, ClaudeBot, Applebot — follow the same crawl rules as Googlebot and cannot extract content from pages that block bots, load too slowly, or have JavaScript rendering issues. We execute code-level fixes: redirect chain elimination, server-side schema injection, image delivery optimization, and structured navigation that AI crawlers can traverse. The technical foundation that supports <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>organic discoverability</a> is where every engagement starts.
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
              <h2>How We Build AI Search Marketing in Santa Clarita</h2>
              <p>The four-phase sequence we run on every Santa Clarita engagement — from entity foundation to measurable AI pipeline contribution.</p>

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
                  <span>scv-engagement-protocol.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta">
                    Apply this to your Santa Clarita brand
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
            <span className="mono-tag">Common questions</span>
            <h2>AI Search Marketing Santa Clarita: What Businesses Ask</h2>
            <p>
              The questions Santa Clarita business owners ask before engaging an AI search marketing program — answered directly.
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We rank well on Google for our main keywords in Santa Clarita, but when prospects ask ChatGPT or Perplexity about vendors in our category near them, our company does not come up. How do we change that?</h2>
              <p>
                Google organic rankings and AI citation are driven by completely different signals. AI engines like ChatGPT and Perplexity surface businesses based on entity confidence — how well your brand is represented in structured, machine-readable knowledge sources. To appear in AI-generated responses for Santa Clarita category queries, your entity needs verified schema on your site, presence in the data sources AI training pipelines crawl, and content formatted with claim-evidence-citation structure that retrieval models extract at the passage level. Strong Google rankings help but do not transfer directly into AI citation — the <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)'}}>GEO layer</a> is a separate engineering effort.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We already invest in Santa Clarita SEO and Google Ads. Is AI search marketing a replacement for those or something we run alongside them?</h2>
              <p>
                Alongside, not instead of. Google still processes the majority of high-intent commercial searches, and your existing investment should not be abandoned. What <a href="/performance/ai-llms-business-agency" style={{color:'var(--green)'}}>AI search marketing</a> adds is coverage of the 35 to 40 percent of research journeys that now begin with a question asked directly to an AI assistant before the buyer ever opens a browser. A buyer who asks ChatGPT "who are the best commercial contractors in Santa Clarita" is running a query your traditional SEO cannot capture. The programs that win run Google and AI discovery simultaneously — and the GEO work often strengthens your E-E-A-T signals for Google as a by-product.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>A competitor in the Santa Clarita Valley keeps appearing in AI answers when our category comes up. How do we find out what signals are driving that?</h2>
              <p>
                The signals AI engines use to cite a business fall into three categories. First, entity authority — verified Wikidata presence, accurate Google Knowledge Panel, schema matched to GBP. Second, content citability — passage-level structure with specific claims and supporting data in tight paragraphs. Third, coverage breadth — presence in editorial content, press mentions, and industry directories that AI training sets index heavily. A <a href="/insights/brand-entity-extraction-perception-drift" style={{color:'var(--green)'}}>brand entity audit</a> usually identifies which of the three your competitor is winning on within the first session. Knowing the gap is the first step to closing it.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We need leads this quarter, not next year. How long does AI search marketing take to start showing real results?</h2>
              <p>
                Early AI citations for lower-competition Santa Clarita queries often appear within 30 to 60 days of GEO deployment when the entity foundation is in place. Competitive category queries take 90 to 120 days for consistent citation presence. If you need leads this quarter specifically, the fastest path is running Google Ads in parallel while the AI search layer builds — paid search can be turned on within days. AI search compounds in a way paid ads do not: once a citation is established and reinforced, it persists across queries without ongoing spend. The combination of immediate paid coverage and compounding AI citation is the strategy we run for most Santa Clarita clients who need near-term results and long-term independence from ad spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CLUSTER ── */}
      <section className="capabilities-section" style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">AI Search &amp; Discoverability Cluster</span>
            <h2>Related Services &amp; Deep Dives</h2>
            <p>Resources from the SEO &amp; Discoverability practice cluster that directly support Santa Clarita AI search strategy.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/seo-discoverability-agency" style={{color:'inherit',textDecoration:'none'}}>SEO &amp; Discoverability Agency</a></h3>
              <p>The parent practice covering Technical SEO, GEO, AI citations, and organic pipeline engineering. Santa Clarita AI search marketing is a specific market application of this full-stack system.</p>
              <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View practice →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/ai-llms-business-agency" style={{color:'inherit',textDecoration:'none'}}>AI &amp; LLMs for Business</a></h3>
              <p>How businesses integrate AI tools into their operations and visibility stack. Covers LLM-readiness, AI content infrastructure, and making your brand machine-readable for automated research agents.</p>
              <a href="/performance/ai-llms-business-agency" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View service →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Location</div>
              <h3><a href="/ai-seo-beverly-hills" style={{color:'inherit',textDecoration:'none'}}>AI SEO Beverly Hills</a></h3>
              <p>Our Beverly Hills AI SEO program — the same dual-surface architecture applied to the 90210 luxury and professional services market. Useful context for SCV businesses serving high-net-worth clients across greater LA.</p>
              <a href="/ai-seo-beverly-hills" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>View program →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'inherit',textDecoration:'none'}}>Generative Engine Optimization (GEO)</a></h3>
              <p>The technical playbook for getting cited on ChatGPT, Claude, Perplexity, and Google AI Overviews. Covers RAG pipeline mechanics, passage-level formatting, entity triangulation, and citation-signal engineering.</p>
              <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/chatgpt-vs-google-for-business-discovery" style={{color:'inherit',textDecoration:'none'}}>ChatGPT vs. Google for Business Discovery</a></h3>
              <p>A data-backed comparison of how buyer discovery differs between ChatGPT and Google — which query types each platform dominates, and how to structure content to win both surfaces.</p>
              <a href="/insights/chatgpt-vs-google-for-business-discovery" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read analysis →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" style={{color:'inherit',textDecoration:'none'}}>What Data Sources Do LLMs Crawl?</a></h3>
              <p>An audit of the specific data sources — aggregators, directories, public databases, web crawls — that AI language models use to verify business information and determine citation eligibility.</p>
              <a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/brand-entity-extraction-perception-drift" style={{color:'inherit',textDecoration:'none'}}>Brand Entity Extraction &amp; Perception Drift</a></h3>
              <p>How AI models form — and sometimes distort — their understanding of your brand. What causes perception drift, how to audit it, and how to realign your entity representation across AI platforms.</p>
              <a href="/insights/brand-entity-extraction-perception-drift" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/what-are-ai-seo-services" style={{color:'inherit',textDecoration:'none'}}>What Are AI SEO Services?</a></h3>
              <p>A plain-language breakdown of what AI SEO services actually include, what they do not include, and how to evaluate whether an agency's offering is substantive or rebranded traditional SEO.</p>
              <a href="/insights/what-are-ai-seo-services" style={{color:'var(--green)',fontSize:'0.85rem',fontFamily:'var(--font-mono)',letterSpacing:'0.06em',textTransform:'uppercase',marginTop:'1rem',display:'inline-flex',alignItems:'center',gap:'0.4rem'}}>Read guide →</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
