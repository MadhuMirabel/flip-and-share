"use client";

import { useEffect, useRef } from "react";
import { useHeroCover } from "@/components/home/Hero";
import { SAMPLE_PAGES } from "@/lib/covers";

/** Runs once per page load, even if the component remounts (client navigation). */
let finished = false;

type Stats = { r: number; s: number; l: number };

const BAR_HEIGHTS = [
  ["30%", "bg-white/35"],
  ["50%", "bg-white/55"],
  ["45%", "bg-white/55"],
  ["70%", "bg-blue-300"],
  ["100%", "bg-blue-400"],
  ["80%", "bg-blue-400"],
] as const;

const HOTSPOTS = [
  { label: "Video", anim: "fasHs 3s ease-in-out 0s infinite", cls: "self-start bg-blue-500 px-[7px] py-[3px]" },
  { label: "Link", anim: "fasHs 3.4s ease-in-out .5s infinite", cls: "self-end bg-blue-500 px-[7px] py-[3px]" },
  { label: "Form", anim: "fasHs 3.8s ease-in-out 1s infinite", cls: "self-start bg-blue-500 px-[7px] py-[3px]" },
  { label: "Request a quote", anim: "fasHs 4.2s ease-in-out 1.5s infinite", cls: "mt-auto bg-navy-700 p-1.5 text-center" },
];

const MONO_LABEL = "font-mono text-eyebrow font-semibold tracking-[.1em] text-gray-500";
const ARROW =
  "relative flex w-10 items-center justify-center gap-0 overflow-hidden text-2xl text-blue-400 opacity-[.35] transition-opacity duration-500";

