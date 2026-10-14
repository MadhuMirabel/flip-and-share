"use client";

import { useState } from "react";
import { HERO_ACCENT, HERO_GLOW, HERO_PATTERN, PageHero } from "@/components/sections/PageHero";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { PANELS } from "./AnalyticsPanels";
import { DASH_TABS, type DashKey } from "./dashData";

const chip = "rounded-md border border-gray-200 bg-white px-3 py-[7px]";

/** Analytics hero with the four-tab switch, and the dashboard it drives (prototype `dbTab`). */
export function AnalyticsExperience() {
  const [tab, setTab] = useState<DashKey>("pub");
  const Panel = PANELS[tab];
  const label = DASH_TABS.find((t) => t.value === tab)?.label;

  return (
    <>
      <PageHero
        glow={HERO_GLOW.analytics}
        pattern={HERO_PATTERN.analytics}
        eyebrow="ANALYTICS"
        eyebrowColor={HERO_ACCENT.analytics}
        title="Every number your publication makes, in four tabs."
        lead="Publishing output, who is reading right now, which hotspots earn clicks, and what the ads paid. One set of filters, one export, no spreadsheets."
      >
        <SegmentedControl
          tone="dark"
          semantics="tabs"
          label="Dashboard view"
          value={tab}
          onChange={(v) => setTab(v as DashKey)}
          options={DASH_TABS.map((t) => ({ value: t.value, label: t.label, icon: t.icon, controls: "analytics-panel" }))}
          className="mt-2.5 self-start"
        />
      </PageHero>

      <section aria-labelledby="dash-title" className="bg-slate-50 px-8 pt-8 pb-[72px] max-sm:px-5">
        <div className="mx-auto flex max-w-page flex-col gap-[18px]">
          <h2 id="dash-title" className="sr-only">
            Analytics dashboard
          </h2>
          <div className="flex flex-wrap items-center gap-2.5 text-label text-gray-700">
            <span className={chip}>Last 12 months</span>
            <span className={chip}>All products</span>
            <span className={chip}>All issues</span>
            <span className="ml-auto text-gray-500 max-[760px]:ml-0">Export: Excel · CSV · PDF · Google Drive</span>
          </div>
          <div
            key={tab}
            id="analytics-panel"
            role="tabpanel"
            aria-label={label}
            className="flex flex-col gap-[18px]"
            style={{ animation: "fasFade .6s cubic-bezier(.22,1,.36,1) both" }}
          >
            <Panel />
          </div>
        </div>
      </section>
    </>
  );
}
