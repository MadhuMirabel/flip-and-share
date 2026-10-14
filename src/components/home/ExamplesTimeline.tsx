"use client";

import Link from "next/link";
import { useRef, useState, type UIEvent } from "react";
import { Container } from "@/components/ui/Container";
import { COVERS } from "@/lib/covers";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const KINDS = ["Magazine", "Catalog", "Brochure", "Report", "Portfolio", "E-book", "Annual report", "Newsletter", "Prospectus", "Guide"];
const COUNTS = [3, 2, 4, 3, 2, 3, 4, 2, 3];
// Prototype EXPUBS titles, index-aligned with COVERS.
const TITLES = [
  "Parenting OC", "RV News", "Aberdeen Magazine", "L.A. Parent", "Out & About Wisconsin", "BankBeat",
  "Texas Saltwater Fishing", "Moonshine Ink", "Courier News", "Specialty Crop Grower", "Merritt Island Select", "Irondale Community Guide",
];
const OFFSET = 0; // prototype heroSet[0] of the first hero set

const ISSUES = COUNTS.map((count, mi) => ({
  idx: mi,
  name: MONTHS[mi],
  count,
  items: Array.from({ length: count }, (_, j) => {
    const ci = (OFFSET + mi * 3 + j) % COVERS.length;
    return {
      name: TITLES[ci],
      sub: `${KINDS[(mi * 2 + j) % KINDS.length]} · ${MONTHS[mi].slice(0, 3)} ${4 + j * 9}, 2026`,
      cover: COVERS[ci],
    };
  }),
}));

/** "One platform. Every publication." month ruler plus the scrolling rows of example covers. */
export function ExamplesTimeline() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const row = rowRef.current;
    const el = row?.querySelector<HTMLElement>(`[data-tlmonth="${i}"]`);
    if (row && el) row.scrollTo({ left: el.offsetLeft - row.offsetLeft - 4, behavior: "smooth" });
  };

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const row = e.currentTarget;
    const x = row.scrollLeft + 24;
    let best = 0;
    row.querySelectorAll<HTMLElement>("[data-tlmonth]").forEach((el) => {
      if (el.offsetLeft - row.offsetLeft <= x) best = Number(el.dataset.tlmonth);
    });
    setActive(best);
  };

  return (
    <section>
      <Container className="pt-10 pb-[88px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="m-0 mb-2 text-[38px] leading-[1.1] font-bold tracking-[-0.025em] text-navy-800 max-sm:text-[30px]">
              One platform. Every publication.
            </h2>
            <p className="m-0 text-base text-gray-600">
              Catalogs, brochures, magazines, reports, portfolios, e-books, annual reports and real-estate brochures.
            </p>
          </div>
          <Link href="/store" className="text-sm font-semibold">
            See all examples →
          </Link>
        </div>
        <div className="flex flex-col gap-[22px]">
          <div className="no-scrollbar relative overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 bg-white px-4 pt-3">
            <div className="relative grid h-14 min-w-[560px] grid-cols-12">
              {MONTHS.map((n, i) => {
                const has = i < COUNTS.length;
                const on = i === active;
                const cls = "relative flex h-14 flex-col justify-end border-l-2 pl-1.5 text-left";
                const style = { borderLeftColor: on ? "var(--color-blue-500)" : has ? "var(--color-slate-300)" : "var(--color-slate-100)" };
                const inner = (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 h-3.5 w-full opacity-90"
                      style={{ backgroundImage: "repeating-linear-gradient(90deg,#e5e7eb 0 1px,transparent 1px 25%)" }}
                    />
                    <span
                      className={`leading-none transition-all duration-300 ${on ? "text-sm font-bold text-navy-800" : `text-small font-medium ${has ? "text-gray-500" : "text-slate-300"}`}`}
                    >
                      {n.slice(0, 3)}
                    </span>
                    <span className="mt-[3px] mb-2 text-2xs text-gray-400">{has ? `${COUNTS[i]} issues` : "—"}</span>
                  </>
                );
                return has ? (
                  <button
                    key={n}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${n}, ${COUNTS[i]} issues`}
                    aria-current={on ? "true" : undefined}
                    className={`${cls} cursor-pointer`}
                    style={style}
                  >
                    {inner}
                  </button>
                ) : (
                  <span key={n} aria-hidden="true" className={cls} style={style}>
                    {inner}
                  </span>
                );
              })}
              <span
                aria-hidden="true"
                className="absolute bottom-0 h-[3px] w-[calc(100%/12)] rounded-sm bg-blue-500 transition-[left] duration-[450ms] ease-fas"
                style={{ left: `calc(100% / 12 * ${active})` }}
              />
            </div>
          </div>
          <div
            ref={rowRef}
            onScroll={onScroll}
            className="flex snap-x snap-proximity gap-14 overflow-x-auto px-1 pt-2 pb-5"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--color-blue-200) transparent" }}
          >
            {ISSUES.map((mo) => (
              <div key={mo.name} data-tlmonth={mo.idx} className="flex flex-none snap-start flex-col gap-3.5">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="m-0 text-h3 leading-normal font-bold tracking-[-0.02em] text-navy-800">{mo.name}</h3>
                  <span className="text-label text-gray-500">{mo.count} issues</span>
                </div>
                <div className="flex gap-[22px]">
                  {mo.items.map((u) => (
                    <Link
                      key={u.name + u.sub}
                      href="/store"
                      className="flex w-[200px] flex-col gap-2 transition-transform duration-150 hover:-translate-y-[3px]"
                    >
                      <div
                        role="img"
                        aria-label={`${u.name} example`}
                        className="aspect-[3/4] rounded-sm bg-gray-200 bg-cover bg-center shadow-cover"
                        style={{ backgroundImage: `url(${u.cover})` }}
                      />
                      <span className="text-sm leading-[1.3] font-semibold text-navy-700">{u.name}</span>
                      <span className="-mt-1 text-[12px] text-gray-500">{u.sub}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
