import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'We rank well on Google for our main keywords, but when potential clients ask ChatGPT or Perplexity about firms in our category in Beverly Hills, we do not appear. How do we fix that?',
    a: 'Google rankings and AI citation are driven by different mechanisms. AI engines like ChatGPT and Perplexity retrieve answers based on entity confidence — how well your brand is represented in structured, verifiable knowledge sources. To appear in AI-generated responses, your brand entity needs verified schema on your website, presence in directories that AI training pipelines crawl, and content structured with claim-evidence-citation triplets that AI retrieval can extract. Strong Google rankings help but do not transfer directly to AI citation.'
  },
  {
    q: 'We have strong traditional SEO. What specifically changes when optimizing for AI search engines versus Google?',
    a: 'Traditional SEO optimizes for a ranking algorithm that evaluates pages. GEO optimizes for a retrieval model that extracts passages. For Google, you optimize title tags, heading structure, and page authority. For AI engines, you optimize content at the sentence and paragraph level so retrieval models can lift complete, citable answers. The specific techniques are claim-evidence-citation formatting, FAQ schema with specific question phrasing that matches how buyers ask questions of AI assistants, and entity markup connecting your business name to services, location, and credentials.'
  },
  {
    q: 'We are a high-end practice in Beverly Hills and we are concerned about how AI tools describe us. How do we control our AI presence?',
    a: 'AI language models derive their descriptions of businesses from patterns in their training data — which includes your website content, press coverage, directory listings, and third-party reviews. The most effective way to control your AI representation is to engineer the primary signal sources: publish authoritative, precise content about your practice that matches exactly how you want to be described, and ensure your structured schema and Google Knowledge Panel are accurate and complete. When authoritative sources consistently describe your practice a specific way, that is the description AI models extract and reproduce.'
  },
  {
    q: 'We have been reading that AI is replacing traditional search. Should we be moving marketing budget away from Google SEO toward AI optimization?',
    a: 'Not away from — alongside. Google still processes the majority of commercial purchase intent traffic. The businesses that have shifted entirely away from Google SEO toward AI platform optimization have generally seen revenue impact, not growth. The right frame is dual-surface: maintain your Google organic presence and expand into AI citation simultaneously. The GEO work required for AI citations also improves your E-E-A-T signals for Google, so it is largely additive rather than a trade-off.'
  }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — AI SEO Beverly Hills",
      "url": "https://www.gobiya.com/ai-seo-beverly-hills",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012",
      "description": "AI SEO services for Beverly Hills businesses. We engineer Google organic visibility and AI platform citations — ChatGPT, Claude, Gemini — for brands competing in the 90210 market.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Beverly Hills", "sameAs": "https://www.wikidata.org/wiki/Q131565" },
        { "@type": "City", "name": "West Hollywood", "sameAs": "https://www.wikidata.org/wiki/Q186419" },
        { "@type": "City", "name": "Bel Air", "sameAs": "https://www.wikidata.org/wiki/Q1624843" }
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
    title: "01. Beverly Hills Brand Entity Setup",
    short: "Register your entity across knowledge graphs tied to Beverly Hills coordinates.",
    detail: "ChatGPT, Google AI Overviews, and Gemini verify businesses through entity graphs — Wikidata, Google Knowledge Graph, structured schema. We build a complete entity representation linking your Beverly Hills address, phone, services, and principal to verifiable public data sources. Without this foundation, AI engines route buyer queries to competitors regardless of content quality."
  },
  {
    title: "02. AI Citation Architecture (GEO)",
    short: "Structure content for passage-level extraction by ChatGPT, Claude, and Gemini.",
    detail: "Generative Engine Optimization formats content so AI retrieval pipelines extract your answers when buyers query. We structure Beverly Hills service pages with claim-evidence-citation triplets, FAQ schema, and passage-level formatting that passes through GPTBot, ClaudeBot, and Applebot. This is the technical layer that converts content into citations — not likes, not shares, citations."
  },
  {
    title: "03. Google Map Pack Engineering",
    short: "Dominate the Beverly Hills local 3-pack for high-intent commercial queries.",
    detail: "The Beverly Hills Map Pack for queries like 'SEO agency Beverly Hills 90210' and 'digital marketing firm near me' is won through GBP optimization, NAP citation consistency, and review velocity — not keyword density. We engineer your local entity signal to outrank competitors on mobile map results and the local knowledge panel, the two placements that capture buyers already in the purchase window."
  },
  {
    title: "04. Intent-Mapped Content for Luxury Buyers",
    short: "Content calibrated to the research behavior of high-net-worth and enterprise buyers.",
    detail: "Beverly Hills buyers are sophisticated. Executives, attorneys, wealth managers, and entertainment industry buyers don't respond to generic sales copy. We map content to the specific research-to-decision journey of your buyer persona — structured topic clusters that answer precise questions before they're asked, on both Google and inside AI-generated responses."
  }
];

