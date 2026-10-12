import type { ReactNode } from "react";

const TRACK = {
  light: "bg-slate-100", // usage, pipeline, cities
  sky: "bg-blue-50", // upload, traffic sources
  white: "bg-white", // inside a blue-50 info box
  dark: "bg-slate-800", // clicks by type on ink
  glass: "bg-white/15", // ROI payback on navy
};

export type ProgressTone = keyof typeof TRACK;

export type ProgressBarProps = {
  /** Current value; percentage of `max`. */
  value: number;
  max?: number;
  height?: 3 | 4 | 6 | 8 | 10 | 12 | 14 | 18;
  tone?: ProgressTone;
  /** Fill colour (any CSS colour); default blue-500. Ignored in `threshold` mode. */
  color?: string;
  /** Usage bar: blue-500, amber-500 at ≥80%, blue-200 full width when `unlimited`. */
  threshold?: boolean;
  unlimited?: boolean;
  /** grow = fasGrowX on mount · wide = fasWide · transition = animate width changes · none. */
  animate?: "grow" | "wide" | "transition" | "none";
  /** Seconds. */
  duration?: number;
  delay?: number;
  /** Accessible name. Required unless `decorative`. */
  label?: string;
  /** Hide from assistive tech when the value is printed next to the bar. */
  decorative?: boolean;
  className?: string;
};

/** Track + fill bar. Exposes role="progressbar" unless `decorative`. */
export function ProgressBar({
  value,
  max = 100,
  height = 6,
  tone = "light",
  color = "var(--color-blue-500)",
  threshold = false,
  unlimited = false,
  animate = "grow",
  duration,
  delay = 0,
  label,
  decorative = false,
  className = "",
}: ProgressBarProps) {
  const pct = unlimited ? 100 : Math.max(0, Math.min(100, (value / max) * 100));
  const fill = threshold
    ? unlimited
      ? "var(--color-blue-200)"
      : pct >= 80
        ? "var(--color-amber-500)"
        : "var(--color-blue-500)"
    : color;
  const ease = "cubic-bezier(.2,.8,.2,1)";
  const motion =
    animate === "grow"
      ? { animation: `fasGrowX ${duration ?? 1}s ${ease} ${delay}s both` }
      : animate === "wide"
        ? { animation: `fasWide ${duration ?? 0.9}s ${ease} ${delay}s both` }
        : animate === "transition"
          ? { transition: `width ${duration ?? 0.4}s ${ease} ${delay}s` }
          : {};
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : {
        role: "progressbar" as const,
        "aria-label": label,
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-valuenow": unlimited ? undefined : value,
        "aria-valuetext": unlimited ? "Unlimited" : undefined,
      };
  return (
    <div {...a11y} className={`w-full overflow-hidden ${TRACK[tone]} ${className}`} style={{ height, borderRadius: height / 2 }}>
      <div className="h-full origin-left rounded-[inherit]" style={{ width: `${pct}%`, background: fill, ...motion }} />
    </div>
  );
}

export type BarRowProps = {
  label: ReactNode;
  /** Printed value (e.g. "42%", "1,284"). */
  value?: ReactNode;
  /** Bar fill as a percentage 0–100. */
  pct: number;
  /** stacked = label row above the bar (meta on the right) · grid = label | bar | value. */
  layout?: "stacked" | "grid";
  /** Extra right-side content in the stacked layout (badge, subline). Defaults to `value`. */
  meta?: ReactNode;
  color?: string;
  height?: ProgressBarProps["height"];
  tone?: ProgressTone;
  /** Grid column widths in px. */
  labelWidth?: number;
  valueWidth?: number;
  delay?: number;
  duration?: number;
  animate?: ProgressBarProps["animate"];
  className?: string;
};

/** Labelled horizontal bar for breakdowns (sources, cities, element types). */
export function BarRow({
  label,
  value,
  pct,
  layout = "stacked",
  meta,
  color,
  height = 8,
  tone = "light",
  labelWidth = 100,
  valueWidth = 54,
  delay = 0,
  duration,
  animate,
  className = "",
}: BarRowProps) {
  const dark = tone === "dark" || tone === "glass";
  const bar = (
    <ProgressBar value={pct} height={height} tone={tone} color={color} delay={delay} duration={duration} animate={animate} decorative />
  );
  if (layout === "grid") {
    return (
      <div
        className={`grid items-center gap-2.5 text-label ${className}`}
        style={{ gridTemplateColumns: `${labelWidth}px minmax(0,1fr) ${valueWidth}px` }}
      >
        <span className={`truncate ${dark ? "text-slate-300" : "text-gray-700"}`}>{label}</span>
        {bar}
        <span className={`text-right font-semibold tabular-nums ${dark ? "text-white" : "text-navy-800"}`}>{value}</span>
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-3 text-label">
        <span className={`min-w-0 font-semibold ${dark ? "text-slate-300" : "text-gray-700"}`}>{label}</span>
        <span className={`flex-none font-semibold tabular-nums ${dark ? "text-white" : "text-navy-800"}`}>{meta ?? value}</span>
      </div>
      {bar}
    </div>
  );
}

/** 10×10 legend key: square (series) or dot (status). */
export function LegendSwatch({
  color,
  label,
  shape = "square",
  tone = "light",
  className = "",
}: {
  color: string;
  label: ReactNode;
  shape?: "square" | "dot";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${tone === "dark" ? "text-slate-300" : "text-gray-500"} ${className}`}>
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 flex-none ${shape === "dot" ? "rounded-full" : "rounded-sm"}`}
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

export type StackedSegment = { label: string; value: number; color: string };

/** One 14px bar split into proportional segments (device split), with an optional legend. */
export function StackedBar({
  segments,
  height = 14,
  legend = true,
  animate = true,
  label,
  className = "",
}: {
  segments: StackedSegment[];
  height?: number;
  legend?: boolean;
  animate?: boolean;
  /** Accessible name prefix, e.g. "Readers by device". */
  label?: string;
  className?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const pct = (v: number) => Math.round((v / total) * 100);
  const summary = segments.map((s) => `${s.label} ${pct(s.value)}%`).join(", ");
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div
        role="img"
        aria-label={label ? `${label}: ${summary}` : summary}
        className="flex w-full overflow-hidden"
        style={{ height, borderRadius: height / 2 }}
      >
        {segments.map((s, i) => (
          <span
            key={s.label}
            className="h-full origin-left"
            style={{
              width: `${(s.value / total) * 100}%`,
              background: s.color,
              animation: animate ? `fasGrowX 1s cubic-bezier(.2,.8,.2,1) ${i * 0.15}s both` : undefined,
            }}
          />
        ))}
      </div>
      {legend && (
        <div aria-hidden="true" className="flex flex-wrap gap-x-4 gap-y-1.5">
          {segments.map((s) => (
            <LegendSwatch key={s.label} color={s.color} label={`${s.label} ${pct(s.value)}%`} />
          ))}
        </div>
      )}
    </div>
  );
}
