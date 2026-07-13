"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  image: string;
  video?: string;
  eyebrow?: string;
  badge?: string;
  headline: ReactNode;
  caption?: string;
  height?: "full" | "compact";
  overlay?: number;
  align?: "left" | "center";
  children?: ReactNode;
};

/**
 * Aldren-style cinematic hero. Full-bleed dark photograph, small mono
 * eyebrow above a bold Inter Tight headline pinned bottom-left (or
 * centered), with an optional numbered/label row underneath.
 *
 * On mount the image reveals via a clip-path curtain, then the headline
 * stack fades + translates up in a soft stagger. Reduced-motion collapses
 * everything to instant.
 */
export function CinematicHero({
  image,
  video,
  eyebrow,
  badge,
  headline,
  caption,
  height = "full",
  overlay = 0.85,
  align = "center",
  children,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const r1 = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r1);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const p = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height)),
      );
      setScroll(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heightClass =
    height === "full"
      ? "min-h-[100svh]"
      : "min-h-[70svh] md:min-h-[78svh]";

  const lines =
    typeof headline === "string" ? headline.split("\n") : [headline];

  const centered = align === "center";

  return (
    <section
      ref={heroRef}
      className={`relative isolate ${heightClass} overflow-hidden bg-burgundy-deep text-cream`}
    >
      {/* Photograph */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 1200ms cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            style={{
              transform: `scale(${1.02 + scroll * 0.04})`,
              transition: "transform 400ms linear",
            }}
          />
        ) : (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            style={{
              transform: `scale(${1.02 + scroll * 0.06})`,
              transition: "transform 400ms linear",
            }}
          />
        )}
        {/* Warm burgundy wash — never so dark it kills the photograph */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(20,8,10,${overlay * 0.75}) 0%, rgba(20,8,10,${overlay * 0.35}) 40%, rgba(20,8,10,${overlay * 0.55}) 70%, rgba(20,8,10,${overlay * 0.9}) 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 20% 100%, rgba(103,36,43,0.35) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Headline stack — centered (Extra/BuildForever structure).
          pt clears the pill navbar; pb keeps CTAs off the bottom edge. */}
      <div
        className={`relative z-10 flex ${heightClass} flex-col ${
          centered ? "items-center justify-center text-center" : "justify-end pb-16 md:pb-24"
        } pt-32 md:pt-36 pb-16 md:pb-20`}
      >
        <div className={`container-page ${centered ? "text-center" : ""}`}>
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0 : 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
              className={`label mb-6 md:mb-8 text-cream/70 ${centered ? "mx-auto" : ""}`}
            >
              {badge}
            </motion.div>
          )}

          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0 : 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
              className="label mb-6 md:mb-8"
            >
              {eyebrow}
            </motion.div>
          )}

          <h1
            className={`text-hero max-w-5xl ${centered ? "mx-auto" : ""} text-cream`}
          >
            {lines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: reduce ? 0 : 1.1,
                  delay: reduce ? 0 : 0.3 + i * 0.12,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {caption && (
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0 : 1.0, ease: [0.23, 1, 0.32, 1], delay: 0.55 }}
              className={`mt-8 max-w-xl text-[15px] leading-relaxed text-cream/75 ${centered ? "mx-auto" : ""}`}
            >
              {caption}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: reduce ? 0 : 1.0, ease: [0.23, 1, 0.32, 1], delay: 0.75 }}
              className={`mt-10 md:mt-12 flex flex-wrap items-center gap-3 sm:gap-4 ${centered ? "justify-center" : ""}`}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}