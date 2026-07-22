"use client";

import { useState } from "react";
import { Button, CinematicHero, Reveal, Section } from "@/components/ui-lafs";
import { CONTACT_DETAILS } from "@/data/site-content";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Filter out any empty email rows if present
  const emailRows = (CONTACT_DETAILS.emails || []).filter((e) => e && e.value);

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
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="space-y-4 border-t border-cream/15 pt-6">
                {emailRows.map((row, i) => (
                  <ContactRow
                    key={row.value}
                    n={String(i + 1).padStart(2, "0")}
                    label={row.label}
                    value={row.value}
                    href={`mailto:${row.value}`}
                  />
                ))}
                <ContactRow
                  n={String(emailRows.length + 1).padStart(2, "0")}
                  label="reply time"
                  value={CONTACT_DETAILS.replyTime}
                />
                <ContactRow
                  n={String(emailRows.length + 2).padStart(2, "0")}
                  label="instagram"
                  value={`@${CONTACT_DETAILS.instagram}`}
                  href={CONTACT_DETAILS.instagramUrl}
                />
                <ContactRow
                  n={String(emailRows.length + 3).padStart(2, "0")}
                  label="on the web"
                  value={CONTACT_DETAILS.site}
                  href={`https://${CONTACT_DETAILS.site}`}
                />
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-4 border-t border-cream/15 pt-6 max-w-xl"
                >
                  <Field label="your name" name="name" placeholder="e.g. Jane Doe" required />
                  <Field label="email" name="email" type="email" placeholder="you@example.com" required />
                  <Field label="what's on your mind?" name="message" placeholder="Tell us about your event, question or idea…" textarea required />
                  <div className="pt-4">
                    <Button type="submit" size="lg">
                      send message
                    </Button>
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
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 md:gap-6 border-b border-cream/15 py-5 h-[88px] box-border">
      <div className="num shrink-0">{n}</div>
      <div className="min-w-0">
        <div className="label">{label}</div>
        <div className="mt-1 font-display font-bold text-lg md:text-xl lowercase text-cream truncate">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:text-cream transition-colors">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div className="border-b border-cream/15 py-5 h-[88px] box-border flex flex-col justify-center">
      <label className="block min-w-0">
        <div className="label text-cream/60">{label}</div>
        {textarea ? (
          <input
            type="text"
            name={name}
            required={required}
            placeholder={placeholder}
            className="mt-1 w-full border-0 bg-transparent px-0 font-display font-bold text-lg md:text-xl text-cream placeholder:text-cream/35 placeholder:font-normal focus:outline-none truncate"
          />
        ) : (
          <input
            type={type}
            name={name}
            required={required}
            placeholder={placeholder}
            className="mt-1 w-full border-0 bg-transparent px-0 font-display font-bold text-lg md:text-xl text-cream placeholder:text-cream/35 placeholder:font-normal focus:outline-none truncate"
          />
        )}
      </label>
    </div>
  );
}
