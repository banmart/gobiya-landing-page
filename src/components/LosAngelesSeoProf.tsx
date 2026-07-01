import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'What do Los Angeles SEO professional reviews actually tell you?',
    a: 'Reviews of a Los Angeles SEO professional should tell you whether they produce measurable results in competitive LA markets. Look for specificity: named industries, documented traffic or ranking improvements, timeframes that match realistic SEO timelines (60–180 days), and language that references technical work — crawl audits, schema implementation, link acquisition — rather than vague \'growth.\' Gobiya\'s verified reviews are available on Google Business Profile and Yelp, with client-attributed outcomes in professional services, B2B SaaS, and healthcare.'
  },
  {
    q: 'Who are the top SEO companies in Los Angeles?',
    a: 'The top SEO companies in Los Angeles are distinguished by technical depth, not headcount or brand recognition. The firms consistently producing results for competitive LA categories — healthcare, legal, B2B technology, professional services — operate with engineering-led SEO practices rather than content-volume or link-quantity models. Gobiya is a boutique Los Angeles SEO practice established in 2012, focused on B2B brands and professional services firms in the Greater Los Angeles and San Fernando Valley markets.'
  },
  {
    q: 'How can I verify a Los Angeles SEO professional on LinkedIn?',
    a: 'Verifying a Los Angeles SEO professional on LinkedIn means checking for real client tenure (6+ month engagements), industry-specific SEO experience, and evidence of technical work — not just content creation. Gobiya\'s founder Steve Martin has practiced SEO engineering in the Los Angeles market since 2012 and is active on LinkedIn at linkedin.com/in/stevemartingobiya.'
  },
  {
    q: 'What SEO services does a professional offer in California?',
    a: 'A professional SEO practice in California covers: technical site audits (crawl budget, schema, Core Web Vitals), organic content strategy targeting commercial-intent queries, local SEO and Google Business Profile optimization, link acquisition and entity authority building, and generative engine optimization (GEO) for AI Overviews, ChatGPT, and Perplexity. In California\'s competitive markets, the distinguishing factor is engineering depth, not service list length.'
  },
  {
    q: 'Is professional SEO different from what DIY tools offer?',
    a: 'Professional SEO differs from DIY tools in three ways. First, diagnosis: a professional identifies the specific technical or content architecture problems causing poor performance. Second, implementation: changes are made directly in code — not through plugin dashboards. Third, strategy: content is mapped to commercial-intent queries and pipeline stages, not just traffic volume targets. Tools like Semrush or Ahrefs are research instruments. Professional SEO is a change-execution discipline.'
  },
  {
    q: 'What is an affordable SEO company in the USA?',
    a: 'Affordable SEO in the USA is not defined by the monthly retainer number — it is defined by cost-per-outcome. A $1,500/month program that produces no measurable pipeline is expensive. A $4,000/month program that generates 8–12 qualified monthly inquiries in a professional services category with $5,000+ average case value pays for itself before month two. Gobiya prices engagements to be competitive for the outcomes produced, with transparent scope and no 12-month lock-in contracts before results are demonstrated.'
  }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Los Angeles SEO Professional",
      "url": "https://www.gobiya.com/los-angeles-seo-professional",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "Los Angeles SEO professional practice. Gobiya engineers search visibility, AI citation architecture, and organic pipeline systems for B2B brands, professional services firms, and enterprise clients across the Greater Los Angeles market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Los Angeles", "sameAs": "https://www.wikidata.org/wiki/Q65" },
        { "@type": "City", "name": "Beverly Hills", "sameAs": "https://www.wikidata.org/wiki/Q49262" },
        { "@type": "City", "name": "Santa Monica", "sameAs": "https://www.wikidata.org/wiki/Q185177" },
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q188539" },
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q182749" },
        { "@type": "State", "name": "California", "sameAs": "https://www.wikidata.org/wiki/Q99" }
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
    title: "01. Organic Traffic Composition Audit",
    short: "Map which pages drive pipeline versus which attract non-commercial sessions.",
    detail: "Most Los Angeles businesses with existing organic traffic are converting a fraction of what they should. The audit segments sessions by intent — informational, commercial, transactional — and maps each cluster to pipeline contribution. The output is not 'traffic grew by X' but 'these 14 pages need structural upgrades, these 6 are correctly configured, and these 3 are your high-ROI priority.' That is where professional SEO in Los Angeles starts: with a map of what is actually working, not an assumption about what should."
  },
  {
    title: "02. Technical Architecture Review",
    short: "Resolve crawl inefficiencies, canonical errors, and rendering failures.",
    detail: "Technical SEO problems in LA's competitive market are not optional cleanup items — they are hard ranking floors. Redirect chains that dilute link equity, canonical tags pointing to the wrong version, server-side rendering gaps that hide content from AI crawlers, Core Web Vitals failures that suppress ranking. We work inside the code directly — not through Yoast or page-builder dashboards. Direct, clean, audit-verifiable code-level changes that hold up under Google's 2026 scrutiny standards."
  },
  {
    title: "03. Entity & Schema Infrastructure",
    short: "Build the structured data foundation for Knowledge Graph and AI citation.",
    detail: "Google's Knowledge Graph and generative AI engines both rely on structured entity signals to understand who you are. For Los Angeles professional services firms, this means Organization schema with correct sameAs links to LinkedIn, Wikidata, and Crunchbase; LocalBusiness schema with verified coordinates and service areas; author and Person schema for thought leadership content; and Service schema for each capability page. This is the infrastructure that makes a business citable in AI answers — not just rankable in traditional search."
  },
  {
    title: "04. Competitive Gap & Keyword Mapping",
    short: "Identify the exact query and content gaps your LA competitors are exploiting.",
    detail: "The Los Angeles SEO market has dynamics that generic national audits miss. Category-specific Map Pack competition in healthcare, legal, and professional services. Entertainment industry search patterns unique to LA. B2B technology sector concentration in Santa Monica and the Westside creating specific buyer intent profiles. We map competitive gaps using direct Search Console data, not third-party rank estimates, and design a roadmap that prioritizes the gaps with the highest commercial-intent value first."
  }
];

