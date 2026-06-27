import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya — Local SEO Services Burbank',
      url: 'https://www.gobiya.com/local-seo-services-burbank',
      logo: 'https://www.gobiya.com/images/gobiya---logo.webp',
      foundingDate: '2012',
      description: 'Local SEO services for Burbank businesses — Google Business Profile optimization, NAP citation consistency, review velocity, and local schema. We engineer Map Pack rankings for the 91501–91510 corridor.',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      priceRange: '$$$$',
      areaServed: [
        { '@type': 'City', name: 'Burbank', sameAs: 'https://www.wikidata.org/wiki/Q188539' },
        { '@type': 'City', name: 'Glendale', sameAs: 'https://www.wikidata.org/wiki/Q182749' },
        { '@type': 'City', name: 'Toluca Lake', sameAs: 'https://www.wikidata.org/wiki/Q7818424' },
        { '@type': 'City', name: 'Studio City', sameAs: 'https://www.wikidata.org/wiki/Q2340854' },
        { '@type': 'City', name: 'North Hollywood', sameAs: 'https://www.wikidata.org/wiki/Q1434775' },
        { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3580 Wilshire Blvd, Ste 132',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90010',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 34.0635, longitude: -118.3074 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      ],
      hasMap: 'https://www.google.com/maps/place/3580+Wilshire+Blvd',
      sameAs: [
        'https://www.linkedin.com/in/stevemartingobiya/',
        'https://m.yelp.com/biz/gobiya-los-angeles-5',
        'https://www.facebook.com/people/Gobiya/100064043744190/',
      ],
    },
    {
      '@type': 'Service',
      serviceType: 'Local SEO Services',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      areaServed: { '@type': 'City', name: 'Burbank', sameAs: 'https://www.wikidata.org/wiki/Q188539' },
      description: 'Local SEO services in Burbank: Google Business Profile optimization, NAP citation audit and repair, review velocity systems, LocalBusiness schema, and Map Pack rank tracking.',
      url: 'https://www.gobiya.com/local-seo-services-burbank',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What do local SEO services in Burbank include?',
          acceptedAnswer: { '@type': 'Answer', text: 'Local SEO services in Burbank include Google Business Profile optimization, NAP citation audit and repair across all major directories, review velocity management, LocalBusiness and Service schema markup, location-specific content architecture, and ongoing Map Pack rank tracking. The four signals that determine local rank are GBP authority, NAP consistency, review count and recency, and local schema.' },
        },
        {
          '@type': 'Question',
          name: 'How do I find top rated local SEO services in Burbank?',
          acceptedAnswer: { '@type': 'Answer', text: 'Look for agencies with documented Map Pack ranking outcomes — specific queries and positions, not just "improved visibility." Check client tenure (active relationships over 6–18 months, not one-month projects). Verify BBB accreditation and review depth: reviews that mention specific ranking results are more useful than generic praise. Gobiya is BBB A+ rated and has served the Burbank market since 2012.' },
        },
        {
          '@type': 'Question',
          name: 'Can I book online appointments for local SEO services in Burbank?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Online appointments are available at gobiya.com/book. A pre-read consultation covers your current GBP setup, citation profile, and competitive position in the Burbank market before you commit to anything. For urgent issues — GBP suspension, Map Pack drops — reach us directly at hello@gobiya.com or 323-744-1338.' },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between local SEO services in Burbank vs Los Angeles?',
          acceptedAnswer: { '@type': 'Answer', text: 'Burbank operates as its own sub-market within Greater Los Angeles, with distinct GBP category performance, citation authority patterns, and competitor landscapes shaped by the entertainment, media, and medical industries concentrated in that corridor. Local SEO for Burbank specifically means building for the 91501–91510 ZIP codes and understanding which signals carry weight in this market versus the broader LA metro.' },
        },
      ],
    },
  ],
};

