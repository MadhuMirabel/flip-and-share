import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type ButtonVariant =
  | "primary" // blue-500 fill: the main action
  | "navy" // navy-800 fill: strong secondary (cookie Accept, Plan my migration)
  | "outline" // navy border on tint (Manage Cookies)
  | "neutral" // white + gray-300 border, hover turns blue (Export CSV, Cancel)
  | "light" // white + blue-200 border, navy text (Talk to Sales on light, Watch the demo)
  | "subtle" // white + blue-200 border, blue text (mobile-menu Pricing)
  | "ghost" // white + gray-400 border (Reject non-essential)
  | "violet" // sales / enterprise
  | "amber" // webinar hero
  | "success" // green fill (See analytics)
  | "onDark" // transparent + white/35 border, on ink/navy heroes
  | "white" // white fill on navy/ink (Change plan, ROI card)
  | "text" // inline text button, blue (Copy key, Edit, Add to calendar)
  | "danger" // inline text button, red (Delete, Remove)
  | "link"; // "→ Pricing": arrow + label slide on hover

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** "rounded" = 6px (8px for xl), "pill" = fully rounded and bold. */
  shape?: "rounded" | "pill";
  /** Corner override for the rounded shape. */
  radius?: "sm" | "md";
  /** Coloured drop glow used on closing-banner and hero CTAs. */
  glow?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };
type AsLink = Common & Omit<ComponentProps<typeof Link>, keyof Common> & { href: string };
export type ButtonProps = AsButton | AsLink;

const VARIANT: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
  navy: "border-navy-800 bg-navy-800 text-white hover:bg-navy-700 hover:text-white",
  outline: "border-navy-800 bg-transparent text-navy-800 hover:bg-white/70 hover:text-navy-800",
  neutral: "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600",
  light: "border-blue-200 bg-white text-navy-800 hover:bg-blue-50 hover:text-navy-800",
  subtle: "border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700",
  ghost: "border-gray-400 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900",
  violet: "border-transparent bg-violet-700 text-white hover:bg-violet-800 hover:text-white",
  amber: "border-transparent bg-amber-500 text-ink-950 hover:bg-amber-400 hover:text-ink-950",
  success: "border-transparent bg-green-600 text-white hover:bg-green-700 hover:text-white",
  onDark: "border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white",
  white: "border-transparent bg-white text-navy-800 hover:bg-blue-100 hover:text-navy-800",
  text: "border-0 bg-transparent text-blue-600 hover:text-blue-700",
  danger: "border-0 bg-transparent text-red-600 hover:text-red-500",
  link: "border-0 bg-transparent text-blue-600 hover:text-blue-700",
};

const SIZE: Record<ButtonSize, string> = {
  xs: "gap-1.5 px-3 py-2 text-label", // 8/12 · 13px: row actions
  sm: "gap-1.5 px-4 py-[9px] text-label", // 9/16 · 13px
  md: "gap-1.5 px-[18px] py-2.5 text-sm", // 10/18 · 14px (default)
  lg: "gap-2 px-5 py-3 text-body", // 12/20 · 15px
  xl: "gap-2 px-[22px] py-3.5 text-body", // 14/22 · 15px: banner CTAs
};

const ICON_SIZE: Record<ButtonSize, number> = { xs: 14, sm: 14, md: 15, lg: 16, xl: 16 };
const BORDERED = new Set<ButtonVariant>(["outline", "neutral", "light", "subtle", "ghost", "onDark", "navy"]);
const INLINE = new Set<ButtonVariant>(["text", "danger", "link"]);

