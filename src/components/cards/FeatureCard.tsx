import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { IconTile, type TileSize, type TileTone } from "@/components/ui/IconTile";

/* ------------------------------------------------------------------ */
/* FeatureCard                                                         */
/* ------------------------------------------------------------------ */

type FeatureCardSize = "sm" | "md" | "lg" | "xl";

/** Title / description type per size: sm 15/13.5 (security, promises), md 16/13.5 (all features, levers, hub),
 *  lg 17/14 (mobile, tinted, resource types), xl 18/14 (QR "who it's for"). */
const TITLE: Record<FeatureCardSize, string> = {
  sm: "text-[15px]",
  md: "text-base",
  lg: "text-body-lg leading-[1.35]",
  xl: "text-lg",
};
const DESC: Record<FeatureCardSize, string> = {
  sm: "text-menu leading-[1.5]",
  md: "text-menu leading-[1.55]",
  lg: "text-sm leading-[1.55]",
  xl: "text-sm leading-[1.55]",
};
const PAD = { sm: "p-5", md: "p-[22px]", lg: "p-6" };
const HOVER = {
  none: "",
  border: "hover:border-blue-300",
  shadow: "hover:shadow-lift",
  lift: "hover:-translate-y-[3px] hover:border-blue-300 hover:shadow-lift",
};

export type FeatureCardProps = {
  icon: IconName;
  /** Icon tile tone (sky default; mint = the prototype's green tiles; navy = contact cards). */
  tone?: TileTone;
  tileSize?: TileSize;
  title: string;
  description?: ReactNode;
  /** "✓ item" lines instead of (or after) the description. */
  items?: string[];
  /** Small grey category pill at the top right (All features grid). */
  category?: string;
  /** Top-right slot, e.g. a CountUp number on hub cards. Ignored when `category` is set. */
  aside?: ReactNode;
  /** Green stat pinned to the bottom (revenue levers). */
  stat?: string;
  /** Square cover thumbnails pinned to the bottom (content hub). */
  thumbs?: string[];
  /** Link text pinned to the bottom ("Learn more" → rendered with a nudging arrow). */
  linkLabel?: string;
  /** Makes the whole card one link. */
  href?: string;
  /** Makes the whole card one button (ignored when `href` is set). */
  onClick?: () => void;
  /** CSS colour of the decorative glow circle in the top-right corner (resource-type cards). */
  glow?: string;
  /** tinted = lavender surface with a white bordered violet tile (AI trust cards). */
  surface?: "default" | "tinted";
  size?: FeatureCardSize;
  padding?: "sm" | "md" | "lg";
  gap?: "sm" | "md";
  hover?: keyof typeof HOVER;
  className?: string;
  style?: CSSProperties;
};

function tileRadius(size: TileSize) {
  // The prototype rounds feature tiles more than the generic IconTile: 10px up to 40px, 12px from 42px.
  return size <= 40 ? "rounded-lg!" : "rounded-lg!";
}

/**
 * Icon card used across platform, company, resources, enterprise and customers pages.
 * Every option is additive, so one component covers icon + title + text, ✓ lists, category pill + link,
 * glow circle, green stat, and the hub card with a count slot and thumbnail strip.
 */
