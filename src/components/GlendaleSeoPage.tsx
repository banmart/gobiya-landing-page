import React from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'We appear in the Map Pack for some of our services but not others. What determines which queries we show up for?',
    a: 'Map Pack eligibility for a specific query is driven by GBP category alignment. Google assigns Map Pack appearances based on whether your primary and secondary GBP categories match the intent behind the search. If you are a dental office with "General Dentist" as your primary category, you appear for "dentist near me" but not for "orthodontist Glendale" unless that service type is listed as a secondary category. Service area configuration is the second factor — if your area does not include the searcher\'s location, you are removed from consideration regardless of category relevance.'
  },
  {
    q: 'We have significantly more reviews than our top competitor in Glendale but we consistently rank below them in local results. What are they doing that we are not?',
    a: 'Review count is one signal in a multi-factor local algorithm — and often not the deciding one. The businesses winning despite fewer reviews are typically outperforming on GBP category precision, NAP citation consistency across aggregators, and local link authority from Glendale Chamber of Commerce or local press. Review velocity also matters — a competitor with 40 reviews and 8 in the last month may outrank you with 200 total but only 2 in the last 90 days.'
  },
  {
    q: 'Our SEO agency sends a monthly ranking report but we cannot connect any of the numbers to actual leads or phone calls. What should we be tracking instead?',
    a: 'Keyword ranking position is an input metric, not an outcome metric. The numbers you should be tracking are: GBP profile actions (calls, direction requests, and website clicks directly from your Google Maps listing), organic traffic from your location-specific pages, and lead form submissions or calls attributed to organic search. If your agency cannot show you month-over-month movement in those numbers, they are reporting on the work they are doing, not on whether it is producing business results.'
  },
  {
    q: 'We are based in Glendale but serve clients across greater Los Angeles. Should our SEO target Glendale specifically or cast a wider net?',
    a: 'The right approach depends on where your revenue actually comes from. If most of your clients are within a 5-mile radius of your Glendale location, local SEO targeting the Map Pack for Glendale-specific queries is the highest-ROI investment because it captures buyers in the decision stage. If you serve clients across LA and the engagement does not require physical proximity, a content SEO strategy targeting service-specific queries across the metro is more appropriate. Start with the geography where you actually close the most deals, then expand.'
  }
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      "name": 'Gobiya — Glendale SEO',
      "url": 'https://www.gobiya.com/glendale-seo',
      "logo": 'https://www.gobiya.com/images/gobiya---logo.webp',
      "foundingDate": '2012',
      "description": 'Glendale SEO agency — technical SEO, local Map Pack optimization, content architecture, and authority building for businesses in the Glendale 91201–91210 market.',
      "telephone": '(323) 744-1338',
      "email": 'hello@gobiya.com',
      "priceRange": '$$$$',
      "areaServed": [
        { '@type': 'City', name: 'Glendale', sameAs: 'https://www.wikidata.org/wiki/Q182749' },
        { '@type': 'City', name: 'Burbank', sameAs: 'https://www.wikidata.org/wiki/Q188539' },
        { '@type': 'City', name: 'Pasadena', sameAs: 'https://www.wikidata.org/wiki/Q485651' },
        { '@type': 'City', name: 'La Crescenta', sameAs: 'https://www.wikidata.org/wiki/Q6461578' },
        { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65' },
      ],
      "address": {
        '@type': 'PostalAddress',
        "streetAddress": '3580 Wilshire Blvd, Ste 132',
        "addressLocality": 'Los Angeles',
        "addressRegion": 'CA',
        "postalCode": '90010',
        "addressCountry": 'US',
      },
      "geo": { '@type': 'GeoCoordinates', latitude: 34.1425, longitude: -118.2551 },
      "openingHoursSpecification": [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      ],
      "sameAs": [
        'https://www.linkedin.com/in/stevemartingobiya/',
        'https://m.yelp.com/biz/gobiya-los-angeles-5',
        'https://www.facebook.com/people/Gobiya/100064043744190/',
      ],
    },
    {
      '@type': 'Service',
      'serviceType': 'SEO Services',
      'provider': { '@id': 'https://www.gobiya.com/#organization' },
      'areaServed': { '@type': 'City', name: 'Glendale', sameAs: 'https://www.wikidata.org/wiki/Q182749' },
      'description': 'Glendale SEO services: technical SEO, local Map Pack optimization, on-page entity architecture, authority building, and AI search visibility for businesses in the 91201–91210 market.',
      'url': 'https://www.gobiya.com/glendale-seo'
    },
    {
      '@type': 'FAQPage',
      "mainEntity": FAQ_ITEMS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
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
  { val: '45%', label: 'Organic traffic growth delivered for a home-services client in the greater Los Angeles market through technical SEO and content architecture' },
  { val: '200+', label: 'Qualified leads per month built for a remodeling client through local SEO and Google Ads across the greater LA market' },
  { val: '2012', label: 'Year Gobiya began serving Glendale-area clients — over a decade of active SEO work in the 91201–91210 corridor' },
];

