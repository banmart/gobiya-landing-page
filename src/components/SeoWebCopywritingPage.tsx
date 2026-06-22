import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const SPOKES = [
  {
    title: 'Landing page copywriting',
    query: '"landing page copywriting agency"',
    href: '/creativity/landing-page-copywriting-agency',
    desc: 'Copy engineered to convert the visitor who arrives from an ad or organic click into a lead or sale.',
  },
  {
    title: 'Website copywriting services',
    query: '"website copywriting services"',
    href: '/creativity/website-copywriting-services-agency',
    desc: 'Every page of your site — home, about, services, product — written to rank and convert.',
  },
  {
    title: 'SEO content strategy',
    query: '"SEO content strategy agency"',
    href: '/creativity/seo-content-strategy-agency',
    desc: 'The architecture before the words: keyword mapping, topic clusters, and internal link plan.',
  },
  {
    title: 'GEO & AI content writing',
    query: '"GEO AI content writing agency"',
    href: '/creativity/geo-ai-content-writing-agency',
    desc: 'Content built to be cited by ChatGPT, Perplexity, and Google AI Overviews — not just indexed.',
  },
];

const SERVICES = [
  { n: '01', title: 'Keyword & intent research', body: 'We map the precise language your buyers use at each stage of the search journey — from awareness questions to bottom-funnel comparisons — and build your copy around those signals.' },
  { n: '02', title: 'Page copy & heading architecture', body: 'H1, H2, and body copy written with semantic depth. Every page has a clear keyword focus, entity relationships, and a logical structure that search engines and humans can parse.' },
  { n: '03', title: 'Conversion copywriting', body: 'Ranked pages that don\'t convert waste budget. We apply persuasion architecture — benefit framing, friction reduction, social proof — so rankings turn into revenue.' },
  { n: '04', title: 'On-page SEO elements', body: 'Title tags, meta descriptions, image alt text, schema markup, and internal link anchor text are all treated as copy — each one a micro-moment that affects clicks and rankings.' },
  { n: '05', title: 'Content refreshes & audits', body: 'We identify underperforming pages with real organic potential and rewrite them to capture rankings they\'re close to — without a full rebuild.' },
  { n: '06', title: 'GEO-optimized content', body: 'Structured for AI citation: clear factual claims, verifiable entity signals, FAQ blocks, and citation-worthy data that AI models pick up and surface in answers.' },
];

const STEPS = [
  'Keyword and intent audit of your current site and target query set',
  'Competitive gap analysis — what your ranked competitors say that you don\'t',
  'Content architecture: URL structure, heading hierarchy, internal linking map',
  'Draft copy aligned to search intent, brand voice, and conversion goals',
  'SEO review: keyword density, entity coverage, readability, linking',
  'Publish with full on-page SEO: title, meta, schema, alt text',
];

const STATS = [
  { val: '213K', label: 'Monthly impressions driven for a single client cluster' },
  { val: '6 steps', label: 'Repeatable process, every engagement' },
  { val: 'Top 5', label: 'Branded rankings achieved for Smile Center' },
];

export default function SeoWebCopywritingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: '9rem 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/creativity" style={{ color: '#9ca3af', textDecoration: 'none' }}>Creativity</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>SEO &amp; Web Copywriting</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          SEO &amp; Web Copywriting that ranks in algorithms and converts human readers.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
          We write words that satisfy search crawlers and move buyers. Keyword research, semantic architecture, conversion copy, and GEO-optimized content — engineered as a single system.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Start a project
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="/creativity" className="btn btn-ghost magnetic">All creativity services</a>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 5vw' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '2rem 0', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none', paddingLeft: i > 0 ? '3rem' : 0 }}>
              <span style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111827', lineHeight: 1 }}>{s.val}</span>
              <span style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginTop: '0.5rem' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUERY CLUSTER MAP ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Query fan-out cluster</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', maxWidth: '600px' }}>
            How we dominate the full SEO copywriting search landscape
          </h2>
        </div>

        {/* Hub card */}
        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>SEO &amp; Web Copywriting</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"seo web copywriting agency"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /creativity/seo-web-copywriting-agency
          </span>
        </div>

        {/* Spoke cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #e5e7eb', borderTop: 'none' }}>
          {SPOKES.map((s, i) => (
            <a
              key={i}
              href={s.href}
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRight: i < 3 ? '1px solid #e5e7eb' : 'none',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '0.6rem' }}>
                Spoke {String(i + 1).padStart(2, '0')}
              </span>
              <strong style={{ fontSize: '0.9rem', color: '#111827', display: 'block', marginBottom: '0.4rem', lineHeight: 1.3 }}>{s.title}</strong>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#9ca3af', display: 'block', marginBottom: '0.75rem' }}>{s.query}</span>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginTop: '1rem', borderBottom: '1px solid #d1d5db', paddingBottom: '2px' }}>
                View page
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>What we write</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Six copywriting disciplines, one integrated system
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {SERVICES.map((s) => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we work</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              From search data to published copy in 6 steps
            </h2>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', padding: '1.75rem 0', borderBottom: '1px solid #e5e7eb', alignItems: 'start' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#9ca3af', paddingTop: '2px' }}>0{i + 1}</span>
                <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.7 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES CTA ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>In the field</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.2, marginBottom: '1rem' }}>
            SEO copywriting that shipped and ranked — not theory.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
            SmileCenter Dentistry: 213K monthly search impressions and 5x patient inquiry growth, driven by location-specific copy architecture and GEO-optimized content clusters.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/case-studies/smile-center-dentistry" className="btn btn-primary magnetic">Read the case study</a>
            <a href="/case-studies" className="btn btn-ghost magnetic">All case studies</a>
          </div>
        </div>
        <a href="/case-studies/smile-center-dentistry" style={{ display: 'block', overflow: 'hidden', aspectRatio: '16/9' }}>
          <img
            src="/images/smile-center-homepage.webp"
            alt="Smile Center Dentistry — SEO copywriting results"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
          />
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
