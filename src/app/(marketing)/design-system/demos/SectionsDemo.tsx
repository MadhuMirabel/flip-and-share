import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { DarkPromoPanel, GlassCard, InlineCtaStrip, MiniConvertArt, SpecialistBanner } from "@/components/sections/Banners";
import { ClosingCtaBanner, ctaLinkClass } from "@/components/sections/ClosingCtaBanner";
import { ContactLinkCards, ContactStrip } from "@/components/sections/Contact";
import { CTA_ART_KINDS, CtaArtSvg, featureArt } from "@/components/sections/CtaArt";
import { FeatureCellGrid } from "@/components/sections/FeatureCellGrid";
import { HERO_ACCENT, HERO_GLOW, HERO_PATTERN, PageHero, USE_CASE_HERO_BG, type HeroPage } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SplitSection } from "@/components/sections/SplitSection";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="m-0 font-mono text-eyebrow font-semibold tracking-eyebrow text-gray-500 uppercase">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/** Edge-to-edge frame so full-width sections can be previewed inside the design-system page. */
function Frame({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-lg border border-gray-200">{children}</div>;
}

const Visual = ({ label }: { label: string }) => (
  <div
    className="flex aspect-[4/3] items-center justify-center rounded-lg border border-blue-200 font-mono text-small text-blue-700"
    style={{ background: "repeating-linear-gradient(135deg, var(--color-blue-100) 0 8px, var(--color-blue-50) 8px 16px)" }}
  >
    {label}
  </div>
);

const QR_CELLS = [
  { title: "Dynamic codes", description: "Change the destination after printing. The code never changes." },
  { title: "Per-page tracking", description: "Every scan is tied to the page and the issue it came from." },
  { title: "Brand colours", description: "Match the code to the layout without breaking scannability." },
  { title: "Print-ready files", description: "SVG and 300 dpi PNG exports for any press." },
  { title: "Scan alerts", description: "Get notified when a campaign code passes a threshold." },
];

const HERO_PAGES = Object.keys(HERO_GLOW) as HeroPage[];

export function SectionsDemo() {
  return (
    <div className="flex flex-col gap-12">
      <Block title="PageHero · stack + grid (analytics)">
        <Frame>
          <PageHero
            headingLevel="h2"
            glow={HERO_GLOW.analytics}
            pattern="grid"
            eyebrow="ANALYTICS"
            eyebrowColor={HERO_ACCENT.analytics}
            title="Know which pages your readers actually read."
            lead="Reads, time on page, clicks and heatmaps for every issue, ready to send to advertisers."
            leadMaxWidth={600}
          >
            <div className="flex flex-wrap gap-2.5">
              <Button href="/signup" glow size="lg">
                Create for Free
              </Button>
              <Button href="/demo" variant="onDark" size="lg">
                Watch the demo
              </Button>
            </div>
          </PageHero>
        </Frame>
      </Block>

      <Block title="PageHero · split + timeline (what's new) · use-case background + covers · shelf · tiers">
        <Frame>
          <PageHero
            headingLevel="h2"
            glow={HERO_GLOW.news}
            pattern="timeline"
            layout="split"
            width={1100}
            splitMinCol={320}
            splitGap={40}
            padding="roomy"
            eyebrow="WHAT'S NEW"
            eyebrowColor={HERO_ACCENT.news}
            title="Shipped this month."
            lead="Every release, in plain language."
            aside={<Visual label="release card" />}
          />
        </Frame>
        <Frame>
          <PageHero
            headingLevel="h2"
            glow={HERO_GLOW.usecase}
            pattern="covers"
            background={USE_CASE_HERO_BG.industry}
            padding="even"
            eyebrow="BY INDUSTRY · MAGAZINE PUBLISHERS"
            eyebrowColor={HERO_ACCENT.usecase}
            title="Sell more of every page you already print."
          />
        </Frame>
        <Frame>
          <PageHero
            headingLevel="h2"
            glow={HERO_GLOW.examples}
            pattern="shelf"
            padding="compact"
            titleSize="lg"
            leadLeading="tight"
            eyebrow="EXAMPLES"
            eyebrowColor={HERO_ACCENT.examples}
            title="Real issues, live right now."
            lead="Browse publications made with FlipAndShare."
          />
        </Frame>
        <Frame>
          <PageHero
            headingLevel="h2"
            glow={HERO_GLOW.pricing}
            pattern="tiers"
            layout="center"
            gap={18}
            eyebrow="PRICING"
            eyebrowColor={HERO_ACCENT.pricing}
            title="Start free. Upgrade when your readers do."
          />
        </Frame>
      </Block>

      <Block title="Hero glow + accent per page">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
          {HERO_PAGES.map((p) => (
            <div key={p} className="relative h-24 overflow-hidden rounded-lg bg-ink-950 p-3">
              <span
                aria-hidden="true"
                className="absolute -top-8 -right-8 h-24 w-24 rounded-full blur-[24px]"
                style={{ background: HERO_GLOW[p] }}
              />
              <span className={`relative font-mono text-eyebrow font-semibold tracking-eyebrow uppercase ${HERO_ACCENT[p]}`}>
                {p}
              </span>
              <span className="relative mt-1 block font-mono text-2xs text-slate-400">{HERO_PATTERN[p] ?? "none"}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Section tones + SectionHeader sizes">
        <Frame>
          <Section padding="md" labelledBy="demo-sec-a">
            <SectionHeader
              id="demo-sec-a"
              as="h3"
              size="lg"
              eyebrow="HOW IT WORKS"
              title="From PDF to interactive edition in four steps."
              lead="Upload once, enhance the pages that matter, publish everywhere, and see what readers did."
              leadSize="lg"
              action={
                <Button href="/platform" variant="link" iconLeft="arrow">
                  See the platform
                </Button>
              }
            />
          </Section>
          <Section tone="tinted" padding="sm" labelledBy="demo-sec-b">
            <SectionHeader id="demo-sec-b" as="h3" number="01" eyebrow="AD UNITS" title="Every ad becomes clickable." size="xs" />
          </Section>
          <Section tone="tinted" tint="gray" padding="sm" narrow labelledBy="demo-sec-c">
            <SectionHeader id="demo-sec-c" as="h3" align="center" size="sm" eyebrow="WHY TEAMS MOVE" title="Centred, sm, narrow, gray-50 band." />
          </Section>
          <Section tone="dark" padding="md" labelledBy="demo-sec-d">
            <SectionHeader id="demo-sec-d" as="h3" tone="dark" eyebrow="ON DARK" title="Default md size on ink-950." lead="Lead turns slate-300." />
          </Section>
        </Frame>
      </Block>

      <Block title="SplitSection · default + reverse (minCol 320)">
        <SplitSection
          text={<SectionHeader as="h3" eyebrow="QR CODES" title="Put a live link on the printed page." lead="Every scan is tracked to the page." />}
          visual={<Visual label="visual" />}
        />
        <SplitSection
          reverse
          minCol={320}
          text={<SectionHeader as="h3" eyebrow="REVERSED" title="Visual first." />}
          visual={<Visual label="visual" />}
        />
      </Block>

      <Block title="FeatureCellGrid · reveal stagger (220) + static (180)">
        <FeatureCellGrid items={QR_CELLS} reveal />
        <FeatureCellGrid items={QR_CELLS.slice(0, 4)} minCol={180} />
      </Block>

      <Block title="ClosingCtaBanner">
        <Frame>
          <ClosingCtaBanner
            art="analytics"
            background="slate"
            sectionPadding="spaced"
            title="See these numbers for your own issue."
            subtitle="Free account, no credit card."
          />
        </Frame>
        <ClosingCtaBanner
          sectionPadding="none"
          art="ai"
          title="Upload one PDF and see what gets drafted."
          subtitle={
            <>
              Free account, no credit card. AI drafts are included on the{" "}
              <a href="/pricing" className={ctaLinkClass}>
                free plan
              </a>
              , 1 publication for the first month.
            </>
          }
        />
        <ClosingCtaBanner
          sectionPadding="none"
          art="why"
          size="lg"
          ctaSize="large"
          titleSize="fluidLg"
          title="See it with your own issue."
          subtitle="Upload a PDF and have an interactive edition in minutes."
          secondary={{ label: "See pricing", href: "/pricing" }}
        />
        <ClosingCtaBanner
          sectionPadding="none"
          art={featureArt("links")}
          size="sm"
          titleSize="sm"
          maxWidth={1100}
          title="Feature detail: featureArt('links') → play"
          secondary={{ label: "Watch the demo", href: "/demo" }}
        />
        <ClosingCtaBanner
          sectionPadding="none"
          size="lg"
          titleSize="xl"
          subtitleSize="lg"
          title="Your next issue, live in ten minutes."
          subtitle="Upload the PDF you already have. First publication free for a month, no credit card."
          actions={
            <div className="flex flex-col items-end gap-2">
              <Button href="/signup" size="xl" glow>
                Upload a PDF, it&apos;s free
              </Button>
              <a href="/enterprise" className="text-label text-slate-700">
                or book a 20-minute walkthrough
              </a>
            </div>
          }
        />
      </Block>

      <Block title="CtaArt · every kind">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
          {CTA_ART_KINDS.map((k) => (
            <figure key={k} className="m-0 flex flex-col gap-1.5">
              <div
                className="relative aspect-[330/300] overflow-hidden rounded-lg border border-blue-200"
                style={{ background: "linear-gradient(120deg, var(--color-blue-100), var(--color-cyan-50))" }}
              >
                <CtaArtSvg kind={k} />
              </div>
              <figcaption className="font-mono text-small text-gray-500">{k}</figcaption>
            </figure>
          ))}
        </div>
      </Block>

      <Block title="InlineCtaStrip · gradient + flat">
        <InlineCtaStrip
          art={<MiniConvertArt />}
          title="See it with your own PDF."
          sub="Drop a file, watch it convert, and click through the interactive result."
          action={
            <Button href="/signup" glow>
              Upload a PDF, it&apos;s free
            </Button>
          }
          note="Free account · no credit card"
        />
        <InlineCtaStrip
          variant="flat"
          title="Try it on your next issue."
          action={
            <Button href="/signup" radius="md">
              Create for Free
            </Button>
          }
        />
      </Block>

      <Block title="SpecialistBanner">
        <SpecialistBanner />
      </Block>

      <Block title="DarkPromoPanel · md + lg with glow and GlassCard">
        <DarkPromoPanel
          aside={
            <Button href="/webinars" variant="white">
              Save my seat
            </Button>
          }
        >
          <Eyebrow tone="dark">LIVE WEBINAR · OCT 15, 2026 · 11 AM ET</Eyebrow>
          <span className="text-[clamp(22px,2.8vw,28px)] leading-[1.2] font-bold tracking-[-0.02em]">
            Selling digital add-ons to your print advertisers
          </span>
          <span className="text-body-sm text-blue-200">45 minutes. How three publishers price hotspots, QR codes and click reports.</span>
        </DarkPromoPanel>
        <DarkPromoPanel
          size="lg"
          glow
          aside={
            <GlassCard>
              <span className="text-label text-blue-200">Estimated extra revenue / year</span>
              <span className="block text-[32px] font-bold">$18,400</span>
            </GlassCard>
          }
        >
          <Eyebrow tone="dark">ROI CALCULATOR</Eyebrow>
          <span className="text-[32px] leading-[1.15] font-bold tracking-[-0.025em]">What would digital add-ons earn you?</span>
        </DarkPromoPanel>
      </Block>

      <Block title="BeforeAfter · columns + cards">
        <BeforeAfter
          beforeTitle="Static PDF"
          beforeIcon="file"
          beforeItems={["Readers pinch and zoom on phones", "Links in the PDF are lost", "No idea what was read"]}
          afterTitle="Interactive edition"
          afterIcon="sparkles"
          afterItems={["Fits every screen automatically", "Every link, video and form works", "Reads and clicks per page"]}
        />
        <BeforeAfter
          variant="cards"
          before="Emailed a 40 MB PDF to 12,000 members. Half bounced."
          after="One link in the newsletter. 4,800 reads in the first week."
        />
      </Block>

      <Block title="ContactStrip + ContactLinkCards">
        <div className="grid gap-4 md:grid-cols-2">
          <ContactStrip />
          <ContactLinkCards />
        </div>
      </Block>
    </div>
  );
}
