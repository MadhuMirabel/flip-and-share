type HeatmapProps = {
  /** One value per cell, 0–1 (share of readers). */
  values: number[];
  /** Tooltip per cell. Default: "Page n · x% of readers". */
  cellTitle?: (value: number, index: number) => string;
  /** Labels under the grid (start / end). */
  startLabel?: string;
  endLabel?: string;
  /** Accessible summary, e.g. "Page reach heatmap, 64 pages, drops from 100% to 22%". */
  label: string;
  className?: string;
};

/** Page heatmap: 16 columns (8 at ≤760px) of blue-600 cells whose opacity is the value. */
export function Heatmap({
  values,
  cellTitle = (v, i) => `Page ${i + 1} · ${Math.round(v * 100)}% of readers`,
  startLabel = "Page 1",
  endLabel,
  label,
  className = "",
}: HeatmapProps) {
  return (
    <div className={className}>
      <div role="img" aria-label={label} className="grid grid-cols-16 gap-1 max-[760px]:grid-cols-8">
        {values.map((v, i) => (
          <span
            key={i}
            title={cellTitle(v, i)}
            className="aspect-square rounded-sm outline-2 outline-offset-0 outline-transparent hover:outline-navy-800"
            style={{
              background: `color-mix(in srgb, var(--color-blue-600) ${Math.round(Math.max(Math.min(v, 1), 0.06) * 100)}%, transparent)`,
            }}
          />
        ))}
      </div>
      <div aria-hidden="true" className="mt-2 flex justify-between text-xs text-gray-500">
        <span>{startLabel}</span>
        <span>{endLabel ?? `Page ${values.length}`}</span>
      </div>
    </div>
  );
}
