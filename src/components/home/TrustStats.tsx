import { Icon, type IconName } from "@/components/icons";
import { LogoPill, Marquee } from "@/components/ui/Marquee";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuoteFigure } from "@/components/ui/Quote";
import { Reveal } from "@/components/ui/Reveal";

const STATS: { value: number; suffix: string; label: string; icon: IconName; tone: string; bubble: string; bar: string }[] = [
  { value: 1200, suffix: "+", label: "publishers and brands", icon: "users", tone: "bg-blue-100 text-blue-600", bubble: "bg-blue-100", bar: "bg-blue-100" },
  { value: 48000, suffix: "+", label: "publications live", icon: "grid", tone: "bg-violet-100 text-violet-700", bubble: "bg-violet-100", bar: "bg-violet-100" },
  { value: 22, suffix: " yrs", label: "serving the publishing industry", icon: "history", tone: "bg-amber-100 text-amber-700", bubble: "bg-amber-100", bar: "bg-amber-100" },
  { value: 38, suffix: "M", label: "reader sessions last year", icon: "eye", tone: "bg-green-100 text-green-700", bubble: "bg-green-100", bar: "bg-green-100" },
];

const LOGOS: [string, string, string][] = [
  ["OC Parenting", "OC", "#0c4a6e"],
  ["RV News", "RV", "#ea580c"],
  ["Out & About Wisconsin", "OA", "#0891b2"],
  ["BankBeat", "BB", "#15803d"],
  ["LA Parent", "LA", "#be185d"],
  ["Specialty Crop Grower", "SC", "#65a30d"],
  ["Northlight Media", "NM", "#6d28d9"],
  ["Shoreline Home", "SH", "#0369a1"],
];

/** "By the numbers" band: four count-up stat tiles, the testimonial and the publisher logo marquee. */
export function TrustStats() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative overflow-hidden border-b border-gray-200 px-8 pt-14 pb-11 max-sm:px-5"
      style={{ background: "linear-gradient(180deg,#f0f9ff 0%,#fff 100%)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[140px] left-1/2 h-[320px] w-[900px] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse,rgba(14,165,233,.16),transparent 70%)" }}
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-7">
        <Reveal distance={14} duration={0.6} className="flex flex-col items-center gap-2 text-center">
          <Eyebrow>BY THE NUMBERS</Eyebrow>
          <h2
            id="trust-heading"
            className="m-0 max-w-[640px] text-[clamp(20px,2.4vw,26px)] leading-[1.25] font-semibold tracking-[-.02em] text-navy-800"
          >
            Twenty-two years of publishing software, now in one flipbook platform.
          </h2>
        </Reveal>

        <div className="grid grid-cols-4 gap-4 max-[760px]:grid-cols-2">
          {STATS.map((k, i) => (
            <Reveal key={k.label} distance={14} duration={0.6} delay={i * 0.08} className="flex">
              <div
                data-hovercard
                className="relative flex w-full flex-col gap-2.5 overflow-hidden rounded-lg border border-gray-200 bg-white px-[22px] pt-[22px] pb-5 shadow-[0_20px_40px_-32px_rgba(12,74,110,.45)] transition-[transform,box-shadow] duration-[600ms] ease-[ease] hover:-translate-y-[3px] hover:shadow-[0_30px_50px_-30px_rgba(12,74,110,.5)]"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-[18px] -right-[18px] h-[90px] w-[90px] rounded-full opacity-[.35] blur-[2px] ${k.bubble}`}
                  style={{ animation: "fasBubble 7s ease-in-out infinite", animationDelay: `${i * 0.08}s` }}
                />
                <span
                  aria-hidden="true"
                  className={`fas-fluidtile relative flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-lg ${k.tone}`}
                >
                  <span className="fas-fluidblob absolute top-[7px] left-[7px] h-6 w-6 rounded-full bg-current opacity-0 blur-[6px]" />
                  <span className="relative inline-flex">
                    <Icon name={k.icon} size={18} />
                  </span>
                </span>
                <CountUp
                  value={k.value}
                  suffix={k.suffix}
                  className="relative text-[clamp(30px,3.4vw,40px)] leading-none font-bold tracking-[-.03em] text-navy-900"
                />
                <span className="relative text-sm leading-[1.4] text-gray-600">{k.label}</span>
                <span aria-hidden="true" className={`mt-0.5 h-[3px] w-11 rounded-sm ${k.bar}`} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal duration={0.7} distance={18}>
          <QuoteFigure
            quote={'"We moved 14 titles in a month. Advertisers now get a click report with their invoice, and renewals went up 34% the first year."'}
            initials="JM"
            attribution="Jordan M · Publisher, OC Parenting"
            link={{ href: "/customers", label: "Read the story →" }}
          />
        </Reveal>

        <div className="flex flex-col items-center gap-4">
          <Eyebrow>TRUSTED BY PUBLISHERS ACROSS THE US</Eyebrow>
          <Marquee
            label="Publishers using FlipAndShare"
            className="w-full"
            items={LOGOS.map(([name, initials, color]) => (
              <LogoPill key={name} name={name} initials={initials} color={color} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
