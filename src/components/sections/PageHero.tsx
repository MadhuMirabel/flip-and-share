import type { CSSProperties, ReactNode } from "react";

/* ---------------------------------------------------------------------------------------------
 * Per-page hero data (prototype `pageHero(glow, pattern)` call sites).
 * Glows are rgba blob colours (no token: each page tunes the alpha), passed straight to the backdrop.
 * ------------------------------------------------------------------------------------------- */

export const HERO_GLOW = {
  product: "rgba(14,165,233,.7)",
  analytics: "rgba(14,165,233,.65)",
  mobile: "rgba(34,197,94,.45)",
  ai: "rgba(139,92,246,.55)",
  team: "rgba(249,115,22,.5)",
  qr: "rgba(20,184,166,.6)",
  admgr: "rgba(99,102,241,.6)",
  news: "rgba(99,102,241,.6)",
  usecase: "rgba(249,115,22,.5)",
  solutions: "rgba(20,184,166,.6)",
  why: "rgba(14,165,233,.5)",
  company: "rgba(56,189,248,.5)",
  blog: "rgba(249,115,22,.45)",
  resources: "rgba(34,197,94,.45)",
  features: "rgba(56,189,248,.5)",
  integrations: "rgba(56,189,248,.45)",
  feature: "rgba(56,189,248,.45)",
  pricing: "rgba(168,162,158,.5)",
  templates: "rgba(236,72,153,.45)",
  enterprise: "rgba(99,102,241,.55)",
  customers: "rgba(245,158,11,.45)",
  examples: "rgba(245,158,11,.45)",
} as const;

export type HeroPage = keyof typeof HERO_GLOW;

/** Eyebrow accent colour per page (Tailwind text classes). */
export const HERO_ACCENT: Record<HeroPage, string> = {
  product: "text-blue-300",
  analytics: "text-blue-300",
  mobile: "text-green-300",
  ai: "text-violet-300",
  team: "text-orange-300",
  qr: "text-teal-300",
  admgr: "text-violet-300",
  news: "text-violet-300",
  usecase: "text-orange-300",
  solutions: "text-teal-300",
  why: "text-blue-300",
  company: "text-blue-300",
  blog: "text-orange-300",
  resources: "text-green-300",
  features: "text-blue-300",
  integrations: "text-blue-300",
  feature: "text-blue-300",
  pricing: "text-[#d6d3d1]", // stone-300: no token in the palette
  templates: "text-pink-300",
  enterprise: "text-violet-300",
  customers: "text-amber-300",
  examples: "text-amber-300",
};

/** Backdrop pattern used by each page in the prototype (pages not listed use none). */
export const HERO_PATTERN: Partial<Record<HeroPage, HeroPattern>> = {
  product: "grid",
  analytics: "grid",
  ai: "grid",
  admgr: "grid",
  news: "timeline",
  usecase: "covers",
  solutions: "covers",
  templates: "grid",
  enterprise: "grid",
  customers: "covers",
  examples: "shelf",
};

/** Use-case hero gradients (replace the flat ink-950 background). */
export const USE_CASE_HERO_BG = {
  industry: "linear-gradient(135deg, var(--color-ink-950) 0%, #0c2a40 55%, #3b2a1a 100%)",
  content: "linear-gradient(135deg, var(--color-ink-950) 0%, var(--color-navy-800) 55%, #0e7490 100%)",
} as const;

export type HeroPattern = "none" | "grid" | "covers" | "timeline" | "shelf" | "tiers";

/* ---------------------------------------------------------------------------------------------
 * Backdrop
 * ------------------------------------------------------------------------------------------- */

const STRIPES = "repeating-linear-gradient(135deg, var(--color-blue-100) 0 8px, var(--color-blue-50) 8px 16px)";
const coverBg = (src?: string) => (src ? `var(--color-white) url(${JSON.stringify(src)}) center/cover` : STRIPES);
const MASK_GRID = "radial-gradient(ellipse at 70% 30%, #000 30%, transparent 75%)";
const MASK_COVERS = "linear-gradient(90deg, transparent, #000 35%)";
const LINE = "rgba(255,255,255,.06)";

/**
 * Decorative hero background (prototype `pageHero(glow, pattern)`): two blurred drifting glow blobs
 * plus an optional pattern. Absolutely fills its positioned parent.
 */
