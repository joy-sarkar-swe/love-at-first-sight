# Love at First Sight — React & Next.js Codebase Analysis & Migration Context

This document provides a complete, structured analysis and contextual breakdown of the frontend codebase located in `love-at-first-site-zentura` (React version) and its synchronized implementation in `lafs-next` (Next.js App Router version).

---

## 1. Technical Stack Overview

### React Version (`love-at-first-site-zentura`)
- **Core Framework**: **React 19** (`^19.2.0`) & **React DOM 19**.
- **Build Tool / Bundler**: **Vite 8** (`^8.0.16`) with TanStack Vite plugins.
- **Routing**: **TanStack Start** / **TanStack Router** (`^1.170.16`), type-safe file-based router.
- **Styling**: **Tailwind CSS v4** (`^4.2.1`).
- **Animations**: **Framer Motion** (`^12.42.2`) for interactive elements and transitions.

### Next.js Version (`lafs-next`)
- **Core Framework**: **Next.js 15+** App Router.
- **Routing**: App Router directory structure (`app/[routes]`), using `page.tsx` (Server Components) and `page.client.tsx` (Client Components).
- **Styling**: **Tailwind CSS v4** with CSS variables (`globals.css`).
- **UI Components**: Shadcn UI + custom `ui-lafs` component system.

---

## 2. Recent Repository Synchronization & Updates

### A. Centralized Site Content (`data/site-content.ts`)
A dedicated content module was introduced to centralize all site copy, constants, and structured data across both projects:
- **`EQUIPMENT_REQUIREMENTS`**: Comprehensive equipment tags required by private chefs (Standard Stove/Oven, High-powered Blender, Cast-Iron Skillet, Food Processor, Pasta Roller, Stand Mixer, Blowtorch, Sous-vide Precision Cooker, Sheet Pans & Roasters, Outdoor Grill/BBQ).
- **`WHATS_INCLUDED`**: 3 core guest inclusions (Groceries & Sourcing, Cooking & Plating, Full Kitchen Cleanup).
- **`HOW_IT_WORKS_STEPS`**: 4-step guest flow (Choose the Evening, Pick Your Chef, We Handle the Rest, An Unhurried Evening).
- **`HOME_HERO`**: Hero copy constants for the landing page.
- **`CONTACT_DETAILS`**: Official contact email roster, reply times, web address, and Instagram handle.
- **`CONFIRMATION_GATING_STATEMENT`**: Legal and workflow statement clarifying chef review and confirmation gating prior to charge.
- **`ABOUT_CONTENT`**: Story, mission, vision, and founder bio data.
- **`FOR_CHEFS_CONTENT`**: "Why Partner With Us", "Founding Signature Benefits", "Our Standards", "Chef Pledge", and FAQ items for chefs.
- **`CHEF_FAQ`**: FAQ items and closing pledge statement.

### B. Chef Data Model Expansion (`data/chefs.ts`)
The `Chef` type interface was expanded to support rich portfolio metadata:
- **`equipmentRequirements`**: `EquipmentRequirement[]` array detailing required kitchen tools.
- **`signatureDishes`**: Array of `{ name: string; note?: string }` showcasing top dishes.
- **`offersCustomMenu`**: Boolean indicating whether the chef accepts custom menu briefs.
- **`leadTimeWeeks`**: Number indicating typical advance booking lead time.
- **Expanded Roster**: 13 total chefs (`elena-moretti`, `amara-okonkwo`, `leon-park`, `sophia-laurent`, `marcus-vance`, `claire-dubois`, `diego-torres`, `kenji-takahashi`, `isabella-rossi`, `hassan-al-mansoor`, `maya-lin`, `gabriel-silva`, `chloe-bennett`).

### C. Chef Detail View (`app/chefs/[slug]/page.client.tsx`)
Updated to display:
- **Signature Dishes**: Dedicated showcase section with dish notes.
- **Equipment Requirements**: Visual tags for required kitchen equipment.
- **Lead Time & Custom Menu Badges**: Visual indicators for booking notice and custom menus.
- **What To Expect**: 3-step breakdown consuming `WHATS_INCLUDED`.

