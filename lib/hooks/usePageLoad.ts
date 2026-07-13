import { useEffect, useState } from "react";

/**
 * Choreographed page-load sequence. Returns a stage number that steps up
 * from 0 as timers fire. Elements gate their appearance against a stage.
 * See "Page Load Sequence" in the motion spec.
 */
export function usePageLoad(schedule: number[] = [80, 380, 480, 560, 640, 780, 880, 980]) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStage(schedule.length);
      return;
    }
    const timers = schedule.map((t, i) => window.setTimeout(() => setStage(i + 1), t));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return stage;
}