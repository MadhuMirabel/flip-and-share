"use client";

type ToggleProps = {
  checked: boolean;
  onChange?: (next: boolean) => void;
  label: string;
  disabled?: boolean;
  /** Locked-on style (e.g. "Necessary" cookies). */
  locked?: boolean;
};

/** 38x22 switch, 16px knob, .25s fas easing. */
export function Toggle({ checked, onChange, label, disabled, locked }: ToggleProps) {
  const off = disabled || locked;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-disabled={off || undefined}
      onClick={() => !off && onChange?.(!checked)}
      className={`relative h-[22px] w-[38px] flex-none rounded-full border-0 transition-colors duration-[250ms] ${
        locked ? "cursor-not-allowed bg-blue-300 opacity-70" : checked ? "cursor-pointer bg-blue-500" : "cursor-pointer bg-[#d1d5db]"
      }`}
    >
      <span
        className="absolute left-[3px] top-[3px] h-4 w-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,.25)] transition-transform duration-[250ms] ease-fas"
        style={{ transform: checked ? "translateX(16px)" : "none" }}
      />
    </button>
  );
}
