"use client";

import Link from "next/link";
import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";

const IMG = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const upcoming = [
  { chef: "Elena Moretti", package: "The Roman Table", date: "Sat · Jul 18, 2026", time: "19:30", status: "Confirmed" },
];

const messages = [
  { from: "Elena Moretti", preview: "Any allergies I should note before I plan the antipasto?", at: "2h" },
  { from: "Love at First Sight", preview: "Your Jul 18 reservation is confirmed. Deposit hold placed.", at: "1d" },
];

export default function Dashboard() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1414235077428-338989a2e8c0", 2200)}
        badge="Your dashboard"
        headline={"Welcome back.\nHere is your\nEvening."}
        caption="This is a prototype dashboard. Sign-in, real bookings, and messaging come with the full build."
        height="compact"
      />

      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°01 · Upcoming</div>
              <h2 className="mt-8 text-stack">
                <span className="block">Your next</span>
                <span className="block text-cream/50">evening.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-6">
            {upcoming.map((u, i) => (
              <Reveal key={i} delay={i * 80}>
                <article className="rounded-[12px] border border-cream/15 p-6 md:p-8 bg-burgundy-deep/40">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                    <div className="min-w-0">
                      <div className="label text-cream/50">{u.status}</div>
                      <div className="mt-2 font-display font-bold text-xl md:text-2xl text-cream lowercase">{u.chef}</div>
                      <div className="mt-1 text-cream/70 text-[14px]">{u.package}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-cream/80">{u.date}</div>
                      <div className="font-mono text-[13px] text-cream/50">{u.time}</div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex h-10 items-center rounded-[10px] border border-cream/40 px-4 text-[11px] font-mono uppercase tracking-[0.14em] text-cream hover:bg-cream hover:text-burgundy transition-colors cursor-pointer">
                      Message chef
                    </button>
                    <button className="inline-flex h-10 items-center rounded-[10px] border border-cream/20 px-4 text-[11px] font-mono uppercase tracking-[0.14em] text-cream/70 hover:border-cream/50 transition-colors cursor-pointer">
                      View menu
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="burgundy-deep">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°02 · Messages</div>
              <h2 className="mt-8 text-stack">
                <span className="block">Recent</span>
                <span className="block text-cream/50">notes.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {messages.map((m, i) => (
                <li key={i} className="border-b border-cream/15 py-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4">
                  <span className="num shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-cream lowercase">{m.from}</div>
                    <div className="text-cream/70 text-[14px] truncate">{m.preview}</div>
                  </div>
                  <div className="shrink-0 text-[11px] font-mono uppercase tracking-[0.14em] text-cream/40">{m.at}</div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/chefs" className="inline-flex h-11 items-center rounded-[12px] border border-cream/40 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:bg-cream hover:text-burgundy transition-colors cursor-pointer">
                Book another chef
              </Link>
              <Link href="/journal" className="inline-flex h-11 items-center rounded-[12px] border border-cream/20 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70 hover:border-cream/50 transition-colors cursor-pointer">
                Read the journal
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
