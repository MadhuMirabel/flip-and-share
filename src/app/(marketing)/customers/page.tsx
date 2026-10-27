import type { Metadata } from "next";
import { CaseStudies } from "@/components/customers/CaseStudies";
import { RoiCalculator } from "@/components/customers/RoiCalculator";
import { HERO_STATS, LEVERS, LOGOS } from "@/components/customers/data";
import { IconTile } from "@/components/ui/IconTile";
import { HERO_ACCENT, HERO_GLOW, HERO_PATTERN, PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StatTile } from "@/components/ui/Stat";
import { COVERS } from "@/lib/covers";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "What changed for publishers who moved to FlipAndShare: more digital ad revenue, more reads per issue and days saved from proof to live.",
};

/** Customers (design/FlipAndShare Prototype.dc.html L2397–2490, data L3114 / L3765). */
export default function CustomersPage() {
  return (
    <>
      <PageHero
        glow={HERO_GLOW.customers}
        eyebrow="CUSTOMERS"
        eyebrowColor={HERO_ACCENT.customers}
        pattern={HERO_PATTERN.customers}
        covers={COVERS}
        title="What changed for publishers who moved."
        lead="Regional magazines, catalog retailers, associations and agencies. The numbers below are from the first two issues after switching, compared with the two before."
        titleSize="lg"
        leadLeading="tight"
        gap={18}
      >
        <div className="mt-2.5 grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
          {HERO_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex">
              <StatTile
                variant="hero"
                size="lg"
                className="w-full"
                value={<CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                label={s.label}
              />
            </Reveal>
          ))}
        </div>
        <p className="m-0 text-small text-blue-300">
          Median across customers with at least four issues published. Illustrative figures pending customer sign-off.
        </p>
      </PageHero>

      <Section padding="lg" labelledBy="stories-title">
        <h2 id="stories-title" className="sr-only">
          Customer stories
        </h2>
        <CaseStudies />
      </Section>

      <Section tone="tinted" padding="lg" labelledBy="levers-title" gap={28}>
        <SectionHeader eyebrow="WHERE THE MONEY COMES FROM" title="Four ways a digital edition pays for itself." id="levers-title" />
        <div className="grid grid-cols-4 gap-[18px] max-[1000px]:grid-cols-2 max-sm:grid-cols-1">
          {LEVERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08} className="flex">
              <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[22px]">
                <IconTile name={l.icon} size={42} />
                <h3 className="m-0 text-base font-bold text-navy-800">{l.name}</h3>
                <p className="m-0 text-menu leading-[1.55] text-gray-600">{l.desc}</p>
                <span className="mt-auto text-label font-bold text-green-600">{l.stat}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <RoiCalculator />

      <Section tone="tinted" padding="none" paddingClassName="pt-16 pb-20" labelledBy="logos-title">
        <div className="flex flex-col items-center gap-5">
          <Eyebrow as="h2" className="text-center" >
            <span id="logos-title">PUBLISHING WITH FLIPANDSHARE</span>
          </Eyebrow>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-x-7 gap-y-3 p-0">
            {LOGOS.map((l) => (
              <li key={l} className="px-1 py-2 text-body font-bold tracking-[-0.01em] text-gray-400">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
