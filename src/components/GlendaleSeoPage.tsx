import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya — Glendale SEO',
      url: 'https://www.gobiya.com/glendale-seo',
      logo: 'https://www.gobiya.com/images/gobiya---logo.webp',
      foundingDate: '2012',
      description: 'Glendale SEO agency — technical SEO, local Map Pack optimization, content architecture, and authority building for businesses in the Glendale 91201–91210 market.',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      priceRange: '$$$$',
      areaServed: [
        { '@type': 'City', name: 'Glendale', sameAs: 'https://www.wikidata.org/wiki/Q182749' },
        { '@type': 'City', name: 'Burbank', sameAs: 'https://www.wikidata.org/wiki/Q188539' },
        { '@type': 'City', name: 'Pasadena', sameAs: 'https://www.wikidata.org/wiki/Q485651' },
        { '@type': 'City', name: 'La Crescenta', sameAs: 'https://www.wikidata.org/wiki/Q6461578' },
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
      geo: { '@type': 'GeoCoordinates', latitude: 34.1425, longitude: -118.2551 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      ],
      sameAs: [
        'https://www.linkedin.com/in/stevemartingobiya/',
        'https://m.yelp.com/biz/gobiya-los-angeles-5',
        'https://www.facebook.com/people/Gobiya/100064043744190/',
      ],
    },
    {
      '@type': 'Service',
      serviceType: 'SEO Services',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      areaServed: { '@type': 'City', name: 'Glendale', sameAs: 'https://www.wikidata.org/wiki/Q182749' },
      description: 'Glendale SEO services: technical SEO, local Map Pack optimization, on-page entity architecture, authority building, and AI search visibility for businesses in the 91201–91210 market.',
      url: 'https://www.gobiya.com/glendale-seo',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does Glendale SEO include?',
          acceptedAnswer: { '@type': 'Answer', text: 'Glendale SEO covers technical SEO (crawl health, Core Web Vitals, structured data), local SEO (Google Business Profile, Map Pack, NAP citations), on-page optimization (entity architecture, schema, content structure), and authority building (editorial backlinks, citations). For Glendale businesses, local signals are particularly important because competition on Brand Boulevard and in the 91201–91210 corridor is dense — correct GBP setup and NAP consistency are often what separates Map Pack positions.' },
        },
        {
          '@type': 'Question',
          name: 'Who are the top rated Glendale SEO providers and what do reviews tell you?',
          acceptedAnswer: { '@type': 'Answer', text: 'Top rated Glendale SEO reviews should mention specific ranking outcomes: which queries moved, what position was achieved, and whether results held across Google algorithm updates. Generic reviews praising communication or responsiveness don\'t tell you whether the SEO actually worked. Look for documented client outcomes — organic traffic growth percentages, Map Pack positions, lead volume — and agency tenure in the Glendale market specifically. Gobiya is BBB A+ rated and has served Glendale-area clients since 2012.' },
        },
        {
          '@type': 'Question',
          name: 'Can I book an online appointment for Glendale SEO?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Online appointments are available at gobiya.com/book. A pre-read consultation covers your current SEO position in the Glendale market — organic rankings, GBP setup, technical health, competitive gaps — before you commit to anything. For urgent issues (sudden traffic drop, GBP suspension), contact us directly at hello@gobiya.com or 323-744-1338.' },
        },
        {
          '@type': 'Question',
          name: 'What is SEO services Glendale and how does it differ from broader LA SEO?',
          acceptedAnswer: { '@type': 'Answer', text: 'SEO services in Glendale addresses a specific competitive landscape shaped by the Americana at Brand retail corridor, high-density professional and medical verticals, and a commercially active Armenian business community. Queries like "dentist in Glendale" or "contractors Glendale CA" have distinct Map Pack dynamics compared to the same searches run in, say, West LA or the Valley. Glendale-specific SEO means knowing which GBP signals perform in this sub-market, which citation sources carry weight, and which content topics have local search demand.' },
        },
      ],
    },
  ],
};

