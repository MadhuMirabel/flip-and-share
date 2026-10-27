import type { Metadata } from "next";
import { REALESTATE_DETAIL } from "@/components/use-cases/realestate";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Real estate & property",
  description:
    "Turn the property brochure and listings magazine into pages with walkthrough video, floor-plan pop-ups and an enquiry form on every home.",
};

/** Real estate & property (design/FlipAndShare Prototype.dc.html data L3344). */
export default function RealEstatePage() {
  return <UseCaseDetailPage d={REALESTATE_DETAIL} />;
}
