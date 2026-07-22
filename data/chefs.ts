import { EQUIPMENT_REQUIREMENTS, type EquipmentRequirement } from "./site-content";

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

export type SignatureDish = {
  name: string;
  note?: string;
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
  /** Chef-specific equipment expectations. Restricted to EQUIPMENT_REQUIREMENTS. */
  equipmentRequirements: EquipmentRequirement[];
  /** Display-only showcase of specialty dishes (Airbnb-style "My specialties"). */
  signatureDishes: SignatureDish[];
  /** Whether guests can request a custom menu when booking. */
  offersCustomMenu: boolean;
  /** Typical lead time in weeks — how far out this chef usually books. */
  leadTimeWeeks: number;
};

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * NOTE: Placeholder roster of 13 chefs. The client will replace these with
 * real founding chef profiles at handoff (via the dashboard project's
 * apply → review → approve pipeline). Field names match the Chef shape so
 * the mapping is 1:1.
 */
const G = (ids: string[]) => ids.map((id) => IMG(id));

export const chefs: Chef[] = [
  {
    slug: "elena-moretti",
    name: "Elena Moretti",
    city: "New York",
    cuisine: "Italian",
    specialty: "Handmade pasta",
    headline: "Roman pasta and long, unhurried evenings.",
    bio: "Elena trained in Trastevere and cooks the Roman classics — cacio e pepe, amatriciana, carbonara — with hand-rolled pasta made at your counter. Fifteen years in professional kitchens; the last four cooking privately for New York families.",
    portrait: IMG("photo-1595273670150-bd0c3c392e46"),
    gallery: G(["photo-1551218808-94e220e084d2","photo-1473093226795-af9932fe5856","photo-1481931098730-318b6f776db0"]),
    rating: 4.9, reviewCount: 128, startingPrice: 220,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "Cacio e pepe", note: "Rolled at your counter, finished tableside." },
      { name: "Tagliatelle al ragù", note: "Two-day braise, hand-cut pasta." },
      { name: "Tiramisu della nonna", note: "Her grandmother's recipe, unchanged." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "The Roman Table", courses: 4, price: 220, description: "An unhurried Roman evening. Antipasto, hand-rolled pasta, the secondo you'll remember, the dolce you'll ask her to write down.", inclusions: ["4 courses", "Wine pairing notes", "Full cleanup"] },
      { id: "p2", name: "For the One You Love", courses: 6, price: 340, description: "Six courses paced like a good conversation. Wine chosen to match the light.", inclusions: ["6 courses", "Wine pairing (3 glasses)", "Custom menu design", "Full cleanup"] },
    ],
    reviews: [
      { author: "Priya S.", rating: 5, date: "March 2026", body: "Our tenth anniversary. She made cacio e pepe on our counter while we drank the Barolo we'd been saving." },
      { author: "Marcus L.", rating: 5, date: "February 2026", body: "We booked her again a month later. That's the whole review." },
    ],
  },
  {
    slug: "jules-tanaka",
    name: "Jules Tanaka",
    city: "Los Angeles",
    cuisine: "Japanese",
    specialty: "Omakase at home",
    headline: "A quiet omakase built around the market that morning.",
    bio: "Jules cooked at two Michelin-starred sushi counters in Tokyo before moving to Los Angeles. He shops the docks that morning and builds the menu around what the boats brought in.",
    portrait: IMG("photo-1583394293214-28ded15ee548"),
    gallery: G(["photo-1579584425555-c3ce17fd4351","photo-1553621042-f6e147245754","photo-1580822184713-fc5400e7fe10"]),
    rating: 4.9, reviewCount: 96, startingPrice: 280,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment", "Specialty equipment required"],
    signatureDishes: [
      { name: "Nine-piece omakase", note: "Built around that morning's market." },
      { name: "Chawanmushi with dashi", note: "Slow-steamed, black truffle in season." },
      { name: "Wagyu tataki", note: "Seared with binchōtan at the counter." },
    ],
    offersCustomMenu: false,
    leadTimeWeeks: 3,
    packages: [
      { id: "p1", name: "The Counter", courses: 9, price: 280, description: "Nine pieces, paced. He works in front of you at your counter.", inclusions: ["9 courses", "Sake pairing notes", "Full cleanup"] },
      { id: "p2", name: "The Full Omakase", courses: 14, price: 420, description: "Fourteen pieces, three appetisers, dessert. A slow evening.", inclusions: ["14 courses", "Sake pairing (3 pours)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Ana R.", rating: 5, date: "April 2026", body: "He worked in silence for ten minutes then handed my husband a piece of uni that made him close his eyes. That was the moment." },
      { author: "Devon W.", rating: 5, date: "January 2026", body: "The best sushi I've had outside Tokyo, and he made it on our island." },
    ],
  },
  {
    slug: "amara-okafor",
    name: "Amara Okafor",
    city: "London",
    cuisine: "Modern Nigerian",
    specialty: "West African tasting menus",
    headline: "Jollof, suya, and the flavours of Lagos, plated for a private table.",
    bio: "Amara grew up in Lagos and cooked through the London supper club scene before going private. Her tasting menus draw on Yoruba home cooking and modern West African fine dining in equal measure.",
    portrait: IMG("photo-1594744803329-e58b31de8bf5"),
    gallery: G(["photo-1504674900247-0877df9cc836","photo-1476224203421-9ac39bcb3327","photo-1467003909585-2f8a72700288"]),
    rating: 4.8, reviewCount: 74, startingPrice: 195,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "Party jollof", note: "Smoky, tomato-deep, cooked on the bone." },
      { name: "Suya short rib", note: "Dry-rubbed with yaji, grilled to order." },
      { name: "Puff-puff with honey", note: "Fried at the end of the meal." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "Lagos, Late", courses: 5, price: 195, description: "Five courses that trace an evening in Lagos — from the street to the family table.", inclusions: ["5 courses", "Full cleanup"] },
      { id: "p2", name: "The Feast", courses: 7, price: 285, description: "Seven courses shared family-style. Built for a bigger table.", inclusions: ["7 courses", "Wine pairing notes", "Full cleanup"] },
    ],
    reviews: [
      { author: "Kemi A.", rating: 5, date: "May 2026", body: "The jollof tasted like my mother's. I actually cried at the table." },
      { author: "Tom E.", rating: 5, date: "March 2026", body: "Every course had a story. She cooked and she told them beautifully." },
    ],
  },
  {
    slug: "matteo-silva",
    name: "Matteo Silva",
    city: "Lisbon",
    cuisine: "Portuguese",
    specialty: "Live-fire seafood",
    headline: "Fish, charcoal, olive oil. Nothing gets in the way.",
    bio: "Matteo cooks the Atlantic — whole fish over embers, clams in white wine, arroz de marisco cooked to the second. He brings a portable grill and works outside when he can.",
    portrait: IMG("photo-1577219491135-ce391730fb2c"),
    gallery: G(["photo-1467003909585-2f8a72700288","photo-1414235077428-338989a2e8c0","photo-1476224203421-9ac39bcb3327"]),
    rating: 4.8, reviewCount: 61, startingPrice: 175,
    equipmentRequirements: ["Outdoor cooking setup required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "Whole sea bass, ember-roasted", note: "Salt-crusted, opened at the table." },
      { name: "Amêijoas à Bulhão Pato", note: "Clams, garlic, coriander, white wine." },
      { name: "Arroz de marisco", note: "Loose, brothy, cooked to order." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 1,
    packages: [
      { id: "p1", name: "The Fire", courses: 4, price: 175, description: "A simple menu built around whatever's freshest at the market that morning.", inclusions: ["4 courses", "Full cleanup"] },
      { id: "p2", name: "The Long Lunch", courses: 6, price: 250, description: "Six courses, long table, wine that stands up to the fire.", inclusions: ["6 courses", "Wine pairing (2 glasses)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Rita C.", rating: 5, date: "June 2026", body: "He grilled the fish on our terrace at sunset. It was perfect." },
      { author: "James B.", rating: 4, date: "April 2026", body: "Simple food, cooked exactly right. Would book again." },
    ],
  },
  {
    slug: "isabelle-laurent",
    name: "Isabelle Laurent",
    city: "Paris",
    cuisine: "French",
    specialty: "Bistro classics, quietly perfect",
    headline: "Steak au poivre, tarte tatin, and a bottle of something red.",
    bio: "Isabelle spent a decade in Left Bank bistros before going private. Her menus are short, classic, and finished with the small technical flourishes that make bistro food great.",
    portrait: IMG("photo-1607631568010-a87245c0daf8"),
    gallery: G(["photo-1414235077428-338989a2e8c0","photo-1467003909585-2f8a72700288","photo-1476224203421-9ac39bcb3327"]),
    rating: 4.9, reviewCount: 88, startingPrice: 210,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "Steak au poivre", note: "Cognac flambéed in the pan." },
      { name: "Poulet rôti", note: "Butter-basted, thyme, lemon." },
      { name: "Tarte tatin", note: "Caramel-dark, flipped at the table." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "Le Bistro", courses: 4, price: 210, description: "Four courses in the classic bistro rhythm.", inclusions: ["4 courses", "Wine pairing notes", "Full cleanup"] },
      { id: "p2", name: "Le Grand Menu", courses: 6, price: 310, description: "Six courses for a longer evening.", inclusions: ["6 courses", "Wine pairing (3 glasses)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Sophie D.", rating: 5, date: "March 2026", body: "She cooked us dinner like we were in Paris. The tarte tatin was perfect." },
      { author: "Alex M.", rating: 5, date: "February 2026", body: "Every plate landed at the right temperature, at the right time." },
    ],
  },
  {
    slug: "priya-varma",
    name: "Priya Varma",
    city: "Mumbai",
    cuisine: "Modern Indian",
    specialty: "Regional Indian tasting menus",
    headline: "Kerala, Kashmir, Bengal — the map of India in seven courses.",
    bio: "Priya cooks regional Indian food that isn't on any restaurant menu you've been to. Her tasting menus travel — one course from Kerala, one from Kashmir, one from her grandmother's kitchen in Kolkata.",
    portrait: IMG("photo-1580489944761-15a19d654956"),
    gallery: G(["photo-1585937421612-70a008356fbe","photo-1567337710282-00832b415979","photo-1476224203421-9ac39bcb3327"]),
    rating: 4.9, reviewCount: 112, startingPrice: 165,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment", "Specialty equipment required"],
    signatureDishes: [
      { name: "Meen moilee", note: "Kerala fish curry with coconut and curry leaf." },
      { name: "Rogan josh", note: "Slow-braised lamb, Kashmiri chilli." },
      { name: "Shorshe ilish", note: "Hilsa in mustard — her grandmother's recipe." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "The Map", courses: 7, price: 165, description: "Seven courses, seven regions. A tour without leaving your table.", inclusions: ["7 courses", "Chai service", "Full cleanup"] },
      { id: "p2", name: "The Feast", courses: 10, price: 240, description: "A larger menu for a larger table — the wedding-food version.", inclusions: ["10 courses", "Chai service", "Full cleanup"] },
    ],
    reviews: [
      { author: "Neha K.", rating: 5, date: "May 2026", body: "The best Indian food I've had at home, ever. And I'm Indian." },
      { author: "Chris T.", rating: 5, date: "April 2026", body: "Every course was a different story. Extraordinary." },
    ],
  },
  {
    slug: "noa-abadi",
    name: "Noa Abadi",
    city: "Tel Aviv",
    cuisine: "Modern Israeli",
    specialty: "Levantine mezze and slow-roasted lamb",
    headline: "The mezze table, the whole lamb, and a lot of good bread.",
    bio: "Noa's menus start with a mezze table — twelve small plates — and end with slow-roasted lamb. She bakes the bread that morning at home.",
    portrait: IMG("photo-1590650153855-d9e808231d41"),
    gallery: G(["photo-1504674900247-0877df9cc836","photo-1476224203421-9ac39bcb3327","photo-1467003909585-2f8a72700288"]),
    rating: 4.8, reviewCount: 54, startingPrice: 185,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "The mezze table", note: "Twelve small plates, all at once." },
      { name: "Slow-roasted lamb shoulder", note: "Eight hours, pomegranate, sumac." },
      { name: "Malabi with rosewater", note: "Cold, silky, finished with pistachio." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 1,
    packages: [
      { id: "p1", name: "Mezze & Lamb", courses: 5, price: 185, description: "Mezze, the lamb, dessert. A full evening.", inclusions: ["5 courses", "Fresh bread", "Full cleanup"] },
      { id: "p2", name: "The Long Table", courses: 8, price: 270, description: "For a bigger group. Everyone shares.", inclusions: ["8 courses", "Fresh bread", "Full cleanup"] },
    ],
    reviews: [
      { author: "Yael G.", rating: 5, date: "May 2026", body: "The bread alone was worth the booking." },
      { author: "Rachel L.", rating: 5, date: "February 2026", body: "She fed twelve of us and made it look easy." },
    ],
  },
  {
    slug: "sofia-lindqvist",
    name: "Sofia Lindqvist",
    city: "Stockholm",
    cuisine: "New Nordic",
    specialty: "Foraged, fermented, quiet",
    headline: "Foraged mushrooms, cured fish, and long Nordic evenings.",
    bio: "Sofia trained at Fäviken and now cooks privately in Stockholm. Her menus lean on what she can forage or ferment herself — pickled elderflower, cured trout, spruce-tip oil.",
    portrait: IMG("photo-1438761681033-6461ffad8d80"),
    gallery: G(["photo-1476224203421-9ac39bcb3327","photo-1467003909585-2f8a72700288","photo-1414235077428-338989a2e8c0"]),
    rating: 4.9, reviewCount: 47, startingPrice: 260,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment", "Specialty equipment required"],
    signatureDishes: [
      { name: "Cured trout, spruce oil", note: "House-cured, spruce foraged that week." },
      { name: "Wild mushroom broth", note: "Poured tableside." },
      { name: "Sea buckthorn sorbet", note: "Tart, cold, bright." },
    ],
    offersCustomMenu: false,
    leadTimeWeeks: 3,
    packages: [
      { id: "p1", name: "The Season", courses: 7, price: 260, description: "Seven courses of whatever the season allows.", inclusions: ["7 courses", "Non-alcoholic pairing", "Full cleanup"] },
      { id: "p2", name: "The Long Menu", courses: 11, price: 380, description: "Eleven courses. A slow, quiet evening.", inclusions: ["11 courses", "Wine pairing (4 glasses)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Erik N.", rating: 5, date: "April 2026", body: "The most quietly beautiful dinner we've ever had at home." },
      { author: "Maria S.", rating: 5, date: "January 2026", body: "Every course tasted like where we live. Extraordinary." },
    ],
  },
  {
    slug: "leon-park",
    name: "Leon Park",
    city: "Seoul",
    cuisine: "Modern Korean",
    specialty: "Banchan and live-fire barbecue",
    headline: "Twelve banchan, the grill on your table, and a lot of soju.",
    bio: "Leon cooked at a Seoul barbecue institution before going private. He brings a portable tabletop grill and works from your counter — twelve banchan, four cuts, a stew to finish.",
    portrait: IMG("photo-1621570074981-a1ea72cff2f1"),
    gallery: G(["photo-1467003909585-2f8a72700288","photo-1414235077428-338989a2e8c0","photo-1476224203421-9ac39bcb3327"]),
    rating: 4.8, reviewCount: 69, startingPrice: 195,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment", "Specialty equipment required"],
    signatureDishes: [
      { name: "The banchan table", note: "Twelve small dishes, all house-made." },
      { name: "Galbi", note: "Marinated 24 hours, grilled at the table." },
      { name: "Doenjang jjigae", note: "Soybean stew, finished at the counter." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "The Grill", courses: 5, price: 195, description: "Banchan, three cuts, a stew.", inclusions: ["5 courses", "Full cleanup"] },
      { id: "p2", name: "The Long Grill", courses: 8, price: 290, description: "Full banchan, five cuts, two stews, dessert.", inclusions: ["8 courses", "Soju pairing", "Full cleanup"] },
    ],
    reviews: [
      { author: "Ji-woo H.", rating: 5, date: "May 2026", body: "The banchan alone. I'd book him again just for that." },
      { author: "Mark P.", rating: 5, date: "March 2026", body: "Best Korean food I've eaten outside Seoul." },
    ],
  },
  {
    slug: "camila-rojas",
    name: "Camila Rojas",
    city: "Mexico City",
    cuisine: "Mexican",
    specialty: "Oaxacan moles and heirloom masa",
    headline: "Mole negro, blue-corn tortillas, and a lot of mezcal.",
    bio: "Camila works with a family in Oaxaca who mill her heirloom masa. Her mole negro takes two days to make and tastes like nothing else on the planet.",
    portrait: IMG("photo-1544005313-94ddf0286df2"),
    gallery: G(["photo-1504674900247-0877df9cc836","photo-1467003909585-2f8a72700288","photo-1476224203421-9ac39bcb3327"]),
    rating: 4.9, reviewCount: 82, startingPrice: 170,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "Mole negro", note: "Two-day mole from an Oaxacan family recipe." },
      { name: "Blue-corn tortillas", note: "Pressed and grilled at your counter." },
      { name: "Tres leches", note: "Soaked overnight." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "Oaxaca", courses: 5, price: 170, description: "Mole, tortillas, the works.", inclusions: ["5 courses", "Mezcal pairing notes", "Full cleanup"] },
      { id: "p2", name: "The Long Table", courses: 8, price: 250, description: "Bigger group, longer menu.", inclusions: ["8 courses", "Mezcal pairing (3 pours)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Lucia F.", rating: 5, date: "June 2026", body: "The mole. I have no other words. The mole." },
      { author: "David K.", rating: 5, date: "March 2026", body: "She pressed tortillas at our counter for an hour. Best night." },
    ],
  },
  {
    slug: "hana-yamamoto",
    name: "Hana Yamamoto",
    city: "Kyoto",
    cuisine: "Japanese",
    specialty: "Kaiseki",
    headline: "A seasonal kaiseki, cooked with quiet precision.",
    bio: "Hana trained in a Kyoto ryokan for twelve years before going private. Her kaiseki menus follow the traditional structure and shift with the season.",
    portrait: IMG("photo-1573496359142-b8d87734a5a2"),
    gallery: G(["photo-1580822184713-fc5400e7fe10","photo-1467003909585-2f8a72700288","photo-1476224203421-9ac39bcb3327"]),
    rating: 5.0, reviewCount: 38, startingPrice: 320,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment", "Dinnerware rental available"],
    signatureDishes: [
      { name: "Hassun", note: "The seasonal opener — eight small bites." },
      { name: "Shokuji", note: "Rice, miso, pickles — the quiet finale." },
      { name: "Matcha and wagashi", note: "Whisked at the table." },
    ],
    offersCustomMenu: false,
    leadTimeWeeks: 4,
    packages: [
      { id: "p1", name: "Kaiseki", courses: 9, price: 320, description: "Nine courses in the traditional kaiseki structure.", inclusions: ["9 courses", "Sake pairing (2 pours)", "Full cleanup"] },
      { id: "p2", name: "The Long Kaiseki", courses: 12, price: 460, description: "Twelve courses. A slow, formal evening.", inclusions: ["12 courses", "Sake pairing (4 pours)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Aki M.", rating: 5, date: "April 2026", body: "She turned our dining room into a ryokan for one evening." },
      { author: "Sarah W.", rating: 5, date: "February 2026", body: "Precise, quiet, extraordinary. Worth every dollar." },
    ],
  },
  {
    slug: "marco-defalco",
    name: "Marco De Falco",
    city: "Naples",
    cuisine: "Italian",
    specialty: "Neapolitan pizza and wood-fired everything",
    headline: "A portable wood oven on your terrace and a pizza that would make Naples proud.",
    bio: "Marco brings a portable wood-fired oven and works outside. Neapolitan pizza to order, wood-roasted vegetables, and a burrata course you'll ask him to repeat.",
    portrait: IMG("photo-1583394293214-28ded15ee548"),
    gallery: G(["photo-1513104890138-7c749659a591","photo-1476224203421-9ac39bcb3327","photo-1467003909585-2f8a72700288"]),
    rating: 4.8, reviewCount: 91, startingPrice: 150,
    equipmentRequirements: ["Outdoor cooking setup required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "Pizza Margherita DOP", note: "San Marzano, fior di latte, basil, 90 seconds in the oven." },
      { name: "Burrata with peach", note: "In season only." },
      { name: "Tiramisù", note: "Made the morning of." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 1,
    packages: [
      { id: "p1", name: "The Pizza Party", courses: 4, price: 150, description: "Antipasto, five pizzas to share, dessert.", inclusions: ["4 courses", "Portable wood oven", "Full cleanup"] },
      { id: "p2", name: "The Long Pizza Party", courses: 6, price: 220, description: "For a bigger group. Everyone eats until they can't.", inclusions: ["6 courses", "Portable wood oven", "Full cleanup"] },
    ],
    reviews: [
      { author: "Emma L.", rating: 5, date: "June 2026", body: "He built a fire on our terrace and fed twenty of us. The best summer night." },
      { author: "Tom S.", rating: 4, date: "May 2026", body: "The pizza was extraordinary. Would definitely book again." },
    ],
  },
  {
    slug: "yara-haddad",
    name: "Yara Haddad",
    city: "Beirut",
    cuisine: "Lebanese",
    specialty: "The full mezze evening",
    headline: "Twenty mezze, one long table, and the quiet magic of a Beirut evening.",
    bio: "Yara cooked in her mother's Beirut restaurant for fifteen years before going private. Her mezze table runs to twenty small plates and her bread is baked to order.",
    portrait: IMG("photo-1580489944761-15a19d654956"),
    gallery: G(["photo-1504674900247-0877df9cc836","photo-1467003909585-2f8a72700288","photo-1476224203421-9ac39bcb3327"]),
    rating: 4.9, reviewCount: 63, startingPrice: 175,
    equipmentRequirements: ["Standard home kitchen required", "Chef brings most equipment"],
    signatureDishes: [
      { name: "The mezze table", note: "Twenty small plates, all at once." },
      { name: "Kibbeh nayyeh", note: "Raw lamb, cracked wheat, mint." },
      { name: "Warbat with clotted cream", note: "Rosewater syrup, pistachio." },
    ],
    offersCustomMenu: true,
    leadTimeWeeks: 2,
    packages: [
      { id: "p1", name: "Beirut", courses: 5, price: 175, description: "Mezze, a main, dessert. A long, slow evening.", inclusions: ["5 courses", "Fresh bread", "Full cleanup"] },
      { id: "p2", name: "The Feast", courses: 8, price: 260, description: "The full Beirut wedding menu.", inclusions: ["8 courses", "Fresh bread", "Full cleanup"] },
    ],
    reviews: [
      { author: "Layla A.", rating: 5, date: "May 2026", body: "The bread. The kibbeh. The whole night." },
      { author: "Peter J.", rating: 5, date: "March 2026", body: "She turned our dining room into her mother's restaurant. Unforgettable." },
    ],
  },
];

export function getChef(slug: string) {
  return chefs.find((c) => c.slug === slug);
}

export const cuisines = Array.from(new Set(chefs.map((c) => c.cuisine))).sort();
export const cities = Array.from(new Set(chefs.map((c) => c.city))).sort();

export const occasions = [
  { id: "date-night", label: "A quiet date", blurb: "Just the two of you and the candles." },
  { id: "anniversary", label: "An anniversary", blurb: "The year, marked at your table." },
  { id: "birthday", label: "A birthday", blurb: "A milestone. A menu. A little more wine." },
  { id: "family-dinner", label: "The family table", blurb: "Everyone you love, in one room." },
  { id: "celebration", label: "Something to keep", blurb: "The kind of night worth remembering." },
  { id: "weeknight", label: "A weeknight, in", blurb: "No reason. Just a good one." },
] as const;

// Re-export so consumers can import the equipment vocabulary from a single place.
export { EQUIPMENT_REQUIREMENTS } from "./site-content";
export type { EquipmentRequirement } from "./site-content";
