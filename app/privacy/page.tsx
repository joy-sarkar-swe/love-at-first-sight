import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sections = [
  {
    n: "01",
    t: "information we collect",
    body: "When you use our website or services, we may collect information such as your name, email address, phone number, booking details, payment information (processed securely through trusted third-party providers), and any information you choose to provide when contacting us or requesting services.",
  },
  {
    n: "02",
    t: "how we use your information",
    body: "We use your information to process bookings and payments, connect clients with chefs, provide customer support, improve our website and services, communicate important updates, and maintain the security of our platform.",
  },
  {
    n: "03",
    t: "sharing your information",
    body: "We do not sell your personal information. Your information is shared only when necessary to provide our services, process payments, comply with legal obligations, or work with trusted service providers who support our business.",
  },
  {
    n: "04",
    t: "security",
    body: "We use reasonable administrative, technical, and physical safeguards to protect your information. While no online system is completely secure, we are committed to maintaining appropriate security measures.",
  },
  {
    n: "05",
    t: "your agreement",
    body: "By using our website, you agree to the collection and use of your information as described in this Privacy Policy.",
  },
];

export default function Privacy() {
  return (
    <>
      <CinematicHero
        image={IMG("photo-1519708227418-c8fd9a32b7a2")}
        badge={`Privacy Policy · Effective Date: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        headline={"Privacy\n&\nPolicy"}
        caption='How we collect, use, and protect your information.'
        height='compact'
      />

      <Section tone='burgundy'>
        <div className='mx-auto max-w-3xl'>
          <Reveal>
            <div className='space-y-10 leading-relaxed text-cream/80'>
              {sections.map((s) => (
                <section key={s.n} className='border-t border-cream/15 pt-8'>
                  <div className='grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6'>
                    <span className='num shrink-0 pt-1'>{s.n}</span>
                    <div className='min-w-0'>
                      <h2 className='font-display font-bold text-xl md:text-2xl lowercase tracking-[-0.02em] text-cream'>
                        {s.t}
                      </h2>
                      <p className='mt-4 text-[16px] leading-[1.75]'>
                        {s.body}
                      </p>
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
