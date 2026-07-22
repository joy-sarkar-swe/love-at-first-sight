"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Utensils,
  ChefHat,
  Image as ImageIcon,
  FileText,
  Mail,
  HelpCircle,
  User,
  ArrowRight,
} from "lucide-react";

const linksLeft = [
  { n: "01", to: "/", label: "Home", Icon: Home },
  { n: "02", to: "/our-story", label: "About", Icon: BookOpen },
  { n: "03", to: "/chefs", label: "Chefs", Icon: Utensils },
  { n: "04", to: "/for-chefs", label: "For Chefs", Icon: ChefHat },
] as const;

const linksRight = [
  { n: "05", to: "/gallery", label: "Gallery", Icon: ImageIcon },
  { n: "06", to: "/journal", label: "Journal", Icon: FileText },
  { n: "07", to: "/contact", label: "Contact", Icon: Mail },
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
        {/* Desktop navbar */}
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

          {/* Center logo spacer */}
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

        {/* Mobile: large logo in the left corner */}
        <Link
          href="/"
          aria-label="Love at First Sight — home"
          onClick={() => setOpen(false)}
          className="md:hidden inline-flex items-center justify-center rounded-full bg-cream ring-4 ring-burgundy/30 overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 active:scale-[0.97] shrink-0"
          style={{ height: scrolled ? 72 : 88, width: scrolled ? 72 : 88 }}
        >
          <img src="/logo.webp" alt="" className="h-full w-full object-cover select-none" draggable={false} />
        </Link>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-cream/35 bg-burgundy-deep/80 backdrop-blur-md text-cream shadow-md transition-transform duration-[160ms] ease-out hover:border-cream active:scale-[0.94]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.div>

      {/* Mobile full-screen menu overlay */}
      <div
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-0 z-40 bg-burgundy-deep transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container-page flex h-full flex-col justify-between pt-[150px] pb-16 overflow-y-auto">
          <nav>
            <ul className="space-y-3">
              {links.map((l, i) => {
                const Icon = l.Icon;
                return (
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
                      className="group flex items-center justify-between py-1"
                    >
                      <div className="flex items-center gap-4">
                        <span className="num text-cream/40">{l.n}</span>
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gold shrink-0 transition-transform group-hover:scale-110" />
                          <span className="text-cream text-[clamp(1.5rem,5vw,3.5rem)] leading-none tracking-[-0.03em] font-display font-bold transition-colors group-hover:text-gold">
                            {l.label}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-cream/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                );
              })}
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
                  className="group flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-4">
                    <span className="num text-cream/40">08</span>
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-gold shrink-0 transition-transform group-hover:scale-110" />
                      <span className="text-cream text-[clamp(1.5rem,5vw,3.5rem)] leading-none tracking-[-0.03em] font-display font-bold transition-colors group-hover:text-gold">
                        How it works
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-cream/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-10 space-y-6">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-[14px] bg-cream text-burgundy text-[12px] font-mono uppercase tracking-[0.14em] transition-colors hover:bg-[#F0E8DE] active:scale-[0.97]"
            >
              <User className="h-4 w-4 text-burgundy" />
              <span>Sign in</span>
            </Link>
            <div className="text-cream/70 text-sm">
              <div className="label">Are you a chef?</div>
              <Link href="/for-chefs" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-1.5 text-cream hover:text-gold transition-colors">
                <span>Apply to join</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
