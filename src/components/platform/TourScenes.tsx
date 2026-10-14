import type { CSSProperties, ReactNode } from "react";
import {
  SCENE_AVATAR_COLORS,
  SCENE_PERIOD,
  SceneAvatar,
  SceneBars,
  SceneCard,
  SceneCover,
  SceneCursor,
  SceneIconDisc,
  SceneLabel,
  SceneLine,
  ScenePill,
  SceneToggle,
  pop,
  rise,
} from "@/components/scene/SceneKit";
import { COVERS } from "@/lib/covers";

/**
 * The six product-tour illustrations (prototype `tourScene(0..5)`, script L3152–3198),
 * composed from the scene kit. All loop on the shared 7s period.
 */

const cover = (i: number) => COVERS[i % COVERS.length];

/** 4:3 stage, centred in the row's visual column with the soft sky glow. */
function Stage({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative aspect-[4/3] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, rgba(56,189,248,.14), rgba(224,242,254,.5) 45%, transparent 72%)",
      }}
    >
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-[4/3] w-[min(100%,440px)] -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}

const anim = (name: string, delay: number, timing = "linear"): CSSProperties => ({
  animation: `${name} ${SCENE_PERIOD}s ${timing} ${delay}s infinite backwards`,
});

/* 0 · Create: flat plan, covers flying into the page slots */
function Create() {
  return (
    <Stage label="A flat plan with covers flying into the page slots, then a notice: Page 6 placed.">
      <SceneCard left="18%" top="14%" right="18%" bottom="14%" float className="grid grid-cols-4 gap-2 p-3">
        {Array.from({ length: 8 }, (_, n) => (
          <span
            key={n}
            className={`aspect-[3/4] rounded-sm ${n === 5 ? "border-[1.5px] border-dashed border-blue-500 bg-blue-100" : "border border-gray-200 bg-slate-100"}`}
          />
        ))}
      </SceneCard>
      <SceneCover src={cover(0)} width="14%" left="4%" top="6%" fly={{ x: "-90px", y: "-60px", r: "-14deg", delay: 0.2 }} />
      <SceneCover src={cover(3)} width="14%" right="4%" top="8%" fly={{ x: "90px", y: "-70px", r: "12deg", delay: 0.5 }} />
      <SceneCover src={cover(6)} width="14%" left="6%" bottom="8%" fly={{ x: "-100px", y: "60px", r: "-8deg", delay: 0.8 }} />
      <SceneCover src={cover(9)} width="13.5%" left="58.5%" top="48%" fly={{ x: "120px", y: "90px", r: "10deg", delay: 1.6 }} />
      <SceneCursor left="76%" top="76%" to={["-60px", "-70px"]} delay={1} />
      <ScenePill tone="green" center left="50%" bottom="5%" delay={2.6}>
        Page 6 placed
      </ScenePill>
    </Stage>
  );
}

/* 1 · Enhance: hotspots on a cover */
function Enhance() {
  const dots: [string, string, string][] = [
    ["22%", "30%", "var(--color-blue-500)"],
    ["68%", "48%", "var(--color-pink-500)"],
    ["40%", "74%", "var(--color-amber-500)"],
  ];
  return (
    <Stage label="A cover with three hotspots: a video, a buy-now product tag and a lead form. All tracked.">
      <SceneCover src={cover(1)} left="32%" top="8%" width="36%" float shadow="lg" radius={6}>
        {dots.map(([x, y, c], n) => (
          <span
            key={n}
            className="absolute h-[18px] w-[18px] rounded-full border-2 border-white"
            style={{
              left: x,
              top: y,
              background: c,
              boxShadow: `0 0 0 6px color-mix(in srgb, ${c} 20%, transparent)`,
              ...anim("fasMPop", 0.6 + n * 0.5),
            }}
          />
        ))}
      </SceneCover>
      <SceneCard left="3%" top="18%" width="30%" rise={1} className="p-2.5">
        <SceneLabel className="text-blue-500">▶ VIDEO</SceneLabel>
        <div className="mt-1.5 flex h-[38px] items-center justify-center rounded-sm bg-[linear-gradient(135deg,var(--color-navy-800),var(--color-blue-400))] text-small text-white">
          ▶
        </div>
        <span className="mt-1.5 block text-[9.5px] text-gray-500">Plays inline · 0:42</span>
      </SceneCard>
      <SceneCard right="3%" top="30%" width="30%" rise={1.5} className="p-2.5">
        <SceneLabel className="text-pink-500">BUY NOW</SceneLabel>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="h-[26px] w-[26px] rounded-sm bg-[linear-gradient(135deg,var(--color-amber-200),var(--color-amber-500))]" />
          <span className="flex flex-1 flex-col gap-[3px]">
            <SceneLine width="90%" />
            <SceneLine width="60%" />
          </span>
        </div>
        <span className="mt-1.5 block text-caption font-bold text-navy-800">$89</span>
      </SceneCard>
      <SceneCard left="6%" bottom="8%" width="34%" rise={2} className="p-2.5">
        <SceneLabel className="text-amber-500">LEAD FORM</SceneLabel>
        <div className="mt-1.5 flex flex-col gap-1">
          <span className="h-3.5 rounded-sm border border-gray-200" />
          <span className="h-3.5 rounded-sm bg-blue-500" />
        </div>
      </SceneCard>
      <ScenePill tone="navy" right="6%" bottom="10%" delay={2.8}>
        3 hotspots · all tracked
      </ScenePill>
      <SceneCursor left="46%" top="58%" to={["30px", "-30px"]} delay={0.4} />
    </Stage>
  );
}

