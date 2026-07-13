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

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const chefs: Chef[] = [
  {
    slug: "elena-moretti",
    name: "Elena Moretti",
    city: "New York",
    cuisine: "Italian",
    specialty: "Handmade pasta",
    headline: "Pasta rolled at your counter. Barolo in the glass. Nothing in a hurry.",
    bio: "Elena learned to cook at her grandmother's marble table in Trastevere — the same marble, she'll tell you, that pasta has been rolled on since before her mother was born. Eight years in Roman kitchens sharpened the technique. What she brings to your evening is older and slower: flour on her hands, wine in yours, a night that ends when the last story does.",
    portrait: IMG("photo-1595273670150-bd0c3c392e46"),
    gallery: [IMG("photo-1551218808-94e220e084d2"), IMG("photo-1473093226795-af9932fe5856"), IMG("photo-1481931098730-318b6f776db0")],
    rating: 4.9,
    reviewCount: 128,
    startingPrice: 220,
    packages: [
      { id: "p1", name: "The Roman Table", courses: 4, price: 220, description: "An unhurried Roman evening. Antipasto, hand-rolled pasta, the secondo you'll remember, the dolce you'll ask her to write down.", inclusions: ["4 courses", "Wine pairing notes", "Full cleanup"] },
      { id: "p2", name: "For the One You Love", courses: 6, price: 340, description: "Six courses paced like a good conversation. Wine chosen to match the light.", inclusions: ["6 courses", "Wine pairing (3 glasses)", "Custom menu design", "Full cleanup"] },
    ],
    reviews: [
      { author: "Priya S.", rating: 5, date: "March 2026", body: "Our tenth anniversary. Elena made cacio e pepe on our counter while we drank the Barolo we'd been saving. The best night we've had at home in a decade." },
      { author: "Marcus L.", rating: 5, date: "February 2026", body: "We booked her again a month later. That's the whole review." },
    ],
  },
  {
    slug: "jules-tanaka",
    name: "Jules Tanaka",
    city: "San Francisco",
    cuisine: "Japanese",
    specialty: "Kaiseki",
    headline: "Kaiseki, in the language of your evening. Seasonal, exact, quiet.",
    bio: "Six years apprenticing in a two-star Kyoto kaiseki house taught Jules the discipline of restraint. He cooks the season the way it arrives — a single leaf, a broth clear enough to see the bottom of the bowl, a silence between courses that is not empty. Tell him the date. He'll tell you the plate.",
    portrait: IMG("photo-1577219491135-ce391730fb2c"),
    gallery: [IMG("photo-1553621042-f6e147245754"), IMG("photo-1546069901-ba9599a7e63c"), IMG("photo-1512058564366-18510be2db19")],
    rating: 4.9,
    reviewCount: 84,
    startingPrice: 285,
    packages: [
      { id: "p1", name: "The Season, Now", courses: 7, price: 285, description: "Seven courses that follow the calendar and refuse to hurry.", inclusions: ["7 courses", "Ceramic-ware setup", "Full cleanup"] },
      { id: "p2", name: "By Sake Light", courses: 8, price: 395, description: "Full kaiseki with four pours of premium sake. Bring quiet company.", inclusions: ["8 courses", "Sake flight (4 pours)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Anh N.", rating: 5, date: "April 2026", body: "Between courses, nothing but candlelight and the sound of the fridge. It felt like being at a shrine we were somehow allowed inside." },
      { author: "Ben K.", rating: 5, date: "March 2026", body: "The suimono alone was worth the evening." },
    ],
  },
  {
    slug: "amara-okafor",
    name: "Amara Okafor",
    city: "London",
    cuisine: "West African",
    specialty: "Modern Nigerian",
    headline: "The food she grew up on, plated like the love letter it always was.",
    bio: "Amara grew up in Lagos and trained in London. Her cooking sits between the two — suya char, palm-wine reductions, pepper soup thin enough to see the smoke through — brought to your table with the precision she learned in fine dining and the warmth she never left home without.",
    portrait: IMG("photo-1531123897727-8f129e1688ce"),
    gallery: [IMG("photo-1504674900247-0877df9cc836"), IMG("photo-1565299624946-b28f40a0ae38"), IMG("photo-1476224203421-9ac39bcb3327")],
    rating: 5.0,
    reviewCount: 62,
    startingPrice: 195,
    packages: [
      { id: "p1", name: "From Lagos, With Love", courses: 5, price: 195, description: "Five courses of modern Nigerian, arriving in warm ceramic and softer light.", inclusions: ["5 courses", "Palm-wine welcome", "Full cleanup"] },
      { id: "p2", name: "The Long Table", courses: 6, price: 260, description: "Family-style for four to eight. The room fills. The night doesn't end.", inclusions: ["Family-style service", "6 dishes", "Full cleanup"] },
    ],
    reviews: [
      { author: "Yemi A.", rating: 5, date: "May 2026", body: "The jollof made me call my mother." },
      { author: "Rachel P.", rating: 5, date: "April 2026", body: "She stayed at the table and told us the story of every dish. I don't think I've ever cried at a dinner before." },
    ],
  },
  {
    slug: "matteo-silva",
    name: "Matteo Silva",
    city: "Los Angeles",
    cuisine: "Coastal Peruvian",
    specialty: "Ceviche & fire",
    headline: "Fire, citrus, the Pacific. On the table before the light goes.",
    bio: "Matteo cooked at Central in Lima before he followed the coast north to Los Angeles. His dinners smell of woodsmoke ten minutes in — tiger's milk cutting through the char, pisco warming the stone fruit, the ocean somewhere in every plate.",
    portrait: IMG("photo-1560250097-0b93528c311a"),
    gallery: [IMG("photo-1414235077428-338989a2e8c0"), IMG("photo-1519708227418-c8fd9a32b7a2"), IMG("photo-1467003909585-2f8a72700288")],
    rating: 4.8,
    reviewCount: 91,
    startingPrice: 240,
    packages: [
      { id: "p1", name: "By the Coast", courses: 5, price: 240, description: "Five courses of the Peruvian shoreline. Bring an appetite and open windows.", inclusions: ["5 courses", "Pisco welcome cocktail", "Full cleanup"] },
    ],
    reviews: [
      { author: "Sara D.", rating: 5, date: "April 2026", body: "The ceviche. The smoke. The night. Three sentences is all it needs." },
    ],
  },
  {
    slug: "isabelle-laurent",
    name: "Isabelle Laurent",
    city: "Paris",
    cuisine: "French",
    specialty: "Bistrot moderne",
    headline: "The Paris bistrot dinner you keep almost booking. Now, at home.",
    bio: "Isabelle ran a candlelit bistrot in the 11th for ten years — the sort of place regulars kept to themselves. Her food is honest and buttered and quietly grand: leeks in vinaigrette, poulet rôti with the skin exactly right, a tarte tatin she will not stop making because she is not finished perfecting it.",
    portrait: IMG("photo-1607631568010-a87245c0daf8"),
    gallery: [IMG("photo-1414235077428-338989a2e8c0"), IMG("photo-1476224203421-9ac39bcb3327")],
    rating: 4.9,
    reviewCount: 74,
    startingPrice: 260,
    packages: [
      { id: "p1", name: "Bistrot, Slowly", courses: 4, price: 260, description: "Four courses. Good butter. A cheese board. Silence between bites.", inclusions: ["4 courses", "Cheese course", "Full cleanup"] },
    ],
    reviews: [
      { author: "David W.", rating: 5, date: "May 2026", body: "The tarte tatin has ruined every other tarte tatin for me, in the kindest possible way." },
    ],
  },
  {
    slug: "priya-varma",
    name: "Priya Varma",
    city: "Toronto",
    cuisine: "Modern Indian",
    specialty: "Regional tasting",
    headline: "Kerala to Kashmir in a single evening. She grinds the spices at your counter.",
    bio: "Priya's menus travel — Kerala to Kashmir, Goan seafood to Kashmiri lamb — inside one long unhurried dinner. She grinds her own spices in your kitchen and sings quietly while she cooks. You will notice the singing before you notice the food, and both will stay with you.",
    portrait: IMG("photo-1573496359142-b8d87734a5a2"),
    gallery: [IMG("photo-1567620905732-2d1ec7ab7445"), IMG("photo-1565299585323-38d6b0865b47")],
    rating: 4.9,
    reviewCount: 108,
    startingPrice: 210,
    packages: [
      { id: "p1", name: "The Long Journey", courses: 7, price: 210, description: "Seven courses across India. Chai to close. Do not plan anything after.", inclusions: ["7 courses", "Chai service", "Full cleanup"] },
    ],
    reviews: [
      { author: "Kavya M.", rating: 5, date: "March 2026", body: "The Kashmiri rogan josh brought my father to tears. He hasn't cried since 1998." },
    ],
  },
  {
    slug: "noa-abadi",
    name: "Noa Abadi",
    city: "Tel Aviv",
    cuisine: "Levantine",
    specialty: "Mezze & fire",
    headline: "Mezze that never ends, a table that gets louder, a night no one wants to close.",
    bio: "Noa cooked in Neve Tzedek before she left for Berlin, then came home. Her table is loud, generous, half-standing — labneh, charred eggplant, lamb over embers, and always one more bottle. She stays until the last guest is quiet enough to hear the candles.",
    portrait: IMG("photo-1583394293214-28ded15ee548"),
    gallery: [IMG("photo-1504674900247-0877df9cc836"), IMG("photo-1414235077428-338989a2e8c0")],
    rating: 4.9,
    reviewCount: 71,
    startingPrice: 205,
    packages: [
      { id: "p1", name: "The Long Mezze", courses: 12, price: 205, description: "A dozen small plates. Fire in the middle. Nothing arrives all at once.", inclusions: ["12 mezze", "Arak welcome", "Full cleanup"] },
    ],
    reviews: [
      { author: "Ari L.", rating: 5, date: "May 2026", body: "She fed twelve of us and remembered every name by the second course." },
    ],
  },
  {
    slug: "sofia-lindqvist",
    name: "Sofia Lindqvist",
    city: "Copenhagen",
    cuisine: "Nordic",
    specialty: "Foraged tasting",
    headline: "The forest, arranged. Twelve courses, each smaller and quieter than the last.",
    bio: "Sofia trained at a two-star Nordic house and spends her mornings walking. Her menus arrive like weather — beach mustard, sea buckthorn, aged butter on hot potato — and settle into your evening without asking permission.",
    portrait: IMG("photo-1580489944761-15a19d654956"),
    gallery: [IMG("photo-1467003909585-2f8a72700288"), IMG("photo-1495474472287-4d71bcdd2085")],
    rating: 5.0,
    reviewCount: 44,
    startingPrice: 310,
    packages: [
      { id: "p1", name: "By the Fjord", courses: 10, price: 310, description: "Ten small courses foraged the morning of. Bring nothing but appetite.", inclusions: ["10 courses", "Sea buckthorn welcome", "Full cleanup"] },
    ],
    reviews: [
      { author: "Mikko R.", rating: 5, date: "April 2026", body: "I ate a leaf and cried. That's the whole review." },
    ],
  },
  {
    slug: "leon-park",
    name: "Leon Park",
    city: "Seoul",
    cuisine: "Modern Korean",
    specialty: "Banchan tasting",
    headline: "Twenty small dishes, brought to your table one at a time, until the room slows.",
    bio: "Leon apprenticed under his grandmother, then in a fine-dining kitchen in Seongsu. He brings both — the discipline and the affection — into one long evening of banchan and something quiet grilling in the background.",
    portrait: IMG("photo-1507003211169-0a1dd7228f2d"),
    gallery: [IMG("photo-1553621042-f6e147245754"), IMG("photo-1512058564366-18510be2db19")],
    rating: 4.8,
    reviewCount: 96,
    startingPrice: 235,
    packages: [
      { id: "p1", name: "The Slow Table", courses: 20, price: 235, description: "Twenty small plates over three unhurried hours.", inclusions: ["20 banchan", "Soju flight", "Full cleanup"] },
    ],
    reviews: [
      { author: "Jinho C.", rating: 5, date: "March 2026", body: "The most food I have ever eaten, and I finished none of it hurried." },
    ],
  },
  {
    slug: "camila-rojas",
    name: "Camila Rojas",
    city: "Mexico City",
    cuisine: "Mexican",
    specialty: "Masa & mole",
    headline: "Masa ground on the metate at your counter. A mole that has been simmering for two days.",
    bio: "Camila trained under a Oaxacan master and moved to CDMX to run a kitchen of her own. She grinds her own masa. Her moles take two days. You will not eat a tortilla like hers again.",
    portrait: IMG("photo-1534528741775-53994a69daeb"),
    gallery: [IMG("photo-1565299624946-b28f40a0ae38"), IMG("photo-1414235077428-338989a2e8c0")],
    rating: 4.9,
    reviewCount: 118,
    startingPrice: 200,
    packages: [
      { id: "p1", name: "Oaxaca, Slowly", courses: 6, price: 200, description: "Six courses through Oaxacan mole. Mezcal welcome. No hurry.", inclusions: ["6 courses", "Mezcal flight", "Full cleanup"] },
    ],
    reviews: [
      { author: "Diana M.", rating: 5, date: "April 2026", body: "The mole negro tasted like a memory I didn't have yet." },
    ],
  },
  {
    slug: "hana-yamamoto",
    name: "Hana Yamamoto",
    city: "New York",
    cuisine: "Pastry",
    specialty: "Dessert-only evenings",
    headline: "A five-course dessert tasting. Chocolate, citrus, salt, and the last bite of the night.",
    bio: "Hana was the pastry chef at a Michelin restaurant for six years. Now she comes only for dessert — five courses, sweet and savoury and salt, ending with a chocolate that makes you close your eyes.",
    portrait: IMG("photo-1622021142947-da7dedc7c39a"),
    gallery: [IMG("photo-1551218808-94e220e084d2"), IMG("photo-1481931098730-318b6f776db0")],
    rating: 5.0,
    reviewCount: 39,
    startingPrice: 165,
    packages: [
      { id: "p1", name: "Only Dessert", courses: 5, price: 165, description: "Five dessert courses. Coffee and a digestif to close.", inclusions: ["5 courses", "Coffee service", "Full cleanup"] },
    ],
    reviews: [
      { author: "Naomi F.", rating: 5, date: "May 2026", body: "The salt chocolate ruined every other dessert for me. Kindly." },
    ],
  },
  {
    slug: "marco-defalco",
    name: "Marco DeFalco",
    city: "Austin",
    cuisine: "Fire / BBQ",
    specialty: "Live fire cooking",
    headline: "Fire in your backyard. Smoke through the windows. A dinner you smell before you sit down.",
    bio: "Marco ran a live-fire restaurant in Austin for eight years. Now he brings the fire to you — a portable rig, hardwood, and everything cooked in front of your guests. Bring an outdoor space.",
    portrait: IMG("photo-1472099645785-5658abf4ff4e"),
    gallery: [IMG("photo-1414235077428-338989a2e8c0"), IMG("photo-1519708227418-c8fd9a32b7a2")],
    rating: 4.8,
    reviewCount: 82,
    startingPrice: 275,
    packages: [
      { id: "p1", name: "By the Fire", courses: 6, price: 275, description: "Six courses cooked over hardwood, in front of your guests.", inclusions: ["6 courses", "Cocktail welcome", "Full cleanup"] },
    ],
    reviews: [
      { author: "Ryan S.", rating: 5, date: "April 2026", body: "The neighbors came by. He fed them too. That's who he is." },
    ],
  },
  {
    slug: "yara-haddad",
    name: "Yara Haddad",
    city: "London",
    cuisine: "Vegan",
    specialty: "Plant-forward tasting",
    headline: "A plant tasting that will change your mind about plants, and possibly about tasting.",
    bio: "Yara cooked at a plant-forward restaurant in Copenhagen and now brings a similar precision to homes in London. Nothing preachy. Nothing bland. Just cooking, done seriously, with vegetables you did not know were possible.",
    portrait: IMG("photo-1544005313-94ddf0286df2"),
    gallery: [IMG("photo-1467003909585-2f8a72700288"), IMG("photo-1495474472287-4d71bcdd2085")],
    rating: 4.9,
    reviewCount: 58,
    startingPrice: 190,
    packages: [
      { id: "p1", name: "The Green Room", courses: 7, price: 190, description: "Seven plant courses, natural wine pairing available.", inclusions: ["7 courses", "Natural wine (opt.)", "Full cleanup"] },
    ],
    reviews: [
      { author: "Dev R.", rating: 5, date: "May 2026", body: "I forgot there was no meat until my husband pointed it out at course six." },
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
