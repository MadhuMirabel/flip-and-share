"use client";

import type { ReactNode } from "react";

/** sm 30×16 / 12px knob (article-mode aside) · md 38×22 / 16px (default) · lg 44×24 / 18px (Mobile app settings). */
export type ToggleSize = "sm" | "md" | "lg";
export type ToggleColor = "blue" | "green";

const TRACK: Record<ToggleSize, string> = { sm: "h-4 w-[30px]", md: "h-[22px] w-[38px]", lg: "h-6 w-11" };
const KNOB: Record<ToggleSize, { cls: string; on: string }> = {
  sm: { cls: "left-0.5 top-0.5 h-3 w-3 shadow-knob", on: "translate-x-3.5" },
  md: { cls: "left-[3px] top-[3px] h-4 w-4 shadow-knob", on: "translate-x-4" },
  lg: { cls: "left-[3px] top-[3px] h-[18px] w-[18px] shadow-knob", on: "translate-x-5" },
};
const ON: Record<ToggleColor, string> = { blue: "bg-blue-500", green: "bg-green-600" };
/** The small switch uses slate-300 off, as in the prototype aside. */
const OFF: Record<ToggleSize, string> = { sm: "bg-slate-300", md: "bg-gray-300", lg: "bg-gray-300" };

type TrackProps = {
  checked: boolean;
  size?: ToggleSize;
  color?: ToggleColor;
  locked?: boolean;
  disabled?: boolean;
};

/** Presentational switch (no role): used inside rows whose whole surface is the switch. */
export function SwitchTrack({ checked, size = "md", color = "blue", locked, disabled }: TrackProps) {
  const k = KNOB[size];
  const bg = locked ? "bg-blue-300 opacity-70" : disabled ? `${OFF[size]} opacity-50` : checked ? ON[color] : OFF[size];
  return (
    <span aria-hidden="true" className={`relative block flex-none rounded-full transition-colors duration-250 ${TRACK[size]} ${bg}`}>
      <span
        className={`absolute block rounded-full bg-white transition-transform duration-250 ease-fas ${k.cls} ${checked ? k.on : ""}`}
      />
    </span>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange?: (next: boolean) => void;
  label: string;
  disabled?: boolean;
  /** Locked-on style (e.g. "Necessary" cookies, billing emails). */
  locked?: boolean;
  size?: ToggleSize;
  /** Track colour when on. */
  color?: ToggleColor;
};

/** Switch button: 250ms fas easing; `size` sm/md/lg, `color` blue/green. */
export function Toggle({ checked, onChange, label, disabled, locked, size = "md", color = "blue" }: ToggleProps) {
  const off = disabled || locked;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-disabled={off || undefined}
      onClick={() => !off && onChange?.(!checked)}
      className={`flex-none rounded-full border-0 bg-transparent p-0 ${off ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <SwitchTrack checked={checked} size={size} color={color} locked={locked} disabled={disabled} />
    </button>
  );
}

/* ---------- Row compositions: the whole row is the switch ---------- */

type RowBase = {
  checked: boolean;
  onChange: (next: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  className?: string;
};

function rowHandlers({ checked, onChange, disabled }: RowBase) {
  return {
    type: "button" as const,
    role: "switch" as const,
    "aria-checked": checked,
    disabled,
    onClick: () => onChange(!checked),
  };
}

/** Publish options row: name + description, switch on the right, top hairline. */
export function ToggleRow(props: RowBase) {
  const { checked, title, description, className = "" } = props;
  return (
    <button
      {...rowHandlers(props)}
      className={`flex w-full cursor-pointer items-center gap-3.5 border-t border-gray-100 bg-transparent px-0 py-2.5 text-left disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {description && <span className="text-label text-gray-500">{description}</span>}
      </span>
      <SwitchTrack checked={checked} />
    </button>
  );
}

/** Plan-finder card: switch on the left; on = blue-500 border + blue-50 fill. */
export function ToggleCard(props: RowBase) {
  const { checked, title, description, className = "" } = props;
  return (
    <button
      {...rowHandlers(props)}
      className={`flex w-full cursor-pointer items-center gap-3.5 rounded-lg border-[1.5px] px-3.5 py-3 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
      } ${className}`}
    >
      <SwitchTrack checked={checked} />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {description && <span className="text-label text-gray-500">{description}</span>}
      </span>
    </button>
  );
}

/** Settings row-button (Mobile app): navy title + hint, large switch on the right, blue border on hover. */
export function SettingRow(props: RowBase & { color?: ToggleColor; size?: ToggleSize }) {
  const { checked, title, description, color = "green", size = "lg", className = "" } = props;
  return (
    <button
      {...rowHandlers(props)}
      className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-left transition-colors duration-150 hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-navy-800">{title}</span>
        {description && <span className="text-small text-gray-500">{description}</span>}
      </span>
      <SwitchTrack checked={checked} color={color} size={size} />
    </button>
  );
}

/** Compact bordered toggle (article-mode "Dark mode"): 12px label, small switch on the right. */
export function ToggleButton(props: Omit<RowBase, "description"> & { tone?: "light" | "dark" }) {
  const { checked, title, tone = "light", className = "" } = props;
  return (
    <button
      {...rowHandlers({ ...props, description: undefined })}
      className={`flex cursor-pointer items-center justify-between gap-2 rounded-sm border bg-transparent px-[9px] py-[7px] text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${
        tone === "dark" ? "border-slate-700 text-slate-200" : "border-gray-200 text-gray-700"
      } ${className}`}
    >
      <span>{title}</span>
      <SwitchTrack checked={checked} size="sm" />
    </button>
  );
}
