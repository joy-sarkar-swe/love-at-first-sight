import {
  Accordion,
  CinematicHero,
  Reveal,
  Section,
} from "@/components/ui-lafs";
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — FAQ', description: 'Frequently Asked Questions about Love at First Sight.' };

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const items = [
  {
    q: "how does booking work?",
    a: "Choose the shape of the evening, pick a chef whose story catches you, choose a menu, and lock in a date. Payment is taken at booking; you'll get a confirmation and the chef's direct contact.",
  },
  {
    q: "how far ahead should i book?",
    a: "For weekends, two or three weeks is comfortable. For weeknights, a few days is often enough. For anniversaries and holidays, as far out as you can — the best chefs fill their calendars quickly.",
  },
  {
    q: "what's included?",
    a: "The grocery shopping, the cooking, the plating, the service, and the full kitchen cleanup. All you supply is the kitchen and the guests.",
  },
  {
    q: "what about dietary restrictions?",
    a: "Every chef accommodates allergies and preferences. Tell us at booking and the chef will design the menu around them — beautifully, never begrudgingly.",
  },
  {
    q: "can i choose the menu?",
    a: "The menus listed are our chefs' signature evenings. For fully custom menus, book any chef and mention it in your notes — we'll route your request directly.",
  },
  {
    q: "what if i need to cancel?",
    a: "Full refund up to 14 days before your dinner. 50% between 14 and 7 days. Inside 7 days the booking is non-refundable — the chef has already committed the evening. See our cancellation policy for the full details.",
  },
  {
    q: "do you tip the chef?",
    a: "Tipping is not required — chefs are paid a fair rate — but always appreciated for a night that stays with you.",
  },
  {
    q: "i'm a chef — how do i join?",
    a: "We're always looking for talented private chefs. Visit our For Chefs page to learn about the platform and apply. We review every application and respond within 48 hours.",
  },
];

export default function FAQ() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1414235077428-338989a2e8c0")}
        badge='FAQ'
        headline={"The questions\nWe love\nAnswering."}
        caption="If it isn't here, write to us — we read every note."
        height='compact'
      />

      <Section tone='burgundy'>
        <Reveal delay={80}>
          <div className='max-w-4xl mx-auto'>
            <Accordion
              items={items.map((i) => ({ q: i.q, a: <p>{i.a}</p> }))}
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
