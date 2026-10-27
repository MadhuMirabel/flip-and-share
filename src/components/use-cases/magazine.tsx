import { EmbedScene, LatestShelfScene, PaywallScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Digital magazine (prototype `USE.magazine`, L3350). */
export const MAGAZINE_DETAIL: UseCaseDetail = {
  group: "content",
  groupLabel: "BY CONTENT TYPE",
  slug: "magazine",
  short: "magazine teams",
  title: "A digital magazine, issue after issue, on your own domain.",
  lead: "Upload each issue, keep the archive on a bookshelf, sell subscriptions or single issues, and put ads and video on the pages. Readers get the app, you get the numbers.",
  proof: ["Bookshelf for every issue", "Subscriptions and single issues", "Ads with click reports"],
  heroScene: <PaywallScene />,
  stats: [
    { value: "12 issues", label: "on one bookshelf", icon: "book" },
    { value: "Paywall", label: "after a preview you choose", icon: "lock" },
    { value: "Per ad", label: "click history for renewals", icon: "chart" },
  ],
  painTitle: "Each issue is a new link and last month's vanishes.",
  pain: "Readers cannot find the archive, subscribers get the same PDF as everyone else, and advertisers get nothing back. The magazine deserves a home, not a download.",
  blocks: [
    {
      tag: "ARCHIVE",
      title: "Every issue on one shelf.",
      description: "A branded bookshelf on your domain lists every issue. The latest issue embed updates itself.",
      points: ["Bookshelf on your domain", "Latest-issue embed", "Search across issues"],
      scene: <LatestShelfScene />,
      link: { label: "See Embed", href: "/features/embed" },
    },
    {
      tag: "SUBSCRIBE",
      title: "Preview, then subscribe.",
      description: "Set a preview limit, then ask for a subscription or a single-issue purchase. Existing subscribers sign in.",
      points: ["Paywall after page N", "Single issue or subscription", "Subscriber import"],
      scene: <PaywallScene />,
      link: { label: "See Digital sales", href: "/features/sales" },
    },
    {
      tag: "ADS",
      title: "Ads that report back.",
      description: "Place booked ads on the flat plan, collect artwork through the portal, send click reports with renewals.",
      points: ["Flat plan and Ad Adviser", "Materials portal", "Advertiser click history"],
      scene: <RevenueScene />,
      link: { label: "See Ad Manager", href: "/platform/ad-manager" },
    },
  ],
  example: {
    cover: COVERS[0],
    title: "Parenting OC · October 2026",
    description: "Monthly regional magazine with a bookshelf archive, subscriber paywall and sponsor pages.",
  },
  quote: {
    text: "The bookshelf gave the magazine a home. Subscriptions started the month we added the paywall.",
    who: "Editor, monthly city magazine (illustrative)",
  },
  howTitle: "From PDF to subscriber.",
  steps: [
    { title: "Upload", description: "Drop the issue; it joins the bookshelf.", time: "2 min" },
    { title: "Enhance", description: "Add video, links and the paywall page.", time: "30 min" },
    { title: "Publish", description: "Push to subscribers, post to social, print the QR.", time: "Same day" },
  ],
  faqs: [
    { question: "Can readers buy one issue?", answer: "Yes. Single issues, subscriptions or both, with your payment provider." },
    { question: "Does the bookshelf match our brand?", answer: "Colours, logo and domain are yours from Professional up." },
    { question: "What about back issues?", answer: "Upload them once. They appear on the shelf and in search." },
  ],
  ctaTitle: "Upload your latest issue.",
  ctaSubtitle: "The bookshelf builds itself. Free account, no credit card.",
  art: "lock",
};
