import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export type ComparisonRow = {
  label: string;
  icon?: IconName;
  /** One value per column. "Yes" renders ✓, "—" renders a muted dash, anything else as text. */
  values?: string[];
  /** Section header row (blue-50 fill, navy icon tile, bold). */
  section?: boolean;
  /** Bold navy label without making it a section (e.g. "Publications"). */
  emphasis?: boolean;
};

type ComparisonTableProps = {
  columns: string[];
  rows: ComparisonRow[];
  /** plans: pricing matrix, sticky first column, ✓ in green · competitors: Why-us matrix with a highlighted navy column. */
  variant?: "plans" | "competitors";
  /** competitors: index of the highlighted column (FlipAndShare). */
  highlight?: number;
  /** Corner cell text. */
  firstColumnLabel?: string;
  /** Accessible caption (visually hidden). */
  caption: string;
  /** Min width before horizontal scroll. Default 760 (plans) / 820 (competitors). */
  minWidth?: number;
  footnote?: ReactNode;
  className?: string;
};

function Tile({ icon, navy }: { icon: IconName; navy?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${navy ? "bg-navy-800 text-white" : "bg-blue-50 text-blue-600"}`}
    >
      <Icon name={icon} size={15} />
    </span>
  );
}

/** Feature-by-plan or vendor-by-capability matrix as a real <table>. */
export function ComparisonTable({
  columns,
  rows,
  variant = "plans",
  highlight = 0,
  firstColumnLabel,
  caption,
  minWidth,
  footnote,
  className = "",
}: ComparisonTableProps) {
  const plans = variant === "plans";
  const span = columns.length + 1;
  const sticky = plans ? "sticky left-0 z-[1]" : "";

  const cell = (v: string, col: number) => {
    const hl = !plans && col === highlight;
    if (plans && v === "Yes") {
      return (
        <span className="text-base text-green-600">
          <span aria-hidden="true">✓</span>
          <span className="sr-only">Included</span>
        </span>
      );
    }
    if (v === "—") {
      return (
        <span className={plans ? "text-gray-300" : "text-gray-400"}>
          <span aria-hidden="true">—</span>
          <span className="sr-only">Not included</span>
        </span>
      );
    }
    return <span className={hl ? "text-navy-700" : "text-gray-700"}>{v}</span>;
  };

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table
          className="w-full border-separate border-spacing-0 text-left"
          style={{ minWidth: minWidth ?? (plans ? 760 : 820) }}
        >
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col style={{ width: plans ? "31%" : "21%" }} />
            {columns.map((c) => (
              <col key={c} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                className={`border-b border-gray-200 bg-white px-[18px] py-3.5 text-xs font-semibold text-gray-500 ${sticky}`}
              >
                {firstColumnLabel ?? (plans ? "Feature" : "Capability")}
              </th>
              {columns.map((c, i) => {
                const hl = !plans && i === highlight;
                return (
                  <th
                    key={c}
                    scope="col"
                    className={`border-b border-gray-200 px-2.5 py-3.5 text-center text-label font-bold ${
                      plans ? "text-navy-800" : hl ? "bg-navy-800 text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    {c}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) =>
              r.section ? (
                <tr key={r.label}>
                  <th scope="colgroup" colSpan={span} className="border-b border-gray-100 bg-blue-50 p-0 text-left">
                    <span className="sticky left-0 inline-flex items-center gap-2.5 px-[18px] py-[11px] text-sm font-bold text-navy-800">
                      {r.icon && <Tile icon={r.icon} navy />}
                      {r.label}
                    </span>
                  </th>
                </tr>
              ) : (
                <tr key={r.label}>
                  <th
                    scope="row"
                    className={`border-b border-gray-100 bg-white px-[18px] py-[11px] text-sm ${
                      r.emphasis ? "font-bold text-navy-800" : "font-normal text-gray-900"
                    } ${sticky}`}
                  >
                    <span className="flex items-center gap-2.5">
                      {r.icon && <Tile icon={r.icon} />}
                      {r.label}
                    </span>
                  </th>
                  {(r.values ?? []).map((v, i) => {
                    const hl = !plans && i === highlight;
                    return (
                      <td
                        key={i}
                        className={`border-b border-gray-100 px-2.5 text-center text-label font-semibold ${plans ? "py-[11px]" : "py-[13px]"} ${
                          hl ? "bg-blue-50" : ""
                        }`}
                      >
                        {cell(v, i)}
                      </td>
                    );
                  })}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      {footnote && <p className="mb-0 mt-3 text-xs text-gray-500">{footnote}</p>}
    </div>
  );
}
