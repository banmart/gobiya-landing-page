/**
 * Gobiya Remote MCP Server — Vercel Serverless Function
 *
 * Accessible at: https://www.gobiya.com/mcp
 *
 * Implements MCP Streamable HTTP transport (spec 2025-03-26).
 * Stateless — each request spins up a fresh server instance, making it
 * fully compatible with Vercel serverless functions.
 *
 * Supported MCP clients:
 *   Claude.ai (remote MCP), Cursor, Windsurf, any HTTP MCP client
 *
 * Config string for clients:
 *   URL: https://www.gobiya.com/mcp
 *   Transport: streamable-http
 */

import type { IncomingMessage, ServerResponse } from 'http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// KNOWLEDGE BASE
// ─────────────────────────────────────────────────────────────

const COMPANY = {
  name: 'Gobiya',
  founded: 2010,
  founder: 'Steve Martin',
  founderTitle: 'CEO & Lead Growth Engineer',
  website: 'https://www.gobiya.com',
  phone: '323-744-1338',
  email: 'hello@gobiya.com',
  address: '11601 Wilshire Blvd, Los Angeles, CA 90025',
  hours: 'Monday–Friday, 9 AM – 6 PM Pacific Time',
  bbb: 'A+',
  googlePartner: '2015–2019',
  languages: ['English', 'Spanish'],
  description:
    'Gobiya is a Los Angeles digital marketing agency specialising in technical SEO, Generative Engine Optimization (GEO), custom React web development, native CRM pipelines, and AI-driven search visibility. Founded in 2010 by Steve Martin, Gobiya helps B2B companies and professional service businesses recover traffic after Google algorithm updates, get cited by AI platforms like ChatGPT and Perplexity, and engineer scalable pipeline growth.',
  mission:
    'We engineer measurable, compounding growth for B2B and professional services brands — ranking on Google, getting cited by AI platforms, and converting that visibility into real pipeline.',
  bookingUrl: 'https://www.gobiya.com/book',
  contactUrl: 'https://www.gobiya.com/contact',
  founderBio:
    'Steve Martin is the founder of Gobiya, an SEO and web development agency in Los Angeles established in 2010. With over 25 years in web development and search, Steve leads forensic SEO investigations, GEO implementations, and custom pipeline builds for B2B and professional services clients. He is bilingual in English and Spanish, a former Google Partner (2015–2019), and holds a BBB A+ rating.',
  founderExpertise: [
    'Technical SEO',
    'Generative Engine Optimization (GEO)',
    'React / Next.js / Vite development',
    'Algorithm penalty recovery',
    'B2B pipeline engineering',
    'Entity graph optimization',
  ],
};

const APPROACH = {
  title: 'Forensic SEO Approach',
  url: 'https://www.gobiya.com/approach',
  phases: [
    {
      phase: 1,
      name: 'Forensic Audit',
      description:
        'Diagnose the exact root cause — algorithm suppression, crawl budget leaks, canonical tag errors, entity disambiguation failures, or GBP suspension. No guessing; only reproducible evidence.',
    },
    {
      phase: 2,
      name: 'Entity & Schema Engineering',
      description:
        'Build the structured data layer that connects your brand entity to the knowledge graphs used by Google and large language models. Includes JSON-LD schema, Wikidata alignment, and entity disambiguation.',
    },
    {
      phase: 3,
      name: 'Generative Engine Optimization (GEO)',
      description:
        'Structure content for AI citation: passage-level coherence, citation anchoring, RAG-compatible formatting, and topical authority clusters that cause ChatGPT, Perplexity, and Google AI Overviews to cite your brand by name.',
    },
    {
      phase: 4,
      name: 'Pipeline Conversion Architecture',
      description:
        'Turn visibility into revenue — conversion-optimised landing pages, native CRM integration, AI prospect scraping, and automated outbound sequences that fill the pipeline with qualified buyers.',
    },
  ],
};

