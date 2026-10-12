import type { ElementType, ReactNode } from "react";

/** 1200px page container with 32px side padding (20px on phones). border-box so padding never widens it. */
export function Container({
  as: Tag = "div",
  children,
  className = "",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={`mx-auto box-border w-full max-w-page px-8 max-sm:px-5 ${className}`}>{children}</Tag>;
}
