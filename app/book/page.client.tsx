"use client";

import * as React from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  Sparkles,
  Upload,
  X as XIcon,
  Info,
} from "lucide-react";
import { Reveal } from "@/components/ui-lafs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { chefs, getChef, occasions, type Chef } from "@/data/chefs";
import { WHATS_INCLUDED, CONFIRMATION_GATING_STATEMENT } from "@/data/site-content";

const ALL_STEPS = ["evening", "chef", "kitchen", "payment"] as const;
type Step = (typeof ALL_STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  evening: "The evening",
  chef: "Chef & menu",
  kitchen: "Kitchen & equipment",
  payment: "Contact & pay",
};

const CUSTOM_MENU_ID = "__custom__";

type KitchenAnswers = {
  stove: "yes" | "no" | null;
  fridge: "yes" | "no" | null;
  pots: "yes" | "no" | null;
  baking: "yes" | "no" | null;
  boards: "yes" | "no" | null;
  tableware: "yes" | "no" | null;
  limitations: string;
};
const emptyKitchen: KitchenAnswers = {
  stove: null, fridge: null, pots: null, baking: null, boards: null, tableware: null, limitations: "",
};

type CustomMenuBrief = {
  cuisine: string;
  dietary: string;
  allergies: string;
  guests: string;
  notes: string;
};
const emptyCustom: CustomMenuBrief = { cuisine: "", dietary: "", allergies: "", guests: "", notes: "" };

type Prefs = { dietary: string; allergies: string; guests: string };
const emptyPrefs: Prefs = { dietary: "", allergies: "", guests: "" };

const EXTRA_EQUIPMENT_OPTIONS: { id: string; label: string; note: string }[] = [
  { id: "dinnerware", label: "Full dinner set for our guest count", note: "Plates, bowls, cutlery, water & wine glasses" },
  { id: "portable-induction", label: "Portable induction burner", note: "For chefs who need extra heat surface" },
  { id: "grill", label: "Outdoor grill or plancha", note: "For live-fire menus" },
  { id: "serving-platters", label: "Serving platters & boards", note: "Presentation-grade" },
  { id: "linens", label: "Table linens & napkins", note: "Cream / white, pressed" },
  { id: "candles", label: "Candles & table styling", note: "Warm, low-flame set" },
  { id: "stemware", label: "Wine & cocktail stemware", note: "Coupe, wine, tumblers" },
  { id: "chef-toolkit", label: "Chef's specialty toolkit", note: "Knives, torches, sous-vide, etc." },
];

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