const SERVICES = [
  // Performance
  { slug: 'web-development', category: 'performance', title: 'Web Development', short: 'Custom React & Next.js websites with sub-second load times and 90+ Lighthouse scores.', url: 'https://www.gobiya.com/performance/web-development-agency', features: ['React / Next.js / Vite', 'Sub-second load times', '90+ Lighthouse scores', 'SSR & static generation', 'Zero platform lock-in'] },
  { slug: 'seo-discoverability', category: 'performance', title: 'SEO Indexing & Discoverability', short: 'Resolve crawl budget leaks, canonical errors, and indexation blocks.', url: 'https://www.gobiya.com/performance/seo-discoverability-agency', features: ['Crawl budget audit', 'Index coverage analysis', 'Canonical tag remediation', 'Structured data', 'Internal link architecture'] },
  { slug: 'native-crm', category: 'performance', title: 'Native CRM Integration', short: 'Own your pipeline data — custom CRM built into your codebase, no monthly SaaS fees.', url: 'https://www.gobiya.com/performance/native-crm-agency', features: ['Custom lead capture', 'Supabase / PostgreSQL', 'Pipeline stage management', 'AI prospect scraper', 'Automated email sequences', 'Full data ownership'] },
  { slug: 'b2b-seo', category: 'performance', title: 'B2B SEO', short: 'Pipeline attribution SEO — target decision-makers, not just traffic.', url: 'https://www.gobiya.com/performance/b2b-seo-agency', features: ['Buying committee mapping', 'Commercial-intent keywords', 'Topical authority clusters', 'Pipeline-attributed tracking'], metrics: 'Measured in pipeline value, not impressions' },
  { slug: 'local-seo', category: 'performance', title: 'Local SEO Services', short: 'Google Map Pack dominance, GBP optimisation, citation consistency, and review velocity.', url: 'https://www.gobiya.com/performance/local-seo-services-agency', features: ['GBP optimisation', 'NAP citation audit', 'Review velocity', 'Local schema markup', 'Map Pack tracking'] },
  { slug: 'technical-seo-audit', category: 'performance', title: 'Technical SEO Audit', short: 'Full diagnostic: crawl health, CWV, schema, index coverage — prioritised fix list.', url: 'https://www.gobiya.com/performance/technical-seo-audit-agency', features: ['Full crawl analysis', 'Core Web Vitals (LCP, INP, CLS)', 'Index coverage audit', 'Schema validation', 'Priority-ranked fix list'] },
  { slug: 'seo-traffic-recovery', category: 'performance', title: 'SEO Traffic Recovery', short: 'Diagnose and reverse organic traffic drops from Google updates and penalties.', url: 'https://www.gobiya.com/performance/seo-traffic-recovery', features: ['Algorithm update attribution', 'Manual action removal', 'E-E-A-T content improvement', 'Link profile remediation', '12-week recovery roadmap'], metrics: '320% traffic recovery documented' },
  { slug: 'ecommerce-seo', category: 'performance', title: 'E-Commerce SEO', short: 'Product schema, category architecture, faceted navigation — rankings that drive revenue.', url: 'https://www.gobiya.com/performance/ecommerce-seo-agency', features: ['Category & product architecture', 'Product schema & rich results', 'Faceted navigation control', 'Commercial-intent content clusters'] },
  { slug: 'ai-prospect-scraper', category: 'performance', title: 'AI Prospect Scraper', short: 'CRM-ready lead pipeline — AI extracts contacts and automates outbound campaigns.', url: 'https://www.gobiya.com/performance/ai-prospect-scraper-agency', features: ['AI business data extraction', 'Contact enrichment', 'Automated personalised outreach', 'Gemini AI copywriting', 'Supabase CRM pipeline'] },
  { slug: 'ai-llms-business', category: 'performance', title: 'AI & LLM Systems', short: 'Custom AI models and secure LLMs integrated into your office workflows.', url: 'https://www.gobiya.com/performance/ai-llms-business-agency', features: ['Custom LLM deployment', 'Document parsing automation', 'CRM data syncing', 'Secure — data stays private'] },
  { slug: 'blockchain-web3', category: 'performance', title: 'Blockchain & Web3 Development', short: 'Smart contracts on Ethereum and Pulsechain, React dApps, and crypto SEO.', url: 'https://www.gobiya.com/performance/blockchain-web3-development-agency', features: ['Solidity smart contracts', 'Ethereum & Pulsechain', 'React dApp frontends', 'Crypto SEO content'] },
  { slug: 'cro-ux-analysis', category: 'performance', title: 'CRO & UX Analysis', short: 'Heatmaps, session replays, and A/B tests — funnel friction isolated and fixed.', url: 'https://www.gobiya.com/performance/cro-ux-analysis-agency', features: ['Heatmap analysis', 'Session replay review', 'A/B test design', 'Form friction analysis', 'Landing page redesign'] },
  // Creativity
  { slug: 'seo-web-copywriting', category: 'creativity', title: 'SEO Web Copywriting', short: 'Keyword-mapped copy that ranks on Google and gets cited by AI platforms.', url: 'https://www.gobiya.com/creativity/seo-web-copywriting-agency', features: ['Keyword research & intent mapping', 'GEO formatting', 'Conversion copy', 'E-E-A-T signals', 'AI citation anchoring'] },
  { slug: 'seo-content-strategy', category: 'creativity', title: 'SEO Content Strategy', short: 'Topic clusters, keyword mapping, internal link plan — architecture before the words.', url: 'https://www.gobiya.com/creativity/seo-content-strategy-agency', features: ['Competitor gap analysis', 'Topical authority clusters', 'Keyword-to-page mapping', 'Internal link blueprint', 'Editorial calendar'] },
  { slug: 'geo-ai-content-writing', category: 'creativity', title: 'GEO & AI Content Writing', short: 'Content built to be cited by ChatGPT, Perplexity, and Google AI Overviews.', url: 'https://www.gobiya.com/creativity/geo-ai-content-writing-agency', features: ['RAG-compatible structure', 'Passage-level coherence', 'Entity verification', 'AI citation anchor placement', 'LLM citation monitoring'] },
  { slug: 'landing-page-copywriting', category: 'creativity', title: 'Landing Page Copywriting', short: 'Copy engineered to convert ad clicks and organic traffic into leads.', url: 'https://www.gobiya.com/creativity/landing-page-copywriting-agency', features: ['Fogg Behavior Model', 'Above-the-fold hook', 'Social proof placement', 'CTA hierarchy', 'A/B test variants'] },
  { slug: 'ai-videos', category: 'creativity', title: 'AI Video Production', short: 'YouTube, Amazon Prime Video, and social ads using Veo 3 — 3–5 day turnaround.', url: 'https://www.gobiya.com/creativity/ai-videos-agency', features: ['Google Veo 3 production', 'AI scriptwriting', 'Text-to-voice', 'YouTube pre-roll', 'Amazon Prime Video & Paramount+ spots', '3–5 day delivery'], metrics: '3–5 business day delivery' },
  { slug: 'crypto-web3', category: 'creativity', title: 'Crypto & Web3 Agency', short: 'Launched, ranked, and cited — full-stack crypto marketing and Web3 development.', url: 'https://www.gobiya.com/creativity/crypto-web3-agency', features: ['Smart contracts', 'React dApp interfaces', 'Crypto SEO', 'AI citation optimisation', 'Token marketing'] },
  // Relations
  { slug: 'google-ads-ppc', category: 'relations', title: 'Google Ads & PPC Strategy', short: 'Precision-targeted paid pipelines — 5.7× ROAS, 61% lower CPL documented.', url: 'https://www.gobiya.com/relations/google-ads-ppc-strategy-agency', features: ['Campaign architecture', 'Landing page alignment', 'Negative keyword hygiene', 'Conversion tracking', 'Smart bidding optimisation'], metrics: '5.7× ROAS, 61% lower CPL' },
  { slug: 'authority-building', category: 'relations', title: 'Authority Building', short: 'DR 50+ editorial backlinks and entity alignment for long-term organic authority.', url: 'https://www.gobiya.com/relations/authority-building-agency', features: ['DR 50+ editorial placements', 'Local citation building', 'Entity alignment (Wikidata, LinkedIn, GBP)', 'AI citation footprint'] },
  { slug: 'digital-pr', category: 'relations', title: 'Digital PR & Media Outreach', short: 'Earned editorial coverage, press mentions, and backlinks that compound authority.', url: 'https://www.gobiya.com/relations/digital-pr-media-outreach-agency', features: ['Editorial story development', 'Publication outreach', 'Press release writing', 'Journalist relationships', 'AI citation coverage tracking'] },
  // Standalone
  { slug: 'plastic-surgery-marketing', category: 'standalone', title: 'Plastic Surgery Internet Marketing', short: 'Booked consultations — procedure-specific SEO and compliant Google Ads.', url: 'https://www.gobiya.com/plastic-surgery-internet-marketing', features: ['Procedure-specific SEO', 'Compliant Google Ads', 'Review velocity', 'AI citation for elective queries', 'Long-cycle content architecture'] },
];

