import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'We rank well on Google for our main keywords in Santa Clarita, but when prospects ask ChatGPT or Perplexity about vendors in our category near them, our company does not come up. How do we change that?',
    a: 'Google organic rankings and AI citation are driven by completely different signals. AI engines like ChatGPT and Perplexity surface businesses based on entity confidence — how well your brand is represented in structured, machine-readable knowledge sources. To appear in AI-generated responses for Santa Clarita category queries, your brand entity needs verified schema markup on your site, presence in data sources that AI training pipelines crawl (Wikidata, data aggregators, authoritative directories), and content formatted with claim-evidence-citation structure that retrieval models can extract at the passage level. Strong Google rankings are a helpful signal but they do not carry directly into AI citation — the GEO layer is a separate engineering effort.',
  },
  {
    q: 'We already invest in Santa Clarita SEO and Google Ads. Is AI search marketing a replacement for those or something we run alongside them?',
    a: 'Alongside, not instead of. Google still processes the majority of high-intent commercial searches, and your existing SEO and paid investment should not be abandoned. What AI search marketing adds is coverage of the discovery surface that Google does not touch — the 35 to 40 percent of commercial research journeys that now begin with a question asked directly to ChatGPT, Perplexity, or Google AI Overviews. A buyer who asks an AI assistant "who are the best commercial contractors in Santa Clarita" before they ever open a browser is running a query your traditional SEO cannot capture. The programs that win in 2026 run Google and AI discovery simultaneously, and the technical work for GEO often strengthens your E-E-A-T signals for Google as a side effect.',
  },
  {
    q: 'A competitor in the Santa Clarita Valley keeps appearing in AI answers when our category comes up. How do we find out what signals are driving that?',
    a: 'The signals AI engines use to cite a business fall into three categories. First, entity authority — are they listed in Wikidata, does their Google Knowledge Panel exist and match their website schema, is their business information consistent across the data aggregators AI training pipelines scrape? Second, content citability — do their pages have the passage-level structure (specific claims, supporting data, source attribution in tight paragraphs) that retrieval models prefer for extraction? Third, coverage breadth — do they appear in third-party editorial content, press mentions, and industry directories that AI training sets index heavily? A citation audit usually identifies which of the three your competitor is winning on within the first session.',
  },
  {
    q: 'We need leads this quarter, not next year. How long does AI search marketing take to start showing real results?',
    a: 'The honest answer depends on where you are starting from. If your entity foundation (schema, GBP, data aggregator presence) is weak, the first 30 to 45 days are foundational work — entity registration, content restructuring, citation source alignment. Early AI citations for lower-competition Santa Clarita queries often appear within 30 to 60 days of GEO deployment. Competitive category queries take longer — 90 to 120 days is realistic for consistent citation presence. If you need leads this quarter specifically, the fastest path is running Google Ads in parallel while the AI search layer builds. AI search compounds over time in a way paid ads do not — once a citation is established and reinforced, it tends to persist across queries without ongoing spend.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya — AI Search Marketing Santa Clarita',
      url: 'https://www.gobiya.com/ai-search-marketing-santa-clarita',
      logo: 'https://www.gobiya.com/images/gobiya---logo.webp',
      foundingDate: '2012',
      description: 'AI search marketing for Santa Clarita businesses. We engineer Google organic visibility and AI platform citations — ChatGPT, Perplexity, Google AI Overviews — for brands competing across the Valencia corridor and the broader SCV market.',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      priceRange: '$$$$',
      areaServed: [
        { '@type': 'City', 'name': 'Santa Clarita', 'sameAs': 'https://www.wikidata.org/wiki/Q675577' },
        { '@type': 'City', 'name': 'Valencia', 'sameAs': 'https://www.wikidata.org/wiki/Q2521699' },
        { '@type': 'City', 'name': 'Newhall', 'sameAs': 'https://www.wikidata.org/wiki/Q6004047' },
        { '@type': 'City', 'name': 'Stevenson Ranch', 'sameAs': 'https://www.wikidata.org/wiki/Q7612820' },
      ],
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
      serviceType: 'AI Search Marketing Santa Clarita',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      description: 'AI search marketing for Santa Clarita and the Santa Clarita Valley: GEO architecture for ChatGPT and Perplexity citation, Google organic SEO, local Map Pack engineering, and entity graph construction for brands in the Valencia business corridor and surrounding SCV markets.',
      areaServed: { '@type': 'City', name: 'Santa Clarita' },
      url: 'https://www.gobiya.com/ai-search-marketing-santa-clarita',
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

const AUDIT_STEPS = [
  {
    title: '01. Santa Clarita Entity Foundation',
    short: 'Build the machine-readable entity layer that AI engines verify before citing your brand.',
    detail: 'ChatGPT, Gemini, and Perplexity do not cite businesses they cannot verify. We establish your brand entity across Google Knowledge Graph, structured JSON-LD schema, and Wikidata — connecting your Santa Clarita address, services, principal, and credentials to verifiable public data sources. For businesses in the Valencia business parks, this includes industry-specific entity signals (contractor licensing, professional certifications, service area data) that AI engines weight heavily when generating category responses. Without this layer, content quality and Google rankings are irrelevant to AI citation.',
  },
  {
    title: '02. GEO — AI Citation Architecture',
    short: 'Restructure content so retrieval models extract your brand as the cited answer.',
    detail: 'Generative Engine Optimization formats your service pages at the passage level so AI retrieval pipelines pull your content when buyers ask category questions. For Santa Clarita businesses, this means restructuring existing content into claim-evidence-citation triplets, deploying FAQ schema with question phrasing that matches how buyers actually phrase queries to AI assistants, and ensuring content density is tight enough for extraction without requiring the model to read the full page. The result is content that functions as a Google page and an AI citation source simultaneously — the two surfaces now require the same underlying precision, applied differently.',
  },
  {
    title: '03. Google Organic + Local Map Pack',
    short: 'Secure Map Pack and organic positions for Santa Clarita commercial queries in parallel.',
    detail: 'AI search marketing does not replace Google SEO — it runs on top of it. For most Santa Clarita businesses, the majority of inbound leads still originate from Google Maps and Google organic results. We engineer GBP category alignment, NAP consistency across 40+ data sources, review velocity, and LocalBusiness schema to hold Map Pack positions across the Santa Clarita Valley. Technical SEO — crawl efficiency, Core Web Vitals, canonical structure — runs concurrently. Google authority also feeds the entity confidence score that AI engines use, so organic and AI work compounds in the same direction.',
  },
  {
    title: '04. AI Search Pipeline Measurement',
    short: 'Track citation presence, entity coverage, and AI discovery contribution to pipeline.',
    detail: 'Most agencies cannot show you where your AI citations are because they do not measure them. We run monthly citation audits across ChatGPT, Perplexity, and Google AI Overviews for your target queries — documenting which questions cite your brand, which cite competitors, and where gaps exist in the category coverage. For B2B clients in Santa Clarita, we layer this against pipeline data: tracing which inbound leads mention AI-assisted research in their intake responses. The measurement infrastructure is what turns AI search marketing from a branding exercise into a revenue engineering program.',
  },
];

const CAPABILITIES = [
  {
    title: 'AI Entity Graph Engineering',
    body: 'We construct a complete, verifiable entity graph for your Santa Clarita business — linking your brand to Google Knowledge Graph, Wikidata, and structured JSON-LD schema on your site. This is the infrastructure layer that makes AI citations possible. Without a verified entity, AI engines like ChatGPT and Perplexity will not cite your business in category responses regardless of content quality or Google ranking.',
  },
  {
    title: 'Generative Engine Optimization (GEO)',
    body: 'GEO is the technical discipline of making your content readable, extractable, and citable by AI language models. We format your Santa Clarita service pages with claim-evidence-citation structures, FAQ schema with buyer-realistic question phrasing, and passage-level density that AI retrieval pipelines favor over generic long-form content.',
  },
  {
    title: 'Local SEO & Santa Clarita Map Pack',
    body: 'The Santa Clarita Map Pack for queries like "contractor SCV," "accountant Valencia CA," and "marketing agency near me Santa Clarita" is won through GBP category precision, NAP citation consistency across 40+ directories, and engineered review velocity — not keyword density.',
  },
  {
    title: 'Technical SEO & Site Performance',
    body: 'Page speed, crawl efficiency, canonical structure, and Core Web Vitals are prerequisites for both Google ranking and AI indexability. AI crawlers follow the same crawl rules as Googlebot and cannot extract content from pages that block bots, load too slowly, or have JavaScript rendering issues.',
  },
];

const SHIFT_CARDS = [
  {
    title: 'Where B2B Buyers Start Their Research Now',
    body: 'A growing portion of commercial purchasing decisions — particularly in B2B professional services, healthcare vendor selection, and high-ticket contracting — begin with a question asked to an AI assistant rather than a Google search. Studies tracking B2B research behavior in 2025 found that AI-assisted research precedes 35 to 40 percent of enterprise vendor discovery sessions. For businesses in the Valencia corporate parks, this is not a future trend — it is where your buyers are researching right now.',
  },
  {
    title: 'Santa Clarita Marketing Has Not Caught Up',
    body: 'Most Santa Clarita businesses still operate with a traditional digital marketing stack: a Google Ads campaign, a website optimized for a handful of local search terms, and a Google Business Profile. That stack captures buyers who already know what they\'re looking for. It does not capture the buyer who asks ChatGPT "who are the most reliable commercial electrical contractors in the Santa Clarita Valley" and acts on the first two answers.',
  },
  {
    title: 'AI Search Sales Navigator',
    body: 'The term "AI search sales navigator" captures something real: sophisticated buyers are now using AI chat tools as a research layer that sits above Google. They prompt for vendor recommendations, ask follow-up questions about specific companies, and request comparisons — all before visiting a single website.',
  },
  {
    title: 'Dual-Surface Authority',
    body: 'The technical work required for AI search marketing and traditional Santa Clarita SEO reinforces each other. Entity graph construction improves Google Knowledge Panel accuracy. GEO content structure improves E-E-A-T signals for Google\'s organic algorithm. Running both surfaces from the same strategic foundation is more efficient than treating them as separate programs.',
  },
];

export default function AiSearchMarketingSantaClaritaPage() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / AI Search"
      heroTitle="AI Search Marketing Santa Clarita."
      heroSubtitle="Gobiya is a Los Angeles digital marketing agency founded in 2010 that builds AI search visibility for businesses in the Santa Clarita Valley, including the Valencia corridor and Newhall. AI search marketing means engineering your brand to be found and cited on ChatGPT, Perplexity, and Google AI Overviews — not just ranking in traditional search results."
      tags={[
        'AI Overviews',
        'GEO Optimization',
        'ChatGPT Citations',
        'Perplexity Search',
        'Entity Graphs',
        'Local Map Pack',
        'Technical SEO'
      ]}
      relevantSlugs={[
        'what-are-ai-seo-services',
        'how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms',
        'what-data-sources-do-llms-crawl-to-verify-b2b-company-information'
      ]}
      introHeading="Why the SCV Market Is Underserved in AI Search"
      introParagraphs={[
        "Santa Clarita is the fourth-largest city in Los Angeles County, with a business base concentrated in professional services, healthcare, manufacturing, and B2B contractors. Almost none of those businesses are optimized for AI search — which means early movers in the SCV market can establish AI citations before competition locks them out.",
        "If your brand does not appear in AI-generated answers, you are invisible to a growing segment of the market no matter how well you rank on Google. Our SEO & Discoverability practice builds AI search visibility alongside Google authority for Santa Clarita businesses that need both."
      ]}
      servicesLabel="The Opportunity"
      servicesTitle="The Santa Clarita AI Shift"
      services={SHIFT_CARDS}
      faqs={FAQ_ITEMS}
      useHeroForm={true}
    >
      {/* CAPABILITIES SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Service Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            AI Search Marketing Capabilities for Santa Clarita
          </h2>
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
              How We Build AI Search Marketing in Santa Clarita
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              The four-phase sequence we run on every Santa Clarita engagement — from entity foundation to measurable AI pipeline contribution.
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
                scv-engagement-protocol.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Apply this to your Santa Clarita brand
                  <svg viewBox="0 0 24 24" fill="none" width="12" height="12">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
