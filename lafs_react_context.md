# Love at First Sight — React Codebase Analysis & Context

This document provides a complete, structured analysis and contextual breakdown of the frontend codebase located in the `love-at-first-site-zentura` folder. It serves as a detailed blueprint for converting the application's UI, routes, logic, and animations into the Next.js App Router codebase under `lafs-next`.

---

## 1. Technical Stack Overview

The source project (`love-at-first-site-zentura`) is built using a modern, fast, server-side rendered (SSR) setup:

- **Core Framework**: **React 19** (`^19.2.0`) & **React DOM 19**.
- **Build Tool / Bundler**: **Vite 8** (`^8.0.16`) with TanStack's Vite plugins (`@lovable.dev/vite-tanstack-config` and `@tanstack/router-plugin`).
- **Routing**: **TanStack Start** / **TanStack Router** (`^1.170.16`), a file-based, type-safe router with Zod-based search parameter validation.
- **Styling**: **Tailwind CSS v4** (`^4.2.1`) using Vite CSS integration.
- **Animations**: **Framer Motion** (`^12.42.2`) for high-fidelity interactive elements, cinematic reveals, and page transition effects.
- **State & Data Fetching**: **TanStack React Query** (`^5.101.1`) for async caching (mostly used dynamically for page context).
- **Forms & Validation**: **React Hook Form** (`^7.71.2`) with **Zod** (`^4.4.3`) for schema validation.
- **Model Context Protocol (MCP)**: Registered server-side handlers powered by `@lovable.dev/mcp-js` to expose read-only tools representing the private-chef marketplace.

---

## 2. Directory Structure

```text
love-at-first-site-zentura/
├── public/                 # Static assets (favicons, images, logos)
├── src/
│   ├── assets/             # Project-specific static visual assets (e.g. logos)
│   ├── components/
│   │   ├── layout/         # Shared global structure (Navbar, Footer)
│   │   ├── ui/             # Radix UI + shadcn/ui primitive controls
│   │   └── ui-lafs/        # Custom-made, highly-styled creative UI widgets
│   ├── data/               # Local mock databases (chefs, journal/blog posts)
│   ├── hooks/              # Reusable React hooks (use-mobile, etc.)
│   ├── lib/
│   │   ├── mcp/            # MCP server configuration and custom tools
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── lovable-error-reporting.ts
│   │   └── utils.ts        # CN utility for conditional class merging
│   ├── routes/             # TanStack Start file-based routing components
│   │   ├── [.mcp]/
│   │   ├── [.well-known]/
│   │   ├── __root.tsx      # Global routing wrapper, context provider, shell
│   │   ├── index.tsx       # Landing page route
│   │   ├── book.tsx        # Multi-step checkout wizard
│   │   ├── chefs.tsx       # Chef list layout shell
│   │   ├── chefs.index.tsx # Roster search, filter, and pagination page
│   │   ├── chefs.$slug.tsx # Chef details, packages, reviews
│   │   ├── journal.tsx     # Blog/journal layout shell
│   │   ├── journal.index.tsx # Blog post listing by category
│   │   ├── journal.$slug.tsx # Blog post reader page
│   │   ├── for-chefs.tsx   # Chef onboarding landing page
│   │   ├── chef-handbook.tsx # Guidelines for platform chefs
│   │   ├── payouts.tsx     # Platform fee structure (85/15) & payout timeline
│   │   └── ...             # Contact, FAQ, Our Story, Returns, Privacy
│   ├── router.tsx          # TanStack Router initialization
│   ├── server.ts           # Nitro server SSR entry and HTTP error normalizer
│   ├── start.ts            # Client-side mounting entry with middleware
│   └── styles.css          # Tailwind CSS v4 variables, global styles, utilities
```

---

## 3. Styling & Theming System (`src/styles.css`)

The application defines a **premium, editorial cinematic aesthetic** ("Aldren × Club 54 fusion") characterized by dark crimson tones, minimal borders, fine lines, custom cursors, and elegant typography.

### Design Tokens (Tailwind v4 Variables)

