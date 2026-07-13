"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type LightboxItem = { src: string; alt?: string; caption?: string };

type Ctx = {
  open: (items: LightboxItem[], index?: number) => void;
};

const LightboxCtx = createContext<Ctx | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxCtx);
  if (!ctx) throw new Error("useLightbox must be used within <LightboxProvider>");
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false); // controls open animation
  const [mounted, setMounted] = useState(false); // presence in the tree
  const closeTimer = useRef<number | null>(null);

  const open = useCallback((next: LightboxItem[], i = 0) => {
    if (!next.length) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setItems(next);
    setIndex(Math.max(0, Math.min(i, next.length - 1)));
    setMounted(true);
    // next frame so transition kicks in
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    // Exit is fast (160ms) — unmount after transition
    closeTimer.current = window.setTimeout(() => setMounted(false), 200);
  }, []);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, close, prev, next]);

  const value = useMemo(() => ({ open }), [open]);

  // Swipe
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      close();
    }
  };

  const current = items[index];
  const hasMany = items.length > 1;

  return (
    <LightboxCtx.Provider value={value}>
      {children}
      {mounted && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt || "Image viewer"}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-burgundy-deep/95 backdrop-blur-sm"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity ${visible ? 250 : 160}ms var(--ease-out)`,
            }}
          />

          {/* Close */}
          <button
            type="button"
            aria-label="Close viewer"
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-burgundy/40 text-cream/90 hover:text-cream hover:border-cream/50"
            style={{
              opacity: visible ? 1 : 0,
              transform: `translateY(${visible ? "0" : "-6px"})`,
              transition: `opacity 250ms var(--ease-out), transform 250ms var(--ease-out)`,
              transitionDelay: visible ? "80ms" : "0ms",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          {/* Prev/Next */}
          {hasMany && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={prev}
                className="absolute left-2 md:left-6 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-burgundy/40 text-cream/90 hover:text-cream hover:border-cream/50"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 250ms var(--ease-out)`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className="absolute right-2 md:right-6 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-burgundy/40 text-cream/90 hover:text-cream hover:border-cream/50"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 250ms var(--ease-out)`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
              </button>
            </>
          )}

          {/* Image stage */}
          <div
            key={current.src}
            className="relative z-[1] mx-4 flex max-h-[88vh] max-w-[92vw] flex-col items-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: `scale(${visible ? 1 : 0.985}) translateY(${visible ? "0" : "8px"})`,
              transition: `opacity ${visible ? 250 : 160}ms var(--ease-out), transform ${visible ? 250 : 160}ms var(--ease-out)`,
            }}
          >
            <img
              src={current.src}
              alt={current.alt || ""}
              className="max-h-[82vh] w-auto max-w-full object-contain shadow-2xl"
              draggable={false}
            />
            <div className="mt-4 grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 text-cream/70">
              <span className="truncate text-[11px] font-mono uppercase tracking-[0.16em]">
                {current.caption || current.alt || ""}
              </span>
              {hasMany && (
                <span className="shrink-0 text-[11px] font-mono tabular-nums tracking-[0.08em]">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </LightboxCtx.Provider>
  );
}

/**
 * LightboxImage — clickable image tile that opens the lightbox with a group.
 * Pass the same `group` array to every tile in a collage for shared navigation.
 */
export function LightboxImage({
  src,
  alt,
  caption,
  group,
  index,
  className = "",
  imgClassName = "h-full w-full object-cover",
  loading = "lazy",
}: {
  src: string;
  alt?: string;
  caption?: string;
  group?: LightboxItem[];
  index?: number;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}) {
  const { open } = useLightbox();
  const items = group && group.length ? group : [{ src, alt, caption }];
  const i = typeof index === "number" ? index : Math.max(0, items.findIndex((it) => it.src === src));
  return (
    <button
      type="button"
      onClick={() => open(items, i)}
      aria-label={alt ? `Open image: ${alt}` : "Open image"}
      className={`group relative block w-full cursor-zoom-in overflow-hidden bg-burgundy-deep/40 ${className}`}
      style={{ transition: "transform 250ms var(--ease-out)" }}
    >
      <img
        src={src}
        alt={alt || ""}
        loading={loading}
        draggable={false}
        className={`${imgClassName} transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]`}
      />
    </button>
  );
}