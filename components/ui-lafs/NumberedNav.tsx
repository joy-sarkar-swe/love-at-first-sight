import Link from "next/link";

type Item = { n: string; label: string; to: string };

export function NumberedNav({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((it) => (
        <li key={it.n}>
          <Link
            href={it.to}
            className="group block border-t border-cream/20 pt-4 transition-colors hover:border-cream"
          >
            <div className="num">{it.n}</div>
            <div className="mt-2 text-[22px] md:text-[26px] tracking-tight font-display transition-colors group-hover:text-cream">
              {it.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}