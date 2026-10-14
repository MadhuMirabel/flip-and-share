"use client";

import { useEffect, useReducer, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal, usePrefersReducedMotion } from "@/components/ui/Reveal";
import { useToast } from "@/components/site/Providers";
import { COVERS, SAMPLE_PAGES } from "@/lib/covers";
import styles from "./AiDemo.module.css";

/* Demo data: prototype AI_TAGS / AI_SUMS / AI_ALTS / AI_BOXES (L3087–3094). */
const TAGS: [string, number][] = [
  ["Mars Express", 98],
  ["ESA", 96],
  ["Planetary science", 93],
  ["Mars", 99],
  ["Orbiter", 91],
  ["Valles Marineris", 84],
  ["Space exploration", 95],
  ["Feature article", 97],
  ["March 2017", 90],
];
const SUMS = [
  "ESA's Mars Express marks over a decade in orbit, mapping the Red Planet's surface and probing its atmosphere from above.",
  "Still going strong: Mars Express has spent more than ten years circling Mars, sending home stunning views of canyons, craters and ice.",
  "An overview of the Mars Express mission: ESA's long-running orbiter, its instruments, and its key findings on the Martian surface and climate.",
];
const TONES = ["Neutral", "Friendly", "Formal"];
const ALTS: [string, string, number][] = [
  ["Page 8 · hero", "Orbital view of the rust-coloured Martian surface with a deep canyon cutting across it.", 3],
  ["Page 8 · inset", "Artist's rendering of the Mars Express orbiter with its solar panels extended above the planet.", 6],
  ["Page 8 · caption image", "ESA mission logo in white on a dark blue background.", 9],
];
const BOXES: [string, string, string, string, string][] = [
  ["6%", "5%", "88%", "38%", "IMAGE"],
  ["8%", "46%", "84%", "10%", "HEADLINE"],
  ["8%", "58%", "84%", "34%", "BODY TEXT"],
  ["8%", "93%", "40%", "4%", "CAPTION"],
];

type Phase = "idle" | "scan" | "tags" | "sum" | "alt" | "done";
type State = {
  phase: Phase;
  step: number;
  chars: number;
  tick: number;
  tone: number;
  /** Tone changes retype the summary on a faster 60ms clock and skip the alt-text step. */
  quick: boolean;
  rejected: Record<number, boolean>;
  accepted: Record<number, boolean>;
};
type Action =
  | { type: "start"; instant: boolean }
  | { type: "tick" }
  | { type: "tone"; index: number; instant: boolean }
  | { type: "reject"; index: number }
  | { type: "accept"; index: number };

const INITIAL: State = { phase: "idle", step: 0, chars: 0, tick: 0, tone: 0, quick: false, rejected: {}, accepted: {} };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "start":
      return { ...INITIAL, tone: s.tone, phase: a.instant ? "done" : "scan" };
    case "tone":
      if (s.phase === "idle") return s;
      return { ...s, tone: a.index, phase: a.instant ? "done" : "sum", chars: 0, quick: !a.instant };
    case "reject":
      return { ...s, rejected: { ...s.rejected, [a.index]: !s.rejected[a.index] } };
    case "accept":
      return { ...s, accepted: { ...s.accepted, [a.index]: !s.accepted[a.index] } };
    case "tick": {
      const tick = s.tick + 1;
      if (!s.quick && tick === 6) return { ...s, tick, phase: "tags", step: 0 };
      if (s.phase === "tags") {
        return s.step < TAGS.length ? { ...s, tick, step: s.step + 1 } : { ...s, tick, phase: "sum", chars: 0 };
      }
      if (s.phase === "sum") {
        const full = SUMS[s.tone].length;
        if (s.chars < full) return { ...s, tick, chars: Math.min(full, s.chars + 3) };
        return s.quick ? { ...s, tick, phase: "done" } : { ...s, tick, phase: "alt", step: 0 };
      }
      if (s.phase === "alt") {
        return s.step < ALTS.length ? { ...s, tick, step: s.step + 1 } : { ...s, tick, phase: "done" };
      }
      return { ...s, tick };
    }
  }
}

const STATUS: Record<Phase, string> = {
  idle: "page-08.pdf · 2.4 MB",
  scan: "Reading layout, text and images…",
  tags: "Tagging…",
  sum: "Writing summary…",
  alt: "Describing images…",
  done: "Done in 4.1s · ready for review",
};

