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
      "name": "Gobiya — AI SEO Beverly Hills",
      "url": "https://www.gobiya.com/ai-seo-beverly-hills",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "AI SEO services for Beverly Hills businesses. We engineer Google organic visibility and AI platform citations — ChatGPT, Claude, Gemini — for brands competing in the 90210 market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Beverly Hills", "sameAs": "https://www.wikidata.org/wiki/Q131565" },
        { "@type": "City", "name": "West Hollywood", "sameAs": "https://www.wikidata.org/wiki/Q186419" },
        { "@type": "City", "name": "Bel Air", "sameAs": "https://www.wikidata.org/wiki/Q1624843" }
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
          "name": "We rank well on Google for our main keywords, but when potential clients ask ChatGPT or Perplexity about firms in our category in Beverly Hills, we do not appear. How do we fix that?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Google rankings and AI citation are driven by different mechanisms. AI engines like ChatGPT and Perplexity retrieve answers based on entity confidence — how well your brand is represented in structured, verifiable knowledge sources. To appear in AI-generated responses, your brand entity needs verified schema on your website, presence in directories that AI training pipelines crawl, and content structured with claim-evidence-citation triplets that AI retrieval can extract. Strong Google rankings help but do not transfer directly to AI citation."
          }
        },
        {
          "@type": "Question",
          "name": "We have strong traditional SEO. What specifically changes when optimizing for AI search engines versus Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traditional SEO optimizes for a ranking algorithm that evaluates pages. GEO optimizes for a retrieval model that extracts passages. For Google, you optimize title tags, heading structure, and page authority. For AI engines, you optimize content at the sentence and paragraph level so retrieval models can lift complete, citable answers. The specific techniques are claim-evidence-citation formatting, FAQ schema with specific question phrasing that matches how buyers ask questions of AI assistants, and entity markup connecting your business name to services, location, and credentials."
          }
        },
        {
          "@type": "Question",
          "name": "We are a high-end practice in Beverly Hills and we are concerned about how AI tools describe us. How do we control our AI presence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI language models derive their descriptions of businesses from patterns in their training data — which includes your website content, press coverage, directory listings, and third-party reviews. The most effective way to control your AI representation is to engineer the primary signal sources: publish authoritative, precise content about your practice that matches exactly how you want to be described, and ensure your structured schema and Google Knowledge Panel are accurate and complete. When authoritative sources consistently describe your practice a specific way, that is the description AI models extract and reproduce."
          }
        },
        {
          "@type": "Question",
          "name": "We have been reading that AI is replacing traditional search. Should we be moving marketing budget away from Google SEO toward AI optimization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not away from — alongside. Google still processes the majority of commercial purchase intent traffic. The businesses that have shifted entirely away from Google SEO toward AI platform optimization have generally seen revenue impact, not growth. The right frame is dual-surface: maintain your Google organic presence and expand into AI citation simultaneously. The GEO work required for AI citations also improves your E-E-A-T signals for Google, so it is largely additive rather than a trade-off."
          }
        }
      ]
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Beverly Hills Brand Entity Setup",
    short: "Register your entity across knowledge graphs tied to Beverly Hills coordinates.",
    detail: "ChatGPT, Google AI Overviews, and Gemini verify businesses through entity graphs — Wikidata, Google Knowledge Graph, structured schema. We build a complete entity representation linking your Beverly Hills address, phone, services, and principal to verifiable public data sources. Without this foundation, AI engines route buyer queries to competitors regardless of content quality."
  },
  {
    title: "02. AI Citation Architecture (GEO)",
    short: "Structure content for passage-level extraction by ChatGPT, Claude, and Gemini.",
    detail: "Generative Engine Optimization formats content so AI retrieval pipelines extract your answers when buyers query. We structure Beverly Hills service pages with claim-evidence-citation triplets, FAQ schema, and passage-level formatting that passes through GPTBot, ClaudeBot, and Applebot. This is the technical layer that converts content into citations — not likes, not shares, citations."
  },
  {
    title: "03. Google Map Pack Engineering",
    short: "Dominate the Beverly Hills local 3-pack for high-intent commercial queries.",
    detail: "The Beverly Hills Map Pack for queries like 'SEO agency Beverly Hills 90210' and 'digital marketing firm near me' is won through GBP optimization, NAP citation consistency, and review velocity — not keyword density. We engineer your local entity signal to outrank competitors on mobile map results and the local knowledge panel, the two placements that capture buyers already in the purchase window."
  },
  {
    title: "04. Intent-Mapped Content for Luxury Buyers",
    short: "Content calibrated to the research behavior of high-net-worth and enterprise buyers.",
    detail: "Beverly Hills buyers are sophisticated. Executives, attorneys, wealth managers, and entertainment industry buyers don't respond to generic sales copy. We map content to the specific research-to-decision journey of your buyer persona — structured topic clusters that answer precise questions before they're asked, on both Google and inside AI-generated responses."
  }
];

