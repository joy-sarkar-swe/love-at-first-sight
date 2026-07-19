"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Section } from "@/components/ui-lafs";
import { getPost, getRelatedPosts } from "@/data/journal";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function JournalDetail({ params }: Props) {
  const { slug } = React.use(params);
  const post = getPost(slug);

  if (!post) {
    return notFound();
  }

  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-burgundy-deep text-cream pt-32">
        <div className="absolute inset-0">
          <img src={post.image} alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-deep/70 via-burgundy-deep/60 to-burgundy-deep" />
        </div>
        <div className="relative container-page pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-3xl">
            <div className="label">{post.category} · {post.date} · {post.read} read</div>
            <h1 className="mt-8 font-display font-bold text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-cream">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <Section tone="burgundy">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-[19px] leading-[1.7] text-cream/85 font-display italic">
              {post.excerpt}
            </p>
          </Reveal>
          <div className="mt-12 space-y-8 text-[17px] leading-[1.8] text-cream/80">
            {post.body.map((p: string, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 border-t border-cream/15 pt-10">
            <Link
              href="/journal"
              className="inline-flex h-11 items-center rounded-[16px] border border-cream/50 px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream hover:text-burgundy hover:border-cream"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="burgundy-deep">
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-end">
            <div className="md:col-span-6">
              <div className="label">Keep reading</div>
              <h3 className="mt-6 font-display font-bold text-3xl md:text-4xl lowercase text-cream tracking-[-0.02em]">
                Letters like this one.
              </h3>
            </div>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/journal/${p.slug}`} className="group block">
                  <div className="overflow-hidden rounded-[6px] aspect-[4/5]">
                    <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3">
                    <span className="num shrink-0">{p.n}</span>
                    <div className="label min-w-0 truncate">{p.kicker}</div>
                    <div className="num shrink-0 text-cream/50">{p.read}</div>
                  </div>
                  <h4 className="mt-3 font-display font-bold text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.2] tracking-[-0.02em] text-cream group-hover:text-cream/90">
                    {p.title}
                  </h4>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section tone="burgundy">
        <div className="max-w-2xl mx-auto text-center">
          <div className="label">Ready to plate one of these?</div>
          <h3 className="mt-6 font-display font-bold text-3xl md:text-4xl lowercase text-cream tracking-[-0.02em]">
            Book a chef.
          </h3>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/chefs" className="inline-flex h-12 items-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy hover:bg-[#F0E8DE] transition-colors">
              Browse chefs
            </Link>
            <Link href="/book" className="inline-flex h-12 items-center rounded-[12px] border border-cream/40 px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:border-cream transition-colors">
              Start a booking
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
