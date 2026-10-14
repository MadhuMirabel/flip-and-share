import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import type { CtaArtKind } from "@/components/sections/CtaArt";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqSection } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

/** Everything a feature-detail page needs (prototype `FEAT[k]` + `FEAT_X[k]`, L3286–3400). */
export type FeatureDetail = {
  /** Eyebrow, e.g. "FULLSCREEN SHARING". */
  label: string;
  title: string;
  lead: string;
  /** Plan note on the secondary hero button ("Included on every plan"). */
  plan: string;
  /** Hero visual (the `fd.t*` demo). */
  demo: ReactNode;
  stats: { value: string; label: string; icon: IconName }[];
  blocks: { tag: string; title: string; description: string; points: string[]; scene: ReactNode }[];
  howTitle: string;
  steps: { title: string; description: string; time: string }[];
  without: { icon: IconName; heading: string; points: string[] };
  withFas: { icon: IconName; heading: string; points: string[] };
  /** Lower-case noun for "Common questions about …". */
  short: string;
  faqs: { question: string; answer: string }[];
  related: { title: string; icon: IconName; href: string }[];
  art: CtaArtKind;
};

/** Related-card palettes cycle through six tints (prototype `D.rel` map). */
const RELATED_TONES = [
  "border-blue-200 bg-blue-100 text-blue-700",
  "border-amber-200 bg-amber-100 text-amber-700",
  "border-violet-200 bg-violet-100 text-violet-700",
  "border-green-200 bg-green-100 text-green-700",
  "border-pink-200 bg-pink-100 text-pink-700",
  "border-teal-200 bg-teal-100 text-teal-700",
] as const;

const shell = "mx-auto max-w-page px-8 max-sm:px-5";

function Tick({ tone, mark }: { tone: "green" | "gray"; mark: string }) {
  return (
    <span aria-hidden="true" className={`font-bold ${tone === "green" ? "text-green-600" : "text-gray-300"}`}>
      {mark}
    </span>
  );
}

