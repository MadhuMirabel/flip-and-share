"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

const RM = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(RM);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(RM).matches,
    () => false,
  );
}

/**
 * Endless horizontal scroller with faded edges. Pauses on hover and with a visible
 * pause/play button; under reduced motion it renders one static, wrapped row.
 */
export function Marquee({
  items,
  label,
  duration = 38,
  gap = 14,
  className = "",
}: {
  /** One copy of the list; it is duplicated internally for the seamless loop. */
  items: ReactNode[];
  /** Accessible name of the region, e.g. "Publishers using FlipAndShare". */
  label: string;
  /** Seconds per loop. */
  duration?: number;
  gap?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduced) {
    return (
      <ul aria-label={label} className={`m-0 flex list-none flex-wrap justify-center p-0 ${className}`} style={{ gap }}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );
  }

  const list = (copy: number) => (
    <ul aria-hidden={copy === 1 ? true : undefined} className="m-0 flex flex-none list-none p-0" style={{ gap, paddingRight: gap }}>
      {items.map((it, i) => (
        <li key={i} className="flex-none">
          {it}
        </li>
      ))}
    </ul>
  );

  return (
    <div role="region" aria-label={label} className={`flex flex-col items-end gap-2 ${className}`}>
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div
          className="flex w-max hover:[animation-play-state:paused]!"
          style={{ animation: `fasMarquee ${duration}s linear infinite`, animationPlayState: paused ? "paused" : undefined }}
        >
          {list(0)}
          {list(1)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play logo scroll" : "Pause logo scroll"}
        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-150 hover:border-blue-500 hover:text-blue-600"
      >
        {paused ? (
          <svg aria-hidden="true" width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <path d="M0 0l10 6-10 6z" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <rect width="3.5" height="12" rx="1" />
            <rect x="6.5" width="3.5" height="12" rx="1" />
          </svg>
        )}
      </button>
    </div>
  );
}

/** Pill with a coloured initials tile and the publisher name (marquee item). */
export function LogoPill({ name, initials, color, className = "" }: { name: string; initials: string; color: string; className?: string }) {
  return (
    <span
      className={`flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-[18px] py-2.5 text-sm font-bold tracking-[-.01em] whitespace-nowrap text-gray-700 ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-[22px] w-[22px] items-center justify-center rounded-sm text-[10px] font-extrabold text-white"
        style={{ background: color }}
      >
        {initials}
      </span>
      {name}
    </span>
  );
}

/** Centered row of text-only customer logos (Customers page). */
export function LogoWall({ names, label, className = "" }: { names: string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={`m-0 flex list-none flex-wrap justify-center gap-x-7 gap-y-3 p-0 ${className}`}>
      {names.map((n) => (
        <li key={n} className="px-1 py-2 text-body font-bold tracking-[-.01em] text-gray-500">
          {n}
        </li>
      ))}
    </ul>
  );
}
