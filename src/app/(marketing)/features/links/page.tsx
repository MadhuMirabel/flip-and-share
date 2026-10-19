import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { LINKS_DETAIL } from "@/components/features/detail/links";

export const metadata: Metadata = {
  title: "Links, video and hotspots",
  description:
    "Add web links, page jumps, video, audio, pop-ups and buy buttons anywhere on the page. Auto-detect finds URLs, emails and phone numbers for you.",
};

/** Links, video and hotspots (design/FlipAndShare Prototype.dc.html L1934–2030, data L3290 / L3364). */
export default function LinksPage() {
  return <FeatureDetailPage d={LINKS_DETAIL} />;
}
