import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export type FeatureCell = { title: ReactNode; description: ReactNode };

type FeatureCellGridProps = {
  items: FeatureCell[];
  /** Min cell width before wrapping (220 default on QR; 180 on the templates hub). */
  minCol?: number;
  /** Fade each cell in on scroll, staggered by `stagger` seconds. */
  reveal?: boolean;
  stagger?: number;
  /** Element for the cell titles (span default; h3 when the grid sits under a section heading). */
  titleAs?: "span" | "h3";
  className?: string;
};

/** Hairline grid of title + description cells (1px gray-200 rules, 12px corners). */
export function FeatureCellGrid({
  items,
  minCol = 220,
  reveal = false,
  stagger = 0.06,
  titleAs: Title = "span",
  className = "",
}: FeatureCellGridProps) {
  const cell = "flex flex-col gap-1.5 bg-white p-5";
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minCol}px, 100%), 1fr))` }}
    >
      {items.map((f, i) => {
        const body = (
          <>
            <Title className="m-0 text-body leading-[1.35] font-bold text-navy-800">{f.title}</Title>
            <span className="text-[13.5px] leading-[1.5] text-gray-600">{f.description}</span>
          </>
        );
        return reveal ? (
          <Reveal key={i} delay={i * stagger} className={cell}>
            {body}
          </Reveal>
        ) : (
          <div key={i} className={cell}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
