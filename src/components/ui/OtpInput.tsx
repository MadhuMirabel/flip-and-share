"use client";

import { useId, type ReactNode } from "react";
import { fieldControlClasses } from "@/components/ui/fieldStyles";

type OtpInputProps = {
  value: string;
  /** Receives digits only, at most `length` characters. */
  onChange: (code: string) => void;
  /** Fires once all digits are entered (also on paste). */
  onComplete?: (code: string) => void;
  label?: string;
  /** Visually hide the label (default true: the surrounding copy usually explains it). */
  hideLabel?: boolean;
  length?: number;
  error?: string;
  /** Inline action beside the input, e.g. <Button>Verify</Button>. */
  action?: ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  className?: string;
};

/** Single-field verification code: mono 18px, .3em tracking, digits only, SMS/one-time-code autofill. */
export function OtpInput({
  value,
  onChange,
  onComplete,
  label = "Verification code",
  hideLabel = true,
  length = 6,
  error,
  action,
  disabled,
  autoFocus,
  name,
  id: idProp,
  className = "",
}: OtpInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errId = `${id}-err`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "text-small font-semibold text-gray-700"}>
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-2.5">
        <input
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern={`[0-9]{${length}}`}
          maxLength={length}
          placeholder={"0".repeat(length)}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          onChange={(e) => {
            const code = e.target.value.replace(/\D/g, "").slice(0, length);
            onChange(code);
            if (code.length === length && code !== value) onComplete?.(code);
          }}
          className={`w-[150px] text-center font-mono font-semibold tracking-[.3em] disabled:opacity-55 ${fieldControlClasses({
            state: error ? "error" : "default",
            size: "md",
            textSize: "text-lg",
          })}`}
        />
        {action}
      </div>
      {error && (
        <span id={errId} role="alert" className="text-small text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
