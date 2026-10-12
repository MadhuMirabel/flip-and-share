import type { CSSProperties, ElementType, ReactNode } from "react";

type SplitSectionProps = {
  /** The text column (usually a `SectionHeader` plus a checklist or CTA). */
  text: ReactNode;
  /** The visual column (mockup, chart, illustration). */
  visual: ReactNode;
  /** Put the visual first. Applies at every width, as in the prototype (`order:1/2`). */
  reverse?: boolean;
  /** Minimum column width in px before the grid stacks (340 default; 320 / 440 on some pages). */
  minCol?: number;
  /** Column gap in px (48 default). */
  gap?: number;
  /** Vertical alignment of the two columns. */
  align?: "center" | "start" | "end";
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

const ALIGN = { center: "items-center", start: "items-start", end: "items-end" };

/** Two-column text + visual grid: `repeat(auto-fit, minmax(340px, 1fr))`, gap 48, centred rows. */
export function SplitSection({
  text,
  visual,
  reverse = false,
  minCol = 340,
  gap = 48,
  align = "center",
  as: Tag = "div",
  className = "",
  style,
}: SplitSectionProps) {
  return (
    <Tag
      className={`grid ${ALIGN[align]} ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minCol}px, 100%), 1fr))`, gap, ...style }}
    >
      <div className={`min-w-0 ${reverse ? "order-2" : "order-1"}`}>{text}</div>
      <div className={`min-w-0 ${reverse ? "order-1" : "order-2"}`}>{visual}</div>
    </Tag>
  );
}
