"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type TabItem = {
  id: string;
  label: ReactNode;
  icon?: IconName;
  /** Panel content. Omit on every item to render the tab strip only (panels managed outside). */
  panel?: ReactNode;
  disabled?: boolean;
};

type UnderlineTabsProps = {
  items: TabItem[];
  /** Controlled selected id. */
  value?: string;
  /** Uncontrolled initial id (defaults to the first enabled tab). */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
  panelClassName?: string;
};

/**
 * Account-style underline tabs (2px blue-500 underline, icons, scrollable strip).
 * WAI-ARIA tabs pattern: roving tabindex, ←/→, Home/End, selection follows focus.
 */
export function UnderlineTabs({
  items,
  value,
  defaultValue,
  onChange,
  label,
  className = "",
  panelClassName = "",
}: UnderlineTabsProps) {
  const uid = useId();
  const firstEnabled = items.find((t) => !t.disabled)?.id ?? items[0]?.id;
  const [inner, setInner] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? inner;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasPanels = items.some((t) => t.panel !== undefined);

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter((t) => !t.disabled);
    const i = enabled.findIndex((t) => t.id === selected);
    let next: TabItem | undefined;
    if (e.key === "ArrowRight") next = enabled[(i + 1) % enabled.length];
    else if (e.key === "ArrowLeft") next = enabled[(i - 1 + enabled.length) % enabled.length];
    else if (e.key === "Home") next = enabled[0];
    else if (e.key === "End") next = enabled[enabled.length - 1];
    if (!next) return;
    e.preventDefault();
    select(next.id);
    refs.current[next.id]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="no-scrollbar flex gap-1 overflow-x-auto border-b border-gray-200"
      >
        {items.map((t) => {
          const on = t.id === selected;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={hasPanels ? `${uid}-panel-${t.id}` : undefined}
              tabIndex={on ? 0 : -1}
              disabled={t.disabled}
              onClick={() => select(t.id)}
              className={`-mb-px flex cursor-pointer items-center gap-2 whitespace-nowrap border-0 border-b-2 border-solid bg-transparent px-3.5 py-[11px] text-sm font-semibold transition-colors duration-200 hover:text-navy-800 disabled:cursor-not-allowed disabled:opacity-50 ${
                on ? "border-blue-500 text-navy-800" : "border-transparent text-gray-500"
              }`}
            >
              {t.icon && <Icon name={t.icon} size={15} />}
              {t.label}
            </button>
          );
        })}
      </div>
      {hasPanels &&
        items.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`${uid}-panel-${t.id}`}
            aria-labelledby={`${uid}-tab-${t.id}`}
            hidden={t.id !== selected}
            tabIndex={0}
            className={`focus-visible:outline-offset-4 ${panelClassName}`}
            style={{ animation: "fasFade .35s ease both" }}
          >
            {t.panel}
          </div>
        ))}
    </div>
  );
}