export function HeroBackdrop({
  glow,
  pattern = "none",
  covers,
}: {
  /** Blob colour, e.g. `HERO_GLOW.analytics`. */
  glow: string;
  pattern?: HeroPattern;
  /** Cover image URLs for the `covers` / `shelf` patterns; striped placeholders when omitted. */
  covers?: string[];
}) {
  const cover = (i: number) => coverBg(covers?.length ? covers[i % covers.length] : undefined);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-[40%] -right-[8%] h-[46vw] w-[46vw] rounded-full opacity-55 blur-[70px] will-change-transform"
        style={{ background: glow, animation: "fasDrift2 26s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-[60%] -left-[10%] h-[40vw] w-[40vw] rounded-full opacity-25 blur-[70px] will-change-transform"
        style={{ background: glow, animation: "fasDrift 30s ease-in-out infinite reverse" }}
      />

      {pattern === "grid" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage: MASK_GRID,
            WebkitMaskImage: MASK_GRID,
          }}
        />
      )}

      {pattern === "covers" && (
        <div
          className="absolute -bottom-[18%] -right-[2%] flex gap-3.5 opacity-28"
          style={{ transform: "rotate(-8deg)", maskImage: MASK_COVERS, WebkitMaskImage: MASK_COVERS }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[146px] w-[110px] rounded-sm"
              style={{
                background: cover(i),
                marginTop: i % 2 ? 40 : 0,
                animation: `fasPages ${9 + i * 2}s ease-in-out infinite ${i * 0.7}s`,
              }}
            />
          ))}
        </div>
      )}

      {pattern === "timeline" && (
        <div className="absolute right-0 bottom-9 left-0 h-0.5 bg-white/8">
          {[8, 22, 37, 51, 66, 80, 92].map((x, i) =>
            i === 6 ? (
              <span
                key={i}
                className="absolute -top-[5px] h-3 w-3 rounded-full bg-violet-300"
                style={{
                  left: `${x}%`,
                  boxShadow: "0 0 0 6px rgba(165,180,252,.25)",
                  animation: "fasHs 2.4s ease-in-out infinite",
                }}
              />
            ) : (
              <span key={i} className="absolute -top-[5px] h-3 w-3 rounded-full bg-white/18" style={{ left: `${x}%` }} />
            ),
          )}
        </div>
      )}

      {pattern === "shelf" && (
        <div className="absolute right-[3%] -bottom-10 flex items-end gap-2.5 opacity-40">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-16 rounded-sm"
              style={{ height: 86 + (i % 3) * 10, background: cover(i * 2) }}
            />
          ))}
        </div>
      )}

      {pattern === "tiers" && (
        <div className="absolute -bottom-[30px] left-1/2 flex -translate-x-1/2 items-end gap-[18px] opacity-12">
          {[60, 90, 130, 170].map((h) => (
            <div key={h} className="w-[120px] rounded-t-lg bg-white" style={{ height: h }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------------------------- */

/** Vertical padding (sides are always 32px, 20px on phones). Names follow the prototype pages that use them. */
const PADDING = {
  default: "pt-16 pb-14", // 64 / 56: most platform + company pages
  compact: "pt-16 pb-11", // 64 / 44: templates, examples
  even: "py-16", // 64 / 64: QR, use case
  flush: "pt-16 pb-0", // 64 / 0: mobile (device sits on the edge)
  roomy: "pt-[76px] pb-14", // 76 / 56: what's new, solutions
  roomyEven: "pt-[76px] pb-16", // 76 / 64: product
  why: "pt-[72px] pb-16", // 72 / 64: why us
  overlap: "pt-16 pb-[140px]", // 64 / 140: pricing (tier cards overlap the hero)
} as const;

export type HeroPadding = keyof typeof PADDING;

/** H1 scale: md clamp(32–50)/1.08 (platform, product, pricing) · lg clamp(34–52)/1.06 (templates, customers, examples) · xl clamp(32–54)/1.06 (why us). */
const TITLE = {
  md: "text-[clamp(32px,4.5vw,50px)] leading-[1.08]",
  lg: "text-[clamp(34px,4.5vw,52px)] leading-[1.06]",
  xl: "text-[clamp(32px,4.8vw,54px)] leading-[1.06]",
} as const;

type PageHeroProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  /** Eyebrow colour class; use `HERO_ACCENT[page]`. Defaults to blue-300. */
  eyebrowColor?: string;
  lead?: ReactNode;
  /** Glow blob colour; use `HERO_GLOW[page]`. */
  glow: string;
  pattern?: HeroPattern;
  /** Cover image URLs for the covers / shelf patterns. */
  covers?: string[];
  /** CSS background override (e.g. `USE_CASE_HERO_BG.industry`). Defaults to ink-950. */
  background?: string;
  /** stack = single left column · center = centred column · split = text + `aside` grid. */
  layout?: "stack" | "center" | "split";
  /** Visual for the split layout. */
  aside?: ReactNode;
  /** Split grid: min column width (340 default; 320 what's new, 440 mobile). */
  splitMinCol?: number;
  /** Split grid gap (48 default; 40 what's new). */
  splitGap?: number;
  /** Split grid row alignment (`end` on the mobile hero). */
  splitAlign?: "center" | "end" | "start";
  /** Caps the text column without centring it: `padding-right: max(0px, 100% - Npx)` (prototype: 900 product, 1100 solutions, 820 why us). */
  contentWidth?: number;
  /** Inner container width: 1200 (default) or 1100 (what's new). */
  width?: 1200 | 1100;
  /** Gap between stacked items in px (16 default; 18 on product, solutions, why us, pricing, templates). */
  gap?: number;
  padding?: HeroPadding;
  titleSize?: keyof typeof TITLE;
  /** Max width of the H1 in px (820 default). */
  titleMaxWidth?: number;
  /** Max width of the lead in px (640 default). */
  leadMaxWidth?: number;
  /** Lead line-height: 1.6 (default) or 1.55 (templates, customers, examples). */
  leadLeading?: "normal" | "tight";
  /** Heading level. Pages render h1 (default); use h2 when the page already has an h1. */
  headingLevel?: "h1" | "h2";
  /** id for the heading (for aria-labelledby). */
  headingId?: string;
  /** CTAs, search, trust ticks, stat tiles… rendered under the lead. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Dark page hero: glow backdrop, accent eyebrow, H1, blue-200 lead and a free slot for CTAs. */
export function PageHero({
  title,
  eyebrow,
  eyebrowColor = "text-blue-300",
  lead,
  glow,
  pattern = "none",
  covers,
  background,
  layout = "stack",
  aside,
  splitMinCol = 340,
  splitGap = 48,
  splitAlign = "center",
  contentWidth,
  width = 1200,
  gap = 16,
  padding = "default",
  titleSize = "md",
  titleMaxWidth = 820,
  leadMaxWidth = 640,
  leadLeading = "normal",
  headingLevel: Heading = "h1",
  headingId,
  children,
  className = "",
  style,
}: PageHeroProps) {
  const centered = layout === "center";
  const textCol = (
    <div
      className={`relative box-border flex min-w-0 flex-col ${centered ? "items-center text-center" : ""}`}
      style={{ gap, paddingRight: contentWidth ? `max(0px, calc(100% - ${contentWidth}px))` : undefined }}
    >
      {eyebrow != null && (
        <span className={`m-0 font-mono text-eyebrow font-semibold uppercase tracking-eyebrow ${eyebrowColor}`}>{eyebrow}</span>
      )}
      <Heading
        id={headingId}
        className={`m-0 font-bold tracking-[-0.03em] text-balance text-white ${TITLE[titleSize]}`}
        style={{ maxWidth: titleMaxWidth }}
      >
        {title}
      </Heading>
      {lead != null && (
        <p
          className={`m-0 text-body-lg text-pretty text-blue-200 ${leadLeading === "tight" ? "leading-[1.55]" : "leading-[1.6]"}`}
          style={{ maxWidth: leadMaxWidth }}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );

  return (
    <section
      aria-labelledby={headingId}
      className={`relative overflow-hidden bg-ink-950 px-8 text-white max-sm:px-5 ${PADDING[padding]} ${className}`}
      style={{ ...(background ? { background } : undefined), ...style }}
    >
      <HeroBackdrop glow={glow} pattern={pattern} covers={covers} />
      <div className={`relative mx-auto ${width === 1100 ? "max-w-[1100px]" : "max-w-page"}`}>
        {layout === "split" ? (
          <div
            className={`grid ${splitAlign === "end" ? "items-end" : splitAlign === "start" ? "items-start" : "items-center"}`}
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${splitMinCol}px, 100%), 1fr))`, gap: splitGap }}
          >
            {textCol}
            <div className="relative min-w-0">{aside}</div>
          </div>
        ) : (
          textCol
        )}
      </div>
    </section>
  );
}
