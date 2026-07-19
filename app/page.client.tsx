"use client";

import Link from "next/link";
import {
  ChefCard,
  CinematicHero,
  CircleButton,
  LightboxImage,
  Reveal,
  RevealImage,
  Section,
} from "@/components/ui-lafs";
import type { LightboxItem } from "@/components/ui-lafs";
import { chefs } from "@/data/chefs";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO_IMG = IMG("photo-1414235077428-338989a2e8c0", 2400);
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/4253680/4253680-hd_1920_1080_25fps.mp4";
const CTA_IMG = IMG("photo-1466978913421-dad2ebd01d17", 1400);
const STORY_A = IMG("photo-1476224203421-9ac39bcb3327", 1200);
const STORY_B = IMG("photo-1519708227418-c8fd9a32b7a2", 1200);
const STORY_C = IMG("photo-1481931098730-318b6f776db0", 1200);
const STORY_D = IMG("photo-1551218808-94e220e084d2", 1200);
const STORY_E = IMG("photo-1467003909585-2f8a72700288", 1200);

const testimonials = [
  {
    quote: "Elena rolled pasta on our counter while we drank the Barolo we'd been saving. The best night we've had at home in a decade.",
    name: "Priya & Marcus",
    role: "Tenth anniversary · Brooklyn",
    avatar: IMG("photo-1544005313-94ddf0286df2", 240),
  },
  {
    quote: "Between courses, nothing but candlelight and the sound of the fridge. It felt like being at a shrine we were somehow allowed inside.",
    name: "Anh N.",
    role: "Birthday · San Francisco",
    avatar: IMG("photo-1500648767791-00dcc994a43e", 240),
  },
  {
    quote: "She stayed at the table and told us the story of every dish. I don't think I've ever cried at a dinner before.",
    name: "Rachel P.",
    role: "Family dinner · London",
    avatar: IMG("photo-1531123897727-8f129e1688ce", 240),
  },
];

