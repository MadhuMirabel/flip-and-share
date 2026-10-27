import type { Metadata } from "next";
import { EDUCATION_DETAIL } from "@/components/use-cases/education";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Schools & universities",
  description:
    "Publish the viewbook, course guide and alumni magazine as readable, searchable editions. Capture enquiries on the page and keep private material private.",
};

/** Schools & universities (design/FlipAndShare Prototype.dc.html data L3342). */
export default function EducationPage() {
  return <UseCaseDetailPage d={EDUCATION_DETAIL} />;
}
