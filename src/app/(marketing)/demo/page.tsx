import type { Metadata } from "next";
import { BookDemo } from "@/components/demo/BookDemoForm";
import { DemoAside } from "@/components/demo/DemoAside";
import { DemoCallScene } from "@/components/demo/DemoCallScene";
import { DEMO_CHIPS } from "@/components/demo/data";
import { Icon } from "@/components/icons";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "30 minutes with a publishing specialist. Bring a PDF and we'll turn it into a live flipbook with links, ads and analytics while you watch.",
};

const HERO_BG = "linear-gradient(135deg, var(--color-ink-950) 0%, var(--color-navy-800) 70%, #0e7490 100%)";

/** Book a demo page, the prototype's `isDemo` screen (design/FlipAndShare Prototype.dc.html L1470-1574). */
export default function DemoPage() {
  return (
    <>
      <PageHero
        glow={HERO_GLOW.demo}
        background={HERO_BG}
        eyebrow="Book a demo"
        eyebrowColor={HERO_ACCENT.demo}
        title="See FlipAndShare with your own issue."
        lead="30 minutes with a publishing specialist. Bring a PDF and we'll turn it into a live flipbook with links, ads and analytics while you watch."
        layout="split"
        splitGap={40}
        padding="demo"
        titleSize="lg"
        leadMaxWidth={600}
        aside={<DemoCallScene />}
      >
        <ul className="m-0 mt-1.5 flex list-none flex-wrap gap-2.5 p-0">
          {DEMO_CHIPS.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-[7px] rounded-full border border-white/18 bg-white/10 px-3 py-[7px] text-menu font-semibold"
            >
              <Icon name={c.icon} size={14} />
              {c.label}
            </li>
          ))}
        </ul>
      </PageHero>

      <Container as="section" className="relative -mt-20 pb-[88px]">
        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] items-start gap-6 max-[900px]:grid-cols-1">
          <BookDemo />
          <DemoAside />
        </div>
      </Container>
    </>
  );
}
