"use client";

import * as React from "react";
import { useMemo, useState, Suspense, useEffect, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon, CreditCard, Lock, Sparkles, Check, ChevronRight, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Reveal } from "@/components/ui-lafs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { chefs, getChef, occasions } from "@/data/chefs";

const ALL_STEPS = ["evening", "chef", "payment"] as const;
type Step = (typeof ALL_STEPS)[number];

const formatTime12h = (t?: string) => {
  if (!t) return undefined;
  const parts = t.split(":");
  const h = parseInt(parts[0], 10);
  const m = parts[1] || "00";
  if (isNaN(h)) return t;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const hStr = String(h12).padStart(2, "0");
  return `${hStr}:${m} ${ampm}`;
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-burgundy text-cream">
          <div className="label">loading reservation...</div>
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}

const STEP_LABELS: Record<Step, string> = {
  evening: "The evening",
  chef: "Chef & menu",
  payment: "Contact & pay",
};

function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const occasion = searchParams.get("occasion") || undefined;
  const chefSlug = searchParams.get("chef") || undefined;
  const packageId = searchParams.get("packageId") || undefined;
  const date = searchParams.get("date") || undefined;
  const time = searchParams.get("time") || undefined;

  let stepParam = searchParams.get("step") || "evening";
  if (stepParam === "occasion" || stepParam === "when") {
    stepParam = "evening";
  } else if (stepParam === "package") {
    stepParam = "chef";
  }
  if (!ALL_STEPS.includes(stepParam as Step)) {
    stepParam = "evening";
  }
  const step = stepParam as Step;
  const steps: Step[] = ["evening", "chef", "payment"];
  const stepIdx = Math.max(0, steps.indexOf(step));
  const [success, setSuccess] = useState(false);

  // Lifted selection states for real-time card preview updates
  const [draftOccasion, setDraftOccasion] = useState<string | undefined>(occasion);
  const [draftDate, setDraftDate] = useState<string | undefined>(date);
  const [draftTime, setDraftTime] = useState<string | undefined>(time || "19:00:00");
  const [draftChefSlug, setDraftChefSlug] = useState<string | undefined>(chefSlug);
  const [draftPackageId, setDraftPackageId] = useState<string | undefined>(packageId);

  useEffect(() => {
    setDraftOccasion(occasion);
    setDraftDate(date);
    setDraftTime(time || "19:00:00");
    setDraftChefSlug(chefSlug);
    setDraftPackageId(packageId);
  }, [occasion, date, time, chefSlug, packageId]);

  const goto = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const back = () => {
    if (stepIdx > 0) goto({ step: steps[stepIdx - 1] });
  };

  const selectedChef = chefSlug ? getChef(chefSlug) : undefined;
  const selectedPackage = useMemo(() => {
    if (!selectedChef || !packageId) return undefined;
    return selectedChef.packages.find((p) => p.id === packageId);
  }, [selectedChef, packageId]);

  // Derived previews from real-time draft states
  const previewChef = draftChefSlug ? getChef(draftChefSlug) : undefined;
  const previewPackage = useMemo(() => {
    if (!previewChef || !draftPackageId) return undefined;
    return previewChef.packages.find((p) => p.id === draftPackageId);
  }, [previewChef, draftPackageId]);

  const previewOccasionLabel = occasions.find((o) => o.id === draftOccasion)?.label ?? "an evening";
  const occasionLabel = occasions.find((o) => o.id === occasion)?.label ?? "an evening";

  return (
    <div className="min-h-screen bg-burgundy-deep text-cream">
      {/* Slim top bar — no site navbar */}
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-burgundy-deep/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 h-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70 hover:text-cream transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Love at First Sight
          </Link>
          <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/60 tabular-nums">
            Step {stepIdx + 1} of {steps.length} · {STEP_LABELS[step]}
          </div>
        </div>
        <div className="h-[2px] w-full bg-cream/[0.06]">
          <div
            className="h-full bg-gold transition-[width] duration-500 ease-out"
            style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 md:px-8 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_360px]">
          {/* Form column — paper card */}
          <div className="cursor-native rounded-[18px] bg-paper text-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="p-6 md:p-10">
              <div key={step} className="animate-[fadein_260ms_ease-out]">
                {step === "evening" && (
                  <EveningStep
                    occasion={draftOccasion}
                    setOccasion={setDraftOccasion}
                    date={draftDate}
                    setDate={setDraftDate}
                    time={draftTime}
                    setTime={setDraftTime}
                    onNext={(o, d, t) => goto({ occasion: o, date: d, time: t, step: "chef" })}
                  />
                )}
                {step === "chef" && (
                  <ChefMenuStep
                    chefSlug={chefSlug}
                    packageId={packageId}
                    selectedChef={draftChefSlug}
                    setSelectedChef={setDraftChefSlug}
                    selectedPkg={draftPackageId}
                    setSelectedPkg={setDraftPackageId}
                    onNext={(slug, pkgId) => goto({ chef: slug, packageId: pkgId, step: "payment" })}
                    onChangeChef={() => goto({ chef: undefined, packageId: undefined })}
                  />
                )}
                {step === "payment" && (
                  <PaymentStep
                    chef={selectedChef}
                    pkg={selectedPackage}
                    occasionLabel={previewOccasionLabel}
                    date={date}
                    time={time}
                    onBackToChef={() => goto({ step: "chef" })}
                    onBackToEvening={() => goto({ step: "evening" })}
                    onSuccess={() => setSuccess(true)}
                  />
                )}
              </div>
            </div>
            {stepIdx > 0 && (
              <div className="flex items-center justify-between border-t border-ink/10 px-6 md:px-10 py-4 bg-ink/[0.02]">
                <button
                  onClick={back}
                  className="text-[12px] font-mono uppercase tracking-[0.14em] text-ink/55 hover:text-ink transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink/40">Progress saved</div>
              </div>
            )}
          </div>

          {/* Live "physical card" preview */}
          <aside className="md:sticky md:top-24 self-start">
            <EveningCard
              stepIdx={stepIdx}
              occasionLabel={previewOccasionLabel}
              date={draftDate}
              time={draftTime}
              chef={previewChef}
              pkg={previewPackage}
            />
            <p className="mt-4 text-center text-[10.5px] font-mono uppercase tracking-[0.14em] text-cream/45">
              Free cancellation up to 48h · Secure payment
            </p>
          </aside>
        </div>
      </main>

      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        chef={selectedChef}
        pkg={selectedPackage}
        occasionLabel={occasionLabel}
        date={date}
        time={time}
      />
    </div>
  );
}

function StepTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-burgundy">{eyebrow}</div>
      <h2 className="mt-2 font-display font-bold text-[26px] md:text-[32px] tracking-[-0.03em] text-ink leading-[1.05] lowercase">
        {title}
      </h2>
      {sub && <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">{sub}</p>}
    </div>
  );
}

function PrimaryButton({
  children,
  disabled,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-burgundy px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream transition-all hover:bg-burgundy-deep active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-ink/55 mb-2">{children}</div>;
}

// ─── CUSTOM TIME PICKER INPUT (SHADCN DESIGN) ───────────────────
function TimePickerInput({
  value,
  onChange,
}: {
  value?: string;
  onChange: (val: string) => void;
}) {
  const parseTime = (t?: string) => {
    if (!t) return { h: "07", m: "00", s: "00", ampm: "PM" };
    const parts = t.split(":");
    let h24 = parseInt(parts[0], 10);
    if (isNaN(h24)) h24 = 19;
    const mStr = parts[1] || "00";
    const sStr = parts[2] || "00";
    const ampm = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 || 12;
    const hStr = String(h12).padStart(2, "0");
    return {
      h: hStr,
      m: mStr.slice(0, 2).padStart(2, "0"),
      s: sStr.slice(0, 2).padStart(2, "0"),
      ampm,
    };
  };

  const formatTime24h = (h: string, m: string, s: string, ampm: string) => {
    let hNum = parseInt(h, 10);
    if (isNaN(hNum)) hNum = 12;
    if (ampm === "PM" && hNum < 12) hNum += 12;
    if (ampm === "AM" && hNum === 12) hNum = 0;
    const hStr = String(hNum).padStart(2, "0");
    const mStr = String(parseInt(m, 10) || 0).padStart(2, "0");
    const sStr = String(parseInt(s, 10) || 0).padStart(2, "0");
    return `${hStr}:${mStr}:${sStr}`;
  };

  const { h, m, s, ampm } = parseTime(value);
  const [hVal, setHVal] = useState(h);
  const [mVal, setMVal] = useState(m);
  const [sVal, setSVal] = useState(s);
  const [ampmVal, setAmpmVal] = useState(ampm);

  useEffect(() => {
    const parsed = parseTime(value);
    setHVal(parsed.h);
    setMVal(parsed.m);
    setSVal(parsed.s);
    setAmpmVal(parsed.ampm);
  }, [value]);

  const hourRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  const secRef = useRef<HTMLInputElement>(null);

  const updateParent = (newH: string, newM: string, newS: string, newAmpm: string) => {
    const formatted = formatTime24h(newH, newM, newS, newAmpm);
    onChange(formatted);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val !== "") {
      const num = parseInt(val, 10);
      if (num > 12) val = "12";
      if (num === 0) val = "01";
    }
    setHVal(val);
    updateParent(val, mVal, sVal, ampmVal);
    if (val.length === 2 && minRef.current) {
      minRef.current.focus();
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val !== "") {
      const num = parseInt(val, 10);
      if (num > 59) val = "59";
    }
    setMVal(val);
    updateParent(hVal, val, sVal, ampmVal);
    if (val.length === 2 && secRef.current) {
      secRef.current.focus();
    }
  };

  const handleSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val !== "") {
      const num = parseInt(val, 10);
      if (num > 59) val = "59";
    }
    setSVal(val);
    updateParent(hVal, mVal, val, ampmVal);
  };

  const handleAmpmChange = (val: "AM" | "PM") => {
    setAmpmVal(val);
    updateParent(hVal, mVal, sVal, val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: "h" | "m" | "s") => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      if (field === "m" && hourRef.current) {
        hourRef.current.focus();
      } else if (field === "s" && minRef.current) {
        minRef.current.focus();
      }
    }
  };

  return (
    <div className="flex items-center gap-1.5 h-11 rounded-[10px] border border-ink/15 bg-white px-3.5 text-[14px] text-ink hover:border-ink/40 focus-within:ring-2 focus-within:ring-burgundy/15 focus-within:border-burgundy w-full transition-all">
      {/* Hour Input */}
      <input
        ref={hourRef}
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        maxLength={2}
        value={hVal}
        onChange={handleHourChange}
        onKeyDown={(e) => handleKeyDown(e, "h")}
        className="w-6 text-center bg-transparent border-0 p-0 focus:ring-0 focus:outline-none font-mono text-[14.5px] text-ink select-all placeholder:text-ink/30"
        placeholder="07"
      />
      <span className="text-ink/30 font-mono select-none">:</span>
      {/* Minute Input */}
      <input
        ref={minRef}
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        maxLength={2}
        value={mVal}
        onChange={handleMinChange}
        onKeyDown={(e) => handleKeyDown(e, "m")}
        className="w-6 text-center bg-transparent border-0 p-0 focus:ring-0 focus:outline-none font-mono text-[14.5px] text-ink select-all placeholder:text-ink/30"
        placeholder="00"
      />
      <span className="text-ink/30 font-mono select-none">:</span>
      {/* Second Input */}
      <input
        ref={secRef}
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        maxLength={2}
        value={sVal}
        onChange={handleSecChange}
        onKeyDown={(e) => handleKeyDown(e, "s")}
        className="w-6 text-center bg-transparent border-0 p-0 focus:ring-0 focus:outline-none font-mono text-[14.5px] text-ink select-all placeholder:text-ink/30"
        placeholder="00"
      />

      {/* AM / PM Toggle switch */}
      <div className="ml-auto flex items-center border border-ink/10 rounded-md overflow-hidden bg-ink/[0.03]">
        <button
          type="button"
          onClick={() => handleAmpmChange("AM")}
          className={cn(
            "px-2 py-0.5 text-[11px] font-mono tracking-wider transition-all cursor-pointer select-none",
            ampmVal === "AM" ? "bg-burgundy text-cream font-bold" : "text-ink/50 hover:text-ink hover:bg-ink/[0.04]"
          )}
        >
          AM
        </button>
        <button
          type="button"
          onClick={() => handleAmpmChange("PM")}
          className={cn(
            "px-2 py-0.5 text-[11px] font-mono tracking-wider transition-all cursor-pointer select-none",
            ampmVal === "PM" ? "bg-burgundy text-cream font-bold" : "text-ink/50 hover:text-ink hover:bg-ink/[0.04]"
          )}
        >
          PM
        </button>
      </div>

      <Clock className="h-4 w-4 shrink-0 text-ink/35 ml-1 select-none" />
    </div>
  );
}

