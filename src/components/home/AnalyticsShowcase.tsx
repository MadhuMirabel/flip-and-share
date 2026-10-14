"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Kpi = [name: string, value: number, prefix: string, suffix: string, delta: string];
type Tab = { name: string; icon: IconName; chart: string; color: string; kpis: Kpi[]; bars: number[] };

const DB: Record<string, Tab> = {
  pub: {
    name: "Publishing", icon: "grid", chart: "Pages published by month", color: "#0ea5e9",
    kpis: [["Pages published", 1284, "", "", "+12%"], ["Downloads", 18420, "", "", "+8%"], ["Page views", 246900, "", "", "+21%"], ["Hotspot clicks", 32118, "", "", "+34%"]],
    bars: [62, 70, 58, 80, 76, 92, 88, 96, 84, 102, 110, 118],
  },
  aud: {
    name: "Audience", icon: "users", chart: "Readers per hour, last 24 hours", color: "#8b5cf6",
    kpis: [["Active users", 12480, "", "", "+18%"], ["New readers", 64, "", "%", "+5 pts"], ["Avg. engagement", 232, "", "s", "+22s"], ["Returning", 36, "", "%", "+3 pts"]],
    bars: [20, 14, 10, 8, 9, 16, 34, 58, 72, 80, 76, 70, 74, 82, 86, 78, 70, 66, 72, 88, 94, 80, 60, 40],
  },
  ix: {
    name: "Interactivity", icon: "sparkles", chart: "Clicks by page", color: "#0284c7",
    kpis: [["Total clicks", 32118, "", "", "+34%"], ["Click-through rate", 7.4, "", "%", "+1.2 pts"], ["Video plays", 4960, "", "", "+41%"], ["QR scans", 2315, "", "", "+27%"]],
    bars: [40, 22, 88, 64, 30, 96, 52, 34, 70, 44, 26, 58, 80, 36, 28, 62, 48, 30, 74, 42, 24, 56, 38, 90],
  },
  rev: {
    name: "Ad Revenue", icon: "trend", chart: "Estimated earnings by month", color: "#16a34a",
    kpis: [["Est. earnings", 18240, "$", "", "+19%"], ["RPM", 6.8, "$", "", "+$0.9"], ["Impressions", 2680000, "", "", "+14%"], ["Ad clicks", 9410, "", "", "+11%"]],
    bars: [980, 1040, 1120, 1080, 1260, 1340, 1420, 1510, 1480, 1620, 1700, 1690],
  },
};
const KEYS = Object.keys(DB);

const fmt = (v: number) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)}M` : v.toLocaleString("en-US"));

/** Slate-50 analytics section: four chip tabs, a 2x2 KPI grid and a coloured bar chart. */
export function AnalyticsShowcase() {
  const [tab, setTab] = useState(KEYS[0]);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const d = DB[tab];
  const mx = Math.max(...d.bars);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const to = e.key === "Home" ? 0 : e.key === "End" ? KEYS.length - 1 : null;
    if (!dir && to === null) return;
    e.preventDefault();
    const next = KEYS[to ?? (KEYS.indexOf(tab) + dir + KEYS.length) % KEYS.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="border-t border-gray-200 bg-slate-50 py-[88px]">
      <Container>
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[680px] flex-col gap-3">
              <Eyebrow>ANALYTICS</Eyebrow>
              <h2 className="m-0 text-[clamp(30px,4vw,40px)] leading-[1.1] font-bold tracking-[-0.03em] text-navy-800">
                See every number, not just a view count.
              </h2>
            </div>
            <Link href="/platform/analytics" className="text-sm font-semibold whitespace-nowrap">
              Open the analytics tour →
            </Link>
          </div>
          <div role="tablist" aria-label="Analytics views" onKeyDown={onKey} className="flex flex-wrap gap-1.5">
            {KEYS.map((k) => {
              const on = k === tab;
              return (
                <button
                  key={k}
                  ref={(el) => {
                    tabRefs.current[k] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`ana-tab-${k}`}
                  aria-selected={on}
                  aria-controls="ana-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setTab(k)}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-[9px] text-sm font-semibold transition-all duration-200 ${
                    on ? "border-navy-800 bg-navy-800 text-white" : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <Icon name={DB[k].icon} size={16} />
                  {DB[k].name}
                </button>
              );
            })}
          </div>
          <Reveal
            id="ana-panel"
            role="tabpanel"
            aria-labelledby={`ana-tab-${tab}`}
            className="grid gap-[22px] rounded-lg border border-gray-200 bg-white p-[22px] shadow-form [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]"
          >
            <div key={`k-${tab}`} className="grid grid-cols-2 content-start gap-3">
              {d.kpis.map(([name, v, pre, suf, delta], i) => (
                <div
                  key={name}
                  className="flex flex-col gap-1 rounded-lg bg-slate-50 p-3.5"
                  style={{ animation: "fasFade .5s ease-out both", animationDelay: `${i * 0.06}s` }}
                >
                  <span className="text-[12px] text-gray-500">{name}</span>
                  <span className="text-[24px] font-bold tracking-[-0.02em] text-navy-800">
                    {pre}
                    {fmt(v)}
                    {suf}
                  </span>
                  <span className="text-caption font-bold text-green-600">{delta}</span>
                </div>
              ))}
            </div>
            <div className="flex min-w-0 flex-col gap-2.5">
              <span className="text-sm font-bold text-navy-800">{d.chart}</span>
              <div
                key={`b-${tab}`}
                role="img"
                aria-label={`${d.chart}: ${d.bars.length} bars`}
                className="flex h-[180px] items-end gap-1.5 border-b border-gray-200"
              >
                {d.bars.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${(v / mx) * 100}%`,
                      background: d.color,
                      opacity: 0.45 + (0.55 * v) / mx,
                      transformOrigin: "bottom",
                      animation: "fasGrowY .9s cubic-bezier(.2,.8,.2,1) both",
                      animationDelay: `${i * 0.03}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
