import React, { useEffect, useRef } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SuccessStories.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const SuccessStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Success Stories — Search Recovery & Revenue Case Studies | GOBIYA";

    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = "Real clients, real numbers. SmileCenter Dentistry: 5x patient inquiries and 213K impressions. American Livescan: 3x bookings after a legacy migration. Data-backed search recovery and pipeline case studies from GOBIYA.";
    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);


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

      gsap.to('.ledger', {
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

      /* case chart line draws on scroll */
      gsap.utils.toArray('.ev-chart .spark-rec').forEach(p => {
        const pathEl = p as SVGPathElement;
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(pathEl, {
          strokeDashoffset: 0, duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: pathEl.closest('.ev-chart'), start: 'top 82%' }
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

      /* ledger row reveal */
      const rows = document.querySelectorAll('#ledger-body .ledger-row');
      rows.forEach((r, i) => {
        gsap.to(r, { opacity: 1, y: 0, duration: 0.45, ease, delay: 0.95 + (i * 0.24) });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="success-stories-page">
      <SiteHeader />

      <section className="hero" id="top">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
              <a href="/">Gobiya</a><i>/</i>
              <a href="/company/about">Company</a><i>/</i>
              <span>Success stories</span>
            </nav>

            <h1 className="display">
              <span className="line"><span>Real clients.</span></span>
              <span className="line"><span>Real numbers.</span></span>
              <span className="line"><span className="accent">On the record.</span></span>
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              Data-backed search recovery and pipeline results. Here is exactly what
              GOBIYA built, why it was built, and what moved as a result — query by
              query, position by position.
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="#case-001" className="btn btn-primary magnetic">
                Open the case files
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/book" className="btn btn-ghost magnetic">Start your audit</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">Documentation standard</p>
                <p>Periods, queries, and positions cited</p>
              </div>
              <div>
                <p className="mono-tag">Verticals on file</p>
                <p>Dental · Live Scan · Legal · Finance</p>
              </div>
              <div>
                <p className="mono-tag">Vanity metrics</p>
                <p>None — conversions and revenue only</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="ledger" data-hero="5">
              <div className="ledger-head">
                <span>EXH-006 / case ledger — engagements on record</span>
                <span className="right"><span className="pulse-dot" aria-hidden="true"></span>verified</span>
              </div>
              <div className="ledger-body" id="ledger-body">
                <div className="ledger-row">
                  <span className="id">CASE-001</span>
                  <span className="who">SmileCenter Dentistry<small>Multi-location SEO &amp; conversion architecture</small></span>
                  <span className="status">closed — 5× inquiries</span>
                </div>
                <div className="ledger-row">
                  <span className="id">CASE-002</span>
                  <span className="who">American Livescan<small>Legacy migration · local SEO · GBP</small></span>
                  <span className="status">closed — 3× bookings</span>
                </div>
                <div className="ledger-row">
                  <span className="id">CASE-003</span>
                  <span className="who">QuickPass<small>Custom build · native CRM</small></span>
                  <span className="status">live — compounding</span>
                </div>
                <div className="ledger-row">
                  <span className="id">CASE-004</span>
                  <span className="who">MyTrustWills<small>SEO &amp; discoverability</small></span>
                  <span className="status">live — ranking</span>
                </div>
                <div className="ledger-row open-case">
                  <span className="id">CASE-005</span>
                  <span className="who">Your brand<small>Scope: to be determined</small></span>
                  <span className="status">open — reserved</span>
                </div>
              </div>
              <div className="ledger-foot">
                <p>Filing principle</p>
                <p>If it can't be shown on a chart, it doesn't go in the file.</p>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">Fig. 1 — the ledger only counts what moved</span>
              <span className="mono-tag">34.05°N&nbsp;118.24°W</span>
            </div>
          </div>
        </div>

        <div className="ticker" aria-label="Results on record">
          <div className="ticker-track" id="ticker-track">
            {[0, 1].map(i => (
              <div className="ticker-group" key={i} aria-hidden={i === 1 ? 'true' : undefined}>
                <span className="ticker-item">Patient inquiries <em>— 5×</em></span>
                <span className="ticker-item">Phone calls <em>— 5×</em></span>
                <span className="ticker-item">Impressions <em>— 75K → 213K</em></span>
                <span className="ticker-item">Online bookings <em>— 3×</em></span>
                <span className="ticker-item">Walk-ins <em>— +30%</em></span>
                <span className="ticker-item">Passport photos <em>— pos 55.8 → 10</em></span>
                <span className="ticker-item">Organic clicks <em>— +47%</em></span>
                <span className="ticker-item">Core Web Vitals <em>— 100/100</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Headline results">
        <div className="stats-grid">
          <div className="stat" data-anim="up">
            <span className="mono-tag">SmileCenter — inquiries</span>
            <p className="stat-num"><span data-count="5">0</span><sub>×</sub></p>
            <p className="stat-desc">Form completions and phone calls each grew fivefold — same visitors, far better conversion.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">SmileCenter — impressions</span>
            <p className="stat-num"><span data-count="213">0</span><sub>K</sub></p>
            <p className="stat-desc">Total search impressions nearly tripled, from 75.3K to 213K, across all markets.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Livescan — bookings &amp; calls</span>
            <p className="stat-num"><span data-count="3">0</span><sub>×</sub></p>
            <p className="stat-desc">Online appointments and phone calls each tripled after the legacy migration.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Livescan — walk-ins</span>
            <p className="stat-num">+<span data-count="30">0</span><sub>%</sub></p>
            <p className="stat-desc">Physical walk-in traffic grew 30% on the back of map-pack and "near me" visibility.</p>
          </div>
        </div>
      </section>

      <section className="section" id="case-001">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Case file 001</div>
              <p className="rail-note" data-anim-child>
                Multi-location SEO &amp; conversion architecture for a dental group
                operating across multiple Southern California markets.
              </p>
              <div className="rail-facts" data-anim-child>
                <div>
                  <p className="mono-tag">Client</p>
                  <p>SmileCenter Dentistry</p>
                </div>
                <div>
                  <p className="mono-tag">Stack</p>
                  <p>React / Vite · location pages · Yelp + Google Business</p>
                </div>
                <div>
                  <p className="mono-tag">Period</p>
                  <p>Last 3 months vs. prior 3 months</p>
                </div>
              </div>
              <span className="rail-status" data-anim-child><span className="pulse-dot" aria-hidden="true"></span>Closed — won</span>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              SmileCenter Dentistry — <span className="accent">5× patient inquiries.</span>
            </h2>

            <div className="metrics" data-anim="stagger">
              <div className="metric" data-anim-child>
                <p className="num"><span data-count="5">0</span>×</p>
                <span className="lbl mono-tag">Form completions</span>
              </div>
              <div className="metric" data-anim-child>
                <p className="num"><span data-count="5">0</span>×</p>
                <span className="lbl mono-tag">Phone calls</span>
              </div>
              <div className="metric" data-anim-child>
                <p className="num">2.8×</p>
                <span className="lbl mono-tag">Search impressions</span>
              </div>
              <div className="metric" data-anim-child>
                <p className="num">+<span data-count="44">0</span>%</p>
                <span className="lbl mono-tag">Organic clicks</span>
              </div>
            </div>

            <div className="case-body">
              <div className="narrative" data-anim="stagger">
                <div className="chapter" data-anim-child>
                  <span className="mono-tag">The situation</span>
                  <p>SmileCenter runs dental offices across multiple markets. Its previous website was a single, slow, generic site that funneled every visitor into the same place — no clear path to the nearest office, no friction-free way to book or call.</p>
                </div>
                <div className="chapter" data-anim-child>
                  <span className="mono-tag">What GOBIYA built</span>
                  <p>The site was rebuilt on a custom React/Vite foundation, with every office given its own dedicated, individually optimized page — local schema markup, consistent NAP data, and location-specific content. Prominent click-to-call on mobile, simplified booking forms, and location-aware CTAs route each visitor to their nearest office in the fewest possible steps, with Yelp and Google Business signals reinforcing each location in map and general search.</p>
                </div>
                <div className="chapter" data-anim-child>
                  <span className="mono-tag">What moved</span>
                  <p>Form completions and inbound phone calls each grew 5× — not from a flood of new traffic, but from the same visitors converting far more effectively. Total impressions nearly tripled from 75.3K to 213K, and SmileCenter now holds top-5 positions for branded searches across all its markets.</p>
                </div>
                <a href="/case-studies/smile-center-dentistry" className="text-link" data-anim-child>
                  Full case study
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>

              <div className="evidence">
                <div className="ev-chart" data-anim="scale" aria-label="Search impressions chart: 75.3K rising to 213K after rebuild">
                  <div className="ev-chart-head">
                    <span className="mono-tag">Exhibit A — search impressions, monthly</span>
                    <span className="mono-tag" style={{ color: 'var(--green)' }}>rebuild live ↓</span>
                  </div>
                  <svg viewBox="0 0 460 190">
                    <defs>
                      <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2E8C68" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#2E8C68" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <g stroke="#DDD8CB" strokeWidth="1">
                      <line x1="10" y1="45"  x2="450" y2="45"/>
                      <line x1="10" y1="90"  x2="450" y2="90"/>
                      <line x1="10" y1="135" x2="450" y2="135"/>
                    </g>
                    <path className="spark-area" d="M200 138 C 240 128 285 102 330 74 C 372 49 416 31 450 24 L 450 168 L 200 168 Z"/>
                    <path className="spark-pre" d="M10 146 C 70 144 130 142 176 140 C 186 139.5 194 139 200 138"/>
                    <path className="spark-rec" d="M200 138 C 240 128 285 102 330 74 C 372 49 416 31 450 24"/>
                    <circle cx="200" cy="138" r="3.4" fill="#2E8C68"/>
                    <text className="chart-note" x="14" y="132">75.3K</text>
                    <text className="chart-note chart-note-strong" x="404" y="16">213K</text>
                  </svg>
                  <div className="meta"><span>Before — single generic site</span><em>After — 2.8× impressions</em></div>
                </div>

                <div className="ev-table" data-anim="up" aria-label="Branded query positions after engagement">
                  <div className="ev-table-head">
                    <span className="mono-tag">Exhibit B — branded query positions</span>
                    <span className="mono-tag" style={{ color: 'var(--green)' }}>all top 5</span>
                  </div>
                  <table>
                    <thead>
                      <tr><th scope="col">Search query</th><th scope="col">Position</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="q">"smile center dentist"</td><td><span className="up">#2</span></td></tr>
                      <tr><td className="q">"smile center dental care"</td><td><span className="up">Top 5</span></td></tr>
                      <tr><td className="q">"smile center family dentistry"</td><td><span className="up">Top 5</span></td></tr>
                      <tr><td className="q">"smile center locations"</td><td><span className="up">Top 5</span></td></tr>
                      <tr><td className="q">"smile center booking"</td><td><span className="up">Top 5</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="case-foot" data-anim="fade">
              <span className="mono-tag">Engagement: multi-location SEO · conversion architecture · React/Vite rebuild</span>
              <span className="mono-tag">Filed: gobiya.com/case-studies/smile-center-dentistry</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section case-dark" id="case-002">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Case file 002</div>
              <p className="rail-note" data-anim-child>
                Site rebuild, local SEO, and Google Business Profile work for a
                high-volume Live Scan fingerprinting and background-check provider.
              </p>
              <div className="rail-facts" data-anim-child>
                <div>
                  <p className="mono-tag">Client</p>
                  <p>American Livescan</p>
                </div>
                <div>
                  <p className="mono-tag">Engagement</p>
                  <p>Redesign · GMB optimization · local SEO · content engine</p>
                </div>
                <div>
                  <p className="mono-tag">Period</p>
                  <p>Last 6 months vs. prior 6 months</p>
                </div>
              </div>
              <span className="rail-status" data-anim-child><span className="pulse-dot" aria-hidden="true"></span>Closed — won</span>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              American Livescan — <span className="accent">3× bookings &amp; calls</span> after a legacy migration.
            </h2>

            <div className="metrics" data-anim="stagger">
              <div className="metric" data-anim-child>
                <p className="num"><span data-count="3">0</span>×</p>
                <span className="lbl mono-tag">Online bookings</span>
              </div>
              <div className="metric" data-anim-child>
                <p className="num"><span data-count="3">0</span>×</p>
                <span className="lbl mono-tag">Phone calls</span>
              </div>
              <div className="metric" data-anim-child>
                <p className="num">+<span data-count="30">0</span>%</p>
                <span className="lbl mono-tag">Walk-in traffic</span>
              </div>
              <div className="metric" data-anim-child>
                <p className="num">+<span data-count="47">0</span>%</p>
                <span className="lbl mono-tag">Organic clicks</span>
              </div>
            </div>

            <div className="case-body">
              <div className="narrative" data-anim="stagger">
                <div className="chapter" data-anim-child>
                  <span className="mono-tag">The situation</span>
                  <p>American Livescan serves walk-in customers, online bookings, and mobile appointments — but was running on an aging site of legacy .htm/.html pages. Slow, hard to update, and architecturally incapable of competing for the "near me" searches that drive a local, walk-in service.</p>
                </div>
                <div className="chapter" data-anim-child>
                  <span className="mono-tag">What GOBIYA built</span>
                  <p>The legacy site was replaced with a modern, clean-URL architecture — migrated carefully so every page's search equity transferred instead of being lost. Dedicated pages were built for each service line (Live Scan fingerprinting, mobile fingerprinting, passport photos, background checks), the Google Business Profile was optimized for map-pack visibility, and a content engine launched against high-intent queries: SB 731 record-sealing, cannabis screening law, REAL ID, passport-photo rejections.</p>
                </div>
                <div className="chapter" data-anim-child>
                  <span className="mono-tag">What moved</span>
                  <p>Walk-ins grew 30%; online appointments and phone calls each tripled. The passport-photos page went from position 55.8 to page one — from 1 click to 79 — opening a service line that wasn't competing before. "Walk in live scan near me" went from no visibility to page one, and brand searches now hold #1–2 with a 15%+ click-through rate.</p>
                </div>
                <a href="/case-studies/american-livescan" className="text-link" data-anim-child>
                  Full case study
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>

              <div className="evidence">
                <div className="ev-chart" data-anim="scale" aria-label="Passport photos page clicks: 1 click at position 55.8 rising to 79 clicks at position 10">
                  <div className="ev-chart-head">
                    <span className="mono-tag">Exhibit A — passport-photos page, monthly clicks</span>
                    <span className="mono-tag" style={{ color: 'var(--signal)' }}>migration live ↓</span>
                  </div>
                  <svg viewBox="0 0 460 190">
                    <g className="dark-grid" stroke="#DDD8CB" strokeWidth="1">
                      <line x1="10" y1="45"  x2="450" y2="45"/>
                      <line x1="10" y1="90"  x2="450" y2="90"/>
                      <line x1="10" y1="135" x2="450" y2="135"/>
                    </g>
                    <path className="spark-pre" d="M10 160 C 70 160 130 159 184 158 C 192 158 198 157.5 204 157"/>
                    <path className="spark-rec" d="M204 157 C 244 150 286 124 328 90 C 368 58 414 32 450 22"/>
                    <circle cx="204" cy="157" r="3.4" fill="#2E8C68"/>
                    <text className="chart-note" x="14" y="150">pos 55.8 · 1 click</text>
                    <text className="chart-note chart-note-strong" x="330" y="14">pos 10 · 79 clicks</text>
                  </svg>
                  <div className="meta"><span>Before — legacy .htm pages</span><em>After — page one</em></div>
                </div>

                <div className="ev-table" data-anim="up" aria-label="Query visibility before and after the engagement">
                  <div className="ev-table-head">
                    <span className="mono-tag">Exhibit B — query visibility, before / after</span>
                    <span className="mono-tag" style={{ color: 'var(--signal)' }}>equity preserved</span>
                  </div>
                  <table>
                    <thead>
                      <tr><th scope="col">Query</th><th scope="col">Before</th><th scope="col">After</th></tr>
                    </thead>
                    <tbody>
                      <tr><td className="q">"walk in live scan near me"</td><td><span className="down">No visibility</span></td><td><span className="up">Page 1 (~pos 7)</span></td></tr>
                      <tr><td className="q">"livescan near me"</td><td>3 clicks</td><td><span className="up">16 clicks (+3× CTR)</span></td></tr>
                      <tr><td className="q">"passport photos"</td><td><span className="down">Pos 55.8</span></td><td><span className="up">Pos 10 (Page 1)</span></td></tr>
                      <tr><td className="q">Brand searches</td><td>—</td><td><span className="up">#1–2 · 15%+ CTR</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="case-foot" data-anim="fade">
              <span className="mono-tag">Engagement: website redesign · GMB optimization · local SEO · content engine</span>
              <span className="mono-tag">Filed: gobiya.com/case-studies/american-livescan</span>
            </div>
          </div>
        </div>
      </section>

      <section className="clients" aria-label="Clients">
        <div className="clients-inner" data-anim="fade">
          <span className="mono-tag">Also on the record —</span>
          <span className="client-name">RemodelMe Pros</span>
          <span className="client-name">QuickPass</span>
          <span className="client-name">MyTrustWills</span>
          <span className="client-name">Tidder Pro</span>
          <span className="client-name">Total Capital</span>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div className="wrap" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="cta-card" data-anim="up">
            <div>
              <div className="eyebrow">Case-005 — reserved</div>
              <h2 className="display">Ready to be next? Let's build <span className="accent">your case study.</span></h2>
              <p className="body-l">
                One audit. Your current numbers, the gaps GOBIYA sees, and the
                engagement that would close them — documented the same way these
                files were: periods, queries, positions, conversions.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/book" className="btn btn-primary magnetic">
                Start your audit
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/capabilities" className="btn btn-ghost magnetic">See the capabilities</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default SuccessStories;
