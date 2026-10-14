"use client";

import { useState, type KeyboardEvent } from "react";
import { SelectableCard } from "@/components/cards/FeatureCard";
import { usePrefersReducedMotion } from "@/components/ui/Reveal";
import { rovingIndex } from "@/components/ui/roving";
import { FEATURE_SCENES } from "./FeatureScenes";
import { SHOWCASE_TABS } from "./data";

/** Seconds each tab stays up before the next one takes over. */
const DWELL = 7;

/**
 * Four-tab product showcase (prototype `data-fxgrid`, L1834–1861): side tabs + a looping scene.
 * Advances itself on a progress bar; picking a tab restarts the bar, hover/focus pauses it,
 * and reduced-motion users get no auto-advance.
 */
export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) document.getElementById(`fx-tab-${i}`)?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const next = rovingIndex(e, i, SHOWCASE_TABS.length);
    if (next !== null) select(next, true);
  };

  const Scene = FEATURE_SCENES[active];

  return (
    <section aria-label="What you can do with FlipAndShare" className="mx-auto max-w-page px-8 pt-[72px] max-sm:px-5">
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-stretch gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div role="tablist" aria-label="Feature groups" aria-orientation="vertical" className="flex flex-col gap-1.5 self-center">
          {SHOWCASE_TABS.map((t, i) => (
            <SelectableCard
              key={t.title}
              variant="tab"
              role="tab"
              id={`fx-tab-${i}`}
              aria-selected={active === i}
              aria-controls="fx-panel"
              tabIndex={active === i ? 0 : -1}
              icon={t.icon}
              title={t.title}
              description={t.description}
              selected={active === i}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            />
          ))}
        </div>

        <div
          id="fx-panel"
          role="tabpanel"
          aria-labelledby={`fx-tab-${active}`}
          className="relative overflow-hidden rounded-lg border border-blue-100 bg-white"
        >
          <Scene key={active} />
          {!reduced && (
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-blue-100">
              <span
                key={active}
                className="block h-full bg-blue-500"
                style={{
                  animation: `fasProgress ${DWELL}s linear forwards`,
                  animationPlayState: paused ? "paused" : "running",
                }}
                onAnimationEnd={() => select((active + 1) % SHOWCASE_TABS.length)}
              />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
