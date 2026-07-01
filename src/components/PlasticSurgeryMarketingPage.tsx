import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';

const FAQ_ITEMS = [
  {
    q: 'We get website traffic but most consultation requests are from price shoppers or unqualified leads. How do we attract patients who are actually ready to book?',
    a: 'This is usually an intent architecture problem. Traffic from broad informational queries attracts researchers, not buyers. Buyers ready to book are searching differently — "board certified rhinoplasty surgeon near me," "rhinoplasty recovery timeline," "rhinoplasty before and after real patients." These queries need dedicated procedure-specific landing pages with conversion architecture: surgeon credentials, social proof, financing information, and a direct consultation CTA. When the content matches the buyer stage, qualified consultation requests separate naturally from tire-kickers.',
  },
  {
    q: 'We know before and after photos are our best conversion tool, but Google Ads and Meta keep restricting them. What can we actually run?',
    a: 'This is one of the most common frustrations for plastic surgery practices. Google Ads restricts before and after imagery in personalized ad formats but allows it in some placements with HCSC certification and compliance with their sensitive health content policies. Meta applies a blanket restriction across most ad formats. What still works: headshots of the surgeon, educational short-form video, patient testimonials without graphic imagery, and branded photography that implies quality without comparison. The workaround is an organic SEO strategy that does what the paid restrictions prevent — ranking for procedure queries where the search result page allows the imagery that converts.',
  },
  {
    q: 'We have been publishing procedure blog posts for over a year. Our traffic went up but consultation bookings have not moved at all. What is wrong?',
    a: 'Traffic without conversion architecture is the classic content marketing failure mode in plastic surgery. Informational posts about procedures attract people in the research phase — often months before they are ready to book. That traffic is valuable only with a nurture layer: email capture tied to a useful resource, remarketing sequences that follow visitors as they continue researching, and consultation offers that remove friction for the ready buyer. If your blog drives traffic but has no email capture, no remarketing pixel, and no consultation CTA integrated into the content experience, you are building audience for your competitors to retarget. The fix is not more content — it is converting the audience the content is already building.',
  },
  {
    q: 'We are launching a new procedure. How long before SEO and paid search start producing consultation bookings for it?',
    a: 'Paid search can produce bookings within 30 days if the campaign is structured correctly and the search volume exists. SEO takes longer: a newly optimized procedure page typically takes 90 to 180 days to rank for target queries, depending on domain authority, the competitiveness of the procedure in your market, and how the page is built. The fastest path to early bookings for a new procedure is a dual-channel strategy: Google Ads to capture immediate demand while the SEO page builds authority. Publishing supporting content — patient FAQs, recovery timelines, surgeon Q and A — accelerates the SEO timeline by building topical authority around the procedure before the main landing page is ready to rank.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya — Plastic Surgery Internet Marketing',
      url: 'https://www.gobiya.com/plastic-surgery-internet-marketing',
      logo: 'https://www.gobiya.com/images/gobiya---logo.webp',
      foundingDate: '2012',
      description: 'Plastic surgery internet marketing agency — SEO, Google Ads, content architecture, and reputation management engineered for plastic surgery and aesthetic medicine practices.',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3580 Wilshire Blvd, Ste 132',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90010',
        addressCountry: 'US',
      },
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
      serviceType: 'Plastic Surgery Internet Marketing',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      description: 'Plastic surgery internet marketing: procedure-specific SEO, Google Ads for aesthetic medicine, content architecture for high-consideration patient journeys, review velocity management, and AI citation visibility.',
      url: 'https://www.gobiya.com/plastic-surgery-internet-marketing',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const SPOKES = [
  {
    title: 'SEO & Discoverability',
    query: '"seo discoverability agency"',
    href: '/performance/seo-discoverability-agency',
    desc: 'The technical SEO practice behind every plastic surgery campaign — crawl health, entity architecture, and procedure-level keyword engineering.',
  },
  {
    title: 'Google Ads & PPC',
    query: '"google ads ppc strategy agency"',
    href: '/relations/google-ads-ppc-strategy-agency',
    desc: 'High-intent paid search for plastic surgery — procedure-specific ad groups, RLSA remarketing, and cost-per-consultation tracking.',
  },
  {
    title: 'Authority Building',
    query: '"authority building agency"',
    href: '/relations/authority-building-agency',
    desc: 'Editorial backlinks and structured citations that establish your practice as the topical authority in your procedure and geography.',
  },
  {
    title: 'Technical SEO Audit',
    query: '"technical seo audit agency"',
    href: '/performance/technical-seo-audit-agency',
    desc: 'Full diagnostic of crawl health, Core Web Vitals, and structured data — the technical baseline your rankings depend on.',
  },
];

const STATS = [
  { val: '$8K–$25K', label: 'Average procedure value in aesthetic medicine — the economics that make SEO and content the highest-ROI acquisition channel for plastic surgery practices' },
  { val: '3–6 mo', label: 'Typical patient consideration cycle for elective aesthetic procedures — why content architecture that nurtures across sessions outperforms single-touch paid ads' },
  { val: '200+', label: 'Qualified leads per month built for a home-services client through the same local SEO and PPC compound system we deploy for medical practices' },
];

const SERVICES = [
  {
    n: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="13" stroke="#111827" strokeWidth="1.5"/>
        <path d="M8 14h12M14 8v12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Procedure-specific SEO',
    body: 'Dedicated landing pages for each procedure — rhinoplasty, breast augmentation, liposuction, mommy makeover — targeting the full keyword map around each service, including cost queries, recovery queries, and "near me" intent.',
  },
  {
    n: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="24" height="16" rx="2" stroke="#111827" strokeWidth="1.5"/>
        <path d="M7 16l4-4 4 4 6-6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Google Ads for aesthetic medicine',
    body: 'Search campaigns structured around high-intent procedure queries, with negative keyword discipline to exclude research-only traffic, RLSA layers for site visitors who didn\'t convert, and cost-per-consultation as the primary KPI.',
  },
  {
    n: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 4h20v14H4z" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 22h10M14 18v4" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Content architecture',
    body: 'Topic clusters built around each procedure and patient concern — "is rhinoplasty worth it," "rhinoplasty recovery week by week," "how to choose a plastic surgeon" — content that nurtures the 3–6 month consideration journey and builds topical authority for AI citation.',
  },
  {
    n: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.95 5.5L14 17l-4.95 2.2.95-5.5-4-3.9 5.5-.8L14 4z" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Review velocity management',
    body: 'A repeatable post-appointment workflow for requesting Google and RealSelf reviews from satisfied patients. Review recency and volume are direct ranking signals in local search, and the primary trust signal for a prospective patient evaluating surgeons.',
  },
  {
    n: '05',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="6" stroke="#111827" strokeWidth="1.5"/>
        <circle cx="18" cy="10" r="6" stroke="#111827" strokeWidth="1.5"/>
        <circle cx="14" cy="18" r="6" stroke="#111827" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Local SEO & Map Pack',
    body: 'Google Business Profile optimization, NAP citation consistency, and local schema for the geographic markets where your patients search — "plastic surgeon Beverly Hills," "board certified surgeon Glendale" — capturing the Map Pack positions that drive the most local consultation requests.',
  },
  {
    n: '06',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 20L10 14l4 4 10-12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="14" r="1.5" fill="#111827"/>
        <circle cx="14" cy="18" r="1.5" fill="#111827"/>
      </svg>
    ),
    title: 'AI citation optimization',
    body: 'Engineering your practice to appear in ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot responses when prospective patients ask about plastic surgery options — a channel that didn\'t exist three years ago and is now a meaningful source of high-intent referrals.',
  },
];

