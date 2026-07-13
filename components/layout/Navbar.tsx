"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { n: "01", to: "/", label: "Home" },
  { n: "02", to: "/our-story", label: "About" },
  { n: "03", to: "/chefs", label: "Chefs" },
  { n: "04", to: "/for-chefs", label: "For Chefs" },
  { n: "05", to: "/gallery", label: "Gallery" },
  { n: "06", to: "/journal", label: "Journal" },
  { n: "07", to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      {/* Extra/BuildForever-style bar — brand left, nav+CTA right */}
      <motion.div
        initial={{ y: -12, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        className={`pointer-events-auto relative z-[60] flex items-center justify-between transition-all duration-300 ${scrolled
          ? "bg-brand/90 backdrop-blur-md border-b border-cream/10"
          : ""
          }`}
        style={{ paddingLeft: "clamp(1rem, 5vw, 3rem)", paddingRight: "clamp(1rem, 5vw, 3rem)", paddingTop: scrolled ? 12 : 20, paddingBottom: scrolled ? 12 : 0 }}
      >
        <Link href="/" className="text-cream leading-none group flex items-center" aria-label="Love at First Sight — home" onClick={() => setOpen(false)}>
          <img
            src="/logo.webp"
            alt="Love at First Sight"
            className="h-12 md:h-14 w-auto object-contain select-none"
            draggable={false}
          />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 rounded-full border border-cream/20 bg-burgundy-deep/60 backdrop-blur-xl p-1.5">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to + "/"));
            return (
              <Link
                key={l.to}
                href={l.to as never}
                className={`relative inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium tracking-tight transition-colors duration-200 ${active
                  ? "bg-cream text-burgundy"
                  : "text-cream/75 hover:text-cream"
                  }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side — Sign in / Book CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center rounded-full border border-cream/25 bg-cream/5 backdrop-blur-md px-5 text-[13px] font-medium text-cream transition-all duration-200 hover:bg-cream/15 hover:border-cream/50 active:scale-[0.97]"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-cream/30 bg-burgundy-deep/70 backdrop-blur-md text-cream transition-transform duration-[160ms] ease-out hover:border-cream active:scale-[0.94]"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
            {open ? (
              <path d="M2 2L16 10M16 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            ) : (
              <>
                <path d="M1 3H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M1 9H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </motion.div>

      {/* Full-screen mobile menu overlay */}
      <div
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-0 z-40 bg-burgundy-deep transition-opacity duration-300 ease-out ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="container-page flex h-full flex-col justify-between pt-24 pb-16 overflow-y-auto">
          <nav>
            <ul className="space-y-3">
              {links.map((l, i) => (
                <li
                  key={l.to}
                  className="border-t border-cream/15 pt-3"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 400ms ease-out ${i * 60}ms, transform 400ms ease-out ${i * 60}ms`,
                  }}
                >
                  <Link
                    href={l.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5"
                  >
                    <span className="num">{l.n}</span>
                    <span className="text-cream text-[clamp(1.75rem,6vw,4rem)] leading-none tracking-[-0.03em] font-display font-bold transition-colors group-hover:text-cream/80">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
              <li
                className="border-t border-cream/15 pt-3"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 400ms ease-out ${links.length * 60}ms, transform 400ms ease-out ${links.length * 60}ms`,
                }}
              >
                <Link
                  href="/how-it-works"
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5"
                >
                  <span className="num">08</span>
                  <span className="text-cream text-[clamp(1.75rem,6vw,4rem)] leading-none tracking-[-0.03em] font-display font-bold transition-colors group-hover:text-cream/80">
                    How it works
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-10 space-y-6">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex h-14 w-full items-center justify-center rounded-[14px] bg-cream text-burgundy text-[12px] font-mono uppercase tracking-[0.14em] transition-colors hover:bg-[#F0E8DE] active:scale-[0.97]"
            >
              Sign in
            </Link>
            <div className="text-cream/70 text-sm">
              <div className="label">Are you a chef?</div>
              <Link href="/for-chefs" onClick={() => setOpen(false)} className="mt-2 block text-cream hover:text-cream/80">
                Apply to join →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
