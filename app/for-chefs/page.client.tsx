"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import {
  CinematicHero,
  Reveal,
  Section,
} from "@/components/ui-lafs";
import { FOR_CHEFS_CONTENT, EQUIPMENT_REQUIREMENTS, type EquipmentRequirement } from "@/data/site-content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO = IMG("photo-1556909114-f6e7ad7d3136", 2200);

const benefits = [
  { n: "01", t: "Set your own prices", b: "You decide what your time and talent are worth. Set package prices that reflect your experience." },
  { n: "02", t: "Build your reputation", b: "Every booking builds your profile with real guest reviews. The better you cook, the more you're discovered." },
  { n: "03", t: "We handle the rest", b: "Payments, scheduling, and guest communication all happen through the platform. You focus on the food." },
];

const steps = [
  { n: "01", t: "Apply", b: "Tell us about your cuisine, your experience, and your style." },
  { n: "02", t: "Get approved", b: "We review every application to maintain quality for guests." },
  { n: "03", t: "Publish your gigs", b: "Create packages with your menus, pricing, and availability." },
  { n: "04", t: "Start cooking", b: "Guests book you directly. You get paid after every dinner." },
];

const testimonials = [
  {
    quote: "I set my own hours, cook my own menus, and get paid within 48 hours of every dinner. It's the freedom I couldn't find in restaurant work.",
    name: "Elena M.",
    role: "Italian · New York",
  },
  {
    quote: "The platform brought me guests who actually cared about my cuisine. I've built a following I never had cooking in someone else's kitchen.",
    name: "Amara O.",
    role: "Modern Nigerian · London",
  },
  {
    quote: "Everything I need — bookings, payments, reviews — in one place. I just show up and cook.",
    name: "Leon P.",
    role: "Modern Korean · Seoul",
  },
];