const ORIGIN_CARDS = [
  {
    title: 'Where We Cut Our Teeth on Competitive SEO',
    label: 'Hollywood',
    body: "Hollywood's entertainment, hospitality, and creative agency market is brutal — dozens of vendors chasing the same high-value clients, with no loyalty and infinite noise. We learned to build search systems that differentiated brands at the entity level, not just the keyword level. Citation authority, entity verification, AI discoverability — we were engineering these before the industry had names for them. That forensic architecture, refined across some of LA's most competitive search environments, is what we bring to Beverly Hills today.",
  },
  {
    title: 'Where We Mastered Local AI SEO at Scale',
    label: 'Koreatown',
    body: "Koreatown on Wilshire Corridor is one of the highest-density business districts in Los Angeles — a market where local map pack position determines whether a business survives. We ran NAP audits, GBP recovery, and citation engineering for professional services and medical providers across K-Town's dense grid. That precision work shaped how we handle multi-signal local AI SEO today — and those same clients are still active.",
  },
  {
    title: 'Same System. Higher Stakes Market.',
    label: 'Beverly Hills',
    body: "Beverly Hills brings a different buyer profile — higher AOV, more sophisticated research behavior, longer decision cycles — but the same underlying challenge: getting found when a high-intent buyer searches on Google or asks ChatGPT. We apply the same entity-first architecture we built in Hollywood and Koreatown, calibrated for the luxury and professional services vertical. The SEO & Discoverability methodology does not change by zip code. Precision does.",
  },
  {
    title: 'Entity Graphs, AI Citations, Local Authority',
    label: 'The System',
    body: "Every market engagement starts with the same three-layer foundation: (1) entity verification across Wikidata, Google Knowledge Graph, and structured schema; (2) GEO architecture that formats content for AI engine extraction and citation; (3) local signal engineering for Google Map Pack dominance. From Hollywood to Koreatown to Beverly Hills, this sequence does not change — because the way AI engines verify and cite businesses does not change by neighborhood.",
  },
];

const CAPABILITIES = [
  {
    title: 'AI Entity Graph Engineering',
    body: 'We construct a complete, verifiable entity graph for your Beverly Hills business — linking your brand to Google Knowledge Graph, Wikidata, and structured JSON-LD schema. Without this, AI engines like ChatGPT and Gemini will not cite you regardless of content quality. Entity graphs are the infrastructure layer that makes AI citations possible.',
  },
  {
    title: 'Generative Engine Optimization (GEO)',
    body: 'GEO is the discipline of making your content readable, extractable, and citable by AI language models. We format your Beverly Hills service pages with claim-evidence-citation structures, FAQ schema, and passage-level density that AI retrieval pipelines favor. When a buyer asks ChatGPT for the best SEO agency in Beverly Hills, a GEO-optimized entity gets cited — an unoptimized one does not.',
  },
  {
    title: 'Local SEO & Beverly Hills Map Pack',
    body: 'Dominating the Google Map Pack for "SEO agency Beverly Hills," "marketing firm 90210," and adjacent queries requires GBP optimization, citation consistency across 40+ directories, and engineered review velocity. We do not use plugin-based local SEO tools — we work directly at the data layer to align every signal Google uses to rank local results.',
  },
  {
    title: 'Technical SEO & Core Web Vitals',
    body: 'Page speed, crawl efficiency, canonical structure, and Core Web Vitals are table stakes in any competitive market — and Beverly Hills is no exception. We execute code-level fixes, not plugin patches: eliminating redirect chains, injecting structured data server-side, optimizing image delivery, and securing 90+ Lighthouse performance scores.',
  },
];

