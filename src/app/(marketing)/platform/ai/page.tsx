import type { Metadata } from "next";
import Link from "next/link";
import { AiDemo } from "@/components/platform/ai/AiDemo";
import { AutomationRules } from "@/components/platform/ai/AutomationRules";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { ClosingCtaBanner, ctaLinkClass } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, HERO_PATTERN, PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { StatTile } from "@/components/ui/Stat";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "AI & Automation",
  description:
    "Tags, summaries, alt text, article extraction and social posts drafted from your PDF the moment it lands. You review, you publish.",
};

const STATS = [
  { v: 4, suf: "s", l: "from upload to first draft" },
  { v: 92, suf: "%", l: "of tags accepted unchanged" },
  { v: 6, suf: "h", l: "saved per 48-page issue" },
];

const TRUST = [
  { icon: "eye", title: "You approve everything", desc: "AI writes drafts. Tags, summaries, alt text and posts only publish when a person accepts them." },
  { icon: "lock", title: "Your content stays yours", desc: "Publications are never used to train shared models. Processing happens per workspace." },
  { icon: "history", title: "Every draft is logged", desc: "What was suggested, who accepted or edited it, and when. It shows up in the activity log next to human edits." },
] as const;

/** AI & Automation, the prototype's "ai" screen (design/FlipAndShare Prototype.dc.html L766–835). */
export default function AiPage() {
  return (
    <>
      <SubNav />
      <PageHero
        glow={HERO_GLOW.ai}
        pattern={HERO_PATTERN.ai}
        eyebrow="AI & AUTOMATION"
        eyebrowColor={HERO_ACCENT.ai}
        title="The tedious half of publishing, done while you upload."
        lead="Tags, summaries, alt text, article extraction and social posts are drafted from the PDF the moment it lands. You review, you publish. Nothing goes out without a person approving it."
      >
        <div className="mt-2 flex flex-wrap gap-2.5">
          {STATS.map((k, i) => (
            <Reveal key={k.l} delay={i * 0.1}>
              <StatTile variant="hero" value={<CountUp value={k.v} suffix={k.suf} />} label={k.l} />
            </Reveal>
          ))}
        </div>
      </PageHero>

      <Section gap={28}>
        <AiDemo />
      </Section>

      <Section tone="tinted" gap={28}>
        <SectionHeader
          eyebrow="AUTOMATION RULES"
          title="When this happens, do that. No one has to remember."
          lead="Rules run on upload, on publish and on a schedule. Turn them on per publication."
        />
        <AutomationRules />
      </Section>

      <Section>
        <div className="grid grid-cols-3 gap-6 max-[760px]:grid-cols-1">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1} className="flex">
              <FeatureCard
                surface="tinted"
                icon={t.icon}
                tileSize={40}
                size="lg"
                padding="lg"
                gap="sm"
                title={t.title}
                description={t.desc}
                className="w-full"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCtaBanner
        art="ai"
        title="Upload one PDF and see what gets drafted."
        subtitle={
          <>
            Free account, no credit card. AI drafts are included on the{" "}
            <Link href="/pricing" className={ctaLinkClass}>
              free plan
            </Link>
            , 1 publication for the first month.
          </>
        }
      />
    </>
  );
}
