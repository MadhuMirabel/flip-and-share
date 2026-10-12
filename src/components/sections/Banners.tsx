import { useId, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

/* ---------------------------------------------------------------------------------------------
 * InlineCtaStrip
 * ------------------------------------------------------------------------------------------- */

type InlineCtaStripProps = {
  title: ReactNode;
  sub?: ReactNode;
  /** Small illustration on the left (e.g. `<MiniConvertArt />`). */
  art?: ReactNode;
  /** The call to action (usually a primary `Button`). */
  action: ReactNode;
  /** Small print beside the action ("Free account · no credit card"). */
  note?: ReactNode;
  /**
   * gradient = homepage strip (blue-50 → white, 22/28px, 17px title) ·
   * flat = end-of-article strip (blue-50, 22/24px, 15px title).
   */
  variant?: "gradient" | "flat";
  /** Title element; a span by default (the strip is not a landmark heading). */
  titleAs?: "span" | "h2" | "h3" | "p";
  className?: string;
  style?: CSSProperties;
};

/** Slim full-width call-to-action strip between sections or at the end of an article. */
export function InlineCtaStrip({
  title,
  sub,
  art,
  action,
  note,
  variant = "gradient",
  titleAs: Title = "span",
  className = "",
  style,
}: InlineCtaStripProps) {
  const gradient = variant === "gradient";
  return (
    <div
      className={`flex flex-wrap items-center justify-between rounded-lg border border-blue-200 ${
        gradient ? "mx-auto max-w-page gap-[18px] px-7 py-[22px]" : "gap-4 bg-blue-50 px-6 py-[22px]"
      } ${className}`}
      style={{
        ...(gradient ? { background: "linear-gradient(90deg, var(--color-blue-50), var(--color-white))" } : undefined),
        ...style,
      }}
    >
      <div className="flex items-center gap-[18px]">
        {art}
        <div className="flex flex-col gap-[3px]">
          <Title
            className={`m-0 text-navy-800 ${gradient ? "text-body-lg leading-[1.3] font-bold tracking-[-0.01em]" : "text-body leading-[1.4] font-semibold"}`}
          >
            {title}
          </Title>
          {sub != null && <span className="text-sm text-gray-600">{sub}</span>}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {action}
        {note != null && <span className="text-small text-gray-500">{note}</span>}
      </div>
    </div>
  );
}

/** 96×64 "PDF → flipbook" animation used in the homepage strip. */
export function MiniConvertArt() {
  const id = `fas${useId().replace(/[^a-zA-Z0-9_-]/g, "")}-mini`;
  return (
    <div aria-hidden="true" className="relative h-16 w-24 flex-none">
      <svg viewBox="0 0 96 64" width="96" height="64" className="overflow-visible" focusable="false">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--color-blue-400)" }} stopOpacity=".3" />
            <stop offset="1" style={{ stopColor: "var(--color-blue-500)" }} stopOpacity=".05" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: "48px 32px", animation: "fasBlobA 10s ease-in-out infinite" }}>
          <path d="M20 8c20-12 52-6 66 12s2 40-22 44S6 58 4 38 4 16 20 8z" fill={`url(#${id})`} />
        </g>
        <g style={{ transformOrigin: "26px 34px", animation: "fasMiniPdf 4.8s ease-in-out infinite" }}>
          <rect x="12" y="12" width="28" height="36" rx="3" className="fill-white stroke-red-300" />
          {/* #fee2e2 (red-100) has no token; red-200 is the nearest */}
          <path d="M32 12v8h8" className="fill-red-200 stroke-red-300" />
          <rect x="15" y="24" width="18" height="8" rx="2" className="fill-red-500" />
          <text x="24" y="30.5" fontSize="6.5" fontWeight="800" className="fill-white" textAnchor="middle" fontFamily="sans-serif">
            PDF
          </text>
          <rect x="15" y="36" width="20" height="2.5" rx="1.25" className="fill-red-200" />
          <rect x="15" y="41" width="14" height="2.5" rx="1.25" className="fill-red-200" />
        </g>
        <g style={{ animation: "fasMiniArrow 4.8s ease-in-out infinite" }}>
          <path d="M44 32h10M50 28l4 4-4 4" fill="none" className="stroke-blue-400" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g style={{ transformOrigin: "74px 32px", animation: "fasMiniBook 4.8s ease-in-out infinite" }}>
          <path d="M74 16c-6-3-12-3-16-1v32c4-2 10-2 16 1z" className="fill-white stroke-blue-300" />
          <path d="M74 16c6-3 12-3 16-1v32c-4-2-10-2-16 1z" className="fill-blue-100 stroke-blue-300" />
          <rect x="61" y="22" width="10" height="2" rx="1" className="fill-blue-200" />
          <rect x="61" y="27" width="8" height="2" rx="1" className="fill-blue-200" />
          <rect x="77" y="22" width="10" height="12" rx="1.5" className="fill-blue-500" />
          <circle cx="82" cy="40" r="3.5" className="fill-amber-500" style={{ animation: "fasSPop 4.8s ease-in-out infinite" }} />
        </g>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------
 * SpecialistBanner
 * ------------------------------------------------------------------------------------------- */

