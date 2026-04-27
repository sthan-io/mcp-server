# Sthan MCP Server

[![npm version](https://img.shields.io/npm/v/@sthan/mcp-server.svg)](https://www.npmjs.com/package/@sthan/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**MCP server for [sthan.io](https://sthan.io)** — give your AI assistant the ability to verify, parse, autocomplete, and geocode US addresses, and look up IP geolocation. Works with Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, and any MCP-compatible client.

8 tools · TypeScript · stdio transport · Free tier, no credit card required.

---

## Why use it

- **Real US postal data** — addresses are verified against authoritative postal records, not heuristics. Returns delivery point validation (DPV), ZIP+4, residential/commercial flag.
- **Sub-100ms autocomplete** — typeahead-grade response times for address, city, and ZIP suggestions.
- **Strong geocoding** — forward geocoding returns accuracy classification (rooftop / interpolated / centroid / approximate) plus a confidence score, so your AI knows when to trust the result.
- **IPv4 + IPv6 geolocation** — country, region, city, coordinates, timezone, postal code.
- **Free tier with no credit card** — get a key in under a minute at [sthan.io/dashboard](https://sthan.io/dashboard).

## Tools

| Tool | What it does |
|---|---|
| `sthan_verify_address` | Verify a US address is real and deliverable. Returns standardized format, ZIP+4, DPV, residential/commercial. |
| `sthan_parse_address` | Parse freeform US address text into structured components (street number, name, type, direction, unit, city, state, zip). |
| `sthan_autocomplete_address` | Suggest complete US addresses from partial input. Sub-100ms. |
| `sthan_autocomplete_city` | Suggest US cities from partial input, with state code. |
| `sthan_autocomplete_zipcode` | Suggest US ZIP codes from partial input. |
| `sthan_geocode` | US address → latitude/longitude with accuracy + confidence. |
| `sthan_reverse_geocode` | Latitude/longitude → nearest US street address with distance in meters. |
| `sthan_ip_geolocation` | IPv4 or IPv6 → country, region, city, coordinates, timezone, postal code. |

## Quick start

### 1. Get a free API key

Sign up at [sthan.io](https://sthan.io) and create a key from the [dashboard](https://sthan.io/dashboard). No credit card.

### 2. Add to your MCP client

**Claude Desktop / Claude Code** (`~/.claude/mcp.json` or project `.claude/mcp.json`):

```json
{
  "mcpServers": {
    "sthan": {
      "command": "npx",
      "args": ["-y", "@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "sthan_test_your_key_here" }
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "sthan": {
      "command": "npx",
      "args": ["-y", "@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "sthan_test_your_key_here" }
    }
  }
}
```

**VS Code** (`settings.json`):

```json
{
  "mcp.servers": {
    "sthan": {
      "command": "npx",
      "args": ["-y", "@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "sthan_test_your_key_here" }
    }
  }
}
```

## Example prompts

Once configured, just ask your AI assistant naturally:

- *"Is 123 Main St, New York, NY 10001 a real, deliverable address?"*
- *"Parse this address: apt 2b 500 broadway new york ny"*
- *"What are the coordinates of 1600 Pennsylvania Ave, Washington DC?"*
- *"What's the nearest address to 40.7128, -74.0060?"*
- *"Where is IP 8.8.8.8 located?"*
- *"Suggest US cities starting with 'San Fr'."*

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `STHAN_API_KEY` | Yes | Your sthan.io API key (`sthan_test_*` for development, `sthan_live_*` for production) |
| `STHAN_API_URL` | No | Override base URL (default: `https://api.sthan.io`) |

## Packages

This monorepo publishes two packages:

| Package | npm | Purpose |
|---|---|---|
| [`@sthan/mcp-server`](packages/mcp-server) | [![npm](https://img.shields.io/npm/v/@sthan/mcp-server.svg)](https://www.npmjs.com/package/@sthan/mcp-server) | The MCP server itself — the binary that your client launches |
| [`@sthan/core`](packages/core) | [![npm](https://img.shields.io/npm/v/@sthan/core.svg)](https://www.npmjs.com/package/@sthan/core) | TypeScript SDK for direct programmatic use of sthan.io APIs |

## Development

```bash
git clone https://github.com/sthan-io/mcp-server.git
cd mcp-server
npm install
npm run build --workspaces
```

Then run the server with `STHAN_API_KEY=sthan_test_... node packages/mcp-server/dist/index.js`.

## Links

- **Homepage:** https://sthan.io
- **API docs:** https://sthan.io/docs
- **OpenAPI spec:** https://api.sthan.io/openapi.json
- **AI reference (`llms-full.txt`):** https://api.sthan.io/llms-full.txt
- **Pricing:** https://sthan.io/pricing/united-states
- **Support:** https://sthan.io/support
- **Glama:** https://glama.ai/mcp/servers/sthan-io/mcp-server

## License

MIT — see [LICENSE](LICENSE).