export default function AiSeoBeverlyHillsPage() {
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
              <span>Beverly Hills</span>
            </nav>

            <h1>
              <span className="line"><span>AI SEO</span></span>
              <span className="line"><span className="accent">Beverly Hills.</span></span>
            </h1>

            <p className="hero-sub">
              Gobiya is a Los Angeles SEO and GEO agency founded in 2010 that builds entity graphs and AI citation signals for luxury businesses and professional practices in Beverly Hills, CA (ZIP 90210). The agency builds entity graphs, structured knowledge signals, and AI-readable content architectures that secure citations across every surface where high-net-worth buyers discover brands. <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>Our SEO &amp; Discoverability practice</a> has operated in this market since 2012.
            </p>

            <div className="hero-specs">
              <div className="spec-item">
                <span className="label">Market</span>
                <span className="val">Beverly Hills, CA 90210</span>
              </div>
              <div className="spec-item">
                <span className="label">Engines</span>
                <span className="val">Google + ChatGPT, Claude, Gemini</span>
              </div>
              <div className="spec-item">
                <span className="label">Category</span>
                <span className="val">SEO &amp; Discoverability</span>
              </div>
            </div>
          </div>

          <div className="hero-widget" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <HeroQuickForm source="AI SEO Beverly Hills" variant="light" accent="#2F5D50" heading="Request a Beverly Hills AI SEO audit" subheading="Tell us about your business and we’ll send a quick read." style={{ maxWidth: '100%' }} />
          </div>

        </div>
      </section>

      {/* ── FROM HOLLYWOOD TO BEVERLY HILLS ── */}
      <section className="capabilities-section" style={{ background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">Our Origin Story</span>
            <h2>From Hollywood to Koreatown. Now Beverly Hills.</h2>
            <p>
              Gobiya did not start on the Westside. We built our search engineering practice in two of Los Angeles' most competitive and underserved digital markets — and what we learned there became the system we deploy in Beverly Hills today.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Hollywood</div>
              <h3>Where We Cut Our Teeth on Competitive SEO</h3>
              <p>
                Hollywood's entertainment, hospitality, and creative agency market is brutal — dozens of vendors chasing the same high-value clients, with no loyalty and infinite noise. We learned to build search systems that differentiated brands at the entity level, not just the keyword level. Citation authority, entity verification, AI discoverability — we were engineering these before the industry had names for them. That forensic architecture, refined across some of LA's most competitive search environments, is what we bring to Beverly Hills today.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Koreatown</div>
              <h3>Where We Mastered Local AI SEO at Scale</h3>
              <p>
                Koreatown on Wilshire Corridor is one of the highest-density business districts in Los Angeles — a market where local map pack position determines whether a business survives. We ran NAP audits, GBP recovery, and citation engineering for professional services and medical providers across K-Town's dense grid. That precision work shaped how we handle multi-signal local AI SEO today — and those same clients are still active.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">Beverly Hills</div>
              <h3>Same System. Higher Stakes Market.</h3>
              <p>
                Beverly Hills brings a different buyer profile — higher AOV, more sophisticated research behavior, longer decision cycles — but the same underlying challenge: getting found when a high-intent buyer searches on Google or asks ChatGPT. We apply the same entity-first architecture we built in Hollywood and Koreatown, calibrated for the luxury and professional services vertical. The <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability methodology</a> does not change by zip code. Precision does.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">The System</div>
              <h3>Entity Graphs, AI Citations, Local Authority</h3>
              <p>
                Every market engagement starts with the same three-layer foundation: (1) entity verification across Wikidata, Google Knowledge Graph, and structured schema; (2) GEO architecture that formats content for AI engine extraction and citation; (3) local signal engineering for Google Map Pack dominance. From Hollywood to Koreatown to Beverly Hills, this sequence does not change — because the way AI engines verify and cite businesses does not change by neighborhood. Read more in our guide to <a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" style={{color:'var(--green)'}}>how LLMs verify business information</a>.
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
            <h2>AI SEO Capabilities for Beverly Hills Businesses</h2>
            <p>
              The Beverly Hills market demands search engineering that works across two surfaces simultaneously: Google's organic algorithm and the AI discovery layer where an increasing share of high-intent buyers now start. Our <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>SEO &amp; Discoverability practice</a> covers both.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">01</div>
              <h3>AI Entity Graph Engineering</h3>
              <p>
                We construct a complete, verifiable entity graph for your Beverly Hills business — linking your brand to Google Knowledge Graph, Wikidata, and structured JSON-LD schema. Without this, AI engines like ChatGPT and Gemini will not cite you regardless of content quality. Entity graphs are the infrastructure layer that makes AI citations possible. Related: <a href="/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo" style={{color:'var(--green)'}}>Knowledge Graph vs. GEO</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">02</div>
              <h3>Generative Engine Optimization (GEO)</h3>
              <p>
                GEO is the discipline of making your content readable, extractable, and citable by AI language models. We format your Beverly Hills service pages with claim-evidence-citation structures, FAQ schema, and passage-level density that AI retrieval pipelines favor. When a buyer asks ChatGPT for the best SEO agency in Beverly Hills, a GEO-optimized entity gets cited — an unoptimized one does not. See our <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)'}}>GEO technical guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">03</div>
              <h3>Local SEO &amp; Beverly Hills Map Pack</h3>
              <p>
                Dominating the Google Map Pack for "SEO agency Beverly Hills," "marketing firm 90210," and adjacent queries requires GBP optimization, citation consistency across 40+ directories, and engineered review velocity. We do not use plugin-based local SEO tools — we work directly at the data layer to align every signal Google uses to rank local results. For deeper context, read our <a href="/insights/local-seo" style={{color:'var(--green)'}}>local SEO strategy guide</a>.
              </p>
            </div>

            <div className="grid-card">
              <div className="card-num">04</div>
              <h3>Technical SEO &amp; Core Web Vitals</h3>
              <p>
                Page speed, crawl efficiency, canonical structure, and Core Web Vitals are table stakes in any competitive market — and Beverly Hills is no exception. We execute code-level fixes, not plugin patches: eliminating redirect chains, injecting structured data server-side, optimizing image delivery, and securing 90+ Lighthouse performance scores. The technical foundation that supports <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)'}}>organic discoverability</a> starts here.
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
              <h2>How We Engineer AI SEO in Beverly Hills</h2>
              <p>The four-step sequence we execute on every Beverly Hills engagement — from entity setup to AI citation deployment.</p>

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
                  <span>engagement-protocol.log</span>
                </div>
                <div className="card-body">
                  <h4>{AUDIT_STEPS[activeChecklist].title}</h4>
                  <p className="short-desc">{AUDIT_STEPS[activeChecklist].short}</p>
                  <hr />
                  <p className="long-desc">{AUDIT_STEPS[activeChecklist].detail}</p>
                  <a href="/book" className="card-cta">
                    Apply this to your Beverly Hills brand
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
            <h2>Frequently Asked Questions About AI SEO</h2>
            <p>
              The questions buyers in Beverly Hills ask before engaging an AI SEO firm — answered directly, without the fluff.
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We rank well on Google for our main keywords, but when potential clients ask ChatGPT or Perplexity about firms in our category in Beverly Hills, we do not appear. How do we fix that?</h2>
              <p>
                Google rankings and AI citation are driven by different mechanisms. AI engines like ChatGPT and Perplexity retrieve answers based on entity confidence — how well your brand is represented in structured, verifiable knowledge sources. To appear in AI-generated responses for Beverly Hills service queries, your brand entity needs verified schema on your website, presence in directories and data sources that AI training pipelines crawl, and content structured with claim-evidence-citation triplets that AI retrieval can extract at the passage level. Strong Google rankings help but do not transfer directly to AI citation — the GEO layer requires its own work.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We have strong traditional SEO. What specifically changes when optimizing for AI search engines versus Google?</h2>
              <p>
                Traditional SEO optimizes for a ranking algorithm that evaluates pages. GEO optimizes for a retrieval model that extracts passages. For Google, you optimize title tags, heading structure, and page authority. For AI engines, you optimize content at the sentence and paragraph level so retrieval models can lift complete, citable answers directly from your pages. The specific techniques are claim-evidence-citation formatting (state the claim, support it with data, cite the source — all in two to three sentences), FAQ schema with specific question phrasing that matches how buyers ask questions of AI assistants, and entity markup that connects your business name to the services, location, and credentials that should appear in an AI-generated response.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We are a high-end practice in Beverly Hills and we are concerned about how AI tools describe us. We do not want to be grouped with lower-tier competitors. How do we control our AI presence?</h2>
              <p>
                AI language models derive their descriptions of businesses from patterns in their training data — which includes your website content, press coverage, directory listings, and third-party reviews or mentions. The most effective way to control your AI representation is to engineer the primary signal sources: publish authoritative, precise content about your practice that matches exactly how you want to be described, and ensure your structured schema, Google Knowledge Panel, and entity graph are accurate and complete. When the authoritative sources consistently describe your practice a specific way, that is the description AI models extract and reproduce.
              </p>
            </div>

            <div className="faq-item">
              <h2 style={{fontSize:'1.1rem', fontWeight:600, fontFamily:'var(--font-display)', lineHeight:1.4, color:'var(--ink)', marginBottom:0}}>We have been reading that AI is replacing traditional search. Should we be moving marketing budget away from Google SEO toward AI optimization?</h2>
              <p>
                Not away from — alongside. Google still processes the majority of commercial purchase intent traffic. The businesses that have shifted entirely away from Google SEO toward AI platform optimization have generally seen revenue impact, not growth. The right frame is dual-surface: maintain your Google organic presence and expand into AI citation simultaneously. The GEO work required for AI citations also improves your E-E-A-T signals for Google, so it is largely additive rather than a trade-off. The budget reallocation question to ask is not "Google vs. AI" but "what are we doing that produces neither Google rankings nor AI citations" — that is where the reallocation opportunity is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES & ARTICLES ── */}
      <section className="capabilities-section" style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper-2)' }}>
        <div className="onpage-container">
          <div className="section-head">
            <span className="mono-tag">SEO &amp; Discoverability Cluster</span>
            <h2>Related Services &amp; Deep Dives</h2>
            <p>Resources from the SEO &amp; Discoverability practice cluster that directly support Beverly Hills AI SEO strategy.</p>
          </div>

          <div className="capabilities-grid">
            <div className="grid-card">
              <div className="card-num">Service</div>
              <h3><a href="/performance/seo-discoverability-agency" style={{color:'inherit', textDecoration:'none'}}>SEO &amp; Discoverability Agency</a></h3>
              <p>The parent service practice covering Technical SEO, GEO, AI Citations, and organic pipeline engineering for B2B and enterprise brands. Beverly Hills AI SEO is a specific market application of this system.</p>
              <a href="/performance/seo-discoverability-agency" style={{color:'var(--green)', fontSize:'0.85rem', fontFamily:'var(--font-mono)', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'0.4rem'}}>
                View full practice →
              </a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'inherit', textDecoration:'none'}}>Generative Engine Optimization (GEO)</a></h3>
              <p>The technical playbook for getting cited on ChatGPT, Claude, Perplexity, and Google AI Overviews. Covers RAG pipelines, passage-level formatting, entity triangulation, and citation-signal engineering.</p>
              <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" style={{color:'var(--green)', fontSize:'0.85rem', fontFamily:'var(--font-mono)', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'0.4rem'}}>
                Read the guide →
              </a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" style={{color:'inherit', textDecoration:'none'}}>LLM Company Verification: What AI Bots Crawl</a></h3>
              <p>How ChatGPT and Claude verify business information — covering Wikidata, LinkedIn, review portals, and structured schema. The foundation for understanding why entity graphs matter in Beverly Hills AI SEO.</p>
              <a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" style={{color:'var(--green)', fontSize:'0.85rem', fontFamily:'var(--font-mono)', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'0.4rem'}}>
                Read the guide →
              </a>
            </div>

            <div className="grid-card">
              <div className="card-num">Guide</div>
              <h3><a href="/insights/chatgpt-vs-google-for-business-discovery" style={{color:'inherit', textDecoration:'none'}}>ChatGPT vs Google: Business Discovery Trends</a></h3>
              <p>Comparing conversion rates and buyer behavior across ChatGPT and Google search. The data that explains why Beverly Hills businesses need visibility on both surfaces — not just Google alone.</p>
              <a href="/insights/chatgpt-vs-google-for-business-discovery" style={{color:'var(--green)', fontSize:'0.85rem', fontFamily:'var(--font-mono)', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'0.4rem'}}>
                Read the guide →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="onpage-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2>Start Your Beverly Hills AI SEO Engagement</h2>
              <p>
                We run a 15-minute live forensic session for Beverly Hills businesses — entity gap analysis, AI citation audit, and Map Pack positioning review. No decks, no sales pitch. Just a direct read on where your brand sits on Google and AI platforms right now, and what it would take to fix it.
              </p>
            </div>
            <div className="cta-right">
              <a href="/book" className="btn btn-primary">Book Beverly Hills audit</a>
              <span className="subtext">15-min live session · Beverly Hills, CA · No commitment</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
