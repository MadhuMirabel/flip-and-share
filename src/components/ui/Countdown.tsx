"use client";

import { useSyncExternalStore } from "react";

type Unit = { value: number; label: string };

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Ticks a time snapshot every `step` ms; null on the server so markup hydrates without a mismatch. */
function useNow(step: number) {
  return useSyncExternalStore(
    (cb) => {
      const id = window.setInterval(cb, step === 60000 ? 1000 : step); // poll each second, snapshot only changes per step
      return () => window.clearInterval(id);
    },
    () => Math.floor(Date.now() / step) * step,
    () => null,
  );
}

export type CountdownProps = {
  /** Event start: Date, ISO string or epoch ms. */
  target: Date | string | number;
  /**
   * hero: 3-column days / hours / minutes grid (Webinars hero) ·
   * panel: DAYS / HRS / MIN / SEC boxes (Resources promo).
   */
  variant?: "hero" | "panel";
  /** Static screen-reader text, e.g. "Starts October 15, 2026 at 11 AM ET". Defaults to a UTC date. */
  label?: string;
  className?: string;
};

/**
 * Countdown on dark promos. Visual digits are hidden from assistive tech (no per-second
 * announcements); a static "Starts …" label is read instead.
 */
export function Countdown({ target, variant = "hero", label, className = "" }: CountdownProps) {
  const at = new Date(target).getTime();
  const showSeconds = variant === "panel";
  const now = useNow(showSeconds ? 1000 : 60000);
  // Minute precision rounds up so "0 minutes" only shows once the event has started.
  const t = now === null ? null : split(showSeconds ? at - now : Math.ceil((at - now) / 60000) * 60000);

  const units: Unit[] = showSeconds
    ? [
        { value: t?.d ?? 0, label: "DAYS" },
        { value: t?.h ?? 0, label: "HRS" },
        { value: t?.m ?? 0, label: "MIN" },
        { value: t?.s ?? 0, label: "SEC" },
      ]
    : [
        { value: t?.d ?? 0, label: "days" },
        { value: t?.h ?? 0, label: "hours" },
        { value: t?.m ?? 0, label: "minutes" },
      ];

  const sr =
    label ??
    `Starts ${new Date(at).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short", timeZone: "UTC" })} UTC`;

  return (
    <div className={className}>
      <span className="sr-only">{sr}</span>
      <div aria-hidden="true" className={showSeconds ? "flex gap-2" : "grid grid-cols-3 gap-2"}>
        {units.map((u) => (
          <span
            key={u.label}
            className={
              showSeconds
                ? "flex min-w-[58px] flex-col items-center rounded-lg border border-white/14 bg-white/8 px-2 py-2.5 text-white"
                : "flex flex-col items-center gap-0.5 rounded-md bg-white/8 px-1 py-2.5 text-white"
            }
          >
            <b className={`text-2xl leading-tight tabular-nums ${showSeconds ? "font-bold" : "tracking-[-.02em]"}`}>
              {t === null ? "--" : pad(u.value)}
            </b>
            <span className={showSeconds ? "text-2xs tracking-[.06em] text-blue-300" : "text-caption text-blue-200"}>{u.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
