import type { ComparisonRow } from "@/components/ui/ComparisonTable";

/**
 * Pricing copy and sample numbers, from the prototype (script ~L3857–3940).
 * Prices, limits and plan names are illustrative until the product team confirms them (README open item 2).
 */

export const ROLES = [
  { label: "Solo creator", recommended: 0 },
  { label: "Small publisher", recommended: 2 },
  { label: "Publishing group", recommended: 3 },
  { label: "Agency", recommended: 3 },
] as const;

export const DEFAULT_ROLE = 1;

/** [annual, monthly] USD per month. */
export const PRICES: [number, number][] = [
  [0, 0],
  [12, 15],
  [29, 36],
  [69, 86],
];

export type Tier = {
  name: string;
  best: string;
  note?: string;
  cta: string;
  ctaHref: string;
  /** Caption under the CTA; `{price}` is replaced with the monthly price for the chosen billing cycle. */
  sub: string;
  includedLabel: string;
  features: string[];
  highlighted?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Free",
    best: "Try it with one publication.",
    note: "Free for the first month",
    cta: "Create for Free",
    ctaHref: "/signup",
    sub: "No card, no time limit on the account",
    includedLabel: "Included",
    features: ["1 publication, 30 pages", "Page-flip reader on any device", "Basic analytics", "FlipAndShare branding"],
  },
  {
    name: "Starter",
    best: "One title, no branding, real links.",
    cta: "Start 14-day trial",
    ctaHref: "/signup",
    sub: "Then {price}/mo, cancel any time",
    includedLabel: "Everything in Free, plus",
    features: [
      "Unlimited publications and pages",
      "Remove branding, your logo",
      "Video, links and audio hotspots",
      "SEO article mode",
      "Standard analytics",
    ],
  },
  {
    name: "Professional",
    best: "Publishers who sell ads.",
    cta: "Start 14-day trial",
    ctaHref: "/signup",
    sub: "Then {price}/mo, cancel any time",
    includedLabel: "Everything in Starter, plus",
    features: [
      "Custom domain",
      "Lead forms, QR codes, shoppable tags",
      "Advertiser click reports",
      "Ad Adviser and materials portal",
      "Full analytics and heatmaps",
      "Comments and proof approvals",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    best: "Teams, groups and agencies.",
    cta: "Talk to Sales",
    ctaHref: "/demo",
    sub: "Per organisation, unlimited people",
    includedLabel: "Everything in Professional, plus",
    features: [
      "Workspaces and roles",
      "White label and branded reader app",
      "SSO, SCIM and audit log",
      "API, webhooks and CRM sync",
      "Named account manager",
    ],
  },
];

export const TRUST_ITEMS = [
  "14-day trial on paid plans",
  "No credit card to start",
  "Cancel or change any time",
  "Free migration from your current tool",
];

export const PLAN_COLUMNS = ["Free", "Starter", "Professional", "Business"];

const row = (label: string, icon: ComparisonRow["icon"], values: string[], emphasis = false): ComparisonRow => ({
  label,
  icon,
  values,
  emphasis,
});
const section = (label: string, icon: ComparisonRow["icon"]): ComparisonRow => ({ label, icon, section: true });

