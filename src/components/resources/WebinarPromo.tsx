"use client";

import { useState } from "react";
import { useToast } from "@/components/site/Providers";
import { Countdown } from "@/components/ui/Countdown";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NEXT_WEBINAR } from "./data";

/** Navy "next live webinar" promo with a seconds countdown and a Save-my-seat toggle (prototype L1808). */
export function WebinarPromo() {
  const toast = useToast();
  const [saved, setSaved] = useState(false);

  const toggle = () => {
    if (!saved) toast("Seat saved. Calendar invite on its way.", "success");
    setSaved(!saved);
  };

  return (
    <Reveal
      as="section"
      aria-labelledby="webinar-title"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-7 rounded-xl bg-navy-800 px-10 py-9 text-white max-sm:p-6"
    >
      <div className="flex flex-col gap-2.5">
        <Eyebrow tone="dark" className="text-blue-300!">
          LIVE WEBINAR · {NEXT_WEBINAR.label}
        </Eyebrow>
        <h2 id="webinar-title" className="m-0 text-[clamp(22px,2.8vw,28px)] leading-[1.2] font-bold tracking-[-0.02em]">
          {NEXT_WEBINAR.title}
        </h2>
        <p className="m-0 text-body-sm leading-[1.6] text-blue-200">{NEXT_WEBINAR.blurb}</p>
      </div>
      <div className="flex flex-col items-start gap-2.5">
        <Countdown target={NEXT_WEBINAR.at} variant="panel" label={NEXT_WEBINAR.srLabel} />
        <button
          type="button"
          onClick={toggle}
          aria-pressed={saved}
          className={`cursor-pointer rounded-md border-0 px-[18px] py-3 text-body font-semibold transition-colors duration-250 ${
            saved ? "bg-green-100 text-green-800" : "bg-white text-navy-700 hover:bg-blue-50"
          }`}
        >
          {saved ? "✓ Seat saved" : "Save my seat"}
        </button>
      </div>
    </Reveal>
  );
}
