import type { Metadata } from "next";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { ResourceHub } from "@/components/resources/ResourceHub";
import { WebinarPromo } from "@/components/resources/WebinarPromo";
import { RESOURCE_FAQS, RESOURCE_TYPES } from "@/components/resources/data";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { ContactStrip } from "@/components/sections/Contact";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Resource center",
  description:
    "Guides, templates, webinars and help for publishers, organised by what you are trying to do: get started, sell more ads, grow readers and run the team.",
};

/** Resource center (design/FlipAndShare Prototype.dc.html L1775–1822, data L3322 / L3519). */
export default function ResourcesPage() {
  return (
    <>
      <ResourceHub />

      <Section labelledBy="types-title" padding="none" paddingClassName="pt-16">
        <h2 id="types-title" className="sr-only">
          Browse by type
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
          {RESOURCE_TYPES.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05} className="flex">
              <FeatureCard
                icon={t.icon}
                tone={t.tone === "green" ? "mint" : t.tone}
                tileSize={44}
                padding="lg"
                size="lg"
                gap="sm"
                hover="shadow"
                glow={t.glow}
                title={t.title}
                description={t.description}
                linkLabel={t.link}
                href={t.href}
                className="w-full"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section padding="none" paddingClassName="pt-16">
        <WebinarPromo />
      </Section>

      <Section padding="none" paddingClassName="pt-16">
        <FaqSection
          layout="auto"
          eyebrow="HELP CENTER"
          title="Quick answers."
          intro={<p>Can’t find it? Our support team replies within one business day, and live chat is on for paid plans.</p>}
          contact={<ContactStrip />}
          actions={
            <>
              <Button href="/company" variant="navy" radius="md">
                Contact support
              </Button>
              <Button href="/blog" variant="light" radius="md">
                Read the blog
              </Button>
            </>
          }
          items={RESOURCE_FAQS}
          variant="cards"
          size="md"
          defaultOpen={0}
        />
      </Section>

      <ClosingCtaBanner
        art="resources"
        title="Learn by doing."
        subtitle="Upload one PDF and try every feature on the free plan."
        titleSize="fluid"
        ctaSize="large"
        sectionPadding="spaced"
      />
    </>
  );
}
