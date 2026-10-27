import type { Metadata } from "next";
import { NEWSPAPER_DETAIL } from "@/components/use-cases/newspaper";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Newspaper e-edition",
  description:
    "Publish the replica edition every morning, with article mode for phones, search across the archive, and ads that track. Subscribers sign in; everyone else sees the preview.",
};

/** Newspaper e-edition (design/FlipAndShare Prototype.dc.html data L3353). */
export default function NewspaperPage() {
  return <UseCaseDetailPage d={NEWSPAPER_DETAIL} />;
}
