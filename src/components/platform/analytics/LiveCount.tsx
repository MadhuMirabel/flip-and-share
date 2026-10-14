"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/Reveal";

/** "Active now" counter: random walk between 96 and 220 every 1.8s (prototype `data-live-now`), only while on screen. */
export function LiveCount({ initial = 142 }: { initial?: number }) {
  const [n, setN] = useState(initial);
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      if (id) clearInterval(id);
      id = undefined;
    };
    const io = new IntersectionObserver(([e]) => {
      stop();
      if (e.isIntersecting) {
        id = setInterval(() => setN((v) => Math.max(96, Math.min(220, v + Math.round(Math.random() * 14 - 6)))), 1800);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [reduced]);

  return (
    <b ref={ref} className="font-bold text-navy-800 tabular-nums">
      {n}
    </b>
  );
}
