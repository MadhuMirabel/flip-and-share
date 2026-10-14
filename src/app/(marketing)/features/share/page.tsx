import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { SHARE_DETAIL } from "@/components/features/detail/share";

export const metadata: Metadata = {
  title: "Fullscreen sharing",
  description:
    "One link, every screen. Share a distraction-free reader by link, QR or email that opens instantly on phones, tablets and desktops with no app to install.",
};

/** Fullscreen sharing (design/FlipAndShare Prototype.dc.html L1934–2030, data L3287 / L3362). */
export default function FullscreenSharingPage() {
  return <FeatureDetailPage d={SHARE_DETAIL} />;
}
