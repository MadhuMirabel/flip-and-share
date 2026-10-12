"use client";

import { useRef, type ReactNode } from "react";

export type BillingCycle = "monthly" | "annual";

type BillingToggleProps = {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
  monthlyLabel?: ReactNode;
  annualLabel?: ReactNode;
  /** Companion badge, fully visible on Annual and dimmed on Monthly. Pass null to hide. */
  saveLabel?: ReactNode;
  /** Accessible name for the group. */
  label?: string;
  className?: string;
};

const CYCLES: BillingCycle[] = ["monthly", "annual"];

/** Pricing Monthly/Annual pill on dark: springy sliding thumb, blue on Monthly and green on Annual. */
export function BillingToggle({
  value,
  onChange,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  saveLabel = "Save 20%",
  label = "Billing period",
  className = "",
}: BillingToggleProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const annual = value === "annual";

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <div
        role="radiogroup"
        aria-label={label}
        className="relative grid grid-cols-2 rounded-full border border-white/[.18] bg-white/[.08] p-[3px]"
      >
        <span
          aria-hidden="true"
          className={`absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full ${
            annual
              ? "translate-x-full bg-green-600 shadow-[0_4px_12px_-4px_var(--color-green-600)]"
              : "translate-x-0 bg-blue-500 shadow-[0_4px_12px_-4px_var(--color-blue-500)]"
          }`}
          style={{ transition: "transform .35s cubic-bezier(.34,1.3,.5,1), background .35s ease, box-shadow .35s ease" }}
        />
        {CYCLES.map((cycle, i) => {
          const on = cycle === value;
          return (
            <button
              key={cycle}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(cycle)}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
                e.preventDefault();
                const next = e.key === "Home" ? 0 : e.key === "End" ? 1 : 1 - i;
                refs.current[next]?.focus();
                onChange(CYCLES[next]);
              }}
              className={`relative cursor-pointer rounded-full border-0 bg-transparent px-[18px] py-[7px] text-label font-semibold transition-colors duration-300 ${
                on ? "text-white" : "text-blue-100"
              }`}
            >
              {cycle === "monthly" ? monthlyLabel : annualLabel}
            </button>
          );
        })}
      </div>
      {saveLabel != null && (
        <span
          className={`rounded-full bg-green-500/[.18] px-[9px] py-1 text-xs font-bold text-green-300 transition-opacity duration-200 ${
            annual ? "opacity-100" : "opacity-35"
          }`}
        >
          {saveLabel}
        </span>
      )}
    </div>
  );
}
