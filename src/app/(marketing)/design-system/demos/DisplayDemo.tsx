import type { ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Avatar, AvatarStack, PEOPLE } from "@/components/ui/Avatar";
import { Badge, CouponCode, MethodBadge, Stamp, StoreBadge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardFooter, CardHeader } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { CodeBlock, ConfigBlock, TerminalWindow } from "@/components/ui/CodeBlock";
import { Countdown } from "@/components/ui/Countdown";
import { Divider } from "@/components/ui/Divider";
import { EmptyState } from "@/components/ui/EmptyState";
import { KeyValueList } from "@/components/ui/KeyValueList";
import { LiveDot, PulseMarker } from "@/components/ui/LiveDot";
import { LogoPill, LogoWall, Marquee } from "@/components/ui/Marquee";
import { BarRow, LegendSwatch, ProgressBar, StackedBar } from "@/components/ui/Progress";
import { PullQuote, QuoteCard, QuoteFigure, TestimonialCard } from "@/components/ui/Quote";
import { StatRow, StatTile } from "@/components/ui/Stat";

const TONES: BadgeTone[] = ["info", "success", "warning", "neutral", "gray", "violet", "danger", "purple", "navy", "primary", "outline", "ai"];
const DARK_TONES: BadgeTone[] = ["onDark", "glass", "live", "white"];

const LOGOS = [
  { name: "OC Parenting", initials: "OC", color: "var(--color-navy-800)" },
  { name: "RV News", initials: "RV", color: "var(--color-orange-600)" },
  { name: "Out & About Wisconsin", initials: "OA", color: "#0891b2" },
  { name: "BankBeat", initials: "BB", color: "var(--color-green-700)" },
  { name: "LA Parent", initials: "LA", color: "var(--color-pink-700)" },
  { name: "Specialty Crop Grower", initials: "SC", color: "#65a30d" },
  { name: "Northlight Media", initials: "NM", color: "var(--color-violet-700)" },
  { name: "Shoreline Home", initials: "SH", color: "var(--color-blue-700)" },
];

function Block({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="m-0 font-mono text-eyebrow font-semibold tracking-eyebrow text-gray-500 uppercase">{title}</h3>
      <div className={`flex flex-col gap-4 ${dark ? "rounded-lg bg-ink-950 p-5 text-white" : ""}`}>{children}</div>
    </div>
  );
}

