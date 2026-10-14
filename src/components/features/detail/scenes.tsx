import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import {
  SCENE_PERIOD,
  SceneCard,
  SceneCover,
  SceneLabel,
  SceneLine,
  ScenePill,
  SceneStage,
} from "@/components/scene/SceneKit";
import { COVERS } from "@/lib/covers";

/**
 * Scenes for the feature-detail pages (prototype `featScene(kind)`, L3199–3285, and the hero demo `fd.t1`, L1953–1960).
 * Decorative: each stage carries a label, the cards inside are hidden from assistive tech by the stage.
 */

const QR_ON = [0, 1, 2, 4, 5, 7, 9, 10, 12, 14, 15, 17, 19, 20, 22, 24];

function Shot({ n, width, radius = 2 }: { n: number; width: string; radius?: number }) {
  return (
    <span
      className="block aspect-[3/4]"
      style={{ width, borderRadius: radius, background: `var(--color-white) url(${COVERS[n % COVERS.length]}) center/cover` }}
    />
  );
}

function Screen({ inset, radius, children, style }: { inset: number | string; radius: number; children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute flex items-center justify-center gap-1 bg-ink-950" style={{ inset, borderRadius: radius, ...style }}>
      {children}
    </div>
  );
}

/** One link on a laptop, tablet-sized phone and watch-sized screen. */
export function DevicesScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="The same link open on a laptop, a phone and a small screen">
      <SceneCard left="6%" top="12%" width="52%" height="64%" rise={0.2} className="p-1.5" style={{ borderRadius: 8 }}>
        <div className="flex h-2.5 items-center gap-[3px] px-1">
          {[0, 1, 2].map((n) => (
            <span key={n} className="h-[5px] w-[5px] rounded-full bg-gray-300" />
          ))}
        </div>
        <Screen inset="18px 6px 6px 6px" radius={6}>
          <Shot n={1} width="28%" />
          <Shot n={2} width="28%" />
        </Screen>
      </SceneCard>
      <SceneCard left="58%" top="24%" width="28%" height="52%" rise={0.8} className="p-[5px]" style={{ borderRadius: 10 }}>
        <Screen inset={5} radius={6}>
          <Shot n={1} width="80%" />
        </Screen>
      </SceneCard>
      <SceneCard left="84%" top="42%" width="12%" height="38%" rise={1.4} className="p-[3px]" style={{ borderRadius: 8 }}>
        <Screen inset={3} radius={6}>
          <Shot n={1} width="84%" radius={1} />
        </Screen>
      </SceneCard>
      <ScenePill tone="navy" center left="50%" bottom="5%" delay={2.4}>
        Same link · 3 devices
      </ScenePill>
    </SceneStage>
  );
}

/** Link typing itself, then email, social and print QR share cards. */
export function LinkShareScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A link being copied and shared by email, social post and printed QR code">
      <SceneCard left="8%" top="10%" right="8%" className="flex items-center gap-2 px-3 py-[9px]">
        <span className="flex-1 overflow-hidden whitespace-nowrap rounded-sm bg-gray-100 px-2.5 py-1.5 font-mono text-[11px] text-navy-800">
          <span className="inline-block" style={{ animation: `fasMType ${SCENE_PERIOD}s linear infinite` }}>
            read.yourmagazine.com/october-2026
          </span>
        </span>
        <span
          className="fas-motion rounded-full bg-green-100 px-2 py-[3px] text-[10px] font-bold text-green-800"
          style={{ animation: `fasMFade ${SCENE_PERIOD}s linear infinite` }}
        >
          Copied
        </span>
      </SceneCard>
      {(
        [
          ["EMAIL", 1.2],
          ["SOCIAL", 1.7],
          ["PRINT QR", 2.2],
        ] as const
      ).map(([name, delay], i) => (
        <SceneCard key={name} left={`${8 + i * 30}%`} top="30%" width="24%" height="50%" rise={delay} className="flex flex-col gap-1.5 p-2.5">
          <SceneLabel className="text-blue-500">{name}</SceneLabel>
          {i === 2 ? (
            <div className="m-auto grid h-14 w-14 grid-cols-5 gap-0.5">
              {Array.from({ length: 25 }, (_, q) => (
                <span key={q} style={{ background: QR_ON.includes(q) ? "var(--color-navy-800)" : "transparent" }} />
              ))}
            </div>
          ) : i === 1 ? (
            <span className="min-h-0 flex-1 rounded-sm" style={{ background: `var(--color-white) url(${COVERS[1]}) top/cover` }} />
          ) : (
            <div className="flex flex-1 flex-col gap-1">
              <SceneLine width="80%" />
              <SceneLine width="60%" />
              <span className="mt-auto h-3.5 w-[52px] rounded-sm bg-blue-500" />
            </div>
          )}
          <span className="text-[9.5px] text-gray-500">Opens tracked</span>
        </SceneCard>
      ))}
    </SceneStage>
  );
}

