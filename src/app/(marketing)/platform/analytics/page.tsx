import type { Metadata } from "next";
import { AnalyticsExperience } from "@/components/platform/analytics/AnalyticsExperience";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Publishing output, who is reading right now, which hotspots earn clicks and what the ads paid: every number your publication makes, in four dashboard tabs.",
};

/** Analytics tour, the prototype's "Analytics" screen (design/FlipAndShare Prototype.dc.html L592–680). */
export default function AnalyticsPage() {
  return (
    <>
      <SubNav />
      <AnalyticsExperience />
      <ClosingCtaBanner
        art="analytics"
        title="See these numbers for your own issue."
        subtitle="Free account, no credit card. Analytics start with your first reader."
        maxWidth={1200}
        sectionPadding="flush"
        background="slate"
      />
    </>
  );
}
