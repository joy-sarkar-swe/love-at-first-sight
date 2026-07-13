import Link from "next/link";
import type { ReactNode } from "react";
import { buildHref } from "@/lib/utils";

type Props = {
  to: string;
  search?: Record<string, unknown>;
  params?: Record<string, string>;
  children: ReactNode;
  /** Ignored — retained for API compat. */
  size?: number;
  className?: string;
  variant?: "primary" | "secondary";
  icon?: "grid" | "play" | "arrow";
};

/**
 * CTA pill inspired by the Extra/BuildForever reference. Two variants:
 *  - primary: cream fill, small dark chip icon on the left (e.g. "Get the app").
 *  - secondary: translucent with a soft double border (e.g. "Watch the film").
 */
export function CircleButton({
  to,
  search,
  params,
  children,
  className = "",
  variant = "primary",
  icon = "grid",
}: Props) {
  const base =
    "group/cta relative inline-flex h-[44px] cursor-pointer items-center gap-2.5 rounded-[16px] px-1.5 pr-4 text-[13px] font-medium tracking-tight transition-all duration-[200ms] ease-out active:scale-[0.97] whitespace-nowrap";

  const href = buildHref(to, params, search);

  if (variant === "secondary") {
    // Interesting border: outer soft ring + inner 1px, sits over any hero image.
    return (
      <Link
        href={href}
        className={`${base} bg-cream/5 text-cream backdrop-blur-md pl-1.5 border border-cream/25 shadow-[inset_0_0_0_1px_rgba(245,238,224,0.08),0_10px_30px_-14px_rgba(0,0,0,0.55)] hover:border-cream/60 hover:bg-cream/10 ${className}`}
      >
        <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-cream/10 border border-cream/20">
          <Icon name={icon} className="text-cream" />
        </span>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} bg-cream text-burgundy border border-cream shadow-[0_14px_36px_-14px_rgba(0,0,0,0.55)] hover:bg-[#F0E8DE] hover:text-[#1A1614] hover:border-[#F0E8DE] ${className}`}
    >
      <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-burgundy text-cream transition-colors duration-[200ms] group-hover/cta:bg-burgundy-deep">
        <Icon name={icon} className="text-cream" />
      </span>
      <span>{children}</span>
    </Link>
  );
}

function Icon({ name, className = "" }: { name: "grid" | "play" | "arrow"; className?: string }) {
  if (name === "play") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden className={className}>
        <path d="M2.5 1.5v9L10.5 6l-8-4.5Z" />
      </svg>
    );
  }
  if (name === "arrow") {
    return (
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className={`${className} transition-transform duration-[220ms] ease-out group-hover/cta:translate-x-0.5`}>
        <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // grid — 4-dot / QR-ish
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden className={className}>
      <rect x="1" y="1" width="4" height="4" rx="1" />
      <rect x="9" y="1" width="4" height="4" rx="1" />
      <rect x="1" y="9" width="4" height="4" rx="1" />
      <rect x="9" y="9" width="4" height="4" rx="1" />
    </svg>
  );
}