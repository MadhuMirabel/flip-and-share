import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** light = on white (gray-500), dark = on ink/navy (blue-300), amber = warm accent on dark. */
  tone?: "light" | "dark" | "amber";
  /** xs 10.5px (mega-menu columns) · sm 11px (default) · md 11.5px (footer headings). */
  size?: "xs" | "sm" | "md";
  /** Render as a heading when the label titles a section (e.g. footer columns). */
  as?: "span" | "p" | "h2" | "h3";
  className?: string;
};

const TONE = { light: "text-gray-500", dark: "text-blue-300", amber: "text-amber-300" };
const SIZE = { xs: "text-2xs font-semibold", sm: "text-eyebrow font-semibold", md: "text-caption font-bold" };

/** Section eyebrow label: mono, uppercase, wide tracking. */
export function Eyebrow({ children, tone = "light", size = "sm", as: Tag = "span", className = "" }: EyebrowProps) {
  return (
    <Tag className={`m-0 font-mono uppercase tracking-eyebrow ${SIZE[size]} ${TONE[tone]} ${className}`}>{children}</Tag>
  );
}
