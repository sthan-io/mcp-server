# @sthan/mcp-server

MCP server for [sthan.io](https://sthan.io) — US address verification, parsing, autocomplete, forward/reverse geocoding, and IP geolocation. Use it from Claude Desktop, Claude Code, Cursor, VS Code, or any MCP-compatible client.

8 tools, TypeScript, stdio transport. Free tier, no credit card required.

## Tools

- `sthan_verify_address` — verify a US address is real and deliverable; returns standardized format, ZIP+4, DPV, residential/commercial
- `sthan_parse_address` — parse a freeform US address into structured components
- `sthan_autocomplete_address` — type-ahead suggestions for full US addresses
- `sthan_autocomplete_city` — type-ahead suggestions for US city names
- `sthan_autocomplete_zipcode` — type-ahead suggestions for US ZIP codes
- `sthan_geocode` — US address → latitude/longitude with accuracy/confidence
- `sthan_reverse_geocode` — latitude/longitude → nearest US street address
- `sthan_ip_geolocation` — IPv4/IPv6 → country, region, city, coordinates, timezone

## Install

```bash
npx @sthan/mcp-server
```

Get a free API key at https://sthan.io/dashboard, then set `STHAN_API_KEY`.

### Claude Desktop / Claude Code

Add to your MCP config:

```json
{
  "mcpServers": {
    "sthan": {
      "command": "npx",
      "args": ["@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "your-key-here" }
    }
  }
}
```

## Packages

| Package | Description |
|---------|-------------|
| [@sthan/mcp-server](packages/mcp-server) | MCP server for Claude Desktop, Cursor, VS Code |
| [@sthan/core](packages/core) | TypeScript client for sthan.io APIs |

## Development

```bash
npm install
npm run build --workspaces
```

## Links

- **Docs:** https://sthan.io/docs
- **npm:** https://www.npmjs.com/package/@sthan/mcp-server
- **Glama:** https://glama.ai/mcp/servers/sthan-io/mcp-server

## License

MIT
