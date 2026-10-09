"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/Toggle";
import { SITE } from "@/lib/site";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; at: string };

/** First-visit consent bar. Prototype persistence only; production should use a real consent manager. */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(SITE.cookieKey);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read storage after mount to avoid hydration mismatch
    if (!stored) setShow(true);
  }, []);

  const persist = (a: boolean, m: boolean) => {
    const value: Consent = { necessary: true, analytics: a, marketing: m, at: new Date().toISOString() };
    try {
      localStorage.setItem(SITE.cookieKey, JSON.stringify(value));
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-blue-200 bg-blue-100 shadow-[0_-12px_32px_-16px_rgba(12,74,110,.35)]"
      style={{ animation: "fasCkUp .5s cubic-bezier(.2,.8,.2,1) both" }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-8 py-[18px]">
        <p className="m-0 min-w-[260px] flex-1 text-[15px] leading-[1.55] text-[#374151] [text-wrap:pretty]">
          At FlipAndShare.com, we use cookies to improve your browsing experience, understand how our site is used, and
          deliver personalized content and ads. For more information, please check our{" "}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="cursor-pointer border-0 bg-transparent p-0 text-[15px] font-semibold text-navy-800 underline underline-offset-[3px]"
          >
            Cookie Policy
          </button>
          .
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => persist(true, true)}
            className="cursor-pointer rounded-full border-2 border-navy-800 bg-navy-800 px-[26px] py-3 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-navy-700"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="cookie-settings"
            className="cursor-pointer rounded-full border-2 border-navy-800 bg-transparent px-[22px] py-3 text-[15px] font-bold text-navy-800 transition-colors duration-200 hover:bg-white/70"
          >
            Manage Cookies
          </button>
        </div>
      </div>
      {open && (
        <div
          id="cookie-settings"
          className="border-t border-blue-200 bg-blue-50"
          style={{ animation: "fasFade .3s ease both" }}
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5 px-8 pb-[22px] pt-[18px]">
            {[
              { title: "Necessary", desc: "Sign-in, security and your preferences. Always on.", locked: true },
              {
                title: "Analytics",
                desc: "Helps us see which pages are used and improve them.",
                value: analytics,
                set: setAnalytics,
              },
              {
                title: "Marketing",
                desc: "Personalized content and ads on our site and others.",
                value: marketing,
                set: setMarketing,
              },
            ].map((row) => (
              <div
                key={row.title}
                className="flex items-center gap-3.5 rounded-[10px] border border-[#e5e7eb] bg-white px-4 py-3.5"
              >
                <span className="flex flex-1 flex-col gap-0.5">
                  <b className="text-sm text-navy-800">{row.title}</b>
                  <span className="text-[12.5px] leading-[1.4] text-[#6b7280]">{row.desc}</span>
                </span>
                <Toggle
                  label={`${row.title} cookies`}
                  checked={row.locked ? true : !!row.value}
                  locked={row.locked}
                  onChange={row.set}
                />
              </div>
            ))}
            <div className="col-span-full flex flex-wrap justify-end gap-2.5">
              <button
                type="button"
                onClick={() => persist(false, false)}
                className="cursor-pointer rounded-full border-[1.5px] border-[#9ca3af] bg-white px-[18px] py-2.5 text-sm font-semibold text-[#374151]"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => persist(analytics, marketing)}
                className="cursor-pointer rounded-full border-0 bg-blue-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-600"
              >
                Save choices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
