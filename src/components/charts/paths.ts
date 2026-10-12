/**
 * SVG path builders shared by the charts (ports of the prototype `spark` and `curve` helpers).
 * Both draw horizontal-tangent cubic segments between points, giving a smooth line,
 * and return a closed `area` path down to the baseline.
 */

export type ChartPaths = { line: string; area: string };

/** Min–max normalised sparkline in a w×h box (1px top / 2px bottom inset). */
export function sparkPath(values: number[], w = 100, h = 26): ChartPaths {
  if (values.length === 0) return { line: "", area: "" };
  const v = values.length === 1 ? [values[0], values[0]] : values;
  const mx = Math.max(...v);
  const mn = Math.min(...v);
  const pts = v.map((y, i) => [(i / (v.length - 1)) * w, h - 2 - ((y - mn) / (mx - mn || 1)) * (h - 5)] as const);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = ((x0 + x1) / 2).toFixed(1);
    d += `C${cx} ${y0.toFixed(1)} ${cx} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return { line: d, area: `${d}L${w} ${h}L0 ${h}Z` };
}

/** Zero-based area curve in a w×h box; `max` defaults to 1.1 × the largest value. */
export function curvePath(values: number[], w: number, h: number, max?: number): ChartPaths {
  if (values.length === 0) return { line: "", area: "" };
  const v = values.length === 1 ? [values[0], values[0]] : values;
  const mx = max ?? (Math.max(...v) * 1.1 || 1);
  const step = w / (v.length - 1);
  const p = v.map((y, i) => [i * step, h - (y / mx) * h] as const);
  const f = (n: number) => +n.toFixed(2);
  let d = `M${f(p[0][0])},${f(p[0][1])}`;
  for (let i = 1; i < p.length; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const cx = f((x0 + x1) / 2);
    d += ` C${cx},${f(y0)} ${cx},${f(y1)} ${f(x1)},${f(y1)}`;
  }
  return { line: d, area: `${d} L${w},${h} L0,${h} Z` };
}
