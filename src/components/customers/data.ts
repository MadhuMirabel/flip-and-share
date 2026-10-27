import type { IconName } from "@/components/icons";

/* Customers content (design/FlipAndShare Prototype.dc.html L3114 `CASES`, L3765–3782). Figures are illustrative. */

export const HERO_STATS = [
  { value: 84, prefix: "+", suffix: "%", label: "digital ad revenue per issue" },
  { value: 2.6, prefix: "", suffix: "×", label: "reads per issue vs. PDF link" },
  { value: 5, prefix: "-", suffix: " days", label: "from final proof to live" },
  { value: 92, prefix: "", suffix: "%", label: "of customers renewed after year one" },
];

export type CaseKpi = {
  name: string;
  value: number;
  prefix: string;
  suffix: string;
  sub: string;
  /** green = improvement worth highlighting. */
  tone: "good" | "plain";
};

export type CaseStudy = {
  key: string;
  name: string;
  meta: string;
  /** Index into COVERS. */
  cover: number;
  /** Dot / bar colour. */
  color: string;
  quote: string;
  who: string;
  before: string;
  after: string;
  chartTitle: string;
  /** Four issues before, four after. */
  bars: number[];
  unit: string;
  kpis: CaseKpi[];
  used: { name: string; href: string }[];
};

const kpi = (name: string, value: number, prefix: string, suffix: string, sub: string, tone: CaseKpi["tone"]): CaseKpi => ({
  name, value, prefix, suffix, sub, tone,
});

export const CASES: CaseStudy[] = [
  {
    key: "oc",
    name: "OC Parenting",
    meta: "Regional family magazine · 64 pages · monthly · Orange County",
    cover: 0,
    color: "#0ea5e9",
    quote:
      "Advertisers used to ask what they got for the digital edition and we had a page-view number. Now sales opens the click report in the meeting and renews on the spot.",
    who: "Publisher, OC Parenting",
    before:
      "A PDF link emailed to the list. No idea which pages were read or which ads were clicked. Digital sold as a free add-on to print.",
    after:
      "Every ad is a tracked hotspot, QR codes on the print pages, and a per-advertiser click report attached to each renewal.",
    chartTitle: "Digital ad revenue per issue",
    bars: [8.2, 8.6, 8.1, 8.9, 12.4, 14.8, 16.1, 17.3],
    unit: "k",
    kpis: [
      kpi("Digital ad revenue", 94, "+", "%", "per issue, 4 issues in", "good"),
      kpi("Advertiser renewals", 31, "+", " pts", "from 58% to 89%", "good"),
      kpi("Reads per issue", 2.4, "", "×", "incl. app and article mode", "plain"),
      kpi("Time to publish", 3, "", " days", "from 9 (proof + gates)", "plain"),
    ],
    used: [
      { name: "Ad Manager", href: "/platform/ad-manager" },
      { name: "QR Codes", href: "/platform/qr" },
      { name: "Analytics", href: "/platform/analytics" },
      { name: "Collaboration", href: "/platform/collaboration" },
    ],
  },
  {
    key: "shore",
    name: "Shoreline Home",
    meta: "Furniture catalog retailer · 32 pages · 6 catalogs a year",
    cover: 4,
    color: "#ec4899",
    quote:
      "The catalog stopped being a brochure and became a store. Shop this page did more in its first season than our email campaigns did all year.",
    who: "Head of E-commerce, Shoreline Home",
    before:
      "Printed catalog, PDF on the website. Customers had to find the product on the site themselves. No attribution at all.",
    after:
      "Every product is a Shop this page pin with price and Buy now. Catalog sessions land in analytics with revenue per page.",
    chartTitle: "Catalog-attributed orders per catalog",
    bars: [140, 155, 150, 162, 410, 520, 610, 680],
    unit: "",
    kpis: [
      kpi("Catalog-attributed orders", 4.2, "", "×", "per catalog vs. PDF era", "good"),
      kpi("Attributed revenue", 186, "$", "k", "first shoppable season", "good"),
      kpi("Product taps per session", 6.8, "", "", "avg. across 6 catalogs", "plain"),
      kpi("Design hours per catalog", 40, "-", "%", "templates + content hub", "plain"),
    ],
    used: [
      { name: "Shop this page", href: "/platform" },
      { name: "Templates", href: "/resources/templates" },
      { name: "Analytics", href: "/platform/analytics" },
    ],
  },
  {
    key: "crop",
    name: "Specialty Crop Grower",
    meta: "Association member magazine · 40 pages · quarterly · 11k members",
    cover: 9,
    color: "#16a34a",
    quote:
      "Members read it on their phones in the field now. Offline downloads were the surprise; a third of reads happen with no signal.",
    who: "Communications Director, Specialty Crop Grower",
    before:
      "Print mailed to members, PDF on the members portal. Open rate unknown. Two staff spent a week per issue on proofing by email.",
    after:
      "Branded app with new-issue push, offline reading, and article mode for search. Proof links and sign-off gates replaced the email chain.",
    chartTitle: "Members reading each issue",
    bars: [1.9, 2.1, 2.0, 2.2, 4.6, 5.8, 6.4, 6.9],
    unit: "k",
    kpis: [
      kpi("Members reading digitally", 3.1, "", "×", "from 2.2k to 6.9k", "good"),
      kpi("Offline reads", 34, "", "%", "of app reads", "plain"),
      kpi("Print run", 28, "-", "%", "with opt-in digital-only", "good"),
      kpi("Proofing time", 5, "-", " days", "per issue", "plain"),
    ],
    used: [
      { name: "Mobile app", href: "/platform/mobile" },
      { name: "Collaboration", href: "/platform/collaboration" },
      { name: "Article mode", href: "/features/seo" },
    ],
  },
  {
    key: "agency",
    name: "Northlight Media",
    meta: "Publishing agency · 9 client titles · 110 issues a year",
    cover: 6,
    color: "#8b5cf6",
    quote:
      "Nine clients, nine domains, one login. AI drafts the tags and alt text, so a two-person team ships what used to need five.",
    who: "Managing Director, Northlight Media",
    before:
      "A different flipbook tool per client, separate logins and invoices. Alt text and SEO were skipped because nobody had time.",
    after:
      "One workspace per client with roles, custom domains and white label. Auto-tagging, summaries and alt text on every upload.",
    chartTitle: "Issues shipped per month, same team",
    bars: [6, 7, 6, 7, 9, 10, 11, 12],
    unit: "",
    kpis: [
      kpi("Issues per month", 71, "+", "%", "with the same 2 people", "good"),
      kpi("Tooling cost", 62, "-", "%", "9 tools → 1", "good"),
      kpi("Pages with alt text", 100, "", "%", "from about 10%", "plain"),
      kpi("Client retention", 100, "", "%", "two renewal cycles", "plain"),
    ],
    used: [
      { name: "AI & Automation", href: "/platform/ai" },
      { name: "Solutions for agencies", href: "/use-cases/agency" },
      { name: "Templates", href: "/resources/templates" },
    ],
  },
];

