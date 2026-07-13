import { NextRequest } from "next/server";
import { createMcpProtocolHandler } from "@lovable.dev/mcp-js/protocols/mcp";
import mcp from "@/lib/mcp/index";

const handler = createMcpProtocolHandler(mcp, {
  resourcePath: "/mcp",
  metadataPath: "/.well-known/oauth-protected-resource",
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}

export async function OPTIONS(request: NextRequest) {
  return handler(request);
}
