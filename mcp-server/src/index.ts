#!/usr/bin/env node
/**
 * Gobiya MCP Server
 *
 * Exposes Gobiya's company info, services, insights, approach, case studies,
 * and team to any MCP-compatible AI agent. Also allows agents to submit
 * contact forms and leads on behalf of users.
 *
 * Transport: stdio (works with Claude Desktop, Cursor, Windsurf, Continue, etc.)
 *
 * Usage:
 *   node dist/index.js
 *
 * See README.md for host configuration instructions.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config as loadEnv } from "dotenv";

// ── Load .env from the mcp-server directory ───────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");
if (existsSync(envPath)) {
  loadEnv({ path: envPath });
}

// ── Imports after env is loaded ───────────────────────────────────────────
import { companyInfo, companyApproach, contactInfo, founderProfile } from "./data/company.js";
import { services, getServicesByCategory } from "./data/services.js";
import { insights } from "./data/insights.js";
import { caseStudies, caseStudiesSummary } from "./data/case-studies.js";
import { registerDiscoveryTools } from "./tools/discovery.js";
import { registerActionTools } from "./tools/actions.js";

// ── Server setup ──────────────────────────────────────────────────────────
const server = new McpServer({
  name: "gobiya-mcp-server",
  version: "1.0.0",
  description:
    "Gobiya MCP Server — discover Gobiya's services, approach, insights, and team. Submit leads and audit requests.",
});

// ── Register Tools ────────────────────────────────────────────────────────
registerDiscoveryTools(server);
registerActionTools(server);

// ── Register Resources ────────────────────────────────────────────────────
// Resources provide injectable context blobs that LLMs can attach to conversations.

server.resource(
  "company-overview",
  "gobiya://company/overview",
  {
    description:
      "Complete Gobiya company overview — founding, leadership, mission, services summary, ratings, and contact details. Use this as a comprehensive briefing document.",
    mimeType: "text/markdown",
  },
  async () => {
    const markdown = `# Gobiya — Company Overview

## About Gobiya

**Gobiya** is a Los Angeles digital marketing agency founded in **${companyInfo.founded}** by **${companyInfo.founder}**. The agency specialises in technical SEO, Generative Engine Optimization (GEO), custom React web development, native CRM pipelines, and AI-driven search visibility.

${companyInfo.description}

---

## Mission

> "${companyInfo.missionStatement}"

---

## Leadership

**${founderProfile.name}** — ${founderProfile.title}

${founderProfile.bio}

**Expertise:** ${founderProfile.expertise.join(", ")}

---

## Key Facts

| Field | Value |
|---|---|
| Founded | ${companyInfo.founded} |
| Location | ${companyInfo.address.city}, ${companyInfo.address.state} |
| Address | ${companyInfo.address.street}, ${companyInfo.address.city}, ${companyInfo.address.state} ${companyInfo.address.zip} |
| Phone | ${companyInfo.phone} |
| Email | ${companyInfo.email} |
| Website | ${companyInfo.website} |
| Hours | ${companyInfo.hours} |
| BBB Rating | ${companyInfo.ratings.bbb} |
| Google Partner | ${companyInfo.ratings.googlePartner} |
| Languages | ${companyInfo.languages.join(", ")} |

---

## Service Categories

- **Performance**: SEO, Web Development, Native CRM, B2B SEO, Local SEO, Traffic Recovery, E-Commerce SEO, AI Systems, Blockchain
- **Creativity**: SEO Copywriting, Content Strategy, GEO/AI Content, Landing Pages, AI Video Production, Crypto Marketing
- **Relations**: Google Ads & PPC, Authority Building, Digital PR & Media Outreach

---

## Client Results

${caseStudiesSummary.highlights.map((h: string) => `- ${h}`).join("\n")}

---

## Contact

- **Phone:** ${contactInfo.phone}
- **Email:** ${contactInfo.email}
- **Book a Call:** ${contactInfo.bookingUrl}
- **Contact Form:** ${contactInfo.contactPageUrl}
- **Response Time:** ${contactInfo.responseTime}
`;

    return {
      contents: [
        {
          uri: "gobiya://company/overview",
          mimeType: "text/markdown",
          text: markdown,
        },
      ],
    };
  }
);

server.resource(
  "services",
  "gobiya://company/services",
  {
    description:
      "Full catalogue of all Gobiya services with descriptions, features, and target client profiles.",
    mimeType: "text/markdown",
  },
  async () => {
    const sections = [
      { category: "performance" as const, label: "Performance Services" },
      { category: "creativity" as const, label: "Creativity Services" },
      { category: "relations" as const, label: "Relations Services" },
      { category: "standalone" as const, label: "Industry Specialist Services" },
    ];

    let markdown = "# Gobiya — Full Service Catalogue\n\n";

    for (const { category, label } of sections) {
      const categoryServices = getServicesByCategory(category);
      if (categoryServices.length === 0) continue;

      markdown += `## ${label}\n\n`;

      for (const s of categoryServices) {
        markdown += `### ${s.title}\n\n`;
        markdown += `**Slug:** \`${s.slug}\`  \n`;
        markdown += `**URL:** ${s.url}\n\n`;
        markdown += `${s.fullDescription}\n\n`;
        if (s.metrics) {
          markdown += `> **Key Metric:** ${s.metrics}\n\n`;
        }
        markdown += `**Key Features:**\n${s.keyFeatures.map((f: string) => `- ${f}`).join("\n")}\n\n`;
        markdown += `**Ideal For:**\n${s.idealFor.map((f: string) => `- ${f}`).join("\n")}\n\n`;
        markdown += "---\n\n";
      }
    }

    return {
      contents: [
        {
          uri: "gobiya://company/services",
          mimeType: "text/markdown",
          text: markdown,
        },
      ],
    };
  }
);

server.resource(
  "approach",
  "gobiya://company/approach",
  {
    description:
      "Gobiya's 4-phase forensic SEO methodology — from initial audit through entity engineering, GEO optimisation, and pipeline conversion.",
    mimeType: "text/markdown",
  },
  async () => {
    let markdown = `# Gobiya — ${companyApproach.title}\n\n`;
    markdown += `*${companyApproach.subtitle}*\n\n`;
    markdown += `**Full details:** ${companyApproach.url}\n\n---\n\n`;

    for (const phase of companyApproach.phases) {
      markdown += `## Phase ${phase.phase}: ${phase.name}\n\n`;
      markdown += `${phase.description}\n\n`;
    }

    return {
      contents: [
        {
          uri: "gobiya://company/approach",
          mimeType: "text/markdown",
          text: markdown,
        },
      ],
    };
  }
);

server.resource(
  "case-studies",
  "gobiya://company/case-studies",
  {
    description:
      "Gobiya client success stories and case studies with documented results.",
    mimeType: "text/markdown",
  },
  async () => {
    let markdown = "# Gobiya — Client Case Studies\n\n";
    markdown += `**Portfolio highlights:** ${caseStudiesSummary.highlights.join(" | ")}\n\n---\n\n`;

    for (const cs of caseStudies) {
      markdown += `## ${cs.clientName}\n\n`;
      markdown += `**Industry:** ${cs.industry}  \n**Location:** ${cs.location}\n\n`;
      markdown += `### Challenge\n\n${cs.challenge}\n\n`;
      markdown += `### Solution\n\n${cs.solution}\n\n`;
      markdown += `### Results\n\n${cs.results.map((r: string) => `- ✅ ${r}`).join("\n")}\n\n`;
      markdown += `### Services Used\n\n${cs.servicesUsed.map((s: string) => `- ${s}`).join("\n")}\n\n`;
      markdown += `**Full case study:** ${cs.url}\n\n---\n\n`;
    }

    return {
      contents: [
        {
          uri: "gobiya://company/case-studies",
          mimeType: "text/markdown",
          text: markdown,
        },
      ],
    };
  }
);

// ── Start the server ──────────────────────────────────────────────────────
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdio transport — do not write to stdout; use stderr for logs only
  process.stderr.write("[Gobiya MCP] Server started successfully.\n");
}

main().catch((err: unknown) => {
  process.stderr.write(`[Gobiya MCP] Fatal error: ${err}\n`);
  process.exit(1);
});
