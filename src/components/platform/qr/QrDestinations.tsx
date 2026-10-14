"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/mockups/DeviceFrames";
import { QrMatrix } from "@/components/mockups/QrMatrix";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { RadioCardGroup } from "@/components/ui/RadioCardGroup";
import { Reveal } from "@/components/ui/Reveal";
import { COVERS } from "@/lib/covers";

const DESTS = [
  { name: "Issue page 12", url: "flipandshare.com/oc-parenting/oct/12", title: "Halloween events guide", body: "Twelve family events across Orange County this month, with times and tickets.", cta: "Read the guide", img: 0 },
  { name: "Advertiser offer", url: "harbourmotors.com/fall-sale", title: "Harbour Motors fall sale", body: "0% financing on 2027 models through October 31.", cta: "Book a test drive", img: 1 },
  { name: "Subscribe", url: "flipandshare.com/oc-parenting/subscribe", title: "Never miss an issue", body: "Get every issue in your inbox, free, the day it publishes.", cta: "Subscribe free", img: 2 },
  { name: "Event sign-up", url: "flipandshare.com/oc-parenting/pumpkin-fest", title: "Pumpkin Fest · Oct 25", body: "Reserve your family's spot. Limited to 400 guests.", cta: "Reserve a spot", img: 3 },
];

const OPTIONS = DESTS.map((d, i) => ({ value: String(i), title: d.name, sub: d.url, subMono: true }));

/** "One printed code, any destination": pick a destination and the phone landing page changes (prototype L961–976). */
export function QrDestinations() {
  const [sel, setSel] = useState("0");
  const cur = DESTS[Number(sel)];
  const img = COVERS[(cur.img * 3 + 1) % COVERS.length];

  return (
    <section
      aria-labelledby="qr-dest-title"
      className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12 px-8 py-20 max-sm:px-5"
    >
      <div className="flex flex-col gap-4">
        <SectionHeader
          id="qr-dest-title"
          eyebrow="CHANGE WITHOUT REPRINTING"
          title="One printed code. Any destination, any time."
          lead="The magazine is already in mailboxes. The campaign changed. Pick a new destination and every copy already printed now goes there."
          leadSize="lg"
        />
        <RadioCardGroup
          label="Destination for the printed code"
          options={OPTIONS}
          value={sel}
          onChange={setSel}
          radius="lg"
          className="gap-2!"
        />
      </div>

      <Reveal className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2.5">
          <QrMatrix size={150} bordered />
          <span className="text-xs font-semibold text-gray-500">Same printed code</span>
        </div>
        <span aria-hidden="true" className="text-2xl text-blue-500">→</span>
        <PhoneFrame size="sm" shadow="brand" className="shadow-[0_30px_60px_-24px_rgba(12,74,110,.5)]!">
          <div aria-live="polite" className="flex h-full flex-col">
            <div className="truncate border-b border-gray-200 px-2.5 py-2 font-mono text-[9px] whitespace-nowrap text-gray-500">{cur.url}</div>
            <div key={sel} className="flex flex-1 flex-col" style={{ animation: "fasFade .45s cubic-bezier(.22,1,.36,1) both" }}>
              <div
                aria-hidden="true"
                className="h-[130px] flex-none bg-blue-100 bg-cover bg-center"
                style={{ backgroundImage: `url(${JSON.stringify(img)})` }}
              />
              <div className="flex flex-col gap-2 p-3.5">
                <span className="text-sm font-bold text-navy-800">{cur.title}</span>
                <span className="text-caption leading-[1.45] text-gray-600">{cur.body}</span>
                <span className="mt-1.5 rounded-sm bg-blue-500 p-2 text-center text-caption font-semibold text-white">{cur.cta}</span>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </Reveal>
    </section>
  );
}
