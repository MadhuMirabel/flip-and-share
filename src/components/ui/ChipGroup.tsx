"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { rovingIndex } from "@/components/ui/roving";

export type ChipTone =
  | "navy" // light surface, active navy-800 (Library, Blog, Webinars, Features, brand tabs)
  | "primary" // light surface, active blue-500 (demo "Publications per year")
  | "choice" // active blue-50 + blue-500 border + navy-700 text (form choices, "What would you like to see?")
  | "violet" // AI tones and kept tags
  | "dark" // dark hero filters: active blue-500, inactive transparent / blue-100 / white-25
  | "darkGlass"; // pricing "I am a…": inactive white/6 fill

/** sm 6/11 · 12.5px · md 8/14 · 13px · lg 9/14 · 13.5px · xl 9/16 · 14px */
export type ChipSize = "sm" | "md" | "lg" | "xl";

export type ChipItem = {
  value: string;
  label: ReactNode;
  icon?: IconName;
  /** 8px colour dot before the label (any CSS colour, e.g. "var(--color-pink-500)"). */
  dot?: string;
  /** 10px rounded-square colour swatch before the label. */
  swatch?: string;
  /** Count suffix shown at 60% opacity, e.g. Blog category totals. */
  count?: ReactNode;
  disabled?: boolean;
};

type Common = {
  items: ChipItem[];
  /** Accessible name for the group. */
  label: string;
  tone?: ChipTone;
  size?: ChipSize;
  /** "pill" (default) or "rounded" 8px corners (choice cards, "Publish to"). */
  shape?: "pill" | "rounded";
  className?: string;
};

type Single = Common & { multiple?: false; value: string; onChange: (value: string) => void };
type Multi = Common & { multiple: true; value: string[]; onChange: (value: string[]) => void };
export type ChipGroupProps = Single | Multi;

const TONE: Record<ChipTone, { on: string; off: string }> = {
  navy: {
    on: "border-navy-800 bg-navy-800 text-white",
    off: "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
  },
  primary: {
    on: "border-blue-500 bg-blue-500 text-white",
    off: "border-gray-300 bg-white text-gray-700 hover:border-blue-300",
  },
  choice: {
    on: "border-blue-500 bg-blue-50 text-navy-700",
    off: "border-gray-200 bg-white text-gray-700 hover:border-blue-300",
  },
  violet: {
    on: "border-violet-600 bg-violet-100 text-violet-900",
    off: "border-gray-200 bg-white text-gray-700 hover:border-violet-300",
  },
  dark: {
    on: "border-blue-500 bg-blue-500 text-white",
    off: "border-white/25 bg-transparent text-blue-100 hover:border-blue-300",
  },
  darkGlass: {
    on: "border-blue-400 bg-blue-500 text-white",
    off: "border-white/25 bg-white/[.06] text-white hover:border-blue-300",
  },
};

const SIZE: Record<ChipSize, { cls: string; icon: number }> = {
  sm: { cls: "gap-1.5 px-[11px] py-1.5 text-small", icon: 13 },
  md: { cls: "gap-1.5 px-3.5 py-2 text-label", icon: 14 },
  lg: { cls: "gap-2 px-3.5 py-[9px] text-menu", icon: 14 },
  xl: { cls: "gap-2 px-4 py-[9px] text-sm", icon: 16 },
};

function ChipContent({ item, iconSize }: { item: ChipItem; iconSize: number }) {
  return (
    <>
      {item.icon && <Icon name={item.icon} size={iconSize} />}
      {item.dot && <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full" style={{ background: item.dot }} />}
      {item.swatch && (
        <span aria-hidden="true" className="h-2.5 w-2.5 flex-none rounded-sm" style={{ background: item.swatch }} />
      )}
      <span>{item.label}</span>
      {item.count != null && <span className="font-medium opacity-60">{item.count}</span>}
    </>
  );
}

/**
 * Every pill/chip selector. Single-select is a radiogroup with roving focus and arrow keys;
 * `multiple` renders toggle buttons (aria-pressed) inside a labelled group.
 */
export function ChipGroup(props: ChipGroupProps) {
  const { items, label, tone = "navy", size = "md", shape = "pill", className = "" } = props;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = TONE[tone];
  const s = SIZE[size];
  const base = `inline-flex cursor-pointer items-center whitespace-nowrap border font-semibold leading-tight transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${s.cls} ${
    shape === "pill" ? "rounded-full" : "rounded-md"
  }`;

  if (props.multiple) {
    const { value, onChange } = props;
    return (
      <div role="group" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
        {items.map((item) => {
          const on = value.includes(item.value);
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={on}
              disabled={item.disabled}
              onClick={() => onChange(on ? value.filter((v) => v !== item.value) : [...value, item.value])}
              className={`${base} ${on ? t.on : t.off}`}
            >
              <ChipContent item={item} iconSize={s.icon} />
            </button>
          );
        })}
      </div>
    );
  }

  const { value, onChange } = props;
  const selected = items.findIndex((i) => i.value === value);
  const focusable = selected >= 0 ? selected : items.findIndex((i) => !i.disabled);

  return (
    <div role="radiogroup" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, i) => {
        const on = i === selected;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={i === focusable ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => {
              const next = rovingIndex(e, i, items.length, (n) => !!items[n].disabled);
              if (next == null) return;
              refs.current[next]?.focus();
              onChange(items[next].value);
            }}
            className={`${base} ${on ? t.on : t.off}`}
          >
            <ChipContent item={item} iconSize={s.icon} />
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Static chips ---------- */

export type ChipLink = { label: ReactNode; href?: string; onClick?: () => void; icon?: IconName };

type ChipListProps = {
  items: ChipLink[];
  /** light: white chip, blue-600 icon, blue hover (related use cases) · darkGlass: "Popular searches" on dark heroes. */
  tone?: "light" | "darkGlass";
  /** Optional lead-in text, e.g. "Popular:". */
  lead?: ReactNode;
  /** Accessible name for the list. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

const LIST_TONE = {
  light:
    "gap-2 border-gray-200 bg-white px-3.5 py-[9px] text-menu font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 [&>svg]:text-blue-600",
  darkGlass: "gap-1.5 border-white/25 bg-white/[.06] px-3 py-1.5 text-small font-semibold text-blue-100 hover:border-blue-300 hover:text-white",
};

/* globals.css styles `a` outside any layer, which beats layered utilities; links restate their colours as important. */
const LINK_COLOR = {
  light: "text-gray-700! hover:text-blue-600!",
  darkGlass: "text-blue-100! hover:text-white!",
};

/** Non-selectable chips: tag clouds, related links, popular searches. Links when `href`, buttons when `onClick`. */
export function ChipList({ items, tone = "light", lead, label, className = "", style }: ChipListProps) {
  const cls = `inline-flex items-center rounded-full border no-underline transition-all duration-200 ${LIST_TONE[tone]}`;
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} style={style}>
      {lead && <span className={`text-small ${tone === "darkGlass" ? "text-slate-300" : "text-gray-500"}`}>{lead}</span>}
      <ul aria-label={label} className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((item, i) => {
          const content = (
            <>
              {item.icon && <Icon name={item.icon} size={14} />}
              {item.label}
            </>
          );
          return (
            <li key={i}>
              {item.href ? (
                <Link href={item.href} className={`${cls} ${LINK_COLOR[tone]}`}>
                  {content}
                </Link>
              ) : item.onClick ? (
                <button type="button" onClick={item.onClick} className={`${cls} cursor-pointer`}>
                  {content}
                </button>
              ) : (
                <span className={cls}>{content}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