- **Burgundy Canvas Background**: `#67242B` (`--burgundy`)
- **Deep Dark Burgundy**: `#4A181D` (`--burgundy-deep`)
- **Accent Red-Burgundy**: `#7A3239` (`--burgundy-tint`)
- **Warm Cream Text**: `#F4EFE7` (`--cream`)
- **Muted Cream Text**: `rgba(244, 239, 231, 0.62)` (`--muted-cream`)
- **Warm Sand/Paper Surface**: `#EFE8DC` (`--paper`)
- **Dark Ink Text (on paper)**: `#1A1614` (`--ink`)
- **Gold Accent**: `#C9A961` (`--gold`)
- **Destructive/Warning Red**: `#C43030` (`--destructive`)

### Typography Mappings

- **Display & Body Font**: `Inter` (sans-serif)
  - Configured with tight letter-spacing (`tracking-[-0.035em]` for display, `tracking-[-0.045em]` for heroes) and bold, heavy headings.
  - Headings are styled lowercase for editorial aesthetic: `lowercase`.
- **Numerals & Labels Font**: `Geist Mono`
  - Used for numbers, chapter guides, dates, and navigation labels (`uppercase tracking-[0.14em]`).

### Custom CSS Classes / Utilities

- **`.hairline`**: A very subtle border (`rgba(244, 239, 231, 0.15)`).
- **`.text-hero`**: Fluid responsive sizing for landing headlines (`clamp(2.75rem, 9vw, 8.5rem)`).
- **`.text-stack`**: Fluid sizing for secondary display headings (`clamp(2.5rem, 7.5vw, 6.5rem)`).
- **`.container-page`**: Responsive width container capped at `1360px` with responsive inline paddings.
- **`.cursor-none-root`**: Applied globally when custom cursor is active to hide default pointer actions.
- **`.reveal` / `.reveal-clip`**: Transition setups for animations.

---

## 4. Reusable Layout & Creative Components

All custom styling features are consolidated in `src/components/ui-lafs/` and `src/components/layout/`.

### Layout Components

1. **`Navbar.tsx`**
   - Global fixed glassmorphic container (`bg-brand/90 backdrop-blur-md` on scroll).
   - Contains navigation items (`Home`, `About`, `Chefs`, `For Chefs`, `Gallery`, `Journal`, `Contact`).
   - Sign In CTA button routing to `/dashboard`.
   - Fullscreen mobile overlay menu using Framer Motion stagger transitions.
2. **`Footer.tsx`**
   - Clean four-column editorial grid (`Explore`, `For Chefs`, `Company`, `Legal`).
   - Signature large lowercase wordmark branding: **"love, plated."**
   - Dynamically pulls current year: `new Date().getFullYear()`.

### Custom UI Components (`src/components/ui-lafs/`)

1. **`CinematicHero.tsx`**
   - Parallax-scrolled header section supporting an Unsplash static background image or auto-played background loop video.
   - Cinematic entry transition using a `clip-path` curtain sweep (`inset(0 0 100% 0) -> inset(0 0 0 0)` over `1200ms`).
   - Staggered line-by-line slide-up and blur reveal for display titles.
2. **`CustomCursor.tsx`**
   - Tracks mouse coordinates with responsive spring physics.
   - Screen-blended soft cream outer glow wrapper (`mix-blend-screen` with radial gradient) and a sharp inner cream dot.
   - Automatically detects pointer capability and expands when hovering over interactive nodes (`a`, `button`, inputs, etc.).
3. **`Lightbox.tsx`**
   - Shared React Context Provider (`LightboxProvider`) and trigger component (`LightboxImage`).
   - Mounts a swipeable, full-screen image overlay with keyboard handlers (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate), index counter, captions, and tap-outside closures.
4. **`ChefCard.tsx`**
   - Grid cell displaying chef name, profile portrait, cuisine, city, and starting price.
   - Includes micro-interaction underlines that sweep open (`scale-x-0 -> scale-x-100`) on mouse hovers.
