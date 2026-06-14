import React, { useEffect, useRef, useState } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ApproachPage.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const schemas: Record<string, string> = {
  business: `{
  <span class="k">"@context"</span>: <span class="s">"https://schema.org"</span>,
  <span class="k">"@type"</span>: [<span class="s">"LocalBusiness"</span>, <span class="s">"ProfessionalService"</span>],
  <span class="k">"name"</span>: <span class="s">"Enterprise Client"</span>,
  <span class="k">"url"</span>: <span class="s">"https://www.clientdomain.com"</span>,
  <span class="k">"telephone"</span>: <span class="s">"+1-555-000-0000"</span>,
  <span class="k">"priceRange"</span>: <span class="s">"$$$"</span>,
  <span class="k">"knowsAbout"</span>: [
    <span class="hl">"https://en.wikipedia.org/wiki/Search_engine_optimization"</span>,
    <span class="hl">"https://en.wikipedia.org/wiki/Information_retrieval"</span>,
    <span class="hl">"https://en.wikipedia.org/wiki/B2B_marketing"</span>
  ],
  <span class="k">"areaServed"</span>: <span class="s">"Global"</span>,
  <span class="k">"description"</span>: <span class="s">"Enterprise software platform engineered
    for high-intent pipeline growth and search visibility."</span>
}`,
  website: `{
  <span class="k">"@context"</span>: <span class="s">"https://schema.org"</span>,
  <span class="k">"@type"</span>: <span class="s">"WebSite"</span>,
  <span class="k">"name"</span>: <span class="s">"Enterprise Client"</span>,
  <span class="k">"url"</span>: <span class="s">"https://www.clientdomain.com"</span>,
  <span class="k">"publisher"</span>: {
    <span class="k">"@type"</span>: <span class="s">"Organization"</span>,
    <span class="k">"name"</span>: <span class="s">"Enterprise Client"</span>,
    <span class="k">"sameAs"</span>: [
      <span class="hl">"https://en.wikipedia.org/wiki/Enterprise_software"</span>,
      <span class="hl">"https://www.wikidata.org/wiki/Q496931"</span>
    ]
  },
  <span class="k">"potentialAction"</span>: {
    <span class="k">"@type"</span>: <span class="s">"SearchAction"</span>,
    <span class="k">"target"</span>: <span class="s">"https://www.clientdomain.com/search?q={query}"</span>,
    <span class="k">"query-input"</span>: <span class="s">"required name=query"</span>
  }
}`,
  article: `{
  <span class="k">"@context"</span>: <span class="s">"https://schema.org"</span>,
  <span class="k">"@type"</span>: <span class="s">"Article"</span>,
  <span class="k">"headline"</span>: <span class="s">"B2B Pipeline Metrics: The Complete Guide"</span>,
  <span class="k">"author"</span>: {
    <span class="k">"@type"</span>: <span class="s">"Person"</span>,
    <span class="k">"name"</span>: <span class="s">"Steve Martin"</span>,
    <span class="k">"url"</span>: <span class="s">"https://www.gobiya.com/about/steve-martin"</span>
  },
  <span class="k">"about"</span>: [
    { <span class="k">"@id"</span>: <span class="hl">"https://en.wikipedia.org/wiki/Sales_pipeline"</span> }
  ],
  <span class="k">"mentions"</span>: [
    { <span class="k">"@id"</span>: <span class="hl">"https://en.wikipedia.org/wiki/Customer_relationship_management"</span> }
  ],
  <span class="k">"publisher"</span>: {
    <span class="k">"@type"</span>: <span class="s">"Organization"</span>,
    <span class="k">"name"</span>: <span class="s">"Enterprise Client"</span>
  }
}`
};

const ApproachPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [schemaTab, setSchemaTab] = useState<string>('business');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {



    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initial load fade in
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
      heroTl
        .from('[data-hero="1"]', { opacity: 0, y: 14 }, 0)
        .from('.hero h1 .line > span', { yPercent: 110, stagger: 0.1, duration: 1.25 }, 0.08)
        .from('[data-hero="2"]', { opacity: 0, y: 16 }, 0.5)
        .from('[data-hero="3"] .btn', { opacity: 0, y: 14, stagger: 0.08 }, 0.65)
        .from('[data-hero="4"] > div', { opacity: 0, y: 12, stagger: 0.08 }, 0.8)
        .from('[data-hero="5"]', { opacity: 0, y: 26, duration: 1.4 }, 0.3)
        .from('[data-hero="6"]', { opacity: 0 }, 1.1);

      gsap.to('.trace', {
        y: -26, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      /* scroll reveals */
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });
      
      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), y: 30, opacity: 0, duration: 1.2, ease });
      });
      
      gsap.utils.toArray('[data-anim="fade"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), opacity: 0, duration: 1.2, ease });
      });
      
      gsap.utils.toArray('[data-anim="scale"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), scale: 0.97, opacity: 0, duration: 1.4, ease: 'power2.out' });
      });
      
      gsap.utils.toArray('[data-anim="stagger"]').forEach(parent => {
        const kids = (parent as Element).querySelectorAll('[data-anim-child]');
        if (!kids.length) return;
        gsap.from(kids, { scrollTrigger: sc(parent as Element), y: 26, opacity: 0, duration: 1.15, ease, stagger: 0.12 });
      });

      /* counters */
      gsap.utils.toArray('[data-count]').forEach(el => {
        const targetEl = el as HTMLElement;
        const target = parseInt(targetEl.dataset.count || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: targetEl, start: 'top 90%' },
          onUpdate: () => { targetEl.textContent = Math.round(obj.v).toString(); }
        });
      });

      /* triple diagram edges draw on scroll */
      gsap.utils.toArray('.side-panel .tedge-hl').forEach(p => {
        const pathEl = p as SVGPathElement;
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(pathEl, {
          strokeDashoffset: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: pathEl.closest('.side-panel'), start: 'top 80%' }
        });
      });

      /* magnetic buttons */
      if (window.matchMedia('(pointer:fine)').matches) {
        document.querySelectorAll('.magnetic').forEach(btn => {
          const btnEl = btn as HTMLElement;
          const strength = 10;
          btnEl.addEventListener('mousemove', (e) => {
            const r = btnEl.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            gsap.to(btnEl, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
          });
          btnEl.addEventListener('mouseleave', () => {
            gsap.to(btnEl, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
          });
        });
      }

      /* trace line reveal */
      const lines = document.querySelectorAll('#trace-body .ln');
      lines.forEach((l, i) => {
        gsap.to(l, { opacity: 1, y: 0, duration: 0.45, ease, delay: 0.95 + (i * 0.23) });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    try {
      const codeEl = document.getElementById('blueprint-code');
      if (codeEl && codeEl.textContent) {
        await navigator.clipboard.writeText(codeEl.textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  return (
    <div ref={containerRef} className="approach-page">
      <SiteHeader />

      <section className="hero" id="top">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
              <a href="/">Gobiya</a><i>/</i>
              <a href="/about">Company</a><i>/</i>
              <span>Our approach</span>
            </nav>

            <h1 className="display">
              <span className="line"><span>Keywords are strings.</span></span>
              <span className="line"><span>Google indexes</span></span>
              <span className="line"><span className="accent">things.</span></span>
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              Search engine optimization is no longer a marketing checklist — it's a
              technical engineering discipline. This is GOBIYA's operating model for
              algorithmic dominance, entity-based indexing, and closed-loop pipeline
              conversion.
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="#ch-01" className="btn btn-primary magnetic">
                Read the doctrine
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/book" className="btn btn-ghost magnetic">Discover our methods</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">Blueprint</p>
                <p>Entities · Topical hubs · GEO · Pipelines</p>
              </div>
              <div>
                <p className="mono-tag">Discipline</p>
                <p>Search forensics — engineered, not guessed</p>
              </div>
              <div>
                <p className="mono-tag">Loop closure</p>
                <p>Every node traced to closed-won revenue</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="trace" data-hero="5">
              <div className="trace-head">
                <span>EXH-007 / entity resolution — how Google reads a query</span>
                <span className="right"><span className="pulse-dot" aria-hidden="true"></span>tracing</span>
              </div>
              <div className="trace-body" id="trace-body">
                <span className="ln"><span className="dim">$</span> resolve <span className="em">"b2b sales pipeline integration tools"</span></span>
                <span className="ln"><span className="dim">&gt;</span> tokenizing … <span className="warn">strings discarded</span></span>
                <span className="ln"><span className="dim">&gt;</span> entity: <span className="em">Sales_pipeline</span> · knowledge graph node · salience <span className="ok">0.91</span></span>
                <span className="ln"><span className="dim">&gt;</span> entity: <span className="em">B2B_marketing</span> · knowledge graph node · salience <span className="ok">0.84</span></span>
                <span className="ln"><span className="dim">&gt;</span> entity: <span className="em">CRM_software</span> · knowledge graph node · salience <span className="ok">0.77</span></span>
                <span className="ln"><span className="dim">&gt;</span> intent: <span className="em">transactional — comparison</span></span>
                <span className="ln"><span className="dim">&gt;</span> match: pages with <span className="ok">high-salience edges</span> to these nodes</span>
                <span className="ln"><span className="dim">&gt;</span> keyword density consulted: <span className="warn">never</span></span>
              </div>
              <div className="trace-foot">
                <p>Operating conclusion</p>
                <p>Strings don't rank. Entities do — so GOBIYA engineers the entities.</p>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">Fig. 1 — illustrative trace of neural query matching</span>
              <span className="mono-tag">34.05°N&nbsp;118.24°W</span>
            </div>
          </div>
        </div>

        <div className="ticker" aria-label="Methodology vocabulary">
          <div className="ticker-track" id="ticker-track">
            {[0, 1].map(i => (
              <div className="ticker-group" key={i} aria-hidden={i === 1 ? 'true' : undefined}>
                <span className="ticker-item">Semantic triples <em>— S·P·O</em></span>
                <span className="ticker-item">Entity salience <em>— engineered</em></span>
                <span className="ticker-item">Knowledge graph <em>— mapped</em></span>
                <span className="ticker-item">Pillar + cluster <em>— structured</em></span>
                <span className="ticker-item">JSON-LD graphs <em>— nested</em></span>
                <span className="ticker-item">GEO citations <em>— placed</em></span>
                <span className="ticker-item">RAG alignment <em>— formatted</em></span>
                <span className="ticker-item">Reverse-IP intent <em>— logged</em></span>
                <span className="ticker-item">Attribution <em>— multi-touch</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Target metrics">
        <div className="stats-grid">
          <div className="stat" data-anim="up">
            <span className="mono-tag">Word-count baseline</span>
            <p className="stat-num"><span data-count="2200">0</span><sub>+</sub></p>
            <p className="stat-desc">Topical completeness per hub page — depth that proves expertise, never thin keyword filler.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">LLM citation rate</span>
            <p className="stat-num"><span data-count="90">0</span><sub>%+</sub></p>
            <p className="stat-desc">Target share of relevant generative answers in which the brand entity is surfaced or cited.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Rendering latency</span>
            <p className="stat-num">&lt;<span data-count="100">0</span><sub>ms</sub></p>
            <p className="stat-desc">Server-rendered HTML delivered to crawlers and AI bots before any JavaScript executes.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Vanity metrics tracked</span>
            <p className="stat-num">0</p>
            <p className="stat-desc">Traffic without pipeline is noise. Every node is traced to qualified meetings and closed-won revenue.</p>
          </div>
        </div>
      </section>

      <section className="section" id="ch-01">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Chapter 01 — The paradigm shift</div>
              <p className="rail-note" data-anim-child>
                The question this chapter answers, in the words buyers actually type:
              </p>
              <p className="rail-q" data-anim-child>"How does entity-based search work?"</p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              Search engines stopped reading your words. They read your <span className="accent">entities.</span>
            </h2>

            <div className="doctrine-body">
              <div className="doctrine-text" data-anim="stagger">
                <p data-anim-child>In the early eras of organic search, pages were indexed by direct string matching — rank for "B2B sales pipeline integration tools" by repeating that phrase in titles, headings, and copy at the right density. <strong>Google's Helpful Content System, core quality classifiers, and neural matching now operate on a fundamentally different paradigm:</strong> search engines no longer index strings. They index entities — distinct, well-defined concepts, organizations, and things cataloged in the Knowledge Graph with machine-readable IDs.</p>
                <p data-anim-child>When a user enters a query, the engine decomposes the prompt into recognized entities, resolves the implicit and explicit intent, and queries its graph database for pages with a <strong>high-salience connection to the requested entity node.</strong> GOBIYA's approach is built around semantic triples — Subject, Predicate, Object — mapping your business entities, service offerings, and target categories into the precise format crawlers expect, minimizing semantic distance to verified authority nodes.</p>
                <p data-anim-child>This entity methodology is also the absolute foundation of <a href="/insights/chatgpt-vs-google-for-business-discovery" className="text-[#2F5D50] hover:text-[#F26522] underline underline-offset-4 transition-colors font-medium">Generative Engine Optimization</a>. LLMs like GPT, Claude, and Gemini don't navigate page-authority vectors — they map semantic spaces. To be cited inside conversational answers, your entity connections must be defined explicitly.</p>
              </div>

              <div className="side-panel" data-anim="scale" aria-label="Semantic triple diagram: your brand offers pipeline engineering, which is about a verified Wikipedia entity">
                <div className="side-panel-head">
                  <span>semantic-triple / S·P·O map</span>
                  <span>● resolved</span>
                </div>
                <div className="side-panel-body">
                  <svg viewBox="0 0 460 330">
                    <path className="tedge-hl" d="M230 78 L230 138"/>
                    <path className="tedge-hl" d="M230 192 L230 252"/>
                    <path className="tedge" d="M120 290 L 200 290"/>
                    <path className="tedge" d="M260 290 L 340 290"/>

                    <rect className="tnode tnode-hl" x="120" y="32" width="220" height="46" rx="23"/>
                    <text className="tlabel" x="230" y="60" textAnchor="middle">Your brand</text>
                    <text className="tpred" x="244" y="112" textAnchor="start">offers →</text>

                    <rect className="tnode" x="100" y="146" width="260" height="46" rx="23"/>
                    <text className="tlabel" x="230" y="174" textAnchor="middle">Pipeline engineering</text>
                    <text className="tpred" x="244" y="226" textAnchor="start">about →</text>

                    <rect className="tnode tnode-hl" x="76" y="260" width="308" height="46" rx="23"/>
                    <text className="tlabel" x="230" y="282" textAnchor="middle">wikipedia: Sales_pipeline</text>
                    <text className="tsub" x="230" y="296" textAnchor="middle">verified authority node · knowledge graph</text>
                  </svg>
                </div>
                <div className="side-panel-foot">
                  subject → predicate → object · semantic distance: minimized
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="ch-02" style={{ background: 'var(--paper-2)' }}>
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Chapter 02 — Topical authority</div>
              <p className="rail-note" data-anim-child>
                The question this chapter answers:
              </p>
              <p className="rail-q" data-anim-child>"Why does topical authority matter for B2B search?"</p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              Topological architecture &amp; <span className="accent">schema engineering.</span>
            </h2>

            <div className="doctrine-body">
              <div className="doctrine-text" data-anim="stagger">
                <p data-anim-child>Search dominance requires topical completeness. You cannot rank high-value transactional pages if your site lacks the foundational informational resources that prove expertise — ranking for "B2B sales development pipeline setup" requires an exhaustive content map covering the peripheral queries: <strong>outbound metrics, lead response times, cold-email sequences, CRM integration flows, team scaling.</strong></p>
                <p data-anim-child>GOBIYA maps your market sector as an interconnected semantic graph, structured in strict <strong>pillar-and-cluster hubs</strong> that flow PageRank and semantic signals from high-volume informational nodes down to high-intent transactional pages — with intent profiles mapped carefully so each URL targets a unique, isolated search intent and internal cannibalization is eliminated.</p>
                <p data-anim-child>These relationships are defined explicitly for bots using <strong>advanced, nested JSON-LD schema graphs</strong> — not basic templates. Properties like <strong>about, mentions, and knowsAbout</strong> point directly to DBpedia and Wikipedia entity records, removing the need for crawlers to guess page topics and accelerating both indexation and entity-authority rankings.</p>
              </div>

              <div className="blueprint" data-anim="scale">
                <div className="blueprint-head">
                  <span>interactive schema blueprint</span>
                  <span style={{ color: 'var(--signal)' }}>nested JSON-LD</span>
                </div>
                <div className="blueprint-tabs" role="tablist" aria-label="Schema entity type">
                  <button className={`blueprint-tab ${schemaTab === 'business' ? 'active' : ''}`} onClick={() => setSchemaTab('business')} role="tab" aria-selected={schemaTab === 'business'}>Business</button>
                  <button className={`blueprint-tab ${schemaTab === 'website' ? 'active' : ''}`} onClick={() => setSchemaTab('website')} role="tab" aria-selected={schemaTab === 'website'}>Website</button>
                  <button className={`blueprint-tab ${schemaTab === 'article' ? 'active' : ''}`} onClick={() => setSchemaTab('article')} role="tab" aria-selected={schemaTab === 'article'}>Article</button>
                </div>
                <pre className="blueprint-code" id="blueprint-code" tabIndex={0} dangerouslySetInnerHTML={{ __html: schemas[schemaTab] }}></pre>
                <div className="blueprint-foot">
                  <span className="note">select entity type · knowsAbout → verified nodes</span>
                  <button className={`copy-btn ${copied ? 'copied' : ''}`} id="copy-btn" type="button" onClick={handleCopy}>
                    {copied ? 'Copied ✓' : 'Copy code'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="ch-03" style={{ background: 'radial-gradient(circle at 85% 10%, rgba(46,140,104,0.10), transparent 42%), var(--dark)', color: 'var(--dark-text)', borderBottomColor: 'var(--dark)' }}>
        <div className="section-inner">
          <aside className="section-rail" style={{ borderRightColor: 'var(--dark-line)', borderBottomColor: 'var(--dark-line)' }}>
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child style={{ color: 'var(--dark-soft)' }}>Chapter 03 — Generative optimization</div>
              <p className="rail-note" data-anim-child style={{ color: 'var(--dark-soft)' }}>
                The question this chapter answers:
              </p>
              <p className="rail-q" data-anim-child style={{ color: 'var(--dark-soft)' }}>"How do I optimize my business for ChatGPT, Claude, and Perplexity?"</p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              The shortlist now forms inside the <span style={{ color: 'var(--signal)' }}>answer.</span>
            </h2>

            <div className="doctrine-body" style={{ borderTopColor: 'var(--dark-line)' }}>
              <div className="doctrine-text" data-anim="stagger">
                <p data-anim-child style={{ color: 'var(--dark-soft)' }}>Search is undergoing its most significant transition in twenty years: users are shifting from queries to conversational prompts answered directly by LLMs. <strong style={{ color: 'var(--dark-text)' }}>If your brand isn't recognized by these models, you're absent from the channel where B2B buyers now form their shortlists.</strong></p>
                <p data-anim-child style={{ color: 'var(--dark-soft)' }}>Generative Engine Optimization is the practice of making your brand entities the referenced, recommended answer inside generative responses. LLM retrieval and RAG pipelines index on <strong style={{ color: 'var(--dark-text)' }}>authority overlap, semantic alignment, and the volume of factual mentions across trusted databases</strong> — not backlinks and keyword placement. GOBIYA builds semantic citation loops: mapping the publications, datasets, trade journals, and directories that model builders train on, then placing your brand name, data, and technical definitions inside those sources.</p>
                <p data-anim-child style={{ color: 'var(--dark-soft)' }}>On-site, content is formatted to match LLM extraction habits — <strong style={{ color: 'var(--dark-text)' }}>clear summaries, tabular formats, direct Q&amp;A blocks</strong> — so when an AI agent scans your page, it finds structured, quote-ready statements that translate directly into citations.</p>
              </div>

              <div className="side-panel" data-anim="scale" style={{ borderColor: 'var(--dark-line)' }} aria-label="Generative answer check across AI assistants">
                <div className="side-panel-head">
                  <span>geo-monitor / citation check</span>
                  <span>● cited</span>
                </div>
                <div className="geo-log">
                  <span><span className="dim">prompt:</span> <span className="em">"best b2b pipeline platform for mid-market?"</span></span>
                  <span>&nbsp;</span>
                  <span><span className="dim">&gt;</span> ChatGPT … <span className="ok">brand cited — recommendation #1</span></span>
                  <span><span className="dim">&gt;</span> Claude … <span className="ok">brand cited — with source link</span></span>
                  <span><span className="dim">&gt;</span> Perplexity … <span className="ok">brand cited — 3 references</span></span>
                  <span><span className="dim">&gt;</span> Gemini … <span className="ok">brand cited — entity resolved</span></span>
                  <span><span className="dim">&gt;</span> AI Overviews … <span className="ok">surfaced — Q&amp;A block extracted</span></span>
                  <span>&nbsp;</span>
                  <span><span className="dim">citation loop:</span> <span className="em">trusted sources → training data → answers</span></span>
                </div>
                <div className="side-panel-foot">
                  target llm citation rate: 90%+ · illustrative monitor
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="ch-04">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Chapter 04 — Revenue pipelines</div>
              <p className="rail-note" data-anim-child>
                The question this chapter answers:
              </p>
              <p className="rail-q" data-anim-child>"How do I convert organic traffic into revenue?"</p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              Traffic is a vanity metric until it becomes <span className="accent">pipeline.</span>
            </h2>

            <div className="doctrine-body">
              <div className="doctrine-text" data-anim="stagger">
                <p data-anim-child>Traditional agency models celebrate traffic growth even when it fails to generate qualified revenue. GOBIYA operates under a <strong>pipeline-first framework</strong> — connecting search traffic to automated sales development systems and turning the website into an active, high-yield pipeline generator. <a href="/capabilities/web-development" className="text-[#2F5D50] hover:text-[#F26522] underline underline-offset-4 transition-colors font-medium">Custom React and Vite architectures</a> deliver the sub-second loads that satisfy Core Web Vitals and capture high-intent users who would otherwise bounce.</p>
                <p data-anim-child><strong>Visitor de-anonymization is integrated directly into the page layer:</strong> visiting IP addresses are resolved to specific corporate networks in real time, logging which organizations are researching your products and which pages they read. That intent data feeds straight into your <a href="/capabilities/native-crm" className="text-[#2F5D50] hover:text-[#F26522] underline underline-offset-4 transition-colors font-medium">CRM</a> — Salesforce or HubSpot — and triggers timing-optimized sequences targeting matching buyers at those accounts.</p>
                <p data-anim-child>The loop closes with <strong>multi-touch attribution:</strong> every pipeline opportunity is traced back to the specific content hubs and entity nodes that first captured the buyer — so every investment in the search engineering protocol is justified by measurable closed-won revenue.</p>
              </div>

              <div>
                <div className="vs-table" data-anim="up" style={{ marginTop: 0 }} aria-label="Traditional agency SEO versus GOBIYA pipeline engineering">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Performance vector</th>
                        <th scope="col" className="bad">Traditional agency SEO</th>
                        <th scope="col" className="good">GOBIYA pipeline engineering</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="vec">Key metric</td>
                        <td className="bad">Keyword positions &amp; general traffic volume</td>
                        <td className="good">Qualified B2B meetings &amp; attributed pipeline</td>
                      </tr>
                      <tr>
                        <td className="vec">Content model</td>
                        <td className="bad">High-volume keyword articles (thin content)</td>
                        <td className="good">Entity-mapped, comprehensive topical hubs</td>
                      </tr>
                      <tr>
                        <td className="vec">AI readiness</td>
                        <td className="bad">None — legacy Google bots only</td>
                        <td className="good">GEO citation structures for LLM answers</td>
                      </tr>
                      <tr>
                        <td className="vec">Lead sourcing</td>
                        <td className="bad">Passive forms, zero intent tracking</td>
                        <td className="good">Reverse-IP de-anonymization → CRM sequences</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mono-tag" data-anim="fade" style={{ marginTop: '1rem' }}>Exhibit — the operating delta, vector by vector</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="clients" aria-label="Clients">
        <div className="clients-inner" data-anim="fade">
          <span className="mono-tag">Doctrine in production for —</span>
          <a href="/case-studies/smile-center-dentistry" className="client-name">SmileCenter</a>
          <a href="/case-studies/american-livescan" className="client-name">American LiveScan</a>
          <span className="client-name">RemodelMe Pros</span>
          <span className="client-name">QuickPass</span>
          <span className="client-name">MyTrustWills</span>
          <span className="client-name">Total Capital</span>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div className="wrap" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="cta-card" data-anim="up">
            <div>
              <div className="eyebrow">Apply the doctrine</div>
              <h2 className="display">See what this methodology finds in <span className="accent">your market.</span></h2>
              <p className="body-l">
                One call. Your entity footprint, your topical gaps, your LLM
                visibility — and the specific sequence GOBIYA would run to close
                them, traced all the way to pipeline.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/book" className="btn btn-primary magnetic">
                Discover our methods
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/case-studies" className="btn btn-ghost magnetic">See it on the record</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ApproachPage;
