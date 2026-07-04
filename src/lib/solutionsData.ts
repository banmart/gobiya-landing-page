export interface SolutionData {
  path: string;
  breadcrumbLabel: string;
  hero: {
    lines: string[];
    accentLineIndex: number;
    sub: string;
    ctaText: string;
    meta: {
      label1: string; value1: string;
      label2: string; value2: string;
      label3: string; value3: string;
    };
  };
  exhibit: {
    id: string;
    leftPane: { head: string; pill: string; pillClass: string; code: string[]; verdict: string; verdictClass: string; };
    rightPane: { head: string; pill: string; pillClass: string; code: string[]; verdict: string; verdictClass: string; };
    footLeft: string;
    footRight: string;
    captionLeft: string;
    captionRight: string;
  };
  tickerItems: { label: string; em: string; }[];
  stats: { num: string; sub?: string; tag: string; desc: string; }[];
  engSectionTitle: string;
  engGrid: {
    railNote: string;
    mainText: string[];
    vitals: {
      headLeft: string;
      headRight: string;
      rows: { label: string; score: string; percent: number; }[];
      footLabel: string;
      footValue: string;
    };
    caps: { tag: string; title: string; desc: string; sys: string; }[];
  };
  methodSection: {
    railNote: string;
    mainTitle: string;
    mainSub: string;
    phases: { tag: string; title: string; desc: string; sysTags: string[]; }[];
  };
  caseSection: {
    headline: string;
    tag: string;
    desc: string;
    chartTitleLeft: string;
    chartTitleRight: string;
    chartMetaLeft: string;
    chartMetaRight: string;
    ctaText: string;
    ctaLink: string;
  };
  faqs: { q: string; a: string; }[];
  ctaSection: {
    headline: string;
    sub: string;
    btnText: string;
  };
}

