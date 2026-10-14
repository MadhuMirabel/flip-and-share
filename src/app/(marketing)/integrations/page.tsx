import type { Metadata } from "next";
import { IntegrationOrbit } from "@/components/integrations/IntegrationOrbit";
import { IntegrationsExplorer } from "@/components/integrations/IntegrationsExplorer";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect the tools you already use: InDesign, Canva, WordPress, Google Analytics, HubSpot, Salesforce, Mailchimp, Zapier and more.",
};

const API_SAMPLE = `POST /v1/publications/{id}/issues
{ "title": "October 2026",
  "file": "october.pdf",
  "publish_at": "2026-10-01" }

→ 201 { "status": "converting" }`;

const plainLink = "font-semibold text-blue-600 hover:text-blue-700";
const inline = "font-semibold text-blue-300 underline decoration-blue-300/40 underline-offset-[3px] hover:text-blue-200";

/** Integrations (design/FlipAndShare Prototype.dc.html L1888–1931). */
export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        glow={HERO_GLOW.integrations}
        eyebrow="INTEGRATIONS"
        eyebrowColor={HERO_ACCENT.integrations}
        title="Connect the tools you already use."
        lead={
          <>
            Design in InDesign or Canva, sell in{" "}
            <a href="https://www.magazinemanager.com" target="_blank" rel="noopener" className={inline}>
              Magazine Manager
            </a>
            , measure in Google Analytics. FlipAndShare sits in the middle and keeps them in sync.
          </>
        }
        layout="split"
        splitMinCol={320}
        splitGap={40}
        aside={<IntegrationOrbit />}
      />

      <IntegrationsExplorer />

      <section aria-labelledby="api-title" className="mx-auto max-w-page px-8 pt-[72px] max-sm:px-5">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-7 rounded-lg border border-gray-200 bg-slate-50 px-9 py-8 max-sm:p-6">
          <div className="flex flex-col gap-2.5">
            <Eyebrow>BUILD YOUR OWN</Eyebrow>
            <h2 id="api-title" className="m-0 text-[24px] font-bold tracking-[-.02em] text-navy-800">
              REST API and webhooks
            </h2>
            <p className="m-0 text-body-sm leading-[1.6] text-gray-600">
              Create issues, publish, and pull analytics and leads into any system. Available on Business and Enterprise.
            </p>
            <Button href="/enterprise" variant="navy" radius="md" className="self-start py-[11px]! px-4!">
              See API examples
            </Button>
          </div>
          <CodeBlock code={API_SAMPLE} label="Example API request" />
        </Reveal>
      </section>

      <ClosingCtaBanner
        art="integrations"
        title="Missing a tool you rely on?"
        subtitle={
          <>
            Tell us. Call{" "}
            <a href={SITE.phoneHref} className={plainLink}>
              {SITE.phone}
            </a>{" "}
            or email{" "}
            <a href={SITE.emailHref} className={plainLink}>
              {SITE.email}
            </a>
            .
          </>
        }
        titleSize="fluid"
        sectionPadding="spaced"
      />
    </>
  );
}
