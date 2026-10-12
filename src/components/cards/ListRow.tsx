import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { PASTEL, type PastelTone } from "./RelatedCard";

export type ListRowProps = {
  icon: IconName;
  /** Tile tone (pastel 100 / 700). */
  tone?: PastelTone;
  title: string;
  /** Second line under the title (resource rows). */
  meta?: string;
  /** Right-hand slot: a Badge type pill (resource rows) or plain keyword text (search hits). */
  trailing?: ReactNode;
  /** resource = 36px tile, slides in, slate hover · hit = 28px tile, sky hover (search results). */
  variant?: "resource" | "hit";
  /** Position in the list; staggers the slide-in by 50ms per row (resource rows). */
  index?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
};

/** Icon + title/meta + trailing pill row. Renders a link, a button, or a plain row. */
export function ListRow({
  icon,
  tone = "sky",
  title,
  meta,
  trailing,
  variant = "resource",
  index = 0,
  href,
  onClick,
  className = "",
}: ListRowProps) {
  const res = variant === "resource";
  const t = PASTEL[tone];
  const cls = [
    "grid w-full items-center text-left text-gray-900 no-underline transition-colors duration-150 hover:text-gray-900",
    res
      ? "grid-cols-[36px_minmax(0,1fr)_auto] gap-3.5 rounded-md px-3.5 py-3 hover:bg-slate-50"
      : "grid-cols-[28px_minmax(0,1fr)_auto] gap-3 rounded-md px-2 py-2.5 hover:bg-blue-50",
    href !== undefined || onClick ? "cursor-pointer" : "",
    className,
  ].join(" ");
  const style = res ? { animation: `fasSlideIn .35s ease-out ${index * 0.05}s both` } : undefined;
  const body = (
    <>
      <span
        aria-hidden="true"
        className={`flex items-center justify-center ${res ? "h-9 w-9 rounded-md" : "h-7 w-7 rounded-md"} ${t.bg} ${t.text}`}
      >
        <Icon name={icon} size={res ? 18 : 15} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className={`font-semibold ${res ? "text-body" : "text-body-sm leading-[1.4]"}`}>{title}</span>
        {meta && <span className="text-small text-gray-500">{meta}</span>}
      </span>
      {typeof trailing === "string" ? <span className="text-xs text-gray-500">{trailing}</span> : (trailing ?? <span />)}
    </>
  );
  if (href !== undefined) {
    return (
      <Link href={href} className={cls} style={style}>
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${cls} border-0 bg-transparent`} style={style}>
        {body}
      </button>
    );
  }
  return (
    <div className={cls} style={style}>
      {body}
    </div>
  );
}

const STATUS = { success: "text-green-700", warning: "text-amber-700", neutral: "text-gray-500" };

/** Editor "Elements on this spread" item: label + type, a status tag at the right, blue border on hover. */
export function EditorListItem({
  label,
  type,
  status,
  statusTone = "neutral",
  selected = false,
  onClick,
  className = "",
}: {
  label: string;
  type: string;
  /** e.g. "Alt ✓" / "No alt". */
  status?: string;
  statusTone?: keyof typeof STATUS;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-sm border bg-white px-2.5 py-[9px] text-left transition-colors duration-150 hover:border-blue-500 ${selected ? "border-blue-500" : "border-gray-200"} ${className}`}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-label font-semibold text-gray-900">{label}</span>
        <span className="text-xs text-gray-500">{type}</span>
      </span>
      {status && <span className={`text-eyebrow font-semibold ${STATUS[statusTone]}`}>{status}</span>}
    </button>
  );
}
