"use client";

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Dropzone } from "@/components/ui/Dropzone";
import { COVERS } from "@/lib/covers";

/** Prototype HERO_SETS: indexes into COVERS for the five floating pages. */
const HERO_SETS = [
  [0, 2, 3, 1, 4],
  [5, 8, 6, 7, 9],
  [10, 2, 11, 0, 3],
];

const HeroCoverContext = createContext<string>(COVERS[HERO_SETS[0][0]]);

/** Cover of the hero's first floating page; the cinematic pipeline flies this one into the holder. */
export function useHeroCover() {
  return useContext(HeroCoverContext);
}

/** Set picked for this page load (rotation advances once per load, not per mount). */
let chosen: number | null = null;

type PageSpec = { pos: CSSProperties; anim: string; size?: [number, number]; opacity: number; transition?: string };

const EASE = "cubic-bezier(.2,.8,.2,1)";
const PAGES: PageSpec[] = [
  { pos: { left: "9%", top: "52%" }, size: [92, 124], opacity: 0.7, anim: "fasPages 13s ease-in-out 2s infinite", transition: "opacity .3s" },
  {
    pos: { left: "13%", top: "34%" },
    size: [100, 134],
    opacity: 0.75,
    anim: "fasPages 11s ease-in-out 1s infinite",
    transition: `top 1.2s ${EASE}, width 1.2s ${EASE}, height 1.2s ${EASE}`,
  },
  { pos: { left: "5%", top: "20%" }, opacity: 0.95, anim: "fasPages 9s ease-in-out infinite", transition: `top 1.2s ${EASE}` },
  { pos: { right: "13%", top: "34%" }, size: [100, 134], opacity: 0.75, anim: "fasPages2 12s ease-in-out 1.5s infinite" },
  { pos: { right: "6%", top: "16%" }, opacity: 0.95, anim: "fasPages2 10s ease-in-out infinite" },
];

const BLOBS: { pos: CSSProperties; bg: string; anim: string }[] = [
  { pos: { left: "-8%", top: "-20%", width: "48vw", height: "48vw" }, bg: "rgba(186,230,253,.75)", anim: "fasDrift 22s ease-in-out infinite" },
  { pos: { right: "-10%", top: "-10%", width: "42vw", height: "42vw" }, bg: "rgba(14,165,233,.18)", anim: "fasDrift2 26s ease-in-out infinite" },
  { pos: { left: "30%", bottom: "-35%", width: "50vw", height: "40vw" }, bg: "rgba(224,242,254,.4)", anim: "fasDrift 30s ease-in-out infinite reverse" },
];

/**
 * Homepage hero: drifting blobs, five floating covers, H1, lead, drop zone and demo link.
 * `children` render inside the hero section, below the demo link (the cinematic pipeline).
 * Server and first client render use cover set 0; the set rotates after mount.
 */
export function HomeHero({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const [setIndex, setSetIndex] = useState(0);

  useEffect(() => {
    if (chosen === null) {
      chosen = 0;
      try {
        chosen = (+(localStorage.getItem("fas-hero") ?? 0) || 0) % 3;
        localStorage.setItem("fas-hero", String(chosen + 1));
      } catch {
        /* storage unavailable: keep set 0 */
      }
    }
    const pick = chosen;
    if (!pick) return;
    const id = requestAnimationFrame(() => setSetIndex(pick));
    return () => cancelAnimationFrame(id);
  }, []);

  const set = HERO_SETS[setIndex];
  const goSignup = () => router.push("/signup");

  return (
    <HeroCoverContext.Provider value={COVERS[set[0]]}>
      <section className="relative flex flex-col items-center gap-[22px] overflow-hidden px-8 pt-20 pb-[88px] text-center max-sm:px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg,#f0f9ff 0%,#f8fcff 55%,#ffffff 100%)" }}
        >
          {BLOBS.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-[60px] will-change-transform"
              style={{ ...b.pos, background: b.bg, animation: b.anim }}
            />
          ))}
          {PAGES.map((p, i) => (
            <div
              key={i}
              data-hero-page={i}
              className="absolute rounded-sm border border-white/70 bg-blue-100 bg-cover bg-top shadow-[0_24px_44px_-22px_rgba(12,74,110,.45)]"
              style={{
                width: p.size?.[0] ?? 120,
                height: p.size?.[1] ?? 160,
                opacity: p.opacity,
                animation: p.anim,
                transition: p.transition,
                backgroundImage: `url(${COVERS[set[i]]})`,
                ...p.pos,
              }}
            />
          ))}
        </div>

        <h1 className="relative m-0 max-w-[900px] text-[clamp(40px,6vw,64px)] leading-[1.03] font-bold tracking-[-.035em] text-balance text-navy-800">
          Turn PDFs into interactive digital experiences.
        </h1>
        <p className="relative m-0 max-w-[620px] text-lg leading-[1.55] text-pretty text-gray-600">
          Create beautiful flipbooks, catalogs, brochures and publications that people can actually engage with.
        </p>
        <div className="relative mt-3.5 flex w-full max-w-[720px] justify-center">
          <Dropzone variant="hero" onFiles={goSignup} onReject={goSignup} className="mx-auto" />
        </div>
        <span className="relative text-label text-gray-500">
          Free account, no credit card. Free plan includes 1 publication for the first month.
        </span>
        <a
          href="#reader-demo"
          className="relative mt-1.5 flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <span aria-hidden="true" className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-500">
            <span className="ml-0.5 h-0 w-0 border-y-[4.5px] border-l-[7px] border-y-transparent border-l-white" />
          </span>
          Watch a 60-second demo
        </a>
        {children}
      </section>
    </HeroCoverContext.Provider>
  );
}
