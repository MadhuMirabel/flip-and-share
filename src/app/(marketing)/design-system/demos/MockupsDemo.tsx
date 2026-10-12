import type { ReactNode } from "react";
import { BookSpread, SkeletonLines, StripedPlaceholder } from "@/components/mockups/BookSpread";
import { BrowserFrame } from "@/components/mockups/BrowserFrame";
import { IPhoneFrame, PhoneFrame, TabletFrame } from "@/components/mockups/DeviceFrames";
import { SearchBarMock, SerpCard, SocialPreviewCard } from "@/components/mockups/PreviewCards";
import { QrMatrix } from "@/components/mockups/QrMatrix";
import { FakeCursor } from "@/components/scene/FakeCursor";
import {
  SCENE_AVATAR_COLORS,
  SceneAvatar,
  SceneBars,
  SceneCard,
  SceneCover,
  SceneCursor,
  SceneLabel,
  SceneLine,
  ScenePill,
  SceneStage,
  SceneToggle,
  rise,
} from "@/components/scene/SceneKit";

const C = (p: string) => `https://www.mirabelsmagazinecentral.com/Content/${p}_370.jpeg`;
/** Four covers from the prototype's COVERS array (L2659). */
const COVERS = [
  C("9D2BBD99-21FC-45EE-861E-FC8F7D54BDEA/images/f1799f81-c705-4198-8bff-41416b9bbb3d"),
  C("7EE85896-0F53-4E74-B726-7132ED5D1EAF/images/380b446e-d810-4e5b-8c0c-ffcd206d6a7d"),
  C("F98CC99B-FC7C-431A-B62D-C1FE513F6631/images/d508ad62-62dd-4520-bf95-5d4f73c28175"),
  C("FBC04EEE-F5E8-4AB9-9E30-729687021E75/images/4706b275-7630-4859-b31a-bc58a575ce8e"),
];

function Block({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="m-0 text-h3 text-navy-800">{title}</h3>
      <div className={className}>{children}</div>
    </div>
  );
}

/** Tour scene 0 "Create" (tourScene(0)), built only from the scene kit. */
function CreateScene() {
  return (
    <SceneStage label="Covers fly onto a flat plan and the cursor places page 6">
      <SceneCard left="18%" top="14%" right="18%" bottom="14%" float className="grid grid-cols-4 gap-2 p-3">
        {Array.from({ length: 8 }, (_, n) => (
          <span
            key={n}
            className={`aspect-[3/4] rounded-sm ${n === 5 ? "border-[1.5px] border-dashed border-blue-500 bg-blue-100" : "border border-gray-200 bg-slate-100"}`}
          />
        ))}
      </SceneCard>
      <SceneCover src={COVERS[0]} width="14%" left="4%" top="6%" fly={{ x: "-90px", y: "-60px", r: "-14deg", delay: 0.2 }} />
      <SceneCover src={COVERS[1]} width="14%" right="4%" top="8%" fly={{ x: "90px", y: "-70px", r: "12deg", delay: 0.5 }} />
      <SceneCover src={COVERS[2]} width="14%" left="6%" bottom="8%" fly={{ x: "-100px", y: "60px", r: "-8deg", delay: 0.8 }} />
      <SceneCover src={COVERS[3]} width="13.5%" left="58.5%" top="48%" fly={{ x: "120px", y: "90px", r: "10deg", delay: 1.6 }} />
      <SceneCursor left="76%" top="76%" to={["-60px", "-70px"]} delay={1} />
      <ScenePill tone="green" center left="50%" bottom="5%" delay={2.6}>
        Page 6 placed
      </ScenePill>
    </SceneStage>
  );
}

/** Tour scenes 3 "Control" and 4 "Measure" condensed: toggles, KPI bars, avatars. */
function MeasureScene() {
  return (
    <SceneStage backdrop="panel" label="Access toggles switch on while the reads chart grows">
      <SceneCard left="6%" top="10%" right="6%" bottom="10%" className="flex flex-col gap-2.5 p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-eyebrow font-bold text-navy-800">October 2026 · Reads</span>
          <SceneLabel className="rounded-full bg-green-100 px-2 py-[3px] text-green-800">● Live</SceneLabel>
        </div>
        {[
          ["Private link", "Only people with the link"],
          ["Subscribers only", "Paywall after page 3"],
        ].map(([t, s], n) => (
          <div key={t} className="flex items-center justify-between gap-2 rounded-md border border-slate-100 px-3 py-2" style={rise(n * 0.25)}>
            <span className="flex flex-col">
              <span className="text-[11.5px] font-bold text-navy-800">{t}</span>
              <span className="text-[9.5px] text-gray-500">{s}</span>
            </span>
            <SceneToggle delay={n * 0.35 + 0.4} />
          </div>
        ))}
        <SceneBars className="flex-1" values={[38, 62, 91, 55, 44, 58, 70, 96, 52, 40, 35, 30]} highlight={[2, 7]} />
        <SceneLine width="40%" />
      </SceneCard>
      {["PS", "MT", "DL"].map((ini, n) => (
        <SceneAvatar key={ini} initials={ini} color={SCENE_AVATAR_COLORS[n]} left={`${70 + n * 8}%`} top="2%" delay={n * 0.35 + 0.6} />
      ))}
      <ScenePill tone="navy" right="10%" top="38%" delay={3}>
        +1 · Comfort Zone p3
      </ScenePill>
    </SceneStage>
  );
}