export default function Home() {
  const featured = chefs.slice(0, 3);

  const collage: LightboxItem[] = [
    { src: STORY_A, alt: "A chef plating at home", caption: "A chef plating at home" },
    { src: STORY_B, alt: "Wine and candlelight", caption: "Wine and candlelight" },
    { src: STORY_E, alt: "The table, set", caption: "The table, set" },
    { src: STORY_C, alt: "Fresh ingredients", caption: "Fresh ingredients" },
    { src: STORY_D, alt: "The evening begins", caption: "The evening begins" },
  ];
  const ctaGroup: LightboxItem[] = [
    { src: CTA_IMG, alt: "A room, waiting", caption: "A room, waiting" },
  ];

  return (
    <>
      <CinematicHero
        image={HERO_IMG}
        video={HERO_VIDEO}
        badge="Private Chefs for Unforgettable Moments"
        headline={"Book the chef.\nKeep the night."}
        caption="Browse vetted private chefs in your city. Book for a date night, an anniversary, a family dinner, or just a Tuesday that deserves more. They come to your kitchen with everything."
      >
        <CircleButton to="/chefs" icon="grid">Browse chefs</CircleButton>
        <CircleButton to="/how-it-works" variant="secondary" icon="play">How it works</CircleButton>
        <Link
          href="/dashboard"
          className="inline-flex h-[44px] items-center rounded-[16px] px-4 text-[13px] font-medium tracking-tight text-cream/85 hover:text-cream transition-colors underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </CinematicHero>

      <Section tone="burgundy">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal><div className="label">N°01 · What this is</div></Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={60}>
              <h2 className="text-stack">
                <span className="block">A marketplace</span>
                <span className="block">of private</span>
                <span className="block text-cream/55">chefs.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-10 max-w-lg text-[17px] leading-[1.7] text-cream/80">
                Love at First Sight connects you with private chefs in your city — browse by cuisine, occasion, or price. Pick the chef. Pick the night. They arrive at your door with everything.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <section className="bg-burgundy py-20 md:py-32 lg:py-40">
        <div className="container-page">
          <div className="mb-12 md:mb-16 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 md:gap-10">
            <Reveal><div className="label">N°02 · A night, in fragments</div></Reveal>
            <Reveal delay={80}><div className="num text-cream/50 shrink-0">Five moments</div></Reveal>
          </div>

          {/* Clean editorial grid: 2 cols on mobile, 12-col on desktop.
              Row 1: portrait + tall + portrait; Row 2: wide panorama + square. */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <RevealImage>
                <LightboxImage src={STORY_A} alt="Plating a course" group={collage} index={0} className="aspect-[4/5]" />
              </RevealImage>
              <FigCaption n="01" t="A chef plating at home" />
            </div>
            <div className="md:col-span-4">
              <RevealImage delay={80}>
                <LightboxImage src={STORY_B} alt="Poured wine" group={collage} index={1} className="aspect-[4/5]" />
              </RevealImage>
              <FigCaption n="02" t="Wine and candlelight" />
            </div>
            <div className="col-span-2 md:col-span-4">
              <RevealImage delay={160}>
                <LightboxImage src={STORY_C} alt="Candlelight" group={collage} index={3} className="aspect-[4/5]" />
              </RevealImage>
              <FigCaption n="04" t="Fresh ingredients" />
            </div>

            <div className="col-span-2 md:col-span-8">
              <RevealImage delay={220}>
                <LightboxImage src={STORY_E} alt="Table setting" group={collage} index={2} className="aspect-[16/10]" />
              </RevealImage>
              <FigCaption n="03" t="The table, set" />
            </div>
            <div className="col-span-2 md:col-span-4">
              <RevealImage delay={300}>
                <LightboxImage src={STORY_D} alt="Finale" group={collage} index={4} className="aspect-[4/5]" />
              </RevealImage>
              <FigCaption n="05" t="The evening begins" />
            </div>
          </div>
        </div>
      </section>

      <Section tone="burgundy-deep">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal><div className="label">N°03 · How it works</div></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 text-stack">
                <span className="block">Three</span>
                <span className="block text-cream/50">gentle steps.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {[
                { n: "01", t: "Choose your chef", b: "Filter by cuisine, city, price, or story. Read reviews. Meet them, on paper, before they meet you." },
                { n: "02", t: "Reserve the evening", b: "Pick a date, a menu, a party size. Pay through the platform — held in escrow until the dinner is done." },
                { n: "03", t: "Open the door", b: "They arrive with the knives, the pans, the plates. You keep the kitchen you own — and the best table in it." },
              ].map((s) => (
                <li key={s.n} className="border-b border-cream/15 py-10">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline">
                    <span className="num text-cream/50 shrink-0">{s.n}</span>
                    <div className="min-w-0">
                      <div className="font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-cream">{s.t}</div>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/70">{s.b}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°04 · Overheard</div>
              <h2 className="mt-8 text-stack">
                <span className="block">The morning</span>
                <span className="block text-cream/50">after.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-14">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-t border-cream/15 pt-8 md:gap-8">
                  <div className="num shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</div>
                  <div className="min-w-0">
                    <blockquote className="font-display font-bold text-[clamp(1.1rem,1.8vw,1.55rem)] leading-[1.3] tracking-[-0.02em] text-cream">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                      <img src={t.avatar} alt="" className="h-9 w-9 rounded-full object-cover shrink-0" loading="lazy" />
                      <div className="min-w-0 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70">
                        <span className="truncate block">{t.name} — {t.role}</span>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="burgundy">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] items-end gap-6 md:gap-10">
          <Reveal>
            <div>
              <div className="label">N°05 · The roster</div>
              <h2 className="mt-8 text-stack">
                <span className="block">Cooks worth</span>
                <span className="block text-cream/50">the wait.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="hidden md:block max-w-xs text-right">
              <p className="text-[14px] leading-relaxed text-cream/60">
                Every chef on the platform is vetted and approved. Browse the full roster or filter by cuisine.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24 grid gap-x-6 gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <ChefCard chef={c} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="burgundy-deep">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Reveal>
              <div className="label mb-8">N°06 · Reserve</div>
              <h2 className="text-stack">
                <span className="block">A table.</span>
                <span className="block">A chef.</span>
                <span className="block text-cream/50">An evening,</span>
                <span className="block text-cream/50">around you.</span>
              </h2>
              <p className="mt-10 max-w-md text-[15px] leading-[1.75] text-cream/70">
                It always starts with the chef — because that is who you are paying, and who is cooking, and whose hands will be in your kitchen. Choose them first.
              </p>
              <div className="mt-14 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-6 md:gap-8">
                <CircleButton to="/chefs" icon="grid">Browse chefs</CircleButton>
                <div className="min-w-0 text-[13px] text-cream/60 leading-relaxed max-w-[220px]">
                  <div className="label mb-2">Questions?</div>
                  <Link href="/faq" className="text-cream hover:text-cream/80 underline underline-offset-4 decoration-cream/30">
                    Visit our FAQ
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 mt-12 md:mt-0">
            <RevealImage>
              <div className="ml-auto max-w-sm">
                <LightboxImage
                  src={CTA_IMG}
                  alt="A room, waiting"
                  group={ctaGroup}
                  className="aspect-[3/4]"
                />
              </div>
            </RevealImage>
            <div className="mt-4 ml-auto max-w-sm grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/40">
              <span className="truncate">A room, waiting</span>
              <span className="shrink-0">—</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FigCaption({ n, t }: { n: string; t: string }) {
  return (
    <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/50">
      <span className="truncate">fig. {n}</span>
      <span className="shrink-0">{t}</span>
    </div>
  );
}
