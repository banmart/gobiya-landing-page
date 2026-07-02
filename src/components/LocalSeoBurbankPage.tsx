import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'We show up in Google Search for our business name but we are barely visible on Google Maps for any category search. Why would those two perform so differently?',
    a: 'Branded search and Map Pack visibility are driven by completely different signals. Branded rankings come from your website\'s link authority for your business name. Map Pack visibility is driven by GBP category accuracy, proximity and service area configuration, and entity authority (NAP consistency, review velocity, local link signals). A business can rank number one for its own name and be completely absent from the Map Pack for category searches because those ranking systems are independent.'
  },
  {
    q: 'Our Google Business Profile was suspended with no warning. What is the first thing we should do and how long does reinstatement take?',
    a: 'Do not create a new listing — that almost always makes reinstatement harder. Diagnose the suspension type: soft suspensions (profile visible but unverifiable) often resolve with re-verification. Hard suspensions (listing completely removed) require a Business Reinstatement Request with supporting documentation. Policy violations require correcting the violation first. Timeline: soft suspensions resolve in 3 to 7 business days; hard suspensions typically take 2 to 4 weeks.'
  },
  {
    q: 'We have more five-star reviews than every competitor in our Burbank category, but we still rank below them in Google Maps. How is that possible?',
    a: 'Review count is one signal among many in the Map Pack algorithm — and often not the most decisive one. The businesses outranking you with fewer reviews are almost certainly winning on GBP category accuracy, service area configuration, NAP citation consistency, or local link authority. Review velocity also matters: 200 total reviews with none in 90 days loses to 40 reviews with 6 in the last 30 days.'
  },
  {
    q: 'We hired a local SEO agency in Burbank eight months ago and our Map Pack position has not moved. How do we tell if the work is actually happening?',
    a: 'Ask for GBP data. A legitimate local SEO campaign produces measurable GBP signal movement: GBP profile actions (calls, direction requests, website clicks) should increase month over month. Your agency should also show a before-and-after citation audit and demonstrate review velocity improvement. If none of those three things have moved in eight months, the engagement is not producing results.'
  }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Local SEO Company Burbank",
      "url": "https://www.gobiya.com/local-seo-company-burbank",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Local SEO company serving Burbank businesses. We engineer Google Map Pack dominance, Google Business Profile optimization, citation authority, and review velocity systems for businesses on San Fernando Boulevard and throughout the Burbank, CA 91501–91510 market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q188539" },
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q182749" },
        { "@type": "City", "name": "Toluca Lake", "sameAs": "https://www.wikidata.org/wiki/Q7818424" },
        { "@type": "City", "name": "Studio City", "sameAs": "https://www.wikidata.org/wiki/Q2340854" },
        { "@type": "City", "name": "North Hollywood", "sameAs": "https://www.wikidata.org/wiki/Q1434775" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
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
    short: "Diagnose category errors, service area gaps, and GBP signals suppressing your Burbank rank.",
    detail: "Your GBP is Google's primary ranking signal for Burbank Map Pack placement — and most profiles have critical errors that suppress visibility without any obvious warning. Wrong primary category, missing service items, incomplete service areas that exclude Toluca Lake and Studio City, zero GBP posts in the past 90 days. We perform a forensic GBP audit, correct every misconfiguration, and treat your profile as an active ranking asset — not a one-time setup task. For Burbank businesses in medical, legal, and professional services, the difference between a correctly configured and incorrectly configured GBP can span 5–8 Map Pack positions."
  },
  {
    title: "02. NAP Consistency & Citation Cleanup",
    short: "Align your business data across 40+ directories — Yelp, Apple Maps, Bing Places, and more.",
    detail: "NAP inconsistency is one of the most silent and damaging ranking problems in local SEO. When your business name, address, or phone number appears differently across Yelp, Apple Maps, Bing Places, Facebook, and industry directories, Google's entity confidence drops — and your Map Pack position follows. For Burbank businesses that have been operating for several years, citation drift is almost universal. We audit your NAP signal across 40+ authoritative sources and correct every divergence, building the consistent entity footprint Google uses to rank local businesses with confidence."
  },
  {
    title: "03. Review Velocity & Reputation Systems",
    short: "Build a sustainable review engine targeting 4–6 authentic reviews per month.",
    detail: "Review count matters less than review velocity in 2026. Google's local algorithm weights recency heavily — a Burbank business with 60 reviews and 5 in the last 30 days consistently outranks one with 200 reviews and none in six months. The competitive threshold in Burbank's professional services categories is 4–6 new reviews per month. We build review generation systems tied to your natural customer touchpoints — post-service follow-up sequences, QR codes at point of interaction, and automated SMS and email cadences — that generate authentic reviews from real customers within Google's policy guidelines."
  },
  {
    title: "04. Local Schema & Burbank Entity Graph",
    short: "Deploy LocalBusiness JSON-LD and build your verified Burbank entity footprint.",
    detail: "On-page schema and off-page entity signals work together to tell Google exactly who your business is, where it operates, and what it serves. We inject LocalBusiness JSON-LD schema directly into your site's server-rendered HTML with Burbank coordinates, service areas, opening hours, and service data — connecting your website entity to your GBP listing as a single verified record. We then build the off-page entity footprint: structured citations in authoritative directories, local link acquisition from Burbank Chamber of Commerce and adjacent city resources, and Wikidata entry construction where applicable. This is the infrastructure that powers sustainable Map Pack placement — and AI assistant responses for local Burbank queries."
  }
];

