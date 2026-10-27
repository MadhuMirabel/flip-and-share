import type { Metadata } from "next";
import { MAGAZINE_DETAIL } from "@/components/use-cases/magazine";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Digital magazine",
  description:
    "Upload each issue, keep the archive on a bookshelf, sell subscriptions or single issues, and put ads and video on the pages. Readers get the app, you get the numbers.",
};

/** Digital magazine (design/FlipAndShare Prototype.dc.html data L3350). */
export default function MagazinePage() {
  return <UseCaseDetailPage d={MAGAZINE_DETAIL} />;
}
