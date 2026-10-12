"use client";

import { useRef, type ReactNode } from "react";
import type { IconName } from "@/components/icons";
import { IconTile } from "@/components/ui/IconTile";
import { rovingIndex } from "@/components/ui/roving";

export type RadioAccent = "blue" | "green";

export type RadioCardOption = {
  value: string;
  title: ReactNode;
  /** 13px body line (publish access). */
  description?: ReactNode;
  /** 12.5px secondary line (billing sub, QR destination URL). */
  sub?: ReactNode;
  /** Render `sub` in monospace (URLs, paths). */
  subMono?: boolean;
  /** Trailing element, e.g. <Badge tone="success">Save 20%</Badge>, or a "Recommended" badge in the option variant. */
  badge?: ReactNode;
  /** Icon tile for the "option" variant (2FA method picker). */
  icon?: IconName;
  /** Overrides the group accent when this option is selected (billing: Annual = green). */
  accent?: RadioAccent;
  disabled?: boolean;
};

type RadioCardGroupProps = {
  options: RadioCardOption[];
  value: string | null;
  onChange: (value: string) => void;
  /** Accessible name for the group. */
  label: string;
  /** radio: list of cards with a radio ring (publish, QR, billing) · option: icon-tile cards in an auto-fit grid (2FA). */
  variant?: "radio" | "option";
  accent?: RadioAccent;
  /** md: 12/14 padding, 16px ring (publish, QR) · lg: 14/16 padding, 18px ring (billing). */
  size?: "md" | "lg";
  /** Card corner: md 8px (publish, billing, option) · lg 10px (QR destinations). */
  radius?: "md" | "lg";
  className?: string;
};

const SELECTED: Record<RadioAccent, { card: string; ring: string; dot: string }> = {
  blue: { card: "border-blue-500 bg-blue-50", ring: "border-blue-500", dot: "bg-blue-500" },
  green: { card: "border-green-600 bg-green-50", ring: "border-green-600", dot: "bg-green-600" },
};

/** Radio cards with roving focus (arrow keys move and select). */
export function RadioCardGroup({
  options,
  value,
  onChange,
  label,
  variant = "radio",
  accent = "blue",
  size = "md",
  radius = "md",
  className = "",
}: RadioCardGroupProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = options.findIndex((o) => o.value === value);
  const focusable = selected >= 0 ? selected : options.findIndex((o) => !o.disabled);
  const isOption = variant === "option";

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={
        isOption ? `grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 ${className}` : `flex flex-col gap-2.5 ${className}`
      }
    >
      {options.map((o, i) => {
        const on = i === selected;
        const sel = SELECTED[o.accent ?? accent];
        const centered = !o.description;
        const pad = isOption ? "p-4" : size === "lg" ? "px-4 py-3.5" : "px-3.5 py-3";
        const corner = !isOption && radius === "lg" ? "rounded-lg" : "rounded-md";
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={i === focusable ? 0 : -1}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => {
              const next = rovingIndex(e, i, options.length, (n) => !!options[n].disabled);
              if (next == null) return;
              refs.current[next]?.focus();
              onChange(options[next].value);
            }}
            className={`flex w-full cursor-pointer gap-3 border-[1.5px] text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${pad} ${corner} ${
              centered && !isOption ? "items-center" : "items-start"
            } ${on ? sel.card : `border-gray-200 bg-white ${isOption ? "hover:border-blue-500 hover:bg-blue-50" : "hover:border-gray-300"}`}`}
          >
            {isOption ? (
              o.icon && <IconTile name={o.icon} tone="sky-soft" size={34} />
            ) : (
              <span
                aria-hidden="true"
                className={`flex flex-none items-center justify-center rounded-full border-2 ${
                  size === "lg" ? "h-[18px] w-[18px]" : "h-4 w-4"
                } ${centered ? "" : "mt-0.5"} ${on ? sel.ring : "border-gray-300"}`}
              >
                <span className={`h-2 w-2 rounded-full ${on ? sel.dot : "bg-transparent"}`} />
              </span>
            )}
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={`flex flex-wrap items-center gap-2 text-sm text-gray-900 ${isOption ? "font-bold" : "font-semibold"}`}>
                {o.title}
                {isOption && o.badge}
              </span>
              {o.description && <span className="text-label text-gray-500">{o.description}</span>}
              {o.sub && (
                <span className={`text-small text-gray-500 ${o.subMono ? "truncate font-mono" : ""} ${isOption ? "leading-[1.45]" : ""}`}>
                  {o.sub}
                </span>
              )}
            </span>
            {!isOption && o.badge && <span className="flex-none self-center">{o.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
