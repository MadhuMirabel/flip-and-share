"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, usePrefersReducedMotion } from "@/components/ui/Reveal";

const STEPS = ["Issue details", "Validation", "Sign-off", "Packaging", "Complete"];

const CHECKS: [string, "ok" | "warn", string][] = [
  ["Every page has artwork", "ok", "64 / 64"],
  ["Placeholders resolved", "ok", "0 left"],
  ["Hotspot links respond", "ok", "18 checked"],
  ["QR destinations live", "ok", "3 of 3"],
  ["Materials received", "warn", "21 of 22"],
];

const GATES = [
  ["All materials received", "22 of 22 insertions have artwork.", "Signed by Priya S · 10:42 AM"],
  ["Proof approved by editor", "Every page approved in the proof link.", "Signed by Mark T · 11:05 AM"],
];

const LOG: [string, string][] = [
  ["11:06:02", "Rendering 64 page images…"],
  ["11:06:09", "Compressing to WebP · 38 MB → 9.4 MB"],
  ["11:06:12", "Building web and app packages"],
  ["11:06:15", "Uploading to CDN · 3 regions"],
  ["11:06:18", "Edition URL ready"],
];

const fade = (delay: number, name = "fasFade .4s") => ({ animation: `${name} ease-out ${delay}s both` });

/**
 * "Publish with gates": five-step wizard. Auto-advances every 3.2s while on screen
 * until the visitor picks a step (prototype `wizAuto`, L2176–2207).
 */
export function PublishWizard() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || reduced) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 3200);
    return () => clearInterval(id);
  }, [auto, visible, reduced]);

  const pick = (i: number) => {
    setStep(i);
    setAuto(false);
  };

  return (
    <section aria-labelledby="wizard-title" className="px-8 py-20 max-sm:px-5">
      <div className="mx-auto flex max-w-page flex-col gap-7">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow>PUBLISH WITH GATES</Eyebrow>
          <h2 id="wizard-title" className="m-0 text-[clamp(28px,3.6vw,38px)] font-bold leading-[1.12] tracking-[-.025em] text-navy-800">
            Five steps. Nothing goes live with a missing ad.
          </h2>
          <p className="m-0 text-[15.5px] leading-[1.6] text-gray-600">
            Validation must finish and two people must sign off before Package Issue unlocks. Each sign-off is stamped
            with who and when, and printed in the publish report.
          </p>
        </div>

        <Reveal className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_30px_60px_-36px_rgba(12,74,110,.4)]">
          <div ref={rootRef}>
            <div role="tablist" aria-label="Publishing steps" className="no-scrollbar flex overflow-x-auto border-b border-gray-200">
              {STEPS.map((name, i) => {
                const done = i < step;
                const now = i === step;
                return (
                  <button
                    key={name}
                    id={`wiz-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={now}
                    aria-controls="wiz-panel"
                    tabIndex={now ? 0 : -1}
                    onClick={() => pick(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight") pick((i + 1) % STEPS.length);
                      if (e.key === "ArrowLeft") pick((i + STEPS.length - 1) % STEPS.length);
                    }}
                    className={`flex min-w-[130px] flex-1 cursor-pointer items-center gap-2.5 border-0 border-b-[3px] px-3.5 py-4 transition-all duration-300 ${
                      now ? "border-blue-500 bg-blue-50" : "border-transparent bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                        done ? "bg-green-600 text-white" : now ? "bg-blue-500 text-white" : "bg-slate-100 text-gray-500"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className={`text-left text-menu font-semibold ${now ? "text-navy-800" : done ? "text-gray-700" : "text-gray-500"}`}>
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div id="wiz-panel" role="tabpanel" aria-labelledby={`wiz-tab-${step}`} className="min-h-[250px] p-7 max-sm:p-5">
              {step === 0 && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5" style={{ animation: "fasSlideIn .4s ease-out both" }}>
                  <div className="flex flex-col gap-2.5">
                    <span className="text-label font-semibold text-gray-500">Issue</span>
                    <span className="text-h3 font-bold text-navy-800">OC Parenting · October 2026</span>
                    <span className="text-menu text-gray-600">64 pages · 22 insertions · 3 QR codes · 18 hotspots</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <span className="text-label font-semibold text-gray-500">Publish to</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md border-[1.5px] border-blue-500 bg-blue-50 px-3.5 py-[9px] text-menu font-semibold text-navy-700">Web + App</span>
                      <span className="rounded-md border border-gray-200 px-3.5 py-[9px] text-menu text-gray-500">Web only</span>
                      <span className="rounded-md border border-gray-200 px-3.5 py-[9px] text-menu text-gray-500">App only</span>
                    </div>
                    <span className="text-small text-gray-500">✓ Email the publish report to the workgroup</span>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-3.5">
                  {CHECKS.map(([name, state, note], i) => (
                    <div key={name} className="flex items-center gap-3 text-sm text-gray-700" style={fade(i * 0.35)}>
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] text-white ${state === "ok" ? "bg-green-600" : "bg-amber-500"}`}
                        style={fade(i * 0.35 + 0.2, "fasTick .4s")}
                      >
                        {state === "ok" ? "✓" : "!"}
                      </span>
                      {name}
                      <span className={`ml-auto text-xs ${state === "ok" ? "text-gray-500" : "text-amber-700"}`}>{note}</span>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
                  {GATES.map(([name, detail, stamp], i) => (
                    <div
                      key={name}
                      className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-green-200 bg-green-50 p-[18px]"
                      style={fade(i * 0.5, "fasSlideIn .45s")}
                    >
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="relative h-[22px] w-[38px] flex-none rounded-full bg-green-600">
                          <span className="absolute left-[19px] top-[3px] h-4 w-4 rounded-full bg-white" />
                        </span>
                        <span className="text-body font-bold text-green-900">{name}</span>
                      </div>
                      <span className="text-label text-green-800">{detail}</span>
                      <span
                        className="self-start rounded-full border border-dashed border-green-600 bg-white px-2.5 py-1 text-xs font-semibold text-green-700"
                        style={fade(i * 0.5 + 0.5, "fasTick .5s")}
                      >
                        ✓ {stamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <div aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-full origin-left bg-blue-500" style={{ animation: "fasGrowX 2s linear both" }} />
                  </div>
                  <div className="rounded-lg bg-ink-950 p-4 font-mono text-small leading-[1.8] text-blue-200">
                    {LOG.map(([t, m], i) => (
                      <div key={t} style={fade(i * 0.4, "fasFade .3s")}>
                        <span className="text-slate-500">{t}</span> {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col items-center gap-3 text-center" style={{ animation: "fasFade .5s ease-out both" }}>
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-[26px] text-white"
                    style={{ animation: "fasTick .5s ease-out both" }}
                  >
                    ✓
                  </span>
                  <span className="text-[22px] font-bold text-navy-800">October 2026 is live.</span>
                  <span className="rounded-md bg-blue-50 px-3 py-2 font-mono text-menu text-blue-700">
                    flipandshare.com/oc-parenting/october-2026
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="rounded-sm border border-gray-200 px-3 py-2 text-label font-semibold text-gray-700">Download package</span>
                    <span className="rounded-sm border border-gray-200 px-3 py-2 text-label font-semibold text-gray-700">Publish report</span>
                    <span className="rounded-sm bg-blue-500 px-3 py-2 text-label font-semibold text-white">Promote to social →</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
