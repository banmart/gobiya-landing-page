import React, { useState } from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const FAQ_ITEMS = [
  {
    q: 'What is the difference between template SEO and code-level SEO?',
    a: 'Template SEO relies on CMS plugins (like Yoast or RankMath) to change titles and descriptions, but ignores slow rendering, bloated scripts, canonical splits, and broken schema chains. Code-level SEO optimizes your actual backend structure, HTML layout, and server response scripts directly.'
  },
  {
    q: 'Why was my website cited on AI search (GEO) and then dropped?',
    a: 'AI models periodically refresh their parametric training data and citations. If your brand entity lacks consistent structured mapping across Wikipedia, Wikidata, and semantic schema markup, the LLM retrieval algorithms may drop your site\'s references. Consistent on-page entity alignment stabilizes your visibility.'
  },
  {
    q: 'How long does it take to see results from on-page technical fixes?',
    a: 'Unlike off-page ranking signals, on-page code fixes are immediate. Once search crawlers recrawl and re-evaluate your updated absolute paths, schema scripts, and speed, rankings and Core Web Vitals metrics typically shift in 3 to 14 days.'
  },
  {
    q: 'Do you work with WordPress, Webflow, Shopify, or custom React/Next.js?',
    a: 'Yes. While we build our premium applications in React/Next.js, we execute code-level audits and modifications on WordPress, Shopify, Webflow, custom PHP, and any HTML5-based web framework.'
  }
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is on-page SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On-page SEO is the practice of optimizing the elements within a web page itself — including HTML structure, title tags, meta descriptions, heading hierarchy, internal links, schema markup, content depth, page speed, and Core Web Vitals — to make pages more understandable and rankable by both search engines and AI crawlers. Unlike off-page SEO (backlinks), on-page SEO is entirely within a business's direct control."
      }
    },
    {
      "@type": "Question",
      "name": "What does on-page SEO include for Los Angeles businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Los Angeles businesses, on-page SEO includes: crawl budget optimization and redirect chain cleanup, JSON-LD schema markup for LocalBusiness, services, and founder authority, Core Web Vitals optimization (LCP, INP, CLS), localized content architecture with neighborhood and city-specific landing pages, entity-based heading and content structure aligned to Google's Knowledge Graph, and conversion architecture that connects search traffic to pipeline inquiries."
      }
    },
    {
      "@type": "Question",
      "name": "How long does on-page SEO take to show results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On-page SEO improvements typically produce measurable ranking changes within 30–90 days. Technical fixes (redirect cleanup, canonical corrections, schema implementation) can show results within 2–4 weeks as Google recrawls updated pages. Content depth improvements and entity optimization take 60–90 days to accumulate authority signals. Core Web Vitals improvements can produce ranking changes within 1–3 crawl cycles after implementation."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Gobiya's on-page SEO different for Los Angeles companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gobiya's on-page SEO is engineering-led — changes are implemented directly in code, not through plugins or page builders. This means faster rendering, cleaner semantic structure, and precise schema implementation that consumer-grade plugins cannot produce. Every on-page fix is also validated against AI crawler requirements, not just Google's traditional Googlebot, ensuring content is discoverable in both standard search and AI Overviews."
      }
    }
  ]
};

const AUDIT_STEPS = [
  {
    title: "01. Canonical Consistency & Crawl Paths",
    short: "Resolve redirect chains, canonical tags, and 5xx crawl blocks.",
    detail: "Googlebot and AI crawlers rely on efficient crawl budgets. If your site serves competing trailing slashes, duplicate path schemas, or canonical forks, indexing engines dilute your link equity. We align absolute paths and optimize the crawl structure."
  },
  {
    title: "02. Semantic Schema & Entity Mapping",
    short: "Structured JSON-LD to declare company identity and capabilities.",
    detail: "AI search bots (like GPTBot, ClaudeBot, Perplexity) do not interpret content like traditional search engines; they map entities. We inject rich, contextual JSON-LD graphs detailing your services, founder credentials, and geographic coordinates."
  },
  {
    title: "03. Core Web Vitals & Hydration Speed",
    short: "Clean rendering architecture with sub-second page loads.",
    detail: "Slow loading speeds kill search rankings and user conversions alike. We replace bloated content builders with custom, hand-coded React setups, securing 100/100 Core Web Vitals and preventing layout shifts during browser hydration."
  },
  {
    title: "04. Intent-Aligned Content Mapping",
    short: "Writing for the 5% active B2B buying window.",
    detail: "Instead of generic traffic volume, we structure pages around commercial intent keywords. Your on-page layout is designed to answer specific technical bottlenecks, moving organic visitors quickly to calls, bookings, or inquiries."
  }
];

const CAPABILITIES = [
  {
    title: 'Crawl Budget & Redirect Audits',
    body: 'We trace server log files, clean up multi-hop redirect chains, and eliminate crawl loops to ensure Googlebot and AI crawlers index critical revenue pages efficiently without getting blocked.',
  },
  {
    title: 'Structured Entity Graphing',
    body: 'We design custom JSON-LD schema integrations for local coordinates, services, founder authority, and case studies, converting raw content into structured machine-readable knowledge graph entities.',
  },
  {
    title: 'Core Web Vitals Optimization',
    body: 'We rewrite page templates, optimize image formats (converting to WebP/AVIF), eliminate unused render-blocking JavaScript, and secure near-perfect 100/100 Core Web Vitals rankings.',
  },
  {
    title: 'Conversion Architecture',
    body: 'Getting traffic is only half the battle. We optimize call-to-actions, map content layouts to user intent levels, and hook forms directly to native databases and email APIs to increase inquiry rates.',
  },
];

