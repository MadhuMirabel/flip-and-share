"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { COVERS } from "@/lib/covers";

const COVER_A = COVERS[0]; // prototype heroSet[0] (first hero set; the prototype rotates it randomly per visit)
const COVER_B = COVERS[2]; // heroSet[1]
const WOOD = "url(/assets/desk-wood.png) center/cover no-repeat, #a9743f";
const AUTOPLAY = [58, 22, 44, 30];
const clamp = (n: number) => Math.max(4, Math.min(96, n));

const cover = (url: string): CSSProperties => ({
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

function Pulse({ style, color, delay = "0s", ring = 5 }: { style: CSSProperties; color: string; delay?: string; ring?: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute rounded-full border-2 border-white"
      style={{
        width: ring === 5 ? 12 : 10,
        height: ring === 5 ? 12 : 10,
        background: color,
        boxShadow: `0 0 0 ${ring}px ${color === "#0ea5e9" ? "rgba(14,165,233,.3)" : "rgba(245,158,11,.3)"}`,
        animation: `fasPulse 2s ease-out ${delay} infinite`,
        ...style,
      }}
    />
  );
}

function Spine() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-2"
      style={{ background: "linear-gradient(90deg,rgba(0,0,0,.3),rgba(0,0,0,0))" }}
    />
  );
}

/** Notepad with the hand-drawn chart, calculator and pencil: shared by both layers. */
function DeskExtras() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-sm"
        style={{
          right: "5%",
          top: "34%",
          width: "14%",
          aspectRatio: "1/1.25",
          background: "#0c4a6e",
          boxShadow: "10px 14px 26px -10px rgba(0,0,0,.55)",
          transform: "rotate(3deg)",
        }}
      >
        <div
          className="absolute overflow-hidden rounded-sm"
          style={{ left: "5%", right: "3%", top: "4%", bottom: "3%", background: "#fdfdfb", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)" }}
        >
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(180deg,transparent 0 21px,rgba(59,130,246,.16) 21px 22px)",
              backgroundPosition: "0 26px",
            }}
          />
          <span className="absolute inset-y-0 w-px" style={{ left: "13%", background: "rgba(239,68,68,.35)" }} />
          <svg
            viewBox="0 0 100 130"
            className="absolute inset-0 size-full font-hand"
            fill="none"
            stroke="#1f2937"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <text x="18" y="24" fontSize="6.5" fontWeight="700" fill="#1f2937" stroke="none">Q4 digital revenue</text>
            <path d="M18 110 L18 36" strokeDasharray="1.5 2" opacity=".7" />
            <path d="M18 110 L90 110" opacity=".7" />
            <path d="M20 104 C 34 102, 38 88, 48 86 S 66 72, 72 58 S 82 44, 88 38" stroke="#0369a1" strokeWidth="2.2" />
            <path d="M84 38 L89 37 L88 42" stroke="#0369a1" strokeWidth="2.2" />
            <path d="M22 110 L22 96 M34 110 L34 90 M46 110 L46 84 M58 110 L58 74 M70 110 L70 60" stroke="#0369a1" strokeWidth="5" opacity=".18" />
            <circle cx="48" cy="86" r="1.6" fill="#0369a1" stroke="none" />
            <circle cx="72" cy="58" r="1.6" fill="#0369a1" stroke="none" />
            <text x="66" y="32" fontSize="6" fill="#0369a1" stroke="none">+42% ↑</text>
            <path d="M20 106 C 32 103, 42 100, 54 97 S 74 93, 86 90" stroke="#d97706" strokeWidth="2.2" />
            <path d="M82 89 L87 90 L84 94" stroke="#d97706" strokeWidth="2.2" />
            <circle cx="54" cy="97" r="1.6" fill="#d97706" stroke="none" />
            <text x="72" y="98" fontSize="4.8" fontWeight="700" fill="#b45309" stroke="none">Print PDF</text>
            <text x="40" y="70" fontSize="4.6" fontWeight="700" fill="#0369a1" stroke="none" transform="rotate(-28 40 70)">Flip&amp;Share</text>
            <text x="20" y="121" fontSize="5" fill="#6b7280" stroke="none">Sep  Oct  Nov  Dec</text>
          </svg>
        </div>
        <span
          className="absolute"
          style={{
            left: "-4%",
            top: "6%",
            bottom: "6%",
            width: "9%",
            backgroundImage: "radial-gradient(circle at 50% 50%,#d1d5db 0 34%,#6b7280 36% 46%,transparent 50%)",
            backgroundSize: "100% 11%",
            backgroundRepeat: "repeat-y",
            filter: "drop-shadow(1px 1px 1px rgba(0,0,0,.4))",
          }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative desk prop positioned in % of the scene */}
      <img
        src="/assets/desk-calc.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ right: "21%", top: "36%", width: "7.5%", transform: "rotate(-3deg)", filter: "drop-shadow(8px 12px 14px rgba(0,0,0,.45))" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-sm"
        style={{
          right: "20.5%",
          top: "66%",
          width: "9%",
          height: 4,
          background: "linear-gradient(90deg,#fde68a 0 6%,#111827 6% 10%,#fbbf24 10% 92%,#ec4899 92%)",
          transform: "rotate(-14deg)",
          boxShadow: "4px 6px 10px -3px rgba(0,0,0,.5)",
        }}
      />
    </>
  );
}

