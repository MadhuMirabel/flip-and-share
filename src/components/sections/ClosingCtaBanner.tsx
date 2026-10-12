import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { CtaArt, type CtaArtKind } from "./CtaArt";

/** Inline link style used inside banner sublines ("free plan", "paid plan", "every plan"). */
export const ctaLinkClass =
  "font-semibold text-blue-600 underline decoration-blue-600/35 underline-offset-3 hover:text-blue-700";

/** Section wrapper spacing: flush 0/80 (default) · spaced 72/80 · home 0/88 · short 0/64 · none (no section, inline). */
const SECTION_PAD = {
  flush: "pt-0 pb-20",
  spaced: "pt-[72px] pb-20",
  home: "pt-0 pb-[88px]",
  short: "pt-0 pb-16",
} as const;

const SECTION_BG = { none: "", slate: "bg-slate-50", gray: "bg-gray-50" } as const;

/** H2 sizes: sm 26 · md 28 (default) · lg 30 · xl 32 · fluid clamp(24–30) · fluidLg clamp(24–32). */
const TITLE = {
  sm: "text-[26px]",
  md: "text-[28px]",
  lg: "text-[30px]",
  xl: "text-[32px]",
  fluid: "text-[clamp(24px,3vw,30px)]",
  fluidLg: "text-[clamp(24px,3vw,32px)]",
} as const;

type CtaLink = { label: string; href: string };

type ClosingCtaBannerProps = {
  title: ReactNode;
  /** 15px slate-700 line; may contain links styled with `ctaLinkClass`. */
  subtitle?: ReactNode;
  /** Left illustration. Reserves 270px (220px ≤1100px) of left padding; hidden ≤760px. */
  art?: CtaArtKind;
  /** Primary action (blue, glowing). Defaults to "Create for Free" → /signup. */
  primary?: CtaLink;
  /** Optional secondary action (white, blue-200 border): "Watch the demo", "See pricing". */
  secondary?: CtaLink;
  /** Replace the default buttons entirely (e.g. a stacked button + note). */
  actions?: ReactNode;
  /** sm = 40/44px padding (what's new, inline) · md = 44/48px (default) · lg = 48px all round (home, why us). */
  size?: "sm" | "md" | "lg";
  maxWidth?: 1100 | 1200;
  titleSize?: keyof typeof TITLE;
  /** Subline size: 15px (default) or 16px. */
  subtitleSize?: "md" | "lg";
  /** Button size: compact = 13/20px · 6px radius; large = 14/22px · 8px radius (use case, why us, company pages). */
  ctaSize?: "compact" | "large";
  /** Outer section spacing, or `none` to render only the box (e.g. inside another section). */
  sectionPadding?: keyof typeof SECTION_PAD | "none";
  /** Section background, matching the section above. */
  background?: keyof typeof SECTION_BG;
  headingLevel?: "h2" | "h3";
  headingId?: string;
  className?: string;
};

/** The recurring light-gradient closing banner with optional left art, heading, subline and actions. */
export function ClosingCtaBanner({
  title,
  subtitle,
  art,
  primary = { label: "Create for Free", href: "/signup" },
  secondary,
  actions,
  size = "md",
  maxWidth = 1200,
  titleSize = "md",
  subtitleSize = "md",
  ctaSize = "compact",
  sectionPadding = "flush",
  background = "none",
  headingLevel: Heading = "h2",
  headingId,
  className = "",
}: ClosingCtaBannerProps) {
  const btn = ctaSize === "large" ? "xl" : "lg";
  const buttons = actions ?? (
    <div className="relative z-[1] flex flex-wrap gap-2.5">
      <Button href={primary.href} variant="primary" size={btn} glow>
        {primary.label}
      </Button>
      {secondary && (
        <Button href={secondary.href} variant="light" size={btn}>
          {secondary.label}
        </Button>
      )}
    </div>
  );
  const vertical = size === "lg" ? "py-12" : size === "sm" ? "py-10" : "py-11";
  const side = size === "sm" ? "pr-11" : "pr-12";
  const left = art ? "pl-[270px] max-[1100px]:pl-[220px] max-[760px]:pl-8" : size === "sm" ? "pl-11" : "pl-12";

  const box = (
    <div
      className={`relative mx-auto box-border flex flex-wrap items-center justify-between gap-6 overflow-hidden border border-blue-200 text-navy-800 ${side} ${vertical} ${left} rounded-lg ${sectionPadding === "none" ? className : ""}`}
      style={{
        maxWidth,
        background:
          "linear-gradient(120deg, var(--color-blue-100) 0%, var(--color-blue-50) 55%, var(--color-cyan-50) 100%)",
      }}
    >
      {art && <CtaArt kind={art} />}
      <div className="relative z-[1] flex flex-col gap-2">
        <Heading id={headingId} className={`m-0 font-bold tracking-[-0.025em] ${TITLE[titleSize]}`}>
          {title}
        </Heading>
        {subtitle != null && (
          <span className={`text-slate-700 ${subtitleSize === "lg" ? "text-base" : "text-body"}`}>{subtitle}</span>
        )}
      </div>
      <div className="relative z-[1]">{buttons}</div>
    </div>
  );

  if (sectionPadding === "none") return box;
  return (
    <section
      aria-labelledby={headingId}
      className={`px-8 max-sm:px-5 ${SECTION_PAD[sectionPadding]} ${SECTION_BG[background]} ${className}`}
    >
      {box}
    </section>
  );
}
