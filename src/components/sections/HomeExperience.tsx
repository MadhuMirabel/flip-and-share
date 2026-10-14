"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Dropzone } from "@/components/ui/Dropzone";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { UnderlineTabs } from "@/components/ui/Tabs";
import { BookSpread } from "@/components/mockups/BookSpread";
import { Icon } from "@/components/icons";

const COVER_PALETTES = [
  { background: "linear-gradient(155deg,#12364c 0%,#0c4a6e 58%,#0ea5e9 100%)", foreground: "#fff", accent: "#7dd3fc" },
  { background: "linear-gradient(145deg,#fef3c7 0%,#f59e0b 62%,#b45309 100%)", foreground: "#422006", accent: "#fff7ed" },
  { background: "linear-gradient(155deg,#064e3b 0%,#0f766e 58%,#5eead4 100%)", foreground: "#fff", accent: "#ccfbf1" },
  { background: "linear-gradient(155deg,#4c1d95 0%,#7c3aed 56%,#c4b5fd 100%)", foreground: "#fff", accent: "#ede9fe" },
  { background: "linear-gradient(145deg,#881337 0%,#be185d 58%,#f9a8d4 100%)", foreground: "#fff", accent: "#fce7f3" },
  { background: "linear-gradient(150deg,#1e3a8a 0%,#0369a1 55%,#67e8f9 100%)", foreground: "#fff", accent: "#e0f2fe" },
];

