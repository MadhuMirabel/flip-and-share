"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

type RangeFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Formats the displayed value (e.g. v => `${v} pages`). Also used for aria-valuetext when it returns a string. */
  format?: (value: number) => ReactNode;
  /** light: native range with blue-500 accent · dark: `.fas-range-dark` skin with a filled track (ROI on navy). */
  tone?: "light" | "dark";
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
};

/** Label row (name + tabular value) above a range input (ROI calculator sliders). */
export function RangeField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  format,
  tone = "light",
  disabled,
  name,
  id: idProp,
  className = "",
}: RangeFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const dark = tone === "dark";
  const shown = format ? format(value) : value;
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-3 text-menu">
        <label htmlFor={id} className={`font-semibold ${dark ? "text-slate-200" : "text-gray-700"}`}>
          {label}
        </label>
        <output htmlFor={id} className={`font-bold tabular-nums ${dark ? "text-white" : "text-navy-800"}`}>
          {shown}
        </output>
      </div>
      <input
        id={id}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={typeof shown === "string" ? shown : undefined}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${dark ? "fas-range-dark" : "accent-blue-500"}`}
        style={dark ? ({ "--p": `${pct}%` } as CSSProperties) : undefined}
      />
    </div>
  );
}
