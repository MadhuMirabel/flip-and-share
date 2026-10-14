"use client";

import { useId } from "react";
import { curvePath } from "@/components/charts/paths";

export type AreaSeries = {
  label: string;
  values: number[];
  /** CSS colour value, e.g. "var(--color-blue-500)". */
  color: string;
  /** Gradient top opacity (.35 live, .25 revenue). 0 hides the area. */
  fillOpacity?: number;
};

type AreaChartProps = {
  series: AreaSeries[];
  /** Rendered height in px (width is fluid; viewBox 600×200 stretched). */
  height?: number;
  /** Shared scale maximum. Default: 1.1 × the largest value across series. */
  max?: number;
  /** Seconds between series animations (QR print vs digital: .3). */
  stagger?: number;
  /** Accessible summary of what the chart shows. */
  label: string;
  className?: string;
};

const W = 600;
const H = 200;

/** Smoothed area / line chart: gradient fill (fasFade) under a line that draws in (fasDraw). */
export function AreaChart({ series, height = 210, max, stagger = 0.3, label, className = "" }: AreaChartProps) {
  const uid = useId().replace(/:/g, "");
  const all = series.flatMap((s) => s.values);
  const top = max ?? (Math.max(0, ...all) * 1.1 || 1);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      className={`block w-full ${className}`}
      style={{ height }}
    >
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`${uid}-g${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity={s.fillOpacity ?? 0.35} />
            <stop offset="100%" stopColor={s.color} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>
      {series.map((s, i) => {
        const { line, area } = curvePath(s.values, W, H, top);
        const delay = `${i * stagger}s`;
        return (
          <g key={i}>
            {(s.fillOpacity ?? 0.35) > 0 && (
              <path d={area} fill={`url(#${uid}-g${i})`} style={{ animation: "fasFade 1.2s ease-out both", animationDelay: delay }} />
            )}
            <path
              d={line}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ strokeDasharray: 1200, animation: "fasDraw 2.2s cubic-bezier(.45,0,.25,1) both", animationDelay: delay }}
            />
          </g>
        );
      })}
    </svg>
  );
}
