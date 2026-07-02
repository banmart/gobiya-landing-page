import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'We have been trying to improve our Google Maps ranking for almost two years. We have done GBP updates, added reviews, and our position has barely moved. What are we actually missing?',
    a: 'At two years with no meaningful movement, the issue is almost always a GBP category configuration error, NAP inconsistency at the aggregator layer (Data Axle, Neustar Localeze, and Foursquare still have your old data overriding your corrections), or a competitive authority gap (your competitors have local link signals from Glendale Chamber of Commerce and city citations that you have not built). Adding more reviews without fixing the underlying category or entity problem produces minimal ranking movement.'
  },
  {
    q: 'We are opening a second location in Glendale. How do we build visibility for it without hurting our existing location\'s rankings?',
    a: 'Treat each location as a distinct entity: its own GBP listing, its own dedicated website page with unique content, its own citation profile, and its own local phone number. The mistake that causes cannibalization is sharing a phone number, address range, or website landing page between locations. Each listing\'s service area should also be distinct enough that the two listings are not competing for the same geographic queries.'
  },
  {
    q: 'We get leads from our website but almost nothing comes through Google Maps even for searches right in our neighborhood. Why would those two perform so differently?',
    a: 'Website leads and Map Pack calls are driven by completely different systems. Your website gets leads because people know your name or click a paid ad. Map Pack visibility requires a separate set of signals: GBP category accuracy, proximity weighting, NAP citation consistency, and review recency. Your website SEO does not automatically improve your Maps ranking — the local signal layer requires its own dedicated work.'
  },
  {
    q: 'We are a service-area business with no physical storefront. Can we still rank in Google Maps for Glendale searches?',
    a: 'Yes, but with a specific configuration. Service-area businesses without a public-facing address can rank in the Map Pack if their GBP is configured correctly as an SAB, with the address hidden and the service area defined by city or ZIP. Hiding your address actually improves Map Pack eligibility for SABs rather than hurting it. Google does not penalize the absence of a physical address for SABs as long as the listing is correctly configured as one.'
  }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Local SEO Glendale",
      "url": "https://www.gobiya.com/local-seo-glendale",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Local SEO services for Glendale businesses. We engineer Google Map Pack dominance, GBP optimization, and citation authority for businesses on Brand Boulevard and throughout the Glendale, CA market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q182749" },
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q188539" },
        { "@type": "City", "name": "La Crescenta", "sameAs": "https://www.wikidata.org/wiki/Q1799048" },
        { "@type": "City", "name": "Montrose", "sameAs": "https://www.wikidata.org/wiki/Q2883042" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/in/stevemartingobiya/",
        "https://m.yelp.com/biz/gobiya-los-angeles-5"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Google Business Profile Audit",
    short: "Correct categories, service areas, photos, and Q&A signals.",
    detail: "Your GBP is the primary ranking signal for Glendale Map Pack placement — and most profiles are misconfigured in ways that cost rankings invisibly. Wrong primary category. Inconsistent service areas. Missing products and services sections. Outdated hours. We do a forensic GBP review and correct every signal Google uses to evaluate relevance, prominence, and proximity for your target Glendale queries."
  },
  {
    title: "02. NAP Consistency & Citation Cleanup",
    short: "Align your name, address, and phone across 40+ directory sources.",
    detail: "NAP inconsistency is one of the most common reasons Glendale businesses underperform in local results despite good reviews and a strong GBP. If your business name appears as 'Acme LLC' on your website, 'Acme, LLC.' on Yelp, and 'Acme Limited' on Bing Places, Google's confidence in your entity decreases. We audit and correct your NAP signal across 40+ authoritative directories including Yelp, Apple Maps, Bing Places, Facebook, and industry-specific citation sources."
  },
  {
    title: "03. Review Velocity & Reputation Engineering",
    short: "Build a sustainable review generation system targeting 4–6 per month.",
    detail: "Review count, velocity, and recency are the three review signals Google weighs most heavily in local rankings. The competitive threshold in Glendale's professional services market is 4–6 new reviews per month to outpace competitors and stay current. We build review generation systems tied to your natural customer touchpoints — post-appointment follow-ups, QR codes at point of sale, and automated SMS/email sequences — without violating Google's review policies."
  },
  {
    title: "04. Local Schema & Entity Graph",
    short: "Inject LocalBusiness JSON-LD and build your Glendale entity footprint.",
    detail: "Google verifies local businesses through a combination of on-page structured data and off-page entity signals. We inject LocalBusiness JSON-LD schema with Glendale-specific coordinates, service areas, and opening hours directly into your site's server-rendered HTML. We then build the off-page entity footprint — Wikidata entry if applicable, structured citations in authoritative directories, and local link acquisition from Glendale Chamber of Commerce and adjacent city resources."
  }
];

