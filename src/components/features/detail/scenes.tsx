import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import {
  SCENE_PERIOD,
  SceneBars,
  SceneCard,
  SceneCover,
  SceneCursor,
  SceneLabel,
  SceneLine,
  ScenePill,
  SceneStage,
  SceneToggle,
  float,
  pop,
  rise,
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

const VISIBILITY_TOGGLES = [
  { title: "Private link", sub: "Only people with the link" },
  { title: "Password", sub: "Required to open" },
  { title: "Allow download", sub: "PDF for readers" },
  { title: "Expire on", sub: "Nov 30, 2026" },
];

/** Four visibility switches turning on, then the cover locks to "Protected". */
export function TogglesScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="Visibility settings for private link, password, download and expiry switching on, and the cover becoming protected">
      {VISIBILITY_TOGGLES.map((t, n) => (
        <SceneCard
          key={t.title}
          left="6%"
          top={`${14 + n * 16}%`}
          width="50%"
          rise={n * 0.25}
          className="flex items-center justify-between gap-2 px-3 py-2"
        >
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[11.5px] font-bold text-navy-800">{t.title}</span>
            <span className="truncate text-[9.5px] text-gray-500">{t.sub}</span>
          </span>
          <SceneToggle delay={n * 0.35 + 0.4} />
        </SceneCard>
      ))}
      <SceneCover src={COVERS[5 % COVERS.length]} right="6%" top="18%" width="30%" shadow="lg" float className="overflow-hidden">
        <span
          className="fas-motion absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[color-mix(in_srgb,var(--color-navy-800)_55%,transparent)]"
          style={pop(2.4)}
        >
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-navy-800">
            <Icon name="lock" size={15} />
          </span>
          <span className="text-[10px] font-bold text-white">Protected</span>
        </span>
      </SceneCover>
      <SceneCursor left="50%" top="28%" to={["0px", "44px"]} delay={0.6} />
    </SceneStage>
  );
}

const MEMBER_RULES = [
  { name: "SSO", color: "bg-blue-500" },
  { name: "Password", color: "bg-violet-500" },
  { name: "Domain", color: "bg-teal-500" },
];

/** Pages free to page 3, a "continue reading" paywall card and member sign-in rules, then a new subscriber. */
export function PaywallScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="An issue free to read until page 3, then a subscribe prompt with SSO, password and domain sign-in for members">
      <div className="fas-motion absolute top-[12%] left-[8%] flex gap-1.5" style={float}>
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={`block h-[60px] w-11 rounded-[3px] shadow-[0_10px_18px_-10px_rgba(0,0,0,0.5)] ${n > 2 ? "blur-[2px] brightness-80" : ""}`}
            style={{ background: `var(--color-white) url(${COVERS[(9 + n) % COVERS.length]}) center/cover` }}
          />
        ))}
        <span className="absolute -top-2 -right-1.5 rounded-full bg-navy-800 px-1.5 py-0.5 text-[9px] font-bold text-white">Free to p3</span>
      </div>
      <SceneCard left="8%" top="36%" width="44%" rise={0.8} className="flex flex-col gap-1.5 p-3">
        <SceneLabel className="text-navy-800">CONTINUE READING</SceneLabel>
        <span className="text-sm font-bold text-navy-800">$4.99 / month</span>
        <span className="text-[9.5px] text-gray-500">or sign in as a subscriber</span>
        <span className="flex h-6 items-center justify-center rounded-sm bg-blue-500 text-[10.5px] font-bold text-white">Subscribe</span>
      </SceneCard>
      <SceneCard left="56%" top="20%" width="36%" rise={1.6} className="flex flex-col gap-1.5 p-2.5">
        <SceneLabel>MEMBERS</SceneLabel>
        {MEMBER_RULES.map((m) => (
          <span key={m.name} className="flex items-center gap-1.5 text-[10.5px] text-gray-700">
            <span className={`h-[7px] w-[7px] flex-none rounded-[2px] ${m.color}`} />
            {m.name}
          </span>
        ))}
      </SceneCard>
      <ScenePill tone="green" left="56%" top="54%" delay={3}>
        +1 subscriber
      </ScenePill>
      <SceneCursor left="36%" top="68%" to={["-20px", "-8px"]} delay={2.2} />
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

