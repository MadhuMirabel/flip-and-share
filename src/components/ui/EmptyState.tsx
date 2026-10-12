import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type EmptyStateProps = {
  /**
   * dashed: dashed outline, 48px padding (library, templates) ·
   * placeholder: 160px min-height dashed slot (demo form) ·
   * card: white bordered card (webinar list) ·
   * plain: no frame (blog, integrations) ·
   * inline: plain 13px line for panels (editor elements).
   */
  variant?: "dashed" | "placeholder" | "card" | "plain" | "inline";
  /** Dashed border colour: gray-300 (default) or the lighter gray-200. */
  border?: "gray-300" | "gray-200";
  icon?: IconName;
  title?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

const FRAME = {
  dashed: "rounded-lg border border-dashed p-12 text-sm",
  placeholder: "min-h-40 justify-center rounded-md border border-dashed border-slate-300 p-5 text-menu",
  card: "rounded-lg border border-gray-200 bg-white p-7 text-sm",
  plain: "p-12 text-body",
  inline: "items-start! text-left! text-label leading-normal",
};

/** "Nothing here" message; announced politely when it replaces results. */
export function EmptyState({ variant = "dashed", border = "gray-300", icon, title, children, action, className = "" }: EmptyStateProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center gap-2.5 text-center text-gray-500 ${FRAME[variant]} ${
        variant === "dashed" ? (border === "gray-200" ? "border-gray-200" : "border-gray-300") : ""
      } ${className}`}
    >
      {icon && (
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon name={icon} size={20} />
        </span>
      )}
      {title && <p className="m-0 text-body font-semibold text-navy-800">{title}</p>}
      <div className="m-0">{children}</div>
      {action && <div className="mt-1.5">{action}</div>}
    </div>
  );
}
