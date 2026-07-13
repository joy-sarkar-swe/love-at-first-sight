import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { buildHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

// Spec: 110.59 × 38px, padding 12px 16px, radius 16px, cursor pointer.
const base =
  "group/btn relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-[16px] font-medium tracking-tight transition-all duration-[200ms] ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 overflow-hidden whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-cream text-burgundy shadow-[0_10px_30px_-14px_rgba(0,0,0,0.55)] hover:bg-[#F0E8DE] hover:text-[#1A1614]",
  secondary:
    "border border-cream/40 text-cream bg-transparent hover:bg-cream hover:text-burgundy hover:border-cream",
  ghost: "text-cream hover:text-cream/80",
};

const sizes: Record<Size, string> = {
  md: "h-[38px] px-4 py-3 text-[13px]",
  lg: "h-[44px] px-5 py-3 text-[14px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
};

type PlainButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  to,
  params,
  search,
}: LinkButtonProps) {
  const href = buildHref(to, params, search);
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: PlainButtonProps) {
  return (
    <button
      {...rest}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}