const SERVICES = [
  { title: 'Technical SEO', body: 'Crawl health, index coverage, Core Web Vitals, structured data, and URL architecture — the foundation every ranking depends on. Glendale\'s competitive verticals don\'t tolerate technical gaps: a crawl error or slow load on a key landing page costs real Map Pack positions.' },
  { title: 'Local SEO & Map Pack', body: 'Google Business Profile optimization, NAP citation consistency across directories, review velocity management, and LocalBusiness schema. The three Map Pack positions for most Glendale commercial queries account for the majority of local search clicks.' },
  { title: 'On-page optimization', body: 'Title tags, heading hierarchy, semantic content clustering, entity schema, and internal link architecture — the page-level signals that determine whether Google associates your site with the queries you\'re targeting in the Glendale market.' },
  { title: 'Authority & link building', body: 'Editorial backlinks from relevant publications, structured local citations, and entity alignment — the off-site signals that reinforce topical authority in competitive Glendale verticals like medical, legal, and home services.' },
  { title: 'Content architecture', body: 'Keyword and intent mapping for the Glendale market, topic cluster design, and GEO-optimized content structure so your brand is cited in AI-generated answers — not just ranked in the ten blue links.' },
  { title: 'Recovery & monitoring', body: 'If rankings dropped after a Google update, we run the forensic read before making any changes. Weekly Search Console diagnostics and rank tracking for your Glendale target queries, with plain explanations of what moved and why.' },
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
  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Glendale"
      heroTitle="Glendale SEO Services."
      heroSubtitle="Gobiya is an SEO agency serving Glendale, CA (ZIP 91201–91210) since 2012. Glendale SEO is the work of engineering your business to rank on Google — in organic listings, local Map Pack results, and AI-generated answers — for the queries your buyers in the 91201–91210 market actually type. Glendale is one of Los Angeles County's most commercially contested markets: Brand Boulevard and the Americana corridor drive thousands of high-intent searches every day, and the businesses at the top of those results built their position deliberately. We run technical SEO, local optimization, content architecture, and authority building as a compounding system."
      tags={[
        'Local SEO',
        'Map Pack',
        'Google Business Profile',
        'Glendale, CA',
        'Reputation Systems',
        'Technical SEO'
      ]}
      introHeading="What Glendale SEO Includes — And Why This Market Is Different"
      introParagraphs={[
        "Glendale sits at the intersection of three competitive search dynamics. First, it's a dense local market — the Americana at Brand corridor, Glendale Galleria, and the professional office clusters along Brand Boulevard mean local search competition is genuinely intense for medical, dental, legal, and home service categories.",
        "Second, it's adjacent to Burbank, Pasadena, and North Hollywood, so businesses here often need to rank in multiple overlapping geographic search pools. Third, the Glendale business community is unusually diverse — a large Armenian professional services sector, significant Korean and Latino business representation — which creates multilingual SEO opportunities most agencies don't pursue."
      ]}
      stats={STATS}
      servicesLabel="What's included"
      servicesTitle="What Glendale SEO Includes"
      services={SERVICES}
      spokes={SPOKES}
      spokesTitle="How we cover the full Glendale SEO search landscape"
      spokesLabel="Query fan-out cluster"
      useHeroForm={true}
      faqs={FAQ_ITEMS}
    >
      {/* CUSTOM Glendale reviews content */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Credentials &amp; clients</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Top rated Glendale SEO — what reviews and client results actually tell you
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Searching "top rated Glendale SEO" surfaces a lot of agency self-promotion and aggregator pages. Reviews are worth reading but require a filter: a five-star review that mentions "great results" without specifying which queries moved, how far, or whether rankings held is not useful evidence. The reviews that matter mention specific ranking changes, organic traffic percentages, or lead volume shifts tied directly to the SEO work.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            When evaluating Glendale SEO clients and case studies, look for: vertical match (has the agency ranked businesses in your category in Glendale specifically?), tenure (client relationships longer than 12 months indicate results; short-term project lists indicate churn), and update resilience (did rankings hold through Google's core update cycles, not just spike once and drop?).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 bg-gray-50 p-6 md:p-8 mb-12">
            <div>
              <strong className="font-mono text-xs text-gray-900 block mb-4 uppercase tracking-widest">What a useful Glendale SEO review mentions</strong>
              <ul className="space-y-3">
                {[
                  'Specific queries that moved and by how many positions',
                  'Organic traffic percentage change over a defined period',
                  'Lead or revenue outcome tied to the ranking work',
                  'Whether results held through a Google core update',
                  'How long the client has been active with the agency',
                ].map((p, j) => (
                  <li key={j} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-green-600">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong className="font-mono text-xs text-gray-900 block mb-4 uppercase tracking-widest">What a less useful review looks like</strong>
              <ul className="space-y-3">
                {[
                  'Generic praise for communication or responsiveness',
                  'Traffic charts without query or revenue context',
                  'Single-month result reported without follow-up',
                  '"Best agency in Glendale" without supporting data',
                  'Posted by a client who worked with the agency for under 60 days',
                ].map((p, j) => (
                  <li key={j} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-red-500">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'BBB accreditation', val: 'A+ rated', desc: 'Better Business Bureau A+ rating — independent verification of conduct and accountability.' },
              { label: 'Glendale market tenure', val: 'Since 2012', desc: 'Over a decade of active client work in the Glendale and greater LA market, through every major Google algorithm update.' },
              { label: 'Client verticals served', val: 'Medical, dental, home services, B2B', desc: 'Active SEO clients across the verticals that dominate Glendale commercial search.' },
            ].map((c, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mb-2">{c.label}</span>
                <strong className="text-lg text-gray-900 block mb-2">{c.val}</strong>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glendale SEO open now */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Available now</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Glendale SEO open now — book an online appointment today
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you're searching for Glendale SEO right now — a sudden rankings drop, a Google update that hit your traffic, a new Glendale business that needs search visibility from day one, or a GBP that disappeared from the Map Pack — the fastest way forward is a pre-read.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              A pre-read is a 30–45 minute consultation where we audit your current position in the Glendale market — organic rankings, GBP setup, technical health, competitive gaps — and tell you what we'd fix before you commit to anything. Online appointments are available through our booking page.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              For urgent situations — a GBP suspension in a peak season, a traffic drop the day before a campaign launch — call or email directly. Those need a same-day read, not a scheduled slot.
            </p>
            <div className="flex flex-col gap-4">
              <a href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors self-start">
                Book online — Glendale SEO consultation
              </a>
              <span className="text-xs text-gray-500">Or contact directly: <a href="mailto:hello@gobiya.com" className="text-green-600 font-semibold">hello@gobiya.com</a> · <a href="tel:3237441338" className="text-green-600 font-semibold">323-744-1338</a></span>
            </div>
          </div>

          <div className="border border-gray-200 bg-white">
            {[
              { label: 'Phone', val: '323-744-1338', href: 'tel:3237441338' },
              { label: 'Email', val: 'hello@gobiya.com', href: 'mailto:hello@gobiya.com' },
              { label: 'Online booking', val: 'gobiya.com/book', href: '/book' },
              { label: 'Hours', val: 'Mon–Fri, 9am–6pm PT', href: null },
              { label: 'Service area', val: 'Glendale 91201–91210 + greater LA', href: null },
              { label: 'Office', val: '3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010', href: null },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-baseline px-6 py-5 border-b border-gray-100 last:border-none gap-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 flex-shrink-0">{r.label}</span>
                {r.href ? (
                  <a href={r.href} className="text-sm text-gray-900 font-medium hover:underline text-right">{r.val}</a>
                ) : (
                  <span className="text-sm text-gray-600 text-right">{r.val}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glendale Americana corridor demands */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Market depth</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            SEO services Glendale — what the Americana corridor market actually demands
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The phrase "seo services glendale" describes a wide range of intent — from a dental practice that wants to rank for "dentist Glendale" to a contractor trying to appear in map results for emergency plumbing calls, to a B2B professional services firm that needs to rank for commercial-intent queries among the financial and legal businesses concentrated in the Brand Boulevard office corridor.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Each of those requires a different approach. Map Pack optimization for the dental practice is about GBP signals and review velocity. The contractor needs a fast, technically clean site and consistent NAP data. The B2B firm needs content that matches procurement-stage search intent and authority signals that establish topical credibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { vertical: 'Medical & dental', signal: 'Map Pack + GBP + review velocity', detail: 'Patients search locally, compare reviews, and click the top three map results. GBP completeness and review recency determine rank.' },
              { vertical: 'Home services & contractors', signal: 'Local SEO + fast load + NAP', detail: 'Emergency-intent queries (plumber near me, roofer Glendale) go to the Map Pack. Speed and citation consistency are the deciding factors.' },
              { vertical: 'Professional services & B2B', signal: 'Content architecture + authority', detail: 'Decision-makers search by service category. Rankings depend on content that matches procurement intent and authority signals from relevant publications.' },
            ].map((v, i) => (
              <div key={i} className="border border-gray-200 p-6 bg-gray-50">
                <strong className="text-base text-gray-900 block mb-2">{v.vertical}</strong>
                <span className="text-xs font-mono text-green-600 block mb-4 uppercase tracking-wider">{v.signal}</span>
                <p className="text-xs text-gray-500 leading-relaxed">{v.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            We've worked across all three verticals in the greater Glendale market since 2012. See our <a href="/case-studies" className="text-green-600 font-semibold hover:underline">case studies</a> for documented outcomes, or the <a href="/performance/b2b-seo-agency" className="text-green-600 font-semibold hover:underline">B2B SEO practice</a> for the enterprise side of what we do in LA-area markets.
          </p>
        </div>
      </section>

      {/* 6 Stage Glendale Campaign */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Campaign execution</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Market audit to compounding rankings in 6 stages
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every stage feeds the next. Technical fixes don't produce results without local signals. Local signals don't compound without authority. All six run in sequence, not parallel.
            </p>
          </div>
          <div className="lg:col-span-2 border-t border-gray-200 divide-y divide-gray-200">
            {STEPS.map((step, i) => (
              <div key={i} className="grid grid-cols-12 py-6 items-start gap-4">
                <span className="col-span-1 font-mono text-sm text-gray-400">0{i + 1}</span>
                <p className="col-span-11 text-sm sm:text-base text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies highlight */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">In the field</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              +45% organic growth, 200+ leads a month — built the same way we'd build yours.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A home services client in the greater Los Angeles market grew organic traffic 45% through technical SEO and content architecture. A remodeling contractor went from inconsistent inbound to 200+ qualified leads per month through hyper-local SEO, Google Ads, and a <a href="/performance/native-crm-agency" className="text-green-600 font-semibold hover:underline">native CRM integration</a> that tracked every lead from first search to booked job.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Both engagements used the same methodology we bring to Glendale: forensic read first, targeted build second, monthly reporting against real pipeline metrics.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/case-studies" className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors">
                See case studies
              </a>
              <a href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-gray-200 text-gray-900 font-semibold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors">
                Start a campaign
              </a>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-8 flex flex-col justify-center gap-6">
            {[
              { label: 'Organic traffic growth', val: '+45%' },
              { label: 'Qualified leads per month', val: '200+' },
              { label: 'Commercial keywords ranked', val: '47' },
              { label: 'Rankings held through core updates', val: 'Yes' },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-baseline border-b border-gray-200 last:border-none pb-4 last:pb-0">
                <span className="text-xs font-mono text-gray-500">{r.label}</span>
                <span className="text-lg font-bold text-gray-900">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
