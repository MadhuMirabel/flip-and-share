"use client";

import { useState } from "react";
import { useToast } from "@/components/site/Providers";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { COVERS, SAMPLE_PAGES } from "@/lib/covers";

const SHOP = [
  { name: "Linen overshirt", sku: "LN-2026-OS", price: "$129", desc: "Garment-dyed European linen, relaxed fit. Six seasonal colours.", x: "22%", y: "30%" },
  { name: "Canvas weekender", sku: "CV-WK-04", price: "$168", desc: "Waxed canvas with leather handles. Fits a 15-inch laptop.", x: "64%", y: "52%" },
  { name: "Suede loafers", sku: "SD-LF-11", price: "$210", desc: "Hand-stitched suede on a flexible leather sole.", x: "38%", y: "78%" },
];

const SHARE = ["f", "in", "X", "@"];
const cover = (i: number) => COVERS[i % COVERS.length];

/** "Shop this page": tap a product pin on the spread to open its product card (prototype L2160–2174). */
export function ShopThisPage() {
  const toast = useToast();
  const [open, setOpen] = useState<number | null>(null);
  const cur = open != null ? SHOP[open] : null;
  const imgs = open != null ? [0, 1, 2, 3].map((j) => cover(open * 4 + 2 + j)) : [];

  return (
    <section aria-labelledby="shop-title" className="border-t border-gray-200 bg-slate-50 px-8 py-20 max-sm:px-5">
      <div className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12">
        <div className="flex flex-col gap-3.5">
          <Eyebrow>NEW · SHOP THIS PAGE</Eyebrow>
          <h2 id="shop-title" className="m-0 text-[clamp(28px,3.6vw,38px)] font-bold leading-[1.12] tracking-[-.025em] text-navy-800">
            Readers buy straight from the spread.
          </h2>
          <p className="m-0 text-[15.5px] leading-[1.6] text-gray-600">
            Drop a product pin on any page. Readers tap it and get a product card with up to six images, SKU, price,
            description and a Shop now button. Every tap is counted for the advertiser.
          </p>
          <span className="text-menu font-semibold text-blue-600">Tap a pin on the page to try it →</span>
        </div>

        <Reveal className="relative flex min-h-[400px] justify-center">
          <div
            className="relative h-[400px] w-[300px] max-w-full rounded-sm shadow-[0_30px_60px_-24px_rgba(12,74,110,.5)]"
            style={{ background: `var(--color-white) url(${SAMPLE_PAGES.page41}) top/cover` }}
          >
            {SHOP.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-label={p.name}
                aria-pressed={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className={`absolute h-[30px] w-[30px] cursor-pointer rounded-full border-[3px] border-white text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,.35)] ${
                  open === i ? "bg-navy-800" : "bg-blue-500"
                }`}
                style={{ left: p.x, top: p.y, animation: `fasPulse 1.8s ease-out ${i * 0.4}s infinite` }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {cur && (
            <div
              role="dialog"
              aria-label={`${cur.name} product card`}
              className="absolute right-0 top-5 w-[260px] max-w-[88%] overflow-hidden rounded-lg bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.4)]"
              style={{ animation: "fasSlideIn .4s cubic-bezier(.2,.8,.2,1) both" }}
            >
              <div
                className="relative h-[150px]"
                style={{ background: `var(--color-blue-100) url(${imgs[0]}) center/cover` }}
              >
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(null)}
                  className="absolute right-2 top-2 h-7 w-7 cursor-pointer rounded-full border-0 bg-white/90 text-base"
                >
                  ×
                </button>
              </div>
              <div aria-hidden="true" className="flex gap-1.5 px-3.5 pt-2.5">
                {imgs.map((src, j) => (
                  <span
                    key={j}
                    className={`h-[38px] w-[38px] rounded-sm border-2 ${j ? "border-transparent" : "border-blue-500"}`}
                    style={{ background: `var(--color-gray-100) url(${src}) center/cover` }}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1.5 px-3.5 pb-4 pt-3">
                <span className="font-mono text-eyebrow text-gray-500">SKU {cur.sku}</span>
                <span className="text-base font-bold text-navy-800">{cur.name}</span>
                <span className="text-lg font-bold text-gray-900">{cur.price}</span>
                <span className="text-small leading-normal text-gray-600">{cur.desc}</span>
                <button
                  type="button"
                  onClick={() => toast("Shop now opens the advertiser's product page. Tap counted.")}
                  className="mt-1.5 cursor-pointer rounded-sm border-0 bg-blue-500 p-2.5 text-menu font-semibold text-white hover:bg-blue-600"
                >
                  Shop now
                </button>
                <div aria-hidden="true" className="mt-1 flex justify-center gap-1.5">
                  {SHARE.map((s) => (
                    <span key={s} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