const SPOKES = [
  {
    title: 'Local SEO Company Burbank',
    query: '"local seo company burbank"',
    href: '/local-seo-company-burbank',
    desc: 'Who Gobiya is in the Burbank market — the practice, the track record, and documented local ranking outcomes in the 91501–91510 corridor.',
  },
  {
    title: 'SEO & Discoverability',
    query: '"seo discoverability agency"',
    href: '/performance/seo-discoverability-agency',
    desc: 'The full technical SEO practice behind every local ranking campaign — crawl audit, penalty recovery, and compounding visibility engineering.',
  },
  {
    title: 'Local SEO Services Agency',
    query: '"local seo services agency"',
    href: '/performance/local-seo-services-agency',
    desc: 'GBP optimization, NAP citations, map-pack engineering, and local schema — the national-scope version of the Burbank-specific work on this page.',
  },
  {
    title: 'Technical SEO Audit',
    query: '"technical seo audit agency"',
    href: '/performance/technical-seo-audit-agency',
    desc: 'Crawl health, Core Web Vitals, and structured data — the technical foundation that local ranking depends on, regardless of market.',
  },
];

const STATS = [
  { val: '47', label: 'Commercial keywords ranked via hyper-local SEO for a single client in the greater San Fernando Valley market' },
  { val: '200+', label: 'Qualified leads per month built for a home-services client through local SEO and Google Ads in the greater LA market' },
  { val: '#1–3', label: 'Map Pack positions we engineer for clients in competitive local verticals across the Burbank 91501–91510 corridor' },
];

const SERVICES = [
  { n: '01', title: 'Google Business Profile optimization', body: 'Your GBP is the primary ranking signal for the Map Pack. We optimize every field — categories, service area, hours, attributes — manage photo strategy, build out Q&A, and maintain the posting cadence that keeps the profile active in Google\'s eyes.' },
  { n: '02', title: 'NAP citation audit & repair', body: 'Name, Address, Phone — any mismatch across directories erodes Google\'s confidence in your entity. We audit your citations on Google, Yelp, Bing Places, Apple Maps, and 30+ vertical directories, then correct every inconsistency.' },
  { n: '03', title: 'Review velocity management', body: 'Review count and recency are direct Map Pack ranking signals. We build a repeatable review acquisition workflow that gets satisfied clients to leave Google reviews — systematically and in compliance with Google\'s policies.' },
  { n: '04', title: 'LocalBusiness schema markup', body: 'Schema markup tells Google exactly what your business is, where it operates, and what services it provides — in a format crawlers can process without ambiguity. We implement this directly in the code, not through a plugin.' },
  { n: '05', title: 'Location page architecture', body: 'For businesses serving multiple Burbank neighborhoods or surrounding San Fernando Valley cities, we build location-specific pages with correct entity structure, local content depth, and internal link equity routing.' },
  { n: '06', title: 'Competitor gap analysis', body: 'We read the Map Pack for your target queries and document exactly which signals the ranking businesses have that you don\'t — GBP completeness, citation count, review velocity, schema — then close those gaps in order of impact.' },
];

const STEPS = [
  'Map Pack audit — we pull your current rankings for target queries in the Burbank 91501–91510 market and compare your GBP against the businesses that outrank you',
  'GBP diagnostic — every field, category, photo, Q&A entry, and posting history reviewed against the current optimization standard for your vertical',
  'Citation audit — existing NAP data checked across all major directories; every mismatch documented before any correction is made',
  'On-site local signals — LocalBusiness schema, location page content, and internal link architecture implemented or corrected',
  'Review acquisition workflow — a repeatable process for requesting reviews from satisfied clients, calibrated to your business type and customer relationship',
  'Monthly rank reporting — Map Pack position tracking for all target queries in the Burbank market, with plain-language explanations of what moved and why',
];

export default function LocalSeoServicesBurbankPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: '13rem 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/performance" style={{ color: '#9ca3af', textDecoration: 'none' }}>Performance</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>Local SEO Services Burbank</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          Local SEO Services Burbank
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '680px', marginBottom: '2.5rem' }}>
          Local SEO services in Burbank get your business into Google's Map Pack — the three listings that capture the overwhelming majority of local search clicks — and keep you there. Burbank is one of the most commercially dense markets in the San Fernando Valley, and the businesses at the top of local results got there by engineering the right signals, not by accident. We optimize Google Business Profile authority, NAP citation consistency, review velocity, and local schema for businesses in the 91501–91510 corridor. Gobiya has worked in this market since 2012. Our <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)', textDecoration: 'none' }}>SEO &amp; Discoverability practice</a> runs the technical foundation behind every local campaign.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Book a local SEO consultation
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="/local-seo-company-burbank" className="btn btn-ghost magnetic">About our Burbank practice</a>
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

      {/* ── CLUSTER MAP ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Query fan-out cluster</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', maxWidth: '600px' }}>
            How we cover the full local SEO services Burbank search landscape
          </h2>
        </div>

        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>Local SEO Services Burbank</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"local seo services burbank"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /local-seo-services-burbank
          </span>
        </div>

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

      {/* ── WHAT LOCAL SEO SERVICES INCLUDE ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>What's included</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            What local SEO services in Burbank actually include
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Local SEO services in Burbank cover the four technical signals Google uses to determine Map Pack rankings: <a href="https://support.google.com/business/answer/3038177" style={{ color: 'var(--green)' }} target="_blank" rel="noopener noreferrer">Google Business Profile</a> authority, NAP citation consistency across directories, review velocity and recency, and local schema markup. If any one of these breaks down, the others can't compensate.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Burbank's commercial geography makes local SEO more competitive than most people expect. The corridor from downtown Burbank through Toluca Lake handles a concentrated mix of entertainment-adjacent businesses, medical and dental practices, home services, and professional services — all competing for the same Map Pack real estate. Many of them have unclaimed or under-optimized GBP profiles, NAP data that disagrees across Google, Yelp, Bing Places, and Apple Maps, and review counts that haven't grown in 18 months or more.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '2rem' }}>
            None of these are hard to fix once identified. The issue is that most businesses — and many agencies — don't run a methodical audit before touching anything. We do a full signal read before making any changes, which is why our <a href="/performance/technical-seo-audit-agency" style={{ color: 'var(--green)' }}>technical SEO audit</a> is the entry point for every local campaign.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px', maxWidth: '100%' }}>
          {SERVICES.map(s => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP RATED / REVIEWS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Trust & credentials</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Top rated local SEO services Burbank — what reviews actually tell you
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            When searching for "top rated local SEO services Burbank," you'll find a mix of directories, agency self-promotions, and review aggregators. Reviews matter — but the useful signals are buried under a lot of noise. A five-star review that says "great communication" doesn't tell you whether the agency actually moved a ranking. Reviews that mention specific query types, Map Pack positions, or lead volume changes are the ones worth reading.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Beyond reviews, the indicators worth checking are: client tenure (18-month relationships signal results; one-month project lists signal churn), vertical experience (local SEO for a dental practice is different from local SEO for a home services contractor — ask which they've actually done), and whether the agency can show you the Map Pack before and after, not just a traffic chart.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', margin: '2rem 0' }}>
            {[
              { label: 'BBB accreditation', val: 'A+ rated', desc: 'Better Business Bureau A+ rating — independent verification of business conduct and accountability.' },
              { label: 'Years in Burbank market', val: 'Since 2012', desc: 'Over a decade of active client work in the Burbank and San Fernando Valley local search environment.' },
              { label: 'Vertical experience', val: 'Medical, home services, professional', desc: 'Documented local SEO outcomes across dental, remodeling, and B2B professional services in this market.' },
            ].map((c, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', padding: '1.75rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>{c.label}</span>
                <strong style={{ fontSize: '1.1rem', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>{c.val}</strong>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75 }}>
            We don't rank on "best Burbank SEO agency" lists — those lists are pay-to-play. Documented outcomes are in our <a href="/case-studies" style={{ color: 'var(--green)' }}>case studies</a>, and the specifics of what we'd do for your market are in a pre-read consultation, not a sales deck.
          </p>
        </div>
      </section>

      {/* ── OPEN NOW / ONLINE APPOINTMENTS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Available now</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Local SEO services Burbank, open now — book an online appointment today
            </h2>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
              If you found this page because you need local SEO help now — a GBP suspension, a Map Pack drop after a Google update, a new business launching in Burbank and needing local visibility from day one — the fastest path forward is a pre-read consultation.
            </p>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Online appointments are available through our booking page. A pre-read is a 30–45 minute session where we audit your current GBP, citation profile, and competitive position in the Burbank market before you commit to anything. You'll know exactly what's causing the problem and what we'd fix.
            </p>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '2rem' }}>
              For urgent GBP suspensions or sudden Map Pack disappearances, reach us directly. Those situations need a same-day read, not a scheduled consultation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="/book" className="btn btn-primary magnetic" style={{ alignSelf: 'flex-start' }}>
                Book online — local SEO consultation
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Or contact directly: <a href="mailto:hello@gobiya.com" style={{ color: 'var(--green)' }}>hello@gobiya.com</a> · <a href="tel:3237441338" style={{ color: 'var(--green)' }}>323-744-1338</a></span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'Phone', val: '323-744-1338', href: 'tel:3237441338' },
              { label: 'Email', val: 'hello@gobiya.com', href: 'mailto:hello@gobiya.com' },
              { label: 'Online booking', val: 'gobiya.com/book', href: '/book' },
              { label: 'Hours', val: 'Mon–Fri, 9am–6pm PT', href: null },
              { label: 'Service area', val: 'Burbank 91501–91510 + greater LA', href: null },
              { label: 'Office', val: '3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010', href: null },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '1.25rem 0', borderBottom: '1px solid #e5e7eb', gap: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', flexShrink: 0 }}>{r.label}</span>
                {r.href ? (
                  <a href={r.href} style={{ fontSize: '0.95rem', color: '#111827', fontWeight: 500, textDecoration: 'none', textAlign: 'right' }}>{r.val}</a>
                ) : (
                  <span style={{ fontSize: '0.95rem', color: '#374151', textAlign: 'right' }}>{r.val}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BURBANK VS LOS ANGELES ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Market context</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Local SEO services in Los Angeles vs Burbank — why the market is different
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Burbank operates as its own sub-market within Greater Los Angeles, with distinct search patterns shaped by industry concentration. Warner Bros., Disney, NBC, and Nickelodeon all have Burbank campuses. That means the B2B and consumer search landscape around Burbank differs significantly from, say, the Westside or downtown LA. Medical and dental practices in Burbank compete not just with Burbank providers but with Glendale, Pasadena, and North Hollywood for the same patient searches.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Searching "local seo services in Los Angeles" will return agencies that technically serve Burbank but may have never run a campaign for a business operating in the 91501–91510 ZIP codes. The GBP category performance, citation source weighting, and competitor landscape in Burbank are specific enough that broad LA expertise doesn't automatically translate.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', border: '1px solid #e5e7eb', background: '#e5e7eb', margin: '2rem 0' }}>
            {[
              { market: 'Los Angeles (broad)', points: ['High competition across all verticals', 'Generic local SEO tactics still get results in some niches', 'Agency supply is dense — harder to evaluate', 'Broad LA queries ("dentist Los Angeles") are extremely competitive'] },
              { market: 'Burbank (specific)', points: ['Entertainment-adjacent B2B market with distinct signals', 'Neighborhood-level queries ("dentist near Warner Center") are winnable with correct GBP signals', 'Local SEO expertise is rarer — specialist advantage is real', 'ZIP-code targeting in GBP service area matters significantly'] },
            ].map((m, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '2rem' }}>
                <strong style={{ fontSize: '0.75rem', color: '#111827', display: 'block', marginBottom: '1rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.market}</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {m.points.map((p, j) => (
                    <li key={j} style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65, paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#9ca3af' }}>—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75 }}>
            Our <a href="/on-page-seo-los-angeles" style={{ color: 'var(--green)' }}>on-page SEO work in Los Angeles</a> covers the broader metro. For Burbank specifically, we bring the same technical depth plus 12+ years of active client work in the San Fernando Valley market. See the <a href="/local-seo-company-burbank" style={{ color: 'var(--green)' }}>Burbank practice profile</a> for market-specific detail.
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we run a local SEO campaign</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              Map Pack audit to ranking in 6 stages
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.7, marginTop: '1rem' }}>
              Every stage is sequenced to close the highest-impact gaps first. Local SEO compounds — GBP + citations + reviews + schema working together produces faster results than any one signal alone.
            </p>
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

      {/* ── CASE STUDY CTA ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>In the field</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.2, marginBottom: '1rem' }}>
            200+ qualified leads a month — built on local SEO and local intent.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '1rem' }}>
            A home-services remodeling client in the greater LA market went from inconsistent inbound to 200+ qualified leads per month. The foundation was hyper-local SEO: 47 commercial keywords ranked, Map Pack positions held across multiple core update cycles, and a <a href="/performance/native-crm-agency" style={{ color: 'var(--green)' }}>native CRM integration</a> that tracked every lead from first search to booked job.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
            The same methodology applies to Burbank-specific campaigns — the market is different, the signals are the same.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/case-studies" className="btn btn-primary magnetic">See case studies</a>
            <a href="/book" className="btn btn-ghost magnetic">Start a campaign</a>
          </div>
        </div>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { label: 'Qualified leads per month', val: '200+' },
            { label: 'Commercial keywords ranked', val: '47' },
            { label: 'Market', val: 'Greater Los Angeles, home services' },
            { label: 'Rankings held across core updates', val: 'Yes' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none', paddingBottom: i < 3 ? '1.5rem' : 0 }}>
              <span style={{ fontSize: '0.82rem', color: '#6b7280', fontFamily: 'monospace' }}>{r.label}</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>{r.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Common questions</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Local SEO services Burbank — answered directly
          </h2>
        </div>
        <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '860px' }}>
          {[
            { q: 'What do local SEO services in Burbank include?', a: 'Local SEO services in Burbank cover the four signals Google uses to rank a business in the Map Pack: Google Business Profile optimization (categories, hours, photos, Q&A, posting), NAP citation consistency across all major directories, review velocity management, and LocalBusiness and Service schema markup. For businesses with multiple locations, we also build out location-specific page architecture. The work is sequenced by impact — GBP and citations first, since those move the fastest.' },
            { q: 'How do I find top rated local SEO services in Burbank?', a: 'Look for documented Map Pack ranking outcomes — specific queries and positions, not just "improved visibility." Check client tenure: agencies with sustained 6–18 month relationships are producing results; long lists of short-term projects signal churn. Verify BBB accreditation and look for vertical-specific experience in the Burbank market. Generic 5-star reviews that mention only communication are not useful evidence.' },
            { q: 'Can I book online appointments for local SEO services in Burbank?', a: 'Yes. Online appointments are available at gobiya.com/book. A pre-read consultation covers your current GBP setup, citation profile, and competitive position in the Burbank market — before you commit to anything. For urgent situations (GBP suspension, sudden Map Pack drop), reach us directly at hello@gobiya.com or 323-744-1338 for a same-day read.' },
            { q: 'What is the difference between local SEO services in Burbank vs Los Angeles?', a: 'Burbank operates as a distinct sub-market within Greater Los Angeles. The entertainment and media industry concentration (Warner Bros., Disney, NBC, Nickelodeon) shapes the B2B search landscape differently than other LA markets. GBP category performance, citation source weighting, and competitive density are specific to the 91501–91510 corridor. Broad LA SEO experience doesn\'t automatically translate to Burbank-specific results.' },
          ].map((f, i) => (
            <div key={i} style={{ padding: '2rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{f.q}</h3>
              <p style={{ fontSize: '0.92rem', color: '#6b7280', lineHeight: 1.8 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '5rem 5vw', background: '#111827' }}>
        <div style={{ maxWidth: '680px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '1rem' }}>Start here</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Tell us your Burbank market and target queries. We'll show you what's blocking you.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem' }}>
            A pre-read is how every engagement starts. We audit your GBP, citation profile, and Map Pack competitive position in Burbank — and tell you what we'd fix before you commit. See the <a href="/performance/seo-discoverability-agency" style={{ color: 'rgba(255,255,255,0.8)' }}>SEO &amp; Discoverability practice</a> for the technical scope, or <a href="/local-seo-company-burbank" style={{ color: 'rgba(255,255,255,0.8)' }}>the Burbank practice profile</a> for market context.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/book" className="btn btn-primary magnetic">
              Book a local SEO pre-read
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="tel:3237441338" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Or call 323-744-1338 →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
