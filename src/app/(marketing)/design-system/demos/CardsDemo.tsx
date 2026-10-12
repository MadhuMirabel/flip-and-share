"use client";

import { useState, type ReactNode } from "react";
import { BlogPostCard } from "@/components/cards/BlogPostCard";
import { ExamplePublicationCard, MiniCover, PublicationCard } from "@/components/cards/CoverTile";
import { FeatureCard, ReasonCard, SelectableCard } from "@/components/cards/FeatureCard";
import { INTEGRATIONS, INTEGRATION_PILLS, IntegrationCard, IntegrationPill } from "@/components/cards/IntegrationCard";
import { LinkChipCloud } from "@/components/cards/LinkChip";
import { EditorListItem, ListRow } from "@/components/cards/ListRow";
import { PersonCard } from "@/components/cards/PersonCard";
import { PricingTierCard, PricingTierGrid } from "@/components/cards/PricingTierCard";
import { RelatedCardGrid } from "@/components/cards/RelatedCard";
import { VideoCard } from "@/components/cards/VideoCard";
import type { IconName } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";

const C = (p: string) => `https://www.mirabelsmagazinecentral.com/Content/${p}_370.jpeg`;
/** Four covers from the prototype's COVERS array (L2659). */
const SAMPLE_COVERS = [
  C("9D2BBD99-21FC-45EE-861E-FC8F7D54BDEA/images/f1799f81-c705-4198-8bff-41416b9bbb3d"),
  C("7EE85896-0F53-4E74-B726-7132ED5D1EAF/images/380b446e-d810-4e5b-8c0c-ffcd206d6a7d"),
  C("F98CC99B-FC7C-431A-B62D-C1FE513F6631/images/d508ad62-62dd-4520-bf95-5d4f73c28175"),
  C("FBC04EEE-F5E8-4AB9-9E30-729687021E75/images/4706b275-7630-4859-b31a-bc58a575ce8e"),
];

function Block({ title, children, cols = "grid-cols-[repeat(auto-fill,minmax(260px,1fr))]" }: { title: string; children: ReactNode; cols?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="m-0 text-h3 text-navy-800">{title}</h3>
      <div className={`grid gap-4 ${cols}`}>{children}</div>
    </div>
  );
}

const GOALS: { icon: IconName; t: string; d: string; n: number }[] = [
  { icon: "upload", t: "Publish my first issue", d: "Upload, enhance and share in an afternoon.", n: 9 },
  { icon: "chart", t: "Grow readership", d: "SEO, social and email that bring readers back.", n: 7 },
  { icon: "cart", t: "Earn more per page", d: "Shoppable ads, lead forms and sponsor reports.", n: 6 },
];