export default function ForChefs() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <CinematicHero
        image={HERO}
        badge="For Private Chefs"
        headline={"Your kitchen.\nYour menu.\nYour clients."}
        caption="Join a marketplace built for independent chefs. Set your own prices, publish your own menus, and connect with guests who value your craft."
        height="compact"
      >
        <button
          type="button"
          onClick={() => { setSubmitted(false); setOpen(true); }}
          className="group/cta inline-flex h-[46px] cursor-pointer items-center gap-2.5 rounded-[16px] bg-cream text-burgundy border border-cream px-1.5 pr-5 text-[13px] font-medium tracking-tight transition-all duration-200 hover:bg-[#F0E8DE] active:scale-[0.97]"
        >
          <span className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[12px] bg-burgundy text-cream">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
              <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>Apply to cook</span>
        </button>
      </CinematicHero>

      {/* N°01 — Why */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label text-ink/60">N°01 · Why Love at First Sight</div>
              <h2 className="mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                <span className="block">Cook on</span>
                <span className="block text-ink/50">your terms.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-ink/15">
              {benefits.map((b, i) => (
                <Reveal key={b.n} delay={i * 80}>
                  <li className="border-b border-ink/15 py-10">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline">
                      <span className="num text-ink/50 shrink-0">{b.n}</span>
                      <div className="min-w-0">
                        <div className="font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-ink">{b.t}</div>
                        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">{b.b}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* N°02 — How it works */}
      <Section tone="burgundy">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°02 · How it works</div>
              <h2 className="mt-8 text-stack">
                <span className="block">Four steps</span>
                <span className="block">to your first</span>
                <span className="block text-cream/50">booking.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <li className="border-b border-cream/15 py-10">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline">
                      <span className="num text-cream/50 shrink-0">{s.n}</span>
                      <div className="min-w-0">
                        <div className="font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-cream">{s.t}</div>
                        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/70">{s.b}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* N°03 — The split */}
      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <div className="label text-ink/60">N°03 · The split</div>
              <h2 className="mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                <span className="block">You keep</span>
                <span className="block text-ink/50">85%.</span>
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink/70">
                For every booking, you receive 85% of the package price. The platform keeps 15% to cover payment processing, guest support, and marketing that brings diners to your profile.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={120}>
              <div className="text-center md:text-right">
                <div className="font-display font-bold text-ink leading-none tracking-[-0.05em]" style={{ fontSize: "clamp(9rem, 24vw, 22rem)" }}>
                  85<span className="text-ink/40">%</span>
                </div>
                <div className="mt-4 label text-ink/50">to the chef · every booking</div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* N°04 — Testimonials */}
      <Section tone="burgundy">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°04 · From our chefs</div>
              <h2 className="mt-8 text-stack">
                <span className="block">In their</span>
                <span className="block text-cream/50">words.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-14">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-t border-cream/15 pt-8 md:gap-8">
                  <div className="num shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</div>
                  <div className="min-w-0">
                    <blockquote className="font-display font-bold text-[clamp(1.1rem,1.8vw,1.55rem)] leading-[1.3] tracking-[-0.02em] text-cream">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70">
                      {t.name} — {t.role}
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* N°05 — Why Partner With Us */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label text-ink/60">N°05 · Why Partner With Us</div>
              <h2 className="mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                <span className="block">Six reasons</span>
                <span className="block text-ink/50">to join us.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 border-t border-ink/15">
              {FOR_CHEFS_CONTENT.whyPartner.map((item, i) => (
                <Reveal key={item.t} delay={i * 60}>
                  <li className="border-b border-ink/15 py-6">
                    <div className="font-display font-bold lowercase text-xl tracking-[-0.02em] text-ink">{item.t}</div>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{item.b}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* N°06 — Founding Signature Benefits */}
      <Section tone="burgundy-deep">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°06 · Founding Signature Benefits</div>
              <h2 className="mt-8 text-stack">
                <span className="block">For our</span>
                <span className="block">founding</span>
                <span className="block text-cream/50">chefs.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {FOR_CHEFS_CONTENT.foundingBenefits.map((b, i) => (
                <Reveal key={b.t} delay={i * 80}>
                  <li className="border-b border-cream/15 py-10">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline">
                      <span className="num text-cream/50 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0">
                        <div className="font-display font-bold lowercase text-2xl md:text-[26px] tracking-[-0.02em] text-cream">{b.t}</div>
                        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-cream/75">{b.b}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* N°07 — Our Standards */}
      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label text-ink/60">N°07 · Our Standards</div>
              <h2 className="mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink">
                <span className="block">What we</span>
                <span className="block text-ink/50">expect.</span>
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink/70">
                Every chef on the platform holds themselves to these seven standards. Every booking, every kitchen, every guest.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="flex flex-wrap gap-3">
              {FOR_CHEFS_CONTENT.standards.map((s, i) => (
                <Reveal key={s} delay={i * 50}>
                  <li className="inline-flex items-center gap-3 rounded-[12px] border border-ink/20 bg-white px-5 py-3 text-[14px] text-ink">
                    <span className="font-mono uppercase tracking-[0.14em] text-ink/40 text-[10.5px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{s}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* N°08 — Chef Pledge */}
      <Section tone="burgundy">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="label">N°08 · The Chef Pledge</div>
              <h2 className="mt-8 text-stack">
                <span className="block">A promise,</span>
                <span className="block text-cream/50">signed.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-cream/15">
              {FOR_CHEFS_CONTENT.chefPledge.items.map((line, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className="border-b border-cream/15 py-6">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-start">
                      <CheckCircle2 className="shrink-0 mt-1 text-gold" size={20} strokeWidth={1.5} />
                      <p className="text-[16px] leading-[1.65] text-cream/85">{line}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={FOR_CHEFS_CONTENT.chefPledge.items.length * 60}>
              <p className="mt-10 font-display font-bold italic text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.02em] text-cream max-w-xl">
                &ldquo;{FOR_CHEFS_CONTENT.chefPledge.closing}&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* N°09 — CTA */}
      <Section tone="paper">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="label text-ink/60">N°09 · Ready?</div>
            <h2 className="mt-8 font-display font-bold text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-ink">
              <span className="block">Bring your</span>
              <span className="block">kitchen to</span>
              <span className="block text-ink/50">the world.</span>
            </h2>
            <p className="mt-10 max-w-lg mx-auto text-[16px] leading-relaxed text-ink/70">
              We're onboarding chefs in select cities. Apply today and we'll be in touch within 48 hours.
            </p>
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => { setSubmitted(false); setOpen(true); }}
                className="group/cta relative inline-flex h-[44px] cursor-pointer items-center gap-2.5 rounded-[16px] bg-burgundy text-cream border border-burgundy shadow-[0_14px_36px_-14px_rgba(0,0,0,0.55)] px-1.5 pr-4 text-[13px] font-medium tracking-tight transition-all duration-200 hover:bg-burgundy-deep hover:border-burgundy-deep active:scale-[0.97]"
              >
                <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-cream text-burgundy">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                    <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Apply Now</span>
              </button>
            </div>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link href="/chef-handbook" className="text-[12px] font-mono uppercase tracking-[0.14em] text-ink/60 hover:text-ink transition-colors">
                Chef handbook →
              </Link>
              <Link href="/payouts" className="text-[12px] font-mono uppercase tracking-[0.14em] text-ink/60 hover:text-ink transition-colors">
                Payouts →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <ApplicationDialog open={open} setOpen={setOpen} submitted={submitted} setSubmitted={setSubmitted} />
    </>
  );
}

type Dish = { name: string; note: string };
type ChefApplication = {
  name: string; email: string; phone: string; city: string;
  travel: string; url: string;
  cuisine: string; years: string; headline: string; bio: string;
  signatureDishes: Dish[]; offersCustomMenu: "yes" | "no" | "";
  sample: { name: string; courses: string; price: string; inclusions: string };
  portraitName: string; galleryNames: string[];
  hasFoodSafety: "yes" | "no" | ""; foodSafetyCertName: string; foodSafetyExpiry: string;
  background: string; businessName: string;
  hasInsurance: "yes" | "no" | "";
  equipment: EquipmentRequirement[]; availabilityDays: string[]; leadTime: string;
  pledge: boolean; consent: boolean;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const LEAD_TIMES = ["48 hours", "1 week", "2 weeks", "1 month+"];
const TRAVEL = ["My city only", "Up to 25 mi", "Up to 50 mi", "Regional"];
const YEARS = ["1–3", "3–5", "5–10", "10+"];

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const urlOk = (u: string) => !u || /^https?:\/\/\S+\.\S+/.test(u);
const phoneOk = (p: string) => p.replace(/\D/g, "").length >= 7;

function ApplicationDialog({ open, setOpen, submitted, setSubmitted }: { open: boolean; setOpen: (v: boolean) => void; submitted: boolean; setSubmitted: (v: boolean) => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [f, setF] = useState<ChefApplication>({
    name: "", email: "", phone: "", city: "", travel: "", url: "",
    cuisine: "", years: "", headline: "", bio: "",
    signatureDishes: [{ name: "", note: "" }],
    offersCustomMenu: "",
    sample: { name: "", courses: "", price: "", inclusions: "" },
    portraitName: "", galleryNames: [],
    hasFoodSafety: "", foodSafetyCertName: "", foodSafetyExpiry: "",
    background: "", businessName: "",
    hasInsurance: "",
    equipment: [], availabilityDays: [], leadTime: "",
    pledge: false, consent: false,
  });
  const set = <K extends keyof ChefApplication>(k: K, v: ChefApplication[K]) => setF((s) => ({ ...s, [k]: v }));

  const step1Valid =
    f.name.trim().length > 1 && emailOk(f.email) && phoneOk(f.phone) &&
    f.city.trim().length > 1 && !!f.travel && urlOk(f.url);
  const step2Valid =
    f.cuisine.trim().length > 1 && !!f.years &&
    f.headline.trim().length > 3 && f.headline.length <= 90 &&
    f.bio.trim().length >= 120 &&
    f.signatureDishes.filter((d) => d.name.trim()).length >= 1 &&
    f.offersCustomMenu !== "";
  const step3Valid =
    !!f.portraitName &&
    f.hasFoodSafety !== "" &&
    f.hasInsurance !== "" &&
    f.availabilityDays.length >= 1 && !!f.leadTime &&
    f.pledge && f.consent;

  const currentValid = step === 1 ? step1Valid : step === 2 ? step2Valid : step3Valid;
  const canSubmit = step1Valid && step2Valid && step3Valid;

  const reset = () => {
    setStep(1); setSubmitting(false); setShowErrors(false);
    setF({
      name: "", email: "", phone: "", city: "", travel: "", url: "",
      cuisine: "", years: "", headline: "", bio: "",
      signatureDishes: [{ name: "", note: "" }], offersCustomMenu: "",
      sample: { name: "", courses: "", price: "", inclusions: "" },
      portraitName: "", galleryNames: [],
      hasFoodSafety: "", foodSafetyCertName: "", foodSafetyExpiry: "",
      background: "", businessName: "", hasInsurance: "",
      equipment: [], availabilityDays: [], leadTime: "",
      pledge: false, consent: false,
    });
  };

  const handleNext = () => {
    if (!currentValid) { setShowErrors(true); return; }
    setShowErrors(false);
    setStep((s) => (s === 3 ? s : ((s + 1) as 1 | 2 | 3)));
  };
  const handleBack = () => { setShowErrors(false); setStep((s) => (s === 1 ? s : ((s - 1) as 1 | 2 | 3))); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) { setShowErrors(true); return; }
    setSubmitting(true);
    const payload: ChefApplication = f;
    console.info("chefApplication", payload);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 700);
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setTimeout(reset, 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-burgundy-deep text-cream border-cream/10 max-w-2xl max-h-[92vh] overflow-y-auto p-8 md:p-10">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between pr-8">
                <div className="label text-cream/50">Chef application</div>
                <div className="label text-cream/50">N°0{step} / 03</div>
              </div>
              <DialogTitle className="mt-4 font-display font-bold text-3xl md:text-4xl lowercase tracking-[-0.02em] text-cream">
                {step === 1 ? "About you" : step === 2 ? "Your cooking" : "Credentials & kitchen"}
              </DialogTitle>
              <DialogDescription className="text-cream/65 leading-relaxed">
                We read every application by hand. Expect to hear back inside 48 hours.
              </DialogDescription>
              <div className="mt-6 hidden md:flex gap-1.5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={`h-[2px] flex-1 ${n <= step ? "bg-gold" : "bg-cream/15"}`} />
                ))}
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {step === 1 && (
                <Step1 f={f} set={set} showErrors={showErrors} />
              )}
              {step === 2 && (
                <Step2 f={f} set={set} showErrors={showErrors} />
              )}
              {step === 3 && (
                <Step3 f={f} set={set} showErrors={showErrors} />
              )}

              <DialogFooter className="mt-8 gap-3 sm:justify-between pt-6 border-t border-cream/10">
                <div className="flex gap-3">
                  <button type="button" onClick={() => handleOpenChange(false)} className="inline-flex h-11 items-center rounded-[12px] border border-cream/25 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70 hover:border-cream/60 transition-colors">
                    Cancel
                  </button>
                  {step > 1 && (
                    <button type="button" onClick={handleBack} className="inline-flex h-11 items-center rounded-[12px] border border-cream/25 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:border-cream/60 transition-colors">
                      Back
                    </button>
                  )}
                </div>
                {step < 3 ? (
                  <button type="button" onClick={handleNext} disabled={!currentValid} className="inline-flex h-11 items-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy-deep hover:bg-cream/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Next
                  </button>
                ) : (
                  <button type="submit" disabled={!canSubmit || submitting} className="inline-flex h-11 items-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy-deep hover:bg-cream/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                )}
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="mt-6 font-display font-bold text-4xl lowercase tracking-[-0.02em] text-cream text-center">
                thank you.
              </DialogTitle>
              <DialogDescription className="text-cream/65 text-[14px] leading-relaxed pt-3 max-w-sm mx-auto text-center">
                Your application is with us. We read every one — expect a reply inside 48 hours.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Link href="/chef-handbook" onClick={() => handleOpenChange(false)} className="inline-flex h-11 items-center rounded-[12px] border border-cream/25 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:border-cream/60 transition-colors">
                Read the handbook
              </Link>
              <button onClick={() => handleOpenChange(false)} className="inline-flex h-11 items-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy-deep hover:bg-cream/90 transition-colors">
                Close
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

type StepProps = {
  f: ChefApplication;
  set: <K extends keyof ChefApplication>(k: K, v: ChefApplication[K]) => void;
  showErrors: boolean;
};

const inputCls = "mt-2 h-11 bg-cream/[0.04] border-cream/20 text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20";
const labelCls = "label text-cream/60";
const errCls = "mt-1 text-[11px] text-gold";

function Step1({ f, set, showErrors }: StepProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <Label htmlFor="ap-name" className={labelCls}>Full name</Label>
        <Input id="ap-name" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" className={inputCls} />
        {showErrors && f.name.trim().length < 2 && <p className={errCls}>Enter your full name.</p>}
      </div>
      <div>
        <Label htmlFor="ap-email" className={labelCls}>Email</Label>
        <Input id="ap-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@kitchen.com" className={inputCls} />
        {showErrors && !emailOk(f.email) && <p className={errCls}>Enter a valid email address.</p>}
      </div>
      <div>
        <Label htmlFor="ap-phone" className={labelCls}>Phone</Label>
        <Input id="ap-phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 555 5555" className={inputCls} />
        {showErrors && !phoneOk(f.phone) && <p className={errCls}>Enter a valid phone number.</p>}
      </div>
      <div>
        <Label htmlFor="ap-city" className={labelCls}>Primary city</Label>
        <Input id="ap-city" value={f.city} onChange={(e) => set("city", e.target.value)} placeholder="New York" className={inputCls} />
        {showErrors && f.city.trim().length < 2 && <p className={errCls}>Enter your primary city.</p>}
      </div>
      <div>
        <Label className={labelCls}>Willing to travel</Label>
        <Select value={f.travel} onValueChange={(v) => set("travel", v)}>
          <SelectTrigger className={`${inputCls} data-[placeholder]:text-cream/40`}>
            <SelectValue placeholder="Select radius" />
          </SelectTrigger>
          <SelectContent className="bg-cream text-ink border-ink/15">
            {TRAVEL.map((t) => (
              <SelectItem key={t} value={t} className="text-ink focus:bg-blush/50 focus:text-ink">{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showErrors && !f.travel && <p className={errCls}>Choose a travel radius.</p>}
      </div>
      <div className="col-span-2">
        <Label htmlFor="ap-url" className={labelCls}>Instagram / portfolio / website <span className="text-cream/40">(optional)</span></Label>
        <Input id="ap-url" type="url" value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://instagram.com/yourhandle" className={inputCls} />
        {showErrors && !urlOk(f.url) && <p className={errCls}>Enter a valid URL, or leave blank.</p>}
      </div>
    </div>
  );
}

function Step2({ f, set, showErrors }: StepProps) {
  const dishesText = f.signatureDishes.map((d) => d.name).filter(Boolean).join("\n");
  const onDishesChange = (v: string) => {
    const lines = v.split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 5);
    set("signatureDishes", lines.length ? lines.map((name) => ({ name, note: "" })) : [{ name: "", note: "" }]);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <Label htmlFor="ap-cuisine" className={labelCls}>Cuisine / specialty</Label>
        <Input id="ap-cuisine" value={f.cuisine} onChange={(e) => set("cuisine", e.target.value)} placeholder="e.g. Modern Italian, kaiseki, live-fire" className={inputCls} />
        {showErrors && f.cuisine.trim().length < 2 && <p className={errCls}>Tell us your cuisine or specialty.</p>}
      </div>
      <div>
        <Label className={labelCls}>Years of experience</Label>
        <Select value={f.years} onValueChange={(v) => set("years", v)}>
          <SelectTrigger className={`${inputCls} data-[placeholder]:text-cream/40`}>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-cream text-ink border-ink/15">
            {YEARS.map((y) => (
              <SelectItem key={y} value={y} className="text-ink focus:bg-blush/50 focus:text-ink">{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showErrors && !f.years && <p className={errCls}>Choose an experience range.</p>}
      </div>
      <div>
        <Label className={labelCls}>Custom menus?</Label>
        <Select value={f.offersCustomMenu} onValueChange={(v) => set("offersCustomMenu", v as "yes" | "no")}>
          <SelectTrigger className={`${inputCls} data-[placeholder]:text-cream/40`}>
            <SelectValue placeholder="Yes or no" />
          </SelectTrigger>
          <SelectContent className="bg-cream text-ink border-ink/15">
            <SelectItem value="yes" className="text-ink focus:bg-blush/50 focus:text-ink">Yes, on request</SelectItem>
            <SelectItem value="no" className="text-ink focus:bg-blush/50 focus:text-ink">No, set menus only</SelectItem>
          </SelectContent>
        </Select>
        {showErrors && !f.offersCustomMenu && <p className={errCls}>Choose yes or no.</p>}
      </div>
      <div className="col-span-2">
        <Label htmlFor="ap-headline" className={labelCls}>One-line headline <span className="text-cream/40">({f.headline.length}/90)</span></Label>
        <Input id="ap-headline" value={f.headline} maxLength={90} onChange={(e) => set("headline", e.target.value)} placeholder="Roman pasta and long, unhurried evenings." className={inputCls} />
        {showErrors && f.headline.trim().length < 4 && <p className={errCls}>Write a short headline.</p>}
      </div>
      <div className="col-span-2">
        <Label htmlFor="ap-bio" className={labelCls}>Short bio <span className="text-cream/40">(min 120 chars — {f.bio.length})</span></Label>
        <Textarea id="ap-bio" value={f.bio} onChange={(e) => set("bio", e.target.value)} rows={4} placeholder="Where you trained, how you cook, what you'd bring to a private table…" className="mt-2 bg-cream/[0.04] border-cream/20 text-cream placeholder:text-cream/40" />
        {showErrors && f.bio.trim().length < 120 && <p className={errCls}>Please write at least 120 characters.</p>}
      </div>
      <div className="col-span-2">
        <Label htmlFor="ap-dishes" className={labelCls}>Signature dishes <span className="text-cream/40">(one per line, up to 5)</span></Label>
        <Textarea id="ap-dishes" value={dishesText} onChange={(e) => onDishesChange(e.target.value)} rows={4} placeholder={"Cacio e pepe\nWood-fired branzino\nTiramisu"} className="mt-2 bg-cream/[0.04] border-cream/20 text-cream placeholder:text-cream/40" />
        {showErrors && f.signatureDishes.filter((d) => d.name.trim()).length < 1 && <p className={errCls}>Add at least one signature dish.</p>}
        <p className="mt-2 text-[11px] text-cream/40">Sample packages and pricing come later — you'll set those in the chef dashboard after approval.</p>
      </div>
    </div>
  );
}

function Step3({ f, set, showErrors }: StepProps) {
  const MAX = 10 * 1024 * 1024;
  const okImage = (file: File) => /^image\/(jpeg|png|webp)$/.test(file.type) && file.size <= MAX;
  const [portraitErr, setPortraitErr] = useState<string>("");

  const onPortrait = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!okImage(file)) { setPortraitErr("Use a JPG, PNG or WEBP under 10MB."); return; }
    setPortraitErr(""); set("portraitName", file.name);
  };
  const toggle = <T,>(list: T[], v: T): T[] => list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <Label className={labelCls}>Profile photo</Label>
        <label className="mt-2 flex h-11 items-center justify-between rounded-[12px] border border-dashed border-cream/25 bg-cream/[0.04] px-4 text-[12px] text-cream/70 hover:border-cream/60 cursor-pointer">
          <span className="truncate">{f.portraitName || "Choose an image (JPG/PNG/WEBP, ≤10MB)"}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onPortrait} />
        </label>
        {portraitErr && <p className={errCls}>{portraitErr}</p>}
        {showErrors && !f.portraitName && <p className={errCls}>Upload a profile photo.</p>}
      </div>

      <div>
        <Label className={labelCls}>Food-safety cert</Label>
        <Select value={f.hasFoodSafety} onValueChange={(v) => set("hasFoodSafety", v as "yes" | "no")}>
          <SelectTrigger className={`${inputCls} data-[placeholder]:text-cream/40`}>
            <SelectValue placeholder="Yes or no" />
          </SelectTrigger>
          <SelectContent className="bg-cream text-ink border-ink/15">
            <SelectItem value="yes" className="text-ink focus:bg-blush/50 focus:text-ink">Yes</SelectItem>
            <SelectItem value="no" className="text-ink focus:bg-blush/50 focus:text-ink">No</SelectItem>
          </SelectContent>
        </Select>
        {showErrors && !f.hasFoodSafety && <p className={errCls}>Answer yes or no.</p>}
      </div>
      <div>
        <Label className={labelCls}>Liability insurance</Label>
        <Select value={f.hasInsurance} onValueChange={(v) => set("hasInsurance", v as "yes" | "no")}>
          <SelectTrigger className={`${inputCls} data-[placeholder]:text-cream/40`}>
            <SelectValue placeholder="Yes or no" />
          </SelectTrigger>
          <SelectContent className="bg-cream text-ink border-ink/15">
            <SelectItem value="yes" className="text-ink focus:bg-blush/50 focus:text-ink">Yes</SelectItem>
            <SelectItem value="no" className="text-ink focus:bg-blush/50 focus:text-ink">No</SelectItem>
          </SelectContent>
        </Select>
        {showErrors && !f.hasInsurance && <p className={errCls}>Answer yes or no.</p>}
      </div>

      <div>
        <Label className={labelCls}>Typical lead time</Label>
        <Select value={f.leadTime} onValueChange={(v) => set("leadTime", v)}>
          <SelectTrigger className={`${inputCls} data-[placeholder]:text-cream/40`}>
            <SelectValue placeholder="Select lead time" />
          </SelectTrigger>
          <SelectContent className="bg-cream text-ink border-ink/15">
            {LEAD_TIMES.map((t) => (
              <SelectItem key={t} value={t} className="text-ink focus:bg-blush/50 focus:text-ink">{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showErrors && !f.leadTime && <p className={errCls}>Choose a lead time.</p>}
      </div>
      <div>
        <Label className={labelCls}>Available days</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {DAYS.map((d) => {
            const on = f.availabilityDays.includes(d);
            return (
              <button key={d} type="button" onClick={() => set("availabilityDays", toggle(f.availabilityDays, d))} className={`h-11 min-w-[44px] rounded-[10px] border px-2 text-[11px] font-mono uppercase tracking-[0.12em] transition-colors ${on ? "border-gold bg-gold text-burgundy-deep" : "border-cream/20 text-cream hover:border-cream/50"}`}>
                {d}
              </button>
            );
          })}
        </div>
        {showErrors && f.availabilityDays.length < 1 && <p className={errCls}>Pick at least one day.</p>}
      </div>

      <div className="col-span-2 space-y-3 pt-2">
        <label className="flex items-start gap-3 text-[13px] text-cream/80 leading-relaxed cursor-pointer group">
          <button
            type="button"
            role="checkbox"
            aria-checked={f.pledge}
            onClick={() => set("pledge", !f.pledge)}
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-all duration-200 cursor-pointer",
              f.pledge
                ? "border-gold bg-gold text-burgundy-deep shadow-sm"
                : "border-cream/30 bg-cream/[0.06] hover:border-gold/60 text-transparent"
            )}
          >
            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
          <span className="select-none group-hover:text-cream transition-colors">
            I agree to serve every client with professionalism and maintain food-safety standards.
          </span>
        </label>
        <label className="flex items-start gap-3 text-[13px] text-cream/80 leading-relaxed cursor-pointer group">
          <button
            type="button"
            role="checkbox"
            aria-checked={f.consent}
            onClick={() => set("consent", !f.consent)}
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-all duration-200 cursor-pointer",
              f.consent
                ? "border-gold bg-gold text-burgundy-deep shadow-sm"
                : "border-cream/30 bg-cream/[0.06] hover:border-gold/60 text-transparent"
            )}
          >
            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
          <span className="select-none group-hover:text-cream transition-colors">
            I consent to being contacted about my application.
          </span>
        </label>
        {showErrors && (!f.pledge || !f.consent) && <p className={errCls}>Both checkboxes are required.</p>}
        <p className="text-[11px] text-cream/40 pt-1">Equipment needs, gallery photos and business details are collected in the chef dashboard after approval.</p>
      </div>
    </div>
  );
}
