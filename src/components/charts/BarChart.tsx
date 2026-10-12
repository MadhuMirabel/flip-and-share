import type { CSSProperties } from "react";
import type { LegendItem } from "@/components/charts/Legend";

export type BarDatum = {
  /** single variant. */
  value?: number;
  /** grouped / stacked: one value per series (stacked: bottom first). */
  values?: number[];
  /** Per-bar axis label (when `axis="bars"`). */
  label?: string;
  /** Native tooltip for the bar (stacked: the whole column). */
  title?: string;
  /** grouped: tooltip per series bar. */
  titles?: string[];
  /** single: colour override for this bar. */
  color?: string;
  /** Small label floating above the bar ("switched"). */
  marker?: string;
};

type BarChartProps = {
  data: BarDatum[];
  /** single: one bar per datum · grouped: side-by-side series · stacked: segments in one column. */
  variant?: "single" | "grouped" | "stacked";
  /** Series colours/labels for grouped and stacked. */
  series?: LegendItem[];
  /** single: bar colour, or a function of the datum (CSS colour values). */
  color?: string | ((d: BarDatum, i: number, max: number) => string);
  /** Scale maximum. Default: largest value (stacked: largest column total). */
  max?: number;
  /** Plot height in px. */
  height?: number;
  /** Gap between bars/columns in px. */
  gap?: number;
  /** single: opacity .45 → 1 by value (marketing analytics bars). */
  fadeByValue?: boolean;
  /** single: dim the hovered bar to .75 (default true unless fadeByValue). */
  hoverDim?: boolean;
  /** Seconds between bar animations. */
  stagger?: number;
  /** Axis labels: an array spread with space-between (e.g. ["Sep 12", "Today"]) or "bars" for one label per bar. */
  axis?: string[] | "bars";
  /** Top corner radius in px (default 6 = rounded-sm). */
  radius?: number;
  tone?: "light" | "dark";
  /** Accessible summary, e.g. "Readers per day, last 30 days: peak 1,240 on Oct 3". */
  label: string;
  className?: string;
};

const GROW = "fasGrowY .9s cubic-bezier(.2,.8,.2,1) both";

/** Hand-rolled column chart (flex bars, fasGrowY entrance, native title tooltips). */
export function BarChart({
  data,
  variant = "single",
  series = [],
  color = "var(--color-blue-500)",
  max,
  height = 200,
  gap = 4,
  fadeByValue = false,
  hoverDim,
  stagger = 0.03,
  axis,
  radius = 6,
  tone = "light",
  label,
  className = "",
}: BarChartProps) {
  const dark = tone === "dark";
  const totals = data.map((d) =>
    variant === "single" ? (d.value ?? 0) : variant === "stacked" ? (d.values ?? []).reduce((a, b) => a + b, 0) : Math.max(0, ...(d.values ?? [])),
  );
  const top = max ?? Math.max(1, ...totals);
  const dim = (hoverDim ?? !fadeByValue) ? "transition-opacity duration-150 hover:opacity-75" : "";
  const corner = `${radius}px ${radius}px 0 0`;
  const pct = (v: number) => `${Math.max(0, Math.min(100, (v / top) * 100))}%`;
  const anim = (i: number, extra?: CSSProperties): CSSProperties => ({
    animation: variant === "stacked" ? "fasGrowY 1s cubic-bezier(.2,.8,.2,1) both" : GROW,
    animationDelay: `${i * stagger}s`,
    transformOrigin: "bottom",
    ...extra,
  });

  return (
    <div className={className}>
      <div
        role="img"
        aria-label={label}
        className={`flex items-end border-b ${dark ? "border-slate-800" : "border-gray-200"}`}
        style={{ height, gap }}
      >
        {data.map((d, i) => {
          if (variant === "single") {
            const v = d.value ?? 0;
            const c = d.color ?? (typeof color === "function" ? color(d, i, top) : color);
            return (
              <div key={i} className="relative flex h-full min-w-0 flex-1 items-end">
                <div
                  title={d.title}
                  className={`relative w-full ${dim}`}
                  style={anim(i, {
                    height: pct(v),
                    background: c,
                    borderRadius: corner,
                    opacity: fadeByValue ? 0.45 + (0.55 * v) / top : undefined,
                  })}
                >
                  {d.marker && (
                    <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-blue-600">
                      {d.marker}
                    </span>
                  )}
                </div>
              </div>
            );
          }
          if (variant === "grouped") {
            return (
              <div key={i} className="flex h-full min-w-0 flex-1 items-end gap-[3px]">
                {(d.values ?? []).map((v, s) => (
                  <div
                    key={s}
                    title={d.titles?.[s]}
                    className="flex-1"
                    style={anim(i, { height: pct(v), background: series[s]?.color, borderRadius: corner })}
                  />
                ))}
              </div>
            );
          }
          // stacked
          const vals = d.values ?? [];
          const sum = vals.reduce((a, b) => a + b, 0) || 1;
          return (
            <div key={i} className="relative flex h-full min-w-0 flex-1 items-end">
              <div
                title={d.title}
                className={`flex w-full flex-col-reverse overflow-hidden ${dim}`}
                style={anim(i, { height: pct(totals[i]), borderRadius: corner })}
              >
                {vals.map((v, s) => (
                  <div key={s} style={{ height: `${(v / sum) * 100}%`, background: series[s]?.color }} />
                ))}
              </div>
              {d.marker && (
                <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-blue-600" style={{ bottom: `calc(${pct(totals[i])} + 6px)` }}>
                  {d.marker}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {axis && (
        <div
          aria-hidden="true"
          className={`mt-1.5 flex text-[11px] ${dark ? "text-slate-400" : "text-gray-500"} ${axis === "bars" ? "" : "justify-between"}`}
          style={axis === "bars" ? { gap } : undefined}
        >
          {axis === "bars"
            ? data.map((d, i) => (
                <span key={i} className="min-w-0 flex-1 truncate text-center">
                  {d.label}
                </span>
              ))
            : axis.map((a) => <span key={a}>{a}</span>)}
        </div>
      )}
    </div>
  );
}
