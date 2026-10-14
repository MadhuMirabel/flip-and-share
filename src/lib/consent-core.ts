/**
 * Cookie-consent core: pure functions with no DOM access, so they can be unit tested
 * (`npm test`) and reused on the server later. Uses erasable TypeScript syntax only.
 *
 * The choice is stored in one first-party cookie, `fas_consent`:
 *   {"v":1,"a":0|1,"m":0|1,"t":<unix seconds>,"g":0|1}   (URL-encoded)
 * v = policy version · a = analytics · m = marketing · t = when it was saved · g = Global Privacy Control was on
 * "Necessary" is always on and is not stored.
 */

export const CONSENT_COOKIE = "fas_consent";

/** Bump when the cookie policy or the categories change; everyone is asked again. */
export const CONSENT_VERSION = 1;

/** The choice expires after about 6 months and the banner asks again. */
export const CONSENT_MAX_AGE_DAYS = 180;

export type Consent = {
  v: number;
  analytics: boolean;
  marketing: boolean;
  /** Unix seconds when the choice was saved. */
  ts: number;
  /** The browser sent Global Privacy Control (an opt-out of sale/sharing) when the choice was saved. */
  gpc: boolean;
};

export function serializeConsent(c: Consent): string {
  return encodeURIComponent(
    JSON.stringify({ v: c.v, a: c.analytics ? 1 : 0, m: c.marketing ? 1 : 0, t: c.ts, g: c.gpc ? 1 : 0 }),
  );
}

/** Returns the consent, or null when it is missing, malformed, from an older policy version, or expired. */
export function parseConsent(raw: string | null | undefined, nowMs: number = Date.now()): Consent | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;
  if (d.v !== CONSENT_VERSION) return null;
  if (typeof d.t !== "number" || !Number.isFinite(d.t)) return null;
  if (d.a !== 0 && d.a !== 1) return null;
  if (d.m !== 0 && d.m !== 1) return null;
  const ageMs = nowMs - d.t * 1000;
  if (ageMs < 0 || ageMs > CONSENT_MAX_AGE_DAYS * 86_400_000) return null;
  return { v: d.v, analytics: d.a === 1, marketing: d.m === 1, ts: d.t, gpc: d.g === 1 };
}

/** Reads one cookie value out of a `document.cookie`-style header. */
export function readCookie(header: string, name: string): string | undefined {
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    if (part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return undefined;
}

/** Builds the `Set-Cookie` string (for `document.cookie = …`). `secure` should be true on https. */
export function consentCookieString(c: Consent, opts: { secure: boolean; domain?: string }): string {
  const parts = [
    `${CONSENT_COOKIE}=${serializeConsent(c)}`,
    `Max-Age=${CONSENT_MAX_AGE_DAYS * 86_400}`,
    "Path=/",
    "SameSite=Lax",
  ];
  if (opts.secure) parts.push("Secure");
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  return parts.join("; ");
}

/**
 * Cookie names set by the tools we may enable. When a category is declined or withdrawn we delete these.
 * (Cookies set by other domains can't be deleted from here; withdrawing also stops the tool from running.)
 */
export const ANALYTICS_COOKIE_PATTERNS: RegExp[] = [/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/];
export const MARKETING_COOKIE_PATTERNS: RegExp[] = [/^_fbp$/, /^_fbc$/, /^_gcl_/, /^_ttp$/];

/** Names in a cookie header that match any of the patterns. */
export function matchingCookieNames(header: string, patterns: RegExp[]): string[] {
  const names: string[] = [];
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    const name = (i === -1 ? part : part.slice(0, i)).trim();
    if (name && patterns.some((p) => p.test(name))) names.push(name);
  }
  return names;
}

/** "www.shop.example.com" → [".www.shop.example.com", ".shop.example.com", ".example.com"] (never a bare TLD). */
export function parentDomains(hostname: string): string[] {
  const labels = hostname.split(".");
  if (labels.length < 2 || /^\d+(\.\d+){3}$/.test(hostname)) return [];
  const out: string[] = [];
  for (let i = 0; i <= labels.length - 2; i++) out.push("." + labels.slice(i).join("."));
  return out;
}
