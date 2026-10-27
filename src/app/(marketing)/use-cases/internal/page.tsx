import type { Metadata } from "next";
import { INTERNAL_DETAIL } from "@/components/use-cases/internal";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Internal communications",
  description:
    "Publish the staff magazine, handbook and town-hall recap behind SSO. See who read it, which pages landed, and send the next issue as a push notification.",
};

/** Internal communications (design/FlipAndShare Prototype.dc.html data L3348). */
export default function InternalPage() {
  return <UseCaseDetailPage d={INTERNAL_DETAIL} />;
}
