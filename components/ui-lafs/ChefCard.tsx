import Link from "next/link";
import type { Chef } from "@/data/chefs";
import { buildHref } from "@/lib/utils";

export function ChefCard({ chef, index }: { chef: Chef; index?: number }) {
  const n = index !== undefined ? String(index + 1).padStart(2, "0") : undefined;
  const href = buildHref("/chefs/[slug]", { slug: chef.slug });
  return (
    <Link
      href={href}
      className="group block"
    >
      <div className="overflow-hidden bg-burgundy-tint/40" style={{ borderRadius: 4 }}>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={chef.portrait}
            alt={chef.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className="mt-5 flex items-baseline gap-3">
        {n && <span className="num">{n}</span>}
        <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-none tracking-[-0.02em] text-cream lowercase">
          <span className="relative inline-block">
            {chef.name}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[220ms] ease-out group-hover:scale-x-100"
            />
          </span>
        </h3>
      </div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
        <div className="label text-cream/60 min-w-0 truncate normal-case">
          {chef.cuisine} · {chef.city}
        </div>
        <div className="num text-gold shrink-0">from ${chef.startingPrice}</div>
      </div>
    </Link>
  );
}