#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SthanClient, SthanApiError } from "@sthan/core";
import { z } from "zod";

const MISSING_KEY_MESSAGE =
  "STHAN_API_KEY environment variable is not set. " +
  "Get a free key at https://sthan.io/dashboard, then set STHAN_API_KEY in your MCP client config.";

function getClient(): SthanClient {
  const apiKey = process.env.STHAN_API_KEY;
  if (!apiKey) {
    throw new Error(MISSING_KEY_MESSAGE);
  }
  return new SthanClient({
    apiKey,
    baseUrl: process.env.STHAN_API_URL,
  });
}

const server = new McpServer({
  name: "sthan",
  version: "0.1.2",
});

// --- Tool 1: Verify US Address ---

server.tool(
  "sthan_verify_address",
  "Verify if a US address is real and deliverable. Returns standardized format, ZIP+4, delivery point validation (DPV), and whether it's residential or commercial. Use when someone asks 'is this address real?', 'can mail be delivered here?', or 'verify this address'.",
  {
    address: z
      .string()
      .describe(
        "Full or partial US address in any format. Examples: '123 Main St, New York, NY 10001', '123 main st nyc', '1600 Pennsylvania Ave Washington DC'"
      ),
  },
  async ({ address }) => {
    try {
      const response = await getClient().verifyAddress(address);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 2: Parse US Address ---

server.tool(
  "sthan_parse_address",
  "Parse a freeform US address string into structured components (street number, name, type, direction, unit, city, state, zip). Use when someone has messy or unstructured address text and needs it broken into parts.",
  {
    address: z
      .string()
      .describe(
        "Raw address text to parse. Freeform input, abbreviations OK. Example: 'apt 2b 500 broadway new york ny'"
      ),
  },
  async ({ address }) => {
    try {
      const response = await getClient().parseAddress(address);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 3: Autocomplete US Address ---

server.tool(
  "sthan_autocomplete_address",
  "Get address suggestions from partial input. Sub-100ms response time. Returns array of complete US address strings. Use for type-ahead address completion.",
  {
    text: z
      .string()
      .describe("Partial address text (3+ characters recommended). Example: '123 Main'"),
  },
  async ({ text }) => {
    try {
      const response = await getClient().autocompleteAddress(text);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 4: Autocomplete US City ---

server.tool(
  "sthan_autocomplete_city",
  "Get US city name suggestions from partial input. Returns matching cities with state.",
  {
    text: z.string().describe("Partial city name. Example: 'San Fr'"),
    display_type: z
      .number()
      .int()
      .min(0)
      .max(1)
      .default(0)
      .describe("0 = City, StateCode (e.g. 'San Francisco, CA'). 1 = City, State (e.g. 'San Francisco, California')"),
  },
  async ({ text, display_type }) => {
    try {
      const response = await getClient().autocompleteCity(text, display_type);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 5: Autocomplete US ZIP Code ---

server.tool(
  "sthan_autocomplete_zipcode",
  "Get US ZIP code suggestions from partial input.",
  {
    text: z.string().describe("Partial ZIP code. Example: '9021'"),
    display_type: z
      .number()
      .int()
      .min(0)
      .max(3)
      .default(0)
      .describe(
        "0 = Zip,StateCode. 1 = Zip,State. 2 = Zip-Zip4,StateCode. 3 = Zip-Zip4,State"
      ),
  },
  async ({ text, display_type }) => {
    try {
      const response = await getClient().autocompleteZipCode(text, display_type);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 6: Forward Geocode US Address ---

server.tool(
  "sthan_geocode",
  "Convert a US address to latitude/longitude coordinates. Returns accuracy type (rooftop, interpolated, centroid, approximate) and confidence score. Use when someone needs coordinates for an address.",
  {
    address: z
      .string()
      .describe(
        "US address to geocode (freeform text). Example: '1600 Pennsylvania Ave, Washington DC'"
      ),
  },
  async ({ address }) => {
    try {
      const response = await getClient().geocodeAddress(address);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 7: Reverse Geocode ---

server.tool(
  "sthan_reverse_geocode",
  "Convert latitude/longitude coordinates to the nearest US street address. Returns the address with distance in meters from input coordinates. Use when someone has coordinates and wants the address.",
  {
    latitude: z.number().min(-90).max(90).describe("Latitude coordinate"),
    longitude: z.number().min(-180).max(180).describe("Longitude coordinate"),
  },
  async ({ latitude, longitude }) => {
    try {
      const response = await getClient().reverseGeocode(latitude, longitude);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Tool 8: IP Geolocation ---

server.tool(
  "sthan_ip_geolocation",
  "Look up the geographic location of an IPv4 or IPv6 address. Returns country, region, city, coordinates, timezone, and postal code. Use when someone wants to know where an IP address is located.",
  {
    ip: z
      .string()
      .describe("IPv4 (e.g. '8.8.8.8') or IPv6 (e.g. '2001:4860:4860::8888') address"),
  },
  async ({ ip }) => {
    try {
      const response = await getClient().ipGeolocation(ip);
      return {
        content: [{ type: "text", text: JSON.stringify(response.Result, null, 2) }],
      };
    } catch (e) {
      return errorResult(e);
    }
  }
);

// --- Error helper ---

function errorResult(e: unknown) {
  if (e instanceof SthanApiError) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error (${e.statusCode}): ${e.message}`,
        },
      ],
      isError: true,
    };
  }
  const msg = e instanceof Error ? e.message : String(e);
  return {
    content: [{ type: "text" as const, text: `Error: ${msg}` }],
    isError: true,
  };
}

// --- Start server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