const SOCIAL_FORMATS = [
  { ratio: "1:1", aspect: "1/1", left: "32%", top: "10%", width: "24%", maxHeight: 60 },
  { ratio: "9:16", aspect: "9/16", left: "58%", top: "8%", width: "22%", maxHeight: 92 },
  { ratio: "16:9", aspect: "16/9", left: "32%", top: "56%", width: "24%", maxHeight: 60 },
];

/** One page cropped to square, story and landscape posts, an AI caption, then "Scheduled". */
export function SocialScene() {
  const src = COVERS[6 % COVERS.length];
  return (
    <SceneStage height="100%" backdrop="none" label="A magazine page turned into square, story and landscape social posts with an AI-written caption">
      <SceneCover src={src} left="6%" top="14%" width="22%" float />
      {SOCIAL_FORMATS.map((f, i) => (
        <SceneCard key={f.ratio} left={f.left} top={f.top} width={f.width} rise={0.6 + i * 0.5} className="flex flex-col gap-1 p-1.5">
          <span className="block" style={{ aspectRatio: f.aspect, maxHeight: f.maxHeight, borderRadius: 4, background: `var(--color-white) url(${src}) center/cover` }} />
          <span className="text-[9px] font-bold text-gray-500">{f.ratio}</span>
        </SceneCard>
      ))}
      <SceneCard left="58%" top="58%" width="36%" rise={2.2} className="flex flex-col gap-[5px] p-2.5">
        <SceneLabel className="text-violet-500">AI CAPTION</SceneLabel>
        <span className="text-[10.5px] leading-[1.4] text-gray-700">The October issue is out: fall home guide, 12 new listings #realestate</span>
      </SceneCard>
      <SceneCursor left="40%" top="46%" to={["80px", "40px"]} delay={1.8} />
      <ScenePill tone="navy" left="6%" bottom="8%" delay={3}>
        Scheduled · 3 posts
      </ScenePill>
    </SceneStage>
  );
}

/** A cover becoming a readable article page: alt text, text size and dark mode controls. */
export function ArticleScene() {
  const src = COVERS[3];
  return (
    <SceneStage height="100%" backdrop="none" label="A magazine page converted to a readable article with alt text, text size and dark mode options">
      <SceneCover src={src} left="6%" top="10%" width="30%" shadow="lg" float style={{ maxHeight: "80%" }} />
      <span className="fas-motion absolute top-[46%] left-[38%] text-lg text-blue-500" style={pop(0.8)}>
        →
      </span>
      <SceneCard left="46%" top="14%" width="48%" rise={1} className="flex flex-col gap-1.5 p-3">
        <SceneLabel className="text-blue-500">ARTICLE MODE · P8</SceneLabel>
        <span className="text-xs leading-[1.25] font-bold text-navy-800">Mars Express: a decade above the Red Planet</span>
        <SceneLine width="96%" />
        <SceneLine width="88%" />
        <SceneLine width="70%" />
        <span className="mt-1 flex items-center gap-1.5">
          <span className="h-[22px] w-[30px] flex-none" style={{ borderRadius: 3, background: `var(--color-white) url(${src}) center/cover` }} />
          <span className="text-[9px] text-gray-500">
            <b className="text-blue-500">alt </b>Orbital view of Mars
          </span>
        </span>
        <span className="mt-1.5 flex gap-1">
          {[8, 10, 12].map((size, i) => (
            <span
              key={size}
              className={`flex h-[18px] flex-1 items-center justify-center rounded-sm border font-bold ${
                i === 1 ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 bg-white text-gray-700"
              }`}
              style={{ fontSize: size }}
            >
              A
            </span>
          ))}
          <span className="flex h-[18px] flex-[1.6] items-center justify-center rounded-sm bg-slate-900 text-[8.5px] font-bold text-white">Dark</span>
        </span>
      </SceneCard>
      <ScenePill tone="green" left="8%" bottom="6%" delay={2.6}>
        Screen-reader ready
      </ScenePill>
    </SceneStage>
  );
}

const REVENUE_TILES = [
  { value: "$1,942", label: "shop orders", color: "text-orange-500" },
  { value: "$3,120", label: "subscriptions", color: "text-blue-500" },
  { value: "$640", label: "single issues", color: "text-violet-500" },
];

