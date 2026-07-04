/**
 * Gobiya published insights / blog articles.
 * Contains metadata for all articles — titles, descriptions, slugs, and URLs.
 */

export interface GobiyaInsight {
  slug: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  topics: string[];
}

export const insights: GobiyaInsight[] = [
  {
    slug: "what-is-generative-engine-optimization-and-how-does-it-work",
    title: "Generative Engine Optimization (GEO): Complete AI Guide",
    description:
      "A complete technical guide to Generative Engine Optimization (GEO). Learn how RAG-based AI search engines cite content and how to optimise for AI citation visibility.",
    url: "https://www.gobiya.com/insights/what-is-generative-engine-optimization-and-how-does-it-work",
    imageUrl: "/images/generative-engine-optimization-rag-citations.png",
    topics: ["GEO", "AI Search", "Technical SEO"],
  },
  {
    slug: "seo-case-study-traffic-recovery",
    title: "SEO Case Study: Recover 320% Traffic Growth",
    description:
      "A forensic SEO case study on traffic recovery after Google's March 2026 dual-update event. Learn the exact 12-week diagnostic sequence and fix order Gobiya used.",
    url: "https://www.gobiya.com/insights/seo-case-study-traffic-recovery",
    imageUrl: "/images/seo-case-study-traffic-recovery-growth.png",
    topics: ["Traffic Recovery", "Algorithm Updates", "Case Study"],
  },
  {
    slug: "automated-b2b-sales-pipeline-seo",
    title: "Automate B2B Sales Pipelines via AI Citations",
    description:
      "Integrate B2B sales pipeline automation with search intent. Learn how AI citation share decides who gets on the buyer shortlist.",
    url: "https://www.gobiya.com/insights/automated-b2b-sales-pipeline-seo",
    imageUrl: "/images/b2b-sales-pipeline-automation-citation-share.png",
    topics: ["B2B SEO", "Pipeline Automation", "AI Citations"],
  },
  {
    slug: "automated-lead-generation-seo",
    title: "Automate Lead Generation: Search Intent Maps",
    description:
      "Set up automated lead generation by mapping high-intent search clusters to your B2B pipeline to drive closed sales, not just page views.",
    url: "https://www.gobiya.com/insights/automated-lead-generation-seo",
    imageUrl: "/images/automated-lead-generation-intent-mapping-chart.png",
    topics: ["Lead Generation", "B2B SEO", "Automation"],
  },
  {
    slug: "outbound-seo-prospecting",
    title: "Outbound SEO Prospecting: Target Search Intent",
    description:
      "Use outbound SEO prospecting to monitor search intent triggers. Learn how to pitch buyers at the exact moment they search for your service.",
    url: "https://www.gobiya.com/insights/outbound-seo-prospecting",
    imageUrl: "/images/outbound-seo-prospecting-intent-signals.png",
    topics: ["Outbound Sales", "SEO", "Intent Targeting"],
  },
  {
    slug: "b2b-sales-pipeline-automation",
    title: "Automate B2B Sales: Connect Search to CRM",
    description:
      "Configure B2B sales pipeline automation workflows. Learn how to connect search intent, lead data enrichment, and automated email campaigns.",
    url: "https://www.gobiya.com/insights/b2b-sales-pipeline-automation",
    imageUrl: "/images/b2b-sales-pipeline-automation-outreach.png",
    topics: ["B2B", "CRM", "Automation"],
  },
  {
    slug: "best-seo-agency-for-b2b-brands",
    title: "Select the Best B2B SEO Agency: 2026 Checklist",
    description:
      "How to select the best SEO agency for B2B brands. Follow our evaluation checklist to verify technical authority, case studies, and contracts.",
    url: "https://www.gobiya.com/insights/best-seo-agency-for-b2b-brands",
    imageUrl: "/images/best-seo-agency-for-b2b-checklist.png",
    topics: ["Agency Selection", "B2B SEO"],
  },
  {
    slug: "seo-for-b2b-lead-generation",
    title: "SEO for B2B Lead Gen: Win the Buying Committee",
    description:
      "Learn how to deploy SEO for B2B lead generation by mapping landing pages to the full buying committee, satisfying all key decision-makers.",
    url: "https://www.gobiya.com/insights/seo-for-b2b-lead-generation",
    imageUrl: "/images/seo-for-b2b-lead-generation-committee-structure.png",
    topics: ["B2B SEO", "Lead Generation", "Buying Committee"],
  },
  {
    slug: "b2b-seo-agency",
    title: "B2B SEO Agency: Focus on Pipeline Attribution",
    description:
      "Partner with a B2B SEO agency built around pipeline value, not just search volume. Verify committee mapping and conversion playbooks.",
    url: "https://www.gobiya.com/insights/b2b-seo-agency",
    imageUrl: "/images/b2b-seo-agency-funnel-strategy-session.png",
    topics: ["B2B SEO", "Agency"],
  },
  {
    slug: "local-seo",
    title: "Local SEO Strategy: Dominate the 3-Pack Maps",
    description:
      "Optimise your search presence with our local SEO strategy. Learn the weekly rhythm and maps pack audit tactics to win local organic rankings.",
    url: "https://www.gobiya.com/insights/local-seo",
    imageUrl: "/images/local-seo-service-maps-performance.png",
    topics: ["Local SEO", "Map Pack", "Google Business Profile"],
  },
  {
    slug: "local-seo-explained",
    title: "Local SEO Explained: Dominate Search in 90 Days",
    description:
      "Our local SEO explained playbook delivers a 90-day execution framework. Master business signals, citations, and tracking to dominate local grids.",
    url: "https://www.gobiya.com/insights/local-seo-explained",
    imageUrl: "/images/article-local-seo-explained.png",
    topics: ["Local SEO", "90-Day Framework"],
  },
  {
    slug: "b2b-organic-traffic-growth",
    title: "B2B Organic Traffic: Build CRM Pipeline Value",
    description:
      "Why B2B organic traffic is decoupling from pipeline revenue — and how to target high-intent search clusters to build pipeline value.",
    url: "https://www.gobiya.com/insights/b2b-organic-traffic-growth",
    imageUrl: "/images/article-b2b-organic-traffic-growth.webp",
    topics: ["B2B SEO", "Organic Traffic", "Pipeline"],
  },
  {
    slug: "chatgpt-vs-google-for-business-discovery",
    title: "ChatGPT vs Google Search: Customer Discovery",
    description:
      "Comparing ChatGPT vs Google search discovery rates. Learn how to optimise your brand footprint to win both AI summaries and clicks.",
    url: "https://www.gobiya.com/insights/chatgpt-vs-google-for-business-discovery",
    imageUrl: "/images/chatgpt-vs-google-search-conversion-rates.png",
    topics: ["AI Search", "GEO", "Google vs ChatGPT"],
  },
  {
    slug: "how-do-b2b-companies-use-seo-to-generate-predictable-revenue",
    title: "B2B Pipeline Revenue: How SEO Drives B2B Leads",
    description:
      "Learn how to connect search clusters to B2B pipeline revenue, map content to the buying committee, and scale inbound conversions.",
    url: "https://www.gobiya.com/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue",
    imageUrl: "/images/b2b-pipeline-revenue-performance-dashboard.png",
    topics: ["B2B SEO", "Revenue", "Pipeline"],
  },
  {
    slug: "what-data-sources-do-llms-crawl-to-verify-b2b-company-information",
    title: "LLM Company Verification: Data Sources AI Uses",
    description:
      "Discover how ChatGPT and Claude handle LLM company verification by crawling Wikidata, LinkedIn, and review portals to establish trust.",
    url: "https://www.gobiya.com/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information",
    imageUrl: "/images/llm-company-verification-data-sources.png",
    topics: ["LLMs", "AI Search", "Entity Verification"],
  },
  {
    slug: "what-is-the-difference-between-google-knowledge-graph-optimization-and-geo",
    title: "Knowledge Graph Optimization vs GEO: AI Splits",
    description:
      "Understand how Knowledge Graph optimisation differs from GEO, how entity resolution works, and how to secure AI citation visibility.",
    url: "https://www.gobiya.com/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo",
    imageUrl: "/images/knowledge-graph-optimization-vs-geo-model.png",
    topics: ["Knowledge Graph", "GEO", "Entity SEO"],
  },
  {
    slug: "are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks",
    title: "AI Search Scraping: API vs Server HTML Blocks",
    description:
      "Understand how AI search scraping works. Learn why AI crawlers bypass JavaScript APIs and read raw public HTML blocks instead.",
    url: "https://www.gobiya.com/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks",
    imageUrl: "/images/ai-search-engines-scraping-html-data-comparison.png",
    topics: ["AI Search", "Technical SEO", "Crawling"],
  },
  {
    slug: "can-a-site-fully-recover-from-a-google-core-update",
    title: "Google Core Update Recovery: Restore Full Traffic",
    description:
      "Our Google core update recovery guide details the timeline, content pruning strategies, and quality updates needed to restore search traffic.",
    url: "https://www.gobiya.com/insights/can-a-site-fully-recover-from-a-google-core-update",
    imageUrl: "/images/google-core-update-recovery-traffic-charts.png",
    topics: ["Algorithm Recovery", "Google Updates", "Traffic Recovery"],
  },
  {
    slug: "google-manual-action-removal-agency-caused-penalty",
    title: "Remove Google Manual Actions: Reconsideration Guide",
    description:
      "Use our Google manual action removal checklist to audit link profiles, document cleanup, and submit a successful reconsideration appeal.",
    url: "https://www.gobiya.com/insights/google-manual-action-removal-agency-caused-penalty",
    imageUrl: "/images/google-manual-action-removal-recovery-checklist.png",
    topics: ["Manual Actions", "Penalty Recovery", "Google"],
  },
  {
    slug: "what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty",
    title: "Manual Action vs Algorithmic Penalty: Diagnostic Guide",
    description:
      "Understand manual action vs algorithmic penalty differences, Search Console reports, and step-by-step diagnostic checklists for recovery.",
    url: "https://www.gobiya.com/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty",
    imageUrl: "/images/manual-action-vs-algorithmic-penalty-checklist.png",
    topics: ["Manual Actions", "Algorithm Penalties", "Diagnostics"],
  },
  {
    slug: "google-business-profile-optimization",
    title: "Google Business Profile: Suspensions & Audits",
    description:
      "Learn our Google Business Profile optimisation checklist to recover suspended profiles, appeal algorithmic soft bans, and verify map listings.",
    url: "https://www.gobiya.com/insights/google-business-profile-optimization",
    imageUrl: "/images/google-business-profile-optimization-visibility.png",
    topics: ["GBP", "Local SEO", "Map Pack"],
  },
  {
    slug: "how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction",
    title: "Behavioral Psychology for B2B Landing Pages",
    description:
      "Learn how to apply behavioral psychology principles like the Fogg Behavior Model and Hick's Law to high-ticket B2B landing page wireframes to decrease friction.",
    url: "https://www.gobiya.com/insights/how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction",
    imageUrl: "/images/article-behavioral-psychology-b2b-landing-page-wireframes-thumbnail.webp",
    topics: ["CRO", "Landing Pages", "B2B", "Psychology"],
  },
  {
    slug: "multi-location-websites-for-franchises",
    title: "Multi-Location Franchise Websites: 2026 SEO Playbook",
    description:
      "A technical guide to multi-location websites for franchises. Learn subdirectory URL configuration, page cannibalization avoidance, and SEO governance.",
    url: "https://www.gobiya.com/insights/multi-location-websites-for-franchises",
    imageUrl: "/images/article-multi-location-websites-franchises-thumbnail.webp",
    topics: ["Multi-Location SEO", "Franchises", "Technical SEO"],
  },
  {
    slug: "dental-seo-agency",
    title: "Dental SEO Agency Evaluation Checklist & KPIs",
    description:
      "Avoid costly hiring mistakes. Use our comprehensive evaluation checklist for dental SEO agencies, covering contract traps, KPIs, and case study audits.",
    url: "https://www.gobiya.com/insights/dental-seo-agency",
    imageUrl: "/images/article-dental-seo-agency.png",
    topics: ["Dental SEO", "Agency Selection", "Healthcare Marketing"],
  },
  {
    slug: "brand-entity-extraction-perception-drift",
    title: "Brand Entity Extraction & Perception Drift",
    description:
      "How brand entity extraction works across Google, Bing, Wikidata, and LLM knowledge graphs — and how to detect and correct perception drift.",
    url: "https://www.gobiya.com/insights/brand-entity-extraction-perception-drift",
    imageUrl: "/images/article-brand-entity-extraction-perception-drift.webp",
    topics: ["Entity SEO", "Brand", "Knowledge Graph", "LLMs"],
  },
  {
    slug: "introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses",
    title: "Open Knowledge Format (OKF): AI-Ready Business Guide",
    description:
      "Google Cloud's new open spec, OKF, formalizes the 'LLM-wiki' pattern into a portable, vendor-neutral standard for the knowledge AI agents actually need.",
    url: "https://www.gobiya.com/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses",
    imageUrl: "/images/article-introducing-open-knowledge-format-thumbnail.webp",
    topics: ["OKF", "AI", "Knowledge Management", "GEO"],
  },
  {
    slug: "gobiya-vs-enterprise-seo-agencies",
    title: "Enterprise SEO vs Gobiya: Speed & Cost Compare",
    description:
      "We compare enterprise SEO agencies vs Gobiya, showing the speed, cost, and CRM pipeline differences for B2B brands.",
    url: "https://www.gobiya.com/insights/gobiya-vs-enterprise-seo-agencies",
    imageUrl: "/images/enterprise-seo-agencies-comparison.png",
    topics: ["Agency Comparison", "B2B SEO", "Enterprise SEO"],
  },
];

/**
 * Search insights by topic or keyword (case-insensitive).
 */
export function searchInsights(query: string): GobiyaInsight[] {
  const q = query.toLowerCase();
  return insights.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.topics.some((t) => t.toLowerCase().includes(q))
  );
}
