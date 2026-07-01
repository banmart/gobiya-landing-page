import React from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

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
          name: 'We were in the top three on Google Maps for over a year, then one update knocked us out completely. How do we find out what happened?',
          acceptedAnswer: { '@type': 'Answer', text: 'A sudden Map Pack drop after a Google update usually traces to proximity weighting changes, GBP category reconfiguration, or review recency decay. The diagnostic is a side-by-side comparison of your current GBP signals versus the competitors who held their positions through the update. That comparison typically surfaces the specific signal that shifted.' },
        },
        {
          '@type': 'Question',
          name: 'We ask every happy customer to leave us a Google review and almost nobody follows through. How do you actually improve that conversion rate?',
          acceptedAnswer: { '@type': 'Answer', text: 'The friction is almost always in the request itself. Asking verbally or sending a general follow-up email without a direct link produces single-digit conversion rates. What works: an automated SMS within 24 hours of service with a direct Google review link that opens the compose screen. The practices achieving 4 to 6 reviews per month consistently have that follow-up sequence tied to their scheduling or payment system.' },
        },
        {
          '@type': 'Question',
          name: 'Our NAP looks consistent everywhere we can see, but Google sometimes shows our old address or an outdated phone number. What is causing that?',
          acceptedAnswer: { '@type': 'Answer', text: 'Google aggregates business data from multiple sources, including aggregators like Data Axle, Neustar Localeze, and Foursquare that may have cached your old data. If those aggregators have not been corrected, Google may still pull outdated information even after you updated your GBP directly. The fix requires a citation audit that reaches the aggregator layer, not just the visible directories.' },
        },
        {
          '@type': 'Question',
          name: 'We are a new business in Burbank. How long does it realistically take for local SEO to start generating calls from Google Maps?',
          acceptedAnswer: { '@type': 'Answer', text: 'For a new business with no existing GBP history, the honest timeline is 90 to 180 days before Map Pack rankings become consistent for competitive category queries. The first 30 days cover GBP verification, category setup, and initial citation building. Full competitive Map Pack positioning in professional service categories typically requires 6 months of consistent work.' },
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
  { title: 'Google Business Profile optimization', body: 'Your GBP is the primary ranking signal for the Map Pack. We optimize every field — categories, service area, hours, attributes — manage photo strategy, build out Q&A, and maintain the posting cadence that keeps the profile active in Google\'s eyes.' },
  { title: 'NAP citation audit & repair', body: 'Name, Address, Phone — any mismatch across directories erodes Google\'s confidence in your entity. We audit your citations on Google, Yelp, Bing Places, Apple Maps, and 30+ vertical directories, then correct every inconsistency.' },
  { title: 'Review velocity management', body: 'Review count and recency are direct Map Pack ranking signals. We build a repeatable review acquisition workflow that gets satisfied clients to leave Google reviews — systematically and in compliance with Google\'s policies.' },
  { title: 'LocalBusiness schema markup', body: 'Schema markup tells Google exactly what your business is, where it operates, and what services it provides — in a format crawlers can process without ambiguity. We implement this directly in the code, not through a plugin.' },
  { title: 'Location page architecture', body: 'For businesses serving multiple Burbank neighborhoods or surrounding San Fernando Valley cities, we build location-specific pages with correct entity structure, local content depth, and internal link equity routing.' },
  { title: 'Competitor gap analysis', body: 'We read the Map Pack for your target queries and document exactly which signals the ranking businesses have that you don\'t — GBP completeness, citation count, review velocity, schema — then close those gaps in order of impact.' },
];

const STEPS = [
  'Map Pack audit — we pull your current rankings for target queries in the Burbank 91501–91510 market and compare your GBP against the businesses that outrank you',
  'GBP diagnostic — every field, category, photo, Q&A entry, and posting history reviewed against the current optimization standard for your vertical',
  'Citation audit — existing NAP data checked across all major directories; every mismatch documented before any correction is made',
  'On-site local signals — LocalBusiness schema, location page content, and internal link architecture implemented or corrected',
  'Review acquisition workflow — a repeatable process for requesting reviews from satisfied clients, calibrated to your business type and customer relationship',
  'Monthly rank reporting — Map Pack position tracking for all target queries in the Burbank market, with plain-language explanations of what moved and why',
];

