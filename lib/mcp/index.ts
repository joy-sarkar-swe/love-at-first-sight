import { defineMcp } from "@lovable.dev/mcp-js";
import listChefs from "./tools/list-chefs";
import getChef from "./tools/get-chef";
import listPackages from "./tools/list-packages";

export default defineMcp({
  name: "love-at-first-sight-mcp",
  title: "Love at First Sight",
  version: "0.1.0",
  instructions:
    "Read-only tools for the Love at First Sight private-chef marketplace. Use `list_chefs` to browse or filter by city/cuisine, `get_chef` for a full profile including packages and reviews, and `list_packages` to compare dinner packages across chefs.",
  tools: [listChefs, getChef, listPackages],
});