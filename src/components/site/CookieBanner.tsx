"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Toggle } from "@/components/ui/Toggle";
import { SITE } from "@/lib/site";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; at: string };

/**
 * First-visit consent bar. A non-modal region (page stays usable), so no focus trap.
 * Prototype persistence only; production should use a real consent manager.
 */
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

  const rows = [
    { title: "Necessary", desc: "Sign-in, security and your preferences. Always on.", locked: true, value: true },
    { title: "Analytics", desc: "Helps us see which pages are used and improve them.", value: analytics, set: setAnalytics },
    { title: "Marketing", desc: "Personalized content and ads on our site and others.", value: marketing, set: setMarketing },
  ];

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-blue-200 bg-blue-100 shadow-sheet"
      style={{ animation: "fasCkUp .5s cubic-bezier(.2,.8,.2,1) both" }}
    >
      <Container className="flex flex-wrap items-center justify-between gap-5 py-[18px]">
        <p className="m-0 min-w-[260px] flex-1 text-body text-gray-700 [text-wrap:pretty]">
          At FlipAndShare.com, we use cookies to improve your browsing experience, understand how our site is used, and
          deliver personalized content and ads. For more information, please check our{" "}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="cursor-pointer border-0 bg-transparent p-0 text-body font-semibold text-navy-800 underline underline-offset-[3px]"
          >
            Cookie Policy
          </button>
          .
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="navy" shape="pill" size="lg" onClick={() => persist(true, true)}>
            Accept
          </Button>
          <Button
            variant="outline"
            shape="pill"
            size="lg"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="cookie-settings"
          >
            Manage Cookies
          </Button>
        </div>
      </Container>
      {open && (
        <div id="cookie-settings" className="border-t border-blue-200 bg-blue-50" style={{ animation: "fasFade .3s ease both" }}>
          <Container className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5 pb-[22px] pt-[18px]">
            {rows.map((row) => (
              <div key={row.title} className="flex items-center gap-3.5 rounded-lg border border-gray-200 bg-white px-4 py-3.5">
                <span className="flex flex-1 flex-col gap-0.5">
                  <b className="text-sm text-navy-800">{row.title}</b>
                  <span className="text-small text-gray-500">{row.desc}</span>
                </span>
                <Toggle label={`${row.title} cookies`} checked={row.value} locked={row.locked} onChange={row.set} />
              </div>
            ))}
            <div className="col-span-full flex flex-wrap justify-end gap-2.5">
              <Button variant="ghost" shape="pill" onClick={() => persist(false, false)}>
                Reject non-essential
              </Button>
              <Button shape="pill" onClick={() => persist(analytics, marketing)}>
                Save choices
              </Button>
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
