import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { sparkPath } from "@/components/charts/paths";
import { KpiSparkTile } from "@/components/charts/Sparkline";
import { LiveDot } from "@/components/ui/LiveDot";

type Kpi = { l: string; v: string; d: string; s: string; icon: IconName; c: string; bg: string; vals: number[]; down?: boolean };

const BLUE = ["#38bdf8", "rgba(56,189,248,.15)"] as const;
const VIOLET = ["#a78bfa", "rgba(167,139,250,.15)"] as const;
const GREEN = ["#4ade80", "rgba(74,222,128,.15)"] as const;
const ORANGE = ["#fb923c", "rgba(251,146,60,.15)"] as const;

const UP = [3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9];
const WOB = [5, 8, 6, 9, 7, 10, 8, 9, 11, 8, 10, 9];
const DN = [9, 7, 8, 6, 7, 5, 6, 4, 5, 3, 4, 3];

const k = (l: string, v: string, d: string, s: string, icon: IconName, [c, bg]: readonly [string, string], vals: number[], down?: boolean): Kpi => ({ l, v, d, s, icon, c, bg, vals, down });

/** Prototype `dashData()`: KPI tiles, chart series and feeds, copied verbatim. */
const KPIS: Kpi[][] = [
  [
    k("Pages Published", "1.1K", "↗ 12.4%", "vs prior year", "grid", BLUE, [3, 3, 3.2, 3.1, 3.4, 3.3, 3.5, 3.4, 3.6, 3.5, 5, 9]),
    k("Total Ads", "100", "↗ 8.2%", "across all issues", "target", VIOLET, WOB),
    k("Ad Revenue", "$658K", "↗ 18.7%", "net ad revenue", "send", GREEN, UP),
    k("Avg Open Space", "22.4%", "↘ 3.1%", "target: under 20%", "history", ORANGE, DN, false),
  ],
  [
    k("Active Users", "30.6K", "↗ 12.4%", "vs previous 28 days", "users", BLUE, UP),
    k("New Users", "18.4K", "↗ 9.1%", "60% of all users", "users", VIOLET, UP),
    k("Avg Engagement", "3m 48s", "↗ 6.3%", "per active user", "history", GREEN, WOB),
    k("Sessions", "52.1K", "↘ 2.2%", "1.7 sessions per user", "eye", ORANGE, DN, true),
  ],
  [
    k("Estimated Earnings", "$6,323.00", "↗ 14.2%", "vs previous 28 days", "send", GREEN, WOB),
    k("Page RPM", "$12.84", "↗ 6.8%", "revenue per 1K page views", "eye", BLUE, UP),
    k("Impressions", "486K", "↗ 9.4%", "ad impressions served", "grid", VIOLET, UP),
    k("Click-through Rate", "1.42%", "↘ 0.3%", "6,900 clicks · $0.89 CPC", "target", ORANGE, DN, true),
  ],
  [
    k("Total Clicks", "8,412", "↗ 14.2%", "vs last period", "target", BLUE, UP),
    k("Click-through Rate", "6.8%", "↗ 0.9 pt", "of page views", "send", VIOLET, UP),
    k("Video Plays", "1,940", "↗ 22.5%", "avg watch 41s", "eye", GREEN, UP),
    k("QR Scans", "612", "↘ 3.1%", "print 388 · digital 224", "grid", ORANGE, DN, true),
  ],
];

const PUB = sparkPath([30, 26, 36, 33, 41, 43, 38, 40, 39, 45, 44, 43], 100, 40);
const REV = sparkPath([20, 22, 30, 36, 34, 33, 36, 38, 45, 44, 44, 45], 100, 40);
const EARN = sparkPath([32, 40, 31, 44, 46, 43, 48, 45, 50, 56, 52, 46, 48, 62, 64, 58, 47, 44], 100, 40);
const EARN_PREV = sparkPath([26, 32, 28, 36, 34, 36, 40, 38, 44, 46, 42, 40, 42, 50, 52, 48, 42, 40], 100, 40);

