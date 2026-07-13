"use client";

import type { ReactNode, ElementType, CSSProperties } from "react";
import { useReveal } from "@/lib/hooks/useReveal";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({ children, as, delay = 0, className = "", style }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/**
 * RevealImage — clip-path reveal from the bottom, for photos.
 * Wrap around an <img /> or block-level media element.
 */
export function RevealImage({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-clip ${visible ? "reveal-clip-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}