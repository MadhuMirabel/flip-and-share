import type { Metadata } from "next";
import Link from "next/link";
import { QrDestinations } from "@/components/platform/qr/QrDestinations";
import { QrHeroScene } from "@/components/platform/qr/QrHeroScene";
import { QrPrintVsDigital } from "@/components/platform/qr/QrPrintVsDigital";
import { QrWhoFor } from "@/components/platform/qr/QrWhoFor";
import { ClosingCtaBanner, ctaLinkClass } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "Trackable QR codes",
  description:
    "Every QR code points at a short link you control. Change the destination, pause a campaign, or count print against digital without reprinting a page.",
};

/** QR Codes platform page, the prototype's `isQr` screen (design/FlipAndShare Prototype.dc.html L923-1002). */
export default function QrPage() {
  return (
    <>
      <SubNav />
      <PageHero
        glow={HERO_GLOW.qr}
        eyebrow="TRACKABLE QR CODES"
        eyebrowColor={HERO_ACCENT.qr}
        title="The printed page, now measurable."
        lead="Every code points at a short link you control. Change where readers land, pause a campaign, or count print against digital, without reprinting a single page."
        layout="split"
        padding="even"
        gap={18}
        leadMaxWidth={560}
        aside={<QrHeroScene />}
      >
        <div className="flex flex-wrap gap-2.5">
          <Button href="/signup" size="lg" className="text-sm!">
            Create for Free
          </Button>
          <Button href="/demo" variant="onDark" size="lg" className="text-sm!">
            Watch the demo
          </Button>
        </div>
      </PageHero>

      <QrDestinations />
      <QrPrintVsDigital />
      <QrWhoFor />

      <ClosingCtaBanner
        art="qr"
        title="Put a live link on your next printed page."
        subtitle={
          <>
            QR codes are included on every{" "}
            <Link href="/pricing" className={ctaLinkClass}>
              paid plan
            </Link>
            .
          </>
        }
      />
    </>
  );
}
