import { NextRequest } from "next/server";
import { createInvokeToolHandler } from "@lovable.dev/mcp-js/protocols/rest";
import mcp from "@/lib/mcp/index";

const handler = createInvokeToolHandler(mcp, {
  resourcePath: "/mcp",
  metadataPath: "/.well-known/oauth-protected-resource",
});

interface Context {
  params: Promise<{ tool: string }>;
}

export async function POST(request: NextRequest, { params }: Context) {
  const resolvedParams = await params;
  return handler(request, resolvedParams.tool);
}

export async function OPTIONS(request: NextRequest, { params }: Context) {
  const resolvedParams = await params;
  return handler(request, resolvedParams.tool);
}
