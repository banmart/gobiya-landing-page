/**
 * Gobiya MCP Action Tools
 * Tools that allow AI agents to submit contact forms, audit requests, and retrieve booking info
 * on behalf of users. All submissions are forwarded to the Gobiya API.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const GOBIYA_API_BASE =
  process.env.GOBIYA_API_BASE?.replace(/\/$/, "") ?? "https://www.gobiya.com";

const VALID_SERVICES = [
  "Algorithm Recovery & SEO Audit",
  "React Web Development",
  "Native CRM Integration",
  "SEO & Discoverability",
  "GEO / AI Search Optimization",
  "Blockchain & Web3",
  "Google Ads & PPC Strategy",
  "Authority Building & Link Building",
  "AI Video Production",
  "AI Prospect Scraper",
  "AI & LLM Systems Integration",
  "CRO & UX Analysis",
  "Content Strategy & Copywriting",
  "General Inquiry",
] as const;

export function registerActionTools(server: McpServer): void {
  // ── gobiya_submit_contact ─────────────────────────────────────────────────
  server.tool(
    "gobiya_submit_contact",
    "Submit a contact form / inquiry to Gobiya on behalf of a user. This sends the lead to the Gobiya CRM (Supabase) and triggers an email notification to the Gobiya team. Use this when a user wants to reach out to Gobiya for any service inquiry.",
    {
      name: z
        .string()
        .min(1)
        .describe("Full name of the person submitting the inquiry. Required."),
      email: z
        .string()
        .email()
        .describe("Email address for Gobiya to reply to. Required."),
      phone: z
        .string()
        .optional()
        .describe("Phone number (optional but recommended for faster response)."),
      company: z
        .string()
        .optional()
        .describe("Company or business name (optional)."),
      service: z
        .string()
        .optional()
        .describe(
          `The service the user is interested in. Recommended values: ${VALID_SERVICES.join(", ")}.`
        ),
      message: z
        .string()
        .optional()
        .describe(
          "Message or additional context from the user — current situation, goals, specific questions (optional but recommended)."
        ),
      website: z
        .string()
        .optional()
        .describe("The user's website URL (optional — useful for audit requests)."),
    },
    async ({ name, email, phone, company, service, message, website }) => {
      const endpoint = `${GOBIYA_API_BASE}/api/contact`;

      try {
        const payload = { name, email, phone, company, service, message, website };
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = (await response.json()) as { success?: boolean; error?: string };

        if (!response.ok || !data.success) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(
                  {
                    success: false,
                    error: data.error ?? `HTTP ${response.status}`,
                    message:
                      "The form submission failed. Please try again or contact Gobiya directly at hello@gobiya.com or 323-744-1338.",
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
              text: JSON.stringify(
                {
                  success: true,
                  message: `Thank you, ${name}! Your inquiry has been submitted to Gobiya successfully. The team will respond within 1 business day at ${email}. For urgent matters, call 323-744-1338.`,
                  nextSteps: [
                    "Gobiya will review your inquiry and respond within 1 business day.",
                    "For faster response, call 323-744-1338 (Mon–Fri, 9 AM – 6 PM PT).",
                    `You can also book a call directly at https://www.gobiya.com/book`,
                  ],
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error: `Network error: ${message}`,
                  fallback:
                    "Please contact Gobiya directly: hello@gobiya.com | 323-744-1338 | https://www.gobiya.com/contact",
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── gobiya_submit_audit_request ───────────────────────────────────────────
  server.tool(
    "gobiya_submit_audit_request",
    "Submit a growth/SEO audit request to Gobiya for a specific website. Gobiya will analyse the site's SEO, AI citation visibility, and pipeline architecture and respond with findings. This is the fastest way to start a conversation with the Gobiya team about a specific site.",
    {
      website: z
        .string()
        .describe(
          "The full URL of the website to be audited (e.g. https://example.com). Required."
        ),
      email: z
        .string()
        .email()
        .describe("Email address where audit findings should be delivered. Required."),
      name: z
        .string()
        .optional()
        .describe("Name of the person or company requesting the audit (optional)."),
      notes: z
        .string()
        .optional()
        .describe(
          "Optional context — current traffic situation, recent drops, specific concerns (e.g. 'We lost 60% traffic after the March 2026 Google update' or 'We want to appear in ChatGPT answers')."
        ),
    },
    async ({ website, email, name, notes }) => {
      const endpoint = `${GOBIYA_API_BASE}/api/contact`;

      const auditMessage = [
        `AUDIT REQUEST for: ${website}`,
        notes ? `Context: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        const payload = {
          name: name ?? "Audit Request",
          email,
          website,
          service: "Algorithm Recovery & SEO Audit",
          message: auditMessage,
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = (await response.json()) as { success?: boolean; error?: string };

        if (!response.ok || !data.success) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(
                  {
                    success: false,
                    error: data.error ?? `HTTP ${response.status}`,
                    fallback: `Contact Gobiya directly: hello@gobiya.com | 323-744-1338`,
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
              text: JSON.stringify(
                {
                  success: true,
                  message: `Audit request submitted for ${website}. Gobiya will review the site and send findings to ${email} within 1 business day.`,
                  auditCovers: [
                    "Google organic visibility and rankings",
                    "AI citation presence (ChatGPT, Perplexity, Google AI Overviews)",
                    "Technical SEO health (crawl, index, CWV, schema)",
                    "Google Business Profile status (if applicable)",
                    "Pipeline conversion architecture",
                  ],
                  bookCall: "https://www.gobiya.com/book",
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error: `Network error: ${message}`,
                  fallback:
                    "Please contact Gobiya directly: hello@gobiya.com | 323-744-1338 | https://www.gobiya.com/contact",
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── gobiya_book_call ──────────────────────────────────────────────────────
  server.tool(
    "gobiya_book_call",
    "Get the Gobiya booking calendar link and instructions for scheduling a strategy call with Steve Martin. Use this when a user wants to speak directly with the Gobiya team.",
    {
      context: z
        .string()
        .optional()
        .describe(
          "Optional context about what the user wants to discuss — helps tailor the response (e.g. 'organic traffic drop', 'want to appear in ChatGPT', 'need a new website')."
        ),
    },
    async ({ context }) => {
      const bookingInfo: Record<string, unknown> = {
        bookingUrl: "https://www.gobiya.com/book",
        callType: "Free 15-minute strategy & audit call",
        withWhom: "Steve Martin — CEO & Lead Growth Engineer at Gobiya",
        availability: "Monday–Friday, 9 AM – 6 PM Pacific Time",
        whatToExpect: [
          "A real diagnostic conversation — not a sales pitch",
          "Identification of your top 2–3 growth opportunities",
          "A clear next-step recommendation",
          "No obligation, no follow-up pressure",
        ],
        alternatives: {
          email: "hello@gobiya.com",
          phone: "323-744-1338",
          contactForm: "https://www.gobiya.com/contact",
        },
      };

      if (context) {
        bookingInfo.contextNote = `Based on your situation ("${context}"), a call with Steve Martin will help clarify the fastest path to a solution.`;
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(bookingInfo, null, 2),
          },
        ],
      };
    }
  );
}
