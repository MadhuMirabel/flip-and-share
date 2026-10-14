import type { IconName } from "@/components/icons";

/** Features page data (prototype `fxTabs` / `F` / `cats`, design/FlipAndShare Prototype.dc.html L3536–3541). */

export type ShowcaseTab = { icon: IconName; title: string; description: string };

export const SHOWCASE_TABS: ShowcaseTab[] = [
  { icon: "grid", title: "Centralize", description: "Every title, issue and back number in one library, whatever tool designed it." },
  { icon: "send", title: "Share anywhere", description: "One link. Fullscreen reader, embed on your site, social posts and email." },
  { icon: "lock", title: "Control access", description: "Public, private, password or subscribers only. Downloads and expiry on your terms." },
  { icon: "tag", title: "Sell", description: "Sell issues and subscriptions, or make the ads themselves shoppable." },
];

export const FEATURE_CATEGORIES = ["All", "Core", "Share", "Engage", "Reach", "Measure", "Sell"] as const;
export type FeatureCategory = Exclude<(typeof FEATURE_CATEGORIES)[number], "All">;

export type FeatureItem = {
  title: string;
  category: FeatureCategory;
  description: string;
  icon: IconName;
  href: string;
  linkLabel: string;
};

export const FEATURE_ITEMS: FeatureItem[] = [
  { title: "Flipbooks", category: "Core", description: "Turn any PDF into a page-turning edition in under a minute.", icon: "book", href: "/platform", linkLabel: "How it works" },
  { title: "Fullscreen sharing", category: "Share", description: "A distraction-free reader on any device from one link.", icon: "globe", href: "/features/share", linkLabel: "Learn more" },
  { title: "Embed", category: "Share", description: "Host the edition on your website or blog with a snippet or WordPress shortcode.", icon: "layout", href: "/features/embed", linkLabel: "Learn more" },
  { title: "Social posts", category: "Share", description: "Generate on-brand posts and short clips from any page, with AI captions.", icon: "megaphone", href: "/features/social", linkLabel: "Learn more" },
  { title: "Add links", category: "Engage", description: "Send readers to pages, products, sites, email or phone.", icon: "link", href: "/features/links", linkLabel: "Learn more" },
  { title: "Video and audio", category: "Engage", description: "Play video and audio inside the page, hosted or from YouTube and Vimeo.", icon: "play", href: "/features/links", linkLabel: "Learn more" },
  { title: "Lead forms", category: "Engage", description: "Capture subscribers and enquiries without leaving the issue.", icon: "form", href: "/features/forms", linkLabel: "Learn more" },
  { title: "Article mode and SEO", category: "Reach", description: "Real text, headings and alt text for Google, AI assistants and screen readers.", icon: "text", href: "/features/seo", linkLabel: "Learn more" },
  { title: "QR codes", category: "Reach", description: "Trackable codes that open the exact spot in the edition. Print scans next to digital clicks.", icon: "qr", href: "/platform/qr", linkLabel: "Open QR codes" },
  { title: "Mobile app", category: "Reach", description: "Offline reading, push notifications and a branded app on Business.", icon: "send", href: "/platform/mobile", linkLabel: "See the app" },
  { title: "Analytics", category: "Measure", description: "Reads, heatmaps, time on page and advertiser click reports.", icon: "chart", href: "/platform/analytics", linkLabel: "Tour analytics" },
  { title: "Ad Manager", category: "Sell", description: "Flat plan with booked ads, Ad Adviser and the advertiser materials portal.", icon: "grid", href: "/platform/ad-manager", linkLabel: "Open Ad Manager" },
  { title: "Digital sales", category: "Sell", description: "Sell issues and subscriptions, or tag products so readers can shop the ad.", icon: "tag", href: "/features/sales", linkLabel: "Learn more" },
  { title: "Teams", category: "Measure", description: "Roles, comments on the page, approvals and an audit trail.", icon: "users", href: "/platform/collaboration", linkLabel: "See collaboration" },
  { title: "AI and automation", category: "Core", description: "Auto-tagging, summaries and smart alt text on every upload.", icon: "sparkles", href: "/platform/ai", linkLabel: "See AI tools" },
];

/** Access-control rows shown in the "Control access" scene (prototype `fxToggles`). */
export const ACCESS_TOGGLES = [
  { title: "Private link", hint: "Only people with the link" },
  { title: "Password", hint: "Required to open" },
  { title: "Allow download", hint: "PDF download for readers" },
  { title: "Subscribers only", hint: "Paywall after page 3" },
] as const;
