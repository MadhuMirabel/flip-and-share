import type { Metadata } from "next";
import { PLAN_COLUMNS, PLAN_ROWS, PRICING_FAQS, PRICING_QUOTES } from "@/components/pricing/data";
import { PricingTop } from "@/components/pricing/PricingTop";
import { Contact } from "@/components/pricing/Contact";
import { ClosingBanner } from "@/components/pricing/ClosingBanner";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/ui/Quote";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free and upgrade when your readers do. Compare FlipAndShare plans for flipbooks, lead forms, QR codes, advertiser click reports and analytics.",
};

/** Prototype Pricing screen (design/FlipAndShare Prototype.dc.html L2025–2112). Prices are illustrative. */
export default function PricingPage() {
  return (
    <>
      <PricingTop />

      <section aria-labelledby="compare-title" className="mx-auto max-w-page px-8 pb-6 max-sm:px-5">
        <SectionHeader
          id="compare-title"
          eyebrow="COMPARE PLANS"
          title="Everything in each plan."
          size="sm"
          maxWidth={720}
        />
      </section>
      <section className="mx-auto max-w-page px-8 pb-[72px] max-sm:px-5">
        <Reveal>
          <ComparisonTable
            variant="plans"
            columns={PLAN_COLUMNS}
            rows={PLAN_ROWS}
            caption="Features included in each FlipAndShare plan"
          />
        </Reveal>
      </section>

      <section aria-labelledby="pricing-faq" className="border-t border-gray-200 bg-gray-50 px-8 py-16 max-sm:px-5">
        <div className="mx-auto flex max-w-[800px] flex-col gap-3">
          <h2 id="pricing-faq" className="m-0 mb-3 text-[28px] font-bold tracking-[-.025em] text-navy-800">
            Questions
          </h2>
          <Contact />
          <Accordion
            variant="cards"
            headingLevel={3}
            items={PRICING_FAQS.map((f) => ({ question: f.question, answer: <p className="m-0">{f.answer}</p> }))}
          />
        </div>
      </section>

      <section aria-label="Customer quotes" className="pt-[72px]">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {PRICING_QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08} className="flex">
              <TestimonialCard
                quote={q.quote}
                name={q.name}
                role={q.role}
                initials={q.initials}
                color={q.color}
                plan={q.plan}
                className="w-full"
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <ClosingBanner />
    </>
  );
}