/** Every display primitive (group B) with sample props. */
export function DisplayDemo() {
  return (
    <section aria-labelledby="ds-display" className="border-t border-gray-200 py-14">
      <h2 id="ds-display" className="m-0 mb-8 text-h2 text-navy-800">
        Display primitives
      </h2>
      <div className="flex flex-col gap-12">
        <Block title="Badge · tones × sizes">
          {(["xs", "sm", "md"] as const).map((s) => (
            <div key={s} className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <Badge key={t} tone={t} size={s} uppercase={s === "xs"}>
                  {t}
                </Badge>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="success" dot>
              Published
            </Badge>
            <Badge tone="warning">Draft</Badge>
            <Badge tone="violet" uppercase>
              On upload
            </Badge>
            <Badge tone="info" size="md" icon="sparkles">
              Professional · Annual
            </Badge>
            <MethodBadge method="GET" />
            <MethodBadge method="POST" />
            <MethodBadge method="HOOK" />
            <Stamp>✓ Packaged</Stamp>
            <CouponCode code="FLIP20" />
          </div>
        </Block>

        <Block title="Badge · on dark" dark>
          <div className="flex flex-wrap items-center gap-2">
            {DARK_TONES.map((t) => (
              <Badge key={t} tone={t} size="md">
                {t}
              </Badge>
            ))}
            <Badge tone="live" pulse>
              Live
            </Badge>
            <Badge tone="glass" size="md" pulse="blink">
              Recording
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <StoreBadge store="app-store" />
            <StoreBadge store="google-play" />
            <StoreBadge store="web" href="#" />
          </div>
        </Block>

        <Block title="Card · variants">
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <Card hover="lift">
              <CardHeader title="Default" subtitle="White, gray-200 border, lifts on hover" />
            </Card>
            <Card variant="tinted" hover="border">
              <CardHeader title="Tinted" subtitle="Blue-50, border turns blue-300 on hover" />
            </Card>
            <Card variant="navy">
              <CardHeader tone="dark" title="Navy" subtitle="ROI and promo cards" />
            </Card>
            <Card variant="elevated" padding="lg">
              <CardHeader size="lg" title="Elevated" subtitle="Forms and wizards" actions={<Badge tone="success">Saved</Badge>} />
              <CardFooter>
                <Button variant="neutral" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save changes</Button>
              </CardFooter>
            </Card>
            <Card variant="dashed" radius="lg" padding="base">
              <CardHeader title="Dashed" subtitle="Placeholders and add-new slots" />
            </Card>
            <div className="rounded-lg bg-ink-950 p-4">
              <Card variant="glass" padding="sm">
                <CardHeader tone="dark" title="Glass" subtitle="On ink heroes" />
              </Card>
            </div>
          </div>
        </Block>

        <Block title="Avatar · AvatarStack">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar initials="PS" color={PEOPLE[0].color} size={24} />
            <Avatar initials="MR" color="var(--color-blue-100)" textColor="var(--color-navy-700)" size={32} label="Madhu R" />
            <Avatar initials="DL" color={PEOPLE[2].color} size={40} />
            <Avatar initials="JM" gradient="amber" size={52} />
            <Avatar initials="AK" gradient="profile" size={64} />
            <AvatarStack people={PEOPLE.slice(0, 3)} size={40} float shadow presence label="3 teammates online" />
            <AvatarStack people={PEOPLE.slice(0, 3)} size={30} />
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-ink-950 p-5 text-sm text-blue-200">
            <AvatarStack people={PEOPLE} size={56} ring="ink" pop presence label="5 people editing" />
            <span>
              <b className="text-white">5 people</b> editing this issue
            </span>
          </div>
        </Block>

        <Block title="Progress · BarRow · StackedBar">
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="flex flex-col gap-3">
              <ProgressBar value={42} label="Upload progress" tone="sky" />
              <ProgressBar value={4} max={5} threshold height={6} label="Publications used" />
              <ProgressBar value={0} unlimited threshold label="Team seats" />
              <ProgressBar value={68} height={12} color="var(--color-violet-500)" label="Forecast sold" />
              <BarRow label="Google search" value="38%" pct={38} height={6} tone="sky" />
              <BarRow layout="grid" label="Chicago" value="1,284" pct={72} delay={0.1} />
              <BarRow layout="grid" label="Denver" value="906" pct={51} delay={0.2} color="var(--color-green-600)" />
            </div>
            <div className="flex flex-col gap-3 rounded-lg bg-ink-950 p-5">
              <BarRow layout="grid" tone="dark" height={4} animate="wide" label="Hotspots" value="412" pct={80} />
              <BarRow layout="grid" tone="dark" height={4} animate="wide" label="Video" value="198" pct={38} />
              <ProgressBar value={64} tone="glass" height={8} color="var(--color-green-500)" animate="transition" label="Payback" />
              <StackedBar
                label="Readers by device"
                segments={[
                  { label: "Mobile", value: 58, color: "var(--color-blue-500)" },
                  { label: "Desktop", value: 34, color: "var(--color-blue-300)" },
                  { label: "Tablet", value: 8, color: "var(--color-violet-500)" },
                ]}
              />
              <div className="flex gap-3">
                <LegendSwatch tone="dark" color="var(--color-blue-500)" label="Flipbook" />
                <LegendSwatch tone="dark" shape="dot" color="var(--color-blue-300)" label="Article mode" />
              </div>
            </div>
          </div>
        </Block>

        <Block title="StatTile · StatRow">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
            <StatTile label="Readers" value="18,420" delta="+12.4% vs last period" />
            <StatTile label="Avg. time" value="4m 12s" delta="No change" deltaTone="neutral" />
            <StatTile variant="mini" label="Page views" value="1.24M" delta="+18%" index={0} />
            <StatTile variant="mini" label="Leads" value="347" delta="+9%" index={1} />
            <StatTile variant="plain" label="Hours saved per issue" value="6 hrs" />
            <StatTile variant="kpi" label="Publishers and brands" value="1,200+" />
          </div>
          <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
            <StatTile variant="pastel" index={0} tag="Outcome" value="3× more" label="advertiser clicks reported" />
            <StatTile variant="pastel" index={1} tag="Built in" value="12 min" label="from PDF to live flipbook" />
            <StatTile variant="pastel" index={2} tag="Proof" value="34%" label="renewal lift in year one" />
          </div>
          <div className="flex flex-wrap gap-3.5 rounded-lg bg-ink-950 p-5">
            <StatTile variant="hero" label="Auto-tagged links" value="14" />
            <StatTile variant="hero" label="Faster turnaround" value="3.2×" />
            <StatTile variant="hero" size="lg" label="Reader sessions" value="38M" />
          </div>
          <StatRow
            items={[
              { icon: "clock", value: "12 min", label: "Average setup" },
              { icon: "users", value: "1,200+", label: "Publishers" },
              { icon: "chart", value: "38M", label: "Sessions last year" },
            ]}
          />
        </Block>

        <Block title="Alert · EmptyState · Divider">
          <Alert
            variant="banner"
            title="October issue is live"
            actions={
              <>
                <Button variant="neutral" size="xs">
                  Copy link
                </Button>
                <Button variant="success" size="xs">
                  See analytics
                </Button>
              </>
            }
          >
            flipandshare.com/oc-parenting/october-2026
          </Alert>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Alert title="✓ Request received">We will reply within one business day.</Alert>
            <Alert tone="info" title="Accessibility check">
              11 of 14 images have alt text.
              <ProgressBar value={11} max={14} tone="white" label="Images with alt text" className="mt-2" />
            </Alert>
            <Alert tone="warning" title="You have used 82% of your publications">Upgrade to keep publishing this month.</Alert>
            <Alert tone="danger" compact title="Payment failed">
              Update your card to avoid interruption.
            </Alert>
          </div>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <EmptyState>No publications match your search.</EmptyState>
            <EmptyState variant="dashed" border="gray-200" icon="search" title="No templates match" action={<Button size="sm" variant="neutral">Clear filters</Button>}>
              Try another word or category.
            </EmptyState>
            <EmptyState variant="placeholder">Pick a time to see available slots.</EmptyState>
            <EmptyState variant="card">No upcoming webinars right now.</EmptyState>
            <EmptyState variant="plain">No articles match.</EmptyState>
            <EmptyState variant="inline">No elements yet. Add one from the left.</EmptyState>
          </div>
          <Divider />
          <Divider label="or with email" />
        </Block>

        <Block title="CheckList · KeyValueList">
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            <CheckList variant="plain" items={["Unlimited readers", <>Works with <a href="#">your CMS</a></>, "Cancel any time"]} />
            <CheckList
              size="sm"
              items={["Custom domain", "Lead forms", { content: "SSO", included: false }, { content: "Audit log", included: false }]}
            />
            <CheckList variant="icon" items={["Bring your latest issue", { content: "Know your ad sizes", icon: "target" }]} />
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-ink-950 p-5">
            <CheckList tone="dark" variant="plain" items={["Same link on every device", "Search-indexed article mode"]} />
            <CheckList tone="dark" variant="inline" items={["SOC 2 Type II", "GDPR & CCPA", "99.9% uptime SLA", "EU or US data residency"]} />
          </div>
          <KeyValueList
            className="max-w-sm"
            items={[
              { key: "Plan", value: "Professional · Annual" },
              { key: "Card", value: "Visa •••• 4242" },
              { key: "Billing email", value: "billing@ocparenting.com" },
            ]}
            summary={{ key: "Next charge", value: "$708 on Jan 4, 2027" }}
          />
        </Block>

        <Block title="LiveDot · PulseMarker">
          <div className="flex flex-wrap items-center gap-5 text-label text-gray-700">
            <span className="inline-flex items-center gap-2">
              <LiveDot /> Online
            </span>
            <span className="inline-flex items-center gap-2">
              <LiveDot color="violet" size={6} /> AI working
            </span>
            <span className="inline-flex items-center gap-2">
              <LiveDot color="blue" size={9} /> Active now
            </span>
            <span className="inline-flex items-center gap-2">
              <LiveDot color="red" mode="blink" label="Recording" /> REC
            </span>
            <PulseMarker />
            <PulseMarker color="amber" size={10} />
            <span className="rounded-md bg-navy-800 p-3">
              <PulseMarker color="white" size={18} border={3} halo={6} duration={1.6} />
            </span>
          </div>
        </Block>

        <Block title="Quotes">
          <QuoteFigure
            initials="JM"
            quote="“We moved 14 titles in a month. Advertisers now get a click report with their invoice, and renewals went up 34% the first year.”"
            attribution="Jordan M · Publisher, OC Parenting"
            link={{ href: "/customers", label: "Read the story →" }}
          />
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <QuoteCard quote="Our sales team finally has numbers to bring to renewals." attribution="Head of Sales, regional parenting title" />
            <TestimonialCard
              quote="Setup took an afternoon. The hotspot reports sell themselves."
              name="Priya S"
              role="Ad director, RV News"
              initials="PS"
              color={PEOPLE[0].color}
              plan="Professional"
            />
          </div>
          <PullQuote quote="The click report is now the first page of every renewal deck." attribution="— Dana L, Northlight Media" />
        </Block>

        <Block title="Countdown" dark>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <Countdown target="2026-12-15T16:00:00Z" label="Starts December 15, 2026 at 11 AM ET" />
            <Countdown variant="panel" target="2026-12-15T16:00:00Z" label="Starts December 15, 2026 at 11 AM ET" />
          </div>
        </Block>

        <Block title="Code">
          <CodeBlock label="Embed code" code={'<iframe src="https://flipandshare.com/embed/oc-parenting/latest"\n  width="100%" height="600" allowfullscreen></iframe>'} />
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <ConfigBlock
              comment="// ad request · page 12"
              entries={[
                { key: "slot", value: "full-page" },
                { key: "category", value: "auto" },
                { key: "exclude", value: "competitor:p13" },
              ]}
              footer={
                <>
                  <span className="rounded-sm bg-violet-500/20 px-2.5 py-1.5 text-violet-200">p12 · Harbour Motors</span>
                  <span className="text-red-400">✕ blocked on p13</span>
                </>
              }
            />
            <TerminalWindow
              filename="webhook-payload.json"
              status="200 OK"
              lines={["# issue.published", "{", '  "id": "iss_2048",', '  "title": "October 2026"', "}", "Delivered in 182 ms"]}
            />
          </div>
        </Block>

        <Block title="Marquee · LogoWall">
          <Marquee label="Publishers using FlipAndShare" items={LOGOS.map((l) => <LogoPill key={l.initials} {...l} />)} />
          <LogoWall label="Customers" names={LOGOS.map((l) => l.name)} />
        </Block>
      </div>
    </section>
  );
}
