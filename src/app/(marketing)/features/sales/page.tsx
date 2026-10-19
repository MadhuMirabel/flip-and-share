import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { SALES_DETAIL } from "@/components/features/detail/sales";

export const metadata: Metadata = {
  title: "Digital sales",
  description:
    "Sell single issues and subscriptions, or tag products on the page so readers can buy without leaving. Revenue is attributed to the page and advertiser.",
};

/** Digital sales (design/FlipAndShare Prototype.dc.html L1934–2030, data L3293 / L3367). */
export default function SalesPage() {
  return <FeatureDetailPage d={SALES_DETAIL} />;
}
