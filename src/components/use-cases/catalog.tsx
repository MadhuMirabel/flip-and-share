import { CartScene, HotspotsScene, LatestShelfScene, RevenueScene } from "@/components/features/detail/scenes";
import { COVERS } from "@/lib/covers";
import type { UseCaseDetail } from "./UseCaseDetailPage";

/** Digital catalog (prototype `USE.catalog`, L3351). */
export const CATALOG_DETAIL: UseCaseDetail = {
  group: "content",
  groupLabel: "BY CONTENT TYPE",
  slug: "catalog",
  short: "catalog teams",
  title: "A catalog where every product is a tap away from the cart.",
  lead: "Tag products with price and buy links, list them in Shop this page, publish to your domain, and print a QR on the paper edition. Orders attribute back to the page.",
  proof: ["Product tags with price", "Shop this page", "Orders per page"],
  heroScene: <CartScene />,
  stats: [
    { value: "+18%", label: "catalog-attributed orders", icon: "trend" },
    { value: "Per product", label: "clicks and conversions", icon: "chart" },
    { value: "1 QR", label: "from paper to cart", icon: "qr" },
  ],
  painTitle: "The catalog shows the product and the shopper has to go find it.",
  pain: "Static catalogs lose the shopper at the moment of interest. The printed edition is a dead end and the digital PDF has no cart.",
  blocks: [
    {
      tag: "TAG",
      title: "Price and buy on every product.",
      description: "Drop a tag on each item. Shop this page lists everything on the spread with one Add to cart.",
      points: ["Product tags", "Shop this page drawer", "Hand-off to your store"],
      scene: <HotspotsScene />,
      link: { label: "See Digital sales", href: "/features/sales" },
    },
    {
      tag: "FEED",
      title: "Update prices without republishing.",
      description: "Import a product feed. Prices and stock update live; sold-out items show it.",
      points: ["CSV and API feeds", "Live price updates", "Stock status"],
      scene: <LatestShelfScene />,
      link: { label: "See Integrations", href: "/integrations" },
    },
    {
      tag: "MEASURE",
      title: "Heatmaps and orders per page.",
      description: "See where shoppers tap and which pages convert. Print QR scans track separately.",
      points: ["Heatmaps", "Orders per page and product", "Print vs Digital QR"],
      scene: <RevenueScene />,
      link: { label: "See Analytics", href: "/platform/analytics" },
    },
  ],
  example: {
    cover: COVERS[10],
    title: "Merritt Island Select · September 2026",
    description: "Retail catalog with tagged products, Shop this page lists and a QR on the printed edition.",
  },
  quote: {
    text: "Tagging took an afternoon. The catalog now sells directly and we know which spreads work.",
    who: "Merchandising lead, specialty retailer (illustrative)",
  },
  howTitle: "From catalog PDF to shoppable edition.",
  steps: [
    { title: "Upload", description: "Drop the PDF or import a feed.", time: "2 min" },
    { title: "Tag", description: "Price and buy link per product.", time: "30 min" },
    { title: "Publish & print", description: "Your domain, plus a QR on the cover.", time: "Same day" },
  ],
  faqs: [
    {
      question: "Which stores does it connect to?",
      answer: "Any store URL for buy links; Shopify, WooCommerce and custom feeds through CSV or the API.",
    },
    {
      question: "Can shoppers check out inside the catalog?",
      answer: "Buy links hand off to your store with the cart pre-filled; full in-page checkout is on the roadmap.",
    },
    { question: "Can we run seasonal catalogs?", answer: "Yes. Each catalog is its own edition with its own report." },
  ],
  ctaTitle: "Upload this season's catalog.",
  ctaSubtitle: "Tag one product and watch it become a buy button.",
  art: "cart",
};