/** Link settings, audit log and an expired-link notice. */
export function ExpireScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="Link settings with an expiry date, an audit log and an expired-link message">
      <SceneCard left="8%" top="10%" width="46%" rise={0.2} className="flex flex-col gap-2 p-3">
        <SceneLabel className="text-navy-800">LINK SETTINGS</SceneLabel>
        {[
          ["Expires", "Nov 30, 2026"],
          ["Domain", "northlight.media"],
          ["Downloads", "Off"],
        ].map(([a, b]) => (
          <span key={a} className="flex justify-between border-b border-gray-100 py-[5px] text-[10.5px] text-gray-700">
            {a}
            <b className="text-navy-800">{b}</b>
          </span>
        ))}
      </SceneCard>
      <SceneCard left="58%" top="10%" width="36%" rise={1.4} className="flex flex-col gap-1 p-2.5">
        <SceneLabel>AUDIT LOG</SceneLabel>
        {[
          ["Mark T", "set password", "11:05"],
          ["Dana L", "expiry Nov 30", "10:51"],
          ["Jon R", "shared link", "10:42"],
        ].map(([who, what, time]) => (
          <span key={who} className="flex gap-1 text-[9.5px] text-gray-700">
            <b>{who}</b>
            {what}
            <span className="ml-auto text-gray-400">{time}</span>
          </span>
        ))}
      </SceneCard>
      <SceneCard left="8%" top="64%" width="86%" rise={2.6} className="flex items-center gap-2.5 border-red-200 bg-red-50 p-2.5">
        <span aria-hidden="true" className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-red-600 text-white">
          <Icon name="history" size={14} />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] font-bold text-red-800">This link expired on Nov 30</span>
          <span className="text-[9.5px] text-red-700">Ask the publisher for a new one</span>
        </span>
      </SceneCard>
    </SceneStage>
  );
}

/** A web page with a dashed iframe slot where the two-page reader pops in. */
export function EmbedScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A web page with the magazine reader embedded inside it, updating with each issue">
      <SceneCard left="8%" top="8%" right="8%" bottom="10%" float className="overflow-hidden">
        <div className="flex h-[26px] items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-2.5">
          {[0, 1, 2].map((n) => (
            <span key={n} className="h-[7px] w-[7px] rounded-full bg-gray-300" />
          ))}
          <span className="ml-2 font-mono text-[9.5px] text-gray-500">yourmagazine.com/latest-issue</span>
        </div>
        <div className="grid grid-cols-[1fr_1.4fr] gap-3 p-3">
          <div className="flex flex-col gap-1.5">
            <SceneLine width="90%" height={10} className="bg-navy-800" />
            <SceneLine />
            <SceneLine width="85%" />
            <SceneLine width="70%" />
            <SceneLine width="90%" />
          </div>
          <div className="relative flex min-h-[110px] items-center justify-center rounded-sm border-2 border-dashed border-blue-300 bg-blue-50">
            <div className="fas-motion flex gap-0.5" style={{ animation: `fasMPop ${SCENE_PERIOD}s linear 1.2s infinite backwards` }}>
              <Shot n={3} width="34px" />
              <Shot n={4} width="34px" />
            </div>
            <span className="absolute -top-[9px] left-2 bg-white px-1 text-[9px] font-bold text-blue-500">{"<iframe>"}</span>
          </div>
        </div>
      </SceneCard>
      <ScenePill tone="green" right="10%" bottom="14%" delay={2.6}>
        Auto-updates each issue
      </ScenePill>
    </SceneStage>
  );
}