### D. For Chefs Application Flow (`app/for-chefs/page.client.tsx`)
Rebuilt to feature a complete 3-step application modal (`ApplicationDialog`):
1. **Step 1 — About You**: Name, email, phone, city, travel radius, portfolio URL.
2. **Step 2 — Your Cooking**: Cuisine, experience years, headline, bio, signature dishes, custom menu toggle, sample package creator.
3. **Step 3 — Credentials & Kitchen**: Profile photo upload, food safety cert, liability insurance toggle, equipment requirements checklist, availability days, lead time, and signed chef pledge.

### E. 4-Step Booking Wizard (`app/book/page.client.tsx`)
Redesigned booking flow supporting 4 distinct steps:
1. **Step 1 — The Evening**: Guest name input (for live menu invitation preview), occasion selector, calendar date picker, arrival time.
2. **Step 2 — Chef & Menu**: Chef selector, package selector, "Design a Custom Menu" brief builder (`__custom__`), guest count, and dietary/allergy notes.
3. **Step 3 — Kitchen & Equipment**: Chef equipment checklist, 6-item kitchen questionnaire (stove, fridge, pots, baking, boards, tableware), kitchen limitations input, and photo uploads.
4. **Step 4 — Contact & Payment**: Guest details, payment method selection (Card / Pay after chef confirms), deposit calculation, `CONFIRMATION_GATING_STATEMENT`, live physical invitation preview (`MenuPreview`), and success confirmation modal (`SuccessDialog`).

### F. Page Consistency & Branding
- **Footer**: Updated to consume `CONTACT_DETAILS` for Instagram and site link.
- **Our Story**: Updated to consume `ABOUT_CONTENT`.
- **Contact Page**: Updated to consume `CONTACT_DETAILS`.
- **FAQ Page**: Updated to consume `CHEF_FAQ`.
- **Home Page**: Updated to consume `HOME_HERO`.

---

## 3. Directory Structure Comparison

```text
lafs-next/
├── app/
├── book/
│   ├── page.tsx            # Server Component wrapper
│   └── page.client.tsx     # 4-Step Client Booking Flow & Live Preview
├── chefs/
│   ├── page.tsx
│   ├── page.client.tsx     # Roster filter & search
│   └── [slug]/
│       ├── page.tsx
│       └── page.client.tsx # Chef details, signature dishes, equipment tags
├── for-chefs/
│   ├── page.tsx
│   └── page.client.tsx     # Chef landing page & 3-Step Application Modal
├── our-story/
│   └── page.tsx            # Founder story & mission
├── contact/
│   ├── page.tsx
│   └── page.client.tsx     # Contact details & inquiry form
├── faq/
│   └── page.tsx            # Guest & Chef FAQ accordion
├── data/
│   ├── chefs.ts            # 13 chef profiles + expanded Chef schema
│   └── site-content.ts     # Centralized site copy constants
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui-lafs/            # CinematicHero, Section, Reveal, CircleButton
│   └── ui/                 # Calendar, Dialog, Popover, Input, Textarea
```

---

## 4. Styling & Theme System (`app/globals.css`)

- **Canvas Background**: `#67242B` (`--burgundy`)
- **Deep Dark Burgundy**: `#4A181D` (`--burgundy-deep`)
- **Cream Text**: `#F4EFE7` (`--cream`)
- **Paper Surface**: `#EFE8DC` (`--paper`)
- **Dark Ink**: `#1A1614` (`--ink`)
- **Gold Accent**: `#C9A961` (`--gold`)
- **Cursor Classes**: `.cursor-none-root` (candlelit cursor) & `.cursor-native` (default system cursor over paper cards & modals).

---

## 5. Latest Commit Synchronization (Commits `7b7ec4f` to `d5ee5a7`)

