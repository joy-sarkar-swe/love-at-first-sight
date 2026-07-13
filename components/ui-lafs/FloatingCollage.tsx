import { RevealImage } from "./Reveal";

export type CollageItem = {
  src: string;
  alt: string;
  col: number;
  span: number;
  row: number;
  rowSpan?: number;
  aspect?: string;
};

/**
 * Scattered image grid on a tall burgundy expanse. CSS grid with explicit
 * rows so images float asymmetrically with generous gaps.
 */
export function FloatingCollage({ items, rows = 5 }: { items: CollageItem[]; rows?: number }) {
  return (
    <div
      className="grid grid-cols-12 gap-x-4 gap-y-20 md:gap-y-32"
      style={{ gridTemplateRows: `repeat(${rows}, minmax(60px, auto))` }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            gridColumn: `${it.col} / span ${it.span}`,
            gridRow: `${it.row} / span ${it.rowSpan ?? 1}`,
          }}
        >
          <RevealImage delay={i * 50}>
            <div style={{ aspectRatio: it.aspect ?? "4/5" }} className="overflow-hidden">
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </RevealImage>
        </div>
      ))}
    </div>
  );
}