import type { Metadata } from "next";
import { ReasonCard } from "@/components/cards/FeatureCard";
import type { IconName } from "@/components/icons";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ComparisonTable, type ComparisonRow } from "@/components/ui/ComparisonTable";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { StatTile } from "@/components/ui/Stat";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";

export const metadata: Metadata = {
  title: "Why FlipAndShare",
  description:
    "Other tools make flipbooks. FlipAndShare runs the issue: flat plan, booked ads, advertiser proof, QR tracking and a one-week migration from Issuu, Flipsnack and more.",
};

/* Content: design/FlipAndShare Prototype.dc.html L1279–1325 (markup) and L3487–3497, L3615–3631 (data). */

const STATS = [
  ["22 yrs", "building software for magazine publishers"],
  ["1,200+", "publishers and brands"],
  ["48,000+", "publications live"],
  ["1 week", "typical archive migration"],
] as const;

const REASONS: { icon: IconName; title: string; description: string; impact: string }[] = [
  {
    icon: "layout",
    title: "Your flat plan and your flipbook are the same thing",
    description:
      "Booked ads from Magazine Manager land on the right page. Swap an ad and the digital edition updates. No re-uploading a new PDF for every change.",
    impact: "Hours saved per issue on ad changes",
  },
  {
    icon: "megaphone",
    title: "You can sell the digital edition, not just post it",
    description:
      "Ad Adviser suggests digital add-ons per advertiser. Hotspots, video and shoppable tags become line items on the insertion order.",
    impact: "New digital revenue on existing print ads",
  },
  {
    icon: "chart",
    title: "Every advertiser gets proof",
    description:
      "Click history per ad, per page and per issue, in a report you can send the day after publishing. Renewals are easier when the numbers are in front of them.",
    impact: "Higher advertiser renewal rates",
  },
  {
    icon: "qr",
    title: "Print readers become digital readers",
    description:
      "Trackable QR codes on the printed page open the matching spot in the edition. Print scans and digital clicks sit in the same report.",
    impact: "Print campaigns you can finally measure",
  },
  {
    icon: "text",
    title: "Found in Google, readable on phones",
    description:
      "Article mode gives every page real text, headings and alt text. Search engines and AI assistants can quote it; screen readers can read it.",
    impact: "Organic traffic from back issues",
  },
  {
    icon: "users",
    title: "Your team signs off before anything goes live",
    description:
      "Comments on the page, roles, materials-received and proof-approved gates, and a log of who did what. Nothing publishes by accident.",
    impact: "Fewer errors in published issues",
  },
];

const COMPETITORS = ["FlipAndShare", "Flipsnack", "FlippingBook", "Publuu", "Heyzine", "Issuu"];

