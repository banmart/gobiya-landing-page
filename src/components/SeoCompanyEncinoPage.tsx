import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'We have worked with two different SEO agencies over the past two years and neither one moved our rankings. What are the signs an agency is actually doing real work?',
    a: 'The most reliable signal is whether they can show you what they changed and where. A legitimate SEO engagement produces visible deliverables: a technical audit with specific issues documented and a changelog showing which ones were fixed, content pieces live on your site targeting specific queries, and link or citation acquisitions you can verify independently. If your agency sends monthly reports showing rankings and traffic graphs without being able to show you what changed in the site to produce those changes, the work is either not happening or happening at a cosmetic level.'
  },
  {
    q: 'We are a professional services firm in Encino. We are not sure whether to focus on local SEO for Encino specifically or on broader national content SEO. Which comes first?',
    a: 'Start with where your revenue actually comes from. If your clients are primarily within the San Fernando Valley, local SEO targeting Map Pack and local organic results for Encino, Tarzana, Sherman Oaks, and Woodland Hills queries has a much faster path to new client acquisition than national content SEO. Local buyers searching for an attorney or financial advisor in Encino have high purchase intent. National content SEO builds domain authority over time but rarely produces near-term client acquisition for a regional professional services firm.'
  },
  {
    q: 'We need organic traffic but we also need leads right now. How do we run Google Ads and SEO at the same time without wasting money?',
    a: 'Run them as complementary channels, not competing ones. Google Ads should target your highest-intent queries right now — where a buyer is actively looking and ready to contact someone today. SEO should target the broader research and comparison queries where the buyer is not yet ready to pay for a click. The waste happens when both channels target the exact same queries — you end up paying for clicks on branded terms that your organic ranking would have captured for free.'
  },
  {
    q: 'Our last SEO agency promised first-page results in 90 days and nothing happened by day 180. What is a realistic timeline for SEO to actually start working?',
    a: 'Ninety days is not a realistic timeline for first-page results in any competitive Encino professional services category. The honest timeline is 6 to 12 months for sustained organic rankings in categories like legal, financial advisory, medical, or real estate. In that period, the first 90 days are foundational: technical fixes, keyword architecture, and on-page optimization. Rankings typically start moving meaningfully at months 4 to 6 for lower-competition queries and at months 8 to 12 for the highest-value terms. Ask any agency to show you actual historical client ranking timelines, not projections.'
  }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — SEO Company Encino",
      "url": "https://www.gobiya.com/seo-company-encino",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "Technical SEO company serving Encino and the San Fernando Valley. We engineer Google visibility, AI citations, and organic pipeline systems for businesses on Ventura Boulevard and throughout the 91316 market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Encino", "sameAs": "https://www.wikidata.org/wiki/Q678774" },
        { "@type": "City", "name": "Sherman Oaks", "sameAs": "https://www.wikidata.org/wiki/Q2272430" },
        { "@type": "City", "name": "Tarzana", "sameAs": "https://www.wikidata.org/wiki/Q2454060" },
        { "@type": "City", "name": "Woodland Hills", "sameAs": "https://www.wikidata.org/wiki/Q2010869" },
        { "@type": "AdministrativeArea", "name": "San Fernando Valley", "sameAs": "https://www.wikidata.org/wiki/Q857765" }
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
    title: "01. Technical Crawl Audit & Architecture Fix",
    short: "Resolve canonical issues, crawl blocks, and redirect chains.",
    detail: "Most Encino business websites have technical SEO problems they are not aware of — duplicate canonicals, blocked JavaScript rendering, slow server response times, broken internal link structures. These issues suppress rankings invisibly. We run a full crawl audit using server log analysis and screaming frog crawl data, isolate every technical barrier Googlebot encounters, and execute direct code-level fixes. Not plugin recommendations — actual fixes in the codebase."
  },
  {
    title: "02. Keyword Architecture & Intent Mapping",
    short: "Map commercial intent clusters to your Encino market and buyer stages.",
    detail: "Generic keyword research produces traffic that does not convert. For Encino professional services and B2B businesses, the commercial queries that produce revenue are typically low-volume, high-specificity terms — 'estate attorney Encino,' 'financial advisor Ventura Boulevard,' 'dental implants 91316.' We build a keyword architecture organized by buyer intent stage and buying committee role, so every page on your site targets a specific query type with a specific conversion action. This is the foundation of a program that generates pipeline, not just visits."
  },
  {
    title: "03. On-Page Optimization & Schema Injection",
    short: "Align page architecture, entity markup, and content to target queries.",
    detail: "On-page optimization at the technical level means more than title tags and meta descriptions. We align heading structure, internal linking, semantic entity density, and structured data across every target page — and we inject LocalBusiness, Service, and FAQPage JSON-LD schema server-side so Google and AI engines can parse your entity graph without rendering JavaScript. For Encino businesses targeting local commercial queries, the schema layer is often the difference between ranking in position 4–7 and ranking in the Map Pack."
  },
  {
    title: "04. Authority Building & Off-Page Signals",
    short: "Acquire Encino-relevant links and citations that build domain authority.",
    detail: "Domain authority in the San Fernando Valley market is built through a specific hierarchy: local citations from Encino Chamber of Commerce and LA County business directories, industry-vertical links from trade publications and association sites, and editorial mentions from regional news and professional networks. We do not use link farms, private blog networks, or scaled outreach that violates Google's link spam policies. Every link we build for Encino clients is a signal that survives algorithm updates."
  }
];