const ORIGIN_CARDS = [
  {
    title: 'The Entertainment Capital of Local Search',
    label: 'Media District',
    body: "Burbank hosts Warner Bros., Disney, NBCUniversal, and dozens of supporting production companies, talent agencies, and media services firms. This concentration creates a unique local search environment: buyers are sophisticated, searches are high-intent, and competition for the Map Pack in business services, legal, financial, and medical categories is genuinely fierce. Winning a top-three Map Pack position in Burbank requires more than a complete GBP — it requires a higher review score, stronger citation authority, and cleaner entity data than every competitor within your serving radius.",
  },
  {
    title: 'A Commercial Corridor With Dense Local Competition',
    label: 'San Fernando Blvd',
    body: "San Fernando Boulevard from downtown Burbank through the Media District is one of the highest-density commercial corridors in the San Fernando Valley. Medical, dental, legal, financial, and hospitality businesses compete for the same local intent queries — and Google's Map Pack only shows three. In this environment, the businesses that invest in systematic local SEO engineering hold the top positions; the ones that treat GBP as a one-time setup fall off the pack entirely.",
  },
  {
    title: 'Toluca Lake, Studio City, and Glendale Overlap Burbank Searches',
    label: 'Adjacent Markets',
    body: "Burbank's service area naturally extends into Toluca Lake, Studio City, North Hollywood, and Glendale. Buyers in those communities search for Burbank businesses regularly — and Burbank businesses that structure their service area data correctly in Google Business Profile and schema markup capture that adjacent demand. Incorrectly configured service areas silently exclude thousands of relevant monthly searches. We define these boundaries with precision.",
  },
  {
    title: '280% Map Pack Call Growth for a Burbank Services Business',
    label: 'Results',
    body: "A Burbank professional services client saw a 280% increase in Map Pack phone calls and consultation requests after we restructured their local entity graph, corrected NAP across 40+ directory sources, and secured local citations from Burbank-specific directories and the Burbank Chamber of Commerce. The full program ran 90 days. The competitive gap they closed had been costing them an estimated 12–18 qualified inquiries every month.",
  },
];

const CAPABILITIES = [
  {
    title: 'Google Business Profile Optimization',
    body: 'GBP is the single highest-weight local ranking signal — and the majority of Burbank businesses have critical errors in their profiles that suppress Map Pack visibility without any visible warning. Wrong primary category. Missing service items. Service areas that exclude Toluca Lake, Studio City, and North Hollywood. Outdated hours. Zero GBP post activity in the last 90 days. We treat GBP as a living ranking asset and manage it actively.',
  },
  {
    title: 'Citation Building & NAP Consistency',
    body: 'Google cross-references your business data across dozens of authoritative directories to verify your entity. A single character difference in your business name or a transposed phone digit creates a confidence gap that lowers local ranking. We audit and correct your NAP signal across 40+ sources — Yelp, Apple Maps, Bing Places, Facebook, YellowPages, Foursquare, and vertical-specific directories relevant to Burbank\'s industry mix.',
  },
  {
    title: 'Review Generation & Velocity Management',
    body: 'In competitive Burbank categories — dental, medical, legal, financial services, entertainment support — the businesses ranking in positions 1–3 of the Map Pack maintain a steady review velocity of 4–8 new reviews per month, not just a high total count. Google\'s algorithm weights recency heavily: a business with 50 reviews and 6 in the last 30 days consistently outranks one with 220 reviews and none in six months. We build systems that generate reviews from real customers.',
  },
  {
    title: 'Local Schema & Burbank Entity Mapping',
    body: 'On-page LocalBusiness schema with Burbank coordinates, service areas, and opening hours is the technical foundation that connects your website to your GBP entity in Google\'s local index. Without it, your site and your GBP listing may function as separate, weakly connected signals — reducing Google\'s confidence in both. We inject server-rendered JSON-LD that ties them together as a single verified entity.',
  },
];