// ─── STEP 1 ─────────────────────────────────────────────────────
function EveningStep({
  occasion,
  setOccasion,
  date,
  setDate,
  time,
  setTime,
  onNext,
}: {
  occasion?: string;
  setOccasion: (val: string) => void;
  date?: string;
  setDate: (val: string | undefined) => void;
  time?: string;
  setTime: (val: string) => void;
  onNext: (occasion: string, date: string, time: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pickedOccasion = occasion;
  const setPickedOccasion = setOccasion;
  const pickedDate = date ? new Date(date + "T00:00:00") : undefined;
  const setPickedDate = (d: Date | undefined) => {
    if (d) {
      setDate(format(d, "yyyy-MM-dd"));
    } else {
      setDate(undefined);
    }
  };
  const pickedTime = time || "19:00:00";
  const setPickedTime = setTime;

  const canContinue = pickedOccasion && pickedDate && pickedTime;

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 1 of 3"
        title="tell us about the evening"
        sub="A few quick details so we can match you with the right chef."
      />

      <div className="space-y-8">
        <div>
          <FieldLabel>The occasion</FieldLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {occasions.map((o) => {
              const active = pickedOccasion === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setPickedOccasion(o.id)}
                  className={cn(
                    "text-left rounded-[10px] border px-4 py-3.5 transition-all cursor-pointer",
                    active
                      ? "border-burgundy bg-burgundy/[0.05] shadow-[inset_0_0_0_1px_var(--burgundy)]"
                      : "border-ink/10 hover:border-ink/30 bg-white",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={cn("text-[14px] font-medium", active ? "text-burgundy" : "text-ink")}>
                      {o.label}
                    </div>
                    {active && <Check className="h-4 w-4 text-burgundy shrink-0 mt-0.5" />}
                  </div>
                  <div className="mt-1 text-[12px] text-ink/60 leading-snug line-clamp-2">{o.blurb}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Date</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-[10px] border border-ink/15 bg-white px-3.5 h-11 text-[14px] text-ink text-left transition-colors hover:border-ink/40 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 cursor-pointer",
                    !pickedDate && "text-ink/45",
                  )}
                >
                  <CalendarIcon className="h-4 w-4 shrink-0 text-ink/55" />
                  {pickedDate ? format(pickedDate, "EEE, MMM d, yyyy") : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 pointer-events-auto bg-white border-ink/10 text-ink [&_*]:!text-ink [&_[data-selected-single='true']]:!bg-burgundy [&_[data-selected-single='true']]:!text-cream [&_[data-selected-single='true']_*]:!text-cream [&_button:hover]:!bg-burgundy/10 [&_button:hover]:!text-burgundy [&_button:hover_*]:!text-burgundy [&_[data-selected-single='true']:hover]:!bg-burgundy [&_[data-selected-single='true']:hover]:!text-cream [&_[data-selected-single='true']:hover_*]:!text-cream"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={pickedDate}
                  onSelect={setPickedDate}
                  disabled={(d) => d < today}
                  className={cn("p-3 pointer-events-auto bg-white text-ink rounded-lg shadow-lg border border-ink/10")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <FieldLabel>Arrival time</FieldLabel>
            <TimePickerInput value={pickedTime} onChange={setPickedTime} />
            <div className="mt-1.5 text-[11px] text-ink/50">Any time you like — dinner usually starts 18:00–20:30.</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!pickedOccasion || !pickedDate) return;
              onNext(pickedOccasion, pickedDate.toISOString().slice(0, 10), pickedTime);
            }}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </Reveal>
  );
}

// ─── STEP 2 ─────────────────────────────────────────────────────
function ChefMenuStep({
  chefSlug,
  packageId,
  selectedChef,
  setSelectedChef,
  selectedPkg,
  setSelectedPkg,
  onNext,
  onChangeChef,
}: {
  chefSlug?: string;
  packageId?: string;
  selectedChef?: string;
  setSelectedChef: (val: string | undefined) => void;
  selectedPkg?: string;
  setSelectedPkg: (val: string | undefined) => void;
  onNext: (slug: string, pkgId: string) => void;
  onChangeChef: () => void;
}) {
  const chef = selectedChef ? getChef(selectedChef) : undefined;
  // If a chef was pre-selected (arriving from a chef detail page), skip the picker.
  const chefLocked = Boolean(chefSlug);

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 2 of 3"
        title={chefLocked ? "choose a menu" : "choose your chef and menu"}
        sub={
          chefLocked
            ? "Pick the menu you'd like for the evening. Prices include everything — groceries, cooking and cleanup."
            : "Each chef sets their own menus and pricing. Prices include everything — groceries, cooking and cleanup."
        }
      />

      <div className="space-y-8">
        {chefLocked && chef ? (
          <div className="flex items-center gap-4 rounded-[12px] border border-ink/10 bg-white p-3 pr-4">
            <img src={chef.portrait} alt={chef.name} className="h-14 w-14 rounded-[10px] object-cover" />
            <div className="min-w-0 flex-1">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-ink/50">Your chef</div>
              <div className="text-[15px] font-medium text-ink truncate">{chef.name}</div>
              <div className="text-[12px] text-ink/55 truncate">
                {chef.cuisine} · {chef.city}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedChef(undefined);
                setSelectedPkg(undefined);
                onChangeChef();
              }}
              className="text-[11px] font-mono uppercase tracking-[0.14em] text-burgundy hover:text-burgundy-deep transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>
        ) : (
          <div>
            <FieldLabel>Chef</FieldLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {chefs.map((c) => {
                const active = selectedChef === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      setSelectedChef(c.slug);
                      if (selectedChef !== c.slug) setSelectedPkg(undefined);
                    }}
                    className={cn(
                      "text-left rounded-[12px] border overflow-hidden transition-all bg-white cursor-pointer",
                      active
                        ? "border-burgundy shadow-[inset_0_0_0_1px_var(--burgundy)]"
                        : "border-ink/10 hover:border-ink/30",
                    )}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-ink/[0.04]">
                      <img src={c.portrait} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[13.5px] font-medium text-ink truncate">{c.name}</div>
                        {active && <Check className="h-4 w-4 text-burgundy shrink-0" />}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-ink/55 truncate">
                        {c.cuisine} · from ${c.startingPrice}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {chef && (
          <div className="animate-[fadein_240ms_ease-out]">
            <FieldLabel>Menu with {chef.name.split(" ")[0]}</FieldLabel>
            <div className="space-y-2.5">
              {chef.packages.map((p) => {
                const active = selectedPkg === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPkg(p.id)}
                    className={cn(
                      "w-full text-left rounded-[10px] border p-4 transition-all bg-white cursor-pointer",
                      active
                        ? "border-burgundy bg-burgundy/[0.05] shadow-[inset_0_0_0_1px_var(--burgundy)]"
                        : "border-ink/10 hover:border-ink/30",
                    )}
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={cn("text-[15px] font-medium truncate", active ? "text-burgundy" : "text-ink")}>
                            {p.name}
                          </div>
                          {active && <Check className="h-4 w-4 text-burgundy shrink-0" />}
                        </div>
                        <p className="mt-1 text-[13px] text-ink/65 leading-relaxed">{p.description}</p>
                        <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-ink/45">
                          {p.courses} courses · per couple
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-[20px] text-ink tabular-nums">${p.price}</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink/45 mt-0.5">
                          all in
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <PrimaryButton
            disabled={!selectedChef || !selectedPkg}
            onClick={() => selectedChef && selectedPkg && onNext(selectedChef, selectedPkg)}
          >
            Continue to payment
          </PrimaryButton>
        </div>
      </div>
    </Reveal>
  );
}

// ─── STEP 3 ─────────────────────────────────────────────────────
function PaymentStep({
  chef,
  pkg,
  occasionLabel,
  date,
  time,
  onBackToChef,
  onBackToEvening,
  onSuccess,
}: {
  chef: ReturnType<typeof getChef>;
  pkg: { name: string; price: number; courses: number } | undefined;
  occasionLabel: string;
  date?: string;
  time?: string;
  onBackToChef: () => void;
  onBackToEvening: () => void;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<"card" | "later">("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const deposit = pkg ? Math.round(pkg.price * 0.2) : 0;
  const contactOK = name.length > 1 && /.+@.+\..+/.test(email);
  const canSubmit =
    !processing &&
    contactOK &&
    (method !== "card" ? true : number.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvc.length >= 3);

  const submitted = date && time && chef && pkg;
  const dateLabel = date
    ? new Date(date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : "";

  const formatCardNumber = (v: string) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 700);
  };

  if (!submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-4">
        <div className="text-[15px] font-medium text-[#111]">Complete the earlier steps first</div>
        <p className="mt-2 text-[13.5px] text-[#6B6B6B]">We need the occasion, date, chef and menu before payment.</p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            onClick={onBackToEvening}
            className="text-[13px] rounded-lg border border-black/10 px-4 h-10 hover:border-black/30 cursor-pointer"
          >
            Back to evening
          </button>
          <button
            onClick={onBackToChef}
            className="text-[13px] rounded-lg border border-black/10 px-4 h-10 hover:border-black/30 cursor-pointer"
          >
            Back to chef
          </button>
        </div>
      </div>
    );
  }

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 3 of 3"
        title="Contact & payment"
        sub={`A ${Math.round(
          (deposit / pkg!.price) * 100
        )}% deposit holds the date. The rest is charged 48 hours before the evening.`}
      />

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px]">
        <form onSubmit={handleSubmit} className="space-y-6 min-w-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Full name</FieldLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="h-11 rounded-lg border-black/10 bg-white text-[#111] placeholder:text-[#B0B0B0] focus-visible:border-[#67242B] focus-visible:ring-2 focus-visible:ring-[#67242B]/15"
              />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-lg border-black/10 bg-white text-[#111] placeholder:text-[#B0B0B0] focus-visible:border-[#67242B] focus-visible:ring-2 focus-visible:ring-[#67242B]/15"
              />
            </div>
          </div>

          <div>
            <FieldLabel>Payment method</FieldLabel>
            <RadioGroup value={method} onValueChange={(v) => setMethod(v as typeof method)} className="space-y-2">
              {[
                {
                  id: "card",
                  label: "Card",
                  note: "Visa · Mastercard · Amex",
                  icon: <CreditCard className="h-4 w-4 text-[#6B6B6B]" />,
                },
                {
                  id: "later",
                  label: "Pay after the chef confirms",
                  note: "No charge today",
                  icon: <Sparkles className="h-4 w-4 text-[#6B6B6B]" />,
                },
              ].map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all bg-white",
                    method === m.id
                      ? "border-[#67242B] bg-[#67242B]/[0.04] shadow-[inset_0_0_0_1px_#67242B]"
                      : "border-black/[0.08] hover:border-black/25"
                  )}
                >
                  <RadioGroupItem value={m.id} id={`pm-${m.id}`} className="border-black/30 text-[#67242B]" />
                  {m.icon}
                  <span className="text-[14px] text-[#111]">{m.label}</span>
                  <span className="ml-auto text-[11.5px] text-[#8A8A8A]">{m.note}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {method === "card" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FieldLabel>Card number</FieldLabel>
                <Input
                  value={number}
                  onChange={(e) => setNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  maxLength={23}
                  className="h-11 rounded-lg border-black/10 bg-white text-[#111] placeholder:text-[#B0B0B0] focus-visible:border-[#67242B] focus-visible:ring-2 focus-visible:ring-[#67242B]/15 font-mono tracking-[0.04em]"
                />
              </div>
              <div>
                <FieldLabel>Expiry</FieldLabel>
                <Input
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="h-11 rounded-lg border-black/10 bg-white text-[#111] placeholder:text-[#B0B0B0] focus-visible:border-[#67242B] focus-visible:ring-2 focus-visible:ring-[#67242B]/15 font-mono"
                />
              </div>
              <div>
                <FieldLabel>CVC</FieldLabel>
                <Input
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  inputMode="numeric"
                  className="h-11 rounded-lg border-black/10 bg-white text-[#111] placeholder:text-[#B0B0B0] focus-visible:border-[#67242B] focus-visible:ring-2 focus-visible:ring-[#67242B]/15 font-mono"
                />
              </div>
            </div>
          )}


          {method === "later" && (
            <div className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-4">
              <div className="text-[14px] font-medium text-[#111]">No charge today.</div>
              <div className="mt-1 text-[13px] text-[#6B6B6B]">
                The chef confirms within 24 hours. You'll add a card when they accept — the date is held tentatively
                until then.
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-[11.5px] text-[#8A8A8A]">
            <Lock className="h-3.5 w-3.5" />
            Secure payment · You can cancel free up to 48h before
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full h-12 rounded-lg bg-[#67242B] text-white text-[14px] font-medium transition-all hover:bg-[#4A181D] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {processing ? "Processing…" : `Pay $${deposit} deposit · Book the night`}
          </button>
        </form>

        {/* Summary sidebar */}
        <aside className="md:sticky md:top-24 self-start rounded-xl border border-black/[0.08] bg-black/[0.015] p-5">
          <div className="flex items-center gap-3">
            <img src={chef!.portrait} alt={chef!.name} className="h-11 w-11 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-[#111] truncate">{chef!.name}</div>
              <div className="text-[11.5px] text-[#8A8A8A] truncate">
                {chef!.cuisine} · {chef!.city}
              </div>
            </div>
          </div>
          <div className="my-4 h-px bg-black/[0.06]" />
          <dl className="space-y-2.5 text-[13px]">
            <SummaryRow k="Occasion" v={occasionLabel} />
            <SummaryRow k="Menu" v={`${pkg!.name}`} />
            <SummaryRow k="Date" v={dateLabel} />
            <SummaryRow k="Arrival" v={formatTime12h(time!) ?? ""} />
          </dl>
          <div className="mt-4 h-px bg-black/[0.06]" />
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-[12px] text-[#6B6B6B]">Total</div>
            <div className="text-[20px] font-semibold text-[#111] tabular-nums">${pkg!.price}</div>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-[11.5px] text-[#8A8A8A]">Due today (deposit)</div>
            <div className="text-[13px] font-medium text-[#67242B] tabular-nums">${deposit}</div>
          </div>
        </aside>
      </div>
    </Reveal>
  );
}

function SummaryRow({ k, v, tone = "light" }: { k: string; v: string; tone?: "light" | "dark" }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3">
      <dt className={cn("text-[12px] shrink-0", tone === "dark" ? "text-cream/50" : "text-[#8A8A8A]")}>{k}</dt>
      <dd className={cn("min-w-0 text-right text-[13px] truncate", tone === "dark" ? "text-cream" : "text-[#111]")}>{v}</dd>
    </div>
  );
}

// ─── Live "physical card" preview ───────────────────────────────
function EveningCard({
  stepIdx,
  occasionLabel,
  date,
  time,
  chef,
  pkg,
}: {
  stepIdx: number;
  occasionLabel?: string;
  date?: string;
  time?: string;
  chef: ReturnType<typeof getChef>;
  pkg: { name: string; price: number; courses: number } | undefined;
}) {
  const dateLabel = date
    ? new Date(date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : undefined;

  const Field = ({ label, value, filled }: { label: string; value?: string; filled: boolean }) => (
    <div>
      <div className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-cream/45">{label}</div>
      <div
        className={cn(
          "mt-1 h-[18px] text-[13px] font-mono tabular-nums transition-colors duration-300",
          filled ? "text-cream" : "text-cream/25"
        )}
      >
        {value ?? "— — — —"}
      </div>
    </div>
  );

  return (
    <div
      className="relative aspect-[1.586/1] w-full rounded-[20px] p-5 overflow-hidden border border-cream/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      style={{
        background:
          "radial-gradient(120% 90% at 0% 0%, rgba(196,165,90,0.28) 0%, transparent 55%), radial-gradient(120% 90% at 100% 100%, rgba(103,36,43,0.9) 0%, transparent 60%), linear-gradient(140deg, #4A181D 0%, #67242B 60%, #7A3239 100%)",
      }}
    >
      {/* Chip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-11 rounded-[6px] bg-gradient-to-br from-gold/90 to-gold/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" />
          <div className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-cream/40 select-none">
            · step {stepIdx + 1}
          </div>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-[13px] lowercase text-cream leading-none">love at first sight</div>
          <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.2em] text-cream/55">the evening</div>
        </div>
      </div>

      {/* Occasion — big field like PAN */}
      <div className="mt-5">
        <div className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-cream/45">Occasion</div>
        <div
          className={cn(
            "mt-1 font-display font-bold text-[18px] lowercase tracking-[-0.02em] transition-colors duration-300 truncate",
            occasionLabel ? "text-cream" : "text-cream/25"
          )}
        >
          {occasionLabel ?? "an evening"}
        </div>
      </div>

      {/* Fields row */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Field label="Date" value={dateLabel} filled={Boolean(dateLabel)} />
        <Field label="Arrival" value={formatTime12h(time)} filled={Boolean(time)} />
      </div>

      {/* Chef + total footer */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
        <div className="min-w-0 flex items-center gap-2">
          {chef ? (
            <>
              <img src={chef.portrait} alt="" className="h-8 w-8 rounded-full object-cover border border-cream/20" />
              <div className="min-w-0">
                <div className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-cream/45">Chef</div>
                <div className="text-[12px] font-medium text-cream truncate lowercase">{chef.name}</div>
              </div>
            </>
          ) : (
            <>
              <div className="h-8 w-8 rounded-full border border-dashed border-cream/25" />
              <div>
                <div className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-cream/45">Chef</div>
                <div className="text-[12px] text-cream/30">to be chosen</div>
              </div>
            </>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-cream/45">Total</div>
          <div className={cn("font-display font-bold text-[18px] tabular-nums", pkg ? "text-cream" : "text-cream/30")}>
            {pkg ? `$${pkg.price}` : "$—"}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessDialog({
  open,
  onOpenChange,
  chef,
  pkg,
  occasionLabel,
  date,
  time,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  chef: ReturnType<typeof getChef>;
  pkg: { name: string; price: number; courses: number } | undefined;
  occasionLabel: string;
  date?: string;
  time?: string;
}) {
  if (!chef || !pkg) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent />
      </Dialog>
    );
  }
  const dateLabel = date
    ? new Date(date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";
  const bookingId = date
    ? `LAFS-${chef.slug.slice(0, 3).toUpperCase()}-${date.replace(/-/g, "").slice(2)}`
    : "LAFS-000000";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-0 p-0 bg-burgundy-deep text-cream max-w-lg max-h-[92vh] overflow-y-auto rounded-[18px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
        {/* Header with soft candlelit gradient */}
        <div
          className="relative px-8 pt-10 pb-8 text-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(196,165,90,0.22) 0%, transparent 55%), radial-gradient(80% 80% at 50% 100%, rgba(103,36,43,0.55) 0%, transparent 60%)",
          }}
        >
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-cream/5 backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path
                d="M5 12.5L10 17.5L19 7.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-6 label text-cream/60">the evening is on the calendar</div>
          <DialogHeader className="mt-3">
            <DialogTitle className="font-display font-bold text-[32px] leading-[1.1] lowercase tracking-[-0.02em] text-cream text-center">
              your table is booked.
            </DialogTitle>
            <DialogDescription className="text-cream/70 text-[14px] leading-relaxed pt-3 max-w-sm mx-auto text-center">
              A confirmation has been sent. {chef.name.split(" ")[0]} will follow up within 24 hours — all inside your
              dashboard.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Booking card */}
        <div className="px-6 md:px-8 pb-8 -mt-2">
          <div className="rounded-[14px] border border-cream/15 bg-cream/[0.04] backdrop-blur-sm p-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-cream/10 pb-5">
              <img
                src={chef.portrait}
                alt={chef.name}
                className="h-12 w-12 rounded-full object-cover border border-cream/15"
              />
              <div className="min-w-0">
                <div className="font-display font-bold text-[17px] lowercase text-cream truncate">{chef.name}</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/50 truncate">
                  {chef.cuisine} · {chef.city}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-cream/40">Booking</div>
                <div className="text-[11px] font-mono text-cream/80">{bookingId}</div>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-[13px]">
              <SummaryRow k="Occasion" v={occasionLabel} tone="dark" />
              <SummaryRow k="Package" v={`${pkg.name} · ${pkg.courses} courses`} tone="dark" />
              {dateLabel && <SummaryRow k="Date" v={dateLabel} tone="dark" />}
              {time && <SummaryRow k="Arrival" v={formatTime12h(time) ?? ""} tone="dark" />}
            </dl>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 border-t border-cream/10 pt-4">
              <div className="label text-cream/45">Total</div>
              <div className="font-display font-bold text-xl text-cream tabular-nums">${pkg.price}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
            <Link
              href="/chefs"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-11 items-center justify-center rounded-[12px] border border-cream/25 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/80 hover:text-cream hover:border-cream/50 transition-colors cursor-pointer"
            >
              back to chefs
            </Link>
            <Link
              href="/dashboard"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-11 items-center justify-center rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy hover:bg-[#F0E8DE] transition-colors cursor-pointer"
            >
              open dashboard →
            </Link>
          </div>

          <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.14em] text-cream/35 text-center">
            prototype — no real payment is processed
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
