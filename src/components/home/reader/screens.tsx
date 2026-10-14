import type { CSSProperties } from "react";
import { IPhoneFrame } from "@/components/mockups/DeviceFrames";
import { LiveDot } from "@/components/ui/LiveDot";
import { LIBRARY, QR_CELLS, QR_PAGE, SHOP_PAGE, SPREADS, type State } from "./timeline";
import { issuePage } from "@/lib/covers";

const bgImage = (url: string, extra: CSSProperties = {}): CSSProperties => ({
  backgroundColor: "#fff",
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "top",
  ...extra,
});

const FADE: CSSProperties = { animation: "fasFade .4s ease-out both" };

function Lock() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** 7×7 QR cell grid; sized by its parent. */
function QrCells() {
  return QR_CELLS.map((on, i) => <span key={i} style={{ background: on ? "#111827" : "#fff" }} />);
}

/** Browser bar plus the publisher site header (layers 1 and 2). */
export function SiteChrome({ url, cart }: { url: string; cart: number }) {
  return (
    <>
      <div className="flex h-[26px] items-center gap-2 bg-slate-900 px-2.5 text-[10.5px] text-slate-300">
        <span className="flex gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-slate-700" />
          <span className="h-[7px] w-[7px] rounded-full bg-slate-700" />
        </span>
        <span className="flex h-[18px] flex-1 items-center gap-[5px] overflow-hidden rounded-sm bg-slate-800 px-2 font-mono text-ellipsis whitespace-nowrap">
          <span className="flex text-green-600">
            <Lock />
          </span>
          {url}
        </span>
      </div>
      <div className="flex h-[34px] items-center justify-between border-b border-slate-800 bg-navy-900 px-3.5 text-xs">
        <span className="flex items-center gap-2 font-bold text-blue-100">
          <span className="h-4 w-4 rounded-sm" style={{ background: "linear-gradient(135deg,#0ea5e9,#7dd3fc)" }} />
          Courier News · Digital Editions
        </span>
        <span className="flex gap-2.5 text-slate-400">
          <span>Issues</span>
          <span>Subscribe</span>
          <span className="relative font-bold text-blue-100">
            Cart
            {cart > 0 && (
              <span
                className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] text-white"
                style={{ animation: "fasPop .4s cubic-bezier(.2,.8,.2,1) both" }}
              >
                {cart}
              </span>
            )}
          </span>
        </span>
      </div>
    </>
  );
}

