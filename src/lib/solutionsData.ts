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
      ctaText: 'View the case study', ctaLink: '/success-stories/smile-center-dentistry'
    },
    faqs: [
      { q: 'Why should I choose a custom React site over WordPress?', a: 'Traditional CMS platforms rely on heavy plugins and clunky page builders, leading to bloated code and poor Core Web Vitals. A custom React build is lightweight, highly secure, and engineered to load in under a second.' },
      { q: 'How do you handle metadata in React apps?', a: 'Unlike standard SPAs where metadata is missed by crawlers, we utilize Server-Side Rendering (SSR). Every page delivers fully formed HTML containing dynamic tags and JSON-LD schema to Googlebot before JavaScript executes.' },
      { q: 'What is Conversion Rate Optimization (CRO)?', a: 'CRO is the systematic process of increasing the percentage of visitors who take a desired action. We design our interfaces using UX best practices and clear call-to-actions to eliminate friction.' },
      { q: 'Do you integrate existing CRMs?', a: 'Absolutely. We build custom API gateways and secure webhooks directly into the application state, syncing data with Salesforce, HubSpot, or custom databases without fragile third-party plugins.' }
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
      lines: ['Custom CRM Integrations:', 'Own your data.', 'Zero monthly fees.', 'Custom pipelines.'],
      accentLineIndex: 3,
      sub: `As experts in Custom CRM Integrations, stop paying for expensive CRM subscriptions. We engineer custom CRM website integrations directly into your codebase, giving you complete data control and instant routing.`,
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
      { q: 'Why not just use Salesforce or HubSpot?', a: 'They charge exorbitant per-seat licenses and force your business into their rigid templates. A native CRM is fully customized to your workflow and costs nothing in monthly software fees.' },
      { q: 'Is a custom CRM secure?', a: 'Yes. We use enterprise-grade PostgreSQL databases (like Supabase) protected by strict Row-Level Security (RLS) policies, meaning your data is cryptographically isolated.' },
      { q: 'Can I still connect to email tools?', a: 'Absolutely. We can build native API connections to SendGrid, Postmark, or Mailchimp for automated outreach without the need for Zapier.' },
      { q: 'What happens if we need new features?', a: 'Because we built it in React, we can add new dashboard modules, reporting charts, or pipeline stages at any time.' }
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
      { q: 'Why is my React site not ranking?', a: 'React single-page applications often load a blank HTML file and render content via JS. If Googlebot doesn\'t execute the JS in time, it indexes a blank page. We fix this with Server-Side Rendering (SSR).' },
      { q: 'What is Generative Engine Optimization (GEO)?', a: 'GEO is the practice of structuring content so AI models (like ChatGPT and Perplexity) can easily extract and cite your data in their summary overviews. It relies heavily on schema and clear semantic formatting.' },
      { q: 'Do you guarantee #1 rankings?', a: 'No reputable engineer guarantees specific rankings due to algorithmic volatility. We guarantee a 100/100 technical baseline, meaning nothing in your code will prevent you from ranking.' },
      { q: 'What is JSON-LD Schema?', a: 'It\'s a structured data format we embed in your code that explicitly tells search engines what your business is, what services you offer, and how you connect to established knowledge graphs.' }
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
      lines: ['Web3 Development:', 'Smart contracts.', 'dApp interfaces.', 'On-chain security.'],
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
      { q: 'Which blockchains do you build on?', a: 'We primarily build on Ethereum and Pulsechain, depending on your project requirements and target audience.' },
      { q: 'How do you secure smart contracts?', a: 'We adhere to rigorous industry standards: utilizing the Checks-Effects-Interactions pattern, utilizing OpenZeppelin libraries, and running comprehensive fuzz testing to catch edge cases.' },
      { q: 'What is Sign-In With Ethereum (SIWE)?', a: 'SIWE allows users to authenticate to your website by signing a cryptographic message with their wallet. It replaces traditional email/password databases with a highly secure, decentralized standard.' },
      { q: 'Can a dApp be fast?', a: 'Yes. By indexing blockchain events off-chain into a standard database and using optimistic UI updates in React, a dApp can feel just as responsive as a traditional Web2 application.' }
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
      { q: 'Is web scraping legal?', a: 'Yes, scraping publicly available data on the internet is generally legal. Our engines are configured to respect robots.txt.' },
      { q: 'How does the AI personalize the emails?', a: 'When the scraper visits a company site, the LLM reads their "About" page to understand what they do. It then uses a custom prompt to weave that context naturally into the outreach email.' },
      { q: 'Do I need to pay for ZoomInfo or Apollo anymore?', a: 'No. The purpose of this system is to build your own proprietary, fresh data engine, completely eliminating the need for expensive third-party data subscriptions.' },
      { q: 'What happens when someone replies?', a: 'The response is logged directly in your Native CRM. The automated sequence stops, and your sales team is immediately notified.' }
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
      { q: 'Will our company data be used to train public models like ChatGPT?', a: 'No. We configure all AI integrations to use official API endpoints (such as OpenAI API or Anthropic Claude API) under strict enterprise privacy agreements. Your business data is excluded from public model training pools and remains 100% private.' },
      { q: 'Can AI accurately read messy PDFs, scans, or images?', a: 'Yes. By utilizing modern Vision LLMs (Multimodal models), we can accurately extract structured text, numbers, and tabular data from low-resolution scans, photo attachments, and non-standard PDF formats.' },
      { q: 'What is the cost of running custom LLM workflows?', a: 'API usage costs are extremely low. Processing a standard document typically costs between $0.002 and $0.05 in API tokens. Compared to hiring manual data-entry staff or subscribing to expensive specialized SaaS platforms, you save over 90% in operating costs.' },
      { q: 'How long does it take to deploy an AI workflow?', a: 'Simple parsing tasks and custom Slack bots can be deployed in 2 to 3 weeks. Complex multi-step agent choreographies that connect to legacy databases typically take 4 to 6 weeks from audit to launch.' }
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
      sub: `As experts in Authority Building, gOBIYA builds domain trust through white-hat link acquisition, precision local citations, and entity alignment. We secure high-relevance editorial backlinks from real publications that signal clean, bulletproof authority to Google search algorithms and LLM models.`,
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
      ctaText: 'View the case study', ctaLink: '/success-stories/american-livescan'
    },
    faqs: [
      { q: 'What is domain rating (DR) and why does it matter?', a: 'Domain Rating is a search metric that measures the strength of a website\'s backlink profile. A higher DR means your site is trusted by search engines, allowing new content to index and rank significantly faster.' },
      { q: 'How do you acquire backlinks?', a: 'We use manual outreach, building relationships with writers, editors, and publishers in niche-relevant industries. We do not use automated link networks or buy cheap, low-quality spam links.' },
      { q: 'What are NAP citations and why are they important for local SEO?', a: 'NAP stands for Name, Address, and Phone Number. Consistent NAP citations across major directories like Yelp, Apple Maps, and Google business profiles signal trust and accuracy to Google\'s local map pack algorithms.' },
      { q: 'Are your link building methods safe from Google penalties?', a: 'Yes. We utilize 100% white-hat editorial link-building methods that comply with Google\'s webmaster guidelines, protecting your site from algorithmic search penalties.' }
    ],
    ctaSection: {
      headline: 'Ready to build domain authority?',
      sub: 'Stop struggling to rank on page one. Let\'s build a clean, high-authority trust profile for your brand.',
      btnText: 'Build authority'
    }
  }
};
