import type { CSSProperties, ReactNode } from "react";

export type DataColumn<T> = {
  key: string;
  header: ReactNode;
  /** Grid track, e.g. "110px", "minmax(0,1fr)", "1.1fr". Default minmax(0,1fr). */
  width?: string;
  /** Track used at ≤760px (when any column sets `hideBelow` or `mobileWidth`). */
  mobileWidth?: string;
  align?: "left" | "right" | "center";
  /** Cell content. Default: String(row[key]). */
  render?: (row: T, index: number) => ReactNode;
  /** Hide this column at ≤760px. */
  hideBelow?: 760;
  /** Extra classes for body cells (colour, weight, tabular-nums). */
  className?: string;
};

type DataTableProps<T> = {
  columns: DataColumn<T>[];
  rows: T[];
  rowKey?: (row: T, index: number) => string | number;
  /** Accessible name; also rendered as the card header when `title` is not given and `card` is on. */
  label: string;
  /** Card header strip title (15px/700). Wraps the table in a white bordered card. */
  title?: ReactNode;
  /** Right side of the card header (filters, buttons). */
  actions?: ReactNode;
  /** Render inside a white bordered card even without a title. */
  card?: boolean;
  /** Header row fill: tinted = gray-50 (analytics) · plain = white + bottom border (invoices). */
  header?: "tinted" | "plain";
  /** Min width before the table scrolls horizontally. */
  minWidth?: number;
  /** Fade rows in with a stagger (ranked table). */
  animateRows?: boolean;
  className?: string;
};

const ALIGN = { left: "text-left justify-start", right: "text-right justify-end", center: "text-center justify-center" };

/**
 * Grid table with ARIA table roles: 12px/600 gray header, 13.5px rows with slate-50 hover,
 * optional card wrapper, horizontal scroll under `minWidth`, columns that hide at ≤760px.
 */
export function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  label,
  title,
  actions,
  card = !!title,
  header = "tinted",
  minWidth = 640,
  animateRows = false,
  className = "",
}: DataTableProps<T>) {
  const tracks = columns.map((c) => c.width ?? "minmax(0,1fr)").join(" ");
  const responsive = columns.some((c) => c.hideBelow || c.mobileWidth);
  const mobileTracks = columns
    .filter((c) => !c.hideBelow)
    .map((c) => c.mobileWidth ?? c.width ?? "minmax(0,1fr)")
    .join(" ");
  const vars = { "--dt-cols": tracks, "--dt-cols-sm": responsive ? mobileTracks : tracks, minWidth } as CSSProperties;
  const grid =
    "grid gap-3 px-5 [grid-template-columns:var(--dt-cols)] max-[760px]:gap-2 max-[760px]:px-3 max-[760px]:[grid-template-columns:var(--dt-cols-sm)]";
  const hide = (c: DataColumn<T>) => (c.hideBelow ? "max-[760px]:hidden" : "");

  const table = (
    <div className="overflow-x-auto">
      <div role="table" aria-label={label} style={vars} className="text-menu max-[760px]:text-small">
        <div role="rowgroup">
          <div
            role="row"
            className={`${grid} py-2.5 text-xs font-semibold text-gray-500 ${
              header === "tinted" ? "bg-gray-50" : "border-b border-gray-200"
            }`}
          >
            {columns.map((c) => (
              <div key={c.key} role="columnheader" className={`flex items-center ${ALIGN[c.align ?? "left"]} ${hide(c)}`}>
                {c.header}
              </div>
            ))}
          </div>
        </div>
        <div role="rowgroup">
          {rows.map((r, i) => (
            <div
              key={rowKey ? rowKey(r, i) : i}
              role="row"
              className={`${grid} items-center py-3 text-gray-700 transition-colors duration-150 hover:bg-slate-50 max-[760px]:py-2.5 ${
                i === 0 && header === "plain" ? "" : "border-t border-gray-100"
              }`}
              style={animateRows ? { animation: `fasFade .5s ease-out both`, animationDelay: `${i * 0.05}s` } : undefined}
            >
              {columns.map((c) => (
                <div
                  key={c.key}
                  role="cell"
                  className={`flex min-w-0 items-center ${ALIGN[c.align ?? "left"]} ${hide(c)} ${c.className ?? ""}`}
                >
                  {c.render ? c.render(r, i) : String((r as Record<string, unknown>)[c.key] ?? "")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!card) return <div className={className}>{table}</div>;
  return (
    <div className={`overflow-hidden rounded-lg border border-gray-200 bg-white ${className}`}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
          {title && <h3 className="m-0 text-body font-bold text-navy-800">{title}</h3>}
          {actions}
        </div>
      )}
      {table}
    </div>
  );
}