export function buttonClasses({
  variant = "primary",
  size = "md",
  shape = "rounded",
  radius,
  glow,
  fullWidth,
  className = "",
}: Pick<Common, "variant" | "size" | "shape" | "radius" | "glow" | "fullWidth" | "className">) {
  const inline = INLINE.has(variant);
  const corner = radius ?? (size === "xl" ? "md" : "sm");
  return [
    "group inline-flex cursor-pointer items-center justify-center whitespace-nowrap leading-none font-semibold",
    "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    VARIANT[variant],
    inline
      ? variant === "link"
        ? "gap-1.5 px-3 py-[9px] text-sm"
        : "gap-1.5 px-0 py-1 text-label"
      : `${SIZE[size]} ${BORDERED.has(variant) ? (shape === "pill" && variant !== "navy" ? "border-2" : "border") : "border"}`,
    !inline && (shape === "pill" ? "rounded-full font-bold" : corner === "md" ? "rounded-md" : "rounded-sm"),
    glow && (variant === "violet" ? "shadow-cta-violet" : "shadow-cta"),
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Content({ variant, size = "md", iconLeft, iconRight, loading, children }: Common) {
  const s = ICON_SIZE[size];
  const isLink = variant === "link";
  // "link": the leading arrow nudges 4px and the label 6px on hover, as in the header's "→ Pricing".
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 rounded-full border-2 border-current border-r-transparent"
          style={{ animation: "fasSpin .7s linear infinite" }}
        />
      ) : (
        iconLeft && (
          <span className={`inline-flex ${isLink ? "transition-transform duration-300 ease-fas group-hover:translate-x-1" : ""}`}>
            <Icon name={iconLeft} size={s} />
          </span>
        )
      )}
      <span className={isLink ? "inline-block transition-transform duration-300 ease-fas group-hover:translate-x-1.5" : ""}>
        {children}
      </span>
      {iconRight && (
        <span className="inline-flex transition-transform duration-300 ease-fas group-hover:translate-x-1">
          <Icon name={iconRight} size={s} />
        </span>
      )}
    </>
  );
}

/** One component for every call to action. Renders a Next <Link> when `href` is set, otherwise a <button>. */
export function Button(props: ButtonProps) {
  const { variant, size, shape, radius, glow, iconLeft, iconRight, loading, fullWidth, className, children, ...rest } = props;
  const cls = buttonClasses({ variant, size, shape, radius, glow, fullWidth, className });
  const content = (
    <Content variant={variant} size={size} iconLeft={iconLeft} iconRight={iconRight} loading={loading}>
      {children}
    </Content>
  );

  if (rest.href !== undefined) {
    return (
      <Link {...(rest as Omit<AsLink, keyof Common>)} className={cls}>
        {content}
      </Link>
    );
  }
  const { type = "button", disabled, ...buttonRest } = rest as Omit<AsButton, keyof Common>;
  return (
    <button {...buttonRest} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cls}>
      {content}
    </button>
  );
}

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: IconName | "prev" | "next" | "close";
  /** Required: icon-only buttons need an accessible name. */
  label: string;
  /** light: blue-200 ring on white (editor pager) · dark: white/25 ring (reader) · plain: no ring (modal close) · float: white disc on images */
  tone?: "light" | "dark" | "plain" | "float";
  size?: 28 | 32 | 34 | 44;
};

const ICON_TONE = {
  light: "border border-blue-200 bg-white text-navy-700 hover:bg-blue-100",
  dark: "border border-white/25 bg-transparent text-white hover:bg-white/10",
  plain: "border border-gray-200 bg-white text-gray-500 hover:text-gray-900",
  float: "border-0 bg-white/90 text-gray-900 shadow-knob hover:bg-white",
};

/** Round icon-only button: pagers (‹ ›), reader controls, close ×. */
export function IconButton({ icon, label, tone = "light", size = 34, className = "", type = "button", ...rest }: IconButtonProps) {
  const glyph =
    icon === "prev" ? "‹" : icon === "next" ? "›" : icon === "close" ? <Icon name="x" size={size <= 32 ? 14 : 16} /> : <Icon name={icon} size={16} />;
  return (
    <button
      {...rest}
      type={type}
      aria-label={label}
      className={`inline-flex flex-none cursor-pointer items-center justify-center ${tone === "plain" ? "rounded-md" : "rounded-full"} text-base transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${ICON_TONE[tone]} ${className}`}
      style={{ width: size, height: size, fontSize: size >= 44 ? 20 : 16 }}
    >
      {glyph}
    </button>
  );
}
