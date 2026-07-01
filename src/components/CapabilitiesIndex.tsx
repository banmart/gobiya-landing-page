import SiteHeader from "./SiteHeader";
import HeroWebGLBackground from './HeroWebGLBackground';
import SiteFooter from "./SiteFooter";
import InsightsSlider from "./InsightsSlider";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CapabilitiesIndex.css';

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesIndex() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });


    const ctx = gsap.context(() => {
      /* ---------- nav ---------- */
      const navInner = document.getElementById('nav-inner');
      const burger = document.getElementById('burger');
      const mobileMenu = document.getElementById('mobile-menu');

      const handleBurgerClick = () => {
        if (!mobileMenu || !burger) return;
        const open = mobileMenu.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
      };

      if (burger) {
        burger.addEventListener('click', handleBurgerClick);
      }

      if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          if (burger) {
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
          }
        }));
      }

      const handleScroll = () => {
        if (navInner) {
          navInner.classList.toggle('is-scrolled', window.scrollY > 40);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      if (navInner) {
        gsap.from(navInner, { y: -22, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.1 });
      }

      gsap.to('body', { opacity: 1, duration: 0.6, ease: 'power2.out' });

      /* ---------- GSAP Animations ---------- */
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

      /* map draw */
      const drawSysmap = () => {
        const wires = gsap.utils.toArray('.map-wire-active') as SVGPathElement[];
        wires.forEach(w => {
          const l = w.getTotalLength() || 1000;
          gsap.set(w, { strokeDasharray: l, strokeDashoffset: l });
        });
        const tl = gsap.timeline({ delay: 1, defaults: { ease: 'power2.inOut' } });
        tl.to('.map-wire-active', { strokeDashoffset: 0, duration: 1.2, stagger: 0.1 })
          .fromTo('.map-node', { opacity: 0, scale: 0.8, transformOrigin: 'center' }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, "-=1.0")
          .fromTo('#hub-pulse', { opacity: 0, scale: 0.8, transformOrigin: 'center' }, { opacity: 0.5, scale: 1, duration: 0.8 }, "-=0.5");
      };
      drawSysmap();

      /* stats count up */
      gsap.utils.toArray('.stat-num span').forEach((el: any) => {
        const end = parseFloat(el.getAttribute('data-count') || '0');
        gsap.to(el, {
          innerHTML: end,
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%'
          }
        });
      });

      /* general scroll triggers */
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });
      
      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.fromTo(el as Element, 
          { y: 30, opacity: 0 },
          { scrollTrigger: sc(el as Element), y: 0, opacity: 1, duration: 1.2, ease }
        );
      });
      
      gsap.utils.toArray('[data-anim="stagger"]').forEach((parent: any) => {
        const children = parent.querySelectorAll('[data-anim-child]');
        gsap.fromTo(children,
          { y: 24, opacity: 0 },
          { scrollTrigger: sc(parent), y: 0, opacity: 1, duration: 1, ease, stagger: 0.12 }
        );
      });

    }, containerRef);

    return () => {
      window.removeEventListener('scroll', () => {}); // Will be cleaned up by context revert
      ctx.revert();
    };
  }, []);

  return (
    <div id="page" ref={containerRef} className="bg-white min-h-screen font-sans flex flex-col">
      {/* ================= NAV ================= */}
      <SiteHeader />
      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">

      {/* ================= HERO ================= */}
      <section className="hero" id="top">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">

          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
              <a href="/">Gobiya</a><i>/</i>
              <span>Capabilities</span>
            </nav>

            <h1 className="display">
              <span className="line"><span>SEO & Web Development Services:</span></span>
              <span className="line"><span>One codebase,</span></span>
              <span className="line"><span>every system</span></span>
              <span className="line"><span className="accent">built in</span></span>
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              As a provider of premier SEO & Web Development Services, Gobiya doesn't run generic SEO campaigns. It builds custom
              React/Next.js/Vite platforms with native CRM pipelines, built-in
              discoverability, AI prospect automation, and secure Web3 integrations —
              one product, complete data ownership.
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="/book" className="btn btn-primary magnetic">
                Get a growth audit
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#modules" className="btn btn-ghost magnetic">Inspect the modules</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">Modules</p>
                <p>Six — integrated, not bolted on</p>
              </div>
              <div>
                <p className="mono-tag">Data ownership</p>
                <p>100% — your pipeline, your database</p>
              </div>
              <div>
                <p className="mono-tag">Delivery standard</p>
                <p>Fast, indexable, enterprise-grade</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="sysmap" data-hero="5">
              <div className="sysmap-head">
                <span>EXH-005 / system map — integrated build</span>
                <span className="right"><span className="pulse-dot" aria-hidden="true"></span>all modules online</span>
              </div>

              <div className="sysmap-body">
                <svg viewBox="0 0 640 520" role="img" aria-label="System map: six GOBIYA modules — web development, SEO and discoverability, native CRM, AI prospect scraper, Web3, and AI & LLMs for Businesses — all wired into one platform codebase">
                  {/* wires */}
                  <path className="map-wire" d="M320 256 L320 96"/>
                  <path className="map-wire" d="M320 256 L548 176"/>
                  <path className="map-wire" d="M320 256 L516 408"/>
                  <path className="map-wire" d="M320 256 L124 408"/>
                  <path className="map-wire" d="M320 256 L92 176"/>
                  <path className="map-wire" d="M320 256 L320 420"/>

                  <path className="map-wire-active" id="w1" d="M320 256 L320 96"/>
                  <path className="map-wire-active" id="w2" d="M320 256 L548 176"/>
                  <path className="map-wire-active" id="w3" d="M320 256 L516 408"/>
                  <path className="map-wire-active" id="w4" d="M320 256 L124 408"/>
                  <path className="map-wire-active" id="w5" d="M320 256 L92 176"/>
                  <path className="map-wire-active" id="w6" d="M320 256 L320 420"/>

                  {/* hub */}
                  <g className="map-hub">
                    <circle className="map-hub-pulse" id="hub-pulse" cx="320" cy="256" r="34"/>
                    <circle className="map-hub-ring" cx="320" cy="256" r="34"/>
                    <circle className="map-node-core" cx="320" cy="256" r="4.5"/>
                    <text className="map-hub-label" x="320" y="312" textAnchor="middle">your platform</text>
                    <text className="map-sublabel" x="320" y="328" textAnchor="middle">one hand-coded codebase</text>
                  </g>

                  {/* nodes */}
                  <g className="map-node" data-node="1">
                    <circle className="map-node-ring" cx="320" cy="96" r="22"/>
                    <circle className="map-node-core" cx="320" cy="96" r="3.4"/>
                    <text className="map-label" x="320" y="56" textAnchor="middle">Web Development</text>
                    <text className="map-sublabel" x="320" y="71" textAnchor="middle">BUILD.SYS</text>
                  </g>
                  <g className="map-node" data-node="2">
                    <circle className="map-node-ring" cx="548" cy="176" r="22"/>
                    <circle className="map-node-core" cx="548" cy="176" r="3.4"/>
                    <text className="map-label" x="548" y="136" textAnchor="middle">SEO &amp; GEO</text>
                    <text className="map-sublabel" x="548" y="151" textAnchor="middle">TRAFFIC.SYS</text>
                  </g>
                  <g className="map-node" data-node="3">
                    <circle className="map-node-ring" cx="516" cy="408" r="22"/>
                    <circle className="map-node-core" cx="516" cy="408" r="3.4"/>
                    <text className="map-label" x="516" y="452" textAnchor="middle">Native CRM</text>
                    <text className="map-sublabel" x="516" y="467" textAnchor="middle">PIPELINE.SYS</text>
                  </g>
                  <g className="map-node" data-node="4">
                    <circle className="map-node-ring" cx="124" cy="408" r="22"/>
                    <circle className="map-node-core" cx="124" cy="408" r="3.4"/>
                    <text className="map-label" x="124" y="452" textAnchor="middle">AI Prospect Scraper</text>
                    <text className="map-sublabel" x="124" y="467" textAnchor="middle">OUTBOUND.SYS</text>
                  </g>
                  <g className="map-node" data-node="5">
                    <circle className="map-node-ring" cx="92" cy="176" r="22"/>
                    <circle className="map-node-core" cx="92" cy="176" r="3.4"/>
                    <text className="map-label" x="92" y="136" textAnchor="middle">Web3 &amp; Blockchain</text>
                    <text className="map-sublabel" x="92" y="151" textAnchor="middle">WEB3.SYS</text>
                  </g>
                  <g className="map-node" data-node="6">
                    <circle className="map-node-ring" cx="320" cy="420" r="22"/>
                    <circle className="map-node-core" cx="320" cy="420" r="3.4"/>
                    <text className="map-label" x="320" y="464" textAnchor="middle">AI &amp; LLMs for Business</text>
                    <text className="map-sublabel" x="320" y="479" textAnchor="middle">AI.SYS</text>
                  </g>
                </svg>
              </div>

              <div className="sysmap-foot">
                <span>no plugins · no vendor sprawl · no rented data</span>
                <span>6/6 modules — native</span>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">Fig. 1 — integrated capabilities, one product</span>
              <span className="mono-tag">34.05°N&nbsp;118.24°W</span>
            </div>
          </div>
        </div>

        {/* module status ticker */}
        <div className="ticker" aria-label="GOBIYA module status">
          <div className="ticker-track" id="ticker-track">
            {[1, 2].map(g => (
              <div className="ticker-group" key={g}>
                <span className="ticker-item">BUILD.SYS <em>— online</em></span>
                <span className="ticker-item">TRAFFIC.SYS <em>— online</em></span>
                <span className="ticker-item">PIPELINE.SYS <em>— online</em></span>
                <span className="ticker-item">OUTBOUND.SYS <em>— online</em></span>
                <span className="ticker-item">WEB3.SYS <em>— online</em></span>
                <span className="ticker-item">AI.SYS <em>— online</em></span>
                <span className="ticker-item">TRUST_SCORE <em>— 98.4%</em></span>
                <span className="ticker-item">DATA_OWNERSHIP <em>— 100%</em></span>
                <span className="ticker-item">CORE_WEB_VITALS <em>— 100/100</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats" aria-label="Capability standards">
        <div className="stats-grid">
          <div className="stat" data-anim="up">
            <span className="mono-tag">Integrated modules</span>
            <p className="stat-num"><span data-count="6">0</span></p>
            <p className="stat-desc">Web dev, SEO &amp; GEO, native CRM, AI prospecting, Web3, and AI integrations — engineered as one product, not six vendors.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Data ownership</span>
            <p className="stat-num"><span data-count="100">0</span><sub>%</sub></p>
            <p className="stat-desc">Pipeline and lead databases built directly into your codebase — your data never lives on rented platforms.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Core Web Vitals</span>
            <p className="stat-num"><span data-count="100">0</span><sub>/100</sub></p>
            <p className="stat-desc">Every build ships fast and indexable by default — maximum ranking eligibility from day one.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Trust score</span>
            <p className="stat-num"><span data-count="98">0</span><sub>.4%</sub></p>
            <p className="stat-desc">Entity-verified, BBB A+ rated, certified partner — accountability built into the architecture.</p>
          </div>
        </div>
      </section>

      {/* ================= MODULE INDEX ================= */}
      <section className="section" id="modules">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Core capabilities</div>
              <p className="rail-note" data-anim-child>
                Every capability is engineered to deliver a fast, indexable web
                application with complete data ownership. Inspect each module below.
              </p>
              <div className="rail-index" data-anim-child>
                <a href="/capabilities/web-development-agency/">01 — BUILD.SYS</a>
                <a href="/capabilities/seo-discoverability-agency/">02 — TRAFFIC.SYS</a>
                <a href="/capabilities/native-crm-agency/">03 — PIPELINE.SYS</a>
                <a href="/capabilities/ai-prospect-scraper-agency/">04 — OUTBOUND.SYS</a>
                <a href="/capabilities/blockchain-web3-development-agency/">05 — WEB3.SYS</a>
                <a href="/capabilities/ai-llms-business-agency/">06 — AI.SYS</a>
                <a href="/capabilities/authority-building-agency/">07 — AUTHORITY.SYS</a>
              </div>
            </div>
          </aside>

          <div className="section-main">
            <div className="mods-head">
              <h2 className="section-title display" data-anim="up">
                Seven modules. One powerful <span className="accent">custom product.</span>
              </h2>
            </div>

            <div className="mod-list" data-anim="stagger">

              <a href="/capabilities/web-development-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">01</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>BUILD.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>Web Development</h3>
                  <p>Custom React/Next.js/Vite sites engineered for sub-second page loads and flawless crawlability. Zero page-builders, zero templates — every component hand-coded.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>build_audit.sh</span><em>pass</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> core web vitals … <span className="ok">100/100</span></span>
                    <span><span className="dim">&gt;</span> page load … <span className="ok">0.6s</span></span>
                    <span><span className="dim">&gt;</span> template code … <span className="em">none found</span></span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="/capabilities/seo-discoverability-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">02</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>TRAFFIC.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>SEO &amp; Discoverability</h3>
                  <p>Built-in crawler readiness, semantic data mapping, and formatting designed for Google rankings and AI citation eligibility — engineered into the codebase, not bolted on.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>index_health.log</span><em>200 OK</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> analyzing 1.4M URI paths … <span className="ok">ok</span></span>
                    <span><span className="dim">&gt;</span> rebuilding index schema … <span className="ok">ok</span></span>
                    <span><span className="dim">&gt;</span> trust_score: <span className="em">98.4%</span></span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="/capabilities/native-crm-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">03</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>PIPELINE.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>Native CRM</h3>
                  <p>Pipeline and lead databases built directly into your codebase, ensuring 100% data ownership — no fragile third-party plugins between a lead and your follow-up.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>pipeline.db</span><em>synced</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> new lead → <span className="em">captured natively</span></span>
                    <span><span className="dim">&gt;</span> stage: inquiry → <span className="ok">booked</span></span>
                    <span><span className="dim">&gt;</span> data owner: <span className="ok">you — 100%</span></span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="/capabilities/ai-prospect-scraper-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">04</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>OUTBOUND.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>AI Prospect Scraper</h3>
                  <p>AI-powered scraper extracting NAP lead data and generating custom drip campaigns natively — the top of your pipeline stays full while the organic engine compounds.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>ai_lead_hunter.sys</span><em>hunting</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> target: <span className="em">B2B logistics — LA</span></span>
                    <span><span className="dim">&gt;</span> NAP: Apex Logistics · (213) 555-0199</span>
                    <span><span className="dim">&gt;</span> drip campaign … <span className="ok">auto-generated</span></span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="/capabilities/blockchain-web3-development-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">05</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>WEB3.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>Blockchain &amp; Web3 Development</h3>
                  <p>On-chain solutions, custom smart contracts, and decentralized application features integrated natively — for brands building past the conventional stack.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>web3_contract.sys</span><em>verified</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> verifySignature() … <span className="ok">SUCCESS</span></span>
                    <span><span className="dim">&gt;</span> gasUsed: <span className="em">21,000 gwei</span></span>
                    <span><span className="dim">&gt;</span> txHash: 0x71c…3a9f</span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="/capabilities/ai-llms-business-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">06</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>AI.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>AI &amp; LLMs for Businesses</h3>
                  <p>Secure, custom AI integrations and LLMs directly in your office tasks. We build intelligent parsing agents, custom bots, and automated office workflows to eliminate daily SMB friction.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>ai_office_agent.sys</span><em>active</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> task parsing … <span className="ok">0.05s</span></span>
                    <span><span className="dim">&gt;</span> accuracy rate … <span className="ok">99.9%</span></span>
                    <span><span className="dim">&gt;</span> operational friction … <span className="em">removed</span></span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="/capabilities/authority-building-agency/" className="mod" data-anim-child>
                <div className="mod-id">
                  <span className="mono-tag">Module</span>
                  <span className="num">07</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>AUTHORITY.SYS</span>
                </div>
                <div className="mod-info">
                  <h3>Authority Building</h3>
                  <p>High-quality backlink acquisition, localized entity citations, and strategic media placements designed to build domain authority and sustain search engine dominance.</p>
                </div>
                <div className="mod-console" aria-hidden="true">
                  <div className="mod-console-head"><span>authority_builder.sys</span><em>boosting</em></div>
                  <div className="mod-console-body">
                    <span><span className="dim">&gt;</span> trust signals … <span className="ok">verified</span></span>
                    <span><span className="dim">&gt;</span> link acquisition … <span className="ok">100% manual</span></span>
                    <span><span className="dim">&gt;</span> authority target … <span className="em">+15 DR</span></span>
                  </div>
                </div>
                <span className="mod-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STACK COMPARISON ================= */}
      <section className="section method" id="why-integrated">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Why integrated</div>
              <p className="rail-note" data-anim-child>
                Most growth stacks are an accident of vendors. Gobiya's is a
                decision made in the codebase.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              Integrated capabilities. <span className="accent">Measurable returns.</span>
            </h2>
            <p className="method-sub body-l" data-anim="up">
              Compare what a typical agency stack actually runs on with what a
              Gobiya engagement hands you.
            </p>

            <div className="compare" data-anim="up">
              <div className="compare-col bad">
                <h3><i>✕</i>The typical agency stack</h3>
                <ul>
                  <li><i>✕</i><span><strong>WordPress</strong> + 14 plugins, each a security and speed liability</span></li>
                  <li><i>✕</i><span><strong>External CRM</strong> renting your lead data back to you monthly</span></li>
                  <li><i>✕</i><span><strong>SEO retainer</strong> optimizing keywords on a site bots can't render</span></li>
                  <li><i>✕</i><span><strong>Automation glue</strong> — webhooks that silently break on update day</span></li>
                  <li><i>✕</i><span><strong>Five vendors</strong>, five invoices, zero accountability for the whole</span></li>
                </ul>
              </div>
              <div className="compare-col good">
                <h3><i>●</i>The Gobiya build</h3>
                <ul>
                  <li><i>●</i><span><strong>Hand-coded React/Next.js</strong> — sub-second, 100/100 vitals, no plugins</span></li>
                  <li><i>●</i><span><strong>Native CRM</strong> in your own database — 100% data ownership</span></li>
                  <li><i>●</i><span><strong>Discoverability engineered in</strong> — SSR, schema graphs, LLM citations</span></li>
                  <li><i>●</i><span><strong>AI prospecting + drip</strong> running inside the same codebase</span></li>
                  <li><i>●</i><span><strong>One operator</strong> accountable for the entire revenue engine</span></li>
                </ul>
              </div>
              <div className="compare-verdict">
                <span>verdict: sprawl loses to <em>systems</em></span>
                <span>maintenance surface: −80% · accountability: <em>1 desk</em></span>
              </div>
            </div>
          </div>
        </div>
      </section>



      <div data-logo-dark className="relative">
        <InsightsSlider currentPath="/capabilities" limit={3} />
      </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
