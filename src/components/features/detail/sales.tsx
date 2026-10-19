import type { FeatureDetail } from "./FeatureDetailPage";
import { CartScene, PaywallScene, RevenueScene, SalesHeroDemo } from "./scenes";

/** Digital sales (prototype `FEAT.sales` L3367 + `FEAT_X.sales` L3293). */
export const SALES_DETAIL: FeatureDetail = {
  label: "DIGITAL SALES",
  title: "Sell the issue, and what is in it.",
  lead: "Sell single issues and subscriptions, or tag products on the page so readers can buy without leaving. Revenue is attributed to the page and advertiser.",
  plan: "From Professional",
  demo: <SalesHeroDemo />,
  stats: [
    { value: "3", label: "ways to earn per page", icon: "trend" },
    { value: "2.9% + 30¢", label: "Stripe fee, nothing extra from us", icon: "tag" },
    { value: "$1,942", label: "shop revenue in the demo issue", icon: "chart" },
  ],
  blocks: [
    {
      tag: "ISSUES AND SUBSCRIPTIONS",
      title: "Sell the issue itself.",
      description: "Set a price per issue or a monthly or annual subscription. Readers pay with Stripe and sign in on any device.",
      points: ["Single issues, monthly, annual", "Free preview pages before the paywall", "Payouts to your Stripe account"],
      scene: <PaywallScene />,
    },
    {
      tag: "SHOP THE AD",
      title: "Make the ad the store.",
      description: "Tag products on any page. Readers tap, see the product card and buy without leaving the issue. Orders go to the advertiser.",
      points: ["Product tags with up to 6 images", "Shopify and Stripe checkout", "Orders attributed to page and advertiser"],
      scene: <CartScene />,
    },
    {
      tag: "REVENUE REPORTING",
      title: "Every dollar tied to a page.",
      description: "Shop orders, subscriptions and single issues in one view, by issue, page and advertiser.",
      points: ["Revenue by page and advertiser", "Export to Magazine Manager", "Show advertisers what their page sold"],
      scene: <RevenueScene />,
    },
  ],
  howTitle: "Set a price or tag a product.",
  steps: [
    { title: "Connect Stripe or Shopify", description: "One-time, two minutes.", time: "2 min" },
    { title: "Set a price or tag a product", description: "Per issue, per subscription, or per ad.", time: "1 min" },
    { title: "Readers buy inside the edition", description: "Payouts and reports follow automatically.", time: "Ongoing" },
  ],
  without: {
    icon: "tag",
    heading: "Digital as a cost",
    points: ["Digital edition given away free", "Ads are pictures of products", "Revenue is print only"],
  },
  withFas: {
    icon: "cart",
    heading: "Digital as revenue",
    points: ["Issues and subscriptions sold in the reader", "Ads become shoppable", "Digital revenue by page"],
  },
  short: "digital sales",
  faqs: [
    { question: "Who processes payments?", answer: "Stripe, in your own account. FlipAndShare never holds your money." },
    { question: "Can advertisers fulfil their own orders?", answer: "Yes. Shop orders route to the advertiser's Shopify or email." },
    { question: "Is there a transaction fee?", answer: "Only Stripe's. FlipAndShare adds nothing on Professional and above." },
  ],
  related: [
    { title: "Links, video and hotspots", icon: "link", href: "/features/links" },
    { title: "Access control", icon: "lock", href: "/features/access" },
    { title: "Ad Manager", icon: "grid", href: "/platform/ad-manager" },
    { title: "Analytics", icon: "chart", href: "/platform/analytics" },
  ],
  art: "rocket",
};
