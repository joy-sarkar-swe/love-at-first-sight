"use client";

import { useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BlurReveal, CinematicHero, Section } from "@/components/ui-lafs";
import { posts, categories } from "@/data/journal";

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function JournalPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-burgundy text-cream">
        <div className="label">loading journal...</div>
      </div>
    }>
      <JournalIndex />
    </Suspense>
  );
}

function JournalIndex() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const cat = searchParams.get("cat") || "All";

  const setCat = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") {
      params.delete("cat");
    } else {
      params.set("cat", next);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const filtered = useMemo(
    () => (cat === "All" ? posts : posts.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <>
      <CinematicHero
        image={IMG("photo-1476224203421-9ac39bcb3327", 2400)}
        badge="Journal · Vol. I"
        headline={"Love letters,\nfrom the table."}
        caption="Notes on being deeply in love, and the meals that carry it. Read one before you cook."
        height="compact"
      />

      <Section tone="burgundy">
        <div className="flex flex-wrap items-center gap-2 border-b border-cream/15 pb-6">
          <span className="label mr-2 shrink-0">Categories</span>
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={active}
                className={`inline-flex h-[34px] items-center rounded-full border px-3.5 text-[12px] font-mono uppercase tracking-[0.12em] transition-all duration-200 active:scale-[0.97] cursor-pointer ${
                  active
                    ? "bg-cream text-burgundy border-cream"
                    : "border-cream/25 text-cream/75 hover:text-cream hover:border-cream/55"
                }`}
              >
                {c}
              </button>
            );
          })}
          <span className="ml-auto num shrink-0">
            {String(filtered.length).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {filtered[0] && (
              <Link
                href={`/journal/${filtered[0].slug}`}
                className="mt-16 grid gap-10 md:grid-cols-12 md:gap-x-16 group block"
              >
                <div className="md:col-span-7 overflow-hidden rounded-[6px] aspect-[16/10]">
                  <img
                    src={filtered[0].image}
                    alt=""
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="md:col-span-5 flex flex-col justify-center">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4">
                    <span className="num">{filtered[0].n}</span>
                    <div className="label min-w-0 truncate">{filtered[0].kicker}</div>
                    <div className="num text-cream/50">{filtered[0].read}</div>
                  </div>
                  <h2 className="mt-6 font-display font-bold text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.02] tracking-[-0.03em] text-cream">
                    <BlurReveal>{filtered[0].title}</BlurReveal>
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/75">
                    {filtered[0].excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-3 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/60">
                    <span>{filtered[0].date}</span>
                    <span aria-hidden>·</span>
                    <span>{filtered[0].category}</span>
                  </div>
                </div>
              </Link>
            )}

            <div className="mt-24 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(1).map((p, i) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}
                  className="group"
                >
                  <Link href={`/journal/${p.slug}`} className="block">
                    <div className="overflow-hidden rounded-[6px] aspect-[4/5]">
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3">
                      <span className="num shrink-0">{p.n}</span>
                      <div className="label min-w-0 truncate">{p.kicker}</div>
                      <div className="num shrink-0 text-cream/50">{p.read}</div>
                    </div>
                    <h3 className="mt-3 font-display font-bold text-[clamp(1.15rem,1.6vw,1.5rem)] leading-[1.15] tracking-[-0.02em] text-cream transition-colors group-hover:text-cream/90">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-cream/70 leading-relaxed text-[14px] line-clamp-3">
                      {p.excerpt}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-24 border-t border-cream/15 pt-16 text-center">
                <div className="label">Nothing under this category — yet.</div>
                <p className="mt-6 max-w-md mx-auto text-cream/70">
                  New letters arrive on Sundays.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </>
  );
}
