import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chefs } from "@/data/chefs";

export default defineTool({
  name: "list_packages",
  title: "List dinner packages",
  description:
    "List every dinner package across all chefs, or scoped to one chef via slug. Useful for price and course-count comparisons.",
  inputSchema: {
    chefSlug: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Restrict to one chef's packages."),
    maxPrice: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Return only packages at or below this per-guest price (USD)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ chefSlug, maxPrice }) => {
    const scope = chefSlug ? chefs.filter((c) => c.slug === chefSlug) : chefs;
    const rows = scope.flatMap((c) =>
      c.packages
        .filter((p) => (maxPrice ? p.price <= maxPrice : true))
        .map((p) => ({
          chef: c.name,
          chefSlug: c.slug,
          city: c.city,
          package: p.name,
          courses: p.courses,
          price: p.price,
          description: p.description,
        })),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { packages: rows },
    };
  },
});