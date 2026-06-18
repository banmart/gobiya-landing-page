import { ARTICLE_META_MAP } from './articlesMeta';

export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

// Outcome-focused metadata lookup map for crawlers and search bots
export const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'GOBIYA — Algorithm Recovery & AI-Powered Growth, Los Angeles',
    description: "GOBIYA reads Google's algorithm, identifies the penalty vector, and deploys the fix. SEO recovery, GEO, AI-powered growth. Los Angeles, since 2009."
  },
  '/on-page-seo-los-angeles': {
    title: 'On-Page SEO Los Angeles — GOBIYA | Search Engine Dominance',
    description: "Struggling with organic drops or low conversions? Our elite on-page SEO services in Los Angeles optimize your site's entity structure, schema, speed, and content mapping for Google and AI engines."
  },
  '/capabilities/web-development': {
    title: 'React Web Development — Custom High-Performance Websites Built to Rank | GOBIYA',
    description: 'GOBIYA replaces slow page-builders with custom, hand-coded React and Next.js websites — 100/100 Core Web Vitals, sub-second loads, zero templates, engineered to convert and rank natively.'
  },
  '/capabilities/native-crm': {
    title: 'Custom CRM Integrations: Own Your Pipeline Data | Gobiya',
    description: 'We build custom CRM website integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data.'
  },
  '/capabilities/seo-discoverability': {
    title: 'Code-Level Technical SEO: Rank & Cite Natively | Gobiya',
    description: 'We build technical SEO for React websites into the codebase, optimizing crawlability, rendering speed, and AI citations.'
  },
  '/capabilities/blockchain-web3-development': {
    title: 'Blockchain Web3: Integrate Smart Contracts | Gobiya',
    description: 'Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.'
  },
  '/capabilities/ai-prospect-scraper': {
    title: 'AI Prospect Scraper: Automate Outbound Leads | Gobiya',
    description: 'Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.'
  },
  '/capabilities/ai-llms-business': {
    title: 'AI & LLMs for Businesses: Remove SMB Office Friction | Gobiya',
    description: 'We integrate custom AI models and secure LLMs directly into your everyday office tasks. Automate document parsing, email replies, and CRM syncing with complete data privacy.'
  },
  '/capabilities/authority-building': {
    title: 'Authority Building: High Quality Backlinks & Citations | Gobiya',
    description: 'Build search engine trust with high-quality, relevant backlink acquisition and structured localized entity citations, engineered for long-term organic authority.'
  },
  '/about': {
    title: 'About the Agency — GOBIYA | AI Internet Marketing, Los Angeles',
    description: 'GOBIYA is a precision-engineered search visibility and digital solutions firm, founded 2012 in Los Angeles and led by Steve Martin — 25+ years bridging full-stack engineering and organic search.'
  },
  '/case-studies': {
    title: 'Case Studies — Search Recovery & Revenue | GOBIYA',
    description: 'Real clients, real numbers. SmileCenter Dentistry: 5x patient inquiries and 213K impressions. American Livescan: 3x bookings after a legacy migration. Data-backed search recovery and pipeline case studies from GOBIYA.'
  },
  '/approach': {
    title: 'Our Approach — Search Engine Forensic Methodology | GOBIYA',
    description: "GOBIYA's operating model for algorithmic dominance: entity-based indexing, topical authority and schema engineering, Generative Engine Optimization (GEO) for LLM visibility, and pipeline-first conversion architecture."
  },
  '/case-studies/smile-center-dentistry': {
    title: 'Dental SEO Case Study: 5x Patient Inquiries | Gobiya',
    description: 'How we rebuilt SmileCenter\'s website on React/Vite, architected individual location pages for Southern California markets, and drove a 5x increase in form completions and phone calls.'
  },
  '/case-studies/american-livescan': {
    title: 'Local SEO Case Study: Tripled Online Bookings | Gobiya',
    description: 'How we replaced a legacy .htm site with a clean-URL architecture, optimized the Google Business Profile, and tripled online appointments and phone calls for a high-volume LA fingerprinting service.'
  },
  '/insights': {
    title: 'Industry Insights — Algorithmic Intelligence & Tactical Search Updates | GOBIYA',
    description: 'Advanced tactical intelligence on Google and AI search: algorithm update analysis, GEO and LLM citation tactics, entity SEO, technical recovery briefs, and pipeline engineering field notes from GOBIYA.'
  },
  '/contact': {
    title: 'Contact GOBIYA — Los Angeles SEO & Web Development Agency',
    description: 'Reach GOBIYA in Los Angeles. Call 323-744-1338, email hello@gobiya.com, or fill out our contact form for an SEO audit, web development, or AI growth consultation.'
  },
  '/company/careers': {
    title: 'Growth Engineering Careers: Join Our Dev Team | Gobiya',
    description: 'Explore growth engineering jobs at Gobiya. We are hiring React developers, technical SEO specialists, and sales engineers. Apply now.'
  },
  '/book': {
    title: 'Schedule a 15-Min Forensic Pipeline Audit | Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/book-call': {
    title: 'Schedule a 15-Min Forensic Pipeline Audit | Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/capabilities': {
    title: 'Capabilities — Custom Web Development, Native CRM, SEO & Web3 | GOBIYA',
    description: 'GOBIYA builds fast, modern web applications with native CRM pipelines, built-in SEO discoverability, AI prospect automation, and custom Web3 integrations — one codebase, complete data ownership.'
  },
  '/about/steve-martin': {
    title: 'Steve Martin: Lead Growth Engineer & Founder | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin: Lead Growth Engineer & Founder | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/admin': {
    title: 'Admin Dashboard | Gobiya',
    description: 'Admin area for Gobiya website management.',
    noindex: true
  },
  '/thank-you': {
    title: 'Thank You | Gobiya',
    description: 'Thank you for contacting Gobiya. Steve Martin will follow up with you shortly.',
    noindex: true
  }
};

export function getPageMetadata(pathname: string): SEOMetadata {
  const normalized = pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  if (metadataMap[normalized]) {
    return metadataMap[normalized];
  }
  
  if (normalized.startsWith('/insights/')) {
    const slug = normalized.substring('/insights/'.length);
    const article = ARTICLE_META_MAP[slug];
    if (article) {
      return {
        title: `${article.title} | Gobiya Insights`,
        description: article.metaDescription,
        image: article.image
      };
    }
  }
  
  return metadataMap['/'];
}
