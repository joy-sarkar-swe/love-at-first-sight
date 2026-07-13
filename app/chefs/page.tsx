"use client";

import { useEffect, useMemo, useState } from "react";
import { ChefCard, CinematicHero, Reveal, Section } from "@/components/ui-lafs";
import { chefs, cities, cuisines } from "@/data/chefs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE = 12;

const IMG = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function ChefsList() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [sort, setSort] = useState<"featured" | "rating" | "price-asc" | "price-desc">("featured");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = chefs.filter((c) => {
      if (cuisine && c.cuisine !== cuisine) return false;
      if (city && c.city !== city) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.cuisine.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.specialty.toLowerCase().includes(q)
        );
      }
      return true;
    });
    switch (sort) {
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      case "price-asc":
        return [...list].sort((a, b) => a.startingPrice - b.startingPrice);
      case "price-desc":
        return [...list].sort((a, b) => b.startingPrice - a.startingPrice);
      default:
        return list;
    }
  }, [query, cuisine, city, sort]);

  // Reset to first page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [query, cuisine, city, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const clear = () => {
    setQuery("");
    setCuisine("");
    setCity("");
    setSort("featured");
  };

  return (
    <>
      <CinematicHero
        image={IMG("photo-1552566626-52f8b828add9")}
        badge="The Roster · Hundreds of chefs"
        headline={"Many hands.\nMany countries.\nOne unhurried night."}
        caption="Freelance private chefs, chosen by us and reviewed by their guests. Filter by cuisine, city, price — or scroll and let one catch you."
        height="compact"
      />

      <Section tone="burgundy">
        <Reveal>
          <div className="grid gap-6">
            <input
              type="text"
              placeholder="search by name, cuisine, or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-0 border-b border-cream/25 bg-transparent px-0 py-4 text-lg text-cream placeholder:text-cream/40 focus:border-cream focus:outline-none"
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <SelectField label="cuisine" value={cuisine} onChange={setCuisine}
                options={[{ v: "", l: "all cuisines" }, ...cuisines.map((c) => ({ v: c, l: c.toLowerCase() }))]} />
              <SelectField label="city" value={city} onChange={setCity}
                options={[{ v: "", l: "all cities" }, ...cities.map((c) => ({ v: c, l: c.toLowerCase() }))]} />
              <SelectField label="sort" value={sort} onChange={(v) => setSort(v as typeof sort)}
                options={[
                  { v: "featured", l: "featured" },
                  { v: "rating", l: "highest rated" },
                  { v: "price-asc", l: "price · low to high" },
                  { v: "price-desc", l: "price · high to low" },
                ]} />
              <button
                type="button"
                onClick={clear}
                className="h-[44px] rounded-[16px] border border-cream/40 px-4 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/80 transition-colors hover:border-cream hover:text-cream self-end cursor-pointer"
              >
                clear filters
              </button>
            </div>
            <div className="label">
              {filtered.length} chef{filtered.length === 1 ? "" : "s"} · updated daily
            </div>
          </div>
        </Reveal>

        <div className="mt-16 md:mt-24 grid gap-x-6 gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((c, i) => (
            <Reveal key={c.slug} delay={i * 50}>
              <ChefCard chef={c} index={i} />
            </Reveal>
          ))}
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-cream/15 pt-8">
            <div className="label">
              page {currentPage} of {totalPages} · {filtered.length} chefs
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-[38px] rounded-[16px] border border-cream/30 px-4 text-[12px] font-mono uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === currentPage;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={active ? "page" : undefined}
                    className={`h-[38px] min-w-[38px] rounded-[16px] px-3 text-[12px] font-mono uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      active
                        ? "bg-cream text-burgundy border border-cream"
                        : "border border-cream/30 text-cream hover:border-cream hover:text-cream"
                    }`}
                  >
                    {String(n).padStart(2, "0")}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-[38px] rounded-[16px] border border-cream/30 px-4 text-[12px] font-mono uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                next →
              </button>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-20 border-t border-cream/15 pt-16 text-center">
            <div className="label">nothing here — for now</div>
            <p className="mt-6 max-w-md mx-auto text-cream/70">
              No chefs match your search. New chefs join every week.
            </p>
            <button
              onClick={clear}
              className="mt-10 inline-flex h-[38px] items-center rounded-[16px] border border-cream/40 px-4 text-[12px] font-mono uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:bg-cream/90 active:scale-[0.97] cursor-pointer"
            >
              clear filters
            </button>
          </div>
        )}
      </Section>
    </>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <label className="block">
      <div className="label">{label}</div>
      <Select value={value || "__all"} onValueChange={(v) => onChange(v === "__all" ? "" : v)}>
        <SelectTrigger className="mt-2 w-full rounded-[16px] border border-cream/25 bg-transparent px-4 h-[44px] text-[13px] text-cream hover:border-cream/60 focus:border-cream focus:ring-0 data-[placeholder]:text-cream/60 cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-[14px] border border-cream/15 bg-burgundy-deep text-cream">
          {options.map((o) => (
            <SelectItem
              key={o.v || "__all"}
              value={o.v || "__all"}
              className="text-cream focus:bg-cream/10 focus:text-cream data-[state=checked]:text-gold cursor-pointer"
            >
              {o.l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
