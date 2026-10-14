import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { sparkPath } from "@/components/charts/paths";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

type SparklineProps = {
  values: number[];
  /** light: 120×32 line drawn with fasDraw (dashboard KPI) · dark: 100×26 area + line wiped in with fasReveal (reader dashboard). */
  variant?: "light" | "dark";
  /** Stroke / fill colour (CSS value). */
  color?: string;
  /** Show the translucent area under the line (default: dark only). */
  area?: boolean;
  /** Rendered height in px (width is fluid). */
  height?: number;
  /** Animation delay in seconds. */
  delay?: number;
  /** Accessible summary. Omit when the sparkline is decorative next to a stated value. */
  label?: string;
  className?: string;
};

/** Smooth bezier sparkline (prototype `spark` helper). */
export function Sparkline({
  values,
  variant = "light",
  color = "var(--color-blue-500)",
  area,
  height,
  delay = 0,
  label,
  className = "",
}: SparklineProps) {
  const dark = variant === "dark";
  const w = dark ? 100 : 120;
  const h = dark ? 26 : 32;
  const { line, area: areaPath } = sparkPath(values, w, h);
  const showArea = area ?? dark;
  const reveal = { animation: "fasReveal 1.3s cubic-bezier(.22,1,.36,1) both", animationDelay: `${delay}s` };
  const draw = { strokeDasharray: 1200, animation: "fasDraw 2s cubic-bezier(.45,0,.25,1) both", animationDelay: `${delay}s` };
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={`block w-full ${className}`}
      style={{ height: height ?? (dark ? 22 : 32) }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {showArea && <path d={areaPath} fill={color} opacity={0.18} style={dark ? reveal : { animation: "fasFade 1.2s ease-out both" }} />}
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={dark ? 1.6 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={dark ? reveal : draw}
      />
    </svg>
  );
}

/* ---------- KPI tile with sparkline ---------- */

type KpiSparkTileProps = {
  label: ReactNode;
  /** Numbers count up (light); strings render as-is. */
  value: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** "+12%" etc. */
  delta?: ReactNode;
  /** Delta colour: up = green, down = red, neutral = gray. */
  trend?: "up" | "down" | "neutral";
  spark: number[];
  /** light: white dashboard tile · dark: reader-dashboard tile on navy. */
  variant?: "light" | "dark";
  /** dark: 16px icon chip in the header. */
  icon?: IconName;
  /** dark: sparkline / icon colour (CSS value). */
  color?: string;
  /** dark: icon chip background (CSS value). */
  chipBg?: string;
  /** dark: text after the delta ("vs last issue"). */
  sub?: ReactNode;
  /** Entrance delay in seconds. */
  delay?: number;
  className?: string;
};

const LIGHT_DELTA = { up: "text-green-600", down: "text-red-600", neutral: "text-gray-500" };
const DARK_DELTA = { up: "text-green-400", down: "text-red-400", neutral: "text-slate-300" };

/** Dashboard KPI tile: label, count-up value, delta and a sparkline. */
export function KpiSparkTile({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals,
  delta,
  trend = "up",
  spark,
  variant = "light",
  icon,
  color,
  chipBg,
  sub,
  delay = 0,
  className = "",
}: KpiSparkTileProps) {
  const shown =
    typeof value === "number" ? <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} /> : `${prefix}${value}${suffix}`;

  if (variant === "dark") {
    const c = color ?? "var(--color-blue-400)";
    return (
      <div
        className={`flex min-h-0 flex-col gap-0.5 rounded-lg border border-slate-800 bg-navy-900 px-[11px] py-[9px] ${className}`}
        style={{ animation: "fasSlideIn .4s ease-out both", animationDelay: `${delay}s` }}
      >
        <span className="flex items-center gap-1.5 text-[9.5px] font-semibold text-slate-300">
          {icon && (
            <span
              aria-hidden="true"
              className="flex h-4 w-4 flex-none items-center justify-center rounded-sm"
              style={{ background: chipBg ?? "color-mix(in srgb, var(--color-blue-400) 18%, transparent)", color: c }}
            >
              <Icon name={icon} size={10} />
            </span>
          )}
          {label}
        </span>
        <span className="text-[19px] font-bold leading-[1.1] tracking-[-0.02em] text-white tabular-nums">{shown}</span>
        {(delta || sub) && (
          <span className="truncate text-[8.5px] text-slate-400">
            {delta && <b className={DARK_DELTA[trend]}>{delta}</b>} {sub}
          </span>
        )}
        <Sparkline values={spark} variant="dark" color={c} delay={delay} className="mt-0.5" />
      </div>
    );
  }

  return (
    <Reveal distance={12} duration={0.6} delay={delay} className={className}>
      <div className="flex h-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5">
        <span className="text-label text-gray-500">{label}</span>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[28px] font-bold tracking-[-0.02em] text-navy-800">{shown}</span>
          {delta && <span className={`text-xs font-bold ${LIGHT_DELTA[trend]}`}>{delta}</span>}
        </div>
        <Sparkline values={spark} color={color} delay={delay} />
      </div>
    </Reveal>
  );
}
