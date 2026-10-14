import { AreaChart } from "@/components/charts/AreaChart";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { ProgressBar } from "@/components/ui/Progress";
import { Reveal } from "@/components/ui/Reveal";

const SPLIT = [
  { name: "Print", value: 1486, color: "var(--color-green-600)" },
  { name: "Digital", value: 829, color: "var(--color-blue-500)" },
];
const MAX = 1486;

const PRINT = [60, 72, 68, 90, 110, 96, 104, 130, 124, 118, 140, 152, 148, 160];
const DIGITAL = [30, 34, 40, 38, 52, 60, 56, 58, 70, 66, 74, 80, 86, 90];
// The prototype scales each line to its own maximum; scale digital up so one shared scale gives the same curve.
const DIGITAL_SCALED = DIGITAL.map((v) => (v * Math.max(...PRINT)) / Math.max(...DIGITAL));

const CARD = "rounded-lg border border-gray-200 bg-white p-[22px]";

/** Print vs digital scan split and the "Scans per day" chart (prototype L978-991). */
export function QrPrintVsDigital() {
  return (
    <section aria-labelledby="qr-split-title" className="border-y border-gray-200 bg-slate-50 px-8 py-20 max-sm:px-5">
      <div className="mx-auto flex max-w-page flex-col gap-7">
        <SectionHeader
          id="qr-split-title"
          eyebrow="PRINT VS DIGITAL"
          title="Know which edition sent the reader."
          lead="Create one code per channel. Print is green, Digital is blue, and every scan is counted separately."
          leadSize="lg"
          maxWidth={680}
        />
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-[18px] max-[760px]:grid-cols-1">
          <Reveal className={`flex flex-col gap-[18px] ${CARD}`}>
            {SPLIT.map((c, i) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <CountUp value={c.value} className="text-[30px] font-bold tracking-[-.02em] text-navy-800" />
                </div>
                <ProgressBar value={c.value} max={MAX} height={10} color={c.color} duration={1.2} delay={i * 0.15} decorative />
              </div>
            ))}
            <span className="text-small text-gray-500">Scans in the last 14 days · illustrative</span>
          </Reveal>
          <Reveal className={`flex min-w-0 flex-col gap-2.5 ${CARD}`}>
            <h3 className="m-0 text-body font-bold text-navy-800">Scans per day</h3>
            <AreaChart
              height={200}
              stagger={0.3}
              label="Scans per day over the last 14 days: print rises from about 60 to 160, digital from about 30 to 90"
              max={Math.max(...PRINT) * 1.1}
              series={[
                { label: "Print", values: PRINT, color: "var(--color-green-600)", fillOpacity: 0 },
                { label: "Digital", values: DIGITAL_SCALED, color: "var(--color-blue-500)", fillOpacity: 0 },
              ]}
            />
            <div aria-hidden="true" className="flex justify-between text-eyebrow text-gray-400">
              <span>14 days ago</span>
              <span>Today</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
