import type { Metadata } from "next";
import { FeatureDetailPage } from "@/components/features/detail/FeatureDetailPage";
import { FORMS_DETAIL } from "@/components/features/detail/forms";

export const metadata: Metadata = {
  title: "Lead forms",
  description:
    "Place a form on any page or gate the issue after a preview. Submissions go to your CRM or email tool with the issue and page they came from.",
};

/** Lead forms (design/FlipAndShare Prototype.dc.html L1934–2030, data L3292 / L3366). */
export default function FormsPage() {
  return <FeatureDetailPage d={FORMS_DETAIL} />;
}
