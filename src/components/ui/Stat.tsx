import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type StatVariant = "metric" | "mini" | "hero" | "pastel" | "plain" | "kpi";

/** Pastel palette for the use-case "With FlipAndShare" tiles; cycles by `index` when not set. */
const PASTEL = {
  sky: { bg: "var(--color-blue-100)", fg: "var(--color-blue-700)", bd: "var(--color-blue-200)", icon: "trend" },
  amber: { bg: "var(--color-amber-100)", fg: "var(--color-amber-700)", bd: "var(--color-amber-200)", icon: "target" },
  green: { bg: "var(--color-green-100)", fg: "var(--color-green-700)", bd: "var(--color-green-200)", icon: "check" },
} as const satisfies Record<string, { bg: string; fg: string; bd: string; icon: IconName }>;
const PASTEL_ORDER = ["sky", "amber", "green"] as const;

export type StatTileProps = {
  /**
   * metric: app analytics card (name, 28px value, delta) ·
   * mini: home analytics (slate-50, fades in) ·
   * hero: glass tile on dark heroes ·
   * pastel: use-case tile with bubble, fluid icon, tag and accent bar ·
   * plain: Solutions mini KPI (value over label) ·
   * kpi: Company stat card (32px value over label).
   */
  variant?: StatVariant;
  /** Plain value or a node such as a count-up. */
  value: ReactNode;
  label: ReactNode;
  delta?: ReactNode;
  deltaTone?: "up" | "down" | "neutral";
  /** Small secondary line under the value (metric) or a slot for a sparkline. */
  children?: ReactNode;
  /** hero only: md = 26px (AI / Ad Manager) · lg = 34px (What's new, Customers). */
  size?: "md" | "lg";
  /** pastel only. */
  palette?: keyof typeof PASTEL;
  icon?: IconName;
  tag?: string;
  /** Position in its grid: drives entrance stagger and the pastel palette cycle. */
  index?: number;
  className?: string;
  style?: CSSProperties;
};

const DELTA = { up: "text-green-600", down: "text-red-600", neutral: "text-gray-500" };

/** Statistic tile in six prototype styles. */
export function StatTile({
  variant = "metric",
  value,
  label,
  delta,
  deltaTone = "up",
  children,
  size = "md",
  palette,
  icon,
  tag,
  index = 0,
  className = "",
  style,
}: StatTileProps) {
  if (variant === "pastel") {
    const p = PASTEL[palette ?? PASTEL_ORDER[index % 3]];
    return (
      <div
        data-hovercard=""
        className={`relative flex flex-col gap-2 overflow-hidden rounded-lg border bg-white px-[18px] pt-4 pb-3.5 shadow-lift ${className}`}
        style={{ borderColor: p.bd, ...style }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-[22px] -right-[22px] h-20 w-20 rounded-full opacity-70 blur-[2px]"
          style={{ background: p.bg, animation: `fasBubble 7s ease-in-out ${index * 0.1}s infinite` }}
        />
        <div className="relative flex items-center justify-between">
          <span
            aria-hidden="true"
            className="fas-fluidtile relative flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-md"
            style={{ background: p.bg, color: p.fg }}
          >
            <span className="fas-fluidblob pointer-events-none absolute top-[5px] left-[5px] h-5 w-5 rounded-full bg-current opacity-0 blur-[6px]" />
            <span className="relative flex">
              <Icon name={icon ?? p.icon} size={16} />
            </span>
          </span>
          {tag && (
            <span className="rounded-full px-[7px] py-0.5 text-[10px] font-bold uppercase tracking-[.08em]" style={{ background: p.bg, color: p.fg }}>
              {tag}
            </span>
          )}
        </div>
        <span className="relative text-[clamp(22px,2.3vw,26px)] font-bold leading-none tracking-[-.03em] text-navy-900 tabular-nums">{value}</span>
        <span className="relative text-label leading-[1.4] text-gray-600">{label}</span>
        <span aria-hidden="true" className="h-[3px] w-9 rounded-sm opacity-60" style={{ background: p.fg }} />
      </div>
    );
  }

  if (variant === "hero") {
    const lg = size === "lg";
    return (
      <div
        className={`flex flex-col border border-white/12 bg-white/6 ${lg ? "min-w-[140px] gap-1 rounded-lg px-5 py-[18px]" : "min-w-[150px] gap-0.5 rounded-lg px-[18px] py-3.5"} ${className}`}
        style={style}
      >
        <span className={`font-bold text-white tabular-nums ${lg ? "text-[34px] leading-[1.1] tracking-[-.03em]" : "text-[26px] leading-[1.15]"}`}>{value}</span>
        <span className={`leading-[1.4] text-blue-200 ${lg ? "text-label" : "text-xs"}`}>{label}</span>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <div
        className={`flex flex-col gap-1 rounded-lg bg-slate-50 p-3.5 ${className}`}
        style={{ animation: `fasFade .5s ease-out ${index * 0.06}s both`, ...style }}
      >
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-2xl leading-tight font-bold text-navy-800 tabular-nums">{value}</span>
        {delta && <span className={`text-caption font-bold ${DELTA[deltaTone]}`}>{delta}</span>}
      </div>
    );
  }

  if (variant === "plain" || variant === "kpi") {
    const kpi = variant === "kpi";
    return (
      <div
        className={`flex flex-col border border-gray-200 bg-white ${kpi ? "gap-1.5 rounded-lg p-[22px]" : "gap-1 rounded-lg p-3.5"} ${className}`}
        style={style}
      >
        <span
          className={`font-bold text-navy-800 tabular-nums ${kpi ? "text-[32px] leading-[1.1] tracking-[-.03em]" : "text-[22px] leading-tight tracking-[-.02em]"}`}
        >
          {value}
        </span>
        <span className={kpi ? "text-menu text-gray-600" : "text-xs leading-[1.4] text-gray-500"}>{label}</span>
        {children}
      </div>
    );
  }

  // metric
  return (
    <div className={`flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-4 ${className}`} style={style}>
      <span className="text-label text-gray-500">{label}</span>
      <span className="text-[28px] leading-[1.1] font-bold tracking-[-.02em] text-navy-800 tabular-nums">{value}</span>
      {delta && <span className={`text-xs font-semibold ${DELTA[deltaTone]}`}>{delta}</span>}
      {children}
    </div>
  );
}

export type StatRowItem = { icon?: IconName; value: ReactNode; label: ReactNode };

/** "At a glance" strip: one bordered card split into cells by hairlines; stacks at ≤640px. */
export function StatRow({ items, className = "" }: { items: StatRowItem[]; className?: string }) {
  return (
    <ul
      className={`m-0 grid list-none rounded-lg border border-gray-200 bg-white p-0 shadow-stat max-[640px]:grid-cols-1! ${className}`}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((it, i) => (
        <li
          key={i}
          className="flex items-center gap-3.5 border-gray-200 px-6 py-[22px] not-first:border-l max-[640px]:not-first:border-l-0 max-[640px]:not-first:border-t"
        >
          {it.icon && (
            <span aria-hidden="true" className="inline-flex flex-none text-blue-600">
              <Icon name={it.icon} size={20} />
            </span>
          )}
          <div className="flex min-w-0 flex-col-reverse gap-[3px]">
            <span className="text-label leading-[1.4] text-gray-500">{it.label}</span>
            <span className="text-[clamp(22px,2.3vw,26px)] leading-none font-bold tracking-[-.03em] text-navy-900">{it.value}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