const ORIGIN_CARDS = [
  {
    title: 'Ten Different Competitive Landscapes in One City',
    label: 'Industry Mix',
    body: "Los Angeles has distinct local SEO competitive environments for entertainment, healthcare, legal, B2B technology, hospitality, real estate, financial advisory, e-commerce, manufacturing, and education — each with different keyword economics, different buyer intent patterns, and different schema requirements. A professional SEO who works across all of these without specialization is working without real competitive intelligence.",
  },
  {
    title: 'Los Angeles Buyers Are Searching AI Before Google',
    label: 'AI Discovery',
    body: "By mid-2026, a meaningful share of B2B buyer discovery in Los Angeles starts in ChatGPT, Perplexity, or Google's AI Overviews — not the traditional 10 blue links. For Los Angeles professional services firms and B2B brands, this means that traditional organic ranking alone is no longer a complete visibility strategy. A professional SEO in Los Angeles today needs to build entity signals that earn AI citation alongside traditional rankings.",
  },
  {
    title: 'LA\'s Top-Ranking Pages Have Real Technical Infrastructure',
    label: 'Competition Depth',
    body: "In Los Angeles's most competitive categories — healthcare, legal, B2B SaaS, financial advisory — the pages holding the top organic positions are not there by default. They have technical SEO infrastructure: server-rendered HTML that AI crawlers can access, correct entity schema that connects website to Knowledge Graph, Core Web Vitals that meet Google's 2026 thresholds, and commercial-intent content architecture that signals relevance at every buying stage.",
  },
  {
    title: '320% Pipeline Inquiry Growth for a West LA B2B Services Firm',
    label: 'Results',
    body: "A West Los Angeles B2B professional services firm saw a 320% increase in qualified organic inquiries within 120 days of engagement. The work involved a full traffic composition audit that identified 18 high-commercial-intent keyword gaps, redirect chain cleanup across 40+ legacy pages that was silently diluting link equity, Organization and Service schema implementation verified against Google's Knowledge Graph, and a topical content sprint targeting the specific intent queries driving competitor conversions.",
  },
];

