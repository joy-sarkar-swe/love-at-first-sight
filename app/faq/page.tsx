import { Accordion, CinematicHero, Reveal, Section } from "@/components/ui-lafs";
import { CHEF_FAQ } from "@/data/site-content";
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'FAQ — Love at First Sight', description: 'Frequently asked questions about booking a private chef.' };

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const items = [
  { q: "how does booking work?", a: "Choose the shape of the evening, pick a chef whose story catches you, choose a menu, and lock in a date. Payment is taken at booking; you'll get a confirmation and the chef's direct contact." },
  { q: "how far ahead should i book?", a: "For weekends, two or three weeks is comfortable. For weeknights, a few days is often enough. For anniversaries and holidays, as far out as you can — the best chefs fill their calendars quickly." },
  { q: "what's included?", a: "The grocery shopping, the cooking, the plating, the service, and the full kitchen cleanup. All you supply is the kitchen and the guests." },
  { q: "what if my kitchen needs extra equipment?", a: "If your chef needs anything beyond a standard home kitchen — rented dinnerware, a portable burner, an outdoor grill, specialty gear — they'll itemise it in their reply with a clear price. Nothing is charged upfront. You review the quote, approve it in your dashboard, and the setup fee is added to a single final invoice paid at confirmation. You're also welcome to source the equipment yourself if you'd rather." },
  { q: "what about dietary restrictions?", a: "Every chef accommodates allergies and preferences. Tell us at booking and the chef will design the menu around them — beautifully, never begrudgingly." },
  { q: "can i choose the menu?", a: "The menus listed are our chefs' signature evenings. For fully custom menus, book any chef and mention it in your notes — we'll route your request directly." },
  { q: "what if i need to cancel?", a: "Full refund up to 14 days before your dinner. 50% between 14 and 7 days. Inside 7 days the booking is non-refundable — the chef has already committed the evening. See our cancellation policy for the full details." },
  { q: "do you tip the chef?", a: "Tipping is not required — chefs are paid a fair rate — but always appreciated for a night that stays with you." },
  { q: "i'm a chef — how do i join?", a: "We're always looking for talented private chefs. Visit our For Chefs page to learn about the platform and apply. We review every application and respond within 48 hours." },
];

export default function FAQPage() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1414235077428-338989a2e8c0")}
        badge="FAQ"
        headline={"The questions\nWe love\nAnswering."}
        caption="If it isn't here, write to us — we read every note."
        height="compact"
      />

      <Section tone="burgundy">
        <Reveal delay={80}>
          <div className="max-w-4xl mx-auto">
            <div className="label mb-8">For guests</div>
            <Accordion items={items.map((i) => ({ q: i.q, a: <p>{i.a}</p> }))} />
          </div>
        </Reveal>
      </Section>

      <Section tone="burgundy-deep">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <div className="label mb-8">For chefs</div>
            <Accordion
              items={CHEF_FAQ.items.map((i) => ({
                q: i.q,
                a: <p>{i.a}</p>,
              }))}
            />
            <p className="mt-12 font-display italic text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.4] tracking-[-0.02em] text-cream/85 max-w-2xl">
              {CHEF_FAQ.closing}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
