"use client";

import {
  CinematicHero,
  CircleButton,
  Reveal,
  RevealImage,
  Section,
} from "@/components/ui-lafs";

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO = IMG("photo-1556909114-f6e7ad7d3136", 2200);

const beats = [
  {
    n: "01",
    label: "how it began",
    title: ["it started", "with a", "dinner."],
    body: [
      "We met over a home-cooked meal. That dinner changed everything — not just for us, but for how we thought about food, connection, and the moments that matter most.",
      "We kept cooking for friends, for family, for every occasion we could find. And we realized: everyone deserves an evening like that. Not everyone has the chef.",
    ],
    image: IMG("photo-1466637574441-749b8f19452f"),
  },
  {
    n: "02",
    label: "what we believe",
    title: ["the best table", "is yours."],
    body: [
      "Restaurants are wonderful. But there's something different about your own table — the lighting you chose, the music you picked, the people you invited.",
      "Love at First Sight brings the chef to that table. We built a platform where talented private chefs can share their craft, and guests can find exactly the right person for their evening.",
    ],
    image: IMG("photo-1504754524776-8f4f37790ca0"),
  },
  {
    n: "03",
    label: "the promise",
    title: ["a marketplace", "built on trust."],
    body: [
      "Every chef on Love at First Sight is vetted before they go live. Every booking is protected through the platform. Every review comes from a real guest after a real dinner.",
      "We handle the technology so chefs can focus on cooking and guests can focus on the evening.",
    ],
    image: IMG("photo-1495474472287-4d71bcdd2085"),
  },
];

export default function OurStory() {
  return (
    <>
      <CinematicHero
        image={HERO}
        badge="Our Story · Est. 2026"
        headline={"A love story\nThat became\nA table."}
        caption="Two cooks. A decade of borrowed kitchens. A black book of chefs we could not keep to ourselves."
        height="compact"
      />

      {beats.map((b, i) => (
        <Section key={b.n} tone={i % 2 === 0 ? "burgundy" : "burgundy-deep"}>
          <div className="grid gap-12 grid-cols-1 lg:grid-cols-12 lg:gap-x-16 items-start">
            <div className="col-span-1 lg:col-span-6">
              <Reveal>
                <div className="label">{b.n} · {b.label}</div>
                <h2 className="mt-8 font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(2rem,4.4vw,4.25rem)]">
                  {b.title.map((line, k) => (
                    <span key={k} className="block">{line}</span>
                  ))}
                </h2>
              </Reveal>
            </div>
            <div className="col-span-1 lg:col-span-3 lg:col-start-7">
              <Reveal delay={100}>
                <div className="space-y-6 text-[16px] leading-[1.75] text-cream/80 max-w-lg">
                  {b.body.map((p, k) => (<p key={k}>{p}</p>))}
                </div>
              </Reveal>
            </div>
            <div className="col-span-1 lg:col-span-3 lg:col-start-10 mt-6 lg:mt-0">
              <RevealImage delay={180}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={b.image} alt="" className="h-full w-full object-cover" />
                </div>
              </RevealImage>
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/40">
                <span className="truncate">fig. {b.n}</span>
                <span className="shrink-0">—</span>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="burgundy">
        <div className="text-center">
          <Reveal>
            <div className="label">— the founders</div>
            <h2 className="mt-8 text-stack max-w-3xl mx-auto">
              <span className="block">now, we'd love</span>
              <span className="block text-cream/50">to serve yours.</span>
            </h2>
            <div className="mt-14 flex justify-center">
              <CircleButton to="/chefs" size={172}>meet the chefs</CircleButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
