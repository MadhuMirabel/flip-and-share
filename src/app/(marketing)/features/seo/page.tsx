import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { SEO_DETAIL } from "@/components/features/detail/seo";

export const metadata: Metadata = {
  title: "Article mode and SEO",
  description:
    "Every page also exists as real text with headings and alt text, so search engines and AI assistants can index it and screen readers can read it.",
};

/** Article mode and SEO (design/FlipAndShare Prototype.dc.html L1934–2030, data L3294 / L3368). */
export default function SeoPage() {
  return <FeatureDetailPage d={SEO_DETAIL} />;
}
