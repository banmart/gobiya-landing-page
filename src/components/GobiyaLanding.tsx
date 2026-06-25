import React, { useEffect, useRef } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import LatestInsights from './LatestInsights';

const yieldToMain = (): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();
  if ('scheduler' in window && typeof (window as any).scheduler?.yield === 'function') {
    return (window as any).scheduler.yield();
  }
  return new Promise<void>(resolve => setTimeout(resolve, 0));
};

export default function GobiyaLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('js');

    const controller = new AbortController();
    const { signal } = controller;

    // --- Cursor follower script ---
    const cursor = document.getElementById('cursor-follower');
    const handleMouseMoveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMoveCursor);

    // --- Diagnostic console script ---
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

    if (form) form.addEventListener('submit', handleFormSubmit);

    // --- Dynamic animations script ---
    const runAnimations = async () => {
      if (signal.aborted) return;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (signal.aborted) return;

      gsap.registerPlugin(ScrollTrigger);

      // Fade in body
      gsap.to(document.body, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });

      // Entrance animation for cover/hero
      const ease = 'power3.out';
  
      await yieldToMain();
      if (signal.aborted) return;

      // Scroll reveals
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

      // GSAP Accordion Cards
      const accordionCards = gsap.utils.toArray('.universe-accordion-card') as HTMLElement[];
      if (accordionCards.length > 0) {
        // Flex expansion only — all content always visible, CSS handles colors
        accordionCards.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { flex: 3.5, duration: 0.55, ease: 'power2.out' });
            accordionCards.forEach(other => {
              if (other !== card) gsap.to(other, { flex: 1, duration: 0.55, ease: 'power2.out' });
            });
          });
        });
      }

      // Counters
      gsap.utils.toArray('[data-count]').forEach(el => {
        const target = parseInt((el as HTMLElement).dataset.count || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el as Element, start: 'top 90%' },
          onUpdate: () => { (el as HTMLElement).textContent = String(Math.round(obj.v)); }
        });
      });

    };

    runAnimations();

    return () => {
      controller.abort();
      window.removeEventListener('mousemove', handleMouseMoveCursor);
      if (form) form.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <div id="page" ref={containerRef} className="home-page bg-white text-gray-900 antialiased font-sans min-h-screen flex flex-col">
      <div id="cursor-follower" className="hidden lg:block"></div>
      
      <SiteHeader />

      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">
          {/* 01. Cover / Hero Video Section */}
          <section className="cover-hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', overflow: 'hidden' }}>
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full"
                style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              >
                <source src="/videos/hero-index-background.webm" type="video/webm" />
              </video>
            </div>
            <div className="cover-overlay absolute inset-0 z-10 bg-black/40"></div>
            
            <div className="cover-content w-full" style={{ position: 'relative', transform: 'none', top: 'auto', left: 'auto', right: 'auto', bottom: 'auto', paddingLeft: '5vw', paddingRight: '5vw', paddingBottom: '3rem', textAlign: 'left', maxWidth: 'none', margin: 0, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', minHeight: '100%' }}>
              {/* Hero text removed as requested */}
              <div className="cover-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '1.5rem', margin: 0 }}>
                <a href="/creativity" className="btn-cover">
                  Creativity
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="/performance" className="btn-cover">
                  Performance
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="/relations" className="btn-cover">
                  Relations
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="/contact" className="btn-cover" style={{ background: '#ffffff', color: '#000000', borderColor: '#ffffff' }}>
                  Contact Us
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </section>

      {/* 02. Intro Section */}
      <section className="intro-section py-24 bg-white border-b border-line" id="intro">
        <div className="intro-grid w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
          <div className="flex flex-col justify-start" data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">
              Omnichannel digital agency in Los Angeles
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              For a better and more effective digital dominance.
            </h1>
          </div>
          <div className="flex flex-col justify-between" data-anim="up">
            <div className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              <p className="mb-6">
                GOBIYA is a team of communication and technology professionals based in Los Angeles. We engage in an ongoing dialogue with our clients to deliver effective, omnichannel strategies, both online and offline.
              </p>
              <p>
                Since 2012, we have guided clients through the increasingly complex and evolving worlds of search engines, digital advertising, web design, and branding. We explore every aspect of a project, from strategic positioning to custom software integrations.
              </p>
            </div>
            <div className="mt-8">
              <a href="/about" className="inline-flex items-center gap-2 text-base font-semibold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                More about us
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* 03. Numbers Section */}
        <div className="numbers-grid mt-24">
          <div className="number-block" data-anim="up">
            <div className="number"><span data-count="14">0</span>+</div>
            <div className="label">Years of digital forensics</div>
          </div>
          <div className="number-block" data-anim="up">
            <div className="number"><span data-count="13">0</span></div>
            <div className="label">Technical specializations</div>
          </div>
          <div className="number-block" data-anim="up">
            <div className="number"><span data-count="300">0</span>+</div>
            <div className="label">Successful client sites</div>
          </div>
        </div>
      </section>

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
          <a href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '2px', textDecoration: 'none' }}>
            Keep exploring
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Card grids (edge-to-edge layout, no horizontal padding) */}
        <div>
        {/* Row 1: 2 featured cards */}
        <div className="hp-row-2">
          <a href="/case-studies/smile-center-dentistry" className="hp-entry" data-anim="up">
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
          <a href="/case-studies" className="hp-entry" data-anim="up">
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
            { name: 'SafetyCentric',  cat: 'SEO · Discoverability',      logo: '/images/safetycentric-logo.png',   bg: '/images/safety-centric-home.webp',   href: '/case-studies' },
            { name: 'QuickPass AiD', cat: 'Custom Build · Native CRM',   logo: '/images/quickpass-logo-opt.webp', bg: '/images/quickpass-aid.webp',          href: '/case-studies' },
            { name: 'The ARK Crypto',cat: 'Web Development · Branding',  logo: '/images/ark-logo---01-dark.webp', bg: '/images/the-ark-dark.webp',           href: '/case-studies' },
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
        </div>
      </section>

      {/* 05. Three Universes Section */}
      <section className="bg-white border-b border-line" id="services" style={{ padding: '6rem 5vw' }}>
          <div className="mb-16" data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-500 block mb-2">Our capability ecosystem</span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight max-w-3xl">
              Three universes, one mission: offering solutions that work.
            </h2>
          </div>

          <style>{`
            .services-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              border: 1px solid #e5e7eb;
            }
            .services-col {
              padding: 3.5rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              border-right: 1px solid #e5e7eb;
            }
            .services-col:last-child {
              border-right: none;
            }
            @media (max-width: 900px) {
              .services-grid {
                grid-template-columns: 1fr;
              }
              .services-col {
                padding: 2.5rem 1.5rem;
                border-right: none;
                border-bottom: 1px solid #e5e7eb;
              }
              .services-col:last-child {
                border-bottom: none;
              }
            }
          `}</style>

          <div className="services-grid" data-anim="up">

            {/* Card 1 — Creativity */}
            <div className="services-col">
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>01</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', textTransform: 'lowercase', color: '#1f2937', marginBottom: '1.5rem' }}>creativity</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Creativity makes the way you express your identity unique and effective: the presentation you give yourself, the worlds you choose and the images you process to describe yourself all contribute to creating your world.
                </p>
                <ol style={{ listStyleType: 'decimal', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <li><a href="/creativity/brand-identity-strategy-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Brand Identity Strategy</a></li>
                  <li><a href="/creativity/communication-concepts-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Communication Concepts</a></li>
                  <li><a href="/creativity/seo-web-copywriting-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>SEO &amp; Web Copywriting</a></li>
                  <li><a href="/creativity/creative-art-direction-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Creative Art Direction</a></li>
                  <li><a href="/creativity/social-media-management-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Social Media Management</a></li>
                </ol>
              </div>
              <a href="/creativity" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 500, color: '#374151', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginTop: '2.5rem' }}>
                Find more
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/></svg>
              </a>
            </div>

            {/* Card 2 — Performance */}
            <div className="services-col">
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>02</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', textTransform: 'lowercase', color: '#1f2937', marginBottom: '1.5rem' }}>performance</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Strong performance is what enables you to achieve the goals you set for yourself, with measurable results that you can count on.
                </p>
                <ol style={{ listStyleType: 'decimal', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <li><a href="/performance/seo-discoverability-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>SEO &amp; Discoverability</a></li>
                  <li><a href="/performance/web-development-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Web &amp; IT App Development</a></li>
                  <li><a href="/performance/google-ads-ppc-strategy-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Google Ads &amp; PPC Strategy</a></li>
                  <li><a href="/performance/cro-ux-analysis-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>CRO &amp; UX Analysis</a></li>
                  <li><a href="/performance/ai-llms-business-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>AI &amp; LLM Systems Consulting</a></li>
                </ol>
              </div>
              <a href="/performance" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 500, color: '#374151', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginTop: '2.5rem' }}>
                Find more
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/></svg>
              </a>
            </div>

            {/* Card 3 — Relations */}
            <div className="services-col">
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>03</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', textTransform: 'lowercase', color: '#1f2937', marginBottom: '1.5rem' }}>relations</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Relationships are the contact point between your project and the market. Listening, writing, authority building, and building solid PR connections transform a digital project into a successful one.
                </p>
                <ol style={{ listStyleType: 'decimal', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <li><a href="/relations/authority-building-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Authority &amp; Link Building</a></li>
                  <li><a href="/relations/digital-pr-media-outreach-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Digital PR &amp; Media Outreach</a></li>
                  <li><a href="/relations/content-marketing-syndication-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Content Marketing Syndication</a></li>
                  <li><a href="/relations/influencer-marketing-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Influencer Marketing</a></li>
                  <li><a href="/relations/local-community-relations-agency" style={{ color: '#4b5563', fontSize: '0.875rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>Local Community Relations</a></li>
                </ol>
              </div>
              <a href="/relations" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 500, color: '#374151', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginTop: '2.5rem' }}>
                Find more
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/></svg>
              </a>
            </div>

          </div>
      </section>

      {/* Latest Insights Slider Section */}
      <LatestInsights />


    </main>
  </div>

      <SiteFooter />
    </div>
  );
}