const ISSUE_COVERS = [
  { title: "Field Notes", kicker: "THE OUTDOOR JOURNAL", month: "January", index: 0 },
  { title: "A Better Home", kicker: "DESIGN · GARDEN · LIVING", month: "March", index: 1 },
  { title: "Coast to Coast", kicker: "TRAVEL ISSUE", month: "May", index: 2 },
  { title: "The Modern Maker", kicker: "PEOPLE WHO BUILD", month: "July", index: 3 },
  { title: "Good Food", kicker: "THE HARVEST EDITION", month: "September", index: 4 },
  { title: "City / Life", kicker: "CULTURE · COMMUNITY", month: "November", index: 5 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FAQS = [
  {
    question: "What can I turn into a digital publication?",
    answer: <p>Start with a PDF magazine, catalog, brochure, report or other publication. FlipAndShare converts the pages into a web-based reader you can share by link, embed on your site or distribute with a QR code.</p>,
  },
  {
    question: "Can readers open my publication without an app?",
    answer: <p>Yes. Readers open a publication in their browser on desktop, tablet or phone. You can also choose access settings for public, unlisted or gated editions.</p>,
  },
  {
    question: "Will search engines be able to read my flipbook?",
    answer: <p>Each edition can include a readable article view with selectable text, page titles, descriptions and share metadata, giving search engines more than page images to index.</p>,
  },
  {
    question: "Can I add video, links and lead forms?",
    answer: <p>Yes. Place interactive links, video, forms, QR destinations and shoppable ad units on publication pages, then review engagement in analytics.</p>,
  },
  {
    question: "Do I need a credit card to get started?",
    answer: <p>No credit card is required to create a free account. The free plan includes one publication for the first month.</p>,
  },
];

function Cover({
  title,
  kicker,
  index = 0,
  className = "",
}: {
  title: string;
  kicker: string;
  index?: number;
  className?: string;
}) {
  const palette = COVER_PALETTES[index % COVER_PALETTES.length];
  return (
    <div
      role="img"
      aria-label={`${kicker}: ${title} sample digital magazine cover`}
      className={`relative isolate flex aspect-[3/4] min-w-0 flex-col justify-between overflow-hidden rounded-[3px] p-[9%] shadow-cover ${className}`}
      style={{ background: palette.background, color: palette.foreground }}
    >
      <span aria-hidden="true" className="absolute -right-[22%] top-[17%] -z-10 h-[68%] w-[68%] rounded-full border border-white/35" />
      <span aria-hidden="true" className="absolute -right-[8%] top-[30%] -z-10 h-[58%] w-[58%] rounded-full border border-white/25" />
      <span className="text-[clamp(7px,1vw,11px)] font-bold tracking-[.12em]">{kicker}</span>
      <span className="flex flex-col gap-2">
        <span className="h-[2px] w-8" style={{ background: palette.accent }} />
        <span className="max-w-[9ch] text-[clamp(17px,3vw,36px)] leading-[.94] font-bold">{title}</span>
        <span className="text-[clamp(8px,1vw,12px)] opacity-85">Stories worth turning the page for</span>
      </span>
      <span className="text-[9px] font-semibold tracking-[.14em] opacity-85">DIGITAL EDITION · 2026</span>
    </div>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`font-mono text-eyebrow font-semibold tracking-eyebrow uppercase ${dark ? "text-blue-300" : "text-gray-500"}`}>{children}</span>;
}

function HomeHero() {
  const router = useRouter();
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#e0f2fe_0%,#f0f9ff_55%,#fff_100%)] px-8 pb-[74px] pt-[72px] max-sm:px-5 max-sm:pt-14">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-240px] -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(56,189,248,.28),transparent_68%)]" />
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <Eyebrow>CREATE · PUBLISH · ENGAGE · MEASURE</Eyebrow>
        <h1 className="m-0 max-w-[900px] text-display text-navy-800 [text-wrap:balance]">
          Turn PDFs into interactive digital experiences.
        </h1>
        <p className="m-0 max-w-[650px] text-lg leading-[1.55] text-gray-600 [text-wrap:pretty]">
          Create beautiful flipbooks, catalogs, brochures and publications that people can actually engage with.
        </p>
        <div className="relative mt-3 w-full max-w-[720px]">
          <span aria-hidden="true" className="absolute -left-[82px] top-1/2 hidden w-[132px] -translate-y-1/2 -rotate-[9deg] drop-shadow-cover lg:block">
            <Cover title="A Better Home" kicker="DESIGN & LIVING" index={1} />
          </span>
          <span aria-hidden="true" className="absolute -right-[82px] top-1/2 hidden w-[132px] -translate-y-1/2 rotate-[8deg] drop-shadow-cover lg:block">
            <Cover title="Coast to Coast" kicker="TRAVEL ISSUE" index={2} />
          </span>
          <Dropzone
            variant="hero"
            title="Drop your PDF here"
            cta="Choose a file"
            onFiles={() => router.push("/signup")}
            onReject={() => router.push("/signup")}
          />
        </div>
        <p className="m-0 max-w-[540px] text-small leading-[1.5] text-gray-500">
          Free account, no credit card. Free plan includes 1 publication for the first month.
        </p>
        <Link href="#reader-demo" className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-500 text-white"><Icon name="play" size={10} /></span>
          See how a publication comes to life
        </Link>
        <div className="mt-7 grid w-full max-w-[880px] grid-cols-[1fr_auto_1.5fr_auto_1fr] items-center gap-5 max-sm:grid-cols-1 max-sm:gap-3" aria-label="From PDF to measurable reader engagement">
          <div className="mx-auto w-[112px] rotate-[-4deg] max-sm:hidden"><Cover title="Your issue" kicker="START WITH A PDF" index={0} /></div>
          <span aria-hidden="true" className="text-2xl text-blue-400 max-sm:hidden">→</span>
          <div className="relative mx-auto w-[min(100%,330px)] -rotate-1">
            <BookSpread label="Interactive publication preview" className="rounded-sm" left={<div className="flex h-full flex-col justify-between bg-[linear-gradient(145deg,#064e3b,#0f766e_65%,#99f6e4)] p-[8%] text-white"><span className="text-[9px] font-bold tracking-[.12em]">FIELD NOTES</span><strong className="max-w-[8ch] text-[clamp(16px,3vw,26px)] leading-none">Places that stay with you</strong><span className="w-fit rounded bg-white/20 px-2 py-1 text-[8px]">VIDEO · LINKS · STORY</span></div>} right={<div className="flex h-full flex-col gap-2 bg-white p-[8%] text-left"><span className="text-[9px] font-bold tracking-[.1em] text-blue-600">THE LONG WAY HOME</span><span className="text-[clamp(11px,1.7vw,15px)] font-bold leading-tight text-navy-800">A new way to explore the familiar</span><span className="h-1 w-full rounded-full bg-gray-200" /><span className="h-1 w-4/5 rounded-full bg-gray-200" /><span className="h-1 w-5/6 rounded-full bg-gray-200" /><span className="mt-auto rounded bg-blue-100 px-2 py-1 text-[8px] font-semibold text-blue-700">EXPLORE THE MAP →</span></div>} />
            <span className="absolute -right-5 -top-4 rounded-full border border-white bg-white px-2.5 py-1 text-[10px] font-semibold text-blue-700 shadow-tile">Video</span>
            <span className="absolute -bottom-3 -left-4 rounded-full border border-white bg-white px-2.5 py-1 text-[10px] font-semibold text-amber-700 shadow-tile">Shop this page</span>
          </div>
          <span aria-hidden="true" className="text-2xl text-blue-400 max-sm:hidden">→</span>
          <div className="mx-auto flex w-full max-w-[160px] flex-col gap-3 rounded-lg bg-[linear-gradient(155deg,#0c4a6e,#075985)] p-4 text-left text-white shadow-float">
            <div className="flex justify-between text-small text-blue-200"><span>Readers</span><strong className="text-base text-white">2,480</strong></div>
            <div className="flex justify-between text-small text-blue-200"><span>Avg. time</span><strong className="text-base text-white">4m 38s</strong></div>
            <div className="flex h-9 items-end gap-1" aria-hidden="true">{[30, 48, 40, 75, 62, 100, 82].map((h, i) => <span key={i} className="flex-1 rounded-t-sm bg-blue-300" style={{ height: `${h}%`, opacity: 0.55 + i * 0.06 }} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { value: 22, suffix: "+", label: "years building publishing software", icon: "clock" as const },
    { value: 1, suffix: "", label: "connected publishing platform", icon: "users" as const },
    { value: 4, suffix: "", label: "stages from creation to measurement", icon: "book" as const },
    { value: 1, suffix: " PDF", label: "to create a full digital edition", icon: "chart" as const },
  ];
  return (
    <Section tone="tinted" padding="md" className="border-y border-gray-200 bg-[linear-gradient(180deg,#f0f9ff,#fff)]">
      <div className="flex flex-col gap-7">
        <Reveal className="text-center">
          <Eyebrow>BUILT ON PUBLISHING EXPERIENCE</Eyebrow>
          <h2 className="mx-auto mb-0 mt-2 max-w-[680px] text-[clamp(22px,2.8vw,30px)] leading-tight font-semibold text-navy-800">Twenty-two years of publishing software, now in one flipbook platform.</h2>
        </Reveal>
        <div className="grid grid-cols-4 gap-4 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07} className="relative flex flex-col gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-stat">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-100 text-blue-700"><Icon name={stat.icon} size={18} /></span>
              <span className="text-[clamp(28px,3.3vw,40px)] leading-none font-bold text-navy-900"><CountUp value={stat.value} suffix={stat.suffix} /></span>
              <span className="text-sm leading-[1.4] text-gray-600">{stat.label}</span>
              <span className="h-[3px] w-10 rounded-full bg-blue-300" />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProcessSection() {
  const steps = [
    { n: "01", title: "Create", text: "Bring your finished PDF. No redesign or production bottleneck.", color: "bg-blue-100 text-blue-700", icon: "upload" as const },
    { n: "02", title: "Publish", text: "Set access, add searchable text, then publish a shareable edition.", color: "bg-amber-100 text-amber-700", icon: "globe" as const },
    { n: "03", title: "Engage", text: "Add video, links, lead forms, QR codes and shoppable ad units.", color: "bg-green-100 text-green-700", icon: "sparkles" as const },
    { n: "04", title: "Measure", text: "See reading activity, clicks, leads and advertiser results in one place.", color: "bg-violet-100 text-violet-700", icon: "chart" as const },
  ];
  return (
    <Section padding="xl">
      <div className="flex flex-col gap-8">
        <SectionHeader eyebrow="FROM FIRST DRAFT TO RESULTS" title="Everything from first draft to results." lead="A single workflow for the people who create publications and the teams who sell, share and measure them." />
        <div className="grid grid-cols-4 gap-4 max-[760px]:grid-cols-2 max-[480px]:grid-cols-1">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} className="relative flex min-h-[210px] flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-tile">
              <div className="flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-lg ${step.color}`}><Icon name={step.icon} size={19} /></span><span className="font-mono text-xs font-semibold text-gray-400">{step.n}</span></div>
              <h3 className="m-0 text-h3 text-navy-800">{step.title}</h3>
              <p className="m-0 text-body-sm leading-[1.55] text-gray-600">{step.text}</p>
              {i < steps.length - 1 && <span aria-hidden="true" className="absolute -right-[23px] top-10 z-10 hidden text-xl font-light text-blue-400 min-[761px]:block">→</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PublicationTimeline() {
  const [selected, setSelected] = useState("Sep");
  const current = ISSUE_COVERS.find((cover) => cover.month.startsWith(selected)) ?? ISSUE_COVERS[4];
  const currentIndex = MONTHS.indexOf(selected);
  return (
    <Section tone="tinted" tint="gray" padding="xl">
      <div className="flex flex-col gap-7">
        <SectionHeader
          eyebrow="YOUR ENTIRE CATALOG, IN ONE PLACE"
          title="One platform. Every publication."
          lead="Catalogs, brochures, magazines, reports, portfolios and annual reports, published on a timeline your team can manage."
          action={<Link href="/store" className="text-sm font-semibold">Explore the store <span className="fas-arrow">→</span></Link>}
        />
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white px-4 pt-3">
          <div className="relative grid min-w-[600px] grid-cols-12">
            {MONTHS.map((month) => {
              const issue = ISSUE_COVERS.some((cover) => cover.month.startsWith(month));
              return (
                <button key={month} type="button" onClick={() => setSelected(month)} aria-pressed={selected === month} className={`flex min-h-[60px] cursor-pointer flex-col justify-end border-0 border-l-2 border-solid bg-transparent px-1.5 pb-2 text-left transition-colors ${selected === month ? "border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:text-navy-800"}`}>
                  <span className="font-mono text-xs font-semibold">{month}</span>
                  <span className="mt-1 text-[10px] text-gray-400">{issue ? "3 issues" : "—"}</span>
                </button>
              );
            })}
            <span aria-hidden="true" className="absolute bottom-0 h-[3px] rounded-full bg-blue-500 transition-[left] duration-300" style={{ left: `calc(${currentIndex} * (100% / 12))`, width: "calc(100% / 12)" }} />
          </div>
        </div>
        <div className="flex snap-x gap-6 overflow-x-auto pb-4">
          {ISSUE_COVERS.filter((cover) => cover.month === current.month || selected === "Sep").map((cover) => (
            <Link key={cover.title} href="/store" className="w-[min(42vw,190px)] flex-none snap-start text-navy-800 transition-transform hover:-translate-y-1">
              <Cover title={cover.title} kicker={cover.kicker} index={cover.index} />
              <span className="mt-3 block text-sm font-semibold">{cover.title}</span>
              <span className="mt-1 block text-xs text-gray-500">{cover.month} 2026 · Digital edition</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

function SeoDemo() {
  const tabs = [
    {
      id: "flipbook",
      label: "Flipbook",
      panel: <div className="min-h-[300px] bg-[linear-gradient(180deg,#e5e7eb,#f3f4f6_45%,#fff)] p-7"><BookSpread label="A sample digital magazine spread" left={<div className="flex h-full flex-col justify-between bg-[linear-gradient(145deg,#12364c,#0284c7)] p-[8%] text-white"><span className="text-[9px] font-bold tracking-widest">FIELD NOTES</span><strong className="max-w-[7ch] text-[clamp(16px,3vw,30px)] leading-none">The places we return to</strong><span className="text-[9px]">ISSUE 08 · AUTUMN</span></div>} right={<div className="flex h-full flex-col gap-2 bg-white p-[8%]"><span className="text-[9px] font-bold text-blue-600">TRAVEL · 8 MIN READ</span><strong className="text-[clamp(12px,2vw,19px)] leading-tight text-navy-800">A slower way to see the coast</strong><span className="h-1 rounded-full bg-gray-200"/><span className="h-1 w-4/5 rounded-full bg-gray-200"/><span className="h-1 w-5/6 rounded-full bg-gray-200"/><span className="mt-auto rounded-sm bg-blue-100 p-2 text-[8px] font-semibold text-blue-700">WATCH THE FILM →</span></div>} /></div>,
    },
    {
      id: "article",
      label: "Article",
      panel: <article className="grid min-h-[300px] grid-cols-[minmax(0,1fr)_145px] max-[640px]:grid-cols-1"><div className="flex flex-col gap-3 p-6"><Eyebrow>FEATURE · PAGE 08</Eyebrow><h3 className="m-0 text-xl font-bold leading-tight text-navy-800">A slower way to see the coast</h3><p className="m-0 text-sm leading-relaxed text-gray-600">The coast reveals its character one small detail at a time. This readable article view gives every spread a clear structure, selectable text and room for the story to breathe.</p><h4 className="m-0 text-base font-semibold text-navy-800">Follow the shoreline</h4><p className="m-0 text-sm leading-relaxed text-gray-600">Accessible headings and descriptive image text help readers move through the article and help search engines understand what each page contains.</p></div><aside className="flex flex-col gap-3 border-l border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 max-[640px]:border-l-0 max-[640px]:border-t"><span className="font-semibold text-gray-700">READING OPTIONS</span><span>Text is selectable</span><span>Keyboard-friendly</span><span>Screen-reader structure</span><span className="mt-auto text-blue-700">Dark mode · Text size</span></aside></article>,
    },
    {
      id: "google",
      label: "In Google",
      panel: <div className="flex min-h-[300px] flex-col gap-5 p-6"><div className="rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-600 shadow-sm">Search: coastal travel journal fall issue</div><div className="flex flex-col gap-1 rounded-lg border border-blue-200 bg-blue-50 p-4"><span className="text-xs text-gray-600">Field Notes › issue-08 › coast</span><span className="text-lg leading-tight text-google-link">A slower way to see the coast | Field Notes</span><span className="text-sm leading-relaxed text-gray-600">Explore the shoreline in our autumn travel issue. Read the article, watch the film and discover the places that make this coast unforgettable.</span></div><p className="m-0 text-xs leading-relaxed text-gray-500">Readable article content, page metadata and social previews help your publication show up with useful context.</p></div>,
    },
  ];
  return (
    <Section padding="xl" id="seo-ready">
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12 max-[820px]:grid-cols-1">
        <div className="flex flex-col gap-4">
          <Eyebrow>SEARCH & ACCESSIBILITY</Eyebrow>
          <h2 className="m-0 text-h2 text-navy-800">Every flipbook is also an SEO-ready web page.</h2>
          <p className="m-0 text-base leading-[1.6] text-gray-600">Give every issue a readable URL, full metadata, social previews and an article reading mode with real, selectable text. Search engines and screen readers can understand more than a page image.</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm text-gray-700">
            <li>✓ Human-readable URLs and canonical links</li>
            <li>✓ Title, description, author and Open Graph data</li>
            <li>✓ Semantic headings, keyboard navigation and alt text</li>
            <li>✓ Reader controls for text size and dark mode</li>
          </ul>
          <Link href="/features/seo" className="mt-1 text-sm font-semibold">Explore publication SEO <span className="fas-arrow">→</span></Link>
        </div>
        <Reveal className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-frame">
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-100 px-3.5 py-2.5">
            <span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-gray-300"/><i className="h-2.5 w-2.5 rounded-full bg-gray-300"/><i className="h-2.5 w-2.5 rounded-full bg-gray-300"/></span>
            <span className="min-w-[120px] flex-1 truncate rounded-sm border border-gray-200 bg-white px-2.5 py-1.5 font-mono text-xs text-gray-700">fieldnotes.com/issue-08/coast</span>
          </div>
          <UnderlineTabs items={tabs} defaultValue="flipbook" label="Publication preview mode" className="[&_[role=tablist]]:border-b-0 [&_[role=tablist]]:bg-gray-100 [&_[role=tablist]]:px-3 [&_[role=tablist]]:pt-2 [&_[role=tabpanel]]:border-t [&_[role=tabpanel]]:border-gray-200" />
        </Reveal>
      </div>
    </Section>
  );
}

function BeforeAfterSection() {
  const [compare, setCompare] = useState(65);
  return (
    <Section tone="tinted" tint="gray" padding="xl">
      <div className="flex flex-col gap-7">
        <SectionHeader eyebrow="BEFORE & AFTER" title="From print to a live digital edition." lead="Your issue already exists as a PDF. Turn it into a tablet-ready edition with tappable pages, video and a read report." />
        <div className="relative min-h-[350px] overflow-hidden rounded-lg border border-gray-200 bg-cover bg-center shadow-frame max-[600px]:min-h-[300px]" style={{ backgroundImage: "url('/assets/desk-wood.png')" }}>
          <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
          <div className="absolute left-[9%] top-[22%] w-[22%] max-w-[190px] -rotate-6 rounded-sm bg-white p-3 shadow-float max-[600px]:left-[5%] max-[600px]:top-[22%] max-[600px]:w-[30%]">
            <div className="aspect-[3/4] bg-[linear-gradient(155deg,#b45309,#f59e0b_48%,#fef3c7)] p-3 text-white"><span className="text-[9px] font-bold tracking-widest">PRINT EDITION</span><strong className="mt-6 block text-xl leading-none">The fall issue</strong><span className="mt-3 block text-[9px]">PDF · FLAT PAGES</span></div>
          </div>
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden transition-[clip-path] duration-200" style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}>
            <div className="absolute right-[8%] top-[21%] w-[43%] max-w-[470px] rotate-2 rounded-[18px] border-[8px] border-slate-900 bg-slate-900 p-1.5 shadow-float max-[600px]:right-[4%] max-[600px]:top-[29%] max-[600px]:w-[52%]">
            <div className="flex aspect-[3/2] flex-col overflow-hidden rounded-lg bg-white">
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 font-mono text-[9px] text-blue-200"><span className="h-1.5 w-1.5 rounded-full bg-green-500"/>fieldnotes.com/issue-08</div>
              <div className="flex min-h-0 flex-1"><div className="flex flex-1 flex-col justify-between bg-[linear-gradient(145deg,#064e3b,#0f766e_65%,#99f6e4)] p-[6%] text-white"><span className="text-[8px] font-bold tracking-widest">FIELD NOTES</span><strong className="max-w-[8ch] text-[clamp(14px,2vw,24px)] leading-none">The places we return to</strong><span className="w-fit rounded bg-white/20 px-2 py-1 text-[8px]">INTERACTIVE EDITION</span></div><div className="flex flex-1 flex-col gap-2 p-[6%]"><span className="text-[8px] font-bold text-blue-600">TRAVEL · 8 MIN READ</span><strong className="text-[clamp(10px,1.5vw,17px)] leading-tight text-navy-800">A slower way to see the coast</strong><span className="h-1 rounded bg-gray-200"/><span className="h-1 w-4/5 rounded bg-gray-200"/><span className="mt-auto rounded-sm bg-blue-100 px-2 py-1 text-[8px] text-blue-700">Video · Link · Read report</span></div></div>
            </div>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-tile backdrop-blur">
            <span className="text-xs font-semibold text-gray-700">Print</span>
            <input aria-label="Reveal the interactive edition" aria-valuetext={`${compare}% of the digital edition revealed`} type="range" min="0" max="100" value={compare} onChange={(event) => setCompare(Number(event.target.value))} className="w-32 accent-blue-600" />
            <span className="text-xs font-semibold text-navy-800">Interactive</span>
          </div>
          <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-1 bg-blue-500 transition-[left]" style={{ left: `${compare}%` }} />
        </div>
      </div>
    </Section>
  );
}

function ReaderDemo() {
  const [active, setActive] = useState(0);
  const steps = [
    { label: "Open an issue", detail: "A fast reader on every screen", icon: "book" as const },
    { label: "Explore the pages", detail: "Flip, zoom and follow in-page links", icon: "link" as const },
    { label: "Scan and shop", detail: "QR codes and products connect the page to action", icon: "qr" as const },
    { label: "Measure the result", detail: "Reader activity and ad clicks in one dashboard", icon: "chart" as const },
  ];
  return (
    <Section tone="dark" padding="xl" id="reader-demo" className="overflow-hidden">
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-12 max-[850px]:grid-cols-1">
        <div className="flex flex-col gap-4">
          <Eyebrow dark>THE READER&apos;S SIDE</Eyebrow>
          <h2 className="m-0 text-h2 text-white">Pick an issue. Swipe. Scan. Shop.</h2>
          <p className="m-0 text-base leading-[1.6] text-blue-200">Every reader action can connect to the story, an advertiser and a useful report for your team.</p>
          <div className="mt-2 flex flex-col gap-2">
            {steps.map((step, i) => <button key={step.label} type="button" onClick={() => setActive(i)} aria-pressed={active === i} className={`grid cursor-pointer grid-cols-[32px_minmax(0,1fr)] items-center gap-3 rounded-lg border p-3 text-left transition-colors ${active === i ? "border-blue-400 bg-white/10" : "border-white/15 bg-transparent hover:bg-white/[.06]"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full ${active === i ? "bg-blue-500 text-white" : "bg-white/10 text-blue-200"}`}><Icon name={step.icon} size={15} /></span><span className="flex flex-col gap-0.5"><span className="text-sm font-semibold text-white">{step.label}</span><span className="text-xs text-slate-300">{step.detail}</span></span></button>)}
          </div>
          <Button href="/platform/analytics" variant="onDark" size="sm" className="mt-1 w-fit">Explore analytics</Button>
        </div>
        <Reveal className="relative mx-auto w-full max-w-[600px] rounded-[24px] border-[10px] border-slate-700 bg-slate-900 p-2 shadow-panel">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-slate-900 text-slate-200">
            <div className="flex h-8 items-center justify-between border-b border-slate-700 bg-navy-900 px-3 text-[10px]"><span className="font-semibold text-blue-100">Field Notes · Digital Editions</span><span className="font-mono text-slate-400">fieldnotes.com/issue-08</span></div>
            {active === 3 ? (
              <div className="flex h-[calc(100%-32px)] flex-col bg-ink-950 p-4"><div className="mb-3 flex items-center justify-between"><strong className="text-sm text-blue-100">Issue performance</strong><span className="inline-flex items-center gap-1.5 text-[10px] text-green-300"><span className="h-1.5 w-1.5 rounded-full bg-green-500"/>LIVE</span></div><div className="grid grid-cols-3 gap-2">{[["Readers", "2,480"], ["Ad clicks", "386"], ["Leads", "42"]].map(([label, value]) => <div key={label} className="rounded-md border border-slate-700 bg-navy-900 p-2"><span className="block text-[9px] text-slate-400">{label}</span><strong className="text-base text-white">{value}</strong></div>)}</div><div className="mt-4 flex flex-1 items-end gap-2 border-b border-slate-700 px-1">{[30, 54, 43, 66, 48, 82, 68, 100, 72, 86, 61, 92].map((height, i) => <span key={i} className="flex-1 rounded-t-sm bg-blue-400" style={{ height: `${height}%`, opacity: 0.38 + i * 0.04 }} />)}</div><span className="pt-2 text-[9px] text-slate-400">Reader activity by day · last 30 days</span></div>
            ) : active === 2 ? (
              <div className="flex h-[calc(100%-32px)] items-center justify-center bg-[radial-gradient(ellipse,#334155,#0f172a_70%)] p-5"><div className="flex w-full max-w-[290px] flex-col gap-3 rounded-lg bg-white p-3 text-gray-800 shadow-modal"><div className="flex items-center gap-3"><div className="h-14 w-12 rounded-sm bg-[linear-gradient(145deg,#9a3412,#f59e0b)]"/><span><strong className="block text-sm">A story with a next step</strong><span className="text-xs text-gray-500">Scan a page QR or shop an ad</span></span></div><span className="rounded-md bg-blue-500 py-2 text-center text-xs font-semibold text-white">Explore the offer</span></div></div>
            ) : (
              <div className="flex h-[calc(100%-32px)] items-center justify-center bg-[radial-gradient(ellipse,#334155,#0f172a_70%)] p-5"><div className="w-full max-w-[390px] rotate-[-1deg]"><BookSpread label="Digital issue preview" shadow="none" left={<div className="flex h-full flex-col justify-between bg-[linear-gradient(155deg,#12364c,#0c4a6e_58%,#0ea5e9)] p-[8%] text-white"><span className="text-[9px] font-bold tracking-widest">FIELD NOTES</span><strong className="max-w-[7ch] text-[clamp(18px,3vw,30px)] leading-none">The places we return to</strong><span className="rounded-sm bg-white/20 px-2 py-1 text-[8px]">AUTUMN ISSUE · 2026</span></div>} right={<div className="flex h-full flex-col gap-2 bg-white p-[8%]"><span className="text-[9px] font-bold text-blue-600">FEATURE · 8 MIN READ</span><strong className="text-[clamp(13px,2vw,20px)] leading-tight text-navy-800">A slower way to see the coast</strong><span className="h-1 rounded bg-gray-200"/><span className="h-1 w-4/5 rounded bg-gray-200"/><span className="h-1 w-5/6 rounded bg-gray-200"/><span className="mt-auto rounded-sm bg-blue-100 px-2 py-1 text-[8px] font-semibold text-blue-700">{active === 1 ? "Tap a link to explore →" : "Watch the film →"}</span></div>} /></div></div>
            )}
          </div>
          <span className="absolute -bottom-3 left-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-navy-800 shadow-tile">{steps[active].label}</span>
        </Reveal>
      </div>
    </Section>
  );
}

function CapabilitySection() {
  const features = [
    { category: "SELL", title: "Ad Adviser", copy: "Plan inventory and give advertisers a clearer view of their placement.", tone: "bg-amber-100 text-amber-800", href: "/platform/ad-manager" },
    { category: "PROVE", title: "Advertiser reports", copy: "Share page-level clicks and engagement alongside campaign results.", tone: "bg-blue-100 text-blue-700", href: "/platform/analytics" },
    { category: "CONNECT", title: "QR destinations", copy: "Carry a print reader from a page to a tracked digital experience.", tone: "bg-green-100 text-green-800", href: "/platform/qr" },
    { category: "CONVERT", title: "Shoppable pages", copy: "Link products and offers to the exact page that inspired the click.", tone: "bg-pink-100 text-pink-700", href: "/features/sales" },
    { category: "COLLABORATE", title: "Page-level approvals", copy: "Comment, assign and approve on the spread, with a clear activity trail.", tone: "bg-violet-100 text-violet-700", href: "/platform/collaboration" },
    { category: "DISCOVER", title: "Article mode & SEO", copy: "Make publication content readable, searchable and accessible.", tone: "bg-teal-100 text-teal-700", href: "/features/seo" },
  ];
  return (
    <Section padding="xl">
      <div className="flex flex-col gap-8">
        <SectionHeader eyebrow="WHAT ONLY FLIPANDSHARE DOES" title="Built for publishers who sell pages, not just share them." lead="Publishing tools connect the edition, the reader and the business behind every page." action={<Link href="/features" className="text-sm font-semibold">Browse all features <span className="fas-arrow">→</span></Link>} />
        <div className="grid grid-cols-3 gap-4 max-[800px]:grid-cols-2 max-[520px]:grid-cols-1">
          {features.map((feature, i) => <Reveal key={feature.title} delay={i * 0.06}><Link href={feature.href} className="group flex h-full min-h-[220px] flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-5 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"><span className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-blue-600 shadow-tile"><Icon name={["target", "chart", "qr", "cart", "users", "search"][i] as "target"} size={19}/></span><span className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-wider ${feature.tone}`}>{feature.category}</span></span><span className="text-lg font-bold leading-tight text-navy-800">{feature.title}</span><span className="text-body-sm leading-relaxed text-gray-600">{feature.copy}</span><span className="mt-auto text-sm font-semibold text-blue-600">Learn more <span className="fas-arrow">→</span></span></Link></Reveal>)}
        </div>
      </div>
    </Section>
  );
}

function PricingSection() {
  return (
    <Section tone="tinted" tint="gray" padding="xl" id="pricing-preview">
      <div className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_minmax(320px,.9fr)] items-center gap-10 max-[760px]:grid-cols-1">
        <div className="flex flex-col gap-4">
          <Eyebrow>PRICING</Eyebrow>
          <h2 className="m-0 text-h2 text-navy-800">Professional publishing without enterprise pricing.</h2>
          <p className="m-0 max-w-[520px] text-base leading-[1.6] text-gray-600">Start free with one publication. Upgrade when you need more editions, sales tools or a larger team. No credit card to begin.</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm text-gray-700"><li>✓ One publication free for the first month</li><li>✓ Article mode and SEO on every plan</li><li>✓ Upgrade or cancel any time</li></ul>
          <Button href="/pricing" variant="light" iconRight="arrow" className="mt-1 w-fit">Compare plans</Button>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-float">
          <span className="text-base font-bold text-navy-800">A plan for the way you publish</span>
          {["One title or publication", "A growing publisher", "A publishing group"].map((label, i) => <div key={label} className="flex items-center gap-3 rounded-md border border-gray-200 p-3"><span className={`h-3 w-3 rounded-full ${i === 1 ? "bg-blue-500" : "bg-gray-300"}`} /><span className="text-sm font-semibold text-gray-700">{label}</span>{i === 1 && <span className="ml-auto text-xs font-semibold text-blue-600">Popular</span>}</div>)}
          <Button href="/pricing" fullWidth>Find your plan</Button>
          <span className="text-center text-xs text-gray-500">No card required to start. Cancel any time.</span>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1100px] flex-wrap items-center justify-between gap-5 rounded-lg border border-violet-200 bg-[linear-gradient(110deg,#f5f3ff,#faf5ff_55%,#fff)] px-7 py-6">
        <div className="flex items-center gap-4"><span className="flex -space-x-3" aria-hidden="true">{[["DL", "bg-blue-500"], ["MR", "bg-amber-500"], ["JK", "bg-violet-500"]].map(([initials, tone]) => <span key={initials} className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white ${tone} text-xs font-bold text-white`}>{initials}</span>)}</span><span className="flex flex-col gap-1"><strong className="text-base text-navy-800">Talk to a publishing specialist</strong><span className="text-sm text-gray-600">Get a walkthrough built around your titles and team.</span></span></div>
        <div className="flex flex-wrap items-center gap-3"><a href="tel:+19544624579" className="text-sm font-semibold text-navy-800">+1 (954) 462-4579</a><Button href="/demo" variant="violet" iconRight="arrow">Talk to Sales</Button></div>
      </div>
    </Section>
  );
}

function ClosingSection() {
  return (
    <Section tone="tinted" tint="gray" padding="none" paddingClassName="px-8 pb-[88px] max-sm:px-5 max-sm:pb-14">
      <Reveal className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 rounded-lg border border-blue-200 bg-[linear-gradient(120deg,#e0f2fe,#f0f9ff_55%,#ecfeff)] px-12 py-10 text-navy-800 max-sm:px-6 max-sm:py-8">
        <div className="flex max-w-[680px] flex-col gap-2"><h2 className="m-0 text-[clamp(24px,3vw,32px)] leading-tight font-bold">Your next issue, live in ten minutes.</h2><p className="m-0 text-base leading-relaxed text-slate-700">Upload the PDF you already have. Your first publication is free for a month, with no credit card required.</p></div>
        <div className="flex flex-col items-start gap-2"><Button href="/signup" size="xl" glow iconLeft="upload">Create your free account</Button><Link href="/demo" className="text-xs font-medium text-gray-600">Or book a 20-minute walkthrough</Link></div>
      </Reveal>
    </Section>
  );
}

export function HomeExperience() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ProcessSection />
      <PublicationTimeline />
      <SeoDemo />
      <BeforeAfterSection />
      <ReaderDemo />
      <CapabilitySection />
      <PricingSection />
      <Section padding="xl" className="border-t border-gray-200">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-12 max-[820px]:grid-cols-1 max-[820px]:gap-6">
          <div className="sticky top-[90px] flex flex-col gap-3.5 max-[820px]:static"><Eyebrow>BEFORE YOU UPLOAD</Eyebrow><h2 className="m-0 text-h2 text-navy-800">The questions publishers ask first.</h2><p className="m-0 text-body-sm leading-relaxed text-gray-600">Anything else, ask us. A person answers within one business day.</p><Link href="/demo" className="mt-1 text-sm font-semibold">Talk to the publishing team <span className="fas-arrow">→</span></Link></div>
          <Accordion items={FAQS} variant="divided" headingLevel={3} />
        </div>
      </Section>
      <ClosingSection />
    </>
  );
}