"use client";

import Link from "next/link";
import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";

const IMG = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const chapters = [
  {
    n: "01",
    t: "Your profile is your restaurant.",
    b: "You bring the photographs, the menu language, and the story. We bring guests who already read carefully. A short, honest profile outperforms a long, salesy one — every week, without fail.",
  },
  {
    n: "02",
    t: "Pricing is yours to set.",
    b: "You publish packages with your own prices. We recommend three tiers — an approachable one, a signature one, and a special-occasion one. Raise them as your reviews build.",
  },
  {
    n: "03",
    t: "Bookings arrive in your inbox.",
    b: "Every request comes with the guest's occasion, party size, dietary notes, and preferred date. You have 24 hours to accept, propose an alternative, or gracefully decline.",
  },
  {
    n: "04",
    t: "Messages stay on-platform.",
    b: "All guest communication happens inside your dashboard — for their safety and yours. Ingredient allergies, arrival directions, kitchen quirks, all in one thread.",
  },
  {
    n: "05",
    t: "You keep 85% of every booking.",
    b: "The platform's 15% covers payment processing, guest support, insurance, and the marketing that finds diners who value your work. See the Payouts page for the exact schedule.",
  },
  {
    n: "06",
    t: "Reviews are earned, not solicited.",
    b: "We automatically invite guests to review 24 hours after the dinner. You cannot edit them; you can respond publicly to any of them, once.",
  },
  {
    n: "07",
    t: "The guest count is the guest count.",
    b: "Bring exactly what was booked. If a guest wants to add a plus-one, they add it in the app before the day — the price and prep update automatically.",
  },
  {
    n: "08",
    t: "Cancellations, plainly.",
    b: "Guests can cancel free of charge up to 72 hours before. Inside 72 hours, they lose their deposit. Inside 24 hours, the full amount is due — to you. We do not negotiate these on either side.",
  },
];

export default function Handbook() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1466637574441-749b8f19452f", 2200)}
        badge="For our chefs"
        headline={"The chef\nhandbook."}
        caption="How the platform works from your side of the stove. Eight short chapters. Nothing hidden."
        height="compact"
      />

      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°01 · The house rules</div>
              <h2 className="mt-8 text-stack">
                <span className="block">Plainly</span>
                <span className="block text-cream/50">written.</span>
              </h2>
              <p className="mt-8 text-cream/70 text-[15px] leading-relaxed max-w-sm">
                We keep the platform small on purpose. Fewer chefs, better matches, quieter kitchens.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {chapters.map((c, i) => (
                <Reveal key={c.n} delay={i * 60}>
                  <li className="border-b border-cream/15 py-10">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline">
                      <span className="num text-cream/50 shrink-0">{c.n}</span>
                      <div className="min-w-0">
                        <div className="font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-cream">{c.t}</div>
                        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-cream/75">{c.b}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-16 flex flex-wrap gap-4">
              <Link href="/for-chefs" className="inline-flex h-12 items-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy hover:bg-[#F0E8DE] transition-colors">
                Apply to cook
              </Link>
              <Link href="/payouts" className="inline-flex h-12 items-center rounded-[12px] border border-cream/40 px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:border-cream transition-colors">
                See payouts
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
