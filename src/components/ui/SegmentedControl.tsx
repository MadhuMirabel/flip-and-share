"use client";

import { useRef, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { rovingIndex } from "@/components/ui/roving";

export type SegmentTone =
  | "gray" // gray-100 track, active white + tile shadow, navy text (auth tabs, template views)
  | "white" // white bordered track, active blue-500 (analytics range)
  | "dark" // white/6 track on a dark hero, active white / navy (analytics dashboards, reader modes)
  | "mini"; // browser-chrome switcher: gray-200 track, 12px

export type SegmentOption = {
  value: string;
  label: ReactNode;
  icon?: IconName;
  /** Accessible name when the label is visual only (e.g. "Large text" for "A"). */
  ariaLabel?: string;
  /** id of the panel this tab controls (tabs semantics). */
  controls?: string;
  disabled?: boolean;
};

/** sm 6/10 · 12px · md 6/12 · 13px · lg 9/14 · 14px */
export type SegmentSize = "sm" | "md" | "lg";

type SegmentedControlProps = {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the group. */
  label: string;
  tone?: SegmentTone;
  size?: SegmentSize;
  /** Stretch items to fill the track (auth Sign up / Log in). */
  fullWidth?: boolean;
  /** "radio" (default) for value pickers, "tabs" when it swaps panels (pair with option.controls). */
  semantics?: "radio" | "tabs";
  className?: string;
};

const TRACK: Record<SegmentTone, string> = {
  gray: "gap-1 rounded-md bg-gray-100 p-[3px]",
  white: "rounded-md border border-gray-200 bg-white p-[3px]",
  dark: "gap-1.5 rounded-lg border border-white/[.12] bg-white/[.06] p-1",
  mini: "rounded-md bg-gray-200 p-0.5",
};

const ITEM: Record<SegmentTone, { on: string; off: string; radius: string }> = {
  gray: { on: "bg-white text-navy-800 shadow-tile", off: "bg-transparent text-gray-500 hover:text-gray-700", radius: "rounded-sm" },
  white: { on: "bg-blue-500 text-white", off: "bg-transparent text-gray-700 hover:text-gray-900", radius: "rounded-sm" },
  dark: { on: "bg-white text-navy-800", off: "bg-transparent text-blue-100 hover:bg-white/[.06]", radius: "rounded-md" },
  mini: { on: "bg-white text-navy-800", off: "bg-transparent text-gray-500 hover:text-gray-700", radius: "rounded-sm" },
};

const SIZE: Record<SegmentSize, { cls: string; icon: number }> = {
  sm: { cls: "gap-1.5 px-2.5 py-1.5 text-xs", icon: 13 },
  md: { cls: "gap-1.5 px-3 py-1.5 text-label", icon: 14 },
  lg: { cls: "gap-2 px-3.5 py-[9px] text-sm", icon: 16 },
};

const DEFAULT_SIZE: Record<SegmentTone, SegmentSize> = { gray: "sm", white: "md", dark: "lg", mini: "sm" };

/** Segmented picker with roving focus; arrow keys / Home / End move and select. */
export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  tone = "gray",
  size,
  fullWidth,
  semantics = "radio",
  className = "",
}: SegmentedControlProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = semantics === "tabs";
  const s = SIZE[size ?? DEFAULT_SIZE[tone]];
  const it = ITEM[tone];
  const selected = options.findIndex((o) => o.value === value);
  const focusable = selected >= 0 ? selected : options.findIndex((o) => !o.disabled);

  return (
    <div
      role={tabs ? "tablist" : "radiogroup"}
      aria-label={label}
      className={`${fullWidth ? "flex w-full" : "inline-flex flex-wrap"} ${TRACK[tone]} ${className}`}
    >
      {options.map((o, i) => {
        const on = i === selected;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role={tabs ? "tab" : "radio"}
            aria-checked={tabs ? undefined : on}
            aria-selected={tabs ? on : undefined}
            aria-controls={tabs ? o.controls : undefined}
            aria-label={o.ariaLabel}
            tabIndex={i === focusable ? 0 : -1}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => {
              const next = rovingIndex(e, i, options.length, (n) => !!options[n].disabled);
              if (next == null) return;
              refs.current[next]?.focus();
              onChange(options[next].value);
            }}
            className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap border-0 font-semibold leading-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
              fullWidth ? "flex-1" : ""
            } ${s.cls} ${it.radius} ${on ? it.on : it.off}`}
          >
            {o.icon && <Icon name={o.icon} size={s.icon} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
