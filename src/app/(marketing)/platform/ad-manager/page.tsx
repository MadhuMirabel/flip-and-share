import type { Metadata } from "next";
import Link from "next/link";
import { AdOrdersSection } from "@/components/platform/ad-manager/AdOrdersSection";
import { AdReportsSection } from "@/components/platform/ad-manager/AdReportsSection";
import { AdTargetingSection } from "@/components/platform/ad-manager/AdTargetingSection";
import { AdUnitsSection } from "@/components/platform/ad-manager/AdUnitsSection";
import { ClosingCtaBanner, ctaLinkClass } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, HERO_PATTERN, PageHero } from "@/components/sections/PageHero";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { StatTile } from "@/components/ui/Stat";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "Ad Manager",
  description:
    "Connect Google Ad Manager: the flat plan sends issue, folio and page with every ad request, direct-sold orders show their pace, and reports show which positions earn most.",
};

const STATS = [
  { value: 18240, prefix: "$", label: "direct revenue this month" },
  { value: 92, suffix: "%", label: "fill rate" },
  { value: 14, label: "ad units linked" },
  { value: 11.4, prefix: "$", label: "top eCPM, cover" },
];

/** Ad Manager platform page, the prototype's `isAdmgr` screen (design/FlipAndShare Prototype.dc.html L1007-1079). */
export default function AdManagerPage() {
  return (
    <>
      <SubNav />
      <PageHero
        glow={HERO_GLOW.admgr}
        pattern={HERO_PATTERN.admgr}
        eyebrow="AD MANAGER"
        eyebrowColor={HERO_ACCENT.admgr}
        title="Sell the digital edition like the print one."
        lead="Connect Google Ad Manager. The flat plan sends issue, folio and page with every ad request, direct-sold orders show their pace, and reports tell you which positions earn the most."
      >
        <div className="mt-2 flex flex-wrap gap-2.5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <StatTile
                variant="hero"
                className="min-w-[140px]"
                value={<CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                label={s.label}
              />
            </Reveal>
          ))}
        </div>
      </PageHero>

      <AdUnitsSection />
      <AdOrdersSection />
      <AdTargetingSection />
      <AdReportsSection />

      <ClosingCtaBanner
        art="admgr"
        title="Bring the digital edition into the ad plan."
        subtitle={
          <>
            Ad Manager is included on{" "}
            <Link href="/pricing" className={ctaLinkClass}>
              Professional and Business
            </Link>
            . Illustrative figures.
          </>
        }
      />
    </>
  );
}
