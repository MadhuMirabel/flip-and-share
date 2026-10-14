import { BarChart, type BarDatum } from "@/components/charts/BarChart";
import { Donut } from "@/components/charts/Donut";
import { Legend } from "@/components/charts/Legend";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const SERIES = [
  { label: "Direct", color: "var(--color-violet-500)" },
  { label: "Programmatic", color: "var(--color-violet-200)" },
];

const round = (n: number) => Math.round(n * 10) / 10;
// Prototype `admRev`: direct (bottom) and programmatic (top) as a share of the plot height.
const DAYS: BarDatum[] = Array.from({ length: 30 }, (_, i) => ({
  values: [round(40 + Math.sin(i / 3) * 12 + i * 1.1), round(22 + Math.cos(i / 4) * 8 + i * 0.5)],
}));

const POSITIONS = [
  { name: "Cover", value: "$11.40", w: 100 },
  { name: "Inside front", value: "$9.80", w: 86 },
  { name: "Center spread", value: "$8.60", w: 75 },
  { name: "Page 3", value: "$7.20", w: 63 },
  { name: "Back cover", value: "$6.90", w: 60 },
  { name: "Run of book", value: "$3.10", w: 27 },
];

const DEVICES = [
  { name: "Mobile", fill: 94, ecpm: "$5.80" },
  { name: "Desktop", fill: 91, ecpm: "$7.40" },
  { name: "Tablet", fill: 88, ecpm: "$6.10" },
];

const CARD = "flex flex-col rounded-lg border border-gray-200 bg-white p-[22px]";
const TITLE = "m-0 text-body font-bold text-navy-800";

/** 04 · REPORTS: 30-day revenue, eCPM by position, fill rate by device (prototype L1064-1078). */
export function AdReportsSection() {
  return (
    <section aria-labelledby="adm-reports-title" className="border-t border-gray-200 bg-slate-50 px-8 py-20 max-sm:px-5">
      <div className="mx-auto flex max-w-page flex-col gap-7">
        <SectionHeader
          id="adm-reports-title"
          number="04"
          eyebrow="REPORTS"
          title="Which positions earn, so premium ads go there next."
          size="xs"
        />
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-[18px] max-[760px]:grid-cols-1">
          <Reveal className={`${CARD} col-span-full min-w-0 gap-3 max-[760px]:col-auto`}>
            <div className="flex flex-wrap items-center gap-4">
              <h3 className={TITLE}>Direct vs programmatic revenue</h3>
              <Legend items={SERIES} className="ml-auto gap-x-4" />
            </div>
            <BarChart
              variant="stacked"
              data={DAYS}
              series={SERIES}
              max={100}
              height={200}
              gap={5}
              radius={2}
              stagger={0.025}
              axis={["30 days ago", "Today"]}
              label="Direct and programmatic revenue per day over the last 30 days; direct revenue is the larger share and both grow toward today"
            />
          </Reveal>

          <Reveal className={`${CARD} gap-3`}>
            <h3 className={TITLE}>eCPM by page position</h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {POSITIONS.map((p, i) => (
                <li key={p.name} className="grid grid-cols-[110px_minmax(0,1fr)_54px] items-center gap-2.5 text-label">
                  <span className="text-gray-700">{p.name}</span>
                  <div
                    aria-hidden="true"
                    className="fas-motion h-[18px] origin-left rounded-sm"
                    style={{
                      width: `${p.w}%`,
                      background: `rgba(99,102,241,${(0.35 + p.w / 160).toFixed(3)})`,
                      animation: `fasGrowX 1.1s cubic-bezier(.22,1,.36,1) ${i * 0.08}s both`,
                    }}
                  />
                  <span className="text-right font-bold text-navy-800">{p.value}</span>
                </li>
              ))}
            </ul>
            <span className="text-xs text-gray-500">Feeds back into Ad Adviser suggestions in the plan.</span>
          </Reveal>

          <Reveal className={`${CARD} gap-3.5`}>
            <h3 className={TITLE}>Fill rate and eCPM by device</h3>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {DEVICES.map((d) => (
                <li key={d.name} className="flex items-center gap-3.5">
                  <Donut
                    size="sm"
                    value={d.fill}
                    color="var(--color-violet-500)"
                    track="var(--color-violet-100)"
                    label={`${d.name} fill rate ${d.fill}%`}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-900">{d.name}</span>
                    <span className="text-small text-gray-500">eCPM {d.ecpm}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
