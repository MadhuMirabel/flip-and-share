import type { Metadata } from "next";
import { PUBLISHERS_DETAIL } from "@/components/use-cases/publishers";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Magazine & news publishers",
  description:
    "The flipbook platform built around the ad sale: a flat plan that knows your booked insertions, advertiser artwork portals and a click report with every renewal.",
};

/** Magazine & news publishers (design/FlipAndShare Prototype.dc.html L1163–1205, data L3341). */
export default function PublishersPage() {
  return <UseCaseDetailPage d={PUBLISHERS_DETAIL} />;
}