const CAPABILITIES = [
  {
    title: 'Technical SEO Audit & Code-Level Fixes',
    body: 'We begin every Los Angeles SEO engagement with a full technical audit — crawl log analysis, redirect chain mapping, canonical conflict detection, Core Web Vitals measurement, and server-side rendering verification. Unlike plugin-based audits, ours traces the actual path Googlebot and AI crawlers take through your site and identifies every point where they are blocked, confused, or sent in the wrong direction. Fixes are implemented in code, not in Yoast settings.',
  },
  {
    title: 'Commercial-Intent Content Architecture',
    body: 'The most common professional SEO failure in Los Angeles is organic traffic that does not convert to pipeline. The root cause is almost always content architecture: sites optimized for high-volume informational keywords instead of the low-volume, high-intent commercial queries that the active buyers in their category are actually using. We build hub-and-spoke content structures mapped to buying committee roles and decision stages — the architecture that connects search behavior to CRM pipeline.',
  },
  {
    title: 'Entity Schema & Knowledge Graph Infrastructure',
    body: 'Google\'s ability to rank your business for competitive Los Angeles queries depends substantially on whether it can cleanly resolve your entity — understand what you are, what you do, and who vouches for you across authoritative sources. We implement Organization, Service, Person, and LocalBusiness JSON-LD schema with verified sameAs links to LinkedIn, Wikidata, Crunchbase, and official registries.',
  },
  {
    title: 'Local SEO for Los Angeles Professional Services',
    body: 'For Los Angeles professional services firms with physical locations or service area businesses, local SEO engineering is a distinct layer on top of technical and content SEO. We optimize Google Business Profile signals, build NAP citation consistency across 40+ authoritative directories, deploy LocalBusiness schema with verified LA coordinates and service areas, and build review velocity systems targeting the 4–6 per month benchmark that competitive LA categories require to hold Map Pack position.',
  },
  {
    title: 'Generative Engine Optimization (GEO)',
    body: 'In 2026, a Los Angeles SEO professional who only optimizes for traditional Google rankings is leaving a growing share of buyer discovery unaddressed. ChatGPT, Perplexity, Gemini, and Google\'s AI Overviews are now active discovery surfaces for B2B buyers in legal, financial, technology, and professional services — and they cite brands based on entity signals, not keyword rankings. We build the passage-level content structure, schema architecture, and third-party citation presence that earns AI recommendation.',
  },
  {
    title: 'Link Acquisition & Authority Building',
    body: 'In competitive Los Angeles categories, off-page authority matters — but the kind of link acquisition that moves rankings in professional services and B2B is earned, not bought. We pursue editorial link placement on authoritative industry publications, local LA business and chamber resources, partner organization pages, and category-specific directories that Google uses as entity-verification sources. The strategy is deliberate, not scaled.',
  },
];

const CLUSTER_CARDS = [
  {
    label: 'Service',
    title: 'SEO & Discoverability Agency',
    link: '/performance/seo-discoverability-agency',
    body: 'The full-stack parent practice covering technical SEO, local Map Pack engineering, generative engine optimization, and organic pipeline systems for Greater Los Angeles clients.',
    cta: 'View practice →'
  },
  {
    label: 'On-Page',
    title: 'On-Page SEO Los Angeles',
    link: '/on-page-seo-los-angeles',
    body: 'Engineering-led on-page SEO for Los Angeles businesses: crawl audit, entity schema, Core Web Vitals, and AI crawler compatibility — implemented directly in code, not through plugins.',
    cta: 'View service →'
  },
  {
    label: 'AI SEO',
    title: 'AI SEO Beverly Hills',
    link: '/ai-seo-beverly-hills',
    body: 'Generative engine optimization and AI citation architecture for Beverly Hills businesses targeting visibility in ChatGPT, Perplexity, and Google AI Overviews alongside traditional rankings.',
    cta: 'View service →'
  },
  {
    label: 'Local',
    title: 'Local SEO Company Burbank',
    link: '/local-seo-company-burbank',
    body: 'Map Pack engineering, GBP optimization, NAP citation consistency, and review velocity systems for Burbank businesses across the 91501–91510 market and adjacent corridors.',
    cta: 'View service →'
  },
  {
    label: 'Local',
    title: 'Local SEO Glendale',
    link: '/local-seo-glendale',
    body: 'Local SEO engineering for Glendale businesses: Google Business Profile optimization, citation building, and Map Pack strategy for the Brand Boulevard corridor and 91201–91210 market.',
    cta: 'View service →'
  },
  {
    label: 'Local',
    title: 'SEO Company Encino',
    link: '/seo-company-encino',
    body: 'Technical and local SEO for Encino businesses along Ventura Boulevard: organic visibility, entity architecture, and local Map Pack engineering for the 91316–91436 market.',
    cta: 'View service →'
  }
];

