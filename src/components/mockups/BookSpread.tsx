import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* StripedPlaceholder                                                  */
/* ------------------------------------------------------------------ */

export type StripeTone = "sky" | "gray" | "light" | "dark";

/** 135deg two-colour stripes. gray = gray-100 / gray-50 (prototype #fafafa), light = gray-100 / white. */
const STRIPES: Record<StripeTone, [string, string]> = {
  sky: ["var(--color-blue-100)", "var(--color-blue-50)"],
  gray: ["var(--color-gray-100)", "var(--color-gray-50)"],
  light: ["var(--color-gray-100)", "var(--color-white)"],
  dark: ["var(--color-navy-700)", "var(--color-navy-800)"],
};

export function stripes(tone: StripeTone = "sky", band = 8) {
  const [a, b] = STRIPES[tone];
  return `repeating-linear-gradient(135deg, ${a} 0 ${band}px, ${b} ${band}px ${band * 2}px)`;
}

export type StripedPlaceholderProps = {
  tone?: StripeTone;
  /** Stripe width in px (8 default; thumbnails use 6). */
  band?: number;
  /** Mono caption at the bottom left, e.g. "cover image · 1200×630". */
  caption?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Image placeholder. Decorative. */
export function StripedPlaceholder({ tone = "sky", band = 8, caption, className = "", style, children }: StripedPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative box-border flex items-end p-2.5 ${className}`}
      style={{ background: stripes(tone, band), ...style }}
    >
      {caption && <span className={`font-mono text-[10px] ${tone === "dark" ? "text-blue-200" : "text-blue-700"}`}>{caption}</span>}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SkeletonLines                                                       */
/* ------------------------------------------------------------------ */

/** Grey text-line skeletons (5–6px bars, radius 3). Widths in %. */
export function SkeletonLines({
  widths = [70, 90, 60],
  height = 6,
  gap = 6,
  className = "",
}: {
  widths?: number[];
  height?: 5 | 6;
  gap?: number;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`flex flex-col ${className}`} style={{ gap }}>
      {widths.map((w, i) => (
        <span key={i} className="block rounded-sm bg-gray-200" style={{ width: `${w}%`, height }} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* BookSpread                                                          */
/* ------------------------------------------------------------------ */

/** A page is an image URL, custom content, or (undefined) a striped placeholder with skeleton lines. */
type Page = string | ReactNode;

export type BookSpreadProps = {
  left?: Page;
  right?: Page;
  placeholderTone?: StripeTone;
  /** Gutter shading width on the right page (14–18px in the prototype). */
  gutter?: number;
  /** gray = 0 24px 44px -20px slate shadow · brand = 0 30px 60px -24px navy shadow. */
  shadow?: "gray" | "brand" | "none";
  /** Accessible name; without it the spread is decorative. */
  label?: string;
  className?: string;
};

function PageFace({ page, tone, side }: { page: Page; tone: StripeTone; side: "left" | "right" }) {
  if (typeof page === "string") {
    return <div className="h-full w-full bg-white bg-cover bg-top" style={{ backgroundImage: `url(${page})` }} />;
  }
  if (page !== undefined && page !== null) return <div className="relative h-full w-full bg-white">{page}</div>;
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-white p-[8%]">
      <StripedPlaceholder tone={tone} className="aspect-[4/3] w-full rounded-sm" />
      <SkeletonLines widths={side === "left" ? [70, 90, 55] : [85, 60, 75]} />
    </div>
  );
}

/** Two-page magazine spread (3:2) with a gutter shadow on the right page. */
export function BookSpread({ left, right, placeholderTone = "sky", gutter = 16, shadow = "gray", label, className = "" }: BookSpreadProps) {
  const shadowCls =
    shadow === "gray"
      ? "shadow-[0_24px_44px_-20px_rgba(31,41,55,0.45)]"
      : shadow === "brand"
        ? "shadow-[0_30px_60px_-24px_rgba(12,74,110,0.5)]"
        : "";
  return (
    <div
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`flex aspect-[3/2] w-full overflow-hidden bg-white ${shadowCls} ${className}`}
    >
      <div className="relative h-full flex-1">
        <PageFace page={left} tone={placeholderTone} side="left" />
      </div>
      <div className="relative h-full flex-1 border-l border-black/10">
        <PageFace page={right} tone={placeholderTone} side="right" />
        <span
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{ width: gutter, background: "linear-gradient(to right, rgba(0,0,0,.08), transparent)" }}
        />
      </div>
    </div>
  );
}
