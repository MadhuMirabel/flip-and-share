"use client";

import { useState } from "react";
import { BarChart } from "@/components/charts/BarChart";
import { Heatmap } from "@/components/charts/Heatmap";
import { Legend } from "@/components/charts/Legend";
import { useToast } from "@/components/site/Providers";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable, type DataColumn } from "@/components/ui/DataTable";
import { BarRow } from "@/components/ui/Progress";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import { StatTile } from "@/components/ui/Stat";
import {
  HEAT,
  PUBLICATIONS,
  RANGES,
  SOURCES,
  elementsFor,
  metricsFor,
  readersTitle,
  seriesFor,
  toCsv,
  type ElementRow,
  type RangeKey,
} from "@/components/app/analytics/data";

const PUBLISHED = PUBLICATIONS.filter((p) => p.status === "Published");

const TYPE_TONE: Record<string, BadgeTone> = { Product: "info", Form: "success", Video: "purple" };

const COLUMNS: DataColumn<ElementRow>[] = [
  {
    key: "type",
    header: "Type",
    width: "110px",
    hideBelow: 760,
    render: (r) => (
      <Badge tone={TYPE_TONE[r.type] ?? "gray"} size="sm">
        {r.type}
      </Badge>
    ),
  },
  { key: "name", header: "Element", width: "minmax(0,1fr)", mobileWidth: "minmax(0,1.4fr)", className: "text-gray-900" },
  { key: "page", header: "Page", width: "70px", mobileWidth: "52px", className: "text-gray-500" },
  { key: "clicks", header: "Clicks", width: "80px", mobileWidth: "60px", className: "font-semibold text-navy-800 tabular-nums" },
  { key: "ctr", header: "CTR", width: "70px", mobileWidth: "52px", className: "text-gray-700 tabular-nums" },
];

const SERIES = [
  { label: "Flipbook", color: "var(--color-blue-500)" },
  { label: "Article mode", color: "var(--color-blue-300)" },
];

/** In-app Analytics screen (prototype L439–463). Sample data until the analytics API exists. */
export function AnalyticsDashboard() {
  const toast = useToast();
  const [pubId, setPubId] = useState(PUBLISHED[0].id);
  const [range, setRange] = useState<RangeKey>("30");

  const metrics = metricsFor(range);
  const series = seriesFor(range);
  const elements = elementsFor(range);
  const pub = PUBLISHED.find((p) => p.id === pubId) ?? PUBLISHED[0];

  const exportCsv = () => {
    const blob = new Blob([toCsv(range, pub.title)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${range}d.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast(`analytics-${range}d.csv downloaded.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3.5">
        <h1 className="m-0 text-[28px] font-bold tracking-[-.02em] text-navy-800 max-[760px]:text-[22px]">Analytics</h1>
        <Select
          label="Publication"
          hideLabel
          options={PUBLISHED.map((p) => ({ value: p.id, label: p.title }))}
          value={pubId}
          onChange={(e) => setPubId(e.target.value)}
        />
        <div className="ml-auto flex items-center gap-2.5 max-[760px]:ml-0 max-[760px]:w-full max-[760px]:flex-wrap">
          <SegmentedControl
            label="Date range"
            tone="white"
            options={RANGES}
            value={range}
            onChange={(v) => setRange(v as RangeKey)}
          />
          <Button variant="neutral" size="sm" onClick={exportCsv}>
            Export CSV
          </Button>
        </div>
      </div>

      <section aria-label="Key numbers" className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
        {metrics.map((m, i) => (
          <StatTile key={m.name} variant="metric" label={m.name} value={m.value} delta={m.delta} deltaTone={m.tone} index={i} />
        ))}
      </section>

      <Card padding="base" className="gap-4">
        <div className="flex flex-wrap items-center gap-[18px]">
          <h2 className="m-0 text-body font-semibold text-navy-800">Readers per day</h2>
          <Legend items={SERIES} className="ml-auto" />
        </div>
        <BarChart
          key={range}
          variant="stacked"
          series={SERIES}
          data={series.map((v) => ({ values: [v * 0.72, v * 0.28], title: readersTitle(v) }))}
          max={Math.max(...series)}
          height={200}
          gap={4}
          axis={[`${range} days ago`, "Today"]}
          label={`Readers per day, last ${range} days, split between flipbook and article mode`}
        />
      </Card>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        <Card padding="base" className="gap-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="m-0 text-body font-semibold text-navy-800">Page heatmap</h2>
            <span className="text-xs text-gray-500">Share of readers who reached each page</span>
          </div>
          <Heatmap
            values={HEAT}
            startLabel="Page 1"
            endLabel="Page 64"
            label="Page reach heatmap, 64 pages: most readers reach pages 3 to 5, then it tapers to the last page"
          />
        </Card>
        <Card padding="base" className="gap-3.5">
          <h2 className="m-0 text-body font-semibold text-navy-800">Traffic sources</h2>
          {SOURCES.map((s, i) => (
            <BarRow key={s.name} layout="stacked" tone="sky" height={6} label={s.name} value={`${s.pct}%`} pct={s.pct} delay={i * 0.08} />
          ))}
        </Card>
      </div>

      <DataTable
        key={range}
        label="Interactive elements"
        title="Interactive elements"
        columns={COLUMNS}
        rows={elements}
        rowKey={(r) => r.name}
        header="tinted"
        minWidth={0}
      />
    </div>
  );
}
