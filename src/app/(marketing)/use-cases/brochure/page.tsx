import type { Metadata } from "next";
import { BROCHURE_DETAIL } from "@/components/use-cases/brochure";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Brochure",
  description:
    "Publish the brochure to a readable, indexable URL. Add a form, video and links on the pages that matter. See who read page 6 and who asked for a quote.",
};

/** Brochure (design/FlipAndShare Prototype.dc.html data L3352). */
export default function BrochurePage() {
  return <UseCaseDetailPage d={BROCHURE_DETAIL} />;
}