const ORDER: Phase[] = ["tags", "sum", "alt", "done"];

function ResultCard({ icon, title, meta, children }: { icon: IconName; title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[22px]">
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-violet-100 text-violet-700">
          <Icon name={icon} size={16} />
        </span>
        <h3 className="m-0 text-body font-bold text-navy-800">{title}</h3>
        <span className="ml-auto text-xs text-gray-500">{meta}</span>
      </div>
      {children}
    </div>
  );
}

const MINI =
  "cursor-pointer rounded-sm border px-2.5 py-[5px] text-xs font-semibold transition-[background-color,border-color,color] duration-200";

/** Live AI demo (prototype L797–820): scan → tags → typed summary → alt text, driven by one interval. */
export function AiDemo() {
  const [s, dispatch] = useReducer(reducer, INITIAL);
  const reduced = usePrefersReducedMotion();
  const toast = useToast();
  const running = s.phase === "scan" || s.phase === "tags" || s.phase === "sum" || s.phase === "alt";

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => dispatch({ type: "tick" }), s.quick ? 60 : 110);
    return () => clearInterval(id);
  }, [running, s.quick]);

  const idle = s.phase === "idle";
  const idx = ORDER.indexOf(s.phase);
  const tagsN = s.phase === "tags" ? s.step : idx > 0 ? TAGS.length : 0;
  const altN = s.phase === "alt" ? s.step : s.phase === "done" ? ALTS.length : 0;
  const sumFull = SUMS[s.tone];
  const sumChars = s.phase === "sum" ? s.chars : idx > 1 ? sumFull.length : 0;
  const accepted = Object.values(s.accepted).filter(Boolean).length;
  const kept = tagsN - Object.values(s.rejected).filter(Boolean).length;
  const allAccepted = altN > 0 && accepted === ALTS.length;
  const runLabel = idle ? "▶ Run on this page" : s.phase === "done" ? "↻ Run again" : "Working…";

  return (
    <>
      <SectionHeader
        eyebrow="LIVE DEMO"
        title="Drop a page in. Watch what comes back."
        action={
          <Button
            variant="primary"
            size="md"
            onClick={() => dispatch({ type: "start", instant: reduced })}
          >
            {runLabel}
          </Button>
        }
      />
      <Reveal className="grid items-start gap-6 grid-cols-[minmax(min(260px,100%),.9fr)_minmax(0,1.4fr)] max-[900px]:grid-cols-1">
        <div className="relative flex justify-center rounded-lg bg-slate-100 p-6 pb-9">
          <div
            role="img"
            aria-label="Sample magazine page, page 8 of the Mars Express feature"
            className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-sm bg-white bg-cover bg-top shadow-panel"
            style={{ backgroundImage: `url(${JSON.stringify(SAMPLE_PAGES.page8)})` }}
          >
            {s.phase === "scan" && (
              <span aria-hidden="true" className={`fas-motion ${styles.scan} absolute inset-0`} style={{ background: "linear-gradient(0deg, rgba(167,139,250,.15), transparent 40%)" }}>
                {/* #a78bfa: scan-line violet has no token */}
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#a78bfa]" style={{ boxShadow: "0 0 18px 4px rgba(167,139,250,.7)" }} />
              </span>
            )}
            {!idle &&
              s.phase !== "scan" &&
              BOXES.map(([x, y, w, h, label], i) => (
                <div
                  key={label}
                  aria-hidden="true"
                  className={`fas-motion ${styles.box} absolute rounded-sm border-2 border-violet-600`}
                  style={{ left: x, top: y, width: w, height: h, background: "rgba(124,58,237,.08)", animationDelay: `${i * 0.12}s` }}
                >
                  <span className="absolute -top-2.5 left-1.5 rounded-sm bg-violet-600 px-1.5 py-px text-[9.5px] font-bold tracking-[.06em] text-white">
                    {label}
                  </span>
                </div>
              ))}
          </div>
          <span role="status" className="absolute bottom-2.5 left-6 text-xs text-gray-500">
            {STATUS[s.phase]}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <ResultCard icon="tag" title="Auto-tagging" meta={tagsN ? `${kept} of ${tagsN} kept` : ""}>
            <div className="flex min-h-[30px] flex-wrap gap-1.5">
              {TAGS.slice(0, tagsN).map(([name, conf], i) => {
                const rej = !!s.rejected[i];
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={!rej}
                    aria-label={`${name}, ${conf}% confidence${rej ? ", rejected" : ""}`}
                    onClick={() => dispatch({ type: "reject", index: i })}
                    className={`fas-motion ${styles.tag} flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-[5px] text-small font-semibold transition-[background-color,border-color,color] duration-200 ${
                      rej ? "border-gray-200 bg-white text-gray-400" : "border-violet-200 bg-violet-100 text-violet-900"
                    }`}
                  >
                    {name}
                    <span aria-hidden="true" className="text-[10.5px] font-bold opacity-70">
                      {conf}%
                    </span>
                  </button>
                );
              })}
              {idle && <span className="text-label text-gray-400">Tags for topic, section, advertiser and location appear here.</span>}
            </div>
            <span className="text-xs text-gray-500">Click a tag to reject it. Rejections train your workspace&apos;s dictionary.</span>
          </ResultCard>

          <ResultCard icon="pen" title="AI summary & SEO description" meta={sumChars ? `${sumChars} / 155 chars` : ""}>
            <div className="min-h-[66px] rounded-md border border-violet-100 bg-[#faf5ff] px-3.5 py-3 text-sm leading-[1.6] text-gray-700">
              {sumFull.slice(0, sumChars)}
              {s.phase === "sum" && (
                <span aria-hidden="true" className={`${styles.caret} ml-0.5 inline-block h-4 w-0.5 bg-violet-600 align-text-bottom`} />
              )}
              {idle && (
                <span className="text-gray-400">
                  A two-sentence summary for the page and a 155-character meta description, written from the extracted text.
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {TONES.map((name, i) => {
                const on = s.tone === i;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={on}
                    aria-disabled={idle || undefined}
                    onClick={() => !idle && dispatch({ type: "tone", index: i, instant: reduced })}
                    className={`rounded-full border px-[11px] py-1.5 text-small font-semibold transition-[background-color,border-color,color] duration-200 ${
                      idle ? "cursor-default" : "cursor-pointer"
                    } ${on ? "border-violet-600 bg-violet-100 text-violet-900" : "border-gray-200 bg-white text-gray-700"}`}
                  >
                    {name}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => toast(sumChars ? "Meta description set on page 8." : "Run the demo first.")}
                className="ml-auto cursor-pointer rounded-full border border-gray-200 bg-white px-[11px] py-1.5 text-small font-semibold text-gray-700 transition-colors duration-200 hover:border-violet-600"
              >
                Use as meta description
              </button>
            </div>
          </ResultCard>

          <ResultCard
            icon="eye"
            title="Smart alt text"
            meta={
              <Badge tone={allAccepted ? "success" : "gray"} size="sm" className="text-xs!">
                {altN ? `${accepted} / ${altN} images described` : "WCAG 2.2 AA"}
              </Badge>
            }
          >
            <div className="flex min-h-[60px] flex-col gap-2">
              {ALTS.slice(0, altN).map(([where, text, ci], i) => {
                const ok = !!s.accepted[i];
                return (
                  <div key={where} className={`fas-motion ${styles.row} grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-2.5`}>
                    <span
                      aria-hidden="true"
                      className="h-11 w-11 rounded-sm bg-gray-200 bg-cover bg-center"
                      style={{ backgroundImage: `url(${JSON.stringify(COVERS[ci % COVERS.length])})` }}
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-caption text-gray-500">{where}</span>
                      <span className="text-label leading-[1.45] text-gray-700">{text}</span>
                    </div>
                    <button
                      type="button"
                      aria-pressed={ok}
                      onClick={() => dispatch({ type: "accept", index: i })}
                      className={`${MINI} ${ok ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 bg-white text-gray-700"}`}
                    >
                      {ok ? "✓ Accepted" : "Accept"}
                    </button>
                  </div>
                );
              })}
              {idle && (
                <span className="text-label text-gray-400">
                  Every image and ad gets a description for screen readers and search. Decorative images are skipped.
                </span>
              )}
            </div>
          </ResultCard>
        </div>
      </Reveal>
    </>
  );
}
