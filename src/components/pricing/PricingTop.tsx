"use client";

import Link from "next/link";
import { useState } from "react";
import { PricingTierCard, PricingTierGrid, type TierState } from "@/components/cards/PricingTierCard";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { BillingToggle, type BillingCycle } from "@/components/ui/BillingToggle";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Container } from "@/components/ui/Container";
import { RangeField } from "@/components/ui/RangeField";
import { Reveal } from "@/components/ui/Reveal";
import {
  DEFAULT_ROLE,
  PRICES,
  ROI_DEFAULT,
  ROLES,
  TIERS,
  TRUST_ITEMS,
  formatUsd,
  roi,
  type RoiInput,
} from "@/components/pricing/data";

const inlineLink = "text-inherit underline decoration-white/35 underline-offset-[3px] hover:text-white";

/** Hero + role/billing controls, the four plan cards, the trust row and the ROI calculator share one state. */
export function PricingTop() {
  const [role, setRole] = useState(DEFAULT_ROLE);
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [input, setInput] = useState<RoiInput>(ROI_DEFAULT);

  const annual = billing === "annual";
  const recommended = ROLES[role].recommended;
  const calc = roi(input, recommended);
  const set = (key: keyof RoiInput) => (value: number) => setInput((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <PageHero
        glow={HERO_GLOW.pricing}
        eyebrow="PRICING"
        eyebrowColor={HERO_ACCENT.pricing}
        title="Start free. Upgrade when your readers do."
        lead={
          <>
            Every plan includes unlimited readers,{" "}
            <Link href="/features/seo" className={inlineLink}>
              SEO article mode
            </Link>{" "}
            and{" "}
            <Link href="/platform/analytics" className={inlineLink}>
              analytics
            </Link>
            . Change or cancel any time. Prices shown are illustrative.
          </>
        }
        layout="center"
        padding="overlap"
        gap={18}
        leadMaxWidth={600}
      >
        <div className="relative mt-2 flex flex-col items-center gap-3.5">
          <div className="flex flex-col items-center gap-2">
            <span id="pricing-role" className="text-xs font-semibold text-blue-300">
              I am a…
            </span>
            <ChipGroup
              label="I am a…"
              tone="darkGlass"
              size="xl"
              className="justify-center"
              items={ROLES.map((r, i) => ({ value: String(i), label: r.label }))}
              value={String(role)}
              onChange={(v) => setRole(Number(v))}
            />
          </div>
          <BillingToggle value={billing} onChange={setBilling} />
        </div>
      </PageHero>

      <section aria-label="Plans" className="relative z-[1] -mt-24">
        <Container>
          <PricingTierGrid>
            {TIERS.map((t, i) => {
              const [yearly, monthly] = PRICES[i];
              const perMonth = annual ? yearly : monthly;
              const state: TierState = recommended === i ? "recommended" : t.highlighted ? "highlighted" : "normal";
              return (
                <Reveal key={t.name} delay={i * 0.08}>
                  <PricingTierCard
                    name={t.name}
                    bestFor={t.best}
                    price={i === 0 ? "$0" : `$${perMonth}`}
                    unit={i === 0 ? undefined : "/mo"}
                    note={i === 0 ? t.note : annual ? `Billed yearly · $${yearly * 12}/yr` : "Billed monthly"}
                    state={state}
                    ctaLabel={t.cta}
                    ctaHref={t.ctaHref}
                    subCaption={t.sub.replace("{price}", `$${perMonth}`)}
                    includedLabel={t.includedLabel}
                    features={t.features}
                  />
                </Reveal>
              );
            })}
          </PricingTierGrid>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-x-[22px] gap-y-2 p-0 pb-2 pt-[22px] text-label text-gray-500">
            {TRUST_ITEMS.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="roi-title" className="mx-auto max-w-page px-8 pb-[72px] pt-10 max-sm:px-5">
        <Reveal>
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-8 overflow-hidden rounded-lg bg-navy-800 px-11 py-10 text-white max-sm:p-6">
            <span
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.35),transparent_70%)]"
            />
            <div className="relative flex flex-col gap-3.5">
              <span className="font-mono text-eyebrow font-semibold uppercase tracking-eyebrow text-blue-300">
                Does it pay for itself?
              </span>
              <h2 id="roi-title" className="m-0 text-[clamp(26px,3.2vw,34px)] font-bold leading-[1.15] tracking-[-.025em]">
                One digital add-on per issue usually covers the whole year.
              </h2>
              <p className="m-0 text-body leading-[1.6] text-blue-200">
                Publishers on FlipAndShare sell the click report as a digital add-on to print ads. Move the sliders to
                your numbers.
              </p>
              <div className="mt-1 flex flex-col gap-3.5">
                <RangeField tone="dark" label="Issues per year" min={1} max={52} value={input.issues} onChange={set("issues")} />
                <RangeField tone="dark" label="Ad pages per issue" min={1} max={60} value={input.ads} onChange={set("ads")} />
                <RangeField
                  tone="dark"
                  label="Digital add-on per ad"
                  min={25}
                  max={500}
                  step={25}
                  value={input.addon}
                  onChange={set("addon")}
                  format={(v) => formatUsd(v)}
                />
              </div>
            </div>

            <div className="relative flex flex-col gap-3" aria-live="polite">
              <div className="flex flex-col gap-3.5 rounded-lg border border-white/[.14] bg-white/[.08] px-[22px] py-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-label text-blue-200">Add-on revenue per year</span>
                  <span className="text-[32px] font-bold tabular-nums tracking-[-.03em] transition-all duration-300">
                    {calc.revenue}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-label text-blue-200">{calc.planName} plan per year</span>
                  <span className="text-lg font-semibold tabular-nums">{calc.cost}</span>
                </div>
                <div aria-hidden="true" className="relative h-2.5 overflow-hidden rounded-full bg-white/[.12]">
                  <span
                    className="absolute inset-y-0 left-0 bg-amber-500"
                    style={{ width: `${calc.costW.toFixed(1)}%`, transition: "width .5s cubic-bezier(.2,.8,.2,1)" }}
                  />
                  <span
                    className="absolute inset-y-0 bg-green-500"
                    style={{
                      left: `${calc.costW.toFixed(1)}%`,
                      width: `${calc.gainW.toFixed(1)}%`,
                      transition: "all .5s cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                </div>
                <div className="flex gap-3.5 text-caption text-blue-200">
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-2 w-2 rounded-sm bg-amber-500" />
                    Plan cost
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-2 w-2 rounded-sm bg-green-500" />
                    Kept by you
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 rounded-lg bg-white px-5 py-4 text-navy-800">
                <span className="whitespace-nowrap text-[34px] font-bold tabular-nums tracking-[-.03em] text-green-600">
                  {calc.multiple}
                </span>
                <span className="text-sm leading-[1.45]">{calc.verdict}</span>
              </div>
              <span className="text-caption leading-normal text-blue-300">
                Estimate only. Uses the plan recommended for your selection above. Add-on rates vary by market.
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
