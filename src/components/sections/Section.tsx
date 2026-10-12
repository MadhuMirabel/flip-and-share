import type { CSSProperties, ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export type SectionTone = "plain" | "tinted" | "dark";
export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl";

const TONE: Record<SectionTone, string> = {
  plain: "bg-white",
  tinted: "border-y border-gray-200",
  dark: "bg-ink-950 text-white",
};

/** Vertical padding: sm 52 · md 64 · lg 80 (default) · xl 88. */
const PAD: Record<SectionPadding, string> = {
  none: "",
  sm: "py-[52px]",
  md: "py-16",
  lg: "py-20",
  xl: "py-[88px]",
};

type SectionProps = {
  children: ReactNode;
  /** plain = white · tinted = slate-50 band with gray-200 top/bottom rules · dark = ink-950. */
  tone?: SectionTone;
  /** Tinted band colour: slate-50 (default) or gray-50 (a few prototype bands). */
  tint?: "slate" | "gray";
  padding?: SectionPadding;
  /** Override top / bottom padding separately (e.g. `pt-0` for a section that continues the previous one). */
  paddingClassName?: string;
  /** 1100px inner width instead of the 1200px page width. */
  narrow?: boolean;
  /** Stack children in a flex column with this gap (px); the prototype's bands use 28. */
  gap?: number;
  id?: string;
  /** id of the heading that names this section (sets aria-labelledby). */
  labelledBy?: string;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
};

/**
 * Page section wrapper: background tone, vertical rhythm and a centred 1200px (or 1100px) container
 * with 32px side padding (20px on phones).
 */
export function Section({
  children,
  tone = "plain",
  tint = "slate",
  padding = "lg",
  paddingClassName = "",
  narrow = false,
  gap,
  id,
  labelledBy,
  as: Tag = "section",
  className = "",
  innerClassName = "",
  style,
}: SectionProps) {
  const bg = tone === "tinted" ? (tint === "gray" ? "bg-gray-50" : "bg-slate-50") : "";
  const body = gap != null ? <div className="flex flex-col" style={{ gap }}>{children}</div> : children;
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${TONE[tone]} ${bg} ${PAD[padding]} ${paddingClassName} ${className}`}
      style={style}
    >
      {narrow ? (
        <div className={`mx-auto box-border w-full max-w-[1100px] px-8 max-sm:px-5 ${innerClassName}`}>{body}</div>
      ) : (
        <Container className={innerClassName}>{body}</Container>
      )}
    </Tag>
  );
}