const HOURS = [4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 12, 14, 16, 17, 18, 19, 22, 26, 30, 38, 46, 52, 57, 62, 72, 55, 48, 38, 36, 34, 30, 32, 36, 42, 56, 60, 62, 58, 50, 44, 36, 30, 22, 14, 12, 10, 8, 6];

const EVENTS: [string, string, string, string][] = [
  ["Read page 3 · Storm Season", "Chicago, IL", "now", "#22c55e"],
  ["Scanned QR · Comfort Zone", "Ontario, CA", "3s ago", "#f59e0b"],
  ["Opened Sept 23 issue", "New York, NY", "11s ago", "#38bdf8"],
  ["Bought · Henning's p8", "Miami, FL", "15s ago", "#f97316"],
  ["Clicked hotspot · Bay Auto", "Austin, TX", "19s ago", "#a78bfa"],
  ["Read page 12", "Denver, CO", "23s ago", "#22c55e"],
];

const DONUT: [string, string, number, string][] = [
  ["Display", "$3,120", 51, "#16a34a"],
  ["In-article", "$1,640", 27, "#4ade80"],
  ["Anchor", "$880", 14, "#38bdf8"],
  ["Vignette", "$520", 8, "#bae6fd"],
];

/** Donut arcs with their cumulative start percentage. */
const SEGS = DONUT.map(([n, v, pct, c], i) => ({ n, v, pct, c, i, start: DONUT.slice(0, i).reduce((a, d) => a + d[2], 0) }));

const PAGES = [24, 8, 40, 100, 8, 22, 60, 8, 34, 14, 8, 78, 12, 8, 30, 10, 8, 14, 8, 8];

const TYPES: [string, string, number, string][] = [
  ["Web links", "3,860", 46, "#38bdf8"],
  ["Video", "1,940", 23, "#4ade80"],
  ["Page links", "1,120", 13, "#a78bfa"],
  ["Buy now", "640", 8, "#f97316"],
  ["QR scans", "612", 7, "#facc15"],
  ["Email / phone", "240", 3, "#94a3b8"],
];

const TABS: [string, IconName][] = [
  ["Publishing", "grid"],
  ["Audience", "users"],
  ["Revenue", "send"],
  ["Interactivity", "target"],
];
const SOURCES = ["Live", "Google Analytics · live", "Google AdSense · 28 days", "Live"];

const delay = (i: number) => i * 0.08;
const fade = (d = ".25s"): CSSProperties => ({ animation: `fasSlideIn .4s ease-out ${d} both` });

function Panel({ title, sub, span, children }: { title: string; sub: string; span?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-col gap-0.5 rounded-lg border border-slate-800 bg-navy-900 px-3 py-2.5" style={{ ...fade(), gridColumn: span }}>
      <span className="text-[11px] font-bold text-white">{title}</span>
      <span className="text-[9px] text-slate-400">{sub}</span>
      {children}
    </div>
  );
}

function Kpis({ list }: { list: Kpi[] }) {
  return list.map((x, i) => (
    <KpiSparkTile
      key={x.l}
      variant="dark"
      label={x.l}
      value={x.v}
      delta={x.d}
      sub={x.s}
      trend={x.down ? "down" : "up"}
      icon={x.icon}
      color={x.c}
      chipBg={x.bg}
      spark={x.vals}
      delay={delay(i)}
    />
  ));
}

function AreaPanel({ title, sub, span, area, color, extra, d1 = ".3s" }: { title: string; sub: string; span: string; area: string; color: string; extra?: string; d1?: string }) {
  return (
    <Panel title={title} sub={sub} span={span}>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-1 min-h-0 w-full flex-1">
        <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth=".6" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="#1e293b" strokeWidth=".6" />
        <path d={area} fill={color} opacity=".9" style={{ animation: `fasReveal 1.4s ease-out ${d1} both` }} />
        {extra && (
          <path d={extra} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" style={{ animation: "fasReveal 1.4s ease-out .5s both" }} />
        )}
      </svg>
    </Panel>
  );
}

const GRID = "grid min-h-0 flex-1 grid-cols-4 gap-[9px] px-3.5 py-2.5";

