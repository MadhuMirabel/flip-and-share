"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

/* Prototype aiRules (L3737); default on/off from the initial state `[1, 1, 0, 1, 0, 1]`. */
const RULES = [
  { when: "ON UPLOAD", name: "Extract articles for article mode", desc: "Text, headlines and captions become selectable, searchable article pages with the right reading order.", note: "Runs on every PDF import", on: true },
  { when: "ON UPLOAD", name: "Tag, summarise and describe", desc: "Tags, a page summary, meta description and alt text drafted for review.", note: "Drafts wait for approval", on: true },
  { when: "ON UPLOAD", name: "Match ads to insertion orders", desc: "Detected ads are matched to the advertiser and line item by artwork and page position.", note: "Needs Ad Manager connection", on: false },
  { when: "ON PUBLISH", name: "Draft social posts", desc: "One post per feature article, sized for X, LinkedIn, Facebook and Instagram, with the page link.", note: "Posts are queued, not sent", on: true },
  { when: "ON PUBLISH", name: "Notify subscribers", desc: "Send the issue email to your list with the cover, summary and Read now.", note: "Off · turn on per publication", on: false },
  { when: "WEEKLY", name: "Email the analytics digest", desc: "Publishing, audience, clicks and revenue for the week, to whoever you choose.", note: "Mondays at 8:00", on: true },
];

/** Six automation rule cards with violet switches (prototype L822–829). */
export function AutomationRules() {
  const [on, setOn] = useState(() => RULES.map((r) => r.on));
  const toggle = (i: number) => setOn((cur) => cur.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
      {RULES.map((r, i) => (
        <Reveal key={r.name} delay={i * 0.07} className="flex">
          <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-[22px]">
            <div className="flex items-center justify-between gap-2.5">
              <Badge tone="violet" uppercase>
                {r.when}
              </Badge>
              <button
                type="button"
                role="switch"
                aria-checked={on[i]}
                aria-label={`${r.name}: ${on[i] ? "on" : "off"}`}
                onClick={() => toggle(i)}
                className={`relative h-[22px] w-10 flex-none cursor-pointer rounded-full border-0 transition-colors duration-250 ${on[i] ? "bg-violet-600" : "bg-gray-300"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow-knob transition-transform duration-250 ease-fas ${on[i] ? "translate-x-[18px]" : ""}`}
                />
              </button>
            </div>
            <h3 className="m-0 text-base font-bold text-navy-800">{r.name}</h3>
            <p className="m-0 text-menu leading-[1.5] text-gray-600">{r.desc}</p>
            <span className={`mt-auto text-xs ${on[i] ? "text-gray-500" : "text-gray-400"}`}>{on[i] ? r.note : "Off"}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
