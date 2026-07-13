import { NextRequest } from "next/server";
import { createOAuthProtectedResourceMetadataHandler } from "@lovable.dev/mcp-js/protocols/oauth-metadata";
import mcp from "@/lib/mcp/index";

const handler = createOAuthProtectedResourceMetadataHandler(mcp, {
  resourcePath: "/mcp",
  metadataPath: "/.well-known/oauth-protected-resource",
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function OPTIONS(request: NextRequest) {
  return handler(request);
}
