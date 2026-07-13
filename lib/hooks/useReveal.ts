import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element on scroll into view. Robust against hydration:
 * - Above-the-fold elements reveal immediately on mount.
 * - Below-the-fold elements reveal via IntersectionObserver.
 * - As a safety net, everything is guaranteed visible within ~1.2s of mount.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    // If element is already in the viewport at mount, reveal immediately.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView || typeof IntersectionObserver === "undefined") {
      // rAF so the browser paints the hidden state at least once,
      // giving us a real transition instead of a snap-in.
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Safety net — never leave anything permanently hidden.
    const safety = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return { ref, visible };
}