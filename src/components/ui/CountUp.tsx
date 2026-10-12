"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { RevealContext, usePrefersReducedMotion } from "@/components/ui/Reveal";

type CountUpProps = {
  value: number;
  /** Decimal places. Default: 1 when `value` has a fractional part, else 0. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Render values ≥ 1,000,000 as "1.23M" (prototype behaviour). Default true. */
  compact?: boolean;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
};

export function formatCount(n: number, target: number, decimals: number, compact: boolean) {
  if (compact && target >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (decimals > 0) {
    return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }
  return Math.round(n).toLocaleString("en-US");
}

/**
 * Number that counts up from 0 (1600ms, ease-out cubic) when it comes into view,
 * or when its parent <Reveal> is shown. SSR, no-JS and reduced motion get the final value.
 */
export function CountUp({
  value,
  decimals,
  prefix = "",
  suffix = "",
  compact = true,
  duration = 1600,
  className = "",
}: CountUpProps) {
  const dec = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const reveal = useContext(RevealContext);
  const revealShown = reveal?.shown;
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // null = show the final value (SSR markup, before the trigger, reduced motion)
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    // Inside a Reveal: wait for it to be shown. Outside: our own observer.
    if (revealShown === false) return;
    let raf = 0;
    let io: IntersectionObserver | null = null;
    const start = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - k, 3);
        setCurrent(k < 1 ? value * eased : null);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (revealShown) {
      start();
    } else if (ref.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            start();
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(ref.current);
    }
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [value, duration, revealShown, reduced]);

  const final = prefix + formatCount(value, value, dec, compact) + suffix;
  const shown = current === null ? final : prefix + formatCount(current, value, dec, compact) + suffix;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
