"use client";

import { useId, useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type AccordionItem = { id?: string; question: ReactNode; answer: ReactNode };

type AccordionProps = {
  items: AccordionItem[];
  /** divided: open list with hairlines and a circled "+" (home) · cards: white bordered cards (use case, pricing, resources). */
  variant?: "divided" | "cards";
  /** Allow several items open at once. Default: one at a time. */
  multiple?: boolean;
  /** Index (or indexes, with `multiple`) open on first render. */
  defaultOpen?: number | number[];
  /** cards only: md = 15/18 padding, 15px question · lg = 16/20 padding, 15.5px question. Corners are always 10px. */
  size?: "md" | "lg";
  /** Heading level wrapping each trigger. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

/**
 * FAQ accordion: real <button> triggers with aria-expanded / aria-controls,
 * smooth height via grid-template-rows 0fr ↔ 1fr, closed panels are inert.
 */
export function Accordion({
  items,
  variant = "divided",
  multiple = false,
  defaultOpen,
  size = "lg",
  headingLevel = 3,
  className = "",
}: AccordionProps) {
  const uid = useId();
  const [open, setOpen] = useState<number[]>(
    defaultOpen === undefined ? [] : Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen],
  );
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const divided = variant === "divided";

  const toggle = (i: number) =>
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : multiple ? [...cur, i] : [i]));

  return (
    <div className={`${divided ? "border-t border-gray-200" : "flex flex-col gap-2.5"} ${className}`}>
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        const btnId = `${uid}-q-${it.id ?? i}`;
        const panelId = `${uid}-a-${it.id ?? i}`;
        return (
          <div
            key={it.id ?? i}
            className={
              divided
                ? "border-b border-gray-200"
                : `border border-gray-200 bg-white rounded-lg`
            }
          >
            <H className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={
                  divided
                    ? "flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-0 py-[18px] text-left text-[16.5px] font-semibold text-navy-800 transition-colors duration-150 hover:text-blue-600"
                    : `flex w-full cursor-pointer items-center justify-between gap-4 rounded-[inherit] border-0 bg-transparent text-left font-semibold text-navy-800 ${
                        size === "md" ? "px-[18px] py-[15px] text-body" : "px-5 py-4 text-[15.5px]"
                      }`
                }
              >
                <span>{it.question}</span>
                {divided ? (
                  <span
                    aria-hidden="true"
                    className={`flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border border-slate-300 text-base leading-none text-blue-600 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={`flex-none text-xl leading-none text-blue-600 transition-transform duration-250 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                )}
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-350 ease-fas"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                {divided ? (
                  <div className="mb-[18px] max-w-[620px] text-body leading-[1.65] text-gray-600 [&>p]:m-0">{it.answer}</div>
                ) : (
                  <div
                    className={`text-gray-600 [&>p]:m-0 ${
                      size === "md" ? "px-[18px] pb-[15px] text-sm leading-[1.6]" : "px-5 pb-4 pt-0.5 text-body-sm leading-[1.6]"
                    }`}
                  >
                    {it.answer}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- FaqSection ---------- */

type FaqSectionProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  /** Phone / email lines or a contact strip under the intro. */
  contact?: ReactNode;
  /** Buttons or links under the intro. */
  actions?: ReactNode;
  items: AccordionItem[];
  /** home: 2fr / 3fr, gap 48, divided list · auto: auto-fit minmax(300px), gap 40, card list. */
  layout?: "home" | "auto";
  /** Override the accordion variant (default: divided for home, cards for auto). */
  variant?: AccordionProps["variant"];
  defaultOpen?: AccordionProps["defaultOpen"];
  size?: AccordionProps["size"];
  className?: string;
};

/** Sticky intro column + FAQ list. Stacks (with a static intro) at ≤820px. */
export function FaqSection({
  eyebrow,
  title,
  intro,
  contact,
  actions,
  items,
  layout = "home",
  variant,
  defaultOpen,
  size,
  className = "",
}: FaqSectionProps) {
  const headingId = useId();
  const home = layout === "home";
  return (
    <section
      aria-labelledby={headingId}
      className={`grid items-start max-[820px]:grid-cols-1 max-[820px]:gap-6 ${
        home ? "grid-cols-[2fr_3fr] gap-12" : "grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10"
      } ${className}`}
    >
      <div className={`sticky flex flex-col gap-3.5 max-[820px]:static ${home ? "top-[90px]" : "top-24"}`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={headingId} className="m-0 text-h2 text-navy-800">
          {title}
        </h2>
        {intro && <div className="text-[15.5px] leading-[1.6] text-gray-600 [&>p]:m-0">{intro}</div>}
        {contact && <div className="text-body-sm text-gray-600">{contact}</div>}
        {actions && <div className="mt-1 flex flex-wrap gap-2.5">{actions}</div>}
      </div>
      <Accordion
        items={items}
        variant={variant ?? (home ? "divided" : "cards")}
        defaultOpen={defaultOpen ?? (home ? undefined : 0)}
        size={size}
      />
    </section>
  );
}
