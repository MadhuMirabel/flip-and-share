import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { EMBED_DETAIL } from "@/components/features/detail/embed";

export const metadata: Metadata = {
  title: "Embed",
  description:
    "Put the full flipbook reader on any web page with a snippet, a WordPress block or a cover that opens fullscreen. Readers stay on your domain.",
};

/** Embed (design/FlipAndShare Prototype.dc.html L1934–2030, data L3288 / L3363). */
export default function EmbedPage() {
  return <FeatureDetailPage d={EMBED_DETAIL} />;
}
