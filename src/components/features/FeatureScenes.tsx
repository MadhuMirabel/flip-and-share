import { Icon } from "@/components/icons";
import {
  SceneCard,
  SceneCover,
  SceneIconDisc,
  SceneLabel,
  SceneLine,
  ScenePill,
  SceneStage,
  SceneToggle,
} from "@/components/scene/SceneKit";
import { COVERS } from "@/lib/covers";
import { ACCESS_TOGGLES } from "./data";

/** Looping scenes for the four showcase tabs (prototype `fx.t0`–`fx.t3`, L1832–1856). Decorative; the stage carries a label. */

function LibraryScene() {
  return (
    <SceneStage backdrop="panel" height={360} label="A library of six titles, from PDFs, InDesign, Canva and back issues">
      <SceneLabel className="absolute top-[6%] left-[6%] text-gray-500">YOUR LIBRARY · 6 TITLES</SceneLabel>
      {[0, 1, 2].map((i) => (
        <SceneCover key={i} src={COVERS[i * 3]} width="24%" left={`${6 + i * 29}%`} top="18%" fly={{ x: "0px", y: "30px", r: "-4deg", delay: i * 0.15 }} />
      ))}
      {[0, 1, 2].map((i) => (
        <SceneCover key={i} src={COVERS[i * 3 + 1]} width="24%" left={`${6 + i * 29}%`} top="58%" fly={{ x: "0px", y: "30px", r: "4deg", delay: 0.5 + i * 0.15 }} />
      ))}
      {["PDFs", "InDesign", "Canva", "Back issues"].map((t, i) => (
        <ScenePill key={t} tone="navy" delay={1 + i * 0.12} left={`${6 + i * 22}%`} bottom="3%">
          {t}
        </ScenePill>
      ))}
    </SceneStage>
  );
}

function ShareScene() {
  return (
    <SceneStage backdrop="panel" height={360} label="One link shared to a website embed, a social post and an email">
      <SceneCard left="6%" top="8%" width="88%" rise={0} className="flex items-center gap-2 px-3 py-2.5">
        <Icon name="link" size={14} />
        <span className="flex-1 truncate font-mono text-[11px] text-gray-700">read.yourmagazine.com/october-2026</span>
        <ScenePill tone="green" delay={0.8} right="4%" top="-30%">
          Copied
        </ScenePill>
      </SceneCard>
      {[
        { label: "YOUR WEBSITE", caption: "<iframe src=…>", left: "6%" },
        { label: "SOCIAL POST", caption: "“The October issue is out”", left: "36.5%" },
        { label: "EMAIL", caption: "Read now →", left: "67%" },
      ].map((c, i) => (
        <SceneCard key={c.label} left={c.left} top="36%" width="27%" height="52%" rise={0.5 + i * 0.25} className="flex flex-col gap-2 p-2.5">
          <SceneLabel>{c.label}</SceneLabel>
          <SceneCover src={COVERS[i + 4]} width="48%" className="mx-auto" style={{ position: "relative" }} />
          <span className="mt-auto truncate text-[10px] font-semibold text-navy-800">{c.caption}</span>
        </SceneCard>
      ))}
    </SceneStage>
  );
}

function AccessScene() {
  return (
    <SceneStage backdrop="panel" height={360} label="Access toggles for private link, password, download and subscribers only">
      <SceneCard left="6%" top="8%" width="52%" height="84%" rise={0} className="flex flex-col gap-2 p-3">
        {ACCESS_TOGGLES.map((t, i) => (
          <div key={t.title} className="flex items-center justify-between gap-2 rounded-md border border-gray-100 px-2.5 py-2">
            <span className="flex flex-col">
              <span className="text-[11px] font-bold text-navy-800">{t.title}</span>
              <span className="text-[9.5px] text-gray-500">{t.hint}</span>
            </span>
            <SceneToggle delay={0.4 + i * 0.35} />
          </div>
        ))}
      </SceneCard>
      <SceneCover src={COVERS[6]} width="30%" right="8%" top="14%" float />
      <SceneCard right="6%" bottom="14%" width="36%" rise={1.8} className="flex items-center gap-2 px-2.5 py-2">
        <SceneIconDisc name="lock" size={26} />
        <span className="text-[10.5px] font-bold text-navy-800">Subscribers only</span>
      </SceneCard>
    </SceneStage>
  );
}

function SellScene() {
  return (
    <SceneStage backdrop="panel" height={360} label="A shoppable ad on page 12 leading to an order attributed to the advertiser">
      <SceneCover src={COVERS[8]} width="34%" left="6%" top="10%" float />
      <SceneCard left="38%" top="12%" width="56%" rise={0.4} className="flex items-center gap-2.5 p-2.5">
        <SceneLine width={30} height={30} className="flex-none" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[11px] font-bold text-navy-800">Harbour Motors · Fall service</span>
          <span className="truncate text-[9.5px] text-gray-500">Tagged on page 12 · Buy now</span>
        </span>
        <span className="text-[12px] font-bold text-navy-800">$89</span>
      </SceneCard>
      <SceneCard left="38%" top="42%" width="56%" rise={1.4} className="px-3 py-2 text-[10.5px] font-semibold text-green-700">
        ✓ Order placed · attributed to page 12 and the advertiser
      </SceneCard>
      {["Sell issues", "Subscriptions", "Shoppable ads"].map((t, i) => (
        <ScenePill key={t} tone="navy" delay={2.2 + i * 0.15} left={`${38 + i * 19}%`} bottom="8%">
          {t}
        </ScenePill>
      ))}
    </SceneStage>
  );
}

export const FEATURE_SCENES = [LibraryScene, ShareScene, AccessScene, SellScene];