const COMPARISON: ComparisonRow[] = [
  { label: "PDF to flipbook", icon: "upload", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
  { label: "Interactive hotspots (links, video, buy)", icon: "link", values: ["Yes", "Strong", "Strong", "Strong", "Medium", "Medium"] },
  { label: "Reader analytics", icon: "chart", values: ["Advanced", "Advanced", "Advanced", "Medium", "Paid tiers", "Medium"] },
  { label: "SEO page + article reading mode", icon: "text", values: ["Yes", "Strong", "Strong", "Medium", "Medium", "Strong"] },
  { label: "Drag-and-drop flat plan with booked ads", icon: "layout", values: ["Yes", "—", "—", "—", "—", "—"] },
  { label: "Ad Adviser (suggested ad placement)", icon: "sparkles", values: ["Yes", "—", "—", "—", "—", "—"] },
  { label: "Advertiser materials portal", icon: "inbox", values: ["Yes", "—", "—", "—", "—", "—"] },
  { label: "QR codes: Print vs Digital scan tracking", icon: "qr", values: ["Yes", "Basic", "Basic", "Basic", "Basic", "—"] },
  { label: "Social promotion with AI captions", icon: "megaphone", values: ["Yes", "Partial", "—", "—", "—", "Partial"] },
  { label: "Advertiser click history + ad revenue", icon: "trend", values: ["Yes", "—", "—", "—", "—", "—"] },
  { label: "Entry price / month", icon: "tag", values: ["Free", "~$14", "$20", "$7", "$5", "~$21"] },
];

const SWITCH_STEPS: TimelineItem[] = [
  {
    title: "Send us your list",
    meta: "Day 1",
    description: "Share a link to your current account or a folder of PDFs. We map titles, issues and URLs.",
  },
  {
    title: "We convert and enrich",
    meta: "Days 2–4",
    description: "Every back issue converted, with article mode, SEO metadata and existing links preserved.",
  },
  {
    title: "Review in a staging library",
    meta: "Day 5",
    description: "Your team checks everything on a private link before any reader sees it.",
  },
  {
    title: "Switch and redirect",
    meta: "Day 6–7",
    description: "Old URLs redirect to the new editions. Emails, social posts and search results keep working.",
  },
];

const PROMISES: { icon: IconName; title: string; description: string }[] = [
  { icon: "check", title: "Free migration", description: "We move your archive on any paid plan, at no extra cost." },
  { icon: "lock", title: "Your content stays yours", description: "Export every PDF, page and analytics record at any time, in open formats." },
  { icon: "users", title: "People who know publishing", description: "Support from a team that has worked with magazine publishers for two decades." },
  { icon: "history", title: "No lock-in contracts", description: "Monthly plans cancel any time. Annual plans are refundable in the first 30 days." },
];

/** Why FlipAndShare (design/FlipAndShare Prototype.dc.html L1279–1325). */
export default function WhyUsPage() {
  return (
    <>
      <PageHero
        glow={HERO_GLOW.why}
        eyebrow="WHY FLIPANDSHARE"
        eyebrowColor={HERO_ACCENT.why}
        title="Other tools make flipbooks. We run the issue."
        lead="FlipAndShare comes from 22 years of building software for magazine publishers. The flipbook is the part readers see. Behind it sit the flat plan, the booked ads, the advertiser materials, the sign-offs and the report you send each advertiser after the issue goes out."
        titleSize="xl"
        padding="why"
        gap={18}
        contentWidth={820}
      >
        <div className="mt-1 flex flex-wrap gap-2.5">
          <Button href="/signup" variant="primary" size="xl" glow>
            Create for Free
          </Button>
          <Button href="/demo" variant="onDark" size="xl">
            Talk to Sales
          </Button>
        </div>
        <ul className="relative m-0 mt-12 grid list-none grid-cols-4 gap-3.5 p-0 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {STATS.map(([value, label], i) => (
            <li key={value} className="flex" style={{ animation: `fasSlideIn .5s ease-out ${i * 0.1}s both` }}>
              <StatTile variant="hero" size="lg" value={value} label={label} className="w-full" />
            </li>
          ))}
        </ul>
      </PageHero>

      <section aria-labelledby="reasons-title" className="mx-auto flex max-w-page flex-col gap-8 px-8 py-20 max-sm:px-5">
        <SectionHeader
          id="reasons-title"
          eyebrow="SIX REASONS PUBLISHERS SWITCH"
          title="Built around how an issue actually gets made and sold."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[18px]">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06} className="flex">
              <ReasonCard {...r} n={`0${i + 1}`} className="w-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="compare-title" className="border-y border-gray-200 bg-slate-50 px-8 py-20 max-sm:px-5">
        <div className="mx-auto flex max-w-page flex-col gap-8">
          <SectionHeader
            id="compare-title"
            eyebrow="SIDE BY SIDE"
            size="lg"
            title="Everything the flipbook tools do. Plus the publishing business around it."
          />
          <Reveal>
            <ComparisonTable
              variant="competitors"
              columns={COMPETITORS}
              rows={COMPARISON}
              caption="FlipAndShare compared with Flipsnack, FlippingBook, Publuu, Heyzine and Issuu"
              footnote="Competitor data from public feature and pricing pages, September 2026 research pass. Verify before commercial use. Entry prices are annual-equivalent monthly."
            />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="switch-title"
        className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-12 px-8 py-20 max-sm:px-5"
      >
        <SectionHeader
          id="switch-title"
          eyebrow="SWITCHING"
          size="xs"
          title="Move your back issues in a week. Keep your links."
          lead="We migrate your archive from Issuu, FlipHTML5, Flipsnack or Joomag for you. Old URLs redirect to the new editions, so links in emails, social posts and search results keep working."
        >
          <div className="mt-1.5">
            <Button href="/demo" variant="navy" radius="md">
              Plan my migration
            </Button>
          </div>
        </SectionHeader>
        <Timeline variant="numbered" items={SWITCH_STEPS} revealStagger={0.08} />
      </section>

      <section aria-labelledby="promises-title" className="border-t border-gray-200 bg-slate-50 px-8 py-[72px] max-sm:px-5">
        <div className="mx-auto flex max-w-page flex-col gap-7">
          <SectionHeader id="promises-title" eyebrow="OUR PROMISES" size="xs" title="What you can hold us to." />
          <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.07} className="flex flex-col gap-2.5 rounded-lg border border-gray-200 bg-white p-[22px]">
                <IconTile name={p.icon} tone="mint" size={38} />
                <span className="text-[15.5px] font-bold text-navy-800">{p.title}</span>
                <span className="text-[13.5px] leading-[1.55] text-gray-600">{p.description}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCtaBanner
        art="why"
        title="See it with your own issue."
        subtitle="Upload a PDF and have an interactive edition in minutes. Free account, no credit card."
        secondary={{ label: "See pricing", href: "/pricing" }}
        size="lg"
        ctaSize="large"
        titleSize="fluidLg"
        sectionPadding="spaced"
      />
    </>
  );
}