function BeforeScene() {
  return (
    <div className="absolute inset-0" style={{ background: WOOD }}>
      <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.12))" }} />
      <div
        aria-hidden="true"
        className="absolute rounded-sm"
        style={{
          left: "9%",
          top: "34%",
          width: "17%",
          aspectRatio: "3/4",
          ...cover(COVER_B),
          boxShadow: "10px 14px 26px -10px rgba(0,0,0,.6),0 0 0 1px rgba(0,0,0,.15)",
          transform: "rotate(-7deg)",
        }}
      >
        <Spine />
      </div>
      <div
        aria-hidden="true"
        className="absolute rounded-sm"
        style={{
          left: "34.5%",
          top: "24%",
          width: "18%",
          aspectRatio: "3/4",
          ...cover(COVER_A),
          boxShadow: "12px 16px 30px -10px rgba(0,0,0,.6),0 0 0 1px rgba(0,0,0,.15)",
          transform: "rotate(5deg)",
        }}
      >
        <Spine />
      </div>
      <span
        aria-hidden="true"
        className="absolute rounded-sm text-[11px] leading-[1.3] font-semibold"
        style={{
          left: "55%",
          top: "52%",
          padding: "8px 10px",
          background: "#fde68a",
          color: "#78350f",
          boxShadow: "0 8px 16px -8px rgba(0,0,0,.6)",
          transform: "rotate(3deg)",
          maxWidth: 120,
        }}
      >
        Mail PDF to advertisers?
        <br />
        Who read Sept issue??
      </span>
      <DeskExtras />
      <span
        className="absolute left-4 top-3.5 flex items-center gap-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] text-gray-700 backdrop-blur-[6px]"
        style={{ padding: "6px 10px", background: "rgba(255,255,255,.85)" }}
      >
        BEFORE · PRINT + PDF
      </span>
    </div>
  );
}