const CASE_STUDIES = [
  {
    client: 'SmileCenter Dentistry',
    industry: 'Dental / Healthcare',
    location: 'Los Angeles, CA',
    challenge: 'Stagnant online presence, low organic visibility, poor patient inquiry volume despite being a high-quality dental office in a competitive LA market.',
    solution: 'Comprehensive local SEO — GBP optimisation, NAP citation cleanup, review velocity programme, local schema markup, and patient-intent content architecture.',
    results: ['5× increase in patient inquiries', '213,000 organic impressions', 'Dominant Google Map Pack positioning', 'Consistent 5-star review velocity'],
    services: ['Local SEO Services', 'GBP Optimisation', 'SEO Web Copywriting', 'Technical SEO Audit'],
  },
  {
    client: 'American Livescan',
    industry: 'Background Check / Legal Services',
    location: 'Los Angeles, CA',
    challenge: 'Website migration caused significant ranking losses and a 70% drop in organic bookings. New site had structural issues preventing proper Google indexing.',
    solution: 'Forensic migration audit, resolved canonical conflicts, fixed redirect chains, rebuilt internal link architecture, and implemented structured data.',
    results: ['3× increase in bookings post-migration', 'Full index coverage restored', 'Redirect chain issues eliminated', 'Rankings restored within 12 weeks'],
    services: ['SEO Traffic Recovery', 'Technical SEO Audit', 'SEO Indexing & Discoverability', 'Web Development'],
  },
];

