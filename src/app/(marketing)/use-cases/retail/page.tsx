import type { Metadata } from "next";
import { RETAIL_DETAIL } from "@/components/use-cases/retail";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Retail & catalogs",
  description:
    "Tag products with price and buy-now links, list them in Shop this page, and print a QR on the catalog. Orders attribute back to the page.",
};

/** Retail & catalogs (design/FlipAndShare Prototype.dc.html L1163–1205, data L3345). */
export default function RetailPage() {
  return <UseCaseDetailPage d={RETAIL_DETAIL} />;
}
