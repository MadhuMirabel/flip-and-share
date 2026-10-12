import type { ReactNode } from "react";

export type StepStatus = "done" | "current" | "upcoming";

export type Step = {
  label: string;
  /** Second line (dark variant only). */
  description?: ReactNode;
  /** Override the status derived from `current`. */
  status?: StepStatus;
};

type StepperProps = {
  steps: Step[];
  /** Zero-based index of the current step; earlier steps are done. */
  current: number;
  /**
   * pills: flow-header pills (collapses to a "Step n of N" chip ≤760px) ·
   * tabs: full-width tab strip with underline (demo / publish wizard) ·
   * process: vertical checklist with spinner (upload) ·
   * dark: numbered vertical cards on ink/navy.
   */
  variant?: "pills" | "tabs" | "process" | "dark";
  /** tabs only: md = 24px dot / 2px line (Book a demo) · lg = 26px dot / 3px line, tinted current, min 130px (Publish wizard). */
  size?: "md" | "lg";
  /** tabs only: gray-50 strip background. */
  tinted?: boolean;
  /** Makes each step a button. */
  onStepClick?: (index: number) => void;
  /** Accessible name for the list. */
  label?: string;
  className?: string;
};

function statusOf(step: Step, i: number, current: number): StepStatus {
  return step.status ?? (i < current ? "done" : i === current ? "current" : "upcoming");
}

const SR_STATUS: Record<StepStatus, string> = { done: " (completed)", current: "", upcoming: "" };

/** Wraps step content in a button when clickable, otherwise a span; carries aria-current. */
function StepShell({
  clickable,
  status,
  onClick,
  className,
  children,
}: {
  clickable: boolean;
  status: StepStatus;
  onClick: () => void;
  className: string;
  children: ReactNode;
}) {
  const current = status === "current" ? ("step" as const) : undefined;
  return clickable ? (
    <button type="button" aria-current={current} onClick={onClick} className={`cursor-pointer border-0 text-left ${className}`}>
      {children}
    </button>
  ) : (
    <span aria-current={current} className={className}>
      {children}
    </span>
  );
}

