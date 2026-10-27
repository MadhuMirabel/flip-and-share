import type { Metadata } from "next";
import { TRAVEL_DETAIL } from "@/components/use-cases/travel";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Travel & hospitality",
  description:
    "Publish the visitor guide, hotel brochure and in-room magazine as pages with video, maps and a Book now button. Track which pages drive bookings.",
};

/** Travel & hospitality (design/FlipAndShare Prototype.dc.html data L3346). */
export default function TravelPage() {
  return <UseCaseDetailPage d={TRAVEL_DETAIL} />;
}
