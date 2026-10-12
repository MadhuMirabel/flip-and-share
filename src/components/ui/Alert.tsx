import type { ReactNode } from "react";

export type AlertTone = "success" | "info" | "warning" | "danger";

const TONE: Record<AlertTone, { box: string; title: string; body: string }> = {
  success: { box: "border border-green-200 bg-green-50", title: "text-green-800", body: "text-green-700" },
  info: { box: "bg-blue-50", title: "text-navy-700", body: "text-gray-900" },
  warning: { box: "border border-amber-200 bg-amber-100/60", title: "text-amber-800", body: "text-amber-800" },
  danger: { box: "border border-red-200 bg-red-200/25", title: "text-red-600", body: "text-gray-700" },
};

export type AlertProps = {
  tone?: AlertTone;
  /** box: stacked title/body (SSO, request received) · banner: check circle + title + actions in a row (Publish success). */
  variant?: "box" | "banner";
  title?: ReactNode;
  /** Body copy; in the banner it renders as a mono line (the live URL). */
  children?: ReactNode;
  actions?: ReactNode;
  /** Smaller 12/14 padding and 13px title. */
  compact?: boolean;
  /** Override the default role (status for success/info, alert for warning/danger). */
  role?: "status" | "alert" | "note";
  className?: string;
};

/** Inline message box. Success and info are polite (role="status"), warning and danger assertive (role="alert"). */
export function Alert({ tone = "success", variant = "box", title, children, actions, compact = false, role, className = "" }: AlertProps) {
  const r = role ?? (tone === "warning" || tone === "danger" ? "alert" : "status");

  if (variant === "banner") {
    return (
      <div
        role={r}
        className={`flex flex-wrap items-center gap-3.5 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 ${className}`}
        style={{ animation: "fasFade .4s ease-out both" }}
      >
        <span
          aria-hidden="true"
          className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white"
          style={{ animation: "fasTick .5s cubic-bezier(.2,.8,.2,1) both" }}
        >
          ✓
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {title && <p className="m-0 text-body font-semibold text-green-900">{title}</p>}
          {children && <div className="truncate font-mono text-label text-green-800">{children}</div>}
        </div>
        {actions && <div className="ml-auto flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    );
  }

  const t = TONE[tone];
  const info = tone === "info";
  return (
    <div
      role={r}
      className={`flex flex-col ${info ? "gap-2 rounded-md p-3.5" : compact ? "gap-1.5 rounded-md px-3.5 py-3" : "gap-1.5 rounded-lg p-4"} ${t.box} ${className}`}
      style={{ animation: "fasFade .4s ease-out both" }}
    >
      {title && (
        <p className={`m-0 ${info || compact ? "text-label font-semibold" : "text-body font-bold"} ${t.title}`}>{title}</p>
      )}
      {children && <div className={`${info ? "text-label" : "text-menu"} leading-normal ${t.body}`}>{children}</div>}
      {actions && <div className="mt-1 flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
