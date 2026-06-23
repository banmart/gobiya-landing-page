import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Experience', val: '25+', unit: 'yrs', desc: 'Bridging full-stack software engineering and organic search traffic acquisition since 2000.' },
  { label: 'Founded', val: '2012', unit: '', desc: 'Headquartered in Los Angeles, serving mid-market to enterprise brands nationally.' },
  { label: 'Trust score', val: '98.4', unit: '%', desc: 'BBB A+ rated and a certified partner — accountability is part of the architecture.' },
  { label: 'URI paths analyzed', val: '1.4M', unit: '', desc: 'In a single forensic scan — the scale a recovery read actually runs at.' },
];

const TIMELINE = [
  {
    year: '2000',
    label: 'The foundation',
    title: 'Engineering meets search.',
    body: 'Full-stack software engineering and organic search traffic acquisition, practiced side by side from the start. Most marketers learned to talk to Google; this practice learned to read it.',
    tags: ['Full-stack dev', 'Organic search'],
  },
  {
    year: '2012',
    label: 'The agency',
    title: 'Gobiya is founded in Los Angeles.',
    body: 'A precision-engineered search visibility and digital solutions firm — built for high-stakes technical environments and data-driven revenue, not broad generalist tactics.',
    tags: ['Technical SEO', 'Performance marketing'],
  },
  {
    year: '2012–2023',
    label: 'The updates',
    title: 'Every algorithm cycle, survived.',
    body: 'Penguin, Hummingbird, Medic, BERT, the Helpful Content update — each one re-ranked the web, and each one sharpened the recovery practice that clients now hire Gobiya for.',
    tags: ['Recovery forensics', '1.4M URI scans'],
  },
  {
    year: '2024 → now',
    label: 'The AI era',
    title: 'Search becomes answers. Gobiya adapts first.',
    body: 'Schema markup, entity optimization, and structured citations for LLMs — plus native CRM, Web3 builds, and AI prospect automation. The next update is TBD. The posture is ready.',
    tags: ['GEO / LLM citations', 'Native CRM', 'AI automation'],
  },
];

const CAPABILITIES = [
  { n: '01', sys: 'BUILD.SYS', href: '/capabilities/web-development-agency/', title: 'Web Development', body: 'Fast, modern websites engineered to rank and convert — React, Next.js, Vite, Tailwind, Supabase, and custom AI builds.' },
  { n: '02', sys: 'TRAFFIC_RECOVERY.SYS', href: '/capabilities/seo-discoverability-agency/', title: 'SEO & Discoverability', body: 'Advanced search mechanics, technical SEO, and forensic recovery — plus AI-era schema, entity optimization, and LLM citations.' },
  { n: '03', sys: 'PIPELINE.SYS', href: '/capabilities/native-crm-agency/', title: 'Native CRM', body: 'Lead capture, pipeline, and follow-up built directly into your site — so traffic becomes revenue without a tool stack in between.' },
  { n: '04', sys: 'OUTBOUND.SYS', href: '/capabilities/ai-prospect-scraper-agency/', title: 'AI Prospect Scraper', body: 'Automated prospect discovery and enrichment that keeps the top of your pipeline full while the organic engine compounds.' },
  { n: '05', sys: 'WEB3.SYS', href: '/capabilities/blockchain-web3-development-agency/', title: 'Blockchain & Web3', body: 'Smart contracts and Web3 infrastructure for brands building past the conventional stack — verified, shipped, on-chain.' },
  { n: '06', sys: 'AI.SYS', href: '/capabilities/ai-llms-business-agency/', title: 'AI & LLMs for Business', body: 'Custom LLM integrations and automated office workflows to eliminate daily SMB friction and manual chores.' },
];

const OP_ROWS = [
  { k: 'Background', v: 'Full-stack engineering × organic search, since 2000' },
  { k: 'Specialty', v: 'Advanced search mechanics, performance marketing, digital infrastructure design' },
  { k: 'Dev stack', v: 'React, Next.js, Vite, Tailwind CSS, Supabase, custom AI chat & automation builds' },
  { k: 'AI-era SEO', v: 'Schema markup, entity optimization, structured citations for LLMs' },
  { k: 'Credentials', v: 'Certified partner · BBB A+ rated · professional certifications on file' },
];