type Person = {
  initials: string;
  /** Background class, e.g. "bg-blue-500". */
  color: string;
};

const DEFAULT_PEOPLE: Person[] = [
  { initials: "DL", color: "bg-blue-500" },
  { initials: "MR", color: "bg-amber-500" },
  { initials: "JK", color: "bg-violet-500" },
];

type SpecialistBannerProps = {
  title?: ReactNode;
  sub?: ReactNode;
  /** Up to three floating avatars (5s / 6s / 7s float, staggered .4s). */
  people?: Person[];
  /** Show the phone link (SITE.phone). */
  phone?: boolean;
  cta?: { label: string; href: string };
  /** Title element; a span by default. */
  titleAs?: "span" | "h2" | "h3" | "p";
  className?: string;
};

/** Lavender "Talk to a publishing specialist" strip with floating avatars, phone link and violet CTA. */
export function SpecialistBanner({
  title = "Talk to a publishing specialist.",
  sub = "A 30-minute walkthrough with your own issue, plans and migration help included.",
  people = DEFAULT_PEOPLE,
  phone = true,
  cta = { label: "Talk to Sales", href: "/demo" },
  titleAs: Title = "span",
  className = "",
}: SpecialistBannerProps) {
  return (
    <div
      className={`relative mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-5 overflow-hidden rounded-lg border border-violet-200 px-7 py-6 ${className}`}
      style={{ background: "linear-gradient(110deg, var(--color-violet-50) 0%, #faf5ff 55%, var(--color-white) 100%)" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[90px] -right-[60px] h-60 w-60 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,.14), transparent 70%)",
          animation: "fasBubble 9s ease-in-out infinite",
        }}
      />
      <div className="relative flex flex-wrap items-center gap-[18px]">
        <div aria-hidden="true" className="relative flex items-center">
          {people.slice(0, 3).map((p, i) => (
            <span
              key={p.initials}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white text-label font-bold text-white shadow-avatar ${p.color} ${i ? "-ml-3" : ""}`}
              style={{ animation: `fasSFloat ${5 + i}s ease-in-out ${i * 0.4}s infinite` }}
            >
              {p.initials}
            </span>
          ))}
          <span className="absolute -right-0.5 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div className="flex flex-col gap-[3px]">
          <Title className="m-0 text-body-lg leading-[1.3] font-bold tracking-[-0.01em] text-navy-800">{title}</Title>
          {sub != null && <span className="text-sm text-gray-600">{sub}</span>}
        </div>
      </div>
      <div className="relative flex flex-wrap items-center gap-3">
        {phone && (
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-[7px] px-1 py-2.5 text-sm font-semibold text-violet-700 hover:text-violet-900"
          >
            <Icon name="phone" size={14} />
            {SITE.phone}
          </a>
        )}
        <Button href={cta.href} variant="violet" glow iconRight="arrow">
          {cta.label}
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------
 * DarkPromoPanel
 * ------------------------------------------------------------------------------------------- */

type DarkPromoPanelProps = {
  /** Left column (eyebrow, title, copy). */
  children: ReactNode;
  /** Right column (countdown + RSVP, ROI results, a `GlassCard`). */
  aside?: ReactNode;
  /** Radial blue glow in the top-right corner. */
  glow?: boolean;
  /** md = 36/40px padding, 28px gap (resources) · lg = 40/44px, 32px gap (pricing ROI). */
  size?: "md" | "lg";
  /** Min column width before stacking (320 default). */
  minCol?: number;
  className?: string;
};

/** Navy-800 promo panel with two columns (webinar promo, ROI calculator). */
export function DarkPromoPanel({ children, aside, glow = false, size = "md", minCol = 320, className = "" }: DarkPromoPanelProps) {
  const lg = size === "lg";
  return (
    <div
      className={`relative grid items-center overflow-hidden rounded-lg bg-navy-800 text-white ${lg ? "px-11 py-10" : "px-10 py-9"} max-sm:px-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minCol}px, 100%), 1fr))`, gap: lg ? 32 : 28 }}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,.35), transparent 70%)" }}
        />
      )}
      <div className="relative flex min-w-0 flex-col gap-2.5">{children}</div>
      {aside != null && <div className="relative min-w-0">{aside}</div>}
    </div>
  );
}

/** Translucent sub-card for use on navy / ink panels. */
export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-white/14 bg-white/8 px-[22px] py-5 ${className}`}>{children}</div>;
}