export function Stepper({
  steps,
  current,
  variant = "pills",
  size = "md",
  tinted = false,
  onStepClick,
  label = "Progress",
  className = "",
}: StepperProps) {
  const clickable = !!onStepClick;
  const list = steps.map((s, i) => ({ ...s, i, st: statusOf(s, i, current) }));

  if (variant === "pills") {
    const cur = list.find((s) => s.st === "current") ?? list[Math.min(current, list.length - 1)];
    return (
      <div className={className}>
        <ol aria-label={label} className="m-0 flex list-none gap-1 p-0 max-[760px]:hidden">
          {list.map((s) => (
            <li key={s.i}>
              <StepShell
                clickable={clickable}
                status={s.st}
                onClick={() => onStepClick?.(s.i)}
                className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-label font-semibold transition-colors duration-150 ${
                  s.st === "current" ? "bg-blue-50 text-navy-700" : s.st === "done" ? "bg-transparent text-navy-800" : "bg-transparent text-gray-500"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full text-eyebrow ${
                    s.st === "upcoming" ? "bg-gray-100 text-gray-500" : "bg-blue-500 text-white"
                  }`}
                >
                  {s.st === "done" ? "✓" : s.i + 1}
                </span>
                {s.label}
                <span className="sr-only">{SR_STATUS[s.st]}</span>
              </StepShell>
            </li>
          ))}
        </ol>
        {cur && (
          <span className="hidden whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-1.5 text-small font-bold text-navy-700 max-[760px]:inline-flex">
            Step {cur.i + 1} of {list.length} · {cur.label}
          </span>
        )}
      </div>
    );
  }

  if (variant === "tabs") {
    const lg = size === "lg";
    return (
      <ol
        aria-label={label}
        className={`no-scrollbar m-0 flex list-none overflow-x-auto border-b border-gray-200 p-0 ${tinted ? "bg-slate-50" : ""} ${className}`}
      >
        {list.map((s) => {
          const tone =
            s.st === "done"
              ? { dot: "bg-green-600 text-white", fg: "text-gray-700", bd: "border-transparent", bg: lg ? "bg-white" : "" }
              : s.st === "current"
                ? { dot: "bg-blue-500 text-white", fg: "text-navy-800", bd: "border-blue-500", bg: lg ? "bg-blue-50" : "" }
                : { dot: lg ? "bg-slate-100 text-gray-500" : "bg-gray-200 text-gray-500", fg: "text-gray-500", bd: "border-transparent", bg: lg ? "bg-white" : "" };
          return (
            <li key={s.i} className={`flex flex-1 ${lg ? "min-w-[130px]" : ""}`}>
              <StepShell
                clickable={clickable}
                status={s.st}
                onClick={() => onStepClick?.(s.i)}
                className={`-mb-px flex w-full items-center gap-2.5 border-solid transition-all duration-300 ${
                  lg ? "border-b-[3px] px-3.5 py-4" : "border-b-2 px-5 py-4"
                } ${tone.bd} ${tone.bg || "bg-transparent"} ${tone.fg}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex flex-none items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    lg ? "h-[26px] w-[26px]" : "h-6 w-6"
                  } ${tone.dot}`}
                >
                  {s.st === "done" ? "✓" : s.i + 1}
                </span>
                <span className="text-menu font-semibold max-[640px]:sr-only">{s.label}</span>
                <span className="sr-only">{SR_STATUS[s.st]}</span>
              </StepShell>
            </li>
          );
        })}
      </ol>
    );
  }

  if (variant === "process") {
    return (
      <ol aria-label={label} className={`m-0 flex list-none flex-col gap-2.5 p-0 ${className}`}>
        {list.map((s) => (
          <li
            key={s.i}
            aria-current={s.st === "current" ? "step" : undefined}
            className={`flex items-center gap-2.5 text-sm ${
              s.st === "done" ? "text-gray-900" : s.st === "current" ? "text-navy-700" : "text-gray-500"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-2 border-solid text-[10px] text-white ${
                s.st === "done"
                  ? "border-green-600 bg-green-600"
                  : s.st === "current"
                    ? "border-blue-200 border-t-blue-500 bg-transparent"
                    : "border-gray-200 bg-transparent"
              }`}
              style={s.st === "current" ? { animation: "fasSpin .8s linear infinite" } : undefined}
            >
              {s.st === "done" ? "✓" : ""}
            </span>
            {s.label}
            <span className="sr-only">{s.st === "current" ? " (in progress)" : SR_STATUS[s.st]}</span>
          </li>
        ))}
      </ol>
    );
  }

  // dark
  return (
    <ol aria-label={label} className={`m-0 flex list-none flex-col gap-2 p-0 ${className}`}>
      {list.map((s) => (
        <li key={s.i}>
          <StepShell
            clickable={clickable}
            status={s.st}
            onClick={() => onStepClick?.(s.i)}
            className={`grid w-full grid-cols-[30px_minmax(0,1fr)] items-start gap-3 rounded-lg border border-solid px-3.5 py-3 text-white transition-all duration-300 ${
              s.st === "current" ? "border-blue-300/60 bg-blue-500/16" : "border-white/10 bg-transparent hover:bg-white/5"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-xs font-bold ${
                s.st === "current"
                  ? "bg-blue-500 text-white"
                  : s.st === "done"
                    ? "bg-green-500/25 text-green-300"
                    : "bg-white/10 text-blue-200"
              }`}
            >
              {s.st === "done" ? "✓" : s.i + 1}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-body font-bold">
                {s.label}
                <span className="sr-only">{SR_STATUS[s.st]}</span>
              </span>
              {s.description && <span className="text-small text-blue-200">{s.description}</span>}
            </span>
          </StepShell>
        </li>
      ))}
    </ol>
  );
}