function Publishing() {
  return (
    <div className={`${GRID} grid-rows-[auto_minmax(0,1fr)]`}>
      <Kpis list={KPIS[0]} />
      <AreaPanel title="Publishing Trends" sub="Pages published per month" span="1 / span 2" area={PUB.area} color="#0ea5e9" />
      <AreaPanel title="Revenue Trend" sub="Monthly ad revenue ($)" span="3 / span 2" area={REV.area} color="#22c55e" d1=".5s" />
    </div>
  );
}

function Audience({ live }: { live: string }) {
  return (
    <div className={`${GRID} grid-rows-[minmax(0,1.15fr)_auto]`}>
      <div className="flex flex-col gap-0.5 rounded-lg border border-slate-800 bg-navy-900 px-3 py-2.5" style={{ animation: "fasSlideIn .4s ease-out both" }}>
        <span className="flex items-center gap-[5px] text-[9px] font-bold tracking-[.06em] text-green-300">
          <LiveDot size={7} />
          LIVE · RIGHT NOW
        </span>
        <span className="text-[30px] leading-[1.05] font-bold text-white tabular-nums">{live}</span>
        <span className="text-[9px] text-slate-400">users in the last 30 minutes</span>
        <div className="mt-auto flex flex-col gap-[3px] text-[8.5px] text-slate-400">
          {[
            ["Peak today", "224 · 1 PM"],
            ["Pages / min", "13"],
            ["Top page now", "Sept 23 · p.3"],
          ].map(([a, b]) => (
            <span key={a} className="flex justify-between">
              {a}
              <b className="text-blue-100">{b}</b>
            </span>
          ))}
        </div>
      </div>
      <Panel title="User Activity · Last 24 Hours" sub="Active users per 30-minute window" span="2 / span 2">
        <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[repeat(48,1fr)] items-end gap-[1.5px]">
          {HOURS.map((h, i) => (
            <span
              key={i}
              className="rounded-t-sm"
              style={{
                height: `${h}%`,
                background: i === 24 ? "#0369a1" : i > 45 ? "rgba(56,189,248,.45)" : "#38bdf8",
                transformOrigin: "bottom",
                animation: "fasGrow .7s cubic-bezier(.2,.8,.2,1) both",
                animationDelay: `${i * 0.018}s`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-slate-500">
          {["12a", "6a", "12p", "6p", "Now"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </Panel>
      <div className="flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-lg border border-slate-800 bg-navy-900 px-3 py-2.5" style={fade(".15s")}>
        <span className="text-[9px] font-bold tracking-[.06em] text-slate-400">LIVE EVENTS</span>
        {EVENTS.map(([t, p, w, c], i) => (
          <div key={t} className="grid grid-cols-[6px_minmax(0,1fr)_auto] items-start gap-1.5" style={{ animation: "fasSlideIn .4s ease-out both", animationDelay: `${i * 0.12 + 0.2}s` }}>
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full" style={{ background: c }} />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[8.5px] text-slate-200">{t}</span>
              <span className="text-[7.5px] text-slate-500">{p}</span>
            </span>
            <span className="text-[7.5px] text-slate-500">{w}</span>
          </div>
        ))}
      </div>
      <Kpis list={KPIS[1]} />
    </div>
  );
}

function Revenue() {
  return (
    <div className={`${GRID} grid-rows-[auto_minmax(0,1fr)]`}>
      <Kpis list={KPIS[2]} />
      <AreaPanel title="Estimated Earnings" sub="Daily AdSense earnings vs previous period" span="1 / span 2" area={EARN.area} color="#22c55e" extra={EARN_PREV.line} />
      <Panel title="Revenue by Ad Type" sub="Share of earnings this period" span="3 / span 2">
        <div className="grid min-h-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <svg viewBox="0 0 42 42" className="aspect-square h-full max-h-24">
            {SEGS.map((d) => (
              <circle
                key={d.n}
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                stroke={d.c}
                strokeWidth="5"
                strokeDasharray={`${d.pct} 100`}
                // Each arc is rotated into place: fasDraw ends at dashoffset 0, so an offset attribute would be overridden.
                transform={`rotate(${-90 + d.start * 3.6} 21 21)`}
                style={{ animation: "fasDraw 1s ease-out both", animationDelay: `${d.i * 0.18}s` }}
              />
            ))}
          </svg>
          <div className="flex flex-col gap-[5px]">
            {SEGS.map((d) => (
              <span key={d.n} className="grid grid-cols-[8px_minmax(0,1fr)_auto_auto] items-center gap-1.5 text-[9px] text-slate-300">
                <span className="h-2 w-2 rounded-full" style={{ background: d.c }} />
                {d.n}
                <b className="text-blue-300">{d.v}</b>
                <span className="text-slate-500">{d.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Interactivity() {
  return (
    <div className={`${GRID} grid-rows-[auto_minmax(0,1fr)]`}>
      <Kpis list={KPIS[3]} />
      <Panel title="Clicks by Page" sub="Where readers tap · p3 (QR) and p8 (shop) lead" span="1 / span 2">
        <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[repeat(20,1fr)] items-end gap-[3px]">
          {PAGES.map((h, i) => (
            <span
              key={i}
              className="rounded-t-sm"
              style={{
                height: `${h}%`,
                background: h >= 60 ? "#0ea5e9" : h >= 20 ? "#38bdf8" : "#0c4a6e",
                transformOrigin: "bottom",
                animation: "fasGrow .7s cubic-bezier(.2,.8,.2,1) both",
                animationDelay: `${i * 0.04}s`,
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-[repeat(20,1fr)] gap-[3px] text-center text-[6.5px] text-slate-500">
          {PAGES.map((_, i) => (
            <span key={i}>p{i + 1}</span>
          ))}
        </div>
      </Panel>
      <Panel title="Clicks by Type" sub="Share of all interactions this period" span="3 / span 2">
        <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
          {TYPES.map(([n, v, pct, c], i) => (
            <div key={n} className="flex flex-col gap-0.5" style={{ animation: "fasSlideIn .4s ease-out both", animationDelay: `${i * 0.1}s` }}>
              <span className="flex justify-between text-[9px] text-slate-200">
                <span>{n}</span>
                <span>
                  <b className="text-blue-300">{v}</b> <span className="text-slate-500">{pct}%</span>
                </span>
              </span>
              <span className="block h-1 overflow-hidden rounded-full bg-slate-800">
                <span className="block h-full" style={{ width: `${pct * 2}%`, background: c, animation: "fasWide .9s cubic-bezier(.2,.8,.2,1) both", animationDelay: `${i * 0.1}s` }} />
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/** Dark publisher dashboard inside the tablet. `dash` is the timeline value 1..4 (tab = dash - 1). */
export function DashboardScreen({ dash }: { dash: number }) {
  const tab = Math.max(0, dash - 1);
  return (
    <div className="absolute inset-x-0 top-[26px] bottom-0 flex flex-col overflow-hidden bg-ink-950 text-slate-200" style={{ animation: "fasFade .4s ease-out both" }}>
      <div className="flex h-[30px] items-center justify-between bg-navy-900 px-3.5 text-xs">
        <span className="flex items-center gap-2 font-bold text-blue-100">
          <span className="h-4 w-4 rounded-sm" style={{ background: "linear-gradient(135deg,#0ea5e9,#7dd3fc)" }} />
          <span>
            Dashboard <span className="text-[10px] font-normal text-slate-400">· Digital edition performance</span>
          </span>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-[7px] py-0.5 text-[10px] font-bold text-green-300">
          <LiveDot size={6} />
          {SOURCES[tab]}
        </span>
      </div>
      <div className="flex gap-0.5 border-b border-slate-800 bg-navy-900 px-3.5">
        {TABS.map(([name, icon], i) => (
          <span
            key={name}
            className={`flex items-center gap-[5px] border-b-2 px-2.5 py-[7px] text-[10.5px] font-semibold transition-all duration-250 ${tab === i ? "border-blue-500 text-blue-300" : "border-transparent text-slate-400"}`}
          >
            <Icon name={icon} size={11} />
            {name}
          </span>
        ))}
      </div>
      {tab === 0 && <Publishing />}
      {tab === 1 && <Audience live={dash >= 2 ? "31" : "30"} />}
      {tab === 2 && <Revenue />}
      {tab === 3 && <Interactivity />}
    </div>
  );
}
