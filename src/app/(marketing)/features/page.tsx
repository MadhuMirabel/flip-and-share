import type { Metadata } from "next";
import Link from "next/link";
import { INTEGRATION_PILLS } from "@/components/cards/integrations-data";
import { IntegrationPill } from "@/components/cards/IntegrationCard";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { FeatureShowcase } from "@/components/features/FeatureShowcase";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "All features",
  description:
    "Everything to publish, share and sell your content: flipbooks, fullscreen sharing, embeds, lead forms, access control, SEO article mode, QR codes, analytics and digital sales.",
};

/** All features, the prototype's `isFeatures` screen (design/FlipAndShare Prototype.dc.html L1818–1886). */
export default function FeaturesPage() {
  return (
    <>
      <PageHero
        glow={HERO_GLOW.features}
        eyebrow="FEATURES"
        eyebrowColor={HERO_ACCENT.features}
        title="Everything to publish, share and sell your content."
        lead="One place for every title. Share it anywhere, decide who can read it, and turn pages into revenue."
        padding="roomy"
      >
        <div className="flex flex-wrap gap-2.5">
          <Button href="/signup" size="lg">
            Create for Free
          </Button>
          <Button href="/pricing" variant="onDark" size="lg">
            See plans
          </Button>
        </div>
      </PageHero>

      <FeatureShowcase />
      <FeatureGrid />

      <section aria-labelledby="fx-tools-title" className="mx-auto flex max-w-page flex-col gap-6 px-8 py-[88px] max-sm:px-5">
        <div className="flex flex-col gap-3">
          <Eyebrow>WORKS WITH YOUR TOOLS</Eyebrow>
          <h2 id="fx-tools-title" className="m-0 text-[clamp(24px,3vw,30px)] font-bold tracking-[-.025em] text-navy-800">
            Design where you like. Publish here.
          </h2>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {INTEGRATION_PILLS.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={i * 0.05}>
                <IntegrationPill {...p} />
              </Reveal>
            </li>
          ))}
        </ul>
        <Link href="/integrations" className="self-start text-label font-semibold text-blue-600 hover:text-blue-700">
          Browse all integrations →
        </Link>
      </section>

      <ClosingCtaBanner
        art="features"
        title="Try every feature on the free plan."
        subtitle="Upload one PDF. No credit card."
        titleSize="fluid"
        sectionPadding="spaced"
      />
    </>
  );
}
