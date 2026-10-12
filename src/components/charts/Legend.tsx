export type LegendItem = { label: string; color: string };

/** Colour key: 10px swatches (square r2 or dot) with 12px labels. Colours are CSS values, e.g. "var(--color-blue-500)". */
export function Legend({
  items,
  shape = "square",
  tone = "light",
  className = "",
}: {
  items: LegendItem[];
  shape?: "square" | "dot";
  /** light: gray-500 labels · dark: slate-300 labels on ink/navy. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={`m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-1.5 p-0 text-xs ${tone === "dark" ? "text-slate-300" : "text-gray-500"} ${className}`}>
      {items.map((it) => (
        <li key={it.label} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`h-2.5 w-2.5 flex-none ${shape === "dot" ? "rounded-full" : "rounded-sm"}`}
            style={{ background: it.color }}
          />
          {it.label}
        </li>
      ))}
    </ul>
  );
}
