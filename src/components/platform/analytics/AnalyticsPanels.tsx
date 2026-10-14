import type { CSSProperties, ReactNode } from "react";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { Donut } from "@/components/charts/Donut";
import { KpiSparkTile } from "@/components/charts/Sparkline";
import { Legend } from "@/components/charts/Legend";
import { Card, CardHeader } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { DataTable, type DataColumn } from "@/components/ui/DataTable";
import { LiveDot } from "@/components/ui/LiveDot";
import { BarRow, ProgressBar, StackedBar } from "@/components/ui/Progress";
import { Reveal } from "@/components/ui/Reveal";
import { LiveCount } from "./LiveCount";
import {
  AUD_BARS,
  CITIES,
  CLICK_TYPES,
  DEVICES,
  IX_BARS,
  KPIS,
  MONTHS,
  PIPELINE,
  PUB_BARS,
  REV_BARS,
  REV_TYPES,
  TOP_ELEMENTS,
  sparkValues,
  type DashKey,
} from "./dashData";

const EASE = "cubic-bezier(.22,1,.36,1)";
const fadeIn = (delay: number): CSSProperties => ({ animation: `fasFade .6s ${EASE} ${delay}s both` });

function Kpis({ tab }: { tab: DashKey }) {
  return (
    <div className="grid grid-cols-4 gap-3.5 max-[760px]:grid-cols-2">
      {KPIS[tab].map((k, i) => (
        <KpiSparkTile
          key={k.name}
          label={k.name}
          value={k.value}
          prefix={k.prefix}
          suffix={k.suffix}
          delta={k.delta}
          spark={sparkValues(i + tab.length)}
          delay={i * 0.07}
        />
      ))}
    </div>
  );
}

/** Two-column chart grid (2fr / 1fr), single column at ≤760px. */
function ChartGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-[18px] max-[760px]:grid-cols-1 max-[760px]:[&>*]:col-auto!">{children}</div>
  );
}

function Panel({ title, actions, children, className = "" }: { title: ReactNode; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card padding="base" className={`min-w-0 gap-3.5! ${className}`}>
      <CardHeader title={title} actions={actions} className="items-center" />
      {children}
    </Card>
  );
}

const ARIA_AXIS = "mt-0 flex justify-between text-eyebrow text-gray-500";

export function PublishingPanel() {
  const series = [
    { label: "Published", color: "var(--color-blue-500)" },
    { label: "Planned", color: "var(--color-blue-200)" },
  ];
  const data = MONTHS.map((name, i) => {
    const p = PUB_BARS[i];
    const l = p + 8 + (i % 3) * 6;
    return { label: name, values: [p, l], titles: [`${p} published`, `${l} planned`] };
  });
  return (
    <>
      <Kpis tab="pub" />
      <ChartGrid>
        <Panel title="Publishing trend" actions={<Legend items={series} />}>
          <BarChart
            variant="grouped"
            data={data}
            series={series}
            max={130}
            height={220}
            gap={10}
            radius={3}
            stagger={0.05}
            axis="bars"
            label="Pages published and planned per month, Oct to Sep"
          />
        </Panel>
        <Panel title="Pipeline status">
          {PIPELINE.map((p, i) => (
            <div key={p.name} style={fadeIn(i * 0.12)}>
              <BarRow
                label={p.name}
                meta={<span className="font-normal text-gray-500">{p.n} issues</span>}
                pct={(p.n / 38) * 100}
                color={p.color}
                delay={i * 0.12}
                duration={1}
              />
            </div>
          ))}
        </Panel>
      </ChartGrid>
    </>
  );
}

export function AudiencePanel() {
  return (
    <>
      <Kpis tab="aud" />
      <ChartGrid>
        <Panel
          title="Live activity · last 24 hours"
          actions={
            <span className="flex items-center gap-2 text-label text-gray-700">
              <LiveDot color="blue" size={9} />
              Active now <LiveCount />
            </span>
          }
        >
          <AreaChart
            series={[{ label: "Readers per hour", values: AUD_BARS, color: "var(--color-blue-600)", fillOpacity: 0.35 }]}
            label="Readers per hour over the last 24 hours, peaking in the evening"
          />
          <div aria-hidden="true" className={ARIA_AXIS}>
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Now</span>
          </div>
        </Panel>
        <Panel title="Visitors by city">
          {CITIES.map(([name, p], i) => (
            <BarRow key={name} layout="grid" label={name} value={`${p}%`} pct={(p / 18) * 100} labelWidth={100} valueWidth={40} delay={i * 0.08} duration={1} />
          ))}
        </Panel>
        <Panel title="New vs returning">
          <div className="flex items-center gap-5">
            <Donut value={64} caption="new" label="64% of readers are new, 36% returning" track="var(--color-blue-200)" color="var(--color-blue-500)" />
            <Legend
              className="flex-col items-start! gap-y-2 text-label! text-gray-700!"
              items={[
                { label: "New · 7,987", color: "var(--color-blue-500)" },
                { label: "Returning · 4,493", color: "var(--color-blue-200)" },
              ]}
            />
          </div>
        </Panel>
        <Panel title="Devices">
          <StackedBar segments={DEVICES} label="Readers by device" />
        </Panel>
      </ChartGrid>
    </>
  );
}

