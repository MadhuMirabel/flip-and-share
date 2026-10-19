import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { SOCIAL_DETAIL } from "@/components/features/detail/social";

export const metadata: Metadata = {
  title: "Social posts",
  description:
    "Turn any page into on-brand images, short clips and captions sized for each network, then schedule them from one place.",
};

/** Social posts (design/FlipAndShare Prototype.dc.html L1934–2030, data L3289 / L3369). */
export default function SocialPage() {
  return <FeatureDetailPage d={SOCIAL_DETAIL} />;
}
