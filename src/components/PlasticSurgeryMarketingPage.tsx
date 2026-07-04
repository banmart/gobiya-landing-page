import React from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

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
      foundingDate: '2012-11-25',
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
  { val: '$8K–$25K', label: 'Average procedure value in elective medicine — the economics that make SEO and content the highest-ROI acquisition channel' },
  { val: '3–6 mo', label: 'Typical patient consideration cycle for procedures — why content architecture that nurtures outperforms single-touch ads' },
  { val: '200+', label: 'Qualified leads per month built for a home-services client through the same local SEO and PPC compound system we deploy for medical practices' },
];

const SERVICES = [
  {
    title: 'Patients search "rhinoplasty recovery week by week" before they ever search for a surgeon — and your site isn\'t there',
    body: 'Each procedure needs a dedicated landing page built around the full query map: cost queries, recovery questions, comparison queries, and "near me" intent. Without procedure-specific pages that match what buyers actually search, your practice is invisible for most of the 3–6 month decision journey.',
  },
  {
    title: 'Your Google Ads are paying for research-phase clicks that never convert into consultations',
    body: 'Campaigns without tight negative keyword lists spend on "rhinoplasty before and after" and "what is a mommy makeover" — research intent, not booking intent. We build campaigns around high-conversion procedure queries, exclude research traffic, and retarget the visitors who almost booked with RLSA. Cost per consultation is the only KPI we optimize toward.',
  },
  {
    title: 'You\'re publishing blog posts but patients research for months and there\'s no system to keep them coming back to you',
    body: 'Informational posts about procedures attract buyers who won\'t book for 90 days. That audience is valuable only if there\'s a nurture layer: email capture, remarketing sequences, and consultation CTAs woven into the content experience. Without it, you\'re building audience for your competitors to retarget.',
  },
  {
    title: 'You have satisfied patients who never leave a review — and it\'s costing you Map Pack positions to competitors with half your skill',
    body: 'Review velocity is what separates Map Pack position 1 from position 4. A practice with 60 reviews and 5 in the last 30 days consistently outranks one with 200 total and none in six months. We build the post-appointment workflow that generates authentic reviews from real patients on Google and RealSelf — within policy, without incentivizing.',
  },
  {
    title: 'Patients search "plastic surgeon near me" on Google Maps and your practice doesn\'t appear in the top three',
    body: 'Map Pack visibility for local procedure queries is driven by GBP category accuracy, NAP consistency across directories, and review velocity — not just website ranking. We optimize your Google Business Profile, align your citation data across 40+ sources, and inject local schema to secure the Map Pack positions that generate the most consultation requests.',
  },
  {
    title: 'A prospective patient asks ChatGPT "best board-certified rhinoplasty surgeon in Los Angeles" — your competitor appears, not you',
    body: 'AI platforms cite practices with verified entity data, structured schema, and content formatted for passage-level extraction. Most practice websites have none of these. We engineer your AI search presence so your brand appears when patients research options in the channel that now influences 30–40% of high-consideration purchase journeys.',
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
  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Plastic Surgery"
      heroTitle="Plastic Surgery Marketing: Consultation Bookings at Every Stage of the Patient Journey"
      heroSubtitle="Most plastic surgery practices run ads that don't convert because they're hitting research-phase buyers with decision-phase offers. Meta restricts before/after imagery. Google requires LegitScript certification. And patients considering an $8,000–$25,000 procedure don't book from a single ad — they read, compare, and come back. Gobiya builds the SEO, content, and paid strategy that matches each stage of that journey and turns it into consultation bookings."
      tags={[
        'Elective Medicine',
        'Google Ads PPC',
        'Aesthetic Marketing',
        'HIPAA Compliance',
        'Local SEO & Map Pack',
        'Review Velocity'
      ]}
      relevantSlugs={[
        'how-do-b2b-companies-use-seo-to-generate-predictable-revenue',
        'what-are-ai-seo-services',
        'multi-location-websites-for-franchises'
      ]}
      introHeading="What Plastic Surgery Digital Marketing Actually Includes"
      introParagraphs={[
        "Plastic surgery digital marketing operates under constraints that don't apply to most industries. Meta (Instagram, Facebook) restricts before/after imagery in paid ads and prohibits targeting based on body image insecurities. HIPAA governs how patient data can be used in retargeting. The FTC requires disclosure for paid testimonials. Google's healthcare advertising policies require LegitScript certification for certain cosmetic procedure keywords.",
        "We build plastic surgery digital marketing systems that work within these constraints. That means prioritizing channels where compliance is manageable — organic search, Google Ads with compliant creative, content marketing, and review management — and structuring each channel to compound into the next. A patient who finds your practice via organic search for 'rhinoplasty recovery timeline' reads three more posts, sees a retargeting ad (compliant), visits your consultation booking page, and books."
      ]}
      stats={STATS}
      servicesLabel="What's included"
      servicesTitle="What plastic surgery digital marketing actually includes"
      services={SERVICES}
      spokes={SPOKES}
      spokesTitle="How we cover the full plastic surgery marketing search landscape"
      spokesLabel="Query fan-out cluster"
      useHeroForm={true}
      faqs={FAQ_ITEMS}
    >
      {/* Patient journey diagram */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Patient Acquisition Journey</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Connecting touchpoints from initial query to booked procedure
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Elective medical decisions aren't made on a whim. The journey is multi-session, starting with information queries about safety, cost, and recovery, moving into comparative analysis of surgeons, and ending with direct consult booking.
          </p>
          <div className="border border-gray-100 p-8 rounded-lg bg-gray-50 flex justify-center">
            <PatientJourneyDiagram />
          </div>
        </div>
      </section>

      {/* Campaign Architecture & Funnel */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Campaign Architecture</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              How to build a plastic surgery marketing campaign that compounds
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A plastic surgery marketing campaign that compounds is one where each channel reinforces the others over time. SEO builds organic visibility that reduces paid search cost per click. Content earns trust that increases conversion rate on paid search. Reviews earned through organic patient interactions improve Map Pack rankings. The whole system produces more consultations per dollar spent after 12 months than it did in month one.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Campaigns that don't compound are ones built around a single channel — typically a high paid-search budget with no organic or content layer. Those produce results that plateau early and stop entirely when the budget stops. We build the compound version.
            </p>

            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {CAMPAIGN_PHASES.map((phase, i) => (
                <div key={i} className="py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">Phase 0{i + 1}</span>
                    <strong className="text-sm text-gray-900">{phase.phase}</strong>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-sm text-gray-500 flex gap-2">
                        <span>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-lg flex flex-col justify-between gap-8 shadow-sm">
            <div>
              <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-6 text-center">Patient Acquisition Funnel</span>
              <MarketingFunnel />
            </div>
            <div className="space-y-3">
              {[
                { stage: 'Awareness', channel: 'Organic SEO · AI citations · Content', color: 'bg-gray-100' },
                { stage: 'Consideration', channel: 'Remarketing · Review management', color: 'bg-gray-200' },
                { stage: 'Decision', channel: 'Paid search · Direct booking', color: 'bg-gray-300' },
                { stage: 'Conversion', channel: 'Consultation booked', color: 'bg-black text-white' },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center px-4 py-3 rounded ${row.color}`}>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">{row.stage}</span>
                  <span className="text-xs">{row.channel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideas comparison */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">What works in 2026</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Plastic surgery marketing ideas that work in 2026 — and ones that don't
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Most plastic surgery marketing ideas you'll find online are either outdated (social-first strategies that ignore organic search) or undifferentiated (every practice has a before/after Instagram). The ideas that drive real patient acquisition in 2026 are ones that reach patients where they're actually making decisions — on Google, in AI-generated answers, and in review platforms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-gray-200 bg-gray-200 mb-8">
            {[
              {
                heading: 'High-return in 2026',
                color: 'text-gray-900',
                items: [
                  { title: 'Procedure cluster SEO', desc: 'Deep topic hubs around each procedure — answering the full research journey from "what is X" to "X recovery week 2" to "X cost in LA" — capturing organic traffic at every stage.' },
                  { title: 'AI citation optimization', desc: 'Engineering your practice content to appear in ChatGPT, Perplexity, and Google AI Overviews. Patients increasingly start their plastic surgery research with AI-generated answers.' },
                  { title: 'Google Ads by procedure + RLSA', desc: 'Tightly themed ad groups per procedure, with RLSA remarketing to warm audiences who visited your procedure pages but didn\'t book a consult.' },
                  { title: 'Review velocity system', desc: 'A repeatable post-appointment workflow that generates consistent new Google and RealSelf reviews.' },
                ],
              },
              {
                heading: 'Lower-return or declining',
                color: 'text-gray-400',
                items: [
                  { title: 'Before/after Instagram as primary channel', desc: 'Before/after posts drive engagement but convert poorly without an SEO or paid search layer capturing patients who are actively searching.' },
                  { title: 'Broad awareness display ads', desc: 'CPM-based display campaigns generate impressions but don\'t capture intent. Elective medicine is a high-consideration decision.' },
                  { title: 'Single-page procedure sites', desc: 'Sites with one thin page per procedure, no content depth, and no internal linking structure are outranked by practices with comprehensive procedure hubs.' },
                  { title: 'Buying RealSelf reviews', desc: 'Paid or incentivized reviews on medical review platforms violate platform terms and FTC guidelines.' },
                ],
              },
            ].map((col, i) => (
              <div key={i} className="bg-white p-8">
                <strong className={`text-xs font-mono uppercase tracking-widest ${col.color} block mb-6`}>{col.heading}</strong>
                <div className="space-y-6">
                  {col.items.map((item, j) => (
                    <div key={j}>
                      <strong className="text-sm text-gray-900 block mb-2">{item.title}</strong>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choosing a company grid */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">How to choose</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Plastic surgery internet marketing reviews — what to look for when choosing a company
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Searching "plastic surgery internet marketing companies" or "plastic surgery marketing agency reviews" produces a long list of agencies — most of them general digital marketing shops that have added a healthcare page to their site. Very few have specific plastic surgery client experience, compliance knowledge, or documented patient acquisition outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Ask for', val: 'Procedure-level keyword rankings', desc: 'Not branded traffic. Not overall sessions. Specific non-branded procedure queries and the positions they rank for, before and after the engagement.' },
              { label: 'Ask for', val: 'Cost-per-consultation data', desc: 'From paid search specifically — how many consultation form fills and phone calls per $1,000 of ad spend, for a practice with a similar procedure mix.' },
              { label: 'Ask for', val: 'Compliance track record', desc: 'What is their protocol for Meta ad creative that avoids before/after restrictions? Have they had client accounts suspended? How did they resolve it?' },
            ].map((c, i) => (
              <div key={i} className="border border-gray-200 bg-white p-6 rounded-lg">
                <span className="font-mono text-xs text-gray-400 block mb-2 uppercase tracking-widest">{c.label}</span>
                <strong className="text-base text-gray-900 block mb-3 leading-tight">{c.val}</strong>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-lg">
            <strong className="text-sm text-gray-900 block mb-4">Why Gobiya — the short version</strong>
            <p className="text-sm text-gray-600 leading-relaxed">
              BBB A+ rated, serving medical and aesthetic practice clients since 2012. We've built procedure-specific SEO systems, run compliant Google Ads for medical aesthetics, and recovered practices from GBP suspensions and Google algorithm hits. Our <a href="/work" className="text-green-600 font-semibold hover:underline">case studies</a> document specific outcomes — not impressions. We don't take clients in categories where we can't produce documented results in the first 90 days.
            </p>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
