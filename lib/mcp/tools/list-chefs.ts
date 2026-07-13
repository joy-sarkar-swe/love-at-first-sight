import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { chefs } from "@/data/chefs";

export default defineTool({
  name: "list_chefs",
  title: "List chefs",
  description:
    "List the private chefs available on Love at First Sight. Optionally filter by city or cuisine (case-insensitive substring match).",
  inputSchema: {
    city: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Filter by city, e.g. 'Brooklyn' or 'London'."),
    cuisine: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Filter by cuisine, e.g. 'Italian', 'Japanese'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ city, cuisine }) => {
    const rows = chefs
      .filter((c) => (city ? c.city.toLowerCase().includes(city.toLowerCase()) : true))
      .filter((c) => (cuisine ? c.cuisine.toLowerCase().includes(cuisine.toLowerCase()) : true))
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        city: c.city,
        cuisine: c.cuisine,
        specialty: c.specialty,
        rating: c.rating,
        reviewCount: c.reviewCount,
        startingPrice: c.startingPrice,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { chefs: rows },
    };
  },
});