import { LatestShelfScene, RevenueScene, SocialScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Newsletter (prototype `USE.newsletter`, L3356). */
export const NEWSLETTER_DETAIL: UseCaseDetail = {
  group: "content",
  groupLabel: "BY CONTENT TYPE",
  slug: "newsletter",
  short: "newsletter teams",
  title: "A newsletter with a home, an archive and numbers per page.",
  lead: "Publish each newsletter as a readable edition on your domain. Readers subscribe from the page, the archive builds itself, and every link is tracked.",
  proof: ["Archive on your domain", "Subscribe from the page", "Every link tracked"],
  heroScene: <SocialScene />,
  stats: [
    { value: "Archive", label: "every issue, searchable", icon: "search" },
    { value: "1 form", label: "subscribe from any page", icon: "form" },
    { value: "Per link", label: "clicks and sources", icon: "chart" },
  ],
  painTitle: "The newsletter lives in inboxes and disappears in a week.",
  pain: "No archive, no search, no way for a new reader to subscribe from an old issue. Sponsors get an open rate and nothing else.",
  blocks: [
    {
      tag: "HOME",
      title: "An archive that grows.",
      description: "Each issue joins the bookshelf on your domain. Search works across all of them.",
      points: ["Bookshelf archive", "Search across issues", "Latest-issue embed"],
      scene: <LatestShelfScene />,
      link: { label: "See Embed", href: "/features/embed" },
    },
    {
      tag: "GROW",
      title: "Subscribe from the page.",
      description: "A subscribe form on every issue. Post any page to social with an AI caption.",
      points: ["Subscribe form", "Social posts with captions", "Email delivery"],
      scene: <SocialScene />,
      link: { label: "See Social posts", href: "/features/social" },
    },
    {
      tag: "PROVE",
      title: "Sponsors see the clicks.",
      description: "Every sponsor link is tracked. Send a click report with the invoice.",
      points: ["Link tracking", "Sponsor click history", "Sources by channel"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[8],
    title: "Specialty Crop Grower · July 2026",
    description: "Monthly industry newsletter with a searchable archive, subscribe form and tracked sponsor links.",
  },
  quote: {
    text: "The archive brought in subscribers from old issues, and sponsors finally see clicks, not opens.",
    who: "Editor, industry newsletter (illustrative)",
  },
  howTitle: "From email to edition.",
  steps: [
    { title: "Upload", description: "Drop the PDF or export from your email tool.", time: "2 min" },
    { title: "Add the form", description: "Subscribe on the cover; tag sponsor links.", time: "5 min" },
    { title: "Publish", description: "Bookshelf, social post, email link.", time: "Same day" },
  ],
  faqs: [
    { question: "Does it replace our email tool?", answer: "No. It gives the newsletter a home and an archive; you still send by email." },
    { question: "Can readers subscribe from an old issue?", answer: "Yes. The form is on every edition." },
    { question: "Can sponsors see their clicks?", answer: "Each sponsor gets a report link with their placements only." },
  ],
  ctaTitle: "Upload last month's newsletter.",
  ctaSubtitle: "Give it a home and see the clicks.",
  art: "social",
};
