"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-cream/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-cream/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-baseline gap-6 py-8 text-left transition-colors ease-out"
            >
              <span className="num shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display font-bold lowercase text-xl md:text-[26px] leading-tight tracking-[-0.02em] text-cream">
                {item.q}
              </span>
              <span
                className={`ml-auto inline-block h-4 w-4 shrink-0 transition-transform duration-[220ms] ease-out ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 16 16" className="h-full w-full">
                  <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-[220ms] ease-out ${
                isOpen ? "grid-rows-[1fr] pb-8 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 pl-8 md:pl-16 pr-4 md:pr-10 text-cream/75 leading-relaxed max-w-2xl text-[15px]">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}