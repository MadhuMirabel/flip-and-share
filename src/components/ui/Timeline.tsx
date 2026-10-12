import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";

export type TimelineTone = "sky" | "violet" | "pink" | "mint" | "orange" | "teal" | "amber" | "red" | "gray" | "cyan";

/** Changelog node colours (prototype AREA_PAL). */
const NODE_TONE: Record<TimelineTone, string> = {
  sky: "bg-blue-100 text-blue-700",
  violet: "bg-violet-100 text-violet-700",
  pink: "bg-pink-100 text-pink-700",
  mint: "bg-green-100 text-green-700",
  orange: "bg-amber-100 text-orange-600",
  teal: "bg-teal-100 text-teal-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-200 text-red-600",
  gray: "bg-gray-200 text-gray-700",
  cyan: "bg-cyan-50 text-teal-700",
};

export type TimelineItem = {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  /** numbered: duration badge ("Day 1") · years: the year. */
  meta?: ReactNode;
  /** changelog: node icon and colour. */
  icon?: IconName;
  tone?: TimelineTone;
  /** changelog: the item body (e.g. a news card). */
  content?: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  /**
   * changelog: gray rail, 40px icon nodes with a white ring, free content ·
   * numbered: gradient rail, numbered 40px nodes, title + duration badge ·
   * years: mono year column, 14px ring nodes, last node green (company story).
   */
  variant?: "changelog" | "numbered" | "years";
  /** Fade each item in on scroll with this stagger (seconds). 0 disables. */
  revealStagger?: number;
  className?: string;
};

function Item({ reveal, delay, className, children }: { reveal: boolean; delay: number; className: string; children: ReactNode }) {
  return reveal ? (
    <Reveal as="li" delay={delay} className={className}>
      {children}
    </Reveal>
  ) : (
    <li className={className}>{children}</li>
  );
}

/** Vertical timelines: product changelog, switching plan, company story. */
export function Timeline({ items, variant = "changelog", revealStagger = 0.08, className = "" }: TimelineProps) {
  const reveal = revealStagger > 0;
  const list = "relative m-0 flex list-none flex-col p-0";

  if (variant === "changelog") {
    return (
      <div className={`relative ${className}`}>
        <span aria-hidden="true" className="absolute bottom-5 left-[19px] top-5 w-0.5 bg-gray-200" />
        <ol className={list}>
          {items.map((it, i) => (
            <Item
              key={it.id ?? i}
              reveal={reveal}
              delay={i * revealStagger}
              className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-5 pb-7"
            >
              <span
                aria-hidden="true"
                className={`relative flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white ${NODE_TONE[it.tone ?? "sky"]}`}
              >
                {it.icon && <Icon name={it.icon} size={18} />}
              </span>
              <div className="min-w-0">
                {it.content ?? (
                  <div className="flex flex-col gap-1">
                    {it.title && <span className="text-base font-bold text-navy-800">{it.title}</span>}
                    {it.description && <span className="text-sm leading-[1.55] text-gray-600">{it.description}</span>}
                  </div>
                )}
              </div>
            </Item>
          ))}
        </ol>
      </div>
    );
  }

  if (variant === "numbered") {
    return (
      <div className={`relative ${className}`}>
        <span aria-hidden="true" className="absolute bottom-5 left-[19px] top-5 w-0.5 bg-linear-to-b from-blue-500 to-blue-200" />
        <ol className={list}>
          {items.map((it, i) => (
            <Item
              key={it.id ?? i}
              reveal={reveal}
              delay={i * revealStagger}
              className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 py-3"
            >
              <span
                aria-hidden="true"
                className="z-[1] flex h-10 w-10 items-center justify-center rounded-full border-2 border-solid border-blue-500 bg-white text-sm font-bold text-blue-600"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-1 pt-0.5">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-navy-800">{it.title}</span>
                  {it.meta && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-caption font-bold text-navy-700">{it.meta}</span>
                  )}
                </span>
                {it.description && <span className="text-sm leading-[1.55] text-gray-600">{it.description}</span>}
                {it.content}
              </div>
            </Item>
          ))}
        </ol>
      </div>
    );
  }

  // years
  return (
    <div className={`relative ${className}`}>
      {/* Rail runs through the node centres (52px year + 14px gap + 3px inset + 10px radius - 1px). */}
      <span aria-hidden="true" className="absolute bottom-2 left-[78px] top-2 w-0.5 bg-linear-to-b from-blue-500 to-blue-200" />
      <ol className={list}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <Item
              key={it.id ?? i}
              reveal={reveal}
              delay={i * revealStagger}
              className="grid grid-cols-[52px_22px_minmax(0,1fr)] items-start gap-3.5 py-3"
            >
              <span className="pt-px text-right font-mono text-sm font-bold text-blue-700">{it.meta}</span>
              <span
                aria-hidden="true"
                className={`relative z-[1] ml-[3px] mt-[3px] h-5 w-5 rounded-full border-[3px] border-solid bg-white ${
                  last ? "border-green-600" : "border-blue-500"
                }`}
              />
              <div className="flex flex-col gap-[3px]">
                <span className="text-base font-bold text-navy-800">{it.title}</span>
                {it.description && <span className="text-sm leading-[1.55] text-gray-600">{it.description}</span>}
                {it.content}
              </div>
            </Item>
          );
        })}
      </ol>
    </div>
  );
}
