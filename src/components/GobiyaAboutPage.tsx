import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GobiyaAboutPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function GobiyaAboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic Meta Tags
    document.title = "About the Agency — GOBIYA | AI Internet Marketing, Los Angeles";
    
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

    const desc = "GOBIYA is a precision-engineered search visibility and digital solutions firm, founded 2012 in Los Angeles and led by Steve Martin — 25+ years bridging full-stack engineering and organic search.";
    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);

    // Initial GSAP Loading Effect
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.8, ease: 'power2.inOut', delay: 0.1 });

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

        if (burger) burger.addEventListener('click', handleBurgerClick);

        const handleScroll = () => {
          if (navInner) {
            navInner.classList.toggle('is-scrolled', window.scrollY > 40);
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        /* ---------- dossier line reveal ---------- */
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const rows = document.querySelectorAll('#dossier-body .row');
        const rowTimeouts: number[] = [];
        if (reduceMotion) {
          rows.forEach(r => r.classList.add('show'));
        } else {
          rows.forEach((r, i) => {
            const timeout = window.setTimeout(() => r.classList.add('show'), 900 + i * 220);
            rowTimeouts.push(timeout);
          });
        }

        /* ---------- GSAP Animations ---------- */
        const ease = 'power3.out';

        if (navInner) {
          gsap.fromTo(navInner, { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease, delay: 0.1 });
        }

        const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
        heroTl
          .fromTo('[data-hero="1"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, 0)
          .fromTo('.hero h1 .line > span', { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 1.25 }, 0.08)
          .fromTo('[data-hero="2"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.5)
          .fromTo('[data-hero="3"] .btn', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.65)
          .fromTo('[data-hero="4"] > div', { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.8)
          .fromTo('[data-hero="5"]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.4 }, 0.3)
          .fromTo('[data-hero="6"]', { opacity: 0 }, { opacity: 1 }, 1.1);

        /* gentle float on the dossier while scrolling */
        gsap.to('.dossier', {
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

        /* timeline progress + active dots */
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
            };
          });
        }

        return () => {
          window.removeEventListener('scroll', handleScroll);
          if (burger) burger.removeEventListener('click', handleBurgerClick);
          rowTimeouts.forEach(clearTimeout);
        };
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef}>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">

          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
              <a href="/">Gobiya</a><i>/</i>
              <a href="/company/about">Company</a><i>/</i>
              <span>About the agency</span>
            </nav>

            <h1 className="display">
              <span className="line"><span>The agency that treats</span></span>
              <span className="line"><span>search like an</span></span>
              <span className="line"><span className="accent">engineering problem.</span></span>
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              GOBIYA is a precision-engineered search visibility and digital solutions
              firm. Founded in 2012 in Los Angeles, it works in high-stakes technical
              environments and data-driven revenue generation — not broad, generalist
              marketing tactics.
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="/book" className="btn btn-primary magnetic">
                Book a strategy call
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/company/success-stories" className="btn btn-ghost magnetic">See success stories</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">Headquarters</p>
                <p>Los Angeles — serving nationally</p>
              </div>
              <div>
                <p className="mono-tag">Clients served</p>
                <p>Mid-market to enterprise</p>
              </div>
              <div>
                <p className="mono-tag">Standing</p>
                <p>BBB A+ rated · Certified Partner</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="dossier" data-hero="5">
              <div className="dossier-head">
                <span>EXH-002 / operator file</span>
                <span className="right"><span className="pulse-dot" aria-hidden="true"></span>verified</span>
              </div>
              <div className="dossier-body" id="dossier-body">
                <span className="row"><span className="k">principal</span><span className="v">Steve Martin</span></span>
                <span className="row"><span className="k">field_time</span><span className="v">25+ yrs — digital marketing × full-stack dev</span></span>
                <span className="row"><span className="k">eng_since</span><span className="v">2000 — software engineering + organic search</span></span>
                <span className="row"><span className="k">founded</span><span className="v">2012 — Gobiya, Los Angeles</span></span>
                <span className="row"><span className="k">discipline</span><span className="v">advanced search mechanics / perf. marketing</span></span>
                <span className="row"><span className="k">stack</span><span className="v">React · Next.js · Vite · Tailwind · Supabase · AI</span></span>
                <span className="row"><span className="k">ai_era</span><span className="v">schema · entity optimization · LLM citations</span></span>
                <span className="row"><span className="k">rating</span><span className="v"><span className="ok">BBB A+</span> · trust_score 98.4%</span></span>
                <span className="row"><span className="k">status</span><span className="v"><span className="ok">active</span> — monitoring client signals</span></span>
              </div>
              <div className="dossier-foot">
                <p>Operating principle</p>
                <p>Stop guessing with your growth. Start dominating with data.</p>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">Fig. 1 — who's behind the read</span>
              <span className="mono-tag">34.05°N&nbsp;118.24°W</span>
            </div>
          </div>
        </div>

        <div className="ticker" aria-label="Clients GOBIYA has served">
          <div className="ticker-track" id="ticker-track">
            {[0, 1].map(i => (
              <div className="ticker-group" key={i} aria-hidden={i === 1 ? 'true' : undefined}>
                <span className="ticker-item">RemodelMe Pros <em>— ranking</em></span>
                <span className="ticker-item">Smile Center <em>— ranking</em></span>
                <span className="ticker-item">QuickPass <em>— shipped</em></span>
                <span className="ticker-item">MyTrustWills <em>— ranking</em></span>
                <span className="ticker-item">Tidder Pro <em>— shipped</em></span>
                <span className="ticker-item">Total Capital <em>— ranking</em></span>
                <span className="ticker-item">American LiveScan <em>— ranking</em></span>
                <span className="ticker-item">Your brand <em>— next</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Agency record">
        <div className="stats-grid">
          <div className="stat" data-anim="up">
            <span className="mono-tag">Experience</span>
            <p className="stat-num"><span data-count="25">0</span><sub>+ yrs</sub></p>
            <p className="stat-desc">Bridging full-stack software engineering and organic search traffic acquisition since 2000.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Founded</span>
            <p className="stat-num"><span data-count="2012">0</span></p>
            <p className="stat-desc">Headquartered in Los Angeles, serving mid-market to enterprise brands nationally.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Trust score</span>
            <p className="stat-num"><span data-count="98">0</span><sub>.4%</sub></p>
            <p className="stat-desc">BBB A+ rated and a certified partner — accountability is part of the architecture.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">URI paths analyzed</span>
            <p className="stat-num"><span data-count="14">0</span><sub>× 100k</sub></p>
            <p className="stat-desc">1.4M paths in a single forensic scan — the scale a recovery read actually runs at.</p>
          </div>
        </div>
      </section>

      <section className="section" id="operator">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>The operator</div>
              <p className="rail-note" data-anim-child>
                GOBIYA isn't a roster of account managers. It's an engineering
                practice with one name on the work.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              Built on experience. Dedicated to <span className="accent">shipping.</span>
            </h2>

            <div className="operator-grid">
              <div className="operator-text" data-anim="stagger">
                <p className="body-l" data-anim-child>
                  Gobiya is led by Steve Martin — 25+ years of digital marketing and
                  full-stack development experience. That dual background is the whole
                  point: the person reading your traffic curve is the same kind of
                  person who can read your codebase.
                </p>
                <p className="body-l" data-anim-child>
                  Since 2000, that has meant bridging software engineering and organic
                  search acquisition — and since 2012, running Gobiya as a
                  precision-engineered growth practice for brands that require
                  high-performance technical SEO and scalable digital revenue engines.
                </p>
                <p className="body-l" data-anim-child>
                  No layers between you and the work. No strategy deck handed to a
                  junior team. The diagnosis, the build, and the deployment come from
                  the same desk.
                </p>
                <a href="/about/steve-martin" className="text-link" data-anim-child>
                  View full profile &amp; credentials
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>

              <div className="op-card" data-anim="scale">
                <div className="op-card-head">
                  <span className="op-mono" aria-hidden="true">SM</span>
                  <div>
                    <p className="name">Steve Martin</p>
                    <p className="role mono-tag">Founder &amp; principal — Gobiya, Los Angeles</p>
                  </div>
                </div>
                <div className="op-rows">
                  <div className="op-row">
                    <span className="k">Background</span>
                    <span className="v">Full-stack engineering × organic search, since 2000</span>
                  </div>
                  <div className="op-row">
                    <span className="k">Specialty</span>
                    <span className="v">Advanced search mechanics, performance marketing, digital infrastructure design</span>
                  </div>
                  <div className="op-row">
                    <span className="k">Dev stack</span>
                    <span className="v">React, Next.js, Vite, Tailwind CSS, Supabase, custom AI chat &amp; automation builds</span>
                  </div>
                  <div className="op-row">
                    <span className="k">AI-era SEO</span>
                    <span className="v">Schema markup, entity optimization, structured citations for LLMs</span>
                  </div>
                  <div className="op-row">
                    <span className="k">Credentials</span>
                    <span className="v">Certified partner · BBB A+ rated · professional certifications on file</span>
                  </div>
                </div>
                <div className="op-card-foot">
                  <span className="mono-tag">linkedin.com/in/stevemartingobiya</span>
                  <a href="https://www.linkedin.com/in/stevemartingobiya/" className="text-link" rel="noopener noreferrer">
                    Connect
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section method" id="timeline">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>The record</div>
              <p className="rail-note" data-anim-child>
                A quarter century in the work, in the order it happened.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              25 years of search, engineering, and <span className="accent">staying ahead</span> of the curve.
            </h2>
            <p className="method-sub body-l" data-anim="up">
              Every era of Google has rewarded a different discipline. GOBIYA has been
              on the right side of each one.
            </p>

            <div className="phases" id="phases">
              <div className="phase-line" aria-hidden="true"></div>
              <div className="phase-line-fill" id="phase-fill" aria-hidden="true"></div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">2000 — The foundation</span>
                  <h3>Engineering meets search.</h3>
                </div>
                <div className="phase-body">
                  <p>Full-stack software engineering and organic search traffic acquisition, practiced side by side from the start. Most marketers learned to talk to Google; this practice learned to read it.</p>
                  <div className="phase-tags"><span>Full-stack dev</span><span>Organic search</span></div>
                </div>
              </div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">2012 — The agency</span>
                  <h3>Gobiya is founded in Los Angeles.</h3>
                </div>
                <div className="phase-body">
                  <p>A precision-engineered search visibility and digital solutions firm — built for high-stakes technical environments and data-driven revenue, not broad generalist tactics.</p>
                  <div className="phase-tags"><span>Technical SEO</span><span>Performance marketing</span></div>
                </div>
              </div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">2012–2023 — The updates</span>
                  <h3>Every algorithm cycle, survived.</h3>
                </div>
                <div className="phase-body">
                  <p>Penguin, Hummingbird, Medic, BERT, the Helpful Content update — each one re-ranked the web, and each one sharpened the recovery practice that clients now hire GOBIYA for.</p>
                  <div className="phase-tags"><span>Recovery forensics</span><span>1.4M URI scans</span></div>
                </div>
              </div>

              <div className="phase" data-phase="true">
                <span className="phase-dot" aria-hidden="true"><i></i></span>
                <div className="phase-head">
                  <span className="mono-tag">2024 → now — The AI era</span>
                  <h3>Search becomes answers. GOBIYA adapts first.</h3>
                </div>
                <div className="phase-body">
                  <p>Schema markup, entity optimization, and structured citations for LLMs — plus native CRM, Web3 builds, and AI prospect automation. The next update is TBD. The posture is ready.</p>
                  <div className="phase-tags"><span>GEO / LLM citations</span><span>Native CRM</span><span>AI automation</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="capabilities" style={{background: 'var(--paper-2)'}}>
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Core capabilities</div>
              <p className="rail-note" data-anim-child>
                Five disciplines, one system. Each module is built to feed the others.
              </p>
            </div>
          </aside>

          <div className="section-main">
            <div className="caps-head">
              <h2 className="section-title display" data-anim="up">
                What the machine is <span className="accent">made of.</span>
              </h2>
              <a href="/capabilities" className="text-link" data-anim="fade">
                All capabilities
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            <div className="caps-grid" data-anim="stagger">
              <a href="/capabilities/web-development" className="cap" data-anim-child>
                <div className="cap-head">
                  <div>
                    <span className="mono-tag">Module 01</span>
                    <h3>Web Development</h3>
                  </div>
                  <span className="cap-sys">BUILD.SYS</span>
                </div>
                <p>Fast, modern websites engineered to rank and convert — React, Next.js, Vite, Tailwind, Supabase, and custom AI builds.</p>
                <span className="cap-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </a>

              <a href="/capabilities/seo-discoverability" className="cap" data-anim-child>
                <div className="cap-head">
                  <div>
                    <span className="mono-tag">Module 02</span>
                    <h3>SEO &amp; Discoverability</h3>
                  </div>
                  <span className="cap-sys">TRAFFIC_RECOVERY.SYS</span>
                </div>
                <p>Advanced search mechanics, technical SEO, and forensic recovery — plus AI-era schema, entity optimization, and LLM citations.</p>
                <span className="cap-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </a>

              <a href="/capabilities/native-crm" className="cap" data-anim-child>
                <div className="cap-head">
                  <div>
                    <span className="mono-tag">Module 03</span>
                    <h3>Native CRM</h3>
                  </div>
                  <span className="cap-sys">PIPELINE.SYS</span>
                </div>
                <p>Lead capture, pipeline, and follow-up built directly into your site — so traffic becomes revenue without a tool stack in between.</p>
                <span className="cap-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </a>

              <a href="/capabilities/ai-prospect-scraper" className="cap" data-anim-child>
                <div className="cap-head">
                  <div>
                    <span className="mono-tag">Module 04</span>
                    <h3>AI Prospect Scraper</h3>
                  </div>
                  <span className="cap-sys">OUTBOUND.SYS</span>
                </div>
                <p>Automated prospect discovery and enrichment that keeps the top of your pipeline full while the organic engine compounds.</p>
                <span className="cap-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </a>

              <a href="/capabilities/blockchain-web3-development" className="cap cap-wide" data-anim-child>
                <div>
                  <div className="cap-head" style={{marginBottom: '.8rem'}}>
                    <div>
                      <span className="mono-tag">Module 05</span>
                      <h3>Blockchain &amp; Web3 Development</h3>
                    </div>
                  </div>
                  <p>Smart contracts and Web3 infrastructure for brands building past the conventional stack — verified, shipped, on-chain.</p>
                </div>
                <span className="cap-sys">WEB3_CONTRACT.SYS · verifySignature() — SUCCESS</span>
                <span className="cap-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div className="wrap" style={{paddingTop: '5rem', paddingBottom: '5rem'}}>
          <div className="cta-card" data-anim="up">
            <div>
              <div className="eyebrow">Work with the operator</div>
              <h2 className="display">Stop guessing with your growth. Start <span className="accent">dominating with data.</span></h2>
              <p className="body-l">
                One call. Your domain, your numbers, and a straight read on what
                GOBIYA sees — no generalist pitch, no junior hand-off.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/book" className="btn btn-primary magnetic">
                Book a strategy call
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/company/success-stories" className="btn btn-ghost magnetic">See success stories</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