type TopRow = (typeof TOP_ELEMENTS)[number];
const TOP_COLUMNS: DataColumn<TopRow>[] = [
  { key: "rank", header: "#", width: "30px", className: "font-bold text-gray-500" },
  { key: "name", header: "Element", className: "truncate text-gray-900", render: (r) => <span className="truncate">{r.name}</span> },
  {
    key: "type",
    header: "Type",
    width: "90px",
    render: (r) => <span className="rounded-full bg-blue-100 px-2 py-[3px] text-[11.5px] font-semibold text-blue-800">{r.type}</span>,
  },
  { key: "clicks", header: "Clicks", width: "70px", className: "font-bold text-navy-800" },
  { key: "trend", header: "Trend", width: "80px", className: "font-semibold text-green-600" },
];

export function InteractivityPanel() {
  const pages = IX_BARS.map((v, i) => ({ value: v, title: `Page ${i + 1} · ${Math.round(v * 14)} clicks` }));
  return (
    <>
      <Kpis tab="ix" />
      <ChartGrid>
        <Panel title="Clicks by page">
          <BarChart
            data={pages}
            max={100}
            height={200}
            gap={4}
            radius={3}
            stagger={0.03}
            color={(d) => ((d.value ?? 0) > 80 ? "var(--color-blue-600)" : "var(--color-blue-300)")}
            axis={["Page 1", "Page 24"]}
            label="Clicks per page across 24 pages, strongest on pages 3, 6 and 24"
          />
        </Panel>
        <Panel title="Clicks by type">
          {CLICK_TYPES.map(([name, p], i) => (
            <BarRow key={name} layout="grid" label={name} value={`${p}%`} pct={p} labelWidth={90} valueWidth={40} delay={i * 0.08} duration={1} />
          ))}
        </Panel>
        <DataTable
          className="col-span-full"
          title="Top interactive elements"
          label="Top interactive elements"
          columns={TOP_COLUMNS}
          rows={TOP_ELEMENTS}
          rowKey={(r) => r.rank}
          minWidth={520}
          animateRows
        />
      </ChartGrid>
    </>
  );
}

export function RevenuePanel() {
  return (
    <>
      <Kpis tab="rev" />
      <ChartGrid>
        <Panel title="Estimated earnings">
          <AreaChart
            series={[{ label: "Earnings", values: REV_BARS, color: "var(--color-green-600)", fillOpacity: 0.25 }]}
            label="Estimated monthly earnings from Oct 2025 to Sep 2026, rising from about $980 to $1,690"
          />
          <div aria-hidden="true" className={ARIA_AXIS}>
            <span>Oct 2025</span>
            <span>Sep 2026</span>
          </div>
        </Panel>
        <Panel title="Next payment">
          <Reveal distance={8} duration={0.8} className="text-[34px] font-bold tracking-[-0.02em] text-navy-800">
            <CountUp value={4260} prefix="$" />
          </Reveal>
          <ProgressBar value={85} height={10} color="var(--color-green-600)" duration={1.4} label="Next payment progress: 85% of the $5,000 threshold" />
          <span className="text-label text-gray-500">85% of the $5,000 threshold · expected Oct 21</span>
        </Panel>
        <Panel title="Revenue by ad type" className="col-span-full">
          {REV_TYPES.map((c, i) => (
            <BarRow
              key={c.name}
              layout="grid"
              label={c.name}
              value={c.value}
              pct={(c.pct / 46) * 100}
              color="var(--color-green-600)"
              labelWidth={110}
              valueWidth={60}
              delay={i * 0.1}
              duration={1}
            />
          ))}
        </Panel>
      </ChartGrid>
    </>
  );
}

export const PANELS: Record<DashKey, () => ReactNode> = {
  pub: PublishingPanel,
  aud: AudiencePanel,
  ix: InteractivityPanel,
  rev: RevenuePanel,
};