/* 2 · Publish: URL typing, QR, embed, bookshelf */
const QR_ON = [0, 1, 2, 4, 5, 7, 9, 10, 12, 14, 15, 17, 19, 20, 22, 24];

function Publish() {
  return (
    <Stage label="A web address typing itself, then a QR code, an embed snippet and a bookshelf of covers.">
      <SceneCard left="6%" top="10%" right="6%" className="flex items-center gap-2 px-3 py-2.5">
        <span className="flex gap-1">
          {[0, 1, 2].map((n) => (
            <span key={n} className="h-2 w-2 rounded-full bg-gray-300" />
          ))}
        </span>
        <span className="flex-1 overflow-hidden whitespace-nowrap rounded-sm bg-gray-100 px-2.5 py-1.5 font-mono text-[11px] text-navy-800">
          <span className="inline-block" style={{ animation: `fasMType ${SCENE_PERIOD}s linear infinite` }}>
            read.yourmagazine.com/october-2026
          </span>
        </span>
        <span className="fas-motion rounded-full bg-green-100 px-2 py-[3px] text-[10px] font-bold text-green-800" style={{ animation: `fasMFade ${SCENE_PERIOD}s linear infinite` }}>
          ● Live
        </span>
      </SceneCard>
      <SceneCover src={cover(2)} left="8%" top="36%" width="22%" float />
      <SceneCard left="36%" top="38%" width="26%" rise={2} className="flex flex-col items-center gap-1.5 p-2.5">
        <div className="grid h-11 w-11 grid-cols-5 gap-0.5">
          {Array.from({ length: 25 }, (_, n) => (
            <span key={n} className="rounded-[1px]" style={{ background: QR_ON.includes(n) ? "var(--color-navy-800)" : "transparent" }} />
          ))}
        </div>
        <SceneLabel className="text-navy-800">QR code</SceneLabel>
      </SceneCard>
      <SceneCard right="6%" top="36%" width="28%" rise={2.6} className="p-2.5">
        <SceneLabel>EMBED</SceneLabel>
        <code className="mt-1.5 block break-all rounded-sm bg-blue-50 px-2 py-1.5 text-[9.5px] text-navy-700">
          {'<iframe src="…/october-2026">'}
        </code>
      </SceneCard>
      <SceneCard left="36%" bottom="8%" right="6%" rise={3.2} className="flex items-end gap-2 p-2.5">
        <SceneLabel className="absolute left-2.5 top-2 text-gray-500">BOOKSHELF</SceneLabel>
        {[4, 5, 6, 7, 8].map((n) => (
          <span
            key={n}
            className="mt-3.5 h-[30px] w-[22px] rounded-sm bg-gray-200 shadow-[0_4px_8px_-4px_rgba(0,0,0,.4)]"
            style={{ background: `var(--color-gray-200) url(${cover(n)}) center/cover` }}
          />
        ))}
      </SceneCard>
    </Stage>
  );
}

/* 3 · Control: access toggles and a locked cover */
const ACCESS: [string, string][] = [
  ["Private link", "Only people with the link"],
  ["Password", "Required to open"],
  ["Allow download", "PDF for readers"],
  ["Subscribers only", "Paywall after page 3"],
];