const ORIGIN_CARDS = [
  {
    title: 'The Valley\'s Most Competitive Commercial Corridor',
    label: 'Ventura Boulevard',
    body: "The stretch of Ventura Boulevard running through Encino is one of the highest-density concentrations of professional services in the San Fernando Valley. Attorneys, financial advisors, medical practices, dental offices, and real estate firms all compete for the same high-intent local queries. Every category has at least four to six established competitors with domain histories stretching back 10+ years. Outranking them requires more than a title tag audit — it requires rebuilding your technical authority from the crawl layer up.",
  },
  {
    title: 'High-Value Buyers Who Research Before They Call',
    label: 'Buyer Profile',
    body: "Encino's median household income is among the highest in the San Fernando Valley — which means the buyers searching for services here are research-oriented, comparison-driven, and hard to win on price alone. They read the first three search results, check reviews, and look for authority signals before picking up the phone. An SEO company that delivers surface-level rankings without the content depth and trust signals to convert that traffic is billing you for visibility you cannot monetize.",
  },
  {
    title: 'Adjacent Markets Create Search Cannibalization',
    label: 'Competition Pattern',
    body: "Sherman Oaks, Studio City, Tarzana, and Woodland Hills all have competing businesses targeting the same Ventura Blvd queries. Without a deliberate geographic content strategy, Encino businesses often find their rankings diluted by adjacent competitors whose pages target overlapping service areas. We structure service area pages, LocalBusiness schema, and internal link architecture to establish clear geographic authority for Encino without creating the cannibalization issues that come from sloppy multi-location page strategies.",
  },
  {
    title: 'Most Encino Businesses Have Never Had Real Technical SEO',
    label: 'The Real Gap',
    body: "The majority of Encino businesses that come to us have had SEO in some form before — a marketing agency that \"handled SEO\" as a line item, a freelancer running Semrush reports, a web developer who installed Yoast. None of those approaches touch the actual technical and entity-level work that moves rankings in a competitive local market. When we run an initial audit, we routinely find canonical split conflicts, missing schema, crawl budget waste on low-value pagination, and zero entity verification across Google's knowledge systems. The work has not been done. That is the gap.",
  },
];

const CAPABILITIES = [
  {
    title: 'Technical SEO Engineering',
    body: 'Technical SEO is the foundation every other SEO investment depends on. If Googlebot cannot crawl your site efficiently, if your pages have canonical conflicts, if your JavaScript rendering blocks indexation — no amount of content or link building recovers those losses. We execute code-level technical fixes: redirect chain resolution, server-side schema injection, Core Web Vitals optimization, crawl budget allocation, and structured data alignment. Not recommendations documents — actual changes to the code.',
  },
  {
    title: 'Content Architecture & Topical Authority',
    body: 'Topical authority is how Google decides which site deserves to rank for a category of queries — and it is built through a structured hub-and-spoke content architecture, not random blog posts. For an Encino law firm, that means a legal practice area hub with deep supporting content for each specialization. For a medical practice, it means condition and procedure pages with clinical depth. We map the full content architecture, identify topical gaps your competitors have not covered, and build the content structure that signals comprehensive subject-matter authority to Google.',
  },
  {
    title: 'AI Citation Engineering (GEO)',
    body: 'A growing share of service discovery now begins on ChatGPT, Gemini, and Perplexity rather than Google — particularly for high-consideration purchases like legal, financial, and medical services where buyers ask conversational questions before searching for a specific firm. We apply Generative Engine Optimization (GEO) — structuring your Encino service pages with claim-evidence-citation formatting, FAQ schema, and entity verification that AI engines cite when answering buyer queries.',
  },
  {
    title: 'Pipeline Attribution & Reporting',
    body: 'SEO reporting that stops at rankings and traffic is not useful to an Encino business owner trying to justify a monthly investment. We build reporting around pipeline metrics: qualified form submissions, tracked phone calls from organic search, revenue attributed to organic acquisition, and cost-per-lead comparisons against paid channels. When you can see that organic search is generating five qualified leads per month at $280 cost per lead versus $1,200 per lead from Google Ads, the SEO budget conversation changes entirely.',
  },
];

