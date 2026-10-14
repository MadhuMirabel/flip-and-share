import { COVERS, issuePage } from "@/lib/covers";

/** One keyframe of the reader journey. Frames are cumulative: each one patches the state of the frames before it. */
export type Frame = {
  t: number;
  step?: number;
  hand?: [number, number];
  cover?: number | null;
  hover?: number;
  spread?: number;
  flip?: boolean;
  down?: boolean;
  phone?: boolean;
  scanned?: boolean;
  fName?: number;
  fEmail?: number;
  fSubmit?: boolean;
  fDone?: boolean;
  tag?: boolean;
  card?: boolean;
  pay?: boolean;
  paid?: boolean;
  cart?: number;
  dash?: number;
  caption?: string;
  end?: boolean;
};

/** Prototype `RD_TL` (36.8 s), copied verbatim. The last frame is the loop marker. */
export const FRAMES: Frame[] = [
  { t: 0, step: 0, hand: [72, 84], cover: null, spread: 0, flip: false, phone: false, scanned: false, fName: 0, fEmail: 0, fSubmit: false, fDone: false, tag: false, card: false, pay: false, paid: false, cart: 0, dash: 0, caption: "Reader opens your digital edition" },
  { t: 900, hand: [30, 74] }, { t: 1800, down: true, hover: 6 }, { t: 2000, down: false, cover: 6 },
  { t: 2900, step: 1, hand: [80, 56], caption: "Turning the pages of the September 23 issue" }, { t: 3500, hand: [34, 56], down: true, flip: true, spread: 1 }, { t: 4350, down: false, flip: false, hand: [92, 92] },
  { t: 5000, step: 2, phone: true, caption: "Phone camera reads the QR on the Comfort Zone ad, page 3" }, { t: 6400, scanned: true, caption: "QR scan counted · source: Courier News digital edition, page 3" },
  { t: 7300, fName: 1 }, { t: 8100, fName: 2, fEmail: 1 }, { t: 9000, fEmail: 2 }, { t: 9600, fSubmit: true }, { t: 9800, fSubmit: false, fDone: true, caption: "Lead captured · tune-up request sent to the advertiser · synced to CRM" },
  { t: 12000, phone: false, scanned: false, fDone: false, fName: 0, fEmail: 0, step: 1, hand: [80, 56], caption: "A few pages later" }, { t: 12600, hand: [34, 56], down: true, flip: true, spread: 2 }, { t: 13450, down: false, flip: false },
  { t: 13900, hand: [80, 56] }, { t: 14500, hand: [34, 56], down: true, flip: true, spread: 3 }, { t: 15350, down: false, flip: false },
  { t: 15800, step: 3, tag: true, hand: [72, 82], caption: "Shoppable tag on the Henning's ad, page 8" }, { t: 16400, hand: [69, 29] }, { t: 17300, down: true }, { t: 17500, down: false, card: true },
  { t: 18300, hand: [80, 78] }, { t: 19000, down: true }, { t: 19200, down: false, pay: true, caption: "Pickup order placed without leaving the issue" },
  { t: 20100, hand: [50, 86] }, { t: 20900, down: true }, { t: 21100, down: false, paid: true, cart: 1, caption: "Order placed · $7.98 attributed to Henning's and page 8" },
  { t: 23000, step: 4, dash: 1, hand: [14, 21], caption: "Meanwhile, in the publisher dashboard: Publishing" },
  { t: 23800, caption: "Pages published, ads placed and ad revenue, per issue and per month" },
  { t: 25800, hand: [28, 21] }, { t: 26200, down: true }, { t: 26350, down: false, dash: 2, caption: "Audience: readers live right now, the last 24 hours, and what they tap" },
  { t: 29000, hand: [42, 21] }, { t: 29400, down: true }, { t: 29550, down: false, dash: 3, caption: "Revenue: AdSense earnings against the previous period, by ad type" },
  { t: 32200, hand: [57, 21] }, { t: 32600, down: true }, { t: 32750, down: false, dash: 4, caption: "Interactivity: every tap by page and by type. Page 3 (QR) and page 8 (shop) lead" },
  { t: 36800, end: true },
];

