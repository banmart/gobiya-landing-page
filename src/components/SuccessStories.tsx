import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const SuccessStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });
      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), y: 30, opacity: 0, duration: 1.2, ease: 'power3.out' });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="page" ref={containerRef} className="bg-[#111827] text-white antialiased font-sans min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow" style={{ paddingTop: '100px' }}>
        <main id="primary" className="site-main">
          {/* 04. Our Projects Section */}
      <section style={{ background: '#111827', borderBottom: '1px solid #1f2937' }} id="projects">
        <style>{`
          .hp-entry { display: block; text-decoration: none; color: inherit; }
          .hp-frame {
            position: relative;
            overflow: hidden;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hp-frame-2col { aspect-ratio: 16/9; }
          .hp-frame-3col { aspect-ratio: 4/3; }
          .hp-bg {
            position: absolute;
            inset: -8%;
            background-size: cover;
            background-position: center;
            transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .hp-bg-photo { filter: brightness(0.38); }
          .hp-bg-logo  { filter: blur(28px) brightness(0.12); background-size: 130%; }
          .hp-entry:hover .hp-bg { transform: scale(1.07); }
          .hp-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.18);
            transition: background 0.3s;
          }
          .hp-entry:hover .hp-overlay { background: rgba(0,0,0,0.06); }
          .hp-logo {
            position: relative;
            z-index: 1;
            width: 42%;
            max-width: 210px;
            object-fit: contain;
            filter: invert(1) brightness(10);
            opacity: 0.82;
            transition: opacity 0.35s, transform 0.35s;
          }
          .hp-entry:hover .hp-logo { opacity: 1; transform: scale(1.05); }
          .hp-meta {
            position: absolute;
            z-index: 3;
            bottom: 1.25rem;
            left: 1.5rem;
            right: 1.5rem;
            padding: 0;
          }
          .hp-meta-name {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: rgba(255,255,255,0.9);
            margin-bottom: 0.2rem;
            letter-spacing: -0.01em;
          }
          .hp-meta-cat {
            display: block;
            font-size: 0.65rem;
            font-family: monospace;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.45);
          }
          .hp-read-pill {
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
          .hp-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-top: 1px solid #1f2937;
            border-bottom: 1px solid #1f2937;
          }
          .hp-row-2 .hp-entry { border-right: 1px solid #1f2937; }
          .hp-row-2 .hp-entry:last-child { border-right: none; }
          .hp-row-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-bottom: 1px solid #1f2937;
          }
          .hp-row-3 .hp-entry { border-right: 1px solid #1f2937; }
          .hp-row-3 .hp-entry:last-child { border-right: none; }
          @media (max-width: 900px) {
            .hp-row-2 { grid-template-columns: 1fr; }
            .hp-row-2 .hp-entry { border-right: none; border-bottom: 1px solid #1f2937; }
            .hp-row-2 .hp-entry:last-child { border-bottom: none; }
            .hp-row-3 { grid-template-columns: 1fr 1fr; }
            .hp-row-3 .hp-entry { border-right: 1px solid #1f2937; border-bottom: 1px solid #1f2937; }
            .hp-row-3 .hp-entry:nth-child(2n) { border-right: none; }
            .hp-row-3 .hp-entry:nth-last-child(-n+2) { border-bottom: none; }
          }
          @media (max-width: 520px) {
            .hp-row-3 { grid-template-columns: 1fr; }
            .hp-row-3 .hp-entry { border-right: none; border-bottom: 1px solid #1f2937; }
            .hp-row-3 .hp-entry:last-child { border-bottom: none; }
          }
        `}</style>

        {/* Section header */}
        <div style={{ padding: '5rem 5vw 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }} data-anim="up">
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.6rem' }}>Our case studies</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>Featured work</h2>
          </div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '2px', textDecoration: 'none' }}>
            Keep exploring
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Card grids (edge-to-edge layout, no horizontal padding) */}
        <div>
        {/* Row 1: 2 featured cards */}
        <div className="hp-row-2">
          <a href="#" className="hp-entry" data-anim="up">
            <div className="hp-frame hp-frame-2col">
              <div className="hp-bg hp-bg-photo" style={{ backgroundImage: 'url(/images/smile-center-homepage.webp)' }} />
              <div className="hp-overlay" />
              <img src="/images/smilecenter.webp" alt="Smile Center Dentistry" className="hp-logo" />
              <span className="hp-read-pill">Read case study →</span>
              <div className="hp-meta">
                <strong className="hp-meta-name">Smile Center Dentistry</strong>
                <span className="hp-meta-cat">GEO Search &amp; Native CRM</span>
              </div>
            </div>
          </a>
          <a href="#" className="hp-entry" data-anim="up">
            <div className="hp-frame hp-frame-2col">
              <div className="hp-bg hp-bg-photo" style={{ backgroundImage: 'url(/images/caveman-remodel-me-pros.webp)' }} />
              <div className="hp-overlay" />
              <img src="/images/remodelmepros-opt.webp" alt="Remodel Me Pros" className="hp-logo" />
              <span className="hp-read-pill">Read case study →</span>
              <div className="hp-meta">
                <strong className="hp-meta-name">Remodel Me Pros</strong>
                <span className="hp-meta-cat">SEO &amp; Lead Generation</span>
              </div>
            </div>
          </a>
        </div>

        {/* Row 2: 3 cards */}
        <div className="hp-row-3">
          {[
            { name: 'SafetyCentric',  cat: 'SEO · Discoverability',      logo: '/images/safetycentric-logo.png',   bg: '/images/safety-centric-home.webp',   href: '/work' },
            { name: 'QuickPass AiD', cat: 'Custom Build · Native CRM',   logo: '/images/quickpass-logo-opt.webp', bg: '/images/quickpass-aid.webp',          href: '/work' },
            { name: 'The ARK Crypto',cat: 'Web Development · Branding',  logo: '/images/ark-logo---01-dark.webp', bg: '/images/the-ark-dark.webp',           href: '/work' },
          ].map(c => (
            <a key={c.name} href={c.href} className="hp-entry" data-anim="up">
              <div className="hp-frame hp-frame-3col">
                <div className="hp-bg hp-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                <div className="hp-overlay" />
                <img src={c.logo} alt={c.name} className="hp-logo" />
                <div className="hp-meta">
                  <strong className="hp-meta-name">{c.name}</strong>
                  <span className="hp-meta-cat">{c.cat}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Row 3: 3 cards */}
        <div className="hp-row-3">
          {[
            { name: 'American Livescan', cat: 'Local SEO · Walk-in Traffic', logo: '/images/americanlivescan.webp', bg: '/images/american-livescan-storefront.webp', href: '/work' },
            { name: 'Medicine Metta', cat: 'Web Development · SEO', logo: '/images/medicine-metta-logo-1.webp', bg: '/images/healing-metta-home.webp', href: '/work' },
            { name: 'Trusted Home Contractors', cat: 'Lead Gen · SEO', logo: '/images/trusted-logo-home.webp', bg: '/images/trusted-home-contractors-home.webp', href: '/work' },
          ].map(c => (
            <a key={c.name} href={c.href} className="hp-entry" data-anim="up">
              <div className="hp-frame hp-frame-3col">
                <div className="hp-bg hp-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                <div className="hp-overlay" />
                <img src={c.logo} alt={c.name} className="hp-logo" />
                <div className="hp-meta">
                  <strong className="hp-meta-name">{c.name}</strong>
                  <span className="hp-meta-cat">{c.cat}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Row 4: 2 cards */}
        <div className="hp-row-2">
          <a href="/work" className="hp-entry" data-anim="up">
            <div className="hp-frame hp-frame-2col">
              <div className="hp-bg hp-bg-photo" style={{ backgroundImage: 'url(/images/totalcapital.webp)' }} />
              <div className="hp-overlay" />
              <img src="/images/totalcapital-opt.webp" alt="Total Capital" className="hp-logo" />
              <div className="hp-meta">
                <strong className="hp-meta-name">Total Capital</strong>
                <span className="hp-meta-cat">Performance Marketing</span>
              </div>
            </div>
          </a>
          <a href="/work" className="hp-entry" data-anim="up">
            <div className="hp-frame hp-frame-2col">
              <div className="hp-bg hp-bg-photo" style={{ backgroundImage: 'url(/images/tidder-hero.webp)' }} />
              <div className="hp-overlay" />
              <img src="/images/tidder-logo.webp" alt="Tidder" className="hp-logo" />
              <div className="hp-meta">
                <strong className="hp-meta-name">Tidder</strong>
                <span className="hp-meta-cat">Product Development</span>
              </div>
            </div>
          </a>
        </div>
        </div>
      </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

export default SuccessStories;
