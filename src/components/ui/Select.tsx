import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { fieldControlClasses, type FieldTone } from "@/components/ui/fieldStyles";

export type SelectOption = string | { value: string; label: ReactNode; disabled?: boolean };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "size"> & {
  label: string;
  /** Visually hide the label (still read by screen readers). */
  hideLabel?: boolean;
  /** Muted text after the label, e.g. "Optional". */
  labelSuffix?: ReactNode;
  /** Options as strings or {value,label}; or pass <option> children instead. */
  options?: SelectOption[];
  /** sm: 6/8 · 12.5px gray-700 (time-zone picker) · md: 8/10 · 14px (analytics filter, default). */
  size?: "sm" | "md";
  tone?: FieldTone;
  hint?: ReactNode;
  error?: string;
  /** Lay label and control on one line (compact toolbars). */
  inline?: boolean;
  className?: string;
};

/** Native <select> with the Field skin and focus ring. */
export function Select({
  label,
  hideLabel,
  labelSuffix,
  options,
  size = "md",
  tone = "light",
  hint,
  error,
  inline,
  className = "",
  id: idProp,
  children,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const dark = tone === "dark";
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  const control = `${fieldControlClasses({
    tone,
    state: error ? "error" : "default",
    textSize: size === "sm" ? "text-small" : "text-sm",
    pad: size === "sm" ? "px-2 py-1.5" : "px-2.5 py-2",
    surface: dark ? "bg-white/[.06] text-white [&>option]:text-gray-900" : `bg-white ${size === "sm" ? "text-gray-700" : "text-gray-900"}`,
  })} cursor-pointer`;

  return (
    <div className={`flex ${inline ? "flex-row items-center gap-2" : "flex-col gap-1.5"} ${className}`}>
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : `text-small font-semibold ${dark ? "text-white" : "text-gray-700"}`}
      >
        {label}
        {labelSuffix && !hideLabel && (
          <span className={`font-normal ${dark ? "text-slate-400" : "text-gray-500"}`}> {labelSuffix}</span>
        )}
      </label>
      <select
        {...rest}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={control}
      >
        {options?.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ),
        )}
        {children}
      </select>
      {hint && (
        <span id={hintId} className={`text-small ${dark ? "text-slate-400" : "text-gray-500"}`}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errId} role="alert" className={`text-xs ${dark ? "text-red-400" : "text-red-600"}`}>
          {error}
        </span>
      )}
    </div>
  );
}
