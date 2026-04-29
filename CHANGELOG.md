# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-04-27

### Changed
- `STHAN_API_KEY` is no longer required at server startup. The check is deferred
  to per-tool invocation, so MCP introspection (`tools/list`) succeeds without
  an API key and tool calls return a clear error message if the key is missing.
- Expanded root README with a "why use it" section, multi-client setup snippets
  (Claude Desktop, Cursor, VS Code), example prompts, and links to the OpenAPI
  spec and `llms-full.txt` AI reference.
- `@sthan/core` updated to 0.1.2.

### Fixed
- Resolved 2 moderate transitive vulnerabilities reported by `npm audit`
  (in `hono`, via `@modelcontextprotocol/sdk`) by updating the lockfile.

### Added
- `LICENSE` file at the repository root (MIT).
- `glama.json` declaring the repository maintainer.
- `CHANGELOG.md` (this file).
- Continuous integration: build + type-check on Node 20 and 22.

## [0.1.1] - 2026-04-05

### Added
- `mcpName` field in `package.json` and `server.json` for the GitHub MCP Registry.
- `smithery.yaml` for the Smithery MCP directory.

## [0.1.0] - 2026-04-04

### Added
- Initial release.
- 8 MCP tools: `sthan_verify_address`, `sthan_parse_address`,
  `sthan_autocomplete_address`, `sthan_autocomplete_city`,
  `sthan_autocomplete_zipcode`, `sthan_geocode`, `sthan_reverse_geocode`,
  `sthan_ip_geolocation`.
- `@sthan/core` TypeScript SDK package.
- `@sthan/mcp-server` MCP server package, stdio transport.
