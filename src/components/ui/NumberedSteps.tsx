import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/* ---------- NumberedSteps: tinted circles list ("What to expect") ---------- */

const TINTS = [
  "bg-blue-100 text-blue-700",
  "bg-amber-100 text-amber-700",
  "bg-green-100 text-green-700",
  "bg-violet-100 text-violet-700",
];

export type NumberedStep = { title: ReactNode; time?: ReactNode; description?: ReactNode };

/** Ordered list with 32px tinted number circles cycling sky / amber / mint / violet. */
export function NumberedSteps({ steps, className = "" }: { steps: NumberedStep[]; className?: string }) {
  return (
    <ol className={`m-0 flex list-none flex-col gap-3.5 p-0 ${className}`}>
      {steps.map((s, i) => (
        <li key={i} className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3">
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 items-center justify-center rounded-full text-label font-bold ${TINTS[i % TINTS.length]}`}
          >
            {i + 1}
          </span>
          <span className="flex flex-col gap-[3px]">
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="text-body-sm font-bold leading-snug text-gray-900">{s.title}</span>
              {s.time && <span className="font-mono text-eyebrow font-semibold text-gray-500">{s.time}</span>}
            </span>
            {s.description && <span className="text-menu leading-normal text-gray-600">{s.description}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- StepCard: "How it works" cards ---------- */

type StepCardProps = {
  n: number;
  title: ReactNode;
  text?: ReactNode;
  time?: ReactNode;
  /** md: 30px circle, plain gray time, radius 12 (use case) · lg: 34px circle, time pill, radius 14 (feature detail). */
  size?: "md" | "lg";
  className?: string;
};

export function StepCard({ n, title, text, time, size = "lg", className = "" }: StepCardProps) {
  const lg = size === "lg";
  return (
    <div
      className={`flex h-full flex-col border border-gray-200 bg-white p-[22px] ${lg ? "gap-3 rounded-lg" : "gap-2.5 rounded-lg"} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className={`flex items-center justify-center rounded-full bg-navy-800 font-bold text-white ${
            lg ? "h-[34px] w-[34px] text-sm" : "h-[30px] w-[30px] text-label"
          }`}
        >
          {n}
        </span>
        {time &&
          (lg ? (
            <span className="rounded-full bg-blue-100 px-[9px] py-[3px] text-caption font-bold text-navy-700">{time}</span>
          ) : (
            <span className="text-xs text-gray-500">{time}</span>
          ))}
      </div>
      <h3 className={`m-0 font-bold text-navy-800 ${lg ? "text-[15.5px] leading-[1.3]" : "text-base"}`}>
        <span className="sr-only">Step {n}: </span>
        {title}
      </h3>
      {text && <p className="m-0 text-sm leading-[1.55] text-gray-600">{text}</p>}
    </div>
  );
}

/** Three-up StepCard grid (1 column ≤640px) with staggered reveal. */
export function StepCardGrid({
  steps,
  size = "lg",
  reveal = true,
  className = "",
}: {
  steps: Omit<StepCardProps, "n" | "size" | "className">[];
  size?: StepCardProps["size"];
  reveal?: boolean;
  className?: string;
}) {
  return (
    <ol className={`m-0 grid list-none grid-cols-3 gap-4 p-0 max-[640px]:grid-cols-1 ${className}`}>
      {steps.map((s, i) =>
        reveal ? (
          <Reveal as="li" key={i} delay={i * 0.08}>
            <StepCard n={i + 1} size={size} {...s} />
          </Reveal>
        ) : (
          <li key={i}>
            <StepCard n={i + 1} size={size} {...s} />
          </li>
        ),
      )}
    </ol>
  );
}

/* ---------- SolutionSteps: blue-50 panel ---------- */

/** Blue-50 panel with a bold heading and 22px blue number circles (Solutions hub). */
export function SolutionSteps({
  title = "How FlipAndShare handles it",
  steps,
  className = "",
}: {
  title?: ReactNode;
  steps: ReactNode[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 rounded-lg bg-blue-50 p-5 ${className}`}>
      <span className="text-label font-bold uppercase text-navy-700">{title}</span>
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-blue-500 text-eyebrow font-bold text-white"
            >
              {i + 1}
            </span>
            <span className="text-body-sm leading-normal text-gray-700">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
