"use client";

import { FakeCursor } from "@/components/scene/FakeCursor";
import { Section } from "@/components/sections/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardScreen } from "./reader/dashboard";
import { CaptionPill, LibraryScreen, PhoneScreen, ReaderScreen, SiteChrome } from "./reader/screens";
import { STATES, STEPS, urlFor } from "./reader/timeline";
import { useReaderJourney } from "./reader/useReaderJourney";

const SUMMARY =
  "Animated demo of the reader journey on a tablet: pick an issue, swipe the pages, scan a QR code on page 3 with a phone, shop a grocery ad through to a pickup order, then see the numbers in a publisher dashboard.";

/** Dark "reader's side" section: five steps on the left, a scripted iPad demo on the right. */
export function ReaderJourney() {
  const { k, playing, reduced, stageRef, goToStep, toggle, onPointerEnter, onPointerLeave } = useReaderJourney();
  const r = STATES[k];
  const step = r.step ?? 0;
  const hand = r.hand ?? [72, 84];
  const showLib = r.cover == null && !r.dash;
  const showReader = r.cover != null && !r.dash;

  const status = reduced
    ? "Autoplay is off · click any step to go through it manually"
    : playing
      ? "Auto-playing · hover the tablet to pause"
      : "Paused · click any step to go through it manually";

  return (
    <Section id="reader-demo" tone="dark" padding="xl" labelledBy="reader-demo-title" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse,rgba(14,165,233,.22),transparent 65%)" }}
      />
      <div className="relative grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12 max-[820px]:grid-cols-1 max-[820px]:gap-7">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow tone="dark">THE READER&apos;S SIDE</Eyebrow>
          <h2 id="reader-demo-title" className="m-0 text-[clamp(30px,4vw,40px)] leading-[1.1] font-bold tracking-[-0.03em]">
            Pick an issue. Swipe. Scan. Shop. All from one page.
          </h2>
          <p className="m-0 text-base leading-[1.6] text-blue-200">
            This is what your reader does on a tablet, and every step of it lands in your analytics and your advertiser&apos;s report.
          </p>
          <div className="mt-1.5 flex flex-col gap-1.5">
            {STEPS.map(([name, desc], i) => {
              const active = step === i;
              const done = step > i;
              return (
                <button
                  key={name}
                  type="button"
                  aria-current={active ? "step" : undefined}
                  onClick={() => goToStep(i)}
                  className={`grid cursor-pointer grid-cols-[30px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-solid px-3.5 py-3 text-left text-white transition-all duration-300 ${
                    active ? "border-blue-300/60 bg-blue-500/16" : "border-white/10 bg-transparent"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      active ? "bg-blue-500 text-white" : done ? "bg-green-500/25 text-green-300" : "bg-white/10 text-blue-200"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-body font-bold">
                      {name}
                      {done && <span className="sr-only"> (completed)</span>}
                    </span>
                    <span className="text-small leading-[1.4] text-blue-200">{desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-1 flex items-center gap-3.5">
            {!reduced && (
              <button
                type="button"
                onClick={toggle}
                aria-pressed={!playing}
                aria-label="Pause autoplay"
                className="flex cursor-pointer items-center gap-2 rounded-full border border-solid border-white/20 bg-white/10 px-3.5 py-2 text-label font-semibold text-white transition-colors duration-150 hover:bg-white/[.18]"
              >
                {playing ? "❙❙ Pause" : "▶ Play"}
              </button>
            )}
            <span className="text-small text-blue-300">{status}</span>
          </div>
        </div>

        <Reveal className="relative flex justify-center py-5">
          <div
            ref={stageRef}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            className="relative aspect-[4/3] w-full max-w-[560px]"
            style={{ containerType: "inline-size" }}
          >
            {/* Fixed 560x420 design box, scaled to the container width so the demo shrinks instead of reflowing. */}
            <div
              role="img"
              aria-label={SUMMARY}
              className="absolute top-0 left-0 h-[420px] w-[560px] origin-top-left"
              style={{ transform: "scale(tan(atan2(100cqw, 560px)))" }}
            >
              <div className="relative h-full w-full rounded-[26px] bg-gray-900 p-4 shadow-[0_50px_80px_-40px_rgba(0,0,0,.8),inset_0_0_0_2px_var(--color-gray-700)]">
                <span className="absolute top-[7px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1f2937]" />
                <div aria-hidden="true" className="relative h-full w-full overflow-hidden rounded-[14px] bg-slate-900 text-slate-200">
                  <SiteChrome url={urlFor(r)} cart={r.cart ?? 0} />
                  {showLib && <LibraryScreen hover={r.hover} active={r.cover == null} />}
                  {showReader && <ReaderScreen r={r} />}
                  {!!r.dash && <DashboardScreen dash={r.dash} />}
                  {r.phone && <PhoneScreen r={r} scanY={k % 2 ? "62%" : "32%"} />}
                  <FakeCursor x={`${hand[0]}%`} y={`${hand[1]}%`} glyph={r.down ? "grab" : step === 1 ? "hand" : "arrow"} pressed={!!r.down} />
                  <CaptionPill text={r.caption ?? ""} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