const INSIGHTS = [
  { slug: 'what-is-generative-engine-optimization-and-how-does-it-work', title: 'Generative Engine Optimization (GEO): Complete AI Guide', topics: ['GEO', 'AI Search', 'Technical SEO'], url: 'https://www.gobiya.com/insights/what-is-generative-engine-optimization-and-how-does-it-work' },
  { slug: 'seo-case-study-traffic-recovery', title: 'SEO Case Study: Recover 320% Traffic Growth', topics: ['Traffic Recovery', 'Algorithm Updates', 'Case Study'], url: 'https://www.gobiya.com/insights/seo-case-study-traffic-recovery' },
  { slug: 'automated-b2b-sales-pipeline-seo', title: 'Automate B2B Sales Pipelines via AI Citations', topics: ['B2B SEO', 'Pipeline Automation', 'AI Citations'], url: 'https://www.gobiya.com/insights/automated-b2b-sales-pipeline-seo' },
  { slug: 'chatgpt-vs-google-for-business-discovery', title: 'ChatGPT vs Google Search: Customer Discovery', topics: ['AI Search', 'GEO'], url: 'https://www.gobiya.com/insights/chatgpt-vs-google-for-business-discovery' },
  { slug: 'b2b-organic-traffic-growth', title: 'B2B Organic Traffic: Build CRM Pipeline Value', topics: ['B2B SEO', 'Organic Traffic', 'Pipeline'], url: 'https://www.gobiya.com/insights/b2b-organic-traffic-growth' },
  { slug: 'can-a-site-fully-recover-from-a-google-core-update', title: 'Google Core Update Recovery: Restore Full Traffic', topics: ['Algorithm Recovery', 'Google Updates'], url: 'https://www.gobiya.com/insights/can-a-site-fully-recover-from-a-google-core-update' },
  { slug: 'what-data-sources-do-llms-crawl-to-verify-b2b-company-information', title: 'LLM Company Verification: Data Sources AI Uses', topics: ['LLMs', 'AI Search', 'Entity Verification'], url: 'https://www.gobiya.com/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information' },
  { slug: 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo', title: 'Knowledge Graph Optimization vs GEO', topics: ['Knowledge Graph', 'GEO', 'Entity SEO'], url: 'https://www.gobiya.com/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo' },
  { slug: 'google-manual-action-removal-agency-caused-penalty', title: 'Remove Google Manual Actions: Reconsideration Guide', topics: ['Manual Actions', 'Penalty Recovery'], url: 'https://www.gobiya.com/insights/google-manual-action-removal-agency-caused-penalty' },
  { slug: 'google-business-profile-optimization', title: 'Google Business Profile: Suspensions & Audits', topics: ['GBP', 'Local SEO', 'Map Pack'], url: 'https://www.gobiya.com/insights/google-business-profile-optimization' },
  { slug: 'best-seo-agency-for-b2b-brands', title: 'Select the Best B2B SEO Agency: 2026 Checklist', topics: ['Agency Selection', 'B2B SEO'], url: 'https://www.gobiya.com/insights/best-seo-agency-for-b2b-brands' },
  { slug: 'local-seo', title: 'Local SEO Strategy: Dominate the 3-Pack Maps', topics: ['Local SEO', 'Map Pack'], url: 'https://www.gobiya.com/insights/local-seo' },
  { slug: 'seo-for-b2b-lead-generation', title: 'SEO for B2B Lead Gen: Win the Buying Committee', topics: ['B2B SEO', 'Lead Generation'], url: 'https://www.gobiya.com/insights/seo-for-b2b-lead-generation' },
  { slug: 'how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction', title: 'Behavioral Psychology for B2B Landing Pages', topics: ['CRO', 'Landing Pages', 'B2B'], url: 'https://www.gobiya.com/insights/how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction' },
  { slug: 'brand-entity-extraction-perception-drift', title: 'Brand Entity Extraction & Perception Drift', topics: ['Entity SEO', 'Brand', 'Knowledge Graph'], url: 'https://www.gobiya.com/insights/brand-entity-extraction-perception-drift' },
  { slug: 'introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses', title: 'Open Knowledge Format (OKF): AI-Ready Business Guide', topics: ['OKF', 'AI', 'GEO'], url: 'https://www.gobiya.com/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses' },
  { slug: 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks', title: 'AI Search Scraping: API vs Server HTML Blocks', topics: ['AI Search', 'Technical SEO', 'Crawling'], url: 'https://www.gobiya.com/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks' },
  { slug: 'gobiya-vs-enterprise-seo-agencies', title: 'Enterprise SEO vs Gobiya: Speed & Cost Compare', topics: ['Agency Comparison', 'B2B SEO'], url: 'https://www.gobiya.com/insights/gobiya-vs-enterprise-seo-agencies' },
  { slug: 'multi-location-websites-for-franchises', title: 'Multi-Location Franchise Websites: 2026 SEO Playbook', topics: ['Multi-Location SEO', 'Franchises', 'Technical SEO'], url: 'https://www.gobiya.com/insights/multi-location-websites-for-franchises' },
  { slug: 'automated-lead-generation-seo', title: 'Automate Lead Generation: Search Intent Maps', topics: ['Lead Generation', 'B2B SEO', 'Automation'], url: 'https://www.gobiya.com/insights/automated-lead-generation-seo' },
];

// ─────────────────────────────────────────────────────────────
// BUILD MCP SERVER (one fresh instance per request — stateless)
// ─────────────────────────────────────────────────────────────

function buildServer(): McpServer {
  const server = new McpServer({
    name: 'gobiya',
    version: '1.0.0',
    description: 'Gobiya MCP server — discover services, approach, team, and submit leads.',
  });

  // ── DISCOVERY TOOLS ──────────────────────────────────────────

  server.tool(
    'gobiya_get_company_info',
    'Get full structured information about Gobiya — name, founding year, founder, location, phone, email, website, mission, ratings, and booking link.',
    {},
    async () => ({ content: [{ type: 'text' as const, text: JSON.stringify(COMPANY, null, 2) }] })
  );

  server.tool(
    'gobiya_list_services',
    'List all Gobiya service offerings. Optionally filter by category: performance, creativity, relations, or standalone.',
    {
      category: z
        .enum(['all', 'performance', 'creativity', 'relations', 'standalone'])
        .optional()
        .describe("Filter by category. Defaults to 'all'."),
    },
    async ({ category }) => {
      const cat = category ?? 'all';
      const filtered = cat === 'all' ? SERVICES : SERVICES.filter(s => s.category === cat);
      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({ total: filtered.length, category: cat, services: filtered }, null, 2),
        }],
      };
    }
  );

  server.tool(
    'gobiya_get_service_detail',
    "Get full details for a specific Gobiya service by slug. Call gobiya_list_services first to get valid slugs.",
    {
      slug: z.string().describe("Service slug, e.g. 'web-development', 'b2b-seo', 'google-ads-ppc', 'native-crm', 'geo-ai-content-writing', 'ai-videos'."),
    },
    async ({ slug }) => {
      const s = SERVICES.find(s => s.slug === slug.toLowerCase());
      if (!s) {
        return {
          isError: true,
          content: [{
            type: 'text' as const,
            text: JSON.stringify({ error: `Service '${slug}' not found.`, availableSlugs: SERVICES.map(s => s.slug) }, null, 2),
          }],
        };
      }
      return { content: [{ type: 'text' as const, text: JSON.stringify(s, null, 2) }] };
    }
  );

  server.tool(
    'gobiya_list_insights',
    "List Gobiya's published insights and articles. Optionally search by keyword (searches title and topic tags).",
    {
      query: z.string().optional().describe("Optional keyword to filter — e.g. 'GEO', 'local SEO', 'ChatGPT', 'penalty recovery', 'B2B pipeline'."),
    },
    async ({ query }) => {
      const q = query?.toLowerCase();
      const results = q
        ? INSIGHTS.filter(i => i.title.toLowerCase().includes(q) || i.topics.some(t => t.toLowerCase().includes(q)))
        : INSIGHTS;
      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({ total: results.length, query: query ?? null, articles: results }, null, 2),
        }],
      };
    }
  );

  server.tool(
    'gobiya_get_approach',
    "Get Gobiya's 4-phase forensic SEO methodology — Forensic Audit, Entity & Schema Engineering, Generative Engine Optimization (GEO), and Pipeline Conversion Architecture.",
    {},
    async () => ({ content: [{ type: 'text' as const, text: JSON.stringify(APPROACH, null, 2) }] })
  );

  server.tool(
    'gobiya_get_case_studies',
    "Get Gobiya's client case studies — SmileCenter Dentistry (5× leads, 213K impressions) and American Livescan (3× bookings after migration recovery).",
    {},
    async () => ({ content: [{ type: 'text' as const, text: JSON.stringify(CASE_STUDIES, null, 2) }] })
  );

  server.tool(
    'gobiya_get_team',
    "Get information about the Gobiya team — Steve Martin, founder and CEO.",
    {},
    async () => ({
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          teamModel: 'Senior-led boutique — clients work directly with Steve Martin, not junior account managers.',
          founder: { name: COMPANY.founder, title: COMPANY.founderTitle, bio: COMPANY.founderBio, expertise: COMPANY.founderExpertise, languages: COMPANY.languages },
        }, null, 2),
      }],
    })
  );

  server.tool(
    'gobiya_get_contact_info',
    "Get Gobiya's contact details — phone, email, address, hours, booking link, and response time.",
    {},
    async () => ({
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          phone: COMPANY.phone,
          email: COMPANY.email,
          address: COMPANY.address,
          hours: COMPANY.hours,
          bookingUrl: COMPANY.bookingUrl,
          contactUrl: COMPANY.contactUrl,
          responseTime: 'Within 1 business day',
          note: 'For urgent matters, call directly — a real person picks up during business hours.',
        }, null, 2),
      }],
    })
  );

  // ── ACTION TOOLS ─────────────────────────────────────────────

  server.tool(
    'gobiya_submit_contact',
    "Submit a contact form / inquiry to Gobiya on behalf of a user. Saves to the Gobiya CRM and triggers an email notification. Use when a user wants to reach out about any service.",
    {
      name: z.string().min(1).describe('Full name of the person submitting the inquiry. Required.'),
      email: z.string().email().describe('Email address for Gobiya to reply to. Required.'),
      phone: z.string().optional().describe('Phone number (optional but recommended).'),
      company: z.string().optional().describe('Company or business name (optional).'),
      service: z.string().optional().describe("Service of interest, e.g. 'Algorithm Recovery & SEO Audit', 'React Web Development', 'GEO / AI Search Optimization', 'Native CRM Integration'."),
      message: z.string().optional().describe('Message or context from the user — current situation, goals, questions.'),
      website: z.string().optional().describe("The user's website URL (useful for audit requests)."),
    },
    async ({ name, email, phone, company, service, message, website }) => {
      try {
        const res = await fetch('https://www.gobiya.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, company, service, message, website }),
        });
        const data = await res.json() as { success?: boolean; error?: string };
        if (!res.ok || !data.success) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify({ success: false, error: data.error ?? `HTTP ${res.status}`, fallback: 'Contact Gobiya directly: hello@gobiya.com | 323-744-1338' }, null, 2) }],
          };
        }
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ success: true, message: `Inquiry submitted for ${name} (${email}). Gobiya responds within 1 business day. For urgent matters: 323-744-1338.`, bookCall: 'https://www.gobiya.com/book' }, null, 2) }],
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Network error';
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ success: false, error: msg, fallback: 'hello@gobiya.com | 323-744-1338 | https://www.gobiya.com/contact' }, null, 2) }],
        };
      }
    }
  );

  server.tool(
    'gobiya_submit_audit_request',
    "Submit an SEO/GEO audit request for a specific website. Gobiya will analyse the site's organic visibility, AI citation presence, and technical health, then respond within 1 business day.",
    {
      website: z.string().describe('Full URL of the site to audit, e.g. https://example.com. Required.'),
      email: z.string().email().describe('Email to receive audit findings. Required.'),
      name: z.string().optional().describe('Name of the person or company requesting the audit.'),
      notes: z.string().optional().describe("Context about the situation — e.g. 'Lost 60% traffic after March 2026 update' or 'Not appearing in ChatGPT answers'."),
    },
    async ({ website, email, name, notes }) => {
      const auditMessage = [`AUDIT REQUEST for: ${website}`, notes ? `Context: ${notes}` : null].filter(Boolean).join('\n');
      try {
        const res = await fetch('https://www.gobiya.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name ?? 'Audit Request', email, website, service: 'Algorithm Recovery & SEO Audit', message: auditMessage }),
        });
        const data = await res.json() as { success?: boolean; error?: string };
        if (!res.ok || !data.success) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: JSON.stringify({ success: false, error: data.error ?? `HTTP ${res.status}` }, null, 2) }],
          };
        }
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify({
              success: true,
              message: `Audit request submitted for ${website}. Findings delivered to ${email} within 1 business day.`,
              auditCovers: ['Google organic visibility', 'AI citation presence (ChatGPT, Perplexity, Google AI Overviews)', 'Technical SEO health (crawl, index, CWV, schema)', 'Google Business Profile status', 'Pipeline conversion architecture'],
              bookCall: 'https://www.gobiya.com/book',
            }, null, 2),
          }],
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Network error';
        return {
          isError: true,
          content: [{ type: 'text' as const, text: JSON.stringify({ success: false, error: msg, fallback: 'hello@gobiya.com | 323-744-1338' }, null, 2) }],
        };
      }
    }
  );

  server.tool(
    'gobiya_book_call',
    "Get the Gobiya booking calendar link and instructions for scheduling a free 15-minute strategy call with Steve Martin.",
    {
      context: z.string().optional().describe("What the user wants to discuss — helps tailor the response."),
    },
    async ({ context }) => ({
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          bookingUrl: 'https://www.gobiya.com/book',
          callType: 'Free 15-minute strategy & audit call',
          with: 'Steve Martin — CEO & Lead Growth Engineer, Gobiya',
          availability: 'Monday–Friday, 9 AM – 6 PM Pacific Time',
          whatToExpect: ['Real diagnostic conversation — not a sales pitch', 'Your top 2–3 growth opportunities identified', 'A clear next-step recommendation', 'No obligation, no follow-up pressure'],
          ...(context ? { contextNote: `Based on "${context}" — a call with Steve will clarify the fastest path forward.` } : {}),
          alternatives: { email: 'hello@gobiya.com', phone: '323-744-1338', contactForm: 'https://www.gobiya.com/contact' },
        }, null, 2),
      }],
    })
  );

  return server;
}