/** Monthly revenue card: three totals count in, bars grow, then a per-page sale pill. */
export function RevenueScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A revenue dashboard with totals for shop orders, subscriptions and single issues, and a rising daily chart">
      <SceneCard left="6%" top="10%" right="6%" bottom="10%" className="flex flex-col gap-2.5 p-3.5">
        <span className="flex items-center justify-between">
          <SceneLabel className="text-navy-800">REVENUE · OCTOBER</SceneLabel>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">Live</span>
        </span>
        <span className="grid grid-cols-3 gap-2">
          {REVENUE_TILES.map((t, n) => (
            <span key={t.label} className="fas-motion rounded-md bg-slate-50 px-2.5 py-2" style={rise(n * 0.2)}>
              <span className={`block text-sm font-bold ${t.color}`}>{t.value}</span>
              <span className="text-[9px] text-gray-500">{t.label}</span>
            </span>
          ))}
        </span>
        <SceneBars values={[30, 42, 38, 55, 60, 52, 70, 66, 84, 96]} highlight={[8, 9]} className="flex-1" />
      </SceneCard>
      <ScenePill tone="navy" right="10%" top="40%" delay={3}>
        +$7.98 · Henning&apos;s p8
      </ScenePill>
    </SceneStage>
  );
}

/** Round hotspot marker on a cover: white ring, tinted halo, glyph. Pops in on the loop. */
function Spot({ left, top, color, glyph, delay }: { left: string; top: string; color: string; glyph?: string; delay: number }) {
  return (
    <span
      className="fas-motion absolute flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[9px] text-white"
      style={{ left, top, background: color, boxShadow: `0 0 0 6px color-mix(in srgb, ${color} 22%, transparent)`, ...pop(delay) }}
    >
      {glyph}
    </span>
  );
}

const HOTSPOTS = [
  { left: "22%", top: "30%", color: "var(--color-blue-500)", glyph: "↗" },
  { left: "66%", top: "48%", color: "var(--color-pink-500)", glyph: "▶" },
  { left: "40%", top: "74%", color: "var(--color-orange-500)", glyph: "$" },
];

/** A cover with link, video and buy hotspots, each with its action card, then "Auto-detected". */
export function HotspotsScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A magazine page with web link, video and buy-now hotspots, and their links detected automatically">
      <SceneCover src={COVERS[2]} left="34%" top="8%" width="32%" shadow="lg" float>
        {HOTSPOTS.map((h, n) => (
          <Spot key={h.glyph} {...h} delay={0.6 + n * 0.5} />
        ))}
      </SceneCover>
      <SceneCard left="4%" top="18%" width="27%" rise={1.1} className="p-[9px]">
        <SceneLabel className="text-blue-500">WEB LINK</SceneLabel>
        <span className="mt-1 block font-mono text-[9.5px] break-all text-gray-700">harbourmotors.com/fall</span>
      </SceneCard>
      <SceneCard right="4%" top="34%" width="27%" rise={1.6} className="p-[9px]">
        <SceneLabel className="text-pink-500">VIDEO</SceneLabel>
        <span className="mt-1 flex h-[30px] items-center justify-center rounded-sm bg-linear-135 from-navy-800 to-blue-400 text-[11px] text-white">▶</span>
        <span className="mt-1 block text-[9.5px] text-gray-500">0:42 · inline</span>
      </SceneCard>
      <SceneCard left="6%" bottom="10%" width="30%" rise={2.1} className="p-[9px]">
        <SceneLabel className="text-orange-500">BUY NOW</SceneLabel>
        <span className="mt-1 block text-xs font-bold text-navy-800">$89 · Fall service</span>
      </SceneCard>
      <ScenePill tone="green" right="6%" bottom="10%" delay={2.8}>
        Auto-detected 14 links
      </ScenePill>
      <SceneCursor left="52%" top="50%" to={["-24px", "-30px"]} delay={0.4} />
    </SceneStage>
  );
}

