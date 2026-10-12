"use client";

import { useId, useRef, type FormEvent, type InputHTMLAttributes } from "react";

export type SearchVariant = "hero" | "toolbar" | "dark" | "app";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "onChange" | "onSubmit"> & {
  /**
   * hero: white 10px-radius pill on a dark hero (Blog, Resources) ·
   * toolbar: bordered box with magnifier (Integrations) ·
   * dark: translucent pill on a dark hero (Templates) ·
   * app: 260px app-shell search (Library)
   */
  variant?: SearchVariant;
  /** Accessible label; visually hidden. */
  label?: string;
  onValueChange?: (value: string) => void;
  /** Called on Enter or on the inline button. Wraps the field in a role="search" form. */
  onSearch?: (value: string) => void;
  /** Inline primary button label (hero variant only), e.g. "Search". */
  buttonLabel?: string;
  className?: string;
};

function Magnifier({ size }: { size: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

const WRAP: Record<SearchVariant, string> = {
  hero: "flex w-full max-w-[520px] items-center gap-2 rounded-lg bg-white py-[5px] pr-[5px] pl-3.5 text-gray-400",
  toolbar:
    "flex min-w-[240px] items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-gray-400 transition-[border-color,box-shadow] duration-150 focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_var(--color-blue-100)]",
  dark: "flex w-[280px] max-w-full",
  app: "flex w-[260px] max-w-full",
};

const INPUT: Record<SearchVariant, string> = {
  hero: "min-w-0 flex-1 border-0 bg-transparent py-2 text-body-sm leading-normal text-gray-900 outline-none placeholder:text-gray-400 focus-visible:outline-none",
  toolbar: "min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus-visible:outline-none",
  dark: "w-full rounded-full border border-white/25 bg-white/[.08] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-300 transition-colors duration-150 focus:border-blue-400 focus-visible:outline-none",
  app: "w-full rounded-sm border border-gray-300 bg-white px-3 py-[9px] text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-[border-color,box-shadow] duration-150 focus:border-blue-500 focus:shadow-[0_0_0_3px_var(--color-blue-100)] focus-visible:outline-none",
};

/** Search field in the four prototype skins, always a role="search" form with a visually hidden label. */
export function SearchInput({
  variant = "toolbar",
  label = "Search",
  onValueChange,
  onSearch,
  buttonLabel,
  placeholder = "Search",
  className = "",
  id: idProp,
  ...rest
}: SearchInputProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const icon = variant === "hero" || variant === "toolbar";
  const inputRef = useRef<HTMLInputElement>(null);
  // Borderless inputs move the keyboard focus ring onto the pill.
  const heroFocus =
    variant === "hero"
      ? "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-blue-300"
      : "";

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(inputRef.current?.value ?? "");
  };

  return (
    <form role="search" onSubmit={submit} className={`${WRAP[variant]} ${heroFocus} ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {icon && <Magnifier size={15} />}
      <input
        {...rest}
        ref={inputRef}
        id={id}
        type="search"
        placeholder={placeholder}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={INPUT[variant]}
      />
      {buttonLabel && variant === "hero" && (
        <button
          type="submit"
          className="flex-none cursor-pointer rounded-md border-0 bg-blue-500 px-3.5 py-[9px] text-menu font-semibold text-white transition-colors duration-150 hover:bg-blue-600"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
}
