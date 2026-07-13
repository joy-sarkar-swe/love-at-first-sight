export type Post = {
  slug: string;
  n: string;
  kicker: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  read: string;
  date: string;
  category: "First dates" | "Anniversaries" | "Proposals" | "Everyday" | "Letters";
};

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const posts: Post[] = [
  {
    slug: "the-menu-you-cook-when-you-are-frightened",
    n: "01", kicker: "On first dates", category: "First dates",
    title: "The menu you cook when you are frightened.",
    excerpt: "Something simple, something with your hands in it, something that leaves room for the conversation to be the main course.",
    body: [
      "First dates are not about the food. They are about the room the food leaves for you to actually see each other. This is the single hardest thing to remember when you are trying to impress someone: the meal is not the point. The meal is the excuse for the two of you to sit down and let something else happen.",
      "Cook something you have made a hundred times. Something your hands can do without you. That way, when they arrive, you are already fully in the room — not hidden behind the stove, pretending to check on a sauce so you can catch your breath. A roast chicken. A good pasta. A stew you started that morning. Anything that survives being talked over.",
      "Set the table before they arrive. All of it. Cutlery, glasses, water, the little bowl for olive pits. If the table is already set, you cannot use it as an anxious errand mid-conversation. The table becomes a place you can lean into, not a task you are managing.",
      "Light one candle. Not three. Three candles feel like a séance. One candle feels like a decision you made because you wanted to.",
      "And when the food comes, put the serving dish on the table between you. Family style. The reaching, the passing — it does more work than you think. It builds the shape of a shared evening in the first thirty seconds.",
      "This is what a first date at home is for: to give you both a set of small honest gestures — pass the salt, pour the wine, tear the bread — that a restaurant, for all its virtues, will not.",
    ],
    image: IMG("photo-1466637574441-749b8f19452f", 1400),
    read: "6 min", date: "Jun 04, 2026",
  },
  {
    slug: "how-to-mark-a-year-without-saying-a-word",
    n: "02", kicker: "On anniversaries", category: "Anniversaries",
    title: "How to mark a year without saying a word about it.",
    excerpt: "Light the candles you never light. Bring back the wine from the trip you took. Let the plate tell the calendar what it means.",
    body: [
      "The best anniversaries are the ones that don't announce themselves. No speech. No toast. Just a table that has been thought about, and someone across it who eventually looks up and understands, without a word, exactly what tonight is.",
      "Start with the bottle. Every couple that has lasted a year has, somewhere, a bottle they did not drink — from the honeymoon, from the first weekend away, from the New Year's Eve nobody remembers. Bring it out. Do not explain.",
      "Then the dish. Cook the thing you cooked the first time you cooked together — even if it is spaghetti, even if it is bad. The plate is not there to impress. It is there to time-travel.",
      "The candle. The one you only ever light for each other. If you don't have one yet, start one tonight. Anniversaries need artifacts.",
      "Let the plate tell the calendar what it means. They will notice. And if they don't, that is fine too — the noticing is not the point. The doing is.",
    ],
    image: IMG("photo-1519708227418-c8fd9a32b7a2", 1400),
    read: "8 min", date: "May 22, 2026",
  },
  {
    slug: "we-asked-six-chefs-how-they-would-propose",
    n: "03", kicker: "On proposals", category: "Proposals",
    title: "We asked six chefs how they would propose over dinner.",
    excerpt: "None of them said between courses. All of them said before dessert. Two of them cried while telling us.",
    body: [
      "We put the same question to six chefs on the platform: if you were going to propose over one of your own dinners, when would you do it?",
      "Every one of them said before dessert. The reasoning was uncannily similar — dessert should be the celebration, not the reveal. If they say yes, dessert becomes an accidental wedding cake. If they say no, dessert is the softest possible landing.",
      "Elena Moretti said she'd hide the ring in the folded napkin. 'Not the food,' she added, laughing. 'Never the food. Someone will die.'",
      "Jules Tanaka would time it to the sixth course, the one he calls 'the pause course' — a small clear broth, one leaf, silence. 'The room is already listening. You don't have to raise your voice.'",
      "Amara Okafor said she would do it during the pouring of the second glass of wine. 'You are already looking at each other. There's no better light.'",
      "Matteo Silva said outside, in front of the fire. Isabelle Laurent said between the cheese and the tarte tatin — 'because the tarte tatin is what they'll remember, and you want the yes to be older than the dessert.'",
      "Two of them cried while telling us. We think you should trust their instincts.",
    ],
    image: IMG("photo-1414235077428-338989a2e8c0", 1400),
    read: "11 min", date: "May 10, 2026",
  },
  {
    slug: "the-case-for-a-chef-on-a-random-tuesday",
    n: "04", kicker: "On tuesdays", category: "Everyday",
    title: "The case for a chef on a random Tuesday.",
    excerpt: "The most romantic thing you can do is refuse the idea that romance requires an occasion.",
    body: [
      "Everyone books a chef for the anniversary. For the birthday. For the proposal. Fewer people book one for a Tuesday.",
      "But Tuesdays are where the marriage actually lives. Saturdays are performances. Tuesdays are the truth. That is the night worth surprising.",
      "Here is what happens: at 6:47pm on an unremarkable Tuesday, they come home tired, half a work email still open in their head. Someone is already in the kitchen. The music is on. Something is roasting. There is a glass of wine on the counter for them, poured five minutes ago so it is at the right temperature.",
      "They will not stop being tired. They will not immediately relax. It takes ten minutes. Twelve. And then, somewhere between the first bite and the second glass, they will remember that this — being fed, being paid attention to, being handed a Tuesday like a gift — is a shape love can take.",
      "Try it once. Watch what happens to a week when Wednesday morning starts with the memory of a Tuesday you didn't have to cook.",
    ],
    image: IMG("photo-1467003909585-2f8a72700288", 1400),
    read: "5 min", date: "Apr 28, 2026",
  },
  {
    slug: "cooking-for-someone-who-is-very-sad",
    n: "05", kicker: "On grief", category: "Letters",
    title: "Cooking for someone who is very sad.",
    excerpt: "Warm bread. A stew. A room quiet enough for them to eat without performing.",
    body: [
      "There is a kind of dinner that has no purpose except to be there. To feed someone who has forgotten to eat because grief is loud and food is quiet.",
      "Do not cook anything ambitious. Ambitious food asks to be discussed. A grieving person cannot discuss food. They cannot discuss anything. Cook something they don't have to think about — something they can eat with a spoon, one-handed, while looking somewhere else.",
      "Warm bread. Salted butter. A stew that has been on the stove long enough to smell like a childhood, not necessarily their own. A room where they don't have to perform being fine, or being sad, or being anything.",
      "Sit with them. Do not fill the silence. The food is already filling it. Grief is a room that gets smaller when you try to explain it and larger when you sit still inside it.",
      "You don't need to say much. The food is saying it. Salt. Fat. Warmth. Presence. This is the oldest language we have.",
    ],
    image: IMG("photo-1481931098730-318b6f776db0", 1400),
    read: "7 min", date: "Apr 12, 2026",
  },
  {
    slug: "the-private-dinner-that-saved-our-marriage",
    n: "06", kicker: "On staying in", category: "Letters",
    title: "The private dinner that saved our marriage.",
    excerpt: "A reader wrote in. We asked her permission. This is her letter, unedited.",
    body: [
      "A reader wrote in about a booking she made after a year of small distances. She and her husband hadn't fought — that was the strange part. They had just stopped meeting each other in the room. Two people cohabiting a life, sharing a mortgage, raising two children, running out the clock on the version of them that used to touch each other's forearms mid-sentence.",
      "She booked a chef for a Sunday night. Nothing to prepare. Nothing to clean. She didn't tell him. Just a stranger in their kitchen at 6pm and a table with two chairs, set with the plates they'd received as a wedding gift a decade earlier and had never once used.",
      "'He came home,' she wrote, 'and stood in the doorway of the kitchen for a very long time. Not saying anything. Just watching a woman he'd never met slice an onion in his house. And then he laughed. Like he had forgotten how.'",
      "'He looked at me across the salad course,' she wrote, 'and I remembered why I married him. Not what I loved about him — I have never forgotten that. But why. Which is different, and rarer, and easier to lose.'",
      "'We didn't fix anything that night,' she added, at the end. 'We just remembered that we could still be surprised by each other. That was enough. That was almost everything.'",
      "We asked her permission to print this. She said yes. She asked us to keep her name out.",
    ],
    image: IMG("photo-1476224203421-9ac39bcb3327", 1400),
    read: "9 min", date: "Mar 30, 2026",
  },
  {
    slug: "on-the-first-course",
    n: "07", kicker: "On beginnings", category: "First dates",
    title: "On the first course, and what it is really for.",
    excerpt: "The first course is not there to feed you. It is there to give your hands something to do while you decide whether this is going to work.",
    body: [
      "The first course is not, and has never been, about the food. It is a diplomatic device. A small edible object designed to sit between two people who are not yet quite sure what to do with each other.",
      "This is why the great first courses of the world are all — without exception — the sort of things you eat slowly, in small pieces, without a great deal of concentration. A few olives. A single oyster. A slice of prosciutto folded like a letter. A spoon of soup.",
      "Nothing that requires a knife. Nothing that requires a decision. Nothing you have to compliment.",
      "The first course is a place to put your hands while your eyes do the harder work.",
    ],
    image: IMG("photo-1551218808-94e220e084d2", 1400),
    read: "4 min", date: "Jun 12, 2026",
  },
  {
    slug: "the-second-glass-of-wine",
    n: "08", kicker: "On timing", category: "Everyday",
    title: "The second glass of wine.",
    excerpt: "The first glass is politeness. The second glass is intimacy. Almost every good conversation of your life has happened in the second glass.",
    body: [
      "The first glass of wine is politeness. It is the glass you pour because the bottle is open and it would be rude not to.",
      "The second glass is intimacy. It is where the room finally softens. Almost every good conversation of your life — the honest one, the accidental one, the one you were not planning to have — happened in the second glass.",
      "This is why every chef who cooks for two knows, in their bones, to pace the meal so that the second glass arrives just after the main course begins. Not the appetizer. Not the dessert. The middle. When the shoulders have dropped and the phones have gone dark and the candle has burned down half an inch.",
      "Book the chef. Let them worry about the timing. All you have to do is show up, and stay for the second glass.",
    ],
    image: IMG("photo-1553621042-f6e147245754", 1400),
    read: "5 min", date: "Jun 20, 2026",
  },
  {
    slug: "why-we-eat-at-home",
    n: "09", kicker: "On staying in", category: "Everyday",
    title: "Why we eat at home, when we can afford not to.",
    excerpt: "Restaurants are for performance. Your kitchen is for confession. A private chef closes the distance between the two.",
    body: [
      "Restaurants are for performance. You dress differently, you speak differently, you order the wine you would not have ordered at home. That is the whole appeal — you get to be, for two hours, a slightly more elegant version of yourself.",
      "Your kitchen is for confession. It is where you stand in socks and eat off the counter and say the sentence you were not planning to say. It is where the actual conversations of your life happen.",
      "A private chef closes the distance between the two. The food is restaurant-grade. The room is yours. The candle is the one you already like. The music is the record you were listening to that morning. and when the last plate is cleared, nobody puts on their coat. You are already home.",
      "This, we think, is the quiet argument for the whole thing.",
    ],
    image: IMG("photo-1414235077428-338989a2e8c0", 1400),
    read: "6 min", date: "Jul 02, 2026",
  },
  {
    slug: "twelve-anniversary-menus",
    n: "10", kicker: "On anniversaries", category: "Anniversaries",
    title: "Twelve menus for twelve anniversaries.",
    excerpt: "A menu for each year of a marriage — from the first, when you're still nervous, to the twelfth, when you're finally not.",
    body: [
      "Year one is nervous. Cook something you're both proud you can pull off. A whole roast fish. A pasta neither of you has ever made. Something that could go wrong and doesn't.",
      "Year two is the first repeat. Cook exactly what you cooked last year. Do not tell them until they take the first bite.",
      "Year three is a risk. Try something neither of you has ever tasted. Fail cheerfully.",
      "Year four is a return to the classic. Roast chicken. Good bread. Green salad. Trust it.",
      "Year five is a show. Book a chef. Sit down. Be cooked for. You have earned it.",
      "Year seven is the quiet one. The whole year has been about work and children and mortgages. Make something soft — a soup, a stew, a bowl. Eat it in candlelight and go to bed early.",
      "Year ten is the marker. Fly somewhere or cook somewhere new. Pick a menu that will become 'the ten-year meal' — the one you will cook again for year twenty, and thirty.",
      "Year twelve is when you finally stop performing. Cook what you cook on Tuesdays. Pretend the calendar means nothing. That is when you'll know.",
    ],
    image: IMG("photo-1519708227418-c8fd9a32b7a2", 1400),
    read: "10 min", date: "Jul 10, 2026",
  },
  {
    slug: "the-proposal-that-almost-was-not",
    n: "11", kicker: "On proposals", category: "Proposals",
    title: "The proposal that almost was not.",
    excerpt: "A reader nearly cancelled the booking three times. Then his chef sat him down in the kitchen and gave him a small, unforgettable piece of advice.",
    body: [
      "A reader wrote to us three days after his engagement. He had come very close, three times, to cancelling the entire booking.",
      "'The first time,' he wrote, 'I convinced myself the whole thing was too staged. That she would see through it. That the food would arrive and she would already know.'",
      "'The second time, I convinced myself she would say no. That I was choosing the wrong night. That I should wait until I was more sure — sure of what, exactly, I couldn't tell you.'",
      "'The third time, an hour before the chef arrived, I called her to cancel. She didn't pick up. I set the table anyway.'",
      "The chef arrived, saw his face, sat him down on a stool in the kitchen and said — as she was unpacking the ingredients — 'You are not proposing to her tonight. You proposed to her a long time ago, in a hundred small ways. Tonight you are just telling her that you know.'",
      "'And then she went back to slicing shallots,' he wrote. 'And I stopped shaking.'",
    ],
    image: IMG("photo-1414235077428-338989a2e8c0", 1400),
    read: "8 min", date: "Jun 28, 2026",
  },
  {
    slug: "letters-from-the-kitchen",
    n: "12", kicker: "On letters", category: "Letters",
    title: "Letters from the kitchen: three chefs on the guests they remember.",
    excerpt: "We asked three chefs to write about a single evening that stayed with them. They wrote longer than we expected.",
    body: [
      "We asked three chefs on the platform to write us a short paragraph about a single guest they still think about. All three wrote considerably more than we asked for. We have edited nothing.",
      "Isabelle: 'A widower, seventy-one, booked me for a Wednesday dinner for one. He had bought his wife the same meal at the same bistrot in Paris every year on the same date. He wanted to eat it once more, at home, and did not want to sit alone in a restaurant. I cooked the meal exactly as I could remember it from the years I had worked there. He ate every bite. At the end he put his hand on my arm and said thank you and I could not speak. I don't cry in kitchens. That night I cried on the way home.'",
      "Matteo: 'Two women. A first anniversary. They had cooked their first meal together on a camp stove on a beach in Peru. They told me the story with the second glass. I made ceviche. We ate outside. They kissed at the end of the meal like it was the first time.'",
      "Amara: 'A family of six. Grandparents, parents, two children under ten. The grandmother had grown up in Lagos and had not eaten proper jollof rice in forty years. Everyone at the table watched her take the first bite. She did not cry. She just closed her eyes. Then she opened them and told us a story about her mother that her own children had never heard. I have cooked a thousand dinners. That is the one I remember.'",
    ],
    image: IMG("photo-1481931098730-318b6f776db0", 1400),
    read: "12 min", date: "May 30, 2026",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return [];
  const sameCat = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const others = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
}

export const categories = ["All", "First dates", "Anniversaries", "Proposals", "Everyday", "Letters"] as const;
