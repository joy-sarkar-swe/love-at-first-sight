import type { ReactNode } from "react";

/**
 * The single "paper card floating on a dark table" moment.
 * Cream/paper background with ink type — used for the menu section and
 * booking confirmation.
 */
export function PaperCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-paper text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] ${className}`}
      style={{ borderRadius: 2 }}
    >
      {children}
    </div>
  );
}