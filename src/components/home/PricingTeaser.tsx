"use client";

import Link from "next/link";
import { useState } from "react";
import { SpecialistBanner } from "@/components/sections/Banners";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ToggleCard } from "@/components/ui/Toggle";

type Key = "ads" | "domain" | "team";
const FINDER: { key: Key; q: string }[] = [
  { key: "ads", q: "I sell advertising in my publication" },
  { key: "domain", q: "I want my own domain and no branding" },
  { key: "team", q: "Several people or clients will publish" },
];

/** Plan logic and prices from the prototype (annual billing is the default there). */
function recommend(f: Record<Key, boolean>, annual: boolean) {
  if (f.team) return { name: "Business", line: "Workspaces, roles, SSO and API", price: annual ? "$69" : "$86", per: "/mo" };
  if (f.ads)
    return {
      name: "Professional",
      line: "Flat plan, Ad Adviser, materials portal, full analytics",
      price: annual ? "$29" : "$36",
      per: "/mo",
    };
  if (f.domain) return { name: "Starter", line: "Unlimited pages, no branding, hotspots", price: annual ? "$12" : "$15", per: "/mo" };
  return { name: "Free", line: "One publication, first month free", price: "$0", per: "" };
}

/** Homepage pricing teaser: copy, plan finder, and the specialist strip. */
export function PricingTeaser() {
  const [finder, setFinder] = useState<Record<Key, boolean>>({ ads: false, domain: false, team: false });
  const rec = recommend(finder, true);

  return (
    <section className="box-border border-t border-gray-200 bg-gray-50 px-8 py-[88px] max-sm:px-5">
      <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-12">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow>PRICING</Eyebrow>
          <h2 className="m-0 text-[clamp(30px,4vw,40px)] leading-[1.1] tracking-[-0.03em] text-navy-800">
            Professional publishing without enterprise pricing.
          </h2>
          <p className="m-0 max-w-[520px] text-base leading-[1.6] text-gray-600">
            Start free with one publication. Pay only when you publish more, sell ads or bring in a team. No credit card to
            begin.
          </p>
          <CheckList
            variant="plain"
            items={[
              "Free plan, no credit card, first publication free for a month",
              <>
                <Link
                  href="/features/seo"
                  className="font-semibold underline decoration-[rgba(2,132,199,.35)] underline-offset-[3px]"
                >
                  Article mode and SEO
                </Link>{" "}
                on every plan
              </>,
              "Upgrade or cancel any time",
            ]}
          />
        </div>

        <Reveal
          className="flex flex-col gap-[18px] rounded-lg border border-gray-200 bg-white p-7"
          style={{ boxShadow: "0 30px 60px -30px rgba(12,74,110,.35)" }}
        >
          <span className="text-body font-bold text-navy-800">Find your plan in three taps</span>
          <div className="flex flex-col gap-2.5">
            {FINDER.map((f) => (
              <ToggleCard
                key={f.key}
                title={f.q}
                checked={finder[f.key]}
                onChange={(next) => setFinder((s) => ({ ...s, [f.key]: next }))}
              />
            ))}
          </div>
          <div
            aria-live="polite"
            className="flex flex-wrap items-center justify-between gap-3.5 rounded-lg px-[18px] py-4 text-white"
            style={{ background: "linear-gradient(135deg, var(--color-navy-800), var(--color-blue-600))" }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-blue-200">Recommended</span>
              <span className="text-[22px] font-bold tracking-[-0.02em] transition-all duration-300">{rec.name}</span>
              <span className="text-label text-blue-100">{rec.line}</span>
            </div>
            <span className="text-[28px] font-bold tracking-[-0.02em]">
              {rec.price}
              <span className="text-label font-normal text-blue-200">{rec.per}</span>
            </span>
          </div>
          <Button href="/pricing" size="lg" radius="md" className="py-[13px]">
            Compare all plans →
          </Button>
          <span className="text-center text-xs text-gray-400">
            Cancel any time. Your publications stay live for 30 days after.
          </span>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-14 max-w-[1100px]">
        <SpecialistBanner />
      </Reveal>
    </section>
  );
}
