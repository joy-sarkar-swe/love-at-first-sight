"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const linksLeft = [
  { n: "01", to: "/", label: "Home" },
  { n: "02", to: "/our-story", label: "About" },
  { n: "03", to: "/chefs", label: "Chefs" },
  { n: "04", to: "/for-chefs", label: "For Chefs" },
] as const;

const linksRight = [
  { n: "05", to: "/gallery", label: "Gallery" },
  { n: "06", to: "/journal", label: "Journal" },
  { n: "07", to: "/contact", label: "Contact" },
] as const;

const links = [...linksLeft, ...linksRight] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const chromeless = pathname === "/book" || pathname.startsWith("/book/");

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

  if (chromeless) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      {/* Extra/BuildForever-style bar — brand left, nav+CTA right */}
      <motion.div
        initial={{ y: -12, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        className={`pointer-events-auto relative z-[60] flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-brand/90 backdrop-blur-md border-b border-cream/10" : ""
        }`}
        style={{
          paddingLeft: "clamp(1rem, 5vw, 3rem)",
          paddingRight: "clamp(1rem, 5vw, 3rem)",
          paddingTop: scrolled ? 16 : 48,
          paddingBottom: scrolled ? 12 : 0,
        }}
      >
        {/* Desktop: single continuous nav pill spanning the full width */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 rounded-full border border-cream/20 bg-burgundy-deep/60 backdrop-blur-xl p-1.5 mx-auto"
        >
          {linksLeft.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to + "/"));
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`relative inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium tracking-tight transition-colors duration-200 ${
                  active ? "bg-cream text-burgundy" : "text-cream/75 hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          {/* Center spacer — the overhanging logo sits above this */}
          <div className="relative shrink-0" style={{ width: scrolled ? 88 : 108, height: 36 }} aria-hidden>
            <Link
              href="/"
              aria-label="Love at First Sight — home"
              onClick={() => setOpen(false)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-cream ring-4 ring-burgundy/30 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.03] overflow-hidden"
              style={{ height: scrolled ? 76 : 96, width: scrolled ? 76 : 96 }}
            >
              <img
                src="/logo.webp"
                alt=""
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
            </Link>
          </div>

          {linksRight.map((l) => {
            const active = pathname === l.to || pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`relative inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium tracking-tight transition-colors duration-200 ${
                  active ? "bg-cream text-burgundy" : "text-cream/75 hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            href="/dashboard"
            className="ml-1 inline-flex h-9 items-center rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/25 hover:border-cream/50 px-4 text-[13px] font-medium text-cream transition-all duration-200 active:scale-[0.97]"
          >
            Sign in
          </Link>
        </nav>

        {/* Mobile: brand mark on the left so hamburger stays on the right */}
        <Link
          href="/"
          className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-cream ring-1 ring-cream/40 overflow-hidden shadow-[0_6px_20px_-6px_rgba(0,0,0,0.35)]"
          aria-label="Love at First Sight — home"
          onClick={() => setOpen(false)}
        >
          <img src="/logo.webp" alt="" className="h-full w-full object-cover" draggable={false} />
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-cream/30 bg-burgundy-deep/70 backdrop-blur-md text-cream transition-transform duration-[160ms] ease-out hover:border-cream active:scale-[0.94]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      {/* Full-screen mobile menu overlay */}
      <div
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-0 z-40 bg-burgundy-deep transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
                  transition: `opacity 400ms ease-out ${links.length * 60}ms, transform 400ms ease-out ${
                    links.length * 60
                  }ms`,
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