export default function LosAngelesSeoProf() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Los Angeles"
      heroTitle="Los Angeles SEO Professional: Rankings, AI Citations & Pipeline"
      heroSubtitle="Gobiya is a Los Angeles SEO professional services firm established in 2012, providing technical SEO, entity graph engineering, and AI citation optimization for B2B brands and professional services clients across greater Los Angeles. Steve Martin, the founder, traces exactly why organic traffic is not generating pipeline, fixes the root cause at the code level, and builds the structured entity signals that make a brand visible across Google, AI Overviews, ChatGPT, and Perplexity. Our SEO & Discoverability practice is engineering-led — every fix is implemented directly in code, validated against both traditional Googlebot and AI crawler requirements, and tied to pipeline outcomes rather than traffic volume."
      specs={[
        { label: 'Founding', val: 'Est. 2012' },
        { label: 'Focus', val: 'Technical & GEO' },
        { label: 'Area', val: 'Greater LA & Valley' }
      ]}
      relevantSlugs={[
        'b2b-organic-traffic-growth',
        'gobiya-vs-enterprise-seo-agencies',
        'how-do-b2b-companies-use-seo-to-generate-predictable-revenue'
      ]}
      introHeading="Why Professional SEO in Los Angeles Is a Different Problem"
      introParagraphs={[
        "Los Angeles is one of the most competitively complex SEO markets in the United States — and the reasons have nothing to do with population size. They have to do with industry density, intent diversity, and the buyer sophistication of the organizations searching for solutions here."
      ]}
      servicesLabel="Market Context"
      servicesTitle="The Landscape of Local Search"
      services={ORIGIN_CARDS.map(c => ({ title: c.title, body: c.body }))}
      faqs={FAQ_ITEMS}
      useHeroForm={true}
    >

      {/* QUERY ANSWER BLOCK */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200 px-[5vw]">
        <div className="max-w-6xl mx-auto">
          
          <div className="border-l-4 border-orange-500 bg-white p-6 md:p-8 mb-12 max-w-3xl shadow-sm" data-anim="up">
            <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 mb-3 block">Direct Answer</span>
            <p className="text-gray-900 leading-relaxed font-medium">
              A Los Angeles SEO professional is an expert who diagnoses why your organic search is not generating revenue, fixes the technical and structural causes at the code level, and builds the entity signals that earn citation across Google, AI Overviews, ChatGPT, and Perplexity. In LA's competitive B2B and professional services market, that requires a combination of technical SEO engineering, commercial-intent content architecture, and generative engine optimization — not just keyword ranking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { n: '01', title: 'Traffic Composition Audit', desc: 'Segment your organic sessions by commercial intent — identify which pages are generating pipeline and which are attracting traffic that will never convert.' },
              { n: '02', title: 'Technical SEO Engineering', desc: 'Resolve crawl inefficiencies, redirect chains, canonical conflicts, and Core Web Vitals failures directly in code — not through plugin dashboards.' },
              { n: '03', title: 'Entity & Schema Architecture', desc: 'Build the Organization, Service, and LocalBusiness JSON-LD infrastructure that makes your brand verifiable to Google\'s Knowledge Graph and generative AI engines.' },
              { n: '04', title: 'Competitive Gap Analysis', desc: 'Map the exact keyword and content gaps that let your Los Angeles competitors outrank you for the queries that drive qualified B2B inquiries.' },
              { n: '05', title: 'AI & GEO Visibility', desc: 'Optimize for citation in AI Overviews, ChatGPT, Perplexity, and Gemini — the search surfaces capturing a growing share of professional buyer discovery in 2026.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white border border-gray-200 p-6 shadow-sm" data-anim="up">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 mb-3 block">{n}</span>
                <h4 className="text-sm font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl" data-anim="up">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-6 block">Quick questions answered</span>
            <div className="space-y-4">
              {[
                {
                  q: 'What separates a professional SEO from a generalist agency in Los Angeles?',
                  a: 'A professional SEO in Los Angeles works at the diagnostic level first — identifying the specific technical, structural, or content architecture problems causing underperformance before prescribing any fix. Generalist agencies typically skip diagnosis and go directly to standard deliverables: blog posts, backlink packages, title tag revisions. Professional SEO means changes are made in code, validated against crawl data, and tied to commercial outcomes. In Los Angeles\'s competitive landscape — where healthcare, legal, B2B technology, and professional services categories have genuine technical SEO competition at the top — engineering depth is the difference between moving and not moving.'
                },
                {
                  q: 'How long does professional SEO take to produce results in the Los Angeles market?',
                  a: 'In the Los Angeles market, professional SEO produces results in layers. Technical fixes — redirect cleanup, canonical corrections, schema implementation — show measurable crawl and indexation improvements within 2–4 weeks as Googlebot revisits updated pages. Commercial-intent content improvements and competitive gap closure show ranking movement in 60–90 days for mid-competition queries. Topical authority and entity signals build compounding visibility over 90–180 days. Core Web Vitals improvements reflect in ranking within 1–3 crawl cycles. The realistic expectation: meaningful organic pipeline contribution within a 90–120 day window for a professionally-executed engagement. Faster promises in LA\'s market are a red flag.'
                },
                {
                  q: 'What industries does Gobiya serve as a Los Angeles SEO professional?',
                  a: 'Gobiya\'s Los Angeles SEO practice has deepest experience in B2B SaaS and technology, professional services (legal, financial advisory, management consulting), healthcare and medtech, and commercial real estate. We also serve media, entertainment, and production companies navigating competitive organic visibility in LA\'s entertainment market. Our approach — engineering-led, pipeline-focused, entity-architecture-first — is most effective for organizations with an average deal size above $5,000 and a sales cycle longer than 30 days, where the difference between ranking and not ranking for commercial-intent queries has a direct, attributable revenue impact.'
                },
              ].map(({ q, a }, i) => (
                <details key={i} className="group border border-gray-200 bg-white">
                  <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex justify-between items-center bg-gray-50 group-open:bg-white group-open:border-b group-open:border-gray-100 transition-colors">
                    {q}
                    <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <div className="p-5 text-sm text-gray-600 leading-relaxed bg-white">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Service Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Professional SEO Services for Los Angeles Businesses
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            The five-layer SEO system we deploy for Los Angeles engagements — engineered around the signals that actually determine commercial organic visibility in a competitive California market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <div key={i} className="p-8 border border-gray-200 bg-gray-50" data-anim="up">
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
              How We Run a Los Angeles Professional SEO Engagement
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              The four-phase sequence we execute from day one — from the initial traffic composition audit through technical fixes, entity infrastructure, and competitive gap closure.
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
                la-seo-professional-protocol.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Run this audit on your Los Angeles business
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
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Commercial Solutions</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Los Angeles SEO Practice: Related Pages &amp; Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            Specialized SEO services and location-specific practices from the Gobiya Los Angeles commercial solutions cluster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start With a Los Angeles SEO Strategy Session</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We run a 15-minute live SEO session for Los Angeles businesses — traffic composition analysis, technical gap review, competitive landscape read, and an honest assessment of what it would take to move your organic pipeline in the next 90 days. No slides, no pitch deck, no commitment. Just a direct read on where your business stands and what a professional SEO engagement would realistically produce.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="/book" className="px-8 py-4 bg-black text-white text-sm font-semibold tracking-wide uppercase hover:bg-gray-800 transition-colors">
              Book strategy session
            </a>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">15-min session · No commitment</span>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
