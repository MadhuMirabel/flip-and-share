import type { ReactNode } from "react";

/** 11px/600 mono, .12em tracking, uppercase. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "amber";
  className?: string;
}) {
  const color = tone === "dark" ? "text-blue-300" : tone === "amber" ? "text-[#fcd34d]" : "text-[#6b7280]";
  return (
    <span className={`font-mono text-[11px] font-semibold uppercase tracking-[.12em] ${color} ${className}`}>
      {children}
    </span>
  );
}
