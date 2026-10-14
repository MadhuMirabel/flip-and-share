import type { FeatureDetail } from "./FeatureDetailPage";
import { EmbedScene, LatestShelfScene, LinkShareScene, ShareHeroDemo } from "./scenes";

/** Embed (prototype `FEAT.embed` L3363 + `FEAT_X.embed` L3288). */
export const EMBED_DETAIL: FeatureDetail = {
  label: "EMBED",
  title: "Your edition, on your website.",
  lead: "Put the full reader on any page with a snippet, a WordPress block or a cover that opens fullscreen. Readers stay on your domain.",
  plan: "Included on every plan",
  demo: <ShareHeroDemo />,
  stats: [
    { value: "3", label: "embed styles", icon: "trend" },
    { value: "1", label: "snippet, updates forever", icon: "target" },
    { value: "0", label: "plugins required (WordPress block optional)", icon: "x" },
  ],
  blocks: [
    {
      tag: "INLINE READER",
      title: "The full reader, inside your page.",
      description:
        "Paste one snippet and the edition renders inside your site at any width. Readers never leave your domain.",
      points: ["Responsive iframe, any width", "Keeps your header, footer and ads around it", "Hotspots, video and forms all work inside"],
      scene: <EmbedScene />,
    },
    {
      tag: "LATEST ISSUE SHELF",
      title: "A shelf that updates itself.",
      description:
        "Embed a bookshelf of your titles or a \"latest issue\" cover. When you publish the next issue, the embed swaps automatically.",
      points: ["Latest-issue cover or full shelf", "Filter by title or category", "No re-embedding each month"],
      scene: <LatestShelfScene />,
    },
    {
      tag: "WORDPRESS AND CMS",
      title: "A block for WordPress, a snippet for everything else.",
      description:
        "The official WordPress block lists your issues in the editor. For Squarespace, Webflow, Wix or custom sites, paste the snippet.",
      points: ["WordPress block with issue picker", "Works on any CMS via snippet", "SEO text mirrored to the host page"],
      scene: <LinkShareScene />,
    },
  ],
  howTitle: "Paste once, update forever.",
  steps: [
    { title: "Publish the issue", description: "Open Publish, then Embed.", time: "1 min" },
    { title: "Pick a style", description: "Inline reader, cover, or shelf. Copy the snippet.", time: "30 sec" },
    { title: "Paste it in your site", description: "New issues appear automatically.", time: "Once" },
  ],
  without: {
    icon: "link",
    heading: "PDF downloads on your site",
    points: ["Upload the PDF to your site each month", "Readers download files, no analytics", "Broken links when files move"],
  },
  withFas: {
    icon: "layout",
    heading: "The edition on your site",
    points: [
      "One embed, published once",
      "Reads, clicks and time on page from your own site",
      "Auto-updates when a new issue goes live",
    ],
  },
  short: "embedding",
  faqs: [
    { question: "Will the embed slow my site?", answer: "No. The reader loads lazily and only when it scrolls into view." },
    { question: "Can I embed a single page?", answer: "Yes. Add #p12 to the embed URL to open at page 12." },
    { question: "Does the embed count as a read?", answer: "Yes. Embedded opens show in analytics with the referring site." },
  ],
  related: [
    { title: "Fullscreen sharing", icon: "globe", href: "/features/share" },
    { title: "Article mode and SEO", icon: "text", href: "/features/seo" },
    { title: "Integrations", icon: "plug", href: "/integrations" },
    { title: "Links, video and hotspots", icon: "link", href: "/features/links" },
  ],
  art: "embed",
};