/** Index of the loop marker. Frames before it are renderable; the marker only says when to loop. */
export const END = FRAMES.length - 1;

export type State = Frame;

/** State after frame k (prototype `rdState`), precomputed once. */
export const STATES: State[] = (() => {
  const out: State[] = [];
  const acc: State = { t: 0 };
  for (let i = 0; i < END; i++) {
    Object.assign(acc, FRAMES[i]);
    out.push({ ...acc });
  }
  return out;
})();

/** First frame of each of the five steps. */
export const STEP_START = [0, 1, 2, 3, 4].map((s) => FRAMES.findIndex((f) => f.step === s));

/** Frame shown when motion is reduced: the dashboard on its first tab, with its caption. */
export const STATIC_K = FRAMES.findIndex((f) => f.t === 23800);

export const STEPS: [string, string][] = [
  ["Pick an issue", "The reader opens your branded library and taps the latest cover."],
  ["Swipe the pages", "Real page turns, on any device, with every page view counted."],
  ["Scan the QR", "A phone reads the code on the ad. The scan, the landing page and the lead are attributed to the page."],
  ["Shop the ad", "A shoppable tag on a grocery deal opens the product. The pickup order is placed without leaving the issue."],
  ["See the numbers", "Publishing, Audience, Revenue and Interactivity tabs: every read, scan, lead, tap and order, per page and per advertiser."],
];

/** Prototype `props.qrPage` / `props.shopPage` defaults. */
export const QR_PAGE = 3;
export const SHOP_PAGE = 8;

/** Left / right page pairs for spreads 0..3 (prototype `spreadImgs`). */
export const SPREADS: [string, string][] = [
  [issuePage(1), issuePage(2)],
  [issuePage(QR_PAGE), issuePage(QR_PAGE + 1)],
  [issuePage(QR_PAGE + 2), issuePage(QR_PAGE + 3)],
  [issuePage(SHOP_PAGE - 1), issuePage(SHOP_PAGE)],
];

/** Page number shown in the URL hash for each spread. */
export const SPREAD_HASH = [1, QR_PAGE, QR_PAGE + 2, SHOP_PAGE - 1];

/** Library covers (prototype `rdCovers`): ten tiles, the seventh is the issue the demo opens. */
export const LIBRARY: { cover: string; label: string }[] = [
  "August", "September", "October", "Back to school", "Summer camps", "July", "Sept 23 · new", "May", "Spring guide", "April",
].map((label, i) => ({ cover: i === 6 ? COVERS[5] : COVERS[(i + 2) % COVERS.length], label }));

/** Everything the loop shows, for preloading so page flips never flash. */
export const PRELOAD_URLS = [...new Set([...LIBRARY.map((c) => c.cover), ...SPREADS.flat()])];

/** 49 QR cells, true = dark (prototype `rdQr`). */
export const QR_CELLS: boolean[] = Array.from({ length: 49 }, (_, i) => {
  const x = i % 7;
  const y = Math.floor(i / 7);
  const corner = (x < 3 && y < 3) || (x > 3 && y < 3) || (x < 3 && y > 3);
  return corner
    ? !((x === 1 && y === 1) || (x === 5 && y === 1) || (x === 1 && y === 5)) &&
        (x % 6 === 0 || y % 6 === 0 || x === 2 || y === 2 || x === 4 || y === 4)
    : (x * 7 + y * 3) % 5 < 2;
});

export function urlFor(r: State): string {
  if (r.dash) return "app.flipandshare.com/analytics/courier-news/sept-23";
  if (r.cover == null) return "mirabelsmagazinecentral.com/Publication/";
  return `mirabelsmagazinecentral.com/DigitalEdition/?id=d87be7fa…#p${SPREAD_HASH[r.spread ?? 0]}`;
}
