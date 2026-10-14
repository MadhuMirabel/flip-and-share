import type { Metadata } from "next";
import { AnalyticsShowcase } from "@/components/home/AnalyticsShowcase";
import { BeforeAfterSlider } from "@/components/home/BeforeAfter";
import { CinematicPipeline } from "@/components/home/CinematicPipeline";
import { ConvertStrip } from "@/components/home/ConvertStrip";
import { ExamplesTimeline } from "@/components/home/ExamplesTimeline";
import { FinalCta } from "@/components/home/FinalCta";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/Hero";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { ReaderJourney } from "@/components/home/ReaderJourney";
import { SeoSection } from "@/components/home/SeoSection";
import { TeamSection } from "@/components/home/TeamSection";
import { TrustStats } from "@/components/home/TrustStats";
import { UniqueFeatures } from "@/components/home/UniqueFeatures";

export const metadata: Metadata = {
  title: "Interactive Digital Publishing Platform",
  description:
    "Turn PDF magazines, catalogs and brochures into interactive digital publications with video, links, lead forms, QR codes, shoppable ads and reader analytics.",
  openGraph: {
    title: "Interactive Digital Publishing Platform | FlipAndShare",
    description:
      "Create, publish and measure interactive digital editions from the PDFs you already have.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Digital Publishing Platform | FlipAndShare",
    description:
      "Create, publish and measure interactive digital editions from the PDFs you already have.",
  },
};

/** Section order follows the prototype's Homepage screen (design/FlipAndShare Prototype.dc.html L57–382). */
export default function HomePage() {
  return (
    <>
      <HomeHero>
        <CinematicPipeline />
      </HomeHero>
      <TrustStats />
      <BeforeAfterSlider />
      <UniqueFeatures />
      <ConvertStrip />
      <ExamplesTimeline />
      <AnalyticsShowcase />
      <TeamSection />
      <SeoSection />
      <ReaderJourney />
      <PricingTeaser />
      <HomeFaq />
      <FinalCta />
    </>
  );
}