export const LEVERS: { icon: IconName; name: string; desc: string; stat: string }[] = [
  { icon: "target", name: "Sell the digital edition", desc: "Tracked hotspots, click reports per advertiser and Ad Manager inventory turn “free add-on” into a line on the rate card.", stat: "Median +84% digital ad revenue" },
  { icon: "qr", name: "Prove print works", desc: "QR codes on printed pages report scans per advertiser. Print renewals get a number instead of a hope.", stat: "+31 pts renewal rate (OC Parenting)" },
  { icon: "sparkles", name: "Sell from the page", desc: "Shop this page and lead forms turn catalogs and brochures into attributable orders and leads.", stat: "4.2× attributed orders (Shoreline)" },
  { icon: "history", name: "Publish with fewer hours", desc: "Templates, content hub, AI drafts and sign-off gates cut proofing and production time.", stat: "-40% design hours, -5 days to live" },
];

export const LOGOS = [
  "OC Parenting", "Shoreline Home", "Specialty Crop Grower", "Northlight Media",
  "RV News", "Out & About Wisconsin", "BankBeat", "LA Parent",
];

/* ROI model (prototype L3767–3781). */
export type RoiInputs = { issues: number; pages: number; ads: number };
export const ROI_DEFAULTS: RoiInputs = { issues: 12, pages: 48, ads: 20 };
export const PLAN_ANNUAL = 29 * 12;

export function roi({ issues, pages, ads }: RoiInputs) {
  const adRev = issues * ads * 450 * 0.35;
  const qr = issues * 900;
  const saved = issues * (pages / 48) * 12 * 55;
  const total = adRev + qr + saved;
  const months = total > 0 ? Math.max(1, Math.ceil(PLAN_ANNUAL / (total / 12))) : 0;
  return { adRev, qr, saved, total, months, barPct: Math.min(100, (PLAN_ANNUAL / Math.max(1, total)) * 100 * 12) };
}