const ORIGIN_CARDS = [
  {
    title: 'The Highest-Density Retail Corridor in LA County',
    label: 'Brand Boulevard',
    body: "Brand Boulevard from Broadway to the Americana at Brand runs through one of the densest concentrations of retail, medical, legal, and professional services in Los Angeles County. Every business on that strip competes for the same local search queries — and the Map Pack only shows three. Winning requires more than a complete GBP: it requires a higher review score, more recent reviews, stronger citation authority, and more accurate entity data than every competitor within the serving radius.",
  },
  {
    title: 'A Multilingual Market With Distinct Search Behavior',
    label: 'Demographics',
    body: "Glendale has the largest Armenian-American population outside Armenia, a substantial Korean-American business community, and a significant Hispanic population across the southern neighborhoods. These demographics search differently — in different languages, through different platforms, and with different proximity expectations. A local SEO strategy that ignores multilingual GBP content, non-English review signals, and platform diversity beyond Google (Naver, Yelp, Apple Maps) leaves material local visibility on the table.",
  },
  {
    title: 'Burbank, La Cañada, and Pasadena Bleed Into Glendale Searches',
    label: 'Adjacent Markets',
    body: "Glendale's service area naturally extends into Burbank, La Crescenta, Montrose, and La Cañada Flintridge. Buyers in those communities regularly search for Glendale businesses, and Glendale businesses that structure their service area data correctly in Google Business Profile and schema markup capture that adjacent demand. Incorrectly configured service areas silently exclude thousands of relevant monthly searches. We set these boundaries precisely.",
  },
  {
    title: '312% Map Pack Call Growth for a Glendale Services Firm',
    label: 'Results',
    body: "One of our Glendale professional services clients saw a 312% increase in local map-pack phone calls and B2B consultations after we restructured their local entity graph, corrected NAP across 40+ sources, and secured high-authority citations from Glendale-specific directories. The work took 90 days. The competitive gap they closed had been costing them an estimated 15–20 qualified inquiries per month. That is the difference between treating local SEO as a setup task and treating it as an engineered system.",
  },
];

const CAPABILITIES = [
  {
    title: 'Google Business Profile Optimization',
    body: 'GBP is the single highest-weight local ranking signal — and most Glendale businesses have critical errors in their profile without knowing it. Wrong primary category, missing service items, outdated hours, no products section, and zero GBP posts in the last 90 days all suppress Map Pack placement. We treat GBP as a living asset, not a one-time setup.',
  },
  {
    title: 'Citation Building & NAP Consistency',
    body: 'Google cross-references your business data across dozens of authoritative directories to verify your entity. A single character difference in your business name or a transposed phone digit creates a confidence gap that lowers your local ranking. We audit and correct your NAP signal across 40+ sources — Yelp, Apple Maps, Bing Places, Facebook, YellowPages, Foursquare, and vertical-specific directories relevant to Glendale\'s industry mix.',
  },
  {
    title: 'Review Generation & Velocity Management',
    body: 'In competitive Glendale categories — dental, medical, legal, financial services — the businesses that rank in positions 1–3 of the Map Pack maintain a steady review velocity of 4–8 new reviews per month, not just a high total count. Google\'s algorithm weights recency heavily: a business with 40 reviews and 6 in the last 30 days outranks one with 200 reviews and none in six months. We build systems that generate reviews from real customers at the right cadence.',
  },
  {
    title: 'Local Schema & Glendale Entity Mapping',
    body: 'On-page LocalBusiness schema with Glendale coordinates, service areas, and opening hours is the technical foundation that connects your website to your GBP entity in Google\'s local index. Without it, your site and your GBP listing may exist as separate, weakly connected signals. We inject server-rendered JSON-LD that ties both together into a single verified entity.',
  },
];

