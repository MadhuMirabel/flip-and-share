import type { Metadata } from "next";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { AppPlanCards } from "@/components/platform/mobile/AppPlanCards";
import { MobileHeroPhones } from "@/components/platform/mobile/MobileHeroPhones";
import { OfflineLibraryDemo } from "@/components/platform/mobile/OfflineLibraryDemo";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StoreBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "Mobile app & offline reading",
  description:
    "A branded iOS and Android app for your titles, or your issues inside the FlipAndShare reader app. Readers download once, read offline, and every page turn is counted when they are back online.",
};

/* Prototype `mbFeat`. */
const FEATURES = [
  { icon: "send", title: "New-issue push", description: "Followers get a notification the minute you publish. Opens are counted against the issue." },
  {
    icon: "lock",
    title: "Subscriptions and paywall",
    description: "Free, metered, or subscriber-only issues. Apple and Google billing, or your existing subscriber list.",
  },
  { icon: "chart", title: "Same analytics", description: "App reads, offline reads and web reads land in one dashboard, split by platform." },
] as const;

/** Mobile app tour, the prototype's "Mobile app" screen (design/FlipAndShare Prototype.dc.html L685–761). */
export default function MobilePage() {
  return (
    <>
      <SubNav />
      <PageHero
        glow={HERO_GLOW.mobile}
        eyebrow="MOBILE APP & OFFLINE"
        eyebrowColor={HERO_ACCENT.mobile}
        title="Your publication in their pocket, signal or not."
        lead="A branded iOS and Android app for your titles, or your issues inside the FlipAndShare reader app. Readers download an issue once and read it on the plane, the train, or the beach. Every page turn is still counted when they're back online."
        layout="split"
        splitMinCol={440}
        splitAlign="end"
        padding="flush"
        gap={18}
        leadMaxWidth={560}
        aside={<MobileHeroPhones />}
      >
        <div className="flex flex-col gap-[18px] pb-16">
          <div className="flex flex-wrap items-center gap-2.5">
            <Button href="/signup">Create for Free</Button>
            <Button href="/pricing" variant="onDark">
              Branded app pricing
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <StoreBadge store="app-store" />
            <StoreBadge store="google-play" />
            <StoreBadge store="web" />
          </div>
        </div>
      </PageHero>

      <OfflineLibraryDemo />
      <AppPlanCards />

      <section aria-labelledby="push-title" className="mx-auto box-border w-full max-w-page px-8 py-20 max-sm:px-5">
        <div className="flex flex-col gap-7">
          <SectionHeader id="push-title" eyebrow="PUSH & SUBSCRIPTIONS" title="The new issue arrives before they think to look." />
          <div className="grid grid-cols-3 gap-5 max-[760px]:grid-cols-1">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1} className="flex">
                <FeatureCard icon={f.icon} tone="mint" title={f.title} description={f.description} className="w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCtaBanner
        art="mobile"
        title="Publish once. It's in the reader app the same minute."
        subtitle="Every published issue appears in the FlipAndShare app automatically. Branded apps on Business."
        maxWidth={1200}
        sectionPadding="flush"
      />
    </>
  );
}
