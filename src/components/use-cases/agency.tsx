import { FormScene, LinkShareScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Agencies & PR (prototype `USE.agency`, L3347). */
export const AGENCY_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "agency",
  short: "agencies",
  title: "Every client title in one place. Their brand on every page.",
  lead: "Run every client publication from one workspace per client. White label each edition on the client's domain, give clients their own approval link, and send reports with your agency's name on them.",
  proof: ["Workspace per client", "White label per edition", "One invoice"],
  heroScene: <LinkShareScene />,
  stats: [
    { value: "9 titles", label: "from one login", icon: "layout" },
    { value: "-3 days", label: "per issue with proof links", icon: "target" },
    { value: "1 invoice", label: "for every client workspace", icon: "tag" },
  ],
  painTitle: "Nine clients, nine logins, nine ways to approve a proof.",
  pain: "Each client wants their own brand, their own domain and their own approval process. You end up with a tool per client, files by email and reports rebuilt in slides.",
  blocks: [
    {
      tag: "WORKSPACES",
      title: "One login, every client.",
      description:
        "A workspace per client with its own brand, roles and analytics. Your team moves between them without switching accounts.",
      points: ["Workspace per client", "Roles per person per workspace", "Consolidated billing"],
      scene: <LinkShareScene />,
      link: { label: "See Enterprise", href: "/enterprise" },
    },
    {
      tag: "APPROVALS",
      title: "Clients approve from a link.",
      description: "Send a proof link. Clients comment on the page and approve without an account. Every action is logged.",
      points: ["Proof links without login", "Comments pinned to the page", "Sign-off gates"],
      scene: <FormScene />,
      link: { label: "See Collaboration", href: "/platform/collaboration" },
    },
    {
      tag: "REPORTS",
      title: "Your name on the report.",
      description: "Agency-branded reports per client per issue, with reader and advertiser numbers.",
      points: ["White-label reports", "Scheduled delivery", "Export to PDF"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[5],
    title: "Northlight Media · 9 client titles",
    description: "Publishing agency running 110 issues a year across nine client brands on one account.",
  },
  quote: {
    text: "We moved nine titles into one account and stopped emailing proofs. Clients approve from a link.",
    who: "Operations director, publishing agency (illustrative)",
  },
  howTitle: "Set up once, publish for everyone.",
  steps: [
    { title: "Create workspaces", description: "One per client, with brand, domain and roles.", time: "1 hour" },
    { title: "Publish", description: "Upload, place ads, send the proof link.", time: "Per issue" },
    { title: "Report", description: "Agency-branded reports go out on schedule.", time: "Monthly" },
  ],
  faqs: [
    { question: "Is there agency pricing?", answer: "Yes. Business and Enterprise plans price per organisation, not per client." },
    { question: "Can clients log in?", answer: "Optionally. Most agencies give clients proof links and report links instead of seats." },
    {
      question: "Can we white label completely?",
      answer: "Yes. Domain, logo, colours and reader app per edition on Business and Enterprise.",
    },
  ],
  ctaTitle: "Bring one client title.",
  ctaSubtitle: "Set up a workspace and send a proof link in an afternoon.",
  art: "embed",
};