// ─────────────────────────────────────────────────────────────
// VERCEL HANDLER
// ─────────────────────────────────────────────────────────────

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // CORS — allow any origin so agents can reach this from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── Browser visit — return human-readable info page ──────────
  // MCP GET requests must carry Accept: text/event-stream (SSE).
  // A plain browser GET won't have it, so serve a friendly page instead.
  const acceptHeader = (req.headers['accept'] as string) ?? '';
  if (req.method === 'GET' && !acceptHeader.includes('text/event-stream')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'Gobiya MCP Server',
      version: '1.0.0',
      status: 'online',
      description: 'MCP (Model Context Protocol) server for Gobiya. Allows AI agents to discover Gobiya services, approach, team, and submit leads.',
      endpoint: 'https://www.gobiya.com/mcp',
      transport: 'Streamable HTTP (MCP spec 2025-03-26)',
      tools: [
        'gobiya_get_company_info',
        'gobiya_list_services',
        'gobiya_get_service_detail',
        'gobiya_list_insights',
        'gobiya_get_approach',
        'gobiya_get_case_studies',
        'gobiya_get_team',
        'gobiya_get_contact_info',
        'gobiya_submit_contact',
        'gobiya_submit_audit_request',
        'gobiya_book_call',
      ],
      connect: {
        claude_ai: 'Settings → Integrations → Add MCP Server → https://www.gobiya.com/mcp',
        cursor: '{ "mcpServers": { "gobiya": { "url": "https://www.gobiya.com/mcp" } } }',
        any_client: 'Transport: streamable-http | URL: https://www.gobiya.com/mcp',
      },
      company: {
        name: 'Gobiya',
        website: 'https://www.gobiya.com',
        phone: '323-744-1338',
        email: 'hello@gobiya.com',
      },
    }, null, 2));
    return;
  }

  // ── MCP client request — hand off to transport ───────────────
  try {
    const server = buildServer();
    // stateless: sessionIdGenerator undefined = no session tracking needed
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

    // Clean up after request completes
    res.on('close', () => {
      transport.close().catch(() => {});
      server.close().catch(() => {});
    });

    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (err) {
    if (!res.writableEnded) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'MCP server error', message: err instanceof Error ? err.message : String(err) }));
    }
  }
}
