import { NextRequest } from "next/server";
import { createListToolsHandler } from "@lovable.dev/mcp-js/protocols/rest";
import mcp from "@/lib/mcp/index";

const handler = createListToolsHandler(mcp, {
  resourcePath: "/mcp",
  metadataPath: "/.well-known/oauth-protected-resource",
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function OPTIONS(request: NextRequest) {
  return handler(request);
}
