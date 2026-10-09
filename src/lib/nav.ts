import type { IconName } from "@/components/icons";

export type NavLink = {
  label: string;
  href: string;
  desc?: string;
  icon?: IconName;
};

export const PLATFORM: NavLink[] = [
  { label: "How it works", href: "/platform", desc: "Create, publish, engage, measure", icon: "grid" },
  { label: "Analytics", href: "/platform/analytics", desc: "Reads, heatmaps, advertiser reports", icon: "chart" },
  { label: "QR Codes", href: "/platform/qr", desc: "Print-to-digital tracking", icon: "qr" },
  { label: "Ad Manager", href: "/platform/ad-manager", desc: "Flat plan, Ad Adviser, materials", icon: "megaphone" },
  { label: "Collaboration", href: "/platform/collaboration", desc: "Comments, roles, approvals", icon: "users" },
  { label: "AI & Automation", href: "/platform/ai", desc: "Auto-tag, summaries, alt text", icon: "sparkles" },
  { label: "Mobile App", href: "/platform/mobile", desc: "Offline reading, push notifications", icon: "send" },
  { label: "Integrations", href: "/integrations", desc: "InDesign, Canva, CRM, analytics", icon: "plug" },
];

export const FEATURE_SLUGS = ["share", "embed", "social", "links", "forms", "access", "seo", "sales"] as const;
export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

export const FEATURES: NavLink[] = [
  { label: "All features", href: "/features", desc: "Centralize, share, control, sell", icon: "grid" },
  { label: "Fullscreen sharing", href: "/features/share", desc: "One link, every screen", icon: "globe" },
  { label: "Embed", href: "/features/embed", desc: "Your edition on your website", icon: "layout" },
  { label: "Social posts", href: "/features/social", desc: "Posts and captions from any page", icon: "megaphone" },
  { label: "Links, video & hotspots", href: "/features/links", desc: "Pages that do something when tapped", icon: "link" },
  { label: "Lead forms", href: "/features/forms", desc: "Turn readers into subscribers", icon: "form" },
  { label: "Access control", href: "/features/access", desc: "Private, password, subscribers only", icon: "lock" },
  { label: "Article mode & SEO", href: "/features/seo", desc: "Found in Google, readable anywhere", icon: "text" },
  { label: "Digital sales", href: "/features/sales", desc: "Sell issues, shop the ad", icon: "tag" },
];

export const USE_CASES_INDUSTRY: NavLink[] = [
  { label: "Magazine & news publishers", href: "/use-cases/publishers", desc: "Ads, sign-off, advertiser proof", icon: "book" },
  { label: "Schools & universities", href: "/use-cases/education", desc: "Prospectuses, alumni magazines", icon: "users" },
  { label: "Nonprofits & associations", href: "/use-cases/nonprofit", desc: "Member magazines, impact reports", icon: "globe" },
  { label: "Real estate & property", href: "/use-cases/realestate", desc: "Listings with video and enquiry", icon: "layout" },
  { label: "Retail & catalogs", href: "/use-cases/retail", desc: "Shoppable pages, product tags", icon: "tag" },
  { label: "Travel & hospitality", href: "/use-cases/travel", desc: "Guides that book and convert", icon: "send" },
  { label: "Agencies & PR", href: "/use-cases/agency", desc: "Client workspaces, white label", icon: "megaphone" },
  { label: "Internal communications", href: "/use-cases/internal", desc: "Private, SSO, read receipts", icon: "lock" },
  { label: "Design & architecture", href: "/use-cases/design", desc: "Portfolios that stay on brand", icon: "pen" },
];

export const USE_CASES_CONTENT: NavLink[] = [
  { label: "Digital magazine", href: "/use-cases/magazine", desc: "Issue after issue, on your domain", icon: "book" },
  { label: "Newspaper e-edition", href: "/use-cases/newspaper", desc: "Daily or weekly, searchable", icon: "text" },
  { label: "Digital catalog", href: "/use-cases/catalog", desc: "Every product tappable", icon: "cart" },
  { label: "Lookbook & portfolio", href: "/use-cases/lookbook", desc: "Visual first, fullscreen", icon: "eye" },
  { label: "Brochure", href: "/use-cases/brochure", desc: "From PDF to lead in minutes", icon: "file" },
  { label: "Annual report", href: "/use-cases/report", desc: "Readable, indexable, downloadable", icon: "chart" },
  { label: "Newsletter", href: "/use-cases/newsletter", desc: "Recurring, trackable, on brand", icon: "mail" },
  { label: "E-book & guide", href: "/use-cases/ebook", desc: "Gated or sold, chapter by chapter", icon: "layout" },
];

