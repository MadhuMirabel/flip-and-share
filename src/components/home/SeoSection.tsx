"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { SerpCard, SearchBarMock } from "@/components/mockups/PreviewCards";
import { SwitchTrack } from "@/components/ui/Toggle";
import { CheckList } from "@/components/ui/CheckList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SAMPLE_PAGES } from "@/lib/covers";

type Mode = "flip" | "article" | "search";
const MODES: { key: Mode; label: string }[] = [
  { key: "flip", label: "Flipbook" },
  { key: "article", label: "Article" },
  { key: "search", label: "In Google" },
];
const URLS: Record<Mode, string> = {
  flip: "flipandshare.com/rocketstem/issue-14#p8",
  article: "flipandshare.com/rocketstem/issue-14/article/mars-express",
  search: "google.com/search?q=mars+express+canyon",
};
const FS = [13, 14.5, 16.5];
const SIZE_BTN = [
  { fs: 11, label: "Small text" },
  { fs: 13, label: "Medium text" },
  { fs: 15, label: "Large text" },
];

const THEME = {
  light: {
    bg: "var(--color-white)",
    fg: "var(--color-gray-700)",
    head: "var(--color-navy-800)",
    muted: "var(--color-gray-500)",
    line: "var(--color-gray-200)",
    aside: "var(--color-slate-50)",
    hiBg: "var(--color-blue-200)",
    hiFg: "inherit",
  },
  dark: {
    bg: "var(--color-slate-900)",
    fg: "var(--color-slate-200)",
    head: "var(--color-slate-50)",
    muted: "var(--color-slate-400)",
    line: "var(--color-slate-800)",
    aside: "var(--color-ink-950)",
    hiBg: "var(--color-blue-700)",
    hiFg: "var(--color-white)",
  },
};

const OUTLINE = "2px dashed var(--color-blue-500)";
const OUTLINE_IMG = "2px dashed var(--color-violet-500)";

function SwitchButton({
  label,
  checked,
  onToggle,
  color,
  line,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  color: string;
  line: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="flex cursor-pointer items-center justify-between gap-2 rounded-sm border bg-transparent px-[9px] py-[7px] text-left text-xs font-semibold"
      style={{ borderColor: line, color }}
    >
      <span>{label}</span>
      <SwitchTrack checked={checked} size="sm" />
    </button>
  );
}

