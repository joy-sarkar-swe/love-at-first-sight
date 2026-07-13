import type { ReactNode } from "react";

type Tone = "burgundy" | "paper" | "deep" | "burgundy-deep";

export function Section({
  children,
  className = "",
  id,
  tone = "burgundy",
  // Legacy tone values from the old system map onto the new tones
  // "cream" -> burgundy, "linen" -> deep — kept for compat only.
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone | "cream" | "linen";
}) {
  const t: Tone =
    tone === "cream"
      ? "burgundy"
      : tone === "linen" || tone === "burgundy-deep"
      ? "deep"
      : (tone as Tone);
  const bg =
    t === "paper"
      ? "bg-paper text-ink"
      : t === "deep"
      ? "bg-burgundy-deep text-cream"
      : "bg-burgundy text-cream";
  return (
    <section id={id} className={`${bg} py-24 md:py-32 lg:py-40 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="label">{children}</div>;
}

export function Numeral({ n }: { n: string }) {
  return <span className="num">{n}</span>;
}