5. **`Reveal.tsx` / `BlurReveal.tsx` / `RevealImage.tsx`**
   - Wrappers using Framer Motion to animate entry fades, slide-ups, or curtain clips on scroll view intersections.
6. **`Stars.tsx`**
   - Tiny visual star rating indicator (1-5 ratings) filled proportionally using SVG polygons.

---

## 5. Page Routes & Functionality

Each page is designed as a standalone file route under `src/routes/` resolving through TanStack start.

### Homepage (`index.tsx`)
- Includes the `CinematicHero` with an Unsplash background image and background MP4 video.
- **Section 1**: Conceptual introduction to the marketplace.
- **Section 2**: Five-fragment editorial image collage wired to the `LightboxImage` controller.
- **Section 3**: Three-step procedural layout explaining the platform workflow.
- **Section 4**: Slider of editorial reviews (featuring customer quotes, names, categories, and avatars).

### Chefs Directory (`chefs.index.tsx` & `chefs.tsx`)
- Visual roster filtering panel:
  - **Fuzzy Search Input**: Filters by name, cuisine, city, or specialties.
  - **Select Filters**: Multi-option custom Radix triggers matching predefined array sets (`cuisines`, `cities`).
  - **Sorting Selector**: Sorts by featured roster order, highest rating score, or price bounds.
  - **Pagination Controls**: Page list blocks of 12 elements with dynamic forward/backward tabs.

### Chef Profile Detail View (`chefs.$slug.tsx`)
- Dynamic route utilizing the `slug` parameter (fetched from `getChef` in data loader).
- Highlighting personal info blocks (headline bio description, ratings, cuisine credentials).
- Displays individual chef **dinner packages** with inclusions (e.g. course counts, wine setup, table setups).
- Interactive grids linking package links to preselected bookings.
- Displays guest reviews section.

### Multi-Step Booking Wizard (`book.tsx`)
- Stateful route implementing a three-stage booking funnel:
  1. **Occasion & When**: Combined selector for event themes (first date, anniversary, proposal, etc.), date picker, and arrival time input.
  2. **Chef & Menu selection**: Roster picker (if not preselected) and package/menu course tier configuration.
  3. **Contact & Payment**: Form capture for name, email, billing details, payment method selection (Card, Pay Later), mock card preview, and summary breakdown.
- Uses **TanStack search parameters** (`searchSchema` validated via Zod) to persist user configurations directly in the address bar. This allows refreshing and backward navigations without data loss:
  `{ step: "evening", occasion: "anniversary", chef: "elena-moretti", packageId: "p1", date: "2026-07-18", time: "19:30" }`

### Dashboard (`dashboard.tsx`)
- Visual dashboard interface prototype.
- Displays upcoming booked events containing payment status tags, menu details, and message prompts.
- Displays mock chat lists mimicking messaging threads.

### Editorial Pages (`our-story.tsx`, `for-chefs.tsx`, `chef-handbook.tsx`, `payouts.tsx`)
- **`our-story.tsx`**: Visual milestones and values of the founders.
- **`for-chefs.tsx`**: Features application dialog modal form asking for culinary styles, links, and pricing. Shows benefits (Set own prices, Build reputation, We handle rest), 4 steps how it works (Apply, Get approved, Publish gigs, Start cooking), 85% payout details, and testimonials from chefs (Elena M., Amara O., Leon P.).
- **`chef-handbook.tsx` & `payouts.tsx`**: Clean breakdowns of platform policies, payment timelines (48h payouts), cancellation policies, and the standard **85% chef / 15% platform split**.

---

## 6. Static Data Specifications (`src/data/`)

### Chef Schema (`src/data/chefs.ts`)
```typescript
export type Package = {
  id: string;
  name: string;
  courses: number;
  price: number;
  description: string;
  inclusions: string[];
};

export type Review = {
  author: string;
  rating: number;
  date: string;
  body: string;
};

export type Chef = {
  slug: string;
  name: string;
  city: string;
  cuisine: string;
  specialty: string;
  headline: string;
  bio: string;
  portrait: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  startingPrice: number;
  packages: Package[];
  reviews: Review[];
};
```
Preloaded with 6 mock profiles (`Elena Moretti` (Italian), `Jules Tanaka` (Japanese Kaiseki), `Amara Okafor` (West African), `Matteo Silva` (Peruvian), `Isabelle Laurent` (French Modern Bistrot), `Priya Varma` (Modern Indian)).

