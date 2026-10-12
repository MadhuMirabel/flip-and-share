import type { ReactNode } from "react";
import { BarChart, type BarDatum } from "@/components/charts/BarChart";
import { Sparkline, KpiSparkTile } from "@/components/charts/Sparkline";
import { AreaChart } from "@/components/charts/AreaChart";
import { Donut } from "@/components/charts/Donut";
import { Heatmap } from "@/components/charts/Heatmap";
import { Legend } from "@/components/charts/Legend";

function Panel({ title, aside, dark, children }: { title: string; aside?: ReactNode; dark?: boolean; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-3.5 rounded-lg border p-5 ${dark ? "border-slate-800 bg-ink-950" : "border-gray-200 bg-white"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={`m-0 text-sm font-bold ${dark ? "text-white" : "text-navy-800"}`}>{title}</h3>
        {aside}
      </div>
      {children}
    </div>
  );
}

const C = {
  blue500: "var(--color-blue-500)",
  blue600: "var(--color-blue-600)",
  blue300: "var(--color-blue-300)",
  blue200: "var(--color-blue-200)",
  violet500: "var(--color-violet-500)",
  violet200: "var(--color-violet-200)",
  green600: "var(--color-green-600)",
  gray300: "var(--color-slate-300)",
};

// Deterministic sample data (no Math.random: SSR and client must match).
const wave = (n: number, base: number, amp: number, seed = 1) =>
  Array.from({ length: n }, (_, i) => Math.round(base + Math.sin(i * 0.7 + seed) * amp + i * (amp / n) * 2));

const PAGES: BarDatum[] = wave(24, 60, 35, 2).map((v, i) => ({ value: v, title: `Page ${i + 1} · ${v} clicks` }));
const READERS: BarDatum[] = wave(30, 400, 140, 1).map((v, i) => ({
  values: [Math.round(v * 0.72), Math.round(v * 0.28)],
  title: `${v} readers`,
  label: `${i + 1}`,
}));
const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const TREND: BarDatum[] = MONTHS.map((m, i) => {
  const p = 4 + ((i * 5) % 7);
  const l = p + 1 + (i % 3);
  return { values: [p, l], titles: [`${p} published`, `${l} planned`], label: m };
});
const CASE: BarDatum[] = [38, 42, 40, 44, 61, 70, 78, 86].map((h, i) => ({
  value: h,
  color: i < 4 ? C.gray300 : C.blue500,
  title: `${i < 4 ? "Before" : "After"} · issue ${(i % 4) + 1}: ${h}% read-through`,
  label: i < 4 ? `B${i + 1}` : `A${i - 3}`,
  marker: i === 4 ? "switched" : undefined,
}));
const MARKETING: BarDatum[] = wave(12, 70, 25, 3).map((v, i) => ({ value: v, title: `${MONTHS[i]}: ${v}` }));
const HEAT = Array.from({ length: 64 }, (_, i) => Math.max(0, +(1 - i * 0.012 - (i % 7 === 3 ? 0.25 : 0) - (i % 11 === 5 ? -0.15 : 0)).toFixed(2)));

export function ChartsDemo() {
  return (
    <section aria-labelledby="ds-charts" className="border-t border-gray-200 py-14">
      <h2 id="ds-charts" className="m-0 mb-8 text-h2 text-navy-800">
        Charts
      </h2>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-4 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <KpiSparkTile label="Reads" value={12480} delta="+18%" spark={wave(12, 16, 6, 1)} />
          <KpiSparkTile label="Avg. time" value={3.8} suffix=" min" delta="+0.4" spark={wave(12, 16, 6, 2)} delay={0.08} />
          <KpiSparkTile label="Ad revenue" value={18450} prefix="$" delta="+12%" spark={wave(12, 16, 6, 3)} delay={0.16} />
          <KpiSparkTile label="Impressions" value={2400000} delta="-3%" trend="down" spark={wave(12, 16, 6, 4)} delay={0.24} />
        </div>

        <div className="grid grid-cols-4 gap-2.5 rounded-lg bg-ink-950 p-3.5 max-lg:grid-cols-2">
          <KpiSparkTile variant="dark" icon="eye" label="Readers" value="12,480" delta="+18%" sub="vs last issue" spark={wave(12, 10, 4, 1)} />
          <KpiSparkTile variant="dark" icon="clock" label="Avg. time" value="3m 48s" delta="+22s" sub="per reader" color={C.violet500} spark={wave(12, 10, 4, 2)} delay={0.08} />
          <KpiSparkTile variant="dark" icon="link" label="Clicks" value="2,914" delta="+9%" sub="all hotspots" color="var(--color-green-400)" spark={wave(12, 10, 4, 3)} delay={0.16} />
          <KpiSparkTile variant="dark" icon="trend" label="Bounce" value="31%" delta="+2pt" trend="down" sub="vs last issue" color="var(--color-amber-400)" spark={wave(12, 10, 4, 4)} delay={0.24} />
        </div>

        <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          <Panel title="Readers per day" aside={<Legend items={[{ label: "Flipbook", color: C.blue500 }, { label: "Article mode", color: C.blue300 }]} />}>
            <BarChart
              variant="stacked"
              data={READERS}
              series={[{ label: "Flipbook", color: C.blue500 }, { label: "Article mode", color: C.blue300 }]}
              axis={["Sep 12", "Today"]}
              label="Readers per day over 30 days, between about 260 and 680, trending up."
            />
          </Panel>
          <Panel title="Clicks by page" aside={<span className="text-xs text-gray-500">Single · colour by value · hover dims</span>}>
            <BarChart
              data={PAGES}
              color={(d) => ((d.value ?? 0) > 80 ? C.blue600 : C.blue300)}
              gap={5}
              axis={["Page 1", "Page 12", "Page 24"]}
              label="Clicks on each of 24 pages; pages over 80 clicks highlighted."
            />
          </Panel>
          <Panel title="Issues published vs planned" aside={<Legend shape="dot" items={[{ label: "Published", color: C.blue500 }, { label: "Planned", color: C.blue200 }]} />}>
            <BarChart
              variant="grouped"
              data={TREND}
              series={[{ label: "Published", color: C.blue500 }, { label: "Planned", color: C.blue200 }]}
              height={220}
              gap={10}
              stagger={0.05}
              axis="bars"
              label="Issues published and planned per month, October to September."
            />
          </Panel>
          <Panel title="Read-through per issue" aside={<span className="text-xs text-gray-500">Issues, oldest → newest</span>}>
            <BarChart data={CASE} height={150} gap={8} stagger={0.06} axis="bars" label="Read-through rose from about 40% to 86% after switching." />
          </Panel>
          <Panel title="Ad revenue (fade by value)">
            <BarChart data={MARKETING} color={C.green600} fadeByValue height={180} gap={6} label="Monthly ad revenue over 12 months, rising." />
          </Panel>
          <Panel title="Hourly reads (dark)" dark>
            <BarChart
              data={wave(48, 50, 30, 5).map((v, i) => ({ value: v, title: `${i}:00 · ${v} reads`, color: i === 24 ? "var(--color-blue-700)" : undefined }))}
              color="var(--color-blue-400)"
              tone="dark"
              height={120}
              gap={1.5}
              radius={6}
              stagger={0.018}
              axis={["48h ago", "Now"]}
              label="Reads per hour over the last 48 hours."
            />
          </Panel>
        </div>

        <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          <Panel title="Live readers">
            <AreaChart series={[{ label: "Readers", values: wave(24, 120, 40, 1), color: C.blue500 }]} label="Live readers over the last 24 hours, peaking near 170." />
          </Panel>
          <Panel title="QR scans: print vs digital" aside={<Legend items={[{ label: "Print", color: C.green600 }, { label: "Digital", color: C.blue500 }]} />}>
            <AreaChart
              height={200}
              series={[
                { label: "Print", values: wave(14, 60, 20, 2), color: C.green600, fillOpacity: 0.25 },
                { label: "Digital", values: wave(14, 90, 25, 4), color: C.blue500, fillOpacity: 0 },
              ]}
              label="Daily QR scans for two weeks: digital around 90, print around 60."
            />
          </Panel>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          <Panel title="New vs returning">
            <div className="flex items-center gap-5">
              <Donut value={64} caption="new" label="64% new readers, 36% returning" />
              <Legend
                className="flex-col items-start! text-label text-gray-700!"
                items={[
                  { label: "New · 7,987", color: C.blue500 },
                  { label: "Returning · 4,493", color: C.blue200 },
                ]}
              />
            </div>
          </Panel>
          <Panel title="Small donuts">
            <div className="flex items-center gap-4">
              <Donut size="sm" value={72} color={C.violet500} track="var(--color-violet-100)" label="Fill rate 72%" />
              <Donut size="sm" value={45} label="45%" />
              <Donut
                segments={[
                  { value: 52, color: C.blue500 },
                  { value: 31, color: C.violet500 },
                  { value: 17, color: "var(--color-amber-500)" },
                ]}
                center="3"
                caption="devices"
                label="Mobile 52%, desktop 31%, tablet 17%"
              />
            </div>
          </Panel>
          <Panel title="Legend">
            <Legend items={[{ label: "Square swatch", color: C.blue500 }, { label: "Another", color: C.violet500 }]} />
            <Legend shape="dot" items={[{ label: "Dot swatch", color: C.green600 }, { label: "Another", color: "var(--color-amber-500)" }]} />
            <Sparkline values={wave(16, 20, 8, 1)} label="Trend over 16 days, rising" />
            <Sparkline values={wave(16, 20, 8, 2)} area color={C.violet500} />
          </Panel>
        </div>

        <Panel title="Page heatmap" aside={<span className="text-xs text-gray-500">Share of readers who reached each page</span>}>
          <Heatmap values={HEAT} label="Reach across 64 pages, from 100% on page 1 to about 25% on page 64." />
        </Panel>
      </div>
    </section>
  );
}
