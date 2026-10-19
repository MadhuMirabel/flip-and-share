import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { ACCESS_DETAIL } from "@/components/features/detail/access";

export const metadata: Metadata = {
  title: "Access control",
  description:
    "Public, unlisted, password-protected or subscribers only. Set a preview limit, allow or block downloads, and expire links on a date.",
};

/** Access control (design/FlipAndShare Prototype.dc.html L1934–2030, data L3291 / L3365). */
export default function AccessPage() {
  return <FeatureDetailPage d={ACCESS_DETAIL} />;
}