/** "Latest issue" shelf: the newest cover flies onto the shelf when a new issue publishes. */
export function LatestShelfScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A bookshelf embed on a website that gains the newest issue automatically">
      <SceneCard left="10%" top="10%" right="10%" bottom="10%" float className="flex flex-col gap-2 p-3">
        <SceneLabel className="text-navy-800">YOUR SITE · LATEST ISSUE SHELF</SceneLabel>
        <div className="flex flex-1 items-end justify-center gap-2.5 rounded-[2px] border-b-[6px] border-[#7a4a2a] pb-1.5">
          {[4, 5, 6, 7].map((n, i) => (
            <SceneCover
              key={n}
              src={COVERS[n % COVERS.length]}
              width={44}
              radius={2}
              style={{ position: "relative" }}
              fly={i === 3 ? { x: "60px", y: "-60px", r: "10deg", delay: 1.2 } : undefined}
            />
          ))}
        </div>
      </SceneCard>
      <ScenePill tone="green" center left="50%" bottom="4%" delay={2.8}>
        New issue published → shelf updated
      </ScenePill>
    </SceneStage>
  );
}

/** Hero demo on the dark panel (`fd.t1`): the cover, a copied link, then website / social / email cards. */
export function ShareHeroDemo() {
  const card = "flex flex-col gap-1.5 rounded-md border border-white/14 bg-white/8 p-2.5";
  return (
    <div
      role="img"
      aria-label="A magazine cover with its short link copied, then shared to a website embed, a social post and an email"
      className="relative h-[340px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--color-ink-950),var(--color-navy-800))]"
    >
      <div className="absolute inset-0 grid grid-cols-[120px_1fr] items-center gap-7 px-9 py-7 max-sm:grid-cols-[84px_1fr] max-sm:gap-4 max-sm:px-5" style={{ animation: "fasFade .3s ease-out both" }}>
        <span
          className="block aspect-[3/4] w-full rounded-sm shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
          style={{ background: `var(--color-white) url(${COVERS[0]}) center/cover` }}
        />
        <div className="flex min-w-0 flex-col gap-2.5">
          <div
            className="flex items-center gap-2 rounded-md bg-white px-3 py-[9px] font-mono text-xs text-navy-800"
            style={{ animation: "fasLinkOut 1.2s ease-out .2s both" }}
          >
            <Icon name="link" size={13} />
            <span className="min-w-0 truncate">read.yourmagazine.com/october-2026</span>
            <span className="ml-auto flex-none rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-800">Copied</span>
          </div>
          <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
            <div className={card} style={{ animation: "fasCard 1s ease-out .9s both" }}>
              <span className="text-[10px] font-bold text-blue-300">YOUR WEBSITE</span>
              <div className="flex h-11 items-center justify-center rounded-sm bg-white/10">
                <Shot n={0} width="26px" />
              </div>
              <span className="text-[10px] text-blue-100">&lt;iframe src=…&gt;</span>
            </div>
            <div className={card} style={{ animation: "fasCard 1s ease-out 1.3s both" }}>
              <span className="text-[10px] font-bold text-blue-300">SOCIAL POST</span>
              <span className="block h-11 rounded-sm" style={{ background: `var(--color-white) url(${COVERS[0]}) center/cover` }} />
              <span className="text-[10px] text-blue-100">“The October issue is out”</span>
            </div>
            <div className={card} style={{ animation: "fasCard 1s ease-out 1.7s both" }}>
              <span className="text-[10px] font-bold text-blue-300">EMAIL</span>
              <div className="flex h-11 flex-col gap-1 rounded-sm bg-white/10 p-1.5">
                <span className="h-[5px] w-[70%] rounded-[2px] bg-white/40" />
                <span className="h-[5px] w-1/2 rounded-[2px] bg-white/30" />
                <span className="mt-auto h-3 w-12 rounded-[3px] bg-blue-500" />
              </div>
              <span className="text-[10px] text-blue-100">Read now →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
