"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { COVERS } from "@/lib/covers";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { CASES, type CaseStudy } from "./data";

/** Customer picker pills + one case study: quote, before/after, KPIs, before→after bar chart (prototype L2429–2461). */
export function CaseStudies() {
  const [i, setI] = useState(0);
  const uid = useId();
  const cs = CASES[i];

  return (
    <div className="flex flex-col gap-7">
      <div role="tablist" aria-label="Customer stories" className="flex flex-wrap gap-1.5">
        {CASES.map((c, n) => {
          const on = n === i;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              id={`${uid}-tab-${c.key}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              onClick={() => setI(n)}
              className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                on ? "border-navy-800 bg-navy-800 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
              }`}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: c.color }} />
              {c.name}
            </button>
          );
        })}
      </div>
      {/* key re-mounts the panel so fade, count-ups and bars replay per customer */}
      <CasePanel key={cs.key} cs={cs} panelId={`${uid}-panel`} labelledBy={`${uid}-tab-${cs.key}`} />
    </div>
  );
}

function CasePanel({ cs, panelId, labelledBy }: { cs: CaseStudy; panelId: string; labelledBy: string }) {
  const max = Math.max(...cs.bars);
  const fmt = (v: number) => (cs.unit === "k" && cs.key === "oc" ? `$${v}k` : `${v}${cs.unit}`);
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={labelledBy}
      className="grid animate-[fasFade_.45s_ease-out_both] grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] items-start gap-8 max-[900px]:grid-cols-1"
    >
      <div className="flex flex-col gap-[22px]">
        <div className="flex items-center gap-3.5">
          <div
            aria-hidden="true"
            className="h-[84px] w-16 flex-none rounded-sm bg-gray-200 shadow-[0_10px_24px_-12px_rgba(12,74,110,.5)]"
            style={{ background: `var(--color-gray-200) url(${COVERS[cs.cover % COVERS.length]}) center/cover` }}
          />
          <div className="flex flex-col gap-[3px]">
            <h3 className="m-0 text-[22px] font-bold tracking-[-0.02em] text-navy-800">{cs.name}</h3>
            <span className="text-menu text-gray-500">{cs.meta}</span>
          </div>
        </div>

        <figure className="m-0 border-l-[3px] border-blue-500 pl-[18px]">
          <blockquote className="m-0 text-[19px] leading-[1.5] tracking-[-0.01em] text-balance text-gray-900">
            “{cs.quote}”
          </blockquote>
          <figcaption className="mt-2.5 text-menu text-gray-500">{cs.who}</figcaption>
        </figure>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
          <div className="flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-[22px]">
            <span className="font-mono text-eyebrow font-semibold tracking-eyebrow text-amber-700">BEFORE</span>
            <p className="m-0 text-sm leading-[1.55] text-gray-600">{cs.before}</p>
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg border border-blue-200 bg-blue-50 p-[22px]">
            <span className="font-mono text-eyebrow font-semibold tracking-eyebrow text-gray-500">WITH FLIPANDSHARE</span>
            <p className="m-0 text-sm leading-[1.55] text-navy-800">{cs.after}</p>
          </div>
        </div>

        <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Features used">
          {cs.used.map((u) => (
            <li key={u.name}>
              <Link
                href={u.href}
                className="inline-block rounded-full bg-gray-100 px-2.5 py-[5px] text-small font-semibold text-gray-700 transition-colors duration-150 hover:bg-blue-100 hover:text-navy-700"
              >
                {u.name} →
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3.5">
        <Reveal distance={12} className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {cs.kpis.map((k, n) => (
            <div
              key={k.name}
              className="flex animate-[fasFade_.5s_ease-out_both] flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-[22px]"
              style={{ animationDelay: `${n * 0.07}s` }}
            >
              <span className="text-label text-gray-500">{k.name}</span>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className={`text-[30px] font-bold tracking-[-0.02em] tabular-nums ${k.tone === "good" ? "text-green-600" : "text-navy-800"}`}>
                  <CountUp value={k.value} prefix={k.prefix} suffix={k.suffix} />
                </span>
                <span className="text-small text-gray-500">{k.sub}</span>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[22px]">
          <div className="flex items-baseline justify-between gap-2.5">
            <h4 className="m-0 text-sm font-bold text-navy-800">{cs.chartTitle}</h4>
            <span className="text-xs text-gray-500">Issues, oldest → newest</span>
          </div>
          <div role="img" aria-label={`${cs.chartTitle}: ${cs.bars.map(fmt).join(", ")}. The customer switched after the fourth issue.`}>
            <div className="flex h-[150px] items-end gap-2 border-b border-gray-200">
              {cs.bars.map((v, n) => (
                <div
                  key={n}
                  title={fmt(v)}
                  className="relative flex-1 origin-bottom rounded-t-[3px]"
                  style={{
                    height: `${(v / max) * 100}%`,
                    background: n < 4 ? "var(--color-slate-300)" : cs.color,
                    animation: `fasGrowY .9s cubic-bezier(.2,.8,.2,1) ${n * 0.06}s both`,
                  }}
                >
                  {n === 4 && (
                    <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap text-blue-600">
                      switched
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2 text-[11px] text-gray-400">
              {cs.bars.map((_, n) => (
                <span key={n} className="flex-1 text-center">
                  {n < 4 ? `B${n + 1}` : `A${n - 3}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