/** YOUR PDF → INTERACTIVE PUBLICATION → ANALYTICS stage. Place inside the hero section (it flies the hero's first floating cover). */
export function CinematicPipeline() {
  const cover = useHeroCover();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stageRef.current;
    const root = st?.closest("section");
    if (!st || !root) return;
    const q = (k: string) => st.querySelector<HTMLElement>(`[data-cine="${k}"]`);
    const bars = () => Array.from(st.querySelectorAll<HTMLElement>('[data-cine="bar"]'));
    const set = (el: HTMLElement | null, o: Partial<CSSStyleDeclaration>) => {
      if (el) Object.assign(el.style, o);
    };
    const seg = (p: number, x: number, y: number) => Math.max(0, Math.min(1, (p - x) / (y - x)));
    const eo = (x: number) => 1 - Math.pow(1 - x, 3);
    const bounce = (x: number) => {
      const c = 1.4;
      return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
    };
    const soft = (x: number) => {
      const c = 0.6;
      return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
    };
    const L = (x: number, y: number, k: number) => x + (y - x) * k;

    const paintStats = (v: Stats, hf: (i: number) => number) => {
      const n0 = q("n0"),
        n1 = q("n1"),
        n2 = q("n2");
      if (n0) n0.textContent = v.r.toLocaleString("en-US");
      if (n1) n1.textContent = `${Math.floor(v.s / 60)}m ${String(v.s % 60).padStart(2, "0")}s`;
      if (n2) n2.textContent = String(v.l);
      bars().forEach((el, i) => {
        el.style.transform = `scaleY(${hf(i)})`;
      });
    };

    let statsBase: Stats = { r: 0, s: 0, l: 0 };
    let liveIv = 0;
    const liveStats = () => {
      if (liveIv) return;
      let barVals = [1, 1, 1, 1, 1, 1];
      let v = { ...statsBase };
      bars().forEach((el) => {
        el.style.transition = "transform 1.4s cubic-bezier(.2,.8,.2,1)";
      });
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);
      liveIv = window.setInterval(() => {
        v = {
          r: v.r + Math.round(rnd(6, 28)),
          s: Math.max(230, Math.min(300, v.s + Math.round(rnd(-4, 6)))),
          l: v.l + (Math.random() < 0.45 ? 1 : 0),
        };
        barVals = barVals.map((b) => Math.max(0.6, Math.min(1.15, b + rnd(-0.14, 0.14))));
        paintStats(v, (i) => barVals[i]);
      }, 1600);
    };

    const arrowOn = (k: string, on: boolean) => {
      const el = q(k);
      if (!el) return;
      el.style.opacity = on ? "1" : ".35";
      const sp = el.firstElementChild as HTMLElement | null;
      if (sp) sp.style.animation = on ? "fasArrowFlow 1.8s ease-in-out infinite" : "none";
    };

    let rebalanced = false;
    let cineP = -1;
    const apply = (p: number, r: DOMRect, live: boolean) => {
      const d = seg(p, 0, 0.3);
      const src = root.querySelector<HTMLElement>('[data-hero-page="0"]');
      const holder = q("holder"),
        fly = q("fly");
      if (d > 0 && !rebalanced) {
        rebalanced = true;
        const m = root.querySelector<HTMLElement>('[data-hero-page="1"]');
        const f = root.querySelector<HTMLElement>('[data-hero-page="2"]');
        if (m) Object.assign(m.style, { top: "34%", width: "100px", height: "134px" });
        if (f) f.style.top = "16%";
      }
      if (src && holder && fly) {
        const a = src.getBoundingClientRect(),
          h = holder.getBoundingClientRect();
        const x0 = a.left - r.left,
          y0 = a.top - r.top,
          x1 = h.left - r.left,
          y1 = h.top - r.top,
          ke = eo(d);
        set(fly, {
          opacity: d > 0 && d < 1 ? "1" : "0",
          transform: `translate3d(${L(x0, x1, ke)}px,${L(y0, y1, soft(d))}px,0) rotate(${(-6 + 10 * Math.sin(Math.PI * d)) * (1 - d)}deg) scale(${L(a.width / 172, 1, ke)})`,
        });
        src.style.opacity = d > 0 ? "0" : "";
      }
      set(q("pdf"), { opacity: d >= 1 ? "1" : "0", transform: `scale(${L(1.04, 1, eo(seg(p, 0.3, 0.38)))})` });
      const sc = seg(p, 0.32, 0.5);
      set(q("scan"), { opacity: sc > 0 && sc < 1 ? "1" : "0", transform: `translateY(${sc * 228}px)` });
      const pr = eo(seg(p, 0.42, 0.56)),
        pl = eo(seg(p, 0.5, 0.62));
      set(q("pageR"), { opacity: String(pr), transform: `translateY(${L(18, 0, pr)}px)` });
      set(q("pageRov"), { opacity: String(pr) });
      set(q("pageL"), { opacity: String(pl), transform: `translateY(${L(18, 0, pl)}px)` });
      for (let i = 0; i < 4; i++) {
        const h = seg(p, 0.58 + i * 0.05, 0.68 + i * 0.05);
        set(q(`hs${i}`), { opacity: p < 0.58 ? "0" : String(Math.min(1, h * 3)), transform: `scale(${L(0.4, 1, bounce(h))})` });
      }
      const ad = seg(p, 0.7, 0.8);
      set(q("ad"), { opacity: String(Math.min(1, ad * 3)), transform: `translateY(${L(24, 0, eo(ad))}px)` });
      const n = eo(seg(p, 0.8, 1));
      statsBase = { r: Math.round(6240 * n), s: Math.round(262 * n), l: Math.round(184 * n) };
      paintStats(statsBase, (i) => L(0.04, 1, eo(seg(p, 0.82 + i * 0.02, 0.9 + i * 0.02))));
      arrowOn("arrow0", p >= 0.3);
      arrowOn("arrow1", p >= 0.8);
      if (p >= 1 && live) liveStats();
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || finished) {
      finished = true;
      apply(1, st.getBoundingClientRect(), !reduced);
      return () => window.clearInterval(liveIv);
    }

    // scroll drives the drop (0 to .3); once landed, time drives the rest
    let raf = 0;
    let scroll0: number | null = null;
    let t0 = 0;
    let cineMax = 0;
    const tick = () => {
      const r = st.getBoundingClientRect();
      if (r.top > window.innerHeight + 40) {
        cineP = -1;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (scroll0 === null) scroll0 = window.scrollY;
      const y0 = Math.max(0, window.scrollY - scroll0);
      const sp = Math.min(0.3, (y0 / 260) * 0.3);
      if (sp >= 0.3 && !t0) t0 = performance.now();
      const ap = t0 ? 0.3 + Math.max(0, Math.min(0.7, ((performance.now() - t0 - 200) / 5200) * 0.7)) : 0;
      const p = Math.max(sp, ap, cineMax);
      cineMax = p;
      if (cineP < 0 || Math.abs(p - cineP) >= 0.0015 || p >= 1) {
        cineP = p;
        apply(p, r, true);
      }
      if (p >= 1) {
        finished = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(liveIv);
    };
  }, []);

  return (
    <div ref={stageRef} className="relative mx-auto mt-14 flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-7">
      <div className="relative flex flex-col items-center gap-3">
        <div
          data-cine="holder"
          className="relative box-border flex h-[230px] w-[172px] items-end justify-center overflow-hidden rounded-sm border border-gray-200 p-2.5"
          style={{ background: "repeating-linear-gradient(135deg,#f3f4f6 0 8px,#fafafa 8px 16px)" }}
        >
          <span className="font-mono text-[10px] text-gray-500">your PDF</span>
          <div
            data-cine="pdf"
            aria-hidden="true"
            className="absolute -inset-px rounded-sm bg-gray-100 bg-cover bg-center opacity-0 saturate-[.6]"
            style={{ backgroundImage: `url(${cover})` }}
          >
            <span className="absolute top-2.5 left-2.5 rounded-sm bg-gray-900 px-[7px] py-[3px] font-mono text-[10px] font-bold text-white">PDF</span>
          </div>
          <div
            data-cine="scan"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-blue-500 opacity-0 shadow-[0_0_16px_3px_rgba(14,165,233,.6)]"
          />
        </div>
        <span className={MONO_LABEL}>YOUR PDF</span>
      </div>

      <div data-cine="arrow0" aria-hidden="true" className={ARROW}>
        <span className="inline-block" style={{ animation: "none", animationDelay: "0s" }}>
          →
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex shadow-[0_24px_50px_-18px_rgba(12,74,110,.45)]">
          <div
            className="relative h-[200px] w-[150px] overflow-hidden"
            style={{ background: "repeating-linear-gradient(135deg,#e0f2fe 0 8px,#f0f9ff 8px 16px)" }}
          >
            <div
              data-cine="pageL"
              aria-hidden="true"
              className="absolute inset-0 bg-white bg-cover bg-top opacity-0 shadow-[inset_-6px_0_10px_-8px_rgba(0,0,0,.25)]"
              style={{ backgroundImage: `url(${SAMPLE_PAGES.page22})` }}
            />
            <div
              data-cine="ad"
              aria-hidden="true"
              className="absolute right-2.5 bottom-2.5 left-2.5 box-border flex h-[34px] items-center justify-between rounded-sm px-2 text-white opacity-0 shadow-[0_4px_10px_-4px_rgba(12,74,110,.6)]"
              style={{ animation: "fasHs 3.6s ease-in-out 1.2s infinite", background: "linear-gradient(135deg,#0c4a6e,#0284c7)" }}
            >
              <span className="text-[9.5px] leading-[1.1] font-bold">
                Banner ad
                <br />
                <span className="font-normal opacity-85">Trackable clicks</span>
              </span>
              <span className="rounded-sm bg-white px-[5px] py-0.5 text-[8px] font-semibold text-navy-700">AD</span>
            </div>
          </div>
          <div
            className="relative box-border flex h-[200px] w-[150px] flex-col gap-1.5 overflow-hidden bg-white p-3.5"
            style={{ backgroundImage: "linear-gradient(to right,rgba(0,0,0,.08),transparent 14px)" }}
          >
            <div
              data-cine="pageR"
              aria-hidden="true"
              className="absolute inset-0 bg-white bg-cover bg-top opacity-0"
              style={{ backgroundImage: `url(${SAMPLE_PAGES.page8})` }}
            />
            <span
              data-cine="pageRov"
              aria-hidden="true"
              className="absolute inset-0 opacity-0"
              style={{ background: "linear-gradient(to right,rgba(0,0,0,.14),transparent 16px),rgba(255,255,255,.35)" }}
            />
            {HOTSPOTS.map((h, i) => (
              <span
                key={h.label}
                data-cine={`hs${i}`}
                aria-hidden="true"
                className={`relative rounded-sm text-[10px] font-semibold text-white opacity-0 shadow-[0_2px_6px_rgba(0,0,0,.2)] ${h.cls}`}
                style={{ animation: h.anim }}
              >
                {h.label}
              </span>
            ))}
          </div>
        </div>
        <span className={MONO_LABEL}>INTERACTIVE PUBLICATION</span>
      </div>

      <div data-cine="arrow1" aria-hidden="true" className={ARROW}>
        <span className="inline-block" style={{ animation: "none", animationDelay: ".9s" }}>
          →
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div
          className="box-border flex w-[220px] flex-col gap-3 rounded-md p-4 shadow-[0_20px_40px_-18px_rgba(12,74,110,.6)]"
          style={{ background: "linear-gradient(160deg,#0c4a6e,#075985)" }}
        >
          {(
            [
              ["Readers", "n0", "0"],
              ["Avg. time", "n1", "0m 00s"],
              ["Leads", "n2", "0"],
            ] as const
          ).map(([label, key, init]) => (
            <div key={key} className="flex justify-between text-xs text-blue-200">
              <span>{label}</span>
              <span data-cine={key} className="text-lg font-bold text-white tabular-nums">
                {init}
              </span>
            </div>
          ))}
          <div aria-hidden="true" className="flex h-12 items-end gap-1">
            {BAR_HEIGHTS.map(([h, bg], i) => (
              <div key={i} data-cine="bar" className={`flex-1 origin-bottom ${bg}`} style={{ height: h, transform: "scaleY(.04)" }} />
            ))}
          </div>
        </div>
        <span className={MONO_LABEL}>ANALYTICS</span>
      </div>

      <div
        data-cine="fly"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[230px] w-[172px] rounded-sm bg-blue-100 bg-cover bg-center opacity-0 shadow-[0_30px_50px_-20px_rgba(12,74,110,.55)] will-change-transform"
        style={{ backgroundImage: `url(${cover})` }}
      />
    </div>
  );
}