export default function GobiyaAboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.8, ease: 'power2.inOut', delay: 0.1 });

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const ease = 'power3.out';
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

        gsap.utils.toArray('[data-anim="stagger"]').forEach(parent => {
          const kids = (parent as Element).querySelectorAll('[data-anim-child]');
          if (!kids.length) return;
          gsap.fromTo(kids,
            { y: 26, opacity: 0 },
            { scrollTrigger: sc(parent as Element), y: 0, opacity: 1, duration: 1.15, ease, stagger: 0.12 }
          );
        });

        if (window.matchMedia('(pointer:fine)').matches) {
          document.querySelectorAll('.magnetic').forEach(btn => {
            const strength = 10;
            btn.addEventListener('mouseenter', () => { (btn as any)._cachedRect = btn.getBoundingClientRect(); });
            const onMove = (e: Event) => {
              const me = e as MouseEvent;
              const r = (btn as any)._cachedRect || btn.getBoundingClientRect();
              const x = (me.clientX - r.left - r.width / 2) / (r.width / 2);
              const y = (me.clientY - r.top - r.height / 2) / (r.height / 2);
              gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
            };
            const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
            btn.addEventListener('mousemove', onMove);
            btn.addEventListener('mouseleave', onLeave);
          });
        }
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="page" ref={containerRef} className="min-h-screen flex flex-col bg-white font-sans">
      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: '13rem 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>About the agency</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '880px', marginBottom: '1.75rem' }}>
          The Los Angeles SEO agency that treats search like an engineering problem.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
          Gobiya is a precision-engineered search visibility and digital solutions firm. Founded in 2012 in Los Angeles — built for high-stakes technical environments and data-driven revenue generation.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Book a strategy call
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="/case-studies" className="btn btn-ghost magnetic">See case studies</a>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '0 5vw' }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              data-anim="up"
              style={{
                padding: '2.25rem 0',
                borderRight: i < 3 ? '1px solid #e5e7eb' : 'none',
                paddingLeft: i > 0 ? '2.5rem' : 0,
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>
                {s.label}
              </span>
              <span style={{ display: 'block', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111827', lineHeight: 1 }}>
                {s.val}
                {s.unit && <span style={{ fontSize: '0.55em', letterSpacing: 0 }}>{s.unit}</span>}
              </span>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.65, marginTop: '0.6rem', maxWidth: '200px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE OPERATOR ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>

          {/* sticky left rail */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>The operator</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15, marginBottom: '1rem' }}>
              Built on experience.<br />Dedicated to shipping.
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>
              Gobiya isn't a roster of account managers. It's an engineering practice with one name on the work.
            </p>
          </div>

          {/* right content */}
          <div>
            <div data-anim="stagger" style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.25rem' }} data-anim-child>
                Gobiya is led by Steve Martin — 25+ years of digital marketing and full-stack development experience. That dual background is the whole point: the person reading your traffic curve is the same kind of person who can read your codebase.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.25rem' }} data-anim-child>
                Since 2000, that has meant bridging software engineering and organic search acquisition — and since 2012, running Gobiya as a precision-engineered growth practice for brands that require high-performance technical SEO and scalable digital revenue engines.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: 1.8 }} data-anim-child>
                No layers between you and the work. No strategy deck handed to a junior team. The diagnosis, the build, and the deployment come from the same desk.
              </p>
            </div>

            {/* Steve dossier card */}
            <div data-anim="fade" style={{ border: '1px solid #111827', background: '#111827', color: '#f9fafb', padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <img
                  src="/images/steve-portrait.webp"
                  alt="Steve Martin"
                  style={{ width: '48px', height: '48px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f9fafb', margin: 0 }}>Steve Martin</p>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', margin: 0 }}>
                    Founder &amp; principal — Gobiya, Los Angeles
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {OP_ROWS.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '1.5rem',
                      fontFamily: 'monospace',
                      fontSize: '0.7rem',
                      borderBottom: i < OP_ROWS.length - 1 ? '1px dashed rgba(255,255,255,0.08)' : 'none',
                      paddingBottom: '0.4rem',
                    }}
                  >
                    <span style={{ color: '#9ca3af', flexShrink: 0 }}>{row.k}</span>
                    <span style={{ color: '#d1d5db', textAlign: 'right' }}>{row.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', color: '#6b7280' }}>linkedin.com/in/stevemartingobiya</span>
                <a
                  href="https://www.linkedin.com/in/stevemartingobiya/"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.68rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f9fafb', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '2px' }}
                >
                  Connect
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>

          {/* sticky left rail */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>The record</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              25 years of search, engineering, and staying ahead of the curve.
            </h2>
          </div>

          {/* timeline steps */}
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {TIMELINE.map((phase, i) => (
              <div
                key={i}
                data-anim="up"
                style={{ display: 'grid', gridTemplateColumns: '80px 1fr', padding: '2rem 0', borderBottom: '1px solid #e5e7eb', alignItems: 'start', gap: '1rem' }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', paddingTop: '4px' }}>
                  {phase.year}
                </span>
                <div>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F26522', display: 'block', marginBottom: '0.4rem' }}>
                    {phase.label}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', letterSpacing: '-0.01em', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {phase.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '1rem' }}>
                    {phase.body}
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {phase.tags.map((tag, j) => (
                      <span
                        key={j}
                        style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', border: '1px solid #d1d5db', padding: '0.2rem 0.6rem' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Core capabilities</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
              Five disciplines, one system.
            </h2>
            <a
              href="/capabilities"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', textDecoration: 'none', borderBottom: '1px solid #d1d5db', paddingBottom: '2px' }}
            >
              All capabilities
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {CAPABILITIES.map((cap) => (
            <a
              key={cap.n}
              href={cap.href}
              style={{ display: 'block', background: '#ffffff', padding: '2.5rem', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#9ca3af' }}>Module {cap.n}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#d1d5db' }}>{cap.sys}</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{cap.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '1.25rem' }}>{cap.body}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.68rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', borderBottom: '1px solid #d1d5db', paddingBottom: '2px' }}>
                View capability
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 5vw', background: '#111827', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#F26522', display: 'block', marginBottom: '0.5rem' }}>Ready to start</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f9fafb', lineHeight: 1.2, marginBottom: '1rem' }}>
            The diagnosis, the build, and the deployment — from one desk.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: 1.75 }}>
            No sales teams, no account managers, no strategy decks handed to juniors. Book directly with Steve.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Book a strategy call
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a
            href="/case-studies"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2px' }}
          >
            View case studies
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
