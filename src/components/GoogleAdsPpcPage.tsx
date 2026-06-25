import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const SPOKES = [
  {
    title: 'Google Search Ads',
    query: '"google search ads agency"',
    href: '/relations/google-search-ads-agency',
    desc: 'Keyword-level search campaign management — intent mapping, bid strategy, ad copy, and landing page alignment for maximum conversion yield.',
  },
  {
    title: 'Google Shopping Ads',
    query: '"google shopping ads agency"',
    href: '/relations/google-shopping-ads-agency',
    desc: 'Product listing ad management for e-commerce — feed optimization, bidding structure, and product page alignment to drive qualified purchase intent.',
  },
  {
    title: 'Remarketing & Display',
    query: '"remarketing display ads agency"',
    href: '/relations/remarketing-display-ads-agency',
    desc: 'Audience-based retargeting and Google Display Network campaigns that recapture high-intent visitors and compress the consideration window.',
  },
  {
    title: 'YouTube Advertising',
    query: '"youtube advertising agency"',
    href: '/relations/youtube-advertising-agency',
    desc: 'Video ad campaign management across YouTube — in-stream, discovery, and bumper formats engineered for awareness, consideration, and direct response.',
  },
];

const SERVICES = [
  { n: '01', title: 'Campaign architecture & structure', body: 'Account and campaign structure built around intent layers — not keyword dumps. Every ad group maps to a specific searcher intent and a matching landing experience.' },
  { n: '02', title: 'Keyword research & negative management', body: 'Thorough keyword mapping across match types, with continuous negative keyword expansion to eliminate wasted spend on irrelevant queries from day one.' },
  { n: '03', title: 'Ad copy & creative testing', body: 'Headline and description variants tested systematically across each campaign. Copy decisions are made from conversion data, not preference.' },
  { n: '04', title: 'Landing page alignment', body: 'Message-match between ad copy and landing page is the single largest driver of Quality Score and conversion rate. We audit and align both before any budget goes live.' },
  { n: '05', title: 'Bid strategy & budget allocation', body: 'Smart bidding configurations — Target CPA, Target ROAS, or manual — selected and tuned for your specific funnel velocity and revenue goals.' },
  { n: '06', title: 'Ongoing optimization & attribution', body: 'Weekly bid reviews, search term analysis, creative rotation, and attribution model calibration. The campaign improves every week, not just at launch.' },
];

const STEPS = [
  'Account audit — wasted spend, Quality Score gaps, conversion tracking gaps, and landing page mismatches identified before any new budget runs',
  'Intent mapping — buyer journey stages modeled and matched to campaign types, match types, and keyword clusters',
  'Campaign build — structure, ad copy variants, negative keyword lists, and bid strategies configured to spec',
  'Landing page alignment — message-match between ad creative and destination page confirmed before launch',
  'Conversion tracking — Google Ads + GA4 attribution verified across all goal types before spend goes live',
  'Optimization cadence — weekly search term reviews, creative rotation, bid adjustments, and monthly performance reporting',
];

const STATS = [
  { val: '3.5×', label: 'Average ROAS lift when campaigns are rebuilt around intent architecture' },
  { val: '47%', label: 'Typical wasted spend found in Google Ads accounts we audit on day one' },
  { val: '6 wks', label: 'Median time to stable, optimized performance after a full account rebuild' },
];

export default function GoogleAdsPpcPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: '13rem 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/relations" style={{ color: '#9ca3af', textDecoration: 'none' }}>Relations</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>Google Ads &amp; PPC Strategy</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          Google Ads &amp; PPC Strategy built around acquisition cost, not click volume.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
          Search, Shopping, Display, and YouTube campaigns — structured around intent architecture, landing page alignment, and conversion attribution from the first dollar of spend.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Audit your Google Ads &amp; PPC
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="/relations" className="btn btn-ghost magnetic">All relations services</a>
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
            How we cover the full Google Ads &amp; PPC search landscape
          </h2>
        </div>

        {/* Hub card */}
        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>Google Ads &amp; PPC Strategy</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"google ads ppc strategy agency"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /relations/google-ads-ppc-strategy-agency
          </span>
        </div>

        {/* Spoke cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #e5e7eb', borderTop: 'none' }}>
          {SPOKES.map((s, i) => (
            <a
              key={i}
              href={s.href}
              style={{ display: 'block', padding: '1.5rem', borderRight: i < 3 ? '1px solid #e5e7eb' : 'none', textDecoration: 'none', transition: 'background 0.2s' }}
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
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>What we manage</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Six paid acquisition disciplines, one compounding system
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
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we launch</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              From account audit to optimized spend in 6 stages
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
            Paid acquisition that shipped and converted — not theory.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
            American Livescan: a full Google Ads restructure that compressed cost-per-acquisition while growing lead volume — driven by intent-based campaign architecture and landing page alignment, not just higher bids.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/case-studies/american-livescan" className="btn btn-primary magnetic">Read the case study</a>
            <a href="/case-studies" className="btn btn-ghost magnetic">All case studies</a>
          </div>
        </div>
        <a href="/case-studies/american-livescan" style={{ display: 'block', overflow: 'hidden', aspectRatio: '16/9' }}>
          <img
            src="/images/american-livescan-homepage.webp"
            alt="American Livescan — Google Ads results"
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