export default function AiSeoBeverlyHillsPage() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Beverly Hills"
      heroTitle="AI SEO Beverly Hills."
      heroSubtitle="Gobiya is a Los Angeles SEO and GEO agency founded in 2010 that builds entity graphs and AI citation signals for luxury businesses and professional practices in Beverly Hills, CA (ZIP 90210). The agency builds entity graphs, structured knowledge signals, and AI-readable content architectures that secure citations across every surface where high-net-worth buyers discover brands."
      tags={[
        'Luxury SEO',
        'Entity Graphs',
        'AI Citations',
        'Generative Engine Optimization',
        'Local Map Pack',
        'B2B Pipeline'
      ]}
      relevantSlugs={[
        'what-are-ai-seo-services',
        'how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms',
        'what-data-sources-do-llms-crawl-to-verify-b2b-company-information'
      ]}
      introHeading="From Hollywood to Koreatown. Now Beverly Hills."
      introParagraphs={[
        "Gobiya did not start on the Westside. We built our search engineering practice in two of Los Angeles' most competitive and underserved digital markets — and what we learned there became the system we deploy in Beverly Hills today."
      ]}
      servicesLabel="Our Origin Story"
      servicesTitle="The Evolution of our Practice"
      services={ORIGIN_CARDS.map(c => ({ title: c.title, body: c.body }))}
      faqs={FAQ_ITEMS}
      useHeroForm={true}
    >
      {/* CAPABILITIES SECTION */}
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Service Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            AI SEO Capabilities for Beverly Hills Businesses
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            The Beverly Hills market demands search engineering that works across two surfaces simultaneously: Google's organic algorithm and the AI discovery layer where an increasing share of high-intent buyers now start.
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
              How We Engineer AI SEO in Beverly Hills
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              The four-step sequence we execute on every Beverly Hills engagement — from entity setup to AI citation deployment.
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
                engagement-protocol.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Apply this to your Beverly Hills brand
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
      <section className="py-24 border-b border-gray-200 bg-gray-50 px-[5vw]">
        <div className="mb-12">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">SEO &amp; Discoverability Cluster</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Related Services &amp; Deep Dives
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
            Resources from the SEO &amp; Discoverability practice cluster that directly support Beverly Hills AI SEO strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-gray-200 bg-white" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Service</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/performance/seo-discoverability-agency" className="hover:text-gray-600">SEO &amp; Discoverability Agency</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The parent service practice covering Technical SEO, GEO, AI Citations, and organic pipeline engineering for B2B and enterprise brands.</p>
            <a href="/performance/seo-discoverability-agency" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">View full practice →</a>
          </div>

          <div className="p-8 border border-gray-200 bg-white" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Guide</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" className="hover:text-gray-600">Generative Engine Optimization (GEO)</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">The technical playbook for getting cited on ChatGPT, Claude, Perplexity, and Google AI Overviews. Covers RAG pipelines and citation engineering.</p>
            <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">Read the guide →</a>
          </div>

          <div className="p-8 border border-gray-200 bg-white" data-anim="up">
            <span className="font-mono text-xs text-gray-400 block mb-4">Guide</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-4"><a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" className="hover:text-gray-600">LLM Company Verification</a></h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">How ChatGPT and Claude verify business information — covering Wikidata, LinkedIn, review portals, and structured schema.</p>
            <a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" className="text-green-600 text-xs font-mono uppercase tracking-widest hover:text-green-700">Read the guide →</a>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