function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const occasion = searchParams.get("occasion") || undefined;
  const chefSlug = searchParams.get("chef") || undefined;
  const packageId = searchParams.get("packageId") || undefined;
  const date = searchParams.get("date") || undefined;
  const time = searchParams.get("time") || undefined;
  const guestNameParam = searchParams.get("guestName") || undefined;

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
  const steps: Step[] = [...ALL_STEPS];
  const stepIdx = Math.max(0, steps.indexOf(step));

  const [success, setSuccess] = useState(false);
  const [previewOpenMobile, setPreviewOpenMobile] = useState(false);

  // Lifted selection states for real-time preview updates
  const [draftOccasion, setDraftOccasion] = useState<string | undefined>(occasion);
  const [draftDate, setDraftDate] = useState<string | undefined>(date);
  const [draftTime, setDraftTime] = useState<string | undefined>(time || "19:00");
  const [draftGuestName, setDraftGuestName] = useState<string>(guestNameParam || "");
  const [draftChefSlug, setDraftChefSlug] = useState<string | undefined>(chefSlug);
  const [draftPackageId, setDraftPackageId] = useState<string | undefined>(packageId);

  const [kitchen, setKitchen] = useState<KitchenAnswers>(emptyKitchen);
  const [kitchenPhotos, setKitchenPhotos] = useState<{ file: File; url: string }[]>([]);
  const [customBrief, setCustomBrief] = useState<CustomMenuBrief>(emptyCustom);
  const [prefs, setPrefs] = useState<Prefs>(emptyPrefs);
  const [extraEquipment, setExtraEquipment] = useState<string[]>([]);

  useEffect(() => {
    setDraftOccasion(occasion);
    setDraftDate(date);
    setDraftTime(time || "19:00");
    if (guestNameParam) setDraftGuestName(guestNameParam);
    setDraftChefSlug(chefSlug);
    setDraftPackageId(packageId);
  }, [occasion, date, time, guestNameParam, chefSlug, packageId]);

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
  const isCustom = packageId === CUSTOM_MENU_ID;
  const selectedPackage = useMemo(() => {
    if (!selectedChef || !packageId || isCustom) return undefined;
    return selectedChef.packages.find((p) => p.id === packageId);
  }, [selectedChef, packageId, isCustom]);

  const previewChef = draftChefSlug ? getChef(draftChefSlug) : undefined;
  const isPreviewCustom = draftPackageId === CUSTOM_MENU_ID;
  const previewPackage = useMemo(() => {
    if (!previewChef || !draftPackageId || isPreviewCustom) return undefined;
    return previewChef.packages.find((p) => p.id === draftPackageId);
  }, [previewChef, draftPackageId, isPreviewCustom]);

  const previewOccasionLabel = occasions.find((o) => o.id === draftOccasion)?.label ?? "an evening";
  const occasionLabel = occasions.find((o) => o.id === occasion)?.label ?? "an evening";

  return (
    <div
      className="min-h-screen text-cream"
      style={{
        background:
          "radial-gradient(120% 80% at 10% 0%, rgba(196,165,90,0.10) 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(122,50,57,0.55) 0%, transparent 60%), linear-gradient(180deg, #4A181D 0%, #67242B 100%)",
      }}
    >
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-burgundy-deep/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-10 h-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-cream/70 hover:text-cream transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Love at First Sight
          </Link>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.24em] text-cream/50 tabular-nums">
            {steps.map((s, i) => (
              <span key={s} className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    i === stepIdx ? "text-gold" : i < stepIdx ? "text-cream/70" : "text-cream/35",
                  )}
                >
                  <span>N°{String(i + 1).padStart(2, "0")}</span>
                  <span>{STEP_LABELS[s]}</span>
                </span>
                {i < steps.length - 1 && <span className="text-cream/20">—</span>}
              </span>
            ))}
          </div>
          <div className="md:hidden text-[10px] font-mono uppercase tracking-[0.24em] text-cream/60">
            N°{String(stepIdx + 1).padStart(2, "0")} · {STEP_LABELS[step]}
          </div>
        </div>
        <div className="h-[2px] w-full bg-cream/[0.06]">
          <div
            className="h-full bg-gold transition-[width] duration-500 ease-out"
            style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 md:px-10 py-14 md:py-20">
        {success ? (
          <SuccessScreen
            bookingId="LAFS-8492"
            guestName={draftGuestName}
            occasionLabel={occasionLabel}
            dateLabel={date ? date : undefined}
            time={time}
            chef={selectedChef || previewChef || chefs[0]}
            pkg={selectedPackage || previewPackage}
            isCustom={isCustom || isPreviewCustom}
          />
        ) : (
          <>
            {/* Mobile: collapsible menu preview */}
            <div className="md:hidden mb-6">
              <button
                type="button"
                onClick={() => setPreviewOpenMobile((v) => !v)}
                className="w-full flex items-center justify-between rounded-[12px] border border-cream/15 bg-cream/[0.04] backdrop-blur-sm px-4 h-12 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/85"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  {previewOpenMobile ? "Hide menu" : "Preview the menu"}
                </span>
                <span className="text-cream/50">{previewOpenMobile ? "–" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {previewOpenMobile && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <MenuPreview
                        stepIdx={stepIdx}
                        guestName={draftGuestName}
                        occasionLabel={draftOccasion ? previewOccasionLabel : undefined}
                        date={draftDate}
                        time={draftTime}
                        chef={previewChef}
                        pkg={previewPackage}
                        isCustom={isPreviewCustom}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_380px]">
          {/* Form column — dark burgundy matching React code */}
          <div className="min-w-0">
            <div key={step} className="animate-[fadein_260ms_ease-out]">
              {step === "evening" && (
                <EveningStep
                  occasion={draftOccasion}
                  setOccasion={setDraftOccasion}
                  date={draftDate}
                  setDate={setDraftDate}
                  time={draftTime}
                  setTime={setDraftTime}
                  guestName={draftGuestName}
                  onGuestNameChange={setDraftGuestName}
                  chef={previewChef}
                  onNext={(o, d, t, g) =>
                    goto({ occasion: o, date: d, time: t, guestName: g, step: "chef" })
                  }
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
                  customBrief={customBrief}
                  setCustomBrief={setCustomBrief}
                  prefs={prefs}
                  setPrefs={setPrefs}
                  onNext={(slug, pkgId) => goto({ chef: slug, packageId: pkgId, step: "kitchen" })}
                  onChangeChef={() => goto({ chef: undefined, packageId: undefined })}
                />
              )}
              {step === "kitchen" && (
                <KitchenStep
                  chef={previewChef}
                  answers={kitchen}
                  setAnswers={setKitchen}
                  photos={kitchenPhotos}
                  setPhotos={setKitchenPhotos}
                  extraEquipment={extraEquipment}
                  setExtraEquipment={setExtraEquipment}
                  onNext={() => goto({ step: "payment" })}
                  onBackToEvening={() => goto({ step: "evening" })}
                  onBackToChef={() => goto({ step: "chef" })}
                />
              )}
              {step === "payment" && (
                <PaymentStep
                  chef={selectedChef}
                  pkg={selectedPackage}
                  isCustom={isCustom}
                  occasionLabel={occasionLabel}
                  date={date}
                  time={time}
                  onBackToChef={() => goto({ step: "chef" })}
                  onBackToEvening={() => goto({ step: "evening" })}
                  onSuccess={() => setSuccess(true)}
                />
              )}
            </div>
            {stepIdx > 0 && (
              <div className="mt-14 flex items-center justify-between border-t border-cream/10 pt-5">
                <button
                  onClick={back}
                  className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/55 hover:text-cream transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-cream/35">Progress saved</div>
              </div>
            )}
          </div>

          {/* Live paper preview card */}
          <aside className="hidden md:block md:sticky md:top-24 self-start">
            <MenuPreview
              stepIdx={stepIdx}
              guestName={draftGuestName}
              occasionLabel={draftOccasion ? previewOccasionLabel : undefined}
              date={draftDate}
              time={draftTime}
              chef={previewChef}
              pkg={previewPackage}
              isCustom={isPreviewCustom}
            />
            <p className="mt-5 text-center text-[10px] font-mono uppercase tracking-[0.22em] text-cream/40">
              Free cancellation up to 48h · Chef-approved bookings
            </p>
          </aside>
        </div>
        </>
        )}
      </main>
    </div>
  );
}

function StepTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 md:mb-16 lg:mb-20 grid gap-5 lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-10">
      <div className="lg:pt-3">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-gold">{eyebrow.replace(/^Step (\d+) of (\d+)$/, "N°0$1 / 0$2")}</div>
        <div className="mt-3 hidden lg:block h-px w-10 bg-gold/40" />
      </div>
      <div className="min-w-0">
        <h2 className="font-display font-bold lowercase text-[32px] sm:text-[40px] md:text-[46px] lg:text-[54px] tracking-[-0.02em] text-cream leading-[1.02]">{title}</h2>
        {sub && <p className="mt-4 md:mt-5 max-w-xl text-[14px] md:text-[14.5px] text-cream/70 leading-[1.7]">{sub}</p>}
      </div>
    </div>
  );
}

