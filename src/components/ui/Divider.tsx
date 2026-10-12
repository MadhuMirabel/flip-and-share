import type { ReactNode } from "react";

/** Hairline rule; with `label`, the text sits between two rules ("or with email"). */
export function Divider({
  label,
  tone = "light",
  className = "",
}: {
  label?: ReactNode;
  /** light = gray-200 on white · soft = slate-100 · dark = white/10 on ink. */
  tone?: "light" | "soft" | "dark";
  className?: string;
}) {
  const line = tone === "dark" ? "bg-white/10" : tone === "soft" ? "bg-slate-100" : "bg-gray-200";
  if (!label) return <hr className={`m-0 h-px border-0 ${line} ${className}`} />;
  return (
    <div className={`flex items-center gap-3 text-xs ${tone === "dark" ? "text-slate-400" : "text-gray-500"} ${className}`}>
      <span aria-hidden="true" className={`h-px flex-1 ${line}`} />
      <span>{label}</span>
      <span aria-hidden="true" className={`h-px flex-1 ${line}`} />
    </div>
  );
}