export function MockupsDemo() {
  return (
    <section aria-labelledby="ds-mockups" className="flex flex-col gap-12 border-t border-gray-200 py-14">
      <h2 id="ds-mockups" className="m-0 text-h2 text-navy-800">
        Device mockups and product scenes
      </h2>

      <div className="grid grid-cols-2 items-start gap-8 max-md:grid-cols-1">
        <Block title="BrowserFrame: light">
          <BrowserFrame url="read.yourmagazine.com/october-2026" secure right={<span className="text-xs font-semibold text-gray-500">Flipbook</span>}>
            <div className="bg-gray-100 p-6">
              <BookSpread left={COVERS[1]} shadow="brand" label="October 2026 spread" />
            </div>
          </BrowserFrame>
        </Block>
        <Block title="TabletFrame + BrowserFrame: dark">
          <TabletFrame label="Tablet showing the reader">
            <BrowserFrame tone="dark" url="read.rocketstem.org/issue-14" className="h-full" bodyClassName="flex items-center justify-center p-5">
              <BookSpread left={COVERS[2]} className="max-w-[360px]" />
            </BrowserFrame>
          </TabletFrame>
        </Block>
      </div>

      <Block title="PhoneFrame (xs / sm / md / lg) and IPhoneFrame" className="flex flex-wrap items-end gap-8">
        <PhoneFrame size="xs" screen="dark" shadow="dark" screenClassName="items-center justify-center">
          <QrMatrix size={96} />
        </PhoneFrame>
        <PhoneFrame size="sm">
          <div className="flex-1 bg-white bg-cover bg-top" style={{ backgroundImage: `url(${COVERS[0]})` }} />
        </PhoneFrame>
        <PhoneFrame size="md" className="-rotate-6">
          <div className="flex-1 bg-white bg-cover bg-top" style={{ backgroundImage: `url(${COVERS[1]})` }} />
        </PhoneFrame>
        <PhoneFrame size="lg">
          <StripedPlaceholder tone="sky" caption="reader · 390×844" className="flex-1" />
        </PhoneFrame>
        <IPhoneFrame className="w-[180px] rotate-[5deg]" label="Phone showing a booking form">
          <div className="flex h-full flex-col gap-2 bg-white p-3">
            <span className="text-eyebrow font-bold text-navy-800">Book a service</span>
            <SkeletonLines widths={[90, 70, 80]} />
            <span className="mt-auto rounded-sm bg-blue-500 py-1.5 text-center text-[9px] font-bold text-white">Confirm</span>
          </div>
        </IPhoneFrame>
      </Block>

      <div className="grid grid-cols-2 items-start gap-8 max-md:grid-cols-1">
        <Block title="BookSpread (placeholders: sky / gray / dark)" className="flex flex-col gap-6">
          <BookSpread />
          <BookSpread placeholderTone="gray" shadow="brand" />
          <BookSpread left={<StripedPlaceholder tone="dark" caption="full-bleed ad" className="h-full" />} right={COVERS[3]} />
        </Block>
        <Block title="QrMatrix (64 / 96 / 150, seeded)" className="flex flex-wrap items-end gap-6">
          <QrMatrix size={64} />
          <QrMatrix size={96} seed="oc-parenting-oct" />
          <div className="flex flex-col items-center gap-2.5">
            <QrMatrix size={150} bordered seed="harbour-motors" label="QR code for the Harbour Motors offer" />
            <span className="text-xs font-semibold text-gray-500">Same printed code</span>
          </div>
        </Block>
      </div>

      <div className="grid grid-cols-2 items-start gap-8 max-md:grid-cols-1">
        <Block title="SearchBarMock + SerpCard" className="flex flex-col gap-3">
          <SearchBarMock query="mars express canyon orbiter article" />
          <SerpCard
            variant="highlighted"
            delay={0.15}
            url="RocketSTEM › issue-14 › mars-express"
            title="Mars Express: a decade above the Red Planet | RocketSTEM"
            description="ESA's orbiter has spent more than ten years circling Mars, mapping canyons, craters and polar ice…"
            chips={["Page 8", "Mar 2017", "Open in flipbook"]}
          />
          <SerpCard variant="faded" delay={0.3} url="competitor-flipbooks.com › viewer › 8823" title="Untitled document" description="No description available. Page content is an image and cannot be indexed." />
          <SerpCard size="lg" url="flipandshare.com/oc-parenting/october-2026" title="OC Parenting · October 2026" description="Back-to-school guide, fall events and 40 local camps." />
        </Block>
        <Block title="SocialPreviewCard">
          <SocialPreviewCard domain="flipandshare.com" title="OC Parenting · October 2026" description="Back-to-school guide, fall events and 40 local camps across Orange County." />
        </Block>
      </div>

      <div className="grid grid-cols-2 items-start gap-8 max-md:grid-cols-1">
        <Block title="Scene kit: tour scene 0 “Create” (glow backdrop)">
          <CreateScene />
        </Block>
        <Block title="Scene kit: toggles, bars, avatars (panel backdrop)">
          <MeasureScene />
        </Block>
      </div>

      <Block title="FakeCursor (arrow / hand / grab pressed)" className="relative h-[120px] rounded-lg border border-gray-200 bg-gray-50">
        <FakeCursor x="20%" y="40%" />
        <FakeCursor x="50%" y="40%" glyph="hand" />
        <FakeCursor x="80%" y="40%" glyph="grab" pressed />
      </Block>
    </section>
  );
}
