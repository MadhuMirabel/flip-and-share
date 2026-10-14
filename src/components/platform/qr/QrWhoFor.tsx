import { FeatureCard } from "@/components/cards/FeatureCard";
import type { IconName } from "@/components/icons";
import { FeatureCellGrid } from "@/components/sections/FeatureCellGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const WHO: { icon: IconName; name: string; items: string[] }[] = [
  { icon: "grid", name: "Publishers", items: ["Prove print still drives traffic", "Sell QR placements as an add-on", "Fix a wrong link after the issue has printed"] },
  { icon: "target", name: "Advertisers", items: ["Scans counted per code, per issue", "Print vs Digital response, side by side", "Change the offer mid-campaign"] },
  { icon: "eye", name: "Readers", items: ["One scan from the page to the video, offer or event", "Never a dead link: paused codes show a holding page", "No app to install"] },
];

const FEATURES = [
  { title: "Pause without reprinting", description: "Toggle Live off; scans see a holding page until you resume." },
  { title: "Destination missing alert", description: "Codes pointing at a deleted issue are flagged, not left to fail." },
  { title: "One code, many pages", description: "Place the same code on several pages from the flat plan." },
  { title: "14-day trends", description: "Scans per code with a Print vs Digital split." },
  { title: "Export to CSV", description: "Filter by issue, channel or status and download the table." },
];

/** "Who it helps" cards plus the hairline feature grid (prototype L993-1001). */
export function QrWhoFor() {
  return (
    <section aria-labelledby="qr-who-title" className="mx-auto flex max-w-page flex-col gap-7 px-8 py-20 max-sm:px-5">
      <SectionHeader id="qr-who-title" eyebrow="WHO IT HELPS" title="One small square, three kinds of value." leadSize="lg" maxWidth={680} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-5">
        {WHO.map((w, i) => (
          <Reveal key={w.name} delay={i * 0.1} className="flex">
            <FeatureCard icon={w.icon} title={w.name} items={w.items} size="xl" padding="md" className="flex-1" />
          </Reveal>
        ))}
      </div>
      <FeatureCellGrid items={FEATURES} reveal stagger={0.06} />
    </section>
  );
}
