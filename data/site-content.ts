// Structured, editable site content.
// Phase 2 dashboard will bind to these exports. Do not inline these strings in components.

export const EQUIPMENT_REQUIREMENTS = [
  "Standard home kitchen required",
  "Chef brings most equipment",
  "Outdoor cooking setup required",
  "Specialty equipment required",
  "Dinnerware rental available",
  "Additional equipment fee may apply",
] as const;
export type EquipmentRequirement = (typeof EQUIPMENT_REQUIREMENTS)[number];

export const WHATS_INCLUDED = [
  {
    title: "What Your Chef Provides",
    body: "Your chef will arrive with professional knives, personal culinary tools, plating supplies, and any specialty equipment listed in your booking agreement.",
  },
  {
    title: "What the Client Provides",
    body: "Clients are expected to provide a clean, functioning kitchen with standard cookware, basic preparation equipment, dinnerware, glassware, and utensils unless alternative arrangements have been made.",
  },
  {
    title: "Need Additional Equipment?",
    body: "If your kitchen is missing essential items, your chef may recommend rentals or offer to provide select equipment for an additional fee.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    title: "Browse the book",
    body: "Open the chef list and read them like an anthology — one at a time, no rush. Each chef sets their own menus, prices, and rhythm. Save the ones that catch you.",
  },
  {
    n: "02",
    title: "Shape the evening",
    body: "Pick the occasion, the menu, the date. Add a note about the room, the guests, the wine on the counter. The chef reads it before saying yes.",
  },
  {
    n: "03",
    title: "Review the kitchen",
    body: "Each chef lists what their cooking needs — a standard home kitchen, outdoor setup, or specialty gear. You'll answer a short kitchen questionnaire and can add photos so the chef knows the space.",
  },
  {
    n: "04",
    title: "A quiet confirmation",
    body: "Your booking is a request until the chef reviews your kitchen details and approves. Inside 24 hours they confirm, send the final menu, and answer any questions — all inside your dashboard.",
  },
  {
    n: "05",
    title: "They arrive with everything",
    body: "Groceries, wine pairings, plating, service, the full cleanup. You keep the candles low and the conversation going. We handle the rest.",
  },
] as const;

export const HOME_HERO = {
  badge: "Private Chefs. Unforgettable Moments.",
  headline: "Private Chefs.\nUnforgettable\nMoments.",
  caption:
    "We connect exceptional private chefs with clients seeking unforgettable moments — one meal at a time.",
  primaryCta: "Browse chefs",
  secondaryCta: "How it works",
} as const;

export const BRAND = {
  tagline: "Private Chefs. Unforgettable Moments.",
} as const;

export const CONTACT_DETAILS = {
  emails: [] as { label: string; value: string }[],
  replyTime: "within one evening",
  instagram: "Love_at_first_sight86",
  instagramUrl: "https://instagram.com/Love_at_first_sight86",
  site: "loveatfirstsight.biz",
};

export const CONFIRMATION_GATING_STATEMENT =
  "Your booking is not fully confirmed until the chef has reviewed and approved the kitchen and equipment details provided.";

// ============================================================
// UNIT 7 — Real brand & About content (from Founding Guide deck)
// ============================================================

export const ABOUT_CONTENT = {
  heroBadge: "Our Story",
  heroHeadline: "Private Chefs.\nUnforgettable\nMoments.",
  heroCaption:
    "Love at First Sight was inspired by our own story and a shared passion for bringing people together through exceptional food.",
  story: [
    "From the moment we met, we knew that some of life's most meaningful memories are created around the table. Jeremy's love for culinary excellence and Vanity's vision for luxury hospitality inspired us to create a company where talented chefs and unforgettable experiences come together.",
    "Today, our mission is simple: to connect exceptional private chefs with clients seeking unforgettable moments — one meal at a time.",
  ],
  mission: "To redefine private dining through exceptional chefs and elevated hospitality.",
  vision: "To become the premier luxury private chef network in the country.",
  founders: [
    {
      name: "Jeremy Stokes",
      role: "Founder & Chief Culinary Officer",
      portrait: "",
    },
    {
      name: "Vanity Stokes",
      role: "Founder & Chief Executive Officer",
      portrait: "",
    },
  ],
} as const;

export const FOR_CHEFS_CONTENT = {
  whyPartner: [
    { t: "Premium clientele", b: "Cook for guests who value your craft and pay accordingly." },
    { t: "Flexible scheduling", b: "Set your own availability. Accept only the bookings that fit your life." },
    { t: "Marketing support", b: "We invest in bringing diners to your profile." },
    { t: "Luxury brand representation", b: "Your work is presented in a setting that reflects its quality." },
    { t: "Professional growth", b: "Every booking builds your reputation and your following." },
    { t: "Long-term partnership", b: "We're building something durable — with you inside it." },
  ],
  foundingBenefits: [
    {
      t: "Founding Signature Chef Status",
      b: "Be recognized as one of the original chefs who helped launch Love at First Sight.",
    },
    {
      t: "Priority Booking Opportunities",
      b: "Founding chefs receive first consideration for eligible bookings as the company grows.",
    },
    {
      t: "Featured Chef Promotion",
      b: "Your profile may be highlighted on our website, social media and marketing materials.",
    },
    {
      t: "Professional Brand Exposure",
      b: "Gain visibility through a luxury platform designed to showcase your culinary experience.",
    },
  ],
  standards: [
    "Professionalism",
    "Amazing Presentations",
    "Communication",
    "Reliability",
    "Food Safety",
    "Hospitality",
    "Excellence",
  ],
  chefPledge: {
    items: [
      "Serve every client with professionalism and respect.",
      "Deliver exceptional food and unforgettable experiences.",
      "Maintain the highest standards of quality, cleanliness and food safety.",
      "Communicate with honesty, integrity and reliability.",
      "Represent the Love at First Sight brand with excellence.",
      "Create memorable moments through outstanding hospitality.",
    ],
    closing: "Together we don't just prepare meals — we create unforgettable moments.",
  },
} as const;

export const CHEF_FAQ = {
  items: [
    { q: "Am I an independent contractor?", a: "Yes." },
    { q: "Can I decline bookings?", a: "Yes." },
    { q: "Do I set my own availability?", a: "Yes." },
    {
      q: "Can I build my business while partnering with Love at First Sight?",
      a: "Absolutely. We encourage chefs to continue growing their personal brand.",
    },
  ],
  closing:
    "Still have questions? Our founders are committed to supporting every chef from onboarding through every unforgettable event.",
} as const;