/** Homepage "Every flipbook is also an SEO-ready web page": copy + interactive browser demo. */
export function SeoSection() {
  const [mode, setMode] = useState<Mode>("flip");
  const [touched, setTouched] = useState(false);
  const [hi, setHi] = useState(false);
  const [size, setSize] = useState(1);
  const [dark, setDark] = useState(false);
  const [sr, setSr] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (m: Mode) => {
    clearTimeout(timer.current);
    setMode(m);
    setHi(false);
    setTouched(true);
    if (m === "article") timer.current = setTimeout(() => setHi(true), 350);
  };

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + MODES.length) % MODES.length;
    pick(MODES[n].key);
    tabRefs.current[n]?.focus();
  };

  const t = dark ? THEME.dark : THEME.light;
  const fs = FS[size];
  const hint = mode === "flip" && !touched;

  return (
    <section className="mx-auto box-border grid max-w-page grid-cols-[minmax(220px,5fr)_minmax(240px,7fr)] items-center gap-14 px-8 py-[88px] max-[640px]:grid-cols-1 max-[640px]:gap-6 max-sm:px-5">
      <div className="flex min-w-0 flex-col gap-[18px]">
        <Eyebrow>SEARCH &amp; ACCESSIBILITY</Eyebrow>
        <h2 className="m-0 text-[38px] leading-[1.1] tracking-[-0.025em] text-navy-800">
          Every flipbook is also an SEO-ready web page.
        </h2>
        <p className="m-0 text-base leading-[1.6] text-gray-600 [text-wrap:pretty]">
          Your publication gets a readable URL, full metadata, social previews and an{" "}
          <Link
            href="/features/seo"
            className="font-semibold underline decoration-[rgba(2,132,199,.35)] underline-offset-[3px]"
          >
            article reading mode
          </Link>{" "}
          with real, selectable text. Search engines and AI search tools can read it. So can screen readers.
        </p>
        <CheckList
          variant="plain"
          items={[
            "Human-readable URLs and canonical links",
            "Title, description, author, cover and Open Graph data",
            "Article mode: real text, semantic headings, keyboard navigation, alt text",
            "Reader controls: text size and dark mode, remembered per reader",
          ]}
        />
      </div>

      <Reveal className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-frame">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-gray-200 bg-gray-100 px-3.5 py-2.5">
          <span aria-hidden="true" className="flex gap-[5px]">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          </span>
          <span className="min-w-[120px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border border-gray-200 bg-white px-2.5 py-1.5 font-mono text-xs text-gray-700">
            {URLS[mode]}
          </span>
          <div role="tablist" aria-label="Reading mode" className="relative flex rounded-md bg-gray-200 p-0.5">
            {hint && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[70%] top-[120%] z-[5]"
                style={{ animation: "fasAmCur 4.8s cubic-bezier(.45,0,.25,1) infinite" }}
              >
                <svg width="20" height="24" viewBox="0 0 18 22" className="block" style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))" }}>
                  <path d="M1 1l6 18 3-7 7-3z" fill="#111827" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span
                  className="absolute -left-[9px] -top-[9px] h-[22px] w-[22px] rounded-full border-2 border-blue-500 opacity-0"
                  style={{ animation: "fasAmTap 4.8s ease-out infinite" }}
                />
              </span>
            )}
            {MODES.map((m, i) => {
              const on = mode === m.key;
              return (
                <button
                  key={m.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`seo-tab-${m.key}`}
                  aria-selected={on}
                  aria-controls="seo-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(m.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`cursor-pointer rounded-sm border-0 px-[11px] py-1.5 text-xs font-semibold transition-all duration-200 ${
                    on ? "bg-white text-navy-800" : "bg-transparent text-gray-500"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div id="seo-panel" role="tabpanel" aria-labelledby={`seo-tab-${mode}`}>
          {mode === "flip" && (
            <div
              className="relative flex min-h-[340px] items-center justify-center px-6 pb-11 pt-6"
              style={{
                background: "linear-gradient(180deg, var(--color-gray-200) 0%, var(--color-gray-100) 45%, var(--color-white) 100%)",
                animation: "fasFade .35s ease-out both",
              }}
            >
              <div
                className="flex aspect-[3/2] w-[min(100%,460px)]"
                style={{ boxShadow: "0 24px 44px -20px rgba(31,41,55,.45)" }}
              >
                <div className="flex-1 bg-white bg-cover bg-top" style={{ backgroundImage: `url(${SAMPLE_PAGES.page22})` }} />
                <div
                  className="flex-1 border-l border-black/15 bg-white bg-cover bg-top"
                  style={{ backgroundImage: `url(${SAMPLE_PAGES.page8})` }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-3 flex flex-wrap justify-center gap-x-2 text-eyebrow text-gray-500">
                <span>Pages 8–9 of 64</span>
                <span aria-hidden="true">·</span>
                <span>
                  Text is an image here.{" "}
                  <button
                    type="button"
                    onClick={() => pick("article")}
                    className="cursor-pointer border-0 bg-transparent p-0 text-eyebrow text-gray-500 hover:text-blue-600"
                  >
                    Switch to Article →
                  </button>
                </span>
              </div>
            </div>
          )}

          {mode === "article" && (
            <div
              className="grid min-h-[340px] grid-cols-[minmax(0,1fr)_150px] transition-[background,color] duration-300 selection:bg-blue-500 selection:text-white max-[640px]:grid-cols-[minmax(0,1fr)]"
              style={{ background: t.bg, color: t.fg, animation: "fasFade .35s ease-out both" }}
            >
              <article
                className="flex cursor-text select-text flex-col px-6 py-[22px] transition-[font-size] duration-[250ms] [&_*::selection]:bg-blue-500 [&_*::selection]:text-white"
                style={{ gap: fs * 0.6, fontSize: fs, lineHeight: 1.6 }}
              >
                <span className="font-mono text-[10px] font-semibold tracking-eyebrow text-blue-500">FEATURE · PAGE 8</span>
                <h3
                  tabIndex={0}
                  className="m-0 rounded-[2px] leading-[1.2] tracking-[-0.02em] transition-[font-size] duration-[250ms]"
                  style={{ fontSize: fs * 1.55, color: t.head, outline: sr ? OUTLINE : "none", outlineOffset: 3 }}
                >
                  Mars Express: a decade above the Red Planet
                </h3>
                <p className="m-0 [text-wrap:pretty]">
                  <span
                    className="rounded-[2px] bg-no-repeat transition-[background-size] duration-[800ms] ease-in-out"
                    style={{
                      backgroundImage: `linear-gradient(${t.hiBg},${t.hiBg})`,
                      backgroundSize: `${hi ? 100 : 0}% 100%`,
                      color: t.hiFg,
                    }}
                  >
                    ESA&apos;s orbiter has spent more than ten years circling Mars, mapping canyons, craters and polar ice
                    with a resolution that keeps surprising the mission team.
                  </span>
                </p>
                <h4
                  tabIndex={0}
                  className="m-0 mt-1.5 rounded-[2px] leading-[1.3]"
                  style={{ fontSize: fs * 1.1, color: t.head, outline: sr ? OUTLINE : "none", outlineOffset: 3 }}
                >
                  What the instruments found
                </h4>
                <p className="m-0 [text-wrap:pretty]">
                  The HRSC camera returned stereo images of Valles Marineris, while the MARSIS radar detected signs of liquid
                  water beneath the southern ice cap.
                </p>
                <figure
                  tabIndex={0}
                  className="m-0 mt-1.5 grid grid-cols-[64px_minmax(0,1fr)] items-center gap-2.5 rounded-sm"
                  style={{ outline: sr ? OUTLINE_IMG : "none", outlineOffset: 3 }}
                >
                  <span
                    aria-hidden="true"
                    className="h-16 w-16 rounded-sm bg-gray-200 bg-cover bg-center"
                    style={{ backgroundImage: `url(${SAMPLE_PAGES.page8})` }}
                  />
                  <figcaption className="leading-[1.45]" style={{ fontSize: fs * 0.85, color: t.muted }}>
                    <b className="text-blue-500">alt</b> Orbital view of the rust-coloured Martian surface with a deep canyon
                    cutting across it.
                  </figcaption>
                </figure>
              </article>
              <aside
                className="flex flex-col gap-3.5 border-l px-3.5 py-4 text-xs transition-[background] duration-300 max-[640px]:border-l-0 max-[640px]:border-t"
                style={{ borderColor: t.line, background: t.aside }}
              >
                <div role="group" aria-labelledby="seo-size-label" className="flex flex-col gap-1.5">
                  <span id="seo-size-label" className="text-2xs font-bold tracking-[.06em]" style={{ color: t.muted }}>
                    TEXT SIZE
                  </span>
                  <div className="flex gap-1">
                    {SIZE_BTN.map((z, i) => {
                      const on = size === i;
                      return (
                        <button
                          key={z.label}
                          type="button"
                          aria-label={z.label}
                          aria-pressed={on}
                          onClick={() => setSize(i)}
                          className={`flex-1 cursor-pointer rounded-sm border py-[5px] font-bold transition-all duration-200 ${
                            on ? "border-blue-500 bg-blue-500 text-white" : "bg-transparent"
                          }`}
                          style={{
                            fontSize: z.fs,
                            ...(on ? {} : { borderColor: dark ? "var(--color-slate-700)" : "var(--color-gray-200)", color: t.fg }),
                          }}
                        >
                          A
                        </button>
                      );
                    })}
                  </div>
                </div>
                <SwitchButton label="Dark mode" checked={dark} onToggle={() => setDark((v) => !v)} color={t.fg} line={t.line} />
                <SwitchButton
                  label="Screen-reader outline"
                  checked={sr}
                  onToggle={() => setSr((v) => !v)}
                  color={t.fg}
                  line={t.line}
                />
                {sr && (
                  <div
                    className="flex flex-col gap-1 rounded-sm bg-blue-500/10 p-2 text-eyebrow leading-[1.4]"
                    style={{ color: t.fg, animation: "fasFade .3s ease-out both" }}
                  >
                    <span className="font-bold text-blue-500">Reads as</span>
                    <span>h1 · Mars Express: a decade…</span>
                    <span>h2 · What the instruments found</span>
                    <span>img · Orbital view of the rust…</span>
                  </div>
                )}
                <span className="mt-auto text-eyebrow leading-[1.45]" style={{ color: t.muted }}>
                  Select any text to copy it. Tab moves through headings.
                </span>
              </aside>
            </div>
          )}

          {mode === "search" && (
            <div className="flex min-h-[340px] flex-col gap-[18px] px-6 py-[22px]" style={{ animation: "fasFade .35s ease-out both" }}>
              <SearchBarMock query="mars express canyon orbiter article" />
              <SerpCard
                variant="highlighted"
                delay={0.15}
                url="RocketSTEM › issue-14 › mars-express"
                title="Mars Express: a decade above the Red Planet | RocketSTEM"
                description="ESA's orbiter has spent more than ten years circling Mars, mapping canyons, craters and polar ice with a resolution that keeps surprising the mission team…"
                chips={["Page 8", "Mar 2017", "Open in flipbook"]}
              />
              <SerpCard
                variant="faded"
                delay={0.3}
                url="competitor-flipbooks.com › viewer › 8823"
                title="Untitled document"
                description="No description available. Page content is an image and cannot be indexed."
              />
              <span className="mt-auto text-xs text-gray-500">
                Article mode gives every page real text, so search engines and AI assistants can quote it. Image-only flipbooks
                are invisible to them.
              </span>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
