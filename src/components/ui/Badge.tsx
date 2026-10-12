import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type BadgeTone =
  | "info" // blue-100 / navy-700: plan tags, type pills, info chips
  | "success" // green-100 / green-800: Published, Paid, New
  | "warning" // amber-100 / amber-700: usage, Draft
  | "neutral" // slate-100 / gray-600: Refunded, 2FA Off
  | "gray" // gray-100 / gray-700: neutral chips, "other" type tags
  | "violet" // violet-100 / violet-700: AI rules, Plugin, SAML
  | "danger" // pale red / red-600
  | "purple" // purple-100 / purple-800: Video tag
  | "navy" // navy-800 / white
  | "primary" // blue-500 / white: NEW corner badge
  | "outline" // white + gray-200 border: SERP meta chips
  | "ai" // white + violet-200 border, violet-900 text: AI tags
  | "live" // green-500/15 + green-300 text: status on dark / terminal
  | "onDark" // white/10 + blue-100 text: pills inside dark scenes
  | "glass" // white/10 + white/18 border: chips on dark heroes
  | "white"; // white/92 + navy-700: category pill on cover images

const TONE: Record<BadgeTone, string> = {
  info: "bg-blue-100 text-navy-700",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-700",
  neutral: "bg-slate-100 text-gray-600",
  gray: "bg-gray-100 text-gray-700",
  violet: "bg-violet-100 text-violet-700",
  danger: "bg-red-200/40 text-red-600",
  purple: "bg-purple-100 text-purple-800",
  navy: "bg-navy-800 text-white",
  primary: "bg-blue-500 text-white",
  outline: "border border-gray-200 bg-white text-gray-700",
  ai: "border border-violet-200 bg-white text-violet-900",
  live: "bg-green-500/15 text-green-300",
  onDark: "bg-white/10 text-blue-100",
  glass: "border border-white/18 bg-white/10 text-white",
  white: "bg-white/92 text-navy-700",
};

export type BadgeSize = "xs" | "sm" | "md";

const SIZE: Record<BadgeSize, string> = {
  xs: "gap-1 px-[7px] py-0.5 text-[10px] font-bold", // 10px uppercase tag (stat tiles)
  sm: "gap-1.5 px-2 py-[3px] text-eyebrow font-semibold", // 11px status / type pills
  md: "gap-1.5 px-2.5 py-[5px] text-small font-semibold", // 12.5px info chips
};

type BadgeProps = {
  tone?: BadgeTone;
  size?: BadgeSize;
  /** Bold, uppercase, .06em tracking (category / "ON UPLOAD" tags). */
  uppercase?: boolean;
  /** Leading 6px dot in the current text colour. */
  dot?: boolean;
  /** Animate the dot: "pulse" = fasPulse halo, "blink" = fasBlink. `true` means pulse. */
  pulse?: boolean | "pulse" | "blink";
  icon?: IconName;
  className?: string;
  children: ReactNode;
};

/** Rounded pill for statuses, categories and tags. */
export function Badge({
  tone = "info",
  size = "sm",
  uppercase = false,
  dot = false,
  pulse = false,
  icon,
  className = "",
  children,
}: BadgeProps) {
  const anim = pulse === "blink" ? "fasBlink 1.4s step-end infinite" : pulse ? "fasPulse 1.4s ease-in-out infinite" : undefined;
  return (
    <span
      className={`inline-flex w-max flex-none items-center whitespace-nowrap rounded-full leading-[1.4] ${SIZE[size]} ${TONE[tone]} ${
        uppercase ? "font-bold uppercase tracking-[.06em]" : ""
      } ${className}`}
    >
      {(dot || pulse) && (
        <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-current" style={{ animation: anim }} />
      )}
      {icon && <Icon name={icon} size={size === "md" ? 14 : 12} />}
      {children}
    </span>
  );
}

export type HttpMethod = "GET" | "POST" | "HOOK" | "PUT" | "DELETE";

const METHOD: Record<HttpMethod, string> = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  HOOK: "bg-violet-100 text-violet-700",
  PUT: "bg-amber-100 text-amber-700",
  DELETE: "bg-red-200/40 text-red-600",
};

/** Monospace HTTP method label used in the API explorer (4px corners). */
export function MethodBadge({ method, className = "" }: { method: HttpMethod; className?: string }) {
  return (
    <span className={`inline-block rounded-sm px-1.5 py-[3px] text-center font-mono text-eyebrow font-bold leading-[1.3] ${METHOD[method]} ${className}`}>
      {method}
    </span>
  );
}

/** Dashed green confirmation stamp that ticks in (wizard "Packaged" stamp). */
export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex w-max items-center gap-1 self-start rounded-full border border-dashed border-green-600 bg-white px-2.5 py-1 text-xs font-semibold text-green-700 ${className}`}
      style={{ animation: "fasTick .5s cubic-bezier(.2,.8,.2,1) both" }}
    >
      {children}
    </span>
  );
}

/** Dashed blue monospace promo code. */
export function CouponCode({ code, className = "" }: { code: string; className?: string }) {
  return (
    <code
      className={`inline-block rounded-sm border-[1.5px] border-dashed border-blue-500 bg-blue-50 px-[9px] py-1 font-mono text-xs font-extrabold tracking-[.12em] text-navy-800 ${className}`}
    >
      {code}
    </code>
  );
}

export type Store = "app-store" | "google-play" | "web";

function AppleGlyph() {
  return (
    <svg aria-hidden="true" width="13" height="15" viewBox="0 0 17 20" fill="currentColor">
      <path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1.1 7.4c-1.9 3.2-.5 8 1.3 10.6.9 1.3 1.9 2.7 3.3 2.7 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.4 0 2.3-1.3 3.2-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.9-1.1-3-4.4ZM11.5 2.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.5Z" />
    </svg>
  );
}

const STORE: Record<Store, { label: string; glyph: ReactNode }> = {
  "app-store": { label: "App Store", glyph: <AppleGlyph /> },
  "google-play": { label: "Google Play", glyph: <span aria-hidden="true">▶</span> },
  web: { label: "Web app, installable", glyph: <Icon name="globe" size={14} /> },
};

/** Glass store button for dark heroes (Mobile app page). Renders a link when `href` is set. */
export function StoreBadge({
  store,
  href,
  label,
  className = "",
}: {
  store: Store;
  href?: string;
  /** Override the default label ("App Store", "Google Play", "Web app, installable"). */
  label?: string;
  className?: string;
}) {
  const s = STORE[store];
  const cls = `inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/8 px-3 py-2 text-small font-semibold text-white ${
    href ? "transition-colors duration-150 hover:bg-white/14 hover:text-white" : ""
  } ${className}`;
  const content = (
    <>
      {s.glyph}
      {label ?? s.label}
    </>
  );
  return href ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <span className={cls}>{content}</span>
  );
}
