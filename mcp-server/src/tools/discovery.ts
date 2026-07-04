/**
 * Gobiya MCP Discovery Tools
 * Read-only tools that allow AI agents to retrieve structured information
 * about Gobiya — company info, services, insights, approach, case studies, and team.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  companyInfo,
  founderProfile,
  companyApproach,
  contactInfo,
} from "../data/company.js";
import {
  services,
  findServiceBySlug,
  getServicesByCategory,
} from "../data/services.js";
import { insights, searchInsights } from "../data/insights.js";
import { caseStudies, caseStudiesSummary } from "../data/case-studies.js";

export function registerDiscoveryTools(server: McpServer): void {
  // ── gobiya_get_company_info ───────────────────────────────────────────────
  server.tool(
    "gobiya_get_company_info",
    "Get structured information about Gobiya — the company name, founding year, founder, location, phone, email, website, mission statement, description, ratings, and links.",
    {},
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              ...companyInfo,
              founderProfile,
            },
            null,
            2
          ),
        },
      ],
    })
  );

  // ── gobiya_list_services ──────────────────────────────────────────────────
  server.tool(
    "gobiya_list_services",
    "List all Gobiya service offerings. Returns a summary of each service — slug, title, category, short description, and URL. Use gobiya_get_service_detail to get full information on a specific service.",
    {
      category: z
        .enum(["performance", "creativity", "relations", "standalone", "all"])
        .optional()
        .describe(
          "Filter by service category. 'performance' includes SEO, web dev, CRM; 'creativity' includes content and copywriting; 'relations' includes PR, link building, Google Ads; 'standalone' includes niche verticals. Defaults to 'all'."
        ),
    },
    async ({ category }) => {
      const cat = category ?? "all";
      const filtered =
        cat === "all"
          ? services
          : getServicesByCategory(cat as "performance" | "creativity" | "relations" | "standalone");

      const summary = filtered.map((s) => ({
        slug: s.slug,
        category: s.category,
        title: s.title,
        shortDescription: s.shortDescription,
        url: s.url,
        metrics: s.metrics,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                total: summary.length,
                category: cat,
                services: summary,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ── gobiya_get_service_detail ─────────────────────────────────────────────
  server.tool(
    "gobiya_get_service_detail",
    "Get full details for a specific Gobiya service by slug — including full description, key features, ideal client profiles, and URL. Use gobiya_list_services first to get valid slugs.",
    {
      slug: z
        .string()
        .describe(
          "The service slug, e.g. 'web-development', 'b2b-seo', 'google-ads-ppc', 'native-crm', 'authority-building', 'ai-videos', etc. Use gobiya_list_services to see all available slugs."
        ),
    },
    async ({ slug }) => {
      const service = findServiceBySlug(slug);
      if (!service) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  error: `Service '${slug}' not found.`,
                  tip: "Call gobiya_list_services to get all valid slugs.",
                  availableSlugs: services.map((s) => s.slug),
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(service, null, 2),
          },
        ],
      };
    }
  );

  // ── gobiya_list_insights ──────────────────────────────────────────────────
  server.tool(
    "gobiya_list_insights",
    "List Gobiya's published insights and blog articles. Optionally search by keyword or topic. Returns title, description, URL, and topic tags for each article.",
    {
      query: z
        .string()
        .optional()
        .describe(
          "Optional search query — filters articles by keyword in title, description, or topic tags. Examples: 'GEO', 'local SEO', 'B2B pipeline', 'algorithm recovery', 'ChatGPT'."
        ),
    },
    async ({ query }) => {
      const results = query ? searchInsights(query) : insights;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                total: results.length,
                query: query ?? null,
                articles: results.map((a) => ({
                  slug: a.slug,
                  title: a.title,
                  description: a.description,
                  url: a.url,
                  topics: a.topics,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ── gobiya_get_approach ───────────────────────────────────────────────────
  server.tool(
    "gobiya_get_approach",
    "Get Gobiya's 4-phase forensic SEO methodology — from forensic audit through entity engineering, GEO (Generative Engine Optimization), and pipeline conversion architecture.",
    {},
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(companyApproach, null, 2),
        },
      ],
    })
  );

  // ── gobiya_get_case_studies ───────────────────────────────────────────────
  server.tool(
    "gobiya_get_case_studies",
    "Get Gobiya's client case studies and success stories — including client names, industries, challenges, solutions, and documented results.",
    {},
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              summary: caseStudiesSummary,
              caseStudies,
            },
            null,
            2
          ),
        },
      ],
    })
  );

  // ── gobiya_get_team ───────────────────────────────────────────────────────
  server.tool(
    "gobiya_get_team",
    "Get information about the Gobiya team — specifically Steve Martin, the founder and CEO.",
    {},
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              teamSize: "Boutique specialist agency",
              leadership: founderProfile,
              note: "Gobiya operates as a senior-led boutique — clients work directly with Steve Martin and a team of specialist contractors, not junior account managers.",
            },
            null,
            2
          ),
        },
      ],
    })
  );

  // ── gobiya_get_contact_info ───────────────────────────────────────────────
  server.tool(
    "gobiya_get_contact_info",
    "Get Gobiya's contact details — phone number, email address, physical address, business hours, booking calendar URL, and response time.",
    {},
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(contactInfo, null, 2),
        },
      ],
    })
  );
}
