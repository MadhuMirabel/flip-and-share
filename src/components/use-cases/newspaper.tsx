import { ArticleScene, LatestShelfScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Newspaper e-edition (prototype `USE.newspaper`, L3353). */
export const NEWSPAPER_DETAIL: UseCaseDetail = {
  group: "content",
  groupLabel: "BY CONTENT TYPE",
  slug: "newspaper",
  short: "newspaper teams",
  title: "A daily or weekly e-edition readers can search and share.",
  lead: "Publish the replica edition every morning, with article mode for phones, search across the archive, and ads that track. Subscribers sign in; everyone else sees the preview.",
  proof: ["Scheduled publishing", "Article mode for phones", "Subscriber sign-in"],
  heroScene: <ArticleScene />,
  stats: [
    { value: "06:00", label: "scheduled publish every morning", icon: "clock" },
    { value: "Search", label: "across every edition", icon: "search" },
    { value: "Article mode", label: "for reading on a phone", icon: "text" },
  ],
  painTitle: "The replica PDF is unreadable on a phone and unsearchable on a desktop.",
  pain: "The e-edition is a page image. Readers pinch and zoom, cannot search yesterday's story, and advertisers in the print edition get no digital credit.",
  blocks: [
    {
      tag: "READ",
      title: "The replica, and the readable version.",
      description: "Readers flip the replica or switch to article mode with real text, headings and images per story.",
      points: ["Article mode per story", "Text size and dark mode", "Share a single article"],
      scene: <ArticleScene />,
      link: { label: "See Article mode", href: "/features/seo" },
    },
    {
      tag: "SCHEDULE",
      title: "Publishes itself at 6 a.m.",
      description: "Upload tonight, schedule for morning. The API accepts the PDF straight from your pagination system.",
      points: ["Scheduled publishing", "API upload from pagination", "Push to the reader app"],
      scene: <LatestShelfScene />,
      link: { label: "See Integrations", href: "/integrations" },
    },
    {
      tag: "ADS",
      title: "Print advertisers, digital proof.",
      description: "Ads in the replica are tappable and tracked. Send local advertisers a click report with the print invoice.",
      points: ["Tappable ads", "Click report per advertiser", "QR from print to digital"],
      scene: <RevenueScene />,
      link: { label: "See Ad Manager", href: "/platform/ad-manager" },
    },
  ],
  example: {
    cover: COVERS[1],
    title: "Courier News · September 23, 2026",
    description: "Weekly community newspaper e-edition with article mode, subscriber access and local advertiser pages.",
  },
  quote: {
    text: "Readers stopped complaining about the phone edition, and our ad reps have a digital number for every print ad.",
    who: "Digital editor, weekly newspaper (illustrative)",
  },
  howTitle: "From pagination to published.",
  steps: [
    { title: "Send", description: "Pagination exports the PDF to the API.", time: "Automatic" },
    { title: "Schedule", description: "Set the publish time; article mode builds itself.", time: "1 min" },
    { title: "Deliver", description: "Push notification, email and bookshelf update.", time: "06:00" },
  ],
  faqs: [
    { question: "Can it publish automatically?", answer: "Yes. The API accepts the PDF and a publish time from your pagination system." },
    { question: "Do subscribers need a new login?", answer: "Connect your subscriber list or SSO; existing credentials work." },
    { question: "Can readers share one article?", answer: "Yes. Every story in article mode has its own link and social preview." },
  ],
  ctaTitle: "Upload tomorrow's edition.",
  ctaSubtitle: "Schedule it for 6 a.m. and read it on your phone.",
  art: "search",
};
