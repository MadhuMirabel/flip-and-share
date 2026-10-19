import { ArticleScene, FormScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Magazine & news publishers (prototype `USE.publishers`, L3341). */
export const PUBLISHERS_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "publishers",
  short: "publishers",
  title: "Plan the issue, place the ads, publish, and prove the value.",
  lead: "FlipAndShare is the only flipbook platform built around the ad sale. The flat plan knows your booked insertions, advertisers upload their own artwork, and every renewal goes out with a click report.",
  proof: ["Ad Adviser suggests the page", "Two gates before publish", "Click history per advertiser"],
  heroScene: <RevenueScene />,
  stats: [
    { value: "+34%", label: "advertiser renewals after the click report", icon: "trend" },
    { value: "0", label: "artwork-chasing emails per issue", icon: "x" },
    { value: "2 gates", label: "before an issue can go live", icon: "check" },
  ],
  painTitle: "The issue lives in a spreadsheet, and advertisers ask what their page did.",
  pain: 'Artwork arrives by email, the flat plan is a shared sheet, and when a sales rep needs a renewal argument nobody has a number beyond "it was published". Generic flipbook tools convert the PDF and stop there.',
  blocks: [
    {
      tag: "AD SALES",
      title: "Place every booked ad in minutes.",
      description:
        "Insertions sync from your CRM into the flat plan. Ad Adviser suggests the best page for each advertiser with a confidence score and the reason.",
      points: ["Drag-and-drop flat plan with real pages", "Ad Adviser: best page, category CTR, top traffic", "Versions with A/B diff and safe restore"],
      scene: <RevenueScene />,
      link: { label: "See Ad Manager", href: "/platform/ad-manager" },
    },
    {
      tag: "PRODUCTION",
      title: "Artwork arrives by itself.",
      description:
        "Each insertion gets a no-login upload link. Advertisers drop files, they land as Received, and Validation blocks publishing until every slot is filled.",
      points: ["Materials portal per insertion", "Preflight checks on size and bleed", "Sign-off: materials received, proof approved"],
      scene: <FormScene />,
      link: { label: "See Collaboration", href: "/platform/collaboration" },
    },
    {
      tag: "PROOF",
      title: "Send the renewal with numbers.",
      description:
        "Clicks, CTR, best page and trend per advertiser, per issue. Export the report or let the advertiser see it live.",
      points: ["Advertiser click history", "QR scans split Print vs Digital", "Ad revenue against the previous period"],
      scene: <ArticleScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[2],
    title: "Aberdeen Magazine · September–October 2026",
    description: "Regional lifestyle title, 84 pages, 41 booked ads. Published on its own domain with print and digital QR tracking.",
  },
  quote: {
    text: "We used to chase artwork for a week and guess at renewal numbers. Now the portal collects the files and the click report closes the sale.",
    who: "Publisher, regional lifestyle magazine (illustrative)",
  },
  howTitle: "From PDF to a paid, measured issue.",
  steps: [
    { title: "Upload", description: "Drop the PDF. Pages become assets on the flat plan.", time: "2 min" },
    { title: "Place & collect", description: "Place booked ads, send upload links, watch Received fill up.", time: "1 day" },
    { title: "Publish & prove", description: "Two sign-offs, publish, then send the click report with the renewal.", time: "Same day" },
  ],
  faqs: [
    { question: "Does it work with our CRM?", answer: "Magazine Manager syncs natively. Other CRMs connect through the API or a CSV of insertions." },
    {
      question: "Can advertisers see their own numbers?",
      answer: "Yes. Each advertiser gets a live report link showing clicks, CTR and best page for their placements only.",
    },
    {
      question: "What about the print edition?",
      answer: "Print QR codes track separately from digital ones, so you can show print readers scanning to the advertiser.",
    },
  ],
  ctaTitle: "Bring your next issue.",
  ctaSubtitle: "Upload the PDF, place one ad, and see the report. Free account, no credit card.",
  art: "play",
};
