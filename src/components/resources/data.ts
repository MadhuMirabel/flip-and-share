import type { IconName } from "@/components/icons";
import type { PastelTone } from "@/components/cards/RelatedCard";

/* Resource center content (design/FlipAndShare Prototype.dc.html L3322 `RES`, L3519–3532). */

export type ResourceType = "Guide" | "Video" | "Template" | "Webinar" | "Checklist";

export type Resource = {
  /** Index into RESOURCE_GOALS. */
  goal: number;
  type: ResourceType;
  title: string;
  meta: string;
  icon: IconName;
};

/** Pill / tile tone per resource type. */
export const TYPE_TONE: Record<ResourceType, PastelTone> = {
  Guide: "sky",
  Video: "pink",
  Template: "violet",
  Webinar: "amber",
  Checklist: "green",
};

/** Where each resource type lands until individual article pages exist. */
export const TYPE_HREF: Record<ResourceType, string> = {
  Guide: "/blog",
  Video: "/resources/webinars",
  Template: "/resources/templates",
  Webinar: "/resources/webinars",
  Checklist: "/blog",
};

/** Next live session. Keep `at`, `label` and the matching RESOURCES row in step. */
export const NEXT_WEBINAR = {
  at: "2026-11-12T16:00:00Z",
  label: "NOV 12, 2026 · 11 AM ET",
  srLabel: "Starts November 12, 2026 at 11 AM Eastern Time",
  short: "Live · Nov 12",
  title: "Selling digital add-ons to your print advertisers",
  blurb: "45 minutes. How three publishers price hotspots, QR codes and click reports, and the script their reps use.",
} as const;

export const RESOURCE_GOALS: { icon: IconName; title: string; description: string }[] = [
  { icon: "upload", title: "Get started", description: "Publish your first edition and learn the editor." },
  { icon: "megaphone", title: "Sell more ads", description: "Price, pitch and report on digital add-ons." },
  { icon: "users", title: "Grow readers", description: "SEO, lead forms and audience analytics." },
  { icon: "check", title: "Run the team", description: "Roles, sign-offs, production and migration." },
];

export const RESOURCES: Resource[] = [
  { goal: 0, type: "Guide", title: "Publish your first digital edition", meta: "8 min read · Getting started", icon: "upload" },
  { goal: 0, type: "Video", title: "Tour of the editor in 4 minutes", meta: "4 min video", icon: "play" },
  { goal: 0, type: "Template", title: "Monthly magazine starter layout", meta: "Template · 32 pages", icon: "layout" },
  { goal: 0, type: "Guide", title: "Connect a custom domain", meta: "4 min read · Setup", icon: "globe" },
  { goal: 1, type: "Guide", title: "Pricing digital add-ons for print ads", meta: "7 min read · Ad sales", icon: "megaphone" },
  { goal: 1, type: "Template", title: "Advertiser click report (one page)", meta: "Template · PDF export", icon: "chart" },
  { goal: 1, type: "Webinar", title: "Selling digital to print advertisers", meta: NEXT_WEBINAR.short, icon: "users" },
  { goal: 2, type: "Guide", title: "Turn on article mode and SEO metadata", meta: "5 min read · Readership", icon: "text" },
  { goal: 2, type: "Guide", title: "Grow subscribers with lead forms", meta: "6 min read · Readership", icon: "form" },
  { goal: 2, type: "Video", title: "Reading your audience dashboard", meta: "6 min video", icon: "play" },
  { goal: 3, type: "Guide", title: "Set up roles, comments and sign-offs", meta: "5 min read · Team", icon: "users" },
  { goal: 3, type: "Checklist", title: "Issue close production checklist", meta: "Checklist · 18 steps", icon: "check" },
  { goal: 3, type: "Guide", title: "Migrate your archive from another tool", meta: "6 min read · Switching", icon: "history" },
];

export const POPULAR_SEARCHES = ["Add a lead form", "Custom domain", "Advertiser report", "Migrate from Issuu"];

export const RESOURCE_TYPES: {
  icon: IconName;
  title: string;
  description: string;
  link: string;
  href: string;
  tone: PastelTone;
  /** Decorative corner glow. */
  glow: string;
}[] = [
  { icon: "book", title: "Guides", description: "Step-by-step articles for every feature and workflow.", link: "Browse guides", href: "/blog", tone: "sky", glow: "color-mix(in srgb, var(--color-blue-500) 12%, transparent)" },
  { icon: "layout", title: "Templates", description: "Ready-made layouts for magazines, catalogs and reports.", link: "Open templates", href: "/resources/templates", tone: "violet", glow: "color-mix(in srgb, var(--color-violet-500) 12%, transparent)" },
  { icon: "play", title: "Video tutorials", description: "Short walkthroughs of the editor, publishing and analytics.", link: "Watch videos", href: "/resources/webinars", tone: "pink", glow: "color-mix(in srgb, var(--color-pink-500) 12%, transparent)" },
  { icon: "users", title: "Webinars", description: "Live sessions with publishers and our product team.", link: "See schedule", href: "/resources/webinars", tone: "amber", glow: "color-mix(in srgb, var(--color-amber-500) 14%, transparent)" },
  { icon: "trend", title: "Customer stories", description: "How publishers grew revenue and readers with FlipAndShare.", link: "Read stories", href: "/customers", tone: "green", glow: "color-mix(in srgb, var(--color-green-500) 12%, transparent)" },
  { icon: "sparkles", title: "What's new", description: "Release notes and the product roadmap.", link: "See updates", href: "/whats-new", tone: "sky", glow: "color-mix(in srgb, var(--color-blue-400) 12%, transparent)" },
];

export const RESOURCE_FAQS = [
  { question: "How long does converting a PDF take?", answer: "Most issues convert in under a minute. Very large files (300+ pages) can take a few minutes." },
  { question: "Can I use my own domain?", answer: "Yes, on Professional and above. Point a subdomain like read.yourmagazine.com at FlipAndShare and we handle the certificate." },
  { question: "Do my old links keep working if I switch?", answer: "Yes. During migration we set up redirects from your old flipbook URLs to the new editions." },
  { question: "Can advertisers see their own results?", answer: "Yes. Send a one-page report, or give them a read-only link that updates as readers click." },
  { question: "Is there a limit on readers?", answer: "No. Every plan includes unlimited readers and page views." },
];

/** Prototype search: a resource matches when the query contains any word (4+ letters) of its title or meta. Best match first. */
export function searchResources(query: string): Resource[] {
  const words = query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  if (!words.length) return [];
  return RESOURCES.map((r) => {
    const hay = `${r.title} ${r.meta}`.toLowerCase();
    return { r, score: words.filter((w) => hay.includes(w)).length };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.r);
}
