/* Shared input skin: plain module so server components (Select, CopyField) can use it. */

export type FieldTone = "light" | "dark";
/** sm 9/11 (editor, publish) · md 10/12 (account, enterprise) · lg 11/12 (auth, demo form; default). */
export type FieldSize = "sm" | "md" | "lg";
export type FieldState = "default" | "error" | "warning";

const PAD: Record<FieldSize, string> = { sm: "px-[11px] py-[9px]", md: "px-3 py-2.5", lg: "px-3 py-[11px]" };

export const SURFACE: Record<FieldTone, string> = {
  light: "bg-white text-gray-900 placeholder:text-gray-400",
  dark: "bg-white/[.06] text-white placeholder:text-slate-400",
};

export const BORDER: Record<FieldTone, Record<FieldState, string>> = {
  light: { default: "border-gray-300", error: "border-red-300", warning: "border-amber-500" },
  dark: { default: "border-white/[.18]", error: "border-red-400", warning: "border-amber-300" },
};

/** Prototype focus: blue-500 border + 3px blue-100 ring (blue-400 on dark). */
export const FOCUS: Record<FieldTone, string> = {
  light: "focus:border-blue-500 focus:shadow-[0_0_0_3px_var(--color-blue-100)]",
  dark: "focus:border-blue-400 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-blue-400)_25%,transparent)]",
};
export const FOCUS_WITHIN: Record<FieldTone, string> = {
  light: "focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_var(--color-blue-100)]",
  dark: "focus-within:border-blue-400 focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-blue-400)_25%,transparent)]",
};

/** Shared control skin (border, surface, focus ring, padding) for inputs, selects and code fields. */
export function fieldControlClasses({
  tone = "light",
  state = "default",
  size = "lg",
  textSize = "text-sm",
  pad,
  surface,
}: {
  tone?: FieldTone;
  state?: FieldState;
  size?: FieldSize;
  textSize?: string;
  /** Padding override for controls with their own measured padding (OTP, small select). */
  pad?: string;
  /** Surface override (background + text colour). */
  surface?: string;
} = {}) {
  return `rounded-sm border outline-none focus-visible:outline-none transition-[border-color,box-shadow] duration-150 ${pad ?? PAD[size]} ${textSize} ${surface ?? SURFACE[tone]} ${BORDER[tone][state]} ${FOCUS[tone]}`;
}

