import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Prototype `NEWS.length` (the What's new feed behind the "new releases" link). */
const NEWS_COUNT = 25;

type Feature = {
  icon: IconName;
  tag: string;
  name: string;
  desc: string;
  gap: string;
  href: string;
  bg: string;
  fg: string;
};

const FEATURES: Feature[] = [
  {
    icon: "target",
    tag: "AD SALES",
    name: "Ad Adviser",
    desc: "Every unplaced ad carries a suggested page with a confidence score and the reason: this advertiser's best page, category CTR or top traffic.",
    gap: "No flipbook tool places ads for you.",
    href: "/platform/ad-manager",
    bg: "#fef3c7",
    fg: "#b45309",
  },
  {
    icon: "inbox",
    tag: "PRODUCTION",
    name: "Materials portal",
    desc: "Each insertion gets a no-login upload link. Advertisers drop artwork, it lands as Received, and Validation checks the list.",
    gap: "Ends the artwork-chasing email thread.",
    href: "/platform/ad-manager",
    bg: "#ede9fe",
    fg: "#6d28d9",
  },
  {
    icon: "qr",
    tag: "PRINT + DIGITAL",
    name: "Trackable QR codes",
    desc: "Print and Digital channels with separate scan counts. Pause a code or change its destination without reprinting.",
    gap: "Closes the loop from the printed page.",
    href: "/platform/qr",
    bg: "#dcfce7",
    fg: "#15803d",
  },
  {
    icon: "trend",
    tag: "REVENUE",
    name: "Advertiser click history",
    desc: "Placements, clicks, CTR, best page and trend per advertiser, per issue. The proof your sales team sends with the renewal.",
    gap: "Competitors report views, not advertiser value.",
    href: "/platform/analytics",
    bg: "#e0f2fe",
    fg: "#0369a1",
  },
  {
    icon: "check",
    tag: "GOVERNANCE",
    name: "Issue-close sign-off",
    desc: "Package Issue waits for two accountability gates: all materials received and proof approved by the editor.",
    gap: "No more publishing with a missing ad.",
    href: "/platform/collaboration",
    bg: "#fce7f3",
    fg: "#be185d",
  },
  {
    icon: "history",
    tag: "PLANNING",
    name: "Versions with A/B diff",
    desc: "Name a snapshot of the flat plan, compare any two side by side, restore with a safety copy. Undo and redo on every change.",
    gap: "Plan changes stop living in someone's inbox.",
    href: "/platform/ad-manager",
    bg: "#ccfbf1",
    fg: "#0f766e",
  },
];

/** "What only FlipAndShare does": six whole-card links with fluid icon tiles. */
export function UniqueFeatures() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-9">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[680px] flex-col gap-3">
              <Eyebrow>WHAT ONLY FLIPANDSHARE DOES</Eyebrow>
              <h2 className="m-0 text-[clamp(30px,4vw,40px)] leading-[1.1] font-bold tracking-[-0.03em] text-navy-800">
                Built for publishers who sell pages, not just share them.
              </h2>
            </div>
            <div className="flex flex-wrap gap-[18px]">
              <Link href="/whats-new" className="text-sm font-semibold whitespace-nowrap">
                {NEWS_COUNT} new releases →
              </Link>
              <Link href="/platform" className="text-sm font-semibold whitespace-nowrap">
                Full product tour →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[1000px]:grid-cols-2 max-[640px]:grid-cols-1">
            {FEATURES.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08} className="min-w-0">
                <Link
                  href={f.href}
                  data-hovercard=""
                  className="flex h-full flex-col gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-6 transition-[border-color,background-color] duration-150 hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="fas-fluidtile relative flex size-10 items-center justify-center overflow-hidden rounded-lg"
                      style={{ background: f.bg, color: f.fg }}
                    >
                      <span
                        className="fas-fluidblob absolute top-[7px] left-[7px] size-[26px] rounded-full opacity-0 blur-[6px]"
                        style={{ background: "currentColor" }}
                      />
                      <span className="relative inline-flex">
                        <Icon name={f.icon} size={18} />
                      </span>
                    </span>
                    <span
                      className="rounded-full px-2 py-[3px] text-[11px] font-bold tracking-[0.06em]"
                      style={{ background: f.bg, color: f.fg }}
                    >
                      {f.tag}
                    </span>
                  </span>
                  <span className="text-[18px] leading-[1.2] font-bold text-navy-800">{f.name}</span>
                  <span className="text-sm leading-[1.55] text-gray-600">{f.desc}</span>
                  <span
                    className="mt-auto flex items-baseline gap-1.5 pt-1.5 text-label font-semibold"
                    style={{ color: f.fg }}
                  >
                    {f.gap}
                    <span className="fas-arrow">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