### Journal Post Schema (`src/data/journal.ts`)
```typescript
export type Post = {
  slug: string;
  n: string; // Double digit index label (e.g. "01")
  kicker: string;
  title: string;
  excerpt: string;
  body: string[]; // Array of paragraph strings
  image: string;
  read: string; // Reading time estimation (e.g. "6 min")
  date: string;
  category: "First dates" | "Anniversaries" | "Proposals" | "Everyday" | "Letters";
};
```
Stores highly editorial blog entries regarding home cooking guidelines, romantic suggestions, proposals timing, and reviews.

---

## 7. Model Context Protocol (MCP) Integration

The application hosts a native MCP server mounted on the API path `/mcp` via TanStack Start server handlers.

### Key MCP Setup Files

- **`src/routes/mcp.ts`**
  Declares the `/mcp` server endpoint, intercepting requests and routing them to the custom TanStack MCP handler wrapper using:
  ```typescript
  createTanStackMcpHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource" })
  ```
- **`src/lib/mcp/index.ts`**
  Initializes the MCP server named `love-at-first-sight-mcp` and hooks up the available tools:
  ```typescript
  import { defineMcp } from "@lovable.dev/mcp-js";
  export default defineMcp({
    name: "love-at-first-sight-mcp",
    title: "Love at First Sight",
    version: "0.1.0",
    tools: [listChefs, getChef, listPackages]
  });
  ```

### Exposed Read-Only Tools (`src/lib/mcp/tools/`)

1. **`list_chefs`**
   - **Arguments**: `city?: string` (optional), `cuisine?: string` (optional).
   - **Response**: List of chefs matching search parameters (slug, name, location, cuisine type, review scores, starting price).
2. **`get_chef`**
   - **Arguments**: `slug: string` (required).
   - **Response**: The complete chef object profile (bio details, full reviews, and associated packages).
3. **`list_packages`**
   - **Arguments**: `chefSlug?: string` (optional), `maxPrice?: number` (optional).
   - **Response**: Flat collection of packages across all roster profiles for comparison.

---

## 8. Next.js Conversion Guidelines

To successfully translate this codebase to Next.js App Router in `lafs-next`:

### Routing & Data Loading
1. **Dynamic Pages**: Map TanStack dynamic routes to App Router dynamic directory segments:
   - `src/routes/chefs.$slug.tsx` -> `app/chefs/[slug]/page.tsx`
   - `src/routes/journal.$slug.tsx` -> `app/journal/[slug]/page.tsx`
2. **Search Parameters**: Map Zod search parameter validation to Next.js search parameters.
   - For `/book`, extract params inside `page.tsx` or using `useSearchParams()` hooks inside client-side templates, validating them via the same Zod schema.
3. **Static Data Loader**: Read the static databases (`src/data/chefs.ts` and `src/data/journal.ts`) directly inside React Server Components or local page views.

### CSS & Custom Configuration
1. **Tailwind v4 Integration**: Ensure Next.js PostCSS config resolves `@import "tailwindcss"` properly. Import the custom configuration classes, custom animations, font faces, and variables from the `styles.css` file into Next's global stylesheet (`app/globals.css`).
2. **Global Components**:
   - Wrap the Next.js `layout.tsx` children in the custom layout framework containing the Navbar, Footer, Lightbox Context Provider, and the Spring-loaded Custom Cursor.

### Animations
1. **Framer Motion**: Add the `"use client"` directive to `CustomCursor`, `CinematicHero`, `Lightbox`, and all other transition wrappers, as they use browser-specific layout hooks (`window.matchMedia`, `mousemove`, mouse events).
