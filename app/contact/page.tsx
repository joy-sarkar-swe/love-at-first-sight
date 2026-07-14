"use client";

import { useState } from "react";
import { Button, CinematicHero, Reveal, Section } from "@/components/ui-lafs";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <CinematicHero
        image={IMG("photo-1517248135467-4c7edcad34c4")}
        badge="Contact"
        headline={"Say hello.\nWe read\nEvery note."}
        caption="Questions, custom evenings, press. Write to us and we'll write back within the day."
        height="compact"
      />

      <Section tone="burgundy">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border-t border-cream/15 pt-6">
                <ContactRow n="01" label="reserve" value="hello@loveatfirstsight.co" href="mailto:hello@loveatfirstsight.co" />
                <ContactRow n="02" label="apply to cook" value="chefs@loveatfirstsight.co" href="mailto:chefs@loveatfirstsight.co" />
                <ContactRow n="03" label="press" value="press@loveatfirstsight.co" href="mailto:press@loveatfirstsight.co" />
                <ContactRow n="04" label="reply time" value="within one evening" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={80}>
              {sent ? (
                <div className="border-t border-cream/15 pt-6">
                  <div className="label">thank you</div>
                  <h2 className="mt-8 text-stack">
                    <span className="block">got it.</span>
                    <span className="block text-cream/50">we'll write soon.</span>
                  </h2>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="border-t border-cream/15 pt-6 max-w-xl"
                >
                  <div className="border-b border-cream/15 h-[84px] flex flex-col justify-center">
                    <label className="block w-full">
                      <div className="label">your name</div>
                      <input
                        type="text"
                        name="name"
                        required
                        className="mt-1.5 w-full border-0 bg-transparent px-0 py-0.5 text-cream placeholder:text-cream/40 focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="border-b border-cream/15 h-[84px] flex flex-col justify-center">
                    <label className="block w-full">
                      <div className="label">email</div>
                      <input
                        type="email"
                        name="email"
                        required
                        className="mt-1.5 w-full border-0 bg-transparent px-0 py-0.5 text-cream placeholder:text-cream/40 focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="border-b border-cream/15 h-[168px] flex flex-col justify-center py-4">
                    <label className="block w-full h-full flex flex-col">
                      <div className="label">what's on your mind?</div>
                      <textarea
                        name="message"
                        required
                        className="mt-2 w-full flex-1 border-0 bg-transparent px-0 py-1 text-cream placeholder:text-cream/40 focus:outline-none resize-none"
                      />
                    </label>
                  </div>

                  <div className="mt-8">
                    <Button type="submit" size="lg">send message</Button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({ n, label, value, href }: { n: string; label: string; value: string; href?: string }) {
  const inner = (
    <div className="border-b border-cream/15 h-[84px] flex flex-col justify-center">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 md:gap-6">
        <div className="num shrink-0">{n}</div>
        <div className="min-w-0">
          <div className="label">{label}</div>
          <div className="mt-1 font-display font-bold text-lg md:text-xl lowercase text-cream truncate">{value}</div>
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-cream transition-colors">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}