export function FeatureCard({
  icon,
  tone = "sky",
  tileSize = 42,
  title,
  description,
  items,
  category,
  aside,
  stat,
  thumbs,
  linkLabel,
  href,
  onClick,
  glow,
  surface = "default",
  size = "md",
  padding = "md",
  gap = "md",
  hover = "none",
  className = "",
  style,
}: FeatureCardProps) {
  const tinted = surface === "tinted";
  const interactive = href !== undefined || onClick !== undefined;
  const cls = [
    "relative flex flex-col text-left text-gray-900 no-underline",
    gap === "sm" ? "gap-2.5" : "gap-3",
    PAD[padding],
    "rounded-lg",
    tinted ? "border border-violet-100 bg-[#faf5ff]" : "border border-gray-200 bg-white",
    glow ? "overflow-hidden" : "",
    "transition-[transform,border-color,box-shadow] duration-200",
    HOVER[hover],
    interactive ? "cursor-pointer hover:text-gray-900" : "",
    className,
  ].join(" ");

  const tile = tinted ? (
    <span
      aria-hidden="true"
      className="relative flex flex-none items-center justify-center rounded-lg border border-violet-100 bg-white text-violet-700"
      style={{ width: tileSize, height: tileSize }}
    >
      <Icon name={icon} size={20} />
    </span>
  ) : (
    <IconTile name={icon} tone={tone} size={tileSize} className={tileRadius(tileSize)} fluid={interactive} />
  );

  const top = category ? (
    <span className="relative flex items-center justify-between gap-3">
      {tile}
      <Badge tone="gray" size="sm" className="font-bold! text-gray-500!">
        {category}
      </Badge>
    </span>
  ) : aside ? (
    <span className="relative flex items-center justify-between gap-3">
      {tile}
      {aside}
    </span>
  ) : (
    tile
  );

  const body = (
    <>
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 -right-6 h-[110px] w-[110px] rounded-full"
          style={{ background: glow }}
        />
      )}
      {top}
      <span className={`relative font-bold text-navy-800 ${TITLE[size]}`}>{title}</span>
      {description && <span className={`relative text-gray-600 ${DESC[size]}`}>{description}</span>}
      {items?.map((it) => (
        <span key={it} className="relative text-sm leading-normal text-gray-600">
          <span aria-hidden="true">✓ </span>
          {it}
        </span>
      ))}
      {stat && <span className="mt-auto text-label font-bold text-green-600">{stat}</span>}
      {thumbs && thumbs.length > 0 && (
        <span aria-hidden="true" className="mt-auto flex gap-1">
          {thumbs.map((src, i) => (
            <span
              key={src + i}
              className="aspect-square flex-1 rounded-sm bg-gray-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </span>
      )}
      {linkLabel && (
        <span className="relative mt-auto text-label font-semibold text-blue-600">
          {linkLabel} <span className="fas-arrow">→</span>
        </span>
      )}
    </>
  );

  if (href !== undefined) {
    return (
      <Link href={href} data-hovercard className={cls} style={style}>
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} data-hovercard className={`${cls} w-full`} style={style}>
        {body}
      </button>
    );
  }
  return (
    <div className={cls} style={style}>
      {body}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ReasonCard                                                          */
/* ------------------------------------------------------------------ */

/** "Why us" numbered reason: icon tile + mono index, title, description, green impact strip. */
export function ReasonCard({
  icon,
  n,
  title,
  description,
  impact,
  className = "",
}: {
  icon: IconName;
  /** Display index, e.g. "01". Decorative. */
  n: string;
  title: string;
  description: ReactNode;
  impact: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[26px] transition-[border-color,box-shadow] duration-200 hover:border-blue-300 hover:shadow-lift ${className}`}
    >
      <div className="flex items-center justify-between">
        <IconTile name={icon} tone="sky" size={44} />
        <span aria-hidden="true" className="font-mono text-xs font-bold text-blue-200">
          {n}
        </span>
      </div>
      <span className="text-lg leading-[1.3] font-bold tracking-[-0.01em] text-navy-800">{title}</span>
      <span className="text-body-sm text-gray-600">{description}</span>
      <span className="mt-auto flex items-center gap-2 rounded-md bg-green-50 px-3 py-2.5 text-label font-semibold text-green-800">
        <span aria-hidden="true">↗</span>
        {impact}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SelectableCard                                                      */
/* ------------------------------------------------------------------ */

type SelectableCardProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> & {
  icon: IconName;
  title: string;
  description?: ReactNode;
  selected: boolean;
  /** goal = stacked card with a footer (Resources goals) · tab = icon left, text right (Features side tabs). */
  variant?: "goal" | "tab";
  /** Footer line on goal cards, e.g. "12 resources". */
  footer?: ReactNode;
};

/**
 * Two-state selectable card. Renders a button with `aria-pressed`; inside a tablist pass `role="tab"`
 * (plus `aria-selected` / `aria-controls`) and the pressed state is left out.
 */
export function SelectableCard({
  icon,
  title,
  description,
  selected,
  variant = "goal",
  footer,
  className = "",
  type = "button",
  role,
  ...rest
}: SelectableCardProps) {
  const state = selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300";
  const tile = <IconTile name={icon} tone={selected ? "active" : "sky"} size={variant === "tab" ? 40 : 42} className="rounded-lg! transition-colors duration-200" />;
  const ariaState = role === undefined ? { "aria-pressed": selected } : {};

  if (variant === "tab") {
    return (
      <button
        {...rest}
        {...ariaState}
        role={role}
        type={type}
        className={`grid w-full cursor-pointer grid-cols-[40px_minmax(0,1fr)] gap-3.5 rounded-lg border p-4 text-left transition-colors duration-250 ${state} ${className}`}
      >
        {tile}
        <span className="flex flex-col gap-1">
          <span className="text-base font-bold text-navy-800">{title}</span>
          {description && <span className="text-menu leading-normal text-gray-600">{description}</span>}
        </span>
      </button>
    );
  }
  return (
    <button
      {...rest}
      {...ariaState}
      role={role}
      type={type}
      className={`flex w-full cursor-pointer flex-col items-start gap-2.5 rounded-lg border p-[22px] text-left transition-colors duration-200 ${state} ${className}`}
    >
      {tile}
      <span className="text-base font-bold text-navy-800">{title}</span>
      {description && <span className="text-menu leading-normal text-gray-600">{description}</span>}
      {footer && <span className="mt-auto text-small font-semibold text-blue-600">{footer}</span>}
    </button>
  );
}
