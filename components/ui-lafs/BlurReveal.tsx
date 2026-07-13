"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  once?: boolean;
  stagger?: number;
};

/**
 * BlurReveal — framer-motion text reveal with slow blur → sharp,
 * translate-up, and fade. Splits string children by newlines for a
 * staggered line-by-line editorial cadence.
 */
export function BlurReveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  once = true,
  stagger = 0.09,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  const lines =
    typeof children === "string" ? children.split("\n") : [children];

  const variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(14px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduce ? 0 : 1.1,
        delay: reduce ? 0 : delay + i * stagger,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial="hidden"
          whileInView="show"
          viewport={{ once, margin: "-10% 0px -10% 0px" }}
          custom={i}
          variants={variants}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}