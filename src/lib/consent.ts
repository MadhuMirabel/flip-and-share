"use client";

import { useSyncExternalStore } from "react";
import {
  ANALYTICS_COOKIE_PATTERNS,
  CONSENT_COOKIE,
  CONSENT_VERSION,
  MARKETING_COOKIE_PATTERNS,
  consentCookieString,
  matchingCookieNames,
  parentDomains,
  parseConsent,
  readCookie,
  type Consent,
} from "@/lib/consent-core";

/** Browser-side consent store. See docs/cookie-consent.md. */

export type { Consent };

const CHANGED = "fas:consent";
const OPEN_SETTINGS = "fas:open-cookie-settings";

let cachedRaw: string | undefined | null = null; // null = never read
let cachedConsent: Consent | null = null;

function getSnapshot(): Consent | null {
  const raw = readCookie(document.cookie, CONSENT_COOKIE);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedConsent = parseConsent(raw);
  }
  return cachedConsent;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGED, onChange);
  return () => window.removeEventListener(CHANGED, onChange);
}

/**
 * The visitor's saved choice. `undefined` while rendering on the server and during hydration,
 * `null` when they have not chosen yet (or the choice expired / the policy changed).
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

/** True when the browser sends Global Privacy Control, a legal opt-out of sale/sharing. */
export function isGpcOn(): boolean {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

function expireCookie(name: string) {
  const base = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  document.cookie = base;
  for (const domain of parentDomains(location.hostname)) document.cookie = `${base}; Domain=${domain}`;
}

/** Deletes the cookies of every category the visitor has not allowed. */
function removeDeclinedCookies(c: Pick<Consent, "analytics" | "marketing">) {
  const patterns = [
    ...(c.analytics ? [] : ANALYTICS_COOKIE_PATTERNS),
    ...(c.marketing ? [] : MARKETING_COOKIE_PATTERNS),
  ];
  if (patterns.length === 0) return;
  for (const name of matchingCookieNames(document.cookie, patterns)) expireCookie(name);
}

export type ConsentChoice = { analytics: boolean; marketing: boolean };

/** Saves the choice to the `fas_consent` cookie, removes declined cookies and tells the page. */
export function saveConsent(choice: ConsentChoice): Consent {
  const gpc = isGpcOn();
  const consent: Consent = {
    v: CONSENT_VERSION,
    analytics: choice.analytics,
    // Global Privacy Control is a legal opt-out of sale/sharing: it always wins for marketing.
    marketing: choice.marketing && !gpc,
    ts: Math.floor(Date.now() / 1000),
    gpc,
  };
  document.cookie = consentCookieString(consent, {
    secure: location.protocol === "https:",
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
  });
  removeDeclinedCookies(consent);
  window.dispatchEvent(new Event(CHANGED));
  return consent;
}

/** Reopens the banner's settings panel (footer "Cookie settings", cookie policy page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_SETTINGS, handler);
  return () => window.removeEventListener(OPEN_SETTINGS, handler);
}
