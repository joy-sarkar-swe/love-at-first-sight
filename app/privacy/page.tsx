"use client";

import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sections = [
  { n: "01", t: "what we collect", body: "Your name, email, address (only so the chef can arrive), phone number, and payment details. We do not sell or share any of it — not to advertisers, not to anyone." },
  { n: "02", t: "how we use it", body: "To confirm your booking, route your chef, process payment, and — with your permission — write to you very occasionally about new chefs. Nothing else." },
  { n: "03", t: "cookies", body: "A small handful, only for essential site function. We do not track you around the web." },
  { n: "04", t: "your rights", body: "Write to hello@loveatfirstsight.co and we'll remove or export everything we hold about you. Usually within a day." },
];

export default function Privacy() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1519708227418-c8fd9a32b7a2")}
        badge="Legal · Last updated July 2026"
        headline={"how we hold\nyour details."}
        caption="Briefly, gently, and never for sale."
        height="compact"
      />

      <Section tone="burgundy">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="space-y-10 leading-relaxed text-cream/80">
              {sections.map((s) => (
                <section key={s.n} className="border-t border-cream/15 pt-8">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6">
                    <span className="num shrink-0 pt-1">{s.n}</span>
                    <div className="min-w-0">
                      <h2 className="font-display font-bold text-xl md:text-2xl lowercase tracking-[-0.02em] text-cream">{s.t}</h2>
                      <p className="mt-4 text-[16px] leading-[1.75]">{s.body}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