/** Shared layout for the eight /features/* pages: hero + demo, stats strip, alternating blocks, steps, before/after, FAQ, related, CTA. */
export function FeatureDetailPage({ d }: { d: FeatureDetail }) {
  return (
    <>
      <PageHero
        glow={HERO_GLOW.feature}
        eyebrowColor={HERO_ACCENT.feature}
        title={d.title}
        titleSize="md"
        layout="split"
        splitMinCol={340}
        splitGap={40}
        padding="feature"
        background="var(--color-ink-950)"
        lead={d.lead}
        leadMaxWidth={540}
        aside={d.demo}
        eyebrow={d.label}
        above={
          <Link href="/features" className="text-label font-semibold text-blue-300 hover:text-blue-200">
            ← All features
          </Link>
        }
      >
        <div className="flex flex-wrap gap-2.5">
          <Button href="/signup" variant="primary" size="lg" glow>
            Create for Free
          </Button>
          <Button href="/pricing" variant="onDark" size="lg">
            {d.plan}
          </Button>
        </div>
      </PageHero>

      <section aria-label="Key numbers" className={`${shell} pt-16`}>
        <Reveal>
          <ul className="m-0 grid list-none grid-cols-3 rounded-lg border border-gray-200 bg-white p-0 shadow-lift max-sm:grid-cols-1">
            {d.stats.map((s, i) => (
              <li
                key={s.label}
                className={`flex items-center gap-3.5 px-6 py-[22px] ${i ? "border-l border-gray-200 max-sm:border-l-0 max-sm:border-t" : ""}`}
              >
                <span aria-hidden="true" className="inline-flex flex-none text-blue-600">
                  <Icon name={s.icon} size={20} />
                </span>
                <div className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[clamp(22px,2.3vw,26px)] leading-none font-bold tracking-[-0.03em] text-navy-900">{s.value}</span>
                  <span className="text-label leading-[1.4] text-gray-500">{s.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-label={`${d.short} in detail`} className={`${shell} flex flex-col gap-[72px] pt-20`}>
        {d.blocks.map((b, i) => (
          <Reveal key={b.title} className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-11">
            <div className={`flex flex-col gap-3.5 ${i % 2 ? "order-2 max-md:order-1" : ""}`}>
              <Eyebrow>
                {`0${i + 1}`} · {b.tag}
              </Eyebrow>
              <h2 className="m-0 text-[clamp(24px,3vw,32px)] leading-[1.15] font-bold tracking-[-0.025em] text-navy-800">{b.title}</h2>
              <p className="m-0 text-[15.5px] leading-[1.6] text-gray-600">{b.description}</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {b.points.map((p) => (
                  <li key={p} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-body-sm leading-[1.5] text-gray-700">
                    <Tick tone="green" mark="✓" />
                    {p}
                  </li>
                ))}
              </ul>
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

      <section aria-labelledby="how-title" className={`${shell} flex flex-col gap-[26px] pt-20`}>
        <div className="flex max-w-[720px] flex-col gap-2.5">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 id="how-title" className="m-0 text-[clamp(24px,3vw,32px)] leading-[1.15] font-bold tracking-[-0.025em] text-navy-800">
            {d.howTitle}
          </h2>
        </div>
        <ol className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-md:grid-cols-1">
          {d.steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.08} className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[22px]">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="rounded-full bg-blue-100 px-[9px] py-[3px] text-[11.5px] font-bold text-blue-800">{s.time}</span>
              </div>
              <span className="text-[15.5px] leading-[1.3] font-bold text-navy-800">{s.title}</span>
              <span className="text-body-sm leading-[1.55] text-gray-600">{s.description}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-label="Without and with FlipAndShare" className={`${shell} pt-20`}>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex flex-col gap-3 border-r border-gray-200 bg-slate-50 px-[30px] py-7 max-md:border-b max-md:border-r-0">
            <Eyebrow tone="light" className="text-gray-400">
              WITHOUT
            </Eyebrow>
            <span className="flex items-center gap-2.5 text-[17px] font-bold text-gray-500">
              <span aria-hidden="true" className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-md bg-gray-200 text-gray-500">
                <Icon name={d.without.icon} size={17} />
              </span>
              {d.without.heading}
            </span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {d.without.points.map((p) => (
                <li key={p} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-body-sm leading-[1.5] text-gray-500">
                  <Tick tone="gray" mark="✕" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 bg-white px-[30px] py-7">
            <Eyebrow>WITH FLIPANDSHARE</Eyebrow>
            <span className="flex items-center gap-2.5 text-[17px] font-bold text-navy-800">
              <span aria-hidden="true" className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-md bg-blue-100 text-blue-600">
                <Icon name={d.withFas.icon} size={17} />
              </span>
              {d.withFas.heading}
            </span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {d.withFas.points.map((p) => (
                <li key={p} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-body-sm leading-[1.5] text-gray-700">
                  <Tick tone="green" mark="✓" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <FaqSection
        className={`${shell} pt-20`}
        layout="auto"
        eyebrow="QUESTIONS"
        title={`Common questions about ${d.short}.`}
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

      <section aria-labelledby="related-title" className={`${shell} flex flex-col gap-[18px] pt-[72px]`}>
        <h2 id="related-title" className="m-0 text-lg font-bold text-navy-800">
          Related features
        </h2>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-3.5 p-0">
          {d.related.map((r, i) => {
            const tone = RELATED_TONES[i % RELATED_TONES.length];
            const [border, bg, text] = tone.split(" ");
            return (
              <li key={r.title} className="flex">
                <Link
                  href={r.href}
                  className={`flex w-full items-center gap-3 rounded-lg border p-[18px] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-card-hover ${border} ${bg} ${text}`}
                >
                  <span aria-hidden="true" className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-white shadow-tile">
                    <Icon name={r.icon} size={16} />
                  </span>
                  <span className="text-[14.5px] font-semibold text-navy-800">{r.title}</span>
                  <span aria-hidden="true" className="ml-auto">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ClosingCtaBanner
        art={d.art}
        title="Try it on your next issue."
        subtitle="Free account, no credit card."
        titleSize="fluidLg"
        sectionPadding="spaced"
      />
    </>
  );
}
