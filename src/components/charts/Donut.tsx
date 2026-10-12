import type { ReactNode } from "react";

export type DonutSegment = { value: number; color: string; label?: string };

type DonutProps = {
  /** Percentage 0–100 for a single-value ring. Ignored when `segments` is set. */
  value?: number;
  /** Multi-segment ring; values are percentages that should sum to ≤100. */
  segments?: DonutSegment[];
  /** Fill colour for `value` (CSS value). */
  color?: string;
  /** Remaining ring colour. */
  track?: string;
  /** lg: 120px ring, 78px hole (New vs returning) · sm: 56px ring, 38px hole (fill rate). */
  size?: "lg" | "sm";
  /** Centre text. Default: `${value}%`. */
  center?: ReactNode;
  /** Small line under the centre value (lg). */
  caption?: ReactNode;
  /** Accessible summary. */
  label: string;
  /** Hole colour (match the surface). */
  holeClassName?: string;
  className?: string;
};

/** conic-gradient ring with a centred value. */
export function Donut({
  value = 0,
  segments,
  color = "var(--color-blue-500)",
  track = "var(--color-blue-200)",
  size = "lg",
  center,
  caption,
  label,
  holeClassName = "bg-white",
  className = "",
}: DonutProps) {
  const lg = size === "lg";
  let stops: string;
  if (segments && segments.length) {
    let at = 0;
    stops = segments
      .map((s) => {
        const from = at;
        at += s.value;
        return `${s.color} ${from}% ${at}%`;
      })
      .join(",");
    if (at < 100) stops += `,${track} ${at}% 100%`;
  } else {
    stops = `${color} 0 ${value}%,${track} ${value}% 100%`;
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-none items-center justify-center rounded-full ${lg ? "h-[120px] w-[120px]" : "h-14 w-14"} ${className}`}
      style={{ background: `conic-gradient(${stops})`, animation: "fasFade .8s ease-out both" }}
    >
      <div
        aria-hidden="true"
        className={`flex flex-col items-center justify-center rounded-full ${lg ? "h-[78px] w-[78px]" : "h-[38px] w-[38px]"} ${holeClassName}`}
      >
        <span className={`font-bold text-navy-800 ${lg ? "text-xl leading-tight" : "text-eyebrow"}`}>{center ?? `${value}%`}</span>
        {lg && caption && <span className="text-eyebrow text-gray-500">{caption}</span>}
      </div>
    </div>
  );
}
