import { CartScene, PaywallScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Nonprofits & associations (prototype `USE.nonprofit`, L3343). */
export const NONPROFIT_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "nonprofit",
  short: "nonprofits and associations",
  title: "Member magazines and impact reports that renew members.",
  lead: "Publish the member magazine, annual impact report and event program on one platform. Sell sponsor pages with proof, capture donations from the page, and keep member-only content behind the login.",
  proof: ["Sponsor click reports", "Donate button on any page", "Members-only access"],
  heroScene: <PaywallScene />,
  stats: [
    { value: "+22%", label: "sponsor renewals with a click report", icon: "trend" },
    { value: "1 tap", label: "from the story to the donation page", icon: "link" },
    { value: "Members", label: "only sections behind login", icon: "users" },
  ],
  painTitle: "Sponsors want proof, members want value, and the report is a PDF.",
  pain: "Your sponsors pay for pages in the member magazine and hear nothing back. The impact report goes out as an attachment. Members-only content leaks, or lives in a portal nobody visits.",
  blocks: [
    {
      tag: "SPONSORS",
      title: "Show sponsors what their page did.",
      description: "Every sponsor placement gets clicks, CTR and best page. Send it with the renewal.",
      points: ["Sponsor click history", "QR scans from the printed program", "Report link per sponsor"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
    {
      tag: "GIVING",
      title: "Turn the story into a gift.",
      description:
        "Put a Donate button or campaign form beside the story that moves people. Attribution shows which page did it.",
      points: ["Buy and donate hotspots", "Campaign forms", "Attribution per page"],
      scene: <CartScene />,
      link: { label: "See Digital sales", href: "/features/sales" },
    },
    {
      tag: "MEMBERS",
      title: "Member value, behind the login.",
      description: "Set a preview limit, then require member login. Renewal prompts appear where the content stops.",
      points: ["Preview then paywall", "Member SSO or email list", "Renewal prompts"],
      scene: <PaywallScene />,
      link: { label: "See Access control", href: "/features/access" },
    },
  ],
  example: {
    cover: COVERS[3],
    title: "Out & About Wisconsin · September–October 2026",
    description: "Member-supported regional title with sponsor pages, event listings and a subscribers-only section.",
  },
  quote: {
    text: "Sponsor renewals went up the first year we sent click reports. Members finally read the magazine on their phones.",
    who: "Communications director, statewide association (illustrative)",
  },
  howTitle: "One platform for the magazine, the report and the program.",
  steps: [
    { title: "Upload", description: "Drop the issue or report PDF.", time: "2 min" },
    { title: "Tag", description: "Mark sponsor pages, add Donate buttons and the member gate.", time: "20 min" },
    { title: "Publish", description: "Share the link, embed it, print the QR in the program.", time: "Same day" },
  ],
  faqs: [
    { question: "Can we gate only part of an issue?", answer: "Yes. Set a preview limit; the paywall or member login appears after that page." },
    { question: "Do sponsors need an account?", answer: "No. Each sponsor gets a report link that shows their placements only." },
    { question: "Is there a nonprofit price?", answer: "Talk to us. Association and nonprofit pricing is handled by the sales team." },
  ],
  ctaTitle: "Bring your member magazine.",
  ctaSubtitle: "Free account, no credit card. Sponsor reports from the first issue.",
  art: "lock",
};
