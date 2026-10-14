/**
 * Sample numbers for the in-app Analytics screen, from the prototype script (~L3466–4147).
 * Replace with the analytics API (reads per publication and date range) when it exists.
 */

export type RangeKey = "7" | "30" | "90";
export const RANGES: { value: RangeKey; label: string }[] = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
];

export type Publication = { id: string; title: string; status: "Published" | "Draft" };
export const PUBLICATIONS: Publication[] = [
  { id: "p1", title: "Spring Collection 2026", status: "Published" },
  { id: "p2", title: "City Living · Oct issue", status: "Published" },
  { id: "p3", title: "Annual Report 2025", status: "Published" },
  { id: "p4", title: "Harbour View Residences", status: "Draft" },
];

const FACTOR: Record<RangeKey, number> = { "7": 0.24, "30": 1, "90": 2.9 };
const AVG_TIME: Record<RangeKey, string> = { "7": "3m 12s", "30": "3m 40s", "90": "3m 51s" };
const n = (v: number) => Math.round(v).toLocaleString("en-US");

export type Metric = { name: string; value: string; delta: string; tone: "up" | "neutral" };

export function metricsFor(range: RangeKey): Metric[] {
  const f = FACTOR[range];
  return [
    { name: "Readers", value: n(4812 * f), delta: "+18% vs prior period", tone: "up" },
    { name: "Avg. time", value: AVG_TIME[range], delta: "+22s", tone: "up" },
    { name: "Pages / read", value: "18.4", delta: "of 64", tone: "neutral" },
    { name: "Clicks", value: n(1284 * f), delta: "26.7% of readers", tone: "neutral" },
    { name: "Leads", value: n(126 * f), delta: "+41%", tone: "up" },
  ];
}

const SEED = [22, 25, 31, 28, 40, 52, 48, 44, 39, 61, 70, 66, 58, 49, 45, 52, 60, 72, 80, 76, 64, 58, 55, 61, 68, 74, 79, 71, 66, 63];

/** Readers-per-day series; each value is split 72% flipbook / 28% article mode. */
export function seriesFor(range: RangeKey): number[] {
  if (range === "7") return SEED.slice(-7);
  if (range === "30") return SEED;
  return SEED.map((v, i) => v * 2.6 + (i % 5) * 6);
}

/** Tooltip readers = value × 6, as in the prototype. */
export const readersTitle = (v: number) => `${Math.round(v * 6)} readers`;

export const HEAT: number[] = [
  0.2, 0.3, 0.6, 1, 0.95, 0.5, 0.4, 0.45, 0.35, 0.3, 0.5, 0.4, 0.3, 0.25, 0.3, 0.2, 0.2, 0.15, 0.3, 0.25, 0.2, 0.15,
  0.1, 0.1, 0.2, 0.15, 0.1, 0.1, 0.12, 0.1, 0.08, 0.1, 0.1, 0.15, 0.1, 0.08, 0.1, 0.08, 0.06, 0.1, 0.08, 0.06, 0.05,
  0.08, 0.06, 0.05, 0.05, 0.08, 0.06, 0.05, 0.05, 0.04, 0.05, 0.04, 0.03, 0.05, 0.04, 0.03, 0.03, 0.04, 0.03, 0.03,
  0.02, 0.06,
];

export const SOURCES = [
  { name: "Search", pct: 38 },
  { name: "Direct link", pct: 27 },
  { name: "Email", pct: 17 },
  { name: "Embedded on acme.com", pct: 12 },
  { name: "Social", pct: 6 },
];

export type ElementRow = { type: string; name: string; page: string; clicks: string; ctr: string };

export function elementsFor(range: RangeKey): ElementRow[] {
  const f = FACTOR[range];
  return [
    { type: "Product", name: "Linen jacket · $129", page: "5", clicks: n(412 * f), ctr: "8.6%" },
    { type: "Form", name: "Request a quote", page: "5", clicks: n(126 * f), ctr: "2.6%" },
    { type: "Video", name: "Campaign film", page: "4", clicks: n(388 * f), ctr: "8.1%" },
    { type: "Link", name: "Store locator", page: "7", clicks: n(201 * f), ctr: "4.2%" },
    { type: "Product", name: "Cotton shirt · $59", page: "9", clicks: n(97 * f), ctr: "2.0%" },
    { type: "Button", name: "Book a styling session", page: "64", clicks: n(60 * f), ctr: "1.3%" },
  ];
}

/** Plain-text CSV of what is on screen (the prototype only showed a toast; this downloads a real file). */
export function toCsv(range: RangeKey, publication: string): string {
  const q = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const rows: string[][] = [
    ["Publication", publication],
    ["Range", `${range} days`],
    [],
    ["Metric", "Value", "Change"],
    ...metricsFor(range).map((m) => [m.name, m.value, m.delta]),
    [],
    ["Day", "Readers"],
    ...seriesFor(range).map((v, i, a) => [`${a.length - i - 1} days ago`, String(Math.round(v * 6))]),
    [],
    ["Source", "Share"],
    ...SOURCES.map((s) => [s.name, `${s.pct}%`]),
    [],
    ["Type", "Element", "Page", "Clicks", "CTR"],
    ...elementsFor(range).map((e) => [e.type, e.name, e.page, e.clicks, e.ctr]),
  ];
  return rows.map((r) => r.map(q).join(",")).join("\r\n");
}