/** A video playing inline on the page, its sources, and average watch time. */
export function VideoScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A video playing inside a magazine page, with YouTube, Vimeo, MP4 and audio sources">
      <SceneCover src={COVERS[7]} left="10%" top="12%" width="54%" shadow="lg" float className="overflow-hidden" style={{ maxHeight: "76%" }}>
        <span
          className="fas-motion absolute top-[30%] right-[10%] left-[10%] flex aspect-video items-center justify-center rounded-sm bg-linear-135 from-navy-800 to-blue-400"
          style={pop(0.8)}
        >
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-sm text-navy-800">▶</span>
          <span className="absolute right-2 bottom-1.5 left-2 h-[3px] rounded-full bg-white/30">
            <span
              className="fas-motion block h-full origin-bottom rounded-full bg-white"
              style={{ animation: `fasMGrow ${SCENE_PERIOD}s linear 1.4s infinite backwards` }}
            />
          </span>
        </span>
      </SceneCover>
      <SceneCard left="68%" top="18%" width="28%" rise={1.4} className="flex flex-col gap-1.5 p-2.5">
        <SceneLabel>SOURCES</SceneLabel>
        {["YouTube", "Vimeo", "Upload MP4", "Audio"].map((n) => (
          <span key={n} className="flex items-center gap-1.5 text-[11px] text-gray-700">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-blue-500" />
            {n}
          </span>
        ))}
      </SceneCard>
      <ScenePill tone="navy" left="68%" bottom="14%" delay={2.6}>
        Watched 41s avg
      </ScenePill>
      <SceneCursor left="40%" top="52%" to={["-6px", "-22px"]} delay={0.2} />
    </SceneStage>
  );
}

/** A buy hotspot opening a product card and checkout, then an order attributed to the page. */
export function CartScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A buy-now hotspot on an ad opening a product card and checkout, with the order attributed to the page">
      <SceneCover src={COVERS[10]} left="8%" top="14%" width="32%" shadow="lg" float style={{ maxHeight: "72%" }}>
        <Spot left="30%" top="40%" color="var(--color-orange-500)" delay={0.4} />
      </SceneCover>
      <SceneCard left="44%" top="14%" width="50%" rise={0.9} className="grid grid-cols-[44px_1fr] items-center gap-2.5 p-2.5">
        <span className="h-11 w-11 rounded-sm bg-linear-135 from-amber-200 to-amber-500" />
        <span className="flex flex-col gap-[3px]">
          <span className="text-[11px] font-bold text-navy-800">Fall service package</span>
          <span className="text-[9.5px] text-gray-500">Harbour Motors · p12</span>
          <span className="text-[13px] font-bold text-navy-800">$89</span>
        </span>
      </SceneCard>
      <SceneCard left="44%" top="41%" width="50%" rise={1.6} className="flex flex-col gap-1.5 p-2.5">
        <SceneLabel className="text-navy-800">CHECKOUT</SceneLabel>
        <span className="flex h-5 items-center rounded-sm border border-gray-200 px-2 text-[9.5px] text-gray-400">•••• 4242</span>
        <span className="flex h-[22px] items-center justify-center rounded-sm bg-gray-900 text-[10px] font-bold text-white">Pay $89</span>
      </SceneCard>
      <ScenePill tone="green" left="44%" top="70%" delay={3}>
        ✓ Order · attributed to p12
      </ScenePill>
      <SceneCursor left="76%" top="68%" to={["0px", "-18px"]} delay={2.2} />
    </SceneStage>
  );
}

/** A gated page with a sign-up form typing itself in, then a new HubSpot contact attributed to the page. */
export function FormScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A sign-up form on a magazine page being filled in, creating a new HubSpot contact tagged with the issue and page">
      <SceneCover src={COVERS[8 % COVERS.length]} left="6%" top="10%" width="34%" shadow="lg" float className="overflow-hidden" style={{ maxHeight: "80%" }}>
        <span className="absolute inset-0 bg-[linear-gradient(transparent_30%,color-mix(in_srgb,var(--color-navy-800)_85%,transparent))]" />
      </SceneCover>
      <SceneCard left="44%" top="14%" width="50%" rise={0.6} className="flex flex-col gap-[7px] p-3">
        <SceneLabel className="text-navy-800">GET THE FALL HOME GUIDE</SceneLabel>
        {["Ana Kim", "ana@example.com"].map((value, i) => (
          <span key={value} className="flex h-[22px] items-center overflow-hidden rounded-sm border border-gray-200 px-2 text-[10px] text-gray-900">
            <span className="fas-motion inline-block whitespace-nowrap" style={{ animation: `fasMType ${SCENE_PERIOD}s linear ${1 + i * 0.6}s infinite backwards` }}>
              {value}
            </span>
          </span>
        ))}
        <span className="flex h-6 items-center justify-center rounded-sm bg-blue-500 text-[10.5px] font-bold text-white">Send me the guide</span>
      </SceneCard>
      <SceneCard left="48%" top="66%" width="46%" rise={3} className="flex items-center gap-2 p-[9px]">
        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-sm bg-orange-600 text-[9px] font-extrabold text-white">HS</span>
        <span className="flex flex-col">
          <span className="text-[10.5px] font-bold text-navy-800">New contact in HubSpot</span>
          <span className="text-[9px] text-gray-500">Source: October · p12</span>
        </span>
      </SceneCard>
      <SceneCursor left="70%" top="50%" to={["0px", "-22px"]} delay={2.2} />
    </SceneStage>
  );
}

