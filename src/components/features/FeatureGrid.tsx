"use client";

import { useState } from "react";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURE_CATEGORIES, FEATURE_ITEMS } from "./data";

/** "All features" grid with category filter chips (prototype L1876–1880). */
export function FeatureGrid() {
  const [cat, setCat] = useState<string>("All");
  const items = FEATURE_ITEMS.filter((f) => cat === "All" || f.category === cat);

  return (
    <section aria-labelledby="fx-all-title" className="mx-auto flex max-w-page flex-col gap-7 px-8 pt-[88px] max-sm:px-5">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow>ALL FEATURES</Eyebrow>
          <h2 id="fx-all-title" className="m-0 text-[clamp(26px,3.4vw,34px)] font-bold leading-[1.15] tracking-[-.025em] text-navy-800">
            From upload to revenue, in one tool.
          </h2>
        </div>
        <ChipGroup
          label="Filter features by category"
          tone="navy"
          size="md"
          items={FEATURE_CATEGORIES.map((c) => ({ value: c, label: c }))}
          value={cat}
          onChange={setCat}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-4" aria-live="polite">
        {items.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.04} className="flex">
            <FeatureCard
              className="w-full"
              icon={f.icon}
              title={f.title}
              description={f.description}
              category={f.category}
              linkLabel={f.linkLabel}
              href={f.href}
              hover="lift"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