export const SOLUTIONS_DATA: Record<string, SolutionData> = {
  '/performance/web-development-agency': {
    path: '/performance/web-development-agency',
    breadcrumbLabel: 'Web Development',
    hero: {
      lines: ['React Web Development:', 'Hand-coded React.', 'Sub-second loads.', 'Built to rank.'],
      accentLineIndex: 3,
      sub: `As experts in React Web Development, gOBIYA replaces slow page-builders with custom, hand-coded React and Next.js websites — engineered to convert visitors and rank natively. Search readiness isn't a marketing add-on. It's a property of correct engineering.`,
      ctaText: 'Start a custom build',
      meta: {
        label1: 'Stack', value1: 'React · Next.js · Vite · Supabase',
        label2: 'Templates used', value2: 'Zero — every component hand-coded',
        label3: 'Delivery standard', value3: '100/100 Core Web Vitals, natively'
      }
    },
    exhibit: {
      id: 'EXH-003 / crawler render test',
      leftPane: {
        head: 'Page-builder SPA', pill: 'what bots see', pillClass: 'bad',
        code: [
          '<span class="dim">$ curl -A "GPTBot" theirsite.com</span>',
          '<span class="tag">&lt;body&gt;</span>',
          '&nbsp;&nbsp;<span class="tag">&lt;div</span> <span class="attr">id=</span><span class="str">"root"</span><span class="tag">&gt;&lt;/div&gt;</span>',
          '&nbsp;&nbsp;<span class="tag">&lt;script </span><span class="attr">src=</span><span class="str">"bundle.4MB.js"</span><span class="tag">&gt;</span>',
          '<span class="tag">&lt;/body&gt;</span>',
          '<span class="dim">// content: none. headings: none.</span>',
          '<span class="dim">// schema: none. text: none.</span>'
        ],
        verdict: 'verdict: blank page<br/>soft-404 risk · not cited · not ranked', verdictClass: 'bad'
      },
      rightPane: {
        head: 'GOBIYA build', pill: 'what bots see', pillClass: 'good',
        code: [
          '<span class="dim">$ curl -A "GPTBot" yoursite.com</span>',
          '<span class="tag">&lt;main&gt;</span>',
          '&nbsp;&nbsp;<span class="tag">&lt;h1&gt;</span>Your service, your city<span class="tag">&lt;/h1&gt;</span>',
          '&nbsp;&nbsp;<span class="tag">&lt;article&gt;</span>…full content…<span class="tag">&lt;/article&gt;</span>',
          '&nbsp;&nbsp;<span class="tag">&lt;script </span><span class="attr">type=</span><span class="str">"ld+json"</span><span class="tag">&gt;</span>',
          '&nbsp;&nbsp;&nbsp;&nbsp;<span class="ok">{ "@type": "LocalBusiness" … }</span>',
          '<span class="tag">&lt;/main&gt;</span> <span class="dim">// TTFB: 0.4s</span>'
        ],
        verdict: 'verdict: fully rendered<br/>indexed · cited by LLMs · ranking', verdictClass: 'good'
      },
      footLeft: 'same content — different engineering', footRight: 'Googlebot · GPTBot · ClaudeBot',
      captionLeft: 'Fig. 1 — why hand-coded SSR wins the index', captionRight: '34.05°N 118.24°W'
    },
    tickerItems: [
      { label: 'React', em: '— hand-coded' },
      { label: 'Next.js', em: '— SSR native' },
      { label: 'Vite', em: '— minimal footprint' },
      { label: 'Supabase', em: '— wired in' },
      { label: 'Googlebot', em: '— full render' },
      { label: 'GPTBot', em: '— cited' }
    ],
    stats: [
      { num: '100', sub: '/100', tag: 'Core Web Vitals', desc: 'Achieved natively across all builds, ensuring algorithmic advantage.' },
      { num: '0.6', sub: 's', tag: 'Load Time', desc: 'Average TTFB. Removing bounce rates and capturing high-intent prospects.' },
      { num: '0', tag: 'Templates', desc: 'Pure custom JavaScript/CSS codebase tailored entirely to your conversion paths.' },
      { num: '3', sub: 'x', tag: 'Pipeline', desc: 'Increase in inbound inquiries for brands migrating from bloated CMS stacks.' }
    ],
    engSectionTitle: 'Engineering the technical baseline.',
    engGrid: {
      railNote: 'Search placement requires flawless technical execution before content even matters.',
      mainText: [
        'Page-builders and generalist dev shops ship JavaScript-bloated SPAs that crawlers can\'t render, resulting in empty indexation and lost ranks. If a bot drops the crawl due to timeout, your content does not exist to the algorithm.',
        'We build search-ready, high-speed custom codebases. Every component is hand-written, server-rendered via Next.js or static generators, and styled without heavy CSS frameworks.'
      ],
      vitals: {
        headLeft: 'CWV Profile', headRight: 'stable',
        rows: [
          { label: 'LCP', score: '0.8s', percent: 95 },
          { label: 'FID', score: '12ms', percent: 98 },
          { label: 'CLS', score: '0.01', percent: 99 },
          { label: 'TTFB', score: '180ms', percent: 92 }
        ],
        footLabel: 'overall technical health', footValue: 'Exceptional'
      },
      caps: [
        { tag: 'SSR / SSG', title: 'Prerendering Pipelines', desc: 'We deploy server-side rendering so search crawlers and AI bots read complete HTML instantly.', sys: 'sys_build.jsx' },
        { tag: 'Architecture', title: 'Semantic Hierarchy', desc: 'We write clean markup that maps your information architecture perfectly to Googlebot.', sys: 'sys_dom.html' },
        { tag: 'Speed', title: 'Core Vitals Dominance', desc: 'Every build passes Google speed audits out of the box, maximizing search eligibility.', sys: 'sys_vitals.log' },
        { tag: 'Conversion', title: 'CRO Engineering', desc: 'CTA paths, form architecture, and trust signals are coded directly into the core layout.', sys: 'sys_ux.ts' }
      ]
    },
    methodSection: {
      railNote: 'Our deployment pipeline ensures zero SEO drop-off during migration.',
      mainTitle: 'How we engineer your custom React platforms.',
      mainSub: 'Building a search-first codebase requires a completely different workflow than standing up a WordPress template.',
      phases: [
        { tag: 'Phase 01', title: 'Architecture & Design', desc: 'We map your user flow and design custom interface components optimized specifically for your target audience, conversion paths, and device profiles.', sysTags: ['UX_FLOW', 'FIGMA_SYNC'] },
        { tag: 'Phase 02', title: 'Component Coding', desc: 'We build your website from scratch, engineering responsive custom CSS layout structures and modular component trees with zero template code.', sysTags: ['REACT', 'VITE', 'TAILWIND'] },
        { tag: 'Phase 03', title: 'Data Layer Connection', desc: 'We wire up API gateways, database backends, and codebase-level CRM components directly into the application state.', sysTags: ['SUPABASE', 'POSTGRES'] },
        { tag: 'Phase 04', title: 'Prerendering & Handoff', desc: 'We build the static and SSR pathways to guarantee sub-second loads, compile sitemaps, audit core web vitals, and hand off an optimized product.', sysTags: ['SSR', 'LIGHTHOUSE_AUDIT'] }
      ]
    },
    caseSection: {
      headline: 'SmileCenter Dentistry — 5x patient pipeline.',
      tag: 'Web Development & Local SEO',
      desc: 'By migrating from a bloated WordPress setup to a custom, lightning-fast React application with native LocalBusiness schemas, we grew patient appointments and phone calls fivefold.',
      chartTitleLeft: 'Inbound Inquiries', chartTitleRight: 'migration point',
      chartMetaLeft: 'pre-migration', chartMetaRight: 'post-migration',
      ctaText: 'View the case study', ctaLink: '/case-studies'
    },
    faqs: [
      { q: 'Our site is slow and we keep losing leads before they fill out the form. Can you fix it without rebuilding from scratch?', a: 'Usually we can diagnose the problem first — slow sites typically fail on a handful of specific issues: unoptimized images, render-blocking scripts, third-party tag bloat, or no server-side caching. A technical audit tells us whether a targeted fix is possible or whether the architecture is so constrained that a rebuild is the only real path. We tell you which it is before any work starts.' },
      { q: 'We are not technical. How involved do we actually need to be during the build?', a: 'You need to be involved in decisions about what the site should do, who it should reach, and what a successful outcome looks like. You do not need to understand React, SSR, or any of the technical implementation. We run the build, you review and approve the outcomes. Most clients describe it as similar to working with an architect — you choose the rooms, we handle the structure.' },
      { q: 'How do we make sure the new site actually ranks in Google after launch?', a: 'We build ranking architecture into the site from day one: server-side rendering so every page delivers full HTML to Googlebot, structured data (JSON-LD schema) so search engines understand your business, Core Web Vitals targets built into the performance budget, and a clean URL structure with correct canonical tags. These are not add-ons after launch — they are part of the build spec.' },
      { q: 'What happens after the site goes live? Do we own the code?', a: 'You own everything — the codebase, the hosting infrastructure, the domain, and the data. There are no monthly platform fees, no vendor lock-in, and no ongoing dependency on us unless you choose to continue working together. We hand over the full repository and document the architecture so any competent developer can maintain it.' }
    ],
    ctaSection: {
      headline: 'Ready for sub-second performance?',
      sub: 'Stop losing leads to slow load times and blank-page index errors. Let\'s build a custom engine for your brand.',
      btnText: 'Start your build'
    }
  },

  '/performance/native-crm-agency': {
    path: '/performance/native-crm-agency',
    breadcrumbLabel: 'Native CRM',
    hero: {
      lines: ['Native CRM Agency:', 'Own your data.', 'Zero monthly fees.', 'Custom pipelines.'],
      accentLineIndex: 3,
      sub: `As a native CRM agency, we build custom CRM integrations directly into your codebase. Stop paying for expensive SaaS subscriptions — own your pipeline data with complete control and instant lead routing.`,
      ctaText: 'Build your CRM',
      meta: {
        label1: 'Architecture', value1: 'PostgreSQL · Supabase · Server Actions',
        label2: 'Ongoing Fees', value2: '$0 SaaS subscriptions',
        label3: 'Security', value3: 'Row-Level Security (RLS) native'
      }
    },
    exhibit: {
      id: 'EXH-004 / lead routing latency',
      leftPane: {
        head: '3rd Party SaaS CRM', pill: 'zapier webhook', pillClass: 'bad',
        code: [
          '<span class="dim">// User submits form -> Wait for Zapier</span>',
          '<span class="tag">POST</span> /webhook/zapier-catch <span class="dim">status: pending...</span>',
          '<span class="warn">Warning: Rate limit exceeded or API lag</span>',
          '<span class="tag">GET</span> /salesforce-api/auth',
          '<span class="dim">Lead inserted after 45 seconds</span>'
        ],
        verdict: 'verdict: high latency<br/>potential lead drop · api dependency', verdictClass: 'bad'
      },
      rightPane: {
        head: 'GOBIYA Native CRM', pill: 'direct insert', pillClass: 'good',
        code: [
          '<span class="dim">// User submits form -> Direct to DB</span>',
          '<span class="ok">await</span> supabase.from(<span class="str">"leads"</span>).insert(data)',
          '<span class="ok">201 Created</span> <span class="dim">latency: 42ms</span>',
          '<span class="dim">// Real-time socket fires</span>',
          '<span class="ok">dispatch</span>(NotifySalesTeam)'
        ],
        verdict: 'verdict: instantaneous<br/>zero drop off · total data control', verdictClass: 'good'
      },
      footLeft: 'infrastructure comparison', footRight: 'Webhooks vs Direct DB',
      captionLeft: 'Fig. 2 — removing API middleman latency', captionRight: 'sys_logs/latency'
    },
    tickerItems: [
      { label: 'PostgreSQL', em: '— relational data' },
      { label: 'Supabase', em: '— real-time' },
      { label: 'RLS', em: '— secure access' },
      { label: 'React', em: '— custom views' },
      { label: 'Zapier', em: '— eliminated' },
      { label: 'Fees', em: '— zero' }
    ],
    stats: [
      { num: '$0', tag: 'SaaS Fees', desc: 'No ongoing per-seat licensing by hosting your pipeline natively.' },
      { num: '100', sub: '%', tag: 'Data Ownership', desc: 'Keep sensitive customer info inside your own secure infrastructure.' },
      { num: '45', sub: 'ms', tag: 'Lead Routing', desc: 'Route prospects from form to sales notification in milliseconds.' },
      { num: '10', sub: 'x', tag: 'Visibility', desc: 'Customized database views tailored exactly to your business process.' }
    ],
    engSectionTitle: 'Lead management at the code layer.',
    engGrid: {
      railNote: 'Integrating heavy third-party CRMs bloats your site and creates security leaks.',
      mainText: [
        'Third-party tools require bulky JavaScript tracking scripts that hurt your load times and rely on fragile API bridges (like Zapier) that frequently break or delay lead routing.',
        'We build lightweight, secure database routes directly into your React codebase. Leads flow instantly from the UI layer into a scalable PostgreSQL database you own.'
      ],
      vitals: {
        headLeft: 'Pipeline Health', headRight: 'optimal',
        rows: [
          { label: 'Insert Time', score: '42ms', percent: 99 },
          { label: 'Data Leak', score: '0%', percent: 100 },
          { label: 'Uptime', score: '99.9%', percent: 99 },
          { label: 'API Limits', score: 'None', percent: 100 }
        ],
        footLabel: 'integration efficiency', footValue: 'Maximum'
      },
      caps: [
        { tag: 'Database', title: 'Codebase-Level Routing', desc: 'We program lead flows directly into server handlers, cutting out third-party lag.', sys: 'sys_db.ts' },
        { tag: 'Security', title: 'Secure Architecture', desc: 'We utilize serverless databases with custom row-level security policies.', sys: 'sys_auth.json' },
        { tag: 'UX', title: 'Custom Sales Views', desc: 'We design high-speed admin dashboards tailored precisely to your workflow.', sys: 'sys_admin.jsx' },
        { tag: 'Scale', title: 'Self-Hosted Control', desc: 'If you scale, your CRM scales with you at standard cloud server costs.', sys: 'sys_scale.log' }
      ]
    },
    methodSection: {
      railNote: 'Building a CRM means modeling your business, not adapting to a template.',
      mainTitle: 'Building your proprietary data engine.',
      mainSub: 'We don\'t just install software; we engineer a data pipeline mapped to your exact sales process.',
      phases: [
        { tag: 'Phase 01', title: 'Workflow Mapping', desc: 'We map your current sales lifecycle, contact steps, and internal workflows to define custom database fields.', sysTags: ['SCHEMA_DESIGN'] },
        { tag: 'Phase 02', title: 'Database Provisioning', desc: 'We set up your serverless database and configure strict security credentials to protect user data.', sysTags: ['POSTGRES', 'RLS_POLICY'] },
        { tag: 'Phase 03', title: 'Codebase Integration', desc: 'We code custom forms and secure API handlers directly into your React application to manage data flows.', sysTags: ['SERVER_ACTIONS'] },
        { tag: 'Phase 04', title: 'Dashboard Implementation', desc: 'We build an ultra-fast internal admin console that lets reps manage pipelines on autopilot.', sysTags: ['REACT_ADMIN'] }
      ]
    },
    caseSection: {
      headline: 'Enterprise Logistics firm builds proprietary $4.2M pipeline.',
      tag: 'Custom Integration',
      desc: 'By migrating from a bloated HubSpot setup to a custom, codebase-integrated lead database, the team scaled to millions in pipeline on $0 software fees.',
      chartTitleLeft: 'Pipeline Value', chartTitleRight: 'migration point',
      chartMetaLeft: 'paying $2k/mo', chartMetaRight: 'paying $0/mo',
      ctaText: 'Request CRM demo', ctaLink: '/book'
    },
    faqs: [
      { q: 'We manage leads in spreadsheets right now. At what point does that actually become a problem?', a: 'The threshold is usually when leads start falling through the cracks — a follow-up missed because someone forgot to update the sheet, a deal lost because two people thought the other was handling it, or a reporting question that takes half a day to answer. If you have more than a few leads per week and more than one person touching them, you are almost certainly losing revenue to process friction. We have seen teams running a $2M pipeline on a Google Sheet and discovering what that was costing them only after building something better.' },
      { q: 'We already use HubSpot. Why would we consider switching?', a: 'The honest answer is that HubSpot makes sense for some businesses and is a significant drag on others. If your pipeline maps cleanly to HubSpot\'s data model and you are not paying more than the value you are extracting from it, stay. If you are paying per seat, fighting with fields that don\'t match your actual workflow, or exporting data to do analysis HubSpot should be handling natively, a custom build often pays for itself within 12 months.' },
      { q: 'How long before our team can actually use it day-to-day?', a: 'A focused CRM build — intake forms, pipeline stages, contact records, basic reporting — typically goes from brief to deployed in four to six weeks. The first two weeks are architecture and data model design. The following two are build and testing. Week six is internal rollout with your team. More complex builds with custom automation or legacy data migration take longer; we scope that before anything starts.' },
      { q: 'What if we need to change how our pipeline works after it is built?', a: 'Because it is your own codebase rather than a third-party platform, changes are a matter of development work, not plan upgrades or permission requests. New pipeline stages, custom fields, reporting dashboards, integrations with other tools — all of it is additive. We can make those changes, or any developer familiar with the stack can.' }
    ],
    ctaSection: {
      headline: 'Stop renting your data.',
      sub: 'Own your customer pipeline with a custom database engineered directly into your application.',
      btnText: 'Build your CRM'
    }
  },

  '/performance/seo-discoverability-agency': {
    path: '/performance/seo-discoverability-agency',
    breadcrumbLabel: 'Technical SEO',
    hero: {
      lines: ['Technical SEO Services:', 'Eligible by design.', 'Semantic entity graphs.', 'AI-overview ready.'],
      accentLineIndex: 3,
      sub: `As experts in Technical SEO Services, we build technical SEO into the codebase. Ensure search engines and AI crawlers can fetch, index, and cite your pages natively by default.`,
      ctaText: 'Build a search-ready site',
      meta: {
        label1: 'Markup', value1: 'Semantic HTML5 · JSON-LD',
        label2: 'Target Bots', value2: 'Googlebot · GPTBot · ClaudeBot',
        label3: 'Focus', value3: 'Indexation & Information Architecture'
      }
    },
    exhibit: {
      id: 'EXH-005 / entity extraction',
      leftPane: {
        head: 'Standard SEO', pill: 'keyword stuffing', pillClass: 'bad',
        code: [
          '<span class="tag">&lt;title&gt;</span>Best Plumber Los Angeles Cheap<span class="tag">&lt;/title&gt;</span>',
          '<span class="tag">&lt;meta</span> <span class="attr">name=</span><span class="str">"keywords"</span> <span class="attr">content=</span><span class="str">"plumber, LA, cheap"</span><span class="tag">&gt;</span>',
          '<span class="dim">// LLM sees unstructured text</span>',
          '<span class="warn">Warning: Low entity confidence.</span>',
          '<span class="warn">Excluded from Generative Overview.</span>'
        ],
        verdict: 'verdict: low relevance<br/>ignored by AI engines', verdictClass: 'bad'
      },
      rightPane: {
        head: 'GOBIYA Schema Graph', pill: 'verified entity', pillClass: 'good',
        code: [
          '<span class="tag">&lt;script </span><span class="attr">type=</span><span class="str">"application/ld+json"</span><span class="tag">&gt;</span>',
          '<span class="ok">{</span>',
          '&nbsp;&nbsp;<span class="str">"@type"</span><span class="ok">: "LocalBusiness",</span>',
          '&nbsp;&nbsp;<span class="str">"name"</span><span class="ok">: "Elite Plumbing",</span>',
          '&nbsp;&nbsp;<span class="str">"sameAs"</span><span class="ok">: ["https://en.wikipedia.org/wiki/..."]</span>',
          '<span class="ok">}</span>',
          '<span class="tag">&lt;/script&gt;</span> <span class="dim">// 100% Entity Match</span>'
        ],
        verdict: 'verdict: strong semantic link<br/>high probability of AI citation', verdictClass: 'good'
      },
      footLeft: 'schema engineering', footRight: 'JSON-LD · Wikidata',
      captionLeft: 'Fig. 3 — structuring data for AI overview inclusion', captionRight: 'sys_seo/graph'
    },
    tickerItems: [
      { label: 'JSON-LD', em: '— nested schema' },
      { label: 'Entities', em: '— linked data' },
      { label: 'Googlebot', em: '— 100% crawl' },
      { label: 'GPTBot', em: '— parsed' },
      { label: 'Sitemap', em: '— dynamic' },
      { label: 'Index', em: '— healthy' }
    ],
    stats: [
      { num: '100', sub: '%', tag: 'Indexation', desc: 'Resolving blank-page errors to ensure crawlers fetch fully-rendered HTML.' },
      { num: '0.4', sub: 's', tag: 'TTFB', desc: 'Enabling Googlebot to crawl more pages per session to boost crawl budget.' },
      { num: '85', sub: '%', tag: 'AI Bias', desc: 'AI search favors structured JSON-LD layouts over generic text blobs.' },
      { num: '0', tag: 'Spam', desc: 'Focusing on real information architecture, not outdated keyword stuffing.' }
    ],
    engSectionTitle: 'Search readiness is a product of correct engineering.',
    engGrid: {
      railNote: 'If your site is slow or hides content behind JS, you will stay invisible.',
      mainText: [
        'Traditional SEO agencies sell keyword optimization, but if your site\'s codebase is bloated or uses purely client-side rendering, search bots won\'t see your content.',
        'We build indexable sites. We inject clean, nested schema graphs, configure proper routing, and deliver server-rendered HTML so every page is immediately accessible to crawlers.'
      ],
      vitals: {
        headLeft: 'Crawl Stats', headRight: 'healthy',
        rows: [
          { label: 'Pages Indexed', score: '100%', percent: 100 },
          { label: 'Soft 404s', score: '0', percent: 100 },
          { label: 'Schema Errors', score: '0', percent: 100 },
          { label: 'Bot Blocked', score: '0%', percent: 100 }
        ],
        footLabel: 'search console status', footValue: 'Verified'
      },
      caps: [
        { tag: 'Schema', title: 'Semantic Entity Graphs', desc: 'We inject nested JSON-LD to link your brand directly to verified entity nodes.', sys: 'sys_schema.json' },
        { tag: 'Crawlers', title: 'Bot Optimization', desc: 'We configure robots.txt and dynamic sitemaps for Googlebot and ClaudeBot.', sys: 'sys_robots.txt' },
        { tag: 'Links', title: 'Information Architecture', desc: 'We structure internal link paths to optimize equity flow to deep content hubs.', sys: 'sys_routing.ts' },
        { tag: 'Monitoring', title: 'Index Health', desc: 'Every build is tested against search engine render pipelines to guarantee inclusion.', sys: 'sys_gsc.log' }
      ]
    },
    methodSection: {
      railNote: 'A systematic approach to search discovery.',
      mainTitle: 'Our engineering path to indexing.',
      mainSub: 'We don\'t guess at rankings; we engineer compliance with algorithmic guidelines.',
      phases: [
        { tag: 'Phase 01', title: 'Architecture Mapping', desc: 'We design your page hierarchy to reflect the semantic structure of your industry, preventing keyword cannibalization.', sysTags: ['TOPIC_CLUSTERS'] },
        { tag: 'Phase 02', title: 'SSR Configuration', desc: 'We set up server-side rendering pipelines so every page delivers complete HTML to search bots.', sysTags: ['NEXTJS_SSR'] },
        { tag: 'Phase 03', title: 'Graph Injection', desc: 'We write and deploy custom JSON-LD schema profiles for your organization and services.', sysTags: ['JSON_LD', 'WIKIDATA'] },
        { tag: 'Phase 04', title: 'Bot Verification', desc: 'We submit XML sitemaps, verify indexing status in Search Console, and test bot accessibility.', sysTags: ['SEARCH_CONSOLE'] }
      ]
    },
    caseSection: {
      headline: 'Fixing local crawl bloat to 5x patient volume.',
      tag: 'Technical Recovery',
      desc: 'By correcting JavaScript render errors and deploying dedicated fast subpages with correct LocalBusiness schemas, we restored visibility and multiplied phone calls.',
      chartTitleLeft: 'Indexed Pages', chartTitleRight: 'migration point',
      chartMetaLeft: 'soft 404s', chartMetaRight: '100% valid',
      ctaText: 'View the case study', ctaLink: '/success-stories'
    },
    faqs: [
      { q: 'We have been publishing blog posts for two years and our organic traffic has barely moved. What are we doing wrong?', a: 'The most common cause is a content strategy that targets keywords without a supporting architecture. Individual articles rarely rank in isolation — they need a hub page with clear topical authority, internal links flowing from supporting content to the hub, and enough semantic depth that Google recognizes the site as genuinely expert on the topic. Two years of isolated articles with no cluster structure is also a technical SEO problem: the content exists but the authority signal is scattered rather than concentrated.' },
      { q: 'Our competitor has a worse-looking website and outranks us on everything. How is that possible?', a: 'Looks have almost nothing to do with rankings. What determines rank is the strength of the signal: how well the page answers the query, how strong the site\'s domain authority is, how clean the technical foundation is, and how clearly the page communicates what it is about to crawlers. A poorly designed site with strong backlinks, clean technical SEO, and well-structured content will outrank a beautiful site that Google cannot read clearly. The audit almost always reveals a gap in one of those three areas.' },
      { q: 'We cannot tell if our current SEO agency is actually doing anything useful. What should we see after six months?', a: 'At six months, you should see measurable movement on at least a subset of target keywords — not necessarily top-three positions, but movement from position 30 to position 12 on specific terms, or new impressions for queries you were not appearing for before. You should also have a clear record of what was changed and when: specific technical fixes, content published or restructured, links acquired. If you cannot answer those questions and your rankings have not moved, that is a signal worth paying attention to.' },
      { q: 'We rank for our own brand name but nothing else. How do we change that?', a: 'Brand-only rankings mean Google has recognized your entity but has no confidence in your topical authority for non-branded queries. The fix is a structured content program: a primary service or product page optimized for the specific commercial intent you want to own, supported by content that answers the research questions buyers ask before they are ready to convert. That cluster signals authority on the topic. Brand rankings are a starting point — topical authority is what produces pipeline.' }
    ],
    ctaSection: {
      headline: 'Remove technical roadblocks.',
      sub: 'Don\'t let a bloated codebase hide your business from search engines and AI crawlers.',
      btnText: 'Audit your site'
    }
  },

  '/performance/blockchain-web3-development-agency': {
    path: '/performance/blockchain-web3-development-agency',
    breadcrumbLabel: 'Web3 & Blockchain',
    hero: {
      lines: ['Blockchain & Web3 Development:', 'Smart contracts.', 'dApp interfaces.', 'On-chain security.'],
      accentLineIndex: 3,
      sub: `As experts in Web3 Development, we provide custom blockchain Web3 development, engineering secure smart contracts and seamless dApp interfaces directly into your React web applications.`,
      ctaText: 'Start a Web3 project',
      meta: {
        label1: 'Languages', value1: 'Solidity · TypeScript',
        label2: 'Chains', value2: 'Ethereum · Pulsechain',
        label3: 'Security', value3: 'Audited & Fuzzed Contracts'
      }
    },
    exhibit: {
      id: 'EXH-006 / contract execution',
      leftPane: {
        head: 'Vulnerable Contract', pill: 'reentrancy risk', pillClass: 'bad',
        code: [
          '<span class="tag">function</span> <span class="ok">withdraw</span>() <span class="tag">public</span> {',
          '&nbsp;&nbsp;<span class="tag">uint</span> bal = balances[msg.sender];',
          '&nbsp;&nbsp;<span class="dim">// External call before state update</span>',
          '&nbsp;&nbsp;(bool sent, ) = msg.sender.call{value: bal}("");',
          '&nbsp;&nbsp;balances[msg.sender] = 0;',
          '}'
        ],
        verdict: 'verdict: critical flaw<br/>susceptible to reentrancy drain', verdictClass: 'bad'
      },
      rightPane: {
        head: 'GOBIYA Audited', pill: 'checks-effects-interactions', pillClass: 'good',
        code: [
          '<span class="tag">function</span> <span class="ok">withdraw</span>() <span class="tag">public</span> nonReentrant {',
          '&nbsp;&nbsp;<span class="tag">uint</span> bal = balances[msg.sender];',
          '&nbsp;&nbsp;<span class="dim">// State update before external call</span>',
          '&nbsp;&nbsp;balances[msg.sender] = 0;',
          '&nbsp;&nbsp;(bool sent, ) = msg.sender.call{value: bal}("");',
          '}'
        ],
        verdict: 'verdict: secure<br/>passes static analysis & fuzzing', verdictClass: 'good'
      },
      footLeft: 'security invariant testing', footRight: 'Solidity · Foundry',
      captionLeft: 'Fig. 4 — strictly enforcing the checks-effects pattern', captionRight: 'sys_web3/audit'
    },
    tickerItems: [
      { label: 'Solidity', em: '— secure logic' },
      { label: 'Pulsechain', em: '— EVM scaling' },
      { label: 'Ethers.js', em: '— integration' },
      { label: 'Wagmi', em: '— react hooks' },
      { label: 'Foundry', em: '— testing' },
      { label: 'SIWE', em: '— auth' }
    ],
    stats: [
      { num: '100', sub: '%', tag: 'Audited', desc: 'Smart contracts are rigorously tested against known exploitation vectors.' },
      { num: '0.8', sub: 's', tag: 'Wallet Connect', desc: 'Sub-second wallet connection times for a frictionless Web3 UX.' },
      { num: '0', tag: 'Passwords', desc: 'Decentralized SIWE authentication giving users total control.' },
      { num: 'Dual', tag: 'Chain', desc: 'Expert engineering tailored specifically for Ethereum and Pulsechain protocols.' }
    ],
    engSectionTitle: 'Decentralized features. Clean execution.',
    engGrid: {
      railNote: 'Web3 apps need a fast, secure bridge between the blockchain state and the user interface.',
      mainText: [
        'A sloppy smart contract can lead to catastrophic fund loss, and a clunky dApp interface will drive users away before they even connect their wallets.',
        'We write secure Solidity contracts, and build lightweight React interfaces that interact directly with RPC nodes. We handle the complex state management of blockchain events so your users get a Web2-level smooth experience.'
      ],
      vitals: {
        headLeft: 'Security Profile', headRight: 'verified',
        rows: [
          { label: 'Unit Tests', score: '100%', percent: 100 },
          { label: 'Fuzzing', score: 'Pass', percent: 100 },
          { label: 'Reentrancy', score: 'Secured', percent: 100 },
          { label: 'RPC Latency', score: '<150ms', percent: 95 }
        ],
        footLabel: 'mainnet readiness', footValue: 'Cleared'
      },
      caps: [
        { tag: 'Contracts', title: 'Smart Contract Engineering', desc: 'We write clean, secure code calibrated to execute logic safely.', sys: 'sys_solidity.sol' },
        { tag: 'UI / UX', title: 'dApp Interface Design', desc: 'We integrate wallet connections and transaction listeners directly into React.', sys: 'sys_wagmi.tsx' },
        { tag: 'Data', title: 'On-Chain Ledger Sync', desc: 'We build custom indexers to render on-chain transactions in real time.', sys: 'sys_indexer.ts' },
        { tag: 'Auth', title: 'SIWE Authentication', desc: 'Sign-in with Ethereum to authenticate users securely without passwords.', sys: 'sys_auth.jwt' }
      ]
    },
    methodSection: {
      railNote: 'Security first. Every line of contract code is tested before deployment.',
      mainTitle: 'Our engineering path to Web3 integration.',
      mainSub: 'From tokenomics design to mainnet deployment, we handle the entire decentralized stack.',
      phases: [
        { tag: 'Phase 01', title: 'Architecture & Tokenomics', desc: 'We map out your contract logic, state variables, and security invariants to draft architecture.', sysTags: ['UML', 'SYSTEM_DESIGN'] },
        { tag: 'Phase 02', title: 'Contract Coding & Testing', desc: 'We write the contract code, running extensive unit tests and security fuzzing in local Foundry environments.', sysTags: ['SOLIDITY', 'FOUNDRY'] },
        { tag: 'Phase 03', title: 'React Integration', desc: 'We integrate wallet login and transaction hooks into your application using wagmi and ethers.js.', sysTags: ['REACT', 'WAGMI'] },
        { tag: 'Phase 04', title: 'Testnet to Mainnet', desc: 'We deploy to blockchain testnets for validation before pushing the final verified versions to mainnet.', sysTags: ['DEPLOY', 'ETHERSCAN_VERIFY'] }
      ]
    },
    caseSection: {
      headline: 'DeFi Analytics platform hits 85K connected wallets.',
      tag: 'Web3 SaaS',
      desc: 'By building a lightning-fast React interface with decentralized wallet authentication and native transaction listeners, we created a seamless Web3 onboarding funnel.',
      chartTitleLeft: 'Active Wallets', chartTitleRight: 'launch day',
      chartMetaLeft: 'testnet', chartMetaRight: 'mainnet scale',
      ctaText: 'Request consultation', ctaLink: '/book'
    },
    faqs: [
      { q: 'We have an idea that might involve blockchain, but we are not sure we actually need it. How do we figure that out?', a: 'The first question is whether trust, transparency, or ownership needs to be verified by parties who do not trust each other — and whether that verification needs to happen without a central authority. If the answer is no, a traditional database is almost always faster, cheaper, and simpler. If the answer is yes — a token with verifiable scarcity, an ownership record that cannot be altered by one party, a contract that executes automatically on-chain without an intermediary — then blockchain is the right tool. We run a scoping session before any engagement to answer this honestly.' },
      { q: 'We have heard about smart contract exploits losing millions. How do we know ours will be secure?', a: 'Smart contract exploits almost always fall into a small number of known vulnerability categories: reentrancy attacks, integer overflow, unprotected ownership functions, and oracle manipulation. We write contracts using OpenZeppelin\'s audited libraries as a base, follow the Checks-Effects-Interactions pattern to prevent reentrancy, and run fuzz testing to probe edge cases before any mainnet deployment. We also recommend independent third-party audits for contracts that will hold significant value.' },
      { q: 'Can we build something that regular users can interact with, not just crypto-native people?', a: 'Yes, and this is increasingly the expectation. Modern wallet solutions like Sign-In With Ethereum and social recovery wallets let users authenticate without managing seed phrases manually. We build interfaces in React that abstract blockchain interactions behind familiar UI patterns — a user can mint, transfer, or interact with a contract through a standard button without knowing anything about gas or transactions. The blockchain is the backend; the experience can be as simple as any other web app.' },
      { q: 'What is a realistic timeline and budget compared to a regular web application?', a: 'A Web3 project takes longer than a comparable traditional app, typically by 40 to 60 percent. Smart contract development, testing, and auditing add scope that does not exist in a standard build. A focused dApp — wallet connect, one core contract interaction, basic frontend — is a six to ten week project. More complex DeFi or multi-contract architectures run longer. We scope each project individually and give you a fixed timeline before work starts.' }
    ],
    ctaSection: {
      headline: 'Deploy secure decentralized apps.',
      sub: 'Bring your Web3 vision to mainnet with audited smart contracts and a frictionless user interface.',
      btnText: 'Start your Web3 build'
    }
  },

  '/performance/ai-prospect-scraper-agency': {
    path: '/performance/ai-prospect-scraper-agency',
    breadcrumbLabel: 'AI Prospecting',
    hero: {
      lines: ['AI Prospect Scraper:', 'Automated outreach.', 'Smart data capture.', 'Scale B2B leads.'],
      accentLineIndex: 3,
      sub: `As experts in AI Prospect Scraper, we build a custom AI prospect scraper directly into our native CRM, extracting target contact details and automating highly personalized outbound sequences.`,
      ctaText: 'Explore AI Prospecting',
      meta: {
        label1: 'Engine', value1: 'Puppeteer · LLM Parsing',
        label2: 'Integration', value2: 'Native Codebase CRM',
        label3: 'Output', value3: 'Verified NAP + Drip Campaigns'
      }
    },
    exhibit: {
      id: 'EXH-007 / llm data extraction',
      leftPane: {
        head: 'Raw DOM Target', pill: 'unstructured', pillClass: 'bad',
        code: [
          '<span class="tag">&lt;div</span> <span class="attr">class=</span><span class="str">"footer-text"</span><span class="tag">&gt;</span>',
          '&nbsp;&nbsp;Visit us in Seattle, or call Bob',
          '&nbsp;&nbsp;at 555-0199 for enterprise inquiries.',
          '&nbsp;&nbsp;Email: bob.smith@example.com',
          '<span class="tag">&lt;/div&gt;</span>'
        ],
        verdict: 'verdict: raw text blob<br/>hard to parse with regex', verdictClass: 'bad'
      },
      rightPane: {
        head: 'AI Extracted Profile', pill: 'structured JSON', pillClass: 'good',
        code: [
          '<span class="dim">// LLM processes text to strict schema</span>',
          '<span class="ok">{</span>',
          '&nbsp;&nbsp;<span class="str">"first_name"</span><span class="ok">: "Bob",</span>',
          '&nbsp;&nbsp;<span class="str">"last_name"</span><span class="ok">: "Smith",</span>',
          '&nbsp;&nbsp;<span class="str">"email"</span><span class="ok">: "bob.smith@example.com",</span>',
          '&nbsp;&nbsp;<span class="str">"location"</span><span class="ok">: "Seattle"</span>',
          '<span class="ok">}</span> <span class="dim">// ready for CRM insert</span>'
        ],
        verdict: 'verdict: clean relational data<br/>auto-inserted to outreach queue', verdictClass: 'good'
      },
      footLeft: 'unstructured text to database row', footRight: 'AI Parsing · Node.js',
      captionLeft: 'Fig. 5 — extracting decision makers with LLM agents', captionRight: 'sys_scraper/parse'
    },
    tickerItems: [
      { label: 'Puppeteer', em: '— headless crawl' },
      { label: 'LLM', em: '— smart extraction' },
      { label: 'NAP', em: '— verified data' },
      { label: 'CRM', em: '— auto insert' },
      { label: 'Drip', em: '— personalized' },
      { label: 'Scale', em: '— outbound' }
    ],
    stats: [
      { num: '10', sub: 'x', tag: 'Speed', desc: 'Faster lead generation compared to manual data entry.' },
      { num: '100', sub: '%', tag: 'Personalized', desc: 'Every drip email is tailored to the specific scraped context.' },
      { num: '0', tag: 'SaaS Fees', desc: 'Fully integrated natively, avoiding $2k/mo third-party subscriptions.' },
      { num: '24', sub: '/7', tag: 'Automated', desc: 'Continuously identifying and engaging targets while you sleep.' }
    ],
    engSectionTitle: 'Automate your outbound with intelligent data capture.',
    engGrid: {
      railNote: 'Stop relying on outdated lead lists. Generate your own proprietary database.',
      mainText: [
        'Generic email blasts to purchased lists guarantee low open rates and domain blacklisting. Effective outbound requires highly personalized messaging based on accurate, fresh data.',
        'Our integrated AI scraper autonomously crawls target domains, uses LLMs to extract Name, Address, and Phone (NAP) details, and pipes that clean data directly into your Native CRM.'
      ],
      vitals: {
        headLeft: 'Extraction Stats', headRight: 'active',
        rows: [
          { label: 'Parse Accuracy', score: '98%', percent: 98 },
          { label: 'Email Verified', score: 'Yes', percent: 100 },
          { label: 'CRM Sync', score: 'Instant', percent: 100 },
          { label: 'Spam Rate', score: '<0.1%', percent: 99 }
        ],
        footLabel: 'outbound pipeline', footValue: 'Flowing'
      },
      caps: [
        { tag: 'Scraping', title: 'Intelligent NAP Extraction', desc: 'The AI engine autonomously scrapes verified contact data from accounts.', sys: 'sys_crawler.ts' },
        { tag: 'Content', title: 'Hyper-Personalization', desc: 'Each prospect receives a custom campaign written for their context.', sys: 'sys_llm_gen.ts' },
        { tag: 'Routing', title: 'Native CRM Integration', desc: 'All scraped data flows seamlessly into your codebase-level CRM.', sys: 'sys_db_insert.sql' },
        { tag: 'Scale', title: 'Cost-Effective Growth', desc: 'Generate more leads without paying exorbitant per-seat data fees.', sys: 'sys_roi.calc' }
      ]
    },
    methodSection: {
      railNote: 'A complete pipeline from raw URL to booked meeting.',
      mainTitle: 'How we engineer your outbound engine.',
      mainSub: 'We combine web automation, LLM parsing, and codebase CRM architecture into one seamless flow.',
      phases: [
        { tag: 'Phase 01', title: 'Define Target ICP', desc: 'We map out your Ideal Customer Profile and set the seed parameters for the AI scraper to hunt.', sysTags: ['ICP_CONFIG'] },
        { tag: 'Phase 02', title: 'Configure Scraping Engine', desc: 'We integrate headless browser automation to begin pulling raw DOM data from target accounts.', sysTags: ['PUPPETEER', 'NODE'] },
        { tag: 'Phase 03', title: 'LLM Extraction & CRM Sync', desc: 'We use AI to parse the raw text into structured JSON contact profiles, inserting them into your database.', sysTags: ['OPENAI', 'POSTGRES'] },
        { tag: 'Phase 04', title: 'Drip Campaign Launch', desc: 'The system triggers automated, highly personalized email sequences based on the extracted context.', sysTags: ['SMTP', 'CRON'] }
      ]
    },
    caseSection: {
      headline: 'B2B firm scales to 40+ booked meetings per month.',
      tag: 'AI Outbound',
      desc: 'By deploying the AI Prospect Scraper alongside their Native CRM, they eliminated $3,000/mo in ZoomInfo costs while tripling their demo volume.',
      chartTitleLeft: 'Meetings Booked', chartTitleRight: 'scraper activated',
      chartMetaLeft: 'manual outbound', chartMetaRight: 'AI automated',
      ctaText: 'See how it works', ctaLink: '/book'
    },
    faqs: [
      { q: 'Our sales team spends half the week just researching and finding the right contacts. Can AI actually take that over?', a: 'That is exactly what this system is built for. The scraper identifies companies that match your target profile, extracts decision-maker contact details, reads their site to understand their business, and generates a personalized opening line — all without a person touching it. Your team\'s job shifts from research to conversation. The time savings are typically two to four hours per rep per day.' },
      { q: 'We have tried cold email before and got terrible response rates. What makes AI-personalized outreach different?', a: 'Generic cold email fails because it is obviously generic — the recipient knows immediately that nobody read their site or thought about their specific situation. Our system reads the prospect\'s actual business context and writes an opening that references something specific to them. That specificity is what produces replies. The other variable is list quality: the scraper builds a fresh, targeted list rather than buying stale data where half the contacts have changed roles.' },
      { q: 'We are worried about sending too many emails and getting our domain blacklisted. How do you prevent that?', a: 'Domain health is managed through sending limits, domain warm-up protocols, and dedicated sending infrastructure separate from your main business domain. We configure daily send caps that stay well below spam-filter thresholds, monitor bounce rates and spam complaint rates continuously, and rotate sending domains when needed. We also set up SPF, DKIM, and DMARC records correctly before any sequence goes live.' },
      { q: 'What does a realistic pipeline look like after the first 90 days?', a: 'In the first 30 days we build and warm the infrastructure and run a small test sequence to calibrate response rates. Days 30 to 60 is when volume scales and the optimization loop begins — adjusting subject lines, opening copy, and targeting criteria based on real response data. By day 90, most clients are seeing a consistent weekly flow of interested replies that their team is converting to booked meetings. The exact numbers depend on your market and offer, which is why we scope this before promising volume.' }
    ],
    ctaSection: {
      headline: 'Stop buying stale lead lists.',
      sub: 'Build your own automated AI prospecting engine and fill your calendar with high-value B2B meetings.',
      btnText: 'Automate outbound'
    }
  },
  '/performance/ai-llms-business-agency': {
    path: '/performance/ai-llms-business-agency',
    breadcrumbLabel: 'AI & LLMs',
    hero: {
      lines: ['AI for Businesses:', 'AI for office tasks.', 'Remove friction.', 'Own your automation.'],
      accentLineIndex: 2,
      sub: `As experts in AI for Businesses, we implement secure, custom AI integrations and LLMs directly into everyday business tasks. Stop dealing with manual data entry, fragmented communication, or costly software integrations. We build custom intelligence agents that run on your own databases to automate office workflows and eliminate SMB operational friction.`,
      ctaText: 'Automate your workflow',
      meta: {
        label1: 'Integrations', value1: 'OpenAI API · Anthropic Claude · Llama 3 · Local LLMs',
        label2: 'Deployment', value2: 'Internal tools, secure workspace APIs, custom Slack/Teams bots',
        label3: 'Core Value', value3: 'Eliminate SMB office bottlenecks & manual data chores'
      }
    },
    exhibit: {
      id: 'EXH-006 / AI automation workflow',
      leftPane: {
        head: 'Manual Office Operations', pill: 'friction points', pillClass: 'bad',
        code: [
          '<span class="dim">// Manual manual invoice data entry</span>',
          '<span class="tag">&lt;invoice-pdf&gt;</span> parse details manually',
          '&nbsp;&nbsp;Open CRM and type name, amount, date',
          '&nbsp;&nbsp;Check spreadsheet for duplicates (5 mins)',
          '&nbsp;&nbsp;Draft confirmation email template',
          '&nbsp;&nbsp;Copy/paste customer info into CRM ledger',
          '<span class="dim">// 15 minutes total per task</span>'
        ],
        verdict: 'verdict: manual bottlenecks<br/>fragmented data · slow pipeline · high stress', verdictClass: 'bad'
      },
      rightPane: {
        head: 'GOBIYA AI Pipeline', pill: 'custom AI agent', pillClass: 'good',
        code: [
          '<span class="dim">// Automated AI parsing stream</span>',
          '<span class="tag">&lt;invoice-pdf&gt;</span> uploaded via webhook',
          '&nbsp;&nbsp;<span class="ok">LLM extracts JSON fields instantly</span>',
          '&nbsp;&nbsp;<span class="ok">DB write completed in 200ms</span>',
          '&nbsp;&nbsp;<span class="ok">Draft drafted confirmation via API</span>',
          '&nbsp;&nbsp;<span class="ok">Auto-synced to pipeline dashboard</span>',
          '<span class="tag">&lt;/done&gt;</span> <span class="dim">// processing: 5s total</span>'
        ],
        verdict: 'verdict: frictionless automation<br/>100% accurate · real-time sync · low cost', verdictClass: 'good'
      },
      footLeft: 'same office task — AI-optimized', footRight: 'Vercel AI SDK · GPT-4o · Claude Sonnet',
      captionLeft: 'Fig. 6 — removing daily operational bottlenecks', captionRight: '34.05°N 118.24°W'
    },
    tickerItems: [
      { label: 'OpenAI API', em: '— integrated' },
      { label: 'Anthropic Claude', em: '— custom agents' },
      { label: 'Vercel AI SDK', em: '— native' },
      { label: 'Llama 3', em: '— private hosting' },
      { label: 'Slack & Webhooks', em: '— wired in' },
      { label: 'Office Automation', em: '— frictionless' }
    ],
    stats: [
      { num: '85', sub: '%', tag: 'Time Saved', desc: 'Average time reduction on manual data entry and office admin chores.' },
      { num: '0', tag: 'Manual Entry', desc: 'Custom parsing agents capture invoice, lead, or ticket data instantly.' },
      { num: '24/7', tag: 'Availability', desc: 'AI workflows process email files, document attachments, and customer inquiries around the clock.' },
      { num: '10', sub: 'x', tag: 'Throughput', desc: 'Increase in document processing capacity for SMBs without adding headcount.' }
    ],
    engSectionTitle: 'Automating business workflows at code level.',
    engGrid: {
      railNote: 'Custom LLM orchestration bypasses expensive SaaS subscriptions and keeps your proprietary data secure.',
      mainText: [
        'Generic AI tools require copy-pasting data back and forth, creating security risks and context switches. We build AI integrations directly into your React tools and server workflows.',
        'From auto-sorting customer support emails to parsing contract PDFs and writing structured data straight to your CRM, we deploy custom agents that run securely in your own cloud infrastructure.'
      ],
      vitals: {
        headLeft: 'Workflow Profile', headRight: 'automated',
        rows: [
          { label: 'Data Parse', score: '1.2s', percent: 98 },
          { label: 'CRM Sync', score: '200ms', percent: 99 },
          { label: 'Email Draft', score: '1.8s', percent: 95 },
          { label: 'Error Margin', score: '0.01%', percent: 99 }
        ],
        footLabel: 'average operational efficiency', footValue: 'Excellent'
      },
      caps: [
        { tag: 'Document AI', title: 'PDF & File Parsing', desc: 'We deploy vision and text LLMs to automatically read and extract fields from files, invoices, or tickets.', sys: 'sys_pdf_parser.py' },
        { tag: 'Automations', title: 'Workflow Orchestration', desc: 'We wire multi-step webhook triggers connecting emails, CRM databases, and messaging channels.', sys: 'sys_workflow.ts' },
        { tag: 'Custom Bots', title: 'Internal Slack/Teams Bots', desc: 'We construct intelligent chat interfaces for your staff to query customer records or generate reports instantly.', sys: 'sys_bot.jsx' },
        { tag: 'Data Privacy', title: 'Private & Secure LLMs', desc: 'Your proprietary company data is kept private, avoiding model training pools and ensuring complete security.', sys: 'sys_security.log' }
      ]
    },
    methodSection: {
      railNote: 'We evaluate your manual office routines, build the custom triggers, and deploy the AI pipeline.',
      mainTitle: 'Our AI & LLM integration pipeline.',
      mainSub: 'We identify friction, create automated prompts, and connect models natively to your pipeline.',
      phases: [
        { tag: 'Phase 01', title: 'Bottleneck Discovery', desc: 'We audit your daily manual operations—like duplicate entries, invoice sorting, or drafting responses—to find high-impact automation vectors.', sysTags: ['Audit', 'Friction Mapping'] },
        { tag: 'Phase 02', title: 'Code Integration', desc: 'We build native API integrations using the Vercel AI SDK, Anthropic, or OpenAI endpoints directly inside your application backend.', sysTags: ['Vercel AI SDK', 'OpenAI/Claude API'] },
        { tag: 'Phase 03', title: 'Agent Deployment', desc: 'We connect prompt-engineered agents to webhooks so they execute tasks automatically in response to emails, files, or form submissions.', sysTags: ['Webhook Triggers', 'Agent Orchestration'] },
        { tag: 'Phase 04', title: 'Continuous Tuning', desc: 'We trace agent decisions, optimize token usage and processing latency, and fine-tune system prompts for maximum accuracy.', sysTags: ['Token Tracking', 'Prompt Tuning'] }
      ]
    },
    caseSection: {
      headline: 'Apex Logistics: Eliminating 14 hours of daily data chores.',
      tag: 'AI SUCCESS STORY',
      desc: 'Apex Logistics had a team of three manually copying delivery manifests and invoice details from PDF attachments into their CRM. We built a custom document-parsing AI pipeline that extracts data from incoming emails, validates fields, and records transactions in their database instantly. Operational latency dropped from 4 hours to 8 seconds, with zero human data-entry errors.',
      chartTitleLeft: 'Daily Manual Entry Hours', chartTitleRight: 'Invoice Processing Errors',
      chartMetaLeft: 'Down from 14h to < 10 mins', chartMetaRight: 'Reduced from 4.8% to 0.0%',
      ctaText: 'Book an AI automation consultation', ctaLink: '/book'
    },
    faqs: [
      { q: 'Our team is skeptical about AI. They are worried it will replace them or give wrong answers. How do we handle that?', a: 'Both concerns are legitimate and worth addressing before you deploy anything. On replacement: the systems we build handle repetitive, low-judgment tasks — data entry, document parsing, routing, summarization — so your team can spend time on work that actually requires a human. On accuracy: we do not deploy AI for decisions where errors are costly without a human review step built into the workflow. The system extracts and flags; a person confirms before anything consequential happens. That design pattern resolves most skepticism once people see it working.' },
      { q: 'We tried using ChatGPT for business tasks and the outputs were inconsistent and sometimes wrong. How is a custom integration different?', a: 'The difference is in how the model is called and what it is given to work with. General ChatGPT is a general-purpose tool responding to general prompts. A custom integration is purpose-built: a specific prompt engineered for your exact task, grounded in your actual data (not the model\'s general training), with output validation logic that checks the result before it is used. You are not asking a general model a general question — you are running a specialized pipeline with guardrails.' },
      { q: 'We do not have a technical team. Who manages this after you build it?', a: 'We build every automation with observability in mind — a monitoring dashboard, error alerts, and a clear runbook so non-technical staff can see what is running and flag anything that looks wrong. For the first 60 days after launch we handle all maintenance. After that, most clients either run it themselves with minimal oversight or retain us on a support agreement. The goal is always that the system requires less ongoing attention than the manual process it replaced.' },
      { q: 'What is a realistic starting point for a company that has never done AI automation before?', a: 'Start with one high-volume, repetitive task that currently takes significant staff time and has clear, structured outputs. Document parsing, lead triage, internal FAQ answering, and report generation are all common first wins. We audit your current workflows in the first week to identify the highest-ROI target, scope the build, and deploy it in four to six weeks. Once that is running cleanly, expanding to adjacent workflows is straightforward because the infrastructure is already in place.' }
    ],
    ctaSection: {
      headline: 'Ready to remove office friction?',
      sub: 'Replace manual data chores and fragmented software with secure, hand-coded AI systems built directly into your platform.',
      btnText: 'Automate your office'
    }
  },

  '/relations/authority-building-agency': {
    path: '/relations/authority-building-agency',
    breadcrumbLabel: 'Authority Building',
    hero: {
      lines: ['Authority Building:', 'Acquire authority.', 'Clean trust signals.', 'Sustain page one.'],
      accentLineIndex: 3,
      sub: `As an authority building agency, GOBIYA builds domain trust through white-hat link acquisition, precision local citations, and entity alignment. We secure high-relevance editorial backlinks from real publications that signal clean, bulletproof authority to Google search algorithms and LLM models.`,
      ctaText: 'Build your domain authority',
      meta: {
        label1: 'Tactics', value1: 'Editorial Outreach · Citation Auditing · Entity Mapping',
        label2: 'Compliance', value2: '100% white-hat editorial placements',
        label3: 'Target Metrics', value3: 'Domain Rating (DR) & Trust Flow growth'
      }
    },
    exhibit: {
      id: 'EXH-007 / citation backlink audit',
      leftPane: {
        head: 'Fiverr / Cheap SEO Links', pill: 'toxic spam profile', pillClass: 'bad',
        code: [
          '<span class="dim">// Cheap backlinks purchased in bulk</span>',
          '<span class="tag">POST</span> /link-networks/pbn-injector <span class="warn">status: flagged</span>',
          '<span class="warn">Warning: Domain profile contains 95% directory spam</span>',
          '<span class="tag">GET</span> /google-spambrain/negative-signals',
          '<span class="dim">Domain rating: Drops due to penalty</span>'
        ],
        verdict: 'verdict: algorithmic filter<br/>manual action risk · deindexed · authority loss', verdictClass: 'bad'
      },
      rightPane: {
        head: 'GOBIYA Authority', pill: 'clean trust signals', pillClass: 'good',
        code: [
          '<span class="dim">// High-authority editorial outreach</span>',
          '<span class="ok">await</span> outreach.get(<span class="str">"editorial-placement"</span>)',
          '<span class="ok">200 OK</span> <span class="dim">anchor: contextually relevant</span>',
          '<span class="dim">// Google TrustGraph: entity link verified</span>',
          '<span class="ok">dispatch</span>(BoostCrawlBudget)'
        ],
        verdict: 'verdict: verified authority<br/>increased crawl budget · cited by LLMs · ranking', verdictClass: 'good'
      },
      footLeft: 'outreach comparison', footRight: 'PBN Spam vs Clean Editorial',
      captionLeft: 'Fig. 7 — backlink profile quality impact', captionRight: 'sys_logs/authority'
    },
    tickerItems: [
      { label: 'Editorial Links', em: '— real websites' },
      { label: 'NAP Citations', em: '— local packs' },
      { label: 'Entity Mapping', em: '— trust graph' },
      { label: 'Outreach', em: '— custom pitch' },
      { label: 'Spam Cleanup', em: '— disavow files' },
      { label: 'Domain Rating', em: '— compounding' }
    ],
    stats: [
      { num: '95', sub: '%', tag: 'Clean Trust', desc: 'Acquisition of editorial links with zero automated PBN spam.' },
      { num: '+15', tag: 'DR Growth', desc: 'Average domain rating increases within the first 120 days of campaign.' },
      { num: '0', tag: 'Spam Risks', desc: 'Using 100% white-hat editorial outreach to ensure zero penalty risk.' },
      { num: '4', sub: 'x', tag: 'Crawl Frequency', desc: 'Higher domain trust signals prompt Googlebot to crawl your codebase more frequently.' }
    ],
    engSectionTitle: 'Trust signals coded into the search graph.',
    engGrid: {
      railNote: 'Domain authority acts as the multiplier for your content. Strong backlinks make your pages rank faster.',
      mainText: [
        'Search engines use backlink profiles and entity citations as votes of confidence. If your site lacks domain authority, even the cleanest React code and best content will struggle to reach page one.',
        'We do not buy spammy automated link packages. We run custom, manual PR outreach campaigns to secure niche-relevant placements on active, high-traffic publications that pass clean juice to your domain.'
      ],
      vitals: {
        headLeft: 'Authority Health', headRight: 'strong',
        rows: [
          { label: 'Editorial Links', score: '100% manual', percent: 98 },
          { label: 'Spam Score', score: '0.1%', percent: 99 },
          { label: 'Citation Match', score: '100% consistent', percent: 97 },
          { label: 'Trust Flow', score: 'Optimal', percent: 95 }
        ],
        footLabel: 'authority distribution', footValue: 'Elite'
      },
      caps: [
        { tag: 'Outreach', title: 'Niche-Specific Placements', desc: 'We secure contextual backlinks from authoritative domains in your specific industry.', sys: 'sys_outreach.sh' },
        { tag: 'Citations', title: 'Consistent Local NAP', desc: 'Flawless business name, address, and phone number syndication across high-trust directories.', sys: 'sys_nap.json' },
        { tag: 'Disavow', title: 'Toxic Link Cleansing', desc: 'We audit your historical backlink profile and disavow toxic, low-quality spam links.', sys: 'sys_disavow.txt' },
        { tag: 'Entity SEO', title: 'Knowledge Graph Mapping', desc: 'Aligning your brand with recognized entities to gain prominent placement in LLM knowledge sources.', sys: 'sys_entity.xml' }
      ]
    },
    methodSection: {
      railNote: 'We systematically audit, clean, and build your domain authority profile.',
      mainTitle: 'Engineering domain trust.',
      mainSub: 'Building genuine authority requires consistent outreach and precise data mapping, not short-term shortcuts.',
      phases: [
        { tag: 'Phase 01', title: 'Backlink & Citation Audit', desc: 'We scan your existing backlink profile to flag spam risks and audit all existing local citations for consistency errors.', sysTags: ['LINK_AUDIT', 'NAP_SYNC'] },
        { tag: 'Phase 02', title: 'PR Outreach Strategy', desc: 'We research niche-relevant target publications and craft editorial angles to secure natural, contextual anchor links.', sysTags: ['EDITORIAL_PR', 'OUTREACH'] },
        { tag: 'Phase 03', title: 'Local NAP Cleansing', desc: 'We claim, update, and lock directory citations to ensure search engines have a single, unified source of truth for your business location.', sysTags: ['DIRECTORY_SYNC', 'MAPS'] },
        { tag: 'Phase 04', title: 'Compounding Monitoring', desc: 'We monitor link indexing, track authority growth (DR/DA), and continuously protect your site against negative SEO attacks.', sysTags: ['MONITORING', 'COMPILING'] }
      ]
    },
    caseSection: {
      headline: 'American Livescan — 3x booking growth.',
      tag: 'Authority Building & Local Citations',
      desc: 'By building high-authority local citations and cleanup of toxic backlink profiles alongside a custom React rebuild, we drove a massive increase in maps visibility and bookings.',
      chartTitleLeft: 'Domain Rating', chartTitleRight: 'campaign start',
      chartMetaLeft: 'pre-campaign', chartMetaRight: 'post-campaign',
      ctaText: 'View the case study', ctaLink: '/case-studies'
    },
    faqs: [
      { q: 'We got hit by what we think was a bad link-building campaign. Can you help us clean it up?', a: 'Yes. The first step is a full backlink audit to identify which links are likely responsible — patterns to look for include low-authority directories, link farms, irrelevant niche sites, and anchor text over-optimization. From there we build a disavow file for the worst offenders and submit it to Google Search Console. If a manual action is involved, we document the cleanup and file a reconsideration request. The timeline from audit to visible recovery is typically six to twelve weeks.' },
      { q: 'We have been told we need more backlinks, but we have also heard the wrong kind can hurt us. How do we tell what is safe?', a: 'The distinction is editorial context. A backlink from a real publication — an industry blog, a local news site, a trade directory — where an editor chose to link to you because your content or business is genuinely relevant, carries real authority. A backlink from a site that exists purely to sell links, or from a network of sites that cross-link each other, is what triggers penalties. The practical test: would this link make sense to a human reader visiting the linking page? If yes, it is probably fine. If it only makes sense as a paid placement, it is a risk.' },
      { q: 'We are a local business. Does link building actually matter for Google Maps rankings?', a: 'It matters, but citation consistency matters more at the local level. For Map Pack rankings, your Google Business Profile, NAP consistency across directories (name, address, phone number matching exactly on every listing), and review velocity are the primary signals. Backlinks from local publications and community sites reinforce your geographic authority. A local business that has clean citations and strong GBP optimization will often outrank a competitor with more backlinks but messy citation data.' },
      { q: 'How long before we see results? We need to know what to tell our stakeholders.', a: 'New editorial links take four to eight weeks to index and begin influencing rankings. Meaningful ranking movement on competitive terms typically shows up at the three to six month mark as a campaign builds momentum. The honest framing for stakeholders is this: authority building is a compounding investment, not a one-time spend. The links acquired in month one are still working in month twelve. A six-month campaign typically shows measurable position improvements on target terms by week twelve and continues building from there.' }
    ],
    ctaSection: {
      headline: 'Ready to build domain authority?',
      sub: 'Stop struggling to rank on page one. Let\'s build a clean, high-authority trust profile for your brand.',
      btnText: 'Build authority'
    }
  }
};