export const PLAN_ROWS: ComparisonRow[] = [
  row("Publications", "book", ["1 (first month)", "Unlimited", "Unlimited", "Unlimited"], true),
  row("Pages per publication", "file", ["30", "Unlimited", "Unlimited", "Unlimited"]),
  row("PDF import and page conversion", "upload", ["Yes", "Yes", "Yes", "Yes"]),
  row("Hotspots: links, video, audio", "link", ["—", "Yes", "Yes", "Yes"]),
  row("Lead forms and product tags", "form", ["—", "—", "Yes", "Yes"]),
  row("Article reading mode and SEO metadata", "text", ["Yes", "Yes", "Yes", "Yes"]),
  row("Custom domain", "globe", ["—", "—", "Yes", "Yes"]),
  row("Remove FlipAndShare branding", "tag", ["—", "Yes", "Yes", "Yes"]),
  section("Publishing workflow", "layout"),
  row("Flat plan with booked ads and Ad Adviser", "layout", ["—", "—", "Yes", "Yes"]),
  row("Advertiser materials portal", "inbox", ["—", "—", "Yes", "Yes"]),
  row("Sign-off gates and versions", "check", ["—", "—", "Yes", "Yes"]),
  row("Trackable QR codes (Print + Digital)", "qr", ["—", "5 codes", "Unlimited", "Unlimited"]),
  row("Promote to social with AI captions", "sparkles", ["—", "—", "Yes", "Yes"]),
  section("Measure and scale", "chart"),
  row("Reader analytics and heatmaps", "chart", ["Basic", "Basic", "Full", "Full"]),
  row("Advertiser click history and ad revenue", "trend", ["—", "—", "Yes", "Yes"]),
  row("Google Analytics / GTM", "target", ["—", "Yes", "Yes", "Yes"]),
  row("Team workspaces, roles, SSO", "users", ["—", "—", "—", "Yes"]),
  row("API and CRM integrations", "plug", ["—", "—", "—", "Yes"]),
];

export const PRICING_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is the Free plan really free?",
    answer: "Yes. One publication for the first month, with FlipAndShare branding. No credit card is needed to start.",
  },
  {
    question: "Do I need the flat plan and ad features?",
    answer:
      "Only if you sell advertising. Catalog, brochure and report publishers usually start on Starter and never need Ad Adviser or the materials portal.",
  },
  {
    question: "Can readers find my publication on Google?",
    answer:
      "Every publication gets a readable URL, metadata, social previews and an article reading mode with real text, so search engines and screen readers can read it.",
  },
  {
    question: "Is the pricing final?",
    answer:
      "No. These tiers are illustrative for the redesign review. Names, limits and prices will be set by the product team.",
  },
  {
    question: "Can my team work on the same issue?",
    answer: "Business adds workspaces, roles and SSO. Every plan supports the no-login advertiser upload links.",
  },
];

export const PRICING_QUOTES = [
  {
    quote:
      "We priced the click report at $150 per ad. Eleven advertisers took it in the first issue. The plan was paid for before the second one went out.",
    name: "Linda Ruiz",
    role: "Publisher, OC Parenting",
    plan: "Professional",
    initials: "LR",
    color: "var(--color-navy-800)",
  },
  {
    quote:
      "Three brands, one login, one invoice. Our designers stopped emailing PDFs around and comment on the page instead.",
    name: "Mark Tran",
    role: "Group Publisher, Northlight Media",
    plan: "Business",
    initials: "MT",
    color: "var(--color-violet-700)",
  },
];

/* ---------- ROI calculator (prototype `proi`) ---------- */

export type RoiInput = { issues: number; ads: number; addon: number };
export const ROI_DEFAULT: RoiInput = { issues: 12, ads: 8, addon: 150 };

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function roi(input: RoiInput, recommendedTier: number) {
  const planIdx = Math.max(1, recommendedTier);
  const cost = PRICES[planIdx][0] * 12; // always the annual price, as in the prototype
  const revenue = input.issues * input.ads * input.addon;
  const mult = revenue / cost;
  const total = revenue + cost;
  const costW = Math.max(2, Math.min(100, (cost / total) * 100));
  const issuesToPay = Math.max(1, Math.ceil(cost / (input.ads * input.addon)));
  return {
    revenue: usd(revenue),
    cost: usd(cost),
    planName: TIERS[planIdx].name,
    costW,
    gainW: 100 - costW,
    multiple: mult >= 10 ? `${Math.round(mult)}×` : `${mult.toFixed(1)}×`,
    verdict:
      mult >= 1
        ? `return on the plan. It pays for itself after ${issuesToPay} ${issuesToPay === 1 ? "issue." : "issues."}`
        : "return. Below break-even at these numbers; try a higher add-on rate.",
  };
}

export const formatUsd = usd;