export const RESOURCES: NavLink[] = [
  { label: "Resource center", href: "/resources", desc: "Guides, templates and help", icon: "inbox" },
  { label: "Webinars", href: "/resources/webinars", desc: "Live sessions and recordings", icon: "inbox" },
  { label: "Blog", href: "/blog", desc: "Ideas and publisher stories", icon: "pen" },
  { label: "Why FlipAndShare", href: "/why-us", desc: "How we compare, switching, promises", icon: "check" },
  { label: "Templates", href: "/resources/templates", desc: "Start from a ready-made layout", icon: "layout" },
  { label: "Examples", href: "/store", desc: "Real flipbooks across categories", icon: "book" },
  { label: "Customers", href: "/customers", desc: "Case studies and results", icon: "trend" },
  { label: "What's new", href: "/whats-new", desc: "Latest features and releases", icon: "sparkles" },
  { label: "Our company", href: "/company", desc: "Who we are and how to reach us", icon: "users" },
];

/** Mobile ☰ panel sections, in the prototype's order. */
export const MOBILE_SECTIONS: { title: string; links: NavLink[] }[] = [
  {
    title: "PLATFORM",
    links: [
      { label: "All features", href: "/features" },
      { label: "Overview", href: "/platform" },
      ...PLATFORM.slice(1).map(({ label, href }) => ({ label, href })),
    ],
  },
  {
    title: "FEATURES",
    links: FEATURES.slice(1).map(({ label, href }) => ({ label, href })),
  },
  {
    title: "USE CASES",
    links: [
      { label: "All use cases", href: "/use-cases" },
      ...[...USE_CASES_INDUSTRY, ...USE_CASES_CONTENT].map(({ label, href }) => ({ label, href })),
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "RESOURCES",
    links: RESOURCES.filter((l) => l.href !== "/company").map(({ label, href }) => ({ label, href })),
  },
  {
    title: "COMPANY",
    links: [
      { label: "Our company", href: "/company" },
      { label: "Store", href: "/store" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
];

export const FOOTER_PRODUCTS = [
  { label: "Digital Studio", desc: "Design and publish digital editions" },
  { label: "Magazine Manager", desc: "Ad sales, CRM and production" },
  { label: "Marketing Manager", desc: "Email, forms and campaigns" },
  { label: "Newspaper Manager", desc: "Sales and billing for newspapers" },
  { label: "Magazine Central", desc: "Reader library for your titles" },
];

export const FOOTER_COLUMNS: { title: string; aria: string; links: NavLink[] }[] = [
  {
    title: "FLIPANDSHARE",
    aria: "FlipAndShare features",
    links: [
      { label: "All features", href: "/features" },
      { label: "Platform overview", href: "/platform" },
      { label: "Reader analytics", href: "/platform/analytics" },
      { label: "QR code tracking", href: "/platform/qr" },
      { label: "Ad Manager", href: "/platform/ad-manager" },
      { label: "Collaboration", href: "/platform/collaboration" },
      { label: "AI & automation", href: "/platform/ai" },
      { label: "Mobile app", href: "/platform/mobile" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "SOLUTIONS",
    aria: "Solutions",
    links: [
      { label: "Digital magazines", href: "/use-cases/magazine" },
      { label: "Product catalogs", href: "/use-cases/catalog" },
      { label: "Brochures", href: "/use-cases/brochure" },
      { label: "Annual reports", href: "/use-cases/report" },
      { label: "Newsletters", href: "/use-cases/newsletter" },
      { label: "Enterprise & agencies", href: "/enterprise" },
    ],
  },
  {
    title: "RESOURCES",
    aria: "Resources",
    links: [
      { label: "Resource center", href: "/resources" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Blog", href: "/blog" },
      { label: "Templates", href: "/resources/templates" },
      { label: "Examples", href: "/store" },
      { label: "Customer stories", href: "/customers" },
      { label: "What's new", href: "/whats-new" },
    ],
  },
  {
    title: "COMPANY",
    aria: "Company",
    links: [
      { label: "About us", href: "/company" },
      { label: "Book a demo", href: "/demo" },
      { label: "Why FlipAndShare", href: "/why-us" },
      { label: "Pricing", href: "/pricing" },
      { label: "Talk to sales", href: "/demo" },
      { label: "Help & support", href: "/resources" },
      { label: "Webinars", href: "/resources/webinars" },
    ],
  },
];