const SPOKES = [
  {
    title: 'Local SEO Glendale',
    query: '"local seo glendale"',
    href: '/local-seo-glendale',
    desc: 'Map Pack engineering, GBP optimization, and citation consistency for businesses on Brand Boulevard and throughout the Glendale 91201–91210 market.',
  },
  {
    title: 'SEO & Discoverability',
    query: '"seo discoverability agency"',
    href: '/performance/seo-discoverability-agency',
    desc: 'The full technical SEO practice behind every Glendale campaign — crawl audit, penalty recovery, entity architecture, and rank monitoring.',
  },
  {
    title: 'Authority Building',
    query: '"authority building agency"',
    href: '/relations/authority-building-agency',
    desc: 'Editorial backlinks, structured citations, and entity alignment — the off-site signals that establish topical authority in competitive Glendale verticals.',
  },
  {
    title: 'Technical SEO Audit',
    query: '"technical seo audit agency"',
    href: '/performance/technical-seo-audit-agency',
    desc: 'Full crawl health diagnostic, Core Web Vitals, and structured data — the technical baseline every Glendale ranking campaign starts from.',
  },
];

const STATS = [
  { val: '+45%', label: 'Organic traffic growth delivered for a home-services client in the greater Los Angeles market through technical SEO and content architecture' },
  { val: '200+', label: 'Qualified leads per month built for a remodeling client through local SEO and Google Ads across the greater LA market' },
  { val: '2012', label: 'Year Gobiya began serving Glendale-area clients — over a decade of active SEO work in the 91201–91210 corridor' },
];

const SERVICES = [
  { n: '01', title: 'Technical SEO', body: 'Crawl health, index coverage, Core Web Vitals, structured data, and URL architecture — the foundation every ranking depends on. Glendale\'s competitive verticals don\'t tolerate technical gaps: a crawl error or slow load on a key landing page costs real Map Pack positions.' },
  { n: '02', title: 'Local SEO & Map Pack', body: 'Google Business Profile optimization, NAP citation consistency across directories, review velocity management, and LocalBusiness schema. The three Map Pack positions for most Glendale commercial queries account for the majority of local search clicks.' },
  { n: '03', title: 'On-page optimization', body: 'Title tags, heading hierarchy, semantic content clustering, entity schema, and internal link architecture — the page-level signals that determine whether Google associates your site with the queries you\'re targeting in the Glendale market.' },
  { n: '04', title: 'Authority & link building', body: 'Editorial backlinks from relevant publications, structured local citations, and entity alignment — the off-site signals that reinforce topical authority in competitive Glendale verticals like medical, legal, and home services.' },
  { n: '05', title: 'Content architecture', body: 'Keyword and intent mapping for the Glendale market, topic cluster design, and GEO-optimized content structure so your brand is cited in AI-generated answers — not just ranked in the ten blue links.' },
  { n: '06', title: 'Recovery & monitoring', body: 'If rankings dropped after a Google update, we run the forensic read before making any changes. Weekly Search Console diagnostics and rank tracking for your Glendale target queries, with plain explanations of what moved and why.' },
];

const STEPS = [
  'Market audit — we pull your current rankings for target queries in the Glendale 91201–91210 market and identify every technical, local, and content gap versus competing sites',
  'GBP diagnostic — categories, hours, photos, Q&A, and posting history reviewed; citation profile audited across all major directories',
  'Technical baseline — crawl errors, index coverage, Core Web Vitals, and structured data reviewed; a prioritized fix list built before any changes are made',
  'On-page corrections — title tags, schema, heading structure, and internal link architecture updated to match target query intent',
  'Authority repair or build — editorial link acquisition and citation correction sequenced by impact for your vertical in the Glendale market',
  'Monthly reporting — rank tracking across target queries, plain-language explanation of movements, and next-cycle priorities updated every month',
];

