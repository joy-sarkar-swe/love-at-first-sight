import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";
import Link from "next/link";

const IMG = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const timeline = [
  {
    n: "01",
    t: "A guest books you.",
    b: "The full package price is authorized on their card. You are notified immediately.",
  },
  {
    n: "02",
    t: "You accept the booking.",
    b: "The card is charged the 20% refundable deposit. It sits with the platform until the dinner.",
  },
  {
    n: "03",
    t: "The night arrives.",
    b: "You cook. The remaining balance is auto-collected 48 hours before the reservation.",
  },
  {
    n: "04",
    t: "Payout, within 48 hours.",
    b: "24 hours after the dinner ends, your 85% is released. Bank transfer arrives inside 48 hours.",
  },
];

export default function Payouts() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1519708227418-c8fd9a32b7a2", 2200)}
        badge='Payouts'
        headline={"You keep\n85%."}
        caption='Nothing hidden. No monthly fee. No per-message charge. Just a clean split on every booking.'
        height='compact'
      />

      <Section tone='paper'>
        <div className='grid gap-12 md:grid-cols-12 md:gap-x-16 items-center'>
          <div className='md:col-span-5'>
            <Reveal>
              <div className='label text-ink/60'>N°01 · The split</div>
              <h2 className='mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink'>
                <span className='block'>The chef,</span>
                <span className='block text-ink/50'>first.</span>
              </h2>
              <p className='mt-8 max-w-md text-[15px] leading-relaxed text-ink/70'>
                The 15% platform fee covers payment processing, guest support,
                insurance for the dinner, and the marketing that brings diners
                to your profile. There is nothing else.
              </p>
            </Reveal>
          </div>
          <div className='md:col-span-7'>
            <Reveal delay={120}>
              <div className='grid grid-cols-2 gap-6'>
                <div className='rounded-[12px] border border-ink/15 p-8 bg-cream-dark/40'>
                  <div className='label text-ink/50'>To the chef</div>
                  <div className='mt-3 font-display font-bold text-6xl text-ink tabular-nums leading-none'>
                    85%
                  </div>
                  <p className='mt-4 text-[13px] text-ink/70'>
                    Your take on every booking.
                  </p>
                </div>
                <div className='rounded-[12px] border border-ink/15 p-8'>
                  <div className='label text-ink/50'>To the platform</div>
                  <div className='mt-3 font-display font-bold text-6xl text-ink/60 tabular-nums leading-none'>
                    15%
                  </div>
                  <p className='mt-4 text-[13px] text-ink/70'>
                    Processing, insurance, marketing.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone='burgundy'>
        <div className='grid gap-12 md:grid-cols-12 md:gap-x-16 items-start'>
          <div className='md:col-span-4'>
            <Reveal>
              <div className='label'>N°02 · Timeline</div>
              <h2 className='mt-8 text-stack'>
                <span className='block'>From booking</span>
                <span className='block text-cream/50'>to bank.</span>
              </h2>
            </Reveal>
          </div>
          <div className='md:col-span-8'>
            <ul className='border-t border-cream/15'>
              {timeline.map((s, i) => (
                <Reveal key={s.n} delay={i * 60}>
                  <li className='border-b border-cream/15 py-10 grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline'>
                    <span className='num text-cream/50 shrink-0'>{s.n}</span>
                    <div className='min-w-0'>
                      <div className='font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-cream'>
                        {s.t}
                      </div>
                      <p className='mt-3 max-w-xl text-[15px] leading-relaxed text-cream/75'>
                        {s.b}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className='mt-16 flex flex-wrap gap-4'>
              <Link
                href='/for-chefs'
                className='inline-flex h-12 items-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy hover:bg-[#F0E8DE] transition-colors'>
                Apply to cook
              </Link>
              <Link
                href='/chef-handbook'
                className='inline-flex h-12 items-center rounded-[12px] border border-cream/40 px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:border-cream transition-colors'>
                Read the handbook
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
