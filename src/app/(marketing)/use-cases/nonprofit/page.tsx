import type { Metadata } from "next";
import { NONPROFIT_DETAIL } from "@/components/use-cases/nonprofit";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Nonprofits & associations",
  description:
    "Publish the member magazine, impact report and event program on one platform. Sponsor click reports, donate buttons on any page and members-only access.",
};

/** Nonprofits & associations (design/FlipAndShare Prototype.dc.html L1163–1205, data L3343). */
export default function NonprofitPage() {
  return <UseCaseDetailPage d={NONPROFIT_DETAIL} />;
}
