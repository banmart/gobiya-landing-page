# Gobiya MCP Server

> **Live endpoint:** `https://www.gobiya.com/mcp`  
> Connect any MCP-compatible AI agent directly — no installation required.

An **MCP (Model Context Protocol)** server that lets any MCP-compatible AI agent discover information about Gobiya and submit leads/forms on behalf of users.

## Connection options

| Mode | How | Best for |
|---|---|---|
| **Remote HTTP** (recommended) | URL: `https://www.gobiya.com/mcp` | Claude.ai, any HTTP MCP client, public agents |
| **stdio** (local) | `node dist/index.js` | Claude Desktop, Cursor, Windsurf on your machine |


## What it does

AI agents that connect to this server can:

**Discover Gobiya:**
- `gobiya_get_company_info` — Structured company data (name, founder, location, phone, email, mission)
- `gobiya_list_services` — All services with descriptions and URLs (filterable by category)
- `gobiya_get_service_detail` — Deep dive on any specific service by slug
- `gobiya_list_insights` — All published articles (searchable by keyword/topic)
- `gobiya_get_approach` — The 4-phase forensic SEO methodology
- `gobiya_get_case_studies` — Client success stories with documented results
- `gobiya_get_team` — Steve Martin's profile and expertise
- `gobiya_get_contact_info` — Phone, email, address, booking URL, and hours

**Take Actions:**
- `gobiya_submit_contact` — Submit a contact/inquiry form (wired to Supabase CRM + Resend email)
- `gobiya_submit_audit_request` — Submit an SEO/GEO audit request for a specific website
- `gobiya_book_call` — Get the booking calendar link and scheduling instructions

**Resources (injectable context):**
- `gobiya://company/overview` — Full markdown company briefing
- `gobiya://company/services` — Full service catalogue in markdown
- `gobiya://company/approach` — 4-phase methodology in markdown
- `gobiya://company/case-studies` — Client success stories in markdown

---

## Setup

### 1. Install dependencies

```bash
cd mcp-server
npm install
```

### 2. Configure environment (optional)

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Use https://www.gobiya.com for production
# Use http://localhost:3000 if running the Gobiya dev server locally
GOBIYA_API_BASE=https://www.gobiya.com
```

### 3. Build

```bash
npm run build
```

---

## Running with MCP Inspector (browser UI)

```bash
npm run inspector
# or:
npx @modelcontextprotocol/inspector node dist/index.js
```

Open the URL printed in terminal to explore tools and resources interactively.

---

## Host Configuration

### Claude Desktop

Add to `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "gobiya": {
      "command": "node",
      "args": ["C:/Users/banma/projects/v-hero/mcp-server/dist/index.js"],
      "env": {
        "GOBIYA_API_BASE": "https://www.gobiya.com"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "gobiya": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"],
      "env": {
        "GOBIYA_API_BASE": "https://www.gobiya.com"
      }
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "gobiya": {
      "command": "node",
      "args": ["C:/Users/banma/projects/v-hero/mcp-server/dist/index.js"],
      "env": {
        "GOBIYA_API_BASE": "https://www.gobiya.com"
      }
    }
  }
}
```

---

## Development

```bash
# Watch mode (recompiles on save)
npm run dev

# In another terminal, run the inspector against the built output
npm run inspector
```

---

## File Structure

```
mcp-server/
├── package.json
├── tsconfig.json
├── .env.example
├── README.md          ← this file
└── src/
    ├── index.ts       ← MCP server entry, resources
    ├── data/
    │   ├── company.ts       ← Company knowledge base
    │   ├── services.ts      ← Full service catalogue
    │   ├── insights.ts      ← Article metadata
    │   └── case-studies.ts  ← Client success stories
    └── tools/
        ├── discovery.ts     ← Read-only discovery tools
        └── actions.ts       ← Form submission tools
```

---

## Architecture Notes

- **Transport:** stdio — works with any MCP 1.x compatible host
- **Form submissions:** POSTs to `{GOBIYA_API_BASE}/api/contact` which saves to Supabase `prospects` table and triggers a Resend email notification
- **No auth required:** The `/api/contact` endpoint is publicly accessible (same as the website contact form)
- **TypeScript + ESM:** Compiled to ES2022 modules, requires Node.js 18+
