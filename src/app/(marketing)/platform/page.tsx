import type { Metadata } from "next";
import { ProductTour } from "@/components/platform/ProductTour";
import { PublishWizard } from "@/components/platform/PublishWizard";
import { ShopThisPage } from "@/components/platform/ShopThisPage";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, HERO_PATTERN, PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From first draft to results: create, enhance, publish, control, measure and scale interactive flipbooks with FlipAndShare.",
};

const COMPARE = [
  { title: "Beyond page-turning", before: "Most flipbook tools stop at a page-turn effect.", stat: "+4 interaction types" },
  { title: "Built-in measurement", before: "Most tools offer only a view count.", stat: "5 metrics tracked" },
  { title: "Access control included", before: "Password and SSO are often paid add-ons elsewhere.", stat: "No add-on required" },
];

/** Platform overview, the prototype's "Product" screen (design/FlipAndShare Prototype.dc.html L2115–2221). */
export default function PlatformPage() {
  return (
    <>
      <SubNav />
      <PageHero
        glow={HERO_GLOW.product}
        pattern={HERO_PATTERN.product}
        eyebrow="PRODUCT"
        eyebrowColor={HERO_ACCENT.product}
        title="Everything from first draft to results."
        lead="Most flipbook tools stop once the page turns. FlipAndShare adds the pieces that turn a publication into a channel: interactivity, access control, measurement and scale, in one place."
        layout="center"
        padding="roomy"
        gap={18}
      >
        <Button href="/signup" size="lg" className="mt-1.5 px-[22px]! py-[13px]!">
          Create for Free
        </Button>
      </PageHero>

      <ProductTour />
      <ShopThisPage />
      <PublishWizard />

      <section aria-labelledby="compare-title" className="border-t border-gray-200 bg-gray-50 px-8 py-[72px] max-sm:px-5">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-8">
          <h2 id="compare-title" className="m-0 text-center text-[30px] font-bold tracking-[-.025em] text-navy-800">
            Why teams move to FlipAndShare
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
            {COMPARE.map((c, i) => (
              <Reveal key={c.title} distance={16} duration={0.6} delay={i * 0.08} className="flex">
                <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-6">
                  <span className="text-body font-bold text-navy-800">{c.title}</span>
                  <span className="text-sm leading-[1.55] text-gray-500">{c.before}</span>
                  <span className="text-[26px] font-bold tracking-[-.02em] text-blue-600">{c.stat}</span>
                  <span className="text-xs text-gray-500">Illustrative example, not a guarantee</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCtaBanner
        art="product"
        title="See it on your own PDF."
        subtitle="Free account, no credit card."
        maxWidth={1100}
        sectionPadding="flush"
        background="gray"
        titleSize="md"
      />
    </>
  );
}
