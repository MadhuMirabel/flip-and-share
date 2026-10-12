import type { ReactNode } from "react";

export type KeyValue = { key: string; value: ReactNode };

/** Billing-style definition list; `summary` adds an emphasised closing row ("Next charge"). */
export function KeyValueList({ items, summary, className = "" }: { items: KeyValue[]; summary?: KeyValue; className?: string }) {
  return (
    <dl className={`m-0 flex flex-col gap-2.5 text-menu ${className}`}>
      {items.map((it) => (
        <div key={it.key} className="flex justify-between gap-3.5 border-b border-gray-100 pb-2.5">
          <dt className="text-gray-500">{it.key}</dt>
          <dd className="m-0 text-right text-gray-900">{it.value}</dd>
        </div>
      ))}
      {summary && (
        <div className="flex justify-between gap-2.5 border-t border-gray-100 pt-3 text-gray-700">
          <dt>{summary.key}</dt>
          <dd className="m-0 text-right font-bold text-navy-800">{summary.value}</dd>
        </div>
      )}
    </dl>
  );
}
