import type { Metadata } from "next";
import { CATALOG_DETAIL } from "@/components/use-cases/catalog";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Digital catalog",
  description:
    "Tag products with price and buy links, list them in Shop this page, publish to your domain, and print a QR on the paper edition. Orders attribute back to the page.",
};

/** Digital catalog (design/FlipAndShare Prototype.dc.html data L3351). */
export default function CatalogPage() {
  return <UseCaseDetailPage d={CATALOG_DETAIL} />;
}
