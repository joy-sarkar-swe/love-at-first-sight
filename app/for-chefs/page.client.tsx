"use client";

import { CinematicHero, Reveal, Section } from "@/components/ui-lafs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const IMG = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO = IMG("photo-1556909114-f6e7ad7d3136", 2200);

const benefits = [
  {
    n: "01",
    t: "Set your own prices",
    b: "You decide what your time and talent are worth. Set package prices that reflect your experience.",
  },
  {
    n: "02",
    t: "Build your reputation",
    b: "Every booking builds your profile with real guest reviews. The better you cook, the more you're discovered.",
  },
  {
    n: "03",
    t: "We handle the rest",
    b: "Payments, scheduling, and guest communication all happen through the platform. You focus on the food.",
  },
];

const steps = [
  {
    n: "01",
    t: "Apply",
    b: "Tell us about your cuisine, your experience, and your style.",
  },
  {
    n: "02",
    t: "Get approved",
    b: "We review every application to maintain quality for guests.",
  },
  {
    n: "03",
    t: "Publish your gigs",
    b: "Create packages with your menus, pricing, and availability.",
  },
  {
    n: "04",
    t: "Start cooking",
    b: "Guests book you directly. You get paid after every dinner.",
  },
];

const testimonials = [
  {
    quote:
      "I set my own hours, cook my own menus, and get paid within 48 hours of every dinner. It's the freedom I couldn't find in restaurant work.",
    name: "Elena M.",
    role: "Italian · New York",
  },
  {
    quote:
      "The platform brought me guests who actually cared about my cuisine. I've built a following I never had cooking in someone else's kitchen.",
    name: "Amara O.",
    role: "Modern Nigerian · London",
  },
  {
    quote:
      "Everything I need — bookings, payments, reviews — in one place. I just show up and cook.",
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
        badge='For Private Chefs'
        headline={"Your kitchen.\nYour menu.\nYour clients."}
        caption='Join a marketplace built for independent chefs. Set your own prices, publish your own menus, and connect with guests who value your craft.'
        height='compact'>
        <button
          type='button'
          onClick={() => {
            setSubmitted(false);
            setOpen(true);
          }}
          className='group/cta inline-flex h-[46px] cursor-pointer items-center gap-2.5 rounded-[16px] bg-cream text-burgundy border border-cream px-1.5 pr-5 text-[13px] font-medium tracking-tight transition-all duration-200 hover:bg-[#F0E8DE] active:scale-[0.97]'>
          <span className='inline-flex h-[36px] w-[36px] items-center justify-center rounded-[12px] bg-burgundy text-cream'>
            <svg
              width='14'
              height='10'
              viewBox='0 0 14 10'
              fill='none'
              aria-hidden
              className='transition-transform duration-200 group-hover/cta:translate-x-0.5'>
              <path
                d='M1 5H13M13 5L9 1M13 5L9 9'
                stroke='currentColor'
                strokeWidth='1.4'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          <span>Apply to cook</span>
        </button>
      </CinematicHero>

      {/* N°01 — Why */}
      <Section tone='paper'>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-16 items-start'>
          <div className='md:col-span-4'>
            <Reveal>
              <div className='label text-ink/60'>
                N°01 · Why Love at First Sight
              </div>
              <h2 className='mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink'>
                <span className='block'>Cook on</span>
                <span className='block text-ink/50'>your terms.</span>
              </h2>
            </Reveal>
          </div>
          <div className='md:col-span-8'>
            <ul className='border-t border-ink/15'>
              {benefits.map((b, i) => (
                <Reveal key={b.n} delay={i * 80}>
                  <li className='border-b border-ink/15 py-10'>
                    <div className='grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline'>
                      <span className='num text-ink/50 shrink-0'>{b.n}</span>
                      <div className='min-w-0'>
                        <div className='font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-ink'>
                          {b.t}
                        </div>
                        <p className='mt-3 max-w-md text-[15px] leading-relaxed text-ink/70'>
                          {b.b}
                        </p>
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
      <Section tone='burgundy'>
        <div className='grid gap-10 md:grid-cols-12 md:gap-x-16 items-start'>
          <div className='md:col-span-4'>
            <Reveal>
              <div className='label'>N°02 · How it works</div>
              <h2 className='mt-8 text-stack'>
                <span className='block'>Four steps</span>
                <span className='block'>to your first</span>
                <span className='block text-cream/50'>booking.</span>
              </h2>
            </Reveal>
          </div>
          <div className='md:col-span-8'>
            <ul className='border-t border-cream/15'>
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <li className='border-b border-cream/15 py-10'>
                    <div className='grid grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-10 items-baseline'>
                      <span className='num text-cream/50 shrink-0'>{s.n}</span>
                      <div className='min-w-0'>
                        <div className='font-display font-bold lowercase text-2xl md:text-3xl tracking-[-0.02em] text-cream'>
                          {s.t}
                        </div>
                        <p className='mt-3 max-w-md text-[15px] leading-relaxed text-cream/70'>
                          {s.b}
                        </p>
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
      <Section tone='paper'>
        <div className='grid gap-12 md:grid-cols-12 md:gap-x-16 items-center'>
          <div className='md:col-span-5'>
            <Reveal>
              <div className='label text-ink/60'>N°03 · The split</div>
              <h2 className='mt-8 font-display font-bold text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink'>
                <span className='block'>You keep</span>
                <span className='block text-ink/50'>85%.</span>
              </h2>
              <p className='mt-8 max-w-md text-[15px] leading-relaxed text-ink/70'>
                For every booking, you receive 85% of the package price. The
                platform keeps 15% to cover payment processing, guest support,
                and marketing that brings diners to your profile.
              </p>
            </Reveal>
          </div>
          <div className='md:col-span-7'>
            <Reveal delay={120}>
              <div className='text-center md:text-right'>
                <div
                  className='font-display font-bold text-ink leading-none tracking-[-0.05em]'
                  style={{ fontSize: "clamp(9rem, 24vw, 22rem)" }}>
                  85<span className='text-ink/40'>%</span>
                </div>
                <div className='mt-4 label text-ink/50'>
                  to the chef · every booking
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* N°04 — Testimonials */}
      <Section tone='burgundy'>
        <div className='grid gap-12 md:grid-cols-12 md:gap-x-16'>
          <div className='md:col-span-4'>
            <Reveal>
              <div className='label'>N°04 · From our chefs</div>
              <h2 className='mt-8 text-stack'>
                <span className='block'>In their</span>
                <span className='block text-cream/50'>words.</span>
              </h2>
            </Reveal>
          </div>
          <div className='md:col-span-8 space-y-14'>
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className='grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-t border-cream/15 pt-8 md:gap-8'>
                  <div className='num shrink-0 pt-1'>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className='min-w-0'>
                    <blockquote className='font-display font-bold text-[clamp(1.1rem,1.8vw,1.55rem)] leading-[1.3] tracking-[-0.02em] text-cream'>
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className='mt-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream/70'>
                      {t.name} — {t.role}
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* N°05 — CTA */}
      <Section tone='paper'>
        <div className='text-center max-w-3xl mx-auto'>
          <Reveal>
            <div className='label text-ink/60'>N°05 · Ready?</div>
            <h2 className='mt-8 font-display font-bold text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-ink'>
              <span className='block'>Bring your</span>
              <span className='block'>kitchen to</span>
              <span className='block text-ink/50'>the world.</span>
            </h2>
            <p className='mt-10 max-w-lg mx-auto text-[16px] leading-relaxed text-ink/70'>
              We're onboarding chefs in select cities. Apply today and we'll be
              in touch within 48 hours.
            </p>
            <div className='mt-14 flex justify-center'>
              <button
                type='button'
                onClick={() => {
                  setSubmitted(false);
                  setOpen(true);
                }}
                className='group/cta relative inline-flex h-[44px] cursor-pointer items-center gap-2.5 rounded-[16px] bg-burgundy text-cream border border-burgundy shadow-[0_14px_36px_-14px_rgba(0,0,0,0.55)] px-1.5 pr-4 text-[13px] font-medium tracking-tight transition-all duration-200 hover:bg-burgundy-deep hover:border-burgundy-deep active:scale-[0.97]'>
                <span className='inline-flex h-[34px] w-[34px] items-center justify-center rounded-[12px] bg-cream text-burgundy'>
                  <svg
                    width='14'
                    height='10'
                    viewBox='0 0 14 10'
                    fill='none'
                    aria-hidden
                    className='transition-transform duration-200 group-hover/cta:translate-x-0.5'>
                    <path
                      d='M1 5H13M13 5L9 1M13 5L9 9'
                      stroke='currentColor'
                      strokeWidth='1.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
                <span>Apply Now</span>
              </button>
            </div>
            <div className='mt-10 flex justify-center gap-4 flex-wrap animate-[fadein_300ms_ease-out]'>
              <Link
                href='/chef-handbook'
                className='text-[12px] font-mono uppercase tracking-[0.14em] text-ink/60 hover:text-ink transition-colors cursor-pointer'>
                Chef handbook →
              </Link>
              <Link
                href='/payouts'
                className='text-[12px] font-mono uppercase tracking-[0.14em] text-ink/60 hover:text-ink transition-colors cursor-pointer'>
                Payouts →
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <ApplicationDialog
        open={open}
        setOpen={setOpen}
        submitted={submitted}
        setSubmitted={setSubmitted}
      />
    </>
  );
}

function ApplicationDialog({
  open,
  setOpen,
  submitted,
  setSubmitted,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [years, setYears] = useState("");
  const [about, setAbout] = useState("");

  const canSubmit =
    name && email && city && cuisine && years && about.length > 20;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='bg-cream text-ink border-blush/50 max-w-lg max-h-[90vh] overflow-y-auto'>
        {!submitted ? (
          <>
            <DialogHeader>
              <div className='label text-ink/50'>Chef application</div>
              <DialogTitle className='mt-3 font-display font-bold text-3xl lowercase tracking-[-0.02em] text-ink'>
                tell us about your cooking.
              </DialogTitle>
              <DialogDescription className='text-ink/70 leading-relaxed'>
                We read every application by hand. Expect to hear back inside 48
                hours.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canSubmit) setSubmitted(true);
              }}
              className='mt-4 space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <Label htmlFor='ap-name' className='label text-ink/60'>
                    Full name
                  </Label>
                  <Input
                    id='ap-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Jane Doe'
                    className='mt-2 h-11 bg-white border-ink/20 text-ink placeholder:text-ink/40'
                  />
                </div>
                <div className='col-span-2'>
                  <Label htmlFor='ap-email' className='label text-ink/60'>
                    Email
                  </Label>
                  <Input
                    id='ap-email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='you@kitchen.com'
                    className='mt-2 h-11 bg-white border-ink/20 text-ink placeholder:text-ink/40'
                  />
                </div>
                <div>
                  <Label htmlFor='ap-city' className='label text-ink/60'>
                    City
                  </Label>
                  <Input
                    id='ap-city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='New York'
                    className='mt-2 h-11 bg-white border-ink/20 text-ink placeholder:text-ink/40'
                  />
                </div>
                <div>
                  <Label className='label text-ink/60'>Years cooking</Label>
                  <Select value={years} onValueChange={setYears}>
                    <SelectTrigger className='mt-2 h-11 bg-white border-ink/20 text-ink data-[placeholder]:text-ink/40'>
                      <SelectValue placeholder='Select range' />
                    </SelectTrigger>
                    <SelectContent className='bg-cream text-ink border-ink/15'>
                      {["1–3", "3–5", "5–10", "10+"].map((y) => (
                        <SelectItem
                          key={y}
                          value={y}
                          className='text-ink focus:bg-blush/50 focus:text-ink'>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='col-span-2'>
                  <Label htmlFor='ap-cuisine' className='label text-ink/60'>
                    Cuisine / specialty
                  </Label>
                  <Input
                    id='ap-cuisine'
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder='e.g. Modern Italian, kaiseki, live-fire'
                    className='mt-2 h-11 bg-white border-ink/20 text-ink placeholder:text-ink/40'
                  />
                </div>
                <div className='col-span-2'>
                  <Label htmlFor='ap-about' className='label text-ink/60'>
                    A short note about your cooking
                  </Label>
                  <Textarea
                    id='ap-about'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={4}
                    placeholder="Where you trained, how you cook, what you'd bring to a private table…"
                    className='mt-2 bg-white border-ink/20 text-ink placeholder:text-ink/40'
                  />
                </div>
              </div>
              <DialogFooter className='mt-6 gap-3'>
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='inline-flex h-11 items-center rounded-[12px] border border-ink/25 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-ink/70 hover:border-ink/60 transition-colors cursor-pointer'>
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={!canSubmit}
                  className='inline-flex h-11 items-center rounded-[12px] bg-burgundy px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:bg-burgundy-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'>
                  Submit application
                </button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className='py-6 text-center'>
            <div className='mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-cream'>
              <CheckCircle2 className='h-7 w-7' />
            </div>
            <DialogHeader className='text-center'>
              <DialogTitle className='mt-6 font-display font-bold text-3xl lowercase tracking-[-0.02em] text-ink'>
                thank you.
              </DialogTitle>
              <DialogDescription className='text-ink/70 text-[15px] leading-relaxed pt-2'>
                Your application is with us. We read every one — expect a reply
                inside 48 hours, straight to your inbox.
              </DialogDescription>
            </DialogHeader>
            <div className='mt-8 flex justify-center gap-3 flex-wrap'>
              <Link
                href='/chef-handbook'
                onClick={() => setOpen(false)}
                className='inline-flex h-11 items-center justify-center rounded-[12px] border border-ink/25 px-5 text-[12px] font-mono uppercase tracking-[0.14em] text-ink hover:border-ink/60 transition-colors cursor-pointer'>
                Read the handbook
              </Link>
              <button
                onClick={() => setOpen(false)}
                className='inline-flex h-11 items-center justify-center rounded-[12px] bg-burgundy px-6 text-[12px] font-mono uppercase tracking-[0.14em] text-cream hover:bg-burgundy-deep transition-colors cursor-pointer'>
                Close
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