/* ── SVG: Patient Journey Flow ── */
function PatientJourneyDiagram() {
  const stages = ['Search', 'Discover', 'Research', 'Compare', 'Consult', 'Book'];
  const w = 600, h = 100, pad = 50;
  const step = (w - pad * 2) / (stages.length - 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: 600, display: 'block' }} aria-label="Patient acquisition journey: Search → Discover → Research → Compare → Consult → Book">
      {stages.map((_, i) => i < stages.length - 1 && (
        <line key={i} x1={pad + i * step} y1={44} x2={pad + (i + 1) * step} y2={44} stroke="#e5e7eb" strokeWidth="1.5" />
      ))}
      {stages.map((label, i) => (
        <g key={i}>
          <circle cx={pad + i * step} cy={44} r={i === stages.length - 1 ? 12 : 8}
            fill={i === stages.length - 1 ? '#111827' : '#ffffff'}
            stroke={i === 0 ? '#9ca3af' : '#111827'}
            strokeWidth={i === stages.length - 1 ? 0 : 1.5} />
          {i === stages.length - 1 && (
            <path d={`M${pad + i * step - 5},${44} L${pad + i * step},${38} L${pad + i * step + 5},${44}`} fill="#ffffff" />
          )}
          <text x={pad + i * step} y={70} textAnchor="middle"
            style={{ fontSize: '9px', fontFamily: 'monospace', fill: i === 0 ? '#9ca3af' : '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {label}
          </text>
          {i === 0 && (
            <text x={pad + i * step} y={30} textAnchor="middle"
              style={{ fontSize: '8px', fontFamily: 'monospace', fill: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ENTRY
            </text>
          )}
          {i === stages.length - 1 && (
            <text x={pad + i * step} y={30} textAnchor="middle"
              style={{ fontSize: '8px', fontFamily: 'monospace', fill: '#111827', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              GOAL
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ── SVG: Marketing Funnel ── */
function MarketingFunnel() {
  const layers = [
    { label: 'Awareness', sub: 'SEO · Content · AI citations', w: 340, color: '#f3f4f6', textColor: '#374151' },
    { label: 'Consideration', sub: 'Remarketing · Email · Reviews', w: 240, color: '#e5e7eb', textColor: '#374151' },
    { label: 'Decision', sub: 'Paid search · Direct consultation', w: 160, color: '#d1d5db', textColor: '#111827' },
    { label: 'Conversion', sub: 'Booked consultation', w: 100, color: '#111827', textColor: '#ffffff' },
  ];

  return (
    <svg viewBox="0 0 360 220" width="100%" style={{ maxWidth: 360, display: 'block', margin: '0 auto' }} aria-label="Plastic surgery marketing funnel: Awareness → Consideration → Decision → Conversion">
      {layers.map((l, i) => {
        const y = 10 + i * 50;
        const x = (360 - l.w) / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={l.w} height={40} rx="2" fill={l.color} />
            <text x={180} y={y + 15} textAnchor="middle"
              style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'sans-serif', fill: l.textColor }}>
              {l.label}
            </text>
            <text x={180} y={y + 30} textAnchor="middle"
              style={{ fontSize: '8.5px', fontFamily: 'monospace', fill: l.textColor === '#ffffff' ? 'rgba(255,255,255,0.7)' : '#9ca3af', letterSpacing: '0.04em' }}>
              {l.sub}
            </text>
          </g>
        );
      })}
      <text x={180} y={215} textAnchor="middle"
        style={{ fontSize: '8px', fontFamily: 'monospace', fill: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        PATIENT ACQUISITION FUNNEL
      </text>
    </svg>
  );
}

const CAMPAIGN_PHASES = [
  { phase: 'Foundation', items: ['Technical SEO audit of existing site', 'Procedure page keyword mapping (all target procedures)', 'GBP optimization and local citation audit', 'Conversion tracking setup (call tracking, form submissions, consult requests)'] },
  { phase: 'Build', items: ['Procedure landing pages created or restructured', 'Schema markup: MedicalProcedure, Physician, LocalBusiness', 'Google Ads account structure built by procedure group', 'Content calendar for nurture-phase blog content'] },
  { phase: 'Activate', items: ['Paid search campaigns launched with conversion tracking live', 'Review acquisition workflow implemented with front desk', 'Content publishing begins (2–4 posts/month minimum)', 'RLSA remarketing audiences activated after 30-day cookie pool'] },
  { phase: 'Compound', items: ['Monthly SEO rank reporting by procedure query', 'Cost-per-consultation reported from paid search', 'Review count and recency tracked monthly', 'Content clusters expanded based on search demand data'] },
];

export default function PlasticSurgeryMarketingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: 'clamp(5rem,15vw,13rem) 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/performance" style={{ color: '#9ca3af', textDecoration: 'none' }}>Performance</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>Plastic Surgery Internet Marketing</span>
        </nav>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '820px', marginBottom: '1.5rem' }}>
              Plastic Surgery Internet Marketing
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
              Gobiya is a Los Angeles digital marketing agency founded in 2010 that provides SEO, Google Ads, and content marketing for plastic surgery and aesthetic medicine practices. Patient decisions in this category typically involve procedure costs of $8,000 to $25,000 and a 3–6 month research cycle. High-performing practices dominate these searches by building a compounding system: technical SEO that captures procedure-specific queries, content architecture that nurtures across a 3–6 month consideration cycle, Google Ads tuned to high-intent searches, and reputation infrastructure that turns patient reviews into conversion assets. Our <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)', textDecoration: 'none' }}>SEO &amp; Discoverability practice</a> anchors every plastic surgery campaign we run.
            </p>

            {/* Patient Journey Diagram */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Patient acquisition journey</span>
              <PatientJourneyDiagram />
            </div>
          </div>

          {/* Sidebar: quick form + stats card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '1 1 420px', maxWidth: '560px' }}>
          <HeroQuickForm source="Plastic Surgery Internet Marketing" variant="light" heading="Request a marketing consultation" subheading="Tell us about your practice and we’ll follow up promptly." />
          {/* Stats card */}
          <div style={{ border: '1px solid #e5e7eb', padding: '2rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', display: 'block', marginBottom: '1.5rem' }}>Practice snapshot</span>
            {[
              { label: 'Est.', val: '2012' },
              { label: 'BBB', val: 'A+ rated' },
              { label: 'Market', val: 'Los Angeles' },
              { label: 'Phone', val: '323-744-1338' },
              { label: 'Specialty', val: 'Medical & aesthetic' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6', gap: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af' }}>{r.label}</span>
                <span style={{ fontSize: '0.85rem', color: '#111827', fontWeight: 600, textAlign: 'right' }}>{r.val}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div className="rg-stats" style={{ padding: '0 5vw' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '2rem 0', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none', paddingLeft: i > 0 ? '3rem' : 0 }}>
              <span style={{ display: 'block', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111827', lineHeight: 1 }}>{s.val}</span>
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
            How we cover the full plastic surgery marketing search landscape
          </h2>
        </div>

        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>Plastic Surgery Internet Marketing</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"plastic surgery internet marketing"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /plastic-surgery-internet-marketing
          </span>
        </div>

        <div className="rg-spokes" style={{ border: '1px solid #e5e7eb', borderTop: 'none' }}>
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

      <ContentCta headline="Ready to attract more qualified patients?" sub="Our team responds within one business day." accent="#111827" background="#ffffff" />

      {/* ── WHAT PLASTIC SURGERY DIGITAL MARKETING INCLUDES ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ maxWidth: '860px', marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>What's included</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            What plastic surgery digital marketing actually includes
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Plastic surgery digital marketing operates under constraints that don't apply to most industries. Meta (Instagram, Facebook) restricts before/after imagery in paid ads and prohibits targeting based on body image insecurities. HIPAA governs how patient data can be used in retargeting. The FTC requires disclosure for paid testimonials. Google's healthcare advertising policies require LegitScript certification for certain cosmetic procedure keywords. Any plastic surgery marketing company that doesn't account for these constraints will either waste budget on disapproved ads or expose the practice to compliance risk.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            We build plastic surgery digital marketing systems that work within these constraints. That means prioritizing channels where compliance is manageable — organic search, Google Ads with compliant creative, content marketing, and review management — and structuring each channel to compound into the next. A patient who finds your practice via organic search for "rhinoplasty recovery timeline" reads three more posts, sees a retargeting ad (compliant), visits your consultation booking page, and books. That's the system. It doesn't depend on a single channel.
          </p>
        </div>

        <div className="rg-services" style={{ border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {SERVICES.map(s => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>{s.icon}</div>
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLASTIC SURGERY MARKETING CAMPAIGN ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>Campaign architecture</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              How to build a plastic surgery marketing campaign that compounds
            </h2>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
              A plastic surgery marketing campaign that compounds is one where each channel reinforces the others over time. SEO builds organic visibility that reduces paid search cost per click. Content earns trust that increases conversion rate on paid search. Reviews earned through organic patient interactions improve Map Pack rankings. The whole system produces more consultations per dollar spent after 12 months than it did in month one.
            </p>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Campaigns that don't compound are ones built around a single channel — typically a high paid-search budget with no organic or content layer. Those produce results that plateau early and stop entirely when the budget stops. We build the compound version. See the <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)' }}>SEO &amp; Discoverability practice</a> for the organic layer and the <a href="/relations/google-ads-ppc-strategy-agency" style={{ color: 'var(--green)' }}>Google Ads practice</a> for the paid layer.
            </p>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
              {CAMPAIGN_PHASES.map((phase, i) => (
                <div key={i} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: i < CAMPAIGN_PHASES.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>Phase {i + 1}</span>
                    <strong style={{ fontSize: '0.9rem', color: '#111827' }}>{phase.phase}</strong>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {phase.items.map((item, j) => (
                      <li key={j} style={{ fontSize: '0.82rem', color: '#6b7280', paddingLeft: '1rem', position: 'relative', lineHeight: 1.6 }}>
                        <span style={{ position: 'absolute', left: 0, color: '#d1d5db' }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Funnel diagram */}
          <div>
            <div style={{ border: '1px solid #e5e7eb', padding: '2.5rem', background: '#f9fafb' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '2rem', textAlign: 'center' }}>Plastic surgery patient acquisition funnel</span>
              <MarketingFunnel />
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { stage: 'Awareness', channel: 'Organic SEO · AI citations · Content', color: '#9ca3af' },
                  { stage: 'Consideration', channel: 'Remarketing · Review management', color: '#6b7280' },
                  { stage: 'Decision', channel: 'Paid search · Direct booking', color: '#374151' },
                  { stage: 'Conversion', channel: 'Consultation booked', color: '#111827' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: row.color, minWidth: '90px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{row.stage}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{row.channel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLASTIC SURGERY MARKETING IDEAS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>What works in 2026</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Plastic surgery marketing ideas that work in 2026 — and ones that don't
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '2rem' }}>
            Most plastic surgery marketing ideas you'll find online are either outdated (social-first strategies that ignore organic search) or undifferentiated (every practice has a before/after Instagram). The ideas that drive real patient acquisition in 2026 are ones that reach patients where they're actually making decisions — on Google, in AI-generated answers, and in review platforms. Here's what we see working.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', border: '1px solid #e5e7eb', background: '#e5e7eb', marginBottom: '2rem' }}>
            {[
              {
                heading: 'High-return in 2026',
                accent: '#111827',
                items: [
                  { title: 'Procedure cluster SEO', desc: 'Deep topic hubs around each procedure — answering the full research journey from "what is X" to "X recovery week 2" to "X cost in LA" — capturing organic traffic at every stage.' },
                  { title: 'AI citation optimization', desc: 'Engineering your practice content to appear in ChatGPT, Perplexity, and Google AI Overviews. Patients increasingly start their plastic surgery research with AI-generated answers, not traditional search results.' },
                  { title: 'Google Ads by procedure + RLSA', desc: 'Tightly themed ad groups per procedure, with RLSA remarketing to warm audiences who visited your procedure pages but didn\'t book a consult.' },
                  { title: 'Review velocity system', desc: 'A repeatable post-appointment workflow that generates consistent new Google and RealSelf reviews — review recency and volume are ranking signals in local search and trust signals for prospective patients.' },
                ],
              },
              {
                heading: 'Lower-return or declining',
                accent: '#9ca3af',
                items: [
                  { title: 'Before/after Instagram as primary channel', desc: 'Before/after posts drive engagement but convert poorly without an SEO or paid search layer capturing patients who are actively searching — not passively scrolling.' },
                  { title: 'Broad awareness display ads', desc: 'CPM-based display campaigns generate impressions but don\'t capture intent. Plastic surgery is a high-consideration decision; intent channels outperform awareness channels.' },
                  { title: 'Single-page procedure sites', desc: 'Sites with one thin page per procedure, no content depth, and no internal linking structure are increasingly outranked by practices with comprehensive procedure hubs.' },
                  { title: 'Buying RealSelf reviews', desc: 'Paid or incentivized reviews on medical review platforms violate platform terms and FTC guidelines — and are increasingly detectable by both platforms and patients.' },
                ],
              },
            ].map((col, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '2rem' }}>
                <strong style={{ fontSize: '0.75rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: col.accent, display: 'block', marginBottom: '1.25rem' }}>{col.heading}</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {col.items.map((item, j) => (
                    <div key={j}>
                      <strong style={{ fontSize: '0.875rem', color: '#111827', display: 'block', marginBottom: '0.3rem' }}>{item.title}</strong>
                      <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentCta headline="Let's build your patient acquisition system." sub="Start with a free site audit — no commitment, 24-hour response." accent="#111827" background="#f9fafb" />

      {/* ── REVIEWS / CHOOSING A COMPANY ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>How to choose</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Plastic surgery internet marketing reviews — what to look for when choosing a company
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Searching "plastic surgery internet marketing companies" or "plastic surgery marketing agency reviews" produces a long list of agencies — most of them general digital marketing shops that have added a healthcare page to their site. Very few have specific plastic surgery client experience, compliance knowledge, or documented patient acquisition outcomes.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '2rem' }}>
            When evaluating plastic surgery internet marketing companies, the questions that cut through the noise are: Can you show me organic rankings for procedure-specific keywords (not just branded queries)? What is your cost-per-consultation from paid search for a practice in my procedure mix? Have you navigated Meta's before/after ad restrictions and Google's healthcare advertising compliance requirements? How do you handle a GBP suspension — which is one of the most common emergencies in medical local SEO?
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'Ask for', val: 'Procedure-level keyword rankings', desc: 'Not branded traffic. Not overall sessions. Specific non-branded procedure queries and the positions they rank for, before and after the engagement.' },
              { label: 'Ask for', val: 'Cost-per-consultation data', desc: 'From paid search specifically — how many consultation form fills and phone calls per $1,000 of ad spend, for a practice with a similar procedure mix.' },
              { label: 'Ask for', val: 'Compliance track record', desc: 'What is their protocol for Meta ad creative that avoids before/after restrictions? Have they had client accounts suspended? How did they resolve it?' },
            ].map((c, i) => (
              <div key={i} style={{ border: '1px solid #e5e7eb', padding: '1.75rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>{c.label}</span>
                <strong style={{ fontSize: '1rem', color: '#111827', display: 'block', marginBottom: '0.75rem', lineHeight: 1.3 }}>{c.val}</strong>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '2rem' }}>
            <strong style={{ fontSize: '0.85rem', color: '#111827', display: 'block', marginBottom: '0.75rem' }}>Why Gobiya — the short version</strong>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.75 }}>
              BBB A+ rated, serving medical and aesthetic practice clients since 2012. We've built procedure-specific SEO systems, run compliant Google Ads for medical aesthetics, and recovered practices from GBP suspensions and Google algorithm hits. Our <a href="/case-studies" style={{ color: 'var(--green)' }}>case studies</a> document specific outcomes — not impressions. We don't take clients in categories where we can't produce documented results in the first 90 days.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>People also ask</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Plastic surgery internet marketing — answered directly
          </h2>
        </div>
        <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '860px' }}>
          {FAQ_ITEMS.map((f, i) => (
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
            Tell us your procedure mix and target markets. We'll show you exactly what's missing.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem' }}>
            A pre-read is how every engagement starts. We audit your current organic procedure rankings, GBP setup, paid search structure, and review profile — and tell you what we'd fix before you commit. See the <a href="/performance/seo-discoverability-agency" style={{ color: 'rgba(255,255,255,0.8)' }}>SEO &amp; Discoverability practice</a> or the <a href="/relations/google-ads-ppc-strategy-agency" style={{ color: 'rgba(255,255,255,0.8)' }}>Google Ads practice</a> for full scope.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/book" className="btn btn-primary magnetic">
              Book a plastic surgery marketing pre-read
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
