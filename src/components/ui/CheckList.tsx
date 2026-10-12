import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type CheckItem = ReactNode | { content: ReactNode; /** false renders a gray ✕ ("not included"). */ included?: boolean; icon?: IconName };

export type CheckListProps = {
  items: CheckItem[];
  /**
   * plain: "✓ " text prefix (tour items, sign-up perks) ·
   * tick: green ✓ column, gray ✕ for excluded items (tiers, demo) ·
   * icon: green check icon (or a per-item icon) ·
   * inline: wrapped row of "✓ x" trust ticks for dark heroes.
   */
  variant?: "plain" | "tick" | "icon" | "inline";
  /** dark: blue-100 text (blue-200 for inline) on ink/navy. */
  tone?: "light" | "dark";
  /** sm = 14px/1.5 · md = 14.5px/1.55. */
  size?: "sm" | "md";
  className?: string;
};

function normalise(item: CheckItem) {
  if (item && typeof item === "object" && "content" in item) return item;
  return { content: item as ReactNode, included: true, icon: undefined };
}

/** List of ticked items; items may contain links. */
export function CheckList({ items, variant = "tick", tone = "light", size = "md", className = "" }: CheckListProps) {
  const dark = tone === "dark";
  const text = size === "sm" ? "text-sm leading-normal" : "text-body-sm leading-[1.55]";

  if (variant === "inline") {
    return (
      <ul className={`m-0 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0 text-label ${dark ? "text-blue-200" : "text-gray-600"} ${className}`}>
        {items.map((it, i) => (
          <li key={i}>
            <span aria-hidden="true">✓ </span>
            {normalise(it).content}
          </li>
        ))}
      </ul>
    );
  }

  const color = dark ? "text-blue-100" : "text-gray-700";
  const textSize = dark && variant === "plain" ? "text-body leading-[1.55]" : text;
  return (
    <ul className={`m-0 flex list-none flex-col p-0 ${dark ? "gap-3" : variant === "plain" ? "gap-2.5" : "gap-2"} ${textSize} ${color} ${className}`}>
      {items.map((raw, i) => {
        const it = normalise(raw);
        const no = it.included === false;
        if (variant === "plain") {
          return (
            <li key={i}>
              <span aria-hidden="true">{no ? "✕ " : "✓ "}</span>
              {no && <span className="sr-only">Not included: </span>}
              {it.content}
            </li>
          );
        }
        if (variant === "icon") {
          return (
            <li key={i} className="flex items-start gap-2.5">
              <span aria-hidden="true" className={`mt-[3px] inline-flex flex-none ${no ? "text-gray-300" : "text-green-600"}`}>
                <Icon name={no ? "x" : (it.icon ?? "check")} size={16} />
              </span>
              {no && <span className="sr-only">Not included: </span>}
              <span className={`min-w-0 ${no ? "text-gray-500" : ""}`}>{it.content}</span>
            </li>
          );
        }
        return (
          <li key={i} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2">
            <span aria-hidden="true" className={`font-bold ${no ? "text-gray-300" : dark ? "text-green-400" : "text-green-600"}`}>
              {no ? "✕" : "✓"}
            </span>
            <span className={`min-w-0 ${no ? "text-gray-500" : ""}`}>
              {no && <span className="sr-only">Not included: </span>}
              {it.content}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
