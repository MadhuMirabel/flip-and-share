import { ArticleScene, RevenueScene, TogglesScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Internal communications (prototype `USE.internal`, L3348). */
export const INTERNAL_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "internal",
  short: "internal comms teams",
  title: "The employee magazine people open, and you can prove it.",
  lead: "Publish the staff magazine, handbook and town-hall recap behind SSO. See who read it, which pages landed, and send the next issue as a push notification.",
  proof: ["SSO only", "Read receipts", "No public link, ever"],
  heroScene: <TogglesScene />,
  stats: [
    { value: "74%", label: "of staff opened the last issue", icon: "chart" },
    { value: "SSO", label: "no passwords to share", icon: "lock" },
    { value: "Per page", label: "read time by department", icon: "eye" },
  ],
  painTitle: "The staff newsletter is a PDF on the intranet with an open rate of unknown.",
  pain: "Internal comms publishes into a void. The PDF is hard to read on a phone, impossible to search, and nobody can say which pages were read. And it must never leak.",
  blocks: [
    {
      tag: "PRIVATE",
      title: "SSO, and nothing else.",
      description:
        "Editions open only through your identity provider. No public link, no downloads unless you allow them, expiry when you say.",
      points: ["SAML and OIDC SSO", "Download and print controls", "Expiry dates"],
      scene: <TogglesScene />,
      link: { label: "See Access control", href: "/features/access" },
    },
    {
      tag: "READ",
      title: "Readable on any phone.",
      description: "Article mode with search, text size and dark mode. Push notification when a new issue lands.",
      points: ["Article mode and search", "Reader app with push", "Offline reading"],
      scene: <ArticleScene />,
      link: { label: "See Mobile app", href: "/platform/mobile" },
    },
    {
      tag: "MEASURE",
      title: "Know who read what.",
      description: "Read receipts per reader or per department, time per page, and the pages that were skipped.",
      points: ["Read receipts", "Department roll-ups", "Export to your HR system"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[6],
    title: "Company handbook · 2026 edition",
    description: "Private, SSO-only edition with search, article mode and read receipts per department.",
  },
  quote: {
    text: "For the first time we can tell leadership how many people read the CEO letter, by department.",
    who: "Head of internal communications, 4,000-person company (illustrative)",
  },
  howTitle: "Private, readable, measured.",
  steps: [
    { title: "Connect SSO", description: "Okta, Entra or Google Workspace.", time: "1 hour" },
    { title: "Upload", description: "Drop the issue; set SSO-only and expiry.", time: "2 min" },
    { title: "Send", description: "Push to the app, link on the intranet, read receipts start.", time: "Same day" },
  ],
  faqs: [
    {
      question: "Can it be completely private?",
      answer: "Yes. SSO-only editions have no public URL and honour download and print settings.",
    },
    { question: "Do we see individual readers?", answer: "Your admin chooses: individual read receipts or department roll-ups only." },
    { question: "Does it work without the app?", answer: "Yes, in any browser after SSO. The app adds offline reading and push." },
  ],
  ctaTitle: "Publish the next staff issue privately.",
  ctaSubtitle: "Talk to sales about SSO, or try the free plan with a password-protected edition.",
  art: "lock",
};