const RATED_CARDS = [
  {
    title: 'Technical Depth Over Dashboard Access',
    label: 'Engineering',
    body: 'Top-rated local SEO in Burbank means working at the technical layer of Google\'s algorithm — not just logging into your GBP and making surface-level edits. The agencies that consistently produce Map Pack results for competitive Burbank categories do GBP data layer work, inject server-rendered schema, and correct entity graph signals at the code level. Agencies that hand you a login and a monthly rank report are managing, not engineering.',
  },
  {
    title: 'Reporting Tied to Map Pack Position and Calls',
    label: 'Transparency',
    body: 'A top-rated local SEO company reports on the metrics that matter to a Burbank business owner: Map Pack position for target queries, GBP call volume, GBP direction requests, and review velocity benchmarks against your direct competitors. If your monthly report is full of impressions, domain authority scores, and keyword rankings without Map Pack call data, the program is measuring the wrong thing.',
  },
  {
    title: 'Burbank Market Fluency, Not Generic Templates',
    label: 'Local Knowledge',
    body: 'The Burbank market has specific competitive dynamics that do not show up in generic local SEO playbooks. The media industry concentration creates unusual competitor profiles. The adjacency to Glendale and North Hollywood means service area configuration matters more than in most markets. The professional services density on San Fernando Boulevard creates genuinely competitive Map Pack environments.',
  },
  {
    title: 'No 12-Month Contracts Built on False Promise',
    label: 'Accountability',
    body: 'Many agencies in the Burbank market lock clients into 12-month contracts before delivering any meaningful work, then rely on inertia to keep the engagement alive. We operate on shorter initial engagement windows with clear deliverables — GBP audit and correction, NAP cleanup across 40+ sources, review velocity system deployment, and schema injection — before asking for a long-term commitment.',
  },
];

export default function LocalSeoBurbankPage() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Burbank"
      heroTitle="Local SEO Company Burbank: Map Pack Dominance & Review Velocity"
      heroSubtitle="Gobiya is a local SEO company serving Burbank, Toluca Lake, and Studio City. Established in 2010, we engineer Google Business Profile optimization, Map Pack dominance, citation authority, and review velocity systems for local businesses."
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
      introHeading="Why Burbank Local SEO Is a Different Problem"
      introParagraphs={[
        "Burbank is not a generic suburban market. Its entertainment industry concentration, professional services density, and adjacency to major media studios create specific local search dynamics that most agencies simply do not understand."
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
            Local SEO Services for Burbank Businesses
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            The four-layer local SEO system we deploy for every Burbank engagement — engineered around the ranking signals that actually determine Map Pack position, not vanity metrics.
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

      {/* CHECKLIST SECTION */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Engagement Sequence</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              How We Run a Burbank Local SEO Engagement
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              The four-step sequence we execute for every Burbank client — from the initial GBP audit through full citation cleanup and schema deployment.
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
            <div className="border border-gray-200 bg-gray-50 flex flex-col h-full">
              <div className="px-6 py-4 border-b border-gray-200 font-mono text-[10px] text-gray-500 uppercase tracking-widest bg-gray-100">
                burbank-local-seo-protocol.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Run this audit on your Burbank business
                  <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATED CARDS SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">What "Top Rated" Actually Means</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Top Rated Local SEO Company in Burbank: What to Look For
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            The phrase gets used loosely. Here is what separates a genuinely top-rated local SEO company from one that just ranks for the term.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RATED_CARDS.map((cap, i) => (
            <div key={i} className="p-10 border border-gray-200 bg-white" data-anim="up">
              <span className="font-mono text-xs text-gray-400 block mb-4">{cap.label}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{cap.title}</h3>
              <p className="text-gray-500 leading-relaxed">{cap.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED CLUSTER SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">SEO &amp; Discoverability Cluster</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Related Guides &amp; Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            Resources from our local SEO and discoverability practice that directly support Burbank businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-gray-200 bg-white" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Service</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/performance/seo-discoverability-agency" className="hover:text-gray-600">SEO &amp; Discoverability Agency</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The full-stack parent service covering Technical SEO, local Map Pack engineering, GEO, and organic pipeline systems.</p>
            <a href="/performance/seo-discoverability-agency" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">View practice →</a>
          </div>

          <div className="p-8 border border-gray-200 bg-white" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Location</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/local-seo-glendale" className="hover:text-gray-600">Local SEO Glendale</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Our Glendale local SEO practice covering the Brand Boulevard corridor, GBP optimization, and NAP consistency for businesses.</p>
            <a href="/local-seo-glendale" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">View Glendale →</a>
          </div>

          <div className="p-8 border border-gray-200 bg-white" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Guide</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/insights/local-seo" className="hover:text-gray-600">Local SEO Strategy</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The complete local SEO playbook for 2026 — covering the full Map Pack ranking framework, review velocity benchmarks, and citation building hierarchy.</p>
            <a href="/insights/local-seo" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">Read guide →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5vw] bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto p-12 bg-gray-50 border border-gray-200 flex flex-col md:flex-row gap-8 items-center" data-anim="up">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Burbank Local SEO Engagement</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We run a 15-minute live local SEO session for Burbank businesses — GBP audit, NAP consistency check, Map Pack gap analysis, and review velocity benchmark against your top three local competitors. No slides, no pitch. Just a direct read on where your business stands in local search and exactly what it would take to reach position one in the Burbank Map Pack.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="/book" className="px-8 py-4 bg-black text-white text-sm font-semibold tracking-wide uppercase hover:bg-gray-800 transition-colors" id="burbank-footer-book-cta">
              Book Burbank audit
            </a>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">15-min session · No commitment</span>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
