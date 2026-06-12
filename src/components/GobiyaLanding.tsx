import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

export default function GobiyaLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "GOBIYA — Algorithm Recovery & AI-Powered Growth, Los Angeles";

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

    const desc = "GOBIYA reads Google's algorithm, identifies the penalty vector, and deploys the fix. SEO recovery, GEO, AI-powered growth. Los Angeles, since 2009.";
    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);

    // Initial GSAP Loading Effect
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });

    // Small delay to ensure React has fully painted the DOM and SVG paths have lengths
    const timer = setTimeout(() => {
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

        /* ---------- diagnostic console ---------- */
        const form = document.getElementById('console-form') as HTMLFormElement;
        const input = document.getElementById('domain-input') as HTMLInputElement;
        const out = document.getElementById('console-out');
        const runBtn = document.getElementById('console-run') as HTMLButtonElement;
        const cta = document.getElementById('console-cta');

        const cleanDomain = (raw: string) => raw.trim().toLowerCase()
          .replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
          .replace(/[^a-z0-9.-]/g, '').slice(0, 64);

        function pushLine(html: string, delay: number) {
          return new Promise<void>(res => {
            setTimeout(() => {
              if (!out) return res();
              const ln = document.createElement('span');
              ln.className = 'ln';
              ln.innerHTML = html;
              out.appendChild(ln);
              requestAnimationFrame(() => requestAnimationFrame(() => ln.classList.add('show')));
              res();
            }, delay);
          });
        }

        let running = false;
        const handleFormSubmit = async (e: Event) => {
          e.preventDefault();
          if (running || !input || !runBtn || !cta || !out) return;
          const domain = cleanDomain(input.value);
          if (!domain || !domain.includes('.')) {
            input.value = '';
            input.placeholder = 'enter a valid domain — e.g. yourdomain.com';
            input.focus();
            return;
          }
          running = true;
          runBtn.disabled = true;
          cta.classList.remove('show');
          out.innerHTML = '';

          const d = `<span class="em">${domain}</span>`;
          await pushLine(`<span class="dim">$</span> gobiya ai-scan ${d}`, 100);
          
          try {
            const res = await fetch('/api/scan', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ domain })
            });
            const data = await res.json();
            
            for (const line of data.lines || []) {
              const sec = (Math.random() * 1.5 + 0.1).toFixed(2);
              await pushLine(`<span class="dim">[00.${sec.replace('.', '')}]</span> ${line} <span class="warn">requires full read</span>`, 600 + Math.random() * 400);
            }
            
            await pushLine(`<span class="dim">[--]</span> scan complete — <span class="em">send below for manual engineering read</span>`, 750);
          } catch (e) {
            await pushLine(`<span class="warn">connection error during AI scan</span>`, 500);
          }

          (cta as HTMLAnchorElement).href = `mailto:hello@gobiya.com?subject=${encodeURIComponent('Diagnostic request — ' + domain)}&body=${encodeURIComponent('Domain: ' + domain + '\n\nWhat happened (in your words):\n')}`;
          setTimeout(() => cta.classList.add('show'), 500);

          running = false;
          runBtn.disabled = false;
        };

        if (form) {
          form.addEventListener('submit', handleFormSubmit);
        }

        /* ---------- GSAP Animations ---------- */
        const ease = 'power3.out';

        /* nav entrance */
        if (navInner) {
          gsap.from(navInner, { y: -22, opacity: 0, duration: 1.2, ease, delay: 0.1 });
        }

        /* hero copy */
        const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
        heroTl
          .from('[data-hero="1"]', { opacity: 0, y: 14 }, 0)
          .from('.hero h1 .line > span', { yPercent: 110, stagger: 0.1, duration: 1.25 }, 0.08)
          .from('[data-hero="2"]', { opacity: 0, y: 16 }, 0.5)
          .from('[data-hero="3"] .btn', { opacity: 0, y: 14, stagger: 0.08 }, 0.65)
          .from('[data-hero="4"] > div', { opacity: 0, y: 12, stagger: 0.08 }, 0.8)
          .from('[data-hero="5"]', { opacity: 0, y: 26, duration: 1.4 }, 0.3)
          .from('[data-hero="6"]', { opacity: 0 }, 1.1);

        /* hero chart drawing */
        const drawPath = (sel: string) => {
          const elements = gsap.utils.toArray(sel) as SVGPathElement[];
          if (!elements.length) return 0;
          const p = elements[0];
          const len = p.getTotalLength() || 1000; // fallback just in case
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          return len;
        };
        
        drawPath('.seg-pre'); 
        drawPath('.seg-crash'); 
        drawPath('.seg-recovery');

        const chartTl = gsap.timeline({ delay: 0.9, defaults: { ease: 'power2.inOut' } });
        chartTl
          .to('#scanline', { opacity: 1, duration: 0.2 }, 0)
          .fromTo('#scanline', { left: '2%' }, { left: '98%', duration: 2.2, ease: 'power1.inOut' }, 0)
          .to('#scanline', { opacity: 0, duration: 0.3 }, 2.0)
          .to('.seg-pre', { strokeDashoffset: 0, duration: 0.8 }, 0.15)
          .to('.marker.m-crash', { opacity: 1, duration: 0.3 }, 0.95)
          .fromTo('.lbl-crash', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease }, 0.95)
          .to('.seg-crash', { strokeDashoffset: 0, duration: 0.55 }, 1.0)
          .to('.marker.m-deploy', { opacity: 1, duration: 0.3 }, 1.55)
          .fromTo('.lbl-deploy', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease }, 1.55)
          .to('.seg-recovery', { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' }, 1.65)
          .to('.area-recovery', { opacity: 1, duration: 0.9 }, 1.9)
          .to('.marker.m-now', { opacity: 1, duration: 0.3 }, 2.6)
          .fromTo('.lbl-now', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease }, 2.6);

        /* gentle float on the exhibit while scrolling */
        gsap.to('.exhibit-frame', {
          y: -26, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });

        /* scroll reveals */
        const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });
        
        gsap.utils.toArray('[data-anim="up"]').forEach(el => {
          gsap.fromTo(el as Element, 
            { y: 30, opacity: 0 },
            { scrollTrigger: sc(el as Element), y: 0, opacity: 1, duration: 1.2, ease }
          );
        });
        
        gsap.utils.toArray('[data-anim="fade"]').forEach(el => {
          gsap.fromTo(el as Element, 
            { opacity: 0 },
            { scrollTrigger: sc(el as Element), opacity: 1, duration: 1.2, ease }
          );
        });
        
        gsap.utils.toArray('[data-anim="scale"]').forEach(el => {
          gsap.fromTo(el as Element, 
            { scale: 0.97, opacity: 0 },
            { scrollTrigger: sc(el as Element), scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
          );
        });
        
        gsap.utils.toArray('[data-anim="stagger"]').forEach(parent => {
          const kids = (parent as Element).querySelectorAll('[data-anim-child]');
          if (!kids.length) return;
          gsap.fromTo(kids, 
            { y: 26, opacity: 0 },
            { scrollTrigger: sc(parent as Element), y: 0, opacity: 1, duration: 1.15, ease, stagger: 0.12 }
          );
        });

        /* counters */
        gsap.utils.toArray('[data-count]').forEach(el => {
          const target = parseInt((el as HTMLElement).dataset.count || '0', 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.8, ease: 'power2.out',
            scrollTrigger: { trigger: el as Element, start: 'top 90%' },
            onUpdate: () => { (el as HTMLElement).textContent = String(Math.round(obj.v)); }
          });
        });

        /* method timeline progress + active dots */
        gsap.fromTo('#phase-fill', 
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#phases', start: 'top 70%', end: 'bottom 55%', scrub: true } }
        );
        
        gsap.utils.toArray('[data-phase]').forEach(ph => {
          ScrollTrigger.create({
            trigger: ph as Element, start: 'top 70%',
            onEnter: () => (ph as Element).classList.add('is-active'),
            onLeaveBack: () => (ph as Element).classList.remove('is-active')
          });
        });

        /* magnetic buttons */
        if (window.matchMedia('(pointer:fine)').matches) {
          document.querySelectorAll('.magnetic').forEach(btn => {
            const strength = 10;
            const handleMouseMove = (e: Event) => {
              const mouseEvent = e as MouseEvent;
              const r = btn.getBoundingClientRect();
              const x = (mouseEvent.clientX - r.left - r.width / 2) / (r.width / 2);
              const y = (mouseEvent.clientY - r.top - r.height / 2) / (r.height / 2);
              gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
            };
            const handleMouseLeave = () => {
              gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
            };
            btn.addEventListener('mousemove', handleMouseMove);
            btn.addEventListener('mouseleave', handleMouseLeave);
            
            return () => {
              btn.removeEventListener('mousemove', handleMouseMove);
              btn.removeEventListener('mouseleave', handleMouseLeave);
            }
          });
        }
        
        // Return cleanup for custom event listeners
        return () => {
          window.removeEventListener('scroll', handleScroll);
          if (burger) burger.removeEventListener('click', handleBurgerClick);
          if (form) form.removeEventListener('submit', handleFormSubmit);
        };
      }, containerRef); // Scope GSAP to this component

      return () => ctx.revert();
    }, 50); // 50ms delay to allow DOM to settle

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="home-page">
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">

          <div className="hero-copy">
            <div className="hero-eyebrow eyebrow" data-hero="1">SEO recovery &amp; AI growth — Los Angeles</div>

            <h1 className="display">
              <span className="line"><span>Your rankings</span></span>
              <span className="line"><span className="accent">didn't slip.</span></span>
              <span className="line"><span>They were taken.</span></span>
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              GOBIYA has been reading Google's algorithm since 2012. It identifies the
              penalty vector, builds the fix, and deploys — while other agencies are
              still writing the proposal.
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="#diagnose" className="btn btn-primary magnetic">
                Diagnose my site
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#cases" className="btn btn-ghost magnetic">See what it recovers</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">Base</p>
                <p>Los Angeles, California</p>
              </div>
              <div>
                <p className="mono-tag">Scope</p>
                <p>SEO · Recovery · AI · GEO · PPC</p>
              </div>
              <div>
                <p className="mono-tag">Operating since</p>
                <p>2012 — every update survived</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="exhibit-frame" data-hero="5">
              <div className="exhibit-head">
                <span className="mono-tag">EXH-001 / organic sessions — 36 mo</span>
                <span className="right">
                  <span className="pulse-dot" aria-hidden="true"></span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>Recovery verified</span>
                </span>
              </div>

              <div className="chart-wrap" id="chart-wrap">
                <svg viewBox="0 0 640 460" role="img" aria-label="Traffic chart: steady growth, a sharp penalty drop of 74 percent, then recovery to 118 percent of pre-penalty traffic after GOBIYA deployed">
                  <defs>
                    <linearGradient id="gradRecovery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2E8C68" stopOpacity="0.22"/>
                      <stop offset="100%" stopColor="#2E8C68" stopOpacity="0"/>
                    </linearGradient>
                  </defs>

                  <g className="chart-grid" aria-hidden="true">
                    <line x1="24" y1="80"  x2="616" y2="80"/>
                    <line x1="24" y1="160" x2="616" y2="160"/>
                    <line x1="24" y1="240" x2="616" y2="240"/>
                    <line x1="24" y1="320" x2="616" y2="320"/>
                    <line x1="24" y1="400" x2="616" y2="400"/>
                  </g>
                  <g className="chart-axis" aria-hidden="true">
                    <text x="24"  y="448">2023</text>
                    <text x="232" y="448">SEP 23</text>
                    <text x="344" y="448">JAN 24</text>
                    <text x="560" y="448">NOW</text>
                  </g>

                  <path className="area-recovery" d="M344 414 C 370 404 392 360 416 312 C 446 252 480 200 520 160 C 556 124 592 100 616 88 L 616 432 L 344 432 Z"/>

                  <path className="seg seg-pre"      d="M24 312 C 70 300 110 270 150 258 C 185 248 210 244 232 240"/>
                  <path className="seg seg-crash"    d="M232 240 C 248 260 256 330 262 372 C 268 404 280 412 300 416 C 318 419 332 418 344 414"/>
                  <path className="seg seg-recovery" d="M344 414 C 370 404 392 360 416 312 C 446 252 480 200 520 160 C 556 124 592 100 616 88"/>

                  <g className="marker m-crash" opacity="0">
                    <circle className="ring" cx="232" cy="240" r="9"/>
                    <circle className="core" cx="232" cy="240" r="3.2"/>
                  </g>
                  <g className="marker m-deploy" opacity="0">
                    <circle className="ring" cx="344" cy="414" r="9"/>
                    <circle className="core" cx="344" cy="414" r="3.2"/>
                  </g>
                  <g className="marker m-now" opacity="0">
                    <circle className="ring" cx="616" cy="88" r="9"/>
                    <circle className="core" cx="616" cy="88" r="3.2"/>
                  </g>
                </svg>

                <div className="chart-label lbl-crash" style={{left: '26%', top: '24%'}}>
                  <strong>−74%</strong>Core update hit
                </div>
                <div className="chart-label lbl-deploy" style={{left: '44%', top: '73%'}}>
                  <strong>GOBIYA deployed</strong>Fix shipped in 9 days
                </div>
                <div className="chart-label lbl-now" style={{right: '3%', top: '6%'}}>
                  <strong>+118%</strong>vs pre-penalty
                </div>

                <div className="scanline" id="scanline" aria-hidden="true"></div>
              </div>

              <div className="exhibit-foot">
                <div className="legend" aria-hidden="true">
                  <span><i className="i-pre"></i>Baseline</span>
                  <span><i className="i-crash"></i>Penalty</span>
                  <span><i className="i-rec"></i>Recovery</span>
                </div>
                <span className="mono-tag">Composite of a real engagement</span>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">Fig. 1 — what a GOBIYA engagement looks like on a chart</span>
              <span className="mono-tag">34.05°N&nbsp;118.24°W</span>
            </div>
          </div>
        </div>

        <div className="ticker" aria-label="Google algorithm updates GOBIYA has navigated since 2012">
          <div className="ticker-track" id="ticker-track">
            {[0, 1].map(i => (
              <div className="ticker-group" key={i} aria-hidden={i === 1 ? 'true' : undefined}>
                <span className="ticker-item">Panda · 2011 <em>— survived</em></span>
                <span className="ticker-item">Penguin · 2012 <em>— survived</em></span>
                <span className="ticker-item">Hummingbird · 2013 <em>— survived</em></span>
                <span className="ticker-item">Mobilegeddon · 2015 <em>— survived</em></span>
                <span className="ticker-item">Medic · 2018 <em>— survived</em></span>
                <span className="ticker-item">BERT · 2019 <em>— survived</em></span>
                <span className="ticker-item">Core · Jun 2021 <em>— survived</em></span>
                <span className="ticker-item hit">Helpful Content · 2022 <em>— clients recovered</em></span>
                <span className="ticker-item hit">March Core · 2024 <em>— clients recovered</em></span>
                <span className="ticker-item">AI Overviews · 2024 <em>— GEO deployed</em></span>
                <span className="ticker-item">Next update · TBD <em>— ready</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Track record">
        <div className="stats-grid">
          <div className="stat" data-anim="up">
            <span className="mono-tag">Field time</span>
            <p className="stat-num"><span data-count="14">0</span><sub>yrs</sub></p>
            <p className="stat-desc">Reading the algorithm since 2012 — every major update since Panda, lived through in client accounts.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Recoveries run</span>
            <p className="stat-num"><span data-count="300">0</span><sub>+</sub></p>
            <p className="stat-desc">Penalty and update recoveries across e-commerce, local service, SaaS, and publishing.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Median time to signal</span>
            <p className="stat-num"><span data-count="6">0</span><sub>wks</sub></p>
            <p className="stat-desc">From forensic read to the first measurable upturn in the traffic curve.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Largest CPL cut</span>
            <p className="stat-num">−<span data-count="61">0</span><sub>%</sub></p>
            <p className="stat-desc">A B2B SaaS Google Ads account rebuilt from zero, in 90 days.</p>
          </div>
        </div>
      </section>

      <section className="section" id="approach">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>How it operates</div>
              <p className="rail-note" data-anim-child>
                An approach shaped by pattern recognition, decisive action, and zero
                tolerance for wasted cycles.
              </p>
              <div className="rail-index" data-anim-child>
                <span>A — Signal forensics</span>
                <span>B — Decisive execution</span>
                <span>C — Zero latency</span>
              </div>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              GOBIYA doesn't wait for the next update to <span className="accent">act</span> —
              it reads the signal, maps the damage, and moves.
            </h2>

            <div className="approach-body">
              <div className="approach-text" data-anim="stagger">
                <p className="body-l" data-anim-child>
                  Every engagement begins with a forensic read of your site's signal
                  history. GOBIYA identifies the exact update, the exact pattern, and
                  the exact fix — before a single change is made.
                </p>
                <p className="body-l" data-anim-child>
                  The result isn't a report. It's a recovered position, a restored
                  traffic curve, and a system that keeps working after the engagement
                  ends.
                </p>
                <div className="principles" data-anim-child>
                  <div className="principle">
                    <span className="mono-tag">A</span>
                    <p>Signal forensics</p>
                  </div>
                  <div className="principle">
                    <span className="mono-tag">B</span>
                    <p>Decisive execution</p>
                  </div>
                  <div className="principle">
                    <span className="mono-tag">C</span>
                    <p>Zero latency</p>
                  </div>
                </div>
              </div>

              <div className="signal-panel" data-anim="scale" aria-label="Example forensic read output">
                <div className="signal-head">
                  <span>signal-forensics / live read</span>
                  <span style={{color: 'var(--signal)'}}>● active</span>
                </div>
                <div className="signal-log" id="signal-log">
                  <span className="row"><span className="t">00:00.12</span><span>resolving signal history · 36 mo <span className="ok">ok</span></span></span>
                  <span className="row"><span className="t">00:00.48</span><span>pulling SERP snapshots <span className="ok">ok</span></span></span>
                  <span className="row"><span className="t">00:01.20</span><span>cross-referencing update timeline <span className="em">3 matches</span></span></span>
                  <span className="row"><span className="t">00:01.86</span><span><span className="warn">anomaly</span> — sep 2023 · sessions −74%</span></span>
                  <span className="row"><span className="t">00:02.31</span><span>pattern: thin-content cluster <span className="em">conf. 0.87</span></span></span>
                  <span className="row"><span className="t">00:02.94</span><span>pattern: authority decay · 41 pages <span className="em">conf. 0.79</span></span></span>
                  <span className="row"><span className="t">00:03.40</span><span>fix vector mapped <span className="ok">ready to deploy</span></span></span>
                </div>
                <div className="signal-foot">
                  <p>System intelligence</p>
                  <p>AI-layer monitoring, live signal adaptation, and GEO-ready content architecture.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="cases" style={{background: 'var(--paper-2)'}}>
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Recovered clients</div>
              <p className="rail-note" data-anim-child>
                A record of sites pulled back from penalties, traffic restored, and
                growth systems deployed. Each file: the hit, the fix, the curve.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <div className="cases-head">
              <h2 className="section-title display" data-anim="up">
                Signals read, penalties <span className="accent">killed</span>,
                traffic <span className="accent">restored</span>.
              </h2>
              <a href="#diagnose" className="text-link" data-anim="fade">
                Open a new file
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            <div className="case-list" data-anim="stagger">
              <a href="#diagnose" className="case" data-anim-child>
                <div className="case-id">
                  <span className="mono-tag">File</span>
                  <span className="num">001</span>
                  <span className="mono-tag" style={{color: 'var(--penalty)'}}>HCU · −74%</span>
                </div>
                <div className="case-info">
                  <h3>E-commerce — Helpful Content recovery</h3>
                  <p>Site lost 74% of organic traffic after the HCU. GOBIYA identified the thin-content pattern, restructured authority signals, and restored rankings in six weeks.</p>
                </div>
                <div className="case-chart" aria-hidden="true">
                  <svg viewBox="0 0 280 92">
                    <path className="spark-pre"   d="M6 52 C 40 48 70 42 96 40"/>
                    <path className="spark-crash" d="M96 40 C 106 52 110 70 122 76 C 130 79 136 78 142 76"/>
                    <path className="spark-rec"   d="M142 76 C 168 68 196 46 224 32 C 248 21 264 16 274 14"/>
                    <circle cx="96" cy="40" r="2.6" fill="#C2492F"/>
                    <circle cx="142" cy="76" r="2.6" fill="#2E8C68"/>
                  </svg>
                  <div className="meta"><span>36 mo</span><em>recovered · wk 6</em></div>
                </div>
                <span className="case-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="#diagnose" className="case" data-anim-child>
                <div className="case-id">
                  <span className="mono-tag">File</span>
                  <span className="num">002</span>
                  <span className="mono-tag" style={{color: 'var(--green)'}}>GEO · 12 areas</span>
                </div>
                <div className="case-info">
                  <h3>Local service — GEO dominance</h3>
                  <p>Deployed GEO-optimized content architecture across 12 service areas. The brand now surfaces in AI search results before the first organic click.</p>
                </div>
                <div className="case-chart" aria-hidden="true">
                  <svg viewBox="0 0 280 92">
                    <path className="spark-pre" d="M6 70 C 50 68 90 66 124 62"/>
                    <path className="spark-rec" d="M124 62 C 160 54 196 40 228 28 C 250 20 266 15 274 13"/>
                    <circle cx="124" cy="62" r="2.6" fill="#2E8C68"/>
                  </svg>
                  <div className="meta"><span>18 mo</span><em>AI-cited · 12/12</em></div>
                </div>
                <span className="case-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>

              <a href="#diagnose" className="case" data-anim-child>
                <div className="case-id">
                  <span className="mono-tag">File</span>
                  <span className="num">003</span>
                  <span className="mono-tag" style={{color: 'var(--penalty)'}}>$40k/mo burn</span>
                </div>
                <div className="case-info">
                  <h3>B2B SaaS — PPC rebuild</h3>
                  <p>Inherited a broken Google Ads account burning $40k a month with no attribution. Rebuilt from zero — cost per lead dropped 61% in 90 days.</p>
                </div>
                <div className="case-chart" aria-hidden="true">
                  <svg viewBox="0 0 280 92">
                    <path className="spark-crash" d="M6 24 C 30 26 60 30 92 34 C 110 36 122 38 134 40"/>
                    <path className="spark-rec"   d="M134 40 C 162 48 192 60 222 68 C 244 73 262 76 274 78"/>
                    <circle cx="134" cy="40" r="2.6" fill="#2E8C68"/>
                  </svg>
                  <div className="meta"><span>CPL · 90 days</span><em>−61%</em></div>
                </div>
                <span className="case-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section method" id="method">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Execution framework</div>
              <p className="rail-note" data-anim-child>
                Three phases. No fluff. Every step moves the needle — in the order
                the work actually happens.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              Three phases that drive every <span className="accent">recovery</span> and growth cycle.
            </h2>
            <p className="method-sub body-l" data-anim="up">
              GOBIYA's process is built to compress time-to-impact. Diagnose fast, fix
              precisely, scale what works.
            </p>

            <div className="phases" id="phases">
              <div className="phase-line" aria-hidden="true"></div>
              <div className="phase-line-fill" id="phase-fill" aria-hidden="true"></div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">Phase 01 — Diagnose</span>
                  <h3>Read the signal.</h3>
                </div>
                <div className="phase-body">
                  <p>GOBIYA maps your site's full signal history — traffic curves, update timelines, content patterns — and pinpoints the exact cause before anything is touched.</p>
                  <div className="phase-tags">
                    <span>Update forensics</span><span>SERP history</span><span>Pattern match</span>
                  </div>
                </div>
              </div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">Phase 02 — Execute</span>
                  <h3>Fix it. Deploy it.</h3>
                </div>
                <div className="phase-body">
                  <p>No 90-day roadmaps. The fix is built and deployed with precision — content restructuring, authority signals, technical corrections — all in one coordinated push.</p>
                  <div className="phase-tags">
                    <span>Content restructure</span><span>Authority repair</span><span>Technical fixes</span>
                  </div>
                </div>
              </div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">Phase 03 — Scale</span>
                  <h3>Lock in the growth.</h3>
                </div>
                <div className="phase-body">
                  <p>Once the signal is clean, GOBIYA layers in AI-powered content systems, GEO architecture, and PPC — compounding growth that doesn't depend on the next update going your way.</p>
                  <div className="phase-tags">
                    <span>AI content systems</span><span>GEO architecture</span><span>PPC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="proof">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Client perspective</div>
              <p className="rail-note" data-anim-child>
                The real measure — not what was promised, but what moved.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <div className="proof-grid">
              <div className="quote-block" data-anim="up">
                <span className="quote-mark" aria-hidden="true">"</span>
                <blockquote>
                  Traffic up and more calls from the website. Built and launched our contractor marketplace without any interruptions and exactly for what we agreed.
                </blockquote>
                <div className="quote-attr">
                  <div className="attr-mark" aria-hidden="true" style={{ overflow: 'hidden' }}>
                    <img src="https://www.gobiya.com/images/testimonial-mike.png" alt="Mike Pinkston" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p className="name">Mike Pinkston</p>
                    <p className="role mono-tag">Founder &amp; CEO, RemodelMe Pros</p>
                  </div>
                </div>
              </div>

              <div className="quote-block" data-anim="up">
                <span className="quote-mark" aria-hidden="true">"</span>
                <blockquote>
                  The best technical SEO partnership we've ever had. Our enterprise sales pipeline <em>doubled</em> in 3 months after implementing their AI-driven approach. Highly recommend their growth engineering team.
                </blockquote>
                <div className="quote-attr">
                  <div className="attr-mark" aria-hidden="true" style={{ overflow: 'hidden' }}>
                    <img src="https://www.gobiya.com/images/eli-portrait.webp" alt="Eli Zilberstein" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p className="name">Eli Zilberstein</p>
                    <p className="role mono-tag">Managing Director, Total Capital Inc</p>
                  </div>
                </div>
              </div>

              <div className="quote-block" data-anim="up">
                <span className="quote-mark" aria-hidden="true">"</span>
                <blockquote>
                  Patient inquiries grew <em>5x</em> after launching our new platform. The combination of native CRM integration and blazing fast React builds completely transformed our lead generation.
                </blockquote>
                <div className="quote-attr">
                  <div className="attr-mark" aria-hidden="true" style={{ overflow: 'hidden' }}>
                    <img src="https://www.gobiya.com/images/dr-nikjoo.jpg" alt="Dr. Ebi Donavan Nikjoo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p className="name">Dr. Ebi Donavan Nikjoo</p>
                    <p className="role mono-tag">Lead Dentist, SmileCenter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section diagnose" id="diagnose">
        <div className="wrap" style={{paddingTop: '5rem', paddingBottom: '5rem'}}>
          <div className="diagnose-card" data-anim="up">
            <div className="diagnose-copy">
              <div>
                <div className="eyebrow">Start a recovery</div>
                <h2 className="display">Your site lost ground. GOBIYA <span className="accent">takes it back.</span></h2>
                <p className="body-l">
                  No discovery calls that go nowhere. Drop your domain in the console,
                  watch a preview of the read, then send it straight to GOBIYA — and
                  get told exactly what it sees, and what it will do about it.
                </p>
              </div>
              <div className="cta-row">
                <a href="mailto:hello@gobiya.com?subject=Start%20a%20recovery%20—%20gobiya.com%20inquiry" className="btn btn-primary magnetic">
                  Deploy GOBIYA
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#cases" className="btn btn-ghost magnetic">See recovery cases</a>
              </div>
            </div>

            <div className="console" aria-label="Domain diagnostic preview">
              <div className="console-head">
                <span className="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                <span>gobiya / pre-read console</span>
              </div>
              <div className="console-body">
                <div className="out" id="console-out" aria-live="polite">
                  <span className="ln show dim">// simulated preview — the real read is done by humans + systems</span>
                  <span className="ln show dim">// enter a domain to see how a GOBIYA pre-read begins</span>
                </div>
                <form className="console-form" id="console-form">
                  <label htmlFor="domain-input" className="mono-tag" style={{position: 'absolute', left: '-9999px'}}>Your domain</label>
                  <input className="console-input" id="domain-input" type="text" placeholder="yourdomain.com" autoComplete="off" spellCheck="false" />
                  <button className="console-run" id="console-run" type="submit">Run</button>
                </form>
              </div>
              <div className="console-cta">
                <a className="btn btn-light" id="console-cta" href="mailto:hello@gobiya.com">
                  Send this read to GOBIYA
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
