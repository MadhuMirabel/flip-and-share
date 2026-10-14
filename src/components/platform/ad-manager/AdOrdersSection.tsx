import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/Progress";
import { Reveal } from "@/components/ui/Reveal";

const ORDERS: { name: string; pct: number; status: string; tone: BadgeTone; color: string; sub: string }[] = [
  { name: "Harbour Motors · Fall sale", pct: 88, status: "On pace", tone: "violet", color: "var(--color-violet-500)", sub: "440K of 500K impressions · ends Oct 31" },
  { name: "Coastal Realty · Open house", pct: 54, status: "Behind", tone: "warning", color: "var(--color-amber-500)", sub: "162K of 300K · 9 days left" },
  { name: "Pumpkin Fest · Sponsorship", pct: 100, status: "Delivered", tone: "success", color: "var(--color-green-600)", sub: "250K of 250K" },
  { name: "BankBeat · Q4 rates", pct: 22, status: "Needs creative", tone: "neutral", color: "var(--color-slate-300)", sub: "Upload artwork to start delivery" },
];

/** 02 · ORDERS & LINE ITEMS: delivery pacing per order (prototype L1046-1053). */
export function AdOrdersSection() {
  return (
    <section aria-labelledby="adm-orders-title" className="border-y border-gray-200 bg-slate-50 px-8 py-20 max-sm:px-5">
      <div className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12">
        <Reveal className="order-2 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-[22px]">
          {ORDERS.map((o, i) => (
            <div key={o.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between gap-2.5 text-menu">
                <span className="font-semibold text-gray-900">{o.name}</span>
                <Badge tone={o.tone} className="font-bold!">
                  {o.status}
                </Badge>
              </div>
              <ProgressBar
                value={o.pct}
                height={10}
                color={o.color}
                duration={1.3}
                delay={i * 0.15}
                label={`${o.name}: ${o.pct}% delivered`}
              />
              <span className="text-xs text-gray-500">{o.sub}</span>
            </div>
          ))}
        </Reveal>
        <SectionHeader
          id="adm-orders-title"
          number="02"
          eyebrow="ORDERS & LINE ITEMS"
          title="See which campaigns are behind, before the advertiser does."
          lead="Delivery bars show impressions against the goal. Amber means behind pace. Missing creative jumps straight to upload and attaches the file to the line item."
          size="xs"
          maxWidth={9999}
          className="order-1"
        />
      </div>
    </section>
  );
}