export function CardsDemo() {
  const [goal, setGoal] = useState(0);
  const [tab, setTab] = useState(0);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [played, setPlayed] = useState("");
  const [item, setItem] = useState(0);

  return (
    <section aria-labelledby="ds-cards" className="flex flex-col gap-12 border-t border-gray-200 py-14">
      <h2 id="ds-cards" className="m-0 text-h2 text-navy-800">
        Cards
      </h2>

      <Block title="FeatureCard">
        <FeatureCard icon="phone" tone="mint" size="lg" title="Installable web app" description="Readers add your title to their home screen. No app store review." />
        <FeatureCard icon="qr" size="xl" title="Print advertisers" items={["Measure every printed ad", "Swap the link after print", "Scan reports per issue"]} />
        <FeatureCard icon="shield" surface="tinted" size="lg" padding="lg" tileSize={40} gap="sm" title="You approve every change" description="AI suggestions wait in a review queue. Nothing publishes without you." />
        <FeatureCard
          icon="link"
          tileSize={40}
         
          gap="sm"
          hover="lift"
          category="Sharing"
          title="Private links"
          description="Share drafts with advertisers before the issue goes live."
          linkLabel="Learn more"
          href="/features/share"
        />
        <FeatureCard icon="users" padding="lg" hover="border" title="Publishers first" description="Built with the people who close issues every month." />
        <FeatureCard icon="send" tone="navy" tileSize={40} padding="lg" gap="sm" title="Sales" description="Plans, migration or a multi-title setup." linkLabel="Talk to Sales" href="/demo" />
        <FeatureCard
          icon="book"
          tileSize={44}
         
          padding="lg"
          size="lg"
          gap="sm"
          hover="shadow"
          glow="color-mix(in srgb, var(--color-blue-500) 12%, transparent)"
          title="Guides"
          description="Step-by-step articles for every feature and workflow."
          linkLabel="Browse guides"
          href="/resources"
        />
        <FeatureCard icon="lock" tone="violet" tileSize={38} size="sm" gap="sm" title="SOC 2 Type II" description="Independent audit every year. Report on request." />
        <FeatureCard icon="cart" title="Shoppable pages" description="Tag products on the page and track every sale." stat="+18% ad revenue" />
        <FeatureCard
          icon="grid"
          tileSize={40}
          padding="sm"
          aside={<span className="text-[22px] font-bold text-navy-800 tabular-nums">128</span>}
          title="Back issues"
          description="Ten years of archives, searchable and indexed."
          thumbs={SAMPLE_COVERS}
        />
      </Block>

      <Block title="ReasonCard" cols="grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <ReasonCard icon="clock" n="01" title="Live in ten minutes, not ten days" description="Upload a PDF and publish the same afternoon. No developer, no template work." impact="Teams publish 3× more issues" />
        <ReasonCard icon="trend" n="02" title="Pages that pay for themselves" description="Shoppable hotspots and lead forms turn print pages into tracked revenue." impact="Average +22% sponsor renewals" />
      </Block>

      <Block title="SelectableCard: goal (aria-pressed)">
        {GOALS.map((g, i) => (
          <SelectableCard key={g.t} icon={g.icon} title={g.t} description={g.d} footer={`${g.n} resources`} selected={goal === i} onClick={() => setGoal(i)} />
        ))}
      </Block>

      <Block title="SelectableCard: tab (inside a tablist)" cols="grid-cols-1 max-w-[420px]">
        <div role="tablist" aria-orientation="vertical" aria-label="Feature tour" className="flex flex-col gap-1.5">
          {GOALS.map((g, i) => (
            <SelectableCard key={g.t} variant="tab" role="tab" aria-selected={tab === i} icon={g.icon} title={g.t} description={g.d} selected={tab === i} onClick={() => setTab(i)} />
          ))}
        </div>
      </Block>

      <div className="flex flex-col gap-4">
        <h3 className="m-0 text-h3 text-navy-800">RelatedCard (PASTEL_CYCLE)</h3>
        <RelatedCardGrid
          items={[
            { icon: "send", title: "Share anywhere", href: "/features/share" },
            { icon: "globe", title: "Embed on your site", href: "/features/embed" },
            { icon: "play", title: "Video and links", href: "/features/links" },
            { icon: "lock", title: "Access control", href: "/features/access" },
            { icon: "form", title: "Lead forms", href: "/features/forms" },
            { icon: "search", title: "SEO article mode", href: "/features/seo" },
            { icon: "megaphone", title: "Social posts", href: "/features/social" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="m-0 text-h3 text-navy-800">PricingTierCard / PricingTierGrid</h3>
        <PricingTierGrid className="pt-4">
          <PricingTierCard name="Free" bestFor="Try it with one publication" price="$0" unit="/mo" ctaLabel="Start free" ctaHref="/signup" subCaption="No credit card" features={["1 publication", "Basic analytics", "Share links and embeds"]} />
          <PricingTierCard name="Starter" bestFor="Solo creators" price="$12" unit="/mo" note="Billed yearly · $144/yr" ctaLabel="Choose Starter" onCta={() => {}} features={["5 publications", "Custom branding", "Lead forms"]} />
          <PricingTierCard state="highlighted" name="Professional" bestFor="Small publishers" price="$29" unit="/mo" note="Billed yearly · $348/yr" ctaLabel="Choose Professional" ctaHref="/signup" subCaption="14-day free trial" includedLabel="Everything in Starter, plus" features={["Unlimited publications", "Shoppable hotspots", "Advertiser reports", "Article mode SEO"]} />
          <PricingTierCard state="recommended" name="Business" bestFor="Publishing groups and agencies" price="$69" unit="/mo" note="Billed yearly · $828/yr" ctaLabel="Choose Business" ctaHref="/demo" features={["Multiple workspaces", "SSO and audit log", "Salesforce sync", "Named support"]} />
        </PricingTierGrid>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="m-0 text-h3 text-navy-800">BlogPostCard</h3>
        <BlogPostCard
          variant="featured"
          title="How to price a digital add-on your print advertisers will say yes to"
          excerpt="Three publishers share what they charge for hotspots, QR codes and click reports, and how their reps position it on the insertion order."
          category="Ad sales"
          cover={SAMPLE_COVERS[0]}
          mediaBackground="linear-gradient(135deg,var(--color-blue-100),var(--color-blue-200))"
          author="Linda Ruiz"
          authorInitials="LR"
          date="Sep 22, 2026"
          minutes={7}
          href="/blog/price-digital-add-on"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
          <BlogPostCard title="Your back issues are an SEO asset. Here is how to use them." excerpt="Article mode turns ten years of PDFs into indexable pages." category="Readership" categoryTone="amber" cover={SAMPLE_COVERS[1]} rotate={4} mediaBackground="linear-gradient(135deg,var(--color-amber-100),var(--color-amber-200))" author="Priya Shah" date="Sep 15, 2026" minutes={6} href="/blog/back-issues-seo" />
          <BlogPostCard title="Close the issue two days earlier with a shared flat plan" excerpt="Booked ads, materials status and sign-offs in one place." category="Production" categoryTone="violet" cover={SAMPLE_COVERS[2]} mediaBackground="linear-gradient(135deg,var(--color-violet-100),var(--color-violet-200))" author="Dana Lee" date="Sep 8, 2026" minutes={5} href="/blog/flat-plan" />
          <BlogPostCard variant="compact" title="QR codes that advertisers can actually measure" category="Print + digital" categoryTone="teal" minutes={4} href="/blog/qr-codes" />
        </div>
      </div>

      <Block title={`VideoCard${played ? ` (playing: ${played})` : ""}`} cols="grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        <VideoCard title="Selling digital add-ons to print advertisers" topic="Ad sales" topicTone="amber" date="Recorded Sep 18, 2026" duration="42:10" cover={SAMPLE_COVERS[3]} onPlay={() => setPlayed("Ad sales")} />
        <VideoCard title="From PDF to flipbook in ten minutes" topic="Getting started" topicTone="violet" date="Recorded Aug 28, 2026" duration="28:45" cover={SAMPLE_COVERS[0]} onPlay={() => setPlayed("Getting started")} />
      </Block>

      <div className="flex flex-col gap-4">
        <h3 className="m-0 text-h3 text-navy-800">IntegrationCard / IntegrationPill</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(270px,100%),1fr))] items-start gap-4">
          {INTEGRATIONS.slice(0, 1).map((it) => (
            <IntegrationCard key={it.name} {...it} defaultOpen />
          ))}
          {[INTEGRATIONS[9], INTEGRATIONS[10]].map((it) => (
            <IntegrationCard
              key={it.name}
              {...it}
              defaultOpen
              connectState={it.tag === "Business" ? "business" : connected[it.name] ? "connected" : "connect"}
              onConnect={() => setConnected((c) => ({ ...c, [it.name]: !c[it.name] }))}
            />
          ))}
          <IntegrationCard {...INTEGRATIONS[4]} />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {INTEGRATION_PILLS.slice(0, 6).map((p) => (
            <IntegrationPill key={p.name} {...p} />
          ))}
        </div>
      </div>

      <Block title="PersonCard" cols="grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        <PersonCard name="Alex Morgan" role="Chief Executive" bio="Twenty years in magazine publishing and ad-tech." />
        <PersonCard name="Priya Shah" role="Head of Product" bio="Leads Digital Studio and FlipAndShare." color="var(--color-amber-500)" />
      </Block>

      <Block title="PublicationCard / MiniCover / ExamplePublicationCard" cols="grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
        <PublicationCard title="OC Parenting" meta="October 2026 · Family" category="Family" cover={SAMPLE_COVERS[0]} href="/examples" />
        <PublicationCard title="RV News" meta="September 2026 · Outdoor" category="Outdoor" cover={SAMPLE_COVERS[1]} onClick={() => {}} />
        <div className="flex items-center gap-4">
          <MiniCover title="BankBeat" src={SAMPLE_COVERS[2]} />
          <span className="text-[22px] font-bold text-navy-800">BankBeat</span>
        </div>
      </Block>
      <div className="grid grid-cols-2 items-start gap-8 max-md:grid-cols-1">
        <ExamplePublicationCard title="OC Parenting · October" subtitle="A monthly family magazine with shoppable local ads." cover={SAMPLE_COVERS[0]} linkLabel="Browse more in the Store" href="/examples" />
        <ExamplePublicationCard variant="overlay" title="RocketSTEM · Issue 14" cover={SAMPLE_COVERS[3]} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="m-0 text-h3 text-navy-800">LinkChip / LinkChipCloud</h3>
        <LinkChipCloud
          label="Explore other use cases"
          items={[
            { icon: "book", label: "Magazines", href: "/use-cases/magazines" },
            { icon: "cart", label: "Catalogs", href: "/use-cases/catalogs" },
            { icon: "file", label: "Brochures", href: "/use-cases/brochures" },
            { icon: "users", label: "Associations", href: "/use-cases/associations" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 items-start gap-8 max-md:grid-cols-1">
        <div className="flex flex-col gap-3">
          <h3 className="m-0 text-h3 text-navy-800">ListRow</h3>
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-2">
            <ListRow index={0} icon="book" title="Publish your first flipbook" meta="Guide · 6 min" trailing={<Badge tone="info">Guide</Badge>} href="/resources/first-flipbook" />
            <ListRow index={1} icon="grid" tone="violet" title="Monthly magazine template" meta="Template · InDesign" trailing={<Badge tone="violet">Template</Badge>} href="/templates" />
            <ListRow index={2} icon="play" tone="pink" title="Tagging products on a page" meta="Video · 4:12" trailing={<Badge tone="purple">Video</Badge>} href="/resources/tagging" />
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-[18px]">
            <span className="text-label font-bold text-gray-500">2 results for “qr”</span>
            <ListRow variant="hit" icon="qr" title="QR codes that advertisers can measure" trailing="Blog" href="/blog/qr-codes" />
            <ListRow variant="hit" icon="file" title="QR placement checklist" trailing="Guide" href="/resources/qr" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="m-0 text-h3 text-navy-800">EditorListItem</h3>
          {[
            ["Harbour Motors · Buy now", "Product tag", "Alt ✓", "success"],
            ["Fall service video", "Video", "No alt", "warning"],
            ["Newsletter signup", "Lead form", "Alt ✓", "success"],
          ].map(([l, t, s, tone], i) => (
            <EditorListItem key={l} label={l} type={t} status={s} statusTone={tone as "success" | "warning"} selected={item === i} onClick={() => setItem(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