const CRM_TARGETS = [
  { initials: "HS", color: "bg-orange-600", name: "HubSpot", result: "Contact created" },
  { initials: "MC", color: "bg-amber-600", name: "Mailchimp", result: "Added to audience" },
  { initials: "MM", color: "bg-navy-800", name: "Magazine Manager", result: "Linked to account" },
];

/** One lead card fanning out to HubSpot, Mailchimp and Magazine Manager, then the issue's lead count. */
export function CrmScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A new lead sent to HubSpot, Mailchimp and Magazine Manager, with 47 leads counted for the issue">
      <SceneCard left="6%" top="16%" width="30%" rise={0.2} className="flex flex-col gap-[5px] p-2.5">
        <SceneLabel className="text-blue-500">LEAD</SceneLabel>
        <span className="text-[11px] font-bold text-navy-800">Ana Kim</span>
        <span className="truncate text-[9.5px] text-gray-500">ana@example.com</span>
        <span className="text-[9.5px] text-gray-500">October · p12 · QR</span>
      </SceneCard>
      <span
        className="fas-motion absolute top-[30%] left-[37%] h-0.5 w-[19%] bg-[linear-gradient(90deg,var(--color-blue-500),var(--color-blue-200))]"
        style={rise(1)}
      />
      {CRM_TARGETS.map((t, i) => (
        <SceneCard key={t.name} left="56%" top={`${16 + i * 19}%`} width="38%" rise={1.4 + i * 0.4} className="flex items-center gap-2 p-[9px]">
          <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-sm text-[8.5px] font-extrabold text-white ${t.color}`}>{t.initials}</span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[10.5px] font-bold text-navy-800">{t.name}</span>
            <span className="truncate text-[9px] text-green-600">✓ {t.result}</span>
          </span>
        </SceneCard>
      ))}
      <ScenePill tone="navy" left="6%" top="54%" delay={3}>
        47 leads this issue
      </ScenePill>
    </SceneStage>
  );
}

const HERO_SPOTS = [
  { glyph: "↗", color: "var(--color-blue-500)", title: "Web link", sub: "harbourmotors.com/fall-service", left: "14%", top: "30%" },
  { glyph: "▶", color: "var(--color-pink-500)", title: "Video", sub: "Plays inline · 0:42", left: "62%", top: "46%" },
  { glyph: "$", color: "var(--color-orange-500)", title: "Buy now", sub: "$89 · added to cart", left: "30%", top: "74%" },
];

/** Hero demo on the dark panel (`fd.t4`, L1985–1988): hotspots pulse on a cover while their actions list in. */
export function HotspotHeroDemo() {
  return (
    <div
      role="img"
      aria-label="A magazine page with three hotspots: a web link, an inline video and a buy-now button"
      className="relative h-[340px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--color-ink-950),var(--color-navy-800))]"
    >
      <div
        className="absolute inset-0 grid grid-cols-[170px_1fr] items-center gap-7 px-9 py-7 max-sm:grid-cols-[96px_1fr] max-sm:gap-4 max-sm:px-5"
        style={{ animation: "fasFade .3s ease-out both" }}
      >
        <div
          className="relative aspect-[3/4] w-full rounded-sm shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
          style={{ background: `var(--color-white) url(${COVERS[9]}) center/cover` }}
        >
          {HERO_SPOTS.map((h, i) => (
            <span
              key={h.title}
              className="absolute flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white text-[10px] text-white"
              style={{
                left: h.left,
                top: h.top,
                background: h.color,
                animation: "fasPop .5s cubic-bezier(.2,.8,.2,1) both, fasPulse 1.6s ease-in-out infinite",
                animationDelay: `${i * 0.3 + 0.3}s`,
              }}
            >
              {h.glyph}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-2.5">
          {HERO_SPOTS.map((h, i) => (
            <div
              key={h.title}
              className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-white/14 bg-white/8 px-3.5 py-3"
              style={{ animation: "fasCard 1s ease-out both", animationDelay: `${i * 0.3 + 0.5}s` }}
            >
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-md text-sm text-white" style={{ background: h.color }}>
                {h.glyph}
              </span>
              <span className="flex min-w-0 flex-col gap-px">
                <span className="text-label font-bold text-white">{h.title}</span>
                <span className="truncate text-caption text-blue-200">{h.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
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

const GATE_TOGGLES = [
  { title: "Private link", sub: "Only people with the link" },
  { title: "Password", sub: "Required to open" },
  { title: "Allow download", sub: "PDF download for readers" },
  { title: "Subscribers only", sub: "Paywall after page 3" },
];

/** Hero demo on the dark panel (`fd.t2`, L1975–1977): access toggles switch on, then the cover locks to subscribers. */
export function GateHeroDemo() {
  return (
    <div
      role="img"
      aria-label="Access settings for private link, password, download and subscribers only switching on, and the cover locking to subscribers"
      className="relative h-[340px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--color-ink-950),var(--color-navy-800))]"
    >
      <div
        className="absolute inset-0 grid grid-cols-[1fr_150px] items-center gap-7 px-9 py-7 max-sm:grid-cols-[1fr_88px] max-sm:gap-4 max-sm:px-5"
        style={{ animation: "fasFade .3s ease-out both" }}
      >
        <div className="flex min-w-0 flex-col gap-2">
          {GATE_TOGGLES.map((g, i) => (
            <div
              key={g.title}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/14 bg-white/8 px-3.5 py-[11px]"
              style={{ animation: "fasCard .6s ease-out both", animationDelay: `${i * 0.15}s` }}
            >
              <span className="flex min-w-0 flex-col gap-px">
                <span className="text-[13px] font-semibold text-white">{g.title}</span>
                <span className="truncate text-[11px] text-blue-200">{g.sub}</span>
              </span>
              <span
                className="relative h-5 w-[38px] flex-none rounded-full"
                style={{ animation: "fasTrack 1.4s ease-out both", animationDelay: `${i * 0.35 + 0.4}s` }}
              >
                <span
                  className="absolute top-0.5 h-4 w-4 rounded-full bg-white"
                  style={{ animation: "fasKnob 1.4s cubic-bezier(.2,.8,.2,1) both", animationDelay: `${i * 0.35 + 0.4}s` }}
                />
              </span>
            </div>
          ))}
        </div>
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
          style={{ background: `var(--color-white) url(${COVERS[1]}) center/cover` }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[color-mix(in_srgb,var(--color-navy-800)_55%,transparent)]"
            style={{ animation: "fasCheckPop 2.6s ease-out both" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-800">
              <Icon name="lock" size={18} />
            </span>
            <span className="text-center text-[11px] font-bold text-white">Subscribers only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SALES_CHIPS = ["Sell issues", "Subscriptions", "Shoppable ads"];

/** Hero demo on the dark panel (`fd.t3`, L1977–1984): a tagged ad, product card, progress bar, then an attributed order. */
export function SalesHeroDemo() {
  return (
    <div
      role="img"
      aria-label="A magazine ad with a buy-now tag opening a product card, then an order placed and attributed to the page and advertiser"
      className="relative h-[340px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--color-ink-950),var(--color-navy-800))]"
    >
      <div
        className="absolute inset-0 grid grid-cols-[150px_1fr] items-center gap-7 px-9 py-7 max-sm:grid-cols-[88px_1fr] max-sm:gap-4 max-sm:px-5"
        style={{ animation: "fasFade .3s ease-out both" }}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
          style={{ background: `var(--color-white) url(${COVERS[2]}) center/cover` }}
        >
          <span
            className="absolute top-[40%] left-[12%] h-[22px] w-[22px] rounded-full border-2 border-white bg-sky-500 shadow-[0_0_0_6px_rgba(14,165,233,0.3)]"
            style={{ animation: "fasPulse 1.4s ease-in-out infinite" }}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2.5">
          <div
            className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg bg-white p-3.5 max-sm:grid-cols-[40px_minmax(0,1fr)_auto]"
            style={{ animation: "fasCard .8s ease-out .3s both" }}
          >
            <span className="h-[54px] w-[54px] rounded-md bg-linear-135 from-amber-200 to-amber-500 max-sm:h-10 max-sm:w-10" />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-[13px] font-bold text-navy-800">Harbour Motors · Fall service</span>
              <span className="truncate text-[11.5px] text-gray-500">Tagged on page 12 · Buy now</span>
            </span>
            <span className="text-[15px] font-bold text-navy-800">$89</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-[3px] bg-white/12">
            <span className="block h-full bg-green-500" style={{ animation: "fasProgress 1.4s ease-out 1.1s both" }} />
          </div>
          <div
            className="flex items-center gap-2.5 rounded-lg bg-green-100 px-3.5 py-3 text-[13px] font-bold text-green-800"
            style={{ animation: "fasCard .6s ease-out 2.4s both" }}
          >
            ✓ Order placed · attributed to page 12 and the advertiser
          </div>
          <div className="flex flex-wrap gap-2" style={{ animation: "fasFade .6s ease-out 2.8s both" }}>
            {SALES_CHIPS.map((c) => (
              <span key={c} className="rounded-full bg-white/10 px-[9px] py-1 text-[11px] text-blue-100">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A search bar and a result card with a green "indexed" tick. */
export function SearchScene() {
  return (
    <SceneStage height="100%" backdrop="none" label="A search for the article's topic returning the issue page as a result, with a green indexed tick">
      <SceneCard left="14%" top="14%" width="72%" rise={0.2} className="flex items-center gap-2 px-3 py-2" style={{ borderRadius: 999 }}>
        <span aria-hidden="true" className="inline-flex text-blue-500">
          <Icon name="search" size={13} />
        </span>
        <span className="text-[10.5px] text-gray-700">mars express canyon orbiter</span>
      </SceneCard>
      <SceneCard left="14%" top="38%" width="72%" rise={1} className="flex flex-col gap-1.5 p-3">
        <span className="text-[9px] text-gray-500">rocketstem › issue-14 › mars-express</span>
        <span className="text-xs font-bold text-[#1a0dab]">Mars Express: a decade above the Red Planet</span>
        <SceneLine width="92%" height={5} />
        <SceneLine width="74%" height={5} />
      </SceneCard>
      <ScenePill tone="green" right="12%" top="32%" delay={2.2}>
        ✓ Indexed
      </ScenePill>
    </SceneStage>
  );
}

/** Hero demo on the dark panel (`fd.t5`, L1989–1995): an article-mode page beside the search result it earns. */
export function SeoHeroDemo() {
  return (
    <div
      role="img"
      aria-label="A magazine page converted to article text with alt text, beside a search result for it ranked number one"
      className="relative h-[340px] overflow-hidden rounded-lg bg-[linear-gradient(135deg,var(--color-ink-950),var(--color-navy-800))]"
    >
      <div
        className="absolute inset-0 grid grid-cols-2 items-center gap-5 px-9 py-7 max-sm:grid-cols-1 max-sm:content-center max-sm:gap-3 max-sm:px-5"
        style={{ animation: "fasFade .3s ease-out both" }}
      >
        <div className="flex flex-col gap-1.5 rounded-lg bg-white p-4 max-sm:p-3" style={{ animation: "fasCard 1s ease-out .2s both" }}>
          <span className="font-mono text-[9px] font-semibold tracking-[0.1em] text-blue-500">ARTICLE MODE · PAGE 8</span>
          <span className="text-[15px] leading-[1.25] font-bold text-navy-800 max-sm:text-sm">Mars Express: a decade above the Red Planet</span>
          <SceneLine width="95%" />
          <SceneLine width="88%" />
          <SceneLine width="70%" className="max-sm:hidden" />
          <span className="mt-1 text-[10px] text-gray-500">
            <b className="text-blue-500">alt</b> Orbital view of the Martian surface
          </span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-lg bg-white p-4 max-sm:p-3" style={{ animation: "fasCard 1s ease-out 1s both" }}>
          <span className="flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1.5 text-[11px] text-gray-700">
            <span aria-hidden="true" className="inline-flex flex-none">
              <Icon name="search" size={12} />
            </span>
            mars express canyon orbiter
          </span>
          <span className="mt-1 text-[10.5px] text-gray-700">rocketstem › issue-14 › mars-express</span>
          <span className="text-sm leading-[1.3] text-[#1a0dab]">Mars Express: a decade above the Red Planet</span>
          <span className="text-[11px] leading-[1.45] text-gray-600">ESA&apos;s orbiter has spent more than ten years circling Mars…</span>
          <span
            className="mt-1 self-start rounded-full bg-green-100 px-2 py-[3px] text-[10px] font-bold text-green-800"
            style={{ animation: "fasCheckPop 2.4s ease-out both" }}
          >
            #1 result
          </span>
        </div>
      </div>
    </div>
  );
}
