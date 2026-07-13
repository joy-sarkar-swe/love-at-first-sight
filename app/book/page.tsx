"use client";

import * as React from "react";
import { useMemo, useState, Suspense } from "react";
import { format } from "date-fns";
import { CalendarIcon, CreditCard, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  CinematicHero,
  Reveal,
  Section,
} from "@/components/ui-lafs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { chefs, getChef, occasions } from "@/data/chefs";

const ALL_STEPS = ["occasion", "chef", "package", "when", "payment"] as const;
type Step = (typeof ALL_STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  occasion: "the occasion",
  chef: "the chef",
  package: "the package",
  when: "the date",
  payment: "payment",
};

const IMG = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-burgundy text-cream">
        <div className="label">loading reservation...</div>
      </div>
    }>
      <BookingFlow />
    </Suspense>
  );
}

function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const stepParam = searchParams.get("step") || "occasion";
  const occasion = searchParams.get("occasion") || undefined;
  const chefSlug = searchParams.get("chef") || undefined;
  const packageId = searchParams.get("packageId") || undefined;
  const date = searchParams.get("date") || undefined;
  const time = searchParams.get("time") || undefined;

  // If a chef is preselected (e.g. from a chef detail page), skip the chef
  // picker step entirely — asking again would be nonsense UX.
  const preselectedChef = Boolean(chefSlug);
  const steps: Step[] = preselectedChef
    ? ["occasion", "package", "when", "payment"]
    : ["occasion", "chef", "package", "when", "payment"];

  let step = stepParam as Step;
  if (step === "chef" && preselectedChef) step = "package";
  const stepIdx = Math.max(0, steps.indexOf(step));
  const [success, setSuccess] = useState(false);

  const goto = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const back = () => {
    if (stepIdx > 0) goto({ step: steps[stepIdx - 1] });
  };

  const selectedChef = chefSlug ? getChef(chefSlug) : undefined;
  const selectedPackage = useMemo(() => {
    if (!selectedChef || !packageId) return undefined;
    return selectedChef.packages.find((p) => p.id === packageId);
  }, [selectedChef, packageId]);

  const occasionLabel = occasions.find((o) => o.id === occasion)?.label ?? "an evening";

  return (
    <>
      <CinematicHero
        image={IMG("photo-1544025162-d76694265947")}
        badge={`Step ${stepIdx + 1} of ${steps.length}`}
        headline={"Tell us\nThe shape\nOf the evening."}
        height="compact"
      />

      <Section tone="burgundy">
        <div className="mx-auto max-w-5xl">
          <div className={`grid gap-2 md:gap-3 ${steps.length === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
            {steps.map((s, i) => {
              const active = i === stepIdx;
              const done = i < stepIdx;
              return (
                <div key={s} className="border-t border-cream/15 pt-3">
                  <div className={`h-[2px] w-full transition-colors duration-300 ease-out ${done || active ? "bg-cream" : "bg-cream/15"}`} />
                  <div className={`mt-3 num ${active ? "text-cream" : done ? "text-cream/60" : "text-cream/30"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={`mt-1 text-[11px] md:text-[13px] font-mono uppercase tracking-[0.14em] ${active ? "text-cream" : "text-cream/40"}`}>
                    {STEP_LABELS[s]}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex items-center justify-between text-[13px]">
            <div className="label">step {stepIdx + 1} of {steps.length}</div>
            {stepIdx > 0 && (
              <button onClick={back} className="text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70 hover:text-cream transition-colors cursor-pointer">
                ← back
              </button>
            )}
          </div>

          <div key={step} className="mt-16 md:mt-20 animate-[fadein_300ms_ease-out]">
            {step === "occasion" && (
              <OccasionStep selected={occasion} onPick={(o) => goto({ occasion: o, step: preselectedChef ? "package" : "chef" })} />
            )}
            {step === "chef" && (
              <ChefStep selected={chefSlug} onPick={(slug) => goto({ chef: slug, step: "package" })} />
            )}
            {step === "package" && (
              <PackageStep chefSlug={chefSlug} onPick={(id) => goto({ packageId: id, step: "when" })} onChooseChef={() => goto({ step: "chef" })} />
            )}
            {step === "when" && (
              <WhenStep date={date} time={time} onSubmit={(dateStr, timeStr) => goto({ date: dateStr, time: timeStr, step: "payment" })} />
            )}
            {step === "payment" && (
              <PaymentStep
                chef={selectedChef}
                pkg={selectedPackage}
                occasionLabel={occasionLabel}
                date={date}
                time={time}
                onSuccess={() => setSuccess(true)}
              />
            )}
          </div>
        </div>
      </Section>

      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        chef={selectedChef}
        pkg={selectedPackage}
        occasionLabel={occasionLabel}
        date={date}
        time={time}
      />
    </>
  );
}

function StepHeadline({ step, lines }: { step: string; lines: string[] }) {
  return (
    <div>
      <div className="label">{step}</div>
      <h2 className="mt-8 text-stack">
        {lines.map((l, i) => (<span key={i} className="block">{l}</span>))}
      </h2>
    </div>
  );
}

function OccasionStep({ selected, onPick }: { selected?: string; onPick: (id: string) => void }) {
  return (
    <Reveal>
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-16">
        <div className="md:col-span-5 md:pr-4">
          <StepHeadline step="step one" lines={["what are", "we", "celebrating?"]} />
        </div>
        <div className="md:col-span-7">
          <ul className="border-t border-cream/15">
            {occasions.map((o, i) => {
              const active = selected === o.id;
              return (
                <li key={o.id} className="border-b border-cream/15">
                  <button onClick={() => onPick(o.id)} className={`group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 py-6 text-left transition-colors cursor-pointer ${active ? "bg-cream/5 px-3 -mx-3" : ""}`}>
                    <span className={`num shrink-0 ${active ? "text-cream" : ""}`}>{active ? "●" : String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className={`font-display font-bold lowercase text-xl md:text-[26px] tracking-[-0.02em] ${active ? "text-cream" : "text-cream group-hover:text-cream/80"}`}>
                        {o.label}
                      </div>
                      <div className="mt-1 text-[14px] text-cream/60">{o.blurb}</div>
                    </div>
                    <span className={`shrink-0 transition-colors ${active ? "text-cream" : "text-cream/50 group-hover:text-cream"}`}>{active ? "✓" : "→"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function ChefStep({ selected, onPick }: { selected?: string; onPick: (slug: string) => void }) {
  return (
    <Reveal>
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5">
          <StepHeadline step="step two" lines={["choose", "your chef."]} />
        </div>
        <div className="md:col-span-7">
          <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2">
            {chefs.map((c, i) => (
              <button key={c.slug} onClick={() => onPick(c.slug)} className="group text-left cursor-pointer">
                <div className={`overflow-hidden transition-all ${selected === c.slug ? "outline outline-2 outline-gold outline-offset-4" : ""}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={c.portrait} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="font-display font-bold lowercase text-lg md:text-xl text-cream group-hover:text-cream transition-colors">
                    {c.name}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-[11px] font-mono uppercase tracking-[0.14em]">
                  <div className="text-cream/60 truncate">{c.cuisine} · {c.city}</div>
                  <div className="text-gold shrink-0">from ${c.startingPrice}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PackageStep({ chefSlug, onPick, onChooseChef }: { chefSlug?: string; onPick: (id: string) => void; onChooseChef: () => void }) {
  const chef = chefSlug ? getChef(chefSlug) : undefined;
  if (!chef) {
    return (
      <div className="border-t border-cream/15 pt-12 text-center">
        <div className="label">missing</div>
        <p className="mt-6 font-display font-bold text-2xl text-cream lowercase">choose a chef first.</p>
        <button onClick={onChooseChef} className="mt-10 inline-flex h-12 items-center rounded-[12px] border border-cream/50 px-6 text-[11px] font-mono uppercase tracking-[0.14em] text-cream hover:border-cream cursor-pointer">
          pick a chef
        </button>
      </div>
    );
  }
  return (
    <Reveal>
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5">
          <StepHeadline step="step three" lines={["choose", "a menu with", chef.name.split(" ")[0].toLowerCase() + "."]} />
        </div>
        <div className="md:col-span-7">
          <ul className="border-t border-cream/15">
            {chef.packages.map((p, i) => (
              <li key={p.id} className="border-b border-cream/15">
                <button onClick={() => onPick(p.id)} className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-4 md:gap-6 py-8 text-left cursor-pointer">
                  <span className="num shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="font-display font-bold lowercase text-xl md:text-[26px] tracking-[-0.02em] text-cream group-hover:text-cream transition-colors">
                      {p.name}
                    </div>
                    <p className="mt-2 text-[15px] text-cream/70 max-w-md">{p.description}</p>
                    <div className="mt-2 label">{p.courses} courses</div>
                  </div>
                  <div className="shrink-0 font-display font-bold text-xl md:text-2xl text-cream tabular-nums">${p.price}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function WhenStep({ date, time, onSubmit }: { date?: string; time?: string; onSubmit: (date: string, time: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [pickedDate, setPickedDate] = useState<Date | undefined>(date ? new Date(date) : undefined);
  const [pickedTime, setPickedTime] = useState<string>(time ?? "19:00");
  return (
    <Reveal>
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5">
          <StepHeadline step="step four" lines={["when", "shall they", "arrive?"]} />
        </div>
        <div className="md:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!pickedDate) return;
              onSubmit(pickedDate.toISOString().slice(0, 10), pickedTime);
            }}
            className="space-y-10 border-t border-cream/15 pt-10"
          >
            <div className="block">
              <div className="label">date</div>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "mt-3 flex w-full items-center gap-3 border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-lg text-cream text-left hover:border-cream/60 focus:border-cream focus:outline-none cursor-pointer",
                      !pickedDate && "text-cream/50",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 shrink-0 opacity-70" />
                    {pickedDate ? format(pickedDate, "EEEE, MMMM d, yyyy") : "Pick a date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto bg-burgundy-deep border-cream/20 text-cream" align="start">
                  <Calendar
                    mode="single"
                    selected={pickedDate}
                    onSelect={setPickedDate}
                    disabled={(d) => d < today}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="block">
              <div className="label">arrival time</div>
              <Select value={pickedTime} onValueChange={setPickedTime}>
                <SelectTrigger className="mt-3 w-full border-0 border-b border-cream/25 bg-transparent rounded-none px-0 py-3 text-cream text-lg h-auto hover:border-cream/60 focus:border-cream focus:ring-0 focus:ring-offset-0 cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-burgundy-deep border-cream/20 text-cream">
                  {["17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"].map((t) => (
                    <SelectItem key={t} value={t} className="text-cream focus:bg-cream/10 focus:text-cream cursor-pointer">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <button type="submit" disabled={!pickedDate} className="inline-flex h-14 items-center rounded-[12px] border border-cream/70 px-9 text-[12px] font-mono uppercase tracking-[0.14em] text-cream transition-all hover:border-cream hover:bg-cream hover:text-burgundy active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </Reveal>
  );
}

function PaymentStep({ chef, pkg, occasionLabel, date, time, onSuccess }: {
  chef: ReturnType<typeof getChef>;
  pkg: { name: string; price: number; courses: number } | undefined;
  occasionLabel: string;
  date?: string;
  time?: string;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<"card" | "apple" | "later">("card");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const deposit = pkg ? Math.round(pkg.price * 0.2) : 0;
  const canSubmit = !processing && (method !== "card"
    ? true
    : (name.length > 1 && number.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvc.length >= 3));

  const submitted = date && time && chef && pkg;
  const dateLabel = date
    ? new Date(date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
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
    // simulate network
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 700);
  };

  if (!submitted) {
    return (
      <Reveal>
        <div className="border-t border-cream/15 pt-12 text-center max-w-md mx-auto">
          <div className="label">missing</div>
          <p className="mt-6 font-display font-bold text-2xl text-cream lowercase">
            complete the earlier steps first.
          </p>
          <p className="mt-3 text-cream/60 text-[14px]">We need the occasion, package, and date before payment.</p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5 md:sticky md:top-24 self-start">
          <StepHeadline step={`step ${totalWithoutChef(chef) ? "four" : "five"}`} lines={["how would you", "like to", "settle?"]} />

          {/* Order summary */}
          <div className="mt-10 rounded-[14px] border border-cream/15 bg-cream/[0.03] p-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
              <img src={chef!.portrait} alt={chef!.name} className="h-14 w-14 rounded-full object-cover border border-cream/20" />
              <div className="min-w-0">
                <div className="font-display font-bold text-lg lowercase text-cream truncate">{chef!.name}</div>
                <div className="text-[12px] font-mono uppercase tracking-[0.14em] text-cream/50 truncate">{chef!.cuisine} · {chef!.city}</div>
              </div>
            </div>
            <dl className="mt-6 space-y-3 border-t border-cream/10 pt-5 text-[13px]">
              <SummaryRow k="Occasion" v={occasionLabel} />
              <SummaryRow k="Package" v={`${pkg!.name} · ${pkg!.courses} courses`} />
              <SummaryRow k="Date" v={dateLabel} />
              <SummaryRow k="Arrival" v={time!} />
            </dl>
            <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 border-t border-cream/10 pt-5">
              <div className="label text-cream/50">Total</div>
              <div className="font-display font-bold text-2xl text-cream tabular-nums">${pkg!.price}</div>
            </div>
            <div className="mt-1 text-right text-[11px] font-mono uppercase tracking-[0.14em] text-cream/40">
              ${deposit} today · rest 48h before
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="border-t border-cream/15 pt-10 space-y-10">
            <div>
              <div className="label text-cream/60">Payment method</div>
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as typeof method)} className="mt-4 space-y-2">
                {[
                  { id: "card", label: "Card", note: "Visa · Mastercard · Amex", icon: <CreditCard className="h-4 w-4 text-cream/70" /> },
                  { id: "apple", label: "Apple Pay", note: "Face ID / Touch ID", icon: <span className="text-cream/70 text-[15px] leading-none"> Pay</span> },
                  { id: "later", label: "Pay after approval", note: "Chef confirms first", icon: <Sparkles className="h-4 w-4 text-cream/70" /> },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex items-center gap-4 rounded-[12px] border px-5 py-4 cursor-pointer transition-all",
                      method === m.id
                        ? "border-cream bg-cream/[0.06] shadow-[inset_0_0_0_1px_rgba(245,238,224,0.15)]"
                        : "border-cream/15 hover:border-cream/40",
                    )}
                  >
                    <RadioGroupItem value={m.id} id={`pm-${m.id}`} className="border-cream/60 text-cream" />
                    {m.icon}
                    <span className="text-cream text-[15px]">{m.label}</span>
                    <span className="ml-auto text-[11px] font-mono uppercase tracking-[0.14em] text-cream/45">{m.note}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {method === "card" && (
              <div className="space-y-6">
                {/* Mock card preview */}
                <div className="relative aspect-[1.586/1] max-w-[420px] overflow-hidden rounded-[16px] p-6 text-cream shadow-[0_20px_60px_-24px_rgba(0,0,0,0.6)] border border-cream/10 animate-[fadein_200ms_ease-out]"
                  style={{
                    background:
                      "radial-gradient(120% 140% at 0% 0%, rgba(196,165,90,0.35) 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, rgba(103,36,43,0.7) 0%, transparent 60%), linear-gradient(135deg, #2A1013 0%, #4A1A1F 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold uppercase text-[12px] tracking-[0.14em] text-cream/85">Love at First Sight</span>
                    <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-gold">VISA</span>
                  </div>
                  <div className="mt-8 h-8 w-11 rounded-[6px] bg-gradient-to-br from-gold to-[#8a7434] shadow-inner" aria-hidden />
                  <div className="mt-5 font-mono text-[17px] tracking-[0.18em] text-cream/95">
                    {(formatCardNumber(number) || "0000 0000 0000 0000").padEnd(19, "•")}
                  </div>
                  <div className="mt-4 grid grid-cols-2 items-end">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-cream/50">Cardholder</div>
                      <div className="mt-0.5 text-[13px] uppercase tracking-wide truncate">{name || "Your name"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-cream/50">Expires</div>
                      <div className="mt-0.5 text-[13px] font-mono">{exp || "MM/YY"}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="col-span-2">
                    <Label htmlFor="pay-name" className="label text-cream/60">Cardholder name</Label>
                    <Input id="pay-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="A. Guest" className="mt-3 h-12 rounded-[10px] border-cream/20 bg-cream/[0.04] text-cream placeholder:text-cream/40 focus-visible:border-cream focus-visible:ring-0" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="pay-num" className="label text-cream/60">Card number</Label>
                    <Input id="pay-num" value={number} onChange={(e) => setNumber(formatCardNumber(e.target.value))} placeholder="4242 4242 4242 4242" inputMode="numeric" maxLength={23} className="mt-3 h-12 rounded-[10px] border-cream/20 bg-cream/[0.04] text-cream placeholder:text-cream/40 focus-visible:border-cream focus-visible:ring-0 font-mono tracking-[0.06em]" />
                  </div>
                  <div>
                    <Label htmlFor="pay-exp" className="label text-cream/60">Expiry</Label>
                    <Input id="pay-exp" value={exp} onChange={(e) => setExp(formatExp(e.target.value))} placeholder="MM/YY" maxLength={5} className="mt-3 h-12 rounded-[10px] border-cream/20 bg-cream/[0.04] text-cream placeholder:text-cream/40 focus-visible:border-cream focus-visible:ring-0 font-mono" />
                  </div>
                  <div>
                    <Label htmlFor="pay-cvc" className="label text-cream/60">CVC</Label>
                    <Input id="pay-cvc" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" maxLength={4} inputMode="numeric" className="mt-3 h-12 rounded-[10px] border-cream/20 bg-cream/[0.04] text-cream placeholder:text-cream/40 focus-visible:border-cream focus-visible:ring-0 font-mono" />
                  </div>
                </div>
              </div>
            )}

            {method === "apple" && (
              <div className="rounded-[12px] border border-cream/15 bg-cream/[0.04] p-6 text-center animate-[fadein_200ms_ease-out]">
                <div className="text-cream/70 text-[14px]">You'll be prompted to authorize with Face ID or Touch ID after confirming.</div>
              </div>
            )}
            {method === "later" && (
              <div className="rounded-[12px] border border-cream/15 bg-cream/[0.04] p-6 animate-[fadein_200ms_ease-out]">
                <div className="text-cream text-[14px] font-medium">No charge today.</div>
                <div className="mt-1 text-cream/60 text-[13px] leading-relaxed">The chef will confirm within 24 hours. You'll add a card when they accept — the date is only held tentatively until then.</div>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-cream/15 pt-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-cream/50">
                <Lock className="h-3.5 w-3.5" />
                Secured · prototype only
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-[14px] bg-cream px-8 text-[12px] font-mono uppercase tracking-[0.14em] text-burgundy transition-all hover:bg-[#F0E8DE] hover:text-[#1A1614] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-bold"
              >
                {processing ? "processing…" : (
                  <>
                    <span>Pay ${deposit} · Book the night</span>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Reveal>
  );
}

function totalWithoutChef(chef: unknown) { return Boolean(chef); }

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4">
      <dt className="label text-cream/45 shrink-0">{k}</dt>
      <dd className="min-w-0 text-right text-[13px] text-cream truncate">{v}</dd>
    </div>
  );
}

function SuccessDialog({ open, onOpenChange, chef, pkg, occasionLabel, date, time }: {
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
  const bookingId = date ? `LAFS-${chef.slug.slice(0, 3).toUpperCase()}-${date.replace(/-/g, "").slice(2)}` : "LAFS-000000";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-0 p-0 bg-burgundy-deep text-cream max-w-lg max-h-[92vh] overflow-y-auto rounded-[18px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
      >
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
              <path d="M5 12.5L10 17.5L19 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mt-6 label text-cream/60">the evening is on the calendar</div>
          <DialogHeader className="mt-3">
            <DialogTitle className="font-display font-bold text-[32px] leading-[1.1] lowercase tracking-[-0.02em] text-cream text-center">
              your table is booked.
            </DialogTitle>
            <DialogDescription className="text-cream/70 text-[14px] leading-relaxed pt-3 max-w-sm mx-auto text-center">
              A confirmation has been sent. {chef.name.split(" ")[0]} will follow up within 24 hours — all inside your dashboard.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Booking card */}
        <div className="px-6 md:px-8 pb-8 -mt-2">
          <div className="rounded-[14px] border border-cream/15 bg-cream/[0.04] backdrop-blur-sm p-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-cream/10 pb-5">
              <img src={chef.portrait} alt={chef.name} className="h-12 w-12 rounded-full object-cover border border-cream/15" />
              <div className="min-w-0">
                <div className="font-display font-bold text-[17px] lowercase text-cream truncate">{chef.name}</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-cream/50 truncate">{chef.cuisine} · {chef.city}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-cream/40">Booking</div>
                <div className="text-[11px] font-mono text-cream/80">{bookingId}</div>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-[13px]">
              <SummaryRow k="Occasion" v={occasionLabel} />
              <SummaryRow k="Package" v={`${pkg.name} · ${pkg.courses} courses`} />
              {dateLabel && <SummaryRow k="Date" v={dateLabel} />}
              {time && <SummaryRow k="Arrival" v={time} />}
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