export default function OnPageSeoLosAngelesPage() {
  const [activeChecklist, setActiveChecklist] = useState<number>(0);

  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Capabilities / On-Page SEO"
      heroTitle="On-Page SEO Los Angeles: Pages That Rank in Google and AI Search"
      heroSubtitle="Gobiya is a Los Angeles on-page SEO agency founded in 2010 that diagnoses and fixes organic search problems at the code level — redirect chains, missing schema, Core Web Vitals failures, and content mapped to the wrong intent stage. Most Los Angeles businesses with stalled organic growth have the same underlying problem: sessions that never become leads. The root is almost always on-page — redirect chains bleeding crawl budget, schema missing, or content targeting the wrong intent stage. We find it at the code level and fix it there. Clean redirects, structured entity graphs, sub-second Core Web Vitals, and content mapped to commercial intent — implemented directly, not through plugins."
      specs={[
        { label: 'Focus', val: 'Topical Authority & Speed' },
        { label: 'Engines', val: 'Google & AI-native retrieval' },
        { label: 'Delivery', val: 'Direct code-level fixes' }
      ]}
      introHeading="Our On-Page SEO Capabilities"
      introParagraphs={[
        "We work directly inside your code. No plugins, no bulk page-builders, just clean, high-performance semantic optimization."
      ]}
      servicesLabel="Engineered Solutions"
      servicesTitle="Direct Code-Level Fixes"
      services={CAPABILITIES.map(c => ({ title: c.title, body: c.body }))}
      faqs={FAQ_ITEMS}
      useHeroForm={true}
    >

      {/* QUERY ANSWER BLOCK */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200 px-[5vw]">
        <div className="max-w-6xl mx-auto">
          
          <div className="border-l-4 border-orange-500 bg-white p-6 md:p-8 mb-12 max-w-3xl shadow-sm" data-anim="up">
            <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 mb-3 block">Quick Answer</span>
            <p className="text-gray-900 leading-relaxed font-medium">
              On-page SEO for Los Angeles businesses requires engineering-level fixes — not just content tweaks. Redirect cleanup, entity schema, Core Web Vitals, and AI crawler compatibility are the four pillars that separate ranking pages from invisible ones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { n: '01', title: 'Crawl & Redirect Audit', desc: 'Trace server logs, eliminate redirect chains, fix canonical conflicts, and restore crawl budget to revenue-critical pages.' },
              { n: '02', title: 'Schema & Entity Markup', desc: 'Custom JSON-LD for LocalBusiness, services, founders, and case studies — structured for Knowledge Graph and AI retrieval.' },
              { n: '03', title: 'Core Web Vitals', desc: 'LCP, INP, and CLS optimization via image format upgrades, render-blocking script elimination, and template rewrites.' },
              { n: '04', title: 'Content Architecture', desc: 'Entity-based heading structure, topical depth, and internal link architecture aligned to Google\'s semantic ranking model.' },
              { n: '05', title: 'AI Crawler Compatibility', desc: 'Server-rendered HTML delivered before JS executes — ensuring content is visible to GPTBot, ClaudeBot, and Perplexity crawlers.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white border border-gray-200 p-6 shadow-sm" data-anim="up">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 mb-3 block">{n}</span>
                <h4 className="text-sm font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl" data-anim="up">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-6 block">Common questions about on-page SEO in Los Angeles</span>
            <div className="space-y-4">
              {[
                {
                  q: 'What is on-page SEO and why does it matter?',
                  a: 'On-page SEO is the optimization of everything within a page itself: HTML structure, title and meta tags, heading hierarchy, schema markup, content depth, internal links, page speed, and Core Web Vitals. Unlike off-page SEO (backlinks), every on-page factor is entirely within your control. In 2026, on-page quality is also the primary determinant of whether your content is cited by AI search tools like Google AI Mode, ChatGPT, and Perplexity.'
                },
                {
                  q: 'How is Gobiya\'s on-page SEO different from standard SEO agencies?',
                  a: 'Gobiya implements on-page SEO directly in code rather than through plugins or bulk page-builders. This produces cleaner semantic structure, faster rendering, and more precise schema implementation than consumer-grade tools can achieve. Every fix is also validated against AI crawler requirements — not just traditional Googlebot — ensuring visibility in both standard search results and AI Overviews.'
                },
                {
                  q: 'How long does on-page SEO take to show results in Los Angeles?',
                  a: 'Technical on-page fixes (redirect cleanup, canonical corrections, schema) typically produce measurable rank changes within 2–4 weeks as Google recrawls updated pages. Content depth and entity optimization take 60–90 days. Core Web Vitals improvements show ranking impact within 1–3 crawl cycles after implementation. The exact timeline depends on how frequently Google crawls the site, which is itself influenced by how active and authoritative the domain is.'
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

      {/* CHECKLIST SECTION */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Action Checklist</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              How We Audit On-Page Code
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Explore the diagnostic sequence we execute on every project to restore lost organic search traffic and establish long-term ranking stability.
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
                checklist-item-details.log
              </div>
              <div className="p-8 lg:p-10 flex-grow flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{AUDIT_STEPS[activeChecklist].title}</h4>
                <p className="text-gray-600 font-medium mb-6">{AUDIT_STEPS[activeChecklist].short}</p>
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                <p className="text-gray-500 leading-relaxed mb-8">{AUDIT_STEPS[activeChecklist].detail}</p>
                <a href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-auto">
                  Request this audit on your website
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