export default function GlendaleSeoPage() {
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
          <span style={{ color: '#374151' }}>Glendale SEO</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          Glendale SEO
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '680px', marginBottom: '2.5rem' }}>
          Glendale SEO is the work of engineering your business to rank on Google — in organic listings, local Map Pack results, and AI-generated answers — for the queries your buyers in the 91201–91210 market actually type. Glendale is one of Los Angeles County's most commercially contested markets: Brand Boulevard and the Americana corridor drive thousands of high-intent searches every day, and the businesses at the top of those results built their position deliberately. We run technical SEO, local optimization, content architecture, and authority building as a compounding system. Our <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)', textDecoration: 'none' }}>SEO &amp; Discoverability practice</a> anchors every Glendale campaign.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Book a Glendale SEO consultation
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="/local-seo-glendale" className="btn btn-ghost magnetic">Local SEO Glendale</a>
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
            How we cover the full Glendale SEO search landscape
          </h2>
        </div>

        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>Glendale SEO</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"glendale seo"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /glendale-seo
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

      {/* ── WHAT GLENDALE SEO INCLUDES ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ maxWidth: '860px', marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>What's included</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            What Glendale SEO includes — and why this market is different
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Glendale sits at the intersection of three competitive search dynamics. First, it's a dense local market — the Americana at Brand corridor, Glendale Galleria, and the professional office clusters along Brand Boulevard mean local search competition is genuinely intense for medical, dental, legal, and home service categories. Second, it's adjacent to Burbank, Pasadena, and North Hollywood, so businesses here often need to rank in multiple overlapping geographic search pools. Third, the Glendale business community is unusually diverse — a large Armenian professional services sector, significant Korean and Latino business representation — which creates multilingual SEO opportunities most agencies don't pursue.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            SEO services for Glendale need to account for all three. A technical-only approach ignores the local signals. A local-only approach ignores the organic intent that drives the high-value B2B and professional services queries. We run both — the technical foundation through a <a href="/performance/technical-seo-audit-agency" style={{ color: 'var(--green)' }}>technical SEO audit</a>, the local signals through <a href="/local-seo-glendale" style={{ color: 'var(--green)' }}>Glendale local SEO</a>, and content and authority work through the full <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)' }}>SEO &amp; Discoverability practice</a>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {SERVICES.map(s => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP RATED / REVIEWS / CLIENTS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Credentials & clients</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Top rated Glendale SEO — what reviews and client results actually tell you
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Searching "top rated Glendale SEO" surfaces a lot of agency self-promotion and aggregator pages. Reviews are worth reading but require a filter: a five-star review that mentions "great results" without specifying which queries moved, how far, or whether rankings held is not useful evidence. The reviews that matter mention specific ranking changes, organic traffic percentages, or lead volume shifts tied directly to the SEO work.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            When evaluating Glendale SEO clients and case studies, look for: vertical match (has the agency ranked businesses in your category in Glendale specifically?), tenure (client relationships longer than 12 months indicate results; short-term project lists indicate churn), and update resilience (did rankings hold through Google's 2023–2024 core update cycle, not just spike once and drop?).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', border: '1px solid #e5e7eb', background: '#e5e7eb', marginBottom: '2rem' }}>
            {[
              {
                label: 'What a useful Glendale SEO review mentions',
                points: [
                  'Specific queries that moved and by how many positions',
                  'Organic traffic percentage change over a defined period',
                  'Lead or revenue outcome tied to the ranking work',
                  'Whether results held through a Google core update',
                  'How long the client has been active with the agency',
                ],
              },
              {
                label: 'What a less useful review looks like',
                points: [
                  'Generic praise for communication or responsiveness',
                  'Traffic charts without query or revenue context',
                  'Single-month result reported without follow-up',
                  '"Best agency in Glendale" without supporting data',
                  'Posted by a client who worked with the agency for under 60 days',
                ],
              },
            ].map((col, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '2rem' }}>
                <strong style={{ fontSize: '0.75rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', display: 'block', marginBottom: '1rem' }}>{col.label}</strong>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {col.points.map((p, j) => (
                    <li key={j} style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65, paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#9ca3af' }}>—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { label: 'BBB accreditation', val: 'A+ rated', desc: 'Better Business Bureau A+ rating — independent verification of conduct and accountability.' },
              { label: 'Glendale market tenure', val: 'Since 2012', desc: 'Over a decade of active client work in the Glendale and greater LA market, through every major Google algorithm update.' },
              { label: 'Client verticals served', val: 'Medical, dental, home services, B2B', desc: 'Active SEO clients across the verticals that dominate Glendale commercial search.' },
            ].map((c, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', padding: '1.75rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>{c.label}</span>
                <strong style={{ fontSize: '1.1rem', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>{c.val}</strong>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN NOW / ONLINE APPOINTMENTS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Available now</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Glendale SEO open now — book an online appointment today
            </h2>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
              If you're searching for Glendale SEO right now — a sudden rankings drop, a Google update that hit your traffic, a new Glendale business that needs search visibility from day one, or a GBP that disappeared from the Map Pack — the fastest way forward is a pre-read.
            </p>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              A pre-read is a 30–45 minute consultation where we audit your current position in the Glendale market — organic rankings, GBP setup, technical health, competitive gaps — and tell you what we'd fix before you commit to anything. Online appointments are available through our booking page.
            </p>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '2rem' }}>
              For urgent situations — a GBP suspension in a peak season, a traffic drop the day before a campaign launch — call or email directly. Those need a same-day read, not a scheduled slot.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="/book" className="btn btn-primary magnetic" style={{ alignSelf: 'flex-start' }}>
                Book online — Glendale SEO consultation
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Or contact directly: <a href="mailto:hello@gobiya.com" style={{ color: 'var(--green)' }}>hello@gobiya.com</a> · <a href="tel:3237441338" style={{ color: 'var(--green)' }}>323-744-1338</a></span>
            </div>
          </div>

          <div>
            {[
              { label: 'Phone', val: '323-744-1338', href: 'tel:3237441338' },
              { label: 'Email', val: 'hello@gobiya.com', href: 'mailto:hello@gobiya.com' },
              { label: 'Online booking', val: 'gobiya.com/book', href: '/book' },
              { label: 'Hours', val: 'Mon–Fri, 9am–6pm PT', href: null },
              { label: 'Service area', val: 'Glendale 91201–91210 + greater LA', href: null },
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

      {/* ── SEO SERVICES GLENDALE — LONGTAIL SECTION ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Market depth</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            SEO services Glendale — what the Americana corridor market actually demands
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            The phrase "seo services glendale" describes a wide range of intent — from a dental practice that wants to rank for "dentist Glendale" to a contractor trying to appear in map results for emergency plumbing calls, to a B2B professional services firm that needs to rank for commercial-intent queries among the financial and legal businesses concentrated in the Brand Boulevard office corridor.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Each of those requires a different approach. Map Pack optimization for the dental practice is about GBP signals and review velocity. The contractor needs a fast, technically clean site and consistent NAP data. The B2B firm needs content that matches procurement-stage search intent and authority signals that establish topical credibility.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid #e5e7eb', background: '#e5e7eb', margin: '2rem 0' }}>
            {[
              { vertical: 'Medical & dental', signal: 'Map Pack + GBP + review velocity', detail: 'Patients search locally, compare reviews, and click the top three map results. GBP completeness and review recency determine rank.' },
              { vertical: 'Home services & contractors', signal: 'Local SEO + fast load + NAP', detail: 'Emergency-intent queries (plumber near me, roofer Glendale) go to the Map Pack. Speed and citation consistency are the deciding factors.' },
              { vertical: 'Professional services & B2B', signal: 'Content architecture + authority', detail: 'Decision-makers search by service category. Rankings depend on content that matches procurement intent and authority signals from relevant publications.' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '2rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>{v.vertical}</strong>
                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--green)', display: 'block', marginBottom: '0.75rem', letterSpacing: '0.06em' }}>{v.signal}</span>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65 }}>{v.detail}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75 }}>
            We've worked across all three verticals in the greater Glendale market since 2012. See our <a href="/case-studies" style={{ color: 'var(--green)' }}>case studies</a> for documented outcomes, or the <a href="/performance/b2b-seo-agency" style={{ color: 'var(--green)' }}>B2B SEO practice</a> for the enterprise side of what we do in LA-area markets.
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we run a Glendale SEO campaign</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              Market audit to compounding rankings in 6 stages
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.7, marginTop: '1rem' }}>
              Every stage feeds the next. Technical fixes don't produce results without local signals. Local signals don't compound without authority. All six run in sequence, not parallel.
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
            +45% organic growth, 200+ leads a month — built the same way we'd build yours.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '1rem' }}>
            A home services client in the greater Los Angeles market grew organic traffic 45% through technical SEO and content architecture. A remodeling contractor went from inconsistent inbound to 200+ qualified leads per month through hyper-local SEO, Google Ads, and a <a href="/performance/native-crm-agency" style={{ color: 'var(--green)' }}>native CRM integration</a> that tracked every lead from first search to booked job.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
            Both engagements used the same methodology we bring to Glendale: forensic read first, targeted build second, monthly reporting against real pipeline metrics.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/case-studies" className="btn btn-primary magnetic">See case studies</a>
            <a href="/book" className="btn btn-ghost magnetic">Start a campaign</a>
          </div>
        </div>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { label: 'Organic traffic growth', val: '+45%' },
            { label: 'Qualified leads per month', val: '200+' },
            { label: 'Commercial keywords ranked', val: '47' },
            { label: 'Rankings held through core updates', val: 'Yes' },
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
            Glendale SEO — answered directly
          </h2>
        </div>
        <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '860px' }}>
          {[
            { q: 'What does Glendale SEO include?', a: 'Glendale SEO covers technical SEO (crawl health, Core Web Vitals, structured data), local SEO (Google Business Profile, Map Pack, NAP citations), on-page optimization (entity architecture, schema, content structure), and authority building (editorial backlinks, citations). For Glendale businesses, local signals matter most in medical, dental, and home services categories — where Map Pack positions capture the majority of clicks. B2B and professional services require content architecture and authority signals tuned to procurement-stage search intent.' },
            { q: 'Who are the top rated Glendale SEO providers and what do reviews tell you?', a: 'Top rated Glendale SEO reviews should mention specific outcomes: which queries moved, what position was achieved, and whether results held across Google algorithm updates. Generic five-star reviews praising communication or responsiveness don\'t tell you whether the SEO worked. Look for client tenure (relationships over 12 months signal results), vertical match (experience in your category in Glendale specifically), and update resilience (rankings that held through Google\'s 2023–2024 core update cycle). Gobiya is BBB A+ rated and has served Glendale-area businesses since 2012.' },
            { q: 'Can I book an online appointment for Glendale SEO?', a: 'Yes — online appointments are available at gobiya.com/book. A pre-read covers your current SEO position in Glendale: organic rankings, GBP setup, technical health, and competitive gaps. You leave knowing exactly what\'s blocking you and what we\'d fix, before committing. For urgent issues — GBP suspension, sudden traffic drop — contact us directly at hello@gobiya.com or 323-744-1338 for a same-day read.' },
            { q: 'What is SEO services Glendale and how does it differ from broader LA SEO?', a: 'SEO services in Glendale addresses a distinct competitive landscape shaped by the Americana at Brand and Brand Boulevard commercial corridors, dense medical and professional services verticals, and a diverse business community with multilingual search demand. GBP category performance, citation source weighting, and competitor profiles in Glendale are specific enough that broad LA SEO expertise doesn\'t automatically transfer. Local knowledge of the 91201–91210 market is what separates a Glendale campaign from a generic LA campaign.' },
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
            Tell us your Glendale market and target queries. We'll show you exactly what's blocking you.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem' }}>
            A pre-read is how every engagement starts — no obligation. We audit your organic position, GBP, and competitive gaps in the Glendale market before you commit. See the <a href="/performance/seo-discoverability-agency" style={{ color: 'rgba(255,255,255,0.8)' }}>SEO &amp; Discoverability practice</a> for full scope, or <a href="/local-seo-glendale" style={{ color: 'rgba(255,255,255,0.8)' }}>Local SEO Glendale</a> for the Map Pack-specific practice.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/book" className="btn btn-primary magnetic">
              Book a Glendale SEO pre-read
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
