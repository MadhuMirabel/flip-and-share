import { CartScene, HotspotsScene, RevenueScene, SearchScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Retail & catalogs (prototype `USE.retail`, L3345). */
export const RETAIL_DETAIL: UseCaseDetail = {
  group: "industry",
  groupLabel: "BY INDUSTRY",
  slug: "retail",
  short: "retailers",
  title: "Make every product on the page shoppable, then see which ones sold.",
  lead: "Tag products with price and buy-now links, list them in Shop this page, and publish to your own domain with a QR for the printed catalog. Orders attribute back to the page.",
  proof: ["Buy now from the page", "Orders attributed per page", "Print + Digital QR"],
  heroScene: <CartScene />,
  stats: [
    { value: "+18%", label: "catalog-attributed orders", icon: "trend" },
    { value: "Per product", label: "clicks and conversions", icon: "tag" },
    { value: "Shop this page", label: "lists every tagged item", icon: "layout" },
  ],
  painTitle: "Shoppers see the product and leave to search for it.",
  pain: "The catalog is static. A shopper spots a jacket on page 12, opens a new tab, searches, maybe buys. You never learn which page did the work, and the printed catalog is a dead end.",
  blocks: [
    {
      tag: "SHOP",
      title: "Buy from the page itself.",
      description: "Drop product tags with price and a buy link. Shop this page lists every item on the spread.",
      points: ["Product tags with price", "Shop this page drawer", "Cart or hand-off to your store"],
      scene: <HotspotsScene />,
      link: { label: "See Digital sales", href: "/features/sales" },
    },
    {
      tag: "PRINT",
      title: "The printed catalog becomes a storefront.",
      description: "Print a QR on the cover and product pages. Scans from print and digital track separately.",
      points: ["QR per page", "Print vs Digital scans", "Change destinations after printing"],
      scene: <SearchScene />,
      link: { label: "See QR Codes", href: "/platform/qr" },
    },
    {
      tag: "MEASURE",
      title: "Which product, which page, which channel.",
      description: "Heatmaps show where shoppers tap. Orders attribute to the page and the product.",
      points: ["Heatmaps per spread", "Orders per page", "Google Analytics and GTM"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[10],
    title: "Merritt Island Select · September 2026",
    description: "Retail catalog with product tags, Shop this page lists and a QR on the printed edition.",
  },
  quote: {
    text: "We finally know which catalog pages sell. The print QR alone paid for the platform.",
    who: "E-commerce lead, home furnishings retailer (illustrative)",
  },
  howTitle: "From catalog PDF to shoppable edition.",
  steps: [
    { title: "Upload", description: "Drop the catalog PDF or import a product feed.", time: "2 min" },
    { title: "Tag products", description: "Add price and buy links; Shop this page builds itself.", time: "30 min" },
    { title: "Publish & print", description: "Publish on your domain, print the QR on the cover.", time: "Same day" },
  ],
  faqs: [
    { question: "Does it connect to Shopify?", answer: "Buy links hand off to any store URL. Product feeds import through CSV or the API." },
    { question: "Can we update prices after publishing?", answer: "Yes. Edit a tag and it updates live without republishing." },
    {
      question: "How do orders attribute?",
      answer: "UTM parameters carry the page and product to your store analytics; orders show in the catalog report.",
    },
  ],
  ctaTitle: "Upload this season's catalog.",
  ctaSubtitle: "Tag one product and watch it become a buy button.",
  art: "cart",
};
