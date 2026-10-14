import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SAMPLE_PAGES } from "@/lib/covers";

const GRID = "mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10";
const H3 = "m-0 text-[26px] leading-[1.15] tracking-[-0.02em] text-navy-800";
const LEAD = "m-0 text-base leading-[1.6] text-gray-600";
const AI_TAGS = ["Mars Express", "ESA", "Planetary science", "Orbiter", "Space exploration", "Feature article"];

/** Homepage "Your team, faster": collaboration block, then the AI & automation block. */
export function TeamSection() {
  return (
    <>
      <section className="box-border border-t border-gray-200 bg-white px-8 pt-20 max-sm:px-5">
        <div className="mx-auto mb-2 flex max-w-page flex-col gap-3">
          <Eyebrow>YOUR TEAM, FASTER</Eyebrow>
          <h2 className="m-0 max-w-[720px] text-[clamp(30px,4vw,40px)] leading-[1.1] tracking-[-0.03em] text-navy-800">
            Less chasing. The team and the software do the busywork.
          </h2>
        </div>
        <div className={GRID}>
          <div className="flex flex-col gap-3.5">
            <Eyebrow>COLLABORATION</Eyebrow>
            <h3 className={H3}>Comment on the page, not in an email thread.</h3>
            <p className={LEAD}>
              Pin a comment to the exact spot, assign it, approve the spread. Two sign-offs guard the publish button, and
              every action is logged.
            </p>
            <Link href="/platform/collaboration" className="text-sm font-semibold">
              See how teams work in FlipAndShare →
            </Link>
          </div>
          <Reveal className="relative flex justify-center">
            <div
              className="relative flex aspect-[3/2] w-full max-w-[440px]"
              style={{ boxShadow: "0 30px 60px -24px rgba(12,74,110,.5)" }}
            >
              <div
                className="flex-1 rounded-l-sm bg-white bg-cover bg-top"
                style={{ backgroundImage: `url(${SAMPLE_PAGES.page8})` }}
              />
              <div
                className="flex-1 rounded-r-sm border-l border-black/[.08] bg-white bg-cover bg-top"
                style={{ backgroundImage: `url(${SAMPLE_PAGES.page41})` }}
              />
              <div
                aria-hidden="true"
                className="absolute left-[22%] top-[38%] h-[26px] w-[26px] border-2 border-white bg-amber-500"
                style={{
                  transform: "translate(-50%,-100%)",
                  rotate: "-45deg",
                  borderRadius: "50% 50% 50% 0",
                  boxShadow: "0 6px 14px rgba(0,0,0,.3)",
                }}
              />
              <div
                className="absolute left-[24%] top-[40%] flex max-w-[230px] items-start gap-2 rounded-lg bg-white px-3 py-2.5"
                style={{ boxShadow: "0 14px 30px -12px rgba(0,0,0,.35)", animation: "fasSlideIn .5s ease-out .3s both" }}
              >
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                  PS
                </span>
                <span className="text-xs leading-[1.45] text-gray-700">
                  <b>Priya S</b> Swap this ad for the Harbour Motors full page. <span className="text-blue-600">@Dana</span>
                </span>
              </div>
              <div
                className="absolute bottom-[10%] right-[6%] rounded-full bg-green-600 px-3 py-[7px] text-xs font-bold text-white"
                style={{
                  boxShadow: "0 10px 24px -10px rgba(22,163,74,.7)",
                  animation: "fasPop .5s cubic-bezier(.2,.8,.2,1) 1.1s both",
                }}
              >
                ✓ Approved · Mark T
              </div>
              <div aria-hidden="true" className="absolute left-[58%] top-[62%]" style={{ animation: "fasCursor 6s ease-in-out infinite" }}>
                <svg width="18" height="22" viewBox="0 0 18 22">
                  <path d="M1 1l6 18 3-7 7-3z" fill="#111827" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="box-border bg-white px-8 pb-20 pt-12 max-sm:px-5">
        <div className={GRID}>
          <Reveal className="relative order-1 flex flex-col gap-3 rounded-lg border border-violet-100 bg-[#faf5ff] p-[22px]">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-700">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-violet-600"
                style={{ animation: "fasBlink 1s step-end infinite" }}
              />
              DRAFTED FROM page-08.pdf · 4s
            </div>
            <div className="flex flex-wrap gap-1.5">
              {AI_TAGS.map((name, i) => (
                <span
                  key={name}
                  className="rounded-full border border-violet-200 bg-white px-2.5 py-[5px] text-small font-semibold text-violet-900"
                  style={{ animation: "fasPop .35s cubic-bezier(.2,.8,.2,1) both", animationDelay: `${i * 0.1}s` }}
                >
                  {name}
                </span>
              ))}
            </div>
            <div className="rounded-md border border-violet-100 bg-white px-3.5 py-3 text-[13.5px] leading-[1.55] text-gray-700">
              ESA&apos;s Mars Express marks over a decade in orbit, mapping the Red Planet&apos;s surface and probing its
              atmosphere from above.
            </div>
            <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-2.5 text-small text-gray-700">
              <span
                aria-hidden="true"
                className="h-10 w-10 rounded-sm bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url(${SAMPLE_PAGES.page8})` }}
              />
              <span>
                <b className="text-violet-700">Alt:</b> Orbital view of the rust-coloured Martian surface with a deep canyon
                cutting across it.
              </span>
            </div>
          </Reveal>
          <div className="order-2 flex flex-col gap-3.5">
            <Eyebrow>AI &amp; AUTOMATION</Eyebrow>
            <h3 className={H3}>Tags, summaries and alt text, drafted before you finish uploading.</h3>
            <p className={LEAD}>
              Every page is read, tagged and described the moment it lands. You approve with one click, and the whole issue
              is searchable, accessible and ready for social.
            </p>
            <Link href="/platform/ai" className="text-sm font-semibold">
              Try the AI demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
