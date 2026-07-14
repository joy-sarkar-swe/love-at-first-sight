"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Romantic candlelit cursor — a soft cream dot with a warm outer glow
 * that grows on interactive elements. Disabled on touch devices and
 * when the user prefers reduced motion.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [insideModal, setInsideModal] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
      const t = e.target as HTMLElement | null;
      const isInteractive = !!t?.closest("a, button, [role=button], input, textarea, select, [data-cursor='hover']");
      setHover(isInteractive);

      const inside = !!t?.closest("[role=dialog], .bg-cream, .bg-paper");
      setInsideModal(inside);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-none-root");
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* outer glow — larger, softer, tracks with spring */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 ${
          insideModal ? "" : "mix-blend-screen"
        }`}
      >
        <motion.div
          animate={{
            scale: hover ? 1.9 : 1,
            opacity: hover ? 0.55 : 0.35,
          }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="h-10 w-10 rounded-full"
          style={{
            background: insideModal
              ? "radial-gradient(closest-side, rgba(103, 36, 43, 0.25), rgba(103, 36, 43, 0.08) 55%, transparent 75%)"
              : "radial-gradient(closest-side, rgba(244,239,231,0.55), rgba(201,169,97,0.18) 55%, transparent 75%)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* inner dot — fast, exact position */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[101] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hover ? 0.6 : 1 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className={`h-[6px] w-[6px] rounded-full transition-colors duration-200 ${
            insideModal ? "bg-burgundy" : "bg-cream"
          }`}
          style={{
            boxShadow: insideModal
              ? "0 0 12px rgba(103, 36, 43, 0.9)"
              : "0 0 12px rgba(244, 239, 231, 0.9)"
          }}
        />
      </motion.div>
    </>
  );
}
