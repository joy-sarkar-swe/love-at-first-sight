"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ButtonLink,
  CinematicHero,
  CircleButton,
  LightboxImage,
  Reveal,
  RevealImage,
  Section,
  Stars,
} from "@/components/ui-lafs";
import type { LightboxItem } from "@/components/ui-lafs";
import { getChef } from "@/data/chefs";
import { WHATS_INCLUDED } from "@/data/site-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ChefDetail({ params }: Props) {
  const { slug } = React.use(params);
  const chef = getChef(slug);

  if (!chef) {
    return notFound();
  }

  const firstName = chef.name.split(" ")[0];

  return (
    <>
      <CinematicHero
        image={chef.portrait}
        badge={`${chef.cuisine} · ${chef.city}`}
        headline={chef.name.toLowerCase()}
        caption={chef.headline}
        overlay={0.6}
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 md:gap-6">
          <div className="shrink-0"><Stars value={chef.rating} /></div>
          <div className="min-w-0 num text-cream/80 truncate">
            {chef.rating.toFixed(1)} · {chef.reviewCount} reviews · from ${chef.startingPrice}
          </div>
        </div>
      </CinematicHero>

      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">n°01 · the cook</div>
              <dl className="mt-8 space-y-1 border-t border-cream/15 pt-6">
                <MetaRow k="Cuisine" v={chef.cuisine} />
                <MetaRow k="City" v={chef.city} />
                <MetaRow k="Specialty" v={chef.specialty} />
                <MetaRow k="Rating" v={`${chef.rating.toFixed(1)} / 5`} />
                <MetaRow k="Starting from" v={`$${chef.startingPrice}`} />
                <MetaRow k="Usually books" v={leadTimeLabel(chef.leadTimeWeeks)} />
              </dl>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <h2 className="text-stack">
                <span className="block">an evening</span>
                <span className="block text-cream/50">with {firstName.toLowerCase()}.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-10 max-w-lg text-[16px] leading-[1.8] text-cream/80">{chef.bio}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-12">
                <ButtonLink to="/book" search={{ step: "evening", chef: chef.slug }} size="lg">
                  book {firstName.toLowerCase()}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="burgundy-deep">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">n°02 · menus</div>
              <h2 className="mt-8 text-stack">
                <span className="block">choose</span>
                <span className="block text-cream/50">the evening.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {chef.packages.map((p, i) => (
                <li key={p.id} className="border-b border-cream/15">
                  <Link href={`/book?step=evening&chef=${chef.slug}&packageId=${p.id}`}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 md:gap-8 py-8 md:py-10 transition-colors">
                    <span className="num shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className="font-display font-bold lowercase text-xl md:text-[26px] tracking-[-0.02em] text-cream">
                        <span className="relative inline-block">
                          {p.name}
                          <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[220ms] ease-out group-hover:scale-x-100" />
                        </span>
                      </div>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/70">{p.description}</p>
                      <div className="mt-4 label">{p.courses} courses · {p.inclusions.join(" · ")}</div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-display font-bold text-xl md:text-2xl text-cream tabular-nums">${p.price}</div>
                      <div className="mt-1 label">per person</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {chef.offersCustomMenu && (
              <p className="mt-6 text-[13px] text-cream/60 leading-relaxed">
                Custom menus available — design yours when you book.
              </p>
            )}
          </div>
        </div>
      </Section>

      {chef.signatureDishes && chef.signatureDishes.length > 0 && (
        <Section tone="burgundy">
          <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
            <div className="md:col-span-4">
              <Reveal>
                <div className="label">n°03 · signature dishes</div>
                <h2 className="mt-8 text-stack">
                  <span className="block">what</span>
                  <span className="block text-cream/50">{firstName.toLowerCase()} is known for.</span>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="border-t border-cream/15">
                {chef.signatureDishes.map((d, i) => (
                  <li key={d.name} className="border-b border-cream/15 py-6 md:py-7">
                    <Reveal delay={i * 60}>
                      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6">
                        <span className="num shrink-0 text-cream/60">{String(i + 1).padStart(2, "0")}</span>
                        <div className="min-w-0">
                          <div className="font-display font-bold lowercase text-xl md:text-[22px] tracking-[-0.02em] text-cream">{d.name}</div>
                          {d.note && <p className="mt-2 text-[14px] text-cream/70 leading-relaxed">{d.note}</p>}
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/45">
                Showcase only — bookings are by menu, not by dish.
              </p>
            </div>
          </div>
        </Section>
      )}

      <Section tone="burgundy-deep">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">n°04 · what to expect</div>
              <h2 className="mt-8 text-stack">
                <span className="block">the kitchen,</span>
                <span className="block text-cream/50">the setup.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-10">
            {chef.equipmentRequirements && chef.equipmentRequirements.length > 0 && (
              <Reveal>
                <div className="label">equipment requirements</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {chef.equipmentRequirements.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-[8px] border border-gold/40 bg-gold/[0.08] px-3 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              {WHATS_INCLUDED.map((block, i) => (
                <Reveal key={block.title} delay={i * 80}>
                  <div className="border-t border-cream/15 pt-6">
                    <div className="label text-cream/60">{`n°${String(i + 1).padStart(2, "0")}`}</div>
                    <h3 className="mt-3 font-display font-bold lowercase text-[20px] tracking-[-0.02em] text-cream">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-cream/75">{block.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {chef.gallery.length > 0 && (
        <Section tone="burgundy">
          <Reveal><div className="label">n°05 · the room</div></Reveal>
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {chef.gallery.map((src, i) => {
              const group: LightboxItem[] = chef.gallery.map((g, gi) => ({
                src: g,
                alt: `${chef.name} — image ${gi + 1}`,
                caption: `${chef.name.toLowerCase()} · fig. ${String(gi + 1).padStart(2, "0")}`,
              }));
              return (
                <RevealImage key={src} delay={i * 60}>
                  <LightboxImage
                    src={src}
                    alt={`${chef.name} — image ${i + 1}`}
                    group={group}
                    index={i}
                    className="aspect-[4/5]"
                  />
                </RevealImage>
              );
            })}
          </div>
        </Section>
      )}

      <Section tone="burgundy-deep">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">n°06 · overheard</div>
              <h2 className="mt-8 text-stack">
                <span className="block">what guests</span>
                <span className="block text-cream/50">said.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-10">
            {chef.reviews.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="border-t border-cream/15 pt-8">
                  <Stars value={r.rating} />
                  <blockquote className="mt-6 font-display font-bold text-xl md:text-[26px] leading-[1.3] tracking-[-0.02em] text-cream">
                    &ldquo;{r.body}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 label">{r.author} · {r.date}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="burgundy">
        <div className="text-center">
          <Reveal>
            <h2 className="text-stack max-w-3xl mx-auto">
              <span className="block">sit down with</span>
              <span className="block text-cream/50">{firstName.toLowerCase()}?</span>
            </h2>
            <div className="mt-14 flex justify-center">
              <CircleButton to="/book" search={{ step: "evening", chef: chef.slug }} size={188}>
                book this chef
              </CircleButton>
            </div>
            <div className="mt-10">
              <Link href="/chefs" className="text-[12px] font-mono uppercase tracking-[0.14em] text-cream/60 hover:text-cream">
                ← see other chefs
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-6 border-b border-cream/10 py-3">
      <dt className="label shrink-0">{k}</dt>
      <dd className="min-w-0 text-right text-[14px] text-cream truncate">{v}</dd>
    </div>
  );
}

function leadTimeLabel(weeks: number) {
  if (weeks <= 1) return "~1 week out";
  return `~${weeks} weeks out`;
}
