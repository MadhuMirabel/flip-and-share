"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import {
  BORDER,
  FOCUS_WITHIN,
  SURFACE,
  fieldControlClasses,
  type FieldSize,
  type FieldState,
  type FieldTone,
} from "@/components/ui/fieldStyles";

export type { FieldSize, FieldTone };

type Base = {
  label: string;
  /** Visually hide the label (still read by screen readers). */
  hideLabel?: boolean;
  /** Muted text after the label, e.g. "Optional" or "Pick any". */
  labelSuffix?: ReactNode;
  hint?: ReactNode;
  error?: string;
  /** Soft warning: amber border and an amber-700 message shown in place of the hint (e.g. missing alt text). */
  warning?: ReactNode;
  /** "light" on white surfaces, "dark" on ink/navy (footer). */
  tone?: FieldTone;
  size?: FieldSize;
  required?: boolean;
  /** Rendered beside the control, e.g. a Subscribe button. Wraps below on narrow widths. */
  action?: ReactNode;
  /** Fixed adornment inside the left edge (mono 13px on gray-50), e.g. "flipandshare.com/catalogs/". Inputs only. */
  prefix?: ReactNode;
  /** Character limit shown as "n / max" in the label row; turns red when exceeded (does not block typing). */
  counter?: number;
  /** Tabular figures + slight tracking for card numbers, codes and amounts. */
  tabularNums?: boolean;
  className?: string;
};

type InputProps = Base & { multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "prefix">;
type TextareaProps = Base & { multiline: true } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "prefix">;
export type FieldProps = InputProps | TextareaProps;

/** Label + control + hint + error, wired with htmlFor, aria-invalid and aria-describedby. */
export function Field(props: FieldProps) {
  const {
    label,
    hideLabel,
    labelSuffix,
    hint,
    error,
    warning,
    tone = "light",
    size = "lg",
    required,
    action,
    prefix,
    counter,
    tabularNums,
    className = "",
    multiline,
    id: idProp,
    ...control
  } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const dark = tone === "dark";
  const state: FieldState = error ? "error" : warning ? "warning" : "default";

  // Counter: controlled value wins; otherwise track length from change events.
  const [typed, setTyped] = useState(() => String(control.defaultValue ?? "").length);
  const length = control.value != null ? String(control.value).length : typed;
  const over = counter != null && length > counter;

  const note = warning ?? hint;
  const noteId = note ? `${id}-hint` : undefined;
  const countId = counter != null ? `${id}-count` : undefined;
  const errId = `${id}-err`;
  const describedBy =
    [control["aria-describedby"], noteId, countId, error ? errId : undefined].filter(Boolean).join(" ") || undefined;

  const userOnChange = control.onChange as ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined;
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (counter != null) setTyped(e.target.value.length);
    userOnChange?.(e);
  };

  const numeric = tabularNums ? "tabular-nums tracking-[.04em]" : "";
  const shared = {
    id,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  const field = multiline ? (
    <textarea
      {...(control as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      {...shared}
      onChange={onChange}
      rows={(control as TextareaHTMLAttributes<HTMLTextAreaElement>).rows ?? 4}
      className={`min-w-[180px] flex-1 resize-y ${fieldControlClasses({ tone, state, size })} ${numeric}`}
    />
  ) : prefix ? (
    <div
      className={`flex min-w-[180px] flex-1 overflow-hidden rounded-sm border transition-[border-color,box-shadow] duration-150 ${SURFACE[tone]} ${BORDER[tone][state]} ${FOCUS_WITHIN[tone]}`}
    >
      <span
        aria-hidden="true"
        className={`flex flex-none items-center border-r px-2.5 font-mono text-label ${
          dark ? "border-white/[.12] bg-white/[.04] text-slate-400" : "border-gray-200 bg-gray-50 text-gray-500"
        }`}
      >
        {prefix}
      </span>
      <input
        {...(control as InputHTMLAttributes<HTMLInputElement>)}
        {...shared}
        onChange={onChange}
        className={`min-w-0 flex-1 border-0 bg-transparent py-[9px] pr-[11px] pl-2 font-mono text-label outline-none focus-visible:outline-none ${
          dark ? "text-white placeholder:text-slate-400" : "text-gray-900 placeholder:text-gray-400"
        } ${numeric}`}
      />
    </div>
  ) : (
    <input
      {...(control as InputHTMLAttributes<HTMLInputElement>)}
      {...shared}
      onChange={onChange}
      className={`min-w-[180px] flex-1 ${fieldControlClasses({ tone, state, size })} ${numeric}`}
    />
  );

  const labelCls = hideLabel ? "sr-only" : `text-small font-semibold ${dark ? "text-sm text-white" : "text-gray-700"}`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className={hideLabel && counter == null ? "contents" : "flex items-baseline justify-between gap-3"}>
        <label htmlFor={id} className={labelCls}>
          {label}
          {required && !hideLabel && (
            <span aria-hidden="true" className={dark ? "text-red-400" : "text-red-600"}>
              {" "}
              *
            </span>
          )}
          {labelSuffix && !hideLabel && (
            <span className={`font-normal ${dark ? "text-slate-400" : "text-gray-500"}`}> {labelSuffix}</span>
          )}
        </label>
        {counter != null && (
          <span
            id={countId}
            className={`text-xs tabular-nums ${over ? (dark ? "text-red-400" : "text-red-600") : dark ? "text-slate-400" : "text-gray-500"}`}
          >
            <span className="sr-only">Characters used: </span>
            {length} / {counter}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {field}
        {action}
      </div>
      {note && (
        <span
          id={noteId}
          className={
            warning ? `text-xs ${dark ? "text-amber-300" : "text-amber-700"}` : `text-small ${dark ? "text-slate-400" : "text-gray-500"}`
          }
        >
          {note}
        </span>
      )}
      <span id={errId} role={error ? "alert" : undefined} className={`min-h-3.5 text-xs ${dark ? "text-red-400" : "text-red-600"}`}>
        {error}
      </span>
    </div>
  );
}
