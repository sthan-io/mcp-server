# @sthan/mcp-server

MCP server for [sthan.io](https://sthan.io) — US address verification, parsing, autocomplete, geocoding, and IP geolocation.

Works with Claude Code, Cursor, VS Code, Windsurf, and any MCP-compatible client.

## Setup

### 1. Get an API key

Sign up at [sthan.io](https://sthan.io) (free tier, no credit card required). Create an API key from your [dashboard](https://sthan.io/dashboard).

### 2. Configure your client

**Claude Code** (`~/.claude/mcp.json` or project `.claude/mcp.json`):

```json
{
  "mcpServers": {
    "sthan": {
      "command": "npx",
      "args": ["@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "sthan_test_your_api_key_here" }
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
      "args": ["@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "sthan_test_your_api_key_here" }
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
      "args": ["@sthan/mcp-server"],
      "env": { "STHAN_API_KEY": "sthan_test_your_api_key_here" }
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `sthan_verify_address` | Verify a US address for deliverability. Returns DPV confirmation, ZIP+4, carrier route. |
| `sthan_parse_address` | Parse freeform address text into structured components (street, city, state, zip, unit). |
| `sthan_autocomplete_address` | Get address suggestions from partial input. Sub-100ms response time. |
| `sthan_autocomplete_city` | Get US city suggestions from partial input. |
| `sthan_autocomplete_zipcode` | Get US ZIP code suggestions from partial input. |
| `sthan_geocode` | Convert a US address to latitude/longitude coordinates. |
| `sthan_reverse_geocode` | Convert coordinates to the nearest US street address. |
| `sthan_ip_geolocation` | Look up geographic location of an IPv4 or IPv6 address. |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `STHAN_API_KEY` | Yes | Your sthan.io API key (`sthan_test_*` or `sthan_live_*`) |
| `STHAN_API_URL` | No | Override base URL (default: `https://api.sthan.io`) |

## Examples

Once configured, just ask your AI assistant naturally:

- "Is 123 Main St, New York, NY 10001 a real address?"
- "Parse this address: apt 2b 500 broadway new york ny"
- "What are the coordinates for the White House?"
- "What address is at 40.7128, -74.0060?"
- "Where is IP 8.8.8.8 located?"

## Links

- [API docs](https://sthan.io/docs)
- [Pricing](https://sthan.io/pricing/united-states)
- [OpenAPI spec](https://api.sthan.io/openapi.json)
- [AI reference](https://api.sthan.io/llms-full.txt)

## License

MIT
