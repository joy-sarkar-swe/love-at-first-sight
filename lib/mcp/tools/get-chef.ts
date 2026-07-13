import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chefs } from "@/data/chefs";

export default defineTool({
  name: "get_chef",
  title: "Get chef details",
  description:
    "Fetch the full profile for one chef by slug — bio, packages, gallery, and reviews.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Chef slug, e.g. 'elena-moretti'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const chef = chefs.find((c) => c.slug === slug);
    if (!chef) {
      return {
        content: [{ type: "text", text: `No chef found for slug "${slug}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(chef, null, 2) }],
      structuredContent: { chef },
    };
  },
});