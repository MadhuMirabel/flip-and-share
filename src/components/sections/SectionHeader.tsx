import type { CSSProperties, ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type SectionHeadingSize = "lg" | "md" | "sm" | "xs";

/** H2 scale from the prototype (all navy-800 on light, white on dark). */
const HEADING: Record<SectionHeadingSize, string> = {
  lg: "text-[clamp(30px,4vw,40px)] leading-[1.1] tracking-[-0.03em]",
  md: "text-[clamp(28px,3.6vw,38px)] leading-[1.12] tracking-[-0.025em]",
  sm: "text-[clamp(26px,3.4vw,36px)] leading-[1.15] tracking-[-0.025em]",
  xs: "text-[clamp(24px,2.8vw,32px)] leading-[1.15] tracking-[-0.025em]",
};

type SectionHeaderProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  /** Prefix for a numbered eyebrow: `number="01"` + `eyebrow="AD UNITS"` renders "01 · AD UNITS". */
  number?: string;
  lead?: ReactNode;
  /** lg clamp(30–40) · md clamp(28–38) (default) · sm clamp(26–36) · xs clamp(24–32). */
  size?: SectionHeadingSize;
  /** Lead paragraph size: 15.5px (default) or 16px. */
  leadSize?: "md" | "lg";
  align?: "start" | "center";
  tone?: "light" | "dark";
  /** Max width of the text column in px (default 720). */
  maxWidth?: number;
  /** Right-aligned slot (link, filter pills). Wraps below the text on narrow screens. */
  action?: ReactNode;
  /** Heading level (h2 default). */
  as?: "h2" | "h3";
  /** id for the heading so a `Section` can reference it with `labelledBy`. */
  id?: string;
  /** Extra content under the lead (checklist, chips, CTA hint). */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Eyebrow + H2 + optional lead, with an optional right-aligned action. */
export function SectionHeader({
  title,
  eyebrow,
  number,
  lead,
  size = "md",
  leadSize = "md",
  align = "start",
  tone = "light",
  maxWidth = 720,
  action,
  as: Heading = "h2",
  id,
  children,
  className = "",
  style,
}: SectionHeaderProps) {
  const centered = align === "center";
  const dark = tone === "dark";
  const text = (
    <div
      className={`flex flex-col gap-3 ${centered ? "mx-auto items-center text-center" : ""} ${action ? "" : className}`}
      style={{ maxWidth, ...(action ? undefined : style) }}
    >
      {eyebrow != null && (
        <Eyebrow tone={dark ? "dark" : "light"}>
          {number ? `${number} · ` : ""}
          {eyebrow}
        </Eyebrow>
      )}
      <Heading id={id} className={`m-0 font-bold ${HEADING[size]} ${dark ? "text-white" : "text-navy-800"}`}>
        {title}
      </Heading>
      {lead != null && (
        <p
          className={`m-0 leading-[1.6] ${leadSize === "lg" ? "text-base" : "text-[15.5px]"} ${dark ? "text-slate-300" : "text-gray-600"}`}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );

  if (!action) return text;
  return (
    <div className={`flex flex-wrap items-end justify-between gap-5 ${className}`} style={style}>
      {text}
      <div className="flex flex-wrap items-center gap-2">{action}</div>
    </div>
  );
}
