"use client";

import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sections = [
  { n: "01", t: "full refund window", body: "Cancel up to 14 days before your dinner for a full refund. No questions asked, no long form to fill out." },
  { n: "02", t: "partial refund", body: "Between 14 and 7 days before your booking, 50% of the fee is refunded. This covers the chef's shopping, planning, and prep — the work that has already begun." },
  { n: "03", t: "inside seven days", body: "Bookings cancelled within 7 days are non-refundable — the chef has already committed the evening to you. If something exceptional has happened, write to us. We'll do what we can." },
  { n: "04", t: "rescheduling", body: "One free reschedule with at least 7 days' notice, subject to the chef's availability. Life moves; we try to move with it." },
];

export default function Returns() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1481931098730-318b6f776db0")}
        badge="Legal · Last updated July 2026"
        headline={"sometimes\nthe evening\nchanges."}
        caption="Here is how we hold it — gently, and by the calendar."
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