const CLUSTER_CARDS = [
  {
    label: 'Service',
    title: 'SEO & Discoverability Agency',
    link: '/performance/seo-discoverability-agency',
    body: 'The parent service practice covering Technical SEO, GEO, AI citations, and organic pipeline engineering. Encino SEO is a specific market application of this full-stack system.',
    cta: 'View practice →'
  },
  {
    label: 'Guide',
    title: 'Gobiya vs. Enterprise SEO Agencies',
    link: '/insights/gobiya-vs-enterprise-seo-agencies',
    body: 'An honest comparison covering where enterprise agency budgets actually go, what technical depth looks like at each price tier, and how to evaluate which type of firm matches your Encino growth stage.',
    cta: 'Read comparison →'
  },
  {
    label: 'Guide',
    title: 'Best SEO Agency for B2B: Evaluation Checklist',
    link: '/insights/best-seo-agency-for-b2b-brands',
    body: 'The 12-point checklist for evaluating an SEO company before signing. Covers contract terms to avoid, case study verification, technical depth signals, and the questions every Encino business owner should ask.',
    cta: 'Read checklist →'
  },
  {
    label: 'Guide',
    title: 'How B2B Companies Use SEO to Scale Pipeline',
    link: '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue',
    body: 'How to connect search clusters to pipeline revenue, map content to the buying committee, and scale inbound conversions from organic search. The strategy framework behind our Encino SEO engagements.',
    cta: 'Read guide →'
  }
];

export default function SeoCompanyEncinoPage() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Encino"
      heroTitle="SEO Company Encino."
      heroSubtitle="Gobiya is an SEO company serving Encino, Tarzana, and Sherman Oaks along the Ventura Boulevard corridor in the San Fernando Valley. Founded in 2012, the agency provides technical SEO, entity graph engineering, and AI citation optimization for professional services businesses that depend on organic search for client acquisition. Our SEO & Discoverability system has operated in this market since 2012."
      specs={[
        { label: 'Market', val: 'Encino, CA · Valley' },
        { label: 'Focus', val: 'Technical & Pipeline' },
        { label: 'Category', val: 'SEO & Discoverability' }
      ]}
      introHeading="Why Encino Businesses Need a Technical SEO Company, Not a Generic Agency"
      introParagraphs={[
        "Encino's business profile — affluent residential catchment, Ventura Boulevard commercial density, strong professional services sector — creates specific SEO dynamics that generic template-based agencies consistently misread."
      ]}
      servicesLabel="Market Intelligence"
      servicesTitle="The Landscape of Local Search"
      services={ORIGIN_CARDS.map(c => ({ title: c.title, body: c.body }))}
      faqs={FAQ_ITEMS}
      useHeroForm={true}
    >

      {/* CAPABILITIES SECTION */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">What We Do</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            SEO Services for Encino Businesses
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            Four engineering layers that form a complete SEO system — built for the Encino and San Fernando Valley market, delivered without the bloat of a large agency model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <div key={i} className="p-10 border border-gray-200 bg-gray-50" data-anim="up">
              <span className="font-mono text-xs text-gray-400 block mb-4">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{cap.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{cap.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHECKLIST SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Engagement Sequence</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              How We Run an Encino SEO Engagement
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              The four-step sequence from initial technical audit to authority deployment — what we do, in what order, and why it matters for Encino's competitive market.
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
                encino-seo-protocol.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Run this audit on your Encino business
                  <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLUSTER LINKS */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">SEO &amp; Discoverability Cluster</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Related Guides &amp; Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            Resources from our SEO &amp; Discoverability practice that directly support Encino businesses evaluating or scaling their organic search investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLUSTER_CARDS.map((card, i) => (
            <div key={i} className="p-8 border border-gray-200 bg-gray-50" data-anim="up">
              <span className="font-mono text-xs text-gray-400 block mb-4">{card.label}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href={card.link} className="hover:text-gray-600">{card.title}</a></h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{card.body}</p>
              <a href={card.link} className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">{card.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[5vw] bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto p-12 bg-white border border-gray-200 flex flex-col md:flex-row gap-8 items-center" data-anim="up">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Encino SEO Engagement</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We run a 15-minute live technical session for Encino businesses — crawl audit, visibility gap analysis, competitor ranking review, and schema coverage check. No slides, no pitch deck. A direct read on where your organic search stands right now and what a realistic improvement timeline looks like for your specific Ventura Boulevard market.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="/book" className="px-8 py-4 bg-black text-white text-sm font-semibold tracking-wide uppercase hover:bg-gray-800 transition-colors">
              Book Encino SEO audit
            </a>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">15-min session · No commitment</span>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
