import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  label: ReactNode;
  /** Muted second line under the label. */
  description?: ReactNode;
  /** "dark" for ink/navy surfaces. */
  tone?: "light" | "dark";
  className?: string;
};

/** Native checkbox, 15px, blue-500 accent; 13px gray-700 label (e.g. "Show passwords"). */
export function Checkbox({ label, description, tone = "light", className = "", id: idProp, disabled, ...rest }: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const descId = description ? `${id}-desc` : undefined;
  const dark = tone === "dark";
  return (
    <div className={`flex items-start gap-2 ${disabled ? "opacity-55" : ""} ${className}`}>
      <input
        {...rest}
        id={id}
        type="checkbox"
        disabled={disabled}
        aria-describedby={descId}
        className={`mt-px h-[15px] w-[15px] flex-none accent-blue-500 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      />
      <span className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className={`text-label ${dark ? "text-slate-200" : "text-gray-700"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {label}
        </label>
        {description && (
          <span id={descId} className={`text-small ${dark ? "text-slate-400" : "text-gray-500"}`}>
            {description}
          </span>
        )}
      </span>
    </div>
  );
}
