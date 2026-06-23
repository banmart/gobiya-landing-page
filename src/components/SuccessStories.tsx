import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SuccessStories.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const SuccessStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {



    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initial load fade in
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const ease = 'power3.out';


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
          btn.addEventListener('mouseenter', () => { (btn as any)._cachedRect = btn.getBoundingClientRect(); });
          btnEl.addEventListener('mousemove', (e) => {
            const r = (btnEl as any)._cachedRect || btnEl.getBoundingClientRect();
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
    <div id="page" ref={containerRef} className="success-stories-page min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">

      <section id="top" style={{ background: '#ffffff', padding: '13rem 5vw 5rem', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', display: 'block', marginBottom: '1.5rem' }}>
          Gobiya / Case studies
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '880px', marginBottom: '1.75rem' }}>
          SEO Case Studies
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
          Data-backed search recovery and pipeline results — exactly what GOBIYA built, why it was built, and what moved as a result. Query by query, position by position.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#case-001" className="btn btn-primary magnetic">
            Open the case files
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="/book" className="btn btn-ghost magnetic">Start your audit</a>
        </div>
      </section>

      {/* ── CLIENT CARDS GRID ── */}
      <section id="case-001" style={{ background: '#111827' }}>
        <style>{`
          .cs-card {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            text-decoration: none;
            background: #0a0a0a;
          }
          .cs-card-featured { aspect-ratio: 16/9; }
          .cs-card-regular  { aspect-ratio: 4/3; }
          .cs-bg {
            position: absolute;
            inset: -8%;
            background-size: cover;
            background-position: center;
            transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .cs-bg-photo { filter: brightness(0.38); }
          .cs-bg-dark  { background: #111827; inset: 0; filter: none; }
          .cs-card:hover .cs-bg { transform: scale(1.07); }
          .cs-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.18);
            transition: background 0.3s;
            z-index: 1;
          }
          .cs-card:hover .cs-overlay { background: rgba(0,0,0,0.06); }
          .cs-logo {
            position: relative;
            z-index: 2;
            width: 44%;
            max-width: 200px;
            object-fit: contain;
            filter: invert(1) brightness(10);
            opacity: 0.82;
            transition: opacity 0.35s, transform 0.35s;
          }
          .cs-card:hover .cs-logo { opacity: 1; transform: scale(1.05); }
          .cs-logo.no-filter { filter: none; }
          .cs-badge {
            position: absolute;
            z-index: 3;
            bottom: 1.25rem;
            left: 1.5rem;
            right: 1.5rem;
          }
          .cs-badge-name {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: rgba(255,255,255,0.9);
            margin-bottom: 0.2rem;
          }
          .cs-badge-cat {
            display: block;
            font-size: 0.65rem;
            font-family: monospace;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.45);
          }
          .cs-read-pill {
            position: absolute;
            z-index: 3;
            top: 1.25rem;
            right: 1.25rem;
            font-size: 0.65rem;
            font-family: monospace;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.6);
            border: 1px solid rgba(255,255,255,0.25);
            border-radius: 100px;
            padding: 0.3rem 0.7rem;
          }
          /* Staggered Row Grids on Desktop */
          .cs-row-2col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-bottom: 1px solid #1f2937;
          }
          .cs-row-2col .cs-card { border-right: 1px solid #1f2937; }
          .cs-row-2col .cs-card:last-child { border-right: none; }

          .cs-row-3col {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-bottom: 1px solid #1f2937;
          }
          .cs-row-3col .cs-card { border-right: 1px solid #1f2937; }
          .cs-row-3col .cs-card:last-child { border-right: none; }

          .cs-row-4col {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
          }
          .cs-row-4col .cs-card { border-right: 1px solid #1f2937; }
          .cs-row-4col .cs-card:last-child { border-right: none; }

          @media (max-width: 900px) {
            .cs-grid-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              border-top: 1px solid #1f2937;
            }
            .cs-row-2col, .cs-row-3col, .cs-row-4col {
              display: contents;
            }
            .cs-card {
              border-right: 1px solid #1f2937 !important;
              border-bottom: 1px solid #1f2937 !important;
            }
            .cs-card:nth-child(2n) {
              border-right: none !important;
            }
            .cs-card:nth-last-child(-n+2) {
              border-bottom: none !important;
            }
          }
          @media (max-width: 520px) {
            .cs-grid-container {
              grid-template-columns: 1fr;
            }
            .cs-card {
              border-right: none !important;
              border-bottom: 1px solid #1f2937 !important;
            }
            .cs-card:last-child {
              border-bottom: none !important;
            }
          }
        `}</style>

        <div className="cs-grid-container">
          {/* Row 1 (2 columns - Featured) */}
          <div className="cs-row-2col">
            <a href="/case-studies/smile-center-dentistry" className="cs-card cs-card-featured">
              <div className="cs-bg cs-bg-photo" style={{ backgroundImage: 'url(/images/smile-center-homepage.webp)' }} />
              <div className="cs-overlay" />
              <img src="/images/smilecenter.webp" alt="Smile Center" className="cs-logo" />
              <div className="cs-badge">
                <span className="cs-badge-name">Smile Center Dentistry</span>
                <span className="cs-badge-cat">Multi-location SEO · Conversion architecture · React/Vite</span>
              </div>
              <span className="cs-read-pill">Read case study →</span>
            </a>
            <a href="/case-studies/american-livescan" className="cs-card cs-card-featured">
              <div className="cs-bg cs-bg-photo" style={{ backgroundImage: 'url(/images/american-livescan-storefront.webp)' }} />
              <div className="cs-overlay" />
              <img src="/images/americanlivescan.webp" alt="American Livescan" className="cs-logo" />
              <div className="cs-badge">
                <span className="cs-badge-name">American Livescan</span>
                <span className="cs-badge-cat">Site rebuild · Local SEO · Google Business Profile</span>
              </div>
              <span className="cs-read-pill">Read case study →</span>
            </a>
          </div>

          {/* Row 2 (3 columns - Regular) */}
          <div className="cs-row-3col">
            {[
              { name: 'Remodel Me Pros',   cat: 'SEO · Lead generation',           logo: '/images/remodelmepros-opt.webp',  bg: '/images/caveman-remodel-me-pros.webp' },
              { name: 'SafetyCentric',      cat: 'SEO · Discoverability',            logo: '/images/safetycentric-logo.png',  bg: '/images/safety-centric-home.webp' },
              { name: 'Total Capital Inc',  cat: 'Financial SEO · Pipeline',         logo: '/images/totalcapital-opt.webp',   bg: '/images/delano-home.webp' },
            ].map(c => (
              <div key={c.name} className="cs-card cs-card-regular">
                {c.bg
                  ? <div className="cs-bg cs-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                  : <div className="cs-bg cs-bg-dark" />
                }
                <div className="cs-overlay" />
                <img src={c.logo} alt={c.name} className={`cs-logo ${c.name === 'DG Plumbing' ? 'no-filter' : ''}`} />
                <div className="cs-badge">
                  <span className="cs-badge-name">{c.name}</span>
                  <span className="cs-badge-cat">{c.cat}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3 (2 columns - Regular) */}
          <div className="cs-row-2col">
            {[
              { name: 'QuickPass AiD',      cat: 'Custom build · Native CRM',        logo: '/images/quickpass-logo-opt.webp', bg: '/images/quickpass-aid.webp' },
              { name: 'DG Plumbing',        cat: 'Local SEO · Google Business',      logo: '/images/logo-DeEgMiH0-opt.png',   bg: '/images/dgplumbing-front-home.webp' },
            ].map(c => (
              <div key={c.name} className="cs-card cs-card-regular" style={{ aspectRatio: '16/9' }}>
                {c.bg
                  ? <div className="cs-bg cs-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                  : <div className="cs-bg cs-bg-dark" />
                }
                <div className="cs-overlay" />
                <img src={c.logo} alt={c.name} className={`cs-logo ${c.name === 'DG Plumbing' ? 'no-filter' : ''}`} />
                <div className="cs-badge">
                  <span className="cs-badge-name">{c.name}</span>
                  <span className="cs-badge-cat">{c.cat}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 4 (4 columns - Regular) */}
          <div className="cs-row-4col">
            {[
              { name: 'The ARK Crypto',     cat: 'Web development · Branding',       logo: '/images/ark-logo---01-dark.webp', bg: '/images/the-ark-dark.webp' },
              { name: 'EliZilberstein.com', cat: 'Personal brand · SEO',             logo: '/images/client-5.webp',           bg: '/images/eli-zilberstein-suit-home.webp' },
              { name: 'Healing Metta',      cat: 'Healthcare SEO · Content',         logo: '/images/medicine-metta-logo-1.webp', bg: '/images/healing-metta-home.webp' },
              { name: 'Trusted Home Contractors', cat: 'General Contractors · Los Angeles & OC', logo: '/images/trusted-logo-home.webp', bg: '/images/trusted-home-contractors-home.webp' },
            ].map(c => (
              <div key={c.name} className="cs-card cs-card-regular">
                {c.bg
                  ? <div className="cs-bg cs-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                  : <div className="cs-bg cs-bg-dark" />
                }
                <div className="cs-overlay" />
                <img src={c.logo} alt={c.name} className={`cs-logo ${c.name === 'DG Plumbing' ? 'no-filter' : ''}`} />
                <div className="cs-badge">
                  <span className="cs-badge-name">{c.name}</span>
                  <span className="cs-badge-cat">{c.cat}</span>
                </div>
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


        </main>
      </div>

      <SiteFooter />
    </div>
  );
};

export default SuccessStories;
