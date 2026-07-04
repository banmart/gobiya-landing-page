/**
 * Gobiya service catalogue.
 * Each entry covers one outcome offering with slug, category, title, description, URL, and key features.
 */

export interface GobiyaService {
  slug: string;
  category: "outcomes";
  title: string;
  shortDescription: string;
  fullDescription: string;
  url: string;
  keyFeatures: string[];
  idealFor: string[];
  metrics?: string; // headline proof point if available
}

export const services: GobiyaService[] = [
  {
    slug: "traffic",
    category: "outcomes",
    title: "Traffic Growth",
    shortDescription: "Drive qualified traffic through technical SEO and GEO.",
    fullDescription: "Gobiya builds organic traffic pipelines that capture demand exactly where buyers are looking. We resolve indexation blockers, implement Generative Engine Optimization (GEO), and construct topic clusters that dominate search intent.",
    url: "https://www.gobiya.com/outcomes/traffic",
    keyFeatures: [
      "Technical SEO Audits",
      "Generative Engine Optimization (GEO)",
      "Core Web Vitals Optimization",
      "Keyword Architecture"
    ],
    idealFor: [
      "B2B companies with stagnant organic growth",
      "Sites suffering from crawl budget issues",
      "Brands wanting AI Search engine visibility"
    ]
  },
  {
    slug: "rankings",
    category: "outcomes",
    title: "Search Dominance",
    shortDescription: "Command top positions for high-intent B2B search terms.",
    fullDescription: "Rankings are only valuable if they drive revenue. We engineer entity-driven search dominance using advanced schema markup, local SEO strategies, and high-quality PR & link building to secure the most competitive commercial keywords in your niche.",
    url: "https://www.gobiya.com/outcomes/rankings",
    keyFeatures: [
      "Entity SEO & Schema Markup",
      "Topical Authority Clusters",
      "PR & Link Building",
      "Local Map Pack Optimization"
    ],
    idealFor: [
      "Businesses losing market share to competitors",
      "Professional service firms targeting competitive geographies",
      "Enterprise clients needing authoritative brand positioning"
    ]
  },
  {
    slug: "sales",
    category: "outcomes",
    title: "Sales & Pipeline",
    shortDescription: "Turn visibility into revenue with native CRMs and AI scrapers.",
    fullDescription: "Traffic without conversion is just noise. We construct full-funnel conversion architectures—from behaviorally optimized landing pages to custom native CRM pipelines and automated AI prospect scrapers—that turn clicks into qualified sales meetings.",
    url: "https://www.gobiya.com/outcomes/sales",
    keyFeatures: [
      "Native CRM Pipelines (Supabase/PostgreSQL)",
      "AI Prospect Scraping & Enrichment",
      "Landing Page Conversion Architecture",
      "Automated Email Sequences"
    ],
    idealFor: [
      "B2B sales teams wanting automated prospecting",
      "Companies tired of expensive SaaS CRM licenses",
      "Marketing teams needing better lead-to-close attribution"
    ]
  },
  {
    slug: "recovery",
    category: "outcomes",
    title: "Google Penalty Recovery",
    shortDescription: "Diagnose and reverse organic traffic drops from Google updates.",
    fullDescription: "If your traffic plummeted overnight, we diagnose the exact algorithmic or manual action responsible. Gobiya executes a forensic SEO traffic recovery protocol over a 12-week roadmap to restore your site's standing with Google.",
    url: "https://www.gobiya.com/google-penalty-recovery",
    keyFeatures: [
      "Forensic Algorithm Attribution",
      "Manual Action Removal",
      "E-E-A-T Content Improvement",
      "12-Week Recovery Roadmap"
    ],
    idealFor: [
      "Sites penalized by Google core updates",
      "Domains suffering from toxic backlink profiles",
      "Businesses needing urgent traffic restoration"
    ]
  }
];

/**
 * Find a service by slug (case-insensitive).
 */
export function findServiceBySlug(slug: string): GobiyaService | undefined {
  return services.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Get all services in a specific category.
 */
export function getServicesByCategory(
  category: GobiyaService["category"]
): GobiyaService[] {
  return services.filter((s) => s.category === category);
}