1. **Navbar Breakpoint Update (`components/layout/Navbar.tsx`)**:
   - Changed desktop continuous nav pill display threshold from `hidden md:flex` to `hidden lg:flex`.
   - Updated mobile logo link and hamburger menu button threshold to `lg:hidden`.

2. **Root Layout Pointer Setup (`app/layout.tsx`)**:
   - Removed `<CustomCursor />` component from root layout to ensure native cursor and hover behaviors across all cards and interactive controls.

3. **Booking Wizard Design & Flow Alignment (`app/book/page.client.tsx`)**:
   - **`StepTitle` & Container Grid**: Updated step title styling to use a 2-column grid (`lg:grid-cols-[80px_minmax(0,1fr)]`), converting "Step X of Y" to `"N°0X / 0Y"` with a gold underline flourish and 54px bold lowercase display title. Added `lg:pl-[120px]` inner padding to form containers across all 4 steps.
   - **Step 1 (`EveningStep`)**: Replaced button grid with a luxury `<Select>` dropdown for occasions (`What are we celebrating?`), dark transparent inputs (`bg-cream/[0.04] border-cream/20`), italic hint copy (*`Watch the invitation fill in as you type.`*, *`Dinner usually starts 18:00–20:30.`*), and custom occasion input toggle.
   - **Step 3 (`KitchenStep`)**: Fully aligned with React design using `EditorialSection` components:
     - Section `i`: `what [chef] needs` (Chef's equipment requirements pills).
     - Section `ii`: `the kitchen, honestly` (Divided questionnaire with uppercase font-mono `YES`/`NO` gold buttons and limitations text area).
     - Section `iii`: `anything to bring?` (`EXTRA_EQUIPMENT_OPTIONS` grid with dinnerware, induction, grill, linens, stemware, etc.).
     - Section `iv`: `a look at the room` (Image upload dropzone).
     - Section `v`: `what's included` (`WHATS_INCLUDED` 3-column list with `01`, `02`, `03` numbers).
   - **Paper Invitation Card (`MenuPreview`)**: Removed all border-radius rounded corners to restore the crisp, sharp physical paper card rectangle (`relative w-full text-ink` with inset line borders). Updated all paper typography to match React design (`font-serif italic text-[34px]` for guest name, `font-serif italic text-[15px]` for occasion, `font-serif italic text-[22px]` for menu title, `font-serif text-[13.5px]` for description, `font-serif italic text-[15px]` for chef name).
   - **Payment Step (`PaymentStep`)**: Single-column layout (`max-w-xl`), removed redundant right-side summary box, added mobile-only due today summary row (`md:hidden`), and updated gating statement styling (`border-l-2 border-gold/40 pl-4`).
   - **Success Screen / Confirmation**: Updated title responsiveness (`text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px]`), expanded container width (`max-w-5xl`), and transformed layout into a 2-column grid (`grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]`) containing guest metadata on the left and the physical `MenuPreview` card (`stepIdx={4}`) on the right.

4. **Chef Application Modal Simplification (`app/for-chefs/page.client.tsx`)**:
   - **Step 2 (Your Cooking)**: Replaced multi-field dish creator and sample package form box with a simple signature dishes textarea (one per line, up to 5) and converted custom menu option to a Select dropdown (`Yes, on request` / `No, set menus only`).
   - **Step 3 (Credentials & Kitchen)**: Streamlined Step 3 into a clean 2-column form (profile photo, food safety cert dropdown, liability insurance dropdown, typical lead time dropdown, available days buttons, custom gold checkboxes, and informational notice).

5. **Our Story Page Refinements (`app/our-story/page.tsx`)**:
   - **Founders Photo**: Updated to use `/Love_at_First_Sight_Founders_Photo.png` from the `public` directory with height expanded to `h-[600px] sm:h-[720px] md:h-[820px]`.
   - **Top Alignment**: Set section grid alignment to `items-start` so the left column text is aligned cleanly at the top.