function EditorialSection({
  num,
  title,
  lede,
  children,
}: {
  num: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-10">
      <div className="lg:pt-1">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-gold">{num}</div>
        <div className="mt-2 hidden lg:block h-px w-8 bg-gold/40" />
      </div>
      <div className="min-w-0">
        <h3 className="font-display font-medium lowercase text-[22px] md:text-[26px] tracking-[-0.01em] text-cream leading-[1.15]">{title}</h3>
        {lede && <p className="mt-2 max-w-xl text-[13px] text-cream/60 leading-[1.7]">{lede}</p>}
        <div className="mt-5 md:mt-6">{children}</div>
      </div>
    </section>
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
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-cream px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy-deep transition-all hover:bg-gold hover:text-burgundy-deep active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-cream/55 mb-2">{children}</div>;
}

// ─── STEP 1 ─────────────────────────────────────────────────────
function EveningStep({
  occasion,
  setOccasion,
  date,
  setDate,
  time,
  setTime,
  guestName,
  onGuestNameChange,
  chef,
  onNext,
}: {
  occasion?: string;
  setOccasion: (val: string) => void;
  date?: string;
  setDate: (val: string | undefined) => void;
  time?: string;
  setTime: (val: string) => void;
  guestName?: string;
  onGuestNameChange: (val: string) => void;
  chef?: Chef;
  onNext: (occasion: string, date: string, time: string, guestName: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [pickedOccasion, setPickedOccasion] = useState<string | undefined>(occasion);
  const [customOccasion, setCustomOccasion] = useState<string>(
    occasion && !occasions.some((o) => o.id === occasion) ? occasion : "",
  );
  const isCustomOccasion = pickedOccasion === "__custom__";
  const [pickedDate, setPickedDate] = useState<Date | undefined>(date ? new Date(date + "T00:00:00") : undefined);
  const [pickedTime, setPickedTime] = useState<string>(time ?? "19:00");
  const [pickedName, setPickedName] = useState<string>(guestName ?? "");

  const canContinue =
    !!pickedOccasion &&
    (isCustomOccasion ? customOccasion.trim().length > 1 : true) &&
    !!pickedDate &&
    !!pickedTime &&
    pickedName.trim().length > 1;

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 1 of 4"
        title="tell us about the evening"
        sub="A few quick details so we can match you with the right chef."
      />

      <div className="space-y-8 md:space-y-10 lg:pl-[120px] max-w-2xl">
        <div>
          <FieldLabel>Your name (as it will appear on the invitation)</FieldLabel>
          <Input
            value={pickedName}
            onChange={(e) => {
              setPickedName(e.target.value);
              onGuestNameChange(e.target.value);
            }}
            placeholder="e.g. Jamie & Alex"
            className="h-12 rounded-[10px] border border-cream/20 bg-cream/[0.04] px-4 text-[15px] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20 shadow-none"
          />
          <div className="mt-2 text-[11px] text-cream/45 italic">Watch the invitation fill in as you type.</div>
        </div>

        <div>
          <FieldLabel>The occasion</FieldLabel>
          <Select
            value={pickedOccasion}
            onValueChange={(v) => {
              setPickedOccasion(v);
              if (v !== "__custom__") setOccasion(v);
            }}
          >
            <SelectTrigger className="h-12 rounded-[10px] border border-cream/20 bg-cream/[0.04] px-4 text-[15px] text-cream shadow-none focus:ring-2 focus:ring-gold/20 focus:border-gold data-[placeholder]:text-cream/40 [&>svg]:text-cream/60 [&>svg]:opacity-100 [&>span]:truncate">
              <SelectValue placeholder="What are we celebrating?" />
            </SelectTrigger>
            <SelectContent className="bg-paper border-ink/10 text-ink max-h-[60vh]">
              {occasions.map((o) => (
                <SelectItem
                  key={o.id}
                  value={o.id}
                  className="relative flex w-full cursor-pointer select-none flex-col items-start rounded-sm py-2.5 pl-3 pr-9 outline-none focus:bg-burgundy/[0.08] data-[state=checked]:text-burgundy"
                >
                  <div className="font-medium">{o.label}</div>
                  <span className="mt-0.5 text-[12.5px] text-ink/55 leading-snug">{o.blurb}</span>
                </SelectItem>
              ))}
              <SelectItem
                value="__custom__"
                className="relative flex w-full cursor-pointer select-none flex-col items-start rounded-sm py-2.5 pl-3 pr-9 outline-none border-t border-ink/10 mt-1 pt-3 focus:bg-burgundy/[0.08] data-[state=checked]:text-burgundy"
              >
                <div className="font-medium">Something else</div>
                <span className="mt-0.5 text-[12.5px] text-ink/55 leading-snug">Tell us in your own words.</span>
              </SelectItem>
            </SelectContent>
          </Select>
          {isCustomOccasion && (
            <div className="mt-3">
              <Input
                value={customOccasion}
                onChange={(e) => {
                  setCustomOccasion(e.target.value);
                  setOccasion(e.target.value);
                }}
                placeholder="A quiet reunion, a proposal, a housewarming…"
                className="h-12 rounded-[10px] border border-cream/20 bg-cream/[0.04] px-4 text-[15px] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20 shadow-none"
                autoFocus
              />
            </div>
          )}
          {pickedOccasion && !isCustomOccasion && (
            <div className="mt-2 text-[11.5px] text-cream/55 italic">
              {occasions.find((o) => o.id === pickedOccasion)?.blurb}
            </div>
          )}
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <FieldLabel>Date</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[10px] border border-cream/20 bg-cream/[0.04] px-4 h-12 text-[15px] text-cream text-left transition-colors hover:border-cream/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 cursor-pointer",
                    !pickedDate && "text-cream/30",
                  )}
                >
                  <CalendarIcon className="h-4 w-4 shrink-0 text-cream/50" />
                  {pickedDate ? format(pickedDate, "EEE, MMM d, yyyy") : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "w-auto p-0 pointer-events-auto rounded-[10px] border border-cream/15 shadow-2xl bg-burgundy-deep text-cream",
                  "[&_*]:!text-cream",
                  "[&_.rdp-weekday]:!text-cream/50",
                  "[&_[data-day]:disabled]:!text-cream/25",
                  "[&_[data-day]:hover]:!bg-cream/10",
                  "[&_[data-day][data-today='true']]:!bg-transparent [&_[data-day][data-today='true']]:!ring-1 [&_[data-day][data-today='true']]:!ring-gold/60",
                  "[&_[data-selected-single='true']]:!bg-gold [&_[data-selected-single='true']]:!text-burgundy-deep [&_[data-selected-single='true']_*]:!text-burgundy-deep",
                )}
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={pickedDate}
                  onSelect={(d) => {
                    setPickedDate(d);
                    if (d) setDate(format(d, "yyyy-MM-dd"));
                  }}
                  disabled={(d) => d < today}
                  showOutsideDays={false}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            {chef && (
              <div className="mt-2 text-[11px] text-cream/55 italic">
                {chef.name.split(" ")[0]} usually books {chef.leadTimeWeeks <= 1 ? "about a week" : `about ${chef.leadTimeWeeks} weeks`} out — earlier dates may not be available.
              </div>
            )}
          </div>
          <div>
            <FieldLabel>Arrival time</FieldLabel>
            <Input
              type="time"
              value={pickedTime}
              onChange={(e) => {
                setPickedTime(e.target.value);
                setTime(e.target.value);
              }}
              step={300}
              className="w-full h-12 rounded-[10px] border border-cream/20 bg-cream/[0.04] px-4 text-[15px] text-cream hover:border-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20 shadow-none font-mono tabular-nums [color-scheme:dark]"
            />
            <div className="mt-2 text-[11px] text-cream/55 italic">Dinner usually starts 18:00–20:30.</div>
          </div>
        </div>

        <div className="flex justify-start pt-4">
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => {
              if (!pickedOccasion || !pickedDate) return;
              const occ = isCustomOccasion ? customOccasion.trim() : pickedOccasion;
              onNext(occ, format(pickedDate, "yyyy-MM-dd"), pickedTime, pickedName.trim());
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
  customBrief,
  setCustomBrief,
  prefs,
  setPrefs,
  onNext,
  onChangeChef,
}: {
  chefSlug?: string;
  packageId?: string;
  selectedChef?: string;
  setSelectedChef: (val: string | undefined) => void;
  selectedPkg?: string;
  setSelectedPkg: (val: string | undefined) => void;
  customBrief: CustomMenuBrief;
  setCustomBrief: (b: CustomMenuBrief) => void;
  prefs: Prefs;
  setPrefs: (p: Prefs) => void;
  onNext: (slug: string, pkgId: string) => void;
  onChangeChef: () => void;
}) {
  const chef = selectedChef ? getChef(selectedChef) : undefined;
  const chefLocked = Boolean(chefSlug);
  const isCustom = selectedPkg === CUSTOM_MENU_ID;

  const customValid =
    customBrief.guests.trim().length > 0 &&
    (customBrief.cuisine.trim().length > 0 || customBrief.notes.trim().length > 0);
  const prefsValid = prefs.guests.trim().length > 0;
  const canContinue =
    Boolean(selectedChef && selectedPkg) &&
    (isCustom ? customValid : prefsValid);

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 2 of 4"
        title={chefLocked ? "choose a menu" : "choose your chef and menu"}
        sub={
          chefLocked
            ? "Pick the menu you'd like — or design a custom one. Prices include groceries, cooking and cleanup."
            : "Each chef sets their own menus and pricing. Prices include groceries, cooking and cleanup."
        }
      />

      <div className="space-y-8 md:space-y-10 lg:pl-[120px] max-w-2xl">
        {chefLocked && chef ? (
          <div className="flex items-center gap-4 rounded-[12px] border border-cream/10 bg-cream/[0.05] p-3 pr-4">
            <img src={chef.portrait} alt={chef.name} className="h-14 w-14 rounded-[10px] object-cover" />
            <div className="min-w-0 flex-1">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-cream/50">Your chef</div>
              <div className="text-[15px] font-medium text-cream truncate">{chef.name}</div>
              <div className="text-[12px] text-cream/55 truncate">
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
              className="text-[11px] font-mono uppercase tracking-[0.14em] text-gold hover:text-gold-deep transition-colors cursor-pointer"
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
                      "text-left rounded-[12px] border overflow-hidden transition-all bg-cream/[0.05] cursor-pointer",
                      active
                        ? "border-burgundy shadow-[inset_0_0_0_1px_var(--burgundy)]"
                        : "border-cream/10 hover:border-cream/30",
                    )}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-cream/[0.05]">
                      <img src={c.portrait} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[13.5px] font-medium text-cream truncate">{c.name}</div>
                        {active && <Check className="h-4 w-4 text-gold shrink-0" />}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-cream/55 truncate">
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
          <div className="animate-[fadein_240ms_ease-out] space-y-6">
            <div>
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
                        "w-full text-left rounded-[10px] border p-4 transition-all bg-cream/[0.05] cursor-pointer",
                        active
                          ? "border-gold bg-gold/[0.08] shadow-[inset_0_0_0_1px_var(--gold)]"
                          : "border-cream/10 hover:border-cream/30",
                      )}
                    >
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className={cn("text-[15px] font-medium truncate", active ? "text-gold" : "text-cream")}>
                              {p.name}
                            </div>
                            {active && <Check className="h-4 w-4 text-gold shrink-0" />}
                          </div>
                          <p className="mt-1 text-[13px] text-cream/65 leading-relaxed">{p.description}</p>
                          <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-cream/45">
                            {p.courses} courses · per couple
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-display font-bold text-[20px] text-cream tabular-nums">${p.price}</div>
                          <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-cream/45 mt-0.5">
                            all in
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {chef.offersCustomMenu && (
                  <button
                    type="button"
                    onClick={() => setSelectedPkg(CUSTOM_MENU_ID)}
                    className={cn(
                      "w-full text-left rounded-[10px] border-2 border-dashed p-4 transition-all bg-cream/[0.05] cursor-pointer",
                      isCustom
                        ? "border-burgundy bg-burgundy/[0.05]"
                        : "border-cream/25 hover:border-cream/45",
                    )}
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-gold" />
                          <div className={cn("text-[15px] font-medium", isCustom ? "text-gold" : "text-cream")}>
                            Design a custom menu
                          </div>
                          {isCustom && <Check className="h-4 w-4 text-gold shrink-0 ml-auto" />}
                        </div>
                        <p className="mt-1 text-[13px] text-cream/65 leading-relaxed">
                          Tell {chef.name.split(" ")[0]} what you're dreaming of — a theme, a favourite cuisine, or a special constraint. She'll propose a menu after you book.
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[12px] font-medium text-cream/70 max-w-[140px]">Final price confirmed by your chef</div>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {isCustom && (
              <div className="animate-[fadein_200ms_ease-out] rounded-[12px] border border-gold/25 bg-gold/[0.05] p-5 space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-gold">Custom menu brief</div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel>Cuisine or theme</FieldLabel>
                    <Input
                      value={customBrief.cuisine}
                      onChange={(e) => setCustomBrief({ ...customBrief, cuisine: e.target.value })}
                      placeholder="e.g. coastal Italian, an anniversary tasting"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream placeholder:text-cream/40"
                    />
                  </div>
                  <div>
                    <FieldLabel>Guest count *</FieldLabel>
                    <Input
                      type="number"
                      min={1}
                      value={customBrief.guests}
                      onChange={(e) => setCustomBrief({ ...customBrief, guests: e.target.value })}
                      placeholder="2"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream"
                    />
                  </div>
                  <div>
                    <FieldLabel>Dietary needs</FieldLabel>
                    <Input
                      value={customBrief.dietary}
                      onChange={(e) => setCustomBrief({ ...customBrief, dietary: e.target.value })}
                      placeholder="vegetarian, pescatarian, gluten-free…"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream placeholder:text-cream/40"
                    />
                  </div>
                  <div>
                    <FieldLabel>Allergies</FieldLabel>
                    <Input
                      value={customBrief.allergies}
                      onChange={(e) => setCustomBrief({ ...customBrief, allergies: e.target.value })}
                      placeholder="anything to keep off the table"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream placeholder:text-cream/40"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Notes for the chef</FieldLabel>
                  <Textarea
                    value={customBrief.notes}
                    onChange={(e) => setCustomBrief({ ...customBrief, notes: e.target.value })}
                    placeholder="Tell your chef about the room, the guests, or the night you're planning."
                    rows={3}
                    className="rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream placeholder:text-cream/40"
                  />
                </div>
                <p className="text-[11.5px] text-cream/55">Your chef will propose a final menu and price after reviewing the brief.</p>
              </div>
            )}

            {!isCustom && (
              <div className="rounded-[12px] border border-cream/10 bg-cream/[0.05] p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/60">Who's coming</div>
                  <Info className="h-3.5 w-3.5 text-cream/40" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <FieldLabel>Guests *</FieldLabel>
                    <Input
                      type="number"
                      min={1}
                      value={prefs.guests}
                      onChange={(e) => setPrefs({ ...prefs, guests: e.target.value })}
                      placeholder="2"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream"
                    />
                  </div>
                  <div>
                    <FieldLabel>Dietary</FieldLabel>
                    <Input
                      value={prefs.dietary}
                      onChange={(e) => setPrefs({ ...prefs, dietary: e.target.value })}
                      placeholder="none / vegetarian / …"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream placeholder:text-cream/40"
                    />
                  </div>
                  <div>
                    <FieldLabel>Allergies</FieldLabel>
                    <Input
                      value={prefs.allergies}
                      onChange={(e) => setPrefs({ ...prefs, allergies: e.target.value })}
                      placeholder="nuts, shellfish…"
                      className="h-11 rounded-[10px] border-cream/15 bg-cream/[0.05] text-[14px] text-cream placeholder:text-cream/40"
                    />
                  </div>
                </div>
                <p className="text-[11.5px] text-cream/55">Tell your chef about allergies or anything you'd rather not see on the table.</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <PrimaryButton
            disabled={!canContinue}
            onClick={() => selectedChef && selectedPkg && onNext(selectedChef, selectedPkg)}
          >
            Continue to kitchen
          </PrimaryButton>
        </div>
      </div>
    </Reveal>
  );
}