function AfterScene({ pct, reads, transition }: { pct: number; reads: string; transition: string }) {
  return (
    <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pct}%)`, background: WOOD, transition }}>
      <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.12))" }} />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          left: "20%",
          top: "10%",
          width: "55%",
          height: "100%",
          background: "radial-gradient(ellipse at 50% 55%,rgba(125,211,252,.22),transparent 60%)",
        }}
      />
      {/* Tablet (physical bezel keeps its 12px radius) */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: "33%",
          top: "22%",
          width: "21%",
          aspectRatio: "3/4",
          borderRadius: 12,
          background: "#111827",
          padding: "2.2%",
          boxShadow: "14px 20px 36px -12px rgba(0,0,0,.7)",
          transform: "rotate(2deg)",
        }}
      >
        <div className="relative size-full overflow-hidden rounded-sm" style={cover(COVER_A)}>
          <Pulse color="#0ea5e9" style={{ left: "22%", top: "38%" }} />
          <Pulse color="#f59e0b" delay=".7s" style={{ right: "18%", top: "58%" }} />
          <span
            className="absolute flex justify-between rounded-sm text-[10px] font-semibold text-white"
            style={{ left: "6%", right: "6%", bottom: 6, padding: "5px 7px", background: "rgba(17,24,39,.85)" }}
          >
            <span>Reads today</span>
            <span style={{ color: "#7dd3fc" }}>{reads}</span>
          </span>
        </div>
      </div>
      {/* Phone */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: "11.5%",
          top: "31%",
          width: "11.5%",
          aspectRatio: "9/19",
          borderRadius: 14,
          background: "#111827",
          padding: 4,
          boxShadow: "10px 14px 28px -10px rgba(0,0,0,.7)",
          transform: "rotate(-7deg)",
        }}
      >
        <div className="relative size-full overflow-hidden" style={{ borderRadius: 11, ...cover(COVER_B) }}>
          <span className="absolute inset-x-0 top-0" style={{ height: "9%", background: "rgba(17,24,39,.75)" }} />
          <Pulse color="#0ea5e9" delay=".4s" ring={4} style={{ left: "30%", top: "42%" }} />
          <span
            className="absolute flex justify-between rounded-sm text-[9px] font-semibold text-white"
            style={{ left: "8%", right: "8%", bottom: 6, padding: "4px 6px", background: "rgba(17,24,39,.85)" }}
          >
            <span>Reads</span>
            <span style={{ color: "#7dd3fc" }}>312</span>
          </span>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute flex items-center gap-[5px] rounded-sm text-[11px] font-bold text-white"
        style={{
          left: "56%",
          top: "58%",
          padding: "6px 9px",
          background: "#16a34a",
          boxShadow: "0 8px 16px -8px rgba(0,0,0,.6)",
          transform: "rotate(-2deg)",
        }}
      >
        <span className="size-1.5 rounded-full bg-white" style={{ animation: "fasBlink 1.4s infinite" }} />
        LIVE · one link
      </span>
      <DeskExtras />
      <span
        className="absolute right-4 top-3.5 flex items-center gap-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] text-white backdrop-blur-[6px]"
        style={{ padding: "6px 10px", background: "rgba(12,74,110,.9)" }}
      >
        AFTER · FLIPANDSHARE
      </span>
    </div>
  );
}

/** Home "From print to a live digital edition" drag-to-compare desk scene. */
export function BeforeAfterSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [pct, setPct] = useState(58);
  const [drag, setDrag] = useState(false);

  // Autoplay until the visitor touches it; skipped under reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    const id = setInterval(() => {
      if (touched.current) {
        clearInterval(id);
        return;
      }
      step = (step + 1) % AUTOPLAY.length;
      setPct(AUTOPLAY[step]);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const at = (e: PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPct(clamp(((e.clientX - r.left) / r.width) * 100));
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? pct - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? pct + step
          : e.key === "Home"
            ? 4
            : e.key === "End"
              ? 96
              : null;
    if (next === null) return;
    e.preventDefault();
    touched.current = true;
    setPct(clamp(next));
  };

  const reads = (1240 + Math.round(((100 - pct) / 100) * 860)).toLocaleString("en-US");
  const transition = drag ? "none" : "clip-path .5s ease, left .5s ease";

  return (
    <section className="bg-white pt-20">
      <Container>
        <div className="flex flex-col gap-7">
          <Reveal className="flex max-w-[680px] flex-col gap-3">
            <Eyebrow>BEFORE &amp; AFTER</Eyebrow>
            <h2 className="m-0 text-[clamp(28px,3.4vw,38px)] leading-[1.1] font-bold tracking-[-0.025em] text-navy-800">
              From print to a live digital edition.
            </h2>
            <p className="m-0 text-body-lg text-gray-600">
              Your issue already exists as a PDF. FlipAndShare turns it into a tablet-ready edition with tappable pages, video and a read report. Drag the handle to compare.
            </p>
          </Reveal>
          <div
            ref={ref}
            role="slider"
            tabIndex={0}
            aria-label="Compare print with the live digital edition"
            aria-orientation="horizontal"
            aria-valuemin={4}
            aria-valuemax={96}
            aria-valuenow={Math.round(pct)}
            aria-valuetext={`${Math.round(100 - pct)}% digital edition shown`}
            data-ba=""
            onPointerDown={(e) => {
              touched.current = true;
              e.currentTarget.setPointerCapture?.(e.pointerId);
              setDrag(true);
              at(e);
            }}
            onPointerMove={(e) => {
              if (drag) at(e);
            }}
            onPointerUp={() => setDrag(false)}
            onPointerCancel={() => setDrag(false)}
            onKeyDown={onKey}
            className="relative h-[clamp(300px,42vw,480px)] cursor-col-resize touch-pan-y overflow-hidden rounded-lg border border-gray-200 outline-offset-2 select-none focus-visible:outline-2 focus-visible:outline-blue-500"
            style={{ boxShadow: "0 30px 60px -40px rgba(12,74,110,.5)" }}
          >
            <BeforeScene />
            <AfterScene pct={pct} reads={reads} transition={transition} />
            <div aria-hidden="true" className="absolute inset-y-0 w-0" style={{ left: `${pct}%`, transition }}>
              <span className="absolute inset-y-0 -left-px w-0.5 bg-white" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.08)" }} />
              <span
                className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[3px] rounded-full bg-white text-navy-800"
                style={{ boxShadow: "0 8px 20px -6px rgba(0,0,0,.4)" }}
              >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 1L1 6l5 5" />
                </svg>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 1l5 5-5 5" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
