import Link from "next/link";
import type { ReactNode } from "react";

export type TierState = "normal" | "highlighted" | "recommended";

const STATE: Record<TierState, { card: string; badge: string; cta: string }> = {
  normal: {
    card: "border-gray-200 px-6 py-[26px] shadow-tier",
    badge: "",
    cta: "bg-gray-100 text-gray-700 hover:text-gray-700",
  },
  highlighted: {
    card: "border-blue-500 px-[26px] py-8 shadow-tier-hi",
    badge: "bg-blue-500",
    cta: "bg-blue-500 text-white hover:text-white",
  },
  recommended: {
    card: "border-green-600 px-[26px] py-8 shadow-tier-hi",
    badge: "bg-green-600",
    cta: "bg-blue-500 text-white hover:text-white",
  },
};

const DEFAULT_BADGE: Record<TierState, string | undefined> = {
  normal: undefined,
  highlighted: "MOST POPULAR",
  recommended: "RECOMMENDED FOR YOU",
};

export type PricingTierCardProps = {
  name: string;
  /** "Best for" line under the name. */
  bestFor: string;
  /** Formatted price, e.g. "$29". */
  price: string;
  /** Per-unit suffix, e.g. "/mo". */
  unit?: string;
  /** Small line under the price, e.g. "Billed yearly · $348/yr". Keeps its height when empty. */
  note?: string;
  state?: TierState;
  /** Overrides the state's default floating badge text. */
  badge?: string;
  ctaLabel: string;
  ctaHref?: string;
  onCta?: () => void;
  /** Caption under the CTA, e.g. "No credit card needed". */
  subCaption?: string;
  includedLabel?: string;
  features: ReactNode[];
  className?: string;
};

/** Pricing plan card: normal, highlighted ("MOST POPULAR") or recommended (green, "RECOMMENDED FOR YOU"). */
export function PricingTierCard({
  name,
  bestFor,
  price,
  unit,
  note,
  state = "normal",
  badge,
  ctaLabel,
  ctaHref,
  onCta,
  subCaption,
  includedLabel = "Included",
  features,
  className = "",
}: PricingTierCardProps) {
  const s = STATE[state];
  const badgeText = badge ?? DEFAULT_BADGE[state];
  const ctaCls = `block cursor-pointer rounded-md border-0 p-3 text-center text-sm font-semibold transition-[filter] duration-200 hover:brightness-95 ${s.cta}`;

  return (
    <div
      className={`relative flex flex-col gap-3.5 rounded-lg border-2 bg-white transition-shadow duration-300 hover:shadow-tier-hi ${s.card} ${className}`}
    >
      {badgeText && (
        // Outer span centres; inner span carries fasPop (its transform would override the centring).
        <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            className={`block rounded-full px-3 py-[5px] text-eyebrow font-bold tracking-[0.04em] text-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)] ${s.badge}`}
            style={{ animation: "fasPop .4s cubic-bezier(.2,.8,.2,1) both" }}
          >
            {badgeText}
          </span>
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="m-0 text-[15px] font-bold text-navy-800">{name}</h3>
        <span className="text-label leading-[1.45] text-gray-500">{bestFor}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="flex items-baseline gap-1">
          <span className="text-[40px] leading-none font-bold tracking-[-0.03em] text-navy-700 tabular-nums">{price}</span>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </span>
        <span className="min-h-[15px] text-xs text-gray-500">{note}</span>
      </div>

      {ctaHref !== undefined ? (
        <Link href={ctaHref} className={ctaCls}>
          {ctaLabel}
        </Link>
      ) : (
        <button type="button" onClick={onCta} className={ctaCls}>
          {ctaLabel}
        </button>
      )}
      {subCaption && <span className="-mt-1.5 text-center text-caption text-gray-500">{subCaption}</span>}

      <div aria-hidden="true" className="h-px bg-gray-100" />

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-gray-700">{includedLabel}</span>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {features.map((f, i) => (
            <li key={i} className="grid grid-cols-[16px_minmax(0,1fr)] gap-2 text-menu leading-[1.45] text-gray-700">
              <span aria-hidden="true" className="font-bold text-green-600">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Four tiers aligned to the bottom so highlighted cards rise above; 2 columns ≤1000px, 1 column ≤560px. */
export function PricingTierGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 items-end gap-4 min-[561px]:grid-cols-2 min-[1001px]:grid-cols-4 max-[1000px]:gap-y-7 ${className}`}
    >
      {children}
    </div>
  );
}
