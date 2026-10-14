/** Dashboard data of the prototype "Analytics tour" (script `DB`, `kpis`, `spark` and the per-tab lists). */

export type DashKey = "pub" | "aud" | "ix" | "rev";

export type Kpi = { name: string; value: number; prefix?: string; suffix?: string; delta: string };

export const DASH_TABS: { value: DashKey; label: string; icon: "grid" | "users" | "sparkles" | "trend" }[] = [
  { value: "pub", label: "Publishing", icon: "grid" },
  { value: "aud", label: "Audience", icon: "users" },
  { value: "ix", label: "Interactivity", icon: "sparkles" },
  { value: "rev", label: "Ad Revenue", icon: "trend" },
];

export const KPIS: Record<DashKey, Kpi[]> = {
  pub: [
    { name: "Pages published", value: 1284, delta: "+12%" },
    { name: "Downloads", value: 18420, delta: "+8%" },
    { name: "Page views", value: 246900, delta: "+21%" },
    { name: "Hotspot clicks", value: 32118, delta: "+34%" },
  ],
  aud: [
    { name: "Active users", value: 12480, delta: "+18%" },
    { name: "New readers", value: 64, suffix: "%", delta: "+5 pts" },
    { name: "Avg. engagement", value: 232, suffix: "s", delta: "+22s" },
    { name: "Returning", value: 36, suffix: "%", delta: "+3 pts" },
  ],
  ix: [
    { name: "Total clicks", value: 32118, delta: "+34%" },
    { name: "Click-through rate", value: 7.4, suffix: "%", delta: "+1.2 pts" },
    { name: "Video plays", value: 4960, delta: "+41%" },
    { name: "QR scans", value: 2315, delta: "+27%" },
  ],
  rev: [
    { name: "Est. earnings", value: 18240, prefix: "$", delta: "+19%" },
    { name: "RPM", value: 6.8, prefix: "$", delta: "+$0.9" },
    { name: "Impressions", value: 2680000, delta: "+14%" },
    { name: "Ad clicks", value: 9410, delta: "+11%" },
  ],
};

/** Prototype `spark(seed)`: a deterministic 12-point wiggle (the first definition, as values). Seed = tile index + key length. */
export function sparkValues(seed: number): number[] {
  const out: number[] = [];
  let v = 16;
  for (let i = 0; i < 12; i++) {
    v = Math.max(4, Math.min(28, v + Math.sin(seed * 3.1 + i * 1.7) * 6 - 1.2 + i * 0.35));
    out.push(v);
  }
  return out;
}

export const PUB_BARS = [62, 70, 58, 80, 76, 92, 88, 96, 84, 102, 110, 118];
export const AUD_BARS = [20, 14, 10, 8, 9, 16, 34, 58, 72, 80, 76, 70, 74, 82, 86, 78, 70, 66, 72, 88, 94, 80, 60, 40];
export const IX_BARS = [40, 22, 88, 64, 30, 96, 52, 34, 70, 44, 26, 58, 80, 36, 28, 62, 48, 30, 74, 42, 24, 56, 38, 90];
export const REV_BARS = [980, 1040, 1120, 1080, 1260, 1340, 1420, 1510, 1480, 1620, 1700, 1690];

export const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

export const PIPELINE = [
  { name: "Draft", n: 6, color: "var(--color-slate-300)" },
  { name: "In Plan", n: 9, color: "var(--color-blue-300)" },
  { name: "Validated", n: 4, color: "var(--color-blue-400)" },
  { name: "Published", n: 38, color: "var(--color-blue-600)" },
];

export const CITIES: [string, number][] = [
  ["New York", 18],
  ["Los Angeles", 12],
  ["Chicago", 9],
  ["Houston", 7],
  ["Phoenix", 6],
  ["Miami", 5],
];

export const DEVICES = [
  { label: "Mobile", value: 58, color: "var(--color-blue-600)" },
  { label: "Desktop", value: 34, color: "var(--color-blue-400)" },
  { label: "Tablet", value: 8, color: "var(--color-blue-200)" },
];

export const CLICK_TYPES: [string, number][] = [
  ["Web links", 38],
  ["Video", 22],
  ["Buy now", 16],
  ["Page links", 12],
  ["QR", 8],
  ["Email / phone", 4],
];

export const TOP_ELEMENTS = [
  { rank: 1, name: "Linen jacket · Shop this page", type: "Buy now", clicks: "1,284", trend: "+18%" },
  { rank: 2, name: "Campaign film", type: "Video", clicks: "1,102", trend: "+41%" },
  { rank: 3, name: "Harbour Motors · full-page ad", type: "Web link", clicks: "964", trend: "+12%" },
  { rank: 4, name: "Subscribe · back cover", type: "Web link", clicks: "712", trend: "+9%" },
  { rank: 5, name: "Event QR · page 42", type: "QR", clicks: "588", trend: "+27%" },
];

export const REV_TYPES: { name: string; value: string; pct: number }[] = [
  { name: "Display", value: "$8,420", pct: 46 },
  { name: "Native", value: "$4,960", pct: 27 },
  { name: "Video", value: "$3,110", pct: 17 },
  { name: "Interstitial", value: "$1,750", pct: 10 },
];