export default function LocalSeoGlendalePage() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Glendale"
      heroTitle="Local SEO Glendale: Map Pack Dominance on Brand Boulevard"
      heroSubtitle="Gobiya has served Glendale businesses since 2012. We engineer Google Business Profile optimization, Map Pack dominance, citation authority, and review velocity systems for local businesses."
      tags={[
        'Local SEO',
        'Map Pack',
        'Google Business Profile',
        'Glendale, CA',
        'Reputation Systems',
        'Multilingual SEO'
      ]}
      relevantSlugs={[
        'multi-location-websites-for-franchises',
        'how-do-b2b-companies-use-seo-to-generate-predictable-revenue',
        'what-are-ai-seo-services'
      ]}
      introHeading="Why Glendale Local SEO Is a Different Problem"
      introParagraphs={[
        "Glendale is not a suburb that follows generic local SEO playbooks. Its business geography, demographic concentration, and competitive density create a specific set of ranking dynamics that most agencies do not understand."
      ]}
      servicesLabel="Market Intelligence"
      servicesTitle="The Landscape of Local Search"
      services={ORIGIN_CARDS.map(c => ({ title: c.title, body: c.body }))}
      faqs={FAQ_ITEMS}
      useHeroForm={true}
    >
      {/* CAPABILITIES SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Service Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Local SEO Services for Glendale Businesses
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            The four-layer local SEO system we deploy for every Glendale engagement — built around the ranking signals that actually determine Map Pack position, not vanity metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <div key={i} className="p-10 border border-gray-200 bg-white" data-anim="up">
              <span className="font-mono text-xs text-gray-400 block mb-4">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{cap.title}</h3>
              <p className="text-gray-500 leading-relaxed">{cap.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MULTILINGUAL LOCAL SEO */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl mx-auto" data-anim="up">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-4">Glendale-specific signal</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Multilingual GBP Optimization for the Glendale Market
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Glendale has the largest concentration of Armenian-Americans in the United States and a substantial Korean-American business community along the Wilshire and Western corridor. A significant share of high-intent local searches in Glendale happen in Armenian and Korean — not just English. Google Business Profiles that include the correct primary language, secondary language support, and category translations for these communities rank materially higher for non-English local queries than profiles that ignore them.
            </p>
            <p>
              We build GBP profiles with language-appropriate business descriptions, ensure citation consistency across Armenian and Korean directories active in the Glendale market, and configure review request workflows that reach both English and non-English speaking customers. For professional services — dental, medical, legal, financial — this is often the fastest Map Pack ranking lever available, because very few competitors have optimised for it.
            </p>
            <p>
              This is not a generic local SEO tactic. It is specific to Glendale's market and the demographic data that shapes its search behaviour. If your competitors haven't done it, this gap is yours to close.
            </p>
          </div>
        </div>
      </section>

      {/* CHECKLIST SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Engagement Sequence</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              How We Run a Glendale Local SEO Engagement
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              The four-step sequence we execute for every Glendale client — from initial GBP audit to full citation and schema deployment.
            </p>

            <div className="flex flex-col gap-2">
              {AUDIT_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`text-left px-6 py-4 border transition-colors flex justify-between items-center ${activeChecklist === idx ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'}`}
                  onClick={() => setActiveChecklist(idx)}
                >
                  <span className="font-medium text-sm">{step.title}</span>
                  <svg viewBox="0 0 24 24" fill="none" width="14" height="14" className={activeChecklist === idx ? 'text-white' : 'text-gray-400'}>
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div data-anim="up" className="flex flex-col justify-center">
            <div className="border border-gray-200 bg-white flex flex-col h-full">
              <div className="px-6 py-4 border-b border-gray-200 font-mono text-[10px] text-gray-500 uppercase tracking-widest bg-gray-50">
                local-seo-protocol.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Run this audit on your Glendale business
                  <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED CLUSTER SECTION */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">SEO &amp; Discoverability Cluster</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Related Guides &amp; Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            Resources from our local SEO and discoverability practice that directly support Glendale businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-gray-200 bg-gray-50" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Service</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/performance/seo-discoverability-agency" className="hover:text-gray-600">SEO &amp; Discoverability Agency</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The full-stack parent service covering Technical SEO, local Map Pack engineering, GEO, and organic pipeline systems.</p>
            <a href="/performance/seo-discoverability-agency" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">View practice →</a>
          </div>

          <div className="p-8 border border-gray-200 bg-gray-50" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Guide</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/insights/google-business-profile-optimization" className="hover:text-gray-600">GBP Optimization</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The forensic GBP audit checklist covering profile recovery, suspension appeals, category correction, and service area configuration.</p>
            <a href="/insights/google-business-profile-optimization" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">Read guide →</a>
          </div>

          <div className="p-8 border border-gray-200 bg-gray-50" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Guide</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/insights/local-seo" className="hover:text-gray-600">Local SEO Strategy</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The complete local SEO playbook for 2026 — covering the full Map Pack ranking framework and review velocity benchmarks.</p>
            <a href="/insights/local-seo" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">Read guide →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5vw] bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto p-12 bg-white border border-gray-200 flex flex-col md:flex-row gap-8 items-center" data-anim="up">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Glendale Local SEO Engagement</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We run a 15-minute live local SEO session for Glendale businesses — GBP audit, NAP consistency check, Map Pack gap analysis, and review velocity benchmark against your top three local competitors. No slides, no pitch. Just a direct read on where your business stands in local search and what it would take to reach position one.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="/book" className="px-8 py-4 bg-black text-white text-sm font-semibold tracking-wide uppercase hover:bg-gray-800 transition-colors">
              Book Glendale audit
            </a>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">15-min session · No commitment</span>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