function Control() {
  return (
    <Stage label="Four access switches turning on, and a cover locked behind Subscribers only.">
      <SceneCover src={cover(5)} right="8%" top="12%" width="30%" float shadow="lg" className="overflow-hidden">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-navy-800/55"
          style={anim("fasMPop", 2.4)}
        >
          <SceneIconDisc name="lock" />
          <span className="text-[10px] font-bold text-white">Subscribers only</span>
        </div>
      </SceneCover>
      {ACCESS.map(([title, sub], n) => (
        <SceneCard
          key={title}
          left="6%"
          top={`${14 + n * 16.5}%`}
          width="48%"
          rise={n * 0.25}
          className="flex items-center justify-between gap-2 px-3 py-2"
        >
          <span className="flex flex-col">
            <span className="text-caption font-bold text-navy-800">{title}</span>
            <span className="text-[9.5px] text-gray-500">{sub}</span>
          </span>
          <SceneToggle delay={n * 0.35 + 0.4} />
        </SceneCard>
      ))}
      <SceneCursor left="50%" top="30%" to={["0px", "46px"]} delay={0.6} />
    </Stage>
  );
}

/* 4 · Measure: reads dashboard */
const KPIS: [string, string, string][] = [
  ["12,480", "reads", "var(--color-blue-500)"],
  ["3m 48s", "avg time", "var(--color-violet-500)"],
  ["6.8%", "CTR", "var(--color-green-600)"],
];

function Measure() {
  return (
    <Stage label="A reads dashboard: 12,480 reads, 3m 48s average time and a 6.8% click-through rate, with a bar chart.">
      <SceneCard left="6%" top="10%" right="6%" bottom="10%" className="flex flex-col gap-2.5 p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-eyebrow font-bold text-navy-800">October 2026 · Reads</span>
          <span className="rounded-full bg-green-100 px-2 py-[3px] text-[10px] font-bold text-green-800">● Live</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {KPIS.map(([v, l, c], n) => (
            <div key={l} className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-2" style={anim("fasMFade", n * 0.2)}>
              <span className="block text-body font-bold tracking-[-.02em]" style={{ color: c }}>
                {v}
              </span>
              <span className="text-[9.5px] text-gray-500">{l}</span>
            </div>
          ))}
        </div>
        <SceneBars className="flex-1" values={[38, 62, 91, 55, 44, 58, 70, 96, 52, 40, 35, 30]} highlight={[2, 7]} />
      </SceneCard>
      <ScenePill tone="navy" right="10%" top="38%" delay={3}>
        +1 · Comfort Zone p3
      </ScenePill>
      <span
        className="absolute bottom-[30%] left-[28%] h-10 w-10 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,.55), rgba(249,115,22,.25) 50%, transparent 70%)",
          ...pop(2.4),
        }}
      />
    </Stage>
  );
}

/* 5 · Scale: workspaces and a team around them */
const WORKSPACES: [string, string, string][] = [
  ["OC", "OC Parenting", "var(--color-navy-800)"],
  ["RV", "RV News", "var(--color-orange-600)"],
  ["BB", "BankBeat", "var(--color-green-700)"],
];
const TEAM: [string, string, string][] = [
  ["PS", "4%", "12%"],
  ["MT", "82%", "8%"],
  ["DL", "2%", "70%"],
  ["JR", "86%", "66%"],
  ["AK", "46%", "2%"],
];

function Scale() {
  return (
    <Stage label="Three client workspaces in one account, with five teammates around it and a comment assigned to Dana.">
      <SceneCard left="18%" top="18%" right="18%" bottom="18%" float className="flex flex-col gap-2 p-3">
        <SceneLabel className="text-[10.5px] text-gray-500">NORTHLIGHT MEDIA · 3 WORKSPACES</SceneLabel>
        {WORKSPACES.map(([ini, name, c], k) => (
          <div key={ini} className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5" style={rise(k * 0.3 + 0.3)}>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-sm text-[9px] font-extrabold text-white" style={{ background: c }}>
              {ini}
            </span>
            <span className="flex-1 text-caption font-semibold text-navy-800">{name}</span>
            <SceneLine width="28%" height={5} />
          </div>
        ))}
      </SceneCard>
      {TEAM.map(([ini, x, y], n) => (
        <SceneAvatar key={ini} initials={ini} color={SCENE_AVATAR_COLORS[n]} left={x} top={y} delay={n * 0.35 + 0.6} />
      ))}
      <ScenePill tone="white" center left="50%" bottom="6%" delay={3.2}>
        Comment · p12 assigned to Dana
      </ScenePill>
    </Stage>
  );
}

const SCENES = [Create, Enhance, Publish, Control, Measure, Scale];

/** `index` 0–5: Create, Enhance, Publish, Control, Measure, Scale. */
export function TourScene({ index }: { index: number }) {
  const Scene = SCENES[index] ?? Scale;
  return <Scene />;
}