export function LibraryScreen({ hover, active }: { hover: number | undefined; active: boolean }) {
  return (
    <div className="absolute inset-x-0 top-[60px] bottom-0 flex flex-col gap-2 bg-slate-900 px-4 py-2.5" style={FADE}>
      <span className="text-xs font-bold text-blue-100">Latest issues</span>
      <div className="grid grid-cols-5 gap-x-3 gap-y-2">
        {LIBRARY.map((c, i) => {
          const on = active && hover === i;
          return (
            <div key={c.label} className="flex flex-col gap-[5px] transition-transform duration-300 ease-fas" style={{ transform: `scale(${on ? 1.06 : 1})` }}>
              <div
                className="aspect-[3/4] rounded-sm bg-gray-200 outline-2 outline-offset-2 transition-[outline-color] duration-300"
                style={{
                  backgroundImage: `url(${c.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 10px 18px -10px rgba(0,0,0,.5)",
                  outlineStyle: "solid",
                  outlineColor: on ? "var(--color-blue-500)" : "transparent",
                }}
              />
              <span className="truncate text-[9px] text-slate-400">{c.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const QR = { x: 6, y: 30, w: 11 };

function CheckoutSheet({ paid }: { paid: boolean }) {
  return (
    <div className="absolute inset-0 z-[4] flex items-end justify-center bg-slate-900/55" style={{ animation: "fasFade .3s ease-out both" }}>
      <div
        className="flex w-[min(300px,86%)] flex-col gap-2.5 rounded-t-lg bg-white px-4 pt-3.5 pb-4 text-gray-900"
        style={{ animation: "fasSlideIn .45s cubic-bezier(.2,.8,.2,1) both" }}
      >
        <div className="flex justify-center">
          <span className="h-1 w-9 rounded-full bg-gray-200" />
        </div>
        {!paid ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-label font-bold">Pickup order</span>
              <span className="text-eyebrow text-gray-500">Henning&apos;s · Portersville</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <span>Baby Back Ribs · 2 lb</span>
              <span>$7.98</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <span>Pickup</span>
              <span>Today, 5:30 PM · Free</span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-gray-200 px-2.5 py-2 text-xs">
              <span className="h-[17px] w-[26px] rounded-sm" style={{ background: "linear-gradient(135deg,#1e3a8a,#3b82f6)" }} />
              <span className="font-semibold">•••• 4242</span>
              <span className="ml-auto text-gray-500">Saved</span>
            </div>
            <span className="flex h-9 items-center justify-center rounded-md bg-gray-900 text-label font-bold text-white">Pay $7.98</span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 pt-1.5 pb-1" style={{ animation: "fasFade .35s ease-out both" }}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-[22px] text-white" style={{ animation: "fasPop .5s cubic-bezier(.2,.8,.2,1) both" }}>
              ✓
            </span>
            <span className="text-sm font-bold">Order placed</span>
            <span className="text-caption text-gray-500">#1042 · Henning&apos;s · $7.98 · pickup today 5:30 PM</span>
            <span className="text-eyebrow font-semibold text-blue-600">Sale attributed to page 8 · Courier News, Sept 23</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ShoppableCard() {
  return (
    <div
      className="absolute right-3 bottom-[46px] flex w-[190px] flex-col gap-2 rounded-lg bg-white p-2.5 shadow-[0_20px_40px_-16px_rgba(0,0,0,.6)]"
      style={{ animation: "fasSlideIn .4s cubic-bezier(.2,.8,.2,1) both" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-[38px] w-[38px] flex-none rounded-sm border border-gray-200"
          style={{ backgroundColor: "#fff", backgroundImage: `url(${issuePage(SHOP_PAGE)})`, backgroundRepeat: "no-repeat", backgroundSize: "520% auto", backgroundPosition: "46% 14%" }}
        />
        <span className="flex flex-col gap-px">
          <span className="text-xs font-bold text-gray-900">Baby Back Ribs</span>
          <span className="text-eyebrow text-gray-500">Henning&apos;s · $3.99 lb · sale ends Oct 1</span>
        </span>
      </div>
      <div className="flex items-center justify-between text-eyebrow text-gray-700">
        <span>Qty</span>
        <span className="flex items-center gap-1.5">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-sm border border-gray-300">−</span>
          <b>2 lb</b>
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-sm border border-gray-300">+</span>
        </span>
      </div>
      <span className="flex h-[30px] items-center justify-center rounded-sm bg-orange-600 text-xs font-bold text-white">Add to pickup order · $7.98</span>
    </div>
  );
}

export function ReaderScreen({ r }: { r: State }) {
  const spread = r.spread ?? 0;
  const [pageL, pageR] = SPREADS[spread];
  const prevR = SPREADS[Math.max(0, spread - 1)][1];
  const onQr = spread === 1;
  const scanning = !!r.phone && !r.scanned;
  const showTag = spread === 3 && !!r.tag && !r.card;
  return (
    <div className="absolute inset-x-0 top-[60px] bottom-0 flex items-center justify-center overflow-hidden bg-slate-900" style={FADE}>
      <div
        className="relative flex aspect-[3/2] w-[78%] shadow-[0_30px_50px_-20px_rgba(0,0,0,.8)]"
        style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
      >
        <div className="relative flex-1 rounded-l-[2px]" style={bgImage(pageL)}>
          <span className="absolute inset-0" style={{ background: "linear-gradient(90deg,transparent 88%,rgba(0,0,0,.14))" }} />
          {onQr && (
            <>
              <span
                className="absolute grid aspect-square grid-cols-7 gap-px rounded-sm bg-white p-[1.2%]"
                style={{
                  left: `${QR.x}%`,
                  top: `${QR.y}%`,
                  width: `${QR.w}%`,
                  boxShadow: scanning ? "0 0 0 2px #22c55e,0 0 0 8px rgba(34,197,94,.25)" : "0 1px 3px rgba(0,0,0,.25)",
                  transition: "box-shadow .3s",
                  animation: scanning ? "fasPulse 1.2s ease-in-out infinite" : "none",
                }}
              >
                <QrCells />
              </span>
              <span
                className="absolute text-center text-[5px] leading-[1.2] font-bold text-gray-900"
                style={{ left: `${QR.x}%`, top: `${QR.y + QR.w + 1}%`, width: `${QR.w}%` }}
              >
                SCAN TO BOOK
              </span>
            </>
          )}
        </div>
        <div className="relative flex-1 rounded-r-[2px] border-l border-black/10" style={bgImage(pageR)}>
          <span className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(0,0,0,.14),transparent 12%)" }} />
          {showTag && (
            <span
              className="absolute h-[18px] w-[18px] rounded-full border-[3px] border-orange-600 bg-white"
              style={{ left: "49%", top: "20%", boxShadow: "0 0 0 6px rgba(234,88,12,.25)", animation: "fasPulse 1.6s ease-in-out infinite", transform: "translate(-50%,-50%)" }}
            />
          )}
        </div>
        {r.flip && (
          <div
            className="absolute top-0 left-1/2 z-[3] h-full w-1/2"
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d", animation: "fasFlip .8s cubic-bezier(.45,.05,.35,1) both" }}
          >
            <div className="absolute inset-0 rounded-r-[2px]" style={bgImage(prevR, { backfaceVisibility: "hidden", boxShadow: "-6px 0 18px -8px rgba(0,0,0,.5)" })}>
              <span className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(0,0,0,.35),transparent 40%)", animation: "fasFlipShade .8s ease-in-out both" }} />
            </div>
            <div className="absolute inset-0 rounded-l-[2px]" style={bgImage(pageL, { transform: "rotateY(180deg)", backfaceVisibility: "hidden" })}>
              <span className="absolute inset-0" style={{ background: "linear-gradient(270deg,rgba(0,0,0,.3),transparent 40%)", animation: "fasFlipShade .8s ease-in-out both" }} />
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full transition-colors duration-300" style={{ background: spread === i ? "#7dd3fc" : "rgba(255,255,255,.25)" }} />
        ))}
      </div>
      {r.card && !r.pay && <ShoppableCard />}
      {r.pay && <CheckoutSheet paid={!!r.paid} />}
    </div>
  );
}

const FIELD = "flex h-[17px] items-center rounded-sm border border-solid px-[5px] text-[8px] transition-[border-color] duration-200";

function Caret() {
  return <span className="ml-px h-2.5 w-px bg-blue-500" style={{ animation: "fasBlink 1s step-end infinite" }} />;
}

function LandingPage({ r }: { r: State }) {
  const name = r.fName === 2 ? "Dana Whitfield" : r.fName === 1 ? "Dan" : "";
  const phone = r.fEmail === 2 ? "(555) 014-2201" : r.fEmail === 1 ? "(555) 01" : "";
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white text-gray-900" style={{ animation: "fasSlideIn .35s ease-out both" }}>
      <div className="flex items-center gap-1 border-b border-gray-100 px-2 pt-[5px] pb-1 text-[6.5px] text-gray-500">
        <span className="flex text-green-600">
          <Lock />
        </span>
        <span className="flex-1 truncate">comfortzonehvac.com/fall?src=couriernews-p3</span>
      </div>
      <div className="flex h-[22%] flex-col justify-center gap-0.5 px-[9px] py-[7px] text-white" style={{ background: "linear-gradient(135deg,#0c4a6e,#0ea5e9)" }}>
        <span className="text-[6.5px] font-bold tracking-[.08em] opacity-85">COMFORT ZONE HEATING &amp; COOLING</span>
        <span className="text-[9.5px] leading-[1.2] font-extrabold">Get your home ready for fall</span>
        <span className="text-[7px] opacity-90">$89 furnace tune-up · free filter · this month only</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-[9px] py-[7px]">
        {!r.fDone ? (
          <>
            <span className="text-[7.5px] leading-[1.35] text-gray-700">Book your tune-up. We call you back within the hour.</span>
            <span className={FIELD} style={{ borderColor: r.fName === 1 ? "#0ea5e9" : "#d1d5db" }}>
              {name}
              {r.fName === 1 && <Caret />}
              {!r.fName && <span className="text-gray-400">Name</span>}
            </span>
            <span className={FIELD} style={{ borderColor: r.fEmail === 1 ? "#0ea5e9" : "#d1d5db" }}>
              {phone}
              {r.fEmail === 1 && <Caret />}
              {!r.fEmail && <span className="text-gray-400">Mobile number</span>}
            </span>
            <span
              className="mt-0.5 flex h-5 items-center justify-center rounded-sm text-[8.5px] font-bold text-white transition-all duration-150"
              style={{ background: r.fSubmit ? "#0369a1" : "#0ea5e9", transform: `scale(${r.fSubmit ? 0.95 : 1})` }}
            >
              Claim my $89 tune-up
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 py-1 text-center" style={{ animation: "fasFade .35s ease-out both" }}>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-green-600 text-xs text-white" style={{ animation: "fasPop .5s cubic-bezier(.2,.8,.2,1) both" }}>
              ✓
            </span>
            <span className="text-[8.5px] font-bold">You&apos;re booked in</span>
            <span className="rounded-sm border-[1.5px] border-dashed border-blue-500 bg-blue-50 px-[9px] py-1 font-mono text-xs font-extrabold tracking-[.12em] text-navy-800">FALL89</span>
            <span className="text-[7px] leading-[1.35] text-gray-500">
              Show this code to the technician.
              <br />
              We&apos;ll text (555) 014-2201 to schedule.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CameraView({ scanY }: { scanY: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#111]"
      style={{ backgroundImage: `url(${issuePage(QR_PAGE)})`, backgroundRepeat: "no-repeat", backgroundSize: "300% auto", backgroundPosition: "10% 30%", filter: "saturate(.8) blur(.6px)" }}
    >
      <span className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.6))" }} />
      <span
        className="absolute inset-x-[26%] top-[33%] grid aspect-square grid-cols-7 gap-px rounded-sm bg-white p-[6%] shadow-[0_8px_20px_rgba(0,0,0,.5)]"
        style={{ transform: "rotate(-3deg)" }}
      >
        <QrCells />
      </span>
      <span className="absolute inset-x-[22%] top-[30%] aspect-square rounded-md border-2 border-[#facc15]" style={{ animation: "fasPop .4s cubic-bezier(.2,.8,.2,1) both" }}>
        <span className="absolute -top-0.5 -left-0.5 h-[22%] w-[22%] rounded-tl-sm border-t-[3px] border-l-[3px] border-white" />
        <span className="absolute -top-0.5 -right-0.5 h-[22%] w-[22%] rounded-tr-sm border-t-[3px] border-r-[3px] border-white" />
        <span className="absolute -bottom-0.5 -left-0.5 h-[22%] w-[22%] rounded-bl-sm border-b-[3px] border-l-[3px] border-white" />
        <span className="absolute -right-0.5 -bottom-0.5 h-[22%] w-[22%] rounded-br-sm border-r-[3px] border-b-[3px] border-white" />
      </span>
      <span className="absolute inset-x-[22%] h-0.5 bg-[#facc15] shadow-[0_0_10px_#facc15]" style={{ top: scanY, transition: "top .9s linear" }} />
      <span
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 rounded-full bg-[rgba(250,204,21,.95)] px-[7px] py-[3px] text-[7px] font-bold whitespace-nowrap text-gray-900"
        style={{ animation: "fasFade .4s ease-out .6s both" }}
      >
        Open “comfortzonehvac.com/fall”
      </span>
      <span className="absolute bottom-[6%] left-1/2 aspect-square w-[16%] -translate-x-1/2 rounded-full border-2 border-white bg-white/25" />
    </div>
  );
}

/** iPhone in the tablet's lower left: camera scanning the page QR, then the advertiser's landing form. */
export function PhoneScreen({ r, scanY }: { r: State; scanY: string }) {
  return (
    <IPhoneFrame className="absolute -bottom-[8%] left-[5%] w-[31%]" style={{ animation: "fasSlideIn .5s cubic-bezier(.2,.8,.2,1) both" }}>
      {r.scanned ? <LandingPage r={r} /> : <CameraView scanY={scanY} />}
    </IPhoneFrame>
  );
}

export function CaptionPill({ text }: { text: string }) {
  return (
    <div className="absolute bottom-2.5 left-3 z-[4] flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-[5px] text-[11px] font-semibold text-navy-800 backdrop-blur-[4px]">
      <LiveDot size={7} />
      {text}
    </div>
  );
}
