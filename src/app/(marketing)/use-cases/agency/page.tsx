import type { Metadata } from "next";
import { AGENCY_DETAIL } from "@/components/use-cases/agency";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Agencies & PR",
  description:
    "Run every client publication from one workspace per client. White label each edition, send proof links for approval and deliver agency-branded reports.",
};

/** Agencies & PR (design/FlipAndShare Prototype.dc.html L1163–1205, data L3347). */
export default function AgencyPage() {
  return <UseCaseDetailPage d={AGENCY_DETAIL} />;
}
