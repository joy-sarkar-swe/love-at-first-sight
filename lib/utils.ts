import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildHref(to: string, params?: Record<string, string>, search?: Record<string, unknown>): string {
  let url = to;
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      // Replace both TanStack-style parameters ($slug) and Next-style placeholders ([slug]) if they exist
      url = url.replace(`$${key}`, val)
               .replace(`:${key}`, val)
               .replace(`[${key}]`, val);
    });
  }
  if (search) {
    const sp = new URLSearchParams();
    Object.entries(search).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        sp.set(key, String(val));
      }
    });
    const searchString = sp.toString();
    if (searchString) {
      url += `?${searchString}`;
    }
  }
  return url;
}

