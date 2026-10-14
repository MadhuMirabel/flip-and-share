"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/site/Providers";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Toggle } from "@/components/ui/Toggle";
import { isGpcOn, onOpenCookieSettings, saveConsent, useConsent } from "@/lib/consent";

/**
 * Cookie consent bar. Nothing but "Necessary" is on until the visitor chooses (no pre-ticked boxes).
 * The choice is saved in the first-party `fas_consent` cookie (see lib/consent-core.ts and docs/cookie-consent.md).
 * It is a non-modal region: the page stays usable behind it, so there is no focus trap.
 */
export function CookieBanner() {
  const consent = useConsent();
  const toast = useToast();
  const [reopened, setReopened] = useState(false);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only signal, read after mount to avoid a hydration mismatch
    setGpc(isGpcOn());
  }, []);

  // Footer "Cookie settings" / policy page: show the panel with the current choice.
  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setAnalytics(consent?.analytics ?? false);
        setMarketing(consent?.marketing ?? false);
        setReopened(true);
        setOpen(true);
      }),
    [consent],
  );

  useEffect(() => {
    if (!reopened) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setReopened(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reopened]);

  // undefined = server render / hydration; non-null consent = already chosen.
  const needsChoice = consent === null;
  if (!needsChoice && !reopened) return null;

  const persist = (a: boolean, m: boolean, message: string) => {
    saveConsent({ analytics: a, marketing: m });
    setReopened(false);
    setOpen(false);
    toast(message, "success");
  };

  const rows = [
    { title: "Necessary", desc: "Sign-in, security and your preferences. Always on.", locked: true, value: true },
    { title: "Analytics", desc: "Helps us see which pages are used and improve them.", value: analytics, set: setAnalytics },
    {
      title: "Marketing",
      desc: gpc
        ? "Off: your browser sent Global Privacy Control, so we don't share data for advertising."
        : "Personalized content and ads on our site and others.",
      value: marketing && !gpc,
      set: setMarketing,
      disabled: gpc,
    },
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
          <Link href="/cookie-policy" className="font-semibold text-navy-800 underline underline-offset-[3px] hover:text-navy-700">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="navy"
            shape="pill"
            size="lg"
            onClick={() => persist(true, true, "Cookie preferences saved.")}
          >
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
          {reopened && (
            <Button variant="ghost" shape="pill" size="lg" onClick={() => setReopened(false)}>
              Close
            </Button>
          )}
        </div>
      </Container>
      {open && (
        <div id="cookie-settings" className="border-t border-blue-200 bg-blue-50" style={{ animation: "fasFade .3s ease both" }}>
          <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3.5 pb-[22px] pt-[18px]">
            {rows.map((row) => (
              <div key={row.title} className="flex items-center gap-3.5 rounded-lg border border-gray-200 bg-white px-4 py-3.5">
                <span className="flex flex-1 flex-col gap-0.5">
                  <b className="text-sm text-navy-800">{row.title}</b>
                  <span className="text-small text-gray-500">{row.desc}</span>
                </span>
                <Toggle
                  label={`${row.title} cookies`}
                  checked={row.value}
                  locked={row.locked}
                  disabled={row.disabled}
                  onChange={row.set}
                />
              </div>
            ))}
            <div className="col-span-full flex flex-wrap justify-end gap-2.5">
              <Button variant="ghost" shape="pill" onClick={() => persist(false, false, "Only necessary cookies are on.")}>
                Reject non-essential
              </Button>
              <Button shape="pill" onClick={() => persist(analytics, marketing, "Cookie preferences saved.")}>
                Save choices
              </Button>
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
