import type { Metadata } from "next";
import { NEWSLETTER_DETAIL } from "@/components/use-cases/newsletter";
import { UseCaseDetailPage } from "@/components/use-cases/UseCaseDetailPage";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Publish each newsletter as a readable edition on your domain. Readers subscribe from the page, the archive builds itself, and every link is tracked.",
};

/** Newsletter (design/FlipAndShare Prototype.dc.html data L3356). */
export default function NewsletterPage() {
  return <UseCaseDetailPage d={NEWSLETTER_DETAIL} />;
}
