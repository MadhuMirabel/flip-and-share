import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import type { CtaArtKind } from "@/components/sections/CtaArt";
import { HERO_ACCENT, HERO_GLOW, PageHero, USE_CASE_HERO_BG } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqSection } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { USE_CASES_CONTENT, USE_CASES_INDUSTRY } from "@/lib/nav";
import { SITE } from "@/lib/site";

/** Everything a use-case page needs (prototype `USE[k]`, L3340–3360). */
export type UseCaseDetail = {
  /** Which hero gradient and "Explore other" list this belongs to. */
  group: "industry" | "content";
  /** Mono label next to the back link, e.g. "BY INDUSTRY". */
  groupLabel: string;
  /** Route slug, used to leave this page out of "Explore other use cases". */
  slug: string;
  /** Lower-case noun for "Common questions from …". */
  short: string;
  title: string;
  lead: string;
  proof: string[];
  heroScene: ReactNode;
  stats: { value: string; label: string; icon: IconName }[];
  painTitle: string;
  pain: string;
  blocks: { tag: string; title: string; description: string; points: string[]; scene: ReactNode; link: { label: string; href: string } }[];
  example: { cover: string; title: string; description: string };
  quote: { text: string; who: string };
  howTitle: string;
  steps: { title: string; description: string; time: string }[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  art: CtaArtKind;
};

/** Stat tiles cycle blue / amber / green (prototype `P` palette). */
const STAT_TONES = [
  { badge: "OUTCOME", card: "border-blue-200", bubble: "bg-blue-100", chip: "bg-blue-100 text-blue-700", bar: "bg-blue-700" },
  { badge: "BUILT IN", card: "border-amber-200", bubble: "bg-amber-100", chip: "bg-amber-100 text-amber-700", bar: "bg-amber-700" },
  { badge: "PROOF", card: "border-green-200", bubble: "bg-green-100", chip: "bg-green-100 text-green-700", bar: "bg-green-700" },
] as const;

const shell = "mx-auto max-w-page px-8 max-sm:px-5";
const h2 = "m-0 text-[clamp(26px,3.4vw,36px)] leading-[1.12] font-bold tracking-[-0.025em] text-navy-800";

/** Shared layout for the /use-cases/* pages: hero + scene, problem, stat tiles, alternating blocks, example + quote, steps, FAQ, other use cases, CTA. */
export function UseCaseDetailPage({ d }: { d: UseCaseDetail }) {
  const others = [...USE_CASES_INDUSTRY, ...USE_CASES_CONTENT].filter((o) => !o.href.endsWith(`/${d.slug}`));
  return (
    <>
      <PageHero
        glow={HERO_GLOW.usecase}
        eyebrowColor={HERO_ACCENT.usecase}
        eyebrow={d.groupLabel}
        title={d.title}
        titleSize="md"
        layout="split"
        padding="even"
        background={USE_CASE_HERO_BG[d.group]}
        lead={d.lead}
        leadMaxWidth={560}
        gap={18}
        aside={
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
            <div className="absolute inset-0">{d.heroScene}</div>
          </div>
        }
        above={
          <Link href="/use-cases" className="text-label font-semibold text-blue-300 hover:text-blue-200">
            ← All use cases
          </Link>
        }
      >
        <div className="flex flex-wrap gap-2.5">
          <Button href="/signup" variant="primary" size="lg" glow>
            Create for Free
          </Button>
          <Button href="/demo" variant="onDark" size="lg">
            Watch the 60-second demo
          </Button>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-body-sm text-blue-200">
          {d.proof.map((p) => (
            <li key={p}>✓ {p}</li>
          ))}
        </ul>
      </PageHero>

      <section aria-labelledby="pain-title" className={`${shell} flex flex-col gap-3.5 pt-[72px]`}>
        <Eyebrow>THE PROBLEM TODAY</Eyebrow>
        <h2 id="pain-title" className={`${h2} max-w-[820px]`}>
          {d.painTitle}
        </h2>
        <p className="m-0 max-w-[720px] text-base leading-[1.6] text-gray-600">{d.pain}</p>
      </section>

      <section aria-label="With FlipAndShare" className={`${shell} flex flex-col gap-[26px] pt-[60px]`}>
        <Eyebrow>WITH FLIPANDSHARE</Eyebrow>
        <ul className="m-0 grid list-none grid-cols-3 gap-7 p-0 max-md:grid-cols-1 max-md:gap-4">
          {d.stats.map((s, i) => {
            const t = STAT_TONES[i % STAT_TONES.length];
            return (
              <Reveal
                key={s.label}
                as="li"
                delay={i * 0.1}
                className={`relative flex flex-col gap-2 overflow-hidden rounded-lg border bg-white px-[18px] pt-4 pb-3.5 shadow-lift ${t.card}`}
              >
                <span aria-hidden="true" className={`absolute -top-[22px] -right-[22px] h-20 w-20 rounded-full opacity-70 blur-[2px] ${t.bubble}`} />
                <span className="relative flex items-center justify-between">
                  <span aria-hidden="true" className={`flex h-[30px] w-[30px] items-center justify-center rounded-md ${t.chip}`}>
                    <Icon name={s.icon} size={14} />
                  </span>
                  <span className={`rounded-full px-[7px] py-0.5 text-[10px] font-bold tracking-[0.08em] ${t.chip}`}>{t.badge}</span>
                </span>
                <span className="relative text-[clamp(22px,2.3vw,26px)] leading-none font-bold tracking-[-0.03em] text-navy-900">{s.value}</span>
                <span className="relative text-label leading-[1.4] text-gray-600">{s.label}</span>
                <span aria-hidden="true" className={`h-[3px] w-9 rounded-[2px] opacity-60 ${t.bar}`} />
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section aria-label={`${d.short}: what you get`} className={`${shell} flex flex-col gap-[72px] pt-14`}>
        {d.blocks.map((b, i) => (
          <Reveal key={b.title} className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-12">
            <div className={`flex flex-col gap-3.5 ${i % 2 ? "order-2 max-md:order-1" : ""}`}>
              <Eyebrow>
                {`0${i + 1}`} · {b.tag}
              </Eyebrow>
              <h2 className="m-0 text-[30px] leading-[1.15] font-bold tracking-[-0.025em] text-navy-800">{b.title}</h2>
              <p className="m-0 text-[15.5px] leading-[1.6] text-gray-600">{b.description}</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {b.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[14.5px] leading-[1.5] text-gray-700">
                    <span aria-hidden="true" className="font-bold text-green-600">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href={b.link.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                {b.link.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <div
              className={`relative aspect-[4/3] ${i % 2 ? "order-1 max-md:order-2" : ""}`}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, color-mix(in srgb, var(--color-blue-400) 14%, transparent), color-mix(in srgb, var(--color-blue-100) 50%, transparent) 45%, transparent 72%)",
              }}
            >
              <div className="absolute inset-0">{b.scene}</div>
            </div>
          </Reveal>
        ))}
      </section>

      <section aria-label="Example publication and customer quote" className="mt-[72px] border-y border-gray-200 bg-slate-50 py-[72px]">
        <div className={`${shell} grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10`}>
          <Reveal className="flex items-start gap-[22px]">
            <span
              aria-hidden="true"
              className="block aspect-[3/4] w-[120px] flex-none rounded-sm shadow-[0_20px_40px_-18px_rgba(12,74,110,.5)]"
              style={{ background: `var(--color-gray-200) url(${d.example.cover}) center/cover` }}
            />
            <div className="flex flex-col gap-2.5">
              <Eyebrow>EXAMPLE PUBLICATION</Eyebrow>
              <span className="text-xl font-bold tracking-[-0.01em] text-navy-800">{d.example.title}</span>
              <span className="text-sm leading-[1.5] text-gray-500">{d.example.description}</span>
              <Link href="/store" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                Browse more in the Store →
              </Link>
            </div>
          </Reveal>
          <Reveal as="figure" className="relative m-0 flex flex-col gap-3.5 rounded-lg border border-gray-200 bg-white px-7 py-[26px]">
            <span aria-hidden="true" className="absolute top-2 left-[22px] font-serif text-[56px] leading-none text-blue-200">
              “
            </span>
            <blockquote className="relative m-0 text-[17px] leading-[1.55] text-gray-900">{d.quote.text}</blockquote>
            <figcaption className="text-[13.5px] text-gray-500">{d.quote.who}</figcaption>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="how-title" className={`${shell} flex flex-col gap-7 pt-[72px]`}>
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 id="how-title" className={h2}>
            {d.howTitle}
          </h2>
        </div>
        <ol className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-md:grid-cols-1">
          {d.steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.08} className="flex flex-col gap-2.5 rounded-lg border border-gray-200 bg-white p-[22px]">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-navy-800 text-[13px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-xs text-gray-400">{s.time}</span>
              </div>
              <span className="text-base font-bold text-navy-800">{s.title}</span>
              <span className="text-sm leading-[1.55] text-gray-600">{s.description}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <FaqSection
        className={`${shell} pt-[72px]`}
        layout="auto"
        eyebrow="QUESTIONS"
        title={`Common questions from ${d.short}.`}
        contact={
          <>
            Still unsure? Call{" "}
            <a href={SITE.phoneHref} className="font-semibold text-blue-600 hover:text-blue-700">
              {SITE.phone}
            </a>{" "}
            or email{" "}
            <a href={SITE.emailHref} className="font-semibold text-blue-600 hover:text-blue-700">
              {SITE.email}
            </a>
            .
          </>
        }
        items={d.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      <section aria-labelledby="others-title" className={`${shell} flex flex-col gap-4 pt-[72px]`}>
        <h2 id="others-title" className="m-0 font-mono text-eyebrow font-semibold tracking-eyebrow text-gray-500 uppercase">
          EXPLORE OTHER USE CASES
        </h2>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {others.map((o) => (
            <li key={o.href}>
              <Link
                href={o.href}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-[9px] text-[13.5px] font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                {o.icon && (
                  <span aria-hidden="true" className="inline-flex text-blue-600">
                    <Icon name={o.icon} size={14} />
                  </span>
                )}
                {o.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCtaBanner art={d.art} title={d.ctaTitle} subtitle={d.ctaSubtitle} titleSize="fluidLg" sectionPadding="spaced" />
    </>
  );
}