const FAQS_LIST = [
  { q: 'We were in the top three on Google Maps for our main category for over a year, then one update knocked us out of the Map Pack completely. How do we find out what happened?', a: 'A sudden Map Pack drop after a Google update usually traces to one of three things. First, proximity weighting changes — Google periodically adjusts how much weight it gives to the searcher\'s location versus a business\'s configured service area, which can move rankings for businesses on the edge of their target zones. Second, GBP category reconfiguration — if Google updated its business category taxonomy and your category was deprecated or split, your relevance signal drops until you reconfigure. Third, review recency — if you had a burst of reviews earlier and they have since aged without new ones, the velocity signal decays. The diagnostic is a side-by-side comparison of your current GBP data versus your competitors who held their positions through the update.' },
  { q: 'We ask every happy customer to leave us a Google review and almost nobody follows through. How do you actually improve that conversion rate?', a: 'The friction is almost always in the request itself — asking verbally at the point of service, or sending a general follow-up email without a direct link, produces single-digit conversion rates. What works: send a follow-up SMS within 24 hours of service with a direct Google review link that opens the compose screen. Ask at the right moment in the experience, not at checkout when the customer is focused on leaving. The practices achieving 4 to 6 reviews per month consistently have an automated SMS follow-up sequence tied to their scheduling or payment system. We build that workflow as part of the local SEO engagement.' },
  { q: 'Our NAP looks consistent everywhere we can see, but Google sometimes shows our old address or an outdated phone number. What is causing that?', a: 'Google aggregates business data from multiple sources — and not all of those sources are directories you can see or edit directly. Data aggregators like Data Axle, Neustar Localeze, and Foursquare feed business information into Google\'s Knowledge Graph, and if those aggregators have cached your old data, Google may still pull it even after you updated your GBP directly. The fix requires a full citation audit that goes beyond the visible directories to the aggregator layer, correcting records at the source so they propagate correctly into Google\'s entity graph.' },
  { q: 'We are a new business in Burbank. How long does it realistically take for local SEO to start generating calls from Google Maps?', a: 'For a new business with no existing GBP history, the honest timeline is 90 to 180 days before Map Pack rankings become consistent for competitive category queries. The first 30 days focus on GBP verification, category setup, and initial citation building. By day 60 to 90, with consistent GBP posting activity, early citation signals, and the first review velocity building, visibility starts expanding. Full competitive Map Pack positioning in Burbank\'s professional service categories typically requires 6 months of consistent work.' },
];

