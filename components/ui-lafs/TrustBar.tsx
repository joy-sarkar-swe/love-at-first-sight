const stats = [
  { value: "100+", label: "Vetted chefs" },
  { value: "20+", label: "Cities" },
  { value: "10K+", label: "Evenings served" },
  { value: "4.9", label: "Guest rating" },
];

export function TrustBar() {
  return (
    <div className="grid grid-cols-2 gap-y-10 border-y border-cream/15 py-12 md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <div className="font-display text-[clamp(2rem,3vw,3rem)] leading-none tracking-tight text-cream">
            {s.value}
          </div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}