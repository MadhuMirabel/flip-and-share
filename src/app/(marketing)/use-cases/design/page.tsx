import type { Metadata } from "next";
import { DESIGN_DETAIL } from "@/components/use-cases/design";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Design & architecture",
  description:
    "Publish from InDesign or Canva to a fullscreen reader with your typography intact. No platform branding, your domain, and an enquiry form for clients.",
};

/** Design & architecture (design/FlipAndShare Prototype.dc.html L1163–1205, data L3349). */
export default function DesignPage() {
  return <UseCaseDetailPage d={DESIGN_DETAIL} />;
}