// ─── STEP 3 · KITCHEN ────────────────────────────────────────────
const KITCHEN_QUESTIONS: { key: keyof Omit<KitchenAnswers, "limitations">; label: string }[] = [
  { key: "stove", label: "Is there a working stove and oven?" },
  { key: "fridge", label: "Is there refrigerator space available?" },
  { key: "pots", label: "Do you have standard pots and pans?" },
  { key: "baking", label: "Do you have baking sheets and mixing bowls?" },
  { key: "boards", label: "Do you have cutting boards?" },
  { key: "tableware", label: "Do you have enough plates, glasses, and silverware for all guests?" },
];

function KitchenStep({
  chef,
  answers,
  setAnswers,
  photos,
  setPhotos,
  extraEquipment,
  setExtraEquipment,
  onNext,
  onBackToEvening,
  onBackToChef,
}: {
  chef: Chef | undefined;
  answers: KitchenAnswers;
  setAnswers: (a: KitchenAnswers) => void;
  photos: { file: File; url: string }[];
  setPhotos: (p: { file: File; url: string }[]) => void;
  extraEquipment: string[];
  setExtraEquipment: (eq: string[]) => void;
  onNext: () => void;
  onBackToEvening: () => void;
  onBackToChef: () => void;
}) {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!chef) {
    return (
      <div className="max-w-md mx-auto text-center py-4">
        <div className="text-[15px] font-medium text-cream">Complete the earlier steps first</div>
        <p className="mt-2 text-[13.5px] text-cream/60">We need the occasion and the chef before reviewing the kitchen.</p>
        <div className="mt-5 flex justify-center gap-2">
          <button onClick={onBackToEvening} className="text-[13px] rounded-lg border border-cream/15 px-4 h-10 hover:border-cream/40 cursor-pointer">
            Back to evening
          </button>
          <button onClick={onBackToChef} className="text-[13px] rounded-lg border border-cream/15 px-4 h-10 hover:border-cream/40 cursor-pointer">
            Choose a chef
          </button>
        </div>
      </div>
    );
  }

  const yesNoAnswered = KITCHEN_QUESTIONS.every((q) => answers[q.key] !== null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setUploadError(null);
    const next = [...photos];
    for (const f of Array.from(files)) {
      if (!/^image\/(jpe?g|png|webp)$/i.test(f.type)) {
        setUploadError("That file couldn't be added — use a JPG or PNG under 10MB.");
        continue;
      }
      if (f.size > 10 * 1024 * 1024) {
        setUploadError("That file couldn't be added — use a JPG or PNG under 10MB.");
        continue;
      }
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setPhotos(next);
  };

  const removePhoto = (i: number) => {
    const p = photos[i];
    if (p) URL.revokeObjectURL(p.url);
    setPhotos(photos.filter((_, idx) => idx !== i));
  };

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 3 of 4"
        title="the kitchen"
        sub="A quick check so your chef knows what to expect. They confirm the evening once they've reviewed it."
      />

      <div className="space-y-16 md:space-y-20 lg:pl-[120px]">
        {chef.equipmentRequirements.length > 0 && (
          <EditorialSection num="i" title={`what ${chef.name.split(" ")[0]} needs`} lede="The essentials this chef relies on to cook the menu as planned.">
            <div className="flex flex-wrap gap-2">
              {chef.equipmentRequirements.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-[8px] border border-gold/30 bg-gold/[0.06] px-3 py-1.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </EditorialSection>
        )}

        <EditorialSection num="ii" title="the kitchen, honestly" lede="Answer as best you can. A “no” never blocks the booking — your chef just needs to know.">
          <div className="divide-y divide-cream/10 border-y border-cream/10">
            {KITCHEN_QUESTIONS.map((q) => (
              <div key={q.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
                <div className="text-[14.5px] text-cream/90 leading-snug">{q.label}</div>
                <RadioGroup
                  value={answers[q.key] ?? ""}
                  onValueChange={(v) => setAnswers({ ...answers, [q.key]: v as "yes" | "no" })}
                  className="flex items-center gap-2 shrink-0"
                >
                  {(["yes", "no"] as const).map((v) => {
                    const active = answers[q.key] === v;
                    return (
                      <label
                        key={v}
                        className={cn(
                          "inline-flex items-center justify-center rounded-[8px] border px-3.5 h-9 min-w-[68px] text-[12px] font-mono uppercase tracking-[0.14em] cursor-pointer transition-all",
                          active
                            ? v === "yes"
                              ? "border-gold bg-gold text-burgundy-deep"
                              : "border-cream bg-cream text-burgundy-deep"
                            : "border-cream/20 text-cream/70 hover:border-cream/45",
                        )}
                      >
                        <RadioGroupItem value={v} className="sr-only" />
                        {v}
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <FieldLabel>Any limitations to flag? (optional)</FieldLabel>
            <Textarea
              value={answers.limitations}
              onChange={(e) => setAnswers({ ...answers, limitations: e.target.value })}
              placeholder="Small oven, no gas, shared elevator, no outdoor space…"
              rows={3}
              className="rounded-[10px] border-cream/20 bg-cream/[0.04] text-[14px] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20 shadow-none"
            />
          </div>
        </EditorialSection>

        <EditorialSection num="iii" title="anything to bring?" lede="Tick anything you'd like your chef to arrange. Each is quoted separately — no charge until you approve it in your dashboard.">
          <div className="grid gap-2 sm:grid-cols-2">
            {EXTRA_EQUIPMENT_OPTIONS.map((e) => {
              const on = extraEquipment.includes(e.id);
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() =>
                    setExtraEquipment(
                      on ? extraEquipment.filter((x) => x !== e.id) : [...extraEquipment, e.id],
                    )
                  }
                  className={cn(
                    "text-left rounded-[10px] border p-4 transition-all cursor-pointer",
                    on
                      ? "border-gold bg-gold/[0.06]"
                      : "border-cream/12 bg-cream/[0.03] hover:border-cream/30",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 h-4 w-4 rounded border shrink-0 flex items-center justify-center",
                        on ? "border-gold bg-gold text-burgundy-deep" : "border-cream/40",
                      )}
                    >
                      {on && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <div className={cn("text-[13.5px] font-medium leading-snug", on ? "text-gold" : "text-cream")}>
                        {e.label}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-cream/55 leading-snug">{e.note}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {extraEquipment.length > 0 && (
            <div className="mt-4 flex items-start gap-3 border-t border-gold/20 pt-3 text-[12px] text-cream/75 leading-relaxed">
              <Info className="mt-0.5 h-3.5 w-3.5 text-gold shrink-0" />
              <span>
                <span className="text-gold font-medium">{extraEquipment.length}</span> extra
                {extraEquipment.length === 1 ? "" : "s"} noted. Your chef will itemise these on the final quote — nothing is charged until you approve it.
              </span>
            </div>
          )}
        </EditorialSection>

        <EditorialSection num="iv" title="a look at the room" lede="A few photos help your chef prepare. Optional, always helpful.">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-[10px] border-2 border-dashed border-cream/20 bg-cream/[0.03] px-4 py-10 flex flex-col items-center justify-center gap-2 text-[13px] text-cream/70 hover:border-cream/40 transition-colors cursor-pointer"
          >
            <Upload className="h-4 w-4 text-gold" />
            <span>Drop images or click to upload</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/40">JPG · PNG · WEBP · under 10MB</span>
          </button>
          {uploadError && (
            <div className="mt-2 text-[12px] text-gold">{uploadError}</div>
          )}
          {photos.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {photos.slice(0, 4).map((p, i) => (
                <div key={i} className="relative shrink-0 rounded-[8px] overflow-hidden border border-cream/10 w-24 h-24">
                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-black/80 cursor-pointer"
                    aria-label="Remove"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {photos.length > 4 && (
                <div className="shrink-0 rounded-[8px] border border-cream/10 bg-cream/[0.05] w-24 h-24 flex items-center justify-center text-[13px] font-medium text-cream/60">
                  +{photos.length - 4}
                </div>
              )}
            </div>
          )}
        </EditorialSection>

        <EditorialSection num="v" title="what's included" lede="Every booking, regardless of chef or menu.">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {WHATS_INCLUDED.map((b, i) => (
              <div key={b.title} className="border-t border-cream/15 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold tabular-nums">0{i + 1}</span>
                  <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/80">{b.title}</div>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.7] text-cream/65">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-l-2 border-gold/40 pl-4 text-[12.5px] text-cream/75 leading-relaxed">
            Extra setup (rented dinnerware, a portable burner, a grill…) is quoted separately by your chef, reviewed in your dashboard, and paid at confirmation — never upfront.
          </div>
        </EditorialSection>

        <div className="flex justify-start pt-4">
          <PrimaryButton disabled={!yesNoAnswered} onClick={onNext}>
            Continue to contact & pay
          </PrimaryButton>
        </div>
      </div>
    </Reveal>
  );
}

// ─── STEP 4 · PAYMENT ────────────────────────────────────────────
function PaymentStep({
  chef,
  pkg,
  isCustom,
  occasionLabel,
  date,
  time,
  onBackToChef,
  onBackToEvening,
  onSuccess,
}: {
  chef: Chef | undefined;
  pkg: { name: string; price: number; courses: number } | undefined;
  isCustom: boolean;
  occasionLabel: string;
  date?: string;
  time?: string;
  onBackToChef: () => void;
  onBackToEvening: () => void;
  onSuccess: () => void;
}) {
  const defaultMethod: "card" | "later" = isCustom ? "later" : "card";
  const [method, setMethod] = useState<"card" | "later">(defaultMethod);
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
    (method !== "card"
      ? true
      : number.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvc.length >= 3);

  const submitted = Boolean(date && time && chef && (pkg || isCustom));
  const dateLabel = date
    ? new Date(date + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : "";

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
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
        <div className="text-[15px] font-medium text-cream">Complete the earlier steps first</div>
        <p className="mt-2 text-[13.5px] text-cream/60">We need the occasion, date, chef and menu before payment.</p>
        <div className="mt-5 flex justify-center gap-2">
          <button onClick={onBackToEvening} className="text-[13px] rounded-lg border border-cream/15 px-4 h-10 hover:border-cream/40 cursor-pointer">
            Back to evening
          </button>
          <button onClick={onBackToChef} className="text-[13px] rounded-lg border border-cream/15 px-4 h-10 hover:border-cream/40 cursor-pointer">
            Back to chef
          </button>
        </div>
      </div>
    );
  }

  const totalDisplay = isCustom ? "—" : `$${pkg!.price}`;
  const dueTodayDisplay = isCustom
    ? "No charge today"
    : method === "later"
      ? "No charge today"
      : `$${deposit}`;

  return (
    <Reveal>
      <StepTitle
        eyebrow="Step 4 of 4"
        title="Contact & payment"
        sub={
          isCustom
            ? "Send your request. Your chef will review the kitchen details, propose a menu and price, and take payment once you approve."
            : `A ${Math.round((deposit / (pkg!.price || 1)) * 100)}% deposit holds the date. The rest is charged 48 hours before the evening.`
        }
      />

      <div className="space-y-8 md:space-y-10 lg:pl-[120px] max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6 min-w-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Full name</FieldLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="h-11 rounded-lg border-cream/15 bg-cream/[0.05] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25"
              />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-lg border-cream/15 bg-cream/[0.05] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25"
              />
            </div>
          </div>

          <div>
            <FieldLabel>Payment method</FieldLabel>
            <RadioGroup value={method} onValueChange={(v) => setMethod(v as typeof method)} className="space-y-2">
              {[
                { id: "card", label: "Card", note: "Visa · Mastercard · Amex", icon: <CreditCard className="h-4 w-4 text-cream/55" /> },
                { id: "later", label: "Pay after the chef confirms", note: "No charge today", icon: <Sparkles className="h-4 w-4 text-cream/55" /> },
              ].map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all bg-cream/[0.05]",
                    method === m.id
                      ? "border-gold bg-gold/[0.08] shadow-[inset_0_0_0_1px_var(--gold)]"
                      : "border-cream/10 hover:border-cream/25",
                  )}
                >
                  <RadioGroupItem value={m.id} id={`pm-${m.id}`} className="border-cream/40 text-gold" />
                  {m.icon}
                  <span className="text-[14px] text-cream">{m.label}</span>
                  <span className="ml-auto text-[11.5px] text-cream/55">{m.note}</span>
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
                  className="h-11 rounded-lg border-cream/15 bg-cream/[0.05] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25 font-mono tracking-[0.04em]"
                />
              </div>
              <div>
                <FieldLabel>Expiry</FieldLabel>
                <Input
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="h-11 rounded-lg border-cream/15 bg-cream/[0.05] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25 font-mono"
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
                  className="h-11 rounded-lg border-cream/15 bg-cream/[0.05] text-cream placeholder:text-cream/40 focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25 font-mono"
                />
              </div>
            </div>
          )}

          {method === "later" && (
            <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-4">
              <div className="text-[14px] font-medium text-cream">No charge today.</div>
              <div className="mt-1 text-[13px] text-cream/60">
                The chef confirms within 24 hours.{" "}
                {isCustom
                  ? "You'll receive a final quote for the custom menu, and pay when you approve."
                  : "You'll add a card when they accept — the date is held tentatively until then."}
              </div>
            </div>
          )}

          <div className="border-l-2 border-gold/40 pl-4 text-[12.5px] text-cream/80 leading-relaxed">
            {CONFIRMATION_GATING_STATEMENT}
          </div>

          <div className="flex items-center gap-2 text-[11.5px] text-cream/55">
            <Lock className="h-3.5 w-3.5" />
            Secure payment · You can cancel free up to 48h before
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full h-12 rounded-[12px] bg-cream text-burgundy-deep text-[14px] font-medium transition-all hover:bg-gold active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {processing
              ? "Processing…"
              : isCustom
                ? "Send request to chef"
                : method === "later"
                  ? "Send request to chef"
                  : `Pay $${deposit} deposit`}
          </button>
        </form>

        {/* mobile-only compact total (MenuPreview handles it on desktop) */}
        <div className="md:hidden mt-8 border-t border-cream/10 pt-5 flex items-baseline justify-between">
          <div className="text-[11.5px] font-mono uppercase tracking-[0.18em] text-cream/55">Due today</div>
          <div className="text-[16px] font-semibold text-gold tabular-nums">{dueTodayDisplay}</div>
        </div>
      </div>
    </Reveal>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3">
      <dt className="text-[12px] shrink-0 text-cream/55">{k}</dt>
      <dd className="min-w-0 text-right text-[13px] truncate text-cream">{v}</dd>
    </div>
  );
}

// ─── Editorial live menu preview ────────────────────────────────
function MenuPreview({
  stepIdx,
  guestName,
  occasionLabel,
  date,
  time,
  chef,
  pkg,
  isCustom,
}: {
  stepIdx: number;
  guestName?: string;
  occasionLabel?: string;
  date?: string;
  time?: string;
  chef: Chef | undefined;
  pkg: { id: string; name: string; price: number; courses: number; description: string; inclusions: string[] } | undefined;
  isCustom: boolean;
}) {
  const dateLabel = date
    ? new Date(date + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : undefined;
  const nameLine = guestName?.trim();
  const courseCount = pkg?.courses ?? (isCustom ? 5 : 4);
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"];
  const courses = Array.from({ length: courseCount }, (_, i) => ({
    roman: romans[i] ?? String(i + 1),
    key: i,
  }));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full text-ink"
      style={{
        background:
          "radial-gradient(140% 90% at 50% 0%, rgba(201,169,97,0.14) 0%, transparent 55%), linear-gradient(180deg, #F4EFE7 0%, #EFE8DC 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-3 border border-ink/15" />
      <div className="pointer-events-none absolute inset-[14px] border border-ink/5" />

      <div className="relative px-7 pt-8 pb-7">
        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.28em] text-ink/50">
          <span>Love at First Sight</span>
          <span>N°{String((stepIdx ?? 0) + 1).padStart(2, "0")}</span>
        </div>

        <div className="mt-8 text-center">
          <div className="text-[9px] font-mono uppercase tracking-[0.32em] text-ink/45">a menu prepared for</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={nameLine || "blank"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "mt-3 font-serif italic tracking-[-0.005em] leading-[1.05] text-[34px] break-words",
                nameLine ? "text-ink" : "text-ink/25",
              )}
            >
              {nameLine || "your name"}
            </motion.div>
          </AnimatePresence>
          <div className={cn("mt-3 font-serif italic text-[15px]", occasionLabel ? "text-burgundy" : "text-ink/35")}>
            for {occasionLabel ?? "an evening"}
          </div>
        </div>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/20" />
          <span className="text-gold text-[13px] leading-none">✦</span>
          <div className="h-px flex-1 bg-ink/20" />
        </div>

        <div className="text-center">
          <div className="text-[9px] font-mono uppercase tracking-[0.32em] text-ink/45">the menu</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={pkg?.id ?? (isCustom ? "custom" : "blank")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="mt-2"
            >
              <div className={cn("font-serif italic text-[22px] leading-tight", pkg || isCustom ? "text-ink" : "text-ink/30")}>
                {isCustom ? "a menu, designed for you" : pkg?.name ?? "to be chosen"}
              </div>
              {pkg?.description && (
                <p className="mt-2 font-serif text-[13.5px] leading-[1.55] text-ink/70 max-w-[32ch] mx-auto">
                  {pkg.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 space-y-1.5">
          {courses.map(({ roman, key }, i) => (
            <motion.div
              key={`${pkg?.id ?? "x"}-${key}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: pkg || isCustom ? 1 : 0.35, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-3"
            >
              <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/40 tabular-nums">{roman}</span>
              <span className="h-px bg-ink/15 self-center" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/45">course</span>
            </motion.div>
          ))}
        </div>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/20" />
          <span className="text-ink/30 text-[10px] leading-none">·</span>
          <div className="h-px flex-1 bg-ink/20" />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.22em] text-ink/45">Date</div>
            <div className={cn("mt-1 text-[10.5px] font-mono", dateLabel ? "text-ink" : "text-ink/25")}>
              {dateLabel ?? "— — —"}
            </div>
          </div>
          <div>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.22em] text-ink/45">Arrival</div>
            <div className={cn("mt-1 text-[10.5px] font-mono tabular-nums", time ? "text-ink" : "text-ink/25")}>
              {time ?? "—:—"}
            </div>
          </div>
          <div>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.22em] text-ink/45">Total</div>
            <div className={cn("mt-1 font-display font-bold text-[13px] tabular-nums", pkg || isCustom ? "text-burgundy" : "text-ink/25")}>
              {pkg ? `$${pkg.price}` : isCustom ? "TBD" : "$—"}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
          {chef ? (
            <img src={chef.portrait} alt="" className="h-8 w-8 rounded-full object-cover border border-ink/10" />
          ) : (
            <div className="h-8 w-8 rounded-full border border-dashed border-ink/25" />
          )}
          <div className="min-w-0 flex-1">
            <div className="text-[8.5px] font-mono uppercase tracking-[0.22em] text-ink/45">Prepared by</div>
            <div className={cn("font-serif italic text-[15px] truncate", chef ? "text-ink" : "text-ink/30")}>
              {chef ? chef.name : "a chef, to be chosen"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display font-bold text-gold text-[16px] leading-none">L</div>
            <div className="text-[7.5px] font-mono uppercase tracking-[0.28em] text-ink/40 mt-0.5">seal</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessScreen({
  bookingId,
  guestName,
  occasionLabel,
  dateLabel,
  time,
  chef,
  pkg,
  isCustom,
}: {
  bookingId: string;
  guestName?: string;
  occasionLabel: string;
  dateLabel?: string;
  time?: string;
  chef: Chef;
  pkg?: Chef["packages"][number];
  isCustom?: boolean;
}) {
  return (
    <Reveal>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-cream/45">
          <span>Love at First Sight</span>
          <span className="tabular-nums">{bookingId}</span>
        </div>

        <div className="mt-10 md:mt-14 text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.32em] text-gold">the request is in</div>
          <h1 className="mt-5 md:mt-6 font-display font-bold lowercase text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-[-0.03em] text-cream">
            a table,<br />held for you.
          </h1>
          <p className="mx-auto mt-6 md:mt-8 max-w-md text-[14px] leading-[1.75] text-cream/70">
            {chef.name.split(" ")[0]} has 24 hours to review the kitchen and confirm.
            Every detail lives in your dashboard from here.
          </p>
        </div>

        <div className="my-10 md:my-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-cream/15" />
          <span className="text-gold text-[16px] leading-none">✦</span>
          <div className="h-px flex-1 bg-cream/15" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 items-start">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-6">
                <MetaBlock k="For" v={guestName || "you"} />
                <MetaBlock k="Occasion" v={occasionLabel} />
                <MetaBlock k="Date" v={dateLabel || "—"} />
                <MetaBlock k="Arrival" v={time || "—"} mono />
              </div>
              <div className="space-y-6">
                <MetaBlock k="The menu" v={isCustom ? "a menu designed for you" : pkg ? pkg.name : "Selected menu"} />
                {!isCustom && pkg && <MetaBlock k="Courses" v={String(pkg.courses)} />}
                <MetaBlock k="Prepared by" v={`${chef.name} · ${chef.city}`} />
                <MetaBlock k="Total" v={isCustom ? "quoted in dashboard" : pkg ? `$${pkg.price}` : "$220"} accent />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <MenuPreview
              stepIdx={4}
              guestName={guestName}
              occasionLabel={occasionLabel}
              date={dateLabel}
              time={time}
              chef={chef}
              pkg={pkg}
              isCustom={!!isCustom}
            />
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col-reverse sm:flex-row sm:justify-start gap-3">
          <Link
            href="/chefs"
            className="inline-flex h-11 items-center justify-center border border-cream/25 px-5 text-[11px] font-mono uppercase tracking-[0.22em] text-cream/80 hover:text-cream hover:border-cream/60 transition-colors rounded-[10px]"
          >
            back to chefs
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center bg-cream text-burgundy-deep px-6 text-[11px] font-mono uppercase tracking-[0.22em] hover:bg-cream/90 transition-colors rounded-[10px]"
          >
            open dashboard →
          </Link>
        </div>

        <p className="mt-10 text-[10px] font-mono uppercase tracking-[0.28em] text-cream/35">
          prototype — no real payment is processed
        </p>
      </div>
    </Reveal>
  );
}

function MetaBlock({ k, v, mono, accent }: { k: string; v: string; mono?: boolean; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-cream/45">{k}</div>
      <div
        className={cn(
          "mt-1.5 text-[15px] leading-snug",
          mono && "font-mono tabular-nums",
          accent ? "font-display font-bold text-[22px] text-gold" : "text-cream",
        )}
      >
        {v}
      </div>
    </div>
  );
}