export default function LocalSeoServicesBurbankPage() {
  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Burbank"
      heroTitle="Local SEO Services Burbank: Map Pack Placement, Month to Month"
      heroSubtitle="Gobiya's Burbank local SEO service is a month-to-month program covering Google Business Profile optimization, NAP citation audits, review velocity management, and local schema markup for businesses in the Burbank 91501–91510 ZIP corridor. The service targets Map Pack placement for category searches on San Fernando Boulevard and in the Burbank Media District."
      tags={[
        'Local SEO',
        'Map Pack',
        'Google Business Profile',
        'Citation Authority',
        'Burbank, CA',
        'Reputation Systems'
      ]}
      relevantSlugs={[
        'multi-location-websites-for-franchises',
        'how-do-b2b-companies-use-seo-to-generate-predictable-revenue',
        'what-are-ai-seo-services'
      ]}
      introHeading="What Local SEO Services in Burbank Actually Include"
      introParagraphs={[
        "Local SEO services in Burbank cover the four technical signals Google uses to determine Map Pack rankings: Google Business Profile authority, NAP citation consistency across directories, review velocity and recency, and local schema markup. If any one of these breaks down, the others can't compensate.",
        "Burbank's commercial geography makes local SEO more competitive than most people expect. The corridor from downtown Burbank through Toluca Lake handles a concentrated mix of entertainment-adjacent businesses, medical and dental practices, home services, and professional services — all competing for the same Map Pack real estate.",
        "None of these are hard to fix once identified. The issue is that most businesses — and many agencies — don't run a methodical audit before touching anything. We do a full signal read before making any changes, which is why our technical SEO audit is the entry point for every local campaign."
      ]}
      stats={STATS}
      servicesLabel="What's included"
      servicesTitle="What Burbank Local SEO Services Include"
      services={SERVICES}
      spokes={SPOKES}
      spokesTitle="How we cover the full local SEO services Burbank search landscape"
      spokesLabel="Query fan-out cluster"
      useHeroForm={true}
      faqs={FAQS_LIST}
    >
      {/* Burbank vs LA Context */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Market context</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Local SEO services in Los Angeles vs Burbank — why the market is different
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Burbank operates as its own sub-market within Greater Los Angeles, with distinct search patterns shaped by industry concentration. Warner Bros., Disney, NBC, and Nickelodeon all have Burbank campuses. That means the B2B and consumer search landscape around Burbank differs significantly from, say, the Westside or downtown LA. Medical and dental practices in Burbank compete not just with Burbank providers but with Glendale, Pasadena, and North Hollywood for the same patient searches.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Searching "local seo services in Los Angeles" will return agencies that technically serve Burbank but may have never run a campaign for a business operating in the 91501–91510 ZIP codes. The GBP category performance, citation source weighting, and competitor landscape in Burbank are specific enough that broad LA expertise doesn't automatically translate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 bg-gray-50 p-6 md:p-8 mb-8">
            <div>
              <strong className="font-mono text-xs text-gray-900 block mb-4 uppercase tracking-widest">Los Angeles (broad)</strong>
              <ul className="space-y-3">
                {[
                  'High competition across all verticals',
                  'Generic local SEO tactics still get results in some niches',
                  'Agency supply is dense — harder to evaluate',
                  'Broad LA queries ("dentist Los Angeles") are extremely competitive'
                ].map((p, j) => (
                  <li key={j} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-gray-400">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong className="font-mono text-xs text-gray-900 block mb-4 uppercase tracking-widest">Burbank (specific)</strong>
              <ul className="space-y-3">
                {[
                  'Entertainment-adjacent B2B market with distinct signals',
                  'Neighborhood-level queries ("dentist near Warner Center") are winnable with correct GBP signals',
                  'Local SEO expertise is rarer — specialist advantage is real',
                  'ZIP-code targeting in GBP service area matters significantly'
                ].map((p, j) => (
                  <li key={j} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-green-600">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Our <a href="/on-page-seo-los-angeles" className="text-green-600 font-semibold hover:underline">on-page SEO work in Los Angeles</a> covers the broader metro. For Burbank specifically, we bring the same technical depth plus 12+ years of active client work in the San Fernando Valley market. See the <a href="/local-seo-company-burbank" className="text-green-600 font-semibold hover:underline">Burbank practice profile</a> for market-specific detail.
          </p>
        </div>
      </section>

      {/* 6 Stage Campaign */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">How we run a local SEO campaign</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Map Pack audit to ranking in 6 stages
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every stage is sequenced to close the highest-impact gaps first. Local SEO compounds — GBP + citations + reviews + schema working together produces faster results than any one signal alone.
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

      {/* Burbank open now details */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Available now</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Local SEO services Burbank, open now — book an online appointment today
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you found this page because you need local SEO help now — a GBP suspension, a Map Pack drop after a Google update, a new business launching in Burbank and needing local visibility from day one — the fastest path forward is a pre-read consultation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Online appointments are available through our booking page. A pre-read is a 30–45 minute session where we audit your current GBP, citation profile, and competitive position in the Burbank market before you commit to anything. You'll know exactly what's causing the problem and what we'd fix.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              For urgent GBP suspensions or sudden Map Pack disappearances, reach us directly. Those situations need a same-day read, not a scheduled consultation.
            </p>
            <div className="flex flex-col gap-4">
              <a href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors self-start">
                Book online — local SEO consultation
              </a>
              <span className="text-xs text-gray-500">Or contact directly: <a href="mailto:hello@gobiya.com" className="text-green-600 font-semibold">hello@gobiya.com</a> — <a href="tel:3237441338" className="text-green-600 font-semibold">323-744-1338</a></span>
            </div>
          </div>

          <div className="border border-gray-200 bg-white">
            {[
              { label: 'Phone', val: '323-744-1338', href: 'tel:3237441338' },
              { label: 'Email', val: 'hello@gobiya.com', href: 'mailto:hello@gobiya.com' },
              { label: 'Online booking', val: 'gobiya.com/book', href: '/book' },
              { label: 'Hours', val: 'Mon—Fri, 9am—6pm PT', href: null },
              { label: 'Service area', val: 'Burbank 91501–91510 + greater LA', href: null },
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

      {/* Case studies highlight */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" data-anim="up">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">In the field</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              200+ qualified leads a month — built on local SEO and local intent.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A home-services remodeling client in the greater LA market went from inconsistent inbound to 200+ qualified leads per month. The foundation was hyper-local SEO: 47 commercial keywords ranked, Map Pack positions held across multiple core update cycles, and a <a href="/performance/native-crm-agency" className="text-green-600 font-semibold hover:underline">native CRM integration</a> that tracked every lead from first search to booked job.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              The same methodology applies to Burbank-specific campaigns — the market is different, the signals are the same.
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

          <div className="bg-white border border-gray-200 p-8 flex flex-col justify-center gap-6">
            {[
              { label: 'Qualified leads per month', val: '200+' },
              { label: 'Commercial keywords ranked', val: '47' },
              { label: 'Market', val: 'Greater Los Angeles, home services' },
              { label: 'Rankings held across core updates', val: 'Yes' },
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
