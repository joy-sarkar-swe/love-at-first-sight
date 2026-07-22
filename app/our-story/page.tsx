import {
  CinematicHero,
  CircleButton,
  Reveal,
  Section,
} from "@/components/ui-lafs";
import { ABOUT_CONTENT } from "@/data/site-content";

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO = IMG("photo-1556909114-f6e7ad7d3136", 2200);
const FOUNDERS_PHOTO = IMG("photo-1522071820081-009f0129c71c", 1600);

export default function OurStoryPage() {
  const { heroBadge, heroHeadline, heroCaption, story, mission, vision, founders } = ABOUT_CONTENT;

  return (
    <>
      <CinematicHero
        image={HERO}
        badge={heroBadge}
        headline={heroHeadline}
        caption={heroCaption}
        height="compact"
      />

      {/* N°01 — The story */}
      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°01 · How it began</div>
              <h2 className="mt-8 font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(2rem,4.4vw,4.25rem)] text-cream">
                <span className="block">A shared</span>
                <span className="block text-cream/50">passion.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={100}>
              <div className="space-y-6 text-[16px] leading-[1.8] text-cream/80 max-w-xl">
                {story.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* N°02 — Mission & Vision */}
      <Section tone="burgundy-deep">
        <Reveal>
          <div className="label">N°02 · Mission & Vision</div>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={80}>
            <div className="border-t border-cream/15 pt-8">
              <div className="label text-cream/60">Mission</div>
              <p className="mt-6 font-display font-bold lowercase text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-[-0.02em] leading-[1.15] text-cream">
                {mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="border-t border-cream/15 pt-8">
              <div className="label text-cream/60">Vision</div>
              <p className="mt-6 font-display font-bold lowercase text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-[-0.02em] leading-[1.15] text-cream">
                {vision}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* N°03 — Meet the Founders */}
      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°03 · Meet the Founders</div>
              <h2 className="mt-8 font-display font-bold tracking-[-0.04em] leading-[0.9] text-[clamp(2rem,4.4vw,4.25rem)] text-cream">
                <span className="block">Jeremy</span>
                <span className="block text-cream/50">& Vanity.</span>
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-[1.75] text-cream/70">
                The husband-and-wife team behind Love at First Sight.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <div className="mb-8 overflow-hidden border border-cream/15 bg-cream/[0.04] aspect-[16/9]">
                <img
                  src={FOUNDERS_PHOTO}
                  alt="Jeremy and Vanity, founders of Love at First Sight"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              {founders.map((f, i) => (
                <Reveal key={f.name} delay={i * 100}>
                  <div className="border-t border-cream/15 pt-6">
                    <div className="font-display font-bold text-2xl lowercase tracking-[-0.02em] text-cream">
                      {f.name.toLowerCase()}
                    </div>
                    <div className="mt-2 label text-cream/60">{f.role}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="burgundy">
        <div className="text-center">
          <Reveal>
            <div className="label">— the founders</div>
            <h2 className="mt-8 text-stack max-w-3xl mx-auto">
              <span className="block">now, we'd love</span>
              <span className="block text-cream/50">to serve yours.</span>
            </h2>
            <div className="mt-14 flex justify-center">
              <CircleButton to="/chefs" size={172}>
                meet the chefs
              </CircleButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
