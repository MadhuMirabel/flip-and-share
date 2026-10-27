"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProgressBar } from "@/components/ui/Progress";
import { RangeField } from "@/components/ui/RangeField";
import { Reveal } from "@/components/ui/Reveal";
import { PLAN_ANNUAL, ROI_DEFAULTS, roi } from "./data";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/** "What would it mean for your title?" sliders + navy estimate card (prototype L2466–2486). */
export function RoiCalculator() {
  const [v, setV] = useState(ROI_DEFAULTS);
  const r = roi(v);
  const set = (k: keyof typeof v) => (n: number) => setV((cur) => ({ ...cur, [k]: n }));

  const lines: [string, number][] = [
    ["Digital ad uplift (tracked hotspots, ~35% of print rate)", r.adRev],
    ["Print-to-digital QR placements", r.qr],
    ["Production hours saved (12 h / 48 pages @ $55)", r.saved],
  ];

  return (
    <section
      aria-labelledby="roi-title"
      className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12 px-8 py-20 max-sm:px-5"
    >
      <div className="flex flex-col gap-3.5">
        <Eyebrow>YOUR NUMBERS</Eyebrow>
        <h2 id="roi-title" className="m-0 text-[32px] leading-[1.12] font-bold tracking-[-0.025em] text-navy-800">
          What would it mean for your title?
        </h2>
        <p className="m-0 text-[15.5px] leading-[1.6] text-gray-600">
          Move the sliders to your current issue. The estimate uses the median uplift from the customers above; your results will differ.
        </p>
        <div className="mt-1.5 flex flex-col gap-4">
          <RangeField label="Issues per year" value={v.issues} min={1} max={52} step={1} onChange={set("issues")} />
          <RangeField label="Pages per issue" value={v.pages} min={8} max={200} step={4} onChange={set("pages")} />
          <RangeField label="Ads per issue" value={v.ads} min={0} max={80} step={1} onChange={set("ads")} />
        </div>
      </div>

      <Reveal className="flex flex-col gap-[18px] rounded-lg border border-navy-800 bg-navy-800 p-7 text-white">
        <Eyebrow tone="dark" className="text-blue-300!">
          ESTIMATED PER YEAR
        </Eyebrow>
        <div className="flex flex-col gap-1" aria-live="polite">
          <span className="text-[44px] leading-[1.1] font-bold tracking-[-0.03em] tabular-nums">{usd(r.total)}</span>
          <span className="text-sm text-blue-200">additional revenue and savings</span>
        </div>
        <dl className="m-0 flex flex-col gap-2.5 border-t border-white/15 pt-3.5">
          {lines.map(([name, n]) => (
            <div key={name} className="flex justify-between gap-3 text-sm">
              <dt className="text-blue-100">{name}</dt>
              <dd className="m-0 font-bold tabular-nums">{usd(n)}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-3 text-sm">
            <dt className="text-blue-100">Professional plan, annual</dt>
            <dd className="m-0 font-bold tabular-nums">-{usd(PLAN_ANNUAL)}</dd>
          </div>
        </dl>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-small text-blue-200">
            <span>Professional plan, annual</span>
            <span>{usd(PLAN_ANNUAL)}</span>
          </div>
          <ProgressBar
            value={r.barPct}
            height={8}
            tone="glass"
            color="var(--color-green-500)"
            animate="transition"
            label="Plan cost as a share of estimated return"
          />
          <span className="text-small text-blue-200">
            {r.total > 0
              ? `Pays for itself in about ${r.months} month${r.months > 1 ? "s" : ""}`
              : "Add issues or ads to see an estimate"}
          </span>
        </div>
        <Button href="/signup" variant="white" radius="md" className="self-start">
          Start with one free issue
        </Button>
      </Reveal>
    </section>
  );